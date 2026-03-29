/**
 * QFP / LQFP / TQFP Package Renderer
 *
 * Draws a proper 4-sided IC diagram for QFP packages.
 * Supports any pin-count that is divisible by 4 (e.g. LQFP-48, LQFP-64, TQFP-32).
 *
 * Pin layout convention (counter-clockwise, pin 1 at top-left):
 *   LEFT   side → first  quarter of pins, top → bottom
 *   BOTTOM side → second quarter of pins, left → right
 *   RIGHT  side → third  quarter of pins, bottom → top
 *   TOP    side → fourth quarter of pins, right → left
 *
 * This matches the LQFP-48 STM32F103C8T6 layout exactly.
 */

var QFPRenderer = (function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  /* ── SVG helpers ──────────────────────────────────────── */
  function mk(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function tx(content, attrs) {
    var el = mk('text', attrs);
    el.textContent = content;
    return el;
  }

  function ap(parent, child) {
    parent.appendChild(child);
    return child;
  }

  /* ── Colour helper ────────────────────────────────────── */
  function getColor(type) {
    // Try the shared ICExplorer palette first, then fall back to built-in map
    if (window.ICExplorer && typeof window.ICExplorer.getColor === 'function') {
      return window.ICExplorer.getColor(type);
    }
    var MAP = {
      GPIO:  { c: '#78c878', bg: 'rgba(100,200,100,.12)', bd: 'rgba(100,200,100,.30)' },
      PWR:   { c: '#ff6b6b', bg: 'rgba(255,107,107,.14)', bd: 'rgba(255,107,107,.35)' },
      GND:   { c: '#a8a8a8', bg: 'rgba(168,168,168,.12)', bd: 'rgba(168,168,168,.30)' },
      ADC:   { c: '#c8a850', bg: 'rgba(200,168,80,.12)',  bd: 'rgba(200,168,80,.30)'  },
      SPI:   { c: '#4a9aee', bg: 'rgba(74,154,238,.12)',  bd: 'rgba(74,154,238,.30)'  },
      I2C:   { c: '#9898d8', bg: 'rgba(152,152,216,.12)', bd: 'rgba(152,152,216,.30)' },
      UART:  { c: '#cc6888', bg: 'rgba(204,104,136,.12)', bd: 'rgba(204,104,136,.30)' },
      USB:   { c: '#4a9aee', bg: 'rgba(74,154,238,.12)',  bd: 'rgba(74,154,238,.30)'  },
      CAN:   { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  },
      PWM:   { c: '#50c8c8', bg: 'rgba(80,200,200,.12)',  bd: 'rgba(80,200,200,.30)'  },
      TIMER: { c: '#50c8c8', bg: 'rgba(80,200,200,.12)',  bd: 'rgba(80,200,200,.30)'  },
      XTAL:  { c: '#7090a8', bg: 'rgba(112,144,168,.12)', bd: 'rgba(112,144,168,.30)' },
      RESET: { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  },
      JTAG:  { c: '#c8a850', bg: 'rgba(200,168,80,.12)',  bd: 'rgba(200,168,80,.30)'  },
      BOOT:  { c: '#50c8c8', bg: 'rgba(80,200,200,.12)',  bd: 'rgba(80,200,200,.30)'  },
      INT:   { c: '#c8a850', bg: 'rgba(200,168,80,.12)',  bd: 'rgba(200,168,80,.30)'  }
    };
    return MAP[type] || MAP.GPIO;
  }

  /* ── Main draw function ───────────────────────────────── */
  function draw(svg, config) {
    var C = config;

    /* ── Layout constants ─────────────────────────────────
     *
     *  VB   = total SVG viewBox size (square)
     *  PL   = pin length  (how far the pin stub extends from body edge)
     *  PW   = pin width   (narrow dimension of the pin rectangle)
     *  PAD  = padding from viewBox edge to pin tip
     *  BODY = body square, centred in viewBox
     *
     *  pinsPerSide = pinCount / 4
     *  pitchUsable = body edge length, divided into (pinsPerSide - 1) steps
     */
    var VB          = 560;
    var PL          = 30;   // pin length
    var PW          = 20;   // pin width
    var PAD         = 10;   // gap from viewBox edge
    var MARGIN      = PAD + PL + 8;   // body starts this far from edge

    var BX = MARGIN;
    var BY = MARGIN;
    var BW = VB - 2 * MARGIN;
    var BH = BW;            // always square for QFP

    var pinsPerSide = Math.floor(C.pinCount / 4);
    var pins        = C.pins;

    /* pitch: distribute pins evenly along the body edge,
     * leaving a small margin at each corner */
    var CORNER  = 22;       // clearance at each corner of the body edge
    var pitchH  = (BW - 2 * CORNER) / (pinsPerSide - 1);  // horizontal sides
    var pitchV  = (BH - 2 * CORNER) / (pinsPerSide - 1);  // vertical sides

    /* ── Prepare SVG ──────────────────────────────────────── */
    svg.setAttribute('viewBox', '0 0 ' + VB + ' ' + VB);
    svg.setAttribute('width',   '100%');
    svg.setAttribute('height',  'auto');
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    /* ── Defs: glow filter + gradients ───────────────────── */
    var defs = ap(svg, mk('defs', {}));

    var gf = mk('filter', { id: 'qfpPinGlow', x: '-60%', y: '-60%', width: '220%', height: '220%' });
    var blur = mk('feGaussianBlur', { stdDeviation: '3', result: 'blur' });
    var merge = mk('feMerge', {});
    ap(merge, mk('feMergeNode', { in: 'blur' }));
    ap(merge, mk('feMergeNode', { in: 'SourceGraphic' }));
    ap(gf, blur);
    ap(gf, merge);
    ap(defs, gf);

    var bodyGrad = mk('linearGradient', { id: 'qfpBodyGrad', x1: '0%', y1: '0%', x2: '100%', y2: '100%' });
    ap(bodyGrad, mk('stop', { offset: '0%',   'stop-color': '#1c2128' }));
    ap(bodyGrad, mk('stop', { offset: '100%', 'stop-color': '#0d1117' }));
    ap(defs, bodyGrad);

    /* ── Chip body ─────────────────────────────────────────── */
    ap(svg, mk('rect', {
      x: BX, y: BY, width: BW, height: BH,
      rx: '10', fill: 'url(#qfpBodyGrad)',
      stroke: '#30363d', 'stroke-width': '2'
    }));
    // inner border detail
    ap(svg, mk('rect', {
      x: BX + 5, y: BY + 5, width: BW - 10, height: BH - 10,
      rx: '6', fill: 'none',
      stroke: '#21262d', 'stroke-width': '1'
    }));

    /* ── Pin-1 indicator (notch + dot at top-left corner) ── */
    ap(svg, mk('circle', {
      cx: BX + 16, cy: BY + 16, r: '6',
      fill: '#21262d', stroke: '#4da6ff', 'stroke-width': '1.2', opacity: '0.85'
    }));
    ap(svg, mk('circle', {
      cx: BX + 16, cy: BY + 16, r: '3',
      fill: '#4da6ff', opacity: '0.6'
    }));

    /* ── Decorative grid dots on body ─────────────────────── */
    for (var gxi = 0; gxi < 4; gxi++) {
      for (var gyi = 0; gyi < 4; gyi++) {
        ap(svg, mk('circle', {
          cx: BX + 60 + gxi * 90,
          cy: BY + 60 + gyi * 90,
          r: '1.5', fill: '#21262d'
        }));
      }
    }

    /* ── Chip body labels ──────────────────────────────────── */
    var cx = BX + BW / 2;
    var cy = BY + BH / 2;
    ap(svg, tx(C.manufacturer || '', {
      x: cx, y: cy - 52,
      fill: '#2a3545', 'font-family': 'monospace',
      'font-size': '13', 'font-weight': 'bold', 'text-anchor': 'middle'
    }));
    ap(svg, tx(C.partName || '', {
      x: cx, y: cy,
      fill: '#3a5060', 'font-family': 'monospace',
      'font-size': '26', 'font-weight': 'bold', 'text-anchor': 'middle'
    }));
    ap(svg, tx(C.package || '', {
      x: cx, y: cy + 32,
      fill: '#2a3a4a', 'font-family': 'monospace',
      'font-size': '14', 'text-anchor': 'middle'
    }));
    ap(svg, tx(C.pinCount + ' pins', {
      x: cx, y: cy + 52,
      fill: '#1e2a38', 'font-family': 'monospace',
      'font-size': '12', 'text-anchor': 'middle'
    }));

    /* ── Pin drawing helper ───────────────────────────────────
     *
     *  px, py  = centre anchor point of the pin (on the body edge)
     *  side    = 'left' | 'bottom' | 'right' | 'top'
     *
     *  For left/right sides  → pin stub extends horizontally
     *  For top/bottom sides  → pin stub extends vertically
     */
    function makePin(pin, px, py, side) {
      var col = getColor(pin.type);

      var rx, ry, rw, rh;      // pin rectangle geometry
      var numX, numY;           // pin number label position

      if (side === 'left') {
        rw = PL; rh = PW;
        rx = px - PL; ry = py - PW / 2;
        numX = rx + PL / 2; numY = ry + PW / 2 + 4;
      } else if (side === 'right') {
        rw = PL; rh = PW;
        rx = px; ry = py - PW / 2;
        numX = rx + PL / 2; numY = ry + PW / 2 + 4;
      } else if (side === 'top') {
        rw = PW; rh = PL;
        rx = px - PW / 2; ry = py - PL;
        numX = rx + PW / 2; numY = ry + PL / 2 + 4;
      } else {                  // bottom
        rw = PW; rh = PL;
        rx = px - PW / 2; ry = py;
        numX = rx + PW / 2; numY = ry + PL / 2 + 4;
      }

      var g = mk('g', { 'class': 'ic-pin', 'data-id': pin.id, 'data-num': pin.num });
      g.style.cursor = 'pointer';

      // pin stub rectangle
      var pinRect = mk('rect', {
        x: rx, y: ry, width: rw, height: rh,
        rx: '3',
        fill: col.bg, stroke: col.c,
        'stroke-width': '1.3', 'class': 'pin-sq'
      });
      ap(g, pinRect);

      // centre dot
      ap(g, mk('rect', {
        x: numX - 2, y: numY - 6, width: 4, height: 4,
        rx: '1', fill: '#060c1a', 'pointer-events': 'none'
      }));

      // pin number label
      var numLabel = mk('text', {
        x: numX, y: numY,
        'text-anchor': 'middle',
        fill: col.c,
        'font-size': '11',
        'font-family': 'monospace',
        'font-weight': 'bold',
        'pointer-events': 'none'
      });
      numLabel.textContent = pin.num;
      ap(g, numLabel);

      // larger invisible hit-target for easier clicking
      ap(g, mk('rect', {
        x: rx - 4, y: ry - 4,
        width: rw + 8, height: rh + 8,
        fill: 'transparent'
      }));

      /* ── Events ──────────────────────────────────────────── */
      g.addEventListener('click', function (e) {
        e.stopPropagation();
        // Notify ICExplorer of the pin selection
        if (window.ICExplorer && typeof window.ICExplorer.selectPin === 'function') {
          window.ICExplorer.selectPin(this.getAttribute('data-id'));
        }
      });

      // Visual hover: handled by CSS class .ic-pin .pin-sq in ic-explorer-core.css
      // (brightness filter + glow already defined there)
      // We additionally support a tooltip callback if available
      g.addEventListener('mouseenter', function (e) {
        if (window.ICExplorer && typeof window.ICExplorer.showTooltip === 'function') {
          var pid = this.getAttribute('data-id');
          var p = C.pins.find(function (x) { return x.id === pid; });
          window.ICExplorer.showTooltip(p, e);
        }
        // Visual highlight when ICExplorer is not handling it
        var sq = this.querySelector('.pin-sq');
        if (sq) sq.setAttribute('filter', 'url(#qfpPinGlow)');
      });

      g.addEventListener('mousemove', function (e) {
        if (window.ICExplorer && typeof window.ICExplorer.moveTooltip === 'function') {
          window.ICExplorer.moveTooltip(e);
        }
      });

      g.addEventListener('mouseleave', function () {
        if (window.ICExplorer && typeof window.ICExplorer.hideTooltip === 'function') {
          window.ICExplorer.hideTooltip();
        }
        var sq = this.querySelector('.pin-sq');
        if (sq) sq.removeAttribute('filter');
      });

      ap(svg, g);
    }

    /* ── Draw all 4 sides ────────────────────────────────────
     *
     *  LEFT   → pins[0 .. pinsPerSide-1]          top → bottom
     *  BOTTOM → pins[pinsPerSide .. 2*pps-1]      left → right
     *  RIGHT  → pins[2*pps .. 3*pps-1]            bottom → top
     *  TOP    → pins[3*pps .. 4*pps-1]            right → left
     */

    // LEFT side
    for (var i = 0; i < pinsPerSide; i++) {
      var p = pins[i];
      if (!p) continue;
      var py = BY + CORNER + i * pitchV;
      makePin(p, BX, py, 'left');
    }

    // BOTTOM side
    for (var j = 0; j < pinsPerSide; j++) {
      var p = pins[pinsPerSide + j];
      if (!p) continue;
      var px = BX + CORNER + j * pitchH;
      makePin(p, px, BY + BH, 'bottom');
    }

    // RIGHT side (bottom → top, so reverse index)
    for (var k = 0; k < pinsPerSide; k++) {
      var p = pins[2 * pinsPerSide + k];
      if (!p) continue;
      var py = BY + BH - CORNER - k * pitchV;
      makePin(p, BX + BW, py, 'right');
    }

    // TOP side (right → left, so reverse index)
    for (var m = 0; m < pinsPerSide; m++) {
      var p = pins[3 * pinsPerSide + m];
      if (!p) continue;
      var px = BX + BW - CORNER - m * pitchH;
      makePin(p, px, BY, 'top');
    }

    console.log('QFPRenderer: drew ' + C.partName + ' (' + C.package + ', ' + C.pinCount + ' pins)');
  }

  /* ── Public API ───────────────────────────────────────── */
  return { draw: draw };

})();

window.QFPRenderer = QFPRenderer;
