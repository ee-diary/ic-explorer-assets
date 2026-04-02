// ============================================================
//  boards/teensy41-board.js
//  Teensy 4.1 — Board geometry & SVG drawing
//
//  Draws the PCB outline, all on-board components, pin pad
//  strips, and silk labels into a provided <svg> element.
//
//  Exports: window.Teensy41Board
//  Interface:
//    Teensy41Board.draw(svg, config)
//      svg    — the <svg> DOM element to draw into
//      config — window.IC_CONFIG (reads boardConfig + pins)
// ============================================================

(function(global){
'use strict';

// ── SVG helpers ──────────────────────────────────────────────
var NS = 'http://www.w3.org/2000/svg';

function mk(tag, attrs) {
  var el = document.createElementNS(NS, tag);
  for (var k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}
function txt(str, attrs) {
  var el = mk('text', attrs);
  el.textContent = str;
  return el;
}
function app(parent, child) { parent.appendChild(child); return child; }

// ── Gradient / filter factory ────────────────────────────────
function linGrad(defs, id, x1, y1, x2, y2, stops) {
  var g = mk('linearGradient', {id:id, x1:x1, y1:y1, x2:x2, y2:y2});
  stops.forEach(function(s) {
    var st = mk('stop', {offset:s[0]});
    st.setAttribute('stop-color', s[1]);
    g.appendChild(st);
  });
  defs.appendChild(g);
}

// ── SMD passive helpers ──────────────────────────────────────
function smdR(parent, x, y, w, h) {
  // Resistor — dark brown body with silver end caps
  app(parent, mk('rect', {x:x,            y:y, width:h*0.65, height:h, rx:'0.5', fill:'url(#t41SilvG)', stroke:'#888', 'stroke-width':'0.3'}));
  app(parent, mk('rect', {x:x+w-h*0.65,   y:y, width:h*0.65, height:h, rx:'0.5', fill:'url(#t41SilvG)', stroke:'#888', 'stroke-width':'0.3'}));
  app(parent, mk('rect', {x:x+h*0.55,     y:y, width:Math.max(1, w-h*1.1), height:h, rx:'0.7', fill:'#1e1408', stroke:'#141008', 'stroke-width':'0.3'}));
}
function smdC(parent, x, y, w, h) {
  // Capacitor — gold/tan body with silver end caps
  app(parent, mk('rect', {x:x,            y:y, width:h*0.65, height:h, rx:'0.5', fill:'url(#t41SilvG)', stroke:'#888', 'stroke-width':'0.3'}));
  app(parent, mk('rect', {x:x+w-h*0.65,   y:y, width:h*0.65, height:h, rx:'0.5', fill:'url(#t41SilvG)', stroke:'#888', 'stroke-width':'0.3'}));
  app(parent, mk('rect', {x:x+h*0.55,     y:y, width:Math.max(1, w-h*1.1), height:h, rx:'0.7', fill:'#c8a040', stroke:'#a08020', 'stroke-width':'0.3'}));
}

// ── DEFS (gradients, patterns, filters) ─────────────────────
function buildDefs(svg) {
  var defs = app(svg, mk('defs', {}));

  // PCB green gradient
  linGrad(defs, 't41PcbG',  '0','0','1','1', [['0%','#1a3a1a'],['50%','#122810'],['100%','#0c1e0c']]);
  // Chip dark
  linGrad(defs, 't41ChipG', '0','0','1','1', [['0%','#1e1e1e'],['100%','#080808']]);
  // Metal / silver
  linGrad(defs, 't41SilvG', '0','0','0','1', [['0%','#d8d8d8'],['50%','#a8a8a8'],['100%','#787878']]);
  // USB metal
  linGrad(defs, 't41UsbG',  '0','0','1','0', [['0%','#e0e0e0'],['30%','#ffffff'],['60%','#d0d0d0'],['100%','#b0b0b0']]);

  // PCB dot pattern
  var pat = mk('pattern', {id:'t41Dots', width:'16', height:'16', patternUnits:'userSpaceOnUse'});
  app(pat, mk('circle', {cx:'8', cy:'8', r:'0.6', fill:'rgba(100,220,100,0.10)'}));
  defs.appendChild(pat);

  // Glow filter for selected pins
  var filt = mk('filter', {id:'t41PinGlow', x:'-50%', y:'-50%', width:'200%', height:'200%'});
  var fgb  = mk('feGaussianBlur', {stdDeviation:'3.5', result:'blur'});
  filt.appendChild(fgb);
  var fm = mk('feMerge', {});
  app(fm, mk('feMergeNode', {in:'blur'}));
  app(fm, mk('feMergeNode', {in:'SourceGraphic'}));
  filt.appendChild(fm);
  defs.appendChild(filt);
}

// ── PCB BODY ─────────────────────────────────────────────────
function drawPCB(svg, bw, bh) {
  app(svg, mk('rect', {x:'0', y:'0', width:bw, height:bh, rx:'0',
    fill:'url(#t41PcbG)', stroke:'#0a1f0a', 'stroke-width':'2'}));
  app(svg, mk('rect', {x:'0', y:'0', width:bw, height:bh, rx:'0',
    fill:'url(#t41Dots)'}));
  app(svg, mk('rect', {x:'1', y:'1', width:bw-2, height:bh-2, rx:'0',
    fill:'none', stroke:'rgba(100,220,100,0.09)', 'stroke-width':'1'}));
}

// ── USB-C CONNECTOR ──────────────────────────────────────────
function drawUSBC(svg) {
  var ucx=60, ucy=-12, ucw=100, uch=55;
  app(svg, mk('rect', {x:ucx, y:ucy, width:ucw, height:uch, rx:'5',
    fill:'url(#t41UsbG)', stroke:'#999', 'stroke-width':'1.5'}));
  app(svg, mk('rect', {x:ucx+3, y:ucy+3, width:ucw-6, height:uch-6, rx:'3',
    fill:'url(#t41UsbG)'}));
  app(svg, mk('ellipse', {cx:ucx+ucw/2, cy:ucy+uch-7, rx:'16', ry:'9',
    fill:'#111', stroke:'#666', 'stroke-width':'1'}));
  app(svg, txt('USB-C', {fill:'#555', 'font-family':'monospace', 'font-size':'7',
    'text-anchor':'middle', x:''+(ucx+ucw/2), y:''+(ucy+15)}));
}

// ── ON-BOARD CHIPS ───────────────────────────────────────────
function drawChips(svg) {

  // MKL02Z32VFG4 Bootloader MCU
  var mkuW=38, mkuH=36, mkuX=125, mkuY=70;
  var mkuG = app(svg, mk('g', {'class':'t41-chip', 'data-id':'MKL02'}));
  app(mkuG, mk('rect', {x:mkuX, y:mkuY, width:mkuW, height:mkuH, rx:'2',
    fill:'url(#t41ChipG)', stroke:'#2a3a2a', 'stroke-width':'1.2', 'class':'chip-shape'}));
  app(mkuG, mk('circle', {cx:mkuX+6, cy:mkuY+6, r:'2', fill:'#1a2a1a'}));
  app(mkuG, txt('MKL02', {fill:'rgba(255,255,255,0.6)', 'font-family':'monospace',
    'font-size':'5', 'text-anchor':'middle', x:mkuX+mkuW/2, y:mkuY+mkuH/2+2}));

  // TLV75733P LDO regulator
  var ldoW=24, ldoH=28, ldoX=73, ldoY=118;
  var ldoG = app(svg, mk('g', {'class':'t41-chip', 'data-id':'TLV75733P'}));
  for (var i=0; i<3; i++) {
    app(ldoG, mk('rect', {x:ldoX-2, y:ldoY+4+i*8, width:'4', height:'4', rx:'0.5', fill:'url(#t41SilvG)'}));
    app(ldoG, mk('rect', {x:ldoX+ldoW-2, y:ldoY+4+i*8, width:'4', height:'4', rx:'0.5', fill:'url(#t41SilvG)'}));
  }
  app(ldoG, mk('rect', {x:ldoX, y:ldoY, width:ldoW, height:ldoH, rx:'2',
    fill:'url(#t41ChipG)', stroke:'#2a3a2a', 'stroke-width':'1.2', 'class':'chip-shape'}));
  app(ldoG, mk('circle', {cx:ldoX+5, cy:ldoY+5, r:'1.5', fill:'#1a2a1a'}));
  app(ldoG, txt('LDO', {fill:'rgba(255,255,255,0.55)', 'font-family':'monospace',
    'font-size':'5', 'text-anchor':'middle', x:ldoX+ldoW/2, y:ldoY+ldoH/2+2}));

  // DMG2305UX P-Channel MOSFET (SOT-23)
  var fetW=12, fetH=14, fetX=73, fetY=96;
  var fetG = app(svg, mk('g', {'class':'t41-chip', 'data-id':'DMG2305UX'}));
  app(fetG, mk('rect', {x:fetX, y:fetY, width:fetW, height:fetH, rx:'1',
    fill:'url(#t41ChipG)', stroke:'#2a3a2a', 'stroke-width':'1', 'class':'chip-shape'}));
  for (var pi=0; pi<3; pi++) {
    app(fetG, mk('rect', {x:fetX+2+pi*4, y:fetY+fetH, width:'3', height:'4', rx:'0.3', fill:'url(#t41SilvG)'}));
  }

  // TPD3S014 USB protection (SOT-23-6)
  var tpdW=14, tpdH=12, tpdX=155, tpdY=55;
  var tpdG = app(svg, mk('g', {'class':'t41-chip', 'data-id':'TPD3S014'}));
  for (var ti=0; ti<3; ti++) {
    app(tpdG, mk('rect', {x:tpdX+1+ti*4, y:tpdY-3, width:'3', height:'3', rx:'0.3', fill:'url(#t41SilvG)'}));
    app(tpdG, mk('rect', {x:tpdX+1+ti*4, y:tpdY+tpdH, width:'3', height:'3', rx:'0.3', fill:'url(#t41SilvG)'}));
  }
  app(tpdG, mk('rect', {x:tpdX, y:tpdY, width:tpdW, height:tpdH, rx:'1',
    fill:'url(#t41ChipG)', stroke:'#2a3a2a', 'stroke-width':'1', 'class':'chip-shape'}));
  app(tpdG, txt('TPD3S014', {fill:'rgba(255,255,255,0.45)', 'font-family':'monospace',
    'font-size':'5', 'text-anchor':'middle', x:tpdX+tpdW/2, y:tpdY+tpdH/2+2}));

  // DP83825I Ethernet PHY (QFN-32)
  var dpX=132, dpY=188, dpW=32, dpH=32;
  var dpPad=3, dpPitch=4, dpPads=8;
  var dpOff = (dpW-(dpPads-1)*dpPitch)/2;
  var dpG = app(svg, mk('g', {'class':'t41-chip', 'data-id':'DP83825I'}));
  app(dpG, mk('rect', {x:dpX+7, y:dpY+7, width:dpW-14, height:dpH-14, rx:'1',
    fill:'#2a2a2a', stroke:'#3a3a3a', 'stroke-width':'0.6'}));
  app(dpG, mk('rect', {x:dpX, y:dpY, width:dpW, height:dpH, rx:'2',
    fill:'url(#t41ChipG)', stroke:'#2a3a2a', 'stroke-width':'1.2', 'class':'chip-shape'}));
  app(dpG, mk('rect', {x:dpX+3, y:dpY+3, width:dpW-6, height:dpH-6, rx:'1.5',
    fill:'none', stroke:'#252525', 'stroke-width':'0.5', 'stroke-dasharray':'2,2'}));
  app(dpG, mk('circle', {cx:dpX+5, cy:dpY+5, r:'1.8', fill:'#c8d8e8'}));
  for (var di=0; di<dpPads; di++) {
    var dpy = dpY + dpOff + di*dpPitch;
    app(dpG, mk('rect', {x:dpX-4,    y:dpy-dpPad/2, width:'4', height:dpPad, rx:'0.3', fill:'url(#t41SilvG)', stroke:'#bbb', 'stroke-width':'0.35'}));
    app(dpG, mk('rect', {x:dpX+dpW,  y:dpy-dpPad/2, width:'4', height:dpPad, rx:'0.3', fill:'url(#t41SilvG)', stroke:'#bbb', 'stroke-width':'0.35'}));
    var dpx = dpX + dpOff + di*dpPitch;
    app(dpG, mk('rect', {x:dpx-dpPad/2, y:dpY-4,    width:dpPad, height:'4', rx:'0.3', fill:'url(#t41SilvG)', stroke:'#bbb', 'stroke-width':'0.35'}));
    app(dpG, mk('rect', {x:dpx-dpPad/2, y:dpY+dpH,  width:dpPad, height:'4', rx:'0.3', fill:'url(#t41SilvG)', stroke:'#bbb', 'stroke-width':'0.35'}));
  }
  app(dpG, txt('DP83825I', {fill:'rgba(255,255,255,0.85)', 'font-family':'monospace', 'font-size':'5', 'font-weight':'bold', 'text-anchor':'middle', x:dpX+dpW/2, y:dpY+dpH/2-3}));
  app(dpG, txt('ETH PHY',  {fill:'rgba(100,220,100,0.50)', 'font-family':'monospace', 'font-size':'4', 'text-anchor':'middle', x:dpX+dpW/2, y:dpY+dpH/2+5}));

  // iMXRT1062 main processor (centred on board)
  var chipW=140, chipH=128;
  var chipX=Math.round((220-chipW)/2);   // 40
  var chipY=Math.round((600-chipH)/2);   // 236
  var cpuG = app(svg, mk('g', {'class':'t41-chip', 'data-id':'iMXRT1062'}));
  app(cpuG, mk('rect', {x:chipX, y:chipY, width:chipW, height:chipH, rx:'5',
    fill:'url(#t41ChipG)', stroke:'#1a2a1a', 'stroke-width':'2', 'class':'chip-shape'}));
  app(cpuG, mk('rect', {x:chipX+4, y:chipY+4, width:chipW-8, height:chipH-8, rx:'3',
    fill:'none', stroke:'#1a1a1a', 'stroke-width':'1', 'stroke-dasharray':'4,4'}));
  app(cpuG, mk('circle', {cx:chipX+9, cy:chipY+9, r:'3.5', fill:'#1a3a1a'}));
  app(cpuG, txt('iMXRT1062',       {fill:'rgba(255,255,255,0.88)', 'font-family':'monospace', 'font-size':'11', 'font-weight':'bold', 'text-anchor':'middle', x:chipX+chipW/2, y:chipY+chipH/2-18}));
  app(cpuG, txt('IMXRT1062DVJ6B',  {fill:'rgba(255,255,255,0.48)', 'font-family':'monospace', 'font-size':'6',  'text-anchor':'middle', x:chipX+chipW/2, y:chipY+chipH/2-4}));
  app(cpuG, txt('600 MHz Cortex-M7',{fill:'rgba(100,220,100,0.65)','font-family':'monospace', 'font-size':'7',  'text-anchor':'middle', x:chipX+chipW/2, y:chipY+chipH/2+10}));
  app(cpuG, txt('PJRC Teensy 4.1', {fill:'rgba(255,255,255,0.20)', 'font-family':'monospace', 'font-size':'6',  'text-anchor':'middle', x:chipX+chipW/2, y:chipY+chipH/2+23}));

  // W25Q128 external flash
  var flashW=38, flashH=36, flashX=54, flashY=chipY+chipH+20;
  var flashG = app(svg, mk('g', {'class':'t41-chip', 'data-id':'W25Q128'}));
  app(flashG, mk('rect', {x:flashX, y:flashY, width:flashW, height:flashH, rx:'3',
    fill:'url(#t41ChipG)', stroke:'#1a2a1a', 'stroke-width':'1.5', 'class':'chip-shape'}));
  app(flashG, mk('rect', {x:flashX+3, y:flashY+3, width:flashW-6, height:flashH-6, rx:'2',
    fill:'none', stroke:'#1a1a1a', 'stroke-width':'0.8', 'stroke-dasharray':'3,3'}));
  app(flashG, mk('circle', {cx:flashX+6, cy:flashY+6, r:'2', fill:'#1a2a1a'}));
  app(flashG, txt('W25Q128', {fill:'rgba(255,255,255,0.70)', 'font-family':'monospace', 'font-size':'5', 'font-weight':'bold', 'text-anchor':'middle', x:flashX+flashW/2, y:flashY+16}));
  app(flashG, txt('16MB',    {fill:'rgba(255,255,255,0.40)', 'font-family':'monospace', 'font-size':'5', 'text-anchor':'middle', x:flashX+flashW/2, y:flashY+26}));

  return { chipY: chipY, chipH: chipH, flashY: flashY };
}

// ── CRYSTAL OSCILLATOR ───────────────────────────────────────
function drawCrystal(svg) {
  var oscX=139, oscY=375, oscW=24, oscH=18;
  app(svg, mk('rect', {x:oscX, y:oscY, width:oscW, height:oscH, rx:'3',
    fill:'url(#t41SilvG)', stroke:'#888', 'stroke-width':'1'}));
  app(svg, mk('rect', {x:oscX+2, y:oscY+2, width:oscW-4, height:oscH-4, rx:'2',
    fill:'none', stroke:'rgba(0,0,0,0.1)', 'stroke-width':'0.5'}));
  app(svg, txt('OSC', {fill:'rgba(0,0,0,0.4)', 'font-family':'monospace', 'font-size':'5',
    'text-anchor':'middle', x:oscX+oscW/2, y:oscY+oscH/2+2}));
}

// ── RESET SWITCH ─────────────────────────────────────────────
function drawResetSwitch(svg, flashY) {
  var swW=30, swH=44, swX=95, swY=flashY+14;
  var swG = app(svg, mk('g', {'class':'t41-chip', 'data-id':'RESET'}));
  app(swG, mk('rect', {x:swX, y:swY, width:swW, height:swH, rx:'2',
    fill:'url(#t41SilvG)', stroke:'#666', 'stroke-width':'1.5', 'class':'chip-shape'}));
  app(swG, mk('rect', {x:swX+4, y:swY+6, width:swW-8, height:swH-12, rx:'2',
    fill:'#1a1a1a', stroke:'#555', 'stroke-width':'0.8'}));
  app(swG, mk('circle', {cx:swX+swW/2, cy:swY+swH/2, r:'8',
    fill:'#e0e0e0', stroke:'#666', 'stroke-width':'1'}));
  app(swG, txt('RESET', {fill:'rgba(255,255,255,0.7)', 'font-family':'monospace',
    'font-size':'5', 'text-anchor':'middle', x:swX+swW/2, y:swY-6}));
}

// ── MICROSD SLOT ─────────────────────────────────────────────
function drawMicroSD(svg, bw, bh) {
  var sdW=140, sdH=114, sdX=Math.round((bw-sdW)/2), sdY=bh-114;
  app(svg, mk('rect', {x:sdX, y:sdY, width:sdW, height:sdH, rx:'3',
    fill:'#f5f5f5', stroke:'#ccc', 'stroke-width':'1.2'}));
  app(svg, mk('rect', {x:sdX+2, y:sdY+2, width:sdW-4, height:'8', rx:'3',
    fill:'rgba(255,255,255,0.90)'}));
  app(svg, mk('rect', {x:sdX+8, y:sdY+14, width:sdW-16, height:sdH-24, rx:'2',
    fill:'#ececec', stroke:'#ddd', 'stroke-width':'0.8'}));
  app(svg, mk('rect', {x:sdX+15, y:sdY+sdH-8, width:sdW-30, height:'6', rx:'1',
    fill:'#1a1a1a'}));
  app(svg, mk('rect', {x:sdX+15, y:sdY+sdH-22, width:sdW-30, height:'20', rx:'1',
    fill:'#111'}));
  for (var si=0; si<8; si++) {
    var scx = sdX + 24 + si*((sdW-48)/7);
    app(svg, mk('rect', {x:scx-4, y:sdY+sdH-20, width:'8', height:'16', rx:'0.5',
      fill:'#d4a820', stroke:'#b08010', 'stroke-width':'0.5'}));
    app(svg, mk('rect', {x:scx-3, y:sdY+sdH-19, width:'4', height:'4', rx:'0.3',
      fill:'rgba(255,235,120,0.7)'}));
  }
  app(svg, txt('microSD', {fill:'rgba(0,0,0,0.25)', 'font-family':'monospace',
    'font-size':'9', 'text-anchor':'middle', x:sdX+sdW/2, y:sdH/2+sdY-5}));
}

// ── SMD PASSIVES ─────────────────────────────────────────────
function drawPassives(svg) {
  smdR(svg, 165, 85,  12, 5);
  smdC(svg,  70, 100, 10, 5);
  smdC(svg, 110, 100, 10, 5);

  // Large SMD capacitor (yellow)
  var capX=50, capY=210, capW=50, capH=18, padW=8;
  app(svg, mk('rect', {x:capX,           y:capY, width:padW,          height:capH, rx:'1', fill:'url(#t41SilvG)', stroke:'#888', 'stroke-width':'0.4'}));
  app(svg, mk('rect', {x:capX+capW-padW, y:capY, width:padW,          height:capH, rx:'1', fill:'url(#t41SilvG)', stroke:'#888', 'stroke-width':'0.4'}));
  app(svg, mk('rect', {x:capX+padW-1,   y:capY, width:capW-2*padW+2, height:capH, rx:'1', fill:'#fff9c4', stroke:'#d0c040', 'stroke-width':'0.4'}));

  smdR(svg,  40, 370, 10, 5);
  smdC(svg,  60, 370, 10, 5);
  smdR(svg,  80, 370, 10, 5);
}

// ── STATUS LED ───────────────────────────────────────────────
function drawLED(svg) {
  app(svg, mk('rect', {x:'104', y:'378', width:'12', height:'6', rx:'1',
    fill:'#ffaa00', stroke:'#cc8800', 'stroke-width':'0.6'}));
  app(svg, txt('STAT', {fill:'rgba(255,160,0,0.5)', 'font-family':'monospace',
    'font-size':'4', 'text-anchor':'middle', x:'110', y:'376'}));
}

// ── SILK TEXT ────────────────────────────────────────────────
function drawSilk(svg) {
  app(svg, txt('TEENSY 4.1', {fill:'rgba(140,230,140,0.22)', 'font-family':'Georgia,serif',
    'font-size':'14', 'font-style':'italic', 'font-weight':'bold',
    'letter-spacing':'1', 'text-anchor':'middle', x:'110', y:'500'}));
  app(svg, txt('PJRC.COM', {fill:'rgba(100,200,100,0.12)', 'font-family':'monospace',
    'font-size':'6', 'letter-spacing':'2', 'text-anchor':'middle', x:'110', y:'514'}));
}

// ── EXPANSION HEADER ─────────────────────────────────────────
function drawExpansionHeader(svg) {
  var expG = app(svg, mk('g', {'class':'t41-chip', 'data-id':'EXP_HDR'}));
  var ehX=110, ehY=460, ehS=31.25;
  app(expG, mk('rect', {x:ehX-2*ehS-10, y:ehY-14, width:4*ehS+20, height:28, rx:'2',
    fill:'none', stroke:'rgba(255,255,255,0.2)', 'stroke-width':'0.6', 'class':'chip-shape'}));
  app(expG, txt('EXPANSION', {fill:'rgba(180,230,180,0.55)', 'font-family':'monospace',
    'font-size':'6', 'text-anchor':'middle', x:ehX, y:ehY-18}));
  for (var j=-2; j<=2; j++) {
    var epx = ehX + j*ehS;
    app(expG, mk('circle', {cx:epx, cy:ehY, r:'5',   fill:'#c8a040', stroke:'#9a7c20', 'stroke-width':'1'}));
    app(expG, mk('circle', {cx:epx, cy:ehY, r:'2.5', fill:'#0a1a0a'}));
  }
}

// ── PIN HEADER STRIPS (dark strips flush to edges) ───────────
function drawHeaderStrips(svg) {
  app(svg, mk('rect', {x:'0',   y:'0', width:'20',  height:'600', rx:'0', fill:'#061006', stroke:'none'}));
  app(svg, mk('rect', {x:'200', y:'0', width:'20',  height:'600', rx:'0', fill:'#061006', stroke:'none'}));
}

// ── MAIN DRAW FUNCTION ───────────────────────────────────────
function draw(svg, config) {
  var bc   = config.boardConfig;
  var bw   = bc.width;
  var bh   = bc.height;
  var PS   = bc.pinSize;
  var PY0  = bc.pinY0;
  var PYS  = bc.pinYStep;
  var LX   = bc.leftX;
  var RX   = bc.rightX;

  // draw from back to front
  buildDefs(svg);
  drawPCB(svg, bw, bh);
  drawUSBC(svg);
  var refs = drawChips(svg);
  drawCrystal(svg);
  drawResetSwitch(svg, refs.flashY);
  drawMicroSD(svg, bw, bh);
  drawPassives(svg);
  drawLED(svg);
  drawSilk(svg);
  drawExpansionHeader(svg);
  drawHeaderStrips(svg);   // strips drawn after chips but before pads

  // ── Silk labels inside board beside each pad ──────────────
  config.pins.forEach(function(p) {
    var isLeft = (p.side === 'L');
    var cy     = PY0 + p.row * PYS;
    var cx     = isLeft ? LX : RX;
    var tx, anchor;
    if (isLeft) {
      tx = cx + PS/2 + 3;
      anchor = 'start';
    } else {
      tx = cx - PS/2 - 3;
      anchor = 'end';
    }
    app(svg, txt(p.lbl, {
      x: tx, y: cy + 4,
      fill: 'rgba(255,255,255,0.80)',
      'font-size': '8', 'font-family': 'monospace',
      'text-anchor': anchor, 'pointer-events': 'none'
    }));
  });
}

// ── PUBLIC API ───────────────────────────────────────────────
global.Teensy41Board = { draw: draw };

})(window);