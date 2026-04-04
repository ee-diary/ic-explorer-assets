/**
 * QFP/TQFP/LQFP/QFN Renderer - Draws 4-sided surface mount packages
 */

window.QFPRenderer = {
  currentSvg: null,
  currentConfig: null,
  currentPinElements: [],
  
  draw: function(svg, config) {
    var self = this;
    this.currentSvg = svg;
    this.currentConfig = config;
    
    var qfp = config.qfpConfig || {};
    var pins = config.pins || [];
    
    // Configuration with defaults
    var pinsPerSide = qfp.pinsPerSide || Math.ceil(config.pinCount / 4);
    var bodySize = qfp.bodySize || 400;
    var pinLength = qfp.pinLength || 28;
    var pinWidth = qfp.pinWidth || 20;
    var pinStartOffset = qfp.pinStartOffset !== undefined ? qfp.pinStartOffset : 20;
    var pinEndOffset = qfp.pinEndOffset !== undefined ? qfp.pinEndOffset : 20;
    
    // Calculate spacing
    var availableSpace = bodySize - (pinStartOffset + pinEndOffset);
    var spacing = availableSpace / (pinsPerSide - 1);
    
    // Setup SVG viewBox
    var totalWidth = bodySize + (pinLength * 2) + 100;
    var totalHeight = bodySize + (pinLength * 2) + 100;
    svg.setAttribute('viewBox', (-totalWidth/2) + ' ' + (-totalHeight/2) + ' ' + totalWidth + ' ' + totalHeight);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Add glow filter
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'pinGlow');
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');
    
    var blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('in', 'SourceAlpha');
    blur.setAttribute('stdDeviation', '3');
    blur.setAttribute('result', 'blur');
    
    var merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    var mergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mergeNode1.setAttribute('in', 'blur');
    var mergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mergeNode2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(mergeNode1);
    merge.appendChild(mergeNode2);
    
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    svg.appendChild(defs);
    
    // Main group
    var mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(mainGroup);
    
    // Draw IC body
    var body = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    body.setAttribute('x', -bodySize/2);
    body.setAttribute('y', -bodySize/2);
    body.setAttribute('width', bodySize);
    body.setAttribute('height', bodySize);
    body.setAttribute('rx', '8');
    body.setAttribute('ry', '8');
    body.setAttribute('fill', '#171B26');
    body.setAttribute('stroke', '#2A2F3E');
    body.setAttribute('stroke-width', '2');
    mainGroup.appendChild(body);
    
    // Orientation dot (pin 1 indicator)
    var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', -bodySize/2 + 15);
    dot.setAttribute('cy', -bodySize/2 + 15);
    dot.setAttribute('r', '6');
    dot.setAttribute('fill', '#ff6b6b');
    mainGroup.appendChild(dot);
    
    // Clear pin elements
    this.currentPinElements = [];
    
    // Calculate pin positions
    var pinPositions = [];
    
    // LEFT SIDE (top to bottom)
    for (var i = 0; i < pinsPerSide; i++) {
      var y = -bodySize/2 + pinStartOffset + (i * spacing);
      pinPositions.push({
        side: 'left',
        x: -bodySize/2 - pinLength,
        y: y,
        width: pinLength,
        height: pinWidth
      });
    }
    
    // BOTTOM SIDE (left to right)
    for (var i = 0; i < pinsPerSide; i++) {
      var x = -bodySize/2 + pinStartOffset + (i * spacing);
      pinPositions.push({
        side: 'bottom',
        x: x,
        y: bodySize/2,
        width: pinWidth,
        height: pinLength
      });
    }
    
    // RIGHT SIDE (bottom to top)
    for (var i = 0; i < pinsPerSide; i++) {
      var y = bodySize/2 - pinStartOffset - (i * spacing);
      pinPositions.push({
        side: 'right',
        x: bodySize/2,
        y: y,
        width: pinLength,
        height: pinWidth
      });
    }
    
    // TOP SIDE (right to left)
    for (var i = 0; i < pinsPerSide; i++) {
      var x = bodySize/2 - pinStartOffset - (i * spacing);
      pinPositions.push({
        side: 'top',
        x: x,
        y: -bodySize/2 - pinLength,
        width: pinWidth,
        height: pinLength
      });
    }
    
    // Draw each pin
    for (var i = 0; i < pinPositions.length && i < pins.length; i++) {
      var pos = pinPositions[i];
      var pin = pins[i];
      var pinColor = this.getPinColor(pin.type);
      
      var pinRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      
      if (pos.side === 'left') {
        pinRect.setAttribute('x', pos.x);
        pinRect.setAttribute('y', pos.y - pos.height/2);
        pinRect.setAttribute('width', pos.width);
        pinRect.setAttribute('height', pos.height);
      } else if (pos.side === 'right') {
        pinRect.setAttribute('x', pos.x);
        pinRect.setAttribute('y', pos.y - pos.height/2);
        pinRect.setAttribute('width', pos.width);
        pinRect.setAttribute('height', pos.height);
      } else if (pos.side === 'bottom') {
        pinRect.setAttribute('x', pos.x - pos.width/2);
        pinRect.setAttribute('y', pos.y);
        pinRect.setAttribute('width', pos.width);
        pinRect.setAttribute('height', pos.height);
      } else {
        pinRect.setAttribute('x', pos.x - pos.width/2);
        pinRect.setAttribute('y', pos.y);
        pinRect.setAttribute('width', pos.width);
        pinRect.setAttribute('height', pos.height);
      }
      
      pinRect.setAttribute('fill', 'rgba(120,200,120,0.12)');
      pinRect.setAttribute('stroke', pinColor);
      pinRect.setAttribute('stroke-width', '1.5');
      pinRect.setAttribute('rx', '2');
      pinRect.setAttribute('ry', '2');
      pinRect.setAttribute('data-pin-id', pin.id);
      pinRect.setAttribute('data-pin-num', pin.num);
      
      // Store pin data
      pinRect.pinData = {
        id: pin.id,
        num: pin.num,
        type: pin.type,
        funcs: pin.funcs
      };
      
      // Click handler - dispatches event for ic-explorer-base.js
      pinRect.addEventListener('click', (function(pinData) {
        return function(evt) {
          evt.stopPropagation();
          // This is the key event that ic-explorer-base.js listens for
          var event = new CustomEvent('pinSelected', {
            detail: { pinId: pinData.id }
          });
          document.dispatchEvent(event);
        };
      })(pinRect.pinData));
      
      // Hover handlers
      pinRect.addEventListener('mouseenter', (function(rect, color) {
        return function() {
          rect.setAttribute('filter', 'url(#pinGlow)');
          rect.setAttribute('stroke-width', '2.5');
          var event = new CustomEvent('pinHover', {
            detail: { pinId: rect.pinData.id, pinNum: rect.pinData.num }
          });
          document.dispatchEvent(event);
        };
      })(pinRect, pinColor));
      
      pinRect.addEventListener('mouseleave', (function(rect) {
        return function() {
          rect.setAttribute('filter', 'none');
          rect.setAttribute('stroke-width', '1.5');
          var event = new CustomEvent('pinLeave');
          document.dispatchEvent(event);
        };
      })(pinRect));
      
      mainGroup.appendChild(pinRect);
      
      // Pin number label
      var numLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      var labelX, labelY;
      
      if (pos.side === 'left') {
        labelX = pos.x - 12;
        labelY = pos.y + 4;
        numLabel.setAttribute('text-anchor', 'end');
      } else if (pos.side === 'right') {
        labelX = pos.x + pos.width + 12;
        labelY = pos.y + 4;
        numLabel.setAttribute('text-anchor', 'start');
      } else if (pos.side === 'bottom') {
        labelX = pos.x;
        labelY = pos.y + pos.height + 16;
        numLabel.setAttribute('text-anchor', 'middle');
      } else {
        labelX = pos.x;
        labelY = pos.y - 8;
        numLabel.setAttribute('text-anchor', 'middle');
      }
      
      numLabel.setAttribute('x', labelX);
      numLabel.setAttribute('y', labelY);
      numLabel.setAttribute('fill', pinColor);
      numLabel.setAttribute('font-size', '11');
      numLabel.setAttribute('font-family', 'monospace');
      numLabel.setAttribute('font-weight', 'bold');
      numLabel.textContent = pin.num;
      mainGroup.appendChild(numLabel);
      
      // Pin label on IC body
      if (pin.lbl) {
        var lblLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        var lblX, lblY;
        
        if (pos.side === 'left') {
          lblX = -bodySize/2 + 8;
          lblY = pos.y + 3;
          lblLabel.setAttribute('text-anchor', 'start');
        } else if (pos.side === 'right') {
          lblX = bodySize/2 - 8;
          lblY = pos.y + 3;
          lblLabel.setAttribute('text-anchor', 'end');
        } else if (pos.side === 'bottom') {
          lblX = pos.x;
          lblY = bodySize/2 - 8;
          lblLabel.setAttribute('text-anchor', 'middle');
        } else {
          lblX = pos.x;
          lblY = -bodySize/2 + 12;
          lblLabel.setAttribute('text-anchor', 'middle');
        }
        
        lblLabel.setAttribute('x', lblX);
        lblLabel.setAttribute('y', lblY);
        lblLabel.setAttribute('fill', pinColor);
        lblLabel.setAttribute('font-size', '9');
        lblLabel.setAttribute('font-family', 'monospace');
        lblLabel.textContent = pin.lbl;
        mainGroup.appendChild(lblLabel);
        
        this.currentPinElements.push({
          element: pinRect,
          numLabel: numLabel,
          lblLabel: lblLabel,
          pinId: pin.id,
          type: pin.type,
          funcs: pin.funcs
        });
      } else {
        this.currentPinElements.push({
          element: pinRect,
          numLabel: numLabel,
          lblLabel: null,
          pinId: pin.id,
          type: pin.type,
          funcs: pin.funcs
        });
      }
    }
    
    // IC part number
    var partText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    partText.setAttribute('x', '0');
    partText.setAttribute('y', '0');
    partText.setAttribute('text-anchor', 'middle');
    partText.setAttribute('dominant-baseline', 'middle');
    partText.setAttribute('fill', '#e0e5ec');
    partText.setAttribute('font-size', '18');
    partText.setAttribute('font-weight', 'bold');
    partText.textContent = config.partName || 'IC';
    mainGroup.appendChild(partText);
    
    // Package info
    var pkgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    pkgText.setAttribute('x', '0');
    pkgText.setAttribute('y', '24');
    pkgText.setAttribute('text-anchor', 'middle');
    pkgText.setAttribute('fill', '#a8a8a8');
    pkgText.setAttribute('font-size', '10');
    pkgText.setAttribute('font-family', 'monospace');
    pkgText.textContent = config.package || '';
    mainGroup.appendChild(pkgText);
  },
  
  getPinColor: function(type) {
    var colorMap = {
      'PWR': '#ff6b6b', 'GND': '#a8a8a8', 'I2C': '#9898d8',
      'INT': '#c8a850', 'AUX': '#50c8c8', 'CLK': '#7090a8',
      'CPOUT': '#c078ff', 'RESERVED': '#a8a8a8'
    };
    
    if (this.currentConfig && this.currentConfig.customTypes && this.currentConfig.customTypes[type]) {
      return this.currentConfig.customTypes[type].c;
    }
    
    return colorMap[type] || '#78c878';
  },
  
  updatePins: function(selectedId, filterType, filterFn) {
    if (!this.currentPinElements) return;
    
    for (var i = 0; i < this.currentPinElements.length; i++) {
      var pinElem = this.currentPinElements[i];
      var isSelected = (selectedId === pinElem.pinId);
      var isFilterMatch = false;
      
      if (filterType && filterFn) {
        isFilterMatch = pinElem.funcs && pinElem.funcs.some(function(f) {
          return filterFn(f);
        });
      }
      
      var pinColor = this.getPinColor(pinElem.type);
      
      if (isSelected) {
        pinElem.element.setAttribute('fill', pinColor);
        pinElem.element.setAttribute('stroke', pinColor);
        pinElem.element.setAttribute('stroke-width', '2');
        pinElem.element.setAttribute('filter', 'url(#pinGlow)');
        pinElem.element.setAttribute('opacity', '1');
        if (pinElem.numLabel) pinElem.numLabel.setAttribute('fill', '#060c1a');
        if (pinElem.lblLabel) pinElem.lblLabel.setAttribute('fill', '#060c1a');
      } else if (isFilterMatch) {
        pinElem.element.setAttribute('fill', pinColor);
        pinElem.element.setAttribute('stroke', pinColor);
        pinElem.element.setAttribute('stroke-width', '2');
        pinElem.element.setAttribute('filter', 'none');
        pinElem.element.setAttribute('opacity', '1');
        if (pinElem.numLabel) pinElem.numLabel.setAttribute('fill', '#060c1a');
        if (pinElem.lblLabel) pinElem.lblLabel.setAttribute('fill', '#060c1a');
      } else if (filterType && !isFilterMatch) {
        pinElem.element.setAttribute('fill', 'rgba(120,200,120,0.12)');
        pinElem.element.setAttribute('stroke', pinColor);
        pinElem.element.setAttribute('stroke-width', '1');
        pinElem.element.setAttribute('filter', 'none');
        pinElem.element.setAttribute('opacity', '0.08');
        if (pinElem.numLabel) pinElem.numLabel.setAttribute('fill', pinColor);
        if (pinElem.lblLabel) pinElem.lblLabel.setAttribute('fill', pinColor);
        if (pinElem.numLabel) pinElem.numLabel.setAttribute('opacity', '0.08');
        if (pinElem.lblLabel) pinElem.lblLabel.setAttribute('opacity', '0.08');
      } else {
        pinElem.element.setAttribute('fill', 'rgba(120,200,120,0.12)');
        pinElem.element.setAttribute('stroke', pinColor);
        pinElem.element.setAttribute('stroke-width', '1');
        pinElem.element.setAttribute('filter', 'none');
        pinElem.element.setAttribute('opacity', '1');
        if (pinElem.numLabel) pinElem.numLabel.setAttribute('fill', pinColor);
        if (pinElem.lblLabel) pinElem.lblLabel.setAttribute('fill', pinColor);
        if (pinElem.numLabel) pinElem.numLabel.setAttribute('opacity', '1');
        if (pinElem.lblLabel) pinElem.lblLabel.setAttribute('opacity', '1');
      }
    }
  }
};

window.QFPRenderer = window.QFPRenderer || QFPRenderer;
