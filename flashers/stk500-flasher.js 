window.STK500Flasher = (function () {

  var STK = {
    OK: 0x10, INSYNC: 0x14, CRC_EOP: 0x20,
    GET_SYNC: 0x30, ENTER_PROGMODE: 0x50,
    LEAVE_PROGMODE: 0x51, LOAD_ADDRESS: 0x55,
    PROG_PAGE: 0x64,
  };

  var PAGE_SIZE = 128;
  var _reader, _writer, _logFn;

  function log(msg, cls) { if (_logFn) _logFn(msg, cls); }

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

  function readByte(timeoutMs) {
    if (timeoutMs === undefined) timeoutMs = 3000;
    return new Promise(function (res, rej) {
      var done = false;
      var timer = setTimeout(function () {
        done = true;
        rej(new Error('Read timeout — is the board in bootloader mode?'));
      }, timeoutMs);
      (function tryRead() {
        if (done) return;
        _reader.read().then(function (result) {
          if (done) return;
          if (result.done || !result.value || result.value.length === 0) {
            tryRead();
          } else {
            clearTimeout(timer);
            res(result.value[0]);
          }
        }).catch(function (e) {
          clearTimeout(timer);
          rej(e);
        });
      })();
    });
  }

  async function expect(val) {
    var b = await readByte();
    if (b !== val) throw new Error('Protocol error: expected 0x' + val.toString(16) + ' got 0x' + b.toString(16));
  }

  async function cmd(bytes) {
    var buf = new Uint8Array(bytes.length + 1);
    for (var i = 0; i < bytes.length; i++) buf[i] = bytes[i];
    buf[bytes.length] = STK.CRC_EOP || 0x20;
    await _writer.write(buf);
    await expect(STK.INSYNC);
    await expect(STK.OK);
  }

  async function getSync() {
    for (var attempt = 0; attempt < 5; attempt++) {
      try {
        await _writer.write(new Uint8Array([STK.GET_SYNC, 0x20]));
        var b = await readByte(600);
        if (b === STK.INSYNC) {
          await readByte(600);
          log('Bootloader sync OK', 'rx');
          return;
        }
      } catch (e) {}
      log('Sync attempt ' + (attempt + 1) + '…');
    }
    throw new Error('Cannot sync with bootloader. Check connection and baud rate (should be 115200).');
  }

  async function loadAddress(addr) {
    var word = Math.floor(addr / 2);
    await cmd([STK.LOAD_ADDRESS, word & 0xff, (word >> 8) & 0xff]);
  }

  async function progPage(pageBytes) {
    var header = [STK.PROG_PAGE, 0x00, pageBytes.length, 0x46];
    var buf = new Uint8Array(header.length + pageBytes.length + 1);
    for (var i = 0; i < header.length; i++) buf[i] = header[i];
    for (var j = 0; j < pageBytes.length; j++) buf[header.length + j] = pageBytes[j];
    buf[buf.length - 1] = 0x20;
    await _writer.write(buf);
    await expect(STK.INSYNC);
    await expect(STK.OK);
  }

  async function flash(port, hexText, onLog, onProgress) {
    _logFn = onLog;

    var readable = port.readable;
    var writable = port.writable;

    _reader = readable.getReader();
    _writer = writable.getWriter();

    try {
      log('Syncing with bootloader…');
      await getSync();

      log('Entering programming mode…');
      await cmd([STK.ENTER_PROGMODE]);
      log('Programming mode active', 'rx');

      var data = parseHex(hexText);
      var pages = Math.ceil(data.length / PAGE_SIZE);
      log('Flashing ' + data.length + ' bytes across ' + pages + ' pages…');

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
      await cmd([STK.LEAVE_PROGMODE]);
      log('Flash complete!', 'rx');

    } finally {
      try { _reader.releaseLock(); } catch (e) {}
      try { _writer.releaseLock(); } catch (e) {}
    }
  }

  return { flash: flash };

})();