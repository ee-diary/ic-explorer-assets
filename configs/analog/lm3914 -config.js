window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'LM3914',
  partMPN:      'LM3914N-1',
  manufacturer: 'Texas Instruments',
  package:      'DIP-18',
  pinCount:     18,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/LM3914N-1/NOPB/Texas%20Instruments/view-part/',
  datasheetURL: 'https://www.ti.com/lite/ds/symlink/lm3914.pdf',

  // ── LAYOUT HINT (DIP-18) ──────────────────────────────────────
  dipConfig: {
    pinsPerSide: 9,
    bodyX: 130, bodyY: 40, bodyW: 240, bodyH: 620,
    pinLength: 36, pinWidthHalf: 17,
    notchSize: 10, notchX: 18, notchY: 18,
    textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },
    labelSize: 12, pinNumSize: 14, yOffset: -40
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  customTypes: {
    LED:  { c: '#ff6b6b', bg: 'rgba(255,107,107,.12)', bd: 'rgba(255,107,107,.35)' }, // LED Outputs (Red)
    SIG:  { c: '#f4a261', bg: 'rgba(244,162,97,.12)',  bd: 'rgba(244,162,97,.35)'  }, // Signal Input (Amber)
    REF:  { c: '#c8a850', bg: 'rgba(200,168,80,.14)',  bd: 'rgba(200,168,80,.35)'  }, // Reference (Gold)
    MODE: { c: '#c078ff', bg: 'rgba(192,120,255,.11)', bd: 'rgba(192,120,255,.28)' }, // Mode Select (Violet)
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'LED',  label: 'LED Outputs',      color: '#ff6b6b' },
    { type: 'SIG',  label: 'Signal Input',     color: '#f4a261' },
    { type: 'REF',  label: 'Voltage Reference',color: '#c8a850' },
    { type: 'MODE', label: 'Display Mode',     color: '#c078ff' },
    { type: 'PWR',  label: 'V+ Supply',        color: '#ff6b6b' },
    { type: 'GND',  label: 'V- / Ground',      color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  pins: [
    { num: 1,  id: 'LED1',  lbl: 'LED 1', name: 'LED 1 Output', type: 'LED', funcs: ['LED'], volt: 'V+', curr: '30mA', note: 'Current-regulated LED driver output 1.' },
    { num: 2,  id: 'VMINUS',lbl: 'V-',    name: 'Negative Supply', type: 'GND', funcs: ['GND'], volt: '0V', curr: 'N/A', note: 'Negative supply rail (usually Ground).' },
    { num: 3,  id: 'VPLUS', lbl: 'V+',    name: 'Positive Supply', type: 'PWR', funcs: ['PWR'], volt: '3-25V', curr: '9mA', note: 'Main supply voltage for the IC and LED current source.' },
    { num: 4,  id: 'RLO',   lbl: 'RLO',   name: 'Divider Low', type: 'REF', funcs: ['REF'], volt: 'V-', curr: 'N/A', note: 'Low end of the internal 10k resistor ladder.' },
    { num: 5,  id: 'SIG',   lbl: 'SIG',   name: 'Signal Input', type: 'SIG', funcs: ['SIG'], volt: '±35V Max', curr: 'N/A', note: 'Analog voltage input to be compared against the resistor ladder.' },
    { num: 6,  id: 'RHI',   lbl: 'RHI',   name: 'Divider High', type: 'REF', funcs: ['REF'], volt: 'V+', curr: 'N/A', note: 'High end of the internal 10k resistor ladder.' },
    { num: 7,  id: 'REFOUT',lbl: 'REFOUT',name: 'Ref Output', type: 'REF', funcs: ['REF'], volt: '1.25V', curr: 'N/A', note: 'Internal 1.25V reference output.' },
    { num: 8,  id: 'REFADJ',lbl: 'REFADJ',name: 'Ref Adjust', type: 'REF', funcs: ['REF'], volt: 'N/A', curr: 'N/A', note: 'Reference adjustment pin for setting LED current and ladder voltage.' },
    { num: 9,  id: 'MODE',  lbl: 'MODE',  name: 'Mode Select', type: 'MODE', funcs: ['MODE'], volt: 'V+', curr: 'N/A', note: 'Floating = Dot Mode, Connected to V+ = Bar Mode.' },

    { num: 10, id: 'LED10', lbl: 'LED 10',name: 'LED 10 Output', type: 'LED', funcs: ['LED'], volt: 'V+', curr: '30mA', note: 'Current-regulated LED driver output 10.', _rightSlot: 8 },
    { num: 11, id: 'LED9',  lbl: 'LED 9', name: 'LED 9 Output', type: 'LED', funcs: ['LED'], volt: 'V+', curr: '30mA', note: 'Current-regulated LED driver output 9.', _rightSlot: 7 },
    { num: 12, id: 'LED8',  lbl: 'LED 8', name: 'LED 8 Output', type: 'LED', funcs: ['LED'], volt: 'V+', curr: '30mA', note: 'Current-regulated LED driver output 8.', _rightSlot: 6 },
    { num: 13, id: 'LED7',  lbl: 'LED 7', name: 'LED 7 Output', type: 'LED', funcs: ['LED'], volt: 'V+', curr: '30mA', note: 'Current-regulated LED driver output 7.', _rightSlot: 5 },
    { num: 14, id: 'LED6',  lbl: 'LED 6', name: 'LED 6 Output', type: 'LED', funcs: ['LED'], volt: 'V+', curr: '30mA', note: 'Current-regulated LED driver output 6.', _rightSlot: 4 },
    { num: 15, id: 'LED5',  lbl: 'LED 5', name: 'LED 5 Output', type: 'LED', funcs: ['LED'], volt: 'V+', curr: '30mA', note: 'Current-regulated LED driver output 5.', _rightSlot: 3 },
    { num: 16, id: 'LED4',  lbl: 'LED 4', name: 'LED 4 Output', type: 'LED', funcs: ['LED'], volt: 'V+', curr: '30mA', note: 'Current-regulated LED driver output 4.', _rightSlot: 2 },
    { num: 17, id: 'LED3',  lbl: 'LED 3', name: 'LED 3 Output', type: 'LED', funcs: ['LED'], volt: 'V+', curr: '30mA', note: 'Current-regulated LED driver output 3.', _rightSlot: 1 },
    { num: 18, id: 'LED2',  lbl: 'LED 2', name: 'LED 2 Output', type: 'LED', funcs: ['LED'], volt: 'V+', curr: '30mA', note: 'Current-regulated LED driver output 2.', _rightSlot: 0 },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'MODE': ['DOT_BAR_SELECT'],
    'RLO':  ['LOW_REF'],
    'RHI':  ['HIGH_REF'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    {label: 'Supply',      value: '3V – 25V',          color: '#ff6b6b'},
    {label: 'Channels',    value: '10 LEDs',           color: '#78c878'},
    {label: 'LED Current', value: '2mA to 30mA',       color: '#50c8c8'},
    {label: 'Modes',       value: 'Dot or Bar',        color: '#c078ff'},
    {label: 'Ref Voltage', value: '1.2V to 12V',       color: '#c8a850'},
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    {label: 'Ladder Res.', value: '10kΩ Internal'},
    {label: 'Input Range', value: 'Down to Ground'},
    {label: 'Logic Level', value: 'TTL / CMOS compatible'},
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Drives LEDs, LCDs or Vacuum Fluorescents',
    'Bar or Dot display mode externally selectable',
    'Expandable to displays of 100 steps',
    'Internal voltage reference from 1.2V to 12V',
    'Operates with single supply less than 3V',
  ],
};