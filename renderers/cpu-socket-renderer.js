// ============================================================
//  renderers/cpu-socket-renderer.js
//  IC Explorer — CPU Socket Renderer (AM5, LGA-*, CPU packages)
//
//  Renders CPU signal groups as an interactive die floorplan:
//  colour-coded zone rectangles on a package outline, one zone
//  per functional group from config.pins[].
//
//  Standard renderer contract:
//    draw(svg, config)
//    updatePins(selectedId, filterType, filterFn)
//
//  Registered as: window.CPUSocketRenderer
// ============================================================

window.CPUSocketRenderer = (function () {
  'use strict';

  // ── Canvas ────────────────────────────────────────────────
  var W = 520, H = 590;

  // ── Die outline ───────────────────────────────────────────
  var DIE_X = 50, DIE_Y = 65, DIE_W = 420, DIE_H = 420;
  var NOTCH = 22;   // pin-1 corner notch (top-left)

  // ── Zone grid ─────────────────────────────────────────────
  var ZONE_PAD  = 12;   // padding inside die edge
  var ZONE_GAP  = 5;    // gap between zones
  var ZONE_COLS = 3;    // columns

  // ── State ─────────────────────────────────────────────────
  var _svg    = null;
  var _config = null;
  var _zones  = [];

  // ── SVG helpers ───────────────────────────────────────────
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

  // ── Resolve colour via ICExplorer palette ─────────────────
  function getCol(type) {
    if (window.ICExplorer && window.ICExplorer.getColor) {
      return window.ICExplorer.getColor(type);
    }
    return { c: '#78c878', bg: 'rgba(100,200,100,.10)', bd: 'rgba(100,200,100,.27)' };
  }

  // ── Defs: glow filter + scanline texture ──────────────────
  function buildDefs(svg) {
    var defs = svgEl('defs');

    var filt = svgEl('filter', { id: 'cpuZoneGlow', x: '-25%', y: '-25%', width: '150%', height: '150%' });
    var blur = svgEl('feGaussianBlur', { stdDeviation: '2.5', result: 'blur' });
    var comp = svgEl('feComposite',    { in: 'SourceGraphic', in2: 'blur', operator: 'over' });
    filt.appendChild(blur);
    filt.appendChild(comp);
    defs.appendChild(filt);

    var pat = svgEl('pattern', { id: 'cpuScan', width: '4', height: '4', patternUnits: 'userSpaceOnUse' });
    var ln  = svgEl('line', {
      x1: '0', y1: '0', x2: '4', y2: '4',
      stroke: 'rgba(255,255,255,0.025)', 'stroke-width': '0.6'
    });
    pat.appendChild(ln);
    defs.appendChild(pat);

    svg.appendChild(defs);
  }

  // ── Package outline ───────────────────────────────────────
  function drawPackage(svg, C) {
    var g  = svgEl('g', { id: 'cpu-pkg' });
    var nx = DIE_X, ny = DIE_Y;
    var ex = DIE_X + DIE_W, ey = DIE_Y + DIE_H;

    // Outer glow halo
    g.appendChild(svgEl('rect', {
      x: nx - 6, y: ny - 6, width: DIE_W + 12, height: DIE_H + 12,
      rx: '8', fill: 'none',
      stroke: 'rgba(77,166,255,0.10)', 'stroke-width': '10'
    }));

    // Die body with top-left notch (pin-1 marker)
    var pts = [
      (nx + NOTCH) + ',' + ny,
      ex + ',' + ny,
      ex + ',' + ey,
      nx + ',' + ey,
      nx + ',' + (ny + NOTCH)
    ].join(' ');

    g.appendChild(svgEl('polygon', {
      points: pts,
      fill: '#0a0f17', stroke: '#30363d', 'stroke-width': '1.5'
    }));

    g.appendChild(svgEl('polygon', { points: pts, fill: 'url(#cpuScan)' }));

    // Notch triangle
    g.appendChild(svgEl('polygon', {
      points: nx + ',' + ny + ' ' + (nx + NOTCH) + ',' + ny + ' ' + nx + ',' + (ny + NOTCH),
      fill: '#161b22', stroke: '#30363d', 'stroke-width': '1'
    }));

    // Pin-1 dot
    g.appendChild(svgEl('circle', {
      cx: nx + NOTCH * 0.5, cy: ny + NOTCH * 0.5, r: '3', fill: '#c8a850'
    }));

    // Corner bracket fiducials
    [[nx-14,ny-14],[ex+4,ny-14],[ex+4,ey+4],[nx-14,ey+4]].forEach(function(pt) {
      g.appendChild(svgEl('rect', {
        x: pt[0], y: pt[1], width: '10', height: '10',
        fill: 'none', stroke: 'rgba(77,166,255,0.20)', 'stroke-width': '1.5'
      }));
    });

    svg.appendChild(g);

    // Labels
    var lbl = svgEl('g', { id: 'cpu-labels' });

    lbl.appendChild(svgTxt(C.partName || '', {
      x: DIE_X + DIE_W / 2, y: DIE_Y - 24,
      'text-anchor': 'middle', fill: '#e6edf3',
      'font-family': 'Orbitron, Share Tech Mono, monospace',
      'font-size': '13', 'font-weight': '900', 'letter-spacing': '0.12em'
    }));

    lbl.appendChild(svgTxt((C.package || '') + '  ·  ' + (C.pins ? C.pins.length : 0) + ' signal groups', {
      x: DIE_X + DIE_W / 2, y: DIE_Y + DIE_H + 22,
      'text-anchor': 'middle', fill: '#8b949e',
      'font-family': 'Share Tech Mono, monospace',
      'font-size': '10.5', 'letter-spacing': '0.07em'
    }));

    lbl.appendChild(svgTxt((C.manufacturer || '').toUpperCase(), {
      x: DIE_X + DIE_W - 8, y: DIE_Y + DIE_H + 38,
      'text-anchor': 'end', fill: 'rgba(77,166,255,0.30)',
      'font-family': 'Orbitron, monospace',
      'font-size': '9.5', 'letter-spacing': '0.15em'
    }));

    svg.appendChild(lbl);
  }

  // ── Compute zone rects from pins array ────────────────────
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
        w:   zw,
        h:   zh
      };
    });
  }

  // ── Draw all zones ────────────────────────────────────────
  function drawZones(svg, pins) {
    var g        = svgEl('g', { id: 'cpu-zones' });
    var computed = computeZoneRects(pins);
    _zones = [];

    computed.forEach(function (z) {
      var pin = z.pin;
      var col = getCol(pin.type);

      var zg = svgEl('g', {
        'class': 'ic-pin cpu-zone', 'data-id': pin.id, style: 'cursor:pointer'
      });

      zg.appendChild(svgEl('rect', {
        x: z.x, y: z.y, width: z.w, height: z.h, rx: '4',
        fill: col.bg, stroke: col.bd, 'stroke-width': '1', 'class': 'zone-rect'
      }));

      zg.appendChild(svgTxt(pin.type, {
        x: z.x + 6, y: z.y + 12,
        fill: col.c, 'font-family': 'Share Tech Mono, monospace',
        'font-size': '8', 'font-weight': '700', 'letter-spacing': '0.05em',
        opacity: '0.70', 'class': 'zone-type'
      }));

      zg.appendChild(svgTxt(pin.lbl || pin.id, {
        x: z.x + z.w / 2, y: z.y + z.h / 2 + 4,
        'text-anchor': 'middle', fill: col.c,
        'font-family': 'Share Tech Mono, monospace',
        'font-size': '9.5', 'font-weight': '700', 'letter-spacing': '0.03em',
        'class': 'zone-name'
      }));

      zg.appendChild(svgTxt('#' + pin.num, {
        x: z.x + z.w - 5, y: z.y + z.h - 5,
        'text-anchor': 'end', fill: col.c,
        'font-family': 'Share Tech Mono, monospace',
        'font-size': '7.5', opacity: '0.40', 'class': 'zone-num'
      }));

      g.appendChild(zg);
      _zones.push({ pinId: pin.id, el: zg, col: col });
    });

    svg.appendChild(g);
  }

  // ── Update all zone visual states ─────────────────────────
  // States match the project spec exactly:
  //   Selected       → solid fill + glow
  //   Filter match   → solid fill + glow
  //   Filter no-match→ 0.08 opacity
  //   Default        → type-colour tint (semi-transparent)
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
        rect.setAttribute('filter',       'url(#cpuZoneGlow)');
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

  // ── draw ──────────────────────────────────────────────────
  function draw(svg, config) {
    _svg    = svg;
    _config = config;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width',   W);
    svg.setAttribute('height',  H);
    svg.innerHTML = '';
    buildDefs(svg);
    drawPackage(svg, config);
    drawZones(svg, config.pins || []);
  }

  return { draw: draw, updatePins: updatePins };
}());
