/**
 * IC Explorer Config: LM358
 * Low Power Dual Operational Amplifier
 */

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'LM358',
  partMPN:      'LM358N',
  manufacturer: 'Texas Instruments / ST / ONsemi',
  package:      'DIP-8',
  pinCount:     8,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/LM358N/Texas%20Instruments/view-part/',
  datasheetURL: 'https://www.ti.com/lit/ds/symlink/lm358.pdf',

  // ── LAYOUT HINT ───────────────────────────────────────────────
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
    AMPA: { c: '#3498db', bg: 'rgba(52, 152, 219, .12)',  bd: 'rgba(52, 152, 219, .32)' }, // Blue (Amp A)
    AMPB: { c: '#9b59b6', bg: 'rgba(155, 89, 182, .12)', bd: 'rgba(155, 89, 182, .35)' }, // Purple (Amp B)
    OUT:  { c: '#50c8a0', bg: 'rgba(80, 200, 160, .12)',  bd: 'rgba(80, 200, 160, .32)' }, // Teal (Outputs)
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'AMPA',  label: 'Amplifier A',  color: '#3498db', fontSize:'12px' },
    { type: 'AMPB',  label: 'Amplifier B',  color: '#9b59b6', fontSize:'12px' },
    { type: 'OUT',   label: 'Outputs',      color: '#50c8a0' },
    { type: 'PWR',   label: 'VCC / GND',    color: '#ff6b6b' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  pins: [
    { num: 1, id: '1OUT', lbl: '1OUT', name: 'Output 1',        type: 'OUT',  funcs: ['OUT'],  volt: 'Vcc-1.5', note: 'Output of the first operational amplifier.' },
    { num: 2, id: '1IN-', lbl: '1IN-', name: 'Inverting 1',     type: 'AMPA', funcs: ['IN'],   volt: '32V',     note: 'Inverting input of the first operational amplifier.' },
    { num: 3, id: '1IN+', lbl: '1IN+', name: 'Non-Inverting 1', type: 'AMPA', funcs: ['IN'],   volt: '32V',     note: 'Non-inverting input of the first operational amplifier.' },
    { num: 4, id: 'GND',  lbl: 'GND',  name: 'Ground',          type: 'PWR',  funcs: ['GND'],  volt: '0V',      note: 'Negative supply or ground pin.' },
    
    { num: 5, id: '2IN+', lbl: '2IN+', name: 'Non-Inverting 2', type: 'AMPB', funcs: ['IN'],   volt: '32V',     note: 'Non-inverting input of the second operational amplifier.', _rightSlot: 3 },
    { num: 6, id: '2IN-', lbl: '2IN-', name: 'Inverting 2',     type: 'AMPB', funcs: ['IN'],   volt: '32V',     note: 'Inverting input of the second operational amplifier.', _rightSlot: 2 },
    { num: 7, id: '2OUT', lbl: '2OUT', name: 'Output 2',        type: 'OUT',  funcs: ['OUT'],  volt: 'Vcc-1.5', note: 'Output of the second operational amplifier.', _rightSlot: 1 },
    { num: 8, id: 'VCC',  lbl: 'VCC',  name: 'Positive Supply', type: 'PWR',  funcs: ['VCC'],  volt: '3V-32V',  note: 'Positive supply voltage pin.', _rightSlot: 0 },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    '1IN-': ['Comparator Input'],
    '2OUT': ['Signal Buffer']
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    {label: 'Supply',      value: '3V to 32V',    color: '#ff6b6b'},
    {label: 'Channels',    value: 'Dual Op-Amp',  color: '#3498db'},
    {label: 'Gain BW',     value: '700 kHz',      color: '#7090a8'},
    {label: 'Quiescent',   value: '500 µA',       color: '#e0e5ec'},
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    {label: 'Common Mode', value: 'Includes Ground'},
    {label: 'Output Swing',value: '0V to VCC - 1.5V'},
    {label: 'Input Bias',  value: '20 nA (Typical)'},
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Wide power supply range: single or dual supplies',
    'Low input bias and offset parameters',
    'Internal frequency compensation for unity gain',
    'Input common-mode voltage range includes ground',
    'Popular in battery-operated and portable equipment'
  ],
};