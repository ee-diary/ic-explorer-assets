/**
 * IC Explorer Config: LM324
 * Low Power Quad Operational Amplifier
 */

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'LM324',
  partMPN:      'LM324N',
  manufacturer: 'Texas Instruments / ONsemi / ST',
  package:      'DIP-14',
  pinCount:     14,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/LM324N/Texas%20Instruments/view-part/',
  datasheetURL: 'https://www.ti.com/lit/ds/symlink/lm324.pdf',

  // ── LAYOUT HINT ───────────────────────────────────────────────
  dipConfig: {
    pinsPerSide: 7,
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 520,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },
    labelSize: 11, pinNumSize: 14, yOffset: 60
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  customTypes: {
    AMPA: { c: '#3498db', bg: 'rgba(52, 152, 219, .12)',  bd: 'rgba(52, 152, 219, .32)' },
    AMPB: { c: '#9b59b6', bg: 'rgba(155, 89, 182, .12)', bd: 'rgba(155, 89, 182, .35)' },
    AMPC: { c: '#f4a261', bg: 'rgba(244, 162, 97, .12)',  bd: 'rgba(244, 162, 97, .35)' },
    AMPD: { c: '#50c8a0', bg: 'rgba(80, 200, 160, .12)',  bd: 'rgba(80, 200, 160, .32)' },
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'AMPA',  label: 'Amp A',    color: '#3498db' },
    { type: 'AMPB',  label: 'Amp B',    color: '#9b59b6' },
    { type: 'AMPC',  label: 'Amp C',    color: '#f4a261' },
    { type: 'AMPD',  label: 'Amp D',    color: '#50c8a0' },
    { type: 'VCC',   label: 'VCC',      color: '#ff6b6b' },
    { type: 'GND',   label: 'GND',      color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  pins: [
    { num: 1,  id: '1OUT', lbl: '1OUT', name: 'Output 1',        type: 'AMPA', funcs: ['OUT'], volt: 'Vcc-1.5', note: 'Output of amplifier 1.' },
    { num: 2,  id: '1IN-', lbl: '1IN-', name: 'Inverting 1',     type: 'AMPA', funcs: ['IN'],  volt: '32V',     note: 'Inverting input of amplifier 1.' },
    { num: 3,  id: '1IN+', lbl: '1IN+', name: 'Non-Inverting 1', type: 'AMPA', funcs: ['IN'],  volt: '32V',     note: 'Non-inverting input of amplifier 1.' },
    { num: 4,  id: 'VCC',  lbl: 'VCC',  name: 'Positive Supply', type: 'VCC',  funcs: ['VCC'], volt: '3V-32V',  note: 'Positive supply voltage pin.' },
    { num: 5,  id: '2IN+', lbl: '2IN+', name: 'Non-Inverting 2', type: 'AMPB', funcs: ['IN'],  volt: '32V',     note: 'Non-inverting input of amplifier 2.' },
    { num: 6,  id: '2IN-', lbl: '2IN-', name: 'Inverting 2',     type: 'AMPB', funcs: ['IN'],  volt: '32V',     note: 'Inverting input of amplifier 2.' },
    { num: 7,  id: '2OUT', lbl: '2OUT', name: 'Output 2',        type: 'AMPB', funcs: ['OUT'], volt: 'Vcc-1.5', note: 'Output of amplifier 2.' },
    
    { num: 8,  id: '3OUT', lbl: '3OUT', name: 'Output 3',        type: 'AMPC', funcs: ['OUT'], volt: 'Vcc-1.5', note: 'Output of amplifier 3.', _rightSlot: 6 },
    { num: 9,  id: '3IN-', lbl: '3IN-', name: 'Inverting 3',     type: 'AMPC', funcs: ['IN'],  volt: '32V',     note: 'Inverting input of amplifier 3.', _rightSlot: 5 },
    { num: 10, id: '3IN+', lbl: '3IN+', name: 'Non-Inverting 3', type: 'AMPC', funcs: ['IN'],  volt: '32V',     note: 'Non-inverting input of amplifier 3.', _rightSlot: 4 },
    { num: 11, id: 'GND',  lbl: 'GND',  name: 'Ground',          type: 'GND',  funcs: ['GND'], volt: '0V',      note: 'Negative supply or ground.', _rightSlot: 3 },
    { num: 12, id: '4IN+', lbl: '4IN+', name: 'Non-Inverting 4', type: 'AMPD', funcs: ['IN'],  volt: '32V',     note: 'Non-inverting input of amplifier 4.', _rightSlot: 2 },
    { num: 13, id: '4IN-', lbl: '4IN-', name: 'Inverting 4',     type: 'AMPD', funcs: ['IN'],  volt: '32V',     note: 'Inverting input of amplifier 4.', _rightSlot: 1 },
    { num: 14, id: '4OUT', lbl: '4OUT', name: 'Output 4',        type: 'AMPD', funcs: ['OUT'], volt: 'Vcc-1.5', note: 'Output of amplifier 4.', _rightSlot: 0 },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    '1IN-': ['Comparator Input'],
    '2OUT': ['Signal Buffer'],
    '4OUT': ['Oscillator Output']
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    {label: 'Supply',      value: '3V to 32V',    color: '#ff6b6b'},
    {label: 'Channels',    value: 'Quad Op-Amp',  color: '#50c8a0'},
    {label: 'Gain BW',     value: '1.2 MHz',      color: '#7090a8'},
    {label: 'Quiescent',   value: '700 µA',       color: '#e0e5ec'},
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    {label: 'Common Mode', value: 'Includes Ground'},
    {label: 'Output Swing',value: '0V to VCC - 1.5V'},
    {label: 'Input Bias',  value: '45 nA (Typical)'},
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Four independent high-gain operational amplifiers',
    'Eliminates need for dual supplies in many designs',
    'Low power consumption, suitable for battery operation',
    'Input common-mode range includes ground',
    'Standard DIP-14 pinout for easy PCB layout'
  ],
};