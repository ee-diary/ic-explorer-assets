// ============================================================
//  configs/arduino-uno-config.js
//  IC Explorer — Arduino Uno R3 board config
//  https://ee-diary.github.io/ic-explorer-assets/configs/arduino-uno-config.js
// ============================================================

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'Arduino Uno R3',
  partMPN:      'A000066',
  manufacturer: 'Arduino',
  package:      'Arduino Uno',        // matched by renderer-factory.js → ArduinoUnoRenderer
  pinCount:     30,                   // 16 digital + 6 analog + 8 power/special

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/A000066/Arduino/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/A000066/Arduino/view-part/?ref=snapeda',
  datasheetURL: 'https://docs.arduino.cc/resources/datasheets/A000066-datasheet.pdf',

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  // Arduino boards use SPEC for board-specific pins (IOREF, AREF)
  // All other types map to standard IC Explorer palette
  customTypes: {
    SPEC: { c: '#7090a8', bg: 'rgba(112,144,168,.12)', bd: 'rgba(112,144,168,.30)' },
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'GPIO', label: 'Digital',  color: '#78c878' },
    { type: 'PWM',  label: 'PWM ~',    color: '#50c8c8' },
    { type: 'ADC',  label: 'Analog',   color: '#c8a850' },
    { type: 'UART', label: 'UART',     color: '#cc6888' },
    { type: 'SPI',  label: 'SPI',      color: '#4a9aee' },
    { type: 'I2C',  label: 'I2C',      color: '#9898d8' },
    { type: 'PWR',  label: 'Power',    color: '#ff6b6b' },
    { type: 'GND',  label: 'GND',      color: '#a8a8a8' },
    { type: 'SPEC', label: 'Special',  color: '#7090a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // Groups: DIGITAL header (right side), POWER header (left), ANALOG header (left-bottom)
  // id must be unique; lbl is the short silk-screen label on the board
  pins: [

    // ── DIGITAL header (D13 → D0, top-right to bottom-right) ──
    { num:  1, id: 'AREF',  lbl: 'AREF',  name: 'Analog Reference',     type: 'SPEC', funcs: ['SPEC'],             volt: '0–5V',   curr: 'N/A',       note: 'External voltage reference for the ADC. Connect to a stable voltage to improve analog read accuracy. Do not exceed VCC.' },
    { num:  2, id: 'GND_D', lbl: 'GND',   name: 'Ground (Digital)',      type: 'GND',  funcs: ['GND'],              volt: '0V',     curr: 'N/A',       note: 'Digital header ground. Internally connected to all other GND pins on the board.' },
    { num:  3, id: 'D13',   lbl: '13',    name: 'D13 / SCK',             type: 'SPI',  funcs: ['GPIO','SPI'],       volt: '0/5V',   curr: '40mA',      note: 'SPI Clock line (SCK). Also drives the onboard L LED. Use digitalWrite(13, HIGH) to blink the built-in LED.' },
    { num:  4, id: 'D12',   lbl: '12',    name: 'D12 / MISO',            type: 'SPI',  funcs: ['GPIO','SPI'],       volt: '0/5V',   curr: '40mA',      note: 'SPI Master In Slave Out (MISO). Data flows from peripheral back to the Arduino master.' },
    { num:  5, id: 'D11',   lbl: '~11',   name: 'D11 / MOSI / PWM',      type: 'SPI',  funcs: ['GPIO','SPI','PWM'], volt: '0/5V',   curr: '40mA',      note: 'SPI Master Out Slave In (MOSI). Also PWM-capable at 490 Hz via Timer2 OC2A.' },
    { num:  6, id: 'D10',   lbl: '~10',   name: 'D10 / SS / PWM',        type: 'SPI',  funcs: ['GPIO','SPI','PWM'], volt: '0/5V',   curr: '40mA',      note: 'SPI Slave Select (SS). Also PWM at 490 Hz via Timer1 OC1B. Pull LOW to address the slave device.' },
    { num:  7, id: 'D9',    lbl: '~9',    name: 'D9 / PWM',              type: 'PWM',  funcs: ['GPIO','PWM'],       volt: '0/5V',   curr: '40mA',      note: 'PWM output at 490 Hz via Timer1 OC1A. Also ICP1 (input capture) for Timer1 measurements.' },
    { num:  8, id: 'D8',    lbl: '8',     name: 'Digital 8',             type: 'GPIO', funcs: ['GPIO'],             volt: '0/5V',   curr: '40mA',      note: 'General-purpose digital I/O. No PWM. Configurable with pinMode() as INPUT, INPUT_PULLUP, or OUTPUT.' },
    { num:  9, id: 'D7',    lbl: '7',     name: 'Digital 7',             type: 'GPIO', funcs: ['GPIO'],             volt: '0/5V',   curr: '40mA',      note: 'General-purpose digital I/O. No PWM. Fast port-manipulation possible via PORTD register.' },
    { num: 10, id: 'D6',    lbl: '~6',    name: 'D6 / PWM',              type: 'PWM',  funcs: ['GPIO','PWM'],       volt: '0/5V',   curr: '40mA',      note: 'PWM output at 980 Hz via Timer0 OC0A. Note: Timer0 is also used for millis() and delay().' },
    { num: 11, id: 'D5',    lbl: '~5',    name: 'D5 / PWM',              type: 'PWM',  funcs: ['GPIO','PWM'],       volt: '0/5V',   curr: '40mA',      note: 'PWM output at 980 Hz via Timer0 OC0B. Shares Timer0 with D6.' },
    { num: 12, id: 'D4',    lbl: '4',     name: 'Digital 4',             type: 'GPIO', funcs: ['GPIO'],             volt: '0/5V',   curr: '40mA',      note: 'General-purpose digital I/O. T0 external clock input for Timer0 when configured for external source.' },
    { num: 13, id: 'D3',    lbl: '~3',    name: 'D3 / INT1 / PWM',       type: 'PWM',  funcs: ['GPIO','PWM'],       volt: '0/5V',   curr: '40mA',      note: 'PWM at 490 Hz via Timer2 OC2B. Also External Interrupt 1 (INT1) — triggers on RISING, FALLING, or CHANGE.' },
    { num: 14, id: 'D2',    lbl: '2',     name: 'D2 / INT0',             type: 'GPIO', funcs: ['GPIO'],             volt: '0/5V',   curr: '40mA',      note: 'External Interrupt 0 (INT0). Use attachInterrupt(digitalPinToInterrupt(2), isr, MODE) to respond to pin changes.' },
    { num: 15, id: 'TX0',   lbl: 'TX→1',  name: 'D1 / TX (UART)',        type: 'UART', funcs: ['GPIO','UART'],      volt: '0/5V',   curr: '40mA',      note: 'UART transmit pin. Shared with the USB-to-serial chip (ATmega16U2). Avoid using D1 while the Serial monitor is open.' },
    { num: 16, id: 'RX0',   lbl: '←RX0',  name: 'D0 / RX (UART)',        type: 'UART', funcs: ['GPIO','UART'],      volt: '0/5V',   curr: '40mA',      note: 'UART receive pin. Shared with the USB-to-serial chip. A LOW pulse on RX during reset can disrupt USB communication.' },

    // ── POWER header (top-left) ───────────────────────────────
    { num: 17, id: 'IOREF', lbl: 'IOREF', name: 'I/O Voltage Reference',  type: 'SPEC', funcs: ['SPEC'],            volt: '5V',     curr: 'N/A',       note: 'Reports the operating I/O voltage (5V on Uno) so that shields can auto-configure their logic levels.' },
    { num: 18, id: 'RST',   lbl: 'RESET', name: 'Reset',                  type: 'SPEC', funcs: ['SPEC'],            volt: '5V',     curr: 'N/A',       note: 'Pull LOW to reset the ATmega328P. Used by shields for auto-reset and by ISP programmers during flash upload.' },
    { num: 19, id: '3V3',   lbl: '3.3V',  name: '3.3V Output',            type: 'PWR',  funcs: ['PWR'],             volt: '3.3V',   curr: '50mA max',  note: '3.3V regulated output sourced from the USB-to-serial chip LDO. Maximum 50mA — suitable for low-current sensors only.' },
    { num: 20, id: '5V',    lbl: '5V',    name: '5V Output',              type: 'PWR',  funcs: ['PWR'],             volt: '5V',     curr: '400–900mA', note: '5V regulated output. Main power rail for shields and modules. Available whether powered via USB or VIN.' },
    { num: 21, id: 'GND_P', lbl: 'GND',   name: 'Ground (Power)',         type: 'GND',  funcs: ['GND'],             volt: '0V',     curr: 'N/A',       note: 'Power header ground. Internally connected to all other GND pins.' },
    { num: 22, id: 'GND_P2',lbl: 'GND',   name: 'Ground (Power 2)',       type: 'GND',  funcs: ['GND'],             volt: '0V',     curr: 'N/A',       note: 'Second power header ground pin. Provided for convenience when powering multiple devices.' },
    { num: 23, id: 'VIN',   lbl: 'VIN',   name: 'Voltage Input',          type: 'PWR',  funcs: ['PWR'],             volt: '7–12V',  curr: 'N/A',       note: 'Raw external power input. Accepts 7–12V DC. Passes through the onboard NCP1117 5V regulator. Not active when powered by USB.' },

    // ── ANALOG header (bottom-left) ───────────────────────────
    { num: 24, id: 'A0',    lbl: 'A0',    name: 'Analog 0',               type: 'ADC',  funcs: ['ADC','GPIO'],      volt: '0–5V',   curr: 'N/A',       note: '10-bit ADC input (0–1023). Use analogRead(A0). Resolution is ~4.88mV per step. Can also be used as digital I/O (D14).' },
    { num: 25, id: 'A1',    lbl: 'A1',    name: 'Analog 1',               type: 'ADC',  funcs: ['ADC','GPIO'],      volt: '0–5V',   curr: 'N/A',       note: '10-bit ADC input. analogRead(A1). Do not exceed 5V input voltage relative to GND.' },
    { num: 26, id: 'A2',    lbl: 'A2',    name: 'Analog 2',               type: 'ADC',  funcs: ['ADC','GPIO'],      volt: '0–5V',   curr: 'N/A',       note: '10-bit ADC input. analogRead(A2). Also usable as digital I/O pin D16.' },
    { num: 27, id: 'A3',    lbl: 'A3',    name: 'Analog 3',               type: 'ADC',  funcs: ['ADC','GPIO'],      volt: '0–5V',   curr: 'N/A',       note: '10-bit ADC input. analogRead(A3). Also usable as digital I/O pin D17.' },
    { num: 28, id: 'A4',    lbl: 'A4',    name: 'A4 / SDA (I2C)',         type: 'I2C',  funcs: ['ADC','I2C'],       volt: '0–5V',   curr: 'N/A',       note: 'I2C data line (SDA). Used by Wire library. Requires 4.7kΩ pull-up resistor to 5V. Shared with the dedicated SDA pin above D13.' },
    { num: 29, id: 'A5',    lbl: 'A5',    name: 'A5 / SCL (I2C)',         type: 'I2C',  funcs: ['ADC','I2C'],       volt: '0–5V',   curr: 'N/A',       note: 'I2C clock line (SCL). Used by Wire library. Supports 100kHz standard mode and 400kHz fast mode. Requires 4.7kΩ pull-up.' },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'D13':  ['SPI_SCK',  'LED_BUILTIN'],
    'D12':  ['SPI_MISO'],
    'D11':  ['SPI_MOSI', 'OC2A'],
    'D10':  ['SPI_SS',   'OC1B'],
    'D9':   ['OC1A',     'ICP1'],
    'D3':   ['INT1',     'OC2B'],
    'D2':   ['INT0'],
    'TX0':  ['Serial.print()', 'HardwareSerial'],
    'RX0':  ['Serial.read()',  'HardwareSerial'],
    'A5':   ['Wire.setClock()', 'TWI_SCL'],
    'A4':   ['Wire.begin()',    'TWI_SDA'],
    'A0':   ['D14', 'digitalRead/Write'],
    'A1':   ['D15', 'digitalRead/Write'],
    'A2':   ['D16', 'digitalRead/Write'],
    'A3':   ['D17', 'digitalRead/Write'],
    '3V3':  ['Shield supply', 'Sensor power'],
    '5V':   ['Shield supply', 'External device power'],
    'VIN':  ['Raw input', 'Shield passthrough'],
    'AREF': ['analogReference(EXTERNAL)'],
    'RST':  ['watchdogReset()', 'ISP reset'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'MCU',         value: 'ATmega328P',      color: '#e0e5ec' },
    { label: 'Flash',       value: '32 KB',           color: '#e0e5ec' },
    { label: 'SRAM',        value: '2 KB',            color: '#e0e5ec' },
    { label: 'Clock',       value: '16 MHz',          color: '#c8a850' },
    { label: 'Supply',      value: '5V / 7–12V VIN',  color: '#78c878' },
    { label: 'Digital I/O', value: '14 (6 PWM)',      color: '#e0e5ec' },
    { label: 'Analog In',   value: '6 × 10-bit',      color: '#e0e5ec' },
    { label: 'Interfaces',  value: 'UART + SPI + I²C' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',    value: '8-bit AVR RISC' },
    { label: 'MCU',             value: 'ATmega328P-PU' },
    { label: 'USB-Serial',      value: 'ATmega16U2' },
    { label: 'Flash',           value: '32 KB (0.5 KB bootloader)' },
    { label: 'SRAM',            value: '2 KB' },
    { label: 'EEPROM',          value: '1 KB' },
    { label: 'Clock Speed',     value: '16 MHz' },
    { label: 'Operating Volt',  value: '5V' },
    { label: 'Input Volt',      value: '7–12V (recommended)' },
    { label: 'Digital I/O',     value: '14 pins (6 PWM-capable)' },
    { label: 'Analog Inputs',   value: '6 × 10-bit ADC' },
    { label: 'DC per I/O pin',  value: '40mA max' },
    { label: 'DC for 3.3V pin', value: '50mA max' },
    { label: 'PWM Frequency',   value: '490 Hz (D3,D9,D10,D11) / 980 Hz (D5,D6)' },
    { label: 'UART',            value: '1 × Hardware (D0/D1)' },
    { label: 'SPI',             value: 'D10(SS) D11(MOSI) D12(MISO) D13(SCK)' },
    { label: 'I2C',             value: 'A4(SDA) / A5(SCL)' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'ATmega328P running at 16 MHz with 32KB Flash and 2KB SRAM',
    'Separate ATmega16U2 handles USB-to-serial conversion',
    'Auto-reset circuit allows sketch uploads without pressing Reset',
    '6 PWM pins across three timers (Timer0, Timer1, Timer2)',
    'Hardware SPI on pins 10–13; Hardware I2C on A4/A5',
    'External interrupt support on D2 (INT0) and D3 (INT1)',
    'Onboard L LED connected to D13 for quick blink tests',
    'Operating voltage 5V; accepts 7–12V raw input via VIN',
    'Compatible with thousands of Arduino shields and libraries',
  ],
};