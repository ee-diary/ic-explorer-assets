// ============================================================
//  renderers/arduino-uno-renderer.js
//  IC Explorer — Arduino Uno R3 board renderer
// ============================================================

(function (global) {
  'use strict';

  var NS    = 'http://www.w3.org/2000/svg';
  var SCALE = 0.55;
  var PAD   = 20;
  var USB_OVERHANG = Math.ceil(30 * SCALE);

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

  // ── Pin coordinates (original 390x470 space) ─────────────────
  var RIGHT_OFFSET = -45;
  
  var PIN_COORDS = {
    // Right upper block
    'AREF':   { x: 380, y: 150 + RIGHT_OFFSET, side: 'right' },
    'GND_D':  { x: 380, y: 173 + RIGHT_OFFSET, side: 'right' },
    'D13':    { x: 380, y: 195 + RIGHT_OFFSET, side: 'right' },
    'D12':    { x: 380, y: 218 + RIGHT_OFFSET, side: 'right' },
    'D11':    { x: 380, y: 241 + RIGHT_OFFSET, side: 'right' },
    'D10':    { x: 380, y: 264 + RIGHT_OFFSET, side: 'right' },
    'D9':     { x: 380, y: 286 + RIGHT_OFFSET, side: 'right' },
    'D8':     { x: 380, y: 309 + RIGHT_OFFSET, side: 'right' },
    // Right lower block
    'D7':     { x: 380, y: 342 + RIGHT_OFFSET, side: 'right' },
    'D6':     { x: 380, y: 361 + RIGHT_OFFSET, side: 'right' },
    'D5':     { x: 380, y: 380 + RIGHT_OFFSET, side: 'right' },
    'D4':     { x: 380, y: 399 + RIGHT_OFFSET, side: 'right' },
    'D3':     { x: 380, y: 418 + RIGHT_OFFSET, side: 'right' },
    'D2':     { x: 380, y: 437 + RIGHT_OFFSET, side: 'right' },
    'TX0':    { x: 380, y: 456 + RIGHT_OFFSET, side: 'right' },
    'RX0':    { x: 380, y: 475 + RIGHT_OFFSET, side: 'right' },
    // Left upper block
    'IOREF':  { x: 8,   y: 191, side: 'left'  },
    'RST':    { x: 8,   y: 210, side: 'left'  },
    '3V3':    { x: 8,   y: 229, side: 'left'  },
    '5V':     { x: 8,   y: 249, side: 'left'  },
    'GND_P':  { x: 8,   y: 268, side: 'left'  },
    'GND_P2': { x: 8,   y: 287, side: 'left'  },
    'VIN':    { x: 8,   y: 306, side: 'left'  },
    // Left lower block
    'A0':     { x: 8,   y: 335, side: 'left'  },
    'A1':     { x: 8,   y: 354, side: 'left'  },
    'A2':     { x: 8,   y: 373, side: 'left'  },
    'A3':     { x: 8,   y: 392, side: 'left'  },
    'A4':     { x: 8,   y: 411, side: 'left'  },
    'A5':     { x: 8,   y: 430, side: 'left'  },
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

    var vw = Math.round(390 * SCALE) + PAD * 2;
    var vh = Math.round(470 * SCALE) + PAD * 2 + USB_OVERHANG;
    svg.setAttribute('viewBox', '0 0 ' + vw + ' ' + vh);
    svg.setAttribute('xmlns', NS);
    svg.style.cssText = 'display:block;width:100%;height:auto;overflow:visible;';

    _buildDefs(svg);

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

    // USB-B
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

    // DC jack
    var DC_Y = -12;
    app(g, mk('rect',   { x: '35', y: DC_Y,     width: '68', height: '68', rx: '4', fill: 'url(#unoUsbGr)', stroke: '#444', 'stroke-width': '1.5' }));
    app(g, mk('rect',   { x: '39', y: DC_Y + 3, width: '60', height: '62', rx: '3', fill: '#2a2a2a' }));
    app(g, mkt('DC',    { fill: '#555', 'font-family': 'monospace', 'font-size': '8', 'text-anchor': 'middle', x: '69', y: DC_Y + 42 }));
    app(g, mkt('7-12V', { fill: '#444', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '69', y: DC_Y + 50 }));

    // Reset button
    app(g, mk('rect',   { x: '346', y: '4',  width: '32', height: '32', rx: '4', fill: '#3a3a3a', stroke: '#2a2a2a', 'stroke-width': '1' }));
    app(g, mk('circle', { cx: '362', cy: '20', r: '10', fill: '#cc2222', stroke: '#991111', 'stroke-width': '1.5' }));
    app(g, mk('circle', { cx: '362', cy: '20', r: '6',  fill: '#dd3333' }));
    app(g, mk('circle', { cx: '359', cy: '18', r: '1',  fill: 'rgba(255,150,150,0.4)' }));
    app(g, mkt('RESET', { fill: '#2a4a6a', 'font-family': 'monospace', 'font-size': '7', 'text-anchor': 'middle', x: '362', y: '45' }));

    // ICSP header
    app(g, mk('rect', { x: '180', y: '310', width: '64', height: '36', rx: '2', fill: '#0d0d0d', stroke: '#333', 'stroke-width': '1.2' }));
    [[186,416],[202,416],[218,416],[186,429],[202,429],[218,429]].forEach(function (pos) {
      app(g, mk('rect', { x: pos[0], y: pos[1], width: '10', height: '9', rx: '1', fill: '#222', stroke: '#555', 'stroke-width': '0.7' }));
    });
    //app(g, mkt('ICSP2', { fill: 'rgba(140,190,255,0.4)', 'font-family': 'monospace', 'font-size': '7', 'text-anchor': 'middle', x: '212', y: '458' }));

    // ATmega16U2
    app(g, mk('rect', { x: '256', y: '138', width: '56', height: '56', rx: '3', fill: 'url(#unoChipGr)', stroke: '#1e1e1e', 'stroke-width': '1.5' }));
    app(g, mk('circle', { cx: '262', cy: '144', r: '2', fill: '#2a2a2a' }));
    app(g, mkt('ATmega',     { fill: '#2e2e2e', 'font-family': 'monospace', 'font-size': '8', 'font-weight': 'bold', 'text-anchor': 'middle', x: '284', y: '161' }));
    app(g, mkt('16U2',       { fill: '#2e2e2e', 'font-family': 'monospace', 'font-size': '8', 'font-weight': 'bold', 'text-anchor': 'middle', x: '284', y: '171' }));
    app(g, mkt('USB-SERIAL', { fill: '#242424', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '284', y: '181' }));

    // Crystal Oscillator 16MHz — moved left by 30px total (215→185, 219→189, 226→196)
    app(g, mk('rect',   { x: '185', y: '155', width: '22', height: '45', rx: '9', fill: 'url(#unoSilvGr)', stroke: '#888', 'stroke-width': '1.5' }));
    app(g, mk('rect',   { x: '189', y: '163', width: '14', height: '31', rx: '5', fill: '#c0c0c0' }));
    app(g, mkt('16',    { fill: '#555', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '196', y: '179' }));
    app(g, mkt('MHz',   { fill: '#555', 'font-family': 'monospace', 'font-size': '5', 'text-anchor': 'middle', x: '196', y: '187' }));

    // ATmega328P — DIP-28
    (function () {
      var by = 225 - 40;
      var bh = 417 - 225 + 50; // Increase height (add 40px) downward
      var bw = 64;
      var bx = 86;
      var nPins = 14;
      var margin = 10;
      var usable = bh - margin * 2;
      var pitch  = usable / (nPins - 1);
      var stubW  = 8;
      var stubH  = 5;
      var pinStartY = by + margin;

      app(g, mk('rect', { x: bx, y: by, width: bw, height: bh, rx: '4',
        fill: 'url(#unoChipGr)', stroke: '#3a3a3a', 'stroke-width': '2' }));
      app(g, mk('path', {
        d: 'M ' + (bx + bw/2 - 10) + ',' + by +
           ' A 10 10 0 0 0 ' + (bx + bw/2 + 10) + ',' + by,
        fill: '#0a0a0a', stroke: '#3a3a3a', 'stroke-width': '1.5'
      }));
      app(g, mk('circle', { cx: bx + 8, cy: by + 12, r: '2.5', fill: '#555' }));

      for (var i = 0; i < nPins; i++) {
        var py = pinStartY + i * pitch;
        app(g, mk('rect', { x: bx - stubW, y: py - stubH/2,
          width: stubW, height: stubH, rx: '1',
          fill: '#d0d8e0', stroke: '#909090', 'stroke-width': '0.5' }));
      }
      for (var j = 0; j < nPins; j++) {
        var ry = pinStartY + (nPins - 1 - j) * pitch;
        app(g, mk('rect', { x: bx + bw, y: ry - stubH/2,
          width: stubW, height: stubH, rx: '1',
          fill: '#d0d8e0', stroke: '#909090', 'stroke-width': '0.5' }));
      }

      var cx = bx + bw/2, cy = by + bh/2;
      app(g, mkt('ATmega',  { fill: '#555', 'font-family': 'monospace', 'font-size': '13', 'font-weight': 'bold', 'text-anchor': 'middle', x: cx, y: cy - 12 }));
      app(g, mkt('328P-PU', { fill: '#555', 'font-family': 'monospace', 'font-size': '13', 'font-weight': 'bold', 'text-anchor': 'middle', x: cx, y: cy + 4  }));
      app(g, mkt('ARDUINO', { fill: '#383838', 'font-family': 'monospace', 'font-size': '9', 'text-anchor': 'middle', x: cx, y: cy + 20 }));
    }());

    // Capacitors
    app(g, mk('ellipse', { cx: '80',  cy: '160', rx: '12', ry: '12', fill: '#3a3a3a', stroke: '#2a2a2a', 'stroke-width': '1.5' }));
    app(g, mk('ellipse', { cx: '80',  cy: '160', rx: '8',  ry: '8',  fill: '#444' }));
    app(g, mkt('10\u03bcF',  { fill: 'rgba(140,190,255,0.25)', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '80',  y: '178' }));
    app(g, mk('ellipse', { cx: '315', cy: '430', rx: '18', ry: '18', fill: '#3a3a3a', stroke: '#2a2a2a', 'stroke-width': '2' }));
    app(g, mk('ellipse', { cx: '315', cy: '430', rx: '12', ry: '12', fill: '#444' }));
    app(g, mkt('100\u03bcF', { fill: 'rgba(140,190,255,0.25)', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '315', y: '450' }));

    // LEDs
    app(g, mk('rect', { x: '25',  y: '112', width: '14', height: '6', rx: '3', fill: '#00cc44' }));
    app(g, mkt('ON', { fill: 'rgba(140,200,140,0.55)', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'start', x: '40',  y: '118' }));
    app(g, mk('rect', { x: '230', y: '155', width: '10', height: '6', rx: '2', fill: '#eecc00' }));
    app(g, mkt('L',  { fill: 'rgba(200,190,80,0.5)',  'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'start', x: '242', y: '161' }));
    app(g, mk('rect', { x: '230', y: '170', width: '10', height: '6', rx: '2', fill: '#ff8800' }));
    app(g, mkt('TX', { fill: 'rgba(200,130,50,0.5)',  'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'start', x: '242', y: '176' }));
    app(g, mk('rect', { x: '230', y: '182', width: '10', height: '6', rx: '2', fill: '#ff8800' }));
    app(g, mkt('RX', { fill: 'rgba(200,130,50,0.5)',  'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'start', x: '242', y: '188' }));

    // Arduino Logo — rotated 90° clockwise around its centre (261, 280), shifted right 28px (was 16px, +12px)
    var logoG = mk('g', { opacity: '0.5', transform: 'translate(28, -10) rotate(90, 261, 280)' });
    app(logoG, mk('circle', { cx: '239', cy: '280', r: '22', fill: 'none', stroke: 'rgba(160,210,255,0.7)', 'stroke-width': '3.5' }));
    app(logoG, mk('circle', { cx: '283', cy: '280', r: '22', fill: 'none', stroke: 'rgba(160,210,255,0.7)', 'stroke-width': '3.5' }));
    app(logoG, mk('line',   { x1: '231', y1: '280', x2: '247', y2: '280', stroke: 'rgba(160,210,255,0.85)', 'stroke-width': '3', 'stroke-linecap': 'round' }));
    app(logoG, mk('line',   { x1: '239', y1: '274', x2: '239', y2: '286', stroke: 'rgba(160,210,255,0.85)', 'stroke-width': '3', 'stroke-linecap': 'round' }));
    app(logoG, mk('line',   { x1: '275', y1: '280', x2: '291', y2: '280', stroke: 'rgba(160,210,255,0.85)', 'stroke-width': '3', 'stroke-linecap': 'round' }));
    g.appendChild(logoG);

    // Arduino UNO R3 Text - ROTATED 90 DEGREES CLOCKWISE only
    var rotatedTextGroup = mk('g', { transform: 'translate(-10, -34) rotate(90, 261, 315)' });
    app(rotatedTextGroup, mkt('Arduino', { fill: 'rgba(180,220,255,0.5)',  'font-family': 'Georgia,serif', 'font-size': '18', 'font-style': 'italic', 'font-weight': 'bold', 'text-anchor': 'middle', x: '256', y: '315' }));
    g.appendChild(rotatedTextGroup);
    var UNOTextGroup = mk('g', { transform: 'translate(28, 40) rotate(90, 261, 315)' });
    app(UNOTextGroup, mkt('UNO', { fill: 'rgba(160,205,255,0.3)',  'font-family': 'monospace', 'font-size': '40', 'font-weight': '500', 'letter-spacing': '4', 'text-anchor': 'middle', x: '261', y: '328' }));
    g.appendChild(UNOTextGroup);
    

    // Header housings
    app(g, mk('rect', { x: '372', y: '93', width: '16', height: '183', rx: '2', fill: '#0d0d0d', stroke: '#1a1a1a', 'stroke-width': '1' }));
    app(g, mk('rect', { x: '372', y: '256', width: '16', height: '183', rx: '2', fill: '#0d0d0d', stroke: '#1a1a1a', 'stroke-width': '1' }));
    app(g, mk('rect', { x: '0',   y: '179', width: '16', height: '137', rx: '2', fill: '#0d0d0d', stroke: '#1a1a1a', 'stroke-width': '1' }));
    app(g, mk('rect', { x: '0',   y: '306', width: '16', height: '133', rx: '2', fill: '#0d0d0d', stroke: '#1a1a1a', 'stroke-width': '1' }));

    // Silkscreen labels
    g.appendChild(mkt('DIGITAL (PWM~)', { x: '380', y: '250', fill: 'rgba(140,190,255,0.65)', 'font-family': 'monospace', 'font-size': '12', 'font-weight': 'bold', 'text-anchor': 'middle', transform: 'rotate(90,336,242)' }));
    g.appendChild(mkt('POWER',          { x: '62',  y: '253', fill: 'rgba(140,190,255,0.65)', 'font-family': 'monospace', 'font-size': '12', 'font-weight': 'bold', 'text-anchor': 'middle', transform: 'rotate(90,52,253)' }));
    g.appendChild(mkt('ANALOG IN',      { x: '52',  y: '377', fill: 'rgba(140,190,255,0.65)', 'font-family': 'monospace', 'font-size': '12', 'font-weight': 'bold', 'text-anchor': 'middle', transform: 'rotate(90,52,377)' }));
  }

  // ── interactive pin squares ───────────────────────────────────
  function _buildPins(scaleG, svg, config) {
    var customTypes = config.customTypes || {};

    config.pins.forEach(function (p) {
      var coord = PIN_COORDS[p.id];
      if (!coord) return;

      var col     = getColor(p.type, customTypes);
      var onRight = coord.side === 'right';

      var g = mk('g', { 'class': 'ic-pin', 'data-id': p.id });
      g.style.cursor = 'pointer';

      app(g, mk('rect', {
        x: coord.x - PS / 2 - 2, y: coord.y - PS / 2 - 2,
        width: PS + 4, height: PS + 4, rx: '2',
        fill: 'rgba(184,130,60,0.30)', stroke: 'rgba(184,130,60,0.55)', 'stroke-width': '0.5'
      }));

      var sq = mk('rect', {
        x: coord.x - PS / 2, y: coord.y - PS / 2,
        width: PS, height: PS, rx: '2',
        fill: col.bg, stroke: col.c, 'stroke-width': '1.5',
        'class': 'pin-sq'
      });
      app(g, sq);

      app(g, mk('rect', {
        x: coord.x - 3.5, y: coord.y - 3.5, width: '7', height: '7', rx: '1',
        fill: '#050810', 'pointer-events': 'none'
      }));

      var lbl = mkt(p.lbl.length > 4 ? p.lbl.slice(0, 4) : p.lbl, {
        x: coord.x, y: coord.y + 3.5, 'text-anchor': 'middle',
        fill: col.c, 'font-size': '8', 'font-family': 'monospace',
        'font-weight': 'bold', 'pointer-events': 'none'
      });
      app(g, lbl);

      app(g, mk('rect', {
        x: coord.x - 16, y: coord.y - 16, width: '32', height: '32',
        fill: 'transparent'
      }));

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
