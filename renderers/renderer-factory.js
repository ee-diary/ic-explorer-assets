// ============================================================
//  renderers/renderer-factory.js
//  IC Explorer — maps package/partName strings → renderer objects
//
//  LOAD ORDER (in HTML):
//    renderer-factory.js       ← this file
//    dip-renderer.js
//    qfp-renderer.js
//    custom-board-renderer.js
//    arduino-uno-renderer.js   ← new
//    ic-explorer-base.js
// ============================================================

var RendererFactory = (function () {
  'use strict';

  /**
   * Returns the correct renderer object for the given package / partName.
   *
   * @param  {string} pkg      — config.package  e.g. 'DIP-28', 'LQFP-64', 'Arduino Uno'
   * @param  {string} partName — config.partName e.g. 'ATmega328P', 'Arduino Uno R3'
   * @returns renderer object with { draw, updatePins }
   */
  function getRenderer(pkg, partName) {
    var p   = (pkg      || '').toLowerCase();
    var pn  = (partName || '').toLowerCase();

    // ── Arduino Uno ───────────────────────────────────────────
    if (p.indexOf('arduino uno') >= 0 || pn.indexOf('arduino uno') >= 0) {
      if (typeof window.ArduinoUnoRenderer !== 'undefined') {
        return window.ArduinoUnoRenderer;
      }
    }

    // ── Other Arduino / Teensy / dev-boards → CustomBoardRenderer
    if (
      pn.indexOf('arduino') >= 0 ||
      pn.indexOf('teensy')  >= 0 ||
      pn.indexOf('raspberry pi') >= 0
    ) {
      if (typeof window.CustomBoardRenderer !== 'undefined') {
        return window.CustomBoardRenderer;
      }
    }

    // ── QFP / LQFP / TQFP / QFN (all 4-sided SMD packages) ──
    if (p.indexOf('qfp') >= 0 || p.indexOf('lqfp') >= 0 || p.indexOf('tqfp') >= 0 || p.indexOf('qfn') >= 0) {
      if (typeof window.QFPRenderer !== 'undefined') {
        return window.QFPRenderer;
      }
    }

    // ── DIP (default for all DIP-N packages) ──────────────────
    if (p.indexOf('dip') >= 0) {
      if (typeof window.DIPRenderer !== 'undefined') {
        return window.DIPRenderer;
      }
    }

    // ── Fallback — DIPRenderer handles most standard ICs ──────
    if (typeof window.DIPRenderer !== 'undefined') {
      return window.DIPRenderer;
    }

    throw new Error('RendererFactory: no renderer found for package="' + pkg + '" partName="' + partName + '"');
  }

  return { getRenderer: getRenderer };
}());