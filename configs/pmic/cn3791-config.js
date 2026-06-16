window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'CN3791',
  partMPN:      'CN3791',
  manufacturer: 'Shanghai Consonance Electronics',
  package:      'SSOP-10',
  pinCount:     10,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/CN3791/Consonance/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/CN3791/Consonance/view-part/',
  datasheetURL: 'https://files.waveshare.com/wiki/Solar-Power-Manager-(D)/CN3791_Datasheet_EN.pdf',

  // ── LAYOUT HINT ───────────────────────────────────────────────
  // SSOP-10: route through QFP renderer in 2-side mode is not standard.
  // SSOP is a narrow-body SOP variant — use SOIC renderer path.
  // Map as SOIC-10 so the DIP renderer handles left/right sides correctly.
  dipConfig: {
    pinsPerSide: 5,
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 350,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 11, part: 20, pkg: 13, pinCount: 11 },
    labelSize: 10, pinNumSize: 13, yOffset: -40
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  customTypes: {
    // Analog / sensing pins
    SNS:  { c: '#f4a261', bg: 'rgba(244,162,97,.12)',  bd: 'rgba(244,162,97,.35)'  },
    // MPPT tracking pin
    MPPT: { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  },
    // Gate drive output
    DRV:  { c: '#a78bfa', bg: 'rgba(167,139,250,.12)', bd: 'rgba(167,139,250,.32)' },
    // Status indicator outputs (open-drain)
    STAT: { c: '#d29922', bg: 'rgba(210,153,34,.12)',  bd: 'rgba(210,153,34,.32)'  },
    // Loop compensation
    COMP: { c: '#7090a8', bg: 'rgba(112,144,168,.12)', bd: 'rgba(112,144,168,.28)' },
    // Internal LDO output
    LDO:  { c: '#c078ff', bg: 'rgba(192,120,255,.11)', bd: 'rgba(192,120,255,.28)' },
    // Battery pin
    BAT:  { c: '#3fb950', bg: 'rgba(63,185,80,.12)',   bd: 'rgba(63,185,80,.30)'   },
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'PWR',  label: 'VCC — Supply Input',       color: '#ff6b6b' },
    { type: 'GND',  label: 'GND — Ground',             color: '#a8a8a8' },
    { type: 'LDO',  label: 'VG — Internal LDO',        color: '#c078ff' },
    { type: 'DRV',  label: 'DRV — Gate Drive',         color: '#a78bfa' },
    { type: 'BAT',  label: 'BAT / CSP — Current Sense',color: '#3fb950' },
    { type: 'MPPT', label: 'MPPT — Power Point Track', color: '#50c8a0' },
    { type: 'STAT', label: 'CHRG / DONE — Status',     color: '#d29922' },
    { type: 'COMP', label: 'COM — Loop Compensation',  color: '#7090a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // SSOP-10 treated as DIP-10: pins 1–5 left side (top→bottom),
  // pins 6–10 right side (bottom→top, _rightSlot 0 = top-right).
  pins: [
    {
      num:  1,
      id:   'VG',
      lbl:  'VG',
      name: 'VG — Internal Voltage Regulator Output',
      type: 'LDO',
      funcs: ['LDO'],
      volt: 'VCC-ref',
      curr: 'Internal only',
      note: 'Internal LDO output. Supplies power to the internal gate driver circuitry. Decouple with a 100 nF ceramic capacitor placed between VG and VCC as close to the IC as possible. Do not draw external current from this pin.'
    },
    {
      num:  2,
      id:   'GND',
      lbl:  'GND',
      name: 'GND — Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: 'Return path',
      note: 'Ground. Negative terminal of the input supply and the internal signal reference. The GND pin also acts as a thermal heat-sink pad; use a generous copper pour around it for thermal relief, especially at high VCC or large charge currents.'
    },
    {
      num:  3,
      id:   'CHRG',
      lbl:  'CHRG',
      name: 'CHRG — Charge Status Output (Open-Drain)',
      type: 'STAT',
      funcs: ['STAT'],
      volt: 'Up to 28V',
      curr: '12 mA sink (typ)',
      note: 'Open-drain charge status indicator. Pulled low internally when the battery is actively charging; otherwise goes to high-impedance. Connect a LED (with series resistor) to a pull-up rail to indicate charging. Leakage in high-impedance state is ≤1 µA at 25 V. If unused, tie this pin to GND.'
    },
    {
      num:  4,
      id:   'DONE',
      lbl:  'DONE',
      name: 'DONE — Charge Termination Output (Open-Drain)',
      type: 'STAT',
      funcs: ['STAT'],
      volt: 'Up to 28V',
      curr: '12 mA sink (typ)',
      note: 'Open-drain charge termination indicator. Pulled low internally when the charge cycle has been terminated (charge current fell to 16% of full-scale). Otherwise high-impedance. Typically drives a green LED with pull-up resistor. If unused, tie to GND.'
    },
    {
      num:  5,
      id:   'COM',
      lbl:  'COM',
      name: 'COM — Loop Compensation Input',
      type: 'COMP',
      funcs: ['COMP'],
      volt: '0–6.5V max',
      curr: 'N/A',
      note: 'Current-loop and voltage-loop compensation node. Connect a 220 nF ceramic capacitor in series with a 120 Ω resistor from this pin to GND. This RC network is mandatory to maintain stability of both the constant-current and constant-voltage control loops. Route the compensation ground back to the IC GND pin, not the power ground plane.'
    },
    {
      num:  6,
      id:   'MPPT',
      lbl:  'MPPT',
      name: 'MPPT — Maximum Power Point Tracking Pin',
      type: 'MPPT',
      funcs: ['MPPT'],
      volt: '1.205V (regulated)',
      curr: '±100 nA bias',
      note: 'MPPT feedback input. The CN3791 regulates this pin to 1.205 V (typ) to lock the solar panel output at its maximum power point. Connect an external resistor divider (R3, R4) from the panel input to set the target MPPT voltage: V_MPPT = 1.205 × (1 + R3/R4). Bias current into this pin is ≤±100 nA so high-value dividers (>100 kΩ) can be used.',
      _rightSlot: 4
    },
    {
      num:  7,
      id:   'BAT',
      lbl:  'BAT',
      name: 'BAT — Battery Voltage / Negative Current Sense Input',
      type: 'BAT',
      funcs: ['BAT'],
      volt: 'Up to 4.2V (Li-ion)',
      curr: '15 µA into pin (termination)',
      note: 'Battery terminal connection and negative side of the external current-sense resistor RCS. Together with CSP, the differential voltage across RCS (120 mV typical at full-scale current) sets the charge current: ICH = 120 mV / RCS. Use Kelvin sensing — route BAT and CSP traces directly to the resistor pads with minimal spacing.',
      _rightSlot: 3
    },
    {
      num:  8,
      id:   'CSP',
      lbl:  'CSP',
      name: 'CSP — Positive Current Sense Input',
      type: 'BAT',
      funcs: ['BAT'],
      volt: 'Up to 6.5V max',
      curr: 'Sense only',
      note: 'Positive input of the charge-current sense amplifier. Connects to the inductor-side terminal of the external sense resistor RCS. The full-scale charge current is ICH = 120 mV / RCS. Route CSP and BAT as a tightly coupled differential pair to the sense resistor terminals (Kelvin connection) for accurate current measurement.',
      _rightSlot: 2
    },
    {
      num:  9,
      id:   'VCC',
      lbl:  'VCC',
      name: 'VCC — Power Supply Input',
      type: 'PWR',
      funcs: ['PWR'],
      volt: '4.5V – 28V',
      curr: '1.0 mA quiescent (typ)',
      note: 'Primary power supply input. Accepts photovoltaic cell or DC adapter input from 4.5 V to 28 V. Also powers internal control circuits. Bypass with a parallel combination of an electrolytic capacitor (low-frequency), a 1–10 µF ceramic, and a 47 nF–1 µF high-frequency ceramic, all placed close to the pin. UVLO threshold is 3.8 V (typ).',
      _rightSlot: 1
    },
    {
      num:  10,
      id:   'DRV',
      lbl:  'DRV',
      name: 'DRV — External P-Channel MOSFET Gate Drive',
      type: 'DRV',
      funcs: ['DRV'],
      volt: 'VCC – 6.3V (low) / VCC (high)',
      curr: 'Peak drive (40 ns rise/fall into 2 nF)',
      note: 'Gate drive output for the external P-channel power MOSFET (the PWM switch in the buck topology). The gate drive swings between VCC (MOSFET off) and VCC − 6.3 V typ (MOSFET on), clamped to 8 V below VCC max. Use logic-level P-channel MOSFETs with BVDSS ≥ max VCC. Typical rise and fall times are 40 ns driving a 2000 pF gate.',
      _rightSlot: 0
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'CHRG': ['LED-R'],
    'DONE': ['LED-G'],
    'BAT':  ['FB'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Input Voltage',  value: '4.5V – 28V',    color: '#ff6b6b' },
    { label: 'Charge Current', value: 'Up to 4A',       color: '#f4a261' },
    { label: 'CV Regulation',  value: '4.2V ± 1%',     color: '#3fb950' },
    { label: 'Topology',       value: 'Buck (PWM)',     color: '#58a6ff' },
    { label: 'Switching Freq', value: '300 kHz',        color: '#c8a850' },
    { label: 'MPPT Reference', value: '1.205V',         color: '#50c8a0' },
    { label: 'Package',        value: 'SSOP-10',        color: '#e0e5ec' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',         value: 'PWM Buck (Step-Down) Switching Charger' },
    { label: 'Input Voltage Range',  value: '4.5V to 28V' },
    { label: 'UVLO Threshold',       value: '3.8V (typ), 3.1V min / 4.4V max' },
    { label: 'Regulation Voltage',   value: '4.2V ± 1% (4.158V min, 4.247V max)' },
    { label: 'Charge Current Sense', value: '120 mV across RCS (full-scale), trickle 21 mV typ' },
    { label: 'Max Charge Current',   value: '4A' },
    { label: 'Switching Frequency',  value: '300 kHz (240–360 kHz range)' },
    { label: 'Max Duty Cycle',       value: '94%' },
    { label: 'MPPT Ref Voltage',     value: '1.205V ± ~2% (1.18V–1.23V)' },
    { label: 'Trickle Threshold',    value: '66.5% of VREG (~2.79V)' },
    { label: 'Trickle Current',      value: '17.5% of full-scale' },
    { label: 'Termination Threshold',value: '16% of full-scale current' },
    { label: 'Recharge Threshold',   value: '95.5% of VREG (~4.011V)' },
    { label: 'Overvoltage Trip',     value: '107% of VREG (~4.494V typ)' },
    { label: 'Quiescent Current',    value: '1.0 mA typ (no switching)' },
    { label: 'Gate Drive Swing',     value: 'VCC to VCC−6.3V (clamped to 8V below VCC)' },
    { label: 'Gate Rise/Fall Time',  value: '40 ns typ (2000 pF load)' },
    { label: 'Oper. Temperature',    value: '−40°C to +85°C' },
    { label: 'Package',              value: 'SSOP-10, Pb-free, RoHS, Halogen-free' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'MPPT (Maximum Power Point Tracking) using constant-voltage method — MPPT pin regulated to 1.205 V, set by external resistor divider',
    'Wide 4.5V–28V input range — compatible with 6V, 9V, 12V, and 18V solar panels',
    'Up to 4A programmable charge current via single external sense resistor (ICH = 120 mV / RCS)',
    'Three-stage charging profile: trickle precharge → constant current → constant voltage',
    'Automatic trickle charge at 17.5% of full-scale current for deeply discharged cells (VBAT < 66.5% VREG)',
    'Automatic recharge when battery voltage falls below 95.5% of regulation voltage',
    'Battery overvoltage protection — MOSFET switched off if VBAT exceeds 107% of VREG',
    'Two open-drain status outputs (CHRG, DONE) for LED or MCU status indication',
    'Soft-start prevents inrush current at power-up',
    'Automatic sleep mode entry when VCC drops below VBAT — <15 µA battery drain in sleep',
    'Under voltage lockout (UVLO) at 3.8V — charger disabled below threshold',
    '300 kHz PWM switching frequency enables small inductor and capacitor values',
    'External P-channel MOSFET switch allows flexible power stage design up to 28V BVDSS',
    'Space-saving 10-pin SSOP package',
  ],
};