window.STK500Flasher = (function () {

  var STK_INSYNC      = 0x14;
  var STK_OK          = 0x10;
  var STK_CRC_EOP     = 0x20;
  var STK_GET_SYNC    = 0x30;
  var STK_ENTER_PROG  = 0x50;
  var STK_LEAVE_PROG  = 0x51;
  var STK_LOAD_ADDR   = 0x55;
  var STK_PROG_PAGE   = 0x64;

  var PAGE_SIZE = 128;
  var _reader, _writer, _logFn;

  function log(msg, cls) { if (_logFn) _logFn(msg, cls); }

  function delay(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  function parseHex(hexText) {
    var data = new Uint8Array(0x20000);
    var maxAddr = 0;
    var lines = hexText.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i].trim();
      if (!l.startsWith(':')) continue;
      var len  = parseInt(l.slice(1, 3), 16);
      var addr = parseInt(l.slice(3, 7), 16);
      var type = parseInt(l.slice(7, 9), 16);
      if (type === 0x01) break;
      if (type !== 0x00) continue;
      for (var b = 0; b < len; b++) {
        data[addr + b] = parseInt(l.slice(9 + b * 2, 11 + b * 2), 16);
      }
      if (addr + len > maxAddr) maxAddr = addr + len;
    }
    return data.slice(0, maxAddr);
  }

  // Read bytes into a buffer — drains whatever arrives within timeoutMs
  function readByte(timeoutMs) {
    if (timeoutMs === undefined) timeoutMs = 4000;
    return new Promise(function (res, rej) {
      var settled = false;

      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        rej(new Error('Read timeout — is the board in bootloader mode?'));
      }, timeoutMs);

      function tryRead() {
        if (settled) return;
        _reader.read().then(function (result) {
          if (settled) return;
          if (result.done) {
            settled = true;
            clearTimeout(timer);
            rej(new Error('Port closed during read'));
            return;
          }
          if (!result.value || result.value.length === 0) {
            tryRead();
            return;
          }
          settled = true;
          clearTimeout(timer);
          res(result.value[0]);
        }).catch(function (e) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          rej(e);
        });
      }

      tryRead();
    });
  }

  async function expect(val, timeoutMs) {
    var b = await readByte(timeoutMs || 4000);
    if (b !== val) {
      throw new Error(
        'Protocol error: expected 0x' + val.toString(16) +
        ' got 0x' + b.toString(16)
      );
    }
  }

  // Send a command and wait for INSYNC + OK
  async function cmd(bytes) {
    var buf = new Uint8Array(bytes.length + 1);
    for (var i = 0; i < bytes.length; i++) buf[i] = bytes[i];
    buf[bytes.length] = STK_CRC_EOP;
    await _writer.write(buf);
    await expect(STK_INSYNC, 4000);
    await expect(STK_OK, 4000);
  }

  async function getSync() {
    for (var attempt = 0; attempt < 8; attempt++) {
      try {
        await _writer.write(new Uint8Array([STK_GET_SYNC, STK_CRC_EOP]));
        var b = await readByte(400);
        if (b === STK_INSYNC) {
          await readByte(400); // consume STK_OK
          log('Bootloader sync OK', 'rx');
          return;
        }
      } catch (e) {}
      log('Sync attempt ' + (attempt + 1) + '…');
      await delay(100);
    }
    throw new Error('Cannot sync — check baud rate is 115200 and board reset correctly.');
  }

  async function loadAddress(addr) {
    var word = Math.floor(addr / 2);
    await cmd([STK_LOAD_ADDR, word & 0xff, (word >> 8) & 0xff]);
  }

  async function progPage(pageBytes) {
    // Build: CMD + sizeH + sizeL + 'F' + data[] + CRC_EOP
    var buf = new Uint8Array(4 + pageBytes.length + 1);
    buf[0] = STK_PROG_PAGE;
    buf[1] = 0x00;
    buf[2] = pageBytes.length;
    buf[3] = 0x46; // 'F' = flash
    for (var i = 0; i < pageBytes.length; i++) buf[4 + i] = pageBytes[i];
    buf[buf.length - 1] = STK_CRC_EOP;
    await _writer.write(buf);
    await expect(STK_INSYNC, 5000);
    await expect(STK_OK, 5000);
  }

  async function flash(port, hexText, onLog, onProgress) {
    _logFn = onLog;

    // Open a fresh reader/writer at 115200 for flashing
    // The port is already open — just get locks directly
    _reader = port.readable.getReader();
    _writer = port.writable.getWriter();

    try {
      log('Syncing with bootloader…');
      await getSync();

      log('Entering programming mode…');
      await cmd([STK_ENTER_PROG]);
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

        var pct = Math.round(((p + 1) / pages) * 100);
        if (onProgress) onProgress(pct);
        if (p % 8 === 0 || p === pages - 1) {
          log('Page ' + (p + 1) + '/' + pages + ' (' + pct + '%)');
        }
      }

      log('Leaving programming mode…');
      await cmd([STK_LEAVE_PROG]);
      log('Flash complete!', 'rx');

    } finally {
      try { _reader.releaseLock(); } catch (e) {}
      try { _writer.releaseLock(); } catch (e) {}
    }
  }

  return { flash: flash };

})();