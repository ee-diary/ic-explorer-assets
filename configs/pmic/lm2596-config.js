// configs/lm2596-config.js
// LM2596 — Simple Switcher® Step-Down Voltage Regulator
// Texas Instruments  |  DIP-8 (SO-8 / PDIP) package
// Datasheet: https://www.ti.com/lit/ds/symlink/lm2596.pdf

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'LM2596',
  partMPN:      'LM2596S-ADJ',
  manufacturer: 'Texas Instruments',
  package:      'DIP-8',
  pinCount:     8,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/LM2596S-ADJ/Texas%20Instruments/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/LM2596S-ADJ/Texas%20Instruments/view-part/?ref=snapeda',
  datasheetURL: 'https://www.ti.com/lit/ds/symlink/lm2596.pdf',

  // ── LAYOUT HINT (DIP-8) ───────────────────────────────────────
  dipConfig: {
    pinsPerSide:  4,
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 200,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 11, part: 20, pkg: 13, pinCount: 11 },
    labelSize: 10, pinNumSize: 13, yOffset: 0
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  // LM2596 is a switching regulator — none of its pins map to standard
  // MCU types. We define dedicated types for each functional role.
  customTypes: {
    VIN:  { c: '#ff6b6b', bg: 'rgba(255,107,107,.12)', bd: 'rgba(255,107,107,.35)' },  // input supply — red
    VOUT: { c: '#78c878', bg: 'rgba(120,200,120,.12)', bd: 'rgba(120,200,120,.35)' },  // output / switch — green
    FB:   { c: '#c8a850', bg: 'rgba(200,168,80,.13)',  bd: 'rgba(200,168,80,.35)'  },  // feedback — gold
    OE:   { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.30)'  },  // output enable / on-off — orange
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'VIN',  label: 'VIN(Input)',    color: '#ff6b6b' },
    { type: 'VOUT', label: 'Output/SW',    color: '#78c878' },
    { type: 'FB',   label: 'Feedback',       color: '#c8a850' },
    { type: 'OE',   label: 'On/Off',         color: '#ff9944' },
    { type: 'GND',  label: 'GND',            color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // DIP-8: pins 1–4 on the left (top→bottom), pins 5–8 on the right (_rightSlot 0–3).
  //
  // LM2596 SO-8 / DIP-8 pinout (from datasheet):
  //   Pin 1 — OUTPUT (switching output, connect to inductor)
  //   Pin 2 — VIN    (input supply voltage)
  //   Pin 3 — OUTPUT (switching output, internally connected to pin 1)
  //   Pin 4 — FEEDBACK (FB, sets output voltage via resistor divider)
  //   Pin 5 — ON/OFF  (output enable, active-high disables output)
  //   Pin 6 — VIN     (input supply voltage, internally connected to pin 2)
  //   Pin 7 — OUTPUT  (switching output, internally connected to pins 1 & 3)
  //   Pin 8 — GND / Exposed Pad

  pins: [
    // ── LEFT SIDE (pins 1–4, top → bottom) ──────────────────────
    {
      num:   1,
      id:    'OUT1',
      lbl:   'OUT',
      name:  'Output (SW) — Pin 1',
      type:  'VOUT',
      funcs: ['VOUT'],
      volt:  'Up to 37V',
      curr:  '3A max',
      note:  'Switching output — connect to the inductor. This is the collector of the internal NPN power switch. Internally shorted to pins 3 and 7. Always connect all OUTPUT pins together on the PCB for maximum current handling.'
    },
    {
      num:   2,
      id:    'VIN1',
      lbl:   'VIN',
      name:  'Input Voltage — Pin 2',
      type:  'VIN',
      funcs: ['VIN'],
      volt:  '4.5–40V',
      curr:  '3A max',
      note:  'Input supply voltage. Accepts 4.5 V to 40 V DC. Internally shorted to pin 6. Decouple with a 100 µF electrolytic capacitor as close to the IC as possible to suppress switching noise.'
    },
    {
      num:   3,
      id:    'OUT2',
      lbl:   'OUT',
      name:  'Output (SW) — Pin 3',
      type:  'VOUT',
      funcs: ['VOUT'],
      volt:  'Up to 37V',
      curr:  '3A max',
      note:  'Switching output — internally connected to pins 1 and 7. Connect all OUTPUT pins together on the PCB. See pin 1 note.'
    },
    {
      num:   4,
      id:    'FB',
      lbl:   'FB',
      name:  'Feedback (FB)',
      type:  'FB',
      funcs: ['FB'],
      volt:  '1.23V ref',
      curr:  'µA',
      note:  'Feedback input. The internal error amplifier regulates this pin to a 1.23 V reference. Connect the mid-point of an external resistor divider (R1/R2) between VOUT and GND here to set the output voltage: VOUT = 1.23 × (1 + R1/R2). Keep traces short to minimise noise pickup.'
    },

    // ── RIGHT SIDE (pins 5–8, _rightSlot 0=top-right → 3=bottom-right) ──
    {
      num:   5,
      id:    'ONOFF',
      lbl:   'ON/OFF',
      name:  'Output Enable (ON/OFF)',
      type:  'OE',
      funcs: ['OE'],
      volt:  '0–2.5V',
      curr:  'µA',
      note:  'Output enable control. Drive HIGH (> 2.5 V) or leave floating to DISABLE the regulator output. Drive LOW (< 1.2 V) or tie to GND to ENABLE normal operation. Useful for soft-start, sequencing, or remote shutdown. Tie to GND if not used.',
      _rightSlot: 0
    },
    {
      num:   6,
      id:    'VIN2',
      lbl:   'VIN',
      name:  'Input Voltage — Pin 6',
      type:  'VIN',
      funcs: ['VIN'],
      volt:  '4.5–40V',
      curr:  '3A max',
      note:  'Input supply voltage. Internally connected to pin 2. Connect all VIN pins together on the PCB for best thermal and current performance. Decouple with a bulk capacitor close to the device.',
      _rightSlot: 1
    },
    {
      num:   7,
      id:    'OUT3',
      lbl:   'OUT',
      name:  'Output (SW) — Pin 7',
      type:  'VOUT',
      funcs: ['VOUT'],
      volt:  'Up to 37V',
      curr:  '3A max',
      note:  'Switching output — internally connected to pins 1 and 3. Connect all OUTPUT pins together on the PCB. See pin 1 note.',
      _rightSlot: 2
    },
    {
      num:   8,
      id:    'GND',
      lbl:   'GND',
      name:  'Ground',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  '3A max',
      note:  'Ground reference and thermal pad. Connect to a solid ground plane. In the SO-8 package the exposed pad on the underside is also GND and must be soldered to the PCB ground plane for adequate heat dissipation at full load.',
      _rightSlot: 3
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'ONOFF': ['SHDN', 'EN'],
    'FB':    ['ADJ'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Input Voltage',  value: '4.5 – 40 V',      color: '#ff6b6b' },
    { label: 'Output Voltage', value: '1.23 – 37 V',      color: '#78c878' },
    { label: 'Output Current', value: '3 A',               color: '#c8a850' },
    { label: 'Switching Freq', value: '150 kHz',           color: '#50c8c8' },
    { label: 'Efficiency',     value: 'Up to 92%',         color: '#78c878' },
    { label: 'FB Reference',   value: '1.23 V',            color: '#c8a850' },
    { label: 'Package',        value: 'DIP-8 / SO-8',      color: '#e0e5ec' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Topology',            value: 'Buck (Step-Down) Switching Regulator' },
    { label: 'Input Voltage Range', value: '4.5 V to 40 V' },
    { label: 'Output Voltage',      value: '1.23 V to 37 V (ADJ version), or fixed 3.3/5/12/15 V' },
    { label: 'Output Current',      value: '3 A continuous' },
    { label: 'Switching Frequency', value: '150 kHz fixed internal oscillator' },
    { label: 'Feedback Reference',  value: '1.23 V ± 1%' },
    { label: 'Quiescent Current',   value: '5 mA typical' },
    { label: 'Shutdown Current',    value: '80 µA typical (ON/OFF pin high)' },
    { label: 'Line Regulation',     value: '0.1% typical' },
    { label: 'Load Regulation',     value: '0.5% typical' },
    { label: 'Operating Temp',      value: '0°C to +125°C' },
    { label: 'Package',             value: 'SO-8, PDIP-8, TO-263-5, TO-220-5' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Fixed 150 kHz switching frequency — requires only a small external inductor and capacitor',
    'Wide input range: 4.5 V to 40 V; adjustable output down to 1.23 V',
    'Up to 92% efficiency — far less heat than a linear regulator at high current drop',
    '3 A output current with internal current limiting and thermal shutdown protection',
    'ON/OFF pin for remote enable/disable, power sequencing, and soft-start control',
    'Available in fixed voltage versions: 3.3 V, 5 V, 12 V, 15 V — and fully adjustable ADJ',
    'Simple application circuit: two resistors (ADJ version), one inductor, one catch diode, two caps',
    'Output voltage set by resistor divider: VOUT = 1.23 × (1 + R1/R2)',
  ],
};