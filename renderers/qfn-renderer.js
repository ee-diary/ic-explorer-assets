/**
 * renderers/qfn-renderer.js
 * IC Explorer — QFN (Quad Flat No-lead) Renderer
 *
 * Draws a true top-down view of a QFN package:
 *   - IC body fills the viewport
 *   - Pads are drawn INSIDE the body along each edge (flush, no leads extending out)
 *   - Pin labels appear outside the body edge (where numbers used to be)
 *   - Pin numbers appear inside the pad, rotated along the edge
 *   - Pin 1 marker (chamfered corner notch) at top-left
 *   - Exposed centre pad drawn if config.qfnConfig.exposedPad === true
 *
 * Compatible with ic-explorer-base.js:
 *   - Each pin is a <g class="ic-pin" data-id="...">
 *   - The pad rect has class="pin-sq" (engine styles this directly)
 *   - No custom click/hover handlers (engine wires these up)
 *
 * Pin ordering (counter-clockwise, pin 1 at top-left):
 *   LEFT   (1 → pps)          top → bottom
 *   BOTTOM (pps+1 → 2*pps)    left → right
 *   RIGHT  (2*pps+1 → 3*pps)  bottom → top
 *   TOP    (3*pps+1 → 4*pps)  right → left
 *
 * Config keys read from config.qfnConfig (falls back to qfpConfig, then defaults):
 *   pinsPerSide  {number}  pins on each of the 4 sides
 *   bodySize     {number}  SVG units for the square body (default 420)
 *   padLength    {number}  depth of pad into the body (default 28)
 *   padWidth     {number}  width of each pad (default 20)
 *   padGap       {number}  gap between adjacent pads (default 3)
 *   padInset     {number}  extra inset from body corner to first pad centre (default 14)
 *   exposedPad   {boolean} draw a centre thermal pad (default false)
 *   exposedPadId {string}  pin id of the exposed pad for highlight linking (default 'EP')
 */

