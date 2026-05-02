// ============================================================
//  renderers/renderer-factory.js
//  IC Explorer — maps package/partName strings → renderer objects
//
//  LOAD ORDER (in HTML):
//    renderer-factory.js         ← this file
//    dip-renderer.js
//    qfp-renderer.js
//    qfn-renderer.js
//    soic-renderer.js            ← new (SOIC / SOP / SSOP)
//    cpu-socket-renderer.js      ← new (AM5, LGA-*, CPU packages)
//    gpu-renderer.js             ← new (GPU PCIe card packages)
//    custom-board-renderer.js
//    arduino-uno-renderer.js
//    teensy41-renderer.js
//    ic-explorer-base.js
//
//  ROUTING PRIORITY (checked top to bottom — first match wins):
//    1. Named dev-boards  (Arduino Uno, Teensy)  → dedicated renderer
//    2. Generic dev-boards (Arduino, Raspberry Pi) → CustomBoardRenderer
//    3. CPU packages      (partName or package)  → CPUSocketRenderer
//    4. GPU packages      (partName or package)  → GPURenderer
//    5. SOIC / SOP / SSOP (package string)       → SOICRenderer
//    6. QFN / SON / DFN   (package string)       → QFNRenderer
//    7. QFP / LQFP / TQFP (package string)       → QFPRenderer
//    8. DIP               (package string)       → DIPRenderer
//    9. Fallback                                 → DIPRenderer
// ============================================================

var RendererFactory = (function () {
  'use strict';

  /**
   * Returns the correct renderer object for the given package / partName.
   *
   * @param  {string} pkg      — config.package  e.g. 'DIP-28', 'LQFP-64', 'AM5-LGA1718'
   * @param  {string} partName — config.partName e.g. 'ATmega328P', 'AMD Ryzen 5 7600'
   * @returns renderer object with { draw, updatePins }
   */
  function getRenderer(pkg, partName) {
    var p  = (pkg      || '').toLowerCase();
    var pn = (partName || '').toLowerCase();

    // ── 1. Arduino Uno (dedicated renderer) ──────────────────
    if (p.indexOf('arduino uno') >= 0 || pn.indexOf('arduino uno') >= 0) {
      if (typeof window.ArduinoUnoRenderer !== 'undefined') {
        return window.ArduinoUnoRenderer;
      }
    }

    // ── 2. Teensy (dedicated renderer) ───────────────────────
    if (pn.indexOf('teensy') >= 0) {
      if (typeof window.Teensy41Renderer !== 'undefined') {
        return window.Teensy41Renderer;
      }
    }

    // ── 3. Generic dev-boards → CustomBoardRenderer ──────────
    if (
      pn.indexOf('arduino')      >= 0 ||
      pn.indexOf('raspberry pi') >= 0
    ) {
      if (typeof window.CustomBoardRenderer !== 'undefined') {
        return window.CustomBoardRenderer;
      }
    }

    // ── 4. CPU packages → CPUSocketRenderer ──────────────────
    //  Matched by partName (manufacturer + product line) OR
    //  by explicit package strings like AM5-*, LGA-*, BGA-CPU
    if (
      pn.indexOf('ryzen')   >= 0 ||
      pn.indexOf('core i')  >= 0 ||
      pn.indexOf('core ultra') >= 0 ||
      pn.indexOf('xeon')    >= 0 ||
      pn.indexOf('threadripper') >= 0 ||
      pn.indexOf('epyc')    >= 0 ||
      p.indexOf('am5')      >= 0 ||
      p.indexOf('am4')      >= 0 ||
      p.indexOf('lga-')     >= 0 ||
      p.indexOf('lga1')     >= 0 ||
      p.indexOf('sp3')      >= 0 ||
      p.indexOf('sp5')      >= 0
    ) {
      if (typeof window.CPUSocketRenderer !== 'undefined') {
        return window.CPUSocketRenderer;
      }
    }

    // ── 5. GPU packages → GPURenderer ────────────────────────
    //  Matched by partName (NVIDIA RTX/GTX, AMD RX/Radeon) OR
    //  by package strings used for GPU dies
    if (
      pn.indexOf('rtx')      >= 0 ||
      pn.indexOf('gtx')      >= 0 ||
      pn.indexOf('radeon rx') >= 0 ||
      pn.indexOf('rx 6')     >= 0 ||
      pn.indexOf('rx 7')     >= 0 ||
      pn.indexOf('rx 9')     >= 0 ||
      pn.indexOf('arc ')     >= 0 ||  // Intel Arc
      pn.indexOf('geforce')  >= 0 ||
      p.indexOf('gddr')      >= 0 ||
      p.indexOf('gpu-')      >= 0 ||
      p.indexOf('fbga')      >= 0
    ) {
      if (typeof window.GPURenderer !== 'undefined') {
        return window.GPURenderer;
      }
    }

    // ── 6. SOIC / SOP / SSOP (narrow SMD, gull-wing) ─────────
    if (
      p.indexOf('soic') >= 0 ||
      p.indexOf('ssop') >= 0 ||
      (p.indexOf('sop')  >= 0 && p.indexOf('tsop') < 0)
    ) {
      if (typeof window.SOICRenderer !== 'undefined') {
        return window.SOICRenderer;
      }
    }

    // ── 7. QFN / SON / DFN (flush pad, no-lead) ──────────────
    if (p.indexOf('qfn') >= 0 || p.indexOf('son') >= 0 || p.indexOf('dfn') >= 0) {
      if (typeof window.QFNRenderer !== 'undefined') {
        return window.QFNRenderer;
      }
    }

    // ── 8. QFP / LQFP / TQFP (gull-wing, 4-sided) ───────────
    if (p.indexOf('qfp') >= 0 || p.indexOf('lqfp') >= 0 || p.indexOf('tqfp') >= 0) {
      if (typeof window.QFPRenderer !== 'undefined') {
        return window.QFPRenderer;
      }
    }

    // ── 9. DIP ────────────────────────────────────────────────
    if (p.indexOf('dip') >= 0) {
      if (typeof window.DIPRenderer !== 'undefined') {
        return window.DIPRenderer;
      }
    }

    // ── 10. Fallback ──────────────────────────────────────────
    if (typeof window.DIPRenderer !== 'undefined') {
      return window.DIPRenderer;
    }

    throw new Error(
      'RendererFactory: no renderer found for package="' + pkg +
      '" partName="' + partName + '"'
    );
  }

  return { getRenderer: getRenderer };
}());