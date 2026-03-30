/**
 * QFP / LQFP / TQFP Package Renderer  (v2 — full highlight parity with DIP renderer)
 * FIX: Glow filter region now covers entire possible area with padding
 * to prevent SVG reflow when toggling the filter on/off during pin selection.
 *
 * Pin state visual behaviour — identical to the DIP renderer:
 *
 *   DEFAULT    → type-colour border + semi-transparent fill, pin number in type colour
 *   HOVER      → brightness(1.9) + drop-shadow glow  (CSS, smooth .12s transition)
 *   SELECTED   → solid type-colour fill, dark label text, SVG pinGlow filter
 *   FILTERED match   → filter-type colour, solid fill + glow
 *   FILTERED no-match → near-invisible (opacity 0.08)
 *   FILTER + SELECT   → selected pin always stays fully lit at 100% opacity
 *
 * Pin layout convention (counter-clockwise, pin 1 at top-left):
 *   LEFT   side → pins[ 0 .. pps-1 ]          top → bottom
 *   BOTTOM side → pins[ pps .. 2*pps-1 ]       left → right
 *   RIGHT  side → pins[ 2*pps .. 3*pps-1 ]     bottom → top
 *   TOP    side → pins[ 3*pps .. 4*pps-1 ]     right → left
 *
 * Public API consumed by ic-explorer-base.js:
 *   QFPRenderer.draw(svgElement, IC_CONFIG)
 *   QFPRenderer.updatePins(selectedId, filterType, filterFn)
 */

