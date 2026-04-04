window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'MP2307',
  partMPN:      'MP2307DN',
  manufacturer: 'Monolithic Power Systems (MPS)',
  package:      'SOIC-8 (Exposed Pad)', // Handled by DIPRenderer as an 8-pin 2-side layout
  pinCount:     8,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/MP2307DN-LF-Z/Monolithic%20Power%20Systems/view-part/',
  datasheetURL: 'https://www.monolithicpower.com/en/documentview/productdocument/dataset/document_id/214',

  // ── LAYOUT HINT (DIP/SOIC-8) ──────────────────────────────────
  dipConfig: {
    pinsPerSide: 4,
    bodyX: 140, bodyY: 100, bodyW: 220, bodyH: 300,
    pinLength: 40, pinWidthHalf: 18,
    notchSize: 12, notchX: 20, notchY: 20,
    textSizes: { mfr: 14, part: 22, pkg: 16, pinCount: 12 },
    labelSize: 13, pinNumSize: 15, yOffset: -20
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  customTypes: {
    SW:   { c: '#f4a261', bg: 'rgba(244,162,97,.12)',  bd: 'rgba(244,162,97,.35)'  }, // Switch (Amber)
    BST:  { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  }, // Bootstrap (Teal)
    FB:   { c: '#c8a850', bg: 'rgba(200,168,80,.14)',  bd: 'rgba(200,168,80,.35)'  }, // Feedback (Gold)
    EN:   { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  }, // Enable (Orange)
    COMP: { c: '#c078ff', bg: 'rgba(192,120,255,.11)', bd: 'rgba(192,120,255,.28)' }, // Compensation (Violet)
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'PWR',  label: 'Input(IN)',       color: '#ff6b6b' },
    { type: 'SW',   label: 'Switch(SW)',      color: '#f4a261' },
    { type: 'FB',   label: 'Feedback(FB)',    color: '#c8a850' },
    { type: 'EN',   label: 'Enable(EN)',      color: '#ff9944' },
    { type: 'BST',  label: 'Bootstrap(BST)',  color: '#50c8a0' },
    { type: 'COMP', label: 'Comp.',     color: '#c078ff' },
    { type: 'GND',  label: 'GND',           color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  pins: [
    { 
      num: 1, id: 'BS', lbl: 'BS', name: 'Bootstrap', type: 'BST', funcs: ['BST'], 
      volt: 'SW + 5V', curr: 'N/A', 
      note: 'High-Side Gate Drive Boost Input. Requires a 10nF or greater capacitor connected between BS and SW pins.' 
    },
    { 
      num: 2, id: 'IN', lbl: 'IN', name: 'Supply Voltage', type: 'PWR', funcs: ['PWR'], 
      volt: '4.75-18V', curr: '3A', 
      note: 'Input Supply Voltage. Bypass with a high-quality, low-ESR ceramic capacitor close to the IC.' 
    },
    { 
      num: 3, id: 'SW', lbl: 'SW', name: 'Switch Output', type: 'SW', funcs: ['SW'], 
      volt: '18V Max', curr: '3A', 
      note: 'Power Switching Output. This is the node that connects to the external inductor and bootstrap capacitor.' 
    },
    { 
      num: 4, id: 'GND', lbl: 'GND', name: 'Ground', type: 'GND', funcs: ['GND'], 
      volt: '0V', curr: 'N/A', 
      note: 'Reference Ground. Ensure a short, low-impedance connection to the exposed pad.' 
    },
    { 
      num: 5, id: 'FB', lbl: 'FB', name: 'Feedback', type: 'FB', funcs: ['FB'], 
      volt: '0.925V', curr: 'N/A', 
      note: 'Feedback Input. Connect to the center of an external resistor divider from the output to GND to set the output voltage.',
      _rightSlot: 3 
    },
    { 
      num: 6, id: 'COMP', lbl: 'COMP', name: 'Compensation', type: 'COMP', funcs: ['COMP'], 
      volt: 'N/A', curr: 'N/A', 
      note: 'Compensation Node. Used for frequency compensation of the internal error amplifier. Connect a series RC network to GND.',
      _rightSlot: 2 
    },
    { 
      num: 7, id: 'EN', lbl: 'EN', name: 'Enable', type: 'EN', funcs: ['EN'], 
      volt: '0-6V', curr: 'N/A', 
      note: 'Drive this pin High to turn on the regulator, Low to turn it off. For automatic startup, connect to IN with a 100kΩ resistor.',
      _rightSlot: 1 
    },
    { 
      num: 8, id: 'SS', lbl: 'SS', name: 'Soft Start', type: 'BOOT', funcs: ['BOOT'], 
      volt: 'N/A', curr: '6µA', 
      note: 'Soft Start Control Input. Connect an external capacitor to ground to set the soft-start period and prevent inrush current.',
      _rightSlot: 0 
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'BS':   ['BST', 'BOOTSTRAP'],
    'SS':   ['SOFT_START'],
    'EN':   ['SHUTDOWN'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    {label: 'Input Voltage', value: '4.75V – 18V',     color: '#ff6b6b'},
    {label: 'Output Current', value: '3A Continuous',  color: '#78c878'},
    {label: 'Switch Freq',   value: '340 kHz',         color: '#7090a8'},
    {label: 'Efficiency',    value: 'Up to 95%',       color: '#50c8a0'},
    {label: 'V_FB',          value: '0.925V Reference',color: '#c8a850'},
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    {label: 'RDS(ON)',       value: '100mΩ Internal Power MOSFET'},
    {label: 'Shutdown I_q',  value: ' < 1µA'},
    {label: 'Current Limit', value: 'Cycle-by-Cycle Sensing'},
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Integrated 100mΩ Power MOSFET Switches',
    'Stable with Low-ESR Ceramic Output Capacitors',
    'Over-Current Protection with Hicc-up Mode',
    'Thermal Shutdown Protection',
    '8-Pin SOIC Package with Exposed Pad (for heat dissipation)',
  ],
};
