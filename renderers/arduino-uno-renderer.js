// ============================================================
//  renderers/arduino-uno-renderer.js
//  IC Explorer — Arduino Uno R3 board renderer
//
//  KEY FIX: pin <g> elements now use class="ic-pin" (not "uno-pin")
//  so that ic-explorer-base.js attachPinEvents() and
//  updateBoardHighlight() can find them via querySelectorAll('.ic-pin')
//
//  SECOND FIX: glow filter id changed from 'unoRendererPinGlow'
//  to 'pinGlow' to match the url(#pinGlow) reference in base engine.
//
//  SIZE FIX: board scaled to 55% with a 20px padding gap on all sides.
//  All drawing uses a <g transform="translate(PAD,PAD) scale(0.55)"> so
//  existing coordinates are preserved exactly — only SCALE and PAD need
//  changing to resize or reposition the board.
// ============================================================

(function (global) {
  'use strict';

  var NS    = 'http://www.w3.org/2000/svg';
  var SCALE = 0.55;   // board scale — change this one value to resize
  var PAD   = 20;     // gap (px in viewBox units) between board and viewport edge
  var USB_OVERHANG = Math.ceil(30 * SCALE); // extra top space for USB protrusion

  function mk(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  function mkt(str, attrs) {
    var el = mk('text', attrs);
    el.textContent = str;
    return el;
  }
  function app(p, c) { p.appendChild(c); return c; }

  var STD_COLORS = {
    GPIO:  { c: '#78c878', bg: 'rgba(120,200,120,.14)', bd: 'rgba(120,200,120,.35)' },
    ADC:   { c: '#c8a850', bg: 'rgba(200,168,80,.13)',  bd: 'rgba(200,168,80,.34)'  },
    PWR:   { c: '#ff6b6b', bg: 'rgba(255,107,107,.13)', bd: 'rgba(255,107,107,.34)' },
    GND:   { c: '#a8a8a8', bg: 'rgba(168,168,168,.12)', bd: 'rgba(168,168,168,.30)' },
    UART:  { c: '#cc6888', bg: 'rgba(204,104,136,.12)', bd: 'rgba(204,104,136,.32)' },
    SPI:   { c: '#4a9aee', bg: 'rgba(74,154,238,.12)',  bd: 'rgba(74,154,238,.32)'  },
    I2C:   { c: '#9898d8', bg: 'rgba(152,152,216,.12)', bd: 'rgba(152,152,216,.30)' },
    PWM:   { c: '#50c8c8', bg: 'rgba(80,200,200,.12)',  bd: 'rgba(80,200,200,.30)'  },
    SPEC:  { c: '#7090a8', bg: 'rgba(112,144,168,.12)', bd: 'rgba(112,144,168,.30)' },
  };

  function getColor(type, customTypes) {
    if (customTypes && customTypes[type]) return customTypes[type];
    return STD_COLORS[type] || STD_COLORS.SPEC;
  }

  // Pin coordinates are in the original 390×470 space.
  // The translate+scale group transform brings them into the padded viewBox.
  var PIN_COORDS = {
    // Right upper block: distributed within y=138 to y=321 (h=183), margin=12, pitch≈22.7
    'AREF':   { x: 380, y: 150, side: 'right' },
    'GND_D':  { x: 380, y: 173, side: 'right' },
    'D13':    { x: 380, y: 195, side: 'right' },
    'D12':    { x: 380, y: 218, side: 'right' },
    'D11':    { x: 380, y: 241, side: 'right' },
    'D10':    { x: 380, y: 264, side: 'right' },
    'D9':     { x: 380, y: 286, side: 'right' },
    'D8':     { x: 380, y: 309, side: 'right' },
    // Right lower block: starts y=310, pitch=19, ends y=443 (all inside board y=470)
    'D7':     { x: 380, y: 310, side: 'right' },
    'D6':     { x: 380, y: 329, side: 'right' },
    'D5':     { x: 380, y: 348, side: 'right' },
    'D4':     { x: 380, y: 367, side: 'right' },
    'D3':     { x: 380, y: 386, side: 'right' },
    'D2':     { x: 380, y: 405, side: 'right' },
    'TX0':    { x: 380, y: 424, side: 'right' },
    'RX0':    { x: 380, y: 443, side: 'right' },
    // Left upper block: distributed within y=184 to y=323 (h=139), margin=12, pitch≈19.2
    // Left upper block: distributed within y=184 to y=323 (h=139), margin=12, pitch≈19.2
    'IOREF':  { x: 8,   y: 196, side: 'left'  },
    'RST':    { x: 8,   y: 215, side: 'left'  },
    '3V3':    { x: 8,   y: 234, side: 'left'  },
    '5V':     { x: 8,   y: 254, side: 'left'  },
    'GND_P':  { x: 8,   y: 273, side: 'left'  },
    'GND_P2': { x: 8,   y: 292, side: 'left'  },
    'VIN':    { x: 8,   y: 311, side: 'left'  },
    // Left lower block: starts y=330, pitch=19, ends y=445 (all inside board y=470)
    'A0':     { x: 8,   y: 330, side: 'left'  },
    'A1':     { x: 8,   y: 349, side: 'left'  },
    'A2':     { x: 8,   y: 368, side: 'left'  },
    'A3':     { x: 8,   y: 387, side: 'left'  },
    'A4':     { x: 8,   y: 406, side: 'left'  },
    'A5':     { x: 8,   y: 425, side: 'left'  },
  };
  };

  var PS = 18;

  var _svg    = null;
  var _config = null;
  var _pinEls = {};

  // ── draw ─────────────────────────────────────────────────────
  function draw(svg, config) {
    _svg    = svg;
    _config = config;
    _pinEls = {};

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // viewBox = scaled board size + padding on both sides + extra top for USB overhang
    var vw = Math.round(390 * SCALE) + PAD * 2;
    var vh = Math.round(470 * SCALE) + PAD * 2 + USB_OVERHANG;
    svg.setAttribute('viewBox', '0 0 ' + vw + ' ' + vh);
    svg.setAttribute('xmlns', NS);
    svg.style.cssText = 'display:block;width:100%;height:auto;overflow:visible;';

    _buildDefs(svg);

    // Offset by PAD + USB_OVERHANG on top so USB protrusion is visible, then scale
    var g = mk('g', { transform: 'translate(' + PAD + ',' + (PAD + USB_OVERHANG) + ') scale(' + SCALE + ')' });
    svg.appendChild(g);

    _buildBoard(g);
    _buildPins(g, svg, config);
  }

  function _buildDefs(svg) {
    var defs = app(svg, mk('defs', {}));

    function linGrad(id, stops) {
      var g = mk('linearGradient', { id: id, x1: '0', y1: '0', x2: '1', y2: '1' });
      stops.forEach(function (s) {
        var st = mk('stop', { offset: s[0] });
        st.setAttribute('stop-color', s[1]);
        g.appendChild(st);
      });
      defs.appendChild(g);
    }

    linGrad('unoPcbGr', [['0%','#1a3a6e'],['50%','#142d58'],['100%','#0e2040']]);
    linGrad('unoChipGr',[['0%','#1e1e1e'],['100%','#0a0a0a']]);
    linGrad('unoSilvGr',[['0%','#d8d8d8'],['50%','#a8a8a8'],['100%','#787878']]);
    linGrad('unoUsbGr', [['0%','#888'],   ['100%','#555']]);

    var pat = mk('pattern', { id: 'unoDotsPat', width: '18', height: '18', patternUnits: 'userSpaceOnUse' });
    app(pat, mk('circle', { cx: '9', cy: '9', r: '0.6', fill: 'rgba(100,160,255,0.12)' }));
    defs.appendChild(pat);

    // id must be 'pinGlow' — base engine writes url(#pinGlow)
    var filt = mk('filter', { id: 'pinGlow', x: '-50%', y: '-50%', width: '200%', height: '200%' });
    var fgb  = mk('feGaussianBlur', { stdDeviation: '3.5', result: 'blur' });
    filt.appendChild(fgb);
    var fm = mk('feMerge', {});
    app(fm, mk('feMergeNode', { in: 'blur' }));
    app(fm, mk('feMergeNode', { in: 'SourceGraphic' }));
    filt.appendChild(fm);
    defs.appendChild(filt);
  }

  function _buildBoard(g) {
    app(g, mk('path', { d: 'M0,0 L390,0 L390,470 L40,470 L0,443 Z', fill: 'url(#unoPcbGr)', stroke: '#0a1830', 'stroke-width': '2' }));
    app(g, mk('path', { d: 'M0,0 L390,0 L390,470 L40,470 L0,443 Z', fill: 'url(#unoDotsPat)' }));
    app(g, mk('path', { d: 'M1,1 L389,1 L389,469 L41,469 L1,442 Z', fill: 'none', stroke: 'rgba(100,160,255,0.12)', 'stroke-width': '1' }));

    [{ cx: 15, cy: 12 }, { cx: 55, cy: 458 }].forEach(function (h) {
      app(g, mk('circle', { cx: h.cx, cy: h.cy, r: '10', fill: '#0a1830', stroke: '#0d2040', 'stroke-width': '1.5' }));
      app(g, mk('circle', { cx: h.cx, cy: h.cy, r: '5',  fill: '#060e1a' }));
    });

    // USB-B — shifted up 30px so it protrudes above the board edge like the real Uno
    var USB_Y = -30;
    app(g, mk('rect', { x: '245', y: USB_Y,      width: '88', height: '96', rx: '3', fill: 'url(#unoUsbGr)', stroke: '#444', 'stroke-width': '1.5' }));
    app(g, mk('rect', { x: '250', y: USB_Y + 3,  width: '78', height: '90', rx: '2', fill: '#333' }));
    app(g, mk('rect', { x: '256', y: USB_Y,      width: '66', height: '18', rx: '2', fill: '#1a1a1a', stroke: '#666', 'stroke-width': '1' }));
    app(g, mk('rect', { x: '265', y: USB_Y + 22, width: '48', height: '32', rx: '3', fill: '#1a1a1a', stroke: '#555', 'stroke-width': '1' }));
    app(g, mk('rect', { x: '270', y: USB_Y + 26, width: '38', height: '24', rx: '2', fill: '#222' }));
    app(g, mkt('USB',    { fill: '#666', 'font-family': 'monospace', 'font-size': '9', 'text-anchor': 'middle', x: '289', y: USB_Y + 66 }));
    app(g, mkt('TYPE-B', { fill: '#555', 'font-family': 'monospace', 'font-size': '7', 'text-anchor': 'middle', x: '289', y: USB_Y + 75 }));
    [267, 279, 291, 303].forEach(function (x) {
      app(g, mk('rect', { x: x, y: USB_Y + 80, width: '8', height: '8', rx: '1', fill: '#b87333' }));
    });

    // DC jack — shifted up 12px so it slightly protrudes above the board edge; circles removed
    var DC_Y = -12;
    app(g, mk('rect',   { x: '35', y: DC_Y,     width: '68', height: '68', rx: '4', fill: 'url(#unoUsbGr)', stroke: '#444', 'stroke-width': '1.5' }));
    app(g, mk('rect',   { x: '39', y: DC_Y + 3, width: '60', height: '62', rx: '3', fill: '#2a2a2a' }));
    app(g, mkt('DC',    { fill: '#555', 'font-family': 'monospace', 'font-size': '8', 'text-anchor': 'middle', x: '69', y: DC_Y + 42 }));
    app(g, mkt('7-12V', { fill: '#444', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '69', y: DC_Y + 50 }));

    // Reset button
    app(g, mk('rect',   { x: '346', y: '4',  width: '32', height: '32', rx: '4', fill: '#3a3a3a', stroke: '#2a2a2a', 'stroke-width': '1' }));
    app(g, mk('circle', { cx: '362', cy: '20', r: '14', fill: '#cc2222', stroke: '#991111', 'stroke-width': '1.5' }));
    app(g, mk('circle', { cx: '362', cy: '20', r: '9',  fill: '#dd3333' }));
    app(g, mk('circle', { cx: '359', cy: '18', r: '3',  fill: 'rgba(255,150,150,0.4)' }));
    app(g, mkt('RESET', { fill: '#2a4a6a', 'font-family': 'monospace', 'font-size': '7', 'text-anchor': 'middle', x: '362', y: '45' }));

    // ICSP header
    app(g, mk('rect', { x: '180', y: '410', width: '64', height: '36', rx: '2', fill: '#0d0d0d', stroke: '#333', 'stroke-width': '1.2' }));
    [[186,416],[202,416],[218,416],[186,429],[202,429],[218,429]].forEach(function (pos) {
      app(g, mk('rect', { x: pos[0], y: pos[1], width: '10', height: '9', rx: '1', fill: '#222', stroke: '#555', 'stroke-width': '0.7' }));
    });
    app(g, mkt('ICSP2', { fill: 'rgba(140,190,255,0.4)', 'font-family': 'monospace', 'font-size': '7', 'text-anchor': 'middle', x: '212', y: '458' }));

    // ATmega328P — DIP-28
    // Top aligned to IOREF pin (y=196), bottom to A4 pin (y=417)
    // Left edge 40px from the left header right edge (header centre x=8, PS=15 → edge=16, so bx=56)
    // Width scaled to DIP-28 proportions (~1:3 w:h) → 64px wide
    (function () {
      var by = 196, bh = 417 - 196; // y=196 to y=417 → height=221
      var bw = 64;
      var bx = 96;  // moved 40px right from original (116 - 20)
      var nPins = 14;
      // distribute 14 pins evenly within the body height with a small margin
      var margin = 10;
      var usable = bh - margin * 2;
      var pitch  = usable / (nPins - 1);
      var stubW  = 12, stubH = 6;
      var pinStartY = by + margin;

      // IC body
      app(g, mk('rect', { x: bx, y: by, width: bw, height: bh, rx: '4',
        fill: 'url(#unoChipGr)', stroke: '#3a3a3a', 'stroke-width': '2' }));

      // Notch (semicircle) at top centre
      app(g, mk('path', {
        d: 'M ' + (bx + bw/2 - 10) + ',' + by +
           ' A 10 10 0 0 0 ' + (bx + bw/2 + 10) + ',' + by,
        fill: '#0a0a0a', stroke: '#3a3a3a', 'stroke-width': '1.5'
      }));

      // Pin 1 dot (top-left corner)
      app(g, mk('circle', { cx: bx + 8, cy: by + 12, r: '2.5', fill: '#555' }));

      // Left pins: 1-14 top to bottom
      for (var i = 0; i < nPins; i++) {
        var py = pinStartY + i * pitch;
        app(g, mk('rect', { x: bx - stubW, y: py - stubH/2,
          width: stubW, height: stubH, rx: '1',
          fill: '#d0d8e0', stroke: '#909090', 'stroke-width': '0.5' }));
      }

      // Right pins: 15-28 bottom to top
      for (var j = 0; j < nPins; j++) {
        var ry = pinStartY + (nPins - 1 - j) * pitch;
        app(g, mk('rect', { x: bx + bw, y: ry - stubH/2,
          width: stubW, height: stubH, rx: '1',
          fill: '#d0d8e0', stroke: '#909090', 'stroke-width': '0.5' }));
      }

      // Labels
      var cx = bx + bw/2, cy = by + bh/2;
      app(g, mkt('ATmega',  { fill: '#555', 'font-family': 'monospace', 'font-size': '13',
        'font-weight': 'bold', 'text-anchor': 'middle', x: cx, y: cy - 12 }));
      app(g, mkt('328P-PU', { fill: '#555', 'font-family': 'monospace', 'font-size': '13',
        'font-weight': 'bold', 'text-anchor': 'middle', x: cx, y: cy + 4  }));
      app(g, mkt('ARDUINO', { fill: '#383838', 'font-family': 'monospace', 'font-size': '9',
        'text-anchor': 'middle', x: cx, y: cy + 20 }));
    }());

    // ATmega16U2
    app(g, mk('rect', { x: '270', y: '138', width: '56', height: '56', rx: '3', fill: 'url(#unoChipGr)', stroke: '#1e1e1e', 'stroke-width': '1.5' }));
    app(g, mk('circle', { cx: '276', cy: '144', r: '2', fill: '#2a2a2a' }));
    app(g, mkt('ATmega',     { fill: '#2e2e2e', 'font-family': 'monospace', 'font-size': '8', 'font-weight': 'bold', 'text-anchor': 'middle', x: '298', y: '161' }));
    app(g, mkt('16U2',       { fill: '#2e2e2e', 'font-family': 'monospace', 'font-size': '8', 'font-weight': 'bold', 'text-anchor': 'middle', x: '298', y: '171' }));
    app(g, mkt('USB-SERIAL', { fill: '#242424', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '298', y: '181' }));

    // Crystal
    app(g, mk('rect',   { x: '260', y: '358', width: '22', height: '35', rx: '9', fill: 'url(#unoSilvGr)', stroke: '#888', 'stroke-width': '1.5' }));
    app(g, mk('rect',   { x: '264', y: '366', width: '14', height: '21', rx: '5', fill: '#c0c0c0' }));
    app(g, mkt('16',    { fill: '#555', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '271', y: '378' }));
    app(g, mkt('MHz',   { fill: '#555', 'font-family': 'monospace', 'font-size': '5', 'text-anchor': 'middle', x: '271', y: '386' }));

    // Capacitors
    app(g, mk('ellipse', { cx: '80',  cy: '160', rx: '12', ry: '12', fill: '#3a3a3a', stroke: '#2a2a2a', 'stroke-width': '1.5' }));
    app(g, mk('ellipse', { cx: '80',  cy: '160', rx: '8',  ry: '8',  fill: '#444' }));
    app(g, mkt('10\u03bcF',  { fill: 'rgba(140,190,255,0.25)', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '80',  y: '178' }));
    app(g, mk('ellipse', { cx: '315', cy: '430', rx: '18', ry: '18', fill: '#3a3a3a', stroke: '#2a2a2a', 'stroke-width': '2' }));
    app(g, mk('ellipse', { cx: '315', cy: '430', rx: '12', ry: '12', fill: '#444' }));
    app(g, mkt('100\u03bcF', { fill: 'rgba(140,190,255,0.25)', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '315', y: '450' }));

    // Voltage regulator
    app(g, mk('rect', { x: '88', y: '368', width: '28', height: '34', rx: '2', fill: '#111', stroke: '#222', 'stroke-width': '1.5' }));
    app(g, mkt('7805', { fill: '#1a3a5a', 'font-family': 'monospace', 'font-size': '7', 'text-anchor': 'middle', x: '102', y: '410' }));

    // LEDs
    app(g, mk('rect', { x: '25',  y: '112', width: '14', height: '6', rx: '3', fill: '#00cc44' }));
    app(g, mkt('ON', { fill: 'rgba(140,200,140,0.55)', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'start', x: '40',  y: '118' }));
    app(g, mk('rect', { x: '230', y: '155', width: '10', height: '6', rx: '2', fill: '#eecc00' }));
    app(g, mkt('L',  { fill: 'rgba(200,190,80,0.5)',  'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'start', x: '242', y: '161' }));
    app(g, mk('rect', { x: '230', y: '170', width: '10', height: '6', rx: '2', fill: '#ff8800' }));
    app(g, mkt('TX', { fill: 'rgba(200,130,50,0.5)',  'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'start', x: '242', y: '176' }));
    app(g, mk('rect', { x: '230', y: '182', width: '10', height: '6', rx: '2', fill: '#ff8800' }));
    app(g, mkt('RX', { fill: 'rgba(200,130,50,0.5)',  'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'start', x: '242', y: '188' }));

    // Arduino logo
    var logoG = mk('g', { opacity: '0.5' });
    app(logoG, mk('circle', { cx: '148', cy: '118', r: '22', fill: 'none', stroke: 'rgba(160,210,255,0.7)', 'stroke-width': '3.5' }));
    app(logoG, mk('circle', { cx: '192', cy: '118', r: '22', fill: 'none', stroke: 'rgba(160,210,255,0.7)', 'stroke-width': '3.5' }));
    app(logoG, mk('line',   { x1: '140', y1: '118', x2: '156', y2: '118', stroke: 'rgba(160,210,255,0.85)', 'stroke-width': '3', 'stroke-linecap': 'round' }));
    app(logoG, mk('line',   { x1: '148', y1: '112', x2: '148', y2: '125', stroke: 'rgba(160,210,255,0.85)', 'stroke-width': '3', 'stroke-linecap': 'round' }));
    app(logoG, mk('line',   { x1: '184', y1: '118', x2: '200', y2: '118', stroke: 'rgba(160,210,255,0.85)', 'stroke-width': '3', 'stroke-linecap': 'round' }));
    g.appendChild(logoG);
    app(g, mkt('Arduino', { fill: 'rgba(180,220,255,0.5)',  'font-family': 'Georgia,serif', 'font-size': '12', 'font-style': 'italic', 'font-weight': 'bold', 'text-anchor': 'middle', x: '170', y: '153' }));
    app(g, mkt('UNO',     { fill: 'rgba(160,205,255,0.3)',  'font-family': 'monospace', 'font-size': '12', 'font-weight': '900', 'letter-spacing': '4', 'text-anchor': 'middle', x: '170', y: '166' }));
    app(g, mkt('R3',      { fill: 'rgba(120,170,220,0.25)', 'font-family': 'monospace', 'font-size': '9',  'letter-spacing': '3', 'text-anchor': 'middle', x: '170', y: '177' }));

    // Header housings
    // Right header: extended up to ATmega16U2 top edge (y=138), bottom fixed at y=443
    // Upper block pins (AREF→D8) redistributed evenly within y=138 to y=321 (h=183)
    // Lower block pins (D7→RX0) redistributed evenly within y=327 to y=443 (h=116)
    app(g, mk('rect', { x: '372', y: '138', width: '16', height: '183', rx: '2', fill: '#0d0d0d', stroke: '#1a1a1a', 'stroke-width': '1' }));
    app(g, mk('rect', { x: '372', y: '301', width: '16', height: '151', rx: '2', fill: '#0d0d0d', stroke: '#1a1a1a', 'stroke-width': '1' }));
    // Left header: extended by half of the right-side extension (34px instead of 68px)
    // Original upper block: y=214, h=109 → new y=184, h=139 (only 34px extension upward)
    // Original lower block: y=349, h=94  → extended to y=469
    app(g, mk('rect', { x: '0',   y: '184', width: '16', height: '139', rx: '2', fill: '#0d0d0d', stroke: '#1a1a1a', 'stroke-width': '1' }));
    app(g, mk('rect', { x: '0',   y: '321', width: '16', height: '113',  rx: '2', fill: '#0d0d0d', stroke: '#1a1a1a', 'stroke-width': '1' }));

    // Silkscreen labels — recentred to match new header spans
    // Right DIGITAL label: moved 24px to the left (360 → 336)
    g.appendChild(mkt('DIGITAL (PWM~)', { fill: 'rgba(140,190,255,0.65)', 'font-family': 'monospace', 'font-size': '8', 'font-weight': 'bold', 'text-anchor': 'middle', transform: 'rotate(-90,336,242)', x: '336', y: '242' }));
    // Left POWER label: moved 24px to the right (28 → 52)
    g.appendChild(mkt('POWER',          { fill: 'rgba(140,190,255,0.65)', 'font-family': 'monospace', 'font-size': '8', 'font-weight': 'bold', 'text-anchor': 'middle', transform: 'rotate(90,52,253)',    x: '52',  y: '253' }));
    // Left ANALOG IN label: moved 24px to the right (28 → 52)
    g.appendChild(mkt('ANALOG IN',      { fill: 'rgba(140,190,255,0.65)', 'font-family': 'monospace', 'font-size': '8', 'font-weight': 'bold', 'text-anchor': 'middle', transform: 'rotate(90,52,377)',    x: '52',  y: '377' }));
  }

  // ── interactive pin squares ───────────────────────────────────
  // Note: pin <g> elements are appended to the scale group (scaleG),
  // but event delegation in ic-explorer-base.js uses querySelectorAll('.ic-pin')
  // on the svg, which finds descendants regardless of nesting — this works fine.
  function _buildPins(scaleG, svg, config) {
    var customTypes = config.customTypes || {};

    config.pins.forEach(function (p) {
      var coord = PIN_COORDS[p.id];
      if (!coord) return;

      var col     = getColor(p.type, customTypes);
      var onRight = coord.side === 'right';

      var g = mk('g', { 'class': 'ic-pin', 'data-id': p.id });
      g.style.cursor = 'pointer';

      // PCB pad
      app(g, mk('rect', {
        x: coord.x - PS / 2 - 2, y: coord.y - PS / 2 - 2,
        width: PS + 4, height: PS + 4, rx: '2',
        fill: 'rgba(184,130,60,0.30)', stroke: 'rgba(184,130,60,0.55)', 'stroke-width': '0.5'
      }));

      // Coloured square — class 'pin-sq' required by base engine
      var sq = mk('rect', {
        x: coord.x - PS / 2, y: coord.y - PS / 2,
        width: PS, height: PS, rx: '2',
        fill: col.bg, stroke: col.c, 'stroke-width': '1.5',
        'class': 'pin-sq'
      });
      app(g, sq);

      // Centre hole
      app(g, mk('rect', {
        x: coord.x - 3.5, y: coord.y - 3.5, width: '7', height: '7', rx: '1',
        fill: '#050810', 'pointer-events': 'none'
      }));

      // Face label
      var lbl = mkt(p.lbl.length > 4 ? p.lbl.slice(0, 4) : p.lbl, {
        x: coord.x, y: coord.y + 3.5, 'text-anchor': 'middle',
        fill: col.c, 'font-size': '8', 'font-family': 'monospace',
        'font-weight': 'bold', 'pointer-events': 'none'
      });
      app(g, lbl);

      // Hit-target
      app(g, mk('rect', {
        x: coord.x - 16, y: coord.y - 16, width: '32', height: '32',
        fill: 'transparent'
      }));

      // Silkscreen label (outside the interactive group)
      var silkX  = onRight ? coord.x - PS - 3 : coord.x + PS + 4;
      var anchor = onRight ? 'end' : 'start';
      app(scaleG, mkt(p.lbl, {
        x: silkX, y: coord.y + 4, 'text-anchor': anchor,
        fill: 'rgba(200,225,255,0.75)', 'font-size': '10',
        'font-family': 'monospace', 'font-weight': 'bold', 'pointer-events': 'none'
      }));

      scaleG.appendChild(g);
      _pinEls[p.id] = { g: g, sq: sq, lbl: lbl };
    });
  }

  // ── updatePins ───────────────────────────────────────────────
  function updatePins(selectedId, filterType, filterFn) {
    if (!_config) return;
    var customTypes = _config.customTypes || {};
    var hasFilter   = filterType !== null && filterType !== undefined;

    _config.pins.forEach(function (p) {
      var els = _pinEls[p.id];
      if (!els) return;

      var col        = getColor(p.type, customTypes);
      var sq         = els.sq;
      var lbl        = els.lbl;
      var isSelected = selectedId === p.id;
      var matched    = !hasFilter || (filterFn && filterFn(p));

      if (isSelected) {
        sq.setAttribute('fill',         col.c);
        sq.setAttribute('stroke',       col.c);
        sq.setAttribute('stroke-width', '2.5');
        sq.setAttribute('filter',       'url(#pinGlow)');
        lbl.setAttribute('fill',        '#060c1a');
        els.g.style.opacity = '1';

      } else if (hasFilter && matched) {
        sq.setAttribute('fill',         col.c);
        sq.setAttribute('stroke',       col.c);
        sq.setAttribute('stroke-width', '2');
        sq.setAttribute('filter',       'url(#pinGlow)');
        lbl.setAttribute('fill',        '#060c1a');
        els.g.style.opacity = '1';

      } else if (hasFilter && !matched) {
        sq.setAttribute('fill',         'rgba(20,20,28,0.4)');
        sq.setAttribute('stroke',       'rgba(80,80,90,0.2)');
        sq.setAttribute('stroke-width', '1');
        sq.removeAttribute('filter');
        lbl.setAttribute('fill',        'rgba(100,100,110,0.35)');
        els.g.style.opacity = '0.08';

      } else {
        sq.setAttribute('fill',         col.bg);
        sq.setAttribute('stroke',       col.c);
        sq.setAttribute('stroke-width', '1.5');
        sq.removeAttribute('filter');
        lbl.setAttribute('fill',        col.c);
        els.g.style.opacity = '1';
      }
    });
  }

  global.ArduinoUnoRenderer = { draw: draw, updatePins: updatePins };

}(window));