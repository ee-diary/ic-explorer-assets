// configs/pic16f877a-config.js
// PIC16F877A Microcontroller Configuration
// DIP-40 Package - 40 pins total (20 per side)

window.IC_CONFIG = {
  // ── IDENTITY ──
  partName: 'PIC16F877A',
  partMPN: 'PIC16F877A-I/P',
  manufacturer: 'MICROCHIP',
  package: 'DIP-40',
  pinCount: 40,

  // ── SNAPMAGIC / RESOURCE LINKS ──
  snapPageURL: 'https://www.snapeda.com/parts/PIC16F877A-I%2FP/Microchip+Technology/view-part/',
  downloadURL: 'https://www.snapeda.com/parts/PIC16F877A-I%2FP/Microchip+Technology/view-part/?ref=snapeda',
  datasheetURL: 'https://ww1.microchip.com/downloads/en/DeviceDoc/39582b.pdf',

  // ── DIP-40 LAYOUT CONFIGURATION ──
  dipConfig: {
    pinsPerSide: 20,     // 20 pins on left, 20 pins on right
    bodyX: 122,          // X position of IC body
    bodyY: 25,           // Y position of IC body
    bodyW: 260,          // Width of IC body
    bodyH: 700,          // Height of IC body
    pinLength: 34,       // Length of pins
    pinWidthHalf: 16,    // Half width of pins
    notchSize: 8,        // Size of pin-1 notch
    notchX: 14,          // X offset for notch from body corner
    notchY: 14,          // Y offset for notch from body corner
    textSizes: {
      mfr: 14,           // Manufacturer text size
      part: 24,          // Part number text size
      pkg: 16,           // Package text size
      pinCount: 12       // Pin count text size
    },
    labelSize: 11,       // Pin label text size
    pinNumSize: 14,      // Pin number text size
    yOffset: -60         // Vertical offset for text
  },

  // ── PIN DATA ──
  // LEFT SIDE (pins 1-20, top to bottom)
  // RIGHT SIDE (pins 21-40, with _rightSlot: 0=top-right, 19=bottom-right)
  pins: [
    // ═══════════════════════════════════════════════════════════════
    // LEFT SIDE - Pins 1-20 (top to bottom)
    // ═══════════════════════════════════════════════════════════════
    {num: 1,  id: 'MCLR', lbl: 'MCLR', name: 'MCLR / VPP',
     type: 'RESET', funcs: ['RESET'],
     volt: '5V', curr: 'N/A',
     note: 'Master Clear (Reset) input — active low. Pull high via 10kΩ to VDD. Also VPP for ICSP programming.'},

    {num: 2,  id: 'RA0', lbl: 'RA0', name: 'RA0 / AN0',
     type: 'ADC', funcs: ['GPIO', 'ADC'],
     volt: '5V', curr: '25mA',
     note: 'PORTA bit 0. Analog input channel AN0 for 10-bit ADC.'},

    {num: 3,  id: 'RA1', lbl: 'RA1', name: 'RA1 / AN1',
     type: 'ADC', funcs: ['GPIO', 'ADC'],
     volt: '5V', curr: '25mA',
     note: 'PORTA bit 1. Analog input channel AN1 for 10-bit ADC.'},

    {num: 4,  id: 'RA2', lbl: 'RA2', name: 'RA2 / AN2 / VREF-',
     type: 'ADC', funcs: ['GPIO', 'ADC'],
     volt: '5V', curr: '25mA',
     note: 'PORTA bit 2. Analog input AN2. ADC negative reference (VREF-). Comparator VREF output.'},

    {num: 5,  id: 'RA3', lbl: 'RA3', name: 'RA3 / AN3 / VREF+',
     type: 'ADC', funcs: ['GPIO', 'ADC'],
     volt: '5V', curr: '25mA',
     note: 'PORTA bit 3. Analog input AN3. ADC positive reference (VREF+).'},

    {num: 6,  id: 'RA4', lbl: 'RA4', name: 'RA4 / T0CKI / C1OUT',
     type: 'TIMER', funcs: ['GPIO', 'TIMER', 'COMP'],
     volt: '5V', curr: '25mA',
     note: 'PORTA bit 4. Timer0 external clock input (T0CKI). Comparator 1 output (C1OUT). Open-drain output.'},

    {num: 7,  id: 'RA5', lbl: 'RA5', name: 'RA5 / AN4 / SS',
     type: 'ADC', funcs: ['GPIO', 'ADC', 'SPI'],
     volt: '5V', curr: '25mA',
     note: 'PORTA bit 5. Analog input AN4. SPI Slave Select (SS). Comparator 2 output (C2OUT).'},

    {num: 8,  id: 'RE0', lbl: 'RE0', name: 'RE0 / RD / AN5',
     type: 'ADC', funcs: ['GPIO', 'ADC'],
     volt: '5V', curr: '25mA',
     note: 'PORTE bit 0. Analog input AN5. Parallel Slave Port Read strobe (RD).'},

    {num: 9,  id: 'RE1', lbl: 'RE1', name: 'RE1 / WR / AN6',
     type: 'ADC', funcs: ['GPIO', 'ADC'],
     volt: '5V', curr: '25mA',
     note: 'PORTE bit 1. Analog input AN6. Parallel Slave Port Write strobe (WR).'},

    {num: 10, id: 'RE2', lbl: 'RE2', name: 'RE2 / CS / AN7',
     type: 'ADC', funcs: ['GPIO', 'ADC'],
     volt: '5V', curr: '25mA',
     note: 'PORTE bit 2. Analog input AN7. Parallel Slave Port Chip Select (CS).'},

    {num: 11, id: 'VDD1', lbl: 'VDD', name: 'VDD — Power Supply 1',
     type: 'PWR', funcs: ['PWR'],
     volt: '5V', curr: 'N/A',
     note: 'Positive supply voltage (2.0V–5.5V). Decouple with 100nF cap close to pin.'},

    {num: 12, id: 'VSS1', lbl: 'VSS', name: 'VSS — Ground 1',
     type: 'GND', funcs: ['GND'],
     volt: '0V', curr: 'N/A',
     note: 'Ground reference for logic and I/O pins.'},

    {num: 13, id: 'OSC1', lbl: 'OSC1', name: 'OSC1 / CLKI',
     type: 'XTAL', funcs: ['XTAL'],
     volt: '5V', curr: 'N/A',
     note: 'Oscillator crystal input or external clock input (CLKI). Connect crystal or external clock here.'},

    {num: 14, id: 'OSC2', lbl: 'OSC2', name: 'OSC2 / CLKO',
     type: 'XTAL', funcs: ['XTAL'],
     volt: '5V', curr: 'N/A',
     note: 'Oscillator crystal output. In RC mode outputs FOSC/4 (CLKO). Connect other crystal leg here.'},

    {num: 15, id: 'RC0', lbl: 'RC0', name: 'RC0 / T1OSO / T1CKI',
     type: 'TIMER', funcs: ['GPIO', 'TIMER'],
     volt: '5V', curr: '25mA',
     note: 'PORTC bit 0. Timer1 oscillator output (T1OSO). Timer1 external clock input (T1CKI).'},

    {num: 16, id: 'RC1', lbl: 'RC1', name: 'RC1 / T1OSI / CCP2',
     type: 'PWM', funcs: ['GPIO', 'TIMER', 'PWM'],
     volt: '5V', curr: '25mA',
     note: 'PORTC bit 1. Timer1 oscillator input (T1OSI). CCP2 capture/compare/PWM module 2.'},

    {num: 17, id: 'RC2', lbl: 'RC2', name: 'RC2 / CCP1',
     type: 'PWM', funcs: ['GPIO', 'PWM'],
     volt: '5V', curr: '25mA',
     note: 'PORTC bit 2. CCP1 — Capture input / Compare output / PWM output module 1.'},

    {num: 18, id: 'RC3', lbl: 'RC3', name: 'RC3 / SCK / SCL',
     type: 'SPI', funcs: ['GPIO', 'SPI', 'I2C'],
     volt: '5V', curr: '25mA',
     note: 'PORTC bit 3. SPI clock (SCK) in SPI mode. I2C clock (SCL) in I2C mode.'},

    {num: 19, id: 'RD0', lbl: 'RD0', name: 'RD0 / PSP0',
     type: 'GPIO', funcs: ['GPIO'],
     volt: '5V', curr: '25mA',
     note: 'PORTD bit 0. Parallel Slave Port data bit 0 (PSP0). Bidirectional I/O.'},

    {num: 20, id: 'RD1', lbl: 'RD1', name: 'RD1 / PSP1',
     type: 'GPIO', funcs: ['GPIO'],
     volt: '5V', curr: '25mA',
     note: 'PORTD bit 1. Parallel Slave Port data bit 1 (PSP1). Bidirectional I/O.'},

    // ═══════════════════════════════════════════════════════════════
    // RIGHT SIDE - Pins 21-40 (with _rightSlot: 0=top-right, 19=bottom-right)
    // ═══════════════════════════════════════════════════════════════
    {num: 21, id: 'RD2', lbl: 'RD2', name: 'RD2 / PSP2',
     type: 'GPIO', funcs: ['GPIO'], _rightSlot: 19,
     volt: '5V', curr: '25mA',
     note: 'PORTD bit 2. Parallel Slave Port data bit 2 (PSP2).'},

    {num: 22, id: 'RD3', lbl: 'RD3', name: 'RD3 / PSP3',
     type: 'GPIO', funcs: ['GPIO'], _rightSlot: 18,
     volt: '5V', curr: '25mA',
     note: 'PORTD bit 3. Parallel Slave Port data bit 3 (PSP3).'},

    {num: 23, id: 'RC4', lbl: 'RC4', name: 'RC4 / SDI / SDA',
     type: 'SPI', funcs: ['GPIO', 'SPI', 'I2C'], _rightSlot: 17,
     volt: '5V', curr: '25mA',
     note: 'PORTC bit 4. SPI data in (SDI). I2C data (SDA). SSP module serial data input.'},

    {num: 24, id: 'RC5', lbl: 'RC5', name: 'RC5 / SDO',
     type: 'SPI', funcs: ['GPIO', 'SPI'], _rightSlot: 16,
     volt: '5V', curr: '25mA',
     note: 'PORTC bit 5. SPI data out (SDO). SSP module serial data output.'},

    {num: 25, id: 'RC6', lbl: 'RC6', name: 'RC6 / TX / CK',
     type: 'UART', funcs: ['GPIO', 'UART'], _rightSlot: 15,
     volt: '5V', curr: '25mA',
     note: 'PORTC bit 6. USART asynchronous transmit (TX). USART synchronous clock (CK).'},

    {num: 26, id: 'RC7', lbl: 'RC7', name: 'RC7 / RX / DT',
     type: 'UART', funcs: ['GPIO', 'UART'], _rightSlot: 14,
     volt: '5V', curr: '25mA',
     note: 'PORTC bit 7. USART asynchronous receive (RX). USART synchronous data (DT).'},

    {num: 27, id: 'RD4', lbl: 'RD4', name: 'RD4 / PSP4',
     type: 'GPIO', funcs: ['GPIO'], _rightSlot: 13,
     volt: '5V', curr: '25mA',
     note: 'PORTD bit 4. Parallel Slave Port data bit 4 (PSP4).'},

    {num: 28, id: 'RD5', lbl: 'RD5', name: 'RD5 / PSP5',
     type: 'GPIO', funcs: ['GPIO'], _rightSlot: 12,
     volt: '5V', curr: '25mA',
     note: 'PORTD bit 5. Parallel Slave Port data bit 5 (PSP5).'},

    {num: 29, id: 'RD6', lbl: 'RD6', name: 'RD6 / PSP6',
     type: 'GPIO', funcs: ['GPIO'], _rightSlot: 11,
     volt: '5V', curr: '25mA',
     note: 'PORTD bit 6. Parallel Slave Port data bit 6 (PSP6).'},

    {num: 30, id: 'RD7', lbl: 'RD7', name: 'RD7 / PSP7',
     type: 'GPIO', funcs: ['GPIO'], _rightSlot: 10,
     volt: '5V', curr: '25mA',
     note: 'PORTD bit 7. Parallel Slave Port data bit 7 (PSP7).'},

    {num: 31, id: 'VSS2', lbl: 'VSS', name: 'VSS — Ground 2',
     type: 'GND', funcs: ['GND'], _rightSlot: 9,
     volt: '0V', curr: 'N/A',
     note: 'Ground reference 2.'},

    {num: 32, id: 'VDD2', lbl: 'VDD', name: 'VDD — Power Supply 2',
     type: 'PWR', funcs: ['PWR'], _rightSlot: 8,
     volt: '5V', curr: 'N/A',
     note: 'Positive supply voltage 2. Decouple with 100nF + 10µF caps.'},

    {num: 33, id: 'RB0', lbl: 'RB0', name: 'RB0 / INT',
     type: 'INT', funcs: ['GPIO', 'INT'], _rightSlot: 7,
     volt: '5V', curr: '25mA',
     note: 'PORTB bit 0. External interrupt pin (INT). Schmitt Trigger input.'},

    {num: 34, id: 'RB1', lbl: 'RB1', name: 'RB1',
     type: 'GPIO', funcs: ['GPIO'], _rightSlot: 6,
     volt: '5V', curr: '25mA',
     note: 'PORTB bit 1. General purpose I/O.'},

    {num: 35, id: 'RB2', lbl: 'RB2', name: 'RB2',
     type: 'GPIO', funcs: ['GPIO'], _rightSlot: 5,
     volt: '5V', curr: '25mA',
     note: 'PORTB bit 2. General purpose I/O.'},

    {num: 36, id: 'RB3', lbl: 'RB3', name: 'RB3 / PGM',
     type: 'GPIO', funcs: ['GPIO', 'RESET'], _rightSlot: 4,
     volt: '5V', curr: '25mA',
     note: 'PORTB bit 3. Low-voltage ICSP programming enable pin (PGM).'},

    {num: 37, id: 'RB4', lbl: 'RB4', name: 'RB4',
     type: 'GPIO', funcs: ['GPIO', 'INT'], _rightSlot: 3,
     volt: '5V', curr: '25mA',
     note: 'PORTB bit 4. Interrupt-on-change pin. Schmitt Trigger input.'},

    {num: 38, id: 'RB5', lbl: 'RB5', name: 'RB5',
     type: 'GPIO', funcs: ['GPIO', 'INT'], _rightSlot: 2,
     volt: '5V', curr: '25mA',
     note: 'PORTB bit 5. Interrupt-on-change pin. Schmitt Trigger input.'},

    {num: 39, id: 'RB6', lbl: 'RB6', name: 'RB6 / PGC',
     type: 'GPIO', funcs: ['GPIO', 'INT', 'RESET'], _rightSlot: 1,
     volt: '5V', curr: '25mA',
     note: 'PORTB bit 6. ICSP programming clock (PGC). Interrupt-on-change.'},

    {num: 40, id: 'RB7', lbl: 'RB7', name: 'RB7 / PGD',
     type: 'GPIO', funcs: ['GPIO', 'INT', 'RESET'], _rightSlot: 0,
     volt: '5V', curr: '25mA',
     note: 'PORTB bit 7. ICSP programming data (PGD). Interrupt-on-change.'},
  ],

  // ── ALTERNATE FUNCTIONS ──
  altFuncs: {
    'MCLR': ['VPP'],
    'RA0': ['AN0'], 'RA1': ['AN1'], 'RA2': ['AN2', 'VREF-'],
    'RA3': ['AN3', 'VREF+'], 'RA4': ['T0CKI', 'C1OUT'],
    'RA5': ['AN4', 'SS', 'C2OUT'],
    'RE0': ['AN5', 'RD'], 'RE1': ['AN6', 'WR'], 'RE2': ['AN7', 'CS'],
    'OSC1': ['CLKI'], 'OSC2': ['CLKO'],
    'RC0': ['T1OSO', 'T1CKI'], 'RC1': ['T1OSI', 'CCP2'],
    'RC2': ['CCP1'], 'RC3': ['SCK', 'SCL'],
    'RC4': ['SDI', 'SDA'], 'RC5': ['SDO'],
    'RC6': ['TX', 'CK'], 'RC7': ['RX', 'DT'],
    'RB0': ['INT'], 'RB3': ['PGM', 'LVP'],
    'RB6': ['PGC', 'ICD_CLK'], 'RB7': ['PGD', 'ICD_DAT'],
    'RD0': ['PSP0'], 'RD1': ['PSP1'], 'RD2': ['PSP2'], 'RD3': ['PSP3'],
    'RD4': ['PSP4'], 'RD5': ['PSP5'], 'RD6': ['PSP6'], 'RD7': ['PSP7'],
  },

  // ── QUICK SPECIFICATIONS (Right Panel) ──
  quickSpecs: [
    {label: 'Flash', value: '14 KB (8K × 14-bit)', color: '#e0e5ec'},
    {label: 'SRAM', value: '368 bytes', color: '#e0e5ec'},
    {label: 'EEPROM', value: '256 bytes', color: '#e0e5ec'},
    {label: 'Max Freq', value: '20 MHz', color: '#c8a850'},
    {label: 'Supply', value: '2.0–5.5V', color: '#78c878'},
    {label: 'I/O Pins', value: '33 (5 ports)', color: '#e0e5ec'},
    {label: 'ADC', value: '10-bit, 8 channels', color: '#c8a850'},
    {label: 'PWM', value: '2 CCP modules', color: '#cc6888'},
    {label: 'Timers', value: 'Timer0, Timer1, Timer2', color: '#50c8c8'},
    {label: 'Interfaces', value: 'SPI + I²C + USART + PSP', color: '#c8a850'},
  ],

  // ── DETAILED SPECIFICATIONS (Datasheet Tab) ──
  dsSpecs: [
    {label: 'Architecture', value: '8-bit PIC RISC (mid-range)'},
    {label: 'Flash', value: '14 KB (8K × 14-bit words)'},
    {label: 'SRAM', value: '368 bytes'},
    {label: 'EEPROM', value: '256 bytes'},
    {label: 'Max Frequency', value: '20 MHz'},
    {label: 'Supply Voltage', value: '2.0V – 5.5V'},
    {label: 'I/O Pins', value: '33 (Ports A/B/C/D/E)'},
    {label: 'ADC', value: '10-bit, 8 external channels'},
    {label: 'Timers', value: 'Timer0 (8-bit) + Timer1 (16-bit) + Timer2 (8-bit)'},
    {label: 'CCP Modules', value: '2× Capture/Compare/PWM'},
    {label: 'USART', value: '1× async/sync'},
    {label: 'SSP', value: 'SPI (master/slave) + I²C (master/slave)'},
    {label: 'PSP', value: 'Parallel Slave Port (8-bit, PORTD)'},
    {label: 'Comparators', value: '2× analog comparators'},
    {label: 'Package', value: 'DIP-40, TQFP-44, PLCC-44'},
  ],

  // ── KEY FEATURES (Datasheet Tab) ──
  dsFeatures: [
    '35 single-word instructions, most execute in 1 cycle (200 ns @ 20 MHz)',
    '10-bit ADC with 8 multiplexed channels and programmable acquisition time',
    '2 CCP modules: 16-bit capture, 16-bit compare, 10-bit PWM output',
    'SSP module supports SPI (4 modes) and I²C master/slave',
    'Full-duplex USART with auto-baud detection',
    'Parallel Slave Port (PSP) on PORTD for microprocessor interfacing',
    '2 analog comparators with programmable reference (CVref)',
    'In-Circuit Serial Programming (ICSP) via RB6/RB7 pins',
    'Watchdog Timer with dedicated internal oscillator',
    'Power-on Reset, Brown-out Reset, Low-voltage Detect',
    'Three timers: 8-bit Timer0, 16-bit Timer1, 8-bit Timer2',
    '4 external interrupt pins (INT, RB0, RB4-RB7 change interrupts)',
    '1000 erase/write cycles for Flash and EEPROM',
    'Wide operating voltage range (2.0V to 5.5V)',
  ],
};
