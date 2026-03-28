/**
 * IC EXPLORER — SHARED ENGINE  (ic-explorer-engine.js)
 * ======================================================
 * Host this on your CDN. Load it AFTER ic-explorer-core.css.
 * Each Blogger post defines window.IC_CONFIG before loading
 * this file, then calls ICExplorer.init().
 *
 * window.IC_CONFIG shape:
 * {
 *   partName:    'PIC16F877A',         // shown in header & UI
 *   partMPN:     'PIC16F877A-I/P',     // SnapMagic search string
 *   package:     'DIP-40',
 *   pinCount:    40,
 *   snapPageURL: 'https://www.snapeda.com/parts/...',
 *   downloadURL: 'https://www.snapeda.com/parts/...?ref=snapeda',
 *   pins:        [ ...pin objects... ],  // see format below
 *   altFuncs:    { 'PINID': ['ALT1', 'ALT2'], ... },
 *   quickSpecs:  [ {label, value, color?}, ... ],
 *   dsSpecs:     [ ... ],    // full spec rows for datasheet tab
 *   dsFeatures:  [ ... ],    // bullet list of features
 *   dipConfig: {             // DIP layout params (omit for other packages)
 *     pinsPerSide: 20,
 *     bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 700
 *   }
 * }
 *
 * Pin object format:
 * {
 *   num:   1,
 *   id:    'MCLR',          // internal key (must be unique)
 *   lbl:   'MCLR',          // short label shown on pin stub
 *   name:  'MCLR / VPP',   // full name
 *   type:  'RESET',         // colour category key
 *   funcs: ['RESET'],       // filter categories
 *   volt:  '5V',
 *   curr:  'N/A',
 *   note:  'Master clear...',
 *   // for right-side DIP pins only, override slot position:
 *   _rightSlot: 0           // 0=top-right, pinsPerSide-1=bottom-right
 * }
 */