window.QFNRenderer = (function () {
  'use strict';

  // ── SVG namespace helper ─────────────────────────────────────────────────
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    }
    return e;
  }
  function txt(str, attrs) {
    var t = el('text', attrs);
    t.textContent = str;
    return t;
  }

  // ── Standard colour palette (mirrors qfp-renderer.js) ───────────────────
  var STD_COLORS = {
    GPIO:  '#78c878', PWR:   '#ff6b6b', GND:   '#a8a8a8',
    ADC:   '#c8a850', SPI:   '#4a9aee', I2C:   '#9898d8',
    UART:  '#cc6888', PWM:   '#50c8c8', XTAL:  '#7090a8',
    RESET: '#ff9944', TIMER: '#50c8c8', INT:   '#c8a850',
    USB:   '#a78bfa', CAN:   '#ff9944', JTAG:  '#c8a850',
    BOOT:  '#50c8c8', COMP:  '#ff9944',
  };

  // ── Internal state ───────────────────────────────────────────────────────
  var _svg    = null;
  var _config = null;

  // ── Colour lookup ────────────────────────────────────────────────────────
  function pinColor(type) {
    if (_config && _config.customTypes && _config.customTypes[type]) {
      return _config.customTypes[type].c;
    }
    return STD_COLORS[type] || '#78c878';
  }

  // ── Build glow filter defs ───────────────────────────────────────────────
  function buildDefs(svg) {
    var defs   = el('defs');
    var filter = el('filter', {
      id: 'pinGlow', x: '-50%', y: '-50%', width: '200%', height: '200%'
    });
    var blur = el('feGaussianBlur', { in: 'SourceAlpha', stdDeviation: '3', result: 'blur' });
    var merge = el('feMerge');
    var mn1   = el('feMergeNode', { in: 'blur' });
    var mn2   = el('feMergeNode', { in: 'SourceGraphic' });
    merge.appendChild(mn1);
    merge.appendChild(mn2);
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    svg.appendChild(defs);
  }

  // ── Draw the IC body ─────────────────────────────────────────────────────
  function buildBody(group, half, bodySize) {
    // Main body rectangle
    group.appendChild(el('rect', {
      x: -half, y: -half,
      width: bodySize, height: bodySize,
      rx: '4', ry: '4',
      fill: '#171B26', stroke: '#3a4060', 'stroke-width': '2'
    }));

    // Pin-1 chamfer: small triangle cut from top-left corner
    var c = 22; // chamfer size
    var pts = [
      (-half)     + ',' + (-half + c),
      (-half + c) + ',' + (-half),
      (-half)     + ',' + (-half)
    ].join(' ');
    group.appendChild(el('polygon', {
      points: pts,
      fill: '#ff6b6b',
      opacity: '0.85'
    }));

    // Silkscreen-style inner border line
    var inset = 6;
    group.appendChild(el('rect', {
      x: -half + inset, y: -half + inset,
      width: bodySize - inset * 2, height: bodySize - inset * 2,
      rx: '2', ry: '2',
      fill: 'none',
      stroke: '#2a2f3e',
      'stroke-width': '1',
      'stroke-dasharray': '4 3'
    }));
  }

  // ── Draw part name + package label centred on body ───────────────────────
  function buildLabels(group, config) {
    group.appendChild(txt(config.partName || 'IC', {
      x: '0', y: '-18',
      'text-anchor': 'middle',
      fill: '#e0e5ec',
      'font-size': '22',
      'font-weight': 'bold',
      'font-family': 'monospace'
    }));
    group.appendChild(txt(config.package || '', {
      x: '0', y: '14',
      'text-anchor': 'middle',
      fill: '#6070a0',
      'font-size': '12',
      'font-family': 'monospace'
    }));
  }

  // ── Draw exposed thermal pad (centre) ────────────────────────────────────
  function buildExposedPad(group, qfn, config) {
    var epSize = qfn.exposedPadSize || (qfn.bodySize * 0.38) || 160;
    var epId   = qfn.exposedPadId  || 'EP';
    var epPin  = null;

    // Find the matching pin in config so we can colour it correctly
    if (config.pins) {
      for (var i = 0; i < config.pins.length; i++) {
        if (config.pins[i].id === epId) { epPin = config.pins[i]; break; }
      }
    }
    var col = epPin ? pinColor(epPin.type) : '#a8a8a8';

    var epGroup = el('g', { class: 'ic-pin', 'data-id': epId });
    epGroup.style.cursor = 'pointer';

    epGroup.appendChild(el('rect', {
      class: 'pin-sq',
      x: -(epSize / 2), y: -(epSize / 2),
      width: epSize, height: epSize,
      rx: '3', ry: '3',
      fill: 'rgba(168,168,168,0.08)',
      stroke: col,
      'stroke-width': '1.5',
      'stroke-dasharray': '5 3'
    }));

    epGroup.appendChild(txt('EP', {
      x: '0', y: '4',
      'text-anchor': 'middle',
      fill: col,
      'font-size': '11',
      'font-family': 'monospace',
      'font-weight': 'bold'
    }));

    group.appendChild(epGroup);
  }

  // ── Compute pad positions (all 4 sides) ──────────────────────────────────
  function buildPositions(half, pinsPerSide, padWidth, padGap, padInset) {
    var usable  = (half * 2) - padInset * 2;
    var step    = pinsPerSide > 1
      ? (usable - padWidth) / (pinsPerSide - 1)
      : 0;
    var start   = -half + padInset + padWidth / 2;

    var positions = [];
    var i;

    // LEFT — top → bottom
    for (i = 0; i < pinsPerSide; i++) {
      positions.push({ side: 'left',   cx: -half, cy: start + i * step });
    }
    // BOTTOM — left → right
    for (i = 0; i < pinsPerSide; i++) {
      positions.push({ side: 'bottom', cx: start + i * step, cy: half });
    }
    // RIGHT — bottom → top
    for (i = 0; i < pinsPerSide; i++) {
      positions.push({ side: 'right',  cx: half,  cy: half - padInset - padWidth / 2 - i * step });
    }
    // TOP — right → left
    for (i = 0; i < pinsPerSide; i++) {
      positions.push({ side: 'top',    cx: half - padInset - padWidth / 2 - i * step, cy: -half });
    }

    return positions;
  }

  // ── Draw a single pin pad ────────────────────────────────────────────────
  function buildPin(pin, pos, half, padLength, padWidth, padGap) {
    var col  = pinColor(pin.type);
    var side = pos.side;

    // Pad rect — sits INSIDE the body, touching the body edge
    var pw = padWidth - padGap;
    var pl = padLength;
    var rx, ry, rw, rh;

    if (side === 'left') {
      rw = pl; rh = pw;
      rx = -half;           // left edge of body
      ry = pos.cy - pw / 2;
    } else if (side === 'right') {
      rw = pl; rh = pw;
      rx = half - pl;       // right edge of body, pad extends inward
      ry = pos.cy - pw / 2;
    } else if (side === 'bottom') {
      rw = pw; rh = pl;
      rx = pos.cx - pw / 2;
      ry = half - pl;       // bottom edge of body, pad extends inward
    } else { // top
      rw = pw; rh = pl;
      rx = pos.cx - pw / 2;
      ry = -half;           // top edge of body, pad extends inward
    }

    var pinGroup = el('g', { class: 'ic-pin', 'data-id': pin.id });
    pinGroup.style.cursor = 'pointer';

    // Pad rectangle (engine colours this via .pin-sq)
    pinGroup.appendChild(el('rect', {
      class: 'pin-sq',
      x: rx, y: ry,
      width: rw, height: rh,
      rx: '2', ry: '2',
      fill: 'rgba(120,200,120,0.08)',
      stroke: col,
      'stroke-width': '1.5'
    }));

    // ── Pin label (name) — outside the body edge, where number used to be ─
    if (pin.lbl) {
      var lblOutAttrs = {
        fill: col,
        'font-size': '9',
        'font-family': 'monospace',
        'font-weight': 'bold'
      };
      var lblOutEl;
      var lblOffset = 14;

      if (side === 'left') {
        lblOutEl = txt(pin.lbl, Object.assign({}, lblOutAttrs, {
          x: -half - lblOffset, y: pos.cy + 4, 'text-anchor': 'end'
        }));
      } else if (side === 'right') {
        lblOutEl = txt(pin.lbl, Object.assign({}, lblOutAttrs, {
          x: half + lblOffset, y: pos.cy + 4, 'text-anchor': 'start'
        }));
      } else if (side === 'bottom') {
        lblOutEl = txt(pin.lbl, Object.assign({}, lblOutAttrs, {
          x: pos.cx, y: half + lblOffset + 2, 'text-anchor': 'middle'
        }));
      } else { // top
        lblOutEl = txt(pin.lbl, Object.assign({}, lblOutAttrs, {
          x: pos.cx, y: -half - lblOffset + 4, 'text-anchor': 'middle'
        }));
      }
      pinGroup.appendChild(lblOutEl);
    }

    // ── Pin number — inside the pad, rotated to follow the edge ─────────
    var numAttrs = {
      fill: col,
      'font-size': '8',
      'font-family': 'monospace',
      'font-weight': 'bold',
      'text-anchor': 'middle'
    };
    var numEl;
    var padMidX, padMidY, rotate;

    if (side === 'left') {
      padMidX = rx + pl / 2;
      padMidY = pos.cy;
      rotate  = -90;
    } else if (side === 'right') {
      padMidX = rx + pl / 2;
      padMidY = pos.cy;
      rotate  = 90;
    } else if (side === 'bottom') {
      padMidX = pos.cx;
      padMidY = ry + pl / 2;
      rotate  = 0;
    } else { // top
      padMidX = pos.cx;
      padMidY = ry + pl / 2;
      rotate  = 0;
    }

    numEl = txt(pin.num, Object.assign({}, numAttrs, {
      x: padMidX,
      y: padMidY + 3,
      transform: rotate !== 0
        ? 'rotate(' + rotate + ',' + padMidX + ',' + padMidY + ')'
        : ''
    }));
    pinGroup.appendChild(numEl);

    return pinGroup;
  }

  // ── Public API ───────────────────────────────────────────────────────────
  return {

    draw: function (svg, config) {
      _svg    = svg;
      _config = config;

      // Resolve config block — prefer qfnConfig, fall back to qfpConfig
      var qfn = config.qfnConfig || config.qfpConfig || {};

      var pinsPerSide = qfn.pinsPerSide || Math.ceil((config.pinCount || 28) / 4);
      var bodySize    = qfn.bodySize    || 420;
      var padLength   = qfn.padLength   || qfn.pinLength || 28;
      var padWidth    = qfn.padWidth    || qfn.pinWidth  || 20;
      var padGap      = qfn.padGap      || qfn.pinGap    || 3;
      var padInset    = qfn.padInset    || 14;
      var half        = bodySize / 2;

      // Viewport — body fills centre, leave room for pin numbers outside
      var margin   = 50;
      var viewSize = bodySize + margin * 2;
      svg.setAttribute('viewBox',
        (-viewSize / 2) + ' ' + (-viewSize / 2) + ' ' + viewSize + ' ' + viewSize);
      svg.setAttribute('width',  '100%');
      svg.setAttribute('height', '100%');

      // Clear
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      buildDefs(svg);

      var mainGroup = el('g');
      svg.appendChild(mainGroup);

      // Body
      buildBody(mainGroup, half, bodySize);

      // Centre part name / package
      buildLabels(mainGroup, config);

      // Exposed pad (optional)
      if (qfn.exposedPad) {
        buildExposedPad(mainGroup, qfn, config);
      }

      // Pin positions
      var positions = buildPositions(half, pinsPerSide, padWidth, padGap, padInset);

      // Draw pins
      var pins = config.pins || [];
      for (var i = 0; i < positions.length && i < pins.length; i++) {
        var pinEl = buildPin(pins[i], positions[i], half, padLength, padWidth, padGap);
        mainGroup.appendChild(pinEl);
      }
    },

    updatePins: function (selectedId, filterType, filterFn) {
      // Engine drives all highlighting via CSS on .ic-pin / .pin-sq — nothing needed here.
    }
  };

}());