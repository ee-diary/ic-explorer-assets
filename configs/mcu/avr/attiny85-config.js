// configs/attiny85-config.js
// ATtiny85 — 8-pin DIP Interactive IC Explorer config
// Microchip Technology (formerly Atmel) ATtiny85-20PU

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'ATtiny85',
  partMPN:      'ATTINY85-20PU',
  manufacturer: 'Microchip Technology',
  package:      'DIP-8',
  pinCount:     8,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/ATTINY85-20PU/Microchip%20Technology/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/ATTINY85-20PU/Microchip%20Technology/view-part/?ref=snapeda',
  datasheetURL: 'https://ww1.microchip.com/downloads/en/devicedoc/atmel-2586-avr-8-bit-microcontroller-attiny25-attiny45-attiny85_datasheet.pdf',

  // ── LAYOUT HINT (DIP-8) ───────────────────────────────────────
  dipConfig: {
    pinsPerSide: 4,
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 340,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 12, part: 22, pkg: 14, pinCount: 11 },
    labelSize: 11, pinNumSize: 14, yOffset: -60
  },

  // ── PINS ──────────────────────────────────────────────────────
  // DIP pin ordering:
  //   Pins 1–4  → LEFT side,  top → bottom
  //   Pins 5–8  → RIGHT side, use _rightSlot: 0=top-right … 3=bottom-right
  //
  // ATtiny85 DIP-8 pinout (counter-clockwise from pin 1):
  //   Pin 1: PB5 (PCINT5 / !RESET / ADC0 / dW)
  //   Pin 2: PB3 (PCINT3 / XTAL1 / CLKI / OC1B / ADC3)
  //   Pin 3: PB4 (PCINT4 / XTAL2 / CLKO / OC1B / ADC2)
  //   Pin 4: GND
  //   Pin 5: PB0 (MOSI / DI / SDA / AIN0 / OC0A / !OC1A / AREF / PCINT0)
  //   Pin 6: PB1 (MISO / DO / AIN1 / OC0B / OC1A / PCINT1)
  //   Pin 7: PB2 (SCK / USCK / SCL / ADC1 / T0 / INT0 / PCINT2)
  //   Pin 8: VCC

  pins: [
    {
      num:   1,
      id:    'PB5',
      lbl:   'PB5',
      name:  'PB5 / RESET / ADC0 / dW',
      type:  'RESET',
      funcs: ['RESET', 'GPIO', 'ADC'],
      volt:  '2.7–5.5V',
      curr:  '40 mA',
      note:  'Port B bit 5. Serves as the active-low external reset input (primary function). Also functions as ADC channel 0 (ADC0) and the debugWIRE single-wire debug interface (dW). Can be reconfigured as a standard GPIO via fuse settings, but doing so permanently disables the external reset capability.'
    },
    {
      num:   2,
      id:    'PB3',
      lbl:   'PB3',
      name:  'PB3 / XTAL1 / CLKI / OC1B / ADC3',
      type:  'GPIO',
      funcs: ['GPIO', 'XTAL', 'ADC', 'PWM', 'TIMER'],
      volt:  '2.7–5.5V',
      curr:  '40 mA',
      note:  'Port B bit 3. Acts as the XTAL1 crystal oscillator input or external clock input (CLKI) when an external clock source is selected. Also serves as ADC channel 3 (ADC3) and Timer/Counter1 compare match output B (OC1B) for PWM generation.'
    },
    {
      num:   3,
      id:    'PB4',
      lbl:   'PB4',
      name:  'PB4 / XTAL2 / CLKO / OC1B / ADC2',
      type:  'GPIO',
      funcs: ['GPIO', 'XTAL', 'ADC', 'PWM', 'TIMER'],
      volt:  '2.7–5.5V',
      curr:  '40 mA',
      note:  'Port B bit 4. Acts as the XTAL2 crystal oscillator output and clock output (CLKO) when the clock-output fuse is programmed. Also supports ADC channel 2 (ADC2) and Timer/Counter1 compare match output B (OC1B) for PWM.'
    },
    {
      num:   4,
      id:    'GND',
      lbl:   'GND',
      name:  'GND — Ground',
      type:  'GND',
      funcs: ['GND'],
      volt:  '0V',
      curr:  'N/A',
      note:  'Ground reference for the entire device. Must be connected to the system ground. All voltages on the chip are measured relative to this pin.'
    },
    {
      num:   5,
      id:    'PB0',
      lbl:   'PB0',
      name:  'PB0 / MOSI / SDA / AIN0 / OC0A / OC1A / AREF',
      type:  'GPIO',
      funcs: ['GPIO', 'SPI', 'I2C', 'ADC', 'PWM', 'TIMER'],
      volt:  '2.7–5.5V',
      curr:  '40 mA',
      note:  'Port B bit 0 — the most versatile pin on the ATtiny85. Serves as SPI MOSI (Master Out Slave In) and USI DI/SDA for I²C communication. Functions as the analog positive comparator input (AIN0), external ADC voltage reference (AREF), Timer0 compare match output A (OC0A), and Timer1 compare match output A (OC1A) for PWM.',
      _rightSlot: 3
    },
    {
      num:   6,
      id:    'PB1',
      lbl:   'PB1',
      name:  'PB1 / MISO / DO / AIN1 / OC0B / OC1A',
      type:  'GPIO',
      funcs: ['GPIO', 'SPI', 'ADC', 'PWM', 'TIMER'],
      volt:  '2.7–5.5V',
      curr:  '40 mA',
      note:  'Port B bit 1. Acts as SPI MISO (Master In Slave Out) and USI DO in serial communication. Also serves as the analog negative comparator input (AIN1), Timer0 compare match output B (OC0B), and Timer1 compare match output A (OC1A) for PWM generation.',
      _rightSlot: 2
    },
    {
      num:   7,
      id:    'PB2',
      lbl:   'PB2',
      name:  'PB2 / SCK / SCL / ADC1 / T0 / INT0',
      type:  'GPIO',
      funcs: ['GPIO', 'SPI', 'I2C', 'ADC', 'TIMER', 'INT'],
      volt:  '2.7–5.5V',
      curr:  '40 mA',
      note:  'Port B bit 2. Serves as the SPI clock (SCK) and USI SCL for I²C communication. Also functions as ADC channel 1 (ADC1), Timer0 external clock input (T0), and the primary external interrupt pin (INT0) with configurable edge or level triggering.',
      _rightSlot: 1
    },
    {
      num:   8,
      id:    'VCC',
      lbl:   'VCC',
      name:  'VCC — Supply Voltage',
      type:  'PWR',
      funcs: ['PWR'],
      volt:  '2.7–5.5V',
      curr:  'N/A',
      note:  'Positive supply voltage for the device. The ATtiny85 operates from 2.7V to 5.5V (full speed up to 20 MHz). For battery-powered applications, the ATtiny85V variant operates down to 1.8V at reduced clock frequencies. Decouple with a 100 nF ceramic capacitor placed as close to this pin as possible.',
      _rightSlot: 0
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'PB5': ['RESET', 'ADC0', 'dW'],
    'PB3': ['XTAL1', 'CLKI', 'OC1B', 'ADC3'],
    'PB4': ['XTAL2', 'CLKO', 'OC1B', 'ADC2'],
    'PB0': ['MOSI', 'DI', 'SDA', 'AIN0', 'OC0A', 'OC1A', 'AREF'],
    'PB1': ['MISO', 'DO', 'AIN1', 'OC0B', 'OC1A'],
    'PB2': ['SCK', 'USCK', 'SCL', 'ADC1', 'T0', 'INT0'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Flash',      value: '8 KB',           color: '#e0e5ec' },
    { label: 'SRAM',       value: '512 bytes',       color: '#e0e5ec' },
    { label: 'EEPROM',     value: '512 bytes',       color: '#e0e5ec' },
    { label: 'Max Freq',   value: '20 MHz',          color: '#c8a850' },
    { label: 'Supply',     value: '2.7–5.5V',        color: '#78c878' },
    { label: 'GPIO Pins',  value: '6 (incl. RESET)', color: '#78c878' },
    { label: 'ADC',        value: '4-ch, 10-bit',    color: '#c8a850' },
    { label: 'Timers',     value: '2 × 8-bit',       color: '#50c8c8' },
    { label: 'Interfaces', value: 'SPI + I²C (USI)'               },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Architecture',       value: '8-bit AVR RISC' },
    { label: 'Instruction Set',    value: '120 instructions, most single-cycle' },
    { label: 'Throughput',         value: '1 MIPS per MHz' },
    { label: 'Program Flash',      value: '8 KB (4K × 16-bit words)' },
    { label: 'SRAM',               value: '512 bytes' },
    { label: 'EEPROM',             value: '512 bytes' },
    { label: 'I/O Pins',           value: '6 (PB0–PB5; PB5 also used as RESET)' },
    { label: 'ADC Channels',       value: '4-channel, 10-bit resolution' },
    { label: 'Timers/Counters',    value: '2 × 8-bit (Timer0, Timer1 high-speed)' },
    { label: 'PWM Channels',       value: '4 PWM outputs' },
    { label: 'Serial Interface',   value: 'Universal Serial Interface (USI) — SPI & I²C' },
    { label: 'Comparator',         value: '1 × analog comparator (AIN0/AIN1)' },
    { label: 'Interrupts',         value: '1 × external INT0 + pin-change PCINT' },
    { label: 'Watchdog Timer',     value: 'Programmable, separate 128 kHz oscillator' },
    { label: 'Internal Oscillator','value': '8 MHz RC (default 1 MHz via CKDIV8 fuse)' },
    { label: 'Supply Voltage',     value: '2.7–5.5V (ATtiny85); 1.8–5.5V (ATtiny85V)' },
    { label: 'Max Current / Pin',  value: '40 mA sink/source per I/O pin' },
    { label: 'Total DC Current',   value: '200 mA (VCC + GND combined)' },
    { label: 'Active Power',       value: '300 µA @ 1 MHz, 1.8V' },
    { label: 'Power-Down Mode',    value: '<0.1 µA @ 1.8V' },
    { label: 'Package',            value: '8-pin PDIP, SOIC, TSSOP, QFN/MLF' },
    { label: 'Temperature Range',  value: '-40°C to +85°C (industrial)' },
    { label: 'Programming',        value: 'SPI ISP, High-Voltage Serial, debugWIRE' },
  ],

  // ── KEY FEATURES ──────────────────────────────────────────────
  dsFeatures: [
    '120 powerful instructions; most execute in a single clock cycle for 1 MIPS/MHz throughput',
    '8 KB of In-System Self-Programmable Flash with 10,000 write/erase cycle endurance',
    '512 bytes EEPROM (100,000 write/erase cycles) and 512 bytes on-chip SRAM',
    '4-channel 10-bit ADC with internal 1.1V bandgap voltage reference',
    '4 PWM outputs — two from Timer0 (OC0A, OC0B) and two from high-speed Timer1 (OC1A, OC1B)',
    'Universal Serial Interface (USI) supports both SPI and I²C (Two-Wire Interface)',
    'Programmable watchdog timer with dedicated independent on-chip 128 kHz oscillator',
    'Internal calibrated 8 MHz RC oscillator — no external crystal required for most applications',
    'Six fully configurable GPIO pins with internal pull-up resistors (PB0–PB5)',
    'Pin-change interrupt (PCINT) available on all six port pins',
    'External interrupt INT0 on PB2 with configurable edge/level triggering',
    'On-chip analog comparator (AIN0 on PB0, AIN1 on PB1)',
    'debugWIRE single-wire on-chip debug interface via the RESET/PB5 pin',
    'SPI In-System Programming (ISP) and High-Voltage Serial Programming support',
    'Multiple power-save modes: Idle, ADC Noise Reduction, Power-Down, Standby',
    'Ultra-low power: <0.1 µA in Power-Down mode at 1.8V — ideal for battery-operated designs',
    'Wide supply voltage range: 2.7–5.5V (full speed) or 1.8–5.5V (ATtiny85V, reduced speed)',
    'Available in compact 8-pin PDIP, SOIC, TSSOP, and QFN/MLF packages',
    'Compatible with Arduino IDE via Digispark board support or ATtinyCore',
    'AEC-Q100 qualified automotive-grade variants available (ATTINY85-15AZ etc.)',
  ],
};