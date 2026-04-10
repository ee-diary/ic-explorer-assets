/**
 * QFN Renderer — Draws QFN packages with uneven pin distribution across 4 sides.
 *
 * Designed for chips like the nRF52840 (QFN-73) where pinCount is not evenly
 * divisible by 4. Pin counts per side are driven by qfnConfig.sides[] in the
 * chip config, e.g.:
 *
 *   qfnConfig: {
 *     sides:     [19, 19, 18, 17],   // [LEFT, BOTTOM, RIGHT, TOP]
 *     bodySize:  480,
 *     pinLength: 30,
 *     pinWidth:  18,
 *     pinGap:    2,
 *   }
 *
 * If qfnConfig.sides is omitted the renderer falls back to equal distribution
 * (same behaviour as QFPRenderer) so existing chips continue to work if routed
 * here.
 *
 * Pin ordering in config.pins[] must match:
 *   pins[0 .. sides[0]-1]                          → LEFT   (top → bottom)
 *   pins[sides[0] .. sides[0]+sides[1]-1]           → BOTTOM (left → right)
 *   pins[sides[0]+sides[1] .. sum(sides,3)-1]        → RIGHT  (bottom → top)
 *   pins[sum(sides,3) .. total-1]                   → TOP    (right → left)
 *
 * Interface (matches QFPRenderer and DIPRenderer):
 *   draw(svg, config)
 *   updatePins(selectedId, filterType, filterFn)
 */

