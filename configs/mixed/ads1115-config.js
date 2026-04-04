// configs/ads1115-config.js
// ADS1115 — 16-Bit, 860-SPS, 4-Channel ADC with PGA, Comparator, and I²C Interface
// Texas Instruments  |  VSSOP-10 (DGS) package  |  10 pins
// Datasheet: https://www.ti.com/lit/ds/symlink/ads1115.pdf  (SBAS444E)

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'ADS1115',
  partMPN:      'ADS1115IDGSR',
  manufacturer: 'Texas Instruments',
  package:      'DIP-10',
  pinCount:     10,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/ADS1115IDGSR/Texas%20Instruments/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/ADS1115IDGSR/Texas%20Instruments/view-part/?ref=snapeda',
  datasheetURL: 'https://www.ti.com/lit/ds/symlink/ads1115.pdf',

  // ── LAYOUT HINT (DIP-10) ──────────────────────────────────────
  dipConfig: {
    pinsPerSide:  5,
    bodyX:        122, bodyY:  40, bodyW: 260, bodyH: 350,
    pinLength:    34,  pinWidthHalf: 16,
    notchSize:    8,   notchX: 14, notchY: 14,
    textSizes:    { mfr: 13, part: 22, pkg: 14, pinCount: 11 },
    labelSize:    11,  pinNumSize: 13, yOffset: -40
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  // ADS1115 needs two types beyond the standard palette:
  //   AINP — analog input channels (AIN0–AIN3); standard ADC colour
  //           reused but renamed for clarity in the filter UI.
  //   ALRT — open-drain comparator / conversion-ready output;
  //           distinct from a plain interrupt line.
  //   CFG  — address configuration pin (ADDR); sets I²C address by
  //           connection level, not a live data signal.
  customTypes: {
    AINP: { c: '#c8a850', bg: 'rgba(200,168,80,.13)',  bd: 'rgba(200,168,80,.33)'  }, // analog inputs — gold
    ALRT: { c: '#ff6b9d', bg: 'rgba(255,107,157,.12)', bd: 'rgba(255,107,157,.32)' }, // alert/ready   — pink-red
    CFG:  { c: '#9898d8', bg: 'rgba(152,152,216,.12)', bd: 'rgba(152,152,216,.30)' }, // config/addr   — purple
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  // Replaces the generic GPIO/PWM/SPI/... default set with buttons
  // that match the actual functional groups of this ADC IC.
  filterButtons: [
    { type: 'AINP', label: 'Analog In (AIN0–3)', color: '#c8a850' },
    { type: 'I2C',  label: 'I²C (SDA/SCL)',      color: '#9898d8' },
    { type: 'ALRT', label: 'Alert / RDY',         color: '#ff6b9d' },
    { type: 'CFG',  label: 'Addr Config',          color: '#9898d8' },
    { type: 'PWR',  label: 'VDD',                  color: '#ff6b6b' },
    { type: 'GND',  label: 'GND',                  color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // DIP-10: pins 1–5 → left side top→bottom
  //         pins 6–10 → right side; _rightSlot 0 = top-right (pin 10)
  //                                  _rightSlot 4 = bottom-right (pin 6)
  pins: [

    // ── LEFT SIDE (pins 1–5, top → bottom) ───────────────────────
    { num:  1, id: 'ADDR',      lbl: 'ADDR', name: 'Address Select (ADDR)',
      type: 'CFG',  funcs: ['CFG'],
      volt: '0–VDD', curr: 'N/A',
      note: 'I²C target address select pin. Connect to GND for 0x48, VDD for 0x49, SDA for 0x4A, or SCL for 0x4B. Allows up to four ADS1115 devices on the same I²C bus without address conflicts.' },

    { num:  2, id: 'ALERT_RDY', lbl: 'ALT',  name: 'Comparator Output / Conversion Ready (ALERT/RDY)',
      type: 'ALRT', funcs: ['ALRT'],
      volt: 'Open-drain', curr: '10 mA sink',
      note: 'Open-drain output used as comparator alert or conversion-ready indicator. In comparator mode it asserts LOW when the input crosses a programmed threshold. In conversion-ready mode it pulses LOW when a new result is available. Requires an external 10 kΩ pull-up to VDD.' },

    { num:  3, id: 'GND',       lbl: 'GND',  name: 'Ground (GND)',
      type: 'GND',  funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Analog ground reference. All analog input measurements are referenced to this pin. Connect directly to the system ground plane. Keep the ground return path low-impedance for best noise performance.' },

    { num:  4, id: 'AIN0',      lbl: 'AIN0', name: 'Analog Input 0 (AIN0)',
      type: 'AINP', funcs: ['AINP'],
      volt: 'GND–VDD', curr: 'N/A',
      note: 'Analog input channel 0. Used as the positive input for differential pairs (AIN0–AIN1, AIN0–AIN3) or as a single-ended input measured against GND. Input voltage must remain within GND − 0.3 V to VDD + 0.3 V at all times.' },

    { num:  5, id: 'AIN1',      lbl: 'AIN1', name: 'Analog Input 1 (AIN1)',
      type: 'AINP', funcs: ['AINP'],
      volt: 'GND–VDD', curr: 'N/A',
      note: 'Analog input channel 1. Used as the negative input in the AIN0–AIN1 differential pair, or as a single-ended input. In single-ended mode the internal MUX connects the negative PGA input to GND, reducing effective resolution to 15 bits (0 to +32 767 counts).' },

    // ── RIGHT SIDE (_rightSlot 0=pin 10 top, 4=pin 6 bottom) ─────
    { num: 10, id: 'SCL',       lbl: 'SCL',  name: 'I²C Serial Clock (SCL)',
      type: 'I2C',  funcs: ['I2C'],
      volt: '0–5.5V', curr: 'N/A',
      note: 'I²C serial clock input. Clocks data on the SDA line. SCL is input-only on the ADS1115. Requires an external pull-up resistor to VDD. Maximum clock frequency is 1 MHz (fast-plus mode). Also operates at standard 100 kHz and fast 400 kHz rates.',
      _rightSlot: 0 },

    { num:  9, id: 'SDA',       lbl: 'SDA',  name: 'I²C Serial Data (SDA)',
      type: 'I2C',  funcs: ['I2C'],
      volt: '0–5.5V', curr: '10 mA sink',
      note: 'I²C serial data line — bidirectional open-drain. Requires an external pull-up resistor to VDD. Supports standard (100 kHz), fast (400 kHz), and fast-plus (1 MHz) I²C speeds. Four selectable target addresses via the ADDR pin.',
      _rightSlot: 1 },

    { num:  8, id: 'VDD',       lbl: 'VDD',  name: 'Power Supply (VDD)',
      type: 'PWR',  funcs: ['PWR'],
      volt: '2.0–5.5V', curr: '150 µA typ',
      note: 'Positive power supply. Accepts 2.0 V to 5.5 V. Place a 0.1 µF decoupling capacitor as close as possible to the VDD pin, connected to GND, to suppress power-supply noise and ensure stable reference voltage performance.',
      _rightSlot: 2 },

    { num:  7, id: 'AIN3',      lbl: 'AIN3', name: 'Analog Input 3 (AIN3)',
      type: 'AINP', funcs: ['AINP'],
      volt: 'GND–VDD', curr: 'N/A',
      note: 'Analog input channel 3. Available on ADS1115 only. Used as the negative input in the AIN2–AIN3 pair, or as the negative input for AIN0–AIN3 and AIN1–AIN3 differential measurements, or as a single-ended channel. Connect unused inputs to GND.',
      _rightSlot: 3 },

    { num:  6, id: 'AIN2',      lbl: 'AIN2', name: 'Analog Input 2 (AIN2)',
      type: 'AINP', funcs: ['AINP'],
      volt: 'GND–VDD', curr: 'N/A',
      note: 'Analog input channel 2. Available on ADS1115 only (not on ADS1113/ADS1114). Used as a single-ended input or as the positive input in the AIN2–AIN3 differential pair. Connect unused AIN pins to GND to avoid floating inputs affecting adjacent channel conversions.',
      _rightSlot: 4 },

  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'ALERT_RDY': ['COMP', 'RDY'],
    'AIN0':      ['AINP', 'AIN0–AIN1+', 'AIN0–AIN3+'],
    'AIN1':      ['AINN', 'AIN0–AIN1−', 'AIN1–AIN3+'],
    'AIN2':      ['AIN2–AIN3+'],
    'AIN3':      ['AIN2–AIN3−', 'AIN0–AIN3−', 'AIN1–AIN3−'],
    'ADDR':      ['A0', 'A1'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Resolution',  value: '16-bit',              color: '#c8a850' },
    { label: 'Sample Rate', value: '8–860 SPS',           color: '#c8a850' },
    { label: 'Supply',      value: '2.0–5.5 V',           color: '#78c878' },
    { label: 'Current',     value: '150 µA typ',          color: '#e0e5ec' },
    { label: 'Interface',   value: 'I²C (4 addresses)',   color: '#9898d8' },
    { label: 'PGA Range',   value: '±256 mV – ±6.144 V',  color: '#c8a850' },
    { label: 'Channels',    value: '4 SE or 2 Diff',      color: '#c8a850' },
    { label: 'Alert/RDY',   value: 'Pin 2 (open-drain)',  color: '#ff6b9d' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',         value: '16-bit delta-sigma (ΔΣ) ADC' },
    { label: 'Input Channels',       value: '4 single-ended or 2 differential' },
    { label: 'PGA Full-Scale Range', value: '±6.144 V, ±4.096 V, ±2.048 V (default), ±1.024 V, ±0.512 V, ±0.256 V' },
    { label: 'Data Rates',           value: '8, 16, 32, 64, 128, 250, 475, 860 SPS' },
    { label: 'INL',                  value: '±0.005% FSR (typ)' },
    { label: 'Offset Drift',         value: '±0.5 µV/°C (typ)' },
    { label: 'Gain Drift',           value: '±10 ppm/°C (typ)' },
    { label: 'I²C Address',          value: '0x48 / 0x49 / 0x4A / 0x4B (ADDR pin)' },
    { label: 'I²C Speed',            value: 'Standard (100 kHz), Fast (400 kHz), Fast-plus (1 MHz)' },
    { label: 'Supply Voltage',       value: '2.0 V to 5.5 V' },
    { label: 'Quiescent Current',    value: '150 µA (continuous), 2 µA (power-down)' },
    { label: 'Operating Temp',       value: '−40°C to +125°C' },
    { label: 'Package',              value: 'VSSOP-10 (DGS), SOT-10 (DYN), X2QFN-10 (RUG)' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    '16-bit delta-sigma ADC with single-cycle settling for glitch-free MUX switching',
    'Programmable Gain Amplifier (PGA) with six gain settings from ±256 mV to ±6.144 V full-scale',
    '4:1 input MUX supporting four single-ended or two differential input measurements',
    'Built-in low-drift internal voltage reference and oscillator — no external components required',
    'I²C interface with four hardware-selectable addresses (0x48–0x4B) via ADDR pin',
    'Programmable digital comparator with windowed threshold detection for under/overvoltage alerts',
    'ALERT/RDY pin supports both comparator output and conversion-ready notification modes',
    'Two conversion modes: continuous-conversion and single-shot (auto power-down after conversion)',
    'Ultra-low quiescent current: 150 µA continuous, 2 µA in power-down mode',
    'Wide supply range 2.0 V to 5.5 V — compatible with 3.3 V and 5 V microcontroller systems',
    'Differential mode retains full 16-bit signed range (±32 767 counts) — ideal for bridge sensors',
    'Available in ultra-compact X2QFN (2 mm × 1.5 mm), SOT, and VSSOP packages',
  ],

};
