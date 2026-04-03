// configs/mpu-6050-config.js
// MPU-6050 — 6-Axis IMU with 3-Axis Gyroscope, 3-Axis Accelerometer, DMP, and I²C Interface
// TDK InvenSense  |  QFN-24 package  |  24 pins
// Datasheet: https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf
// Document: PS-MPU-6000A-00, Revision 3.4

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'MPU-6050',
  partMPN:      'MPU-6050',
  manufacturer: 'TDK InvenSense',
  package:      'QFN-24',          // 4 mm × 4 mm × 0.9 mm QFN, 6 pins per side
  pinCount:     24,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/MPU-6050/TDK/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/MPU-6050/TDK/view-part/?ref=snapeda',
  datasheetURL: 'https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf',

  // ── LAYOUT HINT (QFN-24) ──────────────────────────────────────
  qfpConfig: {
    pinsPerSide: 6,       // 24 / 4
    bodySize:    380,
    pinLength:   28,
    pinWidth:    24,
    pinGap:      4
  },

  // ── PINS ──────────────────────────────────────────────────────
  // QFN-24 pin ordering (counter-clockwise, pin 1 at top-left):
  //   LEFT   side: pins  1– 6  (top → bottom)
  //   BOTTOM side: pins  7–12  (left → right)
  //   RIGHT  side: pins 13–18  (bottom → top)
  //   TOP    side: pins 19–24  (right → left)
  //
  // Physical pinout from datasheet Section 7.1 (top view, CCW from pin 1):
  //   LEFT:   1=CLKIN,  2=NC,     3=NC,     4=NC,     5=NC,     6=AUX_DA
  //   BOTTOM: 7=AUX_CL, 8=VLOGIC, 9=AD0,   10=REGOUT,11=FSYNC, 12=INT
  //   RIGHT:  13=VDD,  14=GND,   15=GND,   16=GND,   17=GND,   18=GND (CP)
  //   TOP:    19=RESV, 20=RESV,  21=GND,   22=CPOUT, 23=SCL,   24=SDA

  pins: [
    // ── LEFT SIDE (pins 1–6, top → bottom) ───────────────────
    {
      num:   1,
      id:    'CLKIN',
      lbl:   'CLKIN',
      name:  'External Clock Input (CLKIN)',
      type:  'XTAL',
      funcs: ['XTAL'],
      volt:  '1.8V / VDD',
      curr:  'N/A',
      note:  'Optional external reference clock input. When an external clock is provided here, the MPU-6050 can synchronise its internal timing to it for improved accuracy across multiple sensors. Connect to GND if unused — do not leave floating.'
    },
    {
      num:   2,
      id:    'NC2',
      lbl:   'NC',
      name:  'No Connect (NC) — Pin 2',
      type:  'GPIO',
      funcs: ['GPIO'],
      volt:  'N/A',
      curr:  'N/A',
      note:  'No internal connection. Leave floating or connect to GND. Do not drive this pin with an active signal, as the internal connection state is not defined.'
    },
    {
      num:   3,
      id:    'NC3',
      lbl:   'NC',
      name:  'No Connect (NC) — Pin 3',
      type:  'GPIO',
      funcs: ['GPIO'],
      volt:  'N/A',
      curr:  'N/A',
      note:  'No internal connection. Leave floating or connect to GND. Do not drive this pin with an active signal, as the internal connection state is not defined.'
    },
    {
      num:   4,
      id:    'NC4',
      lbl:   'NC',
      name:  'No Connect (NC) — Pin 4',
      type:  'GPIO',
      funcs: ['GPIO'],
      volt:  'N/A',
      curr:  'N/A',
      note:  'No internal connection. Leave floating or connect to GND. Do not drive this pin with an active signal, as the internal connection state is not defined.'
    },
    {
      num:   5,
      id:    'NC5',
      lbl:   'NC',
      name:  'No Connect (NC) — Pin 5',
      type:  'GPIO',
      funcs: ['GPIO'],
      volt:  'N/A',
      curr:  'N/A',
      note:  'No internal connection. Leave floating or connect to GND. Do not drive this pin with an active signal, as the internal connection state is not defined.'
    },
    {
      num:   6,
      id:    'AUX_DA',
      lbl:   'AUX_DA',
      name:  'Auxiliary I²C Serial Data (AUX_DA)',
      type:  'I2C',
      funcs: ['I2C'],
      volt:  'VLOGIC',
      curr:  '2 mA sink',
      note:  'Auxiliary I²C bus serial data line. Used when the MPU-6050 acts as an I²C master to read data from external sensors such as magnetometers. In pass-through mode this pin is connected directly to the primary SDA line (pin 24) via an internal analog switch, allowing the host processor to access auxiliary sensors directly.'
    },

    // ── BOTTOM SIDE (pins 7–12, left → right) ────────────────
    {
      num:   7,
      id:    'AUX_CL',
      lbl:   'AUX_CL',
      name:  'Auxiliary I²C Serial Clock (AUX_CL)',
      type:  'I2C',
      funcs: ['I2C'],
      volt:  'VLOGIC',
      curr:  'N/A',
      note:  'Auxiliary I²C bus serial clock line. Clocks the auxiliary I²C bus when the MPU-6050 is configured as an I²C master. In pass-through mode this pin connects to the primary SCL line (pin 23) via an internal analog switch, allowing the host to communicate directly with auxiliary sensors while the MPU-6050 I²C master logic is bypassed.'
    },
    {
      num:   8,
      id:    'VLOGIC',
      lbl:   'VLOGIC',
      name:  'Digital I/O Supply Voltage (VLOGIC)',
      type:  'PWR',
      funcs: ['PWR'],
      volt:  '1.8V or VDD',
      curr:  'N/A',
      note:  'Reference voltage for all digital I/O pins (SCL, SDA, AD0, FSYNC, INT, AUX_DA, AUX_CL). Can be set to 1.8 V±5% for 1.8 V logic systems or tied directly to VDD for 3.3 V logic. This pin distinguishes the MPU-6050 from the MPU-6000, which does not have a separate VLOGIC pin. Place a 10 nF decoupling capacitor close to this pin.'
    },
    {
      num:   9,
      id:    'AD0',
      lbl:   'AD0',
      name:  'I²C Address Select LSB (AD0)',
      type:  'I2C',
      funcs: ['I2C'],
      volt:  'VLOGIC',
      curr:  'N/A',
      note:  'Sets the least significant bit of the 7-bit I²C address. Pull low for address 0x68 (default), pull high for address 0x69. This allows two MPU-6050 devices to share the same I²C bus with unique addresses. Connect to GND if only one device is present on the bus.'
    },
    {
      num:   10,
      id:    'REGOUT',
      lbl:   'REGOUT',
      name:  'Regulator Filter Output (REGOUT)',
      type:  'PWR',
      funcs: ['PWR'],
      volt:  '~1.8V',
      curr:  'N/A',
      note:  'Output of the internal voltage regulator. Connect a 100 nF filter capacitor from this pin to GND, placed as close to the pin as possible. Do not connect any other load to this pin — it is intended solely for the external filter capacitor. The internal regulator generates the 1.8 V reference used by the gyroscope and accelerometer signal chains.'
    },
    {
      num:   11,
      id:    'FSYNC',
      lbl:   'FSYNC',
      name:  'Frame Synchronisation Input (FSYNC)',
      type:  'INT',
      funcs: ['INT'],
      volt:  'VLOGIC',
      curr:  'N/A',
      note:  'Frame synchronisation digital input. A rising edge on this pin can be latched into the sensor data registers, enabling precise timestamping of external events relative to sensor samples — useful for synchronising the IMU with camera frames or GPS pulses. Connect to GND when not used.'
    },
    {
      num:   12,
      id:    'INT',
      lbl:   'INT',
      name:  'Interrupt Output (INT)',
      type:  'INT',
      funcs: ['INT'],
      volt:  'VLOGIC',
      curr:  '2 mA source/sink',
      note:  'Interrupt output pin. Asserts when any enabled interrupt event occurs, including data-ready, FIFO overflow, free-fall detection, motion detection, and zero-motion detection. The interrupt logic level, latch behaviour, and clear mode are all user-programmable via the INT_PIN_CFG register. Can be configured as push-pull or open-drain.'
    },

    // ── RIGHT SIDE (pins 13–18, bottom → top) ────────────────
    {
      num:   13,
      id:    'VDD',
      lbl:   'VDD',
      name:  'Power Supply (VDD)',
      type:  'PWR',
      funcs: ['PWR'],
      volt:  '2.375–3.46V',
      curr:  '3.6 mA typ (gyro+accel)',
      note:  'Primary analog and digital power supply. Operating range is 2.375 V to 3.46 V. The MPU-6050 is NOT 5 V tolerant on this pin. Place a 100 nF ceramic decoupling capacitor and a 4.7 µF bulk capacitor as close to the pin as possible on the same net. Total current consumption is approximately 3.6 mA when both gyroscope and accelerometer are active.'
    },
    {
      num:   14,
      id:    'GND14',
      lbl:   'GND',
      name:  'Ground (GND) — Pin 14',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground reference pin. Connect directly to the system ground plane with a low-impedance return path. The MPU-6050 has multiple GND pins; all must be connected to ground for correct operation and to prevent floating inputs from coupling noise into the sensitive MEMS signal chain.'
    },
    {
      num:   15,
      id:    'GND15',
      lbl:   'GND',
      name:  'Ground (GND) — Pin 15',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground reference pin. Connect to system ground plane. Multiple ground pins distribute the ground return current across the package and reduce parasitic inductance. All ground pins should be connected together and to a solid ground pour on the PCB.'
    },
    {
      num:   16,
      id:    'GND16',
      lbl:   'GND',
      name:  'Ground (GND) — Pin 16',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground reference pin. Connect to system ground plane. Refer to the PCB design guidelines in the datasheet (Section 11.3) for recommended ground pour geometry around the QFN package to achieve best noise performance from the MEMS sensors.'
    },
    {
      num:   17,
      id:    'GND17',
      lbl:   'GND',
      name:  'Ground (GND) — Pin 17',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground reference pin. Connect to system ground plane. Multiple ground connections ensure the thermal pad and external package body are at a stable ground potential, which is important for the accuracy of the on-chip temperature sensor.'
    },
    {
      num:   18,
      id:    'GND_CP',
      lbl:   'GND',
      name:  'Charge Pump Ground (GND / CP)',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground connection for the internal charge pump. The charge pump generates the elevated voltage needed to drive the MEMS gyroscope structures. Connect to ground along with all other GND pins. The CPOUT pin (22) is the output side of this charge pump and requires an external capacitor.'
    },

    // ── TOP SIDE (pins 19–24, right → left) ──────────────────
    {
      num:   19,
      id:    'RESV19',
      lbl:   'RESV',
      name:  'Reserved — Pin 19',
      type:  'GPIO',
      funcs: ['GPIO'],
      volt:  'N/A',
      curr:  'N/A',
      note:  'Reserved pin. Do not connect. Leave floating. Connecting this pin to any voltage or signal may cause unpredictable device behaviour or damage.'
    },
    {
      num:   20,
      id:    'RESV20',
      lbl:   'RESV',
      name:  'Reserved — Pin 20',
      type:  'GPIO',
      funcs: ['GPIO'],
      volt:  'N/A',
      curr:  'N/A',
      note:  'Reserved pin. Do not connect. Leave floating. Connecting this pin to any voltage or signal may cause unpredictable device behaviour or damage.'
    },
    {
      num:   21,
      id:    'GND21',
      lbl:   'GND',
      name:  'Ground (GND) — Pin 21',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground reference pin on the top side of the package. Connect to system ground plane. Together with the large exposed thermal pad on the underside of the QFN package (which must also be soldered to ground), this pin completes the thermal and electrical ground return path.'
    },
    {
      num:   22,
      id:    'CPOUT',
      lbl:   'CPOUT',
      name:  'Charge Pump Output (CPOUT)',
      type:  'PWR',
      funcs: ['PWR'],
      volt:  'Elevated (~VDD × 2)',
      curr:  'N/A',
      note:  'Output of the internal charge pump that generates the elevated drive voltage for the MEMS gyroscope structures. Connect a 2.2 nF capacitor from this pin to GND, placed as close to the pin as possible. This capacitor is mandatory — do not leave CPOUT unconnected or connect any other load.'
    },
    {
      num:   23,
      id:    'SCL',
      lbl:   'SCL',
      name:  'I²C Serial Clock (SCL)',
      type:  'I2C',
      funcs: ['I2C'],
      volt:  'VLOGIC',
      curr:  'N/A',
      note:  'Primary I²C serial clock input. Accepts standard mode (100 kHz) and fast mode (400 kHz) I²C clock rates. SCL is input-only on the MPU-6050. Requires an external pull-up resistor to VLOGIC — a 4.7 kΩ resistor is recommended for most cable lengths. Do not exceed the VLOGIC voltage on this pin.'
    },
    {
      num:   24,
      id:    'SDA',
      lbl:   'SDA',
      name:  'I²C Serial Data (SDA)',
      type:  'I2C',
      funcs: ['I2C'],
      volt:  'VLOGIC',
      curr:  '2 mA sink',
      note:  'Primary I²C serial data line — bidirectional open-drain. Transmits and receives 8-bit data frames between the MPU-6050 and the host microcontroller. Requires a 4.7 kΩ pull-up resistor to VLOGIC. The MPU-6050 has a 7-bit I²C address of 0x68 (AD0 = 0) or 0x69 (AD0 = 1). All register accesses — configuration, calibration, and sensor reads — pass through this pin.'
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'AUX_DA':  ['I2C_MASTER_SDA', 'PASS-THROUGH_SDA'],
    'AUX_CL':  ['I2C_MASTER_SCL', 'PASS-THROUGH_SCL'],
    'AD0':     ['SA0'],
    'FSYNC':   ['SYNC_IN'],
    'INT':     ['DATA_RDY', 'MOT_DET', 'FF_DET'],
    'CLKIN':   ['EXT_CLK'],
    'CPOUT':   ['CP_CAP'],
    'REGOUT':  ['REG_CAP'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Gyro Range',   value: '±250–±2000 °/s',   color: '#50c8c8' },
    { label: 'Accel Range',  value: '±2g – ±16g',        color: '#c8a850' },
    { label: 'ADC',          value: '16-bit each axis',  color: '#e0e5ec' },
    { label: 'Supply',       value: '2.375–3.46 V',      color: '#78c878' },
    { label: 'Interface',    value: 'I²C (0x68 / 0x69)', color: '#9898d8' },
    { label: 'DMP',          value: 'On-chip (6-axis)',  color: '#c8a850' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Gyro Full-Scale Range',     value: '±250, ±500, ±1000, ±2000 °/s (programmable)' },
    { label: 'Gyro Sensitivity',          value: '131, 65.5, 32.8, 16.4 LSB/°/s' },
    { label: 'Gyro ODR',                  value: '8 kHz (DMP), up to 1 kHz (register output)' },
    { label: 'Gyro Noise Density',        value: '0.01 °/s/√Hz' },
    { label: 'Accel Full-Scale Range',    value: '±2g, ±4g, ±8g, ±16g (programmable)' },
    { label: 'Accel Sensitivity',         value: '16384, 8192, 4096, 2048 LSB/g' },
    { label: 'Accel ODR',                 value: 'Up to 1 kHz' },
    { label: 'ADC Resolution',            value: '16-bit per axis (gyro + accel + temp)' },
    { label: 'Temperature Sensor',        value: 'On-chip, −40°C to +85°C, ±1% FSR' },
    { label: 'Supply Voltage (VDD)',      value: '2.375 V to 3.46 V' },
    { label: 'Logic Supply (VLOGIC)',     value: '1.8 V ± 5% or VDD' },
    { label: 'Gyro + Accel Current',      value: '3.6 mA (normal), 5 µA (sleep)' },
    { label: 'I²C Address',               value: '0x68 (AD0=0) or 0x69 (AD0=1)' },
    { label: 'I²C Speed',                 value: 'Standard 100 kHz, Fast 400 kHz' },
    { label: 'FIFO Buffer',               value: '1024 bytes' },
    { label: 'Shock Tolerance',           value: '10,000 g' },
    { label: 'Operating Temperature',     value: '−40°C to +85°C' },
    { label: 'Package',                   value: 'QFN-24, 4 mm × 4 mm × 0.9 mm' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Worlds first integrated 6-axis MotionTracking device combining a 3-axis gyroscope and 3-axis accelerometer on a single die',
    'On-chip Digital Motion Processor (DMP) offloads 6-axis sensor fusion, quaternion computation, and gesture recognition from the host CPU',
    '16-bit ADCs on every sensing axis simultaneously digitise all six motion channels with no crosstalk',
    'Programmable full-scale gyroscope range of ±250/±500/±1000/±2000 °/s and accelerometer range of ±2g/±4g/±8g/±16g',
    'Programmable digital low-pass filters on both gyroscope and accelerometer outputs to reject high-frequency noise',
    'Auxiliary I²C master port allows the MPU-6050 to directly read a 3-axis magnetometer or pressure sensor to provide 9-axis output to the DMP',
    'Pass-through mode routes the auxiliary I²C pins to the primary I²C bus so the host processor can configure external sensors directly',
    'Separate VLOGIC supply pin allows 1.8 V digital I/O in systems where VDD is 3.3 V, easing level translation',
    '1024-byte FIFO buffer reduces host interrupt service frequency and enables burst reads to lower average bus utilisation',
    'Programmable interrupt engine supports data-ready, FIFO overflow, free-fall, zero-motion, and motion-threshold events',
    'Built-in temperature sensor accurate to ±1% FSR enables automatic temperature compensation of sensor offsets',
    'Factory-calibrated sensitivity and 10,000 g shock-tolerant construction suitable for ruggedised portable and industrial applications',
    'Ultra-compact 4 mm × 4 mm × 0.9 mm QFN package designed for space- and power-constrained wearable and mobile applications',
  ],
};