window.QFNRenderer = {
  currentSvg:    null,
  currentConfig: null,

  // ── Public: draw ────────────────────────────────────────────────────────
  draw: function(svg, config) {
    this.currentSvg    = svg;
    this.currentConfig = config;

    var qfn   = config.qfnConfig || {};
    var pins  = config.pins || [];
    var total = pins.length;

    var bodySize  = qfn.bodySize  || 400;
    var pinLength = qfn.pinLength || 28;
    var pinWidth  = qfn.pinWidth  || 20;
    var pinGap    = qfn.pinGap    || 2;
    var offset    = qfn.pinOffset || 10;

    // Resolve per-side counts
    // If qfnConfig.sides is provided use it; otherwise split evenly.
    var sides;
    if (qfn.sides && qfn.sides.length === 4) {
      sides = qfn.sides;
    } else {
      var pps  = qfn.pinsPerSide || Math.ceil(total / 4);
      sides = [pps, pps, pps, pps];
    }

    // ── SVG viewport ───────────────────────────────────────────────────
    var totalSize = bodySize + pinLength * 2 + 80;
    var half      = bodySize / 2;
    svg.setAttribute('viewBox',
      (-totalSize / 2) + ' ' + (-totalSize / 2) + ' ' + totalSize + ' ' + totalSize);
    svg.setAttribute('width',  '100%');
    svg.setAttribute('height', '100%');

    // Clear
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // ── Defs — glow filter ─────────────────────────────────────────────
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
    var mergeOrig = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    var mergeSrc  = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mergeOrig.setAttribute('in', 'blur');
    mergeSrc.setAttribute('in',  'SourceGraphic');
    feMerge.appendChild(mergeOrig);
    feMerge.appendChild(mergeSrc);
    filter.appendChild(feBlur);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // ── Main group ─────────────────────────────────────────────────────
    var mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(mainGroup);

    // ── IC body ────────────────────────────────────────────────────────
    var body = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    body.setAttribute('x',            -half);
    body.setAttribute('y',            -half);
    body.setAttribute('width',         bodySize);
    body.setAttribute('height',        bodySize);
    body.setAttribute('rx',            '8');
    body.setAttribute('ry',            '8');
    body.setAttribute('fill',         '#171B26');
    body.setAttribute('stroke',       '#2A2F3E');
    body.setAttribute('stroke-width', '2');
    mainGroup.appendChild(body);

    // Pin-1 indicator dot (top-left corner of body)
    var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx',   -half + 16);
    dot.setAttribute('cy',   -half + 16);
    dot.setAttribute('r',    '6');
    dot.setAttribute('fill', '#ff6b6b');
    mainGroup.appendChild(dot);

    // ── Part name ──────────────────────────────────────────────────────
    var partText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    partText.setAttribute('x',           '0');
    partText.setAttribute('y',           '-20');
    partText.setAttribute('text-anchor', 'middle');
    partText.setAttribute('fill',        '#e0e5ec');
    partText.setAttribute('font-size',   '22');
    partText.setAttribute('font-weight', 'bold');
    partText.setAttribute('font-family', 'monospace');
    partText.textContent = config.partName || 'IC';
    mainGroup.appendChild(partText);

    // ── Package label ──────────────────────────────────────────────────
    var pkgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    pkgText.setAttribute('x',           '0');
    pkgText.setAttribute('y',           '30');
    pkgText.setAttribute('text-anchor', 'middle');
    pkgText.setAttribute('fill',        '#a8a8a8');
    pkgText.setAttribute('font-size',   '12');
    pkgText.setAttribute('font-family', 'monospace');
    pkgText.textContent = config.package || '';
    mainGroup.appendChild(pkgText);

    // Manufacturer label
    var mfrText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    mfrText.setAttribute('x',           '0');
    mfrText.setAttribute('y',           '52');
    mfrText.setAttribute('text-anchor', 'middle');
    mfrText.setAttribute('fill',        '#5a6070');
    mfrText.setAttribute('font-size',   '11');
    mfrText.setAttribute('font-family', 'monospace');
    mfrText.textContent = config.manufacturer || '';
    mainGroup.appendChild(mfrText);

    // ── Build pin position table ───────────────────────────────────────
    // Returns array of {side, cx, cy} for each logical pin slot.
    // Pins are evenly spaced within each side using the available body
    // length minus the edge offset on each end.
    var pinPositions = this._buildPositions(sides, bodySize, pinWidth, offset);

    // ── Draw each pin ──────────────────────────────────────────────────
    for (var i = 0; i < pinPositions.length && i < pins.length; i++) {
      var pos  = pinPositions[i];
      var pin  = pins[i];
      var col  = this._getColor(pin.type);
      var side = pos.side;

      // Compute rect geometry per side
      var rw, rh, rx, ry;
      if (side === 'left') {
        rw = pinLength;    rh = pinWidth - pinGap;
        rx = -half - pinLength;
        ry = pos.cy - rh / 2;
      } else if (side === 'right') {
        rw = pinLength;    rh = pinWidth - pinGap;
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

      // ── <g class="ic-pin" data-id="..."> ────────────────────────────
      var pinGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      pinGroup.setAttribute('class',   'ic-pin');
      pinGroup.setAttribute('data-id', pin.id);
      pinGroup.style.cursor = 'pointer';

      // ── <rect class="pin-sq"> — engine reads & styles this ───────────
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

      // ── Pin number (outside the body) ─────────────────────────────
      var numText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      numText.setAttribute('fill',        col);
      numText.setAttribute('font-size',   '9');
      numText.setAttribute('font-family', 'monospace');
      numText.setAttribute('font-weight', 'bold');
      numText.textContent = pin.num;

      if (side === 'left') {
        numText.setAttribute('x',            rx - 3);
        numText.setAttribute('y',            pos.cy + 3);
        numText.setAttribute('text-anchor',  'end');
      } else if (side === 'right') {
        numText.setAttribute('x',            rx + rw + 3);
        numText.setAttribute('y',            pos.cy + 3);
        numText.setAttribute('text-anchor',  'start');
      } else if (side === 'bottom') {
        numText.setAttribute('x',            pos.cx);
        numText.setAttribute('y',            ry + rh + 11);
        numText.setAttribute('text-anchor',  'middle');
      } else { // top
        numText.setAttribute('x',            pos.cx);
        numText.setAttribute('y',            ry - 3);
        numText.setAttribute('text-anchor',  'middle');
      }
      pinGroup.appendChild(numText);

      // ── Pin label (inside body edge) ───────────────────────────────
      if (pin.lbl) {
        var lblText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lblText.setAttribute('fill',        col);
        lblText.setAttribute('font-size',   '8');
        lblText.setAttribute('font-family', 'monospace');
        lblText.textContent = pin.lbl;

        if (side === 'left') {
          lblText.setAttribute('x',           -half + 5);
          lblText.setAttribute('y',            pos.cy + 3);
          lblText.setAttribute('text-anchor',  'start');
        } else if (side === 'right') {
          lblText.setAttribute('x',            half - 5);
          lblText.setAttribute('y',            pos.cy + 3);
          lblText.setAttribute('text-anchor',  'end');
        } else if (side === 'bottom') {
          // Rotated label for bottom pins — reads upward from body edge
          var bx = pos.cx;
          var by = half - 5;
          lblText.setAttribute('x',           bx);
          lblText.setAttribute('y',           by);
          lblText.setAttribute('text-anchor', 'end');
          lblText.setAttribute('transform',   'rotate(-90,' + bx + ',' + by + ')');
        } else { // top
          // Rotated label for top pins — reads downward from body edge
          var tx = pos.cx;
          var ty = -half + 5;
          lblText.setAttribute('x',           tx);
          lblText.setAttribute('y',           ty);
          lblText.setAttribute('text-anchor', 'start');
          lblText.setAttribute('transform',   'rotate(-90,' + tx + ',' + ty + ')');
        }
        pinGroup.appendChild(lblText);
      }

      mainGroup.appendChild(pinGroup);
    }
  },

  // ── updatePins ──────────────────────────────────────────────────────────
  // Engine drives all highlighting via updateBoardHighlight() — nothing needed.
  updatePins: function(selectedId, filterType, filterFn) {},

  // ── _buildPositions ─────────────────────────────────────────────────────
  // Returns [{side, cx, cy}] for each pin slot in L→B→R→T order.
  // Each side is independently spaced across the available body length.
  _buildPositions: function(sides, bodySize, pinWidth, offset) {
    var half      = bodySize / 2;
    var positions = [];

    var sideNames = ['left', 'bottom', 'right', 'top'];

    for (var s = 0; s < 4; s++) {
      var count   = sides[s];
      var name    = sideNames[s];
      // Available span along this side (same formula as QFPRenderer)
      var usable  = bodySize - (offset * 2) - pinWidth;
      var spacing = count > 1 ? usable / (count - 1) : 0;

      for (var i = 0; i < count; i++) {
        var t = -half + offset + (pinWidth / 2) + i * spacing;

        if (name === 'left') {
          // top → bottom: t is Y
          positions.push({ side: 'left',   cx: -half, cy: t });
        } else if (name === 'bottom') {
          // left → right: t is X
          positions.push({ side: 'bottom', cx: t,     cy: half });
        } else if (name === 'right') {
          // bottom → top: invert — start from bottom
          var y = half - offset - (pinWidth / 2) - i * spacing;
          positions.push({ side: 'right',  cx: half,  cy: y });
        } else { // top
          // right → left: invert — start from right
          var x = half - offset - (pinWidth / 2) - i * spacing;
          positions.push({ side: 'top',    cx: x,     cy: -half });
        }
      }
    }

    return positions;
  },

  // ── _getColor ────────────────────────────────────────────────────────────
  // Checks customTypes in the active config first, then falls back to the
  // standard palette (identical mapping to QFPRenderer).
  _getColor: function(type) {
    if (this.currentConfig &&
        this.currentConfig.customTypes &&
        this.currentConfig.customTypes[type]) {
      return this.currentConfig.customTypes[type].c;
    }
    var map = {
      GPIO:     '#78c878', PWR:      '#ff6b6b', GND:      '#a8a8a8',
      ADC:      '#c8a850', SPI:      '#4a9aee', I2C:      '#9898d8',
      UART:     '#cc6888', PWM:      '#50c8c8', XTAL:     '#7090a8',
      RESET:    '#ff9944', TIMER:    '#50c8c8', INT:      '#c8a850',
      USB:      '#a78bfa', CAN:      '#ff9944', JTAG:     '#c8a850',
      BOOT:     '#50c8c8', COMP:     '#ff9944',
      // Extra types used by existing configs
      AUX:      '#50c8c8', CLK:      '#7090a8',
      CPOUT:    '#c078ff', RESERVED: '#555968',
    };
    return map[type] || '#78c878';
  }
};
