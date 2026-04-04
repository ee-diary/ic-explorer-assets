/**
 * QFP/TQFP/LQFP/QFN Renderer - Draws 4-sided surface mount packages
 * Structured for ic-explorer-base.js compatibility:
 *   - Each pin is a <g class="ic-pin" data-id="...">
 *   - Inner rect has class="pin-sq" (engine styles this directly)
 *   - No custom click/hover handlers (engine wires these up)
 */

window.QFPRenderer = {
  currentSvg: null,
  currentConfig: null,

  draw: function(svg, config) {
    this.currentSvg = svg;
    this.currentConfig = config;

    var qfp = config.qfpConfig || {};
    var pins = config.pins || [];

    var pinsPerSide = qfp.pinsPerSide || Math.ceil(config.pinCount / 4);
    var bodySize    = qfp.bodySize    || 400;
    var pinLength   = qfp.pinLength   || 28;
    var pinWidth    = qfp.pinWidth    || 20;
    var pinGap      = qfp.pinGap      || 2;
    var offset      = qfp.pinOffset   || 10;

    // Evenly space pins across each side
    var usable  = bodySize - (offset * 2) - pinWidth;
    var spacing = pinsPerSide > 1 ? usable / (pinsPerSide - 1) : 0;

    // SVG viewport
    var totalSize = bodySize + pinLength * 2 + 80;
    svg.setAttribute('viewBox',
      (-totalSize / 2) + ' ' + (-totalSize / 2) + ' ' + totalSize + ' ' + totalSize);
    svg.setAttribute('width',  '100%');
    svg.setAttribute('height', '100%');

    // Clear
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // ── Defs (glow filter) ────────────────────────────────────────────────
    var defs   = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'pinGlow');
    filter.setAttribute('x', '-50%'); filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%'); filter.setAttribute('height', '200%');

    var feBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feBlur.setAttribute('in', 'SourceAlpha');
    feBlur.setAttribute('stdDeviation', '3');
    feBlur.setAttribute('result', 'blur');

    var feMerge  = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    var feMerge1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    var feMerge2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMerge1.setAttribute('in', 'blur');
    feMerge2.setAttribute('in', 'SourceGraphic');
    feMerge.appendChild(feMerge1);
    feMerge.appendChild(feMerge2);

    filter.appendChild(feBlur);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // ── Main group ────────────────────────────────────────────────────────
    var mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(mainGroup);

    // ── IC body ───────────────────────────────────────────────────────────
    var body = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    body.setAttribute('x', -bodySize / 2);
    body.setAttribute('y', -bodySize / 2);
    body.setAttribute('width',  bodySize);
    body.setAttribute('height', bodySize);
    body.setAttribute('rx', '8'); body.setAttribute('ry', '8');
    body.setAttribute('fill',         '#171B26');
    body.setAttribute('stroke',       '#2A2F3E');
    body.setAttribute('stroke-width', '2');
    mainGroup.appendChild(body);

    // Pin-1 orientation dot
    var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', -bodySize / 2 + 15);
    dot.setAttribute('cy', -bodySize / 2 + 15);
    dot.setAttribute('r',  '6');
    dot.setAttribute('fill', '#ff6b6b');
    mainGroup.appendChild(dot);

    // ── Part name & package label ─────────────────────────────────────────
    var partText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    partText.setAttribute('x', '0'); partText.setAttribute('y', '-10');
    partText.setAttribute('text-anchor', 'middle');
    partText.setAttribute('fill', '#e0e5ec');
    partText.setAttribute('font-size', '20');
    partText.setAttribute('font-weight', 'bold');
    partText.setAttribute('font-family', 'monospace');
    partText.textContent = config.partName || 'IC';
    mainGroup.appendChild(partText);

    var pkgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    pkgText.setAttribute('x', '0'); pkgText.setAttribute('y', '24');
    pkgText.setAttribute('text-anchor', 'middle');
    pkgText.setAttribute('fill', '#a8a8a8');
    pkgText.setAttribute('font-size', '11');
    pkgText.setAttribute('font-family', 'monospace');
    pkgText.textContent = config.package || '';
    mainGroup.appendChild(pkgText);

    // ── Build pin position table ──────────────────────────────────────────
    // Counter-clockwise: LEFT → BOTTOM → RIGHT → TOP
    var pinPositions = [];
    var half = bodySize / 2;

// LEFT — top → bottom
for (var i = 0; i < pinsPerSide; i++) {
  var y = -half + offset + (pinWidth / 2) + i * spacing;
  pinPositions.push({ side: 'left', cx: -half, cy: y });
}
// BOTTOM — left → right
for (var i = 0; i < pinsPerSide; i++) {
  var x = -half + offset + (pinWidth / 2) + i * spacing;
  pinPositions.push({ side: 'bottom', cx: x, cy: half });
}
// RIGHT — bottom → top
for (var i = 0; i < pinsPerSide; i++) {
  var y = half - offset - (pinWidth / 2) - i * spacing;  // ← minus, not plus
  pinPositions.push({ side: 'right', cx: half, cy: y });
}
// TOP — right → left
for (var i = 0; i < pinsPerSide; i++) {
  var x = half - offset - (pinWidth / 2) - i * spacing;  // ← minus, not plus
  pinPositions.push({ side: 'top', cx: x, cy: -half });
}
    // ── Draw pins ─────────────────────────────────────────────────────────
    for (var i = 0; i < pinPositions.length && i < pins.length; i++) {
      var pos  = pinPositions[i];
      var pin  = pins[i];
      var col  = this.getPinColor(pin.type);
      var side = pos.side;

      // Rect dimensions vary by side
      var rw, rh, rx, ry;
      if (side === 'left') {
        rw = pinLength; rh = pinWidth - pinGap;
        rx = pos.cx - half - pinLength;   // extends left from body edge... 
        // actually position relative to body edge:
        rx = -half - pinLength;
        ry = pos.cy - rh / 2;
      } else if (side === 'right') {
        rw = pinLength; rh = pinWidth - pinGap;
        rx = half;
        ry = pos.cy - rh / 2;
      } else if (side === 'bottom') {
        rw = pinWidth - pinGap; rh = pinLength;
        rx = pos.cx - rw / 2;
        ry = half;
      } else { // top
        rw = pinWidth - pinGap; rh = pinLength;
        rx = pos.cx - rw / 2;
        ry = -half - pinLength;
      }

      // ── <g class="ic-pin" data-id="..."> ─────────────────────────────
      var pinGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      pinGroup.setAttribute('class',   'ic-pin');
      pinGroup.setAttribute('data-id', pin.id);
      pinGroup.style.cursor = 'pointer';

      // ── <rect class="pin-sq"> — engine reads and styles this ──────────
      var pinRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      pinRect.setAttribute('class',        'pin-sq');
      pinRect.setAttribute('x',            rx);
      pinRect.setAttribute('y',            ry);
      pinRect.setAttribute('width',        rw);
      pinRect.setAttribute('height',       rh);
      pinRect.setAttribute('rx',           '2');
      pinRect.setAttribute('ry',           '2');
      pinRect.setAttribute('fill',         'rgba(120,200,120,0.10)');
      pinRect.setAttribute('stroke',       col);
      pinRect.setAttribute('stroke-width', '1.5');

      pinGroup.appendChild(pinRect);

      // ── Pin number (outside body) ─────────────────────────────────────
      var numText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      numText.setAttribute('fill',        col);
      numText.setAttribute('font-size',   '10');
      numText.setAttribute('font-family', 'monospace');
      numText.setAttribute('font-weight', 'bold');
      numText.textContent = pin.num;

      if (side === 'left') {
        numText.setAttribute('x', rx - 4);
        numText.setAttribute('y', pos.cy + 4);
        numText.setAttribute('text-anchor', 'end');
      } else if (side === 'right') {
        numText.setAttribute('x', rx + rw + 4);
        numText.setAttribute('y', pos.cy + 4);
        numText.setAttribute('text-anchor', 'start');
      } else if (side === 'bottom') {
        numText.setAttribute('x', pos.cx);
        numText.setAttribute('y', ry + rh + 12);
        numText.setAttribute('text-anchor', 'middle');
      } else {
        numText.setAttribute('x', pos.cx);
        numText.setAttribute('y', ry - 4);
        numText.setAttribute('text-anchor', 'middle');
      }
      pinGroup.appendChild(numText);

      // ── Pin label (inside body edge) ──────────────────────────────────
      if (pin.lbl) {
        var lblText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lblText.setAttribute('fill',        col);
        lblText.setAttribute('font-size',   '9');
        lblText.setAttribute('font-family', 'monospace');
        lblText.textContent = pin.lbl;

        if (side === 'left') {
          lblText.setAttribute('x', -half + 5);
          lblText.setAttribute('y', pos.cy + 3);
          lblText.setAttribute('text-anchor', 'start');
        } else if (side === 'right') {
          lblText.setAttribute('x', half - 5);
          lblText.setAttribute('y', pos.cy + 3);
          lblText.setAttribute('text-anchor', 'end');
        } else if (side === 'bottom') {
          lblText.setAttribute('x', pos.cx);
          lblText.setAttribute('y', half - 6);
          lblText.setAttribute('text-anchor', 'middle');
        } else {
          lblText.setAttribute('x', pos.cx);
          lblText.setAttribute('y', -half + 12);
          lblText.setAttribute('text-anchor', 'middle');
        }
        pinGroup.appendChild(lblText);
      }

      mainGroup.appendChild(pinGroup);
    }
  },

  getPinColor: function(type) {
    // Check customTypes in config first
    if (this.currentConfig &&
        this.currentConfig.customTypes &&
        this.currentConfig.customTypes[type]) {
      return this.currentConfig.customTypes[type].c;
    }
    // Fall back to standard palette
    var map = {
      GPIO:  '#78c878', PWR:   '#ff6b6b', GND:   '#a8a8a8',
      ADC:   '#c8a850', SPI:   '#4a9aee', I2C:   '#9898d8',
      UART:  '#cc6888', PWM:   '#50c8c8', XTAL:  '#7090a8',
      RESET: '#ff9944', TIMER: '#50c8c8', INT:   '#c8a850',
      USB:   '#a78bfa', CAN:   '#ff9944', JTAG:  '#c8a850',
      BOOT:  '#50c8c8', COMP:  '#ff9944',
      // MPU-6050 custom
      AUX:      '#50c8c8', CLK:  '#7090a8',
      CPOUT:    '#c078ff', RESERVED: '#555968',
    };
    return map[type] || '#78c878';
  },

  // updatePins is kept for any direct calls but the engine drives
  // highlighting via CSS classes on .ic-pin / .pin-sq directly.
  updatePins: function(selectedId, filterType, filterFn) {
    // Engine handles this via updateBoardHighlight() — nothing needed here.
  }
};
