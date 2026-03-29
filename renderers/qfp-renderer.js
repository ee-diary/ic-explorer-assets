/**
 * QFP/LQFP/TQFP Package Renderer
 */

var QFPRenderer = (function() {
  'use strict';
  
  var NS = 'http://www.w3.org/2000/svg';
  
  function draw(svg, config) {
    var C = config;
    
    // Set viewBox for QFP
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    function mk(t, a) {
      var e = document.createElementNS(NS, t);
      for (var k in a) e.setAttribute(k, a[k]);
      return e;
    }
    
    // Clear SVG
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    
    // Simple QFP body
    var bodyRect = mk('rect', { x: 100, y: 100, width: 200, height: 200, rx: '8', fill: '#1e2430', stroke: '#4a5c70', 'stroke-width': '2' });
    svg.appendChild(bodyRect);
    
    // Text
    var text = mk('text', { x: 200, y: 200, 'text-anchor': 'middle', fill: '#4a5c70', 'font-size': '16', 'font-weight': 'bold', 'font-family': 'monospace' });
    text.textContent = C.partName;
    svg.appendChild(text);
    
    var sub = mk('text', { x: 200, y: 220, 'text-anchor': 'middle', fill: '#2a3a48', 'font-size': '12', 'font-family': 'monospace' });
    sub.textContent = C.package + ' • ' + C.pinCount + ' pins';
    svg.appendChild(sub);
    
    // Pin-1 marker
    var marker = mk('circle', { cx: 108, cy: 108, r: '4', fill: '#ff9944' });
    svg.appendChild(marker);
    
    // Draw pins around the perimeter (simplified)
    var pins = C.pins;
    var pinsPerSide = Math.ceil(C.pinCount / 4);
    var step = 180 / (pinsPerSide - 1);
    
    // Left side (top to bottom)
    for (var i = 0; i < pinsPerSide && i < pins.length; i++) {
      var pin = pins[i];
      var col = window.ICExplorer ? window.ICExplorer.getColor(pin.type) : { bg: '#1c2128', c: '#78c878' };
      var y = 110 + i * step;
      
      var g = mk('g', { 'class': 'ic-pin', 'data-id': pin.id });
      g.style.cursor = 'pointer';
      
      var rect = mk('rect', { x: 85, y: y - 4, width: 15, height: 8, rx: '1', fill: col.bg, stroke: col.c, 'stroke-width': '1', 'class': 'pin-sq' });
      g.appendChild(rect);
      
      var num = mk('text', { x: 92, y: y + 1, 'text-anchor': 'middle', fill: col.c, 'font-size': '8', 'font-family': 'monospace' });
      num.textContent = pin.num;
      g.appendChild(num);
      
      svg.appendChild(g);
    }
    
    console.log('QFP Renderer (basic) drew', C.partName);
  }
  
  return { draw: draw };
})();

window.QFPRenderer = QFPRenderer;
