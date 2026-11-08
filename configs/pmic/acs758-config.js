/**
 * IC Explorer Config: ACS758LCB-050B-PFF-T
 * Hall-effect current sensor — ±50 A bidirectional current
 */

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'ACS758LCB-050B-PFF-T',
  partMPN:      'ACS758LCB-050B-PFF-T',
  manufacturer: 'Allegro MicroSystems',
  package:      'DIP-5',
  pinCount:     5,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/ACS758LCB-050B-PFF-T/Allegro%20MicroSystems/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/ACS758LCB-050B-PFF-T/Allegro%20MicroSystems/view-part/?ref=snapeda',
  datasheetURL: 'https://www.allegromicro.com/en/Products/Current-Sensor-ICs/Zero-To-Fifty-Amp-Integrated-Conductor-Sensor-ICs/ACS758.aspx',

  // ── LAYOUT HINT ───────────────────────────────────────────────
  dipConfig: {
    pinsPerSide: 3,
    bodyX: 122, bodyY: 40, bodyW: 260, bodyH: 240,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 14, part: 22, pkg: 16, pinCount: 12 },
    labelSize: 11, pinNumSize: 14, yOffset: 0
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  customTypes: {
    CURR: { c: '#4a9aee', bg: 'rgba(74,154,238,.12)',  bd: 'rgba(74,154,238,.32)' },
    VOUT: { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)' },
    PWR:  { c: '#ff6b6b', bg: 'rgba(255,107,107,.12)', bd: 'rgba(255,107,107,.30)' },
    GND:  { c: '#a8a8a8', bg: 'rgba(168,168,168,.12)', bd: 'rgba(168,168,168,.25)' },
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'PWR', label: 'Power', color: '#ff6b6b' },
    { type: 'GND', label: 'Ground', color: '#a8a8a8' },
    { type: 'VOUT', label: 'Output', color: '#50c8a0' },
    { type: 'CURR', label: 'Current', color: '#4a9aee' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // DIP-5 package used for visual layout in IC Explorer; the actual ACS758 is a
  // Hall-effect current sensor with two large current-carrying tabs (IP+ / IP−)
  // and a small 3-pin signal side for VCC, GND, and VIOUT.
  pins: [
    { num: 1, id: 'VCC',  lbl: 'VCC',  name: 'Supply Voltage', type: 'PWR',  funcs: ['PWR'],  volt: '3.0–5.5V', curr: '13.5mA max', note: 'Power input for the internal Hall sensor and signal conditioning circuit. Supply should be a clean 5V rail for best output accuracy.', _rightSlot: 0 },
    { num: 2, id: 'GND',  lbl: 'GND',  name: 'Ground',        type: 'GND',  funcs: ['GND'],  volt: '0V',     curr: 'N/A',     note: 'Ground reference for the analog output and internal signal chain. Keep the return path short and low-noise.', _rightSlot: 1 },
    { num: 3, id: 'VIOUT', lbl: 'OUT', name: 'Analog Output', type: 'VOUT', funcs: ['VOUT'], volt: '0.5–4.5V', curr: 'N/A', note: 'Ratiometric analog output proportional to measured current. With VCC = 5V, 0A corresponds to about 2.5V, and the output moves by about 40mV per amp for the ±50A version.', _rightSlot: 2 },
    { num: 4, id: 'IP+',  lbl: 'IP+',  name: 'Current In',    type: 'CURR', funcs: ['CURR'], volt: 'DC / AC current', curr: '±50A', note: 'Current-carrying input terminal. The measured current enters here and flows through the internal copper conductor in the package.', _rightSlot: 3 },
    { num: 5, id: 'IP-',  lbl: 'IP-',  name: 'Current Out',   type: 'CURR', funcs: ['CURR'], volt: 'DC / AC current', curr: '±50A', note: 'Current-carrying output terminal. The load current exits through this terminal. The direction of current determines whether the output is above or below the zero-current midpoint.', _rightSlot: 4 },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'VIOUT': ['VOUT', 'Analog Output', 'Current Sense Output'],
    'IP+':   ['Current In', 'Load Input'],
    'IP-':   ['Current Out', 'Load Return'],
    'VCC':   ['Supply'],
    'GND':   ['Ground'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Current Range', value: '±50 A',      color: '#4a9aee' },
    { label: 'Sensitivity',   value: '40 mV/A',    color: '#c8a850' },
    { label: 'Zero current',  value: 'VCC / 2',    color: '#50c8a0' },
    { label: 'Supply',        value: '3.0–5.5 V', color: '#ff6b6b' },
    { label: 'Bandwidth',     value: '120 kHz',    color: '#7090a8' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Technology', value: 'Hall-effect linear current sensor' },
    { label: 'Isolation', value: 'Galvanically isolated current path' },
    { label: 'Output Type', value: 'Analog voltage proportional to current' },
    { label: 'Sensitivity', value: '≈40 mV/A at 5V supply (±50A version)' },
    { label: 'Bias Point', value: 'VCC / 2 = approximately 2.5V at 0A' },
    { label: 'Package', value: 'CB-PFF / large conductor package' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Bidirectional current measurement for both positive and negative currents',
    'Internal isolated copper conductor for measuring high current without direct electrical contact',
    'Analog output suitable for ADC measurement on microcontrollers',
    'Works for both DC and AC current with a 120 kHz bandwidth',
    'Very common on CJMCU-758 / MCU-758 breakout boards for battery and motor monitoring',
  ],
};
