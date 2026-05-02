# IC Explorer — Project Context & AI Instructions

## What This Project Is

IC Explorer is a modular, web-based interactive microcontroller pinout viewer hosted on GitHub Pages.

Each chip gets its own page. All pages share a common engine, CSS, and renderers loaded from a CDN.

The live asset base is: https://ee-diary.github.io/ic-explorer-assets/

---

## Repository Structure

```
📦 
├─ AI_HARDWARE_SITE_README.md
├─ README.md
├─ configs
│  ├─ .keep
│  ├─ analog
│  │  ├─ lm3914-config.js
│  │  ├─ mc1496-config.js
│  │  ├─ mp1584-config.js
│  │  └─ op-amp
│  │     ├─ lm324-config.js
│  │     ├─ lm358-config.js
│  │     └─ tl072-config.js
│  ├─ boards
│  │  ├─ arduino-uno-config.js
│  │  ├─ rasberry-pi3-config.js
│  │  └─ teensy41-config.js
│  ├─ cpu
│  │  └─ ryzen5-7600-config.js
│  ├─ digital
│  │  ├─ 74hc4051-config.js
│  │  ├─ 74hc595-config.js
│  │  ├─ dm7486n-config.js
│  │  └─ ne555-timer-config.js
│  ├─ interface
│  │  ├─ ch340g-config.js
│  │  ├─ cp2102-config.js
│  │  ├─ ft232rl-config.js
│  │  ├─ max7219-config.js
│  │  ├─ mcp2515-config.js
│  │  └─ pca9685-config.js
│  ├─ mcu
│  │  ├─ arm
│  │  │  └─ rp2350-config.js
│  │  ├─ avr
│  │  │  ├─ atmega2560-config.js
│  │  │  ├─ atmega32-config.js
│  │  │  ├─ atmega328p-config.js
│  │  │  ├─ atmega32u4-config.js
│  │  │  ├─ attiny13-config.js
│  │  │  ├─ attiny45-config.js
│  │  │  └─ attiny85-config.js
│  │  ├─ msp430
│  │  │  ├─ msp430f5529-config.js
│  │  │  ├─ msp430fr5994-config.js
│  │  │  └─ msp430g2553-config.js
│  │  ├─ pic
│  │  │  ├─ pic12f683-config.js
│  │  │  ├─ pic16f877a-config.js
│  │  │  └─ pic18f4550-config.js
│  │  └─ stm32
│  │     ├─ stm32f103c8t6-config.js
│  │     ├─ stm32f401re-config.js
│  │     └─ stm32l4r5zit6-config.js
│  ├─ mixed
│  │  ├─ ads1115-config.js
│  │  ├─ l293d-config.js
│  │  ├─ mp2307-config.js
│  │  └─ mpu-6050-config.js
│  ├─ pmic
│  │  ├─ lm2596-config.js
│  │  ├─ mp2315-config.js
│  │  └─ tp4056-config.js
│  └─ soc
│     └─ nrf52840-config.js
├─ core
│  ├─ .keep
│  ├─ ic-explorer-base.js
│  └─ ic-explorer-core.css
├─ dip-renderer.js
├─ flashers
│  ├─ stk500-flasher.js
│  └─ webdfu.js
├─ ic-explorer-core.css
├─ ic-explorer-engine.js
├─ qfp-renderer.js
└─ renderers
   ├─ .keep
   ├─ arduino-uno-renderer.js
   ├─ cpu-socket-renderer.js
   ├─ custom-board-renderer.js
   ├─ dip-renderer.js
   ├─ gpu-renderer.js
   ├─ qfn-renderer.js
   ├─ qfp-renderer.js
   ├─ renderer-factory.js
   ├─ soic-renderer.js
   └─ teensy41-renderer.js

---

## How a Chip Page Works (6-step load order)

Every chip HTML page loads in this exact order — do not change the order:

```html
<!-- 1. Shared CSS -->
<link rel="stylesheet" href="https://ee-diary.github.io/ic-explorer-assets/core/ic-explorer-core.css">