var QFPRenderer = (function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  /* ─── SVG micro-helpers ──────────────────────────────── */
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
  function ap(parent, child) { parent.appendChild(child); return child; }

  /* ─── Colour palette ─────────────────────────────────── */
  // Mirrors ic-explorer-base.js exactly so colours always agree.
  var PALETTE = {
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
    INT:   { c: '#c8a850', bg: 'rgba(200,168,80,.12)',  bd: 'rgba(200,168,80,.30)'  },
    COMP:  { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  }
  };

  function cl(type) {
    if (window.ICExplorer && typeof window.ICExplorer.getColor === 'function') {
      return window.ICExplorer.getColor(type);
    }
    return PALETTE[type] || PALETTE.GPIO;
  }

  /* ─── Module-level state ─────────────────────────────── */
  var _svg    = null;
  var _config = null;

  /* ─── Inject hover CSS once per page ────────────────────
   *
   * CSS handles the smooth hover brightness transition.
   * Class 'qfp-pin' on the <g> element, 'psq' on the rect.
   * This mirrors .mcu-pin / .psq from the STM32 self-contained
   * file and .ic-pin / .pin-sq from the DIP renderer.
   */
  var _cssInjected = false;
  function injectCSS() {
    if (_cssInjected) return;
    _cssInjected = true;
    var s = document.createElement('style');
    s.textContent =
      '.qfp-pin .psq{transition:filter .12s,stroke-width .12s,fill .12s;}' +
      '.qfp-pin:hover .psq{filter:brightness(1.9) drop-shadow(0 0 6px currentColor)!important;stroke-width:2.5px!important;}' +
      '.qfp-pin.selected .psq{filter:url(#qfpPinGlow)!important;stroke-width:2.5px!important;}';
    document.head.appendChild(s);
  }

  /* ─── draw() ─────────────────────────────────────────────
   *
   * Called once by ICExplorer.init().
   * Builds the full SVG: defs, body, labels, all 4 sides of pins.
   */
  function draw(svg, config) {
    _svg    = svg;
    _config = config;
    injectCSS();

    /* Layout */
    var VB     = 560;
    var PL     = 30;   // pin stub length
    var PW     = 20;   // pin stub width
    var MARGIN = 48;   // distance from viewBox edge to body edge
    var BX = MARGIN, BY = MARGIN;
    var BW = VB - 2 * MARGIN, BH = BW;  // square body

    var pps    = Math.floor(config.pinCount / 4);
    var CORNER = Math.max(15, Math.floor(pps * 0.3));
    var pitchV = (BH - 2 * CORNER) / (pps - 1);
    var pitchH = (BW - 2 * CORNER) / (pps - 1);

    /* Prepare SVG */
    svg.setAttribute('viewBox', '0 0 ' + VB + ' ' + VB);
    svg.setAttribute('width',  '100%');
    svg.setAttribute('height', '100%');
    svg.style.overflow = 'visible';   // let glow paint outside without causing reflow
    svg.style.display  = 'block';     // eliminate inline-block baseline gap
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    /* Defs */
    var defs = ap(svg, mk('defs', {}));

    // SVG glow filter — FIX: use userSpaceOnUse with padding beyond viewBox
    // This prevents the browser from recalculating SVG bounds when the filter is toggled,
    // which was causing the vertical shift.
    var filterPadding = 50;
    var gf = mk('filter', { id:'qfpPinGlow', filterUnits:'userSpaceOnUse',
      x: String(-filterPadding), y: String(-filterPadding),
      width: String(VB + 2 * filterPadding), height: String(VB + 2 * filterPadding) });
    var bl = mk('feGaussianBlur', { stdDeviation:'3.5', result:'blur' });
    var fm = mk('feMerge', {});
    ap(fm, mk('feMergeNode', { in:'blur' }));
    ap(fm, mk('feMergeNode', { in:'SourceGraphic' }));
    ap(gf, bl); ap(gf, fm); ap(defs, gf);

    // Body gradient
    var bg = mk('linearGradient', { id:'qfpBodyGrad', x1:'0%', y1:'0%', x2:'100%', y2:'100%' });
    ap(bg, mk('stop', { offset:'0%',   'stop-color':'#1c2128' }));
    ap(bg, mk('stop', { offset:'100%', 'stop-color':'#0d1117' }));
    ap(defs, bg);

    /* Chip body */
    ap(svg, mk('rect', { x:BX, y:BY, width:BW, height:BH, rx:'10',
      fill:'url(#qfpBodyGrad)', stroke:'#30363d', 'stroke-width':'2' }));
    ap(svg, mk('rect', { x:BX+5, y:BY+5, width:BW-10, height:BH-10, rx:'6',
      fill:'none', stroke:'#21262d', 'stroke-width':'1' }));

    /* Pin-1 dot (top-left corner) */
    ap(svg, mk('circle', { cx:BX+16, cy:BY+16, r:'7',
      fill:'#21262d', stroke:'#4da6ff', 'stroke-width':'1.3', opacity:'0.9' }));
    ap(svg, mk('circle', { cx:BX+16, cy:BY+16, r:'3.5',
      fill:'#4da6ff', opacity:'0.65' }));

    /* Decorative grid dots on body */
    for (var gi = 0; gi < 4; gi++) {
      for (var gj = 0; gj < 4; gj++) {
        ap(svg, mk('circle', {
          cx: BX + 60 + gi * 90, cy: BY + 60 + gj * 90,
          r: '1.5', fill: '#21262d'
        }));
      }
    }

    /* Body text labels */
    var cx = BX + BW / 2, cy = BY + BH / 2;
    ap(svg, tx(config.manufacturer || '', {
      x:cx, y:cy-50, fill:'#2a3545',
      'font-family':'monospace', 'font-size':'13', 'font-weight':'bold', 'text-anchor':'middle'
    }));
    ap(svg, tx(config.partName || '', {
      x:cx, y:cy+2, fill:'#3a5060',
      'font-family':'monospace', 'font-size':'26', 'font-weight':'bold', 'text-anchor':'middle'
    }));
    ap(svg, tx(config.package || '', {
      x:cx, y:cy+32, fill:'#2a3a4a',
      'font-family':'monospace', 'font-size':'14', 'text-anchor':'middle'
    }));
    ap(svg, tx(config.pinCount + ' pins', {
      x:cx, y:cy+52, fill:'#1e2a38',
      'font-family':'monospace', 'font-size':'12', 'text-anchor':'middle'
    }));

    /* ── makePin() — one interactive pin group ───────────── */
    function makePin(pin, px, py, side) {
      var col = cl(pin.type);

      var rx, ry, rw, rh;
      if (side === 'left')   { rw=PL; rh=PW; rx=px-PL;    ry=py-PW/2; }
      if (side === 'right')  { rw=PL; rh=PW; rx=px;       ry=py-PW/2; }
      if (side === 'top')    { rw=PW; rh=PL; rx=px-PW/2;  ry=py-PL;   }
      if (side === 'bottom') { rw=PW; rh=PL; rx=px-PW/2;  ry=py;      }

      var numX = rx + rw / 2;
      var numY = ry + rh / 2 + 4.5;

      var g = mk('g', {
        'class':     'qfp-pin',
        'data-id':   pin.id,
        'data-num':  pin.num,
        'data-type': pin.type
      });
      g.style.cursor = 'pointer';

      // Visible pin stub — class="psq" is the CSS hover target
      var psq = mk('rect', {
        x:rx, y:ry, width:rw, height:rh, rx:'3',
        fill: col.bg, stroke: col.c, 'stroke-width':'1.3',
        'class': 'psq'
      });
      // Cache defaults for updatePins() restore
      psq.dataset.defaultFill   = col.bg;
      psq.dataset.defaultStroke = col.c;
      ap(g, psq);

      // Tiny centre dot (decorative)
      ap(g, mk('rect', {
        x: numX-2, y: numY-6.5, width:4, height:4,
        rx:'1', fill:'#060c1a', 'pointer-events':'none'
      }));

      // Pin number label — class="plbl" so updatePins() can recolour it
      var lbl = tx(String(pin.num), {
        x: numX, y: numY,
        'text-anchor': 'middle',
        fill: col.c,
        'font-size': '11', 'font-family': 'monospace', 'font-weight': 'bold',
        'pointer-events': 'none',
        'class': 'plbl'
      });
      lbl.dataset.defaultFill = col.c;
      ap(g, lbl);

      // Enlarged transparent hit-zone (easier to click thin pins)
      ap(g, mk('rect', {
        x:rx-5, y:ry-5, width:rw+10, height:rh+10,
        fill:'transparent'
      }));

      /* Click → delegate to ICExplorer */
      g.addEventListener('click', function (e) {
        e.stopPropagation();
        if (window.ICExplorer && typeof window.ICExplorer.selectPin === 'function') {
          window.ICExplorer.selectPin(this.getAttribute('data-id'));
        }
      });

      /* Tooltip */
      g.addEventListener('mouseenter', function (e) {
        if (window.ICExplorer && typeof window.ICExplorer.showTooltip === 'function') {
          var pid   = this.getAttribute('data-id');
          var found = null;
          for (var i = 0; i < _config.pins.length; i++) {
            if (_config.pins[i].id === pid) { found = _config.pins[i]; break; }
          }
          window.ICExplorer.showTooltip(found, e);
        }
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
      });

      ap(svg, g);
    } // end makePin

    /* ── Draw all 4 sides ────────────────────────────────── */
    var pins = config.pins;

    // LEFT  (top → bottom)
    for (var i = 0; i < pps; i++) {
      if (pins[i]) makePin(pins[i], BX, BY + CORNER + i * pitchV, 'left');
    }
    // BOTTOM  (left → right)
    for (var j = 0; j < pps; j++) {
      if (pins[pps + j]) makePin(pins[pps + j], BX + CORNER + j * pitchH, BY + BH, 'bottom');
    }
    // RIGHT  (bottom → top)
    for (var k = 0; k < pps; k++) {
      if (pins[2 * pps + k]) makePin(pins[2 * pps + k], BX + BW, BY + BH - CORNER - k * pitchV, 'right');
    }
    // TOP  (right → left)
    for (var m = 0; m < pps; m++) {
      if (pins[3 * pps + m]) makePin(pins[3 * pps + m], BX + BW - CORNER - m * pitchH, BY, 'top');
    }

    console.log('QFPRenderer drew', config.partName, config.package, config.pinCount + 'p');
  } // end draw()


  /* ─── updatePins() ────────────────────────────────────────
   *
   * Called by ic-explorer-base.js on every state change:
   *   pin click, filter-button click, background click.
   *
   * @param {string|null}   selectedId   currently selected pin id (or null)
   * @param {string|null}   filterType   active filter key, e.g. 'ADC' (or null)
   * @param {function|null} filterFn     function(pin) → bool  (or null)
   */
  function updatePins(selectedId, filterType, filterFn) {
    if (!_svg) return;

    var hasFilter = !!filterType && typeof filterFn === 'function';

    _svg.querySelectorAll('.qfp-pin').forEach(function (g) {
      var pid   = g.getAttribute('data-id');
      var ptype = g.getAttribute('data-type');
      var sq    = g.querySelector('.psq');
      var lbl   = g.querySelector('.plbl');
      if (!sq) return;

      var col        = cl(ptype);
      var isSelected = (selectedId === pid);
      var pin        = null;
      for (var i = 0; i < _config.pins.length; i++) {
        if (_config.pins[i].id === pid) { pin = _config.pins[i]; break; }
      }
      var matches = hasFilter ? filterFn(pin) : true;

      /* ── SELECTED ─────────────────────────────────────── */
      if (isSelected) {
        sq.setAttribute('fill',         col.c);
        sq.setAttribute('stroke',       col.c);
        sq.setAttribute('stroke-width', '2.5');
        sq.setAttribute('filter',       'url(#qfpPinGlow)');
        if (lbl) lbl.setAttribute('fill', '#060c1a');
        g.style.opacity = '1';
        g.classList.add('selected');

      /* ── FILTER ON — no match ─────────────────────────── */
      } else if (hasFilter && !matches) {
        sq.setAttribute('fill',         'rgba(4,8,20,0.4)');
        sq.setAttribute('stroke',       'rgba(20,30,60,0.25)');
        sq.setAttribute('stroke-width', '0.8');
        sq.removeAttribute('filter');
        if (lbl) lbl.setAttribute('fill', 'rgba(30,45,80,0.25)');
        g.style.opacity = '0.08';
        g.classList.remove('selected');

      /* ── FILTER ON — matches ──────────────────────────── */
      } else if (hasFilter && matches) {
        // Use filter-type colour (provided by ICExplorer, or fall back to pin colour)
        var fc = (window.ICExplorer && window.ICExplorer.getFilterColor)
                  ? window.ICExplorer.getFilterColor(filterType)
                  : col.c;
        sq.setAttribute('fill',         fc);
        sq.setAttribute('stroke',       fc);
        sq.setAttribute('stroke-width', '2');
        sq.setAttribute('filter',       'url(#qfpPinGlow)');
        if (lbl) lbl.setAttribute('fill', '#060c1a');
        g.style.opacity = '1';
        g.classList.remove('selected');

      /* ── DEFAULT (no filter, not selected) ───────────── */
      } else {
        sq.setAttribute('fill',         sq.dataset.defaultFill   || col.bg);
        sq.setAttribute('stroke',       sq.dataset.defaultStroke || col.c);
        sq.setAttribute('stroke-width', '1.3');
        sq.removeAttribute('filter');
        if (lbl) lbl.setAttribute('fill', lbl.dataset.defaultFill || col.c);
        g.style.opacity = '1';
        g.classList.remove('selected');
      }
    });
  } // end updatePins()


  /* ─── Public API ─────────────────────────────────────── */
  return {
    draw:       draw,
    updatePins: updatePins
  };

})();

window.QFPRenderer = QFPRenderer;
