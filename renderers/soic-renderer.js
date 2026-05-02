// ============================================================
//  renderers/soic-renderer.js
//  IC Explorer — SOIC / SOP / SSOP Package Renderer
//
//  Draws a narrow 2-sided package with gull-wing leads:
//  left column (odd pins, top→bottom) and right column
//  (even pins, bottom→top), matching SOIC pin numbering.
//
//  Visually distinct from DIP: narrower body, shorter leads,
//  surface-mount gull-wing profile indicators.
//
//  Standard renderer contract:
//    draw(svg, config)
//    updatePins(selectedId, filterType, filterFn)
//
//  Registered as: window.SOICRenderer
// ============================================================

window.SOICRenderer = (function () {
  'use strict';

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
    return { c: '#78c878', bg: 'rgba(100,200,100,.10)', bd: 'rgba(100,200,100,.27)' };
  }

  var _svg    = null;
  var _config = null;
  var _pins   = [];  // [{ pinId, el, col, side }]

  // ── Layout ────────────────────────────────────────────────
  // Computed dynamically from config — see computeLayout()
  var L = {};

  function computeLayout(C) {
    var sc = C.soicConfig || {};
    var pps   = sc.pinsPerSide || Math.ceil((C.pinCount || 8) / 2);
    var pitch = sc.pinPitch    || 36;
    var bw    = sc.bodyW       || 140;
    var padH  = sc.padH        || 18;
    var padW  = sc.padW        || 28;
    var padGap = sc.padGap     || 6;   // horizontal gap between pad and body

    var bodyH   = pps * pitch;
    var totalH  = bodyH + 80;   // top + bottom margin
    var totalW  = bw + (padW + padGap) * 2 + 80;

    var bodyX   = (totalW - bw) / 2;
    var bodyY   = 40;

    return {
      pps: pps, pitch: pitch,
      bw: bw, bodyH: bodyH,
      padH: padH, padW: padW, padGap: padGap,
      bodyX: bodyX, bodyY: bodyY,
      totalW: totalW, totalH: totalH + 20,
      notchR: 10
    };
  }

  // ── Defs ──────────────────────────────────────────────────
  function buildDefs(svg) {
    var defs = svgEl('defs');

    var filt = svgEl('filter', { id: 'soicPinGlow', x: '-40%', y: '-40%', width: '180%', height: '180%' });
    filt.appendChild(svgEl('feGaussianBlur', { stdDeviation: '2', result: 'blur' }));
    filt.appendChild(svgEl('feComposite',    { in: 'SourceGraphic', in2: 'blur', operator: 'over' }));
    defs.appendChild(filt);

    svg.appendChild(defs);
  }

  // ── Package body ──────────────────────────────────────────
  function drawBody(svg, C, l) {
    var g = svgEl('g', { id: 'soic-body' });

    // Body shadow
    g.appendChild(svgEl('rect', {
      x: l.bodyX - 2, y: l.bodyY - 2,
      width: l.bw + 4, height: l.bodyH + 4,
      rx: '4', fill: 'rgba(0,0,0,0.5)'
    }));

    // Body
    g.appendChild(svgEl('rect', {
      x: l.bodyX, y: l.bodyY, width: l.bw, height: l.bodyH,
      rx: '3', fill: '#1a1a2e', stroke: '#404060', 'stroke-width': '1.5'
    }));

    // Pin-1 notch (semi-circle top-left)
    g.appendChild(svgEl('circle', {
      cx: l.bodyX + 14, cy: l.bodyY, r: l.notchR,
      fill: '#0d0d1f', stroke: '#404060', 'stroke-width': '1'
    }));

    // Part name (vertical, centre of body)
    var partLabel = svgEl('text', {
      x: l.bodyX + l.bw / 2, y: l.bodyY + l.bodyH / 2,
      'text-anchor': 'middle', 'dominant-baseline': 'middle',
      fill: '#c0c8d8',
      'font-family': 'Orbitron, Share Tech Mono, monospace',
      'font-size': '11', 'font-weight': '700', 'letter-spacing': '0.10em'
    });
    partLabel.textContent = C.partName || '';
    g.appendChild(partLabel);

    // Package string below body
    g.appendChild(svgTxt(C.package || '', {
      x: l.bodyX + l.bw / 2, y: l.bodyY + l.bodyH + 22,
      'text-anchor': 'middle', fill: '#8b949e',
      'font-family': 'Share Tech Mono, monospace',
      'font-size': '10', 'letter-spacing': '0.08em'
    }));

    svg.appendChild(g);
  }

  // ── Pin leads ─────────────────────────────────────────────
  // SOIC pin numbering: left side top→bottom (1, 2, 3...), right side bottom→top
  function drawPins(svg, pinsArr, l) {
    var g    = svgEl('g', { id: 'soic-pins' });
    var half = l.pps;
    _pins = [];

    // Left side: pins[0..half-1]
    for (var i = 0; i < half; i++) {
      var pin = pinsArr[i];
      if (!pin) continue;
      var col = getCol(pin.type);
      var cy  = l.bodyY + l.pitch * i + l.pitch / 2;
      var px  = l.bodyX - l.padGap - l.padW;

      var pg = svgEl('g', {
        'class': 'ic-pin soic-pin', 'data-id': pin.id, style: 'cursor:pointer'
      });

      // Gull-wing lead line
      pg.appendChild(svgEl('polyline', {
        points: [
          (l.bodyX) + ',' + cy,
          (l.bodyX - l.padGap) + ',' + cy,
          (l.bodyX - l.padGap) + ',' + (cy + l.padH * 0.35),
          (px) + ',' + (cy + l.padH * 0.35)
        ].join(' '),
        fill: 'none', stroke: col.bd, 'stroke-width': '1.2',
        'stroke-linejoin': 'round'
      }));

      // Pad rect
      pg.appendChild(svgEl('rect', {
        x: px, y: cy - l.padH / 2, width: l.padW, height: l.padH,
        rx: '2', fill: col.bg, stroke: col.bd, 'stroke-width': '1',
        'class': 'psq'
      }));

      // Pin number
      pg.appendChild(svgTxt(String(pin.num), {
        x: px + l.padW + 4, y: cy + 4,
        fill: '#606880', 'font-family': 'Share Tech Mono, monospace', 'font-size': '9'
      }));

      // Pin label
      pg.appendChild(svgTxt(pin.lbl || '', {
        x: l.bodyX + 6, y: cy + 4,
        fill: col.c, 'font-family': 'Share Tech Mono, monospace',
        'font-size': '8.5', 'font-weight': '700'
      }));

      g.appendChild(pg);
      _pins.push({ pinId: pin.id, el: pg, col: col, side: 'left' });
    }

    // Right side: pins[half..end], bottom→top
    for (var j = 0; j < half; j++) {
      var rPin = pinsArr[half + j];
      if (!rPin) continue;
      var rCol = getCol(rPin.type);
      // Right pins go bottom to top: first right pin is at bottom
      var rcy  = l.bodyY + l.pitch * (half - 1 - j) + l.pitch / 2;
      var rpx  = l.bodyX + l.bw + l.padGap;

      var rpg = svgEl('g', {
        'class': 'ic-pin soic-pin', 'data-id': rPin.id, style: 'cursor:pointer'
      });

      // Gull-wing lead
      rpg.appendChild(svgEl('polyline', {
        points: [
          (l.bodyX + l.bw) + ',' + rcy,
          (l.bodyX + l.bw + l.padGap) + ',' + rcy,
          (l.bodyX + l.bw + l.padGap) + ',' + (rcy + l.padH * 0.35),
          (rpx + l.padW) + ',' + (rcy + l.padH * 0.35)
        ].join(' '),
        fill: 'none', stroke: rCol.bd, 'stroke-width': '1.2',
        'stroke-linejoin': 'round'
      }));

      // Pad
      rpg.appendChild(svgEl('rect', {
        x: rpx, y: rcy - l.padH / 2, width: l.padW, height: l.padH,
        rx: '2', fill: rCol.bg, stroke: rCol.bd, 'stroke-width': '1',
        'class': 'psq'
      }));

      // Pin number
      rpg.appendChild(svgTxt(String(rPin.num), {
        x: rpx + l.padW + 4, y: rcy + 4,
        fill: '#606880', 'font-family': 'Share Tech Mono, monospace', 'font-size': '9'
      }));

      // Pin label (right-aligned inside body)
      rpg.appendChild(svgTxt(rPin.lbl || '', {
        x: l.bodyX + l.bw - 6, y: rcy + 4,
        'text-anchor': 'end', fill: rCol.c,
        'font-family': 'Share Tech Mono, monospace',
        'font-size': '8.5', 'font-weight': '700'
      }));

      g.appendChild(rpg);
      _pins.push({ pinId: rPin.id, el: rpg, col: rCol, side: 'right' });
    }

    svg.appendChild(g);
  }

  // ── updatePins — 5-state highlight spec ───────────────────
  function updatePins(selectedId, filterType, filterFn) {
    var hasFilter = (filterType !== null && filterType !== undefined);

    _pins.forEach(function (p) {
      var pad   = p.el.querySelector('.psq');
      var col   = p.col;
      var isSel = !!(selectedId && p.pinId === selectedId);
      var pin   = (_config.pins || []).find(function (x) { return x.id === p.pinId; });
      var match = !hasFilter || !!(pin && filterFn && filterFn(pin));

      if (!pad) return;

      if (isSel || (hasFilter && match)) {
        pad.setAttribute('fill',         col.c);
        pad.setAttribute('stroke',       col.c);
        pad.setAttribute('stroke-width', '2');
        pad.setAttribute('filter',       'url(#soicPinGlow)');
        p.el.setAttribute('opacity',     '1');

      } else if (hasFilter && !match) {
        pad.setAttribute('fill',         'rgba(13,17,23,0.8)');
        pad.setAttribute('stroke',       'rgba(48,54,61,0.2)');
        pad.setAttribute('stroke-width', '1');
        pad.removeAttribute('filter');
        p.el.setAttribute('opacity',     '0.08');

      } else {
        pad.setAttribute('fill',         col.bg);
        pad.setAttribute('stroke',       col.bd);
        pad.setAttribute('stroke-width', '1');
        pad.removeAttribute('filter');
        p.el.setAttribute('opacity',     '1');
      }
    });
  }

  // ── draw ──────────────────────────────────────────────────
  function draw(svg, config) {
    _svg    = svg;
    _config = config;

    var l = computeLayout(config);
    L = l;

    svg.setAttribute('viewBox', '0 0 ' + l.totalW + ' ' + l.totalH);
    svg.setAttribute('width',   l.totalW);
    svg.setAttribute('height',  l.totalH);
    svg.innerHTML = '';

    buildDefs(svg);
    drawBody(svg, config, l);
    drawPins(svg, config.pins || [], l);
  }

  return { draw: draw, updatePins: updatePins };
}());
