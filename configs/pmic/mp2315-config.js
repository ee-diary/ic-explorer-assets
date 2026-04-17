// configs/mp2315-config.js
// MP2315 — High Efficiency 3A, 24V, 500kHz Synchronous Step-Down Converter
// Package: TSOT23-8 (8-pin SOT23), Manufacturer: Monolithic Power Systems (MPS)
// Datasheet Rev 1.01 — pin functions confirmed from MPS official datasheet

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'MP2315',
  partMPN:      'MP2315GJ-Z',
  manufacturer: 'Monolithic Power Systems',
  package:      'TSOT23-8',
  pinCount:     8,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/MP2315GJ-Z/Monolithic+Power+Systems/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/MP2315GJ-Z/Monolithic+Power+Systems/view-part/?ref=snapeda',
  datasheetURL: 'https://www.monolithicpower.com/en/documentview/productdocument/index/version/2/document_type/Datasheet/lang/EN/sku/MP2315GJ',

  // ── DIP LAYOUT (TSOT23-8 rendered as DIP-8 for the explorer) ──
  dipConfig: {
    pinsPerSide:  4,
    bodyX:        122, bodyY: 80, bodyW: 260, bodyH: 320,
    pinLength:    34,  pinWidthHalf: 16,
    notchSize:    8,   notchX: 14, notchY: 14,
    textSizes:    { mfr: 11, part: 20, pkg: 13, pinCount: 11 },
    labelSize:    11,  pinNumSize: 13, yOffset: -20
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  // MP2315 is a specialist power IC — none of its functional roles
  // map onto the standard MCU palette (GPIO, ADC, UART, etc.).
  // SW, BST, FB, AAM are buck-converter-specific and need custom types.
  customTypes: {
    SW:  { c: '#f4a261', bg: 'rgba(244,162,97,.13)',  bd: 'rgba(244,162,97,.38)'  },  // switch node — amber
    BST: { c: '#4a9aee', bg: 'rgba(74,154,238,.12)',  bd: 'rgba(74,154,238,.35)'  },  // bootstrap — blue
    FB:  { c: '#c8a850', bg: 'rgba(200,168,80,.13)',  bd: 'rgba(200,168,80,.35)'  },  // feedback — gold
    AAM: { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  },  // light-load mode — teal
    VCC: { c: '#e07070', bg: 'rgba(224,112,112,.12)', bd: 'rgba(224,112,112,.33)' },  // internal bias supply
    EN:  { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  },  // enable / sync
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'PWR', label: 'VIN(Power)',   color: '#ff6b6b', fontSize:"12px" },
    { type: 'SW',  label: 'SW(Switch)', color: '#f4a261', fontSize:"12px"},
    { type: 'BST', label: 'BST(Bootstrap)',  color: '#4a9aee', fontSize:"11px" },
    { type: 'EN',  label: 'EN / SYNC',        color: '#ff9944' },
    { type: 'FB',  label: 'FB(Feedback)',    color: '#c8a850', fontSize:"12px" },
    { type: 'AAM', label: 'AAM(Light-Load)', color: '#50c8a0', fontSize:"11px" },
    { type: 'VCC', label: 'VCC(Bias)',       color: '#e07070' },
    { type: 'GND', label: 'GND',              color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // TSOT23-8 physical pin order (standard SOT23-8 numbering):
  //   Left side  (top → bottom): pins 1, 2, 3, 4
  //   Right side (top → bottom): pins 8, 7, 6, 5   (_rightSlot 0..3)
  //
  // MP2315 TSOT23-8 pinout (from MPS datasheet):
  //   Pin 1 — AAM    Pin 8 — FB
  //   Pin 2 — IN     Pin 7 — VCC
  //   Pin 3 — SW     Pin 6 — EN
  //   Pin 4 — GND    Pin 5 — BST
  pins: [
    {
      num:  1,
      id:   'AAM',
      lbl:  'AAM',
      name: 'AAM — Advanced Asynchronous Modulation',
      type: 'AAM',
      funcs: ['AAM'],
      volt: '0–VCC',
      curr: 'N/A',
      note: 'Light-load mode control pin. Connect a resistor divider from a supply to this pin to force non-synchronous (diode-emulation) operation under light-load for improved efficiency. Tie to VCC or leave floating to keep the device in continuous conduction mode (CCM) at all times.'
    },
    {
      num:  2,
      id:   'IN',
      lbl:  'IN',
      name: 'IN — Supply Voltage Input',
      type: 'PWR',
      funcs: ['PWR'],
      volt: '4.5–24V',
      curr: '3A max',
      note: 'Main power input. Accepts 4.5 V to 24 V. Decouple with a low-ESR ceramic capacitor (10 µF typical) placed as close as possible to this pin. Use wide, short PCB traces to minimise resistive drop and parasitic inductance.'
    },
    {
      num:  3,
      id:   'SW',
      lbl:  'SW',
      name: 'SW — Switch Node Output',
      type: 'SW',
      funcs: ['SW'],
      volt: '−0.3 V to +28 V (transient −5 V / +30 V < 10 ns)',
      curr: '3A',
      note: 'Switching output of the internal high-side and low-side MOSFETs. Connect the output inductor from this pin to the output filter capacitor. Use a wide, short PCB copper pour to handle 3 A continuous current and to reduce EMI from the high-frequency switching node.'
    },
    {
      num:  4,
      id:   'GND',
      lbl:  'GND',
      name: 'GND — System Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0 V',
      curr: 'N/A',
      note: 'Reference ground for the regulated output voltage. This pin sets the output sense reference, so PCB layout is critical: connect GND with wide copper traces and multiple vias directly under the IC to the power ground plane. Keep the path between GND and the output capacitor short.'
    },
    {
      num:  5,
      id:   'BST',
      lbl:  'BST',
      name: 'BST — Bootstrap Supply',
      type: 'BST',
      funcs: ['BST'],
      volt: 'VSW + 0 to VSW + 6 V',
      curr: 'N/A',
      note: 'Bootstrap supply for the high-side gate driver. A 0.1 µF ceramic capacitor in series with a 20 Ω resistor must be connected between the SW pin and this BST pin. The capacitor is charged when the low-side switch is on and provides the floating gate drive voltage when the high-side switch turns on.',
      _rightSlot: 3
    },
    {
      num:  6,
      id:   'EN',
      lbl:  'EN',
      name: 'EN / SYNC — Enable and Frequency Synchronisation',
      type: 'EN',
      funcs: ['EN'],
      volt: '0–5.5 V (logic) or up to VIN via pull-up resistor',
      curr: '< 100 µA',
      note: 'Enable and external clock synchronisation pin. Drive high (logic 1) to enable the converter; drive low to shut it down. An external clock signal (200 kHz – 2 MHz) applied to this pin will synchronise the internal oscillator. If connecting directly to VIN (> 5.5 V), use a pull-up resistor to limit current to below 100 µA.',
      _rightSlot: 2
    },
    {
      num:  7,
      id:   'VCC',
      lbl:  'VCC',
      name: 'VCC — Internal Bias Supply Output',
      type: 'VCC',
      funcs: ['VCC'],
      volt: '~5 V (internal LDO output)',
      curr: '< 20 mA external load',
      note: 'Internal bias regulator output. This pin provides the supply voltage for the internal gate drivers and control logic. Decouple with a 0.1 µF to 0.22 µF ceramic capacitor to GND, placed as close to this pin as possible. Do not connect heavy external loads; maximum external current draw is limited.',
      _rightSlot: 1
    },
    {
      num:  8,
      id:   'FB',
      lbl:  'FB',
      name: 'FB — Feedback / Output Voltage Sense',
      type: 'FB',
      funcs: ['FB'],
      volt: '0.791 V (internal reference)',
      curr: 'N/A',
      note: 'Feedback pin for output voltage regulation. An external resistor divider (R1 from VOUT, R2 to GND) is connected to this pin to set the output voltage. The internal reference is 0.791 V. Output voltage = 0.791 × (1 + R1/R2). During a short-circuit fault, the FB comparator detects the fault and initiates hiccup-mode protection.',
      _rightSlot: 0
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'EN':  ['SYNC'],
    'AAM': ['CCM'],   // tie to VCC or float → CCM mode
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Input Voltage',  value: '4.5 – 24 V',      color: '#ff6b6b' },
    { label: 'Output Voltage', value: '0.791 V – VIN',    color: '#78c878' },
    { label: 'Output Current', value: '3 A continuous',   color: '#c8a850' },
    { label: 'Frequency',      value: '500 kHz fixed',    color: '#50c8a0' },
    { label: 'Package',        value: 'TSOT23-8',         color: '#e0e5ec' },
    { label: 'Efficiency',     value: 'Up to ~95%',       color: '#4a9aee' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Topology',             value: 'Synchronous Step-Down (Buck)' },
    { label: 'Input Voltage Range',  value: '4.5 V to 24 V' },
    { label: 'Output Voltage Range', value: '0.791 V to VIN × DMAX' },
    { label: 'Feedback Reference',   value: '0.791 V (typical)' },
    { label: 'Switching Frequency',  value: '500 kHz (fixed); sync 200 kHz – 2 MHz' },
    { label: 'Continuous Load',      value: '3 A' },
    { label: 'RDS(on) High-Side',    value: '90 mΩ (typical)' },
    { label: 'RDS(on) Low-Side',     value: '40 mΩ (typical)' },
    { label: 'Quiescent Current',    value: '180 µA (typical)' },
    { label: 'Soft-Start',           value: 'Internal, fixed' },
    { label: 'Protection',           value: 'OCP (hiccup), thermal shutdown' },
    { label: 'Light-Load Mode',      value: 'AAM (Advanced Asynchronous Modulation)' },
    { label: 'Max Junction Temp',    value: '150 °C' },
    { label: 'Package',              value: 'TSOT23-8 (lead-free, RoHS)' },
  ],

  // ── KEY FEATURES ──────────────────────────────────────────────
  dsFeatures: [
    'Wide 4.5 V to 24 V input voltage range suits diverse power rails',
    '3 A continuous output current with 90 mΩ / 40 mΩ internal MOSFETs',
    'Fixed 500 kHz switching frequency; externally synchronisable from 200 kHz to 2 MHz via EN/SYNC pin',
    'AAM (Advanced Asynchronous Modulation) for high efficiency under light-load conditions',
    'Current-mode control for fast transient response and easy loop compensation',
    'Internal soft-start eliminates inrush current at power-up',
    'OCP with hiccup mode and thermal shutdown for reliable fault protection',
    'Very low quiescent current (~180 µA) suitable for always-on rails',
    'Minimum external components — requires only inductor, two capacitors, bootstrap RC, and feedback divider',
    'Space-saving 8-pin TSOT23 package ideal for compact PCB designs',
  ],
};