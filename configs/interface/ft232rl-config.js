 // configs/ft232rl-config.js
// FTDI FT232RL — USB to Serial UART Interface IC
// Package: SSOP-28 (rendered as DIP-28)
// Pin mapping verified against user-provided corrected pinout table

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'FT232RL',
  partMPN:      'FT232RL',
  manufacturer: 'FTDI',
  package:      'DIP-28',
  pinCount:     28,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/FT232RL/FTDI/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/FT232RL/FTDI/view-part/?ref=snapeda',
  datasheetURL: 'https://ftdichip.com/wp-content/uploads/2020/08/DS_FT232R.pdf',

  // ── LAYOUT HINT (DIP-28) ──────────────────────────────────────
  dipConfig: {
    pinsPerSide:  14,
    bodyX:        122, bodyY: 25, bodyW: 260, bodyH: 490,
    pinLength:    34,  pinWidthHalf: 16,
    notchSize:    8,   notchX: 14, notchY: 14,
    textSizes:    { mfr: 14, part: 22, pkg: 14, pinCount: 12 },
    labelSize:    11,  pinNumSize: 14, yOffset: -40,
  },

  // ── CUSTOM TYPES ──────────────────────────────────────────────
  customTypes: {
    MODEM: { c: '#f4a261', bg: 'rgba(244,162,97,.12)',  bd: 'rgba(244,162,97,.35)' },
    CBUS:  { c: '#c078ff', bg: 'rgba(192,120,255,.11)', bd: 'rgba(192,120,255,.28)' },
    CLK:   { c: '#7090a8', bg: 'rgba(112,144,168,.12)', bd: 'rgba(112,144,168,.35)' },
    TEST:  { c: '#a8a8a8', bg: 'rgba(168,168,168,.10)', bd: 'rgba(168,168,168,.28)' },
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'USB',   label: 'USB',              color: '#4a9aee' },
    { type: 'UART',  label: 'UART',      color: '#cc6888' },
    { type: 'MODEM', label: 'Modem Ctrl',     color: '#f4a261', fontSize:'10' },
    { type: 'CLK',   label: 'Clock Out',         color: '#7090a8', fontSize:'12' },
    { type: 'EE',    label: 'EEPROM',            color: '#9898d8' },
    { type: 'RESET', label: 'Reset',             color: '#ff9944' },
    { type: 'TEST',  label: 'Test',              color: '#a8a8a8' },
    { type: 'PWR',   label: 'Power',             color: '#ff6b6b' },
    { type: 'GND',   label: 'GND',               color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // Left side:  pins 1–14  (top → bottom, no _rightSlot)
  // Right side: pins 15–28 (_rightSlot 0=top-right … 13=bottom-right)
  pins: [

    // ── LEFT SIDE (pins 1–14) ─────────────────────────────────
    { num:  1, id: 'TXD',   lbl: 'TXD',   name: 'Transmit Asynchronous Data Output',                type: 'UART',  funcs: ['UART'],  volt: 'VCCIO',       curr: '±6 mA', note: 'UART transmit data output. Serial data is sent from the FT232R to the external UART device. Output logic level is set by the VCCIO supply.' },
    { num:  2, id: 'DTR',   lbl: 'DTR#',  name: 'Data Terminal Ready — Control Output (active low)', type: 'MODEM', funcs: ['MODEM'], volt: 'VCCIO',       curr: '±6 mA', note: 'Data Terminal Ready modem handshake output, active low. Signals the host is ready to communicate. Can be used as a general-purpose output.' },
    { num:  3, id: 'RTS',   lbl: 'RTS#',  name: 'Request To Send — Control Output (active low)',     type: 'MODEM', funcs: ['MODEM'], volt: 'VCCIO',       curr: '±6 mA', note: 'Request To Send modem handshake output, active low. Used for RTS#/CTS# hardware flow control. Indicates the FT232R is ready to receive data.' },
    { num:  4, id: 'VCCIO', lbl: 'VCCIO', name: 'I/O Supply Voltage (UART and CBUS pins)',           type: 'PWR',   funcs: ['PWR'],   volt: '1.8V–5.25V',  curr: '—',     note: 'Supply voltage for UART interface and CBUS I/O pins. Connect to 3V3OUT for 3.3V logic, to VCC for 5V logic, or to an external 1.8V–2.8V rail for low-voltage interfacing.' },
    { num:  5, id: 'RXD',   lbl: 'RXD',   name: 'Receive Asynchronous Data Input',                   type: 'UART',  funcs: ['UART'],  volt: 'VCCIO',       curr: '—',     note: 'UART receive data input. Incoming serial data from the external device is loaded into the internal 128-byte receive FIFO. Input threshold is set by VCCIO.' },
    { num:  6, id: 'RI',    lbl: 'RI#',   name: 'Ring Indicator — Control Input (active low)',        type: 'MODEM', funcs: ['MODEM'], volt: 'VCCIO',       curr: '—',     note: 'Ring Indicator modem status input, active low. When remote wake-up is enabled in the internal EEPROM, a 20 ms active-low pulse resumes the USB host from suspend.' },
    { num:  7, id: 'GND1',  lbl: 'GND',   name: 'Ground',                                            type: 'GND',   funcs: ['GND'],   volt: '0V',          curr: '—',     note: 'Device ground supply pin. Connect directly to the system ground plane.' },
    { num:  8, id: 'NC1',   lbl: 'NC',    name: 'No Connection',                                     type: 'TEST',  funcs: ['TEST'],  volt: '—',           curr: '—',     note: 'No internal connection. Leave unconnected in all designs.' },
    { num:  9, id: 'DSR',   lbl: 'DSR#',  name: 'Data Set Ready — Control Input (active low)',        type: 'MODEM', funcs: ['MODEM'], volt: 'VCCIO',       curr: '—',     note: 'Data Set Ready modem status input, active low. Indicates the connected modem or peripheral is ready to communicate. Part of the DTR#/DSR# handshake pair.' },
    { num: 10, id: 'DCD',   lbl: 'DCD#',  name: 'Data Carrier Detect — Control Input (active low)',   type: 'MODEM', funcs: ['MODEM'], volt: 'VCCIO',       curr: '—',     note: 'Data Carrier Detect modem status input, active low. Signals that a modem has detected a carrier. Can be used as a general-purpose input when modem control is not needed.' },
    { num: 11, id: 'CTS',   lbl: 'CTS#',  name: 'Clear To Send — Control Input (active low)',         type: 'MODEM', funcs: ['MODEM'], volt: 'VCCIO',       curr: '—',     note: 'Clear To Send modem handshake input, active low. Signals the external device is ready to receive data from the FT232R. Used in RTS#/CTS# hardware flow control.' },
    { num: 12, id: 'CBUS4', lbl: 'CBUS4', name: 'Configurable CBUS I/O Pin 4',                       type: 'CBUS',  funcs: ['CBUS'],  volt: 'VCCIO',       curr: '±6 mA', note: 'Configurable CBUS I/O pin programmed via internal EEPROM (FT_PROG). Factory default: TXDEN (RS485 transmit enable). Often reconfigured as RXLED# or TXLED# for activity LEDs. Options: SLEEP#, PWREN#, CLK6–CLK48, GPIO.' },
    { num: 13, id: 'CBUS2', lbl: 'CBUS2', name: 'Configurable CBUS I/O Pin 2',                       type: 'CBUS',  funcs: ['CBUS'],  volt: 'VCCIO',       curr: '±6 mA', note: 'Configurable CBUS I/O pin programmed via internal EEPROM. Often used for RX or TX activity LED drive. Factory default: RXLED# (pulses low when receiving). Options: TXLED#, SLEEP#, PWREN#, TXDEN, CLK6–CLK48, GPIO.' },
    { num: 14, id: 'CBUS3', lbl: 'CBUS3', name: 'Configurable CBUS I/O Pin 3',                       type: 'CBUS',  funcs: ['CBUS'],  volt: 'VCCIO',       curr: '±6 mA', note: 'Configurable CBUS I/O pin programmed via internal EEPROM. Factory default: PWREN# (goes low after USB enumeration; enables external power switch via P-channel MOSFET with 10 kΩ pull-up). Options: TXLED#, RXLED#, SLEEP#, TXDEN, CLK6–CLK48, GPIO.' },

    // ── RIGHT SIDE (pins 15–28) ───────────────────────────────
    { num: 15, id: 'USBDP',   lbl: 'USBDP',  name: 'USB Data Signal Plus (D+)',                          type: 'USB',   funcs: ['USB'],   volt: '3.3V',        curr: '—',     note: 'USB 2.0 full-speed differential data line D+. Integrates an internal series resistor and a 1.5 kΩ pull-up to 3.3V for full-speed device identification. Connect directly to USB connector D+ — no external resistor needed.', _rightSlot:  0 },
    { num: 16, id: 'USBDM',   lbl: 'USBDM',  name: 'USB Data Signal Minus (D−)',                         type: 'USB',   funcs: ['USB'],   volt: '3.3V',        curr: '—',     note: 'USB 2.0 full-speed differential data line D−. Integrates an internal series resistor. Connect directly to USB connector D− — no external resistor needed.',                                                                   _rightSlot:  1 },
    { num: 17, id: 'V3V3OUT', lbl: '3V3OUT', name: '3.3V Output from Internal LDO Regulator',            type: 'PWR',   funcs: ['PWR'],   volt: '3.3V',        curr: '50mA',  note: 'Output of the internal 3.3V LDO regulator. Supplies the USB transceiver and D+ pull-up internally. Can provide up to 50 mA for external circuits. Decouple with 100 nF to GND. Commonly connected to VCCIO for 3.3V I/O logic.',  _rightSlot:  2 },
    { num: 18, id: 'GND2',    lbl: 'GND',    name: 'Ground',                                             type: 'GND',   funcs: ['GND'],   volt: '0V',          curr: '—',     note: 'Device ground supply pin. Connect directly to the system ground plane.',                                                                                                                                                            _rightSlot:  3 },
    { num: 19, id: 'nRESET',  lbl: 'RESET#', name: 'Active-Low Device Reset Input',                      type: 'RESET', funcs: ['RESET'], volt: 'VCC',         curr: '—',     note: 'Active-low asynchronous reset input. Driving low resets the FT232R. If unused, leave unconnected — an internal pull-up holds it high. Can also be pulled up externally to VCC.',                                                    _rightSlot:  4 },
    { num: 20, id: 'VCC',     lbl: 'VCC',    name: 'Main Device Supply Voltage',                         type: 'PWR',   funcs: ['PWR'],   volt: '3.3V–5.25V',  curr: '—',     note: 'Main supply for the FT232R device core. For USB bus-powered designs connect to USB VBUS (5V) via a ferrite bead. Decouple with 100 nF and 4.7 µF capacitors close to pin.',                                                      _rightSlot:  5 },
    { num: 21, id: 'GND3',    lbl: 'GND',    name: 'Ground',                                             type: 'GND',   funcs: ['GND'],   volt: '0V',          curr: '—',     note: 'Device ground supply pin. Connect directly to the system ground plane.',                                                                                                                                                            _rightSlot:  6 },
    { num: 22, id: 'CBUS1',   lbl: 'CBUS1',  name: 'Configurable CBUS I/O Pin 1',                        type: 'CBUS',  funcs: ['CBUS'],  volt: 'VCCIO',       curr: '±6 mA', note: 'Configurable CBUS I/O pin programmed via internal EEPROM. Often used for RXLED# activity LED. Factory default: TXLED# (pulses low while transmitting). Options: RXLED#, SLEEP#, PWREN#, TXDEN, CLK6–CLK48, GPIO.',                    _rightSlot:  7 },
    { num: 23, id: 'CBUS0',   lbl: 'CBUS0',  name: 'Configurable CBUS I/O Pin 0',                        type: 'CBUS',  funcs: ['CBUS'],  volt: 'VCCIO',       curr: '±6 mA', note: 'Configurable CBUS I/O pin programmed via internal EEPROM. Often used for TXLED# activity LED. Factory default: TXDEN (RS485 transmit enable). Options: RXLED#, TXLED#, SLEEP#, PWREN#, CLK6–CLK48, GPIO, BitBang.',                  _rightSlot:  8 },
    { num: 24, id: 'NC2',     lbl: 'NC',     name: 'No Connection',                                      type: 'TEST',  funcs: ['TEST'],  volt: '—',           curr: '—',     note: 'No internal connection. Leave unconnected in all designs.',                                                                                                                                                                             _rightSlot:  9 },
    { num: 25, id: 'AGND',    lbl: 'AGND',   name: 'Analogue Ground — Internal Clock Multiplier',         type: 'GND',   funcs: ['GND'],   volt: '0V',          curr: '—',     note: 'Analogue ground for the internal x4 clock multiplier PLL. Fully integrated supply filtering — no external capacitor required. Connect to the system ground plane.',                                                                  _rightSlot: 10 },
    { num: 26, id: 'TEST',    lbl: 'TEST',   name: 'IC Test Mode — Must be tied to GND',                  type: 'TEST',  funcs: ['TEST'],  volt: '0V',          curr: '—',     note: '⚠️ Must be hard-tied to GND in all designs. Floating or driving high puts the device into IC test mode, causing it to malfunction. No internal pull-down — an external GND connection is mandatory.',                                _rightSlot: 11 },
    { num: 27, id: 'OSCI',    lbl: 'OSCI',   name: 'Oscillator Cell Input (optional)',                    type: 'CLK',   funcs: ['CLK'],   volt: '—',           curr: '—',     note: 'Input to the internal 12 MHz oscillator cell. Leave unconnected for normal operation (built-in oscillator is used). Can be driven by an external 12 MHz crystal or oscillator when the internal oscillator is bypassed.',             _rightSlot: 12 },
    { num: 28, id: 'OSCO',    lbl: 'OSCO',   name: 'Oscillator Cell Output (optional)',                   type: 'CLK',   funcs: ['CLK'],   volt: '—',           curr: '—',     note: 'Output from the internal 12 MHz oscillator cell. Leave unconnected for normal operation. Can be connected to the other leg of an external crystal when bypassing the internal oscillator (see datasheet Section 7.6).',               _rightSlot: 13 },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'CBUS0': ['TXDEN', 'RXLED#', 'TXLED#', 'SLEEP#', 'PWREN#', 'CLK6', 'CLK12', 'CLK24', 'CLK48', 'GPIO'],
    'CBUS1': ['TXLED#', 'RXLED#', 'SLEEP#', 'PWREN#', 'TXDEN', 'CLK6', 'CLK12', 'CLK24', 'CLK48', 'GPIO'],
    'CBUS2': ['RXLED#', 'TXLED#', 'SLEEP#', 'PWREN#', 'TXDEN', 'CLK6', 'CLK12', 'CLK24', 'CLK48', 'GPIO'],
    'CBUS3': ['PWREN#', 'TXLED#', 'RXLED#', 'SLEEP#', 'TXDEN', 'CLK6', 'CLK12', 'CLK24', 'CLK48', 'GPIO'],
    'CBUS4': ['TXDEN', 'SLEEP#', 'TXLED#', 'RXLED#', 'PWREN#', 'CLK6', 'CLK12', 'CLK24', 'CLK48', 'GPIO'],
    'RI':    ['Remote wake-up trigger (20 ms active-low pulse)'],
    'OSCI':  ['External 12 MHz crystal input'],
    'OSCO':  ['External 12 MHz crystal output'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Interface',   value: 'USB 2.0 Full Speed',   color: '#4a9aee' },
    { label: 'Baud Rate',   value: '300 bps – 3 Mbps',     color: '#c8a850' },
    { label: 'VCC Supply',  value: '3.3V – 5.25V',         color: '#78c878' },
    { label: 'I/O Voltage', value: '1.8V – 5.25V (VCCIO)', color: '#78c878' },
    { label: 'Oscillator',  value: 'Internal 12 MHz',      color: '#7090a8' },
    { label: 'CBUS Pins',   value: '5 configurable I/O',   color: '#c078ff' },
    { label: 'Package',     value: 'SSOP-28',               color: '#e0e5ec' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'USB Speed',      value: 'Full Speed (12 Mbps)' },
    { label: 'Baud Rate',      value: '300 bps to 3 Mbps (RS422/485/TTL); 300 bps to 1 Mbps (RS232)' },
    { label: 'Data Bits',      value: '7 or 8' },
    { label: 'Stop Bits',      value: '1 or 2' },
    { label: 'Parity',         value: 'None, Odd, Even, Mark, Space' },
    { label: 'Flow Control',   value: 'RTS/CTS, DTR/DSR, XON/XOFF' },
    { label: 'VCC Supply',     value: '3.3V – 5.25V' },
    { label: 'VCCIO Range',    value: '1.8V – 5.25V' },
    { label: '3V3OUT Current', value: '50 mA max' },
    { label: 'TX Buffer',      value: '256 bytes' },
    { label: 'RX Buffer',      value: '128 bytes' },
    { label: 'EEPROM',         value: '1024-bit internal (USB descriptors + CBUS config)' },
    { label: 'Oscillator',     value: 'Internal 12 MHz (no external crystal required)' },
    { label: 'CBUS Pins',      value: '5 configurable I/O (CBUS0–CBUS4)' },
    { label: 'Operating Temp', value: '−40°C to +85°C' },
    { label: 'Package',        value: 'SSOP-28' },
  ],

  // ── KEY FEATURES ──────────────────────────────────────────────
  dsFeatures: [
    'Single-chip USB 2.0 Full Speed to asynchronous UART — entire USB protocol handled on-chip, no USB firmware required',
    'Internal 12 MHz oscillator eliminates external crystal; optional external crystal supported via OSCI/OSCO (pins 27–28)',
    'VCCIO pin (pin 4) allows UART and CBUS I/O levels from 1.8V to 5.25V for direct multi-voltage interfacing',
    'Fully integrated 1024-bit internal EEPROM stores USB VID, PID, serial number, product string, and CBUS configuration',
    'Five configurable CBUS I/O pins (CBUS0–CBUS4) programmable via FTDI FT_PROG utility — supports TXLED#, RXLED#, PWREN#, SLEEP#, TXDEN, clock outputs, and GPIO',
    'Integrated USB termination resistors and internal 1.5 kΩ D+ pull-up — no external USB passive components required',
    'Full RS-232 modem handshake signals: RTS#, CTS#, DTR#, DSR#, DCD#, RI#',
    '256-byte TX FIFO and 128-byte RX FIFO with buffer-smoothing for high-throughput USB transfers',
    'Integrated 3.3V LDO regulator (3V3OUT, pin 17) supplies up to 50 mA for external logic',
    'TEST pin (pin 26) must be hard-tied to GND — floating or high causes device to enter test mode and malfunction',
    'Royalty-free FTDI VCP and D2XX drivers available for Windows, macOS, Linux, and Android',
  ],
};