// configs/74hc595-config.js
window.IC_CONFIG = {
  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     '74HC595',
  partMPN:      'SN74HC595N',
  manufacturer: 'Texas Instruments',
  package:      'DIP-16',
  pinCount:     16,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/SN74HC595N/Texas%20Instruments/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/SN74HC595N/Texas%20Instruments/download/',
  datasheetURL: 'https://www.ti.com/lit/ds/symlink/sn74hc595.pdf',

  // ── LAYOUT HINT (DIP-16) ──────────────────────────────────────
  dipConfig: {
    pinsPerSide: 8,
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 700,
    pinLength: 44,
    pinWidthHalf: 22,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },
    labelSize: 11, pinNumSize: 14, yOffset: -60
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  // The 74HC595 is a shift register — its functional groups do not
  // map onto standard MCU types (GPIO, UART, SPI, etc.), so we define
  // chip-specific types here to give each group a distinct colour.
  customTypes: {
    OUT:  { c: '#78c878', bg: 'rgba(120,200,120,.12)', bd: 'rgba(120,200,120,.32)' }, // parallel outputs QA–QH
    SOUT: { c: '#4a9aee', bg: 'rgba(74,154,238,.12)',  bd: 'rgba(74,154,238,.32)'  }, // serial cascade output QH'
    DATA: { c: '#c8a850', bg: 'rgba(200,168,80,.13)',  bd: 'rgba(200,168,80,.33)'  }, // serial data input DS
    CLK:  { c: '#50c8c8', bg: 'rgba(80,200,200,.11)',  bd: 'rgba(80,200,200,.30)'  }, // clock lines SHCP, STCP
    CTRL: { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  }, // control lines OE, SRCLR
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  // Replaces the default GPIO/PWM/ADC/... set with buttons that
  // reflect the actual functional groups of this shift register IC.
  filterButtons: [
    { type: 'OUT',  label: 'Output(QA–QH)', color: '#78c878' },
    { type: 'SOUT', label: "SerialOut(QH')", color: '#4a9aee' },
    { type: 'DATA', label: 'Data(DS)',        color: '#c8a850' },
    { type: 'CLK',  label: 'Clock(SHCP/STCP)', color: '#50c8c8' },
    { type: 'CTRL', label: 'Control(OE/CLR)', color: '#ff9944' },
    { type: 'PWR',  label: 'VCC',              color: '#ff6b6b' },
    { type: 'GND',  label: 'GND',              color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // DIP-16: pins 1–8 → left side top→bottom (no _rightSlot)
  //         pins 9–16 → right side; _rightSlot 0 = top-right (pin 16)
  //                                 _rightSlot 7 = bottom-right (pin 9)
  pins: [

    // ── LEFT SIDE (pins 1–8, top → bottom) ───────────────────────
    { num:  1, id: 'QB',   lbl: 'QB',   name: 'QB — Parallel Output Bit 1',
      type: 'OUT',  funcs: ['OUT'],
      volt: 'VCC', curr: '35 mA',
      note: 'Parallel output bit 1 (second shifted bit). Active when OE is LOW. High drive capable — can directly drive LEDs with a current-limiting resistor.' },

    { num:  2, id: 'QC',   lbl: 'QC',   name: 'QC — Parallel Output Bit 2',
      type: 'OUT',  funcs: ['OUT'],
      volt: 'VCC', curr: '35 mA',
      note: 'Parallel output bit 2. Same electrical characteristics as all QA–QH outputs.' },

    { num:  3, id: 'QD',   lbl: 'QD',   name: 'QD — Parallel Output Bit 3',
      type: 'OUT',  funcs: ['OUT'],
      volt: 'VCC', curr: '35 mA',
      note: 'Parallel output bit 3.' },

    { num:  4, id: 'QE',   lbl: 'QE',   name: 'QE — Parallel Output Bit 4',
      type: 'OUT',  funcs: ['OUT'],
      volt: 'VCC', curr: '35 mA',
      note: 'Parallel output bit 4.' },

    { num:  5, id: 'QF',   lbl: 'QF',   name: 'QF — Parallel Output Bit 5',
      type: 'OUT',  funcs: ['OUT'],
      volt: 'VCC', curr: '35 mA',
      note: 'Parallel output bit 5.' },

    { num:  6, id: 'QG',   lbl: 'QG',   name: 'QG — Parallel Output Bit 6',
      type: 'OUT',  funcs: ['OUT'],
      volt: 'VCC', curr: '35 mA',
      note: 'Parallel output bit 6.' },

    { num:  7, id: 'QH',   lbl: 'QH',   name: 'QH — Parallel Output Bit 7',
      type: 'OUT',  funcs: ['OUT'],
      volt: 'VCC', curr: '35 mA',
      note: 'Parallel output bit 7 — last bit in the shift chain. QH is the final bit latched from the serial stream.' },

    { num:  8, id: 'GND',  lbl: 'GND',  name: 'GND — Ground',
      type: 'GND',  funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Place a 100 nF ceramic decoupling capacitor between VCC (pin 16) and GND (pin 8) as close to the IC as possible.' },

    // ── RIGHT SIDE (_rightSlot 0=pin 16 top, 7=pin 9 bottom) ─────
    { num: 16, id: 'VCC',   lbl: 'VCC',  name: 'VCC — Power Supply',
      type: 'PWR',  funcs: ['PWR'],
      volt: '2.0–6.0V', curr: 'N/A',
      note: 'Positive supply. 2.0V–6.0V range. Works with both 3.3V and 5V logic. Decouple with 100 nF cap to GND.',
      _rightSlot: 0 },

    { num: 15, id: 'QA',   lbl: 'QA',   name: 'QA — Parallel Output Bit 0',
      type: 'OUT',  funcs: ['OUT'],
      volt: 'VCC', curr: '35 mA',
      note: 'Parallel output bit 0 — the first bit shifted in appears here. All outputs (QA–QH) update simultaneously on the rising edge of STCP.',
      _rightSlot: 1 },

    { num: 14, id: 'DS',   lbl: 'DS',   name: 'DS — Serial Data Input',
      type: 'DATA', funcs: ['DATA'],
      volt: 'VCC', curr: 'N/A',
      note: 'Serial data input (also called SIN or MOSI). Data is sampled on the rising edge of SHCP. Send MSB first for QA to receive the last bit.',
      _rightSlot: 2 },

    { num: 13, id: 'OE',   lbl: 'OE',   name: 'OE — Output Enable',
      type: 'CTRL', funcs: ['CTRL'],
      volt: 'VCC', curr: 'N/A',
      note: 'Active-LOW output enable. Pull LOW to enable outputs QA–QH. Pull HIGH to tri-state all outputs without disturbing shift or storage register contents. Tie LOW if not needed.',
      _rightSlot: 3 },

    { num: 12, id: 'STCP', lbl: 'STCP', name: 'STCP — Storage Register Clock (Latch)',
      type: 'CLK',  funcs: ['CLK'],
      volt: 'VCC', curr: 'N/A',
      note: 'Storage/latch clock (also called RCLK or LATCH). On rising edge, contents of the 8-bit shift register are transferred to the storage register, updating QA–QH simultaneously.',
      _rightSlot: 4 },

    { num: 11, id: 'SHCP', lbl: 'SHCP', name: 'SHCP — Shift Register Clock',
      type: 'CLK',  funcs: ['CLK'],
      volt: 'VCC', curr: 'N/A',
      note: 'Shift register clock (also called SRCLK or SCK). DS data is sampled on each rising edge. Max frequency: 100 MHz @ 5V, 80 MHz @ 3.3V.',
      _rightSlot: 5 },

    { num: 10, id: 'SRCLR', lbl: 'SRCLR', name: 'SRCLR — Shift Register Clear',
      type: 'CTRL', funcs: ['CTRL'],
      volt: 'VCC', curr: 'N/A',
      note: 'Active-LOW asynchronous clear for the shift register only. Does not affect storage register or outputs. Tie HIGH (VCC) if not used — must not be left floating.',
      _rightSlot: 6 },

    { num:  9, id: 'QHp',  lbl: "QH'",  name: "QH' — Serial Cascade Output",
      type: 'SOUT', funcs: ['SOUT'],
      volt: 'VCC', curr: '35 mA',
      note: "Serial output directly from the shift register (not latched). Connect to DS of the next 74HC595 to chain multiple ICs and expand parallel outputs indefinitely using the same 3 control lines.",
      _rightSlot: 7 },

  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'DS':    ['SIN', 'MOSI', 'SDI'],
    'SHCP':  ['SRCLK', 'SCK', 'CLK'],
    'STCP':  ['RCLK', 'LATCH', 'LE'],
    'SRCLR': ['SCLR', 'MR', 'RST'],
    'OE':    ['G', 'EN'],
    'QHp':   ["QH'", 'SOUT', 'MISO', 'SDO'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Type',          value: '8-bit Shift Register',     color: '#e0e5ec' },
    { label: 'Outputs',       value: '8 latched (QA–QH)',        color: '#78c878' },
    { label: 'Serial Out',    value: "QH' (cascadable)",         color: '#4a9aee' },
    { label: 'Max Freq',      value: '100 MHz @ 5V',             color: '#50c8c8' },
    { label: 'Supply',        value: '2.0–6.0V',                 color: '#78c878' },
    { label: 'Output Drive',  value: '±35 mA per pin',           color: '#e0e5ec' },
    { label: 'Interface',     value: 'SPI (DS, SHCP, STCP)',     color: '#c8a850' },
    { label: 'Output Enable', value: 'Active-Low OE',            color: '#ff9944' },
    { label: 'Package',       value: 'DIP-16, SOIC-16, TSSOP',  color: '#e0e5ec' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Logic Family',      value: '74HC — High-Speed CMOS' },
    { label: 'Function',          value: 'Serial-In / Parallel-Out' },
    { label: 'Supply Voltage',    value: '2.0V – 6.0V' },
    { label: 'Output Drive',      value: '±35 mA per output (QA–QH)' },
    { label: 'Max Clock',         value: '100 MHz @ 5V; 80 MHz @ 3.3V' },
    { label: 'Propagation Delay', value: '13 ns typical @ 5V' },
    { label: 'Outputs',           value: "8 latched + 1 serial (QH')" },
    { label: 'Interface',         value: 'SPI: DS (data), SHCP (shift clk), STCP (latch)' },
    { label: 'Output Enable',     value: 'Active-LOW OE (tri-state when HIGH)' },
    { label: 'Async Clear',       value: 'Active-LOW SRCLR (clears shift reg only)' },
    { label: 'VCC max',           value: '7.0V' },
    { label: 'I/O pin voltage',   value: '-0.5V to VCC+0.5V' },
    { label: 'VIL (input low)',   value: '0.3 × VCC max' },
    { label: 'VIH (input high)',  value: '0.7 × VCC min' },
    { label: 'VOL (output low)',  value: '0.1V @ 6 mA sink (5V)' },
    { label: 'VOH (output high)', value: 'VCC - 0.1V @ 6 mA source' },
    { label: 'ICC quiescent',     value: '80 µA max @ 6V' },
    { label: 'Operating temp',    value: '-40 to +125 °C' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    '8-bit serial-to-parallel: expand GPIO with just 3 MCU pins (DS, SHCP, STCP)',
    'SPI-compatible interface — works directly with Arduino shiftOut(), SPI library, etc.',
    "QH' cascade output: chain multiple 74HC595s for unlimited parallel outputs",
    'Separate shift and storage registers — outputs only update on STCP rising edge',
    'Active-LOW OE: tri-state all outputs without disturbing register contents',
    'Active-LOW SRCLR: asynchronously clears shift register; tie HIGH if unused',
    'High drive: ±35 mA per output — drive LEDs, relays, or other loads directly',
    'Wide supply: 2.0V–6.0V — compatible with 3.3V MCUs and 5V logic systems',
    '100 MHz max shift clock frequency at 5V supply voltage',
    '3-state outputs: HIGH, LOW, or Hi-Z controlled via OE pin',
    'Typical applications: LED arrays, 7-seg displays, relay boards, SPI I/O expanders',
  ],
};
