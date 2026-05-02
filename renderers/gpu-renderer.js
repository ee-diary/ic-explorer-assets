// ============================================================
//  renderers/gpu-renderer.js
//  IC Explorer — GPU Package Renderer (PCIe card edge + die)
//
//  Renders GPU signal groups as a die floorplan with a PCIe
//  card-edge connector visual at the bottom — representing the
//  physical interface between GPU die and PCIe slot.
//
//  Zones are organised in two regions:
//    TOP HALF  — die-side signals (VRAM, shader clusters, etc.)
//    BOTTOM    — PCIe connector lanes (TX, RX, power, sideband)
//
//  Standard renderer contract:
//    draw(svg, config)
//    updatePins(selectedId, filterType, filterFn)
//
//  Registered as: window.GPURenderer
// ============================================================

window.GPURenderer = (function () {
  'use strict';

  // ── Canvas ────────────────────────────────────────────────
  var W = 560, H = 620;

  // ── PCB outline (GPU PCB is landscape) ───────────────────
  var PCB_X = 20, PCB_Y = 40, PCB_W = 520, PCB_H = 460;
  var PCB_R = 8;   // corner radius

  // ── Die area (upper portion of PCB) ──────────────────────
  var DIE_X = 155, DIE_Y = 60, DIE_W = 250, DIE_H = 250;

  // ── PCIe card edge (bottom of PCB) ───────────────────────
  var EDGE_X   = PCB_X + 30;
  var EDGE_Y   = PCB_Y + PCB_H - 60;
  var EDGE_W   = PCB_W - 60;
  var EDGE_H   = 40;
  var FINGER_W = 7;
  var FINGER_H = 28;
  var FINGER_GAP = 2;

  // ── Zone grid (die area) ──────────────────────────────────
  var ZONE_PAD  = 10;
  var ZONE_GAP  = 5;
  var ZONE_COLS = 3;

  // ── State ─────────────────────────────────────────────────
  var _svg    = null;
  var _config = null;
  var _zones  = [];

  var NS = 'http://www.w3.org/2000/svg';

  function svgEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }

  function svgTxt(str, attrs) {
    var t = svgEl('text', attrs);
    t.textContent = str;
    return t;
  }

  function getCol(type) {
    if (window.ICExplorer && window.ICExplorer.getColor) {
      return window.ICExplorer.getColor(type);
    }
    return { c: '#a78bfa', bg: 'rgba(167,139,250,.10)', bd: 'rgba(167,139,250,.27)' };
  }

  // ── Defs ──────────────────────────────────────────────────
  function buildDefs(svg) {
    var defs = svgEl('defs');

    var filt = svgEl('filter', { id: 'gpuZoneGlow', x: '-25%', y: '-25%', width: '150%', height: '150%' });
    filt.appendChild(svgEl('feGaussianBlur', { stdDeviation: '2.5', result: 'blur' }));
    filt.appendChild(svgEl('feComposite',    { in: 'SourceGraphic', in2: 'blur', operator: 'over' }));
    defs.appendChild(filt);

    // PCB green-tinted texture
    var pat = svgEl('pattern', { id: 'gpuPcb', width: '6', height: '6', patternUnits: 'userSpaceOnUse' });
    pat.appendChild(svgEl('line', {
      x1: '0', y1: '0', x2: '6', y2: '6',
      stroke: 'rgba(100,200,100,0.015)', 'stroke-width': '0.8'
    }));
    defs.appendChild(pat);

    svg.appendChild(defs);
  }

  // ── PCB outline + die + connector ─────────────────────────
  function drawBoard(svg, C) {
    var g = svgEl('g', { id: 'gpu-board' });

    // PCB body
    g.appendChild(svgEl('rect', {
      x: PCB_X, y: PCB_Y, width: PCB_W, height: PCB_H, rx: PCB_R,
      fill: '#0a1208', stroke: '#1a2e1a', 'stroke-width': '2'
    }));

    // PCB texture
    g.appendChild(svgEl('rect', {
      x: PCB_X, y: PCB_Y, width: PCB_W, height: PCB_H, rx: PCB_R,
      fill: 'url(#gpuPcb)'
    }));

    // Die package square
    g.appendChild(svgEl('rect', {
      x: DIE_X - 4, y: DIE_Y - 4, width: DIE_W + 8, height: DIE_H + 8,
      rx: '3', fill: 'none',
      stroke: 'rgba(167,139,250,0.20)', 'stroke-width': '6'
    }));

    g.appendChild(svgEl('rect', {
      x: DIE_X, y: DIE_Y, width: DIE_W, height: DIE_H,
      fill: '#0d0d12', stroke: '#30363d', 'stroke-width': '1.5'
    }));

    // Pin-1 dot on die
    g.appendChild(svgEl('circle', {
      cx: DIE_X + 8, cy: DIE_Y + 8, r: '3', fill: '#c8a850'
    }));

    // PCIe card-edge connector slot
    g.appendChild(svgEl('rect', {
      x: EDGE_X, y: EDGE_Y, width: EDGE_W, height: EDGE_H,
      fill: '#1a1400', stroke: '#c8a850', 'stroke-width': '1'
    }));

    // Gold fingers
    var numFingers = Math.floor(EDGE_W / (FINGER_W + FINGER_GAP));
    for (var i = 0; i < numFingers; i++) {
      var fx = EDGE_X + i * (FINGER_W + FINGER_GAP) + FINGER_GAP;
      // Top row
      g.appendChild(svgEl('rect', {
        x: fx, y: EDGE_Y + 4,
        width: FINGER_W, height: FINGER_H / 2 - 4,
        rx: '1', fill: '#c8a850', opacity: '0.75'
      }));
      // Bottom row
      g.appendChild(svgEl('rect', {
        x: fx, y: EDGE_Y + FINGER_H / 2 + 2,
        width: FINGER_W, height: FINGER_H / 2 - 4,
        rx: '1', fill: '#c8a850', opacity: '0.75'
      }));
    }

    // PCIe label on connector
    g.appendChild(svgTxt('PCIe x16', {
      x: EDGE_X + EDGE_W / 2, y: EDGE_Y + EDGE_H + 14,
      'text-anchor': 'middle', fill: '#c8a850',
      'font-family': 'Share Tech Mono, monospace',
      'font-size': '9', 'letter-spacing': '0.12em'
    }));

    // VRAM placeholder blocks (flanking die — decorative)
    [[PCB_X + 25, DIE_Y + 20], [PCB_X + 25, DIE_Y + 130],
     [DIE_X + DIE_W + 30, DIE_Y + 20], [DIE_X + DIE_W + 30, DIE_Y + 130]].forEach(function(pt) {
      g.appendChild(svgEl('rect', {
        x: pt[0], y: pt[1], width: 80, height: 90,
        rx: '2', fill: '#0d1117',
        stroke: 'rgba(152,152,216,0.25)', 'stroke-width': '1'
      }));
      g.appendChild(svgTxt('VRAM', {
        x: pt[0] + 40, y: pt[1] + 50,
        'text-anchor': 'middle', fill: 'rgba(152,152,216,0.40)',
        'font-family': 'Share Tech Mono, monospace', 'font-size': '8'
      }));
    });

    svg.appendChild(g);

    // Labels
    var lbl = svgEl('g', { id: 'gpu-labels' });

    lbl.appendChild(svgTxt(C.partName || '', {
      x: W / 2, y: PCB_Y - 14,
      'text-anchor': 'middle', fill: '#e6edf3',
      'font-family': 'Orbitron, Share Tech Mono, monospace',
      'font-size': '13', 'font-weight': '900', 'letter-spacing': '0.12em'
    }));

    lbl.appendChild(svgTxt((C.package || '') + '  ·  ' + (C.pins ? C.pins.length : 0) + ' signal groups', {
      x: W / 2, y: PCB_Y + PCB_H + 18,
      'text-anchor': 'middle', fill: '#8b949e',
      'font-family': 'Share Tech Mono, monospace',
      'font-size': '10', 'letter-spacing': '0.07em'
    }));

    lbl.appendChild(svgTxt((C.manufacturer || '').toUpperCase(), {
      x: PCB_X + PCB_W - 10, y: PCB_Y + PCB_H + 34,
      'text-anchor': 'end', fill: 'rgba(167,139,250,0.30)',
      'font-family': 'Orbitron, monospace', 'font-size': '9', 'letter-spacing': '0.15em'
    }));

    svg.appendChild(lbl);
  }

  // ── Zone grid inside die area ─────────────────────────────
  function computeZoneRects(pins) {
    var innerX = DIE_X + ZONE_PAD;
    var innerY = DIE_Y + ZONE_PAD;
    var innerW = DIE_W - ZONE_PAD * 2;
    var innerH = DIE_H - ZONE_PAD * 2;
    var rows   = Math.ceil(pins.length / ZONE_COLS);
    var zw     = (innerW - ZONE_GAP * (ZONE_COLS - 1)) / ZONE_COLS;
    var zh     = (innerH - ZONE_GAP * (rows - 1))      / rows;

    return pins.map(function (pin, i) {
      return {
        pin: pin,
        x:   innerX + (i % ZONE_COLS) * (zw + ZONE_GAP),
        y:   innerY + Math.floor(i / ZONE_COLS) * (zh + ZONE_GAP),
        w:   zw, h: zh
      };
    });
  }

  function drawZones(svg, pins) {
    var g        = svgEl('g', { id: 'gpu-zones' });
    var computed = computeZoneRects(pins);
    _zones = [];

    computed.forEach(function (z) {
      var pin = z.pin;
      var col = getCol(pin.type);

      var zg = svgEl('g', {
        'class': 'ic-pin gpu-zone', 'data-id': pin.id, style: 'cursor:pointer'
      });

      zg.appendChild(svgEl('rect', {
        x: z.x, y: z.y, width: z.w, height: z.h, rx: '3',
        fill: col.bg, stroke: col.bd, 'stroke-width': '1', 'class': 'zone-rect'
      }));

      zg.appendChild(svgTxt(pin.type, {
        x: z.x + 5, y: z.y + 11,
        fill: col.c, 'font-family': 'Share Tech Mono, monospace',
        'font-size': '7.5', 'font-weight': '700', 'letter-spacing': '0.04em',
        opacity: '0.70', 'class': 'zone-type'
      }));

      zg.appendChild(svgTxt(pin.lbl || pin.id, {
        x: z.x + z.w / 2, y: z.y + z.h / 2 + 4,
        'text-anchor': 'middle', fill: col.c,
        'font-family': 'Share Tech Mono, monospace',
        'font-size': '9', 'font-weight': '700', 'letter-spacing': '0.03em',
        'class': 'zone-name'
      }));

      zg.appendChild(svgTxt('#' + pin.num, {
        x: z.x + z.w - 4, y: z.y + z.h - 4,
        'text-anchor': 'end', fill: col.c,
        'font-family': 'Share Tech Mono, monospace',
        'font-size': '7', opacity: '0.38', 'class': 'zone-num'
      }));

      g.appendChild(zg);
      _zones.push({ pinId: pin.id, el: zg, col: col });
    });

    svg.appendChild(g);
  }

  // ── updatePins — same 5-state logic as all renderers ─────
  function updatePins(selectedId, filterType, filterFn) {
    var hasFilter = (filterType !== null && filterType !== undefined);

    _zones.forEach(function (zone) {
      var rect  = zone.el.querySelector('.zone-rect');
      var nameL = zone.el.querySelector('.zone-name');
      var typeL = zone.el.querySelector('.zone-type');
      var numL  = zone.el.querySelector('.zone-num');
      var col   = zone.col;

      var isSel = !!(selectedId && zone.pinId === selectedId);
      var pin   = (_config.pins || []).find(function (p) { return p.id === zone.pinId; });
      var match = !hasFilter || !!(pin && filterFn && filterFn(pin));

      if (isSel || (hasFilter && match)) {
        rect.setAttribute('fill',         col.c);
        rect.setAttribute('stroke',       col.c);
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('filter',       'url(#gpuZoneGlow)');
        zone.el.setAttribute('opacity',   '1');
        [nameL, typeL, numL].forEach(function (t) { if (t) t.setAttribute('fill', '#060c1a'); });

      } else if (hasFilter && !match) {
        rect.setAttribute('fill',         'rgba(10,15,23,0.7)');
        rect.setAttribute('stroke',       'rgba(48,54,61,0.25)');
        rect.setAttribute('stroke-width', '1');
        rect.removeAttribute('filter');
        zone.el.setAttribute('opacity',   '0.08');
        [nameL, typeL, numL].forEach(function (t) { if (t) t.setAttribute('fill', col.c); });

      } else {
        rect.setAttribute('fill',         col.bg);
        rect.setAttribute('stroke',       col.bd);
        rect.setAttribute('stroke-width', '1');
        rect.removeAttribute('filter');
        zone.el.setAttribute('opacity',   '1');
        [nameL, typeL, numL].forEach(function (t) { if (t) t.setAttribute('fill', col.c); });
      }
    });
  }

  function draw(svg, config) {
    _svg    = svg;
    _config = config;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width',   W);
    svg.setAttribute('height',  H);
    svg.innerHTML = '';
    buildDefs(svg);
    drawBoard(svg, config);
    drawZones(svg, config.pins || []);
  }

  return { draw: draw, updatePins: updatePins };
}());
