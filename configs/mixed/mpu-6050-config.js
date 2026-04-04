// configs/mpu6050-config.js
window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'MPU6050',
  partMPN:      'MPU6050',
  manufacturer: 'InvenSense',
  package:      'QFN-24',
  pinCount:     24,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/MPU6050/InvenSense/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/MPU6050/InvenSense/download/',
  datasheetURL: 'https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf',

  // ── LAYOUT HINT (QFN-24) ──────────────────────────────────────
  // QFN-24 pin ordering (counter-clockwise, pin 1 at top-left):
  //   Pins 1-6   → LEFT side,   top → bottom
  //   Pins 7-12  → BOTTOM side, left → right
  //   Pins 13-18 → RIGHT side,  bottom → top
  //   Pins 19-24 → TOP side,    right → left
  qfpConfig: {
    pinsPerSide: 6,    // 24 pins / 4 sides = 6 pins per side
    bodySize: 400,     // QFN body size (square)
    pinLength: 28,     // Length of exposed pad/pin
    pinWidth: 20,      // Width of each pin
    pinGap: 2          // Gap between pins
  },

  // ── CUSTOM TYPE COLOURS (sensor specific) ─────────────────────
  customTypes: {
    I2C:     { c: '#9898d8', bg: 'rgba(152,152,216,0.12)', bd: 'rgba(152,152,216,0.35)' },
    INT:     { c: '#c8a850', bg: 'rgba(200,168,80,0.12)',  bd: 'rgba(200,168,80,0.35)' },
    AUX:     { c: '#50c8c8', bg: 'rgba(80,200,200,0.12)',  bd: 'rgba(80,200,200,0.32)' },
    CLK:     { c: '#7090a8', bg: 'rgba(112,144,168,0.12)', bd: 'rgba(112,144,168,0.35)' },
    CPOUT:   { c: '#c078ff', bg: 'rgba(192,120,255,0.11)', bd: 'rgba(192,120,255,0.28)' },
    RESERVED: { c: '#a8a8a8', bg: 'rgba(168,168,168,0.08)', bd: 'rgba(168,168,168,0.20)' },
  },

  // ── FILTER BUTTONS (sensor specific) ──────────────────────────
  filterButtons: [
    { type: 'PWR',      label: 'Power (VDD/VLOGIC)', color: '#ff6b6b' },
    { type: 'GND',      label: 'Ground',             color: '#a8a8a8' },
    { type: 'I2C',      label: 'I2C Interface',      color: '#9898d8' },
    { type: 'INT',      label: 'Interrupt',          color: '#c8a850' },
    { type: 'AUX',      label: 'Auxiliary I2C',      color: '#50c8c8' },
    { type: 'CLK',      label: 'Clock',              color: '#7090a8' },
    { type: 'CPOUT',    label: 'Charge Pump',        color: '#c078ff' },
    { type: 'RESERVED', label: 'Reserved',           color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // QFN-24 pin numbering (counter-clockwise from pin 1 at top-left):
  //   LEFT side (pins 1-6):   top → bottom
  //   BOTTOM side (pins 7-12): left → right
  //   RIGHT side (pins 13-18): bottom → top
  //   TOP side (pins 19-24):   right → left
  pins: [
    // ========== LEFT SIDE (pins 1-6, top to bottom) ==========
    {
      num:  1,
      id:   'CLKIN',
      lbl:  'CLKIN',
      name: 'External Clock Input',
      type: 'CLK',
      funcs: ['CLK'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Optional external clock input (3-5V). Can be used instead of internal oscillator. Leave floating if not used.'
    },
    {
      num:  2,
      id:   'CPOUT',
      lbl:  'CPOUT',
      name: 'Charge Pump Output',
      type: 'CPOUT',
      funcs: ['CPOUT'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Charge pump capacitor connection. Connect a 10nF capacitor between CPOUT and CPGND.'
    },
    {
      num:  3,
      id:   'RESV1',
      lbl:  'RESV',
      name: 'Reserved Pin 1',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved pin. Leave unconnected or connect to GND as per datasheet recommendation.'
    },
    {
      num:  4,
      id:   'RESV2',
      lbl:  'RESV',
      name: 'Reserved Pin 2',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved pin. Leave unconnected or connect to GND as per datasheet recommendation.'
    },
    {
      num:  5,
      id:   'RESV3',
      lbl:  'RESV',
      name: 'Reserved Pin 3',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved pin. Leave unconnected or connect to GND as per datasheet recommendation.'
    },
    {
      num:  6,
      id:   'RESV4',
      lbl:  'RESV',
      name: 'Reserved Pin 4',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved pin. Leave unconnected or connect to GND as per datasheet recommendation.'
    },

    // ========== BOTTOM SIDE (pins 7-12, left to right) ==========
    {
      num:  7,
      id:   'REGOUT',
      lbl:  'REGOUT',
      name: 'Regulator Output',
      type: 'PWR',
      funcs: ['PWR'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Voltage regulator output (typically 2.5V). Connect a 10nF capacitor to GND. Do not load externally.'
    },
    {
      num:  8,
      id:   'VDD',
      lbl:  'VDD',
      name: 'Analog Supply Voltage',
      type: 'PWR',
      funcs: ['PWR'],
      volt: '2.375–3.46V',
      curr: 'N/A',
      note: 'Analog power supply (2.375V - 3.46V). Decouple with 0.1µF capacitor to GND near the pin.'
    },
    {
      num:  9,
      id:   'GND',
      lbl:  'GND',
      name: 'Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: 'N/A',
      note: 'Ground reference for all supplies. Connect to solid ground plane.'
    },
    {
      num:  10,
      id:   'GND',
      lbl:  'GND',
      name: 'Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: 'N/A',
      note: 'Ground reference for all supplies. Connect to solid ground plane.'
    },
    {
      num:  11,
      id:   'VLOGIC',
      lbl:  'VLOGIC',
      name: 'Digital I/O Supply Voltage',
      type: 'PWR',
      funcs: ['PWR'],
      volt: '1.71–3.46V',
      curr: 'N/A',
      note: 'Digital I/O power supply (1.71V - 3.46V). Can be connected to VDD or a separate lower voltage for I/O level shifting.'
    },
    {
      num:  12,
      id:   'AD0',
      lbl:  'AD0',
      name: 'I2C Address Select',
      type: 'I2C',
      funcs: ['I2C'],
      volt: '0–3.46V',
      curr: 'N/A',
      note: 'I2C slave address LSB. Connect to GND for address 0x68 (default) or VLOGIC for address 0x69.'

    },

    // ========== RIGHT SIDE (pins 13-18, bottom to top) ==========
    {
      num:  13,
      id:   'INT',
      lbl:  'INT',
      name: 'Interrupt Output',
      type: 'INT',
      funcs: ['INT'],
      volt: '0–3.46V',
      curr: 'N/A',
      note: 'Active-high interrupt output. Can be configured for data ready, wake-on-motion, etc. Open-drain output.'
    },
    {
      num:  14,
      id:   'SDA',
      lbl:  'SDA',
      name: 'I2C Serial Data',
      type: 'I2C',
      funcs: ['I2C'],
      volt: '0–3.46V',
      curr: 'N/A',
      note: 'I2C data line (bidirectional). Requires external pull-up resistor (2.2k-4.7kΩ to VLOGIC).'
    },
    {
      num:  15,
      id:   'SCL',
      lbl:  'SCL',
      name: 'I2C Serial Clock',
      type: 'I2C',
      funcs: ['I2C'],
      volt: '0–3.46V',
      curr: 'N/A',
      note: 'I2C clock line. Requires external pull-up resistor (2.2k-4.7kΩ to VLOGIC). Supports up to 400kHz.'
    },
    {
      num:  16,
      id:   'AUX_DA',
      lbl:  'AUXDA',
      name: 'Auxiliary I2C Data',
      type: 'AUX',
      funcs: ['AUX'],
      volt: '0–3.46V',
      curr: 'N/A',
      note: 'Auxiliary I2C data line (for external magnetometer like AK8975). Requires external pull-up resistors.'
    },
    {
      num:  17,
      id:   'AUX_CL',
      lbl:  'AUXCL',
      name: 'Auxiliary I2C Clock',
      type: 'AUX',
      funcs: ['AUX'],
      volt: '0–3.46V',
      curr: 'N/A',
      note: 'Auxiliary I2C clock line (for external magnetometer). Requires external pull-up resistors.'
    },
    {
      num:  18,
      id:   'GND',
      lbl:  'GND',
      name: 'Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: 'N/A',
      note: 'Ground reference. Connect to solid ground plane.'
    },

    // ========== TOP SIDE (pins 19-24, right to left) ==========
    {
      num:  19,
      id:   'GND',
      lbl:  'GND',
      name: 'Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: 'N/A',
      note: 'Ground reference. Connect to solid ground plane.'
    },
    {
      num:  20,
      id:   'CPGND',
      lbl:  'CPGND',
      name: 'Charge Pump Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: 'N/A',
      note: 'Charge pump ground. Connect to ground and place 10nF capacitor between CPOUT and CPGND.'
    },
    {
      num:  21,
      id:   'RESV5',
      lbl:  'RESV',
      name: 'Reserved Pin 5',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved pin. Leave unconnected or connect to GND as per datasheet recommendation.'
    },
    {
      num:  22,
      id:   'RESV6',
      lbl:  'RESV',
      name: 'Reserved Pin 6',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved pin. Leave unconnected or connect to GND as per datasheet recommendation.'
    },
    {
      num:  23,
      id:   'RESV7',
      lbl:  'RESV',
      name: 'Reserved Pin 7',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved pin. Leave unconnected or connect to GND as per datasheet recommendation.'
    },
    {
      num:  24,
      id:   'RESV8',
      lbl:  'RESV',
      name: 'Reserved Pin 8',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved pin. Leave unconnected or connect to GND as per datasheet recommendation.'
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'AD0': ['I2C_ADDR'],
    'INT': ['DATA_RDY', 'WOM_INT'],
    'AUX_DA': ['AK8975_SDA'],
    'AUX_CL': ['AK8975_SCL'],
    'CLKIN': ['EXT_SYNC'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Sensors',     value: 'Gyro + Accel + Temp',     color: '#e0e5ec' },
    { label: 'Gyro Range',  value: '±250/500/1000/2000 °/s', color: '#50c8c8' },
    { label: 'Accel Range', value: '±2/4/8/16 g',            color: '#78c878' },
    { label: 'Interface',   value: 'I2C (400kHz)',           color: '#9898d8' },
    { label: 'Supply',      value: '2.375–3.46V',            color: '#ff6b6b' },
    { label: 'Package',     value: 'QFN-24 (5x5mm)',         color: '#e0e5ec' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',     value: 'MEMS 6-axis motion tracking' },
    { label: 'Gyro Sensitivity', value: '131 LSB/°/s (±250°/s range)' },
    { label: 'Accel Sensitivity', value: '16384 LSB/g (±2g range)' },
    { label: 'Gyro Noise',       value: '0.05 °/s/√Hz' },
    { label: 'Accel Noise',      value: '400 µg/√Hz' },
    { label: 'Temperature Sensor', value: '±1°C accuracy' },
    { label: 'I2C Address',      value: '0x68 (AD0=GND) or 0x69 (AD0=VLOGIC)' },
    { label: 'Operating Temp',   value: '-40°C to +85°C' },
    { label: 'Current (normal)', value: '3.9mA (gyro+accel)' },
    { label: 'Current (sleep)',  value: '8µA' },
    { label: 'ADC Resolution',   value: '16-bit (gyro & accel)' },
    { label: 'On-chip FIFO',     value: '1024 bytes' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    '6-axis motion tracking with 3-axis gyroscope and 3-axis accelerometer',
    'Digital Motion Processor (DMP) for sensor fusion offloading',
    'Programmable gyro ranges: ±250, ±500, ±1000, ±2000°/sec',
    'Programmable accelerometer ranges: ±2g, ±4g, ±8g, ±16g',
    '16-bit ADC for each channel (gyro, accel, temperature)',
    'I2C interface up to 400kHz with configurable address',
    'Auxiliary I2C bus for external magnetometer (AK8975/AK8963)',
    '1024-byte FIFO buffer to reduce host processor load',
    'Programmable interrupt sources (data ready, wake-on-motion, etc.)',
    'On-chip temperature sensor (±1°C accuracy)',
    'Low power consumption: 3.9mA normal, 8µA sleep',
    'Small QFN-24 package (5x5mm) for space-constrained designs',
  ],
};
