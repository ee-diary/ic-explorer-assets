/**
 * IC Explorer Config: MC1496
 * Balanced Modulator / Demodulator
 */

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'MC1496',
  partMPN:      'MC1496P',
  manufacturer: 'ON Semiconductor / Motorola',
  package:      'DIP-14',
  pinCount:     14,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/MC1496/onsemi/view-part/',
  datasheetURL: 'https://www.onsemi.com/pdf/datasheet/mc1496-d.pdf',

  // ── LAYOUT HINT ───────────────────────────────────────────────
  dipConfig: {
    pinsPerSide: 7,
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 520, // Taller body for 14 pins
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },
    labelSize: 11, pinNumSize: 14, yOffset: 60
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  customTypes: {
    CARRIER: { c: '#9b59b6', bg: 'rgba(155, 89, 182, .12)', bd: 'rgba(155, 89, 182, .35)' }, // Purple
    SIGNAL:  { c: '#3498db', bg: 'rgba(52, 152, 219, .12)',  bd: 'rgba(52, 152, 219, .32)' }, // Blue
    OUT:     { c: '#50c8a0', bg: 'rgba(80, 200, 160, .12)',  bd: 'rgba(80, 200, 160, .32)' }, // Teal
    ADJ:     { c: '#f4a261', bg: 'rgba(244, 162, 97, .12)',  bd: 'rgba(244, 162, 97, .35)' }, // Amber
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'SIGNAL',  label: 'Signal In',    color: '#3498db', fontSize:'12px' },
    { type: 'CARRIER', label: 'Carrier In',   color: '#9b59b6', fontSize:'12px' },
    { type: 'OUT',     label: 'Output',       color: '#50c8a0' },
    { type: 'ADJ',     label: 'Gain Adjust',  color: '#f4a261', fontSize:'12px' },
    { type: 'PWR',     label: 'Power',        color: '#ff6b6b' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  pins: [
    { num: 1,  id: 'S+',  lbl: 'SIG+',  name: 'Signal In (+)', type: 'SIGNAL',  funcs: ['IN'],   volt: '±5V', note: 'Positive input for the modulating signal.' },
    { num: 2,  id: 'G1',  lbl: 'ADJ1',  name: 'Gain Adj 1',    type: 'ADJ',     funcs: ['ADJ'],  volt: 'N/A',  note: 'Gain adjust emitter terminal. Connect gain setting resistor between Pin 2 and 3.' },
    { num: 3,  id: 'G2',  lbl: 'ADJ2',  name: 'Gain Adj 2',    type: 'ADJ',     funcs: ['ADJ'],  volt: 'N/A',  note: 'Gain adjust emitter terminal.' },
    { num: 4,  id: 'S-',  lbl: 'SIG-',  name: 'Signal In (-)', type: 'SIGNAL',  funcs: ['IN'],   volt: '±5V', note: 'Negative input for the modulating signal.' },
    { num: 5,  id: 'BS',  lbl: 'BIAS',  name: 'Bias',          type: 'PWR',     funcs: ['BIAS'], volt: 'N/A',  note: 'Sets the internal quiescent current. Usually connected via resistor to Vcc or GND.' },
    { num: 6,  id: 'O+',  lbl: 'OUT+',  name: 'Output (+)',    type: 'OUT',     funcs: ['OUT'],  volt: '30V',  note: 'Positive output collector. Load resistor is required here.' },
    { num: 7,  id: 'NC1', lbl: 'NC',    name: 'No Connect',    type: 'NC',      funcs: ['NC'],   volt: '0V',   note: 'Not internally connected.', _rightSlot: 7 },
    
    { num: 8,  id: 'C+',  lbl: 'CAR+',  name: 'Carrier (+)',   type: 'CARRIER', funcs: ['IN'],   volt: '±5V', note: 'Positive input for the carrier signal.', _rightSlot: 6 },
    { num: 9,  id: 'NC2', lbl: 'NC',    name: 'No Connect',    type: 'NC',      funcs: ['NC'],   volt: '0V',   note: 'Not internally connected.', _rightSlot: 5 },
    { num: 10, id: 'C-',  lbl: 'CAR-',  name: 'Carrier (-)',   type: 'CARRIER', funcs: ['IN'],   volt: '±5V', note: 'Negative input for the carrier signal.', _rightSlot: 4 },
    { num: 11, id: 'NC3', lbl: 'NC',    name: 'No Connect',    type: 'NC',      funcs: ['NC'],   volt: '0V',   note: 'Not internally connected.', _rightSlot: 3 },
    { num: 12, id: 'O-',  lbl: 'OUT-',  name: 'Output (-)',    type: 'OUT',     funcs: ['OUT'],  volt: '30V',  note: 'Negative output collector. Load resistor is required here.', _rightSlot: 2 },
    { num: 13, id: 'NC4', lbl: 'NC',    name: 'No Connect',    type: 'NC',      funcs: ['NC'],   volt: '0V',   note: 'Not internally connected.', _rightSlot: 1 },
    { num: 14, id: 'VEE', lbl: 'VEE',   name: 'Neg Supply',    type: 'PWR',     funcs: ['PWR'],  volt: '-15V', note: 'Negative supply voltage pin.', _rightSlot: 0 },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'SIG+': ['AM Input'],
    'CAR+': ['LO Input'],
    'OUT+': ['Mixer Output']
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    {label: 'Sup. Rejection', value: '65 dB',       color: '#50c8a0'},
    {label: 'Carrier Supp.',  value: '-50 to -65dB',color: '#9b59b6'},
    {label: 'Supply Range',   value: '±12V to ±15V',color: '#ff6b6b'},
    {label: 'Bandwidth',      value: 'Up to 300MHz', color: '#3498db'},
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    {label: 'Circuitry', value: 'Gilbert Cell Multiplier'},
    {label: 'Output Type', value: 'Open Collector (Balanced)'},
    {label: 'Adjustable',  value: 'Gain & Bias Current'},
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Excellent Carrier Suppression and common-mode rejection',
    'Adjustable gain and bias current for design flexibility',
    'Balanced inputs and outputs for low noise performance',
    'Wide bandwidth suitable for RF and IF applications',
    'Standard DIP-14 package for easy prototyping'
  ],
};