(function(global){
'use strict';

// ── Colour palette ───────────────────────────────────────────
var COLORS = {
  GPIO: {c:'#78c878',bg:'rgba(100,200,100,.10)',bd:'rgba(100,200,100,.27)'},
  PWR:  {c:'#ff6b6b',bg:'rgba(255,107,107,.14)',bd:'rgba(255,107,107,.35)'},
  GND:  {c:'#a8a8a8',bg:'rgba(168,168,168,.11)',bd:'rgba(168,168,168,.28)'},
  ADC:  {c:'#c8a850',bg:'rgba(200,168,80,.12)', bd:'rgba(200,168,80,.30)'},
  SPI:  {c:'#4a9aee',bg:'rgba(74,154,238,.11)', bd:'rgba(74,154,238,.28)'},
  I2C:  {c:'#9898d8',bg:'rgba(152,152,216,.11)',bd:'rgba(152,152,216,.28)'},
  UART: {c:'#cc6888',bg:'rgba(204,104,136,.11)',bd:'rgba(204,104,136,.28)'},
  USART:{c:'#cc6888',bg:'rgba(204,104,136,.11)',bd:'rgba(204,104,136,.28)'},
  PWM:  {c:'#50c8c8',bg:'rgba(80,200,200,.10)', bd:'rgba(80,200,200,.27)'},
  XTAL: {c:'#7090a8',bg:'rgba(112,144,168,.11)',bd:'rgba(112,144,168,.28)'},
  RESET:{c:'#ff9944',bg:'rgba(255,153,68,.12)', bd:'rgba(255,153,68,.30)'},
  TIMER:{c:'#50c8c8',bg:'rgba(80,200,200,.10)', bd:'rgba(80,200,200,.27)'},
  INT:  {c:'#c8a850',bg:'rgba(200,168,80,.12)', bd:'rgba(200,168,80,.30)'},
  ACMP: {c:'#ff9944',bg:'rgba(255,153,68,.12)', bd:'rgba(255,153,68,.30)'},
  COMP: {c:'#ff9944',bg:'rgba(255,153,68,.12)', bd:'rgba(255,153,68,.30)'},
  AVCC: {c:'#9898d8',bg:'rgba(152,152,216,.11)',bd:'rgba(152,152,216,.28)'},
  USB:  {c:'#a78bfa',bg:'rgba(167,139,250,.11)',bd:'rgba(167,139,250,.28)'},
};
function cl(t){ return COLORS[t] || COLORS.GPIO; }

// ── Filter definitions (per function category) ───────────────
var FCLR = {
  GPIO:'#78c878',PWM:'#50c8c8',ADC:'#c8a850',
  SPI:'#4a9aee',I2C:'#9898d8',UART:'#cc6888',USART:'#cc6888',
  TIMER:'#50c8c8',INT:'#c8a850',XTAL:'#7090a8',
  COMP:'#ff9944',USB:'#a78bfa',RESET:'#ff9944',PWR:'#ff6b6b',GND:'#a8a8a8'
};

var NS = 'http://www.w3.org/2000/svg';

// ============================================================
// PUBLIC API
// ============================================================
var ICExplorer = {};

ICExplorer.init = function(cfg){
  var C = cfg;           // shorthand
  var PINS = C.pins;
  var ALT  = C.altFuncs || {};

  // Build filter list from actual pin funcs + types present
  var funcSet = {}, typeSet = {};
  PINS.forEach(function(p){
    p.funcs.forEach(function(f){ funcSet[f] = true; });
    typeSet[p.type] = true;
  });
  var FILTS = [];
  ['GPIO','PWM','ADC','SPI','I2C','UART','USART','TIMER','INT','XTAL','COMP','USB','RESET','PWR','GND'].forEach(function(k){
    if(funcSet[k] || typeSet[k]){
      FILTS.push({l:k, k:k, fn:function(kk){ return function(p){ return p.funcs.indexOf(kk)>=0 || p.type===kk; }; }(k)});
    }
  });

  // ── SVG helpers ──────────────────────────────────────────
  function mk(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
  function ap(p,c){p.appendChild(c);return c;}

  // ── SVG setup ────────────────────────────────────────────
  var svg = document.getElementById('A13');
  // Add to the DIP config handling section
function getDipConfig(package, pinCount) {
  // Handle different DIP sizes
  if (pinCount === 8) {
    return {
      pinsPerSide: 4,
      bodyX: 62,      // Centered for 8-pin
      bodyY: 20,
      bodyW: 76,
      bodyH: 98,
      notchX: 10,     // Pin 1 notch position
      notchY: 10
    };
  } else if (pinCount === 28) {
    return {
      pinsPerSide: 14,
      bodyX: 100,
      bodyY: 25,
      bodyW: 160,
      bodyH: 490
    };
  } else {
    // Default DIP-40
    return {
      pinsPerSide: 20,
      bodyX: 122,
      bodyY: 25,
      bodyW: 260,
      bodyH: 700
    };
  }
}
  var dip = C.dipConfig || getDipConfig(C.package, C.pinCount);
  var BX=dip.bodyX, BY=dip.bodyY, BW=dip.bodyW, BH=dip.bodyH, SIDE=dip.pinsPerSide;
  var PL=34, PW2=16, PITCH=BH/SIDE;

  svg.setAttribute('viewBox','0 0 '+(BX*2+BW)+' '+(BY*2+BH));
  svg.setAttribute('width','100%');svg.setAttribute('height','100%');

  // Defs
  var defs=ap(svg,mk('defs',{}));
  var gf=mk('filter',{id:'glow',x:'-80%',y:'-80%',width:'260%',height:'260%'});
  ap(gf,mk('feGaussianBlur',{stdDeviation:'3',result:'b'}));
  var fm=mk('feMerge',{});ap(fm,mk('feMergeNode',{in:'b'}));ap(fm,mk('feMergeNode',{in:'SourceGraphic'}));
  gf.appendChild(fm);defs.appendChild(gf);
  var icg=mk('linearGradient',{id:'icBody',x1:'0%',y1:'0%',x2:'100%',y2:'100%'});
  ap(icg,mk('stop',{offset:'0%','stop-color':'#1e2430'}));
  ap(icg,mk('stop',{offset:'100%','stop-color':'#0d1018'}));
  defs.appendChild(icg);

  // IC body
  ap(svg,mk('rect',{x:BX,y:BY,width:BW,height:BH,rx:'6',fill:'url(#icBody)',stroke:'none'}));
  // Pin-1 notch
  ap(svg,mk('circle',{cx:BX+14,cy:BY+14,r:'8',fill:'#2a3040',stroke:'#4a5568','stroke-width':'1.5',opacity:'0.9'}));
  ap(svg,mk('circle',{cx:BX+14,cy:BY+14,r:'4',fill:'#5a6478',opacity:'0.7'}));
  var CX=BX+BW/2,CY=BY+BH/2;
  var mfr = C.manufacturer || 'MICROCHIP';
  ap(svg,mk('text',{x:CX,y:CY-60,fill:'#3a4a5a','font-family':'monospace','font-size':'16','font-weight':'bold','text-anchor':'middle'})).textContent=mfr;
  ap(svg,mk('text',{x:CX,y:CY-14,fill:'#4a5c70','font-family':'monospace','font-size':'34','font-weight':'bold','text-anchor':'middle'})).textContent=C.partName;
  ap(svg,mk('text',{x:CX,y:CY+20,fill:'#2a3a48','font-family':'monospace','font-size':'20','text-anchor':'middle'})).textContent=C.package;
  ap(svg,mk('text',{x:CX,y:CY+46,fill:'#1e2a38','font-family':'monospace','font-size':'14','text-anchor':'middle'})).textContent=C.pinCount+' PINS';

  // Compute positions
  PINS.forEach(function(pin){
    var n = pin.num;
    if(n >= 1 && n <= SIDE){
      var slot = n-1;
      var cy = BY + slot*PITCH + PITCH/2;
      pin._px = BX-PL; pin._py = cy-PW2/2; pin._side='left';
    } else {
      // Right side: use explicit _rightSlot if set, otherwise derive from num
      var slot = (pin._rightSlot !== undefined) ? pin._rightSlot : (C.pinCount - n);
      var cy = BY + slot*PITCH + PITCH/2;
      pin._px = BX+BW; pin._py = cy-PW2/2; pin._side='right';
    }
  });

  // Draw pins
  var selId=null, listOpen=false, fType=null;

  function drawPin(pin){
    var col=cl(pin.type);
    var g=mk('g',{'class':'a13-pin','data-id':pin.id});
    g.style.cursor='pointer';
    var px=pin._px,py=pin._py,cx=px+PL/2,cy=py+PW2/2;
    var sq=mk('rect',{x:px,y:py,width:PL,height:PW2,rx:'3',fill:col.bg,stroke:col.c,'stroke-width':'1.6','class':'psq'});
    sq.style.color=col.c; ap(g,sq);
    var lb=mk('text',{x:String(cx),y:String(cy+4),'text-anchor':'middle',fill:col.c,'font-size':'14','font-family':'monospace','font-weight':'bold','pointer-events':'none'});
    lb.textContent=String(pin.num); ap(g,lb);
    ap(g,mk('rect',{x:px-5,y:py-5,width:PL+10,height:PW2+10,fill:'transparent'}));
    g.addEventListener('click',function(e){e.stopPropagation();pick(pin.id);});
    g.addEventListener('mouseenter',function(e){hoverPin(g,pin,true);showTT(pin,e);});
    g.addEventListener('mousemove',moveTT);
    g.addEventListener('mouseleave',function(){hoverPin(g,pin,false);hideTT();});
    svg.appendChild(g);
    // Pin label outside body
    var GAP=6, labelY=py-GAP;
    var sk=mk('text',{x:'0',y:'0','text-anchor':'middle','dominant-baseline':'auto',
      fill:'rgba(160,215,255,0.92)','font-size':'11','font-family':'monospace','font-weight':'bold',
      'pointer-events':'none',transform:'translate('+cx+','+labelY+')'});
    sk.textContent=pin.lbl; svg.appendChild(sk);
  }

  PINS.forEach(drawPin);
  ap(svg,mk('rect',{x:BX,y:BY,width:BW,height:BH,rx:'4',fill:'none',stroke:'#2a3545','stroke-width':'2.5'}));

  // ── Hover state ──────────────────────────────────────────
  function hoverPin(g,p,on){
    var sq=g.querySelector('.psq'),col=cl(p.type);
    if(on){sq.setAttribute('fill',col.c);sq.setAttribute('stroke-width','2.5');sq.setAttribute('filter','url(#glow)');g.querySelector('text').setAttribute('fill','#020810');}
    else if(selId===p.id){sq.setAttribute('fill',col.c);sq.setAttribute('stroke',col.c);sq.setAttribute('stroke-width','2.5');sq.setAttribute('filter','url(#glow)');g.querySelector('text').setAttribute('fill','#020810');}
    else{sq.setAttribute('fill',col.bg);sq.setAttribute('stroke',col.c);sq.setAttribute('stroke-width','1.3');sq.removeAttribute('filter');g.querySelector('text').setAttribute('fill',col.c);}
  }

  // ── Board update ─────────────────────────────────────────
  function matches(p){
    if(!fType) return true;
    var f=FILTS.filter(function(x){return x.k===fType;})[0];
    return f?f.fn(p):true;
  }

  function upBoard(){
    var hf=!!fType;
    document.querySelectorAll('.a13-pin').forEach(function(g){
      var p=PINS.filter(function(x){return x.id===g.dataset.id;})[0];if(!p)return;
      var col=cl(p.type),sq=g.querySelector('.psq'),act=selId===p.id,mt=matches(p);
      if(act){sq.setAttribute('fill',col.c);sq.setAttribute('stroke',col.c);sq.setAttribute('stroke-width','2.5');sq.setAttribute('filter','url(#glow)');g.querySelector('text').setAttribute('fill','#020810');g.style.opacity='1';}
      else if(hf&&!mt){sq.setAttribute('fill','rgba(4,8,20,0.5)');sq.setAttribute('stroke','rgba(20,30,60,0.3)');sq.setAttribute('stroke-width','0.8');sq.removeAttribute('filter');g.querySelector('text').setAttribute('fill','rgba(30,45,80,0.3)');g.style.opacity='0.1';}
      else if(hf&&mt){var fcol=FCLR[fType]||col.c;sq.setAttribute('fill',fcol);sq.setAttribute('stroke',fcol);sq.setAttribute('stroke-width','2');sq.setAttribute('filter','url(#glow)');g.querySelector('text').setAttribute('fill','#020810');g.style.opacity='1';}
      else{sq.setAttribute('fill',col.bg);sq.setAttribute('stroke',col.c);sq.setAttribute('stroke-width','1.3');sq.removeAttribute('filter');g.querySelector('text').setAttribute('fill',col.c);g.style.opacity='1';}
    });
  }

  // ── Detail panel ─────────────────────────────────────────
  function pick(id){selId=(selId===id)?null:id;upBoard();upDetail();upList();}

  function upDetail(){
    var em=document.getElementById('awEMPTY'),dc=document.getElementById('awDC');
    if(!selId){em.style.display='block';dc.className='aw-dc';return;}
    var p=PINS.filter(function(x){return x.id===selId;})[0];if(!p)return;
    var col=cl(p.type);
    em.style.display='none';dc.className='aw-dc show';
    var b=document.getElementById('awBADGE');
    b.style.background=col.bg;b.style.borderColor=col.c;b.style.color=col.c;
    b.innerHTML='<span class="aw-dbadge-num">#'+p.num+'</span><span>'+p.lbl+'</span>';
    var di=document.getElementById('awDID');di.style.color=col.c;di.textContent=p.id;
    document.getElementById('awDFULL').textContent=p.name;
    document.getElementById('awFUNCS').innerHTML=p.funcs.map(function(f){var fc=cl(f)||col;return '<span class="aw-chip" style="background:'+fc.bg+';color:'+fc.c+';border-color:'+fc.bd+'">'+f+'</span>';}).join('');
    document.getElementById('awIGRID').innerHTML=
      '<div class="aw-icell"><span class="aw-ilbl">Pin</span><span class="aw-ival">#'+p.num+'</span></div>'+
      '<div class="aw-icell"><span class="aw-ilbl">Type</span><span class="aw-ival" style="color:'+col.c+'">'+p.type+'</span></div>'+
      '<div class="aw-icell"><span class="aw-ilbl">Voltage</span><span class="aw-ival">'+p.volt+'</span></div>'+
      '<div class="aw-icell"><span class="aw-ilbl">Max mA</span><span class="aw-ival">'+p.curr+'</span></div>';
    var alts=ALT[p.id]||[],as=document.getElementById('awALTS');
    if(alts.length){as.style.display='block';document.getElementById('awACHIPS').innerHTML=alts.map(function(a){return '<span class="aw-ac">'+a+'</span>';}).join('');}
    else as.style.display='none';
    document.getElementById('awNOTE').innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6a9fb5" stroke-width="2.5" style="vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/></svg>'+p.note;
  }

  // ── Pin list ─────────────────────────────────────────────
  function upList(){
    var ps=PINS.filter(matches);
    document.getElementById('awROWS').innerHTML=ps.map(function(p){
      var col=cl(p.type),on=selId===p.id;
      return '<div class="aw-prow'+(on?' on':'')+'" data-id="'+p.id+'" onclick="ICExplorer._pick(\''+p.id+'\')">'
        +'<div class="aw-pbadge" style="background:'+col.bg+';color:'+col.c+';border:1px solid '+col.bd+'">'+p.lbl.substring(0,4)+'</div>'
        +'<div class="aw-pname">'+p.name+'</div>'
        +'<span class="aw-ptag" style="background:'+col.bg+';color:'+col.c+'">'+p.type+'</span>'
        +'</div>';
    }).join('');
    document.getElementById('awCNT').textContent=ps.length+(ps.length<PINS.length?' / '+PINS.length:'');
  }

  // ── Filter buttons ───────────────────────────────────────
  function buildBtns(){
    document.getElementById('awFBTNS').innerHTML=FILTS.map(function(f){
      var c=FCLR[f.k]||'#78c878',on=fType===f.k;
      return '<button class="aw-fb'+(on?' on':'')+'" data-k="'+f.k+'" style="color:'+c+';background:'+(on?'#0d1117':'#1c2128')+';border-color:'+(on?c:'rgba(255,255,255,.12)')+'">'+f.l+'</button>';
    }).join('');
    document.querySelectorAll('.aw-fb').forEach(function(b){
      b.addEventListener('click',function(){fType=(fType===b.dataset.k)?null:b.dataset.k;buildBtns();upBoard();upList();});
    });
  }

  // ── Legend ───────────────────────────────────────────────
  (function(){
    var ts=[];PINS.forEach(function(p){if(ts.indexOf(p.type)<0)ts.push(p.type);});
    document.getElementById('awLEG').innerHTML=ts.map(function(t){var c=cl(t);return '<div class="aw-li"><span class="aw-ld" style="background:'+c.c+'"></span>'+t+'</div>';}).join('');
  })();

  buildBtns();upList();
  document.getElementById('awCNT').textContent=PINS.length;

  // ── Global callbacks (for onclick in HTML) ────────────────
  ICExplorer._pick = pick;

  // ── Tooltip ──────────────────────────────────────────────
  var TT=document.getElementById('awTT');
  function showTT(p,e){var col=cl(p.type);TT.innerHTML='<span class="aw-tn" style="color:'+col.c+'">#'+p.num+' '+p.id+'</span><span class="aw-td">'+p.funcs.join(' · ')+' | '+p.volt+'</span>';TT.className='aw-tt show';moveTT(e);}
  function moveTT(e){var r=document.getElementById('a13wrap').getBoundingClientRect();var x=e.clientX-r.left+14,y=e.clientY-r.top-8;if(x+270>r.width)x=e.clientX-r.left-280;if(y+80>r.height)y=e.clientY-r.top-90;TT.style.left=x+'px';TT.style.top=y+'px';}
  function hideTT(){TT.className='aw-tt';}
  document.addEventListener('click',function(){if(selId){selId=null;upBoard();upDetail();upList();}});

  // ── Toggle pin list ───────────────────────────────────────
  window.awTogList=function(){
    listOpen=!listOpen;
    document.getElementById('awPLIST').className='aw-plist'+(listOpen?' open':'');
    document.getElementById('awTICON').textContent=listOpen?'▲ HIDE':'▼ SHOW';
  };

  // ============================================================
  // MAIN TAB SWITCHING
  // ============================================================
  var screenIC=document.getElementById('awScreenIC');
  var screenCanvas=document.getElementById('awScreenCanvas');
  var screenDS=document.getElementById('awScreenDS');
  var screenLabel=document.getElementById('awScreenLabel');

  function showScreen(mode){
    screenIC.style.display='none';
    screenCanvas.style.display='none';
    screenDS.style.display='none';
    if(mode==='ic') screenIC.style.display='flex';
    else if(mode==='canvas') screenCanvas.style.display='flex';
    else if(mode==='ds') screenDS.style.display='block';
  }

  function showCtrl(id){
    ['ctrl-pin','ctrl-design','ctrl-ds'].forEach(function(k){
      var el=document.getElementById(k);
      el.style.display=(k===id)?'flex':'none';
    });
  }

  document.querySelectorAll('.aw-mtab').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('.aw-mtab').forEach(function(b){b.classList.remove('on');});
      this.classList.add('on');
      var mt=this.getAttribute('data-mt');
      if(mt==='pin'){showScreen('ic');showCtrl('ctrl-pin');screenLabel.textContent='IC PIN EXPLORER';}
      else if(mt==='design'){
        showScreen('canvas');showCtrl('ctrl-design');
        var cur=document.querySelector('.aw-stab.on');
        var st=cur?cur.getAttribute('data-st'):'schematic';
        setTimeout(function(){activateSubTab(st);},20);
      }
      else if(mt==='ds'){
        showScreen('ds');showCtrl('ctrl-ds');
        screenLabel.textContent='DATASHEET VIEWER';
        if(!window._dsLoaded) loadDSSample();
      }
    });
  });

  // ============================================================
  // DESIGN FILES — Canvas + SnapMagic
  // ============================================================
  var curSubTab='schematic', curSrc='snapeda';
  var canvasEl=document.getElementById('awOutputCanvas');
  var ctx=canvasEl.getContext('2d');
  var canZoom=1,canOX=0,canOY=0,canDrag=false,canLX,canLY;
  var snapData=null;

  var SNAP_URL='https://www.snapeda.com/api/v1/parts/search?q='+encodeURIComponent(C.partMPN||C.partName)+'&search-type=parts';

  function setStatus(msg,state){
    var colors={loading:'#c8a850',ok:'#50c8a0',warn:'#ff9944',error:'#ff6b6b'};
    var icons={
      loading:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="16.24" y1="7.76" x2="12" y2="12"/>',
      ok:'<circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>',
      warn:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
      error:'<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
    };
    var c=colors[state]||colors.warn;
    var icon=document.getElementById('awSnapStatusIcon');
    icon.setAttribute('stroke',c);icon.innerHTML=icons[state]||icons.warn;
    var txt=document.getElementById('awSnapStatusTxt');
    txt.textContent=msg;txt.style.color=c;
  }

  function fetchSnapEDA(cb){
    if(snapData){cb(snapData);return;}
    setStatus('Fetching from SnapMagic Search API...','loading');
    fetch(SNAP_URL)
      .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
      .then(function(data){
        var parts=data.results||data.parts||[];
        var match=null,pn=(C.partMPN||C.partName).toUpperCase();
        for(var i=0;i<parts.length;i++){var mpn=(parts[i].mpn||parts[i].part_number||'').toUpperCase();if(mpn.indexOf(pn.split('-')[0])>=0){match=parts[i];break;}}
        if(!match&&parts.length>0)match=parts[0];
        if(match){snapData=match;setStatus('SnapMagic Search — '+(C.partMPN||C.partName)+' — Live Data','ok');showPartMeta(match);cb(match);}
        else throw new Error('Part not found');
      })
      .catch(function(err){
        setStatus('API unavailable — using local render ('+err.message+')','warn');
        curSrc='local';
        document.querySelectorAll('.aw-src-btn').forEach(function(b){
          var isLocal=b.getAttribute('data-src')==='local';
          b.classList.toggle('on',isLocal);
          b.style.background=isLocal?'rgba(80,200,160,0.12)':'transparent';
          b.style.color=isLocal?'#50c8a0':'#8b949e';
          b.style.borderColor=isLocal?'rgba(80,200,160,0.3)':'transparent';
        });
        activateSubTab(curSubTab,true);
      });
  }

  function showPartMeta(part){
    var meta=document.getElementById('awPartMeta');
    meta.style.display='block';
    document.getElementById('awPartName').textContent=part.mpn||part.part_number||(C.partMPN||C.partName);
    document.getElementById('awPartDesc').textContent=part.description||((C.manufacturer||'Microchip')+' · '+C.package+' · '+C.partName);
    var b=[],badges=document.getElementById('awPartBadges');
    if(part.has_symbol)b.push(['SYM','80,200,160']);
    if(part.has_footprint)b.push(['FP','200,168,80']);
    if(part.has_3d_model||part['3dmodel_image'])b.push(['3D','74,154,238']);
    if(part.snap_verified)b.push(['VERIFIED','80,200,160']);
    badges.innerHTML=b.map(function(x){return '<span style="padding:2px 7px;border-radius:2px;font-size:10px;font-weight:700;background:rgba('+x[1]+',0.12);color:#'+x[1].split(',').map(function(n){return parseInt(n).toString(16).padStart(2,'0');}).join('')+';border:1px solid rgba('+x[1]+',0.3);">'+x[0]+'</span>';}).join('');
  }

  function drawImageOnCanvas(imgUrl,W,H,label,bgColor){
    ctx.fillStyle=bgColor||'#080d16';ctx.fillRect(0,0,W,H);
    _drawGrid(W,H,bgColor);
    ctx.fillStyle='#3a4a5a';ctx.font='13px monospace';ctx.textAlign='center';
    ctx.fillText('Loading '+label+' from SnapMagic...',W/2,H/2);
    var img=new Image();img.crossOrigin='anonymous';
    img.onload=function(){
      ctx.clearRect(0,0,W,H);ctx.fillStyle=bgColor||'#080d16';ctx.fillRect(0,0,W,H);
      _drawGrid(W,H,bgColor);
      var iw=img.naturalWidth,ih=img.naturalHeight;
      var scale=Math.min((W*0.9)/iw,(H*0.9)/ih)*canZoom;
      var dx=W/2-iw*scale/2+canOX,dy=H/2-ih*scale/2+canOY;
      ctx.drawImage(img,dx,dy,iw*scale,ih*scale);
      ctx.fillStyle='rgba(80,200,160,0.35)';ctx.font='11px monospace';ctx.textAlign='right';
      ctx.fillText('SnapMagic Search',W-8,H-8);
    };
    img.onerror=function(){ctx.clearRect(0,0,W,H);activateSubTab(curSubTab,true);};
    img.src=imgUrl;
  }

  function _drawGrid(W,H,bgColor){
    var gridCol=bgColor&&bgColor.indexOf('0d1b')>=0?'rgba(77,200,77,0.05)':'rgba(77,166,255,0.04)';
    ctx.strokeStyle=gridCol;ctx.lineWidth=0.5;
    for(var x=0;x<W;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(var y=0;y<H;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  }

  function activateSubTab(st,forceLocal){
    curSubTab=st;
    document.querySelectorAll('.aw-stab').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-st')===st);});
    var layerLeg=document.getElementById('awLayerLeg');
    canZoom=1;canOX=0;canOY=0;
    var titles={schematic:'Schematic Symbol',symbol:'Logic Symbol',footprint:'PCB Footprint'};
    document.getElementById('awDesignTitle').textContent=titles[st]||st;
    document.getElementById('awDesignInfo').textContent='';
    screenLabel.textContent=(titles[st]||st).toUpperCase();
    layerLeg.style.display=(st==='footprint')?'block':'none';
    if(st==='footprint') layerLeg.innerHTML='<span style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;"><span style="color:#ef5350;">━</span> Copper &nbsp;<span style="color:#ffd54f;">█</span> Pads &nbsp;<span style="color:#ff9800;">- -</span> Courtyard &nbsp;<span style="color:#fffde7;">─</span> Silk</span>';
    var W=screenCanvas.getBoundingClientRect().width||screenCanvas.offsetWidth||600;
    var H=Math.round(W*0.7);
    canvasEl.width=W;canvasEl.height=H;
    var useLocal=(forceLocal===true)||(curSrc==='local');
    if(!useLocal){
      fetchSnapEDA(function(part){
        var imgKey={schematic:'symbol_image',symbol:'symbol_image',footprint:'footprint_image'};
        var bgCol={schematic:'#080d16',symbol:'#080d16',footprint:'#0d1b0d'};
        var url=part[imgKey[st]];
        if(url) drawImageOnCanvas(url,W,H,titles[st],bgCol[st]);
        else{setStatus('No '+st+' image in API — using local render','warn');drawSubTabLocal(st,W,H);}
      });
    } else {
      drawSubTabLocal(st,W,H);
    }
  }

  function drawSubTabLocal(st,W,H){
    ctx.clearRect(0,0,W,H);
    if(st==='schematic') _drawSchematic(W,H);
    else if(st==='symbol') _drawSymbol(W,H);
    else if(st==='footprint') _drawFootprint(W,H);
  }

  document.querySelectorAll('.aw-stab').forEach(function(btn){
    btn.addEventListener('click',function(){activateSubTab(this.getAttribute('data-st'));});
  });

  document.querySelectorAll('.aw-src-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      curSrc=this.getAttribute('data-src');
      document.querySelectorAll('.aw-src-btn').forEach(function(b){
        var active=b.getAttribute('data-src')===curSrc;
        b.style.background=active?'rgba(80,200,160,0.12)':'transparent';
        b.style.color=active?'#50c8a0':'#8b949e';
        b.style.borderColor=active?'rgba(80,200,160,0.3)':'transparent';
      });
      if(curSrc==='local'){document.getElementById('awPartMeta').style.display='none';setStatus('Local render mode — no API call','warn');}
      else snapData=null;
      activateSubTab(curSubTab);
    });
  });

  document.getElementById('awBtnSnapEDA').addEventListener('click',function(){window.open(C.snapPageURL,'_blank');});
  document.getElementById('awBtnDownload').addEventListener('click',function(){window.open(C.downloadURL,'_blank');});

  // Canvas zoom/pan
  function canZoomFn(f,cx,cy){
    cx=cx||canvasEl.width/2;cy=cy||canvasEl.height/2;
    canOX=cx-(cx-canOX)*f;canOY=cy-(cy-canOY)*f;
    canZoom*=f;canZoom=Math.max(0.15,Math.min(8,canZoom));
    _redrawCanvas();
  }
  function _redrawCanvas(){
    if(curSrc==='snapeda'&&snapData){
      var imgKey={schematic:'symbol_image',symbol:'symbol_image',footprint:'footprint_image'};
      var bgCol={schematic:'#080d16',symbol:'#080d16',footprint:'#0d1b0d'};
      var url=snapData[imgKey[curSubTab]];
      if(url){drawImageOnCanvas(url,canvasEl.width,canvasEl.height,curSubTab,bgCol[curSubTab]);return;}
    }
    drawSubTabLocal(curSubTab,canvasEl.width,canvasEl.height);
  }
  document.getElementById('awCanZoomIn').addEventListener('click',function(){canZoomFn(1.25);});
  document.getElementById('awCanZoomOut').addEventListener('click',function(){canZoomFn(0.8);});
  document.getElementById('awCanReset').addEventListener('click',function(){canZoom=1;canOX=0;canOY=0;activateSubTab(curSubTab);});
  canvasEl.addEventListener('wheel',function(e){
    e.preventDefault();
    var r=canvasEl.getBoundingClientRect(),rx=canvasEl.width/r.width,ry=canvasEl.height/r.height;
    canZoomFn(e.deltaY<0?1.15:0.87,(e.clientX-r.left)*rx,(e.clientY-r.top)*ry);
  },{passive:false});
  canvasEl.addEventListener('mousedown',function(e){canDrag=true;canLX=e.clientX;canLY=e.clientY;});
  canvasEl.addEventListener('mouseup',function(){canDrag=false;});
  canvasEl.addEventListener('mouseleave',function(){canDrag=false;});
  canvasEl.addEventListener('mousemove',function(e){
    if(!canDrag)return;
    var r=canvasEl.getBoundingClientRect(),rx=canvasEl.width/r.width,ry=canvasEl.height/r.height;
    canOX+=(e.clientX-canLX)*rx;canOY+=(e.clientY-canLY)*ry;canLX=e.clientX;canLY=e.clientY;
    _redrawCanvas();
  });

  // ── Local draw routines (generic — work for any DIP IC) ──

  function _drawSchematic(W,H){
    ctx.fillStyle='#080d16';ctx.fillRect(0,0,W,H);
    ctx.save();ctx.translate(canOX,canOY);ctx.scale(canZoom,canZoom);
    _drawGrid(W/canZoom,H/canZoom,'#080d16');
    var ix=70,iy=14,iw=W/canZoom-140,ih=H/canZoom-28;
    ctx.fillStyle='#0a0e16';ctx.strokeStyle='#3a6080';ctx.lineWidth=1.5;
    ctx.fillRect(ix,iy,iw,ih);ctx.strokeRect(ix,iy,iw,ih);
    ctx.fillStyle='#4da6ff';ctx.beginPath();ctx.arc(ix+8,iy+8,3,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#4da6ff';ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillText('U1',ix+iw/2,iy+14);
    ctx.fillStyle='#3a5a70';ctx.font='bold 16px monospace';ctx.fillText(C.partName,ix+iw/2,iy+32);
    ctx.fillStyle='#2a3a48';ctx.font='10px monospace';ctx.fillText(C.package+' · '+C.pinCount+' pins',ix+iw/2,iy+46);
    // Group pins by type
    var grpMap={};
    PINS.forEach(function(p){
      var k=p.type;
      if(!grpMap[k])grpMap[k]={n:k,c:cl(k).c,ps:[]};
      grpMap[k].ps.push(p.lbl+(p.num?'('+p.num+')':''));
    });
    var py=62,lineH=13;
    Object.keys(grpMap).forEach(function(k){
      var grp=grpMap[k];
      if(py>iy+ih-12)return;
      ctx.fillStyle=grp.c;ctx.font='bold 8px monospace';ctx.textAlign='left';ctx.fillText(grp.n,ix+5,py);
      ctx.strokeStyle=grp.c;ctx.lineWidth=0.3;ctx.globalAlpha=0.2;
      ctx.beginPath();ctx.moveTo(ix+5,py+2);ctx.lineTo(ix+iw-5,py+2);ctx.stroke();ctx.globalAlpha=1;
      py+=10;
      grp.ps.slice(0,6).forEach(function(pn){
        if(py>iy+ih-8)return;
        ctx.strokeStyle=grp.c;ctx.lineWidth=0.7;
        ctx.beginPath();ctx.moveTo(ix-14,py-3);ctx.lineTo(ix,py-3);ctx.stroke();
        ctx.fillStyle=grp.c;ctx.font='7px monospace';ctx.textAlign='end';ctx.fillText(pn.split('/')[0],ix-16,py);
        py+=lineH;
      });py+=3;
    });
    ctx.restore();
  }

  function _drawSymbol(W,H){
    ctx.fillStyle='#080d16';ctx.fillRect(0,0,W,H);
    ctx.save();ctx.translate(canOX,canOY);ctx.scale(canZoom,canZoom);
    var cw=W/canZoom,ch=H/canZoom;
    _drawGrid(cw,ch,'#080d16');
    var bx=cw/2-60,by=ch/2-80,bw=120,bh=160;
    ctx.fillStyle='#0a0e18';ctx.strokeStyle='#4da6ff';ctx.lineWidth=1.8;
    ctx.fillRect(bx,by,bw,bh);ctx.strokeRect(bx,by,bw,bh);
    ctx.fillStyle='#4da6ff';ctx.font='bold 11px Orbitron,monospace';ctx.textAlign='center';ctx.fillText(C.partName,bx+bw/2,by+18);
    ctx.fillStyle='#8b949e';ctx.font='9px monospace';ctx.fillText(C.package+' MCU',bx+bw/2,by+32);
    // type groups
    var types=[],seen={};PINS.forEach(function(p){if(!seen[p.type]){types.push(p.type);seen[p.type]=true;}});
    var yy=by+52,step=28;
    types.slice(0,4).forEach(function(t){
      var col=cl(t);
      ctx.fillStyle=col.c;ctx.globalAlpha=0.10;ctx.fillRect(bx+8,yy-9,bw-16,20);ctx.globalAlpha=1;
      ctx.strokeStyle=col.c;ctx.lineWidth=0.7;ctx.strokeRect(bx+8,yy-9,bw-16,20);
      ctx.fillStyle=col.c;ctx.font='bold 8px monospace';ctx.textAlign='center';ctx.fillText(t,bx+bw/2,yy+4);
      ctx.strokeStyle=col.c;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(bx-12,yy+1);ctx.lineTo(bx+8,yy+1);ctx.stroke();
      ctx.beginPath();ctx.moveTo(bx+bw-8,yy+1);ctx.lineTo(bx+bw+12,yy+1);ctx.stroke();
      yy+=step;
    });
    ctx.restore();
  }

  function _drawFootprint(W,H){
    ctx.fillStyle='#0d1b0d';ctx.fillRect(0,0,W,H);
    ctx.save();ctx.translate(canOX,canOY);ctx.scale(canZoom,canZoom);
    var cw=W/canZoom,ch=H/canZoom;
    _drawGrid(cw,ch,'#0d1b0d');
    var bw2=cw*0.28,bh2=ch*0.75,bx=(cw-bw2)/2,by=(ch-bh2)/2;
    ctx.fillStyle='#0a1208';ctx.strokeStyle='#fffde7';ctx.lineWidth=0.7;
    ctx.fillRect(bx,by,bw2,bh2);ctx.strokeRect(bx,by,bw2,bh2);
    ctx.strokeStyle='rgba(255,152,0,0.5)';ctx.lineWidth=0.4;ctx.setLineDash([3,3]);
    ctx.strokeRect(bx-20,by-10,bw2+40,bh2+20);ctx.setLineDash([]);
    ctx.fillStyle='#ff9800';ctx.beginPath();ctx.arc(bx+8,by+8,4,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(100,180,100,0.4)';ctx.font='bold '+(bw2*0.18)+'px monospace';ctx.textAlign='center';
    ctx.fillText(C.partName.split(/\d/)[0],bx+bw2/2,by+bh2/2-10);
    ctx.fillStyle='rgba(77,120,77,0.3)';ctx.font=(bw2*0.14)+'px monospace';
    ctx.fillText(C.partName.replace(/[A-Z]+/,''),bx+bw2/2,by+bh2/2+12);
    ctx.fillStyle='rgba(60,100,60,0.25)';ctx.font=(bw2*0.10)+'px monospace';
    ctx.fillText(C.package,bx+bw2/2,by+bh2/2+32);
    var padLen=14,padW=5,pitch=bh2/SIDE;
    ctx.fillStyle='#ffd54f';
    for(var i=0;i<SIDE;i++){
      var pos=i*pitch+pitch/2;
      ctx.fillRect(bx-padLen-2,by+pos-padW/2,padLen,padW);
      ctx.fillRect(bx+bw2+2,by+pos-padW/2,padLen,padW);
    }
    ctx.fillStyle='#ff9800';ctx.beginPath();ctx.arc(bx-padLen-8,by+pitch/2,3,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }

  // ============================================================
  // DATASHEET TAB
  // ============================================================
  function _section(title,rows){
    return '<div style="font-size:16px;color:#c8a850;font-weight:700;letter-spacing:.1em;margin:14px 0 6px;text-transform:uppercase;">'+title+'</div><div style="background:#0d1117;border:1px solid #21262d;border-radius:4px;overflow:hidden;">'+rows.join('')+'</div>';
  }
  function _row(p,v,color){
    return '<div style="display:flex;justify-content:space-between;padding:4px 9px;border-bottom:1px solid #1a2030;font-size:16px;"><span style="color:#8b949e;">'+p+'</span><span style="color:'+(color||'#e6edf3')+';font-weight:700;">'+v+'</span></div>';
  }
  function _feat(t){
    return '<div style="padding:4px 9px;border-bottom:1px solid #1a2030;font-size:16px;color:#8b949e;display:flex;gap:6px;align-items:flex-start;"><span style="color:#4da6ff;flex-shrink:0;font-size:14px;">&#10003;</span>'+t+'</div>';
  }

  function loadDSSample(){
    window._dsLoaded=true;
    var el=document.getElementById('awDSContent');
    var html='<div style="font-family:Orbitron,sans-serif;font-size:16px;color:#50c8a0;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #21262d;">'+C.partName+' — Quick Reference</div>';
    if(C.dsSpecs&&C.dsSpecs.length){
      html+=_section('SPECIFICATIONS',C.dsSpecs.map(function(r){return _row(r.label,r.value,r.color);}));
    }
    if(C.dsFeatures&&C.dsFeatures.length){
      html+=_section('KEY FEATURES',C.dsFeatures.map(_feat));
    }
    el.innerHTML=html;
  }

  document.getElementById('awLoadSample').addEventListener('click',loadDSSample);

  // Quick specs panel
  if(C.quickSpecs&&C.quickSpecs.length){
    var qsEl=document.getElementById('awDsQuickBody');
    if(qsEl){
      qsEl.innerHTML=C.quickSpecs.map(function(r){
        return '<div style="border-bottom:1px solid rgb(33,38,45);display:flex;justify-content:space-between;padding:2px 0;"><span>'+r.label+'</span><span style="color:'+(r.color||'#e0e5ec')+';font-weight:700;">'+r.value+'</span></div>';
      }).join('');
    }
  }

  // PDF upload
  var inp=document.getElementById('awPdfInput');
  if(inp){
    inp.addEventListener('change',function(e){
      if(!e.target.files.length)return;
      var file=e.target.files[0];
      document.getElementById('awFileInfo').textContent='📎 '+file.name;
      document.getElementById('awProgress').style.display='block';
      document.getElementById('awProgressBar').style.width='0%';
      if(typeof pdfjsLib==='undefined'){loadDSSample();return;}
      var reader=new FileReader();
      reader.onload=function(){
        var arr=new Uint8Array(this.result);
        pdfjsLib.getDocument(arr).promise.then(function(pdf){
          var txt='',done=0;
          for(var i=1;i<=pdf.numPages;i++){
            pdf.getPage(i).then(function(pg){return pg.getTextContent();}).then(function(tc){
              txt+=tc.items.map(function(x){return x.str;}).join(' ')+'\n';
              done++;document.getElementById('awProgressBar').style.width=(done/pdf.numPages*100)+'%';
              if(done===pdf.numPages){_loadDSFromText(txt);document.getElementById('awProgress').style.display='none';}
            });
          }
        }).catch(loadDSSample);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  function _loadDSFromText(text){
    window._dsLoaded=true;
    var flash=text.match(/(\d+)\s*K.*flash/i)?RegExp.$1+' KB':'?';
    var freq=text.match(/(\d+)\s*MHz/i)?RegExp.$1+' MHz':'?';
    document.getElementById('awDSContent').innerHTML=
      '<div style="font-size:14px;color:#27ae60;margin-bottom:10px;padding:5px 8px;background:rgba(39,174,96,0.1);border-radius:3px;border:1px solid rgba(39,174,96,0.2);">✓ PDF parsed successfully</div>'+
      _section('EXTRACTED FROM PDF',[_row('Flash',flash),_row('Max Freq',freq)])+
      _section('KNOWN SPECIFICATIONS',(C.dsSpecs||[]).map(function(r){return _row(r.label,r.value,r.color);}));
    document.getElementById('awNewUpload').style.display='inline-block';
  }

  document.getElementById('awNewUpload').addEventListener('click',function(){
    document.getElementById('awDSContent').innerHTML='';window._dsLoaded=false;
    document.getElementById('awFileInfo').textContent='No file selected';
    document.getElementById('awNewUpload').style.display='none';
    if(inp)inp.value='';
  });

}; // end ICExplorer.init

global.ICExplorer = ICExplorer;
})(window);
