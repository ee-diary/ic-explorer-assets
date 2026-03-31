 # IC Explorer — Project Context & AI Instructions

## What This Project Is

IC Explorer is a modular, web-based interactive microcontroller pinout viewer hosted on GitHub Pages.

Each chip gets its own page. All pages share a common engine, CSS, and renderers loaded from a CDN.

The live asset base is: https://ee-diary.github.io/ic-explorer-assets/

## Repository Structure

ic-explorer-assets/

├── core/

│   ├── ic-explorer-core.css      # Shared dark-theme UI styles (tabs, panels, badges, tooltip, pin list)

│   └── ic-explorer-base.js       # Shared engine: tab switching, pin selection, filter buttons,

│                                 # tooltip, pin list, detail panel, calls renderer.draw() and

│                                 # renderer.updatePins() on every state change

├── renderers/

│   ├── renderer-factory.js       # Maps package string → correct renderer object

│   │                             # DIP-* → DIPRenderer, LQFP/QFP/TQFP → QFPRenderer,

│   │                             # Raspberry Pi / Arduino / Teensy → CustomBoardRenderer

│   ├── dip-renderer.js           # Draws 2-sided DIP packages (left + right columns of pins)

│   ├── qfp-renderer.js           # Draws 4-sided QFP/LQFP packages with full highlight parity

│   └── custom-board-renderer.js  # Draws dev-board outlines (Raspberry Pi, Arduino, etc.)

├── configs/                      # ONE FILE PER CHIP — this is the only file you create per chip

│   ├── pic16f877a-config.js

│   ├── pic18f4550-config.js

│   └── stm32f103c8t6-config.js

├── ic-explorer-core.css          # Kept for backward compatibility (same file as core/)

├── ic-explorer-engine.js         # Legacy monolithic engine — kept for backward compatibility only

└── ic-explorer-shell.html        # Reference HTML scaffold (copy this for each new chip page)



## How a Chip Page Works (6-step load order)

Every chip HTML page loads in this exact order — do not change the order:

```html

<!-- 1. Shared CSS -->

<link rel="stylesheet" href="https://ee-diary.github.io/ic-explorer-assets/core/ic-explorer-core.css">

<!-- 2. Chip-specific config (the ONLY file you write per chip) -->

<script src="https://ee-diary.github.io/ic-explorer-assets/configs/CHIPNAME-config.js"></script>

<!-- 3. HTML scaffold (identical on every page — copy from ic-explorer-shell.html) -->

<div id="a13wrap"> ... </div>

<!-- 4. PDF.js (in-browser datasheet parser, no data leaves the browser) -->

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>

<script>if(typeof pdfjsLib!=='undefined')pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';</script>

<!-- 5. Renderers + Engine (ORDER MATTERS — factory and renderers before base) -->

<script src="https://ee-diary.github.io/ic-explorer-assets/renderers/renderer-factory.js"></script>

<script src="https://ee-diary.github.io/ic-explorer-assets/renderers/dip-renderer.js"></script>

<script src="https://ee-diary.github.io/ic-explorer-assets/renderers/qfp-renderer.js"></script>

<script src="https://ee-diary.github.io/ic-explorer-assets/renderers/custom-board-renderer.js"></script>

<script src="https://ee-diary.github.io/ic-explorer-assets/core/ic-explorer-base.js"></script>



<!-- 6. Boot script (populates header from config, selects renderer, calls ICExplorer.init) -->

<script>

(function() {

  var C = window.IC_CONFIG;

  document.getElementById('hdrTitle').textContent = C.partName;

  document.getElementById('hdrSub').textContent = 'Interactive IC Explorer • ' + C.package + ' • ' + C.pinCount + ' pins';

  document.getElementById('hdrBadge').textContent = C.package;

  document.getElementById('hdrDesign').textContent = 'Design Files — ' + C.partName;

  document.getElementById('awQsTitle').textContent = 'Quick Specs — ' + C.partName;

  if (C.datasheetURL) {

    document.getElementById('awBtnPdf').onclick = function() { window.open(C.datasheetURL, '_blank'); };

  }

  var renderer = RendererFactory.getRenderer(C.package, C.partName);

  ICExplorer.init(C, renderer);

})();

</script>

```

---

## The Config File — window.IC_CONFIG (the ONLY thing you write per chip)

