<!-- PIC12F683 with Modular System - Fully Working -->
<link rel="stylesheet" href="https://ee-diary.github.io/ic-explorer-assets/core/ic-explorer-core.css">

<!-- Load config (external or inline) -->
<script src="https://ee-diary.github.io/ic-explorer-assets/configs/pic12f683-config.js"></script>

<!-- HTML scaffold -->
<div id="a13wrap">
  <!-- ... your existing HTML scaffold ... -->
</div>

<!-- PDF.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
<script>if(typeof pdfjsLib!=='undefined')pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';</script>

<!-- Load modular system (order matters!) -->
<script src="https://ee-diary.github.io/ic-explorer-assets/renderers/renderer-factory.js"></script>
<script src="https://ee-diary.github.io/ic-explorer-assets/renderers/dip-renderer.js"></script>
<script src="https://ee-diary.github.io/ic-explorer-assets/renderers/qfp-renderer.js"></script>
<script src="https://ee-diary.github.io/ic-explorer-assets/renderers/custom-renderer.js"></script>
<script src="https://ee-diary.github.io/ic-explorer-assets/core/ic-explorer-base.js"></script>

<!-- Initialize -->
<script>
(function() {
  var C = window.IC_CONFIG;
  
  // Update header
  document.getElementById('hdrTitle').textContent = C.partName;
  document.getElementById('hdrSub').textContent = 'Interactive IC Explorer • ' + C.package + ' • ' + C.pinCount + ' pins';
  document.getElementById('hdrBadge').textContent = C.package;
  document.getElementById('hdrDesign').textContent = 'Design Files — ' + C.partName;
  document.getElementById('awQsTitle').textContent = 'Quick Specs — ' + C.partName;
  document.getElementById('awUploadLabel').innerHTML = C.partName + ' Datasheet (.pdf)<br><span style="font-size:16px;">100% local — no data leaves your browser</span>';
  
  if(C.datasheetURL) {
    document.getElementById('awBtnPdf').onclick = function(){ window.open(C.datasheetURL,'_blank'); };
  }
  
  // Auto-select renderer
  var renderer = RendererFactory.getRenderer(C.package, C.partName);
  ICExplorer.init(C, renderer);
})();
</script>
