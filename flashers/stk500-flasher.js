window.STK500Flasher=(function(){

  var INSYNC=0x14,OK=0x10,CRC_EOP=0x20;
  var GET_SYNC=0x30,ENTER=0x50,LEAVE=0x51,LOAD=0x55,PROG=0x64;
  var PAGE=128;
  var _log,_q=[],_waiters=[],_rawReader=null,_writer=null,_dead=false;

  function log(m,c){if(_log)_log(m,c);}
  function delay(ms){return new Promise(function(r){setTimeout(r,ms);});}

  function pump(port){
    _q=[];_waiters=[];_dead=false;
    _rawReader=port.readable.getReader();
    (function go(){
      if(_dead)return;
      _rawReader.read().then(function(r){
        if(_dead||r.done)return;
        if(r.value)for(var i=0;i<r.value.length;i++){
          var b=r.value[i];
          if(_waiters.length)_waiters.shift()(b);
          else _q.push(b);
        }
        go();
      }).catch(function(){});
    })();
  }

  async function stopPump(){
    _dead=true;
    try{await _rawReader.cancel();}catch(e){}
    try{_rawReader.releaseLock();}catch(e){}
  }

  function rb(ms){
    ms=ms||5000;
    return new Promise(function(res,rej){
      if(_q.length){res(_q.shift());return;}
      var done=false;
      var t=setTimeout(function(){
        if(done)return;done=true;
        var i=_waiters.indexOf(fn);
        if(i>=0)_waiters.splice(i,1);
        rej(new Error('Read timeout'));
      },ms);
      function fn(b){if(done)return;done=true;clearTimeout(t);res(b);}
      _waiters.push(fn);
    });
  }

  async function expect(v,ms){
    var b=await rb(ms||5000);
    if(b!==v)throw new Error('Expected 0x'+v.toString(16)+' got 0x'+b.toString(16));
  }

  async function send(bytes){
    var buf=new Uint8Array(bytes.length+1);
    for(var i=0;i<bytes.length;i++)buf[i]=bytes[i];
    buf[bytes.length]=CRC_EOP;
    await _writer.write(buf);
  }

  async function cmd(bytes){
    await send(bytes);
    await expect(INSYNC,5000);
    await expect(OK,5000);
  }

  // Sync AND enter progmode in one tight loop — no gap between them
  async function syncAndEnter(){
    for(var attempt=0;attempt<12;attempt++){
      try{
        _q=[];
        // Send GET_SYNC
        await _writer.write(new Uint8Array([GET_SYNC,CRC_EOP]));
        var b=await rb(300);
        if(b!==INSYNC){await delay(50);continue;}
        var b2=await rb(300);
        if(b2!==OK){await delay(50);continue;}
        // Got sync — NOW immediately send ENTER_PROGMODE with no delay
        await _writer.write(new Uint8Array([ENTER,CRC_EOP]));
        var c=await rb(2000);
        if(c!==INSYNC){await delay(50);continue;}
        var c2=await rb(2000);
        if(c2!==OK){await delay(50);continue;}
        log('Sync + programming mode OK','rx');
        return;
      }catch(e){
        log('Attempt '+(attempt+1)+'…');
        await delay(60);
      }
    }
    throw new Error('Cannot sync — close Arduino IDE, check baud 115200, try pressing reset manually just before clicking Flash.');
  }

  function parseHex(hex){
    var data=new Uint8Array(0x20000),max=0;
    hex.split('\n').forEach(function(line){
      var l=line.trim();
      if(!l.startsWith(':'))return;
      var len=parseInt(l.slice(1,3),16);
      var addr=parseInt(l.slice(3,7),16);
      var type=parseInt(l.slice(7,9),16);
      if(type===1)return;
      if(type!==0)return;
      for(var i=0;i<len;i++)data[addr+i]=parseInt(l.slice(9+i*2,11+i*2),16);
      if(addr+len>max)max=addr+len;
    });
    return data.slice(0,max);
  }

  async function flash(port,hexText,onLog,onProgress){
    _log=onLog;
    pump(port);
    _writer=port.writable.getWriter();
    try{
      log('Syncing and entering programming mode…');
      await syncAndEnter();

      var data=parseHex(hexText);
      var pages=Math.ceil(data.length/PAGE);
      log('Flashing '+data.length+' bytes / '+pages+' pages…');

      for(var p=0;p<pages;p++){
        var addr=p*PAGE;
        var chunk=data.slice(addr,addr+PAGE);
        var page=new Uint8Array(PAGE);
        page.set(chunk);
        page.fill(0xff,chunk.length);

        // LOAD ADDRESS
        var word=Math.floor(addr/2);
        await cmd([LOAD,word&0xff,(word>>8)&0xff]);

        // PROG PAGE — single write
        var buf=new Uint8Array(4+PAGE+1);
        buf[0]=PROG;buf[1]=0x00;buf[2]=PAGE;buf[3]=0x46;
        for(var i=0;i<PAGE;i++)buf[4+i]=page[i];
        buf[4+PAGE]=CRC_EOP;
        await _writer.write(buf);
        await expect(INSYNC,6000);
        await expect(OK,6000);

        var pct=Math.round(((p+1)/pages)*100);
        if(onProgress)onProgress(pct);
        if(p%8===0||p===pages-1)log('Page '+(p+1)+'/'+pages+' ('+pct+'%)');
      }

      await cmd([LEAVE]);
      log('Flash complete!','rx');

    }finally{
      await stopPump();
      try{_writer.releaseLock();}catch(e){}
    }
  }

  return{flash:flash};
})();