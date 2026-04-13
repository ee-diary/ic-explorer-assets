// configs/cp2102-config.js
// Silicon Labs CP2102 — USB to UART Bridge Controller
// Package: QFN-28 (4-sided, 28 pins, 7 per side)
// Pin ordering: LEFT(1-7) → BOTTOM(8-14) → RIGHT(15-21) → TOP(22-28) counter-clockwise

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

  // ── LAYOUT HINT (QFP) ─────────────────────────────────────────
  qfpConfig: {
    pinsPerSide: 7,
    bodySize:    340,
    pinLength:   30,
    pinWidth:    18,
    pinGap:      2
  },

  // ── CUSTOM TYPES ──────────────────────────────────────────────
  // CP2102 has USB and UART as standard types.
  // SUSPEND and WAKEUP are chip-specific control signals not in the standard palette.
  customTypes: {
    SUSP: { c: '#b48aff', bg: 'rgba(180,138,255,.12)', bd: 'rgba(180,138,255,.32)' },
    WAKE: { c: '#50d0c8', bg: 'rgba(80,208,200,.12)',  bd: 'rgba(80,208,200,.32)'  },
    NC:   { c: '#555e6f', bg: 'rgba(85,94,111,.10)',   bd: 'rgba(85,94,111,.28)'   },
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'USB',   label: 'USB',              color: '#4a9aee' },
    { type: 'UART',  label: 'UART',             color: '#cc6888' },
    { type: 'SUSP',  label: 'Suspend / Sleep',  color: '#b48aff' },
    { type: 'WAKE',  label: 'Wake-up',          color: '#50d0c8' },
    { type: 'RESET', label: 'Reset',            color: '#ff9944' },
    { type: 'PWR',   label: 'Power',            color: '#ff6b6b' },
    { type: 'GND',   label: 'GND',              color: '#a8a8a8' },
    { type: 'NC',    label: 'No Connect',       color: '#555e6f' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // QFN-28: 7 pins per side, counter-clockwise.
  // Pin 1 is top-left corner. LEFT side goes top→bottom (pins 1-7),
  // BOTTOM side goes left→right (pins 8-14), RIGHT side goes bottom→top (pins 15-21),
  // TOP side goes right→left (pins 22-28).
  pins: [
    // ── LEFT SIDE (pins 1–7, top → bottom) ───────────────────────
    { num:  1, id: 'GND1',    lbl: 'GND',   name: 'Ground',                               type: 'GND',   funcs: ['GND'],   volt: '0V',    curr: 'N/A',   note: 'Ground reference. Multiple GND pins should all be connected to the PCB ground plane.' },
    { num:  2, id: 'USBDP',   lbl: 'D+',    name: 'USB D+ (Data Plus)',                   type: 'USB',   funcs: ['USB'],   volt: '3.3V',  curr: '10 mA', note: 'USB full-speed differential data line D+. Connect directly to the USB connector D+ pin; a series resistor is not required.' },
    { num:  3, id: 'USBDM',   lbl: 'D−',    name: 'USB D− (Data Minus)',                  type: 'USB',   funcs: ['USB'],   volt: '3.3V',  curr: '10 mA', note: 'USB full-speed differential data line D−. Connect directly to the USB connector D− pin; a series resistor is not required.' },
    { num:  4, id: 'VDD',     lbl: 'VDD',   name: 'USB Bus Power / 3.3 V Supply',         type: 'PWR',   funcs: ['PWR'],   volt: '3.3V',  curr: '100 mA',note: '3.3 V regulated supply. When the device is bus-powered, connect VBUS through a 100 nF decoupling capacitor. The internal LDO generates 3.3 V for the core.' },
    { num:  5, id: 'RSTB',    lbl: '/RST',  name: 'Reset (Active Low)',                   type: 'RESET', funcs: ['RESET'], volt: '3.3V',  curr: 'N/A',   note: 'Active-low device reset. Pull high through a 10 kΩ resistor; drive low to reset the CP2102. An internal pull-up is present, so an external pull-up is optional.' },
    { num:  6, id: 'NC1',     lbl: 'NC',    name: 'No Connect',                           type: 'NC',    funcs: ['NC'],    volt: 'N/A',   curr: 'N/A',   note: 'No internal connection. Leave unconnected or tie to GND.' },
    { num:  7, id: 'SUSPEND',  lbl: 'SUSP',  name: 'Suspend Output',                       type: 'SUSP',  funcs: ['SUSP'],  volt: '3.3V',  curr: '10 mA', note: 'Goes high when the USB host places the device in USB Suspend state. Use to power down external peripherals or enter a low-power mode. Active high, 3.3 V logic.' },

    // ── BOTTOM SIDE (pins 8–14, left → right) ────────────────────
    { num:  8, id: 'SUSPB',   lbl: '/SUSP', name: 'Suspend Output (Active Low)',           type: 'SUSP',  funcs: ['SUSP'],  volt: '3.3V',  curr: '10 mA', note: 'Complement of the SUSPEND signal. Goes low when the device enters USB Suspend state. Allows direct control of an enable-low power switch.' },
    { num:  9, id: 'NC2',     lbl: 'NC',    name: 'No Connect',                           type: 'NC',    funcs: ['NC'],    volt: 'N/A',   curr: 'N/A',   note: 'No internal connection. Leave unconnected or tie to GND.' },
    { num: 10, id: 'NC3',     lbl: 'NC',    name: 'No Connect',                           type: 'NC',    funcs: ['NC'],    volt: 'N/A',   curr: 'N/A',   note: 'No internal connection. Leave unconnected or tie to GND.' },
    { num: 11, id: 'NC4',     lbl: 'NC',    name: 'No Connect',                           type: 'NC',    funcs: ['NC'],    volt: 'N/A',   curr: 'N/A',   note: 'No internal connection. Leave unconnected or tie to GND.' },
    { num: 12, id: 'RI',      lbl: 'RI',    name: 'Ring Indicator (Input)',                type: 'UART',  funcs: ['UART'],  volt: '3.3V',  curr: 'N/A',   note: 'UART modem status input — Ring Indicator. Driven by an external modem or DCE to signal an incoming call. Active low; has an internal pull-up.' },
    { num: 13, id: 'DCD',     lbl: 'DCD',   name: 'Data Carrier Detect (Input)',           type: 'UART',  funcs: ['UART'],  volt: '3.3V',  curr: 'N/A',   note: 'UART modem status input — Data Carrier Detect. Driven by an external modem to indicate a valid connection. Active low; has an internal pull-up.' },
    { num: 14, id: 'DTR',     lbl: 'DTR',   name: 'Data Terminal Ready (Output)',          type: 'UART',  funcs: ['UART'],  volt: '3.3V',  curr: '10 mA', note: 'UART modem control output — Data Terminal Ready. Set by the host software to signal that the terminal is ready. Active low.' },

    // ── RIGHT SIDE (pins 15–21, bottom → top) ─────────────────────
    { num: 15, id: 'DSR',     lbl: 'DSR',   name: 'Data Set Ready (Input)',                type: 'UART',  funcs: ['UART'],  volt: '3.3V',  curr: 'N/A',   note: 'UART modem status input — Data Set Ready. Driven by an external modem to indicate it is powered on and ready. Active low; has an internal pull-up.' },
    { num: 16, id: 'CTS',     lbl: 'CTS',   name: 'Clear to Send (Input)',                 type: 'UART',  funcs: ['UART'],  volt: '3.3V',  curr: 'N/A',   note: 'UART hardware flow control input — Clear to Send. When asserted by the remote device, the CP2102 is allowed to transmit data. Active low.' },
    { num: 17, id: 'RTS',     lbl: 'RTS',   name: 'Request to Send (Output)',              type: 'UART',  funcs: ['UART'],  volt: '3.3V',  curr: '10 mA', note: 'UART hardware flow control output — Request to Send. Asserted by the CP2102 to signal the remote device that it is ready to receive. Active low.' },
    { num: 18, id: 'RXD',     lbl: 'RXD',   name: 'UART Receive Data (Input)',             type: 'UART',  funcs: ['UART'],  volt: '3.3V',  curr: 'N/A',   note: 'UART asynchronous receive data input. Connect to the TXD pin of the target MCU or device. Idle state is logic high. Supports baud rates up to 3 Mbaud.' },
    { num: 19, id: 'TXD',     lbl: 'TXD',   name: 'UART Transmit Data (Output)',           type: 'UART',  funcs: ['UART'],  volt: '3.3V',  curr: '10 mA', note: 'UART asynchronous transmit data output. Connect to the RXD pin of the target MCU or device. Idle state is logic high. Supports baud rates up to 3 Mbaud.' },
    { num: 20, id: 'WAKEUP',  lbl: 'WAKE',  name: 'USB Wakeup Input',                     type: 'WAKE',  funcs: ['WAKE'],  volt: '3.3V',  curr: 'N/A',   note: 'Remote wake-up input. A low pulse on this pin while the device is in USB Suspend mode signals the USB host to resume. Requires the USB remote wake-up feature to be enabled in firmware.' },
    { num: 21, id: 'VPP',     lbl: 'VPP',   name: 'Programming Voltage / NC',             type: 'NC',    funcs: ['NC'],    volt: 'N/A',   curr: 'N/A',   note: 'Factory programming voltage pin. Leave unconnected in normal operation; do not connect to VDD or GND.' },

    // ── TOP SIDE (pins 22–28, right → left) ───────────────────────
    { num: 22, id: 'NC5',     lbl: 'NC',    name: 'No Connect',                           type: 'NC',    funcs: ['NC'],    volt: 'N/A',   curr: 'N/A',   note: 'No internal connection. Leave unconnected or tie to GND.' },
    { num: 23, id: 'NC6',     lbl: 'NC',    name: 'No Connect',                           type: 'NC',    funcs: ['NC'],    volt: 'N/A',   curr: 'N/A',   note: 'No internal connection. Leave unconnected or tie to GND.' },
    { num: 24, id: 'REGIN',   lbl: 'REGIN', name: 'Regulator Input (VBUS)',               type: 'PWR',   funcs: ['PWR'],   volt: '5V',    curr: '100 mA',note: 'Input to the internal 3.3 V LDO regulator. Connect to the USB VBUS line (nominally 5 V). Bypass with a 4.7 µF capacitor to GND close to the pin.' },
    { num: 25, id: 'GND2',    lbl: 'GND',   name: 'Ground',                               type: 'GND',   funcs: ['GND'],   volt: '0V',    curr: 'N/A',   note: 'Ground reference. Connect to the PCB ground plane.' },
    { num: 26, id: 'NC7',     lbl: 'NC',    name: 'No Connect',                           type: 'NC',    funcs: ['NC'],    volt: 'N/A',   curr: 'N/A',   note: 'No internal connection. Leave unconnected or tie to GND.' },
    { num: 27, id: 'NC8',     lbl: 'NC',    name: 'No Connect',                           type: 'NC',    funcs: ['NC'],    volt: 'N/A',   curr: 'N/A',   note: 'No internal connection. Leave unconnected or tie to GND.' },
    { num: 28, id: 'GND3',    lbl: 'GND',   name: 'Ground (Exposed Pad)',                 type: 'GND',   funcs: ['GND'],   volt: '0V',    curr: 'N/A',   note: 'Exposed thermal / ground pad on the underside of the QFN package. Must be soldered to the PCB ground plane for proper electrical and thermal performance.' },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'VDD':    ['3V3 OUT'],
    'RSTB':   ['RST'],
    'SUSPEND': ['GPIO'],
    'SUSPB':  ['GPIO'],
    'WAKEUP': ['GPIO'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Function',   value: 'USB ↔ UART Bridge',    color: '#4a9aee' },
    { label: 'USB Speed',  value: 'Full-Speed (12 Mbps)', color: '#4a9aee' },
    { label: 'Baud Rate',  value: '300 bps – 3 Mbaud',   color: '#c8a850' },
    { label: 'Supply',     value: 'VBUS 4.0–5.25 V',     color: '#ff6b6b' },
    { label: 'I/O Logic',  value: '3.3 V (5 V tolerant)',color: '#78c878' },
    { label: 'Package',    value: 'QFN-28',               color: '#e0e5ec' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'USB Spec',          value: 'USB 2.0 Full-Speed (12 Mbps)' },
    { label: 'Baud Rate Range',   value: '300 bps to 3 Mbaud' },
    { label: 'Data Bits',         value: '5, 6, 7, or 8' },
    { label: 'Parity',            value: 'None, Even, Odd, Mark, Space' },
    { label: 'Stop Bits',         value: '1 or 2' },
    { label: 'Flow Control',      value: 'RTS/CTS hardware, XON/XOFF software' },
    { label: 'VBUS Supply',       value: '4.0 – 5.25 V (USB bus power)' },
    { label: 'Internal LDO',      value: '3.3 V output (REGIN → VDD)' },
    { label: 'I/O Voltage',       value: '3.3 V (5 V tolerant inputs)' },
    { label: 'Operating Temp',    value: '−40 °C to +85 °C' },
    { label: 'Package',           value: 'QFN-28, 5 mm × 5 mm' },
    { label: 'Modem Signals',     value: 'RTS, CTS, DTR, DSR, DCD, RI' },
    { label: 'Driver Support',    value: 'Windows, macOS, Linux (CDC ACM)' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Single-chip USB to UART bridge — no external components required for basic operation',
    'USB 2.0 full-speed (12 Mbps) compliant with integrated USB transceiver',
    'Adjustable baud rate from 300 bps to 3 Mbaud',
    'Supports 5, 6, 7, or 8 data bits with None, Even, Odd, Mark, or Space parity',
    'Hardware flow control via RTS/CTS; software flow control via XON/XOFF',
    'Complete RS-232 modem control signals: RTS, CTS, DTR, DSR, DCD, RI',
    'Internal 3.3 V LDO regulator — powered directly from VBUS',
    '5 V tolerant I/O pins, 3.3 V logic levels',
    'SUSPEND and /SUSPEND outputs for managing system power in USB Suspend state',
    'Remote wake-up support via dedicated WAKEUP input pin',
    'Integrated 1024-byte RX and TX data FIFOs for reliable high-speed transfers',
    'No external crystal, oscillator, or EEPROM required',
    'Works with vendor-supplied VCP (Virtual COM Port) drivers on Windows, macOS, and Linux',
    'Available in QFN-28 (5 mm × 5 mm) surface-mount package',
  ],
};