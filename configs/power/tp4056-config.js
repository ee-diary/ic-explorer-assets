window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'TP4056',
  partMPN:      'TP4056-ESOP8',
  manufacturer: 'TOPPOWER',
  package:      'SOP-8-PP',          // renderer-factory.js maps this to DIPRenderer logic
  pinCount:     8,

  // ── LINKS ─────────────────────────────────────────────────────
  datasheetURL: 'https://dlnmh9ip6v2uc.cloudfront.net/datasheets/Components/General/TP4056.pdf',

  // ── LAYOUT HINT (DIP/SOP logic) ───────────────────────────────
  dipConfig: {
    pinsPerSide: 4,
    bodyX: 122, bodyY: 150, bodyW: 260, bodyH: 400,
    pinLength: 34, pinWidthHalf: 20,
    notchSize: 10, notchX: 14, notchY: 14,
    textSizes: { mfr: 14, part: 28, pkg: 16, pinCount: 12 },
    labelSize: 13, pinNumSize: 14, yOffset: 0
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  customTypes: {
    STAT: { c: '#f4a261', bg: 'rgba(244,162,97,.12)',  bd: 'rgba(244,162,97,.35)'  }, // Status Indicators
    PROG: { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  }, // Programming/Current Set
    TEMP: { c: '#4a9aee', bg: 'rgba(74,154,238,.12)',  bd: 'rgba(74,154,238,.35)'  }, // Temperature Sense
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'STAT', label: 'CHRG/STDBY', color: '#f4a261', fontSize:"13px"},
    { type: 'PROG', label: 'PROG',      color: '#50c8a0' },
    { type: 'TEMP', label: 'Temp Sense',          color: '#4a9aee',fontSize:"13px"},
    { type: 'PWR',  label: 'VCC',         color: '#ff6b6b' },
    { type: 'GND',  label: 'GND/BAT',          color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  pins: [
    {
      num:  1,
      id:   'TEMP',
      lbl:  'TEMP',
      name: 'Temperature Sense Input',
      type: 'TEMP',
      funcs: ['TEMP'],
      volt: 'VCC',
      curr: 'N/A',
      note: 'Connect to battery NTC thermistor. If voltage is <45% or >80% of VCC, charging is suspended.'
    },
    {
      num:  2,
      id:   'PROG',
      lbl:  'PROG',
      name: 'Constant Charge Current Setting',
      type: 'PROG',
      funcs: ['PROG'],
      volt: '1V',
      curr: '100uA',
      note: 'Charge current is set by connecting a resistor Rprog from this pin to GND. Ibat = (Vprog/Rprog) * 1200.'
    },
    {
      num:  3,
      id:   'GND',
      lbl:  'GND',
      name: 'Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: '1A',
      note: 'Negative supply terminal. The thermal pad must also be connected to GND.'
    },
    {
      num:  4,
      id:   'VCC',
      lbl:  'VCC',
      name: 'Positive Supply Voltage',
      type: 'PWR',
      funcs: ['PWR'],
      volt: '4V-8V',
      curr: '1A',
      note: 'Input supply voltage. Bypass with a 10uF capacitor.'
    },
    {
      num:  5,
      id:   'BAT',
      lbl:  'BAT',
      name: 'Battery Connection Pin',
      type: 'GND', // Categorized as GND/BAT for filtering
      funcs: ['GND'],
      volt: '4.2V',
      curr: '1A',
      note: 'Connect to the positive terminal of the battery. Provides 4.2V charge voltage and 1uA leakage in shutdown.'
    },
    {
      num:  6,
      id:   'STDBY',
      lbl:  'STDBY',
      name: 'Open Drain Charge Standby Status',
      type: 'STAT',
      funcs: ['STAT'],
      volt: 'VCC',
      curr: '20mA',
      note: 'Indicates charge completion. Pin is pulled low when charging is finished; otherwise high impedance.',
      _rightSlot: 2
    },
    {
      num:  7,
      id:   'CHRG',
      lbl:  'CHRG',
      name: 'Open Drain Charge Status',
      type: 'STAT',
      funcs: ['STAT'],
      volt: 'VCC',
      curr: '20mA',
      note: 'Indicates charging in progress. Pin is pulled low during charge; otherwise high impedance.',
      _rightSlot: 1
    },
    {
      num:  8,
      id:   'CE',
      lbl:  'CE',
      name: 'Chip Enable Input',
      type: 'PWR',
      funcs: ['PWR'],
      volt: 'VCC',
      curr: 'N/A',
      note: 'High input level puts the chip in normal operation. Low level puts it in shutdown mode.',
      _rightSlot: 0
    }
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'VCC':   ['VIN'],
    'BAT':   ['VBAT'],
    'STAT':  ['LED_OUT']
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    {label: 'V-Input',    value: '4.5V–5.5V',   color: '#ff6b6b'},
    {label: 'V-Float',    value: '4.2V (±1%)',  color: '#78c878'},
    {label: 'Max Current', value: '1000 mA',     color: '#c8a850'},
    {label: 'Package',    value: 'SOP-8-PP',    color: '#e0e5ec'},
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    {label: 'Charging Type', value: 'Linear CC/CV'},
    {label: 'Accuracy',      value: '±1% Preset Charge Voltage'},
    {label: 'Protection',    value: 'Soft-Start, Thermal Feedback'},
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Programmable Charge Current up to 1000mA',
    'No MOSFET, Sense Resistor or Blocking Diode Required',
    'Complete Linear Charger in SOP-8 Package for Lithium-Ion Batteries',
    'Automatic Recharge and Two Status Outputs',
  ],
};