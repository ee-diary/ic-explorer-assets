/**
 * IC Explorer Config: TL072
 * Low-Noise JFET-Input Dual Operational Amplifier
 */

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'TL072',
  partMPN:      'TL072CP',
  manufacturer: 'Texas Instruments / STMicroelectronics',
  package:      'DIP-8',
  pinCount:     8,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/TL072CP/Texas%20Instruments/view-part/',
  datasheetURL: 'https://www.ti.com/lit/ds/symlink/tl072.pdf',

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
    AMPA: { c: '#3498db', bg: 'rgba(52, 152, 219, .12)',  bd: 'rgba(52, 152, 219, .32)' }, // Blue
    AMPB: { c: '#9b59b6', bg: 'rgba(155, 89, 182, .12)', bd: 'rgba(155, 89, 182, .35)' }, // Purple
    OUT:  { c: '#50c8a0', bg: 'rgba(80, 200, 160, .12)',  bd: 'rgba(80, 200, 160, .32)' }, // Teal
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'AMPA',  label: 'Amp A',    color: '#3498db'},
    { type: 'AMPB',  label: 'Amp B',    color: '#9b59b6'},
    { type: 'OUT',   label: 'Outputs',  color: '#50c8a0', fontSize:'12px' },
    { type: 'VCC',   label: 'VCC+',     color: '#ff6b6b' },
    { type: 'GND',   label: 'VCC-',     color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  pins: [
    { num: 1, id: '1OUT', lbl: '1OUT', name: 'Output 1',        type: 'OUT',  funcs: ['OUT'],  volt: '±15V', note: 'Output of amplifier A.' },
    { num: 2, id: '1IN-', lbl: '1IN-', name: 'Inverting 1',     type: 'AMPA', funcs: ['IN'],   volt: '±15V', note: 'Inverting JFET input of amplifier A.' },
    { num: 3, id: '1IN+', lbl: '1IN+', name: 'Non-Inverting 1', type: 'AMPA', funcs: ['IN'],   volt: '±15V', note: 'Non-inverting JFET input of amplifier A.' },
    { num: 4, id: 'VCC-', lbl: 'VCC-', name: 'Negative Supply', type: 'GND',  funcs: ['PWR'],  volt: '-18V', note: 'Negative power supply pin.' },
    
    { num: 5, id: '2IN+', lbl: '2IN+', name: 'Non-Inverting 2', type: 'AMPB', funcs: ['IN'],   volt: '±15V', note: 'Non-inverting JFET input of amplifier B.', _rightSlot: 3 },
    { num: 6, id: '2IN-', lbl: '2IN-', name: 'Inverting 2',     type: 'AMPB', funcs: ['IN'],   volt: '±15V', note: 'Inverting JFET input of amplifier B.', _rightSlot: 2 },
    { num: 7, id: '2OUT', lbl: '2OUT', name: 'Output 2',        type: 'OUT',  funcs: ['OUT'],  volt: '±15V', note: 'Output of amplifier B.', _rightSlot: 1 },
    { num: 8, id: 'VCC+', lbl: 'VCC+', name: 'Positive Supply', type: 'VCC',  funcs: ['PWR'],  volt: '+18V', note: 'Positive power supply pin.', _rightSlot: 0 },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    '1IN+': ['High-Z Buffer'],
    '1OUT': ['Audio Pre-amp'],
    '2OUT': ['Active Filter']
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    {label: 'Slew Rate',   value: '13 V/µs',      color: '#3498db'},
    {label: 'Bandwidth',   value: '3 MHz',        color: '#7090a8'},
    {label: 'Noise',       value: '18 nV/√Hz',    color: '#50c8a0'},
    {label: 'Input Bias',  value: '30 pA',        color: '#e0e5ec'},
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    {label: 'Input Type',  value: 'JFET (High Impedance)'},
    {label: 'Distortion',  value: '0.003% (Typical)'},
    {label: 'Supply Cur',  value: '1.4 mA per Amp'},
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Low harmonic distortion and low noise (18 nV/√Hz)',
    'High slew rate for high-speed signal processing',
    'JFET input stage provides ultra-low input bias current',
    'Internal frequency compensation and latch-up protection',
    'Ideal for high-fidelity audio and signal conditioning'
  ],
};