window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'ATtiny13',
  partMPN:      'ATtiny13-20SU',
  manufacturer: 'Microchip (Atmel)',
  package:      'DIP-8',
  pinCount:     8,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/ATtiny13-20SU/Microchip/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/ATtiny13-20SU/Microchip/view-part/?ref=snapeda',
  datasheetURL: 'https://ww1.microchip.com/downloads/en/DeviceDoc/ATtiny13-Data-Sheet-DS40002308A.pdf',

  // ── LAYOUT HINT (DIP-8) ───────────────────────────────────────
  dipConfig: {
    pinsPerSide:  4,
    bodyX:        150,  bodyY: 100,  bodyW: 100,  bodyH: 140,
    pinLength:    41,   pinWidthHalf: 10,
    notchSize:    4,    notchX: 12,  notchY: 12,
    textSizes:    { mfr: 12, part: 18, pkg: 10, pinCount: 10 },
    labelSize:    9.5,  pinNumSize: 8,   yOffset: -60,
  },

  // ── PINS ──────────────────────────────────────────────────────
  // Left side:  pins 1–4  (top → bottom)
  // Right side: pins 5–8, ordered top → bottom as 8, 7, 6, 5
  //             (_rightSlot: 0 = top-right slot)
  pins: [
    {
      num:  1,
      id:   'PB5',
      lbl:  'PB5',
      name: 'PB5 / RESET / ADC0 / PCINT5',
      type: 'RESET',
      funcs: ['GPIO', 'RESET', 'ADC', 'INT'],
      volt: '5V',
      curr: '40mA',
      note: 'Active-low reset pin. Also serves as ADC channel 0 (ADC0) and pin-change interrupt PCINT5. Can be reconfigured as GPIO if RSTDISBL fuse is programmed.',
    },
    {
      num:  2,
      id:   'PB3',
      lbl:  'PB3',
      name: 'PB3 / XTAL1 / ADC3 / PCINT3',
      type: 'XTAL',
      funcs: ['GPIO', 'XTAL', 'ADC', 'INT'],
      volt: '5V',
      curr: '40mA',
      note: 'Crystal oscillator input (XTAL1). Also ADC channel 3 (ADC3) and pin-change interrupt PCINT3. When using internal oscillator, available as general-purpose I/O.',
    },
    {
      num:  3,
      id:   'PB4',
      lbl:  'PB4',
      name: 'PB4 / XTAL2 / ADC2 / PCINT4',
      type: 'XTAL',
      funcs: ['GPIO', 'XTAL', 'ADC', 'INT'],
      volt: '5V',
      curr: '40mA',
      note: 'Crystal oscillator output (XTAL2). Also ADC channel 2 (ADC2) and pin-change interrupt PCINT4. When using internal oscillator, available as general-purpose I/O.',
    },
    {
      num:  4,
      id:   'GND',
      lbl:  'GND',
      name: 'GND',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: 'N/A',
      note: 'Ground reference. Connect to system ground plane.',
    },
    {
      num:  5,
      id:   'PB0',
      lbl:  'PB0',
      name: 'PB0 / MOSI / AIN0 / OC0A / PCINT0',
      type: 'SPI',
      funcs: ['GPIO', 'SPI', 'ACMP', 'PWM', 'INT', 'USART'],
      volt: '5V',
      curr: '40mA',
      note: 'MOSI data line for ISP programming. Analog Comparator positive input (AIN0). PWM output OC0A (Timer/Counter0 Compare Match A). Pin-change interrupt PCINT0. Can be used as software USART TXD.',
      _rightSlot: 3,   // bottom-right (pin 5 is lowest on right side)
    },
    {
      num:  6,
      id:   'PB1',
      lbl:  'PB1',
      name: 'PB1 / MISO / AIN1 / OC0B / PCINT1 / INT0',
      type: 'SPI',
      funcs: ['GPIO', 'SPI', 'ACMP', 'PWM', 'INT', 'USART'],
      volt: '5V',
      curr: '40mA',
      note: 'MISO data line for ISP programming. Analog Comparator negative input (AIN1). PWM output OC0B (Timer/Counter0 Compare Match B). External interrupt INT0 and pin-change interrupt PCINT1. Can be used as software USART RXD.',
      _rightSlot: 2,
    },
    {
      num:  7,
      id:   'PB2',
      lbl:  'PB2',
      name: 'PB2 / SCK / ADC1 / PCINT2',
      type: 'SPI',
      funcs: ['GPIO', 'SPI', 'ADC', 'INT'],
      volt: '5V',
      curr: '40mA',
      note: 'SPI clock (SCK) used during ISP programming. ADC channel 1 (ADC1). Pin-change interrupt PCINT2.',
      _rightSlot: 1,
    },
    {
      num:  8,
      id:   'VCC',
      lbl:  'VCC',
      name: 'VCC',
      type: 'PWR',
      funcs: ['PWR'],
      volt: '1.8–5.5V',
      curr: '200mA',
      note: 'Positive supply voltage. Operating range 1.8V–5.5V. Decouple with 100nF ceramic capacitor placed as close as possible to the pin.',
      _rightSlot: 0,   // top-right
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'PB0': ['MOSI', 'AIN0', 'OC0A'],
    'PB1': ['MISO', 'AIN1', 'OC0B', 'INT0'],
    'PB2': ['SCK', 'ADC1'],
    'PB3': ['XTAL1', 'ADC3'],
    'PB4': ['XTAL2', 'ADC2'],
    'PB5': ['RESET', 'ADC0'],
  },

  // ── QUICK SPECS (right-panel sidebar) ────────────────────────
  quickSpecs: [
    { label: 'Flash',    value: '1 KB',        color: '#e0e5ec' },
    { label: 'SRAM',     value: '64 Bytes',     color: '#e0e5ec' },
    { label: 'EEPROM',   value: '64 Bytes',     color: '#e0e5ec' },
    { label: 'Max Freq', value: '20 MHz',       color: '#c8a850' },
    { label: 'Supply',   value: '1.8–5.5V',     color: '#78c878' },
    { label: 'I/O Pins', value: '6' },
    { label: 'ADC',      value: '4ch / 10-bit', color: '#c8a850' },
    { label: 'Timers',   value: '1× 8-bit + PWM', color: '#cc6888' },
  ],

  // ── DETAILED SPECS (Datasheet tab table) ──────────────────────
  dsSpecs: [
    { label: 'Architecture',   value: '8-bit AVR RISC' },
    { label: 'Flash',          value: '1 KB (1k write cycles endurance)' },
    { label: 'SRAM',           value: '64 Bytes' },
    { label: 'EEPROM',         value: '64 Bytes (100k write cycles endurance)' },
    { label: 'Max Frequency',  value: '20 MHz' },
    { label: 'Supply Voltage', value: '1.8V – 5.5V' },
    { label: 'I/O Pins',       value: '6 (with programmable pull-ups)' },
    { label: 'ADC',            value: '4-channel, 10-bit' },
    { label: 'Timers',         value: '1× 8-bit Timer/Counter with PWM' },
    { label: 'SPI',            value: 'Master / Slave (used for ISP)' },
    { label: 'Ext Interrupts', value: 'INT0 (PB1)' },
    { label: 'PCINT',          value: '6 pins (PCINT0–PCINT5)' },
    { label: 'VIL (input low)','value': '0 to 0.3×VCC' },
    { label: 'VIH (input high)','value': '0.6×VCC to VCC+0.5V' },
    { label: 'IOL (sink)',     value: '40 mA per pin max' },
    { label: 'Total I/O',      value: '200 mA total' },
    { label: 'Storage Temp',   value: '−65 to +150 °C' },
    { label: 'Operating Temp', value: '−40 to +85 °C (industrial)' },
  ],

  // ── KEY FEATURES (Datasheet tab list) ────────────────────────
  dsFeatures: [
    '120 single-cycle instructions; most execute in one clock cycle',
    'Internal RC oscillator selectable at 9.6 / 4.8 / 2.4 / 1.2 MHz',
    'ISP (In-System Programming) via SPI — no external programmer needed',
    'Power-on Reset (POR) and programmable Brown-out Detection (BOD)',
    'External interrupt on INT0 plus 6-pin pin-change interrupt (PCINT)',
    'Watchdog timer with separate on-chip oscillator',
    'Two PWM outputs via Timer/Counter0 (OC0A on PB0, OC0B on PB1)',
    '4-channel 10-bit ADC with internal 1.1V bandgap reference',
    'Analog Comparator with programmable interrupt',
    'Debugwire on-chip debug interface',
    'Self-programmable Flash with up to 10,000 write/erase cycles',
    'Available packages: PDIP-8, SOIC-8, SOT-23-6 (ATtiny13V for low voltage)',
  ],
};
