// configs/74hc4051-config.js
// 74HC4051 — NXP / TI 8-Channel Analog Multiplexer / Demultiplexer
// DIP-16 package • 16 pins
// Drop this file into: ic-explorer-assets/configs/

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     '74HC4051',
  partMPN:      '74HC4051D',
  manufacturer: 'NXP / Texas Instruments',
  package:      'DIP-16',
  pinCount:     16,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapmagic.com/search?q=74HC4051',
  downloadURL:  'https://www.snapmagic.com/search?q=74HC4051',
  datasheetURL: 'https://www.nxp.com/docs/en/data-sheet/74HC_HCT4051.pdf',

  // ── LAYOUT HINT (DIP-16) ──────────────────────────────────────
  dipConfig: {
    pinsPerSide:  8,
    bodyX: 68, bodyY: 12, bodyW: 64, bodyH: 176,
    pinLength: 16, pinWidthHalf: 9,
    notchSize: 4, notchX: 8, notchY: 8,
    textSizes: { mfr: 7, part: 10, pkg: 6, pinCount: 5.5 },
    labelSize: 4.8, pinNumSize: 5.5, yOffset: 0
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  // The engine reads this optional map to extend its palette for
  // chip-specific types not in the standard set.
  customTypes: {
    CH:  { c: '#f4a261', bg: 'rgba(244,162,97,.12)',  bd: 'rgba(244,162,97,.35)'  },
    SEL: { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  },
    COM: { c: '#c8a850', bg: 'rgba(200,168,80,.14)',  bd: 'rgba(200,168,80,.35)'  },
    EN:  { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  },
    VEE: { c: '#c078ff', bg: 'rgba(192,120,255,.11)', bd: 'rgba(192,120,255,.28)' },
  },

  // ── PINS ──────────────────────────────────────────────────────
  // DIP-16: pins 1–8 → left side top→bottom (no _rightSlot)
  //         pins 9–16 → right side; _rightSlot 0 = top-right (pin 16)
  //                                 _rightSlot 7 = bottom-right (pin 9)
  pins: [

    // ── LEFT SIDE (pins 1–8, top → bottom) ───────────────────────
    { num:  1, id: 'Y4',  lbl: 'Y4',  name: 'Y4 — Channel 4 I/O',
      type: 'CH',  funcs: ['CH'],
      volt: 'VEE–VCC', curr: 'N/A',
      note: 'Analog channel 4. Address C=1, B=0, A=0 connects Y4 to the common terminal Z (COM). Bidirectional — signal may flow in either direction.' },

    { num:  2, id: 'Y6',  lbl: 'Y6',  name: 'Y6 — Channel 6 I/O',
      type: 'CH',  funcs: ['CH'],
      volt: 'VEE–VCC', curr: 'N/A',
      note: 'Analog channel 6. Address C=1, B=1, A=0 connects Y6 to Z. Bidirectional switch — can be used as MUX input or DEMUX output.' },

    { num:  3, id: 'Z',   lbl: 'Z',   name: 'Z — Common I/O (COM)',
      type: 'COM', funcs: ['COM'],
      volt: 'VEE–VCC', curr: 'N/A',
      note: 'Common terminal (also called COM). Connects to whichever channel Yn is selected by the C:B:A address. In MUX mode this is the output; in DEMUX mode this is the input.' },

    { num:  4, id: 'Y7',  lbl: 'Y7',  name: 'Y7 — Channel 7 I/O',
      type: 'CH',  funcs: ['CH'],
      volt: 'VEE–VCC', curr: 'N/A',
      note: 'Analog channel 7 — the highest-numbered channel. Address C=1, B=1, A=1 connects Y7 to Z. Bidirectional.' },

    { num:  5, id: 'Y5',  lbl: 'Y5',  name: 'Y5 — Channel 5 I/O',
      type: 'CH',  funcs: ['CH'],
      volt: 'VEE–VCC', curr: 'N/A',
      note: 'Analog channel 5. Address C=1, B=0, A=1 connects Y5 to Z. Bidirectional.' },

    { num:  6, id: 'EN',  lbl: '/E',  name: '/E — Enable / Inhibit (active LOW)',
      type: 'EN',  funcs: ['EN'],
      volt: 'CMOS', curr: 'µA',
      note: 'Active-low enable (Inhibit). Drive LOW to enable the selected channel. Drive HIGH to disconnect all channels — useful for bus sharing when multiple 4051s are used together. CMOS logic levels referenced to VCC.' },

    { num:  7, id: 'VEE', lbl: 'VEE', name: 'VEE — Negative Analog Supply',
      type: 'VEE', funcs: ['VEE'],
      volt: '0 to −6V', curr: 'N/A',
      note: 'Negative supply rail. Allows analog signals that swing below GND (e.g., AC audio). In single-supply 0–5V systems connect VEE directly to GND. In dual-supply ±5V systems connect to −5V.' },

    { num:  8, id: 'GND', lbl: 'GND', name: 'GND — Digital Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Digital ground reference. Decouple VCC (pin 16) to GND with a 100 nF ceramic capacitor placed as close to these pins as possible.' },

    // ── RIGHT SIDE (_rightSlot 0=pin 16 top, 7=pin 9 bottom) ─────
    { num: 16, id: 'VCC', lbl: 'VCC', name: 'VCC — Positive Supply',
      type: 'PWR', funcs: ['PWR'],
      volt: '2.0–6.0V', curr: 'N/A',
      note: 'Positive supply voltage. Typical operation at 5V or 3.3V. Decouple with a 100 nF ceramic capacitor and a 10 µF electrolytic placed close to the pin.',
      _rightSlot: 0 },

    { num: 15, id: 'Y3',  lbl: 'Y3',  name: 'Y3 — Channel 3 I/O',
      type: 'CH',  funcs: ['CH'],
      volt: 'VEE–VCC', curr: 'N/A',
      note: 'Analog channel 3. Address C=0, B=1, A=1 connects Y3 to Z. Bidirectional.',
      _rightSlot: 1 },

    { num: 14, id: 'Y0',  lbl: 'Y0',  name: 'Y0 — Channel 0 I/O',
      type: 'CH',  funcs: ['CH'],
      volt: 'VEE–VCC', curr: 'N/A',
      note: 'Analog channel 0. Address C=0, B=0, A=0 connects Y0 to Z. This is the default channel selected when all address lines are LOW. Bidirectional.',
      _rightSlot: 2 },

    { num: 13, id: 'Y1',  lbl: 'Y1',  name: 'Y1 — Channel 1 I/O',
      type: 'CH',  funcs: ['CH'],
      volt: 'VEE–VCC', curr: 'N/A',
      note: 'Analog channel 1. Address C=0, B=0, A=1 connects Y1 to Z. Bidirectional.',
      _rightSlot: 3 },

    { num: 12, id: 'Y2',  lbl: 'Y2',  name: 'Y2 — Channel 2 I/O',
      type: 'CH',  funcs: ['CH'],
      volt: 'VEE–VCC', curr: 'N/A',
      note: 'Analog channel 2. Address C=0, B=1, A=0 connects Y2 to Z. Bidirectional.',
      _rightSlot: 4 },

    { num: 11, id: 'A',   lbl: 'A',   name: 'A — Select Bit 0 (LSB)',
      type: 'SEL', funcs: ['SEL'],
      volt: 'CMOS', curr: 'µA',
      note: 'Select input A — the least-significant bit of the 3-bit channel address (C:B:A). Together with B and C selects one of eight channels Y0–Y7. Also labelled S0 in some datasheets.',
      _rightSlot: 5 },

    { num: 10, id: 'B',   lbl: 'B',   name: 'B — Select Bit 1',
      type: 'SEL', funcs: ['SEL'],
      volt: 'CMOS', curr: 'µA',
      note: 'Select input B — the middle bit of the 3-bit channel address (C:B:A). Also labelled S1 in some datasheets.',
      _rightSlot: 6 },

    { num:  9, id: 'C',   lbl: 'C',   name: 'C — Select Bit 2 (MSB)',
      type: 'SEL', funcs: ['SEL'],
      volt: 'CMOS', curr: 'µA',
      note: 'Select input C — the most-significant bit of the 3-bit channel address (C:B:A). Also labelled S2 in some datasheets.',
      _rightSlot: 7 },

  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'Z':  ['COM', 'Common'],
    'EN': ['INH', '/E'],
    'A':  ['S0'],
    'B':  ['S1'],
    'C':  ['S2'],
    'VEE':['Negative Rail', 'GND (single-supply)'],
  },

  // ── MUX TRUTH TABLE ───────────────────────────────────────────
  // Custom chip-specific data consumed by the engine's detail panel
  // and any chip-page extras.  Key = channel id, value = {c,b,a, pin}.
  muxTable: [
    { c: 0, b: 0, a: 0, ch: 'Y0', pin: 14 },
    { c: 0, b: 0, a: 1, ch: 'Y1', pin: 13 },
    { c: 0, b: 1, a: 0, ch: 'Y2', pin: 12 },
    { c: 0, b: 1, a: 1, ch: 'Y3', pin: 15 },
    { c: 1, b: 0, a: 0, ch: 'Y4', pin:  1 },
    { c: 1, b: 0, a: 1, ch: 'Y5', pin:  5 },
    { c: 1, b: 1, a: 0, ch: 'Y6', pin:  2 },
    { c: 1, b: 1, a: 1, ch: 'Y7', pin:  4 },
  ],

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Type',       value: '8-ch Analog MUX / DEMUX',  color: '#f4a261' },
    { label: 'Technology', value: '74HC High-Speed CMOS',      color: '#e0e5ec' },
    { label: 'Channels',   value: '8 bidirectional (Y0–Y7)',   color: '#f4a261' },
    { label: 'Common Z',   value: 'Pin 3',                     color: '#c8a850' },
    { label: 'Select',     value: 'A(11) / B(10) / C(9)',      color: '#50c8a0' },
    { label: 'Enable /E',  value: 'Pin 6 (active LOW)',        color: '#ff9944' },
    { label: 'VCC',        value: '2.0–6.0V (pin 16)',         color: '#78c878' },
    { label: 'VEE',        value: '0V to −6V (pin 7)',         color: '#c078ff' },
    { label: 'Ron (typ)',  value: '70 Ω @ VCC = 4.5V',        color: '#e0e5ec' },
    { label: 'Bandwidth',  value: '> 100 MHz'                                  },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Type',              value: '8-channel analog multiplexer / demultiplexer' },
    { label: 'Technology',        value: '74HC (High-Speed CMOS)' },
    { label: 'Channels',          value: '8 bidirectional (Y0–Y7)' },
    { label: 'Select inputs',     value: 'A (pin 11) / B (pin 10) / C (pin 9) — 3-bit address C:B:A' },
    { label: 'Common terminal',   value: 'Z on pin 3' },
    { label: 'Enable',            value: '/E (INH) active-LOW on pin 6' },
    { label: 'VCC range',         value: '2.0 V – 6.0 V' },
    { label: 'VEE range',         value: '0 V to −6 V' },
    { label: 'VCC − VEE max',     value: '12 V' },
    { label: 'Ron (typ)',         value: '70 Ω @ VCC = 4.5 V' },
    { label: 'Ron (max)',         value: '125 Ω @ VCC = 4.5 V' },
    { label: 'Bandwidth',         value: '> 100 MHz' },
    { label: 'Operating temp',    value: '−40°C to +125°C' },
    { label: 'VCC max',           value: '7.0 V absolute maximum' },
    { label: 'VEE min',           value: '−7.0 V absolute maximum' },
    { label: 'Signal voltage',    value: 'VEE − 0.5 V to VCC + 0.5 V' },
    { label: 'Packages',          value: 'DIP-16, SOIC-16, TSSOP-16' },
    { label: 'Pin compatible',    value: 'CD4051B, 74HCT4051' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    '8-channel single-ended or 4-channel differential analog multiplexer / demultiplexer',
    'Fully bidirectional — each channel switch can carry signal in either direction',
    'Negative supply VEE enables AC / bipolar signal routing (e.g., audio ±5V)',
    'Low on-resistance typ 70 Ω — minimal insertion loss for analog signal routing',
    'CMOS-level select and enable inputs referenced to VCC, not to the analog signal range',
    'Active-low /E (INH) disconnects all channels simultaneously — ideal for bus sharing',
    'Single-supply 5V: tie VEE to GND to route 0–5V signals',
    'Dual-supply ±5V: routes ±4.5V AC signals with no level shifting needed',
    'Pin-compatible drop-in replacement for CD4051B and 74HCT4051',
    'Select labels A / B / C per NXP and TI datasheets (also shown as S0 / S1 / S2 in some variants)',
  ],

};
