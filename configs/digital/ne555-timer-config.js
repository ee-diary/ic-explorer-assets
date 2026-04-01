// configs/ne555-timer-config.js
// NE555 — Texas Instruments / ST / Generic 555 Timer
// DIP-8 package • 8 pins
// Drop this file into: ic-explorer-assets/configs/

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'NE555',
  partMPN:      'NE555P',
  manufacturer: 'Texas Instruments / STMicroelectronics',
  package:      'DIP-8',
  pinCount:     8,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapmagic.com/search?q=NE555',
  downloadURL:  'https://www.snapmagic.com/search?q=NE555',
  datasheetURL: 'https://www.ti.com/lit/ds/symlink/ne555.pdf',

  // ── LAYOUT HINT (DIP-8) ───────────────────────────────────────
  dipConfig: {
    pinsPerSide:  4,
    bodyX: 48, bodyY: 12, bodyW: 48, bodyH: 88,
    pinLength: 12, pinWidthHalf: 6,
    notchSize: 4, notchX: 6, notchY: 6,
    textSizes: { mfr: 6, part: 9, pkg: 5, pinCount: 4.5 },
    labelSize: 4, pinNumSize: 4.5, yOffset: 0
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  customTypes: {
    OUT:  { c: '#4a9aee', bg: 'rgba(74,154,238,.12)',  bd: 'rgba(74,154,238,.32)' },
    DIS:  { c: '#c8a850', bg: 'rgba(200,168,80,.14)',  bd: 'rgba(200,168,80,.35)' },
    THR:  { c: '#c8a850', bg: 'rgba(200,168,80,.14)',  bd: 'rgba(200,168,80,.35)' },
    TRG:  { c: '#cc6888', bg: 'rgba(204,104,136,.12)', bd: 'rgba(204,104,136,.30)' },
    CTRL: { c: '#7090a8', bg: 'rgba(112,144,168,.12)', bd: 'rgba(112,144,168,.30)' },
    RST:  { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  },
  },

  // ── PINS ──────────────────────────────────────────────────────
  // DIP-8: pins 1–4 → left side top→bottom (no _rightSlot)
  //        pins 5–8 → right side; _rightSlot 0 = top-right (pin 8)
  //                                _rightSlot 3 = bottom-right (pin 5)
  pins: [

    // ── LEFT SIDE (pins 1–4, top → bottom) ───────────────────────
    { num:  1, id: 'GND',  lbl: 'GND',  name: 'GND — Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Connect to circuit common. All voltages are referenced to this pin.' },

    { num:  2, id: 'TRG',  lbl: 'TRG',  name: 'TRIG — Trigger Input',
      type: 'TRG', funcs: ['TRG'],
      volt: '1/3 VCC', curr: '0.5 µA',
      note: 'Trigger input. When this pin falls below 1/3 VCC, the output (pin 3) goes HIGH and the discharge transistor (pin 7) turns OFF. Trigger is active LOW — a momentary pulse is sufficient to initiate timing.' },

    { num:  3, id: 'OUT',  lbl: 'OUT',  name: 'OUT — Output',
      type: 'OUT', funcs: ['OUT'],
      volt: 'VCC', curr: '200 mA',
      note: 'Output. Capable of sourcing or sinking up to 200 mA. Output goes HIGH when triggered (pin 2 < 1/3 VCC) and returns LOW when threshold (pin 6) exceeds 2/3 VCC. In monostable mode, output pulse width = 1.1 × R1 × C1.' },

    { num:  4, id: 'RST',  lbl: 'RST',  name: 'RESET — Reset Input (active LOW)',
      type: 'RST', funcs: ['RST'],
      volt: 'CMOS', curr: '0.1 µA',
      note: 'Active-low reset. Drive LOW to reset the timer — output goes LOW and discharge transistor turns ON. Connect to VCC if not used. Must be held HIGH (> 0.7V) for normal operation.' },

    // ── RIGHT SIDE (_rightSlot 0=pin 8 top, 3=pin 5 bottom) ──────
    { num:  8, id: 'VCC',  lbl: 'VCC',  name: 'VCC — Positive Supply',
      type: 'PWR', funcs: ['PWR'],
      volt: '4.5–16V', curr: '3–10 mA',
      note: 'Positive supply voltage. Operating range 4.5V to 16V. Typically 5V or 9V in hobby circuits. Decouple with a 100 nF ceramic capacitor close to the pin.',
      _rightSlot: 0 },

    { num:  7, id: 'DIS',  lbl: 'DIS',  name: 'DIS — Discharge / Open-Collector Output',
      type: 'DIS', funcs: ['DIS'],
      volt: 'Open', curr: '200 mA',
      note: 'Discharge pin — open-collector output connected internally to ground via an NPN transistor. Discharges the timing capacitor when output is LOW. In astable mode, connects between timing resistors R1 and R2.',
      _rightSlot: 1 },

    { num:  6, id: 'THR',  lbl: 'THR',  name: 'THRESH — Threshold Input',
      type: 'THR', funcs: ['THR'],
      volt: '2/3 VCC', curr: '0.1 µA',
      note: 'Threshold input. When voltage on this pin exceeds 2/3 VCC, the output goes LOW and the discharge transistor turns ON. In monostable mode, this pin monitors the timing capacitor voltage.',
      _rightSlot: 2 },

    { num:  5, id: 'CTRL', lbl: 'CTRL', name: 'CTRL — Control Voltage',
      type: 'CTRL', funcs: ['CTRL'],
      volt: '2/3 VCC', curr: 'N/A',
      note: 'Control voltage input. Provides access to the internal voltage divider (2/3 VCC reference). Can be used to modulate the threshold level for PWM or to override timing. Bypass to ground with a 10 nF capacitor for noise immunity if not used.',
      _rightSlot: 3 },

  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'TRG':  ['TRIGGER', 'Trigger'],
    'THR':  ['THRESHOLD', 'Threshold'],
    'DIS':  ['DISCHARGE', 'Discharge'],
    'OUT':  ['OUTPUT', 'Output'],
    'RST':  ['RESET', '/RESET'],
    'CTRL': ['CONTROL', 'CV'],
  },

  // ── OPERATING MODES ────────────────────────────────────────────
  // Custom chip-specific data for the engine
  modes: [
    { mode: 'Monostable', desc: 'One-shot pulse — trigger on pin 2, output pulse width = 1.1 × R1 × C1' },
    { mode: 'Astable', desc: 'Free-running oscillator — frequency = 1.44 / ((R1 + 2×R2) × C1), duty cycle > 50%' },
    { mode: 'Bistable', desc: 'SR flip-flop — use TRIG to set, THRESH to reset (or use RESET pin)' },
  ],

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Type',        value: 'Precision Timer',            color: '#4a9aee' },
    { label: 'Package',     value: 'DIP-8 / SOIC-8',             color: '#e0e5ec' },
    { label: 'VCC Range',    value: '4.5 – 16 V',                color: '#78c878' },
    { label: 'Supply Current', value: '3 – 10 mA (typ)',        color: '#e0e5ec' },
    { label: 'Output Sink',  value: '200 mA max',                color: '#4a9aee' },
    { label: 'Output Source', value: '200 mA max',              color: '#4a9aee' },
    { label: 'Timing',       value: 'µs to hours',               color: '#c8a850' },
    { label: 'Frequency',    value: 'DC to 500 kHz',            color: '#c8a850' },
    { label: 'Temp Range',    value: '0°C to +70°C (NE555)',    color: '#e0e5ec' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Type',              value: 'Precision timer / oscillator' },
    { label: 'Package',           value: 'DIP-8, SOIC-8, TSSOP-8, TO-99' },
    { label: 'Supply voltage (VCC)', value: '4.5 V to 16 V (18 V abs max)' },
    { label: 'Supply current (typ)', value: '3 mA @ 5V, 6 mA @ 10V, 10 mA @ 15V' },
    { label: 'Timing accuracy',   value: '±1% (NE555), ±2% (LM555)' },
    { label: 'Timing stability',  value: '0.005% / °C' },
    { label: 'Output sink current', value: '200 mA max (continuous)' },
    { label: 'Output source current', value: '200 mA max (continuous)' },
    { label: 'Trigger voltage (typ)', value: '1/3 × VCC (1.67V @ 5V)' },
    { label: 'Threshold voltage (typ)', value: '2/3 × VCC (3.33V @ 5V)' },
    { label: 'Trigger current',    value: '0.5 µA (typ)' },
    { label: 'Threshold current',  value: '0.1 µA (typ)' },
    { label: 'Reset voltage',      value: '0.4 V (active-LOW threshold)' },
    { label: 'Control voltage',    value: '2/3 × VCC (internal reference)' },
    { label: 'Operating temperature', value: '0°C to +70°C (NE555), −55°C to +125°C (SE555)' },
    { label: 'Rise time',          value: '100 ns (typ)' },
    { label: 'Fall time',          value: '100 ns (typ)' },
    { label: 'Max frequency',      value: '~500 kHz (astable mode)' },
    { label: 'Compatible variants', value: 'LM555, SA555, SE555, TLC555 (CMOS), LMC555 (CMOS)' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Precision timing from microseconds to hours — one external resistor and capacitor set timing',
    'Astable (oscillator) mode: frequency = 1.44 / ((R1 + 2×R2) × C1), duty cycle adjustable',
    'Monostable (one-shot) mode: pulse width = 1.1 × R1 × C1, trigger on falling edge',
    'Bistable (flip-flop) mode: use TRIG to set output HIGH, THRESH or RESET to set LOW',
    'High-current output: can sink or source up to 200 mA — direct LED or relay drive',
    'Open-collector discharge pin (pin 7) for timing capacitor — saturates to ~0.1V when ON',
    'Adjustable threshold via control voltage (pin 5) — enables PWM and VCO applications',
    'Active-low reset (pin 4) — overrides all inputs, forces output LOW and discharge ON',
    'Wide supply range 4.5V to 16V — compatible with 5V logic and 9V battery circuits',
    'CMOS variants (TLC555, LMC555) offer lower power consumption and rail-to-rail output',
    'Internal voltage divider sets 1/3 VCC trigger and 2/3 VCC threshold references',
  ],

};