/**
 * IC Explorer — Chip Configuration
 * Chip:         STM32F103C8T6
 * Package:      LQFP-48
 * Manufacturer: STMicroelectronics
 *
 * Drop this file into:  configs/stm32f103c8t6-config.js
 * Load it on your page BEFORE the engine scripts.
 *
 * Pin layout (LQFP-48, counter-clockwise from top-left):
 *   Left   → pins  1–12  (top → bottom)
 *   Bottom → pins 13–24  (left → right)
 *   Right  → pins 25–36  (bottom → top)
 *   Top    → pins 37–48  (right → left)
 */

window.IC_CONFIG = {

  /* ── Identity ─────────────────────────────────────────── */
  partName:     'STM32F103C8T6',
  partMPN:      'STM32F103C8T6',
  manufacturer: 'STMicroelectronics',
  package:      'LQFP-48',
  pinCount:     48,

  /* ── External links ────────────────────────────────────── */
  snapPageURL:  'https://www.snapeda.com/parts/STM32F103C8T6/STMicroelectronics/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/STM32F103C8T6/STMicroelectronics/view-part/?ref=snapeda',
  datasheetURL: 'https://www.st.com/resource/en/datasheet/stm32f103c8.pdf',

  /* ── QFP layout hint (used by QFPRenderer) ─────────────
   *  pinsPerSide: how many pins on each of the 4 sides
   *  The renderer reads this so it spaces pins correctly.
   * ──────────────────────────────────────────────────────── */
  qfpConfig: {
    pinsPerSide: 12,          // 4 × 12 = 48 pins total
    bodySize:    400,         // SVG viewBox units (square)
    pinLength:   28,
    pinWidth:    20,
    pinGap:      2            // gap between adjacent pins
  },

  /* ── Pin definitions ───────────────────────────────────
   *
   *  Each pin must have:
   *    num   – physical pin number (1–48)
   *    id    – unique string id used for selection / lookup
   *    lbl   – short label shown on the IC body
   *    name  – full descriptive name shown in detail panel
   *    type  – primary type: GPIO | ADC | PWR | GND | UART |
   *            SPI | I2C | USB | CAN | PWM | TIMER | XTAL |
   *            RESET | JTAG | BOOT | INT
   *    funcs – array of function tags (drives filter buttons)
   *    volt  – operating voltage string
   *    curr  – max current string
   *    note  – human-readable note shown in detail panel
   *
   *  Side assignment (LQFP counter-clockwise, pin 1 top-left):
   *    Pins  1-12  → LEFT   side, top → bottom
   *    Pins 13-24  → BOTTOM side, left → right
   *    Pins 25-36  → RIGHT  side, bottom → top
   *    Pins 37-48  → TOP    side, right → left
   * ──────────────────────────────────────────────────────── */
  pins: [

    /* ── LEFT SIDE  (pins 1–12, top → bottom) ─────────── */
    {num:1,  id:'VBAT',    lbl:'VBAT',   name:'VBAT — Backup Battery Supply',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Backup domain power supply for RTC and backup registers. Connect to VDD if RTC / backup not used.'},

    {num:2,  id:'PC13',    lbl:'PC13',   name:'PC13 / TAMPER-RTC',
     type:'GPIO',  funcs:['GPIO','INT'],
     volt:'3.3V',  curr:'3mA',
     note:'General-purpose I/O. TAMPER detection input / RTC output. Output speed limited to 2 MHz / 3 mA max.'},

    {num:3,  id:'PC14',    lbl:'PC14',   name:'PC14 / OSC32_IN',
     type:'XTAL',  funcs:['GPIO','XTAL'],
     volt:'3.3V',  curr:'3mA',
     note:'Low-speed external oscillator input (32.768 kHz LSE). When used as GPIO, max output is 3 mA.'},

    {num:4,  id:'PC15',    lbl:'PC15',   name:'PC15 / OSC32_OUT',
     type:'XTAL',  funcs:['GPIO','XTAL'],
     volt:'3.3V',  curr:'3mA',
     note:'Low-speed external oscillator output. When used as GPIO, max output is 3 mA.'},

    {num:5,  id:'OSC_IN',  lbl:'OSCIN',  name:'OSC_IN / PD0',
     type:'XTAL',  funcs:['XTAL','GPIO'],
     volt:'3.3V',  curr:'N/A',
     note:'High-speed external oscillator input (HSE, 4–16 MHz). Can be remapped to PD0 GPIO when HSE bypassed.'},

    {num:6,  id:'OSC_OUT', lbl:'OSCOUT', name:'OSC_OUT / PD1',
     type:'XTAL',  funcs:['XTAL','GPIO'],
     volt:'3.3V',  curr:'N/A',
     note:'High-speed external oscillator output. Can be remapped to PD1 GPIO.'},

    {num:7,  id:'NRST',    lbl:'NRST',   name:'NRST — System Reset',
     type:'RESET', funcs:['RESET'],
     volt:'3.3V',  curr:'N/A',
     note:'Active-LOW system reset. Has internal 40 kΩ pull-up and input filter. Connect 100 nF cap to GND.'},

    {num:8,  id:'VSSA',    lbl:'VSSA',   name:'VSSA — Analog Ground',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Analog ground reference for ADC, DAC, and PLL. Must be at 0 V. Decouple with 1 µF + 10 nF to VDDA.'},

    {num:9,  id:'VDDA',    lbl:'VDDA',   name:'VDDA — Analog Supply',
     type:'PWR',   funcs:['PWR'],
     volt:'2.4–3.6V', curr:'N/A',
     note:'Analog power supply for ADC, RC oscillator, and PLL. Decouple with 1 µF + 10 nF ceramic caps.'},

    {num:10, id:'PA0',     lbl:'PA0',    name:'PA0 / WKUP / ADC12_IN0',
     type:'ADC',   funcs:['GPIO','ADC','TIMER','UART'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC12_IN0 (12-bit ADC channel 0). TIM2_CH1_ETR. USART2_CTS. WKUP wakeup from standby pin.'},

    {num:11, id:'PA1',     lbl:'PA1',    name:'PA1 / ADC12_IN1 / TIM2_CH2',
     type:'ADC',   funcs:['GPIO','ADC','TIMER','UART'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC12_IN1. TIM2_CH2 PWM/capture. USART2_RTS.'},

    {num:12, id:'PA2',     lbl:'PA2',    name:'PA2 / ADC12_IN2 / USART2_TX',
     type:'UART',  funcs:['GPIO','ADC','UART','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC12_IN2. USART2_TX. TIM2_CH3 PWM/capture.'},

    /* ── BOTTOM SIDE  (pins 13–24, left → right) ──────── */
    {num:13, id:'PA3',     lbl:'PA3',    name:'PA3 / ADC12_IN3 / USART2_RX',
     type:'UART',  funcs:['GPIO','ADC','UART','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC12_IN3. USART2_RX. TIM2_CH4 PWM/capture.'},

    {num:14, id:'PA4',     lbl:'PA4',    name:'PA4 / ADC12_IN4 / SPI1_NSS',
     type:'SPI',   funcs:['GPIO','ADC','SPI','UART'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC12_IN4. SPI1_NSS chip-select. USART2_CK synchronous clock.'},

    {num:15, id:'PA5',     lbl:'PA5',    name:'PA5 / ADC12_IN5 / SPI1_SCK',
     type:'SPI',   funcs:['GPIO','ADC','SPI'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC12_IN5. SPI1_SCK serial clock output/input.'},

    {num:16, id:'PA6',     lbl:'PA6',    name:'PA6 / ADC12_IN6 / SPI1_MISO',
     type:'SPI',   funcs:['GPIO','ADC','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC12_IN6. SPI1_MISO. TIM3_CH1 PWM. TIM1_BKIN break input.'},

    {num:17, id:'PA7',     lbl:'PA7',    name:'PA7 / ADC12_IN7 / SPI1_MOSI',
     type:'SPI',   funcs:['GPIO','ADC','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC12_IN7. SPI1_MOSI. TIM3_CH2 PWM. TIM1_CH1N complementary output.'},

    {num:18, id:'PB0',     lbl:'PB0',    name:'PB0 / ADC12_IN8 / TIM3_CH3',
     type:'ADC',   funcs:['GPIO','ADC','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC12_IN8. TIM3_CH3 PWM/capture. TIM1_CH2N complementary output.'},

    {num:19, id:'PB1',     lbl:'PB1',    name:'PB1 / ADC12_IN9 / TIM3_CH4',
     type:'ADC',   funcs:['GPIO','ADC','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC12_IN9. TIM3_CH4 PWM/capture. TIM1_CH3N complementary output.'},

    {num:20, id:'PB2',     lbl:'PB2',    name:'PB2 / BOOT1',
     type:'BOOT',  funcs:['GPIO','BOOT'],
     volt:'3.3V',  curr:'25mA',
     note:'BOOT1 boot mode configuration pin. With BOOT0 selects boot source at reset. Also general-purpose I/O.'},

    {num:21, id:'PB10',    lbl:'PB10',   name:'PB10 / I2C2_SCL / USART3_TX',
     type:'I2C',   funcs:['GPIO','I2C','UART','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'I2C2_SCL open-drain clock. USART3_TX. TIM2_CH3 (remap).'},

    {num:22, id:'PB11',    lbl:'PB11',   name:'PB11 / I2C2_SDA / USART3_RX',
     type:'I2C',   funcs:['GPIO','I2C','UART'],
     volt:'3.3V',  curr:'25mA',
     note:'I2C2_SDA open-drain data. USART3_RX.'},

    {num:23, id:'VSS_1',   lbl:'VSS',    name:'VSS — Digital Ground 1',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference. Decouple VDD with 100 nF ceramic close to this pin.'},

    {num:24, id:'VDD_1',   lbl:'VDD',    name:'VDD — Digital Supply 1',
     type:'PWR',   funcs:['PWR'],
     volt:'2.0–3.6V', curr:'N/A',
     note:'Main digital power supply. Decouple with 100 nF + 10 µF per VDD/VSS pair.'},

    /* ── RIGHT SIDE  (pins 25–36, bottom → top) ───────── */
    {num:25, id:'PB12',    lbl:'PB12',   name:'PB12 / SPI2_NSS / I2S2_WS',
     type:'SPI',   funcs:['GPIO','SPI','I2C','UART','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI2_NSS / I2S2_WS word-select. I2C2_SMBA. USART3_CK. TIM1_BKIN break input.'},

    {num:26, id:'PB13',    lbl:'PB13',   name:'PB13 / SPI2_SCK / I2S2_CK',
     type:'SPI',   funcs:['GPIO','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI2_SCK / I2S2_CK serial clock. TIM1_CH1N complementary PWM output.'},

    {num:27, id:'PB14',    lbl:'PB14',   name:'PB14 / SPI2_MISO',
     type:'SPI',   funcs:['GPIO','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI2_MISO master-in / slave-out. TIM1_CH2N complementary PWM output.'},

    {num:28, id:'PB15',    lbl:'PB15',   name:'PB15 / SPI2_MOSI / I2S2_SD',
     type:'SPI',   funcs:['GPIO','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI2_MOSI / I2S2_SD data. TIM1_CH3N complementary PWM output.'},

    {num:29, id:'PA8',     lbl:'PA8',    name:'PA8 / TIM1_CH1 / MCO',
     type:'PWM',   funcs:['GPIO','PWM','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'TIM1_CH1 advanced PWM. MCO Master Clock Output (system/PLL clock output for external use). USART1_CK.'},

    {num:30, id:'PA9',     lbl:'PA9',    name:'PA9 / USART1_TX / TIM1_CH2',
     type:'UART',  funcs:['GPIO','UART','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'USART1_TX serial transmit. TIM1_CH2 advanced PWM.'},

    {num:31, id:'PA10',    lbl:'PA10',   name:'PA10 / USART1_RX / TIM1_CH3',
     type:'UART',  funcs:['GPIO','UART','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'USART1_RX serial receive. TIM1_CH3 advanced PWM. Internal pull-up by default.'},

    {num:32, id:'PA11',    lbl:'PA11',   name:'PA11 / USB_DM / CAN_RX',
     type:'USB',   funcs:['GPIO','USB','CAN','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'USB Full-Speed D- differential data line. CAN_RX. TIM1_CH4. USART1_CTS. Cannot use as GPIO and USB simultaneously.'},

    {num:33, id:'PA12',    lbl:'PA12',   name:'PA12 / USB_DP / CAN_TX',
     type:'USB',   funcs:['GPIO','USB','CAN','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'USB Full-Speed D+ differential data line. CAN_TX. TIM1_ETR. USART1_RTS. Cannot use as GPIO and USB simultaneously.'},

    {num:34, id:'PA13',    lbl:'PA13',   name:'PA13 / JTMS-SWDIO',
     type:'JTAG',  funcs:['GPIO','JTAG'],
     volt:'3.3V',  curr:'25mA',
     note:'JTAG TMS / SWD Data I/O. Internal pull-up. Do not repurpose as GPIO while using SWD debugging.'},

    {num:35, id:'VSS_2',   lbl:'VSS',    name:'VSS — Digital Ground 2',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 2.'},

    {num:36, id:'VDD_2',   lbl:'VDD',    name:'VDD — Digital Supply 2',
     type:'PWR',   funcs:['PWR'],
     volt:'2.0–3.6V', curr:'N/A',
     note:'Main digital power supply 2. Decouple with 100 nF ceramic.'},

    /* ── TOP SIDE  (pins 37–48, right → left) ─────────── */
    {num:37, id:'PA14',    lbl:'PA14',   name:'PA14 / JTCK-SWCLK',
     type:'JTAG',  funcs:['GPIO','JTAG'],
     volt:'3.3V',  curr:'25mA',
     note:'JTAG TCK / SWD Clock. Internal pull-down. Avoid repurposing when using SWD/JTAG.'},

    {num:38, id:'PA15',    lbl:'PA15',   name:'PA15 / JTDI / SPI1_NSS',
     type:'JTAG',  funcs:['GPIO','JTAG','SPI','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'JTAG TDI. SPI1_NSS (remap). TIM2_CH1_ETR (remap). Internal pull-up. Disable JTAG to use as GPIO.'},

    {num:39, id:'PB3',     lbl:'PB3',    name:'PB3 / JTDO / SPI1_SCK',
     type:'JTAG',  funcs:['GPIO','JTAG','SPI','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'JTAG TDO / TRACESWO trace output. SPI1_SCK (remap). TIM2_CH2 (remap). Disable JTAG to free as GPIO.'},

    {num:40, id:'PB4',     lbl:'PB4',    name:'PB4 / JTRST / SPI1_MISO',
     type:'JTAG',  funcs:['GPIO','JTAG','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'JTAG TRST. SPI1_MISO (remap). TIM3_CH1 (remap). Internal pull-up. Release JTAG in software to use.'},

    {num:41, id:'PB5',     lbl:'PB5',    name:'PB5 / I2C1_SMBA / SPI1_MOSI',
     type:'SPI',   funcs:['GPIO','SPI','I2C','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'I2C1_SMBA SMBus alert. SPI1_MOSI (remap). TIM3_CH2 (remap).'},

    {num:42, id:'PB6',     lbl:'PB6',    name:'PB6 / I2C1_SCL / TIM4_CH1',
     type:'I2C',   funcs:['GPIO','I2C','UART','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'I2C1_SCL open-drain clock. USART1_TX (remap). TIM4_CH1 PWM/capture.'},

    {num:43, id:'PB7',     lbl:'PB7',    name:'PB7 / I2C1_SDA / TIM4_CH2',
     type:'I2C',   funcs:['GPIO','I2C','UART','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'I2C1_SDA open-drain data. USART1_RX (remap). TIM4_CH2 PWM/capture.'},

    {num:44, id:'BOOT0',   lbl:'BOOT0',  name:'BOOT0 — Boot Mode Select',
     type:'BOOT',  funcs:['BOOT'],
     volt:'3.3V',  curr:'N/A',
     note:'Boot mode selector. LOW (GND) = boot from flash (normal). HIGH (VDD) = boot from system memory (ISP / DFU) or SRAM depending on BOOT1.'},

    {num:45, id:'PB8',     lbl:'PB8',    name:'PB8 / TIM4_CH3 / I2C1_SCL',
     type:'PWM',   funcs:['GPIO','PWM','I2C','CAN'],
     volt:'3.3V',  curr:'25mA',
     note:'TIM4_CH3 PWM/capture. I2C1_SCL (remap). CAN_RX (remap).'},

    {num:46, id:'PB9',     lbl:'PB9',    name:'PB9 / TIM4_CH4 / I2C1_SDA',
     type:'PWM',   funcs:['GPIO','PWM','I2C','CAN'],
     volt:'3.3V',  curr:'25mA',
     note:'TIM4_CH4 PWM/capture. I2C1_SDA (remap). CAN_TX (remap).'},

    {num:47, id:'VSS_3',   lbl:'VSS',    name:'VSS — Digital Ground 3',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 3.'},

    {num:48, id:'VDD_3',   lbl:'VDD',    name:'VDD — Digital Supply 3',
     type:'PWR',   funcs:['PWR'],
     volt:'2.0–3.6V', curr:'N/A',
     note:'Main digital power supply 3. Decouple with 100 nF ceramic cap close to pin.'}

  ], // end pins

  /* ── Alternate function lookup ─────────────────────────
   *  Key = pin id.  Value = array of alternate function strings.
   *  Used by the detail panel to populate the "Alt Functions" chips.
   * ──────────────────────────────────────────────────────── */
  altFuncs: {
    'PC13':    ['TAMPER-RTC', 'AFIO_EXTICR4'],
    'PC14':    ['OSC32_IN'],
    'PC15':    ['OSC32_OUT'],
    'OSC_IN':  ['PD0-remap'],
    'OSC_OUT': ['PD1-remap'],
    'PA0':     ['ADC12_IN0', 'TIM2_CH1_ETR', 'USART2_CTS', 'EXTI0', 'WKUP'],
    'PA1':     ['ADC12_IN1', 'TIM2_CH2',     'USART2_RTS', 'EXTI1'],
    'PA2':     ['ADC12_IN2', 'TIM2_CH3',     'USART2_TX',  'EXTI2'],
    'PA3':     ['ADC12_IN3', 'TIM2_CH4',     'USART2_RX',  'EXTI3'],
    'PA4':     ['ADC12_IN4', 'SPI1_NSS',     'USART2_CK',  'EXTI4'],
    'PA5':     ['ADC12_IN5', 'SPI1_SCK'],
    'PA6':     ['ADC12_IN6', 'SPI1_MISO',    'TIM3_CH1',   'TIM1_BKIN'],
    'PA7':     ['ADC12_IN7', 'SPI1_MOSI',    'TIM3_CH2',   'TIM1_CH1N'],
    'PB0':     ['ADC12_IN8', 'TIM3_CH3',     'TIM1_CH2N'],
    'PB1':     ['ADC12_IN9', 'TIM3_CH4',     'TIM1_CH3N'],
    'PB2':     ['BOOT1'],
    'PB10':    ['I2C2_SCL',  'USART3_TX',    'TIM2_CH3-remap'],
    'PB11':    ['I2C2_SDA',  'USART3_RX'],
    'PB12':    ['SPI2_NSS',  'I2S2_WS',      'I2C2_SMBA',  'USART3_CK', 'TIM1_BKIN'],
    'PB13':    ['SPI2_SCK',  'I2S2_CK',      'TIM1_CH1N'],
    'PB14':    ['SPI2_MISO', 'TIM1_CH2N'],
    'PB15':    ['SPI2_MOSI', 'I2S2_SD',      'TIM1_CH3N'],
    'PA8':     ['TIM1_CH1',  'MCO',           'USART1_CK'],
    'PA9':     ['USART1_TX', 'TIM1_CH2'],
    'PA10':    ['USART1_RX', 'TIM1_CH3'],
    'PA11':    ['USB_DM',    'CAN_RX',        'TIM1_CH4',   'USART1_CTS'],
    'PA12':    ['USB_DP',    'CAN_TX',        'TIM1_ETR',   'USART1_RTS'],
    'PA13':    ['JTMS',      'SWDIO'],
    'PA14':    ['JTCK',      'SWCLK'],
    'PA15':    ['JTDI',      'SPI1_NSS-remap','TIM2_CH1_ETR-remap'],
    'PB3':     ['JTDO',      'TRACESWO',      'SPI1_SCK-remap',  'TIM2_CH2-remap'],
    'PB4':     ['JTRST',     'SPI1_MISO-remap','TIM3_CH1-remap'],
    'PB5':     ['I2C1_SMBA', 'SPI1_MOSI-remap','TIM3_CH2-remap'],
    'PB6':     ['I2C1_SCL',  'USART1_TX-remap','TIM4_CH1'],
    'PB7':     ['I2C1_SDA',  'USART1_RX-remap','TIM4_CH2'],
    'PB8':     ['TIM4_CH3',  'I2C1_SCL-remap', 'CAN_RX-remap'],
    'PB9':     ['TIM4_CH4',  'I2C1_SDA-remap', 'CAN_TX-remap']
  },

  /* ── Quick Specs (shown in sidebar / header area) ──────── */
  quickSpecs: [
    {label:'Core',         value:'ARM Cortex-M3',         color:'#e74c3c'},
    {label:'Max Freq',     value:'72 MHz',                color:'#c8a850'},
    {label:'Flash',        value:'64 KB'},
    {label:'SRAM',         value:'20 KB'},
    {label:'Supply',       value:'2.0–3.6V',              color:'#78c878'},
    {label:'I/O Pins',     value:'37 GPIO'},
    {label:'ADC',          value:'12-bit, 10 ch',         color:'#c8a850'},
    {label:'Timers',       value:'7 (TIM1–4 + SysTick)'},
    {label:'USB',          value:'Full-Speed 2.0',         color:'#4a9aee'},
    {label:'CAN',          value:'bxCAN 2.0B',            color:'#ff9944'},
    {label:'Interfaces',   value:'USART×3 · SPI×2 · I²C×2'},
    {label:'Package',      value:'LQFP-48'}
  ],

  /* ── Detailed Specs (shown in Datasheet tab table) ──────── */
  dsSpecs: [
    {label:'Architecture',    value:'32-bit ARM Cortex-M3 RISC'},
    {label:'Max Frequency',   value:'72 MHz'},
    {label:'Flash Memory',    value:'64 KB (medium-density)'},
    {label:'SRAM',            value:'20 KB'},
    {label:'Supply Voltage',  value:'2.0V – 3.6V'},
    {label:'I/O Pins',        value:'37 (Ports A, B, C partial)'},
    {label:'ADC',             value:'2× 12-bit, 10 external channels'},
    {label:'Timers',          value:'TIM1 (advanced), TIM2–4 (GP), SysTick, WWDG, IWDG'},
    {label:'USART',           value:'3× USART (one with ISO7816, LIN, IrDA, modem ctrl)'},
    {label:'SPI / I2S',       value:'2× SPI (up to 18 Mbit/s) — SPI2 also I2S'},
    {label:'I2C',             value:'2× I2C (SMBus/PMBus capable)'},
    {label:'USB',             value:'USB 2.0 Full-Speed (12 Mbit/s), 3 endpoints'},
    {label:'CAN',             value:'bxCAN 2.0B Active, 3 Tx / 2×3 Rx mailboxes'},
    {label:'DMA',             value:'7-channel DMA controller'},
    {label:'Debug',           value:'SWD + JTAG (5-pin)'},
    {label:'Operating Temp',  value:'-40°C to +85°C (Industrial)'},
    {label:'Package',         value:'LQFP-48 (7×7 mm, 0.5 mm pitch)'}
  ]

}; // end IC_CONFIG
