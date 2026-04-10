// configs/msp430g2553-config.js
window.IC_CONFIG = {
  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'MSP430G2553',
  partMPN:      'MSP430G2553IN20',
  manufacturer: 'Texas Instruments',
  package:      'DIP-20',
  pinCount:     20,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/MSP430G2553IN20/Texas%20Instruments/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/MSP430G2553IN20/Texas%20Instruments/download/',
  datasheetURL: 'https://www.ti.com/lit/ds/symlink/msp430g2553.pdf',

  // ── LAYOUT HINT (DIP only) ────────────────────────────────────
  dipConfig: {
    pinsPerSide: 10,       // half of pinCount (20/2 = 10)
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 700,
    pinLength: 44,         // increased for better visibility
    pinWidthHalf: 22,      // wider pins
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 14, part: 24, pkg: 16, pinCount: 12 },
    labelSize: 11, pinNumSize: 14, yOffset: -60
  },

  // ── PINS ──────────────────────────────────────────────────────
  // DIP ordering: pins 1-10 on left side (top→bottom), pins 11-20 on right side (bottom→top)
  pins: [
    // LEFT SIDE (pins 1-10, top to bottom)
    {
      num:  1,
      id:   'DVCC',
      lbl:  'VCC',
      name: 'DVCC — Digital Power Supply',
      type: 'PWR',
      funcs: ['PWR'],
      volt: '1.8–3.6V',
      curr: 'N/A',
      note: 'Digital power supply (1.8V–3.6V). Decouple with 100nF ceramic cap placed as close to the pin as possible. Also powers the internal DCO and flash.'
    },
    {
      num:  2,
      id:   'P1.0',
      lbl:  'P1.0',
      name: 'P1.0 / TA0CLK / ACLK / A0 / CA0',
      type: 'GPIO',
      funcs: ['GPIO', 'ADC', 'ACMP', 'TIMER'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 1.0. TimerA0 external clock input (TA0CLK) — not a CCR output, no direct PWM. ACLK output. ADC10 channel A0. Comparator_A+ input CA0.'
    },
    {
      num:  3,
      id:   'P1.1',
      lbl:  'P1.1',
      name: 'P1.1 / TA0.0 / UCA0RXD / UCA0SOMI / A1 / CA1',
      type: 'GPIO',
      funcs: ['GPIO', 'UART', 'SPI', 'ADC', 'ACMP', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 1.1. TimerA0 CCR0 PWM output (TA0.0). USCI_A0 UART RXD or SPI SOMI. ADC10 A1. Comparator CA1.'
    },
    {
      num:  4,
      id:   'P1.2',
      lbl:  'P1.2',
      name: 'P1.2 / TA0.1 / UCA0TXD / UCA0SIMO / A2 / CA2',
      type: 'GPIO',
      funcs: ['GPIO', 'UART', 'SPI', 'ADC', 'ACMP', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 1.2. TimerA0 CCR1 PWM output (TA0.1). USCI_A0 UART TXD or SPI SIMO. ADC10 A2. Comparator CA2.'
    },
    {
      num:  5,
      id:   'P1.3',
      lbl:  'P1.3',
      name: 'P1.3 / ADC10CLK / CAOUT / VREF- / VEREF- / A3 / CA3',
      type: 'GPIO',
      funcs: ['GPIO', 'ADC', 'ACMP', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 1.3. ADC10 internal clock output (ADC10CLK). Comparator output CAOUT. ADC negative reference VREF-/VEREF-. ADC10 A3. Comparator CA3. PWM capability present but shared with critical analog functions — use with care.'
    },
    {
      num:  6,
      id:   'P1.4',
      lbl:  'P1.4',
      name: 'P1.4 / SMCLK / UCB0STE / UCA0CLK / VREF+ / VEREF+ / A4 / CA4 / TCK',
      type: 'GPIO',
      funcs: ['GPIO', 'SPI', 'ADC', 'ACMP', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 1.4. SMCLK output. USCI_B0 STE / USCI_A0 CLK (SPI). ADC positive reference VREF+/VEREF+. ADC10 A4. Comparator CA4. JTAG TCK. PWM capability present but shared with critical functions.'
    },
    {
      num:  7,
      id:   'P1.5',
      lbl:  'P1.5',
      name: 'P1.5 / TA0.0 / UCB0CLK / UCA0STE / A5 / CA5 / TMS',
      type: 'GPIO',
      funcs: ['GPIO', 'SPI', 'ADC', 'ACMP', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 1.5. TimerA0 CCR0 PWM output (TA0.0). USCI_B0 CLK / USCI_A0 STE (SPI). ADC10 A5. Comparator CA5. JTAG TMS.'
    },
    {
      num:  8,
      id:   'P2.0',
      lbl:  'P2.0',
      name: 'P2.0 / TA1.0',
      type: 'GPIO',
      funcs: ['GPIO', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 2.0. TimerA1 CCR0 capture/compare/PWM output (TA1.0).'
    },
    {
      num:  9,
      id:   'P2.1',
      lbl:  'P2.1',
      name: 'P2.1 / TA1.1',
      type: 'GPIO',
      funcs: ['GPIO', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 2.1. TimerA1 CCR1 capture/compare/PWM output (TA1.1).'
    },
    {
      num:  10,
      id:   'P2.2',
      lbl:  'P2.2',
      name: 'P2.2 / TA1.1',
      type: 'GPIO',
      funcs: ['GPIO', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 2.2. TimerA1 CCR1 alternate PWM output (TA1.1).'
    },
    // RIGHT SIDE (pins 11-20, bottom to top — DIPRenderer expects _rightSlot)
    {
      num:  11,
      id:   'P2.3',
      lbl:  'P2.3',
      name: 'P2.3 / TA1.0',
      type: 'GPIO',
      funcs: ['GPIO', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 2.3. TimerA1 CCR0 capture/compare/PWM output (TA1.0).',
      _rightSlot: 9
    },
    {
      num:  12,
      id:   'P2.4',
      lbl:  'P2.4',
      name: 'P2.4 / TA1.2',
      type: 'GPIO',
      funcs: ['GPIO', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 2.4. TimerA1 CCR2 alternate compare/PWM output (TA1.2).',
      _rightSlot: 8
    },
    {
      num:  13,
      id:   'P2.5',
      lbl:  'P2.5',
      name: 'P2.5 / TA1.2',
      type: 'GPIO',
      funcs: ['GPIO', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 2.5. TimerA1 CCR2 capture/compare/PWM output (TA1.2).',
      _rightSlot: 7
    },
    {
      num:  14,
      id:   'P1.6',
      lbl:  'P1.6',
      name: 'P1.6 / TA0.1 / UCB0SOMI / UCB0SCL / A6 / CA6 / TDI / TCLK',
      type: 'GPIO',
      funcs: ['GPIO', 'I2C', 'SPI', 'ADC', 'ACMP', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 1.6. TimerA0 CCR1 PWM output (TA0.1). USCI_B0 SPI SOMI or I2C SCL. ADC10 A6. Comparator CA6. JTAG TDI/TCLK.',
      _rightSlot: 6
    },
    {
      num:  15,
      id:   'P1.7',
      lbl:  'P1.7',
      name: 'P1.7 / CAOUT / UCB0SIMO / UCB0SDA / A7 / CA7 / TDO / TDI',
      type: 'GPIO',
      funcs: ['GPIO', 'I2C', 'SPI', 'ADC', 'ACMP', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: 'Port 1.7. Comparator output (CAOUT). USCI_B0 SPI SIMO or I2C SDA. ADC10 A7. Comparator CA7. PWM capable. JTAG TDO/TDI.',
      _rightSlot: 5
    },
    {
      num:  16,
      id:   'RST',
      lbl:  'RST',
      name: 'RST / NMI / SBWTDIO',
      type: 'RESET',
      funcs: ['RESET', 'GPIO', 'INT'],
      volt: '3.3V',
      curr: 'N/A',
      note: 'Active-low device reset. Non-maskable interrupt input (NMI). Spy-Bi-Wire data I/O (SBWTDIO). Pull up via 47 kΩ resistor to DVCC. Do not leave floating.',
      _rightSlot: 4
    },
    {
      num:  17,
      id:   'TEST',
      lbl:  'TEST',
      name: 'TEST / SBWTCK',
      type: 'RESET',
      funcs: ['RESET'],
      volt: '3.3V',
      curr: 'N/A',
      note: 'JTAG test mode pin / Spy-Bi-Wire clock (SBWTCK). Pull to GND via 100Ω for normal operation. Drive HIGH to enter BSL or debug mode.',
      _rightSlot: 3
    },
    {
      num:  18,
      id:   'XOUT',
      lbl:  'XOUT',
      name: 'XOUT / P2.7',
      type: 'XTAL',
      funcs: ['XTAL', 'GPIO', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: '32.768 kHz crystal oscillator output (LFXT1). Also P2.7 GPIO with PWM capability. Connect a 32.768 kHz watch crystal between XIN and XOUT.',
      _rightSlot: 2
    },
    {
      num:  19,
      id:   'XIN',
      lbl:  'XIN',
      name: 'XIN / P2.6 / TA0.1',
      type: 'XTAL',
      funcs: ['XTAL', 'GPIO', 'TIMER', 'PWM'],
      volt: '3.3V',
      curr: '6 mA',
      note: '32.768 kHz crystal oscillator input (LFXT1). Also P2.6 GPIO and TimerA0 CCR1 PWM output (TA0.1).',
      _rightSlot: 1
    },
    {
      num:  20,
      id:   'DVSS',
      lbl:  'GND',
      name: 'DVSS — Digital Ground',
      type: 'GND',
      funcs: ['GND'],
      volt: '0V',
      curr: 'N/A',
      note: 'Digital ground reference. Connect to system ground plane with low-impedance trace. Decouple DVCC to DVSS with a 100nF ceramic capacitor.',
      _rightSlot: 0
    }
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'P1.0': ['TA0CLK', 'ACLK', 'A0', 'CA0'],
    'P1.1': ['TA0.0', 'UCA0RXD', 'UCA0SOMI', 'A1', 'CA1'],
    'P1.2': ['TA0.1', 'UCA0TXD', 'UCA0SIMO', 'A2', 'CA2'],
    'P1.3': ['ADC10CLK', 'CAOUT', 'VREF-', 'VEREF-', 'A3', 'CA3'],
    'P1.4': ['SMCLK', 'UCB0STE', 'UCA0CLK', 'VREF+', 'VEREF+', 'A4', 'CA4', 'TCK'],
    'P1.5': ['TA0.0', 'UCB0CLK', 'UCA0STE', 'A5', 'CA5', 'TMS'],
    'P1.6': ['TA0.1', 'UCB0SOMI', 'UCB0SCL', 'A6', 'CA6', 'TDI', 'TCLK'],
    'P1.7': ['CAOUT', 'UCB0SIMO', 'UCB0SDA', 'A7', 'CA7', 'TDO', 'TDI'],
    'P2.0': ['TA1.0'],
    'P2.1': ['TA1.1'],
    'P2.2': ['TA1.1'],
    'P2.3': ['TA1.0'],
    'P2.4': ['TA1.2'],
    'P2.5': ['TA1.2'],
    'XIN':  ['P2.6', 'TA0.1'],
    'XOUT': ['P2.7'],
    'RST':  ['NMI', 'SBWTDIO'],
    'TEST': ['SBWTCK']
  },

  // ── QUICK SPECS (right-panel sidebar summary) ─────────────────
  quickSpecs: [
    {label: 'Architecture',  value: '16-bit RISC MSP430',     color: '#e0e5ec'},
    {label: 'Flash',         value: '16 KB',                  color: '#e0e5ec'},
    {label: 'SRAM',          value: '512 Bytes',              color: '#e0e5ec'},
    {label: 'Max Freq',      value: '16 MHz',                 color: '#c8a850'},
    {label: 'Supply',        value: '1.8–3.6V',               color: '#78c878'},
    {label: 'I/O Pins',      value: '16',                     color: '#e0e5ec'},
    {label: 'ADC',           value: '8ch / 10-bit',           color: '#c8a850'},
    {label: 'USCI',          value: 'UART / SPI / I2C',       color: '#4a9aee'},
    {label: 'Timers',        value: 'TimerA0 + TimerA1',      color: '#50c8c8'},
    {label: 'Comparator',    value: 'Comparator_A+ (8ch)',    color: '#ff9944'},
    {label: 'Package',       value: 'DIP-20, TSSOP-20, QFN',  color: '#e0e5ec'}
  ],

  // ── DETAILED SPECS (Datasheet tab table) ──────────────────────
  dsSpecs: [
    {label: 'Architecture',      value: '16-bit RISC, 27 instructions'},
    {label: 'Flash Memory',      value: '16 KB (organized as 8K × 16-bit)'},
    {label: 'SRAM',              value: '512 Bytes'},
    {label: 'Max Frequency',     value: '16 MHz (calibrated DCO)'},
    {label: 'Supply Voltage',    value: '1.8V – 3.6V'},
    {label: 'Active Current',    value: '230 µA @ 1 MHz, 2.2V'},
    {label: 'LPM3 Current',      value: '0.5 µA typical'},
    {label: 'LPM4 Current',      value: '0.1 µA typical'},
    {label: 'I/O Pins',          value: '16 (P1.x + P2.x), all interrupt-capable'},
    {label: 'ADC10',             value: '8 external + 2 internal channels, 200 ksps'},
    {label: 'Timers',            value: 'TimerA0 (3 CCR) + TimerA1 (3 CCR)'},
    {label: 'USCI_A0',           value: 'UART, IrDA, SPI'},
    {label: 'USCI_B0',           value: 'I2C, SPI'},
    {label: 'Comparator_A+',     value: '8 inputs, slope A/D conversion'},
    {label: 'Programming',       value: 'Spy-Bi-Wire (2-pin) and JTAG (4-pin)'},
    {label: 'Watchdog Timer',    value: 'Interval and watchdog modes'},
    {label: 'Operating Temp',    value: '-40 to +85 °C'},
    {label: 'Storage Temp',      value: '-55 to +150 °C'}
  ],

  // ── KEY FEATURES (Datasheet tab list) ────────────────────────
  dsFeatures: [
    'Ultra-low-power: 5 low-power modes (LPM0–LPM4) — LPM3: 0.5 µA, LPM4: 0.1 µA',
    '16-bit RISC CPU, 27 instructions, all registers source/destination',
    'Internal DCO: calibrated 1/8/12/16 MHz (±1% accuracy)',
    '32.768 kHz watch crystal support (LFXT1) with fail-safe operation',
    'USCI_A0: UART, IrDA, SPI; USCI_B0: I2C, SPI — flexible communication',
    'ADC10: 10-bit SAR with 8 external + 2 internal channels, 200 ksps',
    'Comparator_A+ with 8 inputs and slope A/D conversion for resistive sensors',
    'Spy-Bi-Wire (2-pin) and JTAG (4-pin) programming and debug',
    '16 general-purpose I/O pins with individual interrupt capability',
    'TimerA0 and TimerA1: 3 capture/compare registers each, PWM outputs',
    'Brownout reset (BOR) for reliable power-on reset',
    'Watchdog timer with interval and watchdog modes',
    'On-chip temperature sensor (via ADC10)',
    'Typical applications: battery-powered sensors, portable medical devices, energy harvesting, consumer electronics'
  ]
};