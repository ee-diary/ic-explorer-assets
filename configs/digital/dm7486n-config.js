// configs/dm7486n-config.js
window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'DM7486N',
  partMPN:      'DM7486N',
  manufacturer: 'NATIONAL_SEMICONDUCTOR',
  package:      'DIP-14',
  pinCount:     14,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/DM7486N/National%20Semiconductor/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/DM7486N/National%20Semiconductor/download/',
  datasheetURL: 'https://www.ti.com/lit/ds/symlink/sn7486.pdf',

  // ── LAYOUT HINT (DIP) ────────────────────────────────────────
  dipConfig: {
    pinsPerSide: 7,    // half of pinCount
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 700,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },
    labelSize: 11, pinNumSize: 14, yOffset: -60
  },

  // ── CUSTOM TYPE COLOURS (logic gate specific) ─────────────────
  customTypes: {
    INPUT: { c: '#4a9aee', bg: 'rgba(74,154,238,0.12)', bd: 'rgba(74,154,238,0.35)' },
    OUTPUT: { c: '#78c878', bg: 'rgba(120,200,120,0.12)', bd: 'rgba(120,200,120,0.35)' },
  },

  // ── FILTER BUTTONS (logic gate specific) ──────────────────────
  filterButtons: [
    { type: 'INPUT', label: 'Input (A/B)', color: '#4a9aee' },
    { type: 'OUTPUT', label: 'Output (Y)', color: '#78c878' },
    { type: 'PWR', label: 'VCC', color: '#ff6b6b' },
    { type: 'GND', label: 'GND', color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // DIP-14 pin numbering:
  // Pins 1-7 (left side, top→bottom), Pins 8-14 (right side, bottom→top)
  pins: [
    // LEFT SIDE (pins 1-7, top to bottom)
    {
      num:  1,
      id:   '1A',
      lbl:  '1A',
      name: 'Gate 1 Input A',
      type: 'INPUT',
      funcs: ['INPUT'],
      volt: '5V',
      curr: '-1.6 mA',
      note: 'Input A of first XOR gate. Standard TTL input with clamping diode to VCC.'
    },
    {
      num:  2,
      id:   '1B',
      lbl:  '1B',
      name: 'Gate 1 Input B',
      type: 'INPUT',
      funcs: ['INPUT'],
      volt: '5V',
      curr: '-1.6 mA',
      note: 'Input B of first XOR gate. Standard TTL input with clamping diode to VCC.'
    },
    {
      num:  3,
      id:   '1Y',
      lbl:  '1Y',
      name: 'Gate 1 Output Y',
      type: 'OUTPUT',
      funcs: ['OUTPUT'],
      volt: '5V',
      curr: '16 mA',
      note: 'Output of first XOR gate. Y = A ⊕ B. TTL totem-pole output.'
    },
    {
      num:  4,
      id:   '2A',
      lbl:  '2A',
      name: 'Gate 2 Input A',
      type: 'INPUT',
      funcs: ['INPUT'],
      volt: '5V',
      curr: '-1.6 mA',
      note: 'Input A of second XOR gate.'
    },
    {
      num:  5,
      id:   '2B',
      lbl:  '2B',
      name: 'Gate 2 Input B',
      type: 'INPUT',
      funcs: ['INPUT'],
      volt: '5V',
      curr: '-1.6 mA',
      note: 'Input B of second XOR gate.'
    },
    {
      num:  6,
      id:   '2Y',
      lbl:  '2Y',
      name: 'Gate 2 Output Y',
      type: 'OUTPUT',
      funcs: ['OUTPUT'],
      volt: '5V',
      curr: '16 mA',
      note: 'Output of second XOR gate. Y = A ⊕ B.'
    },
    {
      num:  7,
      id:   'GND',
      lbl:  'GND',
      name: 'Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: 'N/A',
      note: 'Ground (0V) reference for all gates.',
      _rightSlot: 0
    },

    // RIGHT SIDE (pins 8-14, bottom to top)
    {
      num:  8,
      id:   '3Y',
      lbl:  '3Y',
      name: 'Gate 3 Output Y',
      type: 'OUTPUT',
      funcs: ['OUTPUT'],
      volt: '5V',
      curr: '16 mA',
      note: 'Output of third XOR gate. Y = A ⊕ B.',
      _rightSlot: 1
    },
    {
      num:  9,
      id:   '3B',
      lbl:  '3B',
      name: 'Gate 3 Input B',
      type: 'INPUT',
      funcs: ['INPUT'],
      volt: '5V',
      curr: '-1.6 mA',
      note: 'Input B of third XOR gate.',
      _rightSlot: 2
    },
    {
      num:  10,
      id:   '3A',
      lbl:  '3A',
      name: 'Gate 3 Input A',
      type: 'INPUT',
      funcs: ['INPUT'],
      volt: '5V',
      curr: '-1.6 mA',
      note: 'Input A of third XOR gate.',
      _rightSlot: 3
    },
    {
      num:  11,
      id:   '4Y',
      lbl:  '4Y',
      name: 'Gate 4 Output Y',
      type: 'OUTPUT',
      funcs: ['OUTPUT'],
      volt: '5V',
      curr: '16 mA',
      note: 'Output of fourth XOR gate. Y = A ⊕ B.',
      _rightSlot: 4
    },
    {
      num:  12,
      id:   '4B',
      lbl:  '4B',
      name: 'Gate 4 Input B',
      type: 'INPUT',
      funcs: ['INPUT'],
      volt: '5V',
      curr: '-1.6 mA',
      note: 'Input B of fourth XOR gate.',
      _rightSlot: 5
    },
    {
      num:  13,
      id:   '4A',
      lbl:  '4A',
      name: 'Gate 4 Input A',
      type: 'INPUT',
      funcs: ['INPUT'],
      volt: '5V',
      curr: '-1.6 mA',
      note: 'Input A of fourth XOR gate.',
      _rightSlot: 6
    },
    {
      num:  14,
      id:   'VCC',
      lbl:  'VCC',
      name: 'Supply Voltage',
      type: 'PWR',
      funcs: ['PWR'],
      volt: '5V',
      curr: '22 mA',
      note: 'Positive supply voltage (+5V ±5%). Bypass with 0.1µF capacitor to GND.',
      _rightSlot: 7
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {},

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Logic Family', value: 'TTL (74LS/74S/74HC compatible)', color: '#78c878' },
    { label: 'Gates', value: '4 × 2-input XOR', color: '#4a9aee' },
    { label: 'Prop Delay', value: '22 ns (typical)', color: '#c8a850' },
    { label: 'Supply', value: '5V ±5%', color: '#ff6b6b' },
    { label: 'Output Current', value: '16 mA (sink)', color: '#78c878' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Function', value: 'Quad 2-Input XOR Gate' },
    { label: 'Logic', value: 'Y = A ⊕ B (A XOR B)' },
    { label: 'VIH (min)', value: '2.0V' },
    { label: 'VIL (max)', value: '0.8V' },
    { label: 'VOH (min)', value: '2.4V (at 400µA)' },
    { label: 'VOL (max)', value: '0.4V (at 16mA)' },
    { label: 'IIH (max)', value: '40µA' },
    { label: 'IIL (max)', value: '-1.6mA' },
    { label: 'ICC (max)', value: '22mA' },
    { label: 'Operating Temp', value: '0°C to 70°C' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Four independent 2-input XOR gates in one package',
    'Standard TTL totem-pole outputs',
    'Input clamping diodes for transient protection',
    'Direct replacement for 7486, DM7486, SN7486',
    'Compatible with 74LS, 74S, and 74HC families',
    'Typical propagation delay: 22ns',
    'Typical power dissipation: 110mW',
  ],
};
