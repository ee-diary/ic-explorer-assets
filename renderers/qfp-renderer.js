/**
 * QFP/LQFP/TQFP Package Renderer
 * Supports QFP-48, QFP-64, QFP-80, QFP-100, QFP-144
 */

var QFPRenderer = (function() {
  'use strict';
  
  var NS = 'http://www.w3.org/2000/svg';
  
  function getConfig(pinCount) {
    // Calculate dimensions based on pin count
    var pinsPerSide = Math.ceil(pinCount / 4);
    var bodySize = 12 + (pinsPerSide * 0.5); // Approximate mm to viewbox units
    bodySize = Math.min(60, Math.max(30, bodySize * 2.5));
    
    var pinLength = Math.max(12, Math.min(24, bodySize * 0.15));
    var pinWidth = Math.max(5, Math.min(12, bodySize * 0.08));
    
    return {
      pinsPerSide: pinsPerSide,
      bodyX: 200 - bodySize / 2,
      bodyY: 200 - bodySize / 2,
      bodyW: bodySize,
      bodyH: bodySize,
      pinLength: pinLength,
      pinWidth: pinWidth,
      textSizes: { mfr: 12, part: 20, pkg: 14, pinCount: 10 }
    };
  }
  
  function draw(svg, config) {
    var C = config;
    var cfg = C.qfpConfig || getConfig(C.pinCount);
    
    var BX = cfg.bodyX, BY = cfg.bodyY, BW = cfg.bodyW, BH = cfg.bodyH;
    var SIDE = cfg.pinsPerSide;
    var PL = cfg.pinLength;
    var PW = cfg.pinWidth;
    var PITCH = BW / (SIDE - 1);
    
    var viewBoxSize = 400;
    svg.setAttribute('viewBox', '0 0 ' + viewBoxSize + ' ' + viewBoxSize);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    function mk(t, a) {
      var e = document.createElementNS(NS, t);
      for (var k in a) e.setAttribute(k, a[k]);
      return e;
    }
    
    // Defs
    var defs = mk('defs', {});
    svg.appendChild(defs);
    
    // Body gradient
    var grad = mk('linearGradient', { id: 'bodyGrad', x1: '0%', y1: '0%', x2: '100%', y2: '100%' });
    grad.appendChild(mk('stop', { offset: '0%', 'stop-color': '#1e2430' }));
    grad.appendChild(mk('stop', { offset: '100%', 'stop-color': '#0d1018' }));
    defs.appendChild(grad);
    
    // Glow filter
    var glow = mk('filter', { id: 'pinGlow', x: '-80%', y: '-80%', width: '260%', height: '260%' });
    glow.appendChild(mk('feGaussianBlur', { stdDeviation: '3', result: 'blur' }));
    var merge = mk('feMerge', {});
    merge.appendChild(mk('feMergeNode', { in: 'blur' }));
    merge.appendChild(mk('feMergeNode', { in: 'SourceGraphic' }));
    glow.appendChild(merge);
    defs.appendChild(glow);
    
    // IC body
    var bodyRect = mk('rect', { x: BX, y: BY, width: BW, height: BH, rx: '4', fill: 'url(#bodyGrad)', stroke: 'none' });
    svg.appendChild(bodyRect);
    
    // Pin-1 marker
    var marker = mk('circle', { cx: BX + 8, cy: BY + 8, r: '4', fill: '#ff9944', opacity: '0.8' });
    svg.appendChild(marker);
    
    // Text labels
    var CX = BX + BW / 2;
    var CY = BY + BH / 2;
    
    var mfr = mk('text', { x: CX, y: CY - 20, fill: '#3a4a5a', 'font-family': 'monospace', 'font-size': cfg.textSizes.mfr, 'font-weight': 'bold', 'text-anchor': 'middle' });
    mfr.textContent = C.manufacturer || 'STM';
    svg.appendChild(mfr);
    
    var part = mk('text', { x: CX, y: CY + 4, fill: '#4a5c70', 'font-family': 'monospace', 'font-size': cfg.textSizes.part, 'font-weight': 'bold', 'text-anchor': 'middle' });
    part.textContent = C.partName;
    svg.appendChild(part);
    
    var pkg = mk('text', { x: CX, y: CY + 28, fill: '#2a3a48', 'font-family': 'monospace', 'font-size': cfg.textSizes.pkg, 'text-anchor': 'middle' });
    pkg.textContent = C.package;
    svg.appendChild(pkg);
    
    var pinCount = mk('text', { x: CX, y: CY + 44, fill: '#1e2a38', 'font-family': 'monospace', 'font-size': cfg.textSizes.pinCount, 'text-anchor': 'middle' });
    pinCount.textContent = C.pinCount + ' PINS';
    svg.appendChild(pinCount);
    
    // Split pins into sides
    var pins = C.pins;
    var leftPins = pins.slice(0, SIDE);
    var bottomPins = pins.slice(SIDE, SIDE * 2);
    var rightPins = pins.slice(SIDE * 2, SIDE * 3);
    var topPins = pins.slice(SIDE * 3, SIDE * 4);
    
    function drawPin(pin, x, y, side, orientation) {
      var col = ICExplorer.getColor(pin.type);
      var g = mk('g', { 'class': 'ic-pin', 'data-id': pin.id });
      g.style.cursor = 'pointer';
      
      var rx, ry, rw, rh;
      if (side === 'left') {
        rw = PL; rh = PW;
        rx = x - PL; ry = y - PW / 2;
      } else if (side === 'right') {
        rw = PL; rh = PW;
        rx = x; ry = y - PW / 2;
      } else if (side === 'top') {
        rw = PW; rh = PL;
        rx = x - PW / 2; ry = y - PL;
      } else {
        rw = PW; rh = PL;
        rx = x - PW / 2; ry = y;
      }
      
      var sq = mk('rect', {
        x: rx, y: ry, width: rw, height: rh, rx: '1.5',
        fill: col.bg, stroke: '#4a4f5a', 'stroke-width': '1.2', 'class': 'pin-sq'
      });
      g.appendChild(sq);
      
      // Pin number
      var numX, numY;
      if (side === 'left') { numX = rx + rw / 2; numY = ry + rh / 2 + 3; }
      else if (side === 'right') { numX = rx + rw / 2; numY = ry + rh / 2 + 3; }
      else if (side === 'top') { numX = rx + rw / 2; numY = ry + rh - 3; }
      else { numX = rx + rw / 2; numY = ry + 8; }
      
      var numLabel = mk('text', {
        x: numX, y: numY, 'text-anchor': 'middle', fill: col.c,
        'font-size': '8', 'font-family': 'monospace', 'font-weight': 'bold', 'pointer-events': 'none'
      });
      numLabel.textContent = String(pin.num);
      g.appendChild(numLabel);
      
      // Pin label (outside)
      var labelX, labelY, anchor;
      if (side === 'left') { labelX = rx - 3; labelY = ry + rh / 2; anchor = 'end'; }
      else if (side === 'right') { labelX = rx + rw + 3; labelY = ry + rh / 2; anchor = 'start'; }
      else if (side === 'top') { labelX = rx + rw / 2; labelY = ry - 3; anchor = 'middle'; }
      else { labelX = rx + rw / 2; labelY = ry + rh + 8; anchor = 'middle'; }
      
      var label = mk('text', {
        x: labelX, y: labelY, 'text-anchor': anchor, fill: 'rgba(160,215,255,0.85)',
        'font-size': '7', 'font-family': 'monospace', 'font-weight': 'bold', 'pointer-events': 'none'
      });
      label.textContent = pin.lbl;
      g.appendChild(label);
      
      svg.appendChild(g);
    }
    
    // Draw left side (top to bottom)
    var startY = BY + 12;
    var stepY = (BH - 24) / (SIDE - 1);
    leftPins.forEach(function(pin, i) {
      drawPin(pin, BX, startY + i * stepY, 'left');
    });
    
    // Draw bottom side (left to right)
    var startX = BX + 12;
    var stepX = (BW - 24) / (SIDE - 1);
    bottomPins.forEach(function(pin, i) {
      drawPin(pin, startX + i * stepX, BY + BH, 'bottom');
    });
    
    // Draw right side (bottom to top)
    rightPins.forEach(function(pin, i) {
      drawPin(pin, BX + BW, startY + (SIDE - 1 - i) * stepY, 'right');
    });
    
    // Draw top side (right to left)
    topPins.forEach(function(pin, i) {
      drawPin(pin, startX + (SIDE - 1 - i) * stepX, BY, 'top');
    });
    
    // Outline
    var outline = mk('rect', { x: BX, y: BY, width: BW, height: BH, rx: '4', fill: 'none', stroke: '#2a3545', 'stroke-width': '2' });
    svg.appendChild(outline);
  }
  
  return { draw: draw };
})();

window.QFPRenderer = QFPRenderer;
