/**
 * Custom Board Renderer - For Raspberry Pi, Teensy, Arduino, etc.
 * Renders the physical board layout with all components
 */

var CustomBoardRenderer = (function() {
  'use strict';
  
  var NS = 'http://www.w3.org/2000/svg';
  
  // Registry of board-specific drawing functions
  var boardDrawers = {
    'RASPBERRY PI 3': function(svg, config) {
      drawRaspberryPi3(svg, config);
    },
    'TEENSY 4.1': function(svg, config) {
      drawTeensy41(svg, config);
    },
    'TEENSY41': function(svg, config) {
      drawTeensy41(svg, config);
    },
    'TEENSY 4.1 BOARD': function(svg, config) {
      drawTeensy41(svg, config);
    },
    'ARDUINO NANO': function(svg, config) {
      drawArduinoNano(svg, config);
    }
  };
  
  function draw(svg, config) {
    var boardName = config.boardType || config.partName;
    var drawer = boardDrawers[boardName.toUpperCase()];
    
    if (drawer) {
      drawer(svg, config);
    } else {
      drawGenericBoard(svg, config);
    }
    
    attachPinInteractivity(svg, config);
  }
  
  // ============================================================
  // TEENSY 4.1 BOARD DRAWING
  // ============================================================
  function drawTeensy41(svg, config) {
    // Clear SVG
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    
    svg.setAttribute('viewBox', '0 -60 220 700');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Helper function
    function mk(tag, attrs) {
      var el = document.createElementNS(NS, tag);
      for (var k in attrs) el.setAttribute(k, attrs[k]);
      return el;
    }
    
    function app(parent, child) {
      parent.appendChild(child);
      return child;
    }
    
    function txt(str, attrs) {
      var t = mk('text', attrs);
      t.textContent = str;
      return t;
    }
    
    // ── DEFS ──
    var defs = app(svg, mk('defs', {}));
    
    function linGrad(id, x1, y1, x2, y2, stops) {
      var g = mk('linearGradient', { id: id, x1: x1, y1: y1, x2: x2, y2: y2 });
      stops.forEach(function(s) {
        var st = mk('stop', { offset: s[0] });
        st.setAttribute('stop-color', s[1]);
        g.appendChild(st);
      });
      defs.appendChild(g);
    }
    
    // Gradients
    linGrad('t41PcbG', '0', '0', '1', '1', [['0%', '#1a3a1a'], ['50%', '#122810'], ['100%', '#0c1e0c']]);
    linGrad('t41ChipG', '0', '0', '1', '1', [['0%', '#1e1e1e'], ['100%', '#080808']]);
    linGrad('t41SilvG', '0', '0', '0', '1', [['0%', '#d8d8d8'], ['50%', '#a8a8a8'], ['100%', '#787878']]);
    linGrad('t41UsbG', '0', '0', '1', '0', [['0%', '#e0e0e0'], ['30%', '#ffffff'], ['60%', '#d0d0d0'], ['100%', '#b0b0b0']]);
    
    // Green dot pattern (PCB style)
    var pat = mk('pattern', { id: 't41Dots', width: '16', height: '16', patternUnits: 'userSpaceOnUse' });
    app(pat, mk('circle', { cx: '8', cy: '8', r: '0.6', fill: 'rgba(100,220,100,0.10)' }));
    defs.appendChild(pat);
    
    // Glow filter for selected pins
    var filt = mk('filter', { id: 't41PinGlow', x: '-50%', y: '-50%', width: '200%', height: '200%' });
    var fgb = mk('feGaussianBlur', { stdDeviation: '3.5', result: 'blur' });
    filt.appendChild(fgb);
    var fm = mk('feMerge', {});
    app(fm, mk('feMergeNode', { in: 'blur' }));
    app(fm, mk('feMergeNode', { in: 'SourceGraphic' }));
    filt.appendChild(fm);
    defs.appendChild(filt);
    
    // Board outline — green PCB
    app(svg, mk('rect', { x: '0', y: '0', width: '220', height: '600', rx: '0', fill: 'url(#t41PcbG)', stroke: '#0a1f0a', 'stroke-width': '2' }));
    app(svg, mk('rect', { x: '0', y: '0', width: '220', height: '600', rx: '0', fill: 'url(#t41Dots)' }));
    app(svg, mk('rect', { x: '1', y: '1', width: '218', height: '598', rx: '0', fill: 'none', stroke: 'rgba(100,220,100,0.09)', 'stroke-width': '1' }));
    
    // USB-C connector — top centre
    var ucx = 60, ucy = -12, ucw = 100, uch = 55;
    app(svg, mk('rect', { x: ucx, y: ucy, width: ucw, height: uch, rx: '5', fill: 'url(#t41UsbG)', stroke: '#999', 'stroke-width': '1.5' }));
    app(svg, mk('rect', { x: ucx + 3, y: ucy + 3, width: ucw - 6, height: uch - 6, rx: '3', fill: 'url(#t41UsbG)' }));
    app(svg, mk('ellipse', { cx: ucx + ucw / 2, cy: ucy + uch - 7, rx: '16', ry: '9', fill: '#111', stroke: '#666', 'stroke-width': '1' }));
    app(svg, txt('USB-C', { fill: '#555', 'font-family': 'monospace', 'font-size': '7', 'text-anchor': 'middle', x: '' + (ucx + ucw / 2), y: '' + (ucy + 15) }));
    
    // MKL02Z32VFG4 MCU (Bootloader)
    var mcuG = app(svg, mk('g', { 'class': 'board-chip', 'data-id': 'MKL02' }));
    var mcuW = 38, mcuH = 36, mcuX = 125, mcuY = 70;
    app(mcuG, mk('rect', { x: mcuX, y: mcuY, width: mcuW, height: mcuH, rx: '2', fill: 'url(#t41ChipG)', stroke: '#2a3a2a', 'stroke-width': '1.2', 'class': 'chip-shape' }));
    app(mcuG, mk('circle', { cx: mcuX + 6, cy: mcuY + 6, r: '2', fill: '#1a2a1a' }));
    app(mcuG, txt('MKL02', { fill: 'rgba(255,255,255,0.6)', 'font-family': 'monospace', 'font-size': '5', 'text-anchor': 'middle', x: mcuX + mcuW / 2, y: mcuY + mcuH / 2 + 2 }));
    
    // TLV75733P LDO
    var ldoG = app(svg, mk('g', { 'class': 'board-chip', 'data-id': 'TLV75733P' }));
    var ldoW = 24, ldoH = 28, ldoX = 73, ldoY = 118;
    for (var i = 0; i < 3; i++) {
      app(ldoG, mk('rect', { x: ldoX - 2, y: ldoY + 4 + i * 8, width: '4', height: '4', rx: '0.5', fill: 'url(#t41SilvG)' }));
    }
    for (i = 0; i < 2; i++) {
      app(ldoG, mk('rect', { x: ldoX + ldoW - 2, y: ldoY + 4 + i * 16, width: '4', height: '4', rx: '0.5', fill: 'url(#t41SilvG)' }));
    }
    app(ldoG, mk('rect', { x: ldoX, y: ldoY, width: ldoW, height: ldoH, rx: '1', fill: 'url(#t41ChipG)', stroke: '#2a3a2a', 'stroke-width': '1', 'class': 'chip-shape' }));
    app(ldoG, txt('LDO', { fill: 'rgba(255,255,255,0.5)', 'font-family': 'monospace', 'font-size': '4', 'text-anchor': 'middle', x: ldoX + ldoW / 2, y: ldoY + ldoH / 2 + 2 }));
    
    // DMG2305UX P-MOSFET
    var dmgG = app(svg, mk('g', { 'class': 'board-chip', 'data-id': 'DMG2305UX' }));
    var dmgX = 90, dmgY = 65, dmgW = 22, dmgH = 28;
    for (i = 0; i < 2; i++) {
      app(dmgG, mk('rect', { x: dmgX - 3, y: dmgY + 6 + i * 16, width: '4', height: '2', rx: '0.3', fill: 'url(#t41SilvG)' }));
    }
    app(dmgG, mk('rect', { x: dmgX + dmgW - 1, y: dmgY + dmgH / 2 - 1, width: '4', height: '2', rx: '0.3', fill: 'url(#t41SilvG)' }));
    app(dmgG, mk('rect', { x: dmgX, y: dmgY, width: dmgW, height: dmgH, rx: '1', fill: 'url(#t41ChipG)', stroke: '#1a2a1a', 'stroke-width': '0.8', 'class': 'chip-shape' }));
    app(dmgG, txt('DMG2305UX', { fill: 'rgba(255,255,255,0.4)', 'font-family': 'monospace', 'font-size': '4', 'text-anchor': 'middle', x: dmgX + dmgW / 2, y: dmgY + dmgH / 2 + 1 }));
    
    // USB Host Header (5 holes)
    var uhG = app(svg, mk('g', { 'class': 'board-connector', 'data-id': 'USB_HOST_HDR' }));
    var uhX = 52, uhYstart = 60, uhYend = 185;
    app(uhG, mk('rect', { x: uhX - 10, y: uhYstart - 14, width: '20', height: uhYend - uhYstart + 26, rx: '2', fill: 'none', stroke: 'rgba(255,255,255,0.2)', 'stroke-width': '0.6' }));
    for (i = 0; i < 5; i++) {
      var uhY = uhYstart + i * ((uhYend - uhYstart) / 4);
      app(uhG, mk('circle', { cx: uhX, cy: uhY, r: '5', fill: '#c8a040', stroke: '#9a7c20', 'stroke-width': '1' }));
      app(uhG, mk('circle', { cx: uhX, cy: uhY, r: '2.5', fill: '#0a1a0a' }));
    }
    app(uhG, txt('USB HOST', { fill: 'rgba(255,255,255,0.4)', 'font-family': 'monospace', 'font-size': '5', 'text-anchor': 'middle', x: uhX, y: uhYstart - 8 }));
    
    // ETH 2×3 through-hole pads
    var ethG = app(svg, mk('g', { 'class': 'board-connector', 'data-id': 'ETH_HDR' }));
    var ethPS = 28.25, ethPX = 112.5, ethPY = 143;
    app(ethG, mk('rect', { x: ethPX - 10, y: ethPY - 15, width: 2 * ethPS + 20, height: ethPS + 25, rx: '2', fill: 'none', stroke: 'rgba(255,255,255,0.2)', 'stroke-width': '0.6' }));
    var ethPositions = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];
    ethPositions.forEach(function(ep) {
      var epx = ethPX + ep[0] * ethPS, epy = ethPY + (ep[1] === 1 ? ethPS - 3 : 0);
      app(ethG, mk('circle', { cx: epx, cy: epy, r: '5', fill: '#c8a040', stroke: '#9a7c20', 'stroke-width': '1' }));
      app(ethG, mk('circle', { cx: epx, cy: epy, r: '2.5', fill: '#0a1a0a' }));
    });
    app(ethG, txt('ETH', { fill: 'rgba(180,230,180,0.55)', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: ethPX + ethPS, y: ethPY - 7 }));
    
    // TPD3S014 USB Power Switch
    var tpdG = app(svg, mk('g', { 'class': 'board-chip', 'data-id': 'TPD3S014' }));
    var tpdX = 68, tpdY = 170, tpdW = 32, tpdH = 20;
    for (i = 0; i < 3; i++) {
      var tpx = tpdX + 6 + i * 10;
      app(tpdG, mk('rect', { x: tpx - 1.5, y: tpdY - 4, width: '3', height: '5', rx: '0.3', fill: 'url(#t41SilvG)' }));
      app(tpdG, mk('rect', { x: tpx - 1.5, y: tpdY + tpdH - 1, width: '3', height: '5', rx: '0.3', fill: 'url(#t41SilvG)' }));
    }
    app(tpdG, mk('rect', { x: tpdX, y: tpdY, width: tpdW, height: tpdH, rx: '1.5', fill: 'url(#t41ChipG)', stroke: '#1a2a1a', 'stroke-width': '0.8', 'class': 'chip-shape' }));
    app(tpdG, mk('circle', { cx: tpdX + 4, cy: tpdY + 4, r: '1.2', fill: '#1a2a1a' }));
    app(tpdG, txt('TPD3S014', { fill: 'rgba(255,255,255,0.45)', 'font-family': 'monospace', 'font-size': '5', 'text-anchor': 'middle', x: tpdX + tpdW / 2, y: tpdY + tpdH / 2 + 2 }));
    
    // DP83825I Ethernet PHY — QFN-32
    var dpG = app(svg, mk('g', { 'class': 'board-chip', 'data-id': 'DP83825I' }));
    var dpX = 132, dpY = 188, dpW = 32, dpH = 32;
    var dpPad = 3, dpPitch = 4, dpPads = 8;
    var dpOff = (dpW - (dpPads - 1) * dpPitch) / 2;
    
    app(dpG, mk('rect', { x: dpX + 7, y: dpY + 7, width: dpW - 14, height: dpH - 14, rx: '1', fill: '#2a2a2a', stroke: '#3a3a3a', 'stroke-width': '0.6' }));
    app(dpG, mk('rect', { x: dpX, y: dpY, width: dpW, height: dpH, rx: '2', fill: 'url(#t41ChipG)', stroke: '#2a3a2a', 'stroke-width': '1.2', 'class': 'chip-shape' }));
    app(dpG, mk('rect', { x: dpX + 3, y: dpY + 3, width: dpW - 6, height: dpH - 6, rx: '1.5', fill: 'none', stroke: '#252525', 'stroke-width': '0.5', 'stroke-dasharray': '2,2' }));
    app(dpG, mk('circle', { cx: dpX + 5, cy: dpY + 5, r: '1.8', fill: '#c8d8e8' }));
    
    for (i = 0; i < dpPads; i++) {
      var dpy = dpY + dpOff + i * dpPitch;
      app(dpG, mk('rect', { x: dpX - 4, y: dpy - dpPad / 2, width: '4', height: dpPad, rx: '0.3', fill: 'url(#t41SilvG)', stroke: '#bbb', 'stroke-width': '0.35' }));
      app(dpG, mk('rect', { x: dpX + dpW, y: dpy - dpPad / 2, width: '4', height: dpPad, rx: '0.3', fill: 'url(#t41SilvG)', stroke: '#bbb', 'stroke-width': '0.35' }));
    }
    for (i = 0; i < dpPads; i++) {
      var dpx = dpX + dpOff + i * dpPitch;
      app(dpG, mk('rect', { x: dpx - dpPad / 2, y: dpY - 4, width: dpPad, height: '4', rx: '0.3', fill: 'url(#t41SilvG)', stroke: '#bbb', 'stroke-width': '0.35' }));
      app(dpG, mk('rect', { x: dpx - dpPad / 2, y: dpY + dpH, width: dpPad, height: '4', rx: '0.3', fill: 'url(#t41SilvG)', stroke: '#bbb', 'stroke-width': '0.35' }));
    }
    app(dpG, txt('DP83825I', { fill: 'rgba(255,255,255,0.85)', 'font-family': 'monospace', 'font-size': '5', 'font-weight': 'bold', 'text-anchor': 'middle', x: dpX + dpW / 2, y: dpY + dpH / 2 - 3 }));
    app(dpG, txt('ETH PHY', { fill: 'rgba(100,220,100,0.50)', 'font-family': 'monospace', 'font-size': '4', 'text-anchor': 'middle', x: dpX + dpW / 2, y: dpY + dpH / 2 + 5 }));
    
    // Main processor: iMXRT1062 — centred on board
    var cpuG = app(svg, mk('g', { 'class': 'board-chip', 'data-id': 'iMXRT1062' }));
    var chipW = 140, chipH = 128;
    var chipX = Math.round((220 - chipW) / 2), chipY = Math.round((600 - chipH) / 2);
    app(cpuG, mk('rect', { x: chipX, y: chipY, width: chipW, height: chipH, rx: '5', fill: 'url(#t41ChipG)', stroke: '#1a2a1a', 'stroke-width': '2', 'class': 'chip-shape' }));
    app(cpuG, mk('rect', { x: chipX + 4, y: chipY + 4, width: chipW - 8, height: chipH - 8, rx: '3', fill: 'none', stroke: '#1a1a1a', 'stroke-width': '1', 'stroke-dasharray': '4,4' }));
    app(cpuG, mk('circle', { cx: chipX + 9, cy: chipY + 9, r: '3.5', fill: '#1a3a1a' }));
    app(cpuG, txt('iMXRT1062', { fill: 'rgba(255,255,255,0.88)', 'font-family': 'monospace', 'font-size': '11', 'font-weight': 'bold', 'text-anchor': 'middle', x: chipX + chipW / 2, y: chipY + chipH / 2 - 18 }));
    app(cpuG, txt('600 MHz Cortex-M7', { fill: 'rgba(100,220,100,0.65)', 'font-family': 'monospace', 'font-size': '7', 'text-anchor': 'middle', x: chipX + chipW / 2, y: chipY + chipH / 2 + 10 }));
    app(cpuG, txt('PJRC Teensy 4.1', { fill: 'rgba(255,255,255,0.20)', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: chipX + chipW / 2, y: chipY + chipH / 2 + 23 }));
    
    // Crystal Oscillator (SMD Metal Can)
    var oscX = 139, oscY = 375, oscW = 24, oscH = 18;
    app(svg, mk('rect', { x: oscX, y: oscY, width: oscW, height: oscH, rx: '3', fill: 'url(#t41SilvG)', stroke: '#888', 'stroke-width': '1' }));
    app(svg, mk('rect', { x: oscX + 2, y: oscY + 2, width: oscW - 4, height: oscH - 4, rx: '2', fill: 'none', stroke: 'rgba(0,0,0,0.1)', 'stroke-width': '0.5' }));
    app(svg, txt('OSC', { fill: 'rgba(0,0,0,0.4)', 'font-family': 'monospace', 'font-size': '5', 'text-anchor': 'middle', x: oscX + oscW / 2, y: oscY + oscH / 2 + 2 }));
    
    // W25Q128 Flash
    var flashG = app(svg, mk('g', { 'class': 'board-chip', 'data-id': 'W25Q128' }));
    var flashW = 38, flashH = 36;
    var flashX = 54, flashY = chipY + chipH + 20;
    app(flashG, mk('rect', { x: flashX, y: flashY, width: flashW, height: flashH, rx: '3', fill: 'url(#t41ChipG)', stroke: '#1a2a1a', 'stroke-width': '1.5', 'class': 'chip-shape' }));
    app(flashG, mk('rect', { x: flashX + 3, y: flashY + 3, width: flashW - 6, height: flashH - 6, rx: '2', fill: 'none', stroke: '#1a1a1a', 'stroke-width': '0.8', 'stroke-dasharray': '3,3' }));
    app(flashG, mk('circle', { cx: flashX + 6, cy: flashY + 6, r: '2', fill: '#1a2a1a' }));
    app(flashG, txt('W25Q128', { fill: 'rgba(255,255,255,0.70)', 'font-family': 'monospace', 'font-size': '5', 'font-weight': 'bold', 'text-anchor': 'middle', x: flashX + flashW / 2, y: flashY + 16 }));
    app(flashG, txt('16MB', { fill: 'rgba(255,255,255,0.40)', 'font-family': 'monospace', 'font-size': '5', 'text-anchor': 'middle', x: flashX + flashW / 2, y: flashY + 26 }));
    
    // Reset Switch
    var swG = app(svg, mk('g', { 'class': 'board-switch', 'data-id': 'RESET' }));
    var swW = 30, swH = 44, swX = 95, swY = flashY + 14;
    app(swG, mk('rect', { x: swX, y: swY, width: swW, height: swH, rx: '2', fill: 'url(#t41SilvG)', stroke: '#666', 'stroke-width': '1.5', 'class': 'chip-shape' }));
    app(swG, mk('rect', { x: swX + 4, y: swY + 6, width: swW - 8, height: swH - 12, rx: '2', fill: '#1a1a1a', stroke: '#555', 'stroke-width': '0.8' }));
    app(swG, mk('circle', { cx: swX + swW / 2, cy: swY + swH / 2, r: '8', fill: '#e0e0e0', stroke: '#666', 'stroke-width': '1' }));
    app(swG, txt('RESET', { fill: 'rgba(255,255,255,0.7)', 'font-family': 'monospace', 'font-size': '5', 'text-anchor': 'middle', x: swX + swW / 2, y: swY - 6 }));
    
    // MicroSD slot
    var sdW = 140, sdH = 114, sdX = Math.round((220 - sdW) / 2), sdY = 600 - sdH;
    app(svg, mk('rect', { x: sdX, y: sdY, width: sdW, height: sdH, rx: '3', fill: '#f5f5f5', stroke: '#ccc', 'stroke-width': '1.2' }));
    app(svg, mk('rect', { x: sdX + 2, y: sdY + 2, width: sdW - 4, height: '8', rx: '3', fill: 'rgba(255,255,255,0.90)' }));
    app(svg, mk('rect', { x: sdX + 8, y: sdY + 14, width: sdW - 16, height: sdH - 24, rx: '2', fill: '#ececec', stroke: '#ddd', 'stroke-width': '0.8' }));
    app(svg, mk('rect', { x: sdX + 15, y: sdY + sdH - 8, width: sdW - 30, height: '6', rx: '1', fill: '#1a1a1a' }));
    app(svg, mk('rect', { x: sdX + 15, y: sdY + sdH - 22, width: sdW - 30, height: '20', rx: '1', fill: '#111' }));
    for (var si = 0; si < 8; si++) {
      var scx = sdX + 24 + si * ((sdW - 48) / 7);
      app(svg, mk('rect', { x: scx - 4, y: sdY + sdH - 20, width: '8', height: '16', rx: '0.5', fill: '#d4a820', stroke: '#b08010', 'stroke-width': '0.5' }));
      app(svg, mk('rect', { x: scx - 3, y: sdY + sdH - 19, width: '4', height: '4', rx: '0.3', fill: 'rgba(255,235,120,0.7)' }));
    }
    app(svg, txt('microSD', { fill: 'rgba(0,0,0,0.25)', 'font-family': 'monospace', 'font-size': '9', 'text-anchor': 'middle', x: sdX + sdW / 2, y: sdH / 2 + sdY - 5 }));
    
    // Status LED
    app(svg, mk('rect', { x: 104, y: 378, width: 12, height: 6, rx: 1, fill: '#ffaa00', stroke: '#cc8800', 'stroke-width': '0.6' }));
    app(svg, txt('STAT', { fill: 'rgba(255,160,0,0.5)', 'font-family': 'monospace', 'font-size': '4', 'text-anchor': 'middle', x: 110, y: 376 }));
    
    // Silk text
    app(svg, txt('TEENSY 4.1', { fill: 'rgba(140,230,140,0.22)', 'font-family': 'Georgia,serif', 'font-size': '14', 'font-style': 'italic', 'font-weight': 'bold', 'text-anchor': 'middle', x: '110', y: 500 }));
    app(svg, txt('PJRC.COM', { fill: 'rgba(100,200,100,0.12)', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: '110', y: 514 }));
    
    // Expansion Header (1×5 horizontal)
    var expG = app(svg, mk('g', { 'class': 'board-connector', 'data-id': 'EXP_HDR' }));
    var ehX = 110, ehY = 460, ehS = 31.25;
    app(expG, mk('rect', { x: ehX - 2 * ehS - 10, y: ehY - 14, width: 4 * ehS + 20, height: 28, rx: 2, fill: 'none', stroke: 'rgba(255,255,255,0.2)', 'stroke-width': '0.6' }));
    app(expG, txt('EXPANSION', { fill: 'rgba(180,230,180,0.55)', 'font-family': 'monospace', 'font-size': '6', 'text-anchor': 'middle', x: ehX, y: ehY - 18 }));
    for (var j = -2; j <= 2; j++) {
      var epx = ehX + j * ehS;
      app(expG, mk('circle', { cx: epx, cy: ehY, r: '5', fill: '#c8a040', stroke: '#9a7c20', 'stroke-width': '1' }));
      app(expG, mk('circle', { cx: epx, cy: ehY, r: '2.5', fill: '#0a1a0a' }));
    }
    
    // Left + right header strips (empty areas where pins will be)
    app(svg, mk('rect', { x: '0', y: '0', width: '20', height: '600', rx: '0', fill: '#061006', stroke: 'none' }));
    app(svg, mk('rect', { x: '200', y: '0', width: '20', height: '600', rx: '0', fill: '#061006', stroke: 'none' }));
    
    // Now draw the actual pins from config
    drawHeaderPins(svg, config);
  }
  
  // Draw header pins from config data
  function drawHeaderPins(svg, config) {
    var pins = config.pins;
    var leftX = 10, rightX = 210;
    var startY = 10, spacing = 25;
    
    function getPinColor(type) {
      var colors = {
        GPIO: { c: '#4da6ff', bg: 'rgba(77,166,255,0.10)' },
        PWM: { c: '#50c8a0', bg: 'rgba(80,200,160,0.12)' },
        ADC: { c: '#d4a017', bg: 'rgba(212,160,23,0.12)' },
        SPI: { c: '#4a90d9', bg: 'rgba(74,144,217,0.12)' },
        I2C: { c: '#9898cc', bg: 'rgba(152,152,204,0.12)' },
        UART: { c: '#c06080', bg: 'rgba(192,96,128,0.12)' },
        CAN: { c: '#e87040', bg: 'rgba(232,112,64,0.12)' },
        PWR: { c: '#ff6b6b', bg: 'rgba(255,107,107,0.14)' },
        GND: { c: '#9e9e9e', bg: 'rgba(158,158,158,0.12)' }
      };
      return colors[type] || colors.GPIO;
    }
    
    var leftPins = pins.filter(function(p) { return p.position && p.position.side === 'left'; });
    var rightPins = pins.filter(function(p) { return p.position && p.position.side === 'right'; });
    
    leftPins.sort(function(a, b) { return a.position.order - b.position.order; });
    rightPins.sort(function(a, b) { return a.position.order - b.position.order; });
    
    leftPins.forEach(function(pin, idx) {
      var y = startY + idx * spacing;
      var col = getPinColor(pin.type);
      var g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'board-pin');
      g.setAttribute('data-id', pin.id);
      g.style.cursor = 'pointer';
      
      var bg = document.createElementNS(NS, 'rect');
      bg.setAttribute('x', leftX - 12);
      bg.setAttribute('y', y - 12);
      bg.setAttribute('width', '24');
      bg.setAttribute('height', '24');
      bg.setAttribute('rx', '4');
      bg.setAttribute('fill', 'rgba(100,200,100,0.08)');
      g.appendChild(bg);
      
      var pad = document.createElementNS(NS, 'rect');
      pad.setAttribute('x', leftX - 10);
      pad.setAttribute('y', y - 10);
      pad.setAttribute('width', '20');
      pad.setAttribute('height', '20');
      pad.setAttribute('rx', '3');
      pad.setAttribute('fill', col.bg);
      pad.setAttribute('stroke', col.c);
      pad.setAttribute('stroke-width', '1.5');
      pad.setAttribute('class', 'pin-sq');
      g.appendChild(pad);
      
      var hole = document.createElementNS(NS, 'circle');
      hole.setAttribute('cx', leftX);
      hole.setAttribute('cy', y);
      hole.setAttribute('r', '3.5');
      hole.setAttribute('fill', '#040e04');
      g.appendChild(hole);
      
      var label = document.createElementNS(NS, 'text');
      label.setAttribute('x', leftX + 13);
      label.setAttribute('y', y + 4);
      label.setAttribute('fill', 'rgba(255,255,255,0.80)');
      label.setAttribute('font-size', '8');
      label.setAttribute('font-family', 'monospace');
      label.textContent = pin.lbl;
      g.appendChild(label);
      
      svg.appendChild(g);
    });
    
    rightPins.forEach(function(pin, idx) {
      var y = startY + idx * spacing;
      var col = getPinColor(pin.type);
      var g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'board-pin');
      g.setAttribute('data-id', pin.id);
      g.style.cursor = 'pointer';
      
      var bg = document.createElementNS(NS, 'rect');
      bg.setAttribute('x', rightX - 12);
      bg.setAttribute('y', y - 12);
      bg.setAttribute('width', '24');
      bg.setAttribute('height', '24');
      bg.setAttribute('rx', '4');
      bg.setAttribute('fill', 'rgba(100,200,100,0.08)');
      g.appendChild(bg);
      
      var pad = document.createElementNS(NS, 'rect');
      pad.setAttribute('x', rightX - 10);
      pad.setAttribute('y', y - 10);
      pad.setAttribute('width', '20');
      pad.setAttribute('height', '20');
      pad.setAttribute('rx', '3');
      pad.setAttribute('fill', col.bg);
      pad.setAttribute('stroke', col.c);
      pad.setAttribute('stroke-width', '1.5');
      pad.setAttribute('class', 'pin-sq');
      g.appendChild(pad);
      
      var hole = document.createElementNS(NS, 'circle');
      hole.setAttribute('cx', rightX);
      hole.setAttribute('cy', y);
      hole.setAttribute('r', '3.5');
      hole.setAttribute('fill', '#040e04');
      g.appendChild(hole);
      
      var label = document.createElementNS(NS, 'text');
      label.setAttribute('x', rightX - 13);
      label.setAttribute('y', y + 4);
      label.setAttribute('fill', 'rgba(255,255,255,0.80)');
      label.setAttribute('font-size', '8');
      label.setAttribute('font-family', 'monospace');
      label.setAttribute('text-anchor', 'end');
      label.textContent = pin.lbl;
      g.appendChild(label);
      
      svg.appendChild(g);
    });
  }
  
  function drawRaspberryPi3(svg, config) {
    drawGenericBoard(svg, config);
  }
  
  function drawArduinoNano(svg, config) {
    drawGenericBoard(svg, config);
  }
  
  function drawGenericBoard(svg, config) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    
    svg.setAttribute('viewBox', '0 0 400 600');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    var rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', '400');
    rect.setAttribute('height', '600');
    rect.setAttribute('fill', '#1a2a1a');
    rect.setAttribute('stroke', '#2a3a2a');
    rect.setAttribute('stroke-width', '2');
    svg.appendChild(rect);
    
    var pins = config.pins;
    var leftX = 20, rightX = 380, startY = 50, stepY = 25;
    
    pins.forEach(function(pin, i) {
      var isLeft = (pin.position && pin.position.side === 'left') || (pin.side === 'left');
      var x = isLeft ? leftX : rightX;
      var y = startY + i * stepY;
      
      function getPinColor(type) {
        var colors = {
          GPIO: '#4da6ff', PWM: '#50c8a0', ADC: '#d4a017',
          SPI: '#4a90d9', I2C: '#9898cc', UART: '#c06080',
          PWR: '#ff6b6b', GND: '#9e9e9e'
        };
        return colors[type] || '#4da6ff';
      }
      
      var col = getPinColor(pin.type);
      var g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'board-pin');
      g.setAttribute('data-id', pin.id);
      g.style.cursor = 'pointer';
      
      var pad = document.createElementNS(NS, 'rect');
      pad.setAttribute('x', x - 10);
      pad.setAttribute('y', y - 8);
      pad.setAttribute('width', '20');
      pad.setAttribute('height', '16');
      pad.setAttribute('rx', '3');
      pad.setAttribute('fill', col + '22');
      pad.setAttribute('stroke', col);
      pad.setAttribute('stroke-width', '1.5');
      pad.setAttribute('class', 'pin-sq');
      g.appendChild(pad);
      
      var label = document.createElementNS(NS, 'text');
      label.setAttribute('x', x);
      label.setAttribute('y', y + 3);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('fill', col);
      label.setAttribute('font-size', '10');
      label.setAttribute('font-family', 'monospace');
      label.textContent = pin.lbl;
      g.appendChild(label);
      
      svg.appendChild(g);
    });
  }
  
  function attachPinInteractivity(svg, config) {
    var pins = document.querySelectorAll('.board-pin');
    pins.forEach(function(el) {
      var pinId = el.getAttribute('data-id');
      var pin = config.pins ? config.pins.find(function(p) { return p.id === pinId; }) : null;
      
      if (pin) {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          if (window.ICExplorer && window.ICExplorer.selectPin) {
            window.ICExplorer.selectPin(pinId);
          }
        });
      }
    });
    
    var chips = document.querySelectorAll('.board-chip, .board-connector, .board-switch');
    chips.forEach(function(el) {
      var chipId = el.getAttribute('data-id');
      var chip = config.chips ? config.chips.find(function(c) { return c.id === chipId; }) : null;
      
      if (chip) {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          if (window.ICExplorer && window.ICExplorer.selectComponent) {
            window.ICExplorer.selectComponent(chipId);
          }
        });
      }
    });
  }
  
  return { draw: draw };
})();

window.CustomBoardRenderer = CustomBoardRenderer;