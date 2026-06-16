window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'MT3608',
  partMPN:      'MT3608',
  manufacturer: "XI'AN Aerosemi Technology Co., Ltd.",
  package:      'SOT23-6',
  pinCount:     6,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/MT3608/Aerosemi%20Technology/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/MT3608/Aerosemi%20Technology/view-part/',
  datasheetURL: 'https://www.chipsourcetek.com/DataSheet/MT3608.pdf',

  // ── LAYOUT HINT ───────────────────────────────────────────────
  // SOT23-6: 3 pins per side — routed to SOICRenderer via factory rule #6.
  // Pin 1 (SW) is top-left; pins run down left side (1→3), up right side (4→6).
  // _rightSlot used on right-side pins: 0 = top-right slot.
  soicConfig: {
    pinsPerSide: 3,
    bodyX: 140, bodyY: 60, bodyW: 220, bodyH: 260,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 10, part: 22, pkg: 13, pinCount: 11 },
    labelSize: 10, pinNumSize: 13, yOffset: -20
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  // MT3608 is a specialist boost converter — no standard MCU types apply.
  customTypes: {
    // Power switch output (high-frequency switching node)
    SW:   { c: '#a78bfa', bg: 'rgba(167,139,250,.12)', bd: 'rgba(167,139,250,.32)' },
    // Feedback regulation pin
    FB:   { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  },
    // Enable / shutdown control
    EN:   { c: '#d29922', bg: 'rgba(210,153,34,.12)',  bd: 'rgba(210,153,34,.32)'  },
    // No-connect
    NC:   { c: '#555e6a', bg: 'rgba(85,94,106,.10)',   bd: 'rgba(85,94,106,.22)'   },
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'PWR', label: 'VIN — Input Supply',      color: '#ff6b6b' },
    { type: 'GND', label: 'GND — Ground',            color: '#a8a8a8' },
    { type: 'SW',  label: 'SW — Switch Output',      color: '#a78bfa' },
    { type: 'FB',  label: 'FB — Feedback',           color: '#50c8a0' },
    { type: 'EN',  label: 'EN — Enable',             color: '#d29922' },
    { type: 'NC',  label: 'NC — No Connect',         color: '#555e6a' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // SOT23-6 pin order (top view, pin 1 mark at top-left):
  //   Left side top→bottom : 1 (SW), 2 (GND), 3 (FB)
  //   Right side bottom→top: 4 (EN), 5 (VIN), 6 (NC)
  //   _rightSlot: 0 = top-right (pin 6), 1 = middle-right (pin 5), 2 = bottom-right (pin 4)
  pins: [
    {
      num:   1,
      id:    'SW',
      lbl:   'SW',
      name:  'SW — Power Switch Output',
      type:  'SW',
      funcs: ['SW'],
      volt:  '0V – 28V (switching)',
      curr:  '4A peak (internal switch current limit)',
      note:  'Drain of the internal 80 mΩ N-channel power MOSFET switch. During each PWM on-time the switch pulls SW to GND, building energy in the external inductor. During off-time SW rises above VOUT as the inductor delivers energy through the Schottky diode. SW swings between GND and up to 28V and must be treated as a noisy high-frequency node — keep the copper area small, route the inductor and Schottky diode as close as possible to this pin, and never place feedback or other sensitive signals near it.'
    },
    {
      num:   2,
      id:    'GND',
      lbl:   'GND',
      name:  'GND — Ground',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'Full load return path',
      note:  'Ground. All internal circuitry returns to this pin. Connect directly to a solid ground plane — the GND plane doubles as a heat-sink; GND copper area should be maximised to minimise thermal resistance (θJA = 250°C/W). Input and output decoupling capacitors must connect their negative terminal as close to this pin as possible.'
    },
    {
      num:   3,
      id:    'FB',
      lbl:   'FB',
      name:  'FB — Feedback Regulation Input',
      type:  'FB',
      funcs: ['FB'],
      volt:  '0.6V (regulated internal reference)',
      curr:  '−50 nA to −10 nA bias (into pin)',
      note:  'Error-amplifier inverting input. The internal reference is 0.6V (typ, 0.588V–0.612V). Connect an external resistor divider (R1 from VOUT, R2 from FB to GND) to set the output voltage: VOUT = 0.6 × (1 + R1/R2). Example for 5V output: R1 = 110kΩ, R2 = 15kΩ (1% tolerance). FB leakage into the pin is −10 to −50 nA — use resistor values above 50kΩ to avoid ratio error. Place the feedback network close to the IC, away from SW node.'
    },
    {
      num:   4,
      id:    'EN',
      lbl:   'EN',
      name:  'EN — Enable / Shutdown Control',
      type:  'EN',
      funcs: ['EN'],
      volt:  'High ≥ 1.5V, Low ≤ 0.4V (abs max 26V)',
      curr:  '< 1µA shutdown; 1.6–2.2 mA operating quiescent',
      note:  'Logic-level enable input. Driving EN high (≥ 1.5V) turns the converter on; driving EN low (≤ 0.4V) shuts the device down to < 1µA supply current. For automatic startup (no external enable needed), connect EN directly to VIN. EN can accept logic signals up to 26V and is compatible with 1.8V, 3.3V, and 5V logic without a level shifter. Do not leave EN floating — it must be driven high or tied to VIN.',
      _rightSlot: 2
    },
    {
      num:   5,
      id:    'VIN',
      lbl:   'VIN',
      name:  'VIN — Input Supply',
      type:  'PWR',
      funcs: ['PWR'],
      volt:  '2V – 24V',
      curr:  '1.6–2.2 mA quiescent (PWM); 100–200 µA (PFM light load)',
      note:  'Main input supply. Accepts 2V to 24V — compatible with single Li-Ion/Li-Po (3.0–4.2V), 2× AA/AAA, 5V USB, 9V, 12V, or 18V sources. UVLO threshold is 1.98V; the converter is disabled below this level. Bypass VIN with a 22µF ceramic capacitor (X5R/X7R, rated ≥ 1.5× VOUT) placed as close as possible to the pin. Do not reverse-polarise — no internal reverse-protection diode is present.',
      _rightSlot: 1
    },
    {
      num:   6,
      id:    'NC',
      lbl:   'NC',
      name:  'NC — No Connect',
      type:  'NC',
      funcs: ['NC'],
      volt:  'N/A',
      curr:  'N/A',
      note:  'No internal connection. This pin is electrically isolated from all internal circuitry. Leave unconnected or tie to GND for mechanical soldering symmetry. Do not use as a signal or power rail.',
      _rightSlot: 0
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'EN':  ['SHDN'],
    'SW':  ['DRAIN'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Topology',       value: 'Boost (Step-Up)',    color: '#58a6ff' },
    { label: 'Input Voltage',  value: '2V – 24V',          color: '#ff6b6b' },
    { label: 'Output Voltage', value: 'Adj. up to 28V',    color: '#3fb950' },
    { label: 'Switch Current', value: '4A peak limit',     color: '#a78bfa' },
    { label: 'Switching Freq', value: '1.2 MHz fixed',     color: '#c8a850' },
    { label: 'Efficiency',     value: 'Up to 93%',         color: '#50c8a0' },
    { label: 'FB Reference',   value: '0.6V ± 2%',        color: '#50c8a0' },
    { label: 'Package',        value: 'SOT23-6',           color: '#e0e5ec' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',          value: 'Fixed-Frequency Peak Current Mode PWM Boost' },
    { label: 'Input Voltage Range',   value: '2V to 24V' },
    { label: 'UVLO Threshold',        value: '1.98V (typ)' },
    { label: 'UVLO Hysteresis',       value: '100 mV (typ)' },
    { label: 'Output Voltage Range',  value: 'Adjustable up to 28V via R1/R2 divider' },
    { label: 'FB Reference Voltage',  value: '0.600V (typ), 0.588V min, 0.612V max' },
    { label: 'FB Bias Current',       value: '−50 nA to −10 nA (into pin)' },
    { label: 'Switching Frequency',   value: '1.2 MHz (fixed)' },
    { label: 'Max Duty Cycle',        value: '90% (at VFB = 0V)' },
    { label: 'Internal Switch',       value: '80 mΩ N-channel MOSFET (typ), 150 mΩ max' },
    { label: 'Switch Current Limit',  value: '4A (at VIN = 5V, 50% duty cycle)' },
    { label: 'SW Leakage',            value: '1 µA max at VSW = 20V' },
    { label: 'Quiescent (Shutdown)',  value: '0.1 µA typ, 1 µA max (VEN = 0V)' },
    { label: 'Quiescent (PFM)',       value: '100 µA typ, 200 µA max (light load)' },
    { label: 'Quiescent (PWM)',       value: '1.6 mA typ, 2.2 mA max (full load)' },
    { label: 'EN High Threshold',     value: '1.5V min' },
    { label: 'EN Low Threshold',      value: '0.4V max' },
    { label: 'Thermal Shutdown',      value: '155°C (typ)' },
    { label: 'Junction Temp (max)',   value: '160°C' },
    { label: 'θJA',                   value: '250°C/W' },
    { label: 'θJC',                   value: '130°C/W' },
    { label: 'Max Power Dissipation', value: '0.6W' },
    { label: 'Operating Temperature', value: '−40°C to +85°C' },
    { label: 'ESD (HBM)',             value: '2kV' },
    { label: 'ESD (MM)',              value: '200V' },
    { label: 'Package',               value: 'SOT23-6 (TSOT23-6), Pb-free' },
    { label: 'Top Marking',           value: 'B628DC (D=Year, C=Week)' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Integrated 80 mΩ N-channel power MOSFET — eliminates external switch, reduces BOM',
    'Wide 2V–24V input range — compatible with single Li-Ion/Li-Po, 2×AA/AAA, 5V USB, 9V, 12V',
    'Adjustable output voltage up to 28V via external resistor divider (VOUT = 0.6 × (1 + R1/R2))',
    '4A internal peak switch current limit — supports up to ~2A continuous output (application-dependent)',
    '1.2 MHz fixed PWM switching frequency — enables tiny 4.7–22µH inductor and 22µF ceramic capacitors',
    'Automatic PFM (Pulse Frequency Modulation) mode at light loads — reduces quiescent current to 100–200 µA',
    'Internal soft-start — limits inrush current at startup and suppresses output voltage overshoot',
    'Internal compensation network — no external compensation components required',
    'Under-voltage lockout (UVLO) at 1.98V — prevents operation from deeply discharged sources',
    'EN pin for logic-controlled shutdown — < 1µA supply current in shutdown; tie to VIN for auto-start',
    'Thermal overload protection and current limiting — prevents damage during output short or overload',
    'Up to 93% conversion efficiency (VIN = 3.7V, VOUT = 5V, 200 mA load)',
    'Compact 6-pin SOT23-6 (TSOT23-6) package — 3.0 × 1.6 mm footprint',
  ],
};