```js

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────

  partName:     'CHIPNAME',          // shown in header title

  partMPN:      'CHIPNAME-I/P',      // full Microchip/ST/NXP part number

  manufacturer: 'MANUFACTURER',      // e.g. 'MICROCHIP', 'STMicroelectronics', 'NXP'

  package:      'DIP-40',            // exact string used by renderer-factory.js to pick renderer

  pinCount:     40,                  // total number of pins

  // ── LINKS ─────────────────────────────────────────────────────

  snapPageURL:  'https://www.snapeda.com/parts/...',

  downloadURL:  'https://www.snapeda.com/parts/...?ref=snapeda',

  datasheetURL: 'https://...',

  // ── LAYOUT HINT (DIP only) ────────────────────────────────────

  // Required when package contains 'DIP'. Remove for QFP packages.

  dipConfig: {

    pinsPerSide: 20,   // half of pinCount

    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 700,

    pinLength: 34, pinWidthHalf: 16,

    notchSize: 8, notchX: 14, notchY: 14,

    textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },

    labelSize: 11, pinNumSize: 14, yOffset: -60

  },

  // ── LAYOUT HINT (QFP only) ────────────────────────────────────

  // Required when package contains 'QFP' or 'LQFP' or 'TQFP'. Remove for DIP.

  qfpConfig: {

    pinsPerSide: 12,   // pinCount / 4

    bodySize: 400,

    pinLength: 28, pinWidth: 20, pinGap: 2

  },

  // ── PINS ──────────────────────────────────────────────────────

  // RULES:

  //   • Every pin must have ALL fields: num, id, lbl, name, type, funcs, volt, curr, note

  //   • id must be unique across all pins

  //   • type must be one of the allowed values listed below

  //   • funcs is an array — drives the filter buttons in the UI

  //

  // DIP pin ordering:

  //   Pins 1..N/2   → left side, top → bottom (no _rightSlot)

  //   Pins N/2+1..N → right side, use _rightSlot: 0=top-right, N/2-1=bottom-right

  //

  // QFP pin ordering (counter-clockwise, pin 1 at top-left):

  //   Pins 1..pps        → LEFT side,   top → bottom

  //   Pins pps+1..2*pps  → BOTTOM side, left → right

  //   Pins 2*pps+1..3*pps → RIGHT side,  bottom → top

  //   Pins 3*pps+1..4*pps → TOP side,    right → left

  //

  // Allowed type values (controls colour in both renderers):

  //   GPIO | ADC | PWR | GND | UART | SPI | I2C | USB | CAN |

  //   PWM  | TIMER | XTAL | RESET | JTAG | BOOT | INT | COMP

  //

  pins: [

    {

      num:  1,

      id:   'MCLR',           // unique machine id — used for selection, altFuncs key

      lbl:  'MCLR',           // short label shown ON the IC body (≤6 chars)

      name: 'MCLR / VPP',     // full descriptive name shown in detail panel header

      type: 'RESET',          // primary type — controls colour

      funcs: ['RESET'],       // array of function tags — drives filter buttons

      volt: '5V',             // operating voltage string

      curr: 'N/A',            // max current string

      note: 'Master Clear (Reset) input — active low. ...'   // shown in detail panel

      // _rightSlot: 0        // DIP RIGHT side only: 0=top-right slot

    },

    // ... repeat for every pin

  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────

  // Key = pin id. Value = array of alternate function strings.

  // Shown as chips in the "Alt Functions" section of the detail panel.

  altFuncs: {

    'MCLR': ['VPP'],

    'RA0':  ['AN0'],

    'RC3':  ['SCK', 'SCL'],

    // ...

  },

  // ── QUICK SPECS (right-panel sidebar summary) ─────────────────

  quickSpecs: [

    {label: 'Flash',      value: '14 KB',         color: '#e0e5ec'},

    {label: 'SRAM',       value: '368 bytes',      color: '#e0e5ec'},

    {label: 'Max Freq',   value: '20 MHz',         color: '#c8a850'},

    {label: 'Supply',     value: '2.0–5.5V',       color: '#78c878'},

    {label: 'Interfaces', value: 'SPI + I²C + UART'},

    // color is optional — use type colours for visual grouping

  ],

  // ── DETAILED SPECS (Datasheet tab table) ──────────────────────

  dsSpecs: [

    {label: 'Architecture', value: '8-bit PIC RISC'},

    {label: 'Flash',        value: '14 KB (8K × 14-bit words)'},

    // ...

  ],

  // ── KEY FEATURES (Datasheet tab list) ────────────────────────

  dsFeatures: [

    '35 single-word instructions, most execute in 1 cycle',

    '10-bit ADC with 8 multiplexed channels',

    // ...

  ],

};

```

