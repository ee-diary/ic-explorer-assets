// configs/atmega328p-config.js
// ATmega328P — Microchip/Atmel 8-bit AVR RISC Microcontroller
// DIP-28 package • 28 pins
// Drop this file into: ic-explorer-assets/configs/

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'ATmega328P',
  partMPN:      'ATmega328P-PU',
  manufacturer: 'Microchip / Atmel',
  package:      'DIP-28',
  pinCount:     28,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/ATMEGA328P-PU/Microchip%20Technology/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/ATMEGA328P-PU/Microchip%20Technology/view-part/?ref=snapeda',
  datasheetURL: 'https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf',

  // ── LAYOUT HINT (DIP-28) ──────────────────────────────────────
  dipConfig: {
    pinsPerSide:  14,
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 700,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 16, part: 34, pkg: 20, pinCount: 14 },
    labelSize: 13, pinNumSize: 14, yOffset: -60
  },

  // ── PINS ──────────────────────────────────────────────────────
  // LEFT side: pins 1–14, top → bottom (no _rightSlot)
  // RIGHT side: pins 15–28, _rightSlot 0 = top-right (pin 28), 13 = bottom-right (pin 15)
  pins: [

    // ── LEFT SIDE (pins 1–14, top → bottom) ──────────────────────
    { num:  1, id: 'PC6',  lbl: 'PC6',  name: 'PC6 / RESET',
      type: 'RESET', funcs: ['RESET', 'GPIO'],
      volt: '5V',   curr: '40mA',
      note: 'Master Clear (Reset) input — active LOW. Internal pull-up enabled. Can be reconfigured as PC6 GPIO by disabling RSTDISBL fuse (not recommended). PCINT14.' },

    { num:  2, id: 'PD0',  lbl: 'PD0',  name: 'PD0 / RXD / PCINT16',
      type: 'UART', funcs: ['GPIO', 'UART', 'INT'],
      volt: '5V',   curr: '40mA',
      note: 'USART data receive pin (RXD). General-purpose I/O port D, bit 0. Pin-change interrupt PCINT16.' },

    { num:  3, id: 'PD1',  lbl: 'PD1',  name: 'PD1 / TXD / PCINT17',
      type: 'UART', funcs: ['GPIO', 'UART', 'INT'],
      volt: '5V',   curr: '40mA',
      note: 'USART data transmit pin (TXD). General-purpose I/O port D, bit 1. Pin-change interrupt PCINT17.' },

    { num:  4, id: 'PD2',  lbl: 'PD2',  name: 'PD2 / INT0 / PCINT18',
      type: 'INT',  funcs: ['GPIO', 'INT'],
      volt: '5V',   curr: '40mA',
      note: 'External interrupt 0 (INT0) — configurable edge/level trigger. General-purpose I/O port D, bit 2. Pin-change interrupt PCINT18.' },

    { num:  5, id: 'PD3',  lbl: 'PD3',  name: 'PD3 / INT1 / OC2B / PCINT19',
      type: 'PWM',  funcs: ['GPIO', 'PWM', 'INT'],
      volt: '5V',   curr: '40mA',
      note: 'PWM output OC2B (Timer2, Compare Match B). External interrupt 1 (INT1). General-purpose I/O port D, bit 3. Pin-change interrupt PCINT19.' },

    { num:  6, id: 'PD4',  lbl: 'PD4',  name: 'PD4 / T0 / XCK / PCINT20',
      type: 'TIMER', funcs: ['GPIO', 'TIMER'],
      volt: '5V',   curr: '40mA',
      note: 'Timer0 external clock input (T0). USART external clock (XCK). General-purpose I/O port D, bit 4. Pin-change interrupt PCINT20.' },

    { num:  7, id: 'VCC',  lbl: 'VCC',  name: 'VCC — Digital Power Supply',
      type: 'PWR',  funcs: ['PWR'],
      volt: '1.8–5.5V', curr: '200mA',
      note: 'Digital power supply pin. Operating range 1.8V–5.5V. Decouple with a 100 nF ceramic capacitor placed as close to the pin as possible.' },

    { num:  8, id: 'GND1', lbl: 'GND',  name: 'GND — Digital Ground',
      type: 'GND',  funcs: ['GND'],
      volt: '0V',   curr: 'N/A',
      note: 'Digital ground. Connect to system ground plane. Minimise trace impedance to power-supply return.' },

    { num:  9, id: 'PB6',  lbl: 'PB6',  name: 'PB6 / XTAL1 / TOSC1 / PCINT6',
      type: 'XTAL', funcs: ['GPIO', 'XTAL', 'TIMER'],
      volt: '5V',   curr: '40mA',
      note: 'Crystal oscillator input (XTAL1). Timer/Counter oscillator input (TOSC1) for asynchronous operation. General-purpose I/O when internal oscillator is used. PCINT6.' },

    { num: 10, id: 'PB7',  lbl: 'PB7',  name: 'PB7 / XTAL2 / TOSC2 / PCINT7',
      type: 'XTAL', funcs: ['GPIO', 'XTAL', 'TIMER'],
      volt: '5V',   curr: '40mA',
      note: 'Crystal oscillator output (XTAL2). Timer/Counter oscillator output (TOSC2). General-purpose I/O when internal oscillator is used. PCINT7.' },

    { num: 11, id: 'PD5',  lbl: 'PD5',  name: 'PD5 / OC0B / T1 / PCINT21',
      type: 'PWM',  funcs: ['GPIO', 'PWM', 'TIMER'],
      volt: '5V',   curr: '40mA',
      note: 'PWM output OC0B (Timer0, Compare Match B). Timer1 external clock input (T1). General-purpose I/O port D, bit 5. PCINT21.' },

    { num: 12, id: 'PD6',  lbl: 'PD6',  name: 'PD6 / OC0A / AIN0 / PCINT22',
      type: 'PWM',  funcs: ['GPIO', 'PWM', 'COMP'],
      volt: '5V',   curr: '40mA',
      note: 'PWM output OC0A (Timer0, Compare Match A). Analog comparator positive input (AIN0). General-purpose I/O port D, bit 6. PCINT22.' },

    { num: 13, id: 'PD7',  lbl: 'PD7',  name: 'PD7 / AIN1 / PCINT23',
      type: 'COMP', funcs: ['GPIO', 'COMP'],
      volt: '5V',   curr: '40mA',
      note: 'Analog comparator negative input (AIN1). General-purpose I/O port D, bit 7. Pin-change interrupt PCINT23.' },

    { num: 14, id: 'PB0',  lbl: 'PB0',  name: 'PB0 / ICP1 / CLKO / PCINT0',
      type: 'TIMER', funcs: ['GPIO', 'TIMER'],
      volt: '5V',   curr: '40mA',
      note: 'Timer1 input capture pin (ICP1). Divided system clock output (CLKO) — useful for debugging clocking. General-purpose I/O port B, bit 0. PCINT0.' },

    // ── RIGHT SIDE (pin 28 at top → pin 15 at bottom; _rightSlot 0–13) ──

    { num: 28, id: 'PC5',  lbl: 'PC5',  name: 'PC5 / ADC5 / SCL / PCINT13',
      type: 'I2C',  funcs: ['GPIO', 'I2C', 'ADC'],
      volt: '0–5V', curr: 'N/A',
      note: 'I2C clock line (SCL). ADC input channel 5. General-purpose I/O port C, bit 5. PCINT13.',
      _rightSlot: 0 },

    { num: 27, id: 'PC4',  lbl: 'PC4',  name: 'PC4 / ADC4 / SDA / PCINT12',
      type: 'I2C',  funcs: ['GPIO', 'I2C', 'ADC'],
      volt: '0–5V', curr: 'N/A',
      note: 'I2C data line (SDA). ADC input channel 4. General-purpose I/O port C, bit 4. PCINT12.',
      _rightSlot: 1 },

    { num: 26, id: 'PC3',  lbl: 'PC3',  name: 'PC3 / ADC3 / PCINT11',
      type: 'ADC',  funcs: ['GPIO', 'ADC'],
      volt: '0–5V', curr: 'N/A',
      note: 'ADC input channel 3. General-purpose I/O port C, bit 3. Pin-change interrupt PCINT11.',
      _rightSlot: 2 },

    { num: 25, id: 'PC2',  lbl: 'PC2',  name: 'PC2 / ADC2 / PCINT10',
      type: 'ADC',  funcs: ['GPIO', 'ADC'],
      volt: '0–5V', curr: 'N/A',
      note: 'ADC input channel 2. General-purpose I/O port C, bit 2. Pin-change interrupt PCINT10.',
      _rightSlot: 3 },

    { num: 24, id: 'PC1',  lbl: 'PC1',  name: 'PC1 / ADC1 / PCINT9',
      type: 'ADC',  funcs: ['GPIO', 'ADC'],
      volt: '0–5V', curr: 'N/A',
      note: 'ADC input channel 1. General-purpose I/O port C, bit 1. Pin-change interrupt PCINT9.',
      _rightSlot: 4 },

    { num: 23, id: 'PC0',  lbl: 'PC0',  name: 'PC0 / ADC0 / PCINT8',
      type: 'ADC',  funcs: ['GPIO', 'ADC'],
      volt: '0–5V', curr: 'N/A',
      note: 'ADC input channel 0. General-purpose I/O port C, bit 0. Pin-change interrupt PCINT8.',
      _rightSlot: 5 },

    { num: 22, id: 'GND2', lbl: 'GND',  name: 'GND — Analog Ground',
      type: 'GND',  funcs: ['GND'],
      volt: '0V',   curr: 'N/A',
      note: 'Analog ground. Keep the analog and digital grounds joined at a single star point. Separate analogue ground pour improves ADC accuracy.',
      _rightSlot: 6 },

    { num: 21, id: 'AREF', lbl: 'AREF', name: 'AREF — ADC Voltage Reference',
      type: 'ADC',  funcs: ['ADC'],
      volt: '0–5V', curr: 'N/A',
      note: 'External voltage reference for the ADC. Decouple with a 100 nF capacitor to AGND. Firmware selectable: external AREF, AVCC, or internal 1.1V bandgap reference.',
      _rightSlot: 7 },

    { num: 20, id: 'AVCC', lbl: 'AVCC', name: 'AVCC — ADC Power Supply',
      type: 'PWR',  funcs: ['PWR', 'ADC'],
      volt: '5V',   curr: 'N/A',
      note: 'Analog section power supply. Connect through a 10 µH inductor from VCC. Decouple locally with 100 nF + 10 µF capacitors. Must be within 0.3V of VCC.',
      _rightSlot: 8 },

    { num: 19, id: 'PB5',  lbl: 'PB5',  name: 'PB5 / SCK / PCINT5',
      type: 'SPI',  funcs: ['GPIO', 'SPI'],
      volt: '5V',   curr: '40mA',
      note: 'SPI clock (SCK). Arduino digital pin D13 — also drives the built-in LED on Arduino UNO boards. General-purpose I/O port B, bit 5. PCINT5.',
      _rightSlot: 9 },

    { num: 18, id: 'PB4',  lbl: 'PB4',  name: 'PB4 / MISO / PCINT4',
      type: 'SPI',  funcs: ['GPIO', 'SPI'],
      volt: '5V',   curr: '40mA',
      note: 'SPI Master-In Slave-Out data line (MISO). General-purpose I/O port B, bit 4. Pin-change interrupt PCINT4.',
      _rightSlot: 10 },

    { num: 17, id: 'PB3',  lbl: 'PB3',  name: 'PB3 / MOSI / OC2A / PCINT3',
      type: 'SPI',  funcs: ['GPIO', 'SPI', 'PWM'],
      volt: '5V',   curr: '40mA',
      note: 'SPI Master-Out Slave-In data line (MOSI). PWM output OC2A (Timer2, Compare Match A). General-purpose I/O port B, bit 3. PCINT3.',
      _rightSlot: 11 },

    { num: 16, id: 'PB2',  lbl: 'PB2',  name: 'PB2 / SS / OC1B / PCINT2',
      type: 'SPI',  funcs: ['GPIO', 'SPI', 'PWM'],
      volt: '5V',   curr: '40mA',
      note: 'SPI Slave Select (SS) — active LOW. PWM output OC1B (Timer1, Compare Match B). General-purpose I/O port B, bit 2. PCINT2.',
      _rightSlot: 12 },

    { num: 15, id: 'PB1',  lbl: 'PB1',  name: 'PB1 / OC1A / PCINT1',
      type: 'PWM',  funcs: ['GPIO', 'PWM'],
      volt: '5V',   curr: '40mA',
      note: 'PWM output OC1A (Timer1, Compare Match A — 16-bit timer, highest resolution). General-purpose I/O port B, bit 1. Pin-change interrupt PCINT1.',
      _rightSlot: 13 },

  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'PC6':  ['RSTDISBL', 'PCINT14'],
    'PD0':  ['RXD', 'PCINT16'],
    'PD1':  ['TXD', 'PCINT17'],
    'PD2':  ['INT0', 'PCINT18'],
    'PD3':  ['INT1', 'OC2B', 'PCINT19'],
    'PD4':  ['T0', 'XCK', 'PCINT20'],
    'PB6':  ['XTAL1', 'TOSC1', 'PCINT6'],
    'PB7':  ['XTAL2', 'TOSC2', 'PCINT7'],
    'PD5':  ['OC0B', 'T1', 'PCINT21'],
    'PD6':  ['OC0A', 'AIN0', 'PCINT22'],
    'PD7':  ['AIN1', 'PCINT23'],
    'PB0':  ['ICP1', 'CLKO', 'PCINT0'],
    'PB1':  ['OC1A', 'PCINT1'],
    'PB2':  ['SS', 'OC1B', 'PCINT2'],
    'PB3':  ['MOSI', 'OC2A', 'PCINT3'],
    'PB4':  ['MISO', 'PCINT4'],
    'PB5':  ['SCK', 'PCINT5'],
    'PC0':  ['ADC0', 'PCINT8'],
    'PC1':  ['ADC1', 'PCINT9'],
    'PC2':  ['ADC2', 'PCINT10'],
    'PC3':  ['ADC3', 'PCINT11'],
    'PC4':  ['ADC4', 'SDA', 'PCINT12'],
    'PC5':  ['ADC5', 'SCL', 'PCINT13'],
    'AREF': ['External ADC Vref'],
    'AVCC': ['ADC Supply'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Flash',      value: '32 KB',              color: '#e0e5ec' },
    { label: 'SRAM',       value: '2 KB',               color: '#e0e5ec' },
    { label: 'EEPROM',     value: '1 KB',               color: '#e0e5ec' },
    { label: 'Max Freq',   value: '20 MHz',             color: '#c8a850' },
    { label: 'Supply',     value: '1.8–5.5V',           color: '#78c878' },
    { label: 'I/O Pins',   value: '23',                 color: '#e0e5ec' },
    { label: 'ADC',        value: '10-bit, 6 ch',       color: '#c8a850' },
    { label: 'PWM',        value: '6 ch (3 timers)',    color: '#cc6888' },
    { label: 'Interfaces', value: 'SPI + I²C + USART'                   },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',     value: '8-bit AVR RISC' },
    { label: 'Flash Memory',     value: '32 KB (0.5 KB used by bootloader)' },
    { label: 'SRAM',             value: '2 KB' },
    { label: 'EEPROM',           value: '1 KB' },
    { label: 'Max Clock',        value: '20 MHz (external) / 8 MHz (internal)' },
    { label: 'Supply Voltage',   value: '1.8V – 5.5V' },
    { label: 'I/O Pins',         value: '23 (PB0-7, PC0-6, PD0-7)' },
    { label: 'ADC',              value: '10-bit, 6 channels, up to 15 ksps @ 5V' },
    { label: 'Timers',           value: 'Timer0/2 (8-bit) + Timer1 (16-bit)' },
    { label: 'PWM Channels',     value: '6 (OC0A/B, OC1A/B, OC2A/B)' },
    { label: 'USART',            value: '1× (full duplex, also MSPIM SPI mode)' },
    { label: 'SPI',              value: '1× master/slave (PB2–PB5)' },
    { label: 'I2C (TWI)',        value: '1× master/slave (PC4/PC5)' },
    { label: 'Analog Comparator', value: '1× (AIN0 / AIN1)' },
    { label: 'Watchdog Timer',   value: 'Yes — separate on-chip oscillator' },
    { label: 'ISP Programming',  value: 'SPI-based In-System Programming' },
    { label: 'Package',          value: 'DIP-28, TQFP-32, QFN-32, MLF-32' },
    { label: 'VCC max',          value: '6.0V absolute maximum' },
    { label: 'I/O Sink/Source',  value: '40 mA per pin (200 mA total source / 400 mA sink)' },
    { label: 'Active Current',   value: '~0.3 mA/MHz @ 5V typical' },
    { label: 'Power-down Mode',  value: '< 1 µA @ 3V' },
    { label: 'Operating Temp',   value: '-40°C to +85°C (industrial)' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    '131 single-word instructions; most execute in a single clock cycle',
    '6 PWM channels across 3 independent timers (Timer0 8-bit, Timer1 16-bit, Timer2 8-bit)',
    '10-bit ADC with 6 multiplexed channels and selectable internal 1.1V bandgap reference',
    'In-System Programmable (ISP) via SPI — no external programmer needed for firmware updates',
    'SPI, I²C (TWI), and USART communication interfaces all available simultaneously',
    'Watchdog timer with a dedicated on-chip oscillator for reliable timeout operation',
    'Internal calibrated RC oscillator at 8 MHz (±10% accuracy from factory)',
    '5 power-saving modes: Idle, ADC Noise Reduction, Power-save, Power-down, Standby',
    '23 programmable I/O pins — all with optional internal pull-up resistors',
    'Pin-change interrupts on all 23 I/O pins (PCINT0–PCINT23)',
    'External interrupts on INT0 (PD2) and INT1 (PD3) — edge or level configurable',
    'Arduino UNO MCU — the most widely supported microcontroller in the maker ecosystem',
  ],

};