<!-- 2. Chip-specific config (the ONLY file you write per standard IC chip) -->
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

## The Config File — window.IC_CONFIG (standard ICs only)

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

  // ── CUSTOM TYPE COLOURS (optional) ───────────────────────────
  // Define this block ONLY when the chip uses pin types that are not
  // in the standard palette (GPIO, ADC, PWR, GND, UART, SPI, I2C,
  // USB, CAN, PWM, TIMER, XTAL, RESET, JTAG, BOOT, INT, COMP).
  //
  // Use this for chips with chip-specific functional groups, such as:
  //   - Analog MUX channels (74HC4051 → CH, COM, SEL, EN, VEE)
  //   - Op-amp pins (IN+, IN-, OUT)
  //   - Comparator pins
  //   - Any other non-standard pin role
  //
  // Each key is a short type name used in pins[].type and pins[].funcs.
  // Values: c = text/stroke colour, bg = fill background, bd = border colour.
  //
  // The engine merges these into its colour palette at init time,
  // so getColor('CH') etc. will resolve correctly everywhere
  // (pin body, detail panel badge, pin list tag, legend, tooltip).
  //
  // OMIT this block entirely for standard microcontrollers — it is only
  // needed when the chip's functions cannot be expressed with the
  // built-in type names above.
  customTypes: {
    CH:  { c: '#f4a261', bg: 'rgba(244,162,97,.12)',  bd: 'rgba(244,162,97,.35)'  },
    SEL: { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  },
    COM: { c: '#c8a850', bg: 'rgba(200,168,80,.14)',  bd: 'rgba(200,168,80,.35)'  },
    EN:  { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  },
    VEE: { c: '#c078ff', bg: 'rgba(192,120,255,.11)', bd: 'rgba(192,120,255,.28)' },
  },

  // ── FILTER BUTTONS (optional — replaces default GPIO/PWM/ADC/... set) ────
  //
  // *** DECISION RULE — READ THIS BEFORE WRITING PINS ***
  //
  // Ask: do the chip's pin functions map naturally onto the standard types?
  //   GPIO, ADC, PWR, GND, UART, SPI, I2C, USB, CAN,
  //   PWM, TIMER, XTAL, RESET, JTAG, BOOT, INT, COMP
  //
  //   YES → standard microcontroller (PIC, STM32, AVR, etc.)
  //         Omit filterButtons entirely. The engine shows the default
  //         button set and only renders buttons for types that actually
  //         appear in the pins array (unused buttons are hidden).
  //
  //   NO  → specialist chip (analog MUX, op-amp, comparator, gate, etc.)
  //         Define customTypes (above) for any new type names, then
  //         define filterButtons (below) to control exactly which buttons
  //         appear and in what order.
  //
  // When filterButtons IS present the engine uses ONLY these entries —
  // the entire default set is suppressed. List every type the user needs
  // to filter by, including PWR and GND if relevant.
  //
  // Fields per entry:
  //   type  — must exactly match the type/funcs values used in pins[]
  //   label — human-readable text shown on the button (keep it short)
  //   color — hex accent colour (use the matching value from customTypes.c,
  //           or a standard palette colour for PWR/GND)
  //
  // Example — 74HC4051 8-channel analog MUX:
  filterButtons: [
    { type: 'CH',  label: 'Channel (Y0–Y7)', color: '#f4a261' },
    { type: 'COM', label: 'COM (Z)',          color: '#c8a850' },
    { type: 'SEL', label: 'Select (A/B/C)',   color: '#50c8a0' },
    { type: 'EN',  label: 'Enable (/E)',      color: '#ff9944' },
    { type: 'VEE', label: 'VEE',              color: '#c078ff' },
    { type: 'PWR', label: 'VCC',              color: '#ff6b6b' },
    { type: 'GND', label: 'GND',              color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // RULES:
  //   • Every pin must have ALL fields: num, id, lbl, name, type, funcs, volt, curr, note
  //   • id must be unique across all pins
  //   • type must be one of the standard allowed values OR a key defined in customTypes
  //   • funcs is an array — must contain values that match filterButtons[].type
  //     (or standard type names if filterButtons is omitted)
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
  // Standard allowed type values (built-in colours — no customTypes needed):
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
  altFuncs: {
    'MCLR': ['VPP'],
    'RA0':  ['AN0'],
    'RC3':  ['SCK', 'SCL'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    {label: 'Flash',      value: '14 KB',         color: '#e0e5ec'},
    {label: 'SRAM',       value: '368 bytes',      color: '#e0e5ec'},
    {label: 'Max Freq',   value: '20 MHz',         color: '#c8a850'},
    {label: 'Supply',     value: '2.0–5.5V',       color: '#78c878'},
    {label: 'Interfaces', value: 'SPI + I²C + UART'},
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    {label: 'Architecture', value: '8-bit PIC RISC'},
    {label: 'Flash',        value: '14 KB (8K × 14-bit words)'},
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    '35 single-word instructions, most execute in 1 cycle',
    '10-bit ADC with 8 multiplexed channels',
  ],
};
```

---

## Filter Buttons — When to Use the Default Set vs. Custom

This is the most common mistake when adding a new chip. Follow this decision tree:

```
Is this chip a general-purpose microcontroller
(PIC, STM32, AVR, ESP, NXP Kinetis, etc.)?
│
├── YES → Omit both customTypes and filterButtons.
│         Use only standard type values in pins[].type and pins[].funcs.
│         The engine automatically shows only the buttons relevant to
│         the types present in the pins array.
│         Standard types: GPIO ADC PWR GND UART SPI I2C USB CAN
│                         PWM TIMER XTAL RESET JTAG BOOT INT COMP
│
└── NO  → Does the chip have functional groups not in the standard list?
          (e.g. analog channels, MUX select lines, op-amp inputs,
          inhibit/enable controls, negative supply rails, etc.)
          │
          ├── YES → 1. Define customTypes for each new type name.
          │         2. Define filterButtons listing every button needed,
          │            including PWR and GND if you want them shown.
          │         3. Use the custom type names in pins[].type and
          │            pins[].funcs throughout the pins array.
          │
          └── NO  → Standard types cover it — omit both blocks.
```

### Examples by chip category

| Chip type | filterButtons needed? | Reason |
|---|---|---|
| PIC16F877A (MCU) | No | All pins map to GPIO, ADC, UART, SPI, I2C, PWM, XTAL, RESET |
| STM32F103 (MCU) | No | Standard types cover all functions |
| 74HC4051 (analog MUX) | **Yes** | Needs CH, SEL, COM, EN, VEE — none exist in standard set |
| LM358 (op-amp) | **Yes** | Needs IN+, IN−, OUT, PWR, GND |
| 74HC00 (NAND gate) | **Yes** | Needs INPUT, OUTPUT, PWR, GND |
| NE555 (timer IC) | **Yes** | Needs TRIG, THR, OUT, RST, CV, DIS, PWR, GND |

---

## Colour Palette (shared across all renderers and the engine)

### Standard built-in colours

```
GPIO  #78c878 (green)     PWR   #ff6b6b (red)       GND   #a8a8a8 (grey)
ADC   #c8a850 (gold)      SPI   #4a9aee (blue)       I2C   #9898d8 (purple)
UART  #cc6888 (pink)      USB   #4a9aee (blue)       CAN   #ff9944 (orange)
PWM   #50c8c8 (cyan)      TIMER #50c8c8 (cyan)       XTAL  #7090a8 (steel)
RESET #ff9944 (orange)    JTAG  #c8a850 (gold)       BOOT  #50c8c8 (cyan)
INT   #c8a850 (gold)      COMP  #ff9944 (orange)
```

### Extending the palette with customTypes

When a chip needs types outside the list above, define them in `customTypes`.
The engine merges these into its internal colour map at init time so that pin
bodies, detail panel badges, pin list tags, the legend, and tooltips all pick
up the correct colour automatically — no other files need to change.

```js
customTypes: {
  // key    text colour   fill background          border colour
  CH:  { c: '#f4a261', bg: 'rgba(244,162,97,.12)',  bd: 'rgba(244,162,97,.35)'  },
  SEL: { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  },
},
```

Suggested colours for common specialist types:

```
Analog channel   #f4a261 (amber)     Select / address  #50c8a0 (teal)
Common / COM     #c8a850 (gold)      Enable / inhibit  #ff9944 (orange)
Negative rail    #c078ff (violet)    Op-amp input      #4a9aee (blue)
Op-amp output    #78c878 (green)     Clock input       #7090a8 (steel)
```

---

## Renderer Selection Rules (renderer-factory.js)

| Package string contains | Renderer used |
|---|---|
| `DIP` | `DIPRenderer` — 2 sides, left + right |
| `QFP`, `LQFP`, `TQFP` | `QFPRenderer` — 4 sides, counter-clockwise from pin 1 |
| Raspberry Pi / Arduino / Teensy (by partName) | `CustomBoardRenderer` or a dedicated board renderer |

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

## Task Instructions for the AI

### Standard IC Chips (DIP / QFP / LQFP / TQFP)

When adding a standard IC, you must:

1. **Read the chip provided** (attached file, datasheet excerpt, or description)
   and identify: part number, manufacturer, package type, pin count, all pin functions.

2. **Determine the renderer** from the package string using the table above.

3. **Decide whether this chip needs custom filter buttons.**
   Before writing a single pin, ask: do all the chip's functional groups map onto
   the standard type names (GPIO, ADC, UART, SPI, I2C, PWM, TIMER, XTAL, RESET,
   JTAG, BOOT, INT, COMP, USB, CAN, PWR, GND)?

   - **Standard MCU** (PIC, STM32, AVR, ESP, etc.) → use only standard types,
     omit `customTypes` and `filterButtons` entirely.

   - **Specialist chip** (analog MUX, op-amp, comparator, logic gate, timer IC,
     level shifter, etc.) → define `customTypes` for every new type name, then
     define `filterButtons` listing the buttons in the order you want them shown.
     Every type used in `pins[].type` or `pins[].funcs` must have a matching entry
     in either the standard palette or `customTypes`.

4. **Write only `configs/CHIPNAME-config.js`** — this is the only file needed per chip.
   - Extract every pin: num, id, lbl, name, type, funcs, volt, curr, note
   - For DIP: include `_rightSlot` on all right-side pins
   - For QFP: order pins strictly LEFT→BOTTOM→RIGHT→TOP counter-clockwise
   - Include `dipConfig` or `qfpConfig` layout block matching the package
   - Include `customTypes` + `filterButtons` if the chip needs them (see step 3)
   - Populate altFuncs, quickSpecs, dsSpecs, dsFeatures from the datasheet

5. **If the package is QFP/LQFP/TQFP**, also check whether `qfp-renderer.js`
   needs updating — specifically confirm it has:
   - `draw(svg, config)` — draws all 4 sides
   - `updatePins(selectedId, filterType, filterFn)` — handles all 4 visual states

   If either is missing or broken, rewrite `qfp-renderer.js` in full.

6. **Do NOT modify** these files unless there is a specific bug to fix:
   - `ic-explorer-core.css`
   - `ic-explorer-base.js`
   - `renderer-factory.js`
   - `dip-renderer.js`
   - `custom-board-renderer.js`

7. **Output format**: provide the complete file(s) ready to drop into the repo.
   Name files exactly as: `configs/CHIPNAME-config.js`
   Use lowercase-hyphenated chip names: `pic16f877a`, `stm32f103c8t6`, `attiny85`, etc.

8. **Flag these issues** if you spot them:
   - Filename vs. chip identity mismatch (e.g. file named F401 but contains F103 data)
   - Hardcoded API keys in any file
   - Pin count mismatch between `pinCount` field and actual `pins` array length
   - Pins array not sorted in the correct side order for the package type
   - Custom type used in `pins[].type` or `pins[].funcs` but not defined in `customTypes`
   - `filterButtons` defined but a pin's `funcs` value has no matching button entry
     (that pin will never be highlightable via the filter UI)

---

### Custom Boards (Raspberry Pi, Arduino, Teensy, and similar dev boards)

Custom boards are fundamentally different from standard ICs. They have complex physical
outlines, irregular connector positions, mixed voltage rails, and board-specific visual
geometry that cannot be expressed in a simple config file alone.

When adding or converting a custom board, you must:

1. **Analyse the existing code first.**
   Before writing anything, read all provided files in full — HTML, JS, CSS, or any
   monolithic page. Understand what is already implemented: what the drawing logic does,
   how pins are positioned, what interactions exist, and what is hardcoded vs. data-driven.

2. **Decide the right file structure for that board.**
   There is no fixed rule. Use your judgment after analysing the code. The goal is clean,
   maintainable separation. Some boards may need only a config + a small extension to
   `custom-board-renderer.js`. Others may need a dedicated board file in `boards/`, a
   new standalone renderer, or both. Choose the structure that best fits the board's
   actual complexity — do not force every board into the same pattern.

   Typical structures you may arrive at (but are not limited to):

   - **Simple board**: `configs/BOARDNAME-config.js` + minor update to `custom-board-renderer.js`
   - **Medium board**: `configs/BOARDNAME-config.js` + `boards/BOARDNAME-board.js` (geometry/outline)
   - **Complex board**: `configs/BOARDNAME-config.js` + `boards/BOARDNAME-board.js` + a new
     dedicated `renderers/BOARDNAME-renderer.js` if the existing renderer cannot handle the layout

3. **Create new JS files whenever the existing architecture is insufficient.**
   You are explicitly permitted to create new files — new renderers, new board geometry
   modules, new utility helpers — if the current code cannot cleanly support the board.
   Do not try to shoehorn complex board logic into `custom-board-renderer.js` if it would
   make that file a mess. A new focused file is always better than a bloated shared one.

4. **Keep all new files self-contained and clearly named.**
   - Board geometry files go in `boards/` and are named `BOARDNAME-board.js`
   - New renderers go in `renderers/` and are named `BOARDNAME-renderer.js`
   - Each file must register itself on `window` (e.g. `window.RaspberryPi4BBoard = ...`)
     so it is accessible after a plain `<script>` tag load — no module bundler is used
   - Every new renderer must implement the same interface as existing renderers:
     `draw(svg, config)` and `updatePins(selectedId, filterType, filterFn)`

5. **Update `renderer-factory.js` if you add a new renderer.**
   Add the new board's partName match and return the correct renderer object.
   Do not break existing entries.

6. **Preserve backward compatibility.**
   Existing chip pages must continue to work without any changes after your new files
   are added. Do not alter shared files (`ic-explorer-base.js`, `ic-explorer-core.css`,
   `renderer-factory.js`) beyond what is strictly necessary for the new board.

7. **Pin highlight behaviour must match the standard.**
   All five visual states (Default, Hover, Selected, Filter match, Filter no-match) must
   behave identically to the PIC16F877A reference page, regardless of which renderer
   draws the board.

8. **Output format**: provide every new or modified file in full, ready to drop into the repo.
   List the files clearly at the top of your response so it is obvious what needs to be
   created or replaced.

9. **Flag these issues** if you spot them:
   - Logic that can be shared with existing renderers but has been duplicated instead
   - Hardcoded pixel positions that should be driven by config data
   - Pin interactions (hover, select, filter) that are missing or inconsistent
   - Any file that grows beyond ~400 lines and could be split further

---

## Reference: Existing Config Files for Style Matching

When writing a new config, match the style of `pic16f877a-config.js` exactly:

- Align columns in the pins array for readability
- Write full-sentence notes (not abbreviations)
- Use the same colour values from the palette above
- List `funcs` from most-primary to least-primary
- For specialist chips, always define `customTypes` before `filterButtons`,
  and always define `filterButtons` before `pins`

The gold standard for pin highlighting behaviour is the PIC16F877A page.
All new renderers must produce identical visual behaviour to that page.