---

## Renderer Selection Rules (renderer-factory.js)

| Package string contains | Renderer used |

|---|---|

| `DIP` | `DIPRenderer` — 2 sides, left + right |

| `QFP`, `LQFP`, `TQFP` | `QFPRenderer` — 4 sides, counter-clockwise from pin 1 |

| Raspberry Pi / Arduino / Teensy (by partName) | `CustomBoardRenderer` |

The factory is called automatically by the boot script — you never call it manually.

---

## Pin Highlight Behaviour (both renderers must match this)

| State | Fill | Stroke | SVG Filter | Label colour | Opacity |

|---|---|---|---|---|---|

| Default | type-colour tint (semi-transparent) | type colour | none | type colour | 1.0 |

| Hover (CSS) | — | — | `brightness(1.9) drop-shadow` | — | 1.0 |

| Selected | solid type colour | type colour | `url(#pinGlow)` | `#060c1a` dark | 1.0 |

| Filter match | solid filter colour | filter colour | `url(#pinGlow)` | `#060c1a` dark | 1.0 |

| Filter no-match | near-black | near-invisible | none | near-invisible | **0.08** |

---

## Colour Palette (shared across all renderers and the engine)

```

GPIO  #78c878 (green)     PWR   #ff6b6b (red)       GND   #a8a8a8 (grey)

ADC   #c8a850 (gold)      SPI   #4a9aee (blue)       I2C   #9898d8 (purple)

UART  #cc6888 (pink)      USB   #4a9aee (blue)       CAN   #ff9944 (orange)

PWM   #50c8c8 (cyan)      TIMER #50c8c8 (cyan)       XTAL  #7090a8 (steel)

RESET #ff9944 (orange)    JTAG  #c8a850 (gold)       BOOT  #50c8c8 (cyan)

INT   #c8a850 (gold)      COMP  #ff9944 (orange)

```

---

## Task Instructions for the AI

When I give you a new chip to add, you must:

1. **Read the chip I provide** (attached file, datasheet excerpt, or description)

   and identify: part number, manufacturer, package type, pin count, all pin functions.

2. **Determine the renderer** from the package string using the table above.

3. **Write only `configs/CHIPNAME-config.js`** — this is the only file needed per chip.

   - Extract every pin: num, id, lbl, name, type, funcs, volt, curr, note

   - For DIP: include `_rightSlot` on all right-side pins

   - For QFP: order pins strictly LEFT→BOTTOM→RIGHT→TOP counter-clockwise

   - Include `dipConfig` or `qfpConfig` layout block matching the package

   - Populate altFuncs, quickSpecs, dsSpecs, dsFeatures from the datasheet

4. **If the package is QFP/LQFP/TQFP**, also check whether `qfp-renderer.js`

   needs updating — specifically confirm it has:

   - `draw(svg, config)` — draws all 4 sides

   - `updatePins(selectedId, filterType, filterFn)` — handles all 4 visual states

   If either is missing or broken, rewrite `qfp-renderer.js` in full.

5. **Do NOT modify** these files unless there is a specific bug to fix:

   - `ic-explorer-core.css`

   - `ic-explorer-base.js`

   - `renderer-factory.js`

   - `dip-renderer.js`

   - `custom-board-renderer.js`

6. **Output format**: provide the complete file(s) ready to drop into the repo.

   Name files exactly as: `configs/CHIPNAME-config.js`

   Use lowercase-hyphenated chip names: `pic16f877a`, `stm32f103c8t6`, `attiny85`, etc.

7. **Flag these issues** if you spot them:

   - Filename vs. chip identity mismatch (e.g. file named F401 but contains F103 data)

   - Hardcoded API keys in any file

   - Pin count mismatch between `pinCount` field and actual `pins` array length

   - Pins array not sorted in the correct side order for the package type

## Reference: Existing Config Files for Style Matching

When writing a new config, match the style of `pic16f877a-config.js` exactly:

- Align columns in the pins array for readability

- Write full-sentence notes (not abbreviations)

- Use the same colour values from the palette above

- List `funcs` from most-primary to least-primary

The gold standard for pin highlighting behaviour is the PIC16F877A page.

All new renderers must produce identical visual behaviour to that page.
