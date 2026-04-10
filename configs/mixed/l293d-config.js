// configs/l293d-config.js
window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'L293D',
  partMPN:      'L293D',
  manufacturer: 'STMicroelectronics',
  package:      'DIP-16',
  pinCount:     16,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/L293D/STMicroelectronics/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/L293D/STMicroelectronics/view-part/?ref=snapeda',
  datasheetURL: 'https://www.st.com/resource/en/datasheet/l293d.pdf',

  // ── LAYOUT HINT (DIP) ─────────────────────────────────────────
  dipConfig: {
    pinsPerSide:  8,
    bodyX: 122, bodyY: 25, bodyW: 200, bodyH: 380,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },
    labelSize: 11, pinNumSize: 14, yOffset: -60
  },

  // ── CUSTOM TYPE COLOURS (motor driver specific) ───────────────
  // Using unique names to avoid conflicts with built-in types
  customTypes: {
    MOTOR_EN:   { c: '#50c8a0', bg: 'rgba(80,200,160,0.12)', bd: 'rgba(80,200,160,0.32)' },
    MOTOR_IN:   { c: '#4a9aee', bg: 'rgba(74,154,238,0.12)', bd: 'rgba(74,154,238,0.35)' },
    MOTOR_OUT:  { c: '#78c878', bg: 'rgba(120,200,120,0.12)', bd: 'rgba(120,200,120,0.35)' },
  },

  // ── FILTER BUTTONS (motor driver specific) ────────────────────
  // Only these buttons will appear - no default GPIO/ADC/etc buttons
  filterButtons: [
    { type: 'MOTOR_EN',  label: 'Enable (PWM)', color: '#50c8a0' },
    { type: 'MOTOR_IN',  label: 'Input',        color: '#4a9aee' },
    { type: 'MOTOR_OUT', label: 'Output',       color: '#78c878' },
    { type: 'PWR',       label: 'Power (VCC)',  color: '#ff6b6b' },
    { type: 'GND',       label: 'Ground',       color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // Physical DIP-16 layout (top view, notch up):
  //   LEFT SIDE (pins 1-8):   top to bottom, no _rightSlot
  //   RIGHT SIDE (pins 9-16): _rightSlot 0 = TOP (pin 16), 
  //                           _rightSlot 7 = BOTTOM (pin 9)
  pins: [
    // ========== LEFT SIDE (pins 1-8, top to bottom) ==========
    {
      num:   1,
      id:    'EN1',
      lbl:   'EN1,2',
      name:  'Enable 1,2 (Motor A)',
      type:  'MOTOR_EN',
      funcs: ['MOTOR_EN'],
      volt:  '5V',
      curr:  'N/A',
      note:  'Enable pin for channels 1 and 2 (Motor A). Logic HIGH activates both output channels; logic LOW disables them. Can be driven with PWM to control motor speed.'
    },
    {
      num:   2,
      id:    'IN1',
      lbl:   'IN1',
      name:  'Input 1 (Motor A)',
      type:  'MOTOR_IN',
      funcs: ['MOTOR_IN'],
      volt:  '5V',
      curr:  'N/A',
      note:  'Logic input for channel 1 (Motor A, terminal 1). Accepts TTL/CMOS logic levels. Set HIGH to drive Output 1 high, LOW to drive Output 1 low.'
    },
    {
      num:   3,
      id:    'OUT1',
      lbl:   'OUT1',
      name:  'Output 1 (Motor A)',
      type:  'MOTOR_OUT',
      funcs: ['MOTOR_OUT'],
      volt:  '4.5–36V',
      curr:  '600mA',
      note:  'Motor output for channel 1 (Motor A, terminal 1). Connect to one terminal of Motor A. Output state follows IN1 when EN1,2 is HIGH. Maximum continuous current 600 mA, peak 1.2 A.'
    },
    {
      num:   4,
      id:    'GND1',
      lbl:   'GND',
      name:  'Ground 1 (Heat Sink)',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground pin 1 of 4. All four GND pins are internally connected together and also serve as a heat-sink pad. Connect all to circuit ground. Soldering to a large copper area improves thermal dissipation.'
    },
    {
      num:   5,
      id:    'GND2',
      lbl:   'GND',
      name:  'Ground 2 (Heat Sink)',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground pin 2 of 4. All four GND pins are internally connected together and also serve as a heat-sink pad. Connect all to circuit ground. Soldering to a large copper area improves thermal dissipation.'
    },
    {
      num:   6,
      id:    'OUT2',
      lbl:   'OUT2',
      name:  'Output 2 (Motor A)',
      type:  'MOTOR_OUT',
      funcs: ['MOTOR_OUT'],
      volt:  '4.5–36V',
      curr:  '600mA',
      note:  'Motor output for channel 2 (Motor A, terminal 2). Connect to the other terminal of Motor A. Together with OUT1, forms the full H-bridge for Motor A. Maximum continuous current 600 mA, peak 1.2 A.'
    },
    {
      num:   7,
      id:    'IN2',
      lbl:   'IN2',
      name:  'Input 2 (Motor A)',
      type:  'MOTOR_IN',
      funcs: ['MOTOR_IN'],
      volt:  '5V',
      curr:  'N/A',
      note:  'Logic input for channel 2 (Motor A, terminal 2). Accepts TTL/CMOS logic levels. Set IN1=HIGH, IN2=LOW for forward; IN1=LOW, IN2=HIGH for reverse; both same state for brake/stop.'
    },
    {
      num:   8,
      id:    'VCC2',
      lbl:   'VS',
      name:  'Motor Supply Voltage (VS / VCC2)',
      type:  'PWR',
      funcs: ['PWR'],
      volt:  '4.5–36V',
      curr:  'N/A',
      note:  'Motor power supply input. Supplies voltage directly to the H-bridge output stages. Range is 4.5 V to 36 V. This rail is separate from the logic supply (VCC1) allowing motor voltage to differ from logic voltage. Add a 100 nF decoupling capacitor close to this pin.'
    },

    // ========== RIGHT SIDE (pins 16 down to 9, TOP to BOTTOM in _rightSlot order) ==========
    // _rightSlot: 0 = top-right (pin 16), 7 = bottom-right (pin 9)
    {
      num:   16,
      id:    'VCC1',
      lbl:   'VCC1',
      name:  'Logic Supply Voltage (VCC1)',
      type:  'PWR',
      funcs: ['PWR'],
      volt:  '4.5–7V',
      curr:  'N/A',
      note:  'Logic supply voltage input. Powers the internal control logic and input buffers. Typically connected to +5V. Range is 4.5 V to 7 V. Must be present even if the motor supply (VCC2) is at a different voltage. Add a 100 nF decoupling capacitor close to this pin.',
      _rightSlot: 0    // Top-right pin
    },
    {
      num:   15,
      id:    'IN4',
      lbl:   'IN4',
      name:  'Input 4 (Motor B)',
      type:  'MOTOR_IN',
      funcs: ['MOTOR_IN'],
      volt:  '5V',
      curr:  'N/A',
      note:  'Logic input for channel 4 (Motor B, terminal 2). Accepts TTL/CMOS logic levels. Set IN3=HIGH, IN4=LOW for forward; IN3=LOW, IN4=HIGH for reverse; both same state for brake/stop.',
      _rightSlot: 1
    },
    {
      num:   14,
      id:    'OUT4',
      lbl:   'OUT4',
      name:  'Output 4 (Motor B)',
      type:  'MOTOR_OUT',
      funcs: ['MOTOR_OUT'],
      volt:  '4.5–36V',
      curr:  '600mA',
      note:  'Motor output for channel 4 (Motor B, terminal 2). Connect to the other terminal of Motor B. Together with OUT3, forms the full H-bridge for Motor B. Maximum continuous current 600 mA, peak 1.2 A.',
      _rightSlot: 2
    },
    {
      num:   13,
      id:    'GND4',
      lbl:   'GND',
      name:  'Ground 4 (Heat Sink)',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground pin 4 of 4. All four GND pins are internally connected together and also serve as a heat-sink pad. Connect all to circuit ground.',
      _rightSlot: 3
    },
    {
      num:   12,
      id:    'GND3',
      lbl:   'GND',
      name:  'Ground 3 (Heat Sink)',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground pin 3 of 4. All four GND pins are internally connected together and also serve as a heat-sink pad. Connect all to circuit ground.',
      _rightSlot: 4
    },
    {
      num:   11,
      id:    'OUT3',
      lbl:   'OUT3',
      name:  'Output 3 (Motor B)',
      type:  'MOTOR_OUT',
      funcs: ['MOTOR_OUT'],
      volt:  '4.5–36V',
      curr:  '600mA',
      note:  'Motor output for channel 3 (Motor B, terminal 1). Connect to one terminal of Motor B. Output state follows IN3 when EN3,4 is HIGH. Maximum continuous current 600 mA, peak 1.2 A.',
      _rightSlot: 5
    },
    {
      num:   10,
      id:    'IN3',
      lbl:   'IN3',
      name:  'Input 3 (Motor B)',
      type:  'MOTOR_IN',
      funcs: ['MOTOR_IN'],
      volt:  '5V',
      curr:  'N/A',
      note:  'Logic input for channel 3 (Motor B, terminal 1). Accepts TTL/CMOS logic levels. Set HIGH to drive Output 3 high, LOW to drive Output 3 low.',
      _rightSlot: 6
    },
    {
      num:   9,
      id:    'EN3',
      lbl:   'EN3,4',
      name:  'Enable 3,4 (Motor B)',
      type:  'MOTOR_EN',
      funcs: ['MOTOR_EN'],
      volt:  '5V',
      curr:  'N/A',
      note:  'Enable pin for channels 3 and 4 (Motor B). Logic HIGH activates both output channels; logic LOW disables them. Can be driven with PWM to control Motor B speed independently of Motor A.',
      _rightSlot: 7    // Bottom-right pin
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'EN1':  ['PWM-A'],
    'EN3':  ['PWM-B'],
    'OUT1': ['1Y'],
    'OUT2': ['2Y'],
    'OUT3': ['3Y'],
    'OUT4': ['4Y'],
    'IN1':  ['1A'],
    'IN2':  ['2A'],
    'IN3':  ['3A'],
    'IN4':  ['4A'],
    'VCC2': ['VS'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Channels',       value: '4 (2 H-bridges)',   color: '#e0e5ec' },
    { label: 'Motor Supply',   value: '4.5 – 36V',         color: '#ff6b6b' },
    { label: 'Logic Supply',   value: '4.5 – 7V',          color: '#ff6b6b' },
    { label: 'Continuous I',   value: '600 mA / channel',  color: '#78c878' },
    { label: 'Peak Current',   value: '1.2 A / channel',   color: '#c8a850' },
    { label: 'Logic Level',    value: 'TTL / CMOS',        color: '#4a9aee' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',       value: 'Dual H-bridge (4 half-bridges)' },
    { label: 'Package',            value: 'DIP-16 (4 centre pins = GND / heat sink)' },
    { label: 'Motor Supply (VS)',  value: '4.5 V – 36 V' },
    { label: 'Logic Supply (VCC1)', value: '4.5 V – 7 V' },
    { label: 'Output Current',     value: '600 mA continuous, 1.2 A peak per channel' },
    { label: 'Total Peak Current', value: '2.4 A (all 4 channels combined)' },
    { label: 'Output Voltage Drop', value: '~1.8 V at 600 mA' },
    { label: 'Switching Frequency', value: 'Up to 5 kHz' },
    { label: 'Transition Time',    value: '300 ns at 5 V / 24 V' },
    { label: 'Operating Temp',     value: '0°C – 70°C' },
    { label: 'Thermal Shutdown',   value: 'Automatic (built-in)' },
    { label: 'ESD Protection',     value: 'Internal clamp diodes on all outputs' },
    { label: 'Logic Compatibility', value: 'TTL and CMOS' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Dual H-bridge driver — controls two DC motors or one bipolar stepper motor independently',
    'Wide motor supply range (4.5 V – 36 V) separated from 5 V logic supply',
    'Built-in clamp diodes on all four outputs protect against back-EMF from inductive loads',
    'Automatic thermal shutdown prevents damage from overheating',
    'Enable pins (EN1,2 and EN3,4) support PWM for variable motor speed control',
    'High noise immunity inputs compatible with both TTL and CMOS logic families',
    'Four centre GND pins double as a heat-sink pad for improved thermal performance',
    'Can drive relays, solenoids, and bipolar stepper motors in addition to DC motors',
    'Switching frequency up to 5 kHz for efficient PWM motor speed control',
  ],
};
