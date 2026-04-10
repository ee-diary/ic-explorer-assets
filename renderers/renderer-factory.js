/**
 * Renderer Factory - Auto-selects the right renderer based on package
 */

var RendererFactory = {
  getPackageType: function(packageName, partName) {
    var pkg = (packageName || '').toUpperCase();
    var name = (partName || '').toUpperCase();
    
    // Custom boards (by name)
    if (name.indexOf('RASPBERRY') >= 0 || name.indexOf('RPI') >= 0) return 'custom';
    if (name.indexOf('TEENSY') >= 0) return 'custom';
    if (name.indexOf('ARDUINO') >= 0 || name.indexOf('NANO') >= 0) return 'custom';
    
    // DIP packages
    if (pkg.indexOf('DIP') >= 0) return 'dip';

    // QFN packages with uneven pin distribution (e.g. QFN-73)
    // These use the QFNRenderer which supports per-side pin counts via qfnConfig.sides[]
    if (pkg.indexOf('QFN') >= 0) return 'qfn';
    
    // QFP/LQFP/TQFP packages — evenly divisible by 4
    if (pkg.indexOf('QFP') >= 0 || pkg.indexOf('LQFP') >= 0 || pkg.indexOf('TQFP') >= 0) {
      return 'qfp';
    }
    
    // Default to DIP for now
    return 'dip';
  },
  
  getRenderer: function(packageName, partName) {
    var type = this.getPackageType(packageName, partName);

    // Teensy 4.1
    if (partName && partName.toLowerCase().indexOf('teensy 4.1') >= 0) {
      return window.Teensy41Renderer;
    }
    
    switch(type) {
      case 'dip':
        return window.DIPRenderer;
      case 'qfp':
        return window.QFPRenderer;
      case 'qfn':
        return window.QFNRenderer;
      case 'custom':
        return window.CustomBoardRenderer;
      default:
        return window.DIPRenderer;
    }
  }
};

window.RendererFactory = RendererFactory;
