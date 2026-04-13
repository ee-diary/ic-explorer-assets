// configs/cp2102-config.js
// Silicon Labs CP2102 — USB to UART Bridge Controller
// Package: QFN-28 (4-sided, 28 pins, 7 per side)
//
// Datasheet pin mapping (Silicon Labs CP2102/9 DS, Table 1):
//   Pin  1        → DCD
//   Pin  2        → RI
//   Pin  3        → GND
//   Pin  4        → D+
//   Pin  5        → D−
//   Pin  6        → VDD (3.3 V supply / LDO output)
//   Pin  7        → REGIN (5 V regulator input)
//   Pin  8        → VBUS
//   Pin  9        → RST (open-drain reset)
//   Pin 10        → NC
//   Pin 11        → /SUSPEND (active-low suspend output)
//   Pin 12        → SUSPEND  (active-high suspend output)
//   Pin 13        → NC
//   Pins 14–22    → NC
//   Pin 23        → CTS
//   Pin 24        → RTS
//   Pin 25        → RXD
//   Pin 26        → TXD
//   Pin 27        → DSR
//   Pin 28        → DTR
//
// QFN-28 counter-clockwise pin ordering (pin 1 top-left):
//   LEFT   pins  1– 7  (top → bottom)
//   BOTTOM pins  8–14  (left → right)
//   RIGHT  pins 15–21  (bottom → top)
//   TOP    pins 22–28  (right → left)

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'CP2102',
  partMPN:      'CP2102-GMR',
  manufacturer: 'Silicon Labs',
  package:      'QFN-28',
  pinCount:     28,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/CP2102-GMR/Silicon%20Labs/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/CP2102-GMR/Silicon%20Labs/view-part/?ref=snapeda',
  datasheetURL: 'https://www.silabs.com/documents/public/data-sheets/CP2102-9.pdf',

  // ── LAYOUT HINT (QFN) ─────────────────────────────────────────
  qfnConfig: {
    pinsPerSide:  7,
    bodySize:     380,
    padLength:    28,
    padWidth:     16,
    padGap:       4,
    padInset:     100,    // distance from corner to first pad centre — keeps pads away from corners
    exposedPad:   false,
  },

  // ── CUSTOM TYPES ──────────────────────────────────────────────
  customTypes: {
    SUSP: { c: '#b48aff', bg: 'rgba(180,138,255,.12)', bd: 'rgba(180,138,255,.32)' },
    NC:   { c: '#555e6f', bg: 'rgba(85,94,111,.10)',   bd: 'rgba(85,94,111,.28)'   },
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'USB',   label: 'USB',           color: '#4a9aee' },
    { type: 'UART',  label: 'UART',          color: '#cc6888' },
    { type: 'SUSP',  label: 'Suspend',       color: '#b48aff' },
    { type: 'RESET', label: 'Reset',         color: '#ff9944' },
    { type: 'PWR',   label: 'Power',         color: '#ff6b6b' },
    { type: 'GND',   label: 'GND',           color: '#a8a8a8' },
    { type: 'NC',    label: 'NC',    color: '#555e6f' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // QFN-28 counter-clockwise, 7 pins per side.
  // Pin 1 is at the top-left corner (marked by chamfer on package).
  //
  //  LEFT side   → pins  1– 7  (top → bottom)
  //  BOTTOM side → pins  8–14  (left → right)
  //  RIGHT side  → pins 15–21  (bottom → top)
  //  TOP side    → pins 22–28  (right → left)

  pins: [
    // ── LEFT SIDE (pins 1–7, top → bottom) ───────────────────────
    { num:  1, id: 'DCD',     lbl: 'DCD',    name: 'Data Carrier Detect (Input)',             type: 'UART',  funcs: ['UART'],  volt: '3.3V', curr: 'N/A',    note: 'UART modem status input — Data Carrier Detect. Driven low by an external modem to indicate a valid carrier connection. Active low with internal pull-up.' },
    { num:  2, id: 'RI',      lbl: 'RI',     name: 'Ring Indicator (Input)',                  type: 'UART',  funcs: ['UART'],  volt: '3.3V', curr: 'N/A',    note: 'UART modem status input — Ring Indicator. Driven low by an external modem to signal an incoming call. Active low with internal pull-up.' },
    { num:  3, id: 'GND',     lbl: 'GND',    name: 'Ground',                                 type: 'GND',   funcs: ['GND'],   volt: '0V',   curr: 'N/A',    note: 'Ground reference. Connect to the PCB ground plane.' },
    { num:  4, id: 'USBDP',   lbl: 'D+',     name: 'USB D+ (Data Plus)',                     type: 'USB',   funcs: ['USB'],   volt: '3.3V', curr: '10 mA',  note: 'USB full-speed differential data line D+. Connect directly to the USB connector D+ pin. No external series resistor required.' },
    { num:  5, id: 'USBDM',   lbl: 'D−',     name: 'USB D− (Data Minus)',                    type: 'USB',   funcs: ['USB'],   volt: '3.3V', curr: '10 mA',  note: 'USB full-speed differential data line D−. Connect directly to the USB connector D− pin. No external series resistor required.' },
    { num:  6, id: 'VDD',     lbl: 'VDD',    name: 'Power Supply / LDO Output (3.3 V)',      type: 'PWR',   funcs: ['PWR'],   volt: '3.3V', curr: '100 mA', note: '3.0–3.6 V power supply input and LDO output. When bus-powered, the on-chip regulator outputs 3.3 V here from REGIN. Bypass with 100 nF to GND.' },
    { num:  7, id: 'REGIN',   lbl: 'REGIN',  name: '5 V Regulator Input',                    type: 'PWR',   funcs: ['PWR'],   volt: '5V',   curr: '100 mA', note: 'Input to the internal 3.3 V LDO voltage regulator. Connect to USB VBUS (nominally 5 V). Bypass with 4.7 µF capacitor to GND close to the pin.' },

    // ── BOTTOM SIDE (pins 8–14, left → right) ────────────────────
    { num:  8, id: 'VBUS',    lbl: 'VBUS',   name: 'VBUS Sense Input',                       type: 'USB',   funcs: ['USB'],   volt: '5V',   curr: 'N/A',    note: 'VBUS sense input. Connect to USB VBUS. A 5 V signal here indicates an active USB network connection. Used internally to detect cable attachment.' },
    { num:  9, id: 'RST',     lbl: 'RST',    name: 'Device Reset (Open-Drain)',               type: 'RESET', funcs: ['RESET'], volt: '3.3V', curr: 'N/A',    note: 'Open-drain reset pin. Driven low by the internal POR or VDD monitor on power-up. An external source can reset the device by driving this pin low for at least 15 µs.' },
    { num: 10, id: 'NC2',     lbl: 'NC',     name: 'No Connect',                             type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'No internal connection. Leave unconnected or tie to VDD per datasheet recommendation.' },
    { num: 11, id: 'SUSPB',   lbl: '/SUSP',  name: 'Suspend Output (Active Low)',             type: 'SUSP',  funcs: ['SUSP'],  volt: '3.3V', curr: '10 mA',  note: 'Driven low when the CP2102 enters USB Suspend state. Complement of pin 12. Use to enable a low-side power switch or signal an external MCU.' },
    { num: 12, id: 'SUSPEND', lbl: 'SUSP',   name: 'Suspend Output (Active High)',            type: 'SUSP',  funcs: ['SUSP'],  volt: '3.3V', curr: '10 mA',  note: 'Driven high when the CP2102 enters USB Suspend state. Use to power down external peripherals or put an external MCU into sleep mode.' },
    { num: 13, id: 'NC3',     lbl: 'NC',     name: 'No Connect',                             type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'No internal connection. Leave unconnected or tie to VDD per datasheet recommendation.' },
    { num: 14, id: 'NC3',     lbl: 'NC',     name: 'No Connect',                             type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'No internal connection. Leave unconnected or tie to VDD per datasheet recommendation.' },

    // ── RIGHT SIDE (pins 15–21, bottom → top) ─────────────────────
    { num: 15, id: 'NC4',     lbl: 'NC',     name: 'No Connect',                             type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'No internal connection. Leave unconnected or tie to VDD per datasheet recommendation.' },
    { num: 16, id: 'NC5',     lbl: 'NC',     name: 'No Connect',                             type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'No internal connection. Leave unconnected or tie to VDD per datasheet recommendation.' },
    { num: 17, id: 'NC6',     lbl: 'NC',     name: 'No Connect',                             type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'No internal connection. Leave unconnected or tie to VDD per datasheet recommendation.' },
    { num: 18, id: 'NC1VPP',  lbl: 'NC/VPP', name: 'No Connect / VPP Programming Supply',   type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'Leave unconnected or tie to VDD on CP2102. May be connected to the Vpp programming capacitor to maintain PCB compatibility with the CP2109.' },
    { num: 19, id: 'NC7',     lbl: 'NC',     name: 'No Connect',                             type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'No internal connection. Leave unconnected or tie to VDD per datasheet recommendation.' },
    { num: 20, id: 'NC8',     lbl: 'NC',     name: 'No Connect',                             type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'No internal connection. Leave unconnected or tie to VDD per datasheet recommendation.' },
    { num: 21, id: 'NC9',     lbl: 'NC',     name: 'No Connect',                             type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'No internal connection. Leave unconnected or tie to VDD per datasheet recommendation.' },

    // ── TOP SIDE (pins 22–28, right → left) ───────────────────────
    { num: 22, id: 'NC10',    lbl: 'NC',     name: 'No Connect',                             type: 'NC',    funcs: ['NC'],    volt: 'N/A',  curr: 'N/A',    note: 'No internal connection. Leave unconnected or tie to VDD per datasheet recommendation.' },
    { num: 23, id: 'CTS',     lbl: 'CTS',    name: 'Clear To Send (Input, Active Low)',       type: 'UART',  funcs: ['UART'],  volt: '3.3V', curr: 'N/A',    note: 'UART hardware flow control input — Clear To Send. When asserted low by the remote device, the CP2102 is permitted to transmit data.' },
    { num: 24, id: 'RTS',     lbl: 'RTS',    name: 'Ready To Send (Output, Active Low)',      type: 'UART',  funcs: ['UART'],  volt: '3.3V', curr: '10 mA',  note: 'UART hardware flow control output — Ready To Send. Asserted low by the CP2102 to indicate it is ready to receive data from the remote device.' },
    { num: 25, id: 'RXD',     lbl: 'RXD',    name: 'UART Receive Data (Input)',               type: 'UART',  funcs: ['UART'],  volt: '3.3V', curr: 'N/A',    note: 'UART asynchronous receive data input. Connect to the TXD of the target MCU. Idle state is logic high. Supports baud rates from 300 bps to 3 Mbaud.' },
    { num: 26, id: 'TXD',     lbl: 'TXD',    name: 'UART Transmit Data (Output)',             type: 'UART',  funcs: ['UART'],  volt: '3.3V', curr: '10 mA',  note: 'UART asynchronous transmit data output. Connect to the RXD of the target MCU. Idle state is logic high. Supports baud rates from 300 bps to 3 Mbaud.' },
    { num: 27, id: 'DSR',     lbl: 'DSR',    name: 'Data Set Ready (Input, Active Low)',      type: 'UART',  funcs: ['UART'],  volt: '3.3V', curr: 'N/A',    note: 'UART modem status input — Data Set Ready. Driven low by an external modem or DCE to indicate it is powered on and ready to communicate. Has internal pull-up.' },
    { num: 28, id: 'DTR',     lbl: 'DTR',    name: 'Data Terminal Ready (Output, Active Low)', type: 'UART', funcs: ['UART'],  volt: '3.3V', curr: '10 mA',  note: 'UART modem control output — Data Terminal Ready. Driven low by the CP2102 to signal the remote device that the terminal is ready. Controlled by host software.' },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'VDD':     ['3V3 OUT', 'LDO OUT'],
    'REGIN':   ['5V IN'],
    'RST':     ['POR OUT'],
    'SUSPEND': ['GPIO OUT'],
    'SUSPB':   ['GPIO OUT'],
    'NC1VPP':  ['VPP (CP2109 compat)'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Function',   value: 'USB ↔ UART Bridge',     color: '#4a9aee' },
    { label: 'USB Speed',  value: 'Full-Speed (12 Mbps)',  color: '#4a9aee' },
    { label: 'Baud Rate',  value: '300 bps – 3 Mbaud',    color: '#c8a850' },
    { label: 'VBUS In',    value: '4.0 – 5.25 V',         color: '#ff6b6b' },
    { label: 'VDD Out',    value: '3.0 – 3.6 V',          color: '#78c878' },
    { label: 'Package',    value: 'QFN-28, 5×5 mm',       color: '#e0e5ec' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'USB Spec',        value: 'USB 2.0 Full-Speed (12 Mbps)' },
    { label: 'Baud Rate Range', value: '300 bps to 3 Mbaud' },
    { label: 'Data Bits',       value: '5, 6, 7, or 8' },
    { label: 'Parity',          value: 'None, Even, Odd, Mark, Space' },
    { label: 'Stop Bits',       value: '1 or 2' },
    { label: 'Flow Control',    value: 'RTS/CTS hardware, XON/XOFF software' },
    { label: 'VBUS Input',      value: '4.0 – 5.25 V' },
    { label: 'VDD Supply',      value: '3.0 – 3.6 V (LDO output or external)' },
    { label: 'I/O Voltage',     value: '3.3 V logic' },
    { label: 'Reset',           value: 'Open-drain, POR + VDD monitor' },
    { label: 'Operating Temp',  value: '−40 °C to +85 °C' },
    { label: 'Package',         value: 'QFN-28, 5 mm × 5 mm' },
    { label: 'Modem Signals',   value: 'RTS, CTS, DTR, DSR, DCD, RI' },
    { label: 'Driver Support',  value: 'Windows, macOS, Linux (VCP / CDC ACM)' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Single-chip USB to UART bridge — no external crystal, oscillator, or EEPROM required',
    'USB 2.0 full-speed (12 Mbps) compliant with integrated USB transceiver',
    'Baud rate configurable from 300 bps to 3 Mbaud',
    'Supports 5, 6, 7, or 8 data bits with None, Even, Odd, Mark, or Space parity',
    'Hardware flow control via RTS/CTS; software flow control via XON/XOFF',
    'Full RS-232 modem control signals: RTS, CTS, DTR, DSR, DCD, RI',
    'Internal 3.3 V LDO regulator powered from USB VBUS',
    'SUSPEND and /SUSPEND outputs for external power management during USB Suspend',
    'Open-drain RST pin — functions as POR output and external reset input (≥15 µs low)',
    'VBUS sense input for USB cable attachment detection',
    'Integrated 1024-byte TX and RX data FIFOs',
    'Pin-compatible with CP2109 (NC1/VPP pin provides Vpp capacitor compatibility)',
    'VCP and CDC ACM drivers available for Windows, macOS, and Linux',
    'QFN-28 package, 5 mm × 5 mm footprint',
  ],
};