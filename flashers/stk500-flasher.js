window.STK500Flasher = (function () {

  var STK_INSYNC     = 0x14;
  var STK_OK         = 0x10;
  var STK_CRC_EOP    = 0x20;
  var STK_GET_SYNC   = 0x30;
  var STK_ENTER_PROG = 0x50;
  var STK_LEAVE_PROG = 0x51;
  var STK_LOAD_ADDR  = 0x55;
  var STK_PROG_PAGE  = 0x64;

  var PAGE_SIZE = 128;
  var _logFn;

  // Single shared byte queue — all reads go through here
  var _queue = [];
  var _queueWaiters = [];
  var _readerRunning = false;
  var _readerAbort = false;
  var _rawReader = null;
  var _writer = null;

  function log(msg, cls) { if (_logFn) _logFn(msg, cls); }
  function delay(ms) { return new Promise(function(r){setTimeout(r,ms);}); }

  // Start pumping bytes from the port into _queue
  function startPump(port) {
    _queue = [];
    _queueWaiters = [];
    _readerAbort = false;
    _readerRunning = true;
    _rawReader = port.readable.getReader();

    (function pump() {
      if (_readerAbort) {
        _readerRunning = false;
        return;
      }
      _rawReader.read().then(function(result) {
        if (_readerAbort || result.done) {
          _readerRunning = false;
          return;
        }
        if (result.value && result.value.length > 0) {
          for (var i = 0; i < result.value.length; i++) {
            var byte = result.value[i];
            if (_queueWaiters.length > 0) {
              var resolve = _queueWaiters.shift();
              resolve(byte);
            } else {
              _queue.push(byte);
            }
          }
        }
        pump();
      }).catch(function() {
        _readerRunning = false;
      });
    })();
  }

  async function stopPump() {
    _readerAbort = true;
    try { await _rawReader.cancel(); } catch(e) {}
    try { _rawReader.releaseLock(); } catch(e) {}
    _rawReader = null;
  }

  function readByte(timeoutMs) {
    if (timeoutMs === undefined) timeoutMs = 4000;
    return new Promise(function(res, rej) {
      if (_queue.length > 0) {
        res(_queue.shift());
        return;
      }
      var settled = false;
      var timer = setTimeout(function() {
        if (settled) return;
        settled = true;
        // remove this waiter
        var idx = _queueWaiters.indexOf(resolver);
        if (idx >= 0) _queueWaiters.splice(idx, 1);
        rej(new Error('Read timeout'));
      }, timeoutMs);
      function resolver(b) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        res(b);
      }
      _queueWaiters.push(resolver);
    });
  }

  async function expect(val, timeoutMs) {
    var b = await readByte(timeoutMs || 4000);
    if (b !== val) {
      throw new Error('Protocol error: expected 0x' + val.toString(16) +
        ' got 0x' + b.toString(16));
    }
  }

  async function sendCmd(bytes) {
    var buf = new Uint8Array(bytes.length + 1);
    for (var i = 0; i < bytes.length; i++) buf[i] = bytes[i];
    buf[bytes.length] = STK_CRC_EOP;
    await _writer.write(buf);
    await expect(STK_INSYNC, 5000);
    await expect(STK_OK, 5000);
  }

  async function getSync() {
    // Drain anything in queue first
    _queue = [];
    for (var attempt = 0; attempt < 10; attempt++) {
      try {
        // Send two GET_SYNC to clear any partial state
        await _writer.write(new Uint8Array([
          STK_GET_SYNC, STK_CRC_EOP,
          STK_GET_SYNC, STK_CRC_EOP
        ]));
        var b1 = await readByte(500);
        if (b1 === STK_INSYNC) {
          var b2 = await readByte(500);
          if (b2 === STK_OK) {
            // drain second response if it arrives
            try {
              var b3 = await readByte(200);
              if (b3 === STK_INSYNC) await readByte(200);
            } catch(e) {}
            log('Bootloader sync OK', 'rx');
            return;
          }
        }
        // drain queue on bad response
        _queue = [];
      } catch(e) {}
      log('Sync attempt ' + (attempt + 1) + '…');
      await delay(80);
    }
    throw new Error('Cannot sync — make sure Arduino IDE is closed and baud rate is 115200.');
  }

  async function loadAddress(addr) {
    var word = Math.floor(addr / 2);
    await sendCmd([STK_LOAD_ADDR, word & 0xff, (word >> 8) & 0xff]);
  }

  async function progPage(pageBytes) {
    var buf = new Uint8Array(4 + pageBytes.length + 1);
    buf[0] = STK_PROG_PAGE;
    buf[1] = 0x00;
    buf[2] = pageBytes.length;
    buf[3] = 0x46; // 'F' = flash
    for (var i = 0; i < pageBytes.length; i++) buf[4 + i] = pageBytes[i];
    buf[buf.length - 1] = STK_CRC_EOP;
    await _writer.write(buf);
    await expect(STK_INSYNC, 6000);
    await expect(STK_OK, 6000);
  }

  function parseHex(hexText) {
    var data = new Uint8Array(0x20000);
    var maxAddr = 0;
    var lines = hexText.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i].trim();
      if (!l.startsWith(':')) continue;
      var len  = parseInt(l.slice(1,3), 16);
      var addr = parseInt(l.slice(3,7), 16);
      var type = parseInt(l.slice(7,9), 16);
      if (type === 0x01) break;
      if (type !== 0x00) continue;
      for (var b = 0; b < len; b++) {
        data[addr+b] = parseInt(l.slice(9+b*2, 11+b*2), 16);
      }
      if (addr+len > maxAddr) maxAddr = addr+len;
    }
    return data.slice(0, maxAddr);
  }

  async function flash(port, hexText, onLog, onProgress) {
    _logFn = onLog;

    // Start the byte pump — keeps reader always draining
    startPump(port);

    // Get writer
    _writer = port.writable.getWriter();

    try {
      log('Syncing with bootloader…');
      await getSync();

      // Small pause between sync and first real command
      await delay(20);

      log('Entering programming mode…');
      await sendCmd([STK_ENTER_PROG]);
      log('Programming mode active', 'rx');

      var data = parseHex(hexText);
      var pages = Math.ceil(data.length / PAGE_SIZE);
      log('Flashing ' + data.length + ' bytes / ' + pages + ' pages…');

      for (var p = 0; p < pages; p++) {
        var addr = p * PAGE_SIZE;
        var chunk = data.slice(addr, addr + PAGE_SIZE);
        var page = new Uint8Array(PAGE_SIZE);
        page.set(chunk);
        page.fill(0xff, chunk.length);

        await loadAddress(addr);
        await progPage(Array.from(page));

        var pct = Math.round(((p+1)/pages)*100);
        if (onProgress) onProgress(pct);
        if (p % 8 === 0 || p === pages-1) {
          log('Page '+(p+1)+'/'+pages+' ('+pct+'%)');
        }
      }

      log('Leaving programming mode…');
      await sendCmd([STK_LEAVE_PROG]);
      log('Flash complete!', 'rx');

    } finally {
      await stopPump();
      try { _writer.releaseLock(); } catch(e) {}
    }
  }

  return { flash: flash };

})();