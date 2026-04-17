  window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'CH340G',
  partMPN:      'CH340G',
  manufacturer: 'WCH (Nanjing Qinheng Microelectronics)',
  package:      'DIP-16',   // SOP-16 physical package; DIP-16 string selects DIPRenderer (2-column layout)
  pinCount:     16,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/CH340G/WCH/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/CH340G/WCH/view-part/?ref=snapeda',
  datasheetURL: 'https://www.wch-ic.com/downloads/CH340DS1_PDF.html',

  // ── LAYOUT HINT (DIP renderer for SOP-16) ────────────────────
  // SOP-16 is a 2-sided package: pins 1–8 on the left, pins 9–16
  // on the right — identical column layout to a DIP. DIPRenderer
  // handles this correctly; QFPRenderer is for 4-sided packages only.
  dipConfig: {
    pinsPerSide: 8,
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 420,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 11, part: 20, pkg: 14, pinCount: 11 },
    labelSize: 11, pinNumSize: 13, yOffset: -30
  },

  // ── CUSTOM TYPE COLOURS ───────────────────────────────────────
  // CH340G is a USB–UART bridge, not a general-purpose MCU.
  // It has chip-specific pin roles (USB D+/D−, UART TX/RX, RS-232
  // handshake lines, crystal, and a chip-select / sleep pin) that
  // do not all map cleanly onto the standard MCU filter set.
  // We define custom types for the RS-232 modem-control lines and
  // the SLEEP/CS control pin.
  customTypes: {
    MODEM: { c: '#50c8a0', bg: 'rgba(80,200,160,.12)',  bd: 'rgba(80,200,160,.32)'  },
    SLEEP: { c: '#c078ff', bg: 'rgba(192,120,255,.11)', bd: 'rgba(192,120,255,.28)' },
  },

  // ── FILTER BUTTONS ────────────────────────────────────────────
  filterButtons: [
    { type: 'USB',   label: 'USB(D+/D−)',      color: '#4a9aee', fontSize:"14px" },
    { type: 'UART',  label: 'UART(TX/RX)',     color: '#cc6888' , fontSize:"14px"},
    { type: 'MODEM', label: 'Modem Control',  color: '#50c8a0' , fontSize:"12px"},
    { type: 'XTAL',  label: 'Crystal/CLK',  color: '#7090a8', fontSize:"13px" },
    { type: 'SLEEP', label: 'SLEEP/CS',     color: '#c078ff' },
    { type: 'PWR',   label: 'VCC/V3',       color: '#ff6b6b' },
    { type: 'GND',   label: 'GND',            color: '#a8a8a8' },
  ],

  // ── PINS ──────────────────────────────────────────────────────
  // SOP-16: pins 1–8 on the left side (top→bottom),
  //         pins 9–16 on the right side (bottom→top, mirrored).
  // Mapped into QFP order: LEFT(1-4) → BOTTOM(5-8) → RIGHT(9-12) → TOP(13-16).
  // DIP pin ordering:
  //   Pins 1–8  → LEFT side,  top → bottom  (no _rightSlot)
  //   Pins 9–16 → RIGHT side, bottom → top  (_rightSlot: 0 = top-right … 7 = bottom-right)
  //
  // CH340G SOP-16 pinout (per WCH datasheet):
  //   Pin  1  GND      Pin 16  VCC
  //   Pin  2  TXD      Pin 15  SLEEP
  //   Pin  3  RXD      Pin 14  RTS
  //   Pin  4  V3       Pin 13  DTR
  //   Pin  5  UD+      Pin 12  DCD
  //   Pin  6  UD−      Pin 11  RI
  //   Pin  7  XI       Pin 10  DSR
  //   Pin  8  XO       Pin  9  CTS
  pins: [
    // ── LEFT side (pins 1–8, top → bottom) ───────────────────
    { num:  1, id: 'GND1',    lbl: 'GND',   name: 'Ground',
      type: 'GND',   funcs: ['GND'],
      volt: '0V',    curr: 'N/A',
      note: 'Ground reference. Connect to the system ground plane.' },

    { num:  2, id: 'TXD',     lbl: 'TXD',   name: 'UART Transmit Data',
      type: 'UART',  funcs: ['UART'],
      volt: '3.3/5V', curr: '4 mA',
      note: 'Serial data output from CH340G to the target device. Logic high when idle. Connect to the RXD pin of the downstream UART device.' },

    { num:  3, id: 'RXD',     lbl: 'RXD',   name: 'UART Receive Data',
      type: 'UART',  funcs: ['UART'],
      volt: '3.3/5V', curr: '4 mA',
      note: 'Serial data input to CH340G from the target device. Connect to the TXD pin of the downstream UART device. Has an internal pull-up resistor.' },

    { num:  4, id: 'V3',      lbl: 'V3',    name: '3.3 V Regulator / Reference',
      type: 'PWR',   funcs: ['PWR'],
      volt: '3.3V',  curr: '4 mA',
      note: 'Internal 3.3 V regulator output. At 5 V supply: decouple with a 100 nF capacitor to GND. At 3.3 V supply: tie directly to VCC and omit the capacitor.' },

    { num:  5, id: 'UD_PLUS', lbl: 'UD+',   name: 'USB Data D+',
      type: 'USB',   funcs: ['USB'],
      volt: '3.3V',  curr: 'N/A',
      note: 'USB differential data line D+. Route to the USB connector D+ line, typically with a 22 Ω series resistor. The chip integrates the required USB termination.' },

    { num:  6, id: 'UD_MINUS',lbl: 'UD−',   name: 'USB Data D−',
      type: 'USB',   funcs: ['USB'],
      volt: '3.3V',  curr: 'N/A',
      note: 'USB differential data line D−. Route to the USB connector D− line with a 22 Ω series resistor.' },

    { num:  7, id: 'XI',      lbl: 'XI',    name: 'Crystal Oscillator Input',
      type: 'XTAL',  funcs: ['XTAL'],
      volt: '3.3V',  curr: 'N/A',
      note: 'Crystal oscillator input. Connect one leg of a 12 MHz crystal here (other leg to XO). Alternatively, drive with an external 12 MHz CMOS clock; leave XO unconnected in that case.' },

    { num:  8, id: 'XO',      lbl: 'XO',    name: 'Crystal Oscillator Output',
      type: 'XTAL',  funcs: ['XTAL'],
      volt: '3.3V',  curr: 'N/A',
      note: 'Crystal oscillator output. Connect the second leg of the 12 MHz crystal here. Leave unconnected when an external clock source drives XI.' },

    // ── RIGHT side (pins 9–16, _rightSlot 0=top-right … 7=bottom-right)
    // Physical order bottom→top: pin 9 (CTS) is bottom-right → _rightSlot: 7
    //                             pin 16 (VCC) is top-right  → _rightSlot: 0
    { num: 16, id: 'VCC',     lbl: 'VCC',   name: 'Power Supply',
      type: 'PWR',   funcs: ['PWR'],
      volt: '5V / 3.3V', curr: '≤30 mA',
      note: 'Main power supply. Accepts 3.3 V or 5 V. Decouple with a 100 nF ceramic capacitor placed as close to the pin as possible.',
      _rightSlot: 0 },

    { num: 15, id: 'SLEEP',   lbl: 'SLEEP', name: 'Sleep / Chip Select',
      type: 'SLEEP', funcs: ['SLEEP'],
      volt: '3.3/5V', curr: 'N/A',
      note: 'Sleep mode control input. Drive low to suspend USB activity and enter low-power mode. Has an internal pull-up — leave unconnected for normal operation.',
      _rightSlot: 1 },

    { num: 14, id: 'RTS',     lbl: 'RTS',   name: 'Request To Send (output)',
      type: 'MODEM', funcs: ['MODEM'],
      volt: '3.3/5V', curr: '4 mA',
      note: 'RS-232 modem control output — Request To Send. Active low. Used for hardware flow control or as a general-purpose output toggled by host software.',
      _rightSlot: 2 },

    { num: 13, id: 'DTR',     lbl: 'DTR',   name: 'Data Terminal Ready (output)',
      type: 'MODEM', funcs: ['MODEM'],
      volt: '3.3/5V', curr: '4 mA',
      note: 'RS-232 modem control output — Data Terminal Ready. Active low. Widely used to auto-reset Arduino and similar targets by connecting to the board reset pin via a 100 nF capacitor.',
      _rightSlot: 3 },

    { num: 12, id: 'DCD',     lbl: 'DCD',   name: 'Data Carrier Detect (input)',
      type: 'MODEM', funcs: ['MODEM'],
      volt: '3.3/5V', curr: 'N/A',
      note: 'RS-232 modem status input — Data Carrier Detect. Active low. Readable by host software via the virtual COM port API. Leave unconnected if modem signals are not required.',
      _rightSlot: 4 },

    { num: 11, id: 'RI',      lbl: 'RI',    name: 'Ring Indicator (input)',
      type: 'MODEM', funcs: ['MODEM'],
      volt: '3.3/5V', curr: 'N/A',
      note: 'RS-232 modem status input — Ring Indicator. Active low. Readable by host software via the virtual COM port API. Leave unconnected if not used.',
      _rightSlot: 5 },

    { num: 10, id: 'DSR',     lbl: 'DSR',   name: 'Data Set Ready (input)',
      type: 'MODEM', funcs: ['MODEM'],
      volt: '3.3/5V', curr: 'N/A',
      note: 'RS-232 modem status input — Data Set Ready. Active low. Readable by host software via the virtual COM port API. Leave unconnected if not used.',
      _rightSlot: 6 },

    { num:  9, id: 'CTS',     lbl: 'CTS',   name: 'Clear To Send (input)',
      type: 'MODEM', funcs: ['MODEM'],
      volt: '3.3/5V', curr: 'N/A',
      note: 'RS-232 modem control input — Clear To Send. Active low. Used by the host to gate transmission. Leave unconnected if hardware flow control is not required.',
      _rightSlot: 7 },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'V3':    ['VREF3.3'],
    'DTR':   ['RESET-OUT'],
    'SLEEP': ['CS'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'Function',   value: 'USB to UART Bridge',   color: '#e0e5ec' },
    { label: 'USB Speed',  value: 'Full-Speed (12 Mbps)', color: '#4a9aee' },
    { label: 'Baud Rate',  value: '50 bps – 2 Mbps',     color: '#c8a850' },
    { label: 'Supply',     value: '3.3 V or 5 V',        color: '#78c878' },
    { label: 'Crystal',    value: '12 MHz external',      color: '#7090a8' },
    { label: 'Interfaces', value: 'UART + RS-232 modem control' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'Manufacturer',     value: 'WCH (Nanjing Qinheng Microelectronics)' },
    { label: 'Package',          value: 'SOP-16 (3.9 mm wide)' },
    { label: 'USB Spec',         value: 'USB 2.0 Full-Speed (12 Mbps)' },
    { label: 'Baud Rate Range',  value: '50 bps to 2,000,000 bps' },
    { label: 'Data Bits',        value: '5 / 6 / 7 / 8' },
    { label: 'Parity',           value: 'Odd, Even, Mark, Space, None' },
    { label: 'Stop Bits',        value: '1 / 1.5 / 2' },
    { label: 'Supply Voltage',   value: '3.3 V or 5 V' },
    { label: 'Supply Current',   value: '≤ 30 mA typical' },
    { label: 'Clock Source',     value: '12 MHz crystal or external CMOS clock' },
    { label: 'Modem Signals',    value: 'CTS, DSR, RI, DCD (in) / RTS, DTR (out)' },
    { label: 'OS Support',       value: 'Windows, macOS, Linux (via CDC driver)' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'USB 2.0 Full-Speed device — no external USB transceiver required',
    'Hardware full-duplex UART with independent 32-byte send and receive FIFOs',
    'Supports baud rates from 50 bps up to 2 Mbps',
    'Complete RS-232 modem handshake signals: RTS, DTR, CTS, DSR, DCD, RI',
    'DTR pin commonly used to auto-reset Arduino and similar targets',
    'Operates from a 3.3 V or 5 V supply; built-in 3.3 V regulator on V3 pin',
    'Requires an external 12 MHz crystal or clock source on XI / XO',
    'SLEEP pin allows host-controlled USB suspend for power saving',
    'Available in SOP-16 package; widely used on USB-to-serial adapter boards',
  ],
};