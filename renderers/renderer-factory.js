/**
 * Renderer Factory - Automatically selects the right renderer based on package
 */

var RendererFactory = {
  // Package type detection
  getPackageType: function(packageName) {
    var pkg = packageName.toUpperCase();
    
    // DIP packages
    if (pkg.indexOf('DIP') >= 0) return 'dip';
    
    // QFP/LQFP/TQFP packages
    if (pkg.indexOf('QFP') >= 0) return 'qfp';
    if (pkg.indexOf('LQFP') >= 0) return 'qfp';
    if (pkg.indexOf('TQFP') >= 0) return 'qfp';
    
    // Custom board layouts
    if (pkg.indexOf('NANO') >= 0) return 'custom';
    if (pkg.indexOf('ARDUINO') >= 0) return 'custom';
    
    // Default to QFP for unknown (most modern MCUs)
    return 'qfp';
  },
  
  // Get the appropriate renderer
  getRenderer: function(packageName) {
    var type = this.getPackageType(packageName);
    
    switch(type) {
      case 'dip':
        return window.DIPRenderer;
      case 'qfp':
        return window.QFPRenderer;
      case 'custom':
        return window.CustomRenderer;
      default:
        return window.QFPRenderer;
    }
  }
};

window.RendererFactory = RendererFactory;
