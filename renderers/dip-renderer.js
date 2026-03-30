/**
 * DIP Package Renderer - Handles DIP-8, DIP-20, DIP-28, DIP-40
 */

var DIPRenderer = (function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  function getConfig(pinCount) {
    var configs = {
      8: {
        pinsPerSide: 4, bodyX: 62, bodyY: 20, bodyW: 76, bodyH: 98,
        pinLength: 18, pinWidthHalf: 8, notchSize: 4, notchX: 6, notchY: 6,
        textSizes: { mfr: 8, part: 10, pkg: 7, pinCount: 6 },
        labelSize: 6, pinNumSize: 8, yOffset: -20
      },
      20: {
        pinsPerSide: 10, bodyX: 100, bodyY: 30, bodyW: 80, bodyH: 280,
        pinLength: 18, pinWidthHalf: 9, notchSize: 6, notchX: 8, notchY: 8,
        textSizes: { mfr: 8, part: 12, pkg: 9, pinCount: 8 },
        labelSize: 8, pinNumSize: 10, yOffset: -40
      },
      28: {
        pinsPerSide: 14, bodyX: 100, bodyY: 25, bodyW: 160, bodyH: 490,
        pinLength: 28, pinWidthHalf: 14, notchSize: 8, notchX: 14, notchY: 14,
        textSizes: { mfr: 12, part: 18, pkg: 12, pinCount: 10 },
        labelSize: 10, pinNumSize: 12, yOffset: -50
      },
      40: {
        pinsPerSide: 20, bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 700,
        pinLength: 34, pinWidthHalf: 16, notchSize: 8, notchX: 14, notchY: 14,
        textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },
        labelSize: 11, pinNumSize: 14, yOffset: -60
      }
    };
    return configs[pinCount] || configs[40];
  }

  function draw(svg, config) {
    var C = config;
    var dip = C.dipConfig || getConfig(C.pinCount);

    var BX = dip.bodyX, BY = dip.bodyY, BW = dip.bodyW, BH = dip.bodyH;
    var SIDE = dip.pinsPerSide;
    var PL = dip.pinLength;
    var PW2 = dip.pinWidthHalf;
    var PITCH = BH / SIDE;

    var viewBoxWidth = BX * 2 + BW + 40;
    var viewBoxHeight = BY * 2 + BH + 20;
    svg.setAttribute('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    function mk(t, a) {
      var e = document.createElementNS(NS, t);
      for (var k in a) e.setAttribute(k, a[k]);
      return e;
    }

    // Clear SVG
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // Defs
    var defs = mk('defs', {});
    svg.appendChild(defs);

    // Body gradient
    var grad = mk('linearGradient', { id: 'bodyGrad', x1: '0%', y1: '0%', x2: '100%', y2: '100%' });
    grad.appendChild(mk('stop', { offset: '0%', 'stop-color': '#1e2430' }));
    grad.appendChild(mk('stop', { offset: '100%', 'stop-color': '#0d1018' }));
    defs.appendChild(grad);

    // Glow filter — use userSpaceOnUse + absolute coords so toggling the filter
    // on click does NOT change the SVG's intrinsic size and cause layout reflow.
    var glow = mk('filter', {
      id: 'pinGlow', filterUnits: 'userSpaceOnUse',
      x: '0', y: '0', width: String(viewBoxWidth), height: String(viewBoxHeight)
    });
    glow.appendChild(mk('feGaussianBlur', { stdDeviation: '3', result: 'blur' }));
    var merge = mk('feMerge', {});
    merge.appendChild(mk('feMergeNode', { in: 'blur' }));
    merge.appendChild(mk('feMergeNode', { in: 'SourceGraphic' }));
    glow.appendChild(merge);
    defs.appendChild(glow);

    // IC body
    var bodyRect = mk('rect', { x: BX, y: BY, width: BW, height: BH, rx: '6', fill: 'url(#bodyGrad)', stroke: 'none' });
    svg.appendChild(bodyRect);

    // Pin-1 notch
    var notch = mk('circle', { cx: BX + dip.notchX, cy: BY + dip.notchY, r: dip.notchSize, fill: '#2a3040', stroke: '#4a5568', 'stroke-width': '1.5', opacity: '0.9' });
    svg.appendChild(notch);
    var notchInner = mk('circle', { cx: BX + dip.notchX, cy: BY + dip.notchY, r: dip.notchSize / 2, fill: '#5a6478', opacity: '0.7' });
    svg.appendChild(notchInner);

    // Text labels
    var CX = BX + BW / 2;
    var CY = BY + BH / 2;
    var yOff = dip.yOffset;

    var mfr = mk('text', { x: CX, y: CY + yOff, fill: '#3a4a5a', 'font-family': 'monospace', 'font-size': dip.textSizes.mfr, 'font-weight': 'bold', 'text-anchor': 'middle' });
    mfr.textContent = C.manufacturer || 'MICROCHIP';
    svg.appendChild(mfr);

    var part = mk('text', { x: CX, y: CY - 4, fill: '#4a5c70', 'font-family': 'monospace', 'font-size': dip.textSizes.part, 'font-weight': 'bold', 'text-anchor': 'middle' });
    part.textContent = C.partName;
    svg.appendChild(part);

    var pkg = mk('text', { x: CX, y: CY + 16, fill: '#2a3a48', 'font-family': 'monospace', 'font-size': dip.textSizes.pkg, 'text-anchor': 'middle' });
    pkg.textContent = C.package;
    svg.appendChild(pkg);

    var pinCount = mk('text', { x: CX, y: CY + 36, fill: '#1e2a38', 'font-family': 'monospace', 'font-size': dip.textSizes.pinCount, 'text-anchor': 'middle' });
    pinCount.textContent = C.pinCount + ' PINS';
    svg.appendChild(pinCount);

    // Compute pin positions
    var pins = C.pins;
    pins.forEach(function (pin) {
      var n = pin.num;
      if (n >= 1 && n <= SIDE) {
        var slot = n - 1;
        var cy = BY + slot * PITCH + PITCH / 2;
        pin._px = BX - PL;
        pin._py = cy - PW2 / 2;
      } else {
        var slot = (pin._rightSlot !== undefined) ? pin._rightSlot : (C.pinCount - n);
        var cy = BY + slot * PITCH + PITCH / 2;
        pin._px = BX + BW;
        pin._py = cy - PW2 / 2;
      }
    });

    // Draw each pin
    pins.forEach(function (pin) {
      var col = window.ICExplorer ? window.ICExplorer.getColor(pin.type) : { bg: '#1c2128', c: '#78c878', bd: '#a5d6a7' };
      if (!col.bg) col = { bg: '#1c2128', c: '#78c878', bd: '#a5d6a7' };

      var g = mk('g', { 'class': 'ic-pin', 'data-id': pin.id });
      g.style.cursor = 'pointer';

      var px = pin._px, py = pin._py;
      var cx = px + PL / 2, cy = py + PW2 / 2;

      var sq = mk('rect', {
        x: px, y: py, width: PL, height: PW2, rx: '2',
        fill: col.bg, stroke: '#4a4f5a', 'stroke-width': '1.5', 'class': 'pin-sq'
      });
      g.appendChild(sq);

      var numLabel = mk('text', {
        x: cx, y: cy + 3, 'text-anchor': 'middle', fill: col.c,
        'font-size': dip.pinNumSize, 'font-family': 'monospace', 'font-weight': 'bold', 'pointer-events': 'none'
      });
      numLabel.textContent = String(pin.num);
      g.appendChild(numLabel);

      // Pin label
      var labelY = py - 4;
      var label = mk('text', {
        x: cx, y: labelY, 'text-anchor': 'middle', fill: 'rgba(160,215,255,0.88)',
        'font-size': dip.labelSize, 'font-family': 'monospace', 'font-weight': 'bold', 'pointer-events': 'none'
      });
      label.textContent = pin.lbl;
      g.appendChild(label);

      svg.appendChild(g);
    });

    // Outline
    var outline = mk('rect', { x: BX, y: BY, width: BW, height: BH, rx: '4', fill: 'none', stroke: '#2a3545', 'stroke-width': '2' });
    svg.appendChild(outline);

    console.log('DIP Renderer drew', C.partName);
  }

  return { draw: draw };
})();

window.DIPRenderer = DIPRenderer;
