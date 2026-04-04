/**
 * QFP/TQFP/LQFP/QFN Renderer - Draws 4-sided surface mount packages
 */

window.QFPRenderer = {
  // Store current state for updatePins
  currentSvg: null,
  currentConfig: null,
  currentPinElements: [],
  currentSelectedId: null,
  currentFilterType: null,
  currentFilterFn: null,
  
  /**
   * Main draw function - creates the complete QFP package visualization
   */
  draw: function(svg, config) {
    var self = this;
    this.currentSvg = svg;
    this.currentConfig = config;
    
    var qfp = config.qfpConfig || {};
    var pins = config.pins || [];
    
    // Read configuration with sensible defaults
    var pinsPerSide = qfp.pinsPerSide || Math.ceil(config.pinCount / 4);
    var bodySize = qfp.bodySize || 400;
    var pinLength = qfp.pinLength || 28;
    var pinWidth = qfp.pinWidth || 20;
    
    // Config-driven positioning
    var pinStartOffset = (qfp.pinStartOffset !== undefined) ? qfp.pinStartOffset : 20;
    var pinEndOffset = (qfp.pinEndOffset !== undefined) ? qfp.pinEndOffset : 20;
    
    // Calculate available space and spacing between pins
    var availableSpace = bodySize - (pinStartOffset + pinEndOffset);
    var spacing = availableSpace / (pinsPerSide - 1);
    
    // Set up SVG viewBox to center the content
    var totalWidth = bodySize + (pinLength * 2) + 100;
    var totalHeight = bodySize + (pinLength * 2) + 100;
    svg.setAttribute('viewBox', (-totalWidth/2) + ' ' + (-totalHeight/2) + ' ' + totalWidth + ' ' + totalHeight);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Add definitions (filters, gradients)
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Glow filter for selected pins
    var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'pinGlow');
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');
    
    var feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('in', 'SourceAlpha');
    feGaussianBlur.setAttribute('stdDeviation', '3');
    feGaussianBlur.setAttribute('result', 'blur');
    
    var feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    var feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode1.setAttribute('in', 'blur');
    var feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    
    svg.appendChild(defs);
    
    // Create a group to center all content
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
    
    // Draw orientation dot (pin 1 indicator)
    var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', -bodySize/2 + 15);
    dot.setAttribute('cy', -bodySize/2 + 15);
    dot.setAttribute('r', '6');
    dot.setAttribute('fill', '#ff6b6b');
    mainGroup.appendChild(dot);
    
    // Clear and repopulate pin elements
    this.currentPinElements = [];
    
    // Calculate pin positions for each side
    var pinPositions = [];
    
    // LEFT SIDE (pins 1 to pinsPerSide, top to bottom)
    for (var i = 0; i < pinsPerSide; i++) {
      var y = -bodySize/2 + pinStartOffset + (i * spacing);
      pinPositions.push({
        side: 'left',
        x: -bodySize/2 - pinLength,
        y: y,
        width: pinLength,
        height: pinWidth,
        pinIndex: i
      });
    }
    
    // BOTTOM SIDE (pins pinsPerSide+1 to 2*pinsPerSide, left to right)
    for (var i = 0; i < pinsPerSide; i++) {
      var x = -bodySize/2 + pinStartOffset + (i * spacing);
      pinPositions.push({
        side: 'bottom',
        x: x,
        y: bodySize/2,
        width: pinWidth,
        height: pinLength,
        pinIndex: pinsPerSide + i
      });
    }
    
    // RIGHT SIDE (pins 2*pinsPerSide+1 to 3*pinsPerSide, bottom to top)
    for (var i = 0; i < pinsPerSide; i++) {
      var y = bodySize/2 - pinStartOffset - (i * spacing);
      pinPositions.push({
        side: 'right',
        x: bodySize/2,
        y: y,
        width: pinLength,
        height: pinWidth,
        pinIndex: 2 * pinsPerSide + i
      });
    }
    
    // TOP SIDE (pins 3*pinsPerSide+1 to 4*pinsPerSide, right to left)
    for (var i = 0; i < pinsPerSide; i++) {
      var x = bodySize/2 - pinStartOffset - (i * spacing);
      pinPositions.push({
        side: 'top',
        x: x,
        y: -bodySize/2 - pinLength,
        width: pinWidth,
        height: pinLength,
        pinIndex: 3 * pinsPerSide + i
      });
    }
    
    // Draw each pin
    for (var i = 0; i < pinPositions.length && i < pins.length; i++) {
      var pos = pinPositions[i];
      var pin = pins[i];
      
      // Get pin color based on type
      var pinColor = this.getPinColor(pin.type);
      
      var pinRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      
      // Position rectangle based on side
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
      
      pinRect.setAttribute('fill', this.getFillColor(pin.type, false, false));
      pinRect.setAttribute('stroke', pinColor);
      pinRect.setAttribute('stroke-width', '1.5');
      pinRect.setAttribute('rx', '2');
      pinRect.setAttribute('ry', '2');
      pinRect.setAttribute('data-pin-id', pin.id);
      pinRect.setAttribute('data-pin-num', pin.num);
      pinRect.setAttribute('data-pin-type', pin.type);
      pinRect.setAttribute('data-pin-funcs', JSON.stringify(pin.funcs));
      
      // Store pin data on the element
      pinRect.pinData = {
        id: pin.id,
        num: pin.num,
        type: pin.type,
        funcs: pin.funcs,
        name: pin.name,
        volt: pin.volt,
        curr: pin.curr,
        note: pin.note
      };
      
      // Add click handler - CRITICAL for showing info
      pinRect.addEventListener('click', (function(pinData) {
        return function(evt) {
          evt.stopPropagation();
          // Dispatch event that ic-explorer-base.js listens for
          var event = new CustomEvent('pinSelected', { 
            detail: { 
              pinId: pinData.id,
              pinNum: pinData.num,
              pinName: pinData.name,
              pinType: pinData.type,
              pinFuncs: pinData.funcs,
              pinVolt: pinData.volt,
              pinCurr: pinData.curr,
              pinNote: pinData.note
            } 
          });
          document.dispatchEvent(event);
        };
      })(pinRect.pinData));
      
      // Add hover handlers
      pinRect.addEventListener('mouseenter', (function(pinRect, pinColor) {
        return function() {
          pinRect.setAttribute('filter', 'url(#pinGlow)');
          pinRect.setAttribute('stroke-width', '3');
          // Dispatch hover event for tooltip
          var event = new CustomEvent('pinHover', { 
            detail: { 
              pinId: pinRect.pinData.id,
              pinNum: pinRect.pinData.num 
            } 
          });
          document.dispatchEvent(event);
        };
      })(pinRect, pinColor));
      
      pinRect.addEventListener('mouseleave', (function(pinRect) {
        return function() {
          // Restore based on current selection/filter state
          if (self.currentSelectedId === pinRect.pinData.id) {
            pinRect.setAttribute('filter', 'url(#pinGlow)');
            pinRect.setAttribute('stroke-width', '2');
          } else {
            pinRect.setAttribute('filter', 'none');
            pinRect.setAttribute('stroke-width', '1.5');
          }
          var event = new CustomEvent('pinLeave');
          document.dispatchEvent(event);
        };
      })(pinRect));
      
      mainGroup.appendChild(pinRect);
      
      // Add pin number label
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
      
      // Add pin label (short name on IC body)
      if (pin.lbl && pin.lbl.length <= 6) {
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
          pinNum: pin.num,
          type: pin.type,
          funcs: pin.funcs,
          position: pos
        });
      } else {
        this.currentPinElements.push({
          element: pinRect,
          numLabel: numLabel,
          lblLabel: null,
          pinId: pin.id,
          pinNum: pin.num,
          type: pin.type,
          funcs: pin.funcs,
          position: pos
        });
      }
    }
    
    // Add IC part number text
    var partText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    partText.setAttribute('x', '0');
    partText.setAttribute('y', '0');
    partText.setAttribute('text-anchor', 'middle');
    partText.setAttribute('dominant-baseline', 'middle');
    partText.setAttribute('fill', '#e0e5ec');
    partText.setAttribute('font-size', '18');
    partText.setAttribute('font-family', 'Arial, sans-serif');
    partText.setAttribute('font-weight', 'bold');
    partText.textContent = config.partName || 'IC';
    mainGroup.appendChild(partText);
    
    // Add package info
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
  
  /**
   * Get fill color for a pin based on its state
   */
  getFillColor: function(type, isSelected, isFilterMatch) {
    if (isSelected || isFilterMatch) {
      // Selected or filter matched - solid color
      var colorMap = {
        'PWR': '#ff6b6b', 'GND': '#a8a8a8', 'I2C': '#9898d8',
        'INT': '#c8a850', 'AUX': '#50c8c8', 'CLK': '#7090a8',
        'CPOUT': '#c078ff', 'RESERVED': '#a8a8a8'
      };
      return colorMap[type] || '#78c878';
    } else {
      // Default - semi-transparent
      return 'rgba(120,200,120,0.12)';
    }
  },
  
  /**
   * Update pin appearances based on selection and filter state
   * Called by ic-explorer-base.js
   */
  updatePins: function(selectedId, filterType, filterFn) {
    var self = this;
    
    // Store current state
    this.currentSelectedId = selectedId;
    this.currentFilterType = filterType;
    this.currentFilterFn = filterFn;
    
    if (!this.currentPinElements) return;
    
    this.currentPinElements.forEach(function(pinElem) {
      var isSelected = (selectedId === pinElem.pinId);
      var isFilterMatch = false;
      
      if (filterType && filterFn) {
        // Check if this pin matches the filter
        isFilterMatch = pinElem.funcs && pinElem.funcs.some(function(f) {
          return filterFn(f);
        });
      }
      
      var pinColor = self.getPinColor(pinElem.type);
      var fillColor = self.getFillColor(pinElem.type, isSelected, isFilterMatch);
      
      // Update pin rectangle
      if (isSelected || isFilterMatch) {
        pinElem.element.setAttribute('fill', fillColor);
        pinElem.element.setAttribute('stroke', pinColor);
        pinElem.element.setAttribute('stroke-width', '2');
        if (isSelected) {
          pinElem.element.setAttribute('filter', 'url(#pinGlow)');
        } else {
          pinElem.element.setAttribute('filter', 'none');
        }
      } else {
        pinElem.element.setAttribute('fill', fillColor);
        pinElem.element.setAttribute('stroke', pinColor);
        pinElem.element.setAttribute('stroke-width', '1');
        pinElem.element.setAttribute('filter', 'none');
      }
      
      // Update label colors
      var labelColor = (isSelected || isFilterMatch) ? '#060c1a' : pinColor;
      if (pinElem.numLabel) {
        pinElem.numLabel.setAttribute('fill', labelColor);
      }
      if (pinElem.lblLabel) {
        pinElem.lblLabel.setAttribute('fill', labelColor);
      }
      
      // Adjust opacity for non-matching during filter
      if (filterType && !isFilterMatch && !isSelected) {
        pinElem.element.setAttribute('opacity', '0.08');
        if (pinElem.numLabel) pinElem.numLabel.setAttribute('opacity', '0.08');
        if (pinElem.lblLabel) pinElem.lblLabel.setAttribute('opacity', '0.08');
      } else {
        pinElem.element.setAttribute('opacity', '1');
        if (pinElem.numLabel) pinElem.numLabel.setAttribute('opacity', '1');
        if (pinElem.lblLabel) pinElem.lblLabel.setAttribute('opacity', '1');
      }
    });
  },
  
  /**
   * Helper to get pin color
   */
  getPinColor: function(type) {
    var colorMap = {
      'PWR': '#ff6b6b', 'GND': '#a8a8a8', 'I2C': '#9898d8',
      'INT': '#c8a850', 'AUX': '#50c8c8', 'CLK': '#7090a8',
      'CPOUT': '#c078ff', 'RESERVED': '#a8a8a8',
      'MOTOR_EN': '#50c8a0', 'MOTOR_IN': '#4a9aee', 'MOTOR_OUT': '#78c878',
      'INPUT': '#4a9aee', 'OUTPUT': '#78c878'
    };
    
    if (this.currentConfig && this.currentConfig.customTypes && this.currentConfig.customTypes[type]) {
      return this.currentConfig.customTypes[type].c;
    }
    
    return colorMap[type] || '#78c878';
  }
};

// Make it globally available
window.QFPRenderer = window.QFPRenderer || QFPRenderer;
