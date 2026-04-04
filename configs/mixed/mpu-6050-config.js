window.IC_CONFIG = {
  partName:     'MPU6050',
  partMPN:      'MPU6050',
  manufacturer: 'TDK-InvenSense',
  package:      'QFP-24',        // ← was QFN-24; must contain QFP to match renderer
  pinCount:     24,

  snapPageURL:  'https://www.snapeda.com/parts/MPU6050/InvenSense/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/MPU6050/InvenSense/download/',
  datasheetURL: 'https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf',

  qfpConfig: {
    pinsPerSide: 6,
    bodySize:    320,
    pinLength:   20,
    pinWidth:    14,
    pinGap:      1,
    pinOffset:   40  
    // removed non-standard pinStartOffset / pinEndOffset
  },

  // Only genuinely non-standard types — PWR, GND, I2C, INT are already built-in
  customTypes: {
    AUX:      { c: '#50c8c8', bg: 'rgba(80,200,200,.12)',   bd: 'rgba(80,200,200,.32)'   },
    CLK:      { c: '#7090a8', bg: 'rgba(112,144,168,.12)',  bd: 'rgba(112,144,168,.35)'  },
    CPOUT:    { c: '#c078ff', bg: 'rgba(192,120,255,.11)',  bd: 'rgba(192,120,255,.28)'  },
    RESERVED: { c: '#555968', bg: 'rgba(85,89,104,.08)',    bd: 'rgba(85,89,104,.20)'    },
  },

  filterButtons: [
    { type: 'PWR',      label: 'Power',        color: '#ff6b6b' },
    { type: 'GND',      label: 'Ground',       color: '#a8a8a8' },
    { type: 'I2C',      label: 'I2C',          color: '#9898d8' },
    { type: 'INT',      label: 'Interrupt',    color: '#c8a850' },
    { type: 'AUX',      label: 'Auxiliary',    color: '#50c8c8' },
    { type: 'CLK',      label: 'Clock',        color: '#7090a8' },
    { type: 'CPOUT',    label: 'Charge Pump',  color: '#c078ff' },
    { type: 'RESERVED', label: 'Reserved',     color: '#555968' },
  ],

  pins: [
    // LEFT side — pins 1–6, top → bottom
    { num:  1, id: 'CLKIN',   lbl: 'CLKIN',  name: 'External Clock Input',       type: 'CLK',      funcs: ['CLK'],      volt: 'N/A',        curr: 'N/A', note: 'Optional external clock input. Leave unconnected if unused.' },
    { num:  2, id: 'CPOUT',   lbl: 'CPOUT',  name: 'Charge Pump Output',         type: 'CPOUT',    funcs: ['CPOUT'],    volt: 'N/A',        curr: 'N/A', note: 'Connect a 10nF capacitor between CPOUT and CPGND.' },
    { num:  3, id: 'RESV1',   lbl: 'RESV',   name: 'Reserved',                   type: 'RESERVED', funcs: ['RESERVED'], volt: 'N/A',        curr: 'N/A', note: 'Reserved — do not connect.' },
    { num:  4, id: 'RESV2',   lbl: 'RESV',   name: 'Reserved',                   type: 'RESERVED', funcs: ['RESERVED'], volt: 'N/A',        curr: 'N/A', note: 'Reserved — do not connect.' },
    { num:  5, id: 'RESV3',   lbl: 'RESV',   name: 'Reserved',                   type: 'RESERVED', funcs: ['RESERVED'], volt: 'N/A',        curr: 'N/A', note: 'Reserved — do not connect.' },
    { num:  6, id: 'RESV4',   lbl: 'RESV',   name: 'Reserved',                   type: 'RESERVED', funcs: ['RESERVED'], volt: 'N/A',        curr: 'N/A', note: 'Reserved — do not connect.' },
    // BOTTOM side — pins 7–12, left → right
    { num:  7, id: 'REGOUT',  lbl: 'REGOUT', name: 'Regulator Output',           type: 'PWR',      funcs: ['PWR'],      volt: 'N/A',        curr: 'N/A', note: 'Internal regulator output. Connect 10nF capacitor to GND.' },
    { num:  8, id: 'VDD',     lbl: 'VDD',    name: 'Analog Supply',              type: 'PWR',      funcs: ['PWR'],      volt: '2.375–3.46V',curr: 'N/A', note: 'Main analog supply. Decouple with 0.1µF capacitor to GND.' },
    { num:  9, id: 'GND1',    lbl: 'GND',    name: 'Ground',                     type: 'GND',      funcs: ['GND'],      volt: '0V',         curr: 'N/A', note: 'Connect to ground plane.' },
    { num: 10, id: 'GND2',    lbl: 'GND',    name: 'Ground',                     type: 'GND',      funcs: ['GND'],      volt: '0V',         curr: 'N/A', note: 'Connect to ground plane.' },
    { num: 11, id: 'VLOGIC',  lbl: 'VLOGIC', name: 'Digital I/O Supply',         type: 'PWR',      funcs: ['PWR'],      volt: '1.71–3.46V', curr: 'N/A', note: 'Digital I/O supply voltage. Must be less than or equal to VDD.' },
    { num: 12, id: 'AD0',     lbl: 'AD0',    name: 'I2C Address Select',         type: 'I2C',      funcs: ['I2C'],      volt: '0–3.46V',    curr: 'N/A', note: 'Selects I2C address: GND = 0x68, VLOGIC = 0x69.' },
    // RIGHT side — pins 13–18, bottom → top
    { num: 13, id: 'INT',     lbl: 'INT',    name: 'Interrupt Output',           type: 'INT',      funcs: ['INT'],      volt: '0–3.46V',    curr: 'N/A', note: 'Active-high open-drain interrupt output. Add pull-up resistor.' },
    { num: 14, id: 'SDA',     lbl: 'SDA',    name: 'I2C Serial Data',            type: 'I2C',      funcs: ['I2C'],      volt: '0–3.46V',    curr: 'N/A', note: 'I2C data line. Requires external pull-up resistor.' },
    { num: 15, id: 'SCL',     lbl: 'SCL',    name: 'I2C Serial Clock',           type: 'I2C',      funcs: ['I2C'],      volt: '0–3.46V',    curr: 'N/A', note: 'I2C clock line. Requires external pull-up resistor.' },
    { num: 16, id: 'AUX_DA',  lbl: 'AUXDA',  name: 'Auxiliary I2C Data',         type: 'AUX',      funcs: ['AUX'],      volt: '0–3.46V',    curr: 'N/A', note: 'Auxiliary I2C data line for external magnetometer (e.g. AK8975).' },
    { num: 17, id: 'AUX_CL',  lbl: 'AUXCL',  name: 'Auxiliary I2C Clock',        type: 'AUX',      funcs: ['AUX'],      volt: '0–3.46V',    curr: 'N/A', note: 'Auxiliary I2C clock line for external magnetometer (e.g. AK8975).' },
    { num: 18, id: 'GND3',    lbl: 'GND',    name: 'Ground',                     type: 'GND',      funcs: ['GND'],      volt: '0V',         curr: 'N/A', note: 'Connect to ground plane.' },
    // TOP side — pins 19–24, right → left
    { num: 19, id: 'GND4',    lbl: 'GND',    name: 'Ground',                     type: 'GND',      funcs: ['GND'],      volt: '0V',         curr: 'N/A', note: 'Connect to ground plane.' },
    { num: 20, id: 'CPGND',   lbl: 'CPGND',  name: 'Charge Pump Ground',         type: 'GND',      funcs: ['GND'],      volt: '0V',         curr: 'N/A', note: 'Charge pump ground. Connect 10nF capacitor between CPOUT and CPGND.' },
    { num: 21, id: 'RESV5',   lbl: 'RESV',   name: 'Reserved',                   type: 'RESERVED', funcs: ['RESERVED'], volt: 'N/A',        curr: 'N/A', note: 'Reserved — do not connect.' },
    { num: 22, id: 'RESV6',   lbl: 'RESV',   name: 'Reserved',                   type: 'RESERVED', funcs: ['RESERVED'], volt: 'N/A',        curr: 'N/A', note: 'Reserved — do not connect.' },
    { num: 23, id: 'RESV7',   lbl: 'RESV',   name: 'Reserved',                   type: 'RESERVED', funcs: ['RESERVED'], volt: 'N/A',        curr: 'N/A', note: 'Reserved — do not connect.' },
    { num: 24, id: 'RESV8',   lbl: 'RESV',   name: 'Reserved',                   type: 'RESERVED', funcs: ['RESERVED'], volt: 'N/A',        curr: 'N/A', note: 'Reserved — do not connect.' },
  ],

  altFuncs: {
    'AD0':    ['I2C_ADDR'],
    'INT':    ['DATA_RDY'],
    'AUX_DA': ['AK8975_SDA'],
    'AUX_CL': ['AK8975_SCL'],
  },

  quickSpecs: [
    { label: 'Sensors',     value: 'Gyro + Accel + Temp',   color: '#e0e5ec' },
    { label: 'Gyro Range',  value: '±250–2000 °/s',         color: '#50c8c8' },
    { label: 'Accel Range', value: '±2–16 g',               color: '#78c878' },
    { label: 'Interface',   value: 'I2C up to 400kHz',      color: '#9898d8' },
    { label: 'Supply',      value: '2.375–3.46V',           color: '#ff6b6b' },
    { label: 'Package',     value: 'QFN-24 (4×4mm)',        color: '#e0e5ec' },
  ],

  dsSpecs: [
    { label: 'ADC Resolution',  value: '16-bit per axis' },
    { label: 'I2C Address',     value: '0x68 or 0x69' },
    { label: 'Operating Temp',  value: '−40°C to +85°C' },
    { label: 'Current (active)',value: '3.9mA' },
    { label: 'Current (sleep)', value: '8µA' },
    { label: 'FIFO Size',       value: '1024 bytes' },
  ],

  dsFeatures: [
    '6-axis motion tracking: 3-axis gyroscope + 3-axis accelerometer',
    'Digital Motion Processor (DMP) for on-chip sensor fusion',
    'Programmable gyro full-scale range: ±250, ±500, ±1000, ±2000 °/s',
    'Programmable accelerometer full-scale range: ±2g, ±4g, ±8g, ±16g',
    '16-bit ADC resolution on all six axes',
    'I2C interface up to 400kHz with software-selectable address',
    'Auxiliary I2C master bus for external magnetometer connection',
    '1024-byte FIFO buffer reduces host processor interrupt load',
    'Programmable interrupt engine with multiple trigger sources',
    'On-chip temperature sensor',
    'Low power modes: 3.9mA active, 8µA sleep',
  ],
};
