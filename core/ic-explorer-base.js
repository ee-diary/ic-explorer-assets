/**
 * IC Explorer Base Engine - Complete with Tab Functionality--
 * Handles UI, filtering, tooltips, and ALL tabs (Pin, Design Files, Datasheet)
 */

var ICExplorer = (function() {
  'use strict';
  
  // Shared color palette
  var COLORS = {
    GPIO: {c:'#78c878',bg:'rgba(100,200,100,.10)',bd:'rgba(100,200,100,.27)'},
    PWR:  {c:'#ff6b6b',bg:'rgba(255,107,107,.14)',bd:'rgba(255,107,107,.35)'},
    GND:  {c:'#a8a8a8',bg:'rgba(168,168,168,.11)',bd:'rgba(168,168,168,.28)'},
    ADC:  {c:'#c8a850',bg:'rgba(200,168,80,.12)', bd:'rgba(200,168,80,.30)'},
    SPI:  {c:'#4a9aee',bg:'rgba(74,154,238,.11)', bd:'rgba(74,154,238,.28)'},
    I2C:  {c:'#9898d8',bg:'rgba(152,152,216,.11)',bd:'rgba(152,152,216,.28)'},
    UART: {c:'#cc6888',bg:'rgba(204,104,136,.11)',bd:'rgba(204,104,136,.28)'},
    PWM:  {c:'#50c8c8',bg:'rgba(80,200,200,.10)', bd:'rgba(80,200,200,.27)'},
    XTAL: {c:'#7090a8',bg:'rgba(112,144,168,.11)',bd:'rgba(112,144,168,.28)'},
    RESET:{c:'#ff9944',bg:'rgba(255,153,68,.12)', bd:'rgba(255,153,68,.30)'},
    TIMER:{c:'#50c8c8',bg:'rgba(80,200,200,.10)', bd:'rgba(80,200,200,.27)'},
    INT:  {c:'#c8a850',bg:'rgba(200,168,80,.12)', bd:'rgba(200,168,80,.30)'},
    USB:  {c:'#a78bfa',bg:'rgba(167,139,250,.11)',bd:'rgba(167,139,250,.28)'},
  };

  // ── PATCH: merge customTypes from config into COLORS at runtime ──────────
  // Called once during init so getColor() can resolve chip-specific types.
  function mergeCustomTypes(cfg) {
    if (!cfg || !cfg.customTypes) return;
    Object.keys(cfg.customTypes).forEach(function(k) {
      var ct = cfg.customTypes[k];
      // Map customTypes {c, bg, bd} → same shape as COLORS entries
      COLORS[k] = { c: ct.c, bg: ct.bg, bd: ct.bd };
    });
  }
  
  function getColor(type) {
    return COLORS[type] || COLORS.GPIO;
  }
  
  // Default filter definitions (used when config has NO filterButtons array)
  var DEFAULT_FILTERS = [
    {lbl:'GPIO',  key:'GPIO',  fn:function(p){return p.funcs && p.funcs.indexOf('GPIO')>=0;}},
    {lbl:'PWM',   key:'PWM',   fn:function(p){return p.funcs && p.funcs.indexOf('PWM')>=0;}},
    {lbl:'ADC',   key:'ADC',   fn:function(p){return p.funcs && p.funcs.indexOf('ADC')>=0;}},
    {lbl:'SPI',   key:'SPI',   fn:function(p){return p.funcs && p.funcs.indexOf('SPI')>=0;}},
    {lbl:'I2C',   key:'I2C',   fn:function(p){return p.funcs && p.funcs.indexOf('I2C')>=0;}},
    {lbl:'UART',  key:'UART',  fn:function(p){return p.funcs && p.funcs.indexOf('UART')>=0;}},
    {lbl:'USB',   key:'USB',   fn:function(p){return p.funcs && p.funcs.indexOf('USB')>=0;}},
    {lbl:'TIMER', key:'TIMER', fn:function(p){return p.funcs && (p.funcs.indexOf('TIMER')>=0 || p.funcs.indexOf('PWM')>=0);}},
    {lbl:'XTAL',  key:'XTAL',  fn:function(p){return p.type==='XTAL';}},
    {lbl:'PWR',   key:'PWR',   fn:function(p){return p.type==='PWR';}},
    {lbl:'GND',   key:'GND',   fn:function(p){return p.type==='GND';}},
    {lbl:'RESET', key:'RESET', fn:function(p){return p.type==='RESET';}},
  ];

  // ── PATCH: build FILTERS and FCLR from config.filterButtons if present ───
  // Returns { filters, fclr } — either from config or from the defaults above.
  function resolveFilters(cfg) {
    if (cfg && cfg.filterButtons && cfg.filterButtons.length) {
      var filters = cfg.filterButtons.map(function(fb) {
        var key = fb.type;
        return {
          lbl:      fb.label,
          key:      key,
          fontSize: fb.fontSize || null,
          fn: function(p) {
            if (p.funcs && p.funcs.indexOf(key) >= 0) return true;
            if (p.type === key) return true;
            return false;
          }
        };
      });
      var fclr = {};
      cfg.filterButtons.forEach(function(fb) {
        fclr[fb.type] = fb.color;
      });
      return { filters: filters, fclr: fclr };
    }
    var defaultFclr = {
      GPIO:'#78c878', PWM:'#50c8c8', ADC:'#c8a850', SPI:'#4a9aee',
      I2C:'#9898d8', UART:'#cc6888', USB:'#a78bfa', TIMER:'#50c8c8',
      XTAL:'#7090a8', PWR:'#ff6b6b', GND:'#a8a8a8', RESET:'#ff9944'
    };
    return { filters: DEFAULT_FILTERS, fclr: defaultFclr };
  }

  // Active filters (set during init, may be replaced per-chip)
  var FILTERS = DEFAULT_FILTERS;
  var FCLR = {
    GPIO:'#78c878', PWM:'#50c8c8', ADC:'#c8a850', SPI:'#4a9aee',
    I2C:'#9898d8', UART:'#cc6888', USB:'#a78bfa', TIMER:'#50c8c8',
    XTAL:'#7090a8', PWR:'#ff6b6b', GND:'#a8a8a8', RESET:'#ff9944'
  };
  
  // Canvas state
  var canvasState = {
    ctx: null,
    canvas: null,
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    currentTab: 'schematic'
  };
  
  // Public API
  var API = {
    COLORS: COLORS,
    getColor: getColor,
    FILTERS: FILTERS,
    FCLR: FCLR,
    
    init: function(cfg, renderer) {
      var C = cfg;
      var PINS = C.pins;
      var ALT = C.altFuncs || {};

      // ── PATCH: merge custom types and resolve filters before anything else ──
      mergeCustomTypes(C);
      var resolved = resolveFilters(C);
      FILTERS = resolved.filters;
      FCLR    = resolved.fclr;
      // Keep public references in sync
      API.FILTERS = FILTERS;
      API.FCLR    = FCLR;
      
      // Store config globally
      window._icConfig = C;
      window._icPins = PINS;
      window._icAlt = ALT;
      
      // Get SVG element
      var svg = document.getElementById('A13');
      if (!svg) {
        console.error('SVG element with id "A13" not found');
        return;
      }
      
      // Call package-specific renderer
      if (renderer && renderer.draw) {
        renderer.draw(svg, C);
      } else {
        console.error('Renderer missing draw method');
        return;
      }
      
      // Attach pin event listeners
      setTimeout(function() {
        API.attachPinEvents();
      }, 50);
      
      // Build filter buttons
      API.buildFilterButtons();
      
      // Initialize UI
      API.updatePinList();
      API.updateLegend();
      
      // Initialize tabs and canvas
      API.initTabs();
      API.initCanvas();
      API.initDatasheet();
      
      // Global functions
      window.icSelectPin = API.selectPin;
      window.icToggleList = API.togglePinList;
      
      console.log('IC Explorer initialized for', C.partName, '| Package:', C.package);
    },
    
    attachPinEvents: function() {
      document.querySelectorAll('.ic-pin').forEach(function(pinEl) {
        var pinId = pinEl.getAttribute('data-id');
        var pin = window._icPins.find(function(p) { return p.id === pinId; });
        
        if (pin) {
          pinEl.addEventListener('click', function(e) {
            e.stopPropagation();
            API.selectPin(pinId);
          });
          
          pinEl.addEventListener('mouseenter', function(e) {
            API.showTooltip(pin, e);
          });
          
          pinEl.addEventListener('mousemove', API.moveTooltip);
          pinEl.addEventListener('mouseleave', API.hideTooltip);
        }
      });
    },
    
    selectPin: function(id) {
      window._selectedPin = (window._selectedPin === id) ? null : id;
      requestAnimationFrame(function() {
        API.updateBoardHighlight();
        API.updateDetailPanel();
        API.updatePinListSelection();
      });
    },
    
    updateBoardHighlight: function() {
      var filterType = window._currentFilter;
      var selId = window._selectedPin;
      var hasFilter = filterType !== null && filterType !== undefined;
      
      document.querySelectorAll('.ic-pin').forEach(function(g) {
        var id = g.getAttribute('data-id');
        var p = window._icPins.find(function(x) { return x.id === id; });
        if (!p) return;
        
        var col = getColor(p.type);
        var sq = g.querySelector('.pin-sq');
        if (!sq) return;
        
        var act = selId === id;
        var mt = API.pinMatchesFilter(p);
        
        if (act) {
          sq.setAttribute('stroke', '#e74c3c');
          sq.setAttribute('stroke-width', '3');
          sq.setAttribute('filter', 'url(#pinGlow)');
          g.style.opacity = '1';
        } else if (hasFilter && !mt) {
          sq.setAttribute('stroke', '#4a4f5a');
          sq.setAttribute('stroke-width', '1');
          sq.removeAttribute('filter');
          g.style.opacity = '0.2';
        } else if (hasFilter && mt) {
          sq.setAttribute('stroke', col.c);
          sq.setAttribute('stroke-width', '2.5');
          sq.setAttribute('filter', 'url(#pinGlow)');
          g.style.opacity = '1';
        } else {
          sq.setAttribute('stroke', '#4a4f5a');
          sq.setAttribute('stroke-width', '1.2');
          sq.removeAttribute('filter');
          g.style.opacity = '1';
        }
      });
    },
    
    updateDetailPanel: function() {
      var empty = document.getElementById('awEMPTY');
      var content = document.getElementById('awDC');
      var selId = window._selectedPin;
      
      if (!selId) {
        if (empty) empty.style.display = 'block';
        if (content) content.className = 'aw-dc';
        return;
      }
      
      var p = window._icPins.find(function(x) { return x.id === selId; });
      if (!p) return;
      
      var col = getColor(p.type);
      if (empty) empty.style.display = 'none';
      if (content) content.className = 'aw-dc show';
      
      var badge = document.getElementById('awBADGE');
      if (badge) {
        badge.style.background = col.bg;
        badge.style.borderColor = col.c;
        badge.style.color = col.c;
        badge.innerHTML = '<span class="aw-dbadge-num">#' + p.num + '</span><span>' + p.lbl + '</span>';
      }
      
      var did = document.getElementById('awDID');
      if (did) {
        did.style.color = col.c;
        did.textContent = p.id;
      }
      
      var dfull = document.getElementById('awDFULL');
      if (dfull) dfull.textContent = p.name;
      
      var funcs = document.getElementById('awFUNCS');
      if (funcs && p.funcs) {
        funcs.innerHTML = p.funcs.map(function(f) {
          var fc = getColor(f) || col;
          return '<span class="aw-chip" style="background:' + fc.bg + ';color:' + fc.c + ';border-color:' + fc.bd + '">' + f + '</span>';
        }).join('');
      }
      
      var grid = document.getElementById('awIGRID');
      if (grid) {
        grid.innerHTML = 
          '<div class="aw-icell"><span class="aw-ilbl">Pin</span><span class="aw-ival">#' + p.num + '</span></div>' +
          '<div class="aw-icell"><span class="aw-ilbl">Type</span><span class="aw-ival" style="color:' + col.c + '">' + p.type + '</span></div>' +
          '<div class="aw-icell"><span class="aw-ilbl">Voltage</span><span class="aw-ival">' + p.volt + '</span></div>' +
          '<div class="aw-icell"><span class="aw-ilbl">Max mA</span><span class="aw-ival">' + p.curr + '</span></div>';
      }
      
      var altSec = document.getElementById('awALTS');
      if (altSec && window._icAlt[p.id] && window._icAlt[p.id].length) {
        altSec.style.display = 'block';
        var achips = document.getElementById('awACHIPS');
        if (achips) achips.innerHTML = window._icAlt[p.id].map(function(a) { return '<span class="aw-ac">' + a + '</span>'; }).join('');
      } else if (altSec) {
        altSec.style.display = 'none';
      }
      
      var note = document.getElementById('awNOTE');
      if (note) {
        note.innerHTML = '<span style="color:#4da6ff;margin-right:4px;">ⓘ</span>' + p.note;
      }
    },
    
    pinMatchesFilter: function(p) {
  var filterType = window._currentFilter;
  if (!filterType) return true;
  var f = API.FILTERS.find(function(x) { return x.key === filterType; });
  return f ? f.fn(p) : true;
},
    
    // Full rebuild — called on filter changes and on init.
    updatePinList: function() {
      var pins = window._icPins.filter(API.pinMatchesFilter);
      var rowsDiv = document.getElementById('awROWS');
      if (rowsDiv) {
        rowsDiv.innerHTML = pins.map(function(p) {
          var col = getColor(p.type);
          var on = window._selectedPin === p.id;
          return '<div class="aw-prow' + (on ? ' on' : '') + '" data-id="' + p.id + '" onclick="icSelectPin(\'' + p.id + '\')">' +
            '<div class="aw-pbadge" style="background:' + col.bg + ';color:' + col.c + ';border:1px solid ' + col.bd + '">' + p.lbl.substring(0, 4) + '</div>' +
            '<div class="aw-pname">' + p.name + '</div>' +
            '<span class="aw-ptag" style="background:' + col.bg + ';color:' + col.c + '">' + p.type + '</span>' +
            '</div>';
        }).join('');
      }
      var cntSpan = document.getElementById('awCNT');
      if (cntSpan) cntSpan.textContent = pins.length + (pins.length < window._icPins.length ? ' / ' + window._icPins.length : '');
    },

    // Lightweight selection-only update
    updatePinListSelection: function() {
      var rowsDiv = document.getElementById('awROWS');
      if (!rowsDiv) return;
      var selId = window._selectedPin;
      var rows = rowsDiv.querySelectorAll('.aw-prow');
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var isSelected = row.getAttribute('data-id') === selId;
        if (isSelected) {
          row.classList.add('on');
        } else {
          row.classList.remove('on');
        }
      }
    },
    
    updateLegend: function() {
      var types = [];
      window._icPins.forEach(function(p) {
        if (types.indexOf(p.type) < 0) types.push(p.type);
      });
      var legDiv = document.getElementById('awLEG');
      if (legDiv) {
        legDiv.innerHTML = types.map(function(t) {
          var c = getColor(t);
          return '<div class="aw-li"><span class="aw-ld" style="background:' + c.c + '"></span>' + t + '</div>';
        }).join('');
      }
    },
    
    buildFilterButtons: function() {
      var fbDiv = document.getElementById('awFBTNS');
      if (!fbDiv) return;
      
      var filterType = window._currentFilter;

      // ── PATCH: use resolved FILTERS + FCLR (chip-specific or default) ──────
      fbDiv.innerHTML = FILTERS.map(function(f) {
        var c = FCLR[f.key] || '#78c878';
        var on = filterType === f.key;
        var fs = f.fontSize ? 'font-size:' + f.fontSize + ';' : '';   // ← add this
        return '<button class="aw-fb' + (on ? ' on' : '') + '" data-k="' + f.key + '" style="color:' + c + ';background:' + (on ? '#0d1117' : '#1c2128') + ';border-color:' + (on ? c : 'rgba(255,255,255,.12)') + ';' + fs + '">' + f.lbl + '</button>';
      }).join('');
      
      document.querySelectorAll('.aw-fb').forEach(function(b) {
        b.addEventListener('click', function() {
          var k = this.getAttribute('data-k');
          window._currentFilter = (window._currentFilter === k) ? null : k;
          API.buildFilterButtons();
          API.updateBoardHighlight();
          API.updatePinList();
        });
      });
    },
    
    togglePinList: function() {
      window._listOpen = !window._listOpen;
      var plist = document.getElementById('awPLIST');
      if (plist) plist.className = 'aw-plist' + (window._listOpen ? ' open' : '');
      var ticon = document.getElementById('awTICON');
      if (ticon) ticon.textContent = window._listOpen ? '▲ HIDE' : '▼ SHOW';
    },
    
    showTooltip: function(pin, e) {
      var col = getColor(pin.type);
      var tt = document.getElementById('awTT');
      if (tt) {
        tt.innerHTML = '<span class="aw-tn" style="color:' + col.c + '">#' + pin.num + ' ' + pin.id + '</span>' +
          '<span class="aw-td">' + (pin.funcs ? pin.funcs.join(' · ') : pin.type) + ' | ' + pin.volt + '</span>';
        tt.className = 'aw-tt show';
        API.moveTooltip(e);
      }
    },
    
    moveTooltip: function(e) {
      var tt = document.getElementById('awTT');
      if (!tt) return;
      var r = document.getElementById('a13wrap').getBoundingClientRect();
      var x = e.clientX - r.left + 14;
      var y = e.clientY - r.top - 8;
      if (x + 270 > r.width) x = e.clientX - r.left - 280;
      if (y + 80 > r.height) y = e.clientY - r.top - 90;
      tt.style.left = x + 'px';
      tt.style.top = y + 'px';
    },
    
    hideTooltip: function() {
      var tt = document.getElementById('awTT');
      if (tt) tt.className = 'aw-tt';
    },
    
    // ========== TAB FUNCTIONALITY ==========
    
    initTabs: function() {
      var screenIC = document.getElementById('awScreenIC');
      var screenCanvas = document.getElementById('awScreenCanvas');
      var screenDS = document.getElementById('awScreenDS');
      var screenLabel = document.getElementById('awScreenLabel');
      
      if (!screenIC) return;
      
      function showScreen(mode) {
        if (screenIC) screenIC.style.display = 'none';
        if (screenCanvas) screenCanvas.style.display = 'none';
        if (screenDS) screenDS.style.display = 'none';
        
        if (mode === 'ic') {
          if (screenIC) screenIC.style.display = 'flex';
        } else if (mode === 'canvas') {
          if (screenCanvas) screenCanvas.style.display = 'flex';
        } else if (mode === 'ds') {
          if (screenDS) screenDS.style.display = 'block';
        }
      }
      
      function showCtrl(id) {
        var panels = ['ctrl-pin', 'ctrl-design', 'ctrl-ds'];
        for (var i = 0; i < panels.length; i++) {
          var el = document.getElementById(panels[i]);
          if (el) el.style.display = (panels[i] === id) ? 'flex' : 'none';
        }
      }
      
      var tabs = document.querySelectorAll('.aw-mtab');
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
          for (var j = 0; j < tabs.length; j++) {
            tabs[j].classList.remove('on');
          }
          this.classList.add('on');
          
          var mt = this.getAttribute('data-mt');
          if (mt === 'pin') {
            showScreen('ic');
            showCtrl('ctrl-pin');
            if (screenLabel) screenLabel.textContent = 'IC PIN EXPLORER';
          } else if (mt === 'design') {
            showScreen('canvas');
            showCtrl('ctrl-design');
            if (screenLabel) screenLabel.textContent = 'DESIGN FILES';
            setTimeout(function() {
              API.drawSubTab(canvasState.currentTab);
            }, 50);
          } else if (mt === 'ds') {
            showScreen('ds');
            showCtrl('ctrl-ds');
            if (screenLabel) screenLabel.textContent = 'DATASHEET VIEWER';
            if (!window._dsLoaded) API.loadDSSample();
          }
        });
      }
      
      // Sub-tabs for Design Files
      var subTabs = document.querySelectorAll('.aw-stab');
      for (var i = 0; i < subTabs.length; i++) {
        subTabs[i].addEventListener('click', function() {
          for (var j = 0; j < subTabs.length; j++) {
            subTabs[j].classList.remove('on');
          }
          this.classList.add('on');
          var st = this.getAttribute('data-st');
          canvasState.currentTab = st;
          API.drawSubTab(st);
        });
      }
    },
    
    initCanvas: function() {
      canvasState.canvas = document.getElementById('awOutputCanvas');
      if (!canvasState.canvas) return;
      
      canvasState.ctx = canvasState.canvas.getContext('2d');
      
      function resizeCanvas() {
        var container = document.getElementById('awScreenCanvas');
        if (!container) return;
        var W = container.clientWidth || 600;
        var H = Math.round(W * 0.7);
        canvasState.canvas.width = W;
        canvasState.canvas.height = H;
        API.drawSubTab(canvasState.currentTab);
      }
      
      window.addEventListener('resize', resizeCanvas);
      setTimeout(resizeCanvas, 100);
      
      var zoomIn = document.getElementById('awCanZoomIn');
      var zoomOut = document.getElementById('awCanZoomOut');
      var reset = document.getElementById('awCanReset');
      
      if (zoomIn) {
        zoomIn.addEventListener('click', function() {
          canvasState.zoom *= 1.25;
          canvasState.zoom = Math.min(8, canvasState.zoom);
          API.drawSubTab(canvasState.currentTab);
        });
      }
      
      if (zoomOut) {
        zoomOut.addEventListener('click', function() {
          canvasState.zoom *= 0.8;
          canvasState.zoom = Math.max(0.15, canvasState.zoom);
          API.drawSubTab(canvasState.currentTab);
        });
      }
      
      if (reset) {
        reset.addEventListener('click', function() {
          canvasState.zoom = 1;
          canvasState.offsetX = 0;
          canvasState.offsetY = 0;
          API.drawSubTab(canvasState.currentTab);
        });
      }
      
      canvasState.canvas.addEventListener('wheel', function(e) {
        e.preventDefault();
        var rect = canvasState.canvas.getBoundingClientRect();
        var rx = canvasState.canvas.width / rect.width;
        var ry = canvasState.canvas.height / rect.height;
        var cx = (e.clientX - rect.left) * rx;
        var cy = (e.clientY - rect.top) * ry;
        var factor = e.deltaY < 0 ? 1.15 : 0.87;
        canvasState.offsetX = cx - (cx - canvasState.offsetX) * factor;
        canvasState.offsetY = cy - (cy - canvasState.offsetY) * factor;
        canvasState.zoom *= factor;
        canvasState.zoom = Math.max(0.15, Math.min(8, canvasState.zoom));
        API.drawSubTab(canvasState.currentTab);
      }, { passive: false });
      
      canvasState.canvas.addEventListener('mousedown', function(e) {
        canvasState.dragging = true;
        canvasState.lastX = e.clientX;
        canvasState.lastY = e.clientY;
      });
      
      canvasState.canvas.addEventListener('mouseup', function() {
        canvasState.dragging = false;
      });
      
      canvasState.canvas.addEventListener('mouseleave', function() {
        canvasState.dragging = false;
      });
      
      canvasState.canvas.addEventListener('mousemove', function(e) {
        if (!canvasState.dragging) return;
        var rect = canvasState.canvas.getBoundingClientRect();
        var rx = canvasState.canvas.width / rect.width;
        var ry = canvasState.canvas.height / rect.height;
        canvasState.offsetX += (e.clientX - canvasState.lastX) * rx;
        canvasState.offsetY += (e.clientY - canvasState.lastY) * ry;
        canvasState.lastX = e.clientX;
        canvasState.lastY = e.clientY;
        API.drawSubTab(canvasState.currentTab);
      });
    },
    
    drawSubTab: function(st) {
      if (!canvasState.ctx || !canvasState.canvas) return;
      canvasState.currentTab = st;
      
      var C = window._icConfig;
      if (!C) return;
      
      if (st === 'schematic') API.drawSchematic();
      else if (st === 'symbol') API.drawSymbol();
      else if (st === 'footprint') API.drawFootprint();
    },
    
    drawSchematic: function() {
      var ctx = canvasState.ctx;
      var canvas = canvasState.canvas;
      var C = window._icConfig;
      var W = canvas.width, H = canvas.height;
      var zoom = canvasState.zoom;
      var offX = canvasState.offsetX;
      var offY = canvasState.offsetY;
      
      ctx.fillStyle = '#080d16';
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.translate(offX, offY);
      ctx.scale(zoom, zoom);
      
      ctx.strokeStyle = 'rgba(77,166,255,0.04)';
      ctx.lineWidth = 0.5;
      for (var x = 0; x < W / zoom; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H / zoom);
        ctx.stroke();
      }
      for (var y = 0; y < H / zoom; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W / zoom, y);
        ctx.stroke();
      }
      
      var ix = 70, iy = 14, iw = W / zoom - 140, ih = H / zoom - 28;
      ctx.fillStyle = '#0a0e16';
      ctx.strokeStyle = '#3a6080';
      ctx.lineWidth = 1.5;
      ctx.fillRect(ix, iy, iw, ih);
      ctx.strokeRect(ix, iy, iw, ih);
      
      ctx.fillStyle = '#4da6ff';
      ctx.beginPath();
      ctx.arc(ix + 8, iy + 8, 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#4da6ff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('U1', ix + iw / 2, iy + 14);
      ctx.fillStyle = '#3a5a70';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(C.partName, ix + iw / 2, iy + 32);
      ctx.fillStyle = '#2a3a48';
      ctx.font = '10px monospace';
      ctx.fillText(C.package + ' · ' + C.pinCount + ' pins', ix + iw / 2, iy + 46);
      
      var pins = C.pins;
      var grpMap = {};
      pins.forEach(function(p) {
        var k = p.type;
        if (!grpMap[k]) grpMap[k] = { n: k, c: getColor(k).c, ps: [] };
        grpMap[k].ps.push(p.lbl + (p.num ? '(' + p.num + ')' : ''));
      });
      
      var py = 62, lineH = 13;
      var grpKeys = Object.keys(grpMap);
      for (var i = 0; i < grpKeys.length && i < 8; i++) {
        var grp = grpMap[grpKeys[i]];
        if (py > iy + ih - 12) break;
        ctx.fillStyle = grp.c;
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(grp.n, ix + 5, py);
        ctx.strokeStyle = grp.c;
        ctx.lineWidth = 0.3;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.moveTo(ix + 5, py + 2);
        ctx.lineTo(ix + iw - 5, py + 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        py += 10;
        
        var psList = grp.ps.slice(0, 6);
        for (var j = 0; j < psList.length; j++) {
          if (py > iy + ih - 8) break;
          ctx.strokeStyle = grp.c;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(ix - 14, py - 3);
          ctx.lineTo(ix, py - 3);
          ctx.stroke();
          ctx.fillStyle = grp.c;
          ctx.font = '7px monospace';
          ctx.textAlign = 'end';
          ctx.fillText(psList[j].split('/')[0], ix - 16, py);
          py += lineH;
        }
        py += 3;
      }
      
      ctx.restore();
    },
    
    drawSymbol: function() {
      var ctx = canvasState.ctx;
      var canvas = canvasState.canvas;
      var C = window._icConfig;
      var W = canvas.width, H = canvas.height;
      var zoom = canvasState.zoom;
      var offX = canvasState.offsetX;
      var offY = canvasState.offsetY;
      
      ctx.fillStyle = '#080d16';
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.translate(offX, offY);
      ctx.scale(zoom, zoom);
      
      var bx = W / zoom / 2 - 60, by = H / zoom / 2 - 80;
      var bw = 120, bh = 160;
      
      ctx.fillStyle = '#0a0e18';
      ctx.strokeStyle = '#4da6ff';
      ctx.lineWidth = 1.8;
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeRect(bx, by, bw, bh);
      
      ctx.fillStyle = '#4da6ff';
      ctx.font = 'bold 11px Orbitron,monospace';
      ctx.textAlign = 'center';
      ctx.fillText(C.partName, bx + bw / 2, by + 18);
      ctx.fillStyle = '#8b949e';
      ctx.font = '9px monospace';
      ctx.fillText(C.package, bx + bw / 2, by + 32);
      
      var types = [];
      var seen = {};
      C.pins.forEach(function(p) {
        if (!seen[p.type]) {
          types.push(p.type);
          seen[p.type] = true;
        }
      });
      
      var yy = by + 52, step = 28;
      for (var i = 0; i < Math.min(types.length, 4); i++) {
        var t = types[i];
        var col = getColor(t);
        ctx.fillStyle = col.c;
        ctx.globalAlpha = 0.1;
        ctx.fillRect(bx + 8, yy - 9, bw - 16, 20);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = col.c;
        ctx.lineWidth = 0.7;
        ctx.strokeRect(bx + 8, yy - 9, bw - 16, 20);
        ctx.fillStyle = col.c;
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(t, bx + bw / 2, yy + 4);
        ctx.strokeStyle = col.c;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(bx - 12, yy + 1);
        ctx.lineTo(bx + 8, yy + 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(bx + bw - 8, yy + 1);
        ctx.lineTo(bx + bw + 12, yy + 1);
        ctx.stroke();
        yy += step;
      }
      
      ctx.restore();
    },
    
    drawFootprint: function() {
      var ctx = canvasState.ctx;
      var canvas = canvasState.canvas;
      var C = window._icConfig;
      var W = canvas.width, H = canvas.height;
      var zoom = canvasState.zoom;
      var offX = canvasState.offsetX;
      var offY = canvasState.offsetY;
      
      ctx.fillStyle = '#0d1b0d';
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.translate(offX, offY);
      ctx.scale(zoom, zoom);
      
      var bw2 = (W / zoom) * 0.28, bh2 = (H / zoom) * 0.75;
      var bx = (W / zoom - bw2) / 2, by = (H / zoom - bh2) / 2;
      
      ctx.fillStyle = '#0a1208';
      ctx.strokeStyle = '#fffde7';
      ctx.lineWidth = 0.7;
      ctx.fillRect(bx, by, bw2, bh2);
      ctx.strokeRect(bx, by, bw2, bh2);
      
      ctx.strokeStyle = 'rgba(255,152,0,0.5)';
      ctx.lineWidth = 0.4;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(bx - 20, by - 10, bw2 + 40, bh2 + 20);
      ctx.setLineDash([]);
      
      ctx.fillStyle = '#ff9800';
      ctx.beginPath();
      ctx.arc(bx + 8, by + 8, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(100,180,100,0.4)';
      ctx.font = 'bold ' + (bw2 * 0.18) + 'px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(C.partName.split(/\d/)[0], bx + bw2 / 2, by + bh2 / 2 - 10);
      ctx.fillStyle = 'rgba(77,120,77,0.3)';
      ctx.font = (bw2 * 0.14) + 'px monospace';
      ctx.fillText(C.partName.replace(/[A-Z]+/, ''), bx + bw2 / 2, by + bh2 / 2 + 12);
      ctx.fillStyle = 'rgba(60,100,60,0.25)';
      ctx.font = (bw2 * 0.1) + 'px monospace';
      ctx.fillText(C.package, bx + bw2 / 2, by + bh2 / 2 + 32);
      
      var pinsPerSide = Math.ceil(C.pinCount / 4);
      var padLen = 14, padW = 5;
      var pitch = bh2 / pinsPerSide;
      ctx.fillStyle = '#ffd54f';
      for (var i = 0; i < pinsPerSide; i++) {
        var pos = i * pitch + pitch / 2;
        ctx.fillRect(bx - padLen - 2, by + pos - padW / 2, padLen, padW);
        ctx.fillRect(bx + bw2 + 2, by + pos - padW / 2, padLen, padW);
      }
      
      ctx.fillStyle = '#ff9800';
      ctx.beginPath();
      ctx.arc(bx - padLen - 8, by + pitch / 2, 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    },
    
    // ========== DATASHEET FUNCTIONALITY ==========
    
    initDatasheet: function() {
      var quickBody = document.getElementById('awDsQuickBody');
      var C = window._icConfig;
      
      if (quickBody && C && C.quickSpecs) {
        quickBody.innerHTML = C.quickSpecs.map(function(r) {
          return '<div style="border-bottom:1px solid #21262d;display:flex;justify-content:space-between;padding:2px 0;"><span>' + r.label + '</span><span style="color:' + (r.color || '#e0e5ec') + ';font-weight:700;">' + r.value + '</span></div>';
        }).join('');
      }
      
      var loadSample = document.getElementById('awLoadSample');
      if (loadSample) {
        loadSample.addEventListener('click', API.loadDSSample);
      }
      
      var pdfInput = document.getElementById('awPdfInput');
      if (pdfInput) {
        pdfInput.addEventListener('change', API.handlePDFUpload);
      }
      
      var newUpload = document.getElementById('awNewUpload');
      if (newUpload) {
        newUpload.addEventListener('click', function() {
          var dsContent = document.getElementById('awDSContent');
          if (dsContent) dsContent.innerHTML = '';
          window._dsLoaded = false;
          var fileInfo = document.getElementById('awFileInfo');
          if (fileInfo) fileInfo.textContent = 'No file selected';
          if (newUpload) newUpload.style.display = 'none';
          if (pdfInput) pdfInput.value = '';
        });
      }
    },
    
    loadDSSample: function() {
      window._dsLoaded = true;
      var dsContent = document.getElementById('awDSContent');
      var C = window._icConfig;
      
      if (!dsContent) return;
      
      function section(title, rows) {
        return '<div style="font-size:16px;color:#c8a850;font-weight:700;letter-spacing:.1em;margin:14px 0 6px;text-transform:uppercase;">' + title + '</div><div style="background:#0d1117;border:1px solid #21262d;border-radius:4px;overflow:hidden;">' + rows.join('') + '</div>';
      }
      
      function row(p, v) {
        return '<div style="display:flex;justify-content:space-between;padding:4px 9px;border-bottom:1px solid #1a2030;font-size:16px;"><span style="color:#8b949e;">' + p + '</span><span style="color:#e6edf3;font-weight:700;">' + v + '</span></div>';
      }
      
      function feat(t) {
        return '<div style="padding:4px 9px;border-bottom:1px solid #1a2030;font-size:16px;color:#8b949e;display:flex;gap:6px;align-items:flex-start;"><span style="color:#4da6ff;flex-shrink:0;font-size:14px;">✓</span>' + t + '</div>';
      }
      
      var html = '<div style="font-family:Orbitron,sans-serif;font-size:16px;color:#50c8a0;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #21262d;">' + C.partName + ' — Quick Reference</div>';
      
      if (C.dsSpecs && C.dsSpecs.length) {
        html += section('SPECIFICATIONS', C.dsSpecs.map(function(r) {
          return row(r.label, r.value);
        }));
      }
      
      if (C.dsFeatures && C.dsFeatures.length) {
        html += section('KEY FEATURES', C.dsFeatures.map(feat));
      }
      
      dsContent.innerHTML = html;
      
      var newUpload = document.getElementById('awNewUpload');
      if (newUpload) newUpload.style.display = 'inline-block';
    },
    
    handlePDFUpload: function(e) {
      if (!e.target.files.length) return;
      var file = e.target.files[0];
      var fileInfo = document.getElementById('awFileInfo');
      if (fileInfo) fileInfo.textContent = '📎 ' + file.name;
      
      var progressDiv = document.getElementById('awProgress');
      var progressBar = document.getElementById('awProgressBar');
      if (progressDiv) progressDiv.style.display = 'block';
      if (progressBar) progressBar.style.width = '0%';
      
      if (typeof pdfjsLib === 'undefined') {
        API.loadDSSample();
        return;
      }
      
      var reader = new FileReader();
      reader.onload = function() {
        var arr = new Uint8Array(this.result);
        pdfjsLib.getDocument(arr).promise.then(function(pdf) {
          var txt = '', done = 0;
          for (var i = 1; i <= pdf.numPages; i++) {
            pdf.getPage(i).then(function(pg) { return pg.getTextContent(); }).then(function(tc) {
              txt += tc.items.map(function(x) { return x.str; }).join(' ') + '\n';
              done++;
              if (progressBar) progressBar.style.width = (done / pdf.numPages * 100) + '%';
              if (done === pdf.numPages) {
                if (progressDiv) progressDiv.style.display = 'none';
                API.displayPDFContent(txt);
              }
            });
          }
        }).catch(function() {
          API.loadDSSample();
        });
      };
      reader.readAsArrayBuffer(file);
    },
    
    displayPDFContent: function(text) {
      window._dsLoaded = true;
      var dsContent = document.getElementById('awDSContent');
      var C = window._icConfig;
      
      if (!dsContent) return;
      
      function section(title, rows) {
        return '<div style="font-size:16px;color:#c8a850;font-weight:700;letter-spacing:.1em;margin:14px 0 6px;text-transform:uppercase;">' + title + '</div><div style="background:#0d1117;border:1px solid #21262d;border-radius:4px;overflow:hidden;">' + rows.join('') + '</div>';
      }
      
      function row(p, v) {
        return '<div style="display:flex;justify-content:space-between;padding:4px 9px;border-bottom:1px solid #1a2030;font-size:16px;"><span style="color:#8b949e;">' + p + '</span><span style="color:#e6edf3;font-weight:700;">' + v + '</span></div>';
      }
      
      var flash = text.match(/(\d+)\s*K.*flash/i) ? RegExp.$1 + ' KB' : '?';
      var freq = text.match(/(\d+)\s*MHz/i) ? RegExp.$1 + ' MHz' : '?';
      
      var html = '<div style="font-size:14px;color:#27ae60;margin-bottom:10px;padding:5px 8px;background:rgba(39,174,96,0.1);border-radius:3px;border:1px solid rgba(39,174,96,0.2);">✓ PDF parsed successfully</div>';
      html += section('EXTRACTED FROM PDF', [row('Flash', flash), row('Max Freq', freq)]);
      
      if (C.dsSpecs && C.dsSpecs.length) {
        html += section('KNOWN SPECIFICATIONS', C.dsSpecs.map(function(r) {
          return row(r.label, r.value);
        }));
      }
      
      dsContent.innerHTML = html;
      
      var newUpload = document.getElementById('awNewUpload');
      if (newUpload) newUpload.style.display = 'inline-block';
    }
  };
  
  // Initialize global state
  window._selectedPin = null;
  window._listOpen = false;
  window._currentFilter = null;
  window._icConfig = null;
  window._icPins = null;
  window._icAlt = null;
  window._dsLoaded = false;
  
  return API;
})();

window.ICExplorer = ICExplorer;
