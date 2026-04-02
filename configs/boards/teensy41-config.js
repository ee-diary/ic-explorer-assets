// ============================================================
//  configs/teensy41-config.js
//  Teensy 4.1 — IC Explorer config
//  Board: PJRC Teensy 4.1  Processor: NXP iMXRT1062 (600 MHz Cortex-M7)
// ============================================================

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────
  partName:     'Teensy 4.1',
  partMPN:      'TEENSY41',
  manufacturer: 'PJRC',
  package:      'Teensy 4.1',          // matched by renderer-factory.js → Teensy41Renderer
  pinCount:     48,                    // 24 left + 24 right (incl. power pins)

  // ── LINKS ─────────────────────────────────────────────────
  datasheetURL: 'https://www.pjrc.com/store/teensy41.html',
  snapPageURL:  '',
  downloadURL:  '',

  // ── BOARD GEOMETRY (consumed by teensy41-renderer.js) ─────
  boardConfig: {
    width:    220,
    height:   600,
    pinSize:  20,    // PS — square pad side length
    pinY0:    10,    // centre Y of first pin row
    pinYStep: 25,    // vertical spacing between pin rows
    leftX:    10,    // centre X of left column pads
    rightX:   210,   // centre X of right column pads
    rows:     24,    // pins per side
  },

  // ── PINS ──────────────────────────────────────────────────
  //  LEFT column  (cx = leftX,  rows 0-23, top → bottom):
  //    row  0 : GND_L
  //    rows 1-13 : D0–D12
  //    row 14 : 3V3_L
  //    rows 15-23 : D24–D32
  //
  //  RIGHT column (cx = rightX, rows 0-23, top → bottom):
  //    row  0 : VIN
  //    row  1 : GND_R
  //    row  2 : 3V3_R
  //    rows 3-13 : D23 down to D13
  //    row 14 : GND_R2
  //    rows 15-23 : D41 down to D33
  //
  //  side: 'L' | 'R'   row: 0-23
  // ──────────────────────────────────────────────────────────
  pins: [

    // ── LEFT COLUMN ──────────────────────────────────────────
    { id:'GND_L',  lbl:'GND', num:'GND', name:'Ground',                    type:'GND',  funcs:['GND'],                   volt:'0V',       curr:'N/A',   note:'Ground reference pin on the left header.',                                   side:'L', row:0  },
    { id:'D0',     lbl:'0',   num:'0',   name:'Digital 0 / TX6',           type:'GPIO', funcs:['GPIO','UART'],            volt:'3.3V',     curr:'4mA',   note:'General-purpose I/O. UART6 transmit (TX). Also routed to FlexSPI2 SCLK.',   side:'L', row:1  },
    { id:'D1',     lbl:'1',   num:'1',   name:'Digital 1 / RX6',           type:'GPIO', funcs:['GPIO','UART'],            volt:'3.3V',     curr:'4mA',   note:'General-purpose I/O. UART6 receive (RX). Also routed to FlexSPI2 SS0.',     side:'L', row:2  },
    { id:'D2',     lbl:'2',   num:'2',   name:'Digital 2',                 type:'PWM',  funcs:['GPIO','PWM','UART'],      volt:'3.3V',     curr:'4mA',   note:'FlexPWM output. UART5 TX alternate. FlexSPI2 MOSI alternate.',              side:'L', row:3  },
    { id:'D3',     lbl:'3',   num:'3',   name:'Digital 3',                 type:'PWM',  funcs:['GPIO','PWM','UART'],      volt:'3.3V',     curr:'4mA',   note:'FlexPWM output. UART5 RX alternate. FlexSPI2 MISO alternate.',              side:'L', row:4  },
    { id:'D4',     lbl:'4',   num:'4',   name:'Digital 4',                 type:'PWM',  funcs:['GPIO','PWM'],             volt:'3.3V',     curr:'4mA',   note:'FlexPWM 2.2 output. UART1 TX alternate.',                                   side:'L', row:5  },
    { id:'D5',     lbl:'5',   num:'5',   name:'Digital 5',                 type:'PWM',  funcs:['GPIO','PWM'],             volt:'3.3V',     curr:'4mA',   note:'FlexPWM 2.2B output. UART1 RX alternate.',                                  side:'L', row:6  },
    { id:'D6',     lbl:'6',   num:'6',   name:'Digital 6',                 type:'PWM',  funcs:['GPIO','PWM'],             volt:'3.3V',     curr:'4mA',   note:'FlexPWM 2.3B output. UART1 CTS alternate.',                                 side:'L', row:7  },
    { id:'D7',     lbl:'7',   num:'7',   name:'Digital 7 / TX4',           type:'GPIO', funcs:['GPIO','UART','SPI'],      volt:'3.3V',     curr:'4mA',   note:'UART4 transmit (TX). SPI1 clock (SCK) alternate.',                          side:'L', row:8  },
    { id:'D8',     lbl:'8',   num:'8',   name:'Digital 8 / RX4',           type:'GPIO', funcs:['GPIO','UART','SPI'],      volt:'3.3V',     curr:'4mA',   note:'UART4 receive (RX). SPI1 MISO alternate.',                                  side:'L', row:9  },
    { id:'D9',     lbl:'9',   num:'9',   name:'Digital 9',                 type:'PWM',  funcs:['GPIO','PWM','SPI'],       volt:'3.3V',     curr:'4mA',   note:'FlexPWM 2.1 output. SPI1 MOSI alternate.',                                  side:'L', row:10 },
    { id:'D10',    lbl:'10',  num:'10',  name:'Digital 10 / CS0',          type:'SPI',  funcs:['GPIO','SPI','PWM'],       volt:'3.3V',     curr:'4mA',   note:'SPI0 chip select (CS). FlexPWM 4.2 alternate.',                             side:'L', row:11 },
    { id:'D11',    lbl:'11',  num:'11',  name:'Digital 11 / MOSI0',        type:'SPI',  funcs:['GPIO','SPI','PWM'],       volt:'3.3V',     curr:'4mA',   note:'SPI0 master out slave in (MOSI). FlexPWM 4.1 alternate.',                   side:'L', row:12 },
    { id:'D12',    lbl:'12',  num:'12',  name:'Digital 12 / MISO0',        type:'SPI',  funcs:['GPIO','SPI'],             volt:'3.3V',     curr:'4mA',   note:'SPI0 master in slave out (MISO).',                                           side:'L', row:13 },
    { id:'P3V3_L', lbl:'3V3', num:'3V3', name:'3.3V Power Output',         type:'PWR',  funcs:['PWR'],                   volt:'3.3V',     curr:'250mA', note:'3.3V regulated output from the onboard TLV75733P LDO. Max ~250 mA shared total across both 3V3 pins.', side:'L', row:14 },
    { id:'D24',    lbl:'24',  num:'24',  name:'Digital 24 / A10',          type:'ADC',  funcs:['GPIO','ADC','I2C','CAN'], volt:'3.3V',     curr:'4mA',   note:'Analog input A10. CAN2 transmit. I2C2 clock (SCL).',                        side:'L', row:15 },
    { id:'D25',    lbl:'25',  num:'25',  name:'Digital 25 / A11',          type:'ADC',  funcs:['GPIO','ADC','I2C','CAN'], volt:'3.3V',     curr:'4mA',   note:'Analog input A11. CAN2 receive. I2C2 data (SDA).',                          side:'L', row:16 },
    { id:'D26',    lbl:'26',  num:'26',  name:'Digital 26 / A12',          type:'ADC',  funcs:['GPIO','ADC','I2C','CAN'], volt:'3.3V',     curr:'4mA',   note:'Analog input A12. CAN1 transmit. I2C3 clock (SCL).',                        side:'L', row:17 },
    { id:'D27',    lbl:'27',  num:'27',  name:'Digital 27 / A13',          type:'ADC',  funcs:['GPIO','ADC','I2C','CAN'], volt:'3.3V',     curr:'4mA',   note:'Analog input A13. CAN1 receive. I2C3 data (SDA).',                          side:'L', row:18 },
    { id:'D28',    lbl:'28',  num:'28',  name:'Digital 28',                type:'PWM',  funcs:['GPIO','PWM','CAN'],       volt:'3.3V',     curr:'4mA',   note:'FlexPWM 3.1 output. CAN2 TX alternate. I2S SDO.',                           side:'L', row:19 },
    { id:'D29',    lbl:'29',  num:'29',  name:'Digital 29',                type:'PWM',  funcs:['GPIO','PWM'],             volt:'3.3V',     curr:'4mA',   note:'FlexPWM 3.0 output. I2S SDI alternate.',                                    side:'L', row:20 },
    { id:'D30',    lbl:'30',  num:'30',  name:'Digital 30',                type:'GPIO', funcs:['GPIO','SPI','UART'],      volt:'3.3V',     curr:'4mA',   note:'SPI1 chip select 2 (CS2). UART5 TX alternate.',                             side:'L', row:21 },
    { id:'D31',    lbl:'31',  num:'31',  name:'Digital 31',                type:'GPIO', funcs:['GPIO','SPI','UART'],      volt:'3.3V',     curr:'4mA',   note:'SPI1 chip select 3 (CS3). UART5 RX alternate.',                             side:'L', row:22 },
    { id:'D32',    lbl:'32',  num:'32',  name:'Digital 32',                type:'GPIO', funcs:['GPIO','UART','PWM'],      volt:'3.3V',     curr:'4mA',   note:'SD card clock (SD_CLK). UART5 CTS alternate. FlexPWM alternate.',           side:'L', row:23 },

    // ── RIGHT COLUMN (top → bottom as drawn, pin order bottom→top) ───────
    { id:'VIN',    lbl:'VIN', num:'VIN', name:'Voltage In (3.6–5.5V)',     type:'PWR',  funcs:['PWR'],                   volt:'3.6-5.5V', curr:'N/A',   note:'Main power input when not powered via USB-C connector. Accepts 3.6–5.5 V.',  side:'R', row:0  },
    { id:'GND_R',  lbl:'GND', num:'GND', name:'Ground',                    type:'GND',  funcs:['GND'],                   volt:'0V',       curr:'N/A',   note:'Ground reference pin on the right header, top position.',                    side:'R', row:1  },
    { id:'P3V3_R', lbl:'3V3', num:'3V3', name:'3.3V Power Output',         type:'PWR',  funcs:['PWR'],                   volt:'3.3V',     curr:'250mA', note:'3.3V regulated output from the onboard TLV75733P LDO.',                     side:'R', row:2  },
    { id:'D23',    lbl:'23',  num:'23',  name:'Digital 23 / A9',           type:'ADC',  funcs:['GPIO','ADC'],             volt:'3.3V',     curr:'4mA',   note:'Analog input A9. I2S2 receive (RX) alternate.',                             side:'R', row:3  },
    { id:'D22',    lbl:'22',  num:'22',  name:'Digital 22 / A8',           type:'ADC',  funcs:['GPIO','ADC'],             volt:'3.3V',     curr:'4mA',   note:'Analog input A8. I2S2 transmit (TX) alternate.',                            side:'R', row:4  },
    { id:'D21',    lbl:'21',  num:'21',  name:'Digital 21 / A7',           type:'ADC',  funcs:['GPIO','ADC'],             volt:'3.3V',     curr:'4mA',   note:'Analog input A7. I2S2 bit clock (BCLK). UART8 RX.',                        side:'R', row:5  },
    { id:'D20',    lbl:'20',  num:'20',  name:'Digital 20 / A6',           type:'ADC',  funcs:['GPIO','ADC'],             volt:'3.3V',     curr:'4mA',   note:'Analog input A6. I2S2 master clock (MCLK). UART8 TX.',                     side:'R', row:6  },
    { id:'D19',    lbl:'19',  num:'19',  name:'Digital 19 / SCL0',         type:'I2C',  funcs:['GPIO','I2C','ADC'],       volt:'3.3V',     curr:'4mA',   note:'I2C0 clock (SCL), primary bus. Analog A5. Pull-up resistor fitted on board.', side:'R', row:7 },
    { id:'D18',    lbl:'18',  num:'18',  name:'Digital 18 / SDA0',         type:'I2C',  funcs:['GPIO','I2C','ADC'],       volt:'3.3V',     curr:'4mA',   note:'I2C0 data (SDA), primary bus. Analog A4. Pull-up resistor fitted on board.',  side:'R', row:8 },
    { id:'D17',    lbl:'17',  num:'17',  name:'Digital 17 / A3 / SDA1',    type:'ADC',  funcs:['GPIO','ADC','I2C'],       volt:'3.3V',     curr:'4mA',   note:'Analog input A3. I2C1 data (SDA) alternate.',                               side:'R', row:9  },
    { id:'D16',    lbl:'16',  num:'16',  name:'Digital 16 / A2 / SCL1',    type:'ADC',  funcs:['GPIO','ADC','I2C'],       volt:'3.3V',     curr:'4mA',   note:'Analog input A2. I2C1 clock (SCL) alternate.',                              side:'R', row:10 },
    { id:'D15',    lbl:'15',  num:'15',  name:'Digital 15 / A1',           type:'ADC',  funcs:['GPIO','ADC'],             volt:'3.3V',     curr:'4mA',   note:'Analog input A1.',                                                           side:'R', row:11 },
    { id:'D14',    lbl:'14',  num:'14',  name:'Digital 14 / A0',           type:'ADC',  funcs:['GPIO','ADC','SPI'],       volt:'3.3V',     curr:'4mA',   note:'Analog input A0. SPI1 chip select (CS) alternate.',                         side:'R', row:12 },
    { id:'D13',    lbl:'13',  num:'13',  name:'Digital 13 / SCK0 / LED',   type:'SPI',  funcs:['GPIO','SPI'],             volt:'3.3V',     curr:'4mA',   note:'SPI0 clock (SCK). Drives the built-in orange LED.',                         side:'R', row:13 },
    { id:'GND_R2', lbl:'GND', num:'GND', name:'Ground',                    type:'GND',  funcs:['GND'],                   volt:'0V',       curr:'N/A',   note:'Ground reference pin on the right header, mid position.',                    side:'R', row:14 },
    { id:'D41',    lbl:'41',  num:'41',  name:'Digital 41 / A17',          type:'ADC',  funcs:['GPIO','ADC','PWM'],       volt:'3.3V',     curr:'4mA',   note:'Analog input A17. FlexPWM alternate.',                                      side:'R', row:15 },
    { id:'D40',    lbl:'40',  num:'40',  name:'Digital 40',                type:'PWM',  funcs:['GPIO','PWM','UART'],      volt:'3.3V',     curr:'4mA',   note:'FlexPWM output. UART8 RX alternate.',                                        side:'R', row:16 },
    { id:'D39',    lbl:'39',  num:'39',  name:'Digital 39',                type:'PWM',  funcs:['GPIO','PWM','UART'],      volt:'3.3V',     curr:'4mA',   note:'FlexPWM output. UART8 TX alternate.',                                        side:'R', row:17 },
    { id:'D38',    lbl:'38',  num:'38',  name:'Digital 38',                type:'GPIO', funcs:['GPIO','PWM'],             volt:'3.3V',     curr:'4mA',   note:'SD card detect (SD_CD). FlexPWM alternate.',                                side:'R', row:18 },
    { id:'D37',    lbl:'37',  num:'37',  name:'Digital 37',                type:'PWM',  funcs:['GPIO','PWM'],             volt:'3.3V',     curr:'4mA',   note:'SD card data line 3 (SD_D3). FlexPWM alternate.',                           side:'R', row:19 },
    { id:'D36',    lbl:'36',  num:'36',  name:'Digital 36',                type:'PWM',  funcs:['GPIO','PWM'],             volt:'3.3V',     curr:'4mA',   note:'SD card data line 2 (SD_D2). FlexPWM alternate.',                           side:'R', row:20 },
    { id:'D35',    lbl:'35',  num:'35',  name:'Digital 35',                type:'PWM',  funcs:['GPIO','PWM'],             volt:'3.3V',     curr:'4mA',   note:'SD card data line 1 (SD_D1). FlexPWM alternate.',                           side:'R', row:21 },
    { id:'D34',    lbl:'34',  num:'34',  name:'Digital 34',                type:'PWM',  funcs:['GPIO','PWM'],             volt:'3.3V',     curr:'4mA',   note:'SD card data line 0 (SD_D0). FlexPWM alternate.',                           side:'R', row:22 },
    { id:'D33',    lbl:'33',  num:'33',  name:'Digital 33',                type:'GPIO', funcs:['GPIO','UART','PWM'],      volt:'3.3V',     curr:'4mA',   note:'SD card command (SD_CMD). UART5 RTS alternate. FlexPWM alternate.',          side:'R', row:23 },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────
  altFuncs: {
    'D0':  ['UART6_TX','FlexSPI2_A_SCLK'],
    'D1':  ['UART6_RX','FlexSPI2_A_SS0'],
    'D2':  ['UART5_TX','FlexSPI2_A_MOSI','PWM'],
    'D3':  ['UART5_RX','FlexSPI2_A_MISO','PWM'],
    'D4':  ['FlexPWM2.2','UART1_TX'],
    'D5':  ['FlexPWM2.2B','UART1_RX'],
    'D6':  ['FlexPWM2.3B','UART1_CTS'],
    'D7':  ['UART4_TX','SPI1_SCK'],
    'D8':  ['UART4_RX','SPI1_MISO'],
    'D9':  ['FlexPWM2.1','SPI1_MOSI'],
    'D10': ['SPI0_CS','FlexPWM4.2'],
    'D11': ['SPI0_MOSI','FlexPWM4.1'],
    'D12': ['SPI0_MISO'],
    'D13': ['SPI0_SCK','LED_BUILTIN'],
    'D14': ['ADC0','SPI1_CS','UART1_RTS'],
    'D15': ['ADC1','UART1_RTS'],
    'D16': ['ADC2','I2C1_SCL'],
    'D17': ['ADC3','I2C1_SDA'],
    'D18': ['I2C0_SDA','ADC4'],
    'D19': ['I2C0_SCL','ADC5'],
    'D20': ['ADC6','I2S2_MCLK','UART8_TX'],
    'D21': ['ADC7','I2S2_BCLK','UART8_RX'],
    'D22': ['ADC8','I2S2_TX'],
    'D23': ['ADC9','I2S2_RX'],
    'D24': ['ADC10','CAN2_TX','I2C2_SCL'],
    'D25': ['ADC11','CAN2_RX','I2C2_SDA'],
    'D26': ['ADC12','CAN1_TX','I2C3_SCL'],
    'D27': ['ADC13','CAN1_RX','I2C3_SDA'],
    'D28': ['FlexPWM3.1','I2S_SDO','CAN2_TX'],
    'D29': ['FlexPWM3.0','I2S_SDI'],
    'D30': ['SPI1_CS2','UART5_TX'],
    'D31': ['SPI1_CS3','UART5_RX'],
    'D32': ['SD_CLK','UART5_CTS','FlexPWM'],
    'D33': ['SD_CMD','UART5_RTS','FlexPWM'],
    'D34': ['SD_D0','FlexPWM'],
    'D35': ['SD_D1','FlexPWM'],
    'D36': ['SD_D2','FlexPWM'],
    'D37': ['SD_D3','FlexPWM'],
    'D38': ['SD_CD','FlexPWM'],
    'D39': ['FlexPWM','UART8_TX'],
    'D40': ['FlexPWM','UART8_RX'],
    'D41': ['ADC17','FlexPWM'],
  },

  // ── ON-BOARD CHIPS (unique to Teensy — shown in component panel) ──
  chips: [
    { id:'iMXRT1062', name:'iMXRT1062',  full:'NXP i.MX RT1062 Crossover MCU',      type:'MCU',    specs:[['Clock','600 MHz'],['Core','Cortex-M7'],['RAM','1 MB'],['Package','BGA']],       note:'Main processor. High-performance crossover MCU with real-time functionality.' },
    { id:'MKL02',     name:'MKL02',      full:'Kinetis KL02 (Bootloader MCU)',        type:'MCU',    specs:[['Clock','48 MHz'],['Core','Cortex-M0+'],['Function','Bootloader/USB']],          note:'Handles bootloading and USB-to-serial communication for the iMXRT.' },
    { id:'W25Q128',   name:'W25Q128',    full:'16 MB Serial NOR Flash',               type:'FLASH',  specs:[['Capacity','16 MB'],['Interface','SPI / QPI'],['Speed','133 MHz']],              note:'External flash memory for program and data storage.' },
    { id:'DP83825I',  name:'DP83825I',   full:'10/100 Mbps Ethernet PHY',             type:'PHY',    specs:[['Speed','10/100 Mbps'],['Interface','RMII'],['Package','QFN-32']],               note:'Physical layer transceiver for Ethernet connectivity.' },
    { id:'TPD3S014',  name:'TPD3S014',   full:'USB Power Switch & ESD Protection',    type:'SWITCH', specs:[['Current','1.5 A'],['ESD Prot','±15 kV'],['Package','SOT-23-6']],               note:'Current-limit switch and ESD protection for the USB-C port.' },
    { id:'TLV75733P', name:'TLV75733P',  full:'3.3V Low-Dropout Regulator (1 A)',     type:'LDO',    specs:[['Output','3.3 V'],['Max Curr','1 A'],['Dropout','225 mV']],                      note:'Regulates board power to 3.3 V for all logic and I/O.' },
    { id:'DMG2305UX', name:'DMG2305UX',  full:'P-Channel MOSFET',                     type:'MOSFET', specs:[['Vds','-20 V'],['Id','-4.2 A'],['Package','SOT-23']],                           note:'Used for power switching and reverse polarity protection.' },
    { id:'RESET',     name:'RESET SW',   full:'Program / Reset Pushbutton',           type:'SWITCH', specs:[['Function','Reset / Program'],['Type','Tactile Switch'],['Style','SMD']],        note:'Press to put Teensy into program mode or perform a hard reset.' },
    { id:'USB_HOST_HDR', name:'USB Host',full:'USB Host Header (5-pin)',              type:'HEADER', specs:[['Pins','5-pin'],['Spacing','2.54 mm'],['Signal','D+/D-/GND/5V']],               note:'Connects an external USB socket for hosting HID or mass-storage devices.' },
    { id:'ETH_HDR',   name:'Eth Header', full:'Ethernet Header (6-pin)',              type:'HEADER', specs:[['Pins','2×3 (6)'],['Speed','10/100 Mbps'],['Type','Through-Hole']],              note:'Direct connections to Ethernet jack. Requires the DP83825I PHY chip.' },
    { id:'EXP_HDR',   name:'Exp Header', full:'Expansion Header (5-pin)',             type:'HEADER', specs:[['Pins','5-pin'],['Spacing','2.54 mm'],['Location','Between rows 27–38']],        note:'Auxiliary signal pins located between the two main pin rows.' },
  ],

  // ── QUICK SPECS ───────────────────────────────────────────
  quickSpecs: [
    { label:'CPU',        value:'NXP iMXRT1062',       color:'#d4d4d4' },
    { label:'Core',       value:'Cortex-M7 @ 600 MHz', color:'#78c878' },
    { label:'Flash',      value:'16 MB (external)',     color:'#d4a017' },
    { label:'RAM',        value:'1 MB',                 color:'#d4a017' },
    { label:'Supply',     value:'USB-C or 3.6–5.5V',   color:'#ff6b6b' },
    { label:'I/O Voltage',value:'3.3V only',            color:'#c8a850' },
    { label:'PWM Pins',   value:'35 capable',           color:'#50c8c8' },
    { label:'Analog',     value:'18-ch 12-bit ADC',     color:'#c8a850' },
    { label:'Ethernet',   value:'10/100 Mbps',          color:'#50c8a0' },
    { label:'USB',        value:'USB-C (FS/HS device)', color:'#40d0c0' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────
  dsSpecs: [
    { label:'Processor',           value:'NXP i.MX RT1062 (IMXRT1062DVJ6B)' },
    { label:'Architecture',        value:'ARM Cortex-M7, 32-bit' },
    { label:'Clock Speed',         value:'600 MHz (overclock to 816+ MHz possible)' },
    { label:'RAM',                 value:'1 MB (512 kB tightly coupled + 512 kB general)' },
    { label:'External Flash',      value:'16 MB W25Q128 (QSPI)' },
    { label:'Digital I/O Pins',    value:'42 (pins 0–41)' },
    { label:'Analog Inputs',       value:'18 channels, 12-bit ADC' },
    { label:'PWM Outputs',         value:'35 pins capable of FlexPWM / QuadTimer' },
    { label:'UART Ports',          value:'8 hardware serial ports' },
    { label:'SPI Ports',           value:'3 hardware SPI buses' },
    { label:'I2C Ports',           value:'3 hardware I2C buses' },
    { label:'CAN Bus',             value:'3 × CAN FD (CAN1, CAN2, CAN3)' },
    { label:'USB',                 value:'USB-C, Full-Speed + High-Speed device' },
    { label:'Ethernet',            value:'10/100 Mbps via DP83825I PHY' },
    { label:'SD Card',             value:'Built-in MicroSD slot (4-bit SDIO)' },
    { label:'I/O Voltage',         value:'3.3V only — not 5V tolerant' },
    { label:'Supply Voltage',      value:'USB-C or VIN 3.6–5.5V' },
    { label:'3.3V Output',         value:'~250 mA combined (TLV75733P LDO, max 1 A)' },
    { label:'Dimensions',          value:'61.0 × 17.8 mm' },
  ],

  // ── KEY FEATURES ─────────────────────────────────────────
  dsFeatures: [
    '600 MHz ARM Cortex-M7 with double-precision FPU and DSP instructions',
    '1 MB RAM split into tightly coupled and general-purpose banks for deterministic access',
    '16 MB external QSPI flash (W25Q128) for program and data storage',
    '42 digital I/O pins, all capable of GPIO; 35 support FlexPWM or QuadTimer PWM',
    '18-channel 12-bit ADC with low noise front end',
    '8 hardware UARTs, 3 SPI buses, 3 I2C buses, 3 CAN FD controllers',
    'Built-in 10/100 Mbps Ethernet via DP83825I PHY — no external module needed',
    'Built-in MicroSD card slot with 4-bit SDIO for high-speed data logging',
    'USB-C connector with Full-Speed and High-Speed device capability',
    '5-pin USB Host header for connecting HID keyboards, mice, or mass-storage devices',
    'All I/O pins are 3.3V only — use level-shifters when interfacing with 5V devices',
    'Compatible with the Arduino IDE via Teensyduino add-on from PJRC',
  ],

};
