/**
 * IC Explorer Base Engine - Handles UI, filtering, tooltips, and tabs
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
  
  function getColor(type) {
    return COLORS[type] || COLORS.GPIO;
  }
  
  // Filter definitions
  var FILTERS = [
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
  
  var FCLR = {
    GPIO:'#78c878', PWM:'#50c8c8', ADC:'#c8a850', SPI:'#4a9aee',
    I2C:'#9898d8', UART:'#cc6888', USB:'#a78bfa', TIMER:'#50c8c8',
    XTAL:'#7090a8', PWR:'#ff6b6b', GND:'#a8a8a8', RESET:'#ff9944'
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
      
      // Attach event listeners
      setTimeout(function() {
        API.attachPinEvents();
      }, 50);
      
      // Build filter buttons
      API.buildFilterButtons();
      
      // Initialize UI
      API.updatePinList();
      API.updateLegend();
      
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
      API.updateBoardHighlight();
      API.updateDetailPanel();
      API.updatePinList();
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
      var f = FILTERS.find(function(x) { return x.key === filterType; });
      return f ? f.fn(p) : true;
    },
    
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
      fbDiv.innerHTML = FILTERS.map(function(f) {
        var c = FCLR[f.key] || '#78c878';
        var on = filterType === f.key;
        return '<button class="aw-fb' + (on ? ' on' : '') + '" data-k="' + f.key + '" style="color:' + c + ';background:' + (on ? '#0d1117' : '#1c2128') + ';border-color:' + (on ? c : 'rgba(255,255,255,.12)') + '">' + f.lbl + '</button>';
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
    }
  };
  
  // Initialize global state
  window._selectedPin = null;
  window._
