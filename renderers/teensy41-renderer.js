// ============================================================
//  renderers/teensy41-renderer.js
//  Teensy 4.1 — IC Explorer renderer
//
//  Implements the standard renderer interface required by
//  ic-explorer-base.js, plus the Teensy-specific chip
//  component panel (CHIPS array + component highlight).
//
//  Depends on:
//    window.Teensy41Board   (boards/teensy41-board.js)
//
//  Exports: window.Teensy41Renderer
//  Interface (standard):
//    Teensy41Renderer.draw(svg, config)
//    Teensy41Renderer.updatePins(selectedId, filterType, filterFn)
//  Interface (Teensy-specific, called by boot script):
//    Teensy41Renderer.initChipPanel(config)
//    Teensy41Renderer.onChipSelect(callback)   — called when a component is clicked
// ============================================================

(function(global){
'use strict';

var NS = 'http://www.w3.org/2000/svg';

// ── Colour palette ───────────────────────────────────────────
var COLORS = {
  PWR:  { c:'#ff6b6b', bg:'rgba(255,107,107,.14)', border:'rgba(255,107,107,.35)' },
  GND:  { c:'#9e9e9e', bg:'rgba(158,158,158,.12)', border:'rgba(158,158,158,.3)'  },
  GPIO: { c:'#4da6ff', bg:'rgba(77,166,255,.10)',  border:'rgba(77,166,255,.28)'  },
  SPI:  { c:'#4a90d9', bg:'rgba(74,144,217,.12)',  border:'rgba(74,144,217,.3)'   },
  I2C:  { c:'#9898cc', bg:'rgba(152,152,204,.12)', border:'rgba(152,152,204,.3)'  },
  UART: { c:'#c06080', bg:'rgba(192,96,128,.12)',  border:'rgba(192,96,128,.3)'   },
  PWM:  { c:'#50c8a0', bg:'rgba(80,200,160,.12)',  border:'rgba(80,200,160,.3)'   },
  ADC:  { c:'#d4a017', bg:'rgba(212,160,23,.12)',  border:'rgba(212,160,23,.3)'   },
  CAN:  { c:'#e87040', bg:'rgba(232,112,64,.12)',  border:'rgba(232,112,64,.3)'   },
  FLEX: { c:'#c040e0', bg:'rgba(192,64,224,.12)',  border:'rgba(192,64,224,.3)'   },
  USB:  { c:'#40d0c0', bg:'rgba(64,208,192,.12)',  border:'rgba(64,208,192,.3)'   },
  SPEC: { c:'#7090a0', bg:'rgba(112,144,160,.12)', border:'rgba(112,144,160,.3)'  },
};

// Chip-component button colours (extends COLORS for component types)
var CHIP_COLORS = {
  MCU:    '#4da6ff',
  FLASH:  '#d4a017',
  PHY:    '#50c8a0',
  SWITCH: '#ff6b6b',
  LDO:    '#ff6b6b',
  MOSFET: '#c06080',
  HEADER: '#a08020',
};

function cl(type) { return COLORS[type] || COLORS.SPEC; }
function chipClr(type) { return CHIP_COLORS[type] || '#888'; }

// ── Internal state ───────────────────────────────────────────
var _svg        = null;
var _config     = null;
var _selChipId  = null;
var _onChipSelect = null;   // external callback set by boot script

// ── SVG helper ───────────────────────────────────────────────
function mk(tag, attrs) {
  var el = document.createElementNS(NS, tag);
  for (var k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}
function app(parent, child) { parent.appendChild(child); return child; }

// ── draw() — called once by ICExplorer.init ──────────────────
function draw(svg, config) {
  _svg    = svg;
  _config = config;

  var bc  = config.boardConfig;
  var PS  = bc.pinSize;
  var PY0 = bc.pinY0;
  var PYS = bc.pinYStep;
  var LX  = bc.leftX;
  var RX  = bc.rightX;

  // 1. Draw PCB, components, silk labels
  Teensy41Board.draw(svg, config);

  // 2. Draw interactive pin pads on top of everything
  config.pins.forEach(function(p) {
    var col = cl(p.type);
    var cy  = PY0 + p.row * PYS;
    var cx  = (p.side === 'L') ? LX : RX;

    var g = mk('g', {'class':'t41-pin', 'data-id':p.id});
    g.style.cursor = 'pointer';

    // Background highlight halo
    app(g, mk('rect', {
      x: cx-PS/2-2, y: cy-PS/2-2, width: PS+4, height: PS+4, rx:'4',
      fill:'rgba(100,200,100,0.08)', stroke:'rgba(100,200,100,0.18)', 'stroke-width':'0.5'
    }));

    // Main pad square
    var sq = mk('rect', {
      x: cx-PS/2, y: cy-PS/2, width: PS, height: PS, rx:'3',
      fill: col.bg, stroke: col.c, 'stroke-width':'1.5', 'class':'pin-sq'
    });
    app(g, sq);

    // Through-hole
    app(g, mk('circle', {cx:cx, cy:cy, r:'3.5', fill:'#040e04', 'pointer-events':'none'}));

    // Enlarged invisible hit area
    app(g, mk('rect', {x:cx-14, y:cy-14, width:28, height:28, fill:'transparent'}));

    svg.appendChild(g);
  });
}

// ── updatePins() — called by base engine on every state change ──
//
//  selectedId  — id of currently selected pin (or null)
//  filterType  — key of active filter (or null)
//  filterFn    — function(pin) → bool, true = pin matches filter
//
function updatePins(selectedId, filterType, filterFn) {
  if (!_svg) return;
  var hasFilter = (filterType !== null && filterType !== undefined);

  // ── Pin pads ──────────────────────────────────────────────
  var pinGroups = _svg.querySelectorAll('.t41-pin');
  for (var i = 0; i < pinGroups.length; i++) {
    var g   = pinGroups[i];
    var id  = g.getAttribute('data-id');
    var p   = _pinById(id);
    if (!p) continue;

    var col     = cl(p.type);
    var sq      = g.querySelector('.pin-sq');
    var active  = (selectedId === id);
    var matched = hasFilter ? filterFn(p) : true;

    if (active) {
      // ── Selected ──
      sq.setAttribute('fill',         col.c);
      sq.setAttribute('stroke',       col.c);
      sq.setAttribute('stroke-width', '2.5');
      sq.setAttribute('filter',       'url(#t41PinGlow)');
      g.style.opacity = '1';

    } else if (hasFilter && !matched) {
      // ── Filter no-match ──
      sq.setAttribute('fill',         'rgba(15,18,28,0.6)');
      sq.setAttribute('stroke',       'rgba(50,60,90,0.3)');
      sq.setAttribute('stroke-width', '1');
      sq.removeAttribute('filter');
      g.style.opacity = '0.08';

    } else if (hasFilter && matched) {
      // ── Filter match ──
      sq.setAttribute('fill',         col.c);
      sq.setAttribute('stroke',       col.c);
      sq.setAttribute('stroke-width', '2');
      sq.setAttribute('filter',       'url(#t41PinGlow)');
      g.style.opacity = '1';

    } else {
      // ── Default ──
      sq.setAttribute('fill',         col.bg);
      sq.setAttribute('stroke',       col.c);
      sq.setAttribute('stroke-width', '1.5');
      sq.removeAttribute('filter');
      g.style.opacity = '1';
    }
  }

  // ── Chip components — dim when a pin filter is active ────
  var chipGroups = _svg.querySelectorAll('.t41-chip');
  for (var j = 0; j < chipGroups.length; j++) {
    var cg    = chipGroups[j];
    var cid   = cg.getAttribute('data-id');
    var shape = cg.querySelector('.chip-shape');
    var isSelChip = (_selChipId === cid);

    if (isSelChip) {
      shape.setAttribute('stroke',       '#4da6ff');
      shape.setAttribute('stroke-width', '2.5');
      shape.setAttribute('filter',       'url(#t41PinGlow)');
    } else {
      shape.setAttribute('stroke',       '#1a2a1a');
      shape.setAttribute('stroke-width', '1.2');
      shape.removeAttribute('filter');
    }
  }
}

// ── initChipPanel() — builds the "Highlight by Component" panel ──
//  Called by the boot script after ICExplorer.init().
//  Populates #t41ChipBtns and attaches click handlers.
//
function initChipPanel(config) {
  var wrap = document.getElementById('t41ChipBtns');
  if (!wrap) return;

  function rebuild() {
    wrap.innerHTML = config.chips.map(function(chip) {
      var clr    = chipClr(chip.type);
      var active = (_selChipId === chip.id);
      return '<button class="t41-fbtn' + (active ? ' active' : '') + '"'
        + ' data-id="' + chip.id + '"'
        + ' style="color:' + clr + ';'
        + 'background:' + (active ? '#0d1622' : '#1c2030') + ';'
        + 'border-color:' + (active ? clr : 'rgba(255,255,255,0.18)') + '">'
        + chip.name + '</button>';
    }).join('');

    var btns = wrap.querySelectorAll('.t41-fbtn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', (function(b) {
        return function() {
          var id = b.getAttribute('data-id');
          _selChipId = (_selChipId === id) ? null : id;
          rebuild();
          _applyChipHighlight();
          if (_onChipSelect) _onChipSelect(_selChipId, config.chips);
        };
      })(btns[i]));
    }
  }

  rebuild();
}

// ── onChipSelect() — register external callback ─────────────
//  The boot script registers this so it can update the detail
//  panel when the user clicks a component button.
//
function onChipSelect(fn) { _onChipSelect = fn; }

// ── getSelectedChipId() — read current chip selection ────────
function getSelectedChipId() { return _selChipId; }

// ── clearChipSelection() — called by base when pin is clicked ─
function clearChipSelection() {
  if (_selChipId === null) return;
  _selChipId = null;
  _applyChipHighlight();
  // Rebuild chip buttons to deactivate active state
  if (_config) {
    var wrap = document.getElementById('t41ChipBtns');
    if (wrap) {
      var btns = wrap.querySelectorAll('.t41-fbtn');
      for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
    }
  }
}

// ── Internal helpers ─────────────────────────────────────────
function _pinById(id) {
  if (!_config) return null;
  var pins = _config.pins;
  for (var i = 0; i < pins.length; i++) { if (pins[i].id === id) return pins[i]; }
  return null;
}

function _applyChipHighlight() {
  if (!_svg) return;
  var chipGroups = _svg.querySelectorAll('.t41-chip');
  for (var i = 0; i < chipGroups.length; i++) {
    var cg    = chipGroups[i];
    var cid   = cg.getAttribute('data-id');
    var shape = cg.querySelector('.chip-shape');
    if (!shape) continue;
    if (_selChipId === cid) {
      shape.setAttribute('stroke',       '#4da6ff');
      shape.setAttribute('stroke-width', '2.5');
      shape.setAttribute('filter',       'url(#t41PinGlow)');
    } else {
      shape.setAttribute('stroke',       '#1a2a1a');
      shape.setAttribute('stroke-width', '1.2');
      shape.removeAttribute('filter');
    }
  }
}

// ── Public API ───────────────────────────────────────────────
global.Teensy41Renderer = {
  draw:                draw,
  updatePins:          updatePins,
  initChipPanel:       initChipPanel,
  onChipSelect:        onChipSelect,
  getSelectedChipId:   getSelectedChipId,
  clearChipSelection:  clearChipSelection,
};

})(window);