// renderers/custom-board-renderer.js (Extended for Teensy 4.1)
// This extends the existing CustomBoardRenderer with Teensy 4.1 specifics

(function() {
  'use strict';
  
  // Store original renderer if exists
  const OriginalCustomBoardRenderer = window.CustomBoardRenderer || null;
  
  // Teensy 4.1 specific drawing functions
  const Teensy41Renderer = {
    name: 'Teensy 4.1',
    
    // Draw board background with PCB texture
    drawBoardBackground: function(svg, config) {
      const NS = 'http://www.w3.org/2000/svg';
      const board = config.boardConfig || {};
      const w = board.width || 220;
      const h = board.height || 600;
      
      // PCB green gradient
      const pcbGrad = document.createElementNS(NS, 'linearGradient');
      pcbGrad.setAttribute('id', 'pcbGrad');
      pcbGrad.setAttribute('x1', '0%');
      pcbGrad.setAttribute('y1', '0%');
      pcbGrad.setAttribute('x2', '100%');
      pcbGrad.setAttribute('y2', '100%');
      
      const stop1 = document.createElementNS(NS, 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', '#1a3a1a');
      const stop2 = document.createElementNS(NS, 'stop');
      stop2.setAttribute('offset', '50%');
      stop2.setAttribute('stop-color', '#122810');
      const stop3 = document.createElementNS(NS, 'stop');
      stop3.setAttribute('offset', '100%');
      stop3.setAttribute('stop-color', '#0c1e0c');
      
      pcbGrad.appendChild(stop1);
      pcbGrad.appendChild(stop2);
      pcbGrad.appendChild(stop3);
      svg.appendChild(pcbGrad);
      
      // Main board rectangle
      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', '0');
      rect.setAttribute('y', '0');
      rect.setAttribute('width', w);
      rect.setAttribute('height', h);
      rect.setAttribute('fill', 'url(#pcbGrad)');
      rect.setAttribute('stroke', '#0a1f0a');
      rect.setAttribute('stroke-width', '2');
      svg.appendChild(rect);
      
      // PCB dot pattern
      const pattern = document.createElementNS(NS, 'pattern');
      pattern.setAttribute('id', 'pcbDots');
      pattern.setAttribute('width', '16');
      pattern.setAttribute('height', '16');
      pattern.setAttribute('patternUnits', 'userSpaceOnUse');
      
      const dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('cx', '8');
      dot.setAttribute('cy', '8');
      dot.setAttribute('r', '0.6');
      dot.setAttribute('fill', 'rgba(100,220,100,0.10)');
      pattern.appendChild(dot);
      svg.appendChild(pattern);
      
      const dotRect = document.createElementNS(NS, 'rect');
      dotRect.setAttribute('x', '0');
      dotRect.setAttribute('y', '0');
      dotRect.setAttribute('width', w);
      dotRect.setAttribute('height', h);
      dotRect.setAttribute('fill', 'url(#pcbDots)');
      svg.appendChild(dotRect);
    },
    
    // Draw header pins
    drawHeaderPins: function(svg, pins, config) {
      const NS = 'http://www.w3.org/2000/svg';
      const leftPins = pins.filter(p => p.position?.side === 'left');
      const rightPins = pins.filter(p => p.position?.side === 'right');
      
      const leftX = 10;
      const rightX = 210;
      const startY = 10;
      const spacing = 25;
      
      // Left column (top to bottom)
      leftPins.sort((a, b) => a.position.order - b.position.order);
      leftPins.forEach((pin, idx) => {
        const y = startY + idx * spacing;
        const col = this.getPinColor(pin.type);
        
        const group = document.createElementNS(NS, 'g');
        group.setAttribute('class', 'pin-group');
        group.setAttribute('data-id', pin.id);
        
        // Pad background
        const bg = document.createElementNS(NS, 'rect');
        bg.setAttribute('x', leftX - 12);
        bg.setAttribute('y', y - 12);
        bg.setAttribute('width', '24');
        bg.setAttribute('height', '24');
        bg.setAttribute('rx', '4');
        bg.setAttribute('fill', 'rgba(100,200,100,0.08)');
        bg.setAttribute('stroke', 'rgba(100,200,100,0.18)');
        group.appendChild(bg);
        
        // Main pad
        const pad = document.createElementNS(NS, 'rect');
        pad.setAttribute('x', leftX - 10);
        pad.setAttribute('y', y - 10);
        pad.setAttribute('width', '20');
        pad.setAttribute('height', '20');
        pad.setAttribute('rx', '3');
        pad.setAttribute('fill', col.bg);
        pad.setAttribute('stroke', col.c);
        pad.setAttribute('stroke-width', '1.5');
        pad.setAttribute('class', 'pin-sq');
        group.appendChild(pad);
        
        // Through-hole
        const hole = document.createElementNS(NS, 'circle');
        hole.setAttribute('cx', leftX);
        hole.setAttribute('cy', y);
        hole.setAttribute('r', '3.5');
        hole.setAttribute('fill', '#040e04');
        group.appendChild(hole);
        
        // Label
        const label = document.createElementNS(NS, 'text');
        label.setAttribute('x', leftX + 13);
        label.setAttribute('y', y + 4);
        label.setAttribute('fill', 'rgba(255,255,255,0.80)');
        label.setAttribute('font-size', '8');
        label.setAttribute('font-family', 'monospace');
        label.textContent = pin.lbl;
        group.appendChild(label);
        
        group.addEventListener('click', () => this.onPinClick(pin.id));
        svg.appendChild(group);
        
        // Store position for interaction
        pin._drawX = leftX;
        pin._drawY = y;
      });
      
      // Right column (top to bottom - physical order is reversed)
      rightPins.sort((a, b) => a.position.order - b.position.order);
      rightPins.forEach((pin, idx) => {
        const y = startY + idx * spacing;
        const col = this.getPinColor(pin.type);
        
        const group = document.createElementNS(NS, 'g');
        group.setAttribute('class', 'pin-group');
        group.setAttribute('data-id', pin.id);
        
        const bg = document.createElementNS(NS, 'rect');
        bg.setAttribute('x', rightX - 12);
        bg.setAttribute('y', y - 12);
        bg.setAttribute('width', '24');
        bg.setAttribute('height', '24');
        bg.setAttribute('rx', '4');
        bg.setAttribute('fill', 'rgba(100,200,100,0.08)');
        group.appendChild(bg);
        
        const pad = document.createElementNS(NS, 'rect');
        pad.setAttribute('x', rightX - 10);
        pad.setAttribute('y', y - 10);
        pad.setAttribute('width', '20');
        pad.setAttribute('height', '20');
        pad.setAttribute('rx', '3');
        pad.setAttribute('fill', col.bg);
        pad.setAttribute('stroke', col.c);
        pad.setAttribute('stroke-width', '1.5');
        pad.setAttribute('class', 'pin-sq');
        group.appendChild(pad);
        
        const hole = document.createElementNS(NS, 'circle');
        hole.setAttribute('cx', rightX);
        hole.setAttribute('cy', y);
        hole.setAttribute('r', '3.5');
        hole.setAttribute('fill', '#040e04');
        group.appendChild(hole);
        
        const label = document.createElementNS(NS, 'text');
        label.setAttribute('x', rightX - 13);
        label.setAttribute('y', y + 4);
        label.setAttribute('fill', 'rgba(255,255,255,0.80)');
        label.setAttribute('font-size', '8');
        label.setAttribute('font-family', 'monospace');
        label.setAttribute('text-anchor', 'end');
        label.textContent = pin.lbl;
        group.appendChild(label);
        
        group.addEventListener('click', () => this.onPinClick(pin.id));
        svg.appendChild(group);
        
        pin._drawX = rightX;
        pin._drawY = y;
      });
    },
    
    // Draw on-board components
    drawComponents: function(svg, components) {
      const NS = 'http://www.w3.org/2000/svg';
      
      // Component color mapping
      const componentColors = {
        MCU: { fill: '#1e1e1e', stroke: '#1a2a1a' },
        FLASH: { fill: '#1e1e1e', stroke: '#1a2a1a' },
        PHY: { fill: '#1e1e1e', stroke: '#1a2a1a' },
        LDO: { fill: '#1e1e1e', stroke: '#1a2a1a' },
        SWITCH: { fill: '#2a2a2a', stroke: '#3a3a3a' },
        MOSFET: { fill: '#1e1e1e', stroke: '#1a2a1a' },
        HEADER: { fill: '#2a2a2a', stroke: '#3a3a3a' },
        CONN: { fill: '#f5f5f5', stroke: '#ccc' }
      };
      
      components.forEach(comp => {
        const group = document.createElementNS(NS, 'g');
        group.setAttribute('class', 'board-component');
        group.setAttribute('data-id', comp.id);
        
        const colors = componentColors[comp.type] || { fill: '#1e1e1e', stroke: '#2a2a2a' };
        
        // Component body
        const rect = document.createElementNS(NS, 'rect');
        rect.setAttribute('x', comp.x);
        rect.setAttribute('y', comp.y);
        rect.setAttribute('width', comp.w);
        rect.setAttribute('height', comp.h);
        rect.setAttribute('rx', comp.type === 'HEADER' ? '2' : '4');
        rect.setAttribute('fill', colors.fill);
        rect.setAttribute('stroke', colors.stroke);
        rect.setAttribute('stroke-width', '1.2');
        rect.setAttribute('class', 'component-shape');
        group.appendChild(rect);
        
        // Component label
        const label = document.createElementNS(NS, 'text');
        label.setAttribute('x', comp.x + comp.w / 2);
        label.setAttribute('y', comp.y + comp.h / 2 + (comp.type === 'HEADER' ? 2 : 0));
        label.setAttribute('fill', 'rgba(255,255,255,0.70)');
        label.setAttribute('font-size', comp.type === 'HEADER' ? '6' : '5');
        label.setAttribute('font-family', 'monospace');
        label.setAttribute('text-anchor', 'middle');
        label.textContent = comp.label;
        group.appendChild(label);
        
        group.addEventListener('click', () => this.onComponentClick(comp.id));
        svg.appendChild(group);
      });
    },
    
    // Draw USB-C connector
    drawUSBConnector: function(svg) {
      const NS = 'http://www.w3.org/2000/svg';
      
      const grad = document.createElementNS(NS, 'linearGradient');
      grad.setAttribute('id', 'usbGrad');
      grad.setAttribute('x1', '0%');
      grad.setAttribute('y1', '0%');
      grad.setAttribute('x2', '0%');
      grad.setAttribute('y2', '100%');
      
      const stops = [
        { offset: '0%', color: '#e0e0e0' },
        { offset: '30%', color: '#ffffff' },
        { offset: '60%', color: '#d0d0d0' },
        { offset: '100%', color: '#b0b0b0' }
      ];
      
      stops.forEach(s => {
        const stop = document.createElementNS(NS, 'stop');
        stop.setAttribute('offset', s.offset);
        stop.setAttribute('stop-color', s.color);
        grad.appendChild(stop);
      });
      svg.appendChild(grad);
      
      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', '60');
      rect.setAttribute('y', '-12');
      rect.setAttribute('width', '100');
      rect.setAttribute('height', '55');
      rect.setAttribute('rx', '5');
      rect.setAttribute('fill', 'url(#usbGrad)');
      rect.setAttribute('stroke', '#999');
      svg.appendChild(rect);
      
      const label = document.createElementNS(NS, 'text');
      label.setAttribute('x', '110');
      label.setAttribute('y', '3');
      label.setAttribute('fill', '#555');
      label.setAttribute('font-size', '7');
      label.setAttribute('text-anchor', 'middle');
      label.textContent = 'USB-C';
      svg.appendChild(label);
    },

    // Add to configs/teensy41-config.js (append after components)
chips: [  // For component interactivity
  { id: 'iMXRT1062', name: 'iMXRT1062', type: 'MCU', fullName: 'NXP i.MX RT1062 Crossover MCU', specs: { Clock: '600 MHz', Core: 'Cortex-M7', RAM: '1 MB' }, note: 'Main processor. High-performance crossover MCU with real-time functionality.' },
  { id: 'MKL02', name: 'MKL02', type: 'MCU', fullName: 'Kinetis KL02 MCU (Bootloader)', specs: { Clock: '48 MHz', Core: 'Cortex-M0+', Function: 'Bootloader/USB' }, note: 'Handles bootloading and USB-to-serial communication for the iMXRT.' },
  { id: 'W25Q128', name: 'W25Q128', type: 'FLASH', fullName: '16MB Serial Nor Flash Memory', specs: { Capacity: '16 MB', Interface: 'SPI / QPI' }, note: 'External flash memory for program and data storage.' },
  { id: 'DP83825I', name: 'DP83825I', type: 'PHY', fullName: '10/100 Mbps Ethernet PHY', specs: { Speed: '10/100 Mbps', Interface: 'RMII' }, note: 'Physical layer transceiver for Ethernet connectivity.' },
  { id: 'TPD3S014', name: 'TPD3S014', type: 'SWITCH', fullName: 'USB Power Switch & Protection', specs: { Current: '1.5 A', ESD_Prot: '±15 kV' }, note: 'Current limit switch and ESD protection for the USB-C port.' },
  { id: 'TLV75733P', name: 'TLV75733P', type: 'LDO', fullName: '3.3V Low-Dropout Regulator', specs: { Output: '3.3 V', Max_Curr: '1 A' }, note: 'Regulates board power to 3.3V for all components.' },
  { id: 'DMG2305UX', name: 'DMG2305UX', type: 'MOSFET', fullName: 'P-Channel MOSFET', specs: { Vds: '-20 V', Id: '-4.2 A' }, note: 'Used for power switching and reverse polarity protection.' },
  { id: 'RESET', name: 'RESET', type: 'SWITCH', fullName: 'Program/Reset Pushbutton', specs: { Function: 'Reset / Program' }, note: 'Press to put Teensy into program mode or reset (if held).' },
  { id: 'USB_HOST_HDR', name: 'USB Host', type: 'HEADER', fullName: 'USB Host Header (5-pin)', specs: { Pins: '5-pin', Spacing: '2.54 mm' }, note: 'Connects to external USB port for hosting devices.' },
  { id: 'ETH_HDR', name: 'Ethernet', type: 'HEADER', fullName: 'Ethernet Header (6-pin)', specs: { Pins: '2x3', Speed: '10/100 Mbps' }, note: 'Direct connections to Ethernet jack. Requires DP83825I PHY chip.' },
  { id: 'EXP_HDR', name: 'Expansion', type: 'HEADER', fullName: 'Expansion Header (5-pin)', specs: { Pins: '5-pin' }, note: 'Extra pins for auxiliary signals located between the main pin rows.' }
]
    
    // Draw silk text
    drawSilkText: function(svg) {
      const NS = 'http://www.w3.org/2000/svg';
      
      const text1 = document.createElementNS(NS, 'text');
      text1.setAttribute('x', '110');
      text1.setAttribute('y', '500');
      text1.setAttribute('fill', 'rgba(140,230,140,0.22)');
      text1.setAttribute('font-size', '14');
      text1.setAttribute('font-family', 'Georgia, serif');
      text1.setAttribute('font-style', 'italic');
      text1.setAttribute('font-weight', 'bold');
      text1.setAttribute('text-anchor', 'middle');
      text1.textContent = 'TEENSY 4.1';
      svg.appendChild(text1);
      
      const text2 = document.createElementNS(NS, 'text');
      text2.setAttribute('x', '110');
      text2.setAttribute('y', '514');
      text2.setAttribute('fill', 'rgba(100,200,100,0.12)');
      text2.setAttribute('font-size', '6');
      text2.setAttribute('font-family', 'monospace');
      text2.setAttribute('text-anchor', 'middle');
      text2.textContent = 'PJRC.COM';
      svg.appendChild(text2);
    },
    
    getPinColor: function(type) {
      const colors = {
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
    },
    
    onPinClick: function(pinId) {
      if (window.ICExplorer) {
        window.ICExplorer.selectPin(pinId);
      }
    },
    
    onComponentClick: function(compId) {
      if (window.ICExplorer) {
        window.ICExplorer.selectComponent(compId);
      }
    }
  };
  
  // Register the Teensy renderer with the factory
  if (window.RendererFactory) {
    window.RendererFactory.registerBoardRenderer('Teensy 4.1', Teensy41Renderer);
  }
  
  // Export for use
  window.Teensy41Renderer = Teensy41Renderer;
  
})();