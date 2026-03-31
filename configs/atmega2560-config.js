// configs/atmega2560-config.js
// ATmega2560 — Microchip/Atmel 8-bit AVR RISC Microcontroller
// TQFP-100 package • 100 pins
// Drop this file into: ic-explorer-assets/configs/

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'ATmega2560',
  partMPN:      'ATMEGA2560-16AU',
  manufacturer: 'Microchip / Atmel',
  package:      'TQFP-100',
  pinCount:     100,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/ATMEGA2560-16AU/Microchip/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/ATMEGA2560-16AU/Microchip/view-part/?ref=snapeda',
  datasheetURL: 'https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega640-1280-1281-2560-2561-Datasheet-DS40002211A.pdf',

  // ── LAYOUT HINT (TQFP-100, 25 pins per side) ─────────────────
  qfpConfig: {
    pinsPerSide: 25,
    bodySize:    520,
    pinLength:   34, pinWidth: 15, pinGap: 2
  },

  // ── PINS ──────────────────────────────────────────────────────
  // QFP counter-clockwise from pin 1 (top-left):
  //   Pins   1– 25 → LEFT side,   top → bottom
  //   Pins  26– 50 → BOTTOM side, left → right
  //   Pins  51– 75 → RIGHT side,  bottom → top
  //   Pins  76–100 → TOP side,    right → left
  pins: [

    // ── LEFT SIDE (pins 1–25, top → bottom) ──────────────────────
    { num:  1, id: 'PG5',  lbl: 'PG5',  name: 'PG5 / OC0B',
      type: 'PWM',   funcs: ['GPIO', 'PWM'],
      volt: '5V',    curr: '40mA',
      note: 'Timer0 Compare Match B output (OC0B). General-purpose I/O port G, bit 5. PCINT13.' },

    { num:  2, id: 'PE0',  lbl: 'PE0',  name: 'PE0 / RXD0 / PCINT8',
      type: 'UART',  funcs: ['GPIO', 'UART', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'USART0 receive data pin (RXD0). General-purpose I/O port E, bit 0. Pin-change interrupt PCINT8.' },

    { num:  3, id: 'PE1',  lbl: 'PE1',  name: 'PE1 / TXD0',
      type: 'UART',  funcs: ['GPIO', 'UART'],
      volt: '5V',    curr: '40mA',
      note: 'USART0 transmit data pin (TXD0). General-purpose I/O port E, bit 1.' },

    { num:  4, id: 'PE2',  lbl: 'PE2',  name: 'PE2 / XCK0 / AIN0',
      type: 'UART',  funcs: ['GPIO', 'UART', 'COMP'],
      volt: '5V',    curr: '40mA',
      note: 'USART0 external clock (XCK0). Analog comparator positive input (AIN0). General-purpose I/O port E, bit 2.' },

    { num:  5, id: 'PE3',  lbl: 'PE3',  name: 'PE3 / OC3A / AIN1',
      type: 'PWM',   funcs: ['GPIO', 'PWM', 'COMP'],
      volt: '5V',    curr: '40mA',
      note: 'Timer3 Compare Match A output (OC3A). Analog comparator negative input (AIN1). General-purpose I/O port E, bit 3.' },

    { num:  6, id: 'PE4',  lbl: 'PE4',  name: 'PE4 / OC3B / INT4',
      type: 'PWM',   funcs: ['GPIO', 'PWM', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'Timer3 Compare Match B output (OC3B). External interrupt 4 (INT4). General-purpose I/O port E, bit 4.' },

    { num:  7, id: 'PE5',  lbl: 'PE5',  name: 'PE5 / OC3C / INT5',
      type: 'PWM',   funcs: ['GPIO', 'PWM', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'Timer3 Compare Match C output (OC3C). External interrupt 5 (INT5). General-purpose I/O port E, bit 5.' },

    { num:  8, id: 'PE6',  lbl: 'PE6',  name: 'PE6 / T3 / INT6',
      type: 'INT',   funcs: ['GPIO', 'TIMER', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'Timer3 external clock input (T3). External interrupt 6 (INT6). General-purpose I/O port E, bit 6.' },

    { num:  9, id: 'PE7',  lbl: 'PE7',  name: 'PE7 / CLKO / ICP3 / INT7',
      type: 'INT',   funcs: ['GPIO', 'TIMER', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'Divided system clock output (CLKO). Timer3 input capture (ICP3). External interrupt 7 (INT7). General-purpose I/O port E, bit 7.' },

    { num: 10, id: 'VCC1', lbl: 'VCC',  name: 'VCC — Digital Power Supply',
      type: 'PWR',   funcs: ['PWR'],
      volt: '1.8–5.5V', curr: '200mA',
      note: 'Digital power supply. Decouple with 100 nF ceramic capacitor close to pin.' },

    { num: 11, id: 'GND1', lbl: 'GND',  name: 'GND — Ground',
      type: 'GND',   funcs: ['GND'],
      volt: '0V',    curr: 'N/A',
      note: 'Ground reference. Connect to system ground plane.' },

    { num: 12, id: 'PH0',  lbl: 'PH0',  name: 'PH0 / RXD2',
      type: 'UART',  funcs: ['GPIO', 'UART'],
      volt: '5V',    curr: '40mA',
      note: 'USART2 receive data pin (RXD2). General-purpose I/O port H, bit 0.' },

    { num: 13, id: 'PH1',  lbl: 'PH1',  name: 'PH1 / TXD2',
      type: 'UART',  funcs: ['GPIO', 'UART'],
      volt: '5V',    curr: '40mA',
      note: 'USART2 transmit data pin (TXD2). General-purpose I/O port H, bit 1.' },

    { num: 14, id: 'PH2',  lbl: 'PH2',  name: 'PH2 / XCK2',
      type: 'UART',  funcs: ['GPIO', 'UART'],
      volt: '5V',    curr: '40mA',
      note: 'USART2 external clock (XCK2). General-purpose I/O port H, bit 2.' },

    { num: 15, id: 'PH3',  lbl: 'PH3',  name: 'PH3 / OC4A',
      type: 'PWM',   funcs: ['GPIO', 'PWM'],
      volt: '5V',    curr: '40mA',
      note: 'Timer4 Compare Match A output (OC4A). General-purpose I/O port H, bit 3.' },

    { num: 16, id: 'PH4',  lbl: 'PH4',  name: 'PH4 / OC4B',
      type: 'PWM',   funcs: ['GPIO', 'PWM'],
      volt: '5V',    curr: '40mA',
      note: 'Timer4 Compare Match B output (OC4B). General-purpose I/O port H, bit 4.' },

    { num: 17, id: 'PH5',  lbl: 'PH5',  name: 'PH5 / OC4C',
      type: 'PWM',   funcs: ['GPIO', 'PWM'],
      volt: '5V',    curr: '40mA',
      note: 'Timer4 Compare Match C output (OC4C). General-purpose I/O port H, bit 5.' },

    { num: 18, id: 'PH6',  lbl: 'PH6',  name: 'PH6 / OC2B',
      type: 'PWM',   funcs: ['GPIO', 'PWM'],
      volt: '5V',    curr: '40mA',
      note: 'Timer2 Compare Match B output (OC2B). General-purpose I/O port H, bit 6.' },

    { num: 19, id: 'PB0',  lbl: 'PB0',  name: 'PB0 / SS / PCINT0',
      type: 'SPI',   funcs: ['GPIO', 'SPI', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'SPI Slave Select (SS) — active LOW. General-purpose I/O port B, bit 0. Pin-change interrupt PCINT0.' },

    { num: 20, id: 'PB1',  lbl: 'PB1',  name: 'PB1 / SCK / PCINT1',
      type: 'SPI',   funcs: ['GPIO', 'SPI'],
      volt: '5V',    curr: '40mA',
      note: 'SPI clock (SCK). General-purpose I/O port B, bit 1. Pin-change interrupt PCINT1.' },

    { num: 21, id: 'PB2',  lbl: 'PB2',  name: 'PB2 / MOSI / PCINT2',
      type: 'SPI',   funcs: ['GPIO', 'SPI'],
      volt: '5V',    curr: '40mA',
      note: 'SPI Master-Out Slave-In (MOSI). General-purpose I/O port B, bit 2. Pin-change interrupt PCINT2.' },

    { num: 22, id: 'PB3',  lbl: 'PB3',  name: 'PB3 / MISO / PCINT3',
      type: 'SPI',   funcs: ['GPIO', 'SPI'],
      volt: '5V',    curr: '40mA',
      note: 'SPI Master-In Slave-Out (MISO). General-purpose I/O port B, bit 3. Pin-change interrupt PCINT3.' },

    { num: 23, id: 'PB4',  lbl: 'PB4',  name: 'PB4 / OC2A / PCINT4',
      type: 'PWM',   funcs: ['GPIO', 'PWM', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'Timer2 Compare Match A output (OC2A). General-purpose I/O port B, bit 4. Pin-change interrupt PCINT4.' },

    { num: 24, id: 'PB5',  lbl: 'PB5',  name: 'PB5 / OC1A / PCINT5',
      type: 'PWM',   funcs: ['GPIO', 'PWM'],
      volt: '5V',    curr: '40mA',
      note: 'Timer1 Compare Match A output (OC1A) — 16-bit timer. General-purpose I/O port B, bit 5. Pin-change interrupt PCINT5.' },

    { num: 25, id: 'PB6',  lbl: 'PB6',  name: 'PB6 / OC1B / PCINT6',
      type: 'PWM',   funcs: ['GPIO', 'PWM'],
      volt: '5V',    curr: '40mA',
      note: 'Timer1 Compare Match B output (OC1B). General-purpose I/O port B, bit 6. Pin-change interrupt PCINT6.' },

    // ── BOTTOM SIDE (pins 26–50, left → right) ───────────────────
    { num: 26, id: 'PB7',  lbl: 'PB7',  name: 'PB7 / OC0A / OC1C / PCINT7',
      type: 'PWM',   funcs: ['GPIO', 'PWM', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'Timer0 OC0A and Timer1 OC1C Compare Match outputs. General-purpose I/O port B, bit 7. Pin-change interrupt PCINT7.' },

    { num: 27, id: 'PH7',  lbl: 'PH7',  name: 'PH7 / T4',
      type: 'TIMER', funcs: ['GPIO', 'TIMER'],
      volt: '5V',    curr: '40mA',
      note: 'Timer4 external clock input (T4). General-purpose I/O port H, bit 7.' },

    { num: 28, id: 'PG3',  lbl: 'PG3',  name: 'PG3 / TOSC2',
      type: 'XTAL',  funcs: ['GPIO', 'XTAL'],
      volt: '5V',    curr: '40mA',
      note: 'Timer oscillator output (TOSC2) for asynchronous Timer2 operation. General-purpose I/O port G, bit 3.' },

    { num: 29, id: 'PG4',  lbl: 'PG4',  name: 'PG4 / TOSC1',
      type: 'XTAL',  funcs: ['GPIO', 'XTAL'],
      volt: '5V',    curr: '40mA',
      note: 'Timer oscillator input (TOSC1) for asynchronous Timer2 operation. General-purpose I/O port G, bit 4.' },

    { num: 30, id: 'RST',  lbl: 'RST',  name: 'RESET',
      type: 'RESET', funcs: ['RESET'],
      volt: '5V',    curr: 'N/A',
      note: 'External reset input — active LOW. Internal pull-up resistor. Minimum pulse width 2.5 µs.' },

    { num: 31, id: 'VCC2', lbl: 'VCC',  name: 'VCC — Power Supply',
      type: 'PWR',   funcs: ['PWR'],
      volt: '1.8–5.5V', curr: '200mA',
      note: 'Digital power supply. Decouple with 100 nF ceramic capacitor close to pin.' },

    { num: 32, id: 'GND2', lbl: 'GND',  name: 'GND — Ground',
      type: 'GND',   funcs: ['GND'],
      volt: '0V',    curr: 'N/A',
      note: 'Ground reference.' },

    { num: 33, id: 'XTAL2', lbl: 'XT2', name: 'XTAL2',
      type: 'XTAL',  funcs: ['XTAL'],
      volt: '5V',    curr: 'N/A',
      note: 'Crystal oscillator output (XTAL2). Connect to external crystal or resonator. Leave unconnected when using internal oscillator.' },

    { num: 34, id: 'XTAL1', lbl: 'XT1', name: 'XTAL1 / CLKI',
      type: 'XTAL',  funcs: ['XTAL'],
      volt: '5V',    curr: 'N/A',
      note: 'Crystal oscillator input (XTAL1). External clock input (CLKI). Connect to crystal, resonator, or external clock source.' },

    { num: 35, id: 'PD0',  lbl: 'PD0',  name: 'PD0 / SCL / INT0',
      type: 'I2C',   funcs: ['GPIO', 'I2C', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'I2C clock line (SCL). External interrupt 0 (INT0). General-purpose I/O port D, bit 0.' },

    { num: 36, id: 'PD1',  lbl: 'PD1',  name: 'PD1 / SDA / INT1',
      type: 'I2C',   funcs: ['GPIO', 'I2C', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'I2C data line (SDA). External interrupt 1 (INT1). General-purpose I/O port D, bit 1.' },

    { num: 37, id: 'PD2',  lbl: 'PD2',  name: 'PD2 / RXD1 / INT2',
      type: 'UART',  funcs: ['GPIO', 'UART', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'USART1 receive data (RXD1). External interrupt 2 (INT2). General-purpose I/O port D, bit 2.' },

    { num: 38, id: 'PD3',  lbl: 'PD3',  name: 'PD3 / TXD1 / INT3',
      type: 'UART',  funcs: ['GPIO', 'UART', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'USART1 transmit data (TXD1). External interrupt 3 (INT3). General-purpose I/O port D, bit 3.' },

    { num: 39, id: 'PD4',  lbl: 'PD4',  name: 'PD4 / ICP1',
      type: 'TIMER', funcs: ['GPIO', 'TIMER'],
      volt: '5V',    curr: '40mA',
      note: 'Timer1 input capture pin (ICP1). General-purpose I/O port D, bit 4.' },

    { num: 40, id: 'PD5',  lbl: 'PD5',  name: 'PD5 / XCK1',
      type: 'UART',  funcs: ['GPIO', 'UART'],
      volt: '5V',    curr: '40mA',
      note: 'USART1 external clock (XCK1). General-purpose I/O port D, bit 5.' },

    { num: 41, id: 'PD6',  lbl: 'PD6',  name: 'PD6 / T1',
      type: 'TIMER', funcs: ['GPIO', 'TIMER'],
      volt: '5V',    curr: '40mA',
      note: 'Timer1 external clock input (T1). General-purpose I/O port D, bit 6.' },

    { num: 42, id: 'PD7',  lbl: 'PD7',  name: 'PD7 / T0',
      type: 'TIMER', funcs: ['GPIO', 'TIMER'],
      volt: '5V',    curr: '40mA',
      note: 'Timer0 external clock input (T0). General-purpose I/O port D, bit 7.' },

    { num: 43, id: 'PG0',  lbl: 'PG0',  name: 'PG0 / WR',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory write strobe (WR). General-purpose I/O port G, bit 0.' },

    { num: 44, id: 'PG1',  lbl: 'PG1',  name: 'PG1 / RD',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory read strobe (RD). General-purpose I/O port G, bit 1.' },

    { num: 45, id: 'PC0',  lbl: 'PC0',  name: 'PC0 / A8',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory address line A8. General-purpose I/O port C, bit 0.' },

    { num: 46, id: 'PC1',  lbl: 'PC1',  name: 'PC1 / A9',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory address line A9. General-purpose I/O port C, bit 1.' },

    { num: 47, id: 'PC2',  lbl: 'PC2',  name: 'PC2 / A10',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory address line A10. General-purpose I/O port C, bit 2.' },

    { num: 48, id: 'PC3',  lbl: 'PC3',  name: 'PC3 / A11',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory address line A11. General-purpose I/O port C, bit 3.' },

    { num: 49, id: 'PC4',  lbl: 'PC4',  name: 'PC4 / A12',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory address line A12. General-purpose I/O port C, bit 4.' },

    { num: 50, id: 'PC5',  lbl: 'PC5',  name: 'PC5 / A13',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory address line A13. General-purpose I/O port C, bit 5.' },

    // ── RIGHT SIDE (pins 51–75, bottom → top) ────────────────────
    { num: 51, id: 'PC6',  lbl: 'PC6',  name: 'PC6 / A14',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory address line A14. General-purpose I/O port C, bit 6.' },

    { num: 52, id: 'PC7',  lbl: 'PC7',  name: 'PC7 / A15',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory address line A15. General-purpose I/O port C, bit 7.' },

    { num: 53, id: 'PG2',  lbl: 'PG2',  name: 'PG2 / ALE',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory address latch enable (ALE). General-purpose I/O port G, bit 2.' },

    { num: 54, id: 'PA7',  lbl: 'PA7',  name: 'PA7 / AD7',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory multiplexed address/data bus, bit 7 (AD7). General-purpose I/O port A, bit 7.' },

    { num: 55, id: 'PA6',  lbl: 'PA6',  name: 'PA6 / AD6',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory multiplexed address/data bus, bit 6 (AD6). General-purpose I/O port A, bit 6.' },

    { num: 56, id: 'PA5',  lbl: 'PA5',  name: 'PA5 / AD5',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory multiplexed address/data bus, bit 5 (AD5). General-purpose I/O port A, bit 5.' },

    { num: 57, id: 'PA4',  lbl: 'PA4',  name: 'PA4 / AD4',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory multiplexed address/data bus, bit 4 (AD4). General-purpose I/O port A, bit 4.' },

    { num: 58, id: 'PA3',  lbl: 'PA3',  name: 'PA3 / AD3',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory multiplexed address/data bus, bit 3 (AD3). General-purpose I/O port A, bit 3.' },

    { num: 59, id: 'PA2',  lbl: 'PA2',  name: 'PA2 / AD2',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory multiplexed address/data bus, bit 2 (AD2). General-purpose I/O port A, bit 2.' },

    { num: 60, id: 'PA1',  lbl: 'PA1',  name: 'PA1 / AD1',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory multiplexed address/data bus, bit 1 (AD1). General-purpose I/O port A, bit 1.' },

    { num: 61, id: 'PA0',  lbl: 'PA0',  name: 'PA0 / AD0',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'External memory multiplexed address/data bus, bit 0 (AD0). General-purpose I/O port A, bit 0.' },

    { num: 62, id: 'VCC3', lbl: 'VCC',  name: 'VCC — Power Supply',
      type: 'PWR',   funcs: ['PWR'],
      volt: '1.8–5.5V', curr: '200mA',
      note: 'Digital power supply. Decouple with 100 nF ceramic capacitor close to pin.' },

    { num: 63, id: 'GND3', lbl: 'GND',  name: 'GND — Ground',
      type: 'GND',   funcs: ['GND'],
      volt: '0V',    curr: 'N/A',
      note: 'Ground reference.' },

    { num: 64, id: 'PK7',  lbl: 'PK7',  name: 'PK7 / ADC15 / PCINT23',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'INT'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 15. General-purpose I/O port K, bit 7. Pin-change interrupt PCINT23.' },

    { num: 65, id: 'PK6',  lbl: 'PK6',  name: 'PK6 / ADC14 / PCINT22',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'INT'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 14. General-purpose I/O port K, bit 6. Pin-change interrupt PCINT22.' },

    { num: 66, id: 'PK5',  lbl: 'PK5',  name: 'PK5 / ADC13 / PCINT21',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'INT'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 13. General-purpose I/O port K, bit 5. Pin-change interrupt PCINT21.' },

    { num: 67, id: 'PK4',  lbl: 'PK4',  name: 'PK4 / ADC12 / PCINT20',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'INT'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 12. General-purpose I/O port K, bit 4. Pin-change interrupt PCINT20.' },

    { num: 68, id: 'PK3',  lbl: 'PK3',  name: 'PK3 / ADC11 / PCINT19',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'INT'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 11. General-purpose I/O port K, bit 3. Pin-change interrupt PCINT19.' },

    { num: 69, id: 'PK2',  lbl: 'PK2',  name: 'PK2 / ADC10 / PCINT18',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'INT'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 10. General-purpose I/O port K, bit 2. Pin-change interrupt PCINT18.' },

    { num: 70, id: 'PK1',  lbl: 'PK1',  name: 'PK1 / ADC9 / PCINT17',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'INT'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 9. General-purpose I/O port K, bit 1. Pin-change interrupt PCINT17.' },

    { num: 71, id: 'PK0',  lbl: 'PK0',  name: 'PK0 / ADC8 / PCINT16',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'INT'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 8. General-purpose I/O port K, bit 0. Pin-change interrupt PCINT16.' },

    { num: 72, id: 'PF7',  lbl: 'PF7',  name: 'PF7 / ADC7 / TDI',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'JTAG'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 7. JTAG Test Data In (TDI). General-purpose I/O port F, bit 7.' },

    { num: 73, id: 'PF6',  lbl: 'PF6',  name: 'PF6 / ADC6 / TDO',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'JTAG'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 6. JTAG Test Data Out (TDO). General-purpose I/O port F, bit 6.' },

    { num: 74, id: 'PF5',  lbl: 'PF5',  name: 'PF5 / ADC5 / TMS',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'JTAG'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 5. JTAG Test Mode Select (TMS). General-purpose I/O port F, bit 5.' },

    { num: 75, id: 'PF4',  lbl: 'PF4',  name: 'PF4 / ADC4 / TCK',
      type: 'ADC',   funcs: ['GPIO', 'ADC', 'JTAG'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 4. JTAG Test Clock (TCK). General-purpose I/O port F, bit 4.' },

    // ── TOP SIDE (pins 76–100, right → left) ─────────────────────
    { num: 76, id: 'PF3',  lbl: 'PF3',  name: 'PF3 / ADC3',
      type: 'ADC',   funcs: ['GPIO', 'ADC'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 3. General-purpose I/O port F, bit 3.' },

    { num: 77, id: 'PF2',  lbl: 'PF2',  name: 'PF2 / ADC2',
      type: 'ADC',   funcs: ['GPIO', 'ADC'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 2. General-purpose I/O port F, bit 2.' },

    { num: 78, id: 'PF1',  lbl: 'PF1',  name: 'PF1 / ADC1',
      type: 'ADC',   funcs: ['GPIO', 'ADC'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 1. General-purpose I/O port F, bit 1.' },

    { num: 79, id: 'PF0',  lbl: 'PF0',  name: 'PF0 / ADC0',
      type: 'ADC',   funcs: ['GPIO', 'ADC'],
      volt: '0–5V',  curr: 'N/A',
      note: 'ADC input channel 0. General-purpose I/O port F, bit 0.' },

    { num: 80, id: 'AREF', lbl: 'AREF', name: 'AREF — ADC Voltage Reference',
      type: 'ADC',   funcs: ['ADC'],
      volt: '0–5V',  curr: 'N/A',
      note: 'External ADC voltage reference input. Decouple with 100 nF capacitor to AGND. Firmware-selectable: external AREF, AVCC, or internal 1.1V bandgap.' },

    { num: 81, id: 'GND4', lbl: 'GND',  name: 'GND — Analog Ground',
      type: 'GND',   funcs: ['GND'],
      volt: '0V',    curr: 'N/A',
      note: 'Analog ground. Connect to system ground at a single star point, separate from digital ground pour for best ADC accuracy.' },

    { num: 82, id: 'AVCC', lbl: 'AVCC', name: 'AVCC — ADC Power Supply',
      type: 'PWR',   funcs: ['PWR', 'ADC'],
      volt: '5V',    curr: 'N/A',
      note: 'Analog section power supply. Connect via a 10 µH inductor from VCC. Decouple locally with 100 nF + 10 µF capacitors. Must be within 0.3V of VCC.' },

    { num: 83, id: 'PJ7',  lbl: 'PJ7',  name: 'PJ7 / PCINT15',
      type: 'GPIO',  funcs: ['GPIO', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'General-purpose I/O port J, bit 7. Pin-change interrupt PCINT15.' },

    { num: 84, id: 'PJ6',  lbl: 'PJ6',  name: 'PJ6 / PCINT14',
      type: 'GPIO',  funcs: ['GPIO', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'General-purpose I/O port J, bit 6. Pin-change interrupt PCINT14.' },

    { num: 85, id: 'PJ5',  lbl: 'PJ5',  name: 'PJ5 / PCINT13',
      type: 'GPIO',  funcs: ['GPIO', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'General-purpose I/O port J, bit 5. Pin-change interrupt PCINT13.' },

    { num: 86, id: 'PJ4',  lbl: 'PJ4',  name: 'PJ4 / PCINT12',
      type: 'GPIO',  funcs: ['GPIO', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'General-purpose I/O port J, bit 4. Pin-change interrupt PCINT12.' },

    { num: 87, id: 'PJ3',  lbl: 'PJ3',  name: 'PJ3 / PCINT11',
      type: 'GPIO',  funcs: ['GPIO', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'General-purpose I/O port J, bit 3. Pin-change interrupt PCINT11.' },

    { num: 88, id: 'PJ2',  lbl: 'PJ2',  name: 'PJ2 / XCK3 / PCINT10',
      type: 'UART',  funcs: ['GPIO', 'UART', 'INT'],
      volt: '5V',    curr: '40mA',
      note: 'USART3 external clock (XCK3). General-purpose I/O port J, bit 2. Pin-change interrupt PCINT10.' },

    { num: 89, id: 'PJ1',  lbl: 'PJ1',  name: 'PJ1 / TXD3 / PCINT9',
      type: 'UART',  funcs: ['GPIO', 'UART'],
      volt: '5V',    curr: '40mA',
      note: 'USART3 transmit data (TXD3). General-purpose I/O port J, bit 1. Pin-change interrupt PCINT9.' },

    { num: 90, id: 'PJ0',  lbl: 'PJ0',  name: 'PJ0 / RXD3 / PCINT8',
      type: 'UART',  funcs: ['GPIO', 'UART'],
      volt: '5V',    curr: '40mA',
      note: 'USART3 receive data (RXD3). General-purpose I/O port J, bit 0. Pin-change interrupt PCINT8.' },

    { num: 91, id: 'VCC4', lbl: 'VCC',  name: 'VCC — Power Supply',
      type: 'PWR',   funcs: ['PWR'],
      volt: '1.8–5.5V', curr: '200mA',
      note: 'Digital power supply. Decouple with 100 nF ceramic capacitor close to pin.' },

    { num: 92, id: 'GND5', lbl: 'GND',  name: 'GND — Ground',
      type: 'GND',   funcs: ['GND'],
      volt: '0V',    curr: 'N/A',
      note: 'Ground reference.' },

    { num: 93, id: 'JEN',  lbl: 'JEN',  name: 'JTAG Enable',
      type: 'JTAG',  funcs: ['JTAG'],
      volt: '5V',    curr: 'N/A',
      note: 'JTAG interface enable. Pull LOW to activate JTAG boundary scan and on-chip debug. Can be disabled via JTAGEN fuse.' },

    { num: 94, id: 'PI7',  lbl: 'PI7',  name: 'PI7',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'General-purpose I/O port I, bit 7.' },

    { num: 95, id: 'PI6',  lbl: 'PI6',  name: 'PI6',
      type: 'GPIO',  funcs: ['GPIO'],
      volt: '5V',    curr: '40mA',
      note: 'General-purpose I/O port I, bit 6.' },

    { num: 96, id: 'PI5',  lbl: 'PI5',  name: 'PI5 / ICP5',
      type: 'TIMER', funcs: ['GPIO', 'TIMER'],
      volt: '5V',    curr: '40mA',
      note: 'Timer5 input capture pin (ICP5). General-purpose I/O port I, bit 5.' },

    { num: 97, id: 'PI4',  lbl: 'PI4',  name: 'PI4 / OC5C',
      type: 'PWM',   funcs: ['GPIO', 'PWM'],
      volt: '5V',    curr: '40mA',
      note: 'Timer5 Compare Match C output (OC5C). General-purpose I/O port I, bit 4.' },

    { num: 98, id: 'PI3',  lbl: 'PI3',  name: 'PI3 / OC5B',
      type: 'PWM',   funcs: ['GPIO', 'PWM'],
      volt: '5V',    curr: '40mA',
      note: 'Timer5 Compare Match B output (OC5B). General-purpose I/O port I, bit 3.' },

    { num: 99, id: 'PI2',  lbl: 'PI2',  name: 'PI2 / OC5A',
      type: 'PWM',   funcs: ['GPIO', 'PWM'],
      volt: '5V',    curr: '40mA',
      note: 'Timer5 Compare Match A output (OC5A). General-purpose I/O port I, bit 2.' },

    { num:100, id: 'PI1',  lbl: 'PI1',  name: 'PI1 / RXD3',
      type: 'UART',  funcs: ['GPIO', 'UART'],
      volt: '5V',    curr: '40mA',
      note: 'USART3 receive data alternate pin (RXD3). General-purpose I/O port I, bit 1.' },

  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'PD0':  ['SCL', 'INT0'],
    'PD1':  ['SDA', 'INT1'],
    'PD2':  ['RXD1', 'INT2'],
    'PD3':  ['TXD1', 'INT3'],
    'PD4':  ['ICP1'],
    'PD5':  ['XCK1'],
    'PD6':  ['T1'],
    'PD7':  ['T0'],
    'PE0':  ['RXD0', 'PCINT8'],
    'PE1':  ['TXD0'],
    'PE2':  ['XCK0', 'AIN0'],
    'PE3':  ['OC3A', 'AIN1'],
    'PE4':  ['OC3B', 'INT4'],
    'PE5':  ['OC3C', 'INT5'],
    'PE6':  ['T3', 'INT6'],
    'PE7':  ['CLKO', 'ICP3', 'INT7'],
    'PB0':  ['SPI_SS', 'PCINT0'],
    'PB1':  ['SPI_SCK', 'PCINT1'],
    'PB2':  ['SPI_MOSI', 'PCINT2'],
    'PB3':  ['SPI_MISO', 'PCINT3'],
    'PB4':  ['OC2A', 'PCINT4'],
    'PB5':  ['OC1A', 'PCINT5'],
    'PB6':  ['OC1B', 'PCINT6'],
    'PB7':  ['OC0A', 'OC1C', 'PCINT7'],
    'PF4':  ['ADC4', 'TCK'],
    'PF5':  ['ADC5', 'TMS'],
    'PF6':  ['ADC6', 'TDO'],
    'PF7':  ['ADC7', 'TDI'],
    'PG3':  ['TOSC2'],
    'PG4':  ['TOSC1'],
    'PH0':  ['RXD2'],
    'PH1':  ['TXD2'],
    'PH2':  ['XCK2'],
    'PJ0':  ['RXD3', 'PCINT8'],
    'PJ1':  ['TXD3', 'PCINT9'],
    'PJ2':  ['XCK3', 'PCINT10'],
    'XTAL1':['CLKI'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Flash',      value: '256 KB',            color: '#e0e5ec' },
    { label: 'SRAM',       value: '8 KB',              color: '#e0e5ec' },
    { label: 'EEPROM',     value: '4 KB',              color: '#e0e5ec' },
    { label: 'Max Freq',   value: '16 MHz',            color: '#c8a850' },
    { label: 'Supply',     value: '1.8–5.5V',          color: '#78c878' },
    { label: 'I/O Pins',   value: '86',                color: '#e0e5ec' },
    { label: 'ADC',        value: '16 ch / 10-bit',    color: '#c8a850' },
    { label: 'USART',      value: '4×',                color: '#cc6888' },
    { label: 'PWM Ch',     value: '15',                color: '#50c8c8' },
    { label: 'Timers',     value: '6 (2×8-bit, 4×16-bit)' },
    { label: 'Interfaces', value: 'SPI + I²C + JTAG'  },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',    value: '8-bit AVR RISC' },
    { label: 'Flash Memory',    value: '256 KB (10,000 write cycles endurance)' },
    { label: 'SRAM',            value: '8 KB' },
    { label: 'EEPROM',          value: '4 KB (100,000 write cycles endurance)' },
    { label: 'Max Clock',       value: '16 MHz' },
    { label: 'Supply Voltage',  value: '1.8V – 5.5V' },
    { label: 'I/O Pins',        value: '86 (all with programmable pull-ups)' },
    { label: 'ADC',             value: '16-channel, 10-bit, 200 ksps' },
    { label: 'Timers',          value: '6 (Timer0/2 8-bit; Timer1/3/4/5 16-bit)' },
    { label: 'PWM Channels',    value: '15' },
    { label: 'USART',           value: '4× full-duplex (USART0–3)' },
    { label: 'SPI',             value: '1× master/slave' },
    { label: 'I2C (TWI)',       value: '1× up to 400 kHz' },
    { label: 'Ext Interrupts',  value: '8 (INT0–INT7)' },
    { label: 'PCINT',           value: '24 pins (PCINT0–PCINT23)' },
    { label: 'JTAG',            value: 'Boundary scan + on-chip debug (OCD)' },
    { label: 'Ext Memory',      value: 'Up to 64 KB external SRAM' },
    { label: 'Package',         value: 'TQFP-100, MLF-100 (14×14 mm, 0.5 mm pitch)' },
    { label: 'VCC max',         value: '6.0V absolute maximum' },
    { label: 'I/O Current',     value: '40 mA per pin; 400 mA total sink' },
    { label: 'Operating Temp',  value: '−40°C to +85°C (industrial)' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    '131 single-cycle instructions; most execute in one clock cycle at full throughput',
    '4× USART interfaces enabling simultaneous multi-channel serial communication',
    '15 PWM channels across 6 independent timers (Timer0–5, including four 16-bit timers)',
    '16-channel 10-bit ADC with differential input pairs and programmable gain',
    'JTAG boundary scan and on-chip debug (OCD) interface for hardware-level debugging',
    'External memory interface supporting up to 64 KB of additional SRAM',
    'In-System Programmable (ISP) via SPI — no external programmer needed',
    'Boot loader support with independent lock bits for secure firmware updates',
    'Watchdog timer with dedicated on-chip oscillator for reliable system recovery',
    '6 power-saving sleep modes: Idle, ADC Noise Reduction, Power-save, Power-down, Standby, Extended Standby',
    'On-chip temperature sensor for system monitoring',
    'Brown-out detection with 4 programmable voltage levels',
    'Arduino Mega MCU — powers the Arduino Mega 2560 development board',
  ],

};
