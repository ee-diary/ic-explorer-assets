/**
 * IC Explorer Config: MP1584
 * 3A, 1.5MHz, 28V Step-Down Converter
 */

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'MP1584',
  partMPN:      'MP1584EN-LF-Z',
  manufacturer: 'Monolithic Power Systems (MPS)',
  package:      'SOIC-8 (Exposed Pad)',
  pinCount:     8,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/MP1584EN-LF-Z/Monolithic%20Power%20Systems%20Inc./view-part/',
  datasheetURL: 'https://www.monolithicpower.com/en/documentview/productdocument/index/version/2/document_type/Datasheet/lang/en/sku/MP1584EN-LF-Z/',

  // ── LAYOUT HINT (SOIC-8 uses DIP-style side rendering) ────────
  dipConfig: {
    pinsPerSide: 4,
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 300,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },
    labelSize: 11, pinNumSize: 14, yOffset: 60
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  customTypes: {
    SW:   { c: '#f4a261', bg: 'rgba(244,162,97,.12)',  bd: 'rgba(244,162,97,.35)'  }, // Switch Node (Amber)
    FB:   { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  }, // Feedback (Teal)
    COMP: { c: '#9898d8', bg: 'rgba(152,152,216,.14)', bd: 'rgba(152,152,216,.35)' }, // Compensation (Purple)
    BST:  { c: '#c078ff', bg: 'rgba(192,120,255,.11)', bd: 'rgba(192,120,255,.28)' }, // Bootstrap (Violet)
    FREQ: { c: '#7090a8', bg: 'rgba(112,144,168,.12)', bd: 'rgba(112,144,168,.30)' }, // Frequency (Steel)
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'PWR',  label: 'Input (VIN)',      color: '#ff6b6b', fontSize:'12px' },
    { type: 'SW',   label: 'Switch (SW)',      color: '#f4a261', fontSize:'12px'},
    { type: 'BST',  label: 'Bootstrap',        color: '#c078ff' },
    { type: 'FB',   label: 'Feedback',         color: '#50c8a0' },
    { type: 'COMP', label: 'Comp',             color: '#9898d8' },
    { type: 'FREQ', label: 'Frequency',        color: '#7090a8' },
    { type: 'GND',  label: 'Ground',           color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  pins: [
    { num: 1, id: 'SW',   lbl: 'SW',   name: 'Switch Node',      type: 'SW',   funcs: ['SW'],   volt: '28V',  curr: '3A',   note: 'Output from the high-side switch. Connect Schottky diode to GND and inductor to output.' },
    { num: 2, id: 'EN',   lbl: 'EN',   name: 'Enable Input',     type: 'RESET',funcs: ['RESET'],volt: '6V',   curr: 'N/A',  note: 'Logic high enables chip. Floating enables chip. Pull below 1.2V to shut down.' },
    { num: 3, id: 'COMP', lbl: 'COMP', name: 'Compensation',     type: 'COMP', funcs: ['COMP'], volt: '6V',   curr: 'N/A',  note: 'Output of error amplifier. Connect series RC network to ground for loop stability.' },
    { num: 4, id: 'FB',   lbl: 'FB',   name: 'Feedback',         type: 'FB',   funcs: ['FB'],   volt: '0.8V', curr: 'N/A',  note: 'Input to error amplifier. Connected to resistive divider to set output voltage.' },
    
    { num: 5, id: 'GND',  lbl: 'GND',  name: 'Ground',           type: 'GND',  funcs: ['GND'],  volt: '0V',   curr: '3A',   note: 'Reference ground. Exposed pad should be soldered to a large ground plane for thermal dissipation.', _rightSlot: 3 },
    { num: 6, id: 'FREQ', lbl: 'FREQ', name: 'Freq Program',     type: 'FREQ', funcs: ['FREQ'], volt: '6V',   curr: 'N/A',  note: 'Switching frequency program input. Connect a resistor to GND to set frequency (100kHz–1.5MHz).' },
    { num: 7, id: 'VIN',  lbl: 'VIN',  name: 'Input Supply',     type: 'PWR',  funcs: ['PWR'],  volt: '28V',  curr: '3A',   note: 'Supplies power to internal control and high-side switch. Place decoupling cap close to pin.' },
    { num: 8, id: 'BST',  lbl: 'BST',  name: 'Bootstrap',        type: 'BST',  funcs: ['BST'],  volt: '34V',  curr: 'N/A',  note: 'Positive supply for floating high-side driver. Connect 100nF capacitor between BST and SW.' },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'EN':   ['Shutdown'],
    'FREQ': ['Oscillator'],
    'BST':  ['Soft-Start Support']
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    {label: 'Input',      value: '4.5V–28V',    color: '#ff6b6b'},
    {label: 'Output',     value: '0.8V–25V',    color: '#78c878'},
    {label: 'Current',    value: '3A Max',      color: '#e0e5ec'},
    {label: 'Freq',       value: 'Up to 1.5MHz', color: '#7090a8'},
    {label: 'Quiescent',  value: '100 µA'},
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    {label: 'Topology',   value: 'Step-Down (Buck) Converter'},
    {label: 'Control',    value: 'Current Mode Control'},
    {label: 'MOSFET',     value: '150mΩ Internal High-Side'},
    {label: 'Reference',  value: '0.8V internal voltage'},
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Programmable switching frequency from 100kHz to 1.5MHz',
    'High-efficiency pulse skipping mode for light loads',
    'Internal soft-start and thermal shutdown protection',
    'Cycle-by-cycle over-current protection',
    'Stable with low-ESR ceramic output capacitors'
  ],
};
