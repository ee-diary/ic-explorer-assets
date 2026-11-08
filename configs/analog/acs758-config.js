/**
 * IC Explorer Config: ACS758LCB-050B-PFF-T
 * Hall-effect current sensor — ±50 A bidirectional current
 *
 * The actual sensor uses the CB-PFF package. The existing DIP renderer is used
 * only as a functional pinout visualization; it is not a physical package drawing.
 */

window.IC_CONFIG = {
  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'ACS758LCB-050B-PFF-T',
  partMPN:      'ACS758LCB-050B-PFF-T',
  manufacturer: 'Allegro MicroSystems',
  package:      'CB-PFF',
  pinCount:     5,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/ACS758LCB-050B-PFF-T/Allegro%20MicroSystems/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/ACS758LCB-050B-PFF-T/Allegro%20MicroSystems/view-part/?ref=snapeda',
  datasheetURL: 'https://www.allegromicro.com/en/Products/Current-Sensor-ICs/Zero-To-Fifty-Amp-Integrated-Conductor-Sensor-ICs/ACS758.aspx',

  // DIPRenderer layout parameters are used for a functional pinout view only.
  dipConfig: {
    pinsPerSide: 3,
    bodyX: 122, bodyY: 40, bodyW: 260, bodyH: 240,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 14, part: 22, pkg: 16, pinCount: 12 },
    labelSize: 11, pinNumSize: 14, yOffset: 0
  },

  customTypes: {
    CURR: { c: '#4a9aee', bg: 'rgba(74,154,238,.12)',  bd: 'rgba(74,154,238,.32)' },
    VOUT: { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)' },
  },

  filterButtons: [
    { type: 'PWR',  label: 'Power',   color: '#ff6b6b' },
    { type: 'GND',  label: 'Ground',  color: '#a8a8a8' },
    { type: 'VOUT', label: 'Output',  color: '#50c8a0' },
    { type: 'CURR', label: 'Current', color: '#4a9aee' },
  ],

  // ACS758 pin numbering: 1 VCC, 2 GND, 3 VIOUT, 4 IP+, 5 IP−.
  pins: [
    { num: 1, id: 'VCC',   lbl: 'VCC',  name: 'Supply Voltage', type: 'PWR',  funcs: ['PWR'],  volt: '3.0–5.5V', curr: '13.5mA max', note: 'Power input for the Hall sensor and signal-conditioning circuit. Use a clean 5V supply for the stated nominal sensitivity.' },
    { num: 2, id: 'GND',   lbl: 'GND',  name: 'Ground',        type: 'GND',  funcs: ['GND'],  volt: '0V',      curr: 'N/A',        note: 'Ground reference for the analog output and internal signal chain.' },
    { num: 3, id: 'VIOUT', lbl: 'OUT',  name: 'Analog Output', type: 'VOUT', funcs: ['VOUT'], volt: '0.5–4.5V', curr: 'N/A',       note: 'Ratiometric output proportional to current. At VCC = 5V and zero current, output is approximately 2.5V. Nominal sensitivity for the ±50A version is 40mV/A.' },
    { num: 4, id: 'IP+',   lbl: 'IP+',  name: 'Current Input', type: 'CURR', funcs: ['CURR'], volt: 'AC / DC',  curr: '±50A',       note: 'Primary current terminal. Positive measured current flows into IP+ and out of IP−. Use conductors and connections appropriately rated for the current.' },
    { num: 5, id: 'IP-',   lbl: 'IP−',  name: 'Current Output',type: 'CURR', funcs: ['CURR'], volt: 'AC / DC',  curr: '±50A',       note: 'Primary current terminal. The measured current exits through IP−. The direction of current determines whether VIOUT is above or below its zero-current midpoint.' },
  ],

  altFuncs: {
    VIOUT: ['Analog Output', 'Current Sense Output'],
    'IP+': ['Current Input'],
    'IP-': ['Current Output'],
  },

  quickSpecs: [
    { label: 'Current Range', value: '±50 A',       color: '#4a9aee' },
    { label: 'Sensitivity',   value: '40 mV/A typ', color: '#c8a850' },
    { label: 'Zero current',  value: 'VCC / 2',     color: '#50c8a0' },
    { label: 'Supply',        value: '3.0–5.5 V',  color: '#ff6b6b' },
    { label: 'Bandwidth',     value: '120 kHz typ', color: '#7090a8' },
  ],

  dsSpecs: [
    { label: 'Technology',       value: 'Hall-effect linear current sensor' },
    { label: 'Current direction',value: 'Bidirectional, AC and DC' },
    { label: 'Sensitivity',      value: '40 mV/A typical at 5V (±50A model)' },
    { label: 'Zero-current bias',value: 'VCC / 2 (approximately 2.5V at 5V)' },
    { label: 'Bandwidth',        value: '120 kHz typical' },
    { label: 'Package',          value: 'CB-PFF' },
  ],

  dsFeatures: [
    'Bidirectional measurement for positive and negative current',
    'Integrated conductor and Hall sensing provide galvanic isolation between the primary current path and signal pins',
    'Analog output suitable for an ADC input within its permitted voltage range',
    'Typical 40mV/A sensitivity for the ACS758LCB-050B ±50A variant at 5V supply',
    'Commonly used in current-monitoring and motor-control applications',
  ],
};
