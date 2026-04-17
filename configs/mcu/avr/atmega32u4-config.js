// configs/atmega32u4-config.js
// ATmega32U4 — Microchip/Atmel, TQFP-44, 44 pins
// QFP pin order: LEFT (1–11) → BOTTOM (12–22) → RIGHT (23–33) → TOP (34–44)  [counter-clockwise, pin 1 top-left]

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'ATmega32U4',
  partMPN:      'ATmega32U4-AU',
  manufacturer: 'Microchip',
  package:      'TQFP-44',
  pinCount:     44,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/ATMEGA32U4-AU/Microchip%20Technology/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/ATMEGA32U4-AU/Microchip%20Technology/view-part/?ref=snapeda',
  datasheetURL: 'https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7766-8-bit-AVR-ATmega16U4-32U4_Datasheet.pdf',

  // ── LAYOUT HINT (QFP) ─────────────────────────────────────────
  qfpConfig: {
    pinsPerSide: 11,   // 44 / 4
    bodySize:    420,
    pinLength:   30,
    pinWidth:    18,
    pinGap:      2
  },

  // ── PINS ──────────────────────────────────────────────────────
  // TQFP-44 counter-clockwise from pin 1 (top-left corner, left side descending):
  //   LEFT   side: pins  1 – 11  (top → bottom)
  //   BOTTOM side: pins 12 – 22  (left → right)
  //   RIGHT  side: pins 23 – 33  (bottom → top)
  //   TOP    side: pins 34 – 44  (right → left)
  pins: [

    // ── LEFT SIDE (pins 1–11, top → bottom) ───────────────────
    { num:  1, id: 'PE6',   lbl: 'PE6',   name: 'PE6 / INT6 / AIN0',           type: 'GPIO',  funcs: ['GPIO','INT'],   volt: '3.3/5V', curr: '40mA', note: 'Port E bit 6. Alternate functions: external interrupt INT6 and analog comparator positive input AIN0.' },
    { num:  2, id: 'UVcc',  lbl: 'UVcc',  name: 'USB Transceiver Power',        type: 'PWR',   funcs: ['PWR'],          volt: '3.3V',   curr: 'N/A',  note: 'Dedicated power supply pin for the on-chip USB transceiver. Decouple close to the pin with a 100 nF capacitor.' },
    { num:  3, id: 'D-',    lbl: 'D−',    name: 'USB D− Data Line',             type: 'USB',   funcs: ['USB'],          volt: '3.3V',   curr: 'N/A',  note: 'USB differential data minus line. Connect directly to the USB connector D− signal; add a 22 Ω series resistor if required by your layout.' },
    { num:  4, id: 'D+',    lbl: 'D+',    name: 'USB D+ Data Line',             type: 'USB',   funcs: ['USB'],          volt: '3.3V',   curr: 'N/A',  note: 'USB differential data plus line. Connect directly to the USB connector D+ signal; add a 22 Ω series resistor if required by your layout.' },
    { num:  5, id: 'UGnd',  lbl: 'UGnd',  name: 'USB Transceiver Ground',       type: 'GND',   funcs: ['GND'],          volt: '0V',     curr: 'N/A',  note: 'Ground return for the on-chip USB transceiver. Connect directly to the board ground plane.' },
    { num:  6, id: 'UCap',  lbl: 'UCap',  name: 'USB PLL Decoupling',           type: 'PWR',   funcs: ['PWR'],          volt: '1.0V',   curr: 'N/A',  note: 'Internal USB PLL 1 V regulated output. Connect a 1 µF decoupling capacitor to ground; do not connect to any external supply.' },
    { num:  7, id: 'VBUS',  lbl: 'VBUS',  name: 'USB VBUS Sense',               type: 'USB',   funcs: ['USB'],          volt: '5V',     curr: 'N/A',  note: 'USB bus voltage sense pin. Connect to the USB +5 V VBUS rail (through a resistor divider if needed) so the device can detect cable attach/detach.' },
    { num:  8, id: 'PB0',   lbl: 'PB0',   name: 'PB0 / SS / PCINT0',           type: 'GPIO',  funcs: ['GPIO','SPI'],   volt: '3.3/5V', curr: '40mA', note: 'Port B bit 0. Alternate functions: SPI slave-select /SS and pin-change interrupt PCINT0.' },
    { num:  9, id: 'PB1',   lbl: 'PB1',   name: 'PB1 / SCLK / PCINT1',         type: 'SPI',   funcs: ['SPI','GPIO'],   volt: '3.3/5V', curr: '40mA', note: 'Port B bit 1. Primary SPI clock output SCLK; also pin-change interrupt PCINT1.' },
    { num: 10, id: 'PB2',   lbl: 'PB2',   name: 'PB2 / MOSI / PCINT2',         type: 'SPI',   funcs: ['SPI','GPIO'],   volt: '3.3/5V', curr: '40mA', note: 'Port B bit 2. SPI Master-Out Slave-In MOSI; also pin-change interrupt PCINT2.' },
    { num: 11, id: 'PB3',   lbl: 'PB3',   name: 'PB3 / MISO / PCINT3',         type: 'SPI',   funcs: ['SPI','GPIO'],   volt: '3.3/5V', curr: '40mA', note: 'Port B bit 3. SPI Master-In Slave-Out MISO; also pin-change interrupt PCINT3.' },

    // ── BOTTOM SIDE (pins 12–22, left → right) ────────────────
    { num: 12, id: 'PB7',   lbl: 'PB7',   name: 'PB7 / OC0A / OC1C / PCINT7',  type: 'PWM',   funcs: ['PWM','GPIO'],   volt: '3.3/5V', curr: '40mA', note: 'Port B bit 7. Timer/Counter0 compare output OC0A, Timer/Counter1 compare output C OC1C, and pin-change interrupt PCINT7.' },
    { num: 13, id: 'RESET', lbl: 'RST',   name: 'RESET — Active-Low Reset',     type: 'RESET', funcs: ['RESET'],        volt: '5V',     curr: 'N/A',  note: 'Active-low chip reset. Pull high through a 10 kΩ resistor; drive low for a minimum of 2.5 µs to initiate a reset cycle.' },
    { num: 14, id: 'VCC1',  lbl: 'VCC',   name: 'VCC — Digital Supply',         type: 'PWR',   funcs: ['PWR'],          volt: '2.7–5.5V', curr: 'N/A', note: 'Primary digital supply voltage (2.7–5.5 V). Decouple each VCC pin to ground with a 100 nF bypass capacitor placed as close to the pin as possible.' },
    { num: 15, id: 'GND1',  lbl: 'GND',   name: 'GND — Ground',                 type: 'GND',   funcs: ['GND'],          volt: '0V',     curr: 'N/A',  note: 'Ground reference for the digital core. Connect to the board ground plane.' },
    { num: 16, id: 'XTAL2', lbl: 'XTAL2', name: 'XTAL2 — Crystal Output',       type: 'XTAL',  funcs: ['XTAL'],         volt: '5V',     curr: 'N/A',  note: 'Crystal oscillator output pin. Connects to the output of the inverting oscillator amplifier; connect the external crystal or resonator here.' },
    { num: 17, id: 'XTAL1', lbl: 'XTAL1', name: 'XTAL1 — Crystal Input / Ext Clk', type: 'XTAL', funcs: ['XTAL'],      volt: '5V',     curr: 'N/A',  note: 'Crystal oscillator input pin or external clock input. Connect the external crystal/resonator here, or drive from an external clock source when using the external clock fuse setting.' },
    { num: 18, id: 'PD0',   lbl: 'PD0',   name: 'PD0 / OC0B / SCL / INT0',     type: 'I2C',   funcs: ['I2C','PWM','INT','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port D bit 0. TWI/I²C clock SCL, Timer/Counter0 compare output OC0B, and external interrupt INT0.' },
    { num: 19, id: 'PD1',   lbl: 'PD1',   name: 'PD1 / SDA / INT1',            type: 'I2C',   funcs: ['I2C','INT','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port D bit 1. TWI/I²C data SDA and external interrupt INT1.' },
    { num: 20, id: 'PD2',   lbl: 'PD2',   name: 'PD2 / RXD1 / INT2',           type: 'UART',  funcs: ['UART','INT','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port D bit 2. USART1 receive data RXD1 and external interrupt INT2.' },
    { num: 21, id: 'PD3',   lbl: 'PD3',   name: 'PD3 / TXD1 / INT3',           type: 'UART',  funcs: ['UART','INT','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port D bit 3. USART1 transmit data TXD1 and external interrupt INT3.' },
    { num: 22, id: 'PD5',   lbl: 'PD5',   name: 'PD5 / XCK1 / CTS / PCINT8',   type: 'UART',  funcs: ['UART','GPIO'],  volt: '3.3/5V', curr: '40mA', note: 'Port D bit 5. USART1 external clock XCK1 and hardware CTS flow control; also pin-change interrupt PCINT8.' },

    // ── RIGHT SIDE (pins 23–33, bottom → top) ─────────────────
    { num: 23, id: 'GND2',  lbl: 'GND',   name: 'GND — Ground',                 type: 'GND',   funcs: ['GND'],          volt: '0V',     curr: 'N/A',  note: 'Ground reference for the digital core. Connect to the board ground plane.' },
    { num: 24, id: 'VCC2',  lbl: 'VCC',   name: 'VCC — Digital Supply',         type: 'PWR',   funcs: ['PWR'],          volt: '2.7–5.5V', curr: 'N/A', note: 'Second primary digital supply pin. Decouple with a 100 nF capacitor to ground.' },
    { num: 25, id: 'PD7',   lbl: 'PD7',   name: 'PD7 / T0 / OC4D / ADC10',     type: 'GPIO',  funcs: ['GPIO','TIMER','PWM','ADC'], volt: '3.3/5V', curr: '40mA', note: 'Port D bit 7. Timer/Counter0 external clock input T0, Timer/Counter4 compare output D OC4D, and ADC differential channel input ADC10.' },
    { num: 26, id: 'PD6',   lbl: 'PD6',   name: 'PD6 / T1 / OC4D / ADC9',      type: 'GPIO',  funcs: ['GPIO','TIMER','ADC'],      volt: '3.3/5V', curr: '40mA', note: 'Port D bit 6. Timer/Counter1 external clock input T1 and ADC differential channel input ADC9.' },
    { num: 27, id: 'PC6',   lbl: 'PC6',   name: 'PC6 / OC3A / OC4A',           type: 'PWM',   funcs: ['PWM','GPIO'],   volt: '3.3/5V', curr: '40mA', note: 'Port C bit 6. Timer/Counter3 compare output OC3A and Timer/Counter4 compare output OC4A.' },
    { num: 28, id: 'PC7',   lbl: 'PC7',   name: 'PC7 / ICP3 / CLK0 / OC4A',    type: 'PWM',   funcs: ['PWM','TIMER','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port C bit 7. Timer/Counter3 input capture ICP3, system clock output CLK0, and Timer/Counter4 compare output A OC4A.' },
    { num: 29, id: 'PE2',   lbl: 'PE2',   name: 'PE2 / /HWB / BOOT',           type: 'BOOT',  funcs: ['BOOT','GPIO'],  volt: '3.3/5V', curr: '40mA', note: 'Port E bit 2. Hardware boot pin /HWB — pull low while RESET deasserts to force the device into the USB DFU bootloader.' },
    { num: 30, id: 'VCC3',  lbl: 'VCC',   name: 'AVCC — Analog Supply',         type: 'PWR',   funcs: ['PWR'],          volt: '2.7–5.5V', curr: 'N/A', note: 'Analog supply voltage for the ADC and on-chip bandgap reference. Even when the ADC is not used this pin must be connected to VCC; filter with a 100 nF capacitor and optionally a small LC filter.' },
    { num: 31, id: 'GND3',  lbl: 'GND',   name: 'AGND — Analog Ground',         type: 'GND',   funcs: ['GND'],          volt: '0V',     curr: 'N/A',  note: 'Analog ground return for the ADC. Connect to the ground plane; for best ADC performance route separately from noisy digital ground traces.' },
    { num: 32, id: 'AREF',  lbl: 'AREF',  name: 'AREF — ADC Reference',         type: 'ADC',   funcs: ['ADC'],          volt: '1.0–VCC', curr: 'N/A', note: 'External ADC voltage reference input. Bypass with a 100 nF capacitor. When using the internal 2.56 V reference, connect a 100 nF capacitor here to improve ADC noise performance.' },
    { num: 33, id: 'PF0',   lbl: 'PF0',   name: 'PF0 / ADC0',                   type: 'ADC',   funcs: ['ADC','GPIO'],   volt: '3.3/5V', curr: '40mA', note: 'Port F bit 0. ADC channel 0 single-ended analog input.' },

    // ── TOP SIDE (pins 34–44, right → left) ───────────────────
    { num: 34, id: 'PF1',   lbl: 'PF1',   name: 'PF1 / ADC1',                   type: 'ADC',   funcs: ['ADC','GPIO'],   volt: '3.3/5V', curr: '40mA', note: 'Port F bit 1. ADC channel 1 single-ended analog input.' },
    { num: 35, id: 'PF4',   lbl: 'PF4',   name: 'PF4 / ADC4 / TCK',            type: 'ADC',   funcs: ['ADC','JTAG','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port F bit 4. ADC channel 4 and JTAG test clock TCK.' },
    { num: 36, id: 'PF5',   lbl: 'PF5',   name: 'PF5 / ADC5 / TMS',            type: 'ADC',   funcs: ['ADC','JTAG','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port F bit 5. ADC channel 5 and JTAG test mode select TMS.' },
    { num: 37, id: 'PF6',   lbl: 'PF6',   name: 'PF6 / ADC6 / TDO',            type: 'ADC',   funcs: ['ADC','JTAG','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port F bit 6. ADC channel 6 and JTAG test data output TDO.' },
    { num: 38, id: 'PF7',   lbl: 'PF7',   name: 'PF7 / ADC7 / TDI',            type: 'ADC',   funcs: ['ADC','JTAG','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port F bit 7. ADC channel 7 and JTAG test data input TDI.' },
    { num: 39, id: 'GND4',  lbl: 'GND',   name: 'GND — Ground',                 type: 'GND',   funcs: ['GND'],          volt: '0V',     curr: 'N/A',  note: 'Ground reference. Connect to the board ground plane.' },
    { num: 40, id: 'VCC4',  lbl: 'VCC',   name: 'VCC — Digital Supply',         type: 'PWR',   funcs: ['PWR'],          volt: '2.7–5.5V', curr: 'N/A', note: 'Third digital supply pin. Decouple with a 100 nF capacitor to ground.' },
    { num: 41, id: 'PB4',   lbl: 'PB4',   name: 'PB4 / PCINT4 / ADC11',        type: 'GPIO',  funcs: ['GPIO','ADC'],   volt: '3.3/5V', curr: '40mA', note: 'Port B bit 4. Pin-change interrupt PCINT4 and ADC differential input ADC11.' },
    { num: 42, id: 'PB5',   lbl: 'PB5',   name: 'PB5 / PCINT5 / OC1A / OC4B / ADC12', type: 'PWM', funcs: ['PWM','ADC','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port B bit 5. Timer/Counter1 compare A OC1A, Timer/Counter4 compare B OC4B, pin-change interrupt PCINT5, and ADC differential input ADC12.' },
    { num: 43, id: 'PB6',   lbl: 'PB6',   name: 'PB6 / PCINT6 / OC1B / OC4B / ADC13', type: 'PWM', funcs: ['PWM','ADC','GPIO'], volt: '3.3/5V', curr: '40mA', note: 'Port B bit 6. Timer/Counter1 compare B OC1B, Timer/Counter4 compare B OC4B (inverted), pin-change interrupt PCINT6, and ADC differential input ADC13.' },
    { num: 44, id: 'PE6b',  lbl: 'PE6',   name: 'PE6 — see pin 1 (shared pad)', type: 'GPIO',  funcs: ['GPIO'],         volt: '3.3/5V', curr: '40mA', note: 'Additional thermal / connection pad on the top side associated with PE6. See pin 1 for full function description. Connect to the same net as pin 1.' },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'PE6':   ['INT6','AIN0'],
    'PB0':   ['SS','PCINT0'],
    'PB1':   ['SCLK','PCINT1'],
    'PB2':   ['MOSI','PCINT2'],
    'PB3':   ['MISO','PCINT3'],
    'PB4':   ['PCINT4','ADC11'],
    'PB5':   ['OC1A','OC4B','PCINT5','ADC12'],
    'PB6':   ['OC1B','OC4B','PCINT6','ADC13'],
    'PB7':   ['OC0A','OC1C','PCINT7'],
    'PC6':   ['OC3A','OC4A'],
    'PC7':   ['ICP3','CLK0','OC4A'],
    'PD0':   ['OC0B','SCL','INT0'],
    'PD1':   ['SDA','INT1'],
    'PD2':   ['RXD1','INT2'],
    'PD3':   ['TXD1','INT3'],
    'PD5':   ['XCK1','CTS','PCINT8'],
    'PD6':   ['T1','ADC9'],
    'PD7':   ['T0','OC4D','ADC10'],
    'PE2':   ['/HWB'],
    'PF0':   ['ADC0'],
    'PF1':   ['ADC1'],
    'PF4':   ['ADC4','TCK'],
    'PF5':   ['ADC5','TMS'],
    'PF6':   ['ADC6','TDO'],
    'PF7':   ['ADC7','TDI'],
    'AREF':  ['VREF'],
    'RESET': ['dW'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Flash',       value: '32 KB',          color: '#e0e5ec' },
    { label: 'SRAM',        value: '2.5 KB',          color: '#e0e5ec' },
    { label: 'EEPROM',      value: '1 KB',            color: '#e0e5ec' },
    { label: 'Max Freq',    value: '16 MHz',           color: '#c8a850' },
    { label: 'Supply',      value: '2.7–5.5 V',        color: '#78c878' },
    { label: 'USB',         value: 'Full-Speed (12 Mbit/s)', color: '#4a9aee' },
    { label: 'Interfaces',  value: 'USB + USART + SPI + I²C' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',   value: '8-bit AVR RISC' },
    { label: 'Flash',          value: '32 KB (1 KB used by bootloader)' },
    { label: 'SRAM',           value: '2.5 KB' },
    { label: 'EEPROM',         value: '1 KB' },
    { label: 'Max Clock',      value: '16 MHz (5 V) / 8 MHz (3.3 V)' },
    { label: 'Supply Voltage', value: '2.7–5.5 V' },
    { label: 'I/O Pins',       value: '26 programmable GPIO' },
    { label: 'ADC',            value: '12-channel, 10-bit' },
    { label: 'Timers',         value: '2 × 8-bit, 2 × 16-bit (Timer1/3), 1 × 10-bit (Timer4)' },
    { label: 'PWM Channels',   value: 'Up to 7 channels' },
    { label: 'USB',            value: 'Full-Speed 12 Mbit/s, 6 endpoints' },
    { label: 'USART',          value: '1 × hardware USART1' },
    { label: 'SPI',            value: '1 × hardware SPI master/slave' },
    { label: 'I²C / TWI',      value: '1 × hardware TWI (I²C compatible)' },
    { label: 'JTAG',           value: 'On-chip JTAG debug + ISP programming' },
    { label: 'Package',        value: 'TQFP-44 (10 × 10 mm, 0.8 mm pitch)' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'AVR 8-bit RISC core — most instructions execute in a single clock cycle',
    'Integrated Full-Speed USB 2.0 transceiver (12 Mbit/s) with 6 configurable endpoints and on-chip PLL',
    '32 KB of in-system self-programmable Flash; 1 KB EEPROM; 2.5 KB SRAM',
    '12-channel, 10-bit ADC with internal 2.56 V bandgap reference',
    'Five flexible timer/counters including a high-speed 10-bit Timer/Counter4 for audio-rate PWM',
    'Hardware USART1, SPI, and TWI (I²C) serial interfaces',
    'On-chip USB DFU and SPM bootloader with Lock Bit protection',
    'JTAG interface for on-chip debugging and ISP programming',
    'Power-save, power-down, standby and idle sleep modes for low-power operation',
    'Operating voltage: 2.7–5.5 V; up to 16 MHz at 5 V or 8 MHz at 3.3 V',
    'Used as the heart of the Arduino Leonardo, Arduino Micro, and Teensy 2.0 boards',
  ],
};