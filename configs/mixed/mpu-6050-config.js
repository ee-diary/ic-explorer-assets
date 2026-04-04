// configs/mpu6050-config.js
window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'MPU6050',
  partMPN:      'MPU6050',
  manufacturer: 'TDK-InvenSense',
  package:      'QFN-24',           // This is correct for the raw IC
  pinCount:     24,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/MPU6050/InvenSense/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/MPU6050/InvenSense/download/',
  datasheetURL: 'https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf',

  // ── LAYOUT HINT (QFN-24) ──────────────────────────────────────
  qfpConfig: {
  pinsPerSide: 6,
  bodySize: 320,        // ← Smaller body (was 400)
  pinLength: 20,        // ← Shorter pins (was 28)
  pinWidth: 14,         // ← Thinner pins (was 20)
  pinGap: 1,            // ← No gap
},

  // ── CUSTOM TYPE COLOURS ─────────────────────────────────────
  customTypes: {
    I2C:     { c: '#9898d8', bg: 'rgba(152,152,216,0.12)', bd: 'rgba(152,152,216,0.35)' },
    INT:     { c: '#c8a850', bg: 'rgba(200,168,80,0.12)',  bd: 'rgba(200,168,80,0.35)' },
    AUX:     { c: '#50c8c8', bg: 'rgba(80,200,200,0.12)',  bd: 'rgba(80,200,200,0.32)' },
    CLK:     { c: '#7090a8', bg: 'rgba(112,144,168,0.12)', bd: 'rgba(112,144,168,0.35)' },
    CPOUT:   { c: '#c078ff', bg: 'rgba(192,120,255,0.11)', bd: 'rgba(192,120,255,0.28)' },
    RESERVED: { c: '#a8a8a8', bg: 'rgba(168,168,168,0.08)', bd: 'rgba(168,168,168,0.20)' },
  },

  // ── FILTER BUTTONS ──────────────────────────────────────────
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

  // ── PINS (QFN-24) ──────────────────────────────────────────
  pins: [
    // LEFT SIDE (pins 1-6, top to bottom)
    {
      num:  1,
      id:   'CLKIN',
      lbl:  'CLKIN',
      name: 'External Clock Input',
      type: 'CLK',
      funcs: ['CLK'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Optional external clock input. Leave floating if not used.'
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
      note: 'Connect 10nF capacitor between CPOUT and CPGND.'
    },
    {
      num:  3,
      id:   'RESV1',
      lbl:  'RESV',
      name: 'Reserved',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved - do not connect.'
    },
    {
      num:  4,
      id:   'RESV2',
      lbl:  'RESV',
      name: 'Reserved',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved - do not connect.'
    },
    {
      num:  5,
      id:   'RESV3',
      lbl:  'RESV',
      name: 'Reserved',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved - do not connect.'
    },
    {
      num:  6,
      id:   'RESV4',
      lbl:  'RESV',
      name: 'Reserved',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved - do not connect.'
    },

    // BOTTOM SIDE (pins 7-12, left to right)
    {
      num:  7,
      id:   'REGOUT',
      lbl:  'REGOUT',
      name: 'Regulator Output',
      type: 'PWR',
      funcs: ['PWR'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Connect 10nF capacitor to GND.'
    },
    {
      num:  8,
      id:   'VDD',
      lbl:  'VDD',
      name: 'Analog Supply',
      type: 'PWR',
      funcs: ['PWR'],
      volt: '2.375-3.46V',
      curr: 'N/A',
      note: 'Decouple with 0.1µF capacitor to GND.'
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
      note: 'Connect to ground plane.'
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
      note: 'Connect to ground plane.'
    },
    {
      num:  11,
      id:   'VLOGIC',
      lbl:  'VLOGIC',
      name: 'Digital I/O Supply',
      type: 'PWR',
      funcs: ['PWR'],
      volt: '1.71-3.46V',
      curr: 'N/A',
      note: 'Must be ≤ VDD at all times.'
    },
    {
      num:  12,
      id:   'AD0',
      lbl:  'AD0',
      name: 'I2C Address Select',
      type: 'I2C',
      funcs: ['I2C'],
      volt: '0-3.46V',
      curr: 'N/A',
      note: 'GND=0x68, VLOGIC=0x69 [citation:2].'
    },

    // RIGHT SIDE (pins 13-18, bottom to top)
    {
      num:  13,
      id:   'INT',
      lbl:  'INT',
      name: 'Interrupt',
      type: 'INT',
      funcs: ['INT'],
      volt: '0-3.46V',
      curr: 'N/A',
      note: 'Active-high open-drain interrupt output.'
    },
    {
      num:  14,
      id:   'SDA',
      lbl:  'SDA',
      name: 'I2C Serial Data',
      type: 'I2C',
      funcs: ['I2C'],
      volt: '0-3.46V',
      curr: 'N/A',
      note: 'Requires pull-up resistor to VLOGIC.'
    },
    {
      num:  15,
      id:   'SCL',
      lbl:  'SCL',
      name: 'I2C Serial Clock',
      type: 'I2C',
      funcs: ['I2C'],
      volt: '0-3.46V',
      curr: 'N/A',
      note: 'Requires pull-up resistor to VLOGIC [citation:2].'
    },
    {
      num:  16,
      id:   'AUX_DA',
      lbl:  'AUXDA',
      name: 'Auxiliary I2C Data',
      type: 'AUX',
      funcs: ['AUX'],
      volt: '0-3.46V',
      curr: 'N/A',
      note: 'For external magnetometer (AK8975).'
    },
    {
      num:  17,
      id:   'AUX_CL',
      lbl:  'AUXCL',
      name: 'Auxiliary I2C Clock',
      type: 'AUX',
      funcs: ['AUX'],
      volt: '0-3.46V',
      curr: 'N/A',
      note: 'For external magnetometer (AK8975).'
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
      note: 'Connect to ground plane.'
    },

    // TOP SIDE (pins 19-24, right to left)
    {
      num:  19,
      id:   'GND',
      lbl:  'GND',
      name: 'Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: 'N/A',
      note: 'Connect to ground plane.'
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
      note: 'Connect 10nF capacitor between CPOUT and CPGND.'
    },
    {
      num:  21,
      id:   'RESV5',
      lbl:  'RESV',
      name: 'Reserved',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved - do not connect.'
    },
    {
      num:  22,
      id:   'RESV6',
      lbl:  'RESV',
      name: 'Reserved',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved - do not connect.'
    },
    {
      num:  23,
      id:   'RESV7',
      lbl:  'RESV',
      name: 'Reserved',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved - do not connect.'
    },
    {
      num:  24,
      id:   'RESV8',
      lbl:  'RESV',
      name: 'Reserved',
      type: 'RESERVED',
      funcs: ['RESERVED'],
      volt: 'N/A',
      curr: 'N/A',
      note: 'Reserved - do not connect.'
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'AD0': ['I2C_ADDR'],
    'INT': ['DATA_RDY'],
    'AUX_DA': ['AK8975_SDA'],
    'AUX_CL': ['AK8975_SCL'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Sensors',     value: 'Gyro + Accel + Temp',     color: '#e0e5ec' },
    { label: 'Gyro Range',  value: '±250/500/1000/2000 °/s', color: '#50c8c8' },
    { label: 'Accel Range', value: '±2/4/8/16 g',            color: '#78c878' },
    { label: 'Interface',   value: 'I2C (400kHz)',           color: '#9898d8' },
    { label: 'Supply',      value: '2.375-3.46V',            color: '#ff6b6b' },
    { label: 'Package',     value: 'QFN-24 (4x4mm)',         color: '#e0e5ec' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'ADC Resolution', value: '16-bit' },
    { label: 'I2C Address',    value: '0x68 or 0x69 [citation:2]' },
    { label: 'Operating Temp', value: '-40°C to +85°C' },
    { label: 'Current (active)', value: '3.9mA' },
    { label: 'Current (sleep)',  value: '8µA' },
    { label: 'FIFO Size',      value: '1024 bytes' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    '6-axis motion tracking (3-axis gyro + 3-axis accelerometer)',
    'Digital Motion Processor (DMP) for sensor fusion',
    'Programmable gyro ranges: ±250, ±500, ±1000, ±2000°/sec',
    'Programmable accelerometer ranges: ±2g, ±4g, ±8g, ±16g',
    '16-bit ADC for each channel',
    'I2C interface up to 400kHz with configurable address (0x68/0x69)',
    'Auxiliary I2C bus for external magnetometer',
    '1024-byte FIFO buffer',
    'Programmable interrupt sources',
    'On-chip temperature sensor',
    'Low power: 3.9mA active, 8µA sleep',
  ],
};
