// configs/max7219-config.js
// MAX7219 — Serially Interfaced, 8-Digit LED Display Driver
// Package: DIP-24  |  Manufacturer: Maxim Integrated (now Analog Devices)

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'MAX7219',
  partMPN:      'MAX7219CNG+',
  manufacturer: 'Maxim Integrated',
  package:      'DIP-24',
  pinCount:     24,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/MAX7219CNG%2B/Maxim%20Integrated/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/MAX7219CNG%2B/Maxim%20Integrated/view-part/?ref=snapeda',
  datasheetURL: 'https://www.analog.com/media/en/technical-documentation/data-sheets/MAX7219-MAX7221.pdf',

  // ── LAYOUT HINT ───────────────────────────────────────────────
  dipConfig: {
    pinsPerSide:  12,
    bodyX:        122, bodyY: 25, bodyW: 260, bodyH: 420,
    pinLength:    34,  pinWidthHalf: 16,
    notchSize:    8,   notchX: 14, notchY: 14,
    textSizes:    { mfr: 13, part: 22, pkg: 15, pinCount: 12 },
    labelSize:    11,  pinNumSize: 14, yOffset: -60
  },

  // ── CUSTOM PIN TYPES ──────────────────────────────────────────
  // MAX7219 has chip-specific functional groups that don't map to
  // standard MCU types, so we define them here.
  customTypes: {
    DIG:  { c: '#78c8f0', bg: 'rgba(120,200,240,.12)', bd: 'rgba(120,200,240,.35)' }, // Digit drive outputs
    SEG:  { c: '#f4a261', bg: 'rgba(244,162,97,.12)',  bd: 'rgba(244,162,97,.35)'  }, // Segment outputs
    DOUT: { c: '#c078ff', bg: 'rgba(192,120,255,.11)', bd: 'rgba(192,120,255,.28)' }, // Serial data out (daisy-chain)
    ISET: { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  }, // Current set resistor
    CLK:  { c: '#7090a8', bg: 'rgba(112,144,168,.12)', bd: 'rgba(112,144,168,.30)' }, // Serial clock
    CS:   { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  }, // Chip select (active low)
    DIN:  { c: '#cc6888', bg: 'rgba(204,104,136,.12)', bd: 'rgba(204,104,136,.30)' }, // Serial data in
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'DIG',  label: 'Digit(DIG0–7)',   color: '#78c8f0', fontSize:"8" },
    { type: 'SEG',  label: 'Seg(A–G,DP)', color: '#f4a261', fontSize:"8" },
    { type: 'DIN',  label: 'Data In',       color: '#cc6888', fontSize:"11" },
    { type: 'DOUT', label: 'Data Out',       color: '#c078ff', fontSize:"11" },
    { type: 'CLK',  label: 'Clock',     color: '#7090a8' },
    { type: 'CS',   label: 'Load/CS',         color: '#ff9944' },
    { type: 'ISET', label: 'ISET',              color: '#50c8a0' },
    { type: 'PWR',  label: 'VCC',               color: '#ff6b6b' },
    { type: 'GND',  label: 'GND',               color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // DIP-24: pins 1–12 on the left side (top→bottom), pins 13–24 on the
  // right side (bottom→top), each right-side pin carrying _rightSlot.
  pins: [
    // ── LEFT SIDE (pins 1–12) ────────────────────────────────────
    { num:  1, id: 'DIN',   lbl: 'DIN',   name: 'Serial Data In',
      type: 'DIN',  funcs: ['DIN'],
      volt: '5V', curr: 'N/A',
      note: 'Serial data input. Data is loaded into the internal 16-bit shift register on CLK\'s rising edge. The most-significant bit is shifted in first.' },

    { num:  2, id: 'DIG0',  lbl: 'DIG0',  name: 'Digit 0 Drive (Cathode)',
      type: 'DIG',  funcs: ['DIG'],
      volt: '5V', curr: '500 mA (sink)',
      note: 'Digit 0 cathode drive output. Pulled low during the digit\'s multiplex timeslot to select the corresponding digit in the display matrix.' },

    { num:  3, id: 'DIG4',  lbl: 'DIG4',  name: 'Digit 4 Drive (Cathode)',
      type: 'DIG',  funcs: ['DIG'],
      volt: '5V', curr: '500 mA (sink)',
      note: 'Digit 4 cathode drive output. Pulled low during the digit\'s multiplex timeslot.' },

    { num:  4, id: 'GND1',  lbl: 'GND',   name: 'Ground (Pin 4)',
      type: 'GND',  funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Both GND pins (4 and 9) must be connected to the system ground plane.' },

    { num:  5, id: 'DIG6',  lbl: 'DIG6',  name: 'Digit 6 Drive (Cathode)',
      type: 'DIG',  funcs: ['DIG'],
      volt: '5V', curr: '500 mA (sink)',
      note: 'Digit 6 cathode drive output. Pulled low during the digit\'s multiplex timeslot.' },

    { num:  6, id: 'DIG2',  lbl: 'DIG2',  name: 'Digit 2 Drive (Cathode)',
      type: 'DIG',  funcs: ['DIG'],
      volt: '5V', curr: '500 mA (sink)',
      note: 'Digit 2 cathode drive output. Pulled low during the digit\'s multiplex timeslot.' },

    { num:  7, id: 'SEG_A', lbl: 'SEG A', name: 'Segment A Output',
      type: 'SEG',  funcs: ['SEG'],
      volt: '5V', curr: '100 mA (source)',
      note: 'Segment A source driver output. Driven high during the active digit timeslot when segment A should illuminate. Current is set by the RSET resistor on ISET.' },

    { num:  8, id: 'SEG_F', lbl: 'SEG F', name: 'Segment F Output',
      type: 'SEG',  funcs: ['SEG'],
      volt: '5V', curr: '100 mA (source)',
      note: 'Segment F source driver output. Driven high during the active digit timeslot when segment F should illuminate.' },

    { num:  9, id: 'GND2',  lbl: 'GND',   name: 'Ground (Pin 9)',
      type: 'GND',  funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Both GND pins (4 and 9) must be connected to the system ground plane for stable operation.' },

    { num: 10, id: 'SEG_B', lbl: 'SEG B', name: 'Segment B Output',
      type: 'SEG',  funcs: ['SEG'],
      volt: '5V', curr: '100 mA (source)',
      note: 'Segment B source driver output. Driven high during the active digit timeslot when segment B should illuminate.' },

    { num: 11, id: 'SEG_G', lbl: 'SEG G', name: 'Segment G Output',
      type: 'SEG',  funcs: ['SEG'],
      volt: '5V', curr: '100 mA (source)',
      note: 'Segment G source driver output. Driven high during the active digit timeslot when segment G should illuminate.' },

    { num: 12, id: 'ISET',  lbl: 'ISET',  name: 'Peak Segment Current Set',
      type: 'ISET', funcs: ['ISET'],
      volt: '5V', curr: 'N/A',
      note: 'A resistor connected between ISET and V+ sets the peak segment current for all outputs. Typical RSET values: 9.53 kΩ → ~40 mA, 47.5 kΩ → ~10 mA. See datasheet Table 11.' },

    // ── RIGHT SIDE (pins 13–24, _rightSlot 0 = top-right) ────────
    { num: 13, id: 'VCC',   lbl: 'VCC',   name: 'Supply Voltage',
      type: 'PWR',  funcs: ['PWR'],
      volt: '4.0–5.5V', curr: 'N/A',
      note: 'Positive supply voltage. Decouple with a 100 nF ceramic capacitor and a 10 µF electrolytic capacitor placed as close to the VCC and GND pins as possible.',
      _rightSlot: 11 },

    { num: 14, id: 'DIG3',  lbl: 'DIG3',  name: 'Digit 3 Drive (Cathode)',
      type: 'DIG',  funcs: ['DIG'],
      volt: '5V', curr: '500 mA (sink)',
      note: 'Digit 3 cathode drive output. Pulled low during the digit\'s multiplex timeslot.',
      _rightSlot: 10 },

    { num: 15, id: 'DIG7',  lbl: 'DIG7',  name: 'Digit 7 Drive (Cathode)',
      type: 'DIG',  funcs: ['DIG'],
      volt: '5V', curr: '500 mA (sink)',
      note: 'Digit 7 cathode drive output. Pulled low during the digit\'s multiplex timeslot.',
      _rightSlot: 9 },

    { num: 16, id: 'DIG5',  lbl: 'DIG5',  name: 'Digit 5 Drive (Cathode)',
      type: 'DIG',  funcs: ['DIG'],
      volt: '5V', curr: '500 mA (sink)',
      note: 'Digit 5 cathode drive output. Pulled low during the digit\'s multiplex timeslot.',
      _rightSlot: 8 },

    { num: 17, id: 'DIG1',  lbl: 'DIG1',  name: 'Digit 1 Drive (Cathode)',
      type: 'DIG',  funcs: ['DIG'],
      volt: '5V', curr: '500 mA (sink)',
      note: 'Digit 1 cathode drive output. Pulled low during the digit\'s multiplex timeslot.',
      _rightSlot: 7 },

    { num: 18, id: 'CLK',   lbl: 'CLK',   name: 'Serial Clock Input',
      type: 'CLK',  funcs: ['CLK'],
      volt: '5V', curr: 'N/A',
      note: 'Serial clock input. Data is clocked into the internal shift register on the rising edge. Maximum clock frequency is 10 MHz.',
      _rightSlot: 6 },

    { num: 19, id: 'LOAD',  lbl: '/LOAD', name: 'Load / Chip Select (Active Low)',
      type: 'CS',   funcs: ['CS'],
      volt: '5V', curr: 'N/A',
      note: 'Active-low chip select and latch input. On the rising edge of LOAD, the last 16 bits shifted into the register are latched into the digit or control register. Tie high when not addressed.',
      _rightSlot: 5 },

    { num: 20, id: 'DOUT',  lbl: 'DOUT',  name: 'Serial Data Out (Daisy-Chain)',
      type: 'DOUT', funcs: ['DOUT'],
      volt: '5V', curr: 'N/A',
      note: 'Serial data output for daisy-chaining multiple MAX7219 devices. Data propagates from DIN through the internal 16-bit shift register and appears at DOUT 16.5 clock cycles later.',
      _rightSlot: 4 },

    { num: 21, id: 'SEG_DP', lbl: 'SEG DP', name: 'Decimal Point Segment Output',
      type: 'SEG',  funcs: ['SEG'],
      volt: '5V', curr: '100 mA (source)',
      note: 'Decimal point segment source driver output. Controlled by bit D3 in No-Decode mode, or by the decimal point bit in Code-B decode mode.',
      _rightSlot: 3 },

    { num: 22, id: 'SEG_C', lbl: 'SEG C', name: 'Segment C Output',
      type: 'SEG',  funcs: ['SEG'],
      volt: '5V', curr: '100 mA (source)',
      note: 'Segment C source driver output. Driven high during the active digit timeslot when segment C should illuminate.',
      _rightSlot: 2 },

    { num: 23, id: 'SEG_E', lbl: 'SEG E', name: 'Segment E Output',
      type: 'SEG',  funcs: ['SEG'],
      volt: '5V', curr: '100 mA (source)',
      note: 'Segment E source driver output. Driven high during the active digit timeslot when segment E should illuminate.',
      _rightSlot: 1 },

    { num: 24, id: 'SEG_D', lbl: 'SEG D', name: 'Segment D Output',
      type: 'SEG',  funcs: ['SEG'],
      volt: '5V', curr: '100 mA (source)',
      note: 'Segment D source driver output. Driven high during the active digit timeslot when segment D should illuminate.',
      _rightSlot: 0 },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'DOUT':   ['Daisy-chain to next DIN'],
    'SEG_DP': ['Code-B DP bit', 'No-Decode bit D3'],
    'ISET':   ['RSET resistor to V+'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Digits',       value: '8 × 7-seg (or 64 LEDs)', color: '#e0e5ec' },
    { label: 'Interface',    value: '3-wire SPI (10 MHz max)',  color: '#78c8f0' },
    { label: 'Supply',       value: '4.0–5.5V',                color: '#78c878' },
    { label: 'Seg Current',  value: 'Up to 40 mA/segment',     color: '#f4a261' },
    { label: 'Brightness',   value: '16-step PWM control',     color: '#c8a850' },
    { label: 'Daisy-Chain',  value: 'Yes — via DOUT→DIN',      color: '#c078ff' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',    value: 'Serially interfaced LED display driver' },
    { label: 'Digits',          value: '8 common-cathode 7-segment digits' },
    { label: 'Decode Modes',    value: 'Code-B (0–9, E, H, L, P, –) or No-Decode' },
    { label: 'Scan Limit',      value: 'Programmable 1–8 digits' },
    { label: 'Brightness',      value: '16-step digital PWM (via Intensity register)' },
    { label: 'Max Seg Current', value: '40 mA (set by external RSET resistor)' },
    { label: 'Clock Freq',      value: '10 MHz maximum' },
    { label: 'Supply Voltage',  value: '4.0V to 5.5V' },
    { label: 'Supply Current',  value: '330 mA typical at full brightness' },
    { label: 'Shutdown Mode',   value: 'Yes — data retained, displays off' },
    { label: 'Test Mode',       value: 'Yes — all segments and digits on' },
    { label: 'Package',         value: 'DIP-24, SO-24, SSOP-24' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Drives up to 8 common-cathode 7-segment LED digits or 64 individual LEDs',
    '3-wire serial interface compatible with SPI, QSPI, and MICROWIRE',
    'Individual digit decode, on/off, and brightness control via register writes',
    'Internal BCD Code-B decoder eliminates the need to send full segment patterns for digits 0–9',
    'On-chip multiplexing and segment drive circuitry — minimal external components required',
    'Digital brightness control via 4-bit PWM (16 steps, Intensity register 0x0A)',
    'Shutdown register (0x0C) powers down display while retaining all register data',
    'Display test mode (register 0x0F) forces all segments and all digits fully on',
    'Daisy-chainable: connect DOUT of one device to DIN of the next for bus sharing',
    'Peak segment current set by a single external resistor on the ISET pin',
  ],
};