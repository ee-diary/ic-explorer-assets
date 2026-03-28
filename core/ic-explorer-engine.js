/**
 * IC EXPLORER — UNIVERSAL ENGINE (Supports DIP-8, DIP-20, DIP-28, DIP-40)
 * Automatically detects package size from pinCount
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
  PWM:  {c:'#50c8c8',bg:'rgba(80,200,200,.10)', bd:'rgba(80,200,200,.27)'},
  XTAL: {c:'#7090a8',bg:'rgba(112,144,168,.11)',bd:'rgba(112,144,168,.28)'},
  RESET:{c:'#ff9944',bg:'rgba(255,153,68,.12)', bd:'rgba(255,153,68,.30)'},
  TIMER:{c:'#50c8c8',bg:'rgba(80,200,200,.10)', bd:'rgba(80,200,200,.27)'},
  INT:  {c:'#c8a850',bg:'rgba(200,168,80,.12)', bd:'rgba(200,168,80,.30)'},
  ACMP: {c:'#ff9944',bg:'rgba(255,153,68,.12)', bd:'rgba(255,153,68,.30)'},
  USB:  {c:'#a78bfa',bg:'rgba(167,139,250,.11)',bd:'rgba(167,139,250,.28)'},
};
function cl(t){ return COLORS[t] || COLORS.GPIO; }

// ── Filter definitions ───────────────────────────────
var FCLR = {
  GPIO:'#78c878',PWM:'#50c8c8',ADC:'#c8a850',
  SPI:'#4a9aee',I2C:'#9898d8',UART:'#cc6888',USART:'#cc6888',
  TIMER:'#50c8c8',INT:'#c8a850',XTAL:'#7090a8',
  COMP:'#ff9944',USB:'#a78bfa',RESET:'#ff9944',PWR:'#ff6b6b',GND:'#a8a8a8'
};

var NS = 'http://www.w3.org/2000/svg';

// ============================================================
// UNIVERSAL DIP LAYOUT GENERATOR
// ============================================================
function getDipConfig(pinCount) {
  // Base dimensions for different DIP sizes
  var configs = {
    8: {
      pinsPerSide: 4,
      bodyX: 56, bodyY: 20, bodyW: 48, bodyH: 98,
      pinLength: 14, pinWidthHalf: 7,
      notchSize: 4, notchX: 6, notchY: 6,
      textSizes: { mfr: 6, part: 9, pkg: 7, pinCount: 6 },
      labelSize: 6, pinNumSize: 8, yOffset: -20
    },
    20: {
      pinsPerSide: 10,
      bodyX: 100, bodyY: 30, bodyW: 80, bodyH: 280,
      pinLength: 18, pinWidthHalf: 9,
      notchSize: 6, notchX: 8, notchY: 8,
      textSizes: { mfr: 8, part: 12, pkg: 9, pinCount: 8 },
      labelSize: 8, pinNumSize: 10, yOffset: -40
    },
    28: {
      pinsPerSide: 14,
      bodyX: 100, bodyY: 25, bodyW: 160, bodyH: 490,
      pinLength: 28, pinWidthHalf: 14,
      notchSize: 8, notchX: 14, notchY: 14,
      textSizes: { mfr: 12, part: 18, pkg: 12, pinCount: 10 },
      labelSize: 10, pinNumSize: 12, yOffset: -50
    },
    40: {
      pinsPerSide: 20,
      bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 700,
      pinLength: 34, pinWidthHalf: 16,
      notchSize: 8, notchX: 14, notchY: 14,
      textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },
      labelSize: 11, pinNumSize: 14, yOffset: -60
    }
  };
  
  // Find closest match or default to DIP-40
  var config = configs[pinCount];
  if (!config) {
    // Auto-calculate for unknown sizes
    var pinsPerSide = Math.ceil(pinCount / 2);
    var bodyH = 20 + (pinsPerSide * 22);
    config = {
      pinsPerSide: pinsPerSide,
      bodyX: 100, bodyY: 25, bodyW: 80, bodyH: bodyH,
      pinLength: 20, pinWidthHalf: 10,
      notchSize: 6, notchX: 10, notchY: 10,
      textSizes: { mfr: 8, part: 12, pkg: 8, pinCount: 7 },
      labelSize: 8, pinNumSize: 10, yOffset: -35
    };
  }
  return config;
}

// ============================================================
// PUBLIC API
// ============================================================
var ICExplorer = {};

ICExplorer.init = function(cfg){
  var C = cfg;
  var PINS = C.pins;
  var ALT  = C.altFuncs || {};
  
  // Get configuration based on pin count
  var dip = C.dipConfig || getDipConfig(C.pinCount);
  
  var BX = dip.bodyX;
  var BY = dip.bodyY;
  var BW = dip.bodyW;
  var BH = dip.bodyH;
  var SIDE = dip.pinsPerSide;
  var PL = dip.pinLength;
  var PW2 = dip.pinWidthHalf;
  var PITCH = BH / SIDE;
  
  // Text size adjustments
  var isSmall = (C.pinCount <= 8);
  var isMedium = (C.pinCount === 20 || C.pinCount === 28);
  
  // ── SVG setup ────────────────────────────────────────────
  var svg = document.getElementById('A13');
  var viewBoxWidth = BX * 2 + BW + 40;
  var viewBoxHeight = BY * 2 + BH + 20;
  svg.setAttribute('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  
  // Clear SVG
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
  
  // Defs
  var defs = document.createElementNS(NS, 'defs');
  svg.appendChild(defs);
  
  var gf = document.createElementNS(NS, 'filter');
  gf.setAttribute('id', 'glow');
  gf.setAttribute('x', '-80%');
  gf.setAttribute('y', '-80%');
  gf.setAttribute('width', '260%');
  gf.setAttribute('height', '260%');
  var blur = document.createElementNS(NS, 'feGaussianBlur');
  blur.setAttribute('stdDeviation', '3');
  blur.setAttribute('result', 'b');
  gf.appendChild(blur);
  var fm = document.createElementNS(NS, 'feMerge');
  var mn1 = document.createElementNS(NS, 'feMergeNode');
  mn1.setAttribute('in', 'b');
  var mn2 = document.createElementNS(NS, 'feMergeNode');
  mn2.setAttribute('in', 'SourceGraphic');
  fm.appendChild(mn1);
  fm.appendChild(mn2);
  gf.appendChild(fm);
  defs.appendChild(gf);
  
  var icg = document.createElementNS(NS, 'linearGradient');
  icg.setAttribute('id', 'icBody');
  icg.setAttribute('x1', '0%');
  icg.setAttribute('y1', '0%');
  icg.setAttribute('x2', '100%');
  icg.setAttribute('y2', '100%');
  var stop1 = document.createElementNS(NS, 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#1e2430');
  var stop2 = document.createElementNS(NS, 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', '#0d1018');
  icg.appendChild(stop1);
  icg.appendChild(stop2);
  defs.appendChild(icg);
  
  // IC body
  var bodyRect = document.createElementNS(NS, 'rect');
  bodyRect.setAttribute('x', BX);
  bodyRect.setAttribute('y', BY);
  bodyRect.setAttribute('width', BW);
  bodyRect.setAttribute('height', BH);
  bodyRect.setAttribute('rx', Math.min(6, BW/10));
  bodyRect.setAttribute('fill', 'url(#icBody)');
  bodyRect.setAttribute('stroke', 'none');
  svg.appendChild(bodyRect);
  
  // Pin-1 notch
  var notchSize = dip.notchSize;
  var notchX = BX + dip.notchX;
  var notchY = BY + dip.notchY;
  var notchOuter = document.createElementNS(NS, 'circle');
  notchOuter.setAttribute('cx', notchX);
  notchOuter.setAttribute('cy', notchY);
  notchOuter.setAttribute('r', notchSize);
  notchOuter.setAttribute('fill', '#2a3040');
  notchOuter.setAttribute('stroke', '#4a5568');
  notchOuter.setAttribute('stroke-width', '1.5');
  notchOuter.setAttribute('opacity', '0.9');
  svg.appendChild(notchOuter);
  
  var notchInner = document.createElementNS(NS, 'circle');
  notchInner.setAttribute('cx', notchX);
  notchInner.setAttribute('cy', notchY);
  notchInner.setAttribute('r', notchSize/2);
  notchInner.setAttribute('fill', '#5a6478');
  notchInner.setAttribute('opacity', '0.7');
  svg.appendChild(notchInner);
  
  var CX = BX + BW/2;
  var CY = BY + BH/2;
  var yOffset = dip.yOffset;
  
  // Text elements
  var mfr = C.manufacturer || 'MICROCHIP';
  var mfrText = document.createElementNS(NS, 'text');
  mfrText.setAttribute('x', CX);
  mfrText.setAttribute('y', CY + yOffset);
  mfrText.setAttribute('fill', '#3a4a5a');
  mfrText.setAttribute('font-family', 'monospace');
  mfrText.setAttribute('font-size', dip.textSizes.mfr);
  mfrText.setAttribute('font-weight', 'bold');
  mfrText.setAttribute('text-anchor', 'middle');
  mfrText.textContent = mfr;
  svg.appendChild(mfrText);
  
  var partText = document.createElementNS(NS, 'text');
  partText.setAttribute('x', CX);
  partText.setAttribute('y', CY + (isSmall ? -4 : -10));
  partText.setAttribute('fill', '#4a5c70');
  partText.setAttribute('font-family', 'monospace');
  partText.setAttribute('font-size', dip.textSizes.part);
  partText.setAttribute('font-weight', 'bold');
  partText.setAttribute('text-anchor', 'middle');
  partText.textContent = C.partName;
  svg.appendChild(partText);
  
  var packageText = document.createElementNS(NS, 'text');
  packageText.setAttribute('x', CX);
  packageText.setAttribute('y', CY + (isSmall ? 12 : 18));
  packageText.setAttribute('fill', '#2a3a48');
  packageText.setAttribute('font-family', 'monospace');
  packageText.setAttribute('font-size', dip.textSizes.pkg);
  packageText.setAttribute('text-anchor', 'middle');
  packageText.textContent = C.package;
  svg.appendChild(packageText);
  
  var pinCountText = document.createElementNS(NS, 'text');
  pinCountText.setAttribute('x', CX);
  pinCountText.setAttribute('y', CY + (isSmall ? 22 : 40));
  pinCountText.setAttribute('fill', '#1e2a38');
  pinCountText.setAttribute('font-family', 'monospace');
  pinCountText.setAttribute('font-size', dip.textSizes.pinCount);
  pinCountText.setAttribute('text-anchor', 'middle');
  pinCountText.textContent = C.pinCount + ' PINS';
  svg.appendChild(pinCountText);
  
  // Compute pin positions
  PINS.forEach(function(pin){
    var n = pin.num;
    if(n >= 1 && n <= SIDE){
      var slot = n - 1;
      var cy = BY + slot * PITCH + PITCH/2;
      pin._px = BX - PL;
      pin._py = cy - PW2/2;
      pin._side = 'left';
    } else {
      var slot = (pin._rightSlot !== undefined) ? pin._rightSlot : (C.pinCount - n);
      var cy = BY + slot * PITCH + PITCH/2;
      pin._px = BX + BW;
      pin._py = cy - PW2/2;
      pin._side = 'right';
    }
  });
  
  // Draw pins
  var selId = null;
  
  function drawPin(pin){
    var col = cl(pin.type);
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'a13-pin');
    g.setAttribute('data-id', pin.id);
    g.style.cursor = 'pointer';
    var px = pin._px, py = pin._py;
    var cx = px + PL/2, cy = py + PW2/2;
    
    var sq = document.createElementNS(NS, 'rect');
    sq.setAttribute('x', px);
    sq.setAttribute('y', py);
    sq.setAttribute('width', PL);
    sq.setAttribute('height', PW2);
    sq.setAttribute('rx', '2');
    sq.setAttribute('fill', col.bg);
    sq.setAttribute('stroke', col.c);
    sq.setAttribute('stroke-width', '1.3');
    sq.setAttribute('class', 'psq');
    sq.style.color = col.c;
    g.appendChild(sq);
    
    var lb = document.createElementNS(NS, 'text');
    lb.setAttribute('x', String(cx));
    lb.setAttribute('y', String(cy + 3));
    lb.setAttribute('text-anchor', 'middle');
    lb.setAttribute('fill', col.c);
    lb.setAttribute('font-size', dip.pinNumSize);
    lb.setAttribute('font-family', 'monospace');
    lb.setAttribute('font-weight', 'bold');
    lb.setAttribute('pointer-events', 'none');
    lb.textContent = String(pin.num);
    g.appendChild(lb);
    
    g.addEventListener('click', function(e){e.stopPropagation(); pick(pin.id);});
    g.addEventListener('mouseenter', function(e){hoverPin(g,pin,true); showTT(pin,e);});
    g.addEventListener('mousemove', moveTT);
    g.addEventListener('mouseleave', function(){hoverPin(g,pin,false); hideTT();});
    svg.appendChild(g);
    
    // Pin label
    var labelY = py - 4;
    var sk = document.createElementNS(NS, 'text');
    sk.setAttribute('x', '0');
    sk.setAttribute('y', '0');
    sk.setAttribute('text-anchor', 'middle');
    sk.setAttribute('dominant-baseline', 'auto');
    sk.setAttribute('fill', 'rgba(160,215,255,0.88)');
    sk.setAttribute('font-size', dip.labelSize);
    sk.setAttribute('font-family', 'monospace');
    sk.setAttribute('font-weight', 'bold');
    sk.setAttribute('pointer-events', 'none');
    sk.setAttribute('transform', 'translate(' + cx + ',' + labelY + ')');
    sk.textContent = pin.lbl;
    svg.appendChild(sk);
  }
  
  PINS.forEach(drawPin);
  
  var bodyOutline = document.createElementNS(NS, 'rect');
  bodyOutline.setAttribute('x', BX);
  bodyOutline.setAttribute('y', BY);
  bodyOutline.setAttribute('width', BW);
  bodyOutline.setAttribute('height', BH);
  bodyOutline.setAttribute('rx', Math.min(4, BW/15));
  bodyOutline.setAttribute('fill', 'none');
  bodyOutline.setAttribute('stroke', '#2a3545');
  bodyOutline.setAttribute('stroke-width', '2');
  svg.appendChild(bodyOutline);
  
  // Rest of the engine (hover, pick, detail, etc.) remains the same
  // ... [continue with existing functions: hoverPin, pick, upDetail, upList, etc.]
  
  // For brevity, I'll include the key functions needed
  function hoverPin(g,p,on){
    var sq = g.querySelector('.psq');
    var col = cl(p.type);
    if(on){
      sq.setAttribute('fill', col.c);
      sq.setAttribute('stroke-width', '2');
      sq.setAttribute('filter', 'url(#glow)');
      g.querySelector('text').setAttribute('fill', '#020810');
    } else if(selId === p.id){
      sq.setAttribute('fill', col.c);
      sq.setAttribute('stroke', col.c);
      sq.setAttribute('stroke-width', '2');
      sq.setAttribute('filter', 'url(#glow)');
      g.querySelector('text').setAttribute('fill', '#020810');
    } else {
      sq.setAttribute('fill', col.bg);
      sq.setAttribute('stroke', col.c);
      sq.setAttribute('stroke-width', '1.3');
      sq.removeAttribute('filter');
      g.querySelector('text').setAttribute('fill', col.c);
    }
  }
  
  function pick(id){
    selId = (selId === id) ? null : id;
    updateBoardHighlight();
    updateDetailPanel();
    updatePinList();
  }
  
  function updateBoardHighlight(){
    var hf = !!fType;
    document.querySelectorAll('.a13-pin').forEach(function(g){
      var p = PINS.filter(function(x){return x.id === g.dataset.id;})[0];
      if(!p) return;
      var col = cl(p.type);
      var sq = g.querySelector('.psq');
      var act = selId === p.id;
      var mt = matches(p);
      if(act){
        sq.setAttribute('fill', col.c);
        sq.setAttribute('stroke', col.c);
        sq.setAttribute('stroke-width', '2');
        sq.setAttribute('filter', 'url(#glow)');
        g.querySelector('text').setAttribute('fill', '#020810');
        g.style.opacity = '1';
      } else if(hf && !mt){
        sq.setAttribute('fill', 'rgba(4,8,20,0.5)');
        sq.setAttribute('stroke', 'rgba(20,30,60,0.3)');
        sq.setAttribute('stroke-width', '0.8');
        sq.removeAttribute('filter');
        g.querySelector('text').setAttribute('fill', 'rgba(30,45,80,0.3)');
        g.style.opacity = '0.15';
      } else if(hf && mt){
        var fcol = FCLR[fType] || col.c;
        sq.setAttribute('fill', fcol);
        sq.setAttribute('stroke', fcol);
        sq.setAttribute('stroke-width', '2');
        sq.setAttribute('filter', 'url(#glow)');
        g.querySelector('text').setAttribute('fill', '#020810');
        g.style.opacity = '1';
      } else {
        sq.setAttribute('fill', col.bg);
        sq.setAttribute('stroke', col.c);
        sq.setAttribute('stroke-width', '1.3');
        sq.removeAttribute('filter');
        g.querySelector('text').setAttribute('fill', col.c);
        g.style.opacity = '1';
      }
    });
  }
  
  // Build filter list from actual pins
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
  
  function matches(p){
    if(!fType) return true;
    var f = FILTS.filter(function(x){return x.k === fType;})[0];
    return f ? f.fn(p) : true;
  }
  
  function updateDetailPanel(){
    var em = document.getElementById('awEMPTY');
    var dc = document.getElementById('awDC');
    if(!selId){
      if(em) em.style.display = 'block';
      if(dc) dc.className = 'aw-dc';
      return;
    }
    var p = PINS.filter(function(x){return x.id === selId;})[0];
    if(!p) return;
    var col = cl(p.type);
    if(em) em.style.display = 'none';
    if(dc) dc.className = 'aw-dc show';
    
    var b = document.getElementById('awBADGE');
    if(b){
      b.style.background = col.bg;
      b.style.borderColor = col.c;
      b.style.color = col.c;
      b.innerHTML = '<span class="aw-dbadge-num">#'+p.num+'</span><span>'+p.lbl+'</span>';
    }
    var di = document.getElementById('awDID');
    if(di){
      di.style.color = col.c;
      di.textContent = p.id;
    }
    var dfull = document.getElementById('awDFULL');
    if(dfull) dfull.textContent = p.name;
    
    var funcsDiv = document.getElementById('awFUNCS');
    if(funcsDiv){
      funcsDiv.innerHTML = p.funcs.map(function(f){
        var fc = COLORS[f] || col;
        return '<span class="aw-chip" style="background:'+fc.bg+';color:'+fc.c+';border-color:'+fc.bd+'">'+f+'</span>';
      }).join('');
    }
    
    var gridDiv = document.getElementById('awIGRID');
    if(gridDiv){
      gridDiv.innerHTML = 
        '<div class="aw-icell"><span class="aw-ilbl">Pin</span><span class="aw-ival">#'+p.num+'</span></div>' +
        '<div class="aw-icell"><span class="aw-ilbl">Type</span><span class="aw-ival" style="color:'+col.c+'">'+p.type+'</span></div>' +
        '<div class="aw-icell"><span class="aw-ilbl">Voltage</span><span class="aw-ival">'+p.volt+'</span></div>' +
        '<div class="aw-icell"><span class="aw-ilbl">Max mA</span><span class="aw-ival">'+p.curr+'</span></div>';
    }
    
    var alts = ALT[p.id] || [];
    var as = document.getElementById('awALTS');
    if(as){
      if(alts.length){
        as.style.display = 'block';
        var achips = document.getElementById('awACHIPS');
        if(achips) achips.innerHTML = alts.map(function(a){return '<span class="aw-ac">'+a+'</span>';}).join('');
      } else {
        as.style.display = 'none';
      }
    }
    
    var note = document.getElementById('awNOTE');
    if(note){
      note.innerHTML = '<span style="color:#4da6ff;margin-right:4px;">ⓘ</span>' + p.note;
    }
  }
  
  function updatePinList(){
    var ps = PINS.filter(matches);
    var rowsDiv = document.getElementById('awROWS');
    if(rowsDiv){
      rowsDiv.innerHTML = ps.map(function(p){
        var col = cl(p.type);
        var on = selId === p.id;
        return '<div class="aw-prow'+(on?' on':'')+'" data-id="'+p.id+'" onclick="ICExplorer._pick(\''+p.id+'\')">' +
          '<div class="aw-pbadge" style="background:'+col.bg+';color:'+col.c+';border:1px solid '+col.bd+'">'+p.lbl.substring(0,4)+'</div>' +
          '<div class="aw-pname">'+p.name+'</div>' +
          '<span class="aw-ptag" style="background:'+col.bg+';color:'+col.c+'">'+p.type+'</span>' +
          '</div>';
      }).join('');
    }
    var cntSpan = document.getElementById('awCNT');
    if(cntSpan) cntSpan.textContent = ps.length + (ps.length<PINS.length?' / '+PINS.length:'');
  }
  
  function buildFilterButtons(){
    var fbDiv = document.getElementById('awFBTNS');
    if(fbDiv){
      fbDiv.innerHTML = FILTS.map(function(f){
        var c = FCLR[f.k] || '#78c878';
        var on = fType === f.k;
        return '<button class="aw-fb'+(on?' on':'')+'" data-k="'+f.k+'" style="color:'+c+';background:'+(on?'#0d1117':'#1c2128')+';border-color:'+(on?c:'rgba(255,255,255,.12)')+'">'+f.l+'</button>';
      }).join('');
      document.querySelectorAll('.aw-fb').forEach(function(b){
        b.addEventListener('click',function(){
          fType = (fType === b.dataset.k) ? null : b.dataset.k;
          buildFilterButtons();
          updateBoardHighlight();
          updatePinList();
        });
      });
    }
  }
  
  // Legend
  (function(){
    var ts = [];
    PINS.forEach(function(p){if(ts.indexOf(p.type)<0)ts.push(p.type);});
    var legDiv = document.getElementById('awLEG');
    if(legDiv){
      legDiv.innerHTML = ts.map(function(t){
        var c = cl(t);
        return '<div class="aw-li"><span class="aw-ld" style="background:'+c.c+'"></span>'+t+'</div>';
      }).join('');
    }
  })();
  
  buildFilterButtons();
  updatePinList();
  
  ICExplorer._pick = pick;
  
  // Tooltip
  var TT = document.getElementById('awTT');
  function showTT(p,e){
    var col = cl(p.type);
    if(TT){
      TT.innerHTML = '<span class="aw-tn" style="color:'+col.c+'">#'+p.num+' '+p.id+'</span><span class="aw-td">'+p.funcs.join(' · ')+' | '+p.volt+'</span>';
      TT.className = 'aw-tt show';
      moveTT(e);
    }
  }
  function moveTT(e){
    if(!TT) return;
    var r = document.getElementById('a13wrap').getBoundingClientRect();
    var x = e.clientX - r.left + 14;
    var y = e.clientY - r.top - 8;
    if(x+270 > r.width) x = e.clientX - r.left - 280;
    if(y+80 > r.height) y = e.clientY - r.top - 90;
    TT.style.left = x + 'px';
    TT.style.top = y + 'px';
  }
  function hideTT(){
    if(TT) TT.className = 'aw-tt';
  }
  
  document.addEventListener('click', function(){
    if(selId){
      selId = null;
      updateBoardHighlight();
      updateDetailPanel();
      updatePinList();
    }
  });
  
  window.awTogList = function(){
    listOpen = !listOpen;
    var plist = document.getElementById('awPLIST');
    if(plist) plist.className = 'aw-plist' + (listOpen ? ' open' : '');
    var ticon = document.getElementById('awTICON');
    if(ticon) ticon.textContent = listOpen ? '▲ HIDE' : '▼ SHOW';
  };
  
  var listOpen = false;
  var fType = null;
  
  console.log('ICExplorer initialized for', C.partName, '| Package:', C.package, '| Pins:', C.pinCount);
};

global.ICExplorer = ICExplorer;
})(window);
