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
      // Draw the Raspberry Pi board
      drawRaspberryPi3(svg, config);
    },
    'TEENSY 4.1': function(svg, config) {
      // Draw the Teensy 4.1 board
      drawTeensy41(svg, config);
    },
    'ARDUINO NANO': function(svg, config) {
      // Draw the Arduino Nano board
      drawArduinoNano(svg, config);
    }
  };
  
  function draw(svg, config) {
    var boardName = config.boardType || config.partName;
    var drawer = boardDrawers[boardName.toUpperCase()];
    
    if (drawer) {
      drawer(svg, config);
    } else {
      // Fallback: draw generic board
      drawGenericBoard(svg, config);
    }
    
    // After drawing board, add pin interactivity
    attachPinInteractivity(svg, config);
  }
  
  function drawRaspberryPi3(svg, config) {
    // Clear SVG
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    
    // Define viewBox for Raspberry Pi 3 (from your existing code)
    svg.setAttribute('viewBox', '0 -13 413 636');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Copy your existing Raspberry Pi drawing code here
    // (The SVG drawing code from your Raspberry Pi 3.txt file)
    // This includes:
    // - Board body (green PCB)
    // - USB ports, Ethernet, HDMI, CSI, microSD
    // - BCM2837 chip, WiFi chip, regulators
    // - 40-pin GPIO header
    // - Mounting holes
    // - SMD components
    
    // IMPORTANT: When copying, ensure all elements get appropriate classes:
    // - Pins: class="board-pin" data-id="GPIO2"
    // - Chips: class="board-chip" data-id="BCM2837"
    // - Connectors: class="board-connector" data-id="USB_HOST"
  }
  
  function drawTeensy41(svg, config) {
    svg.setAttribute('viewBox', '0 -60 220 700');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Copy your existing Teensy 4.1 drawing code here
    // Includes:
    // - iMXRT1062 processor
    // - MKL02 bootloader
    // - W25Q128 flash
    // - DP83825I Ethernet PHY
    // - USB-C, Ethernet header, USB host header
    // - Left/right pin headers
    // - MicroSD slot
    // - Reset button
  }
  
  function drawArduinoNano(svg, config) {
    // Similar to your Arduino Nano existing code
  }
  
  function drawGenericBoard(svg, config) {
    // Fallback: simple board outline with pin headers
    svg.setAttribute('viewBox', '0 0 400 600');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Simple board body
    var rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', '400');
    rect.setAttribute('height', '600');
    rect.setAttribute('fill', '#1a2a1a');
    rect.setAttribute('stroke', '#2a3a2a');
    rect.setAttribute('stroke-width', '2');
    svg.appendChild(rect);
    
    // Draw pins from config
    var pins = config.pins;
    var leftX = 20, rightX = 380, startY = 50, stepY = 25;
    
    pins.forEach(function(pin, i) {
      var isLeft = (pin.side === 'left' || (pin.num % 2 === 1 && pin.num <= pins.length/2));
      var x = isLeft ? leftX : rightX;
      var y = startY + i * stepY;
      
      var col = window.ICExplorer.getColor(pin.type);
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
      pad.setAttribute('fill', col.bg);
      pad.setAttribute('stroke', col.c);
      pad.setAttribute('stroke-width', '1.5');
      pad.setAttribute('class', 'pin-sq');
      g.appendChild(pad);
      
      var label = document.createElementNS(NS, 'text');
      label.setAttribute('x', x);
      label.setAttribute('y', y + 3);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('fill', col.c);
      label.setAttribute('font-size', '10');
      label.setAttribute('font-family', 'monospace');
      label.textContent = pin.lbl;
      g.appendChild(label);
      
      svg.appendChild(g);
    });
  }
  
  function attachPinInteractivity(svg, config) {
    // Attach click handlers to pins
    document.querySelectorAll('.board-pin, .ic-pin').forEach(function(el) {
      var pinId = el.getAttribute('data-id');
      var pin = config.pins.find(function(p) { return p.id === pinId; });
      
      if (pin) {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          window.ICExplorer.selectPin(pinId);
        });
        
        el.addEventListener('mouseenter', function(e) {
          window.ICExplorer.showTooltip(pin, e);
        });
        
        el.addEventListener('mousemove', window.ICExplorer.moveTooltip);
        el.addEventListener('mouseleave', window.ICExplorer.hideTooltip);
      }
    });
    
    // Attach click handlers to chips/components
    document.querySelectorAll('.board-chip').forEach(function(el) {
      var chipId = el.getAttribute('data-id');
      var chip = config.chips ? config.chips.find(function(c) { return c.id === chipId; }) : null;
      
      if (chip) {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          window.ICExplorer.selectChip(chipId);
        });
        
        el.addEventListener('mouseenter', function(e) {
          window.ICExplorer.showTooltip(chip, e);
        });
      }
    });
  }
  
  return { draw: draw };
})();

window.CustomBoardRenderer = CustomBoardRenderer;
