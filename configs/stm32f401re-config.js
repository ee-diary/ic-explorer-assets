// configs/stm32f401re-config.js
// STM32F401RE Microcontroller Configuration
// LQFP-64 Package — 64 pins total (16 pins per side)
//
// Pin layout — counter-clockwise from pin 1 at top-left:
//   LEFT   side → pins  1–16  (top → bottom)
//   BOTTOM side → pins 17–32  (left → right)
//   RIGHT  side → pins 33–48  (bottom → top)
//   TOP    side → pins 49–64  (right → left)

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'STM32F401RE',
  partMPN:      'STM32F401RET6',
  manufacturer: 'STMicroelectronics',
  package:      'LQFP-64',
  pinCount:     64,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/STM32F401RET6/STMicroelectronics/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/STM32F401RET6/STMicroelectronics/view-part/?ref=snapeda',
  datasheetURL: 'https://www.st.com/resource/en/datasheet/stm32f401re.pdf',

  // ── QFP LAYOUT HINT ───────────────────────────────────────────
  qfpConfig: {
    pinsPerSide: 16,   // 64 / 4 = 16 pins per side
    bodySize:    460,
    pinLength:   30,
    pinWidth:    17,
    pinGap:      2
  },

  // ── PINS ──────────────────────────────────────────────────────
  pins: [

    // ═══════════════════════════════════════════════════════════
    // LEFT SIDE — pins 1–16 (top → bottom)
    // ═══════════════════════════════════════════════════════════
    {num:1,  id:'VBAT',  lbl:'VBAT',  name:'VBAT — Backup Supply',
     type:'PWR',   funcs:['PWR'],
     volt:'1.7–3.6V', curr:'N/A',
     note:'Backup domain supply for RTC and backup registers. Connect to VDD if RTC is unused.'},

    {num:2,  id:'PC13',  lbl:'PC13',  name:'PC13 / RTC_AF1',
     type:'GPIO',  funcs:['GPIO','INT'],
     volt:'3.3V',  curr:'3mA',
     note:'General-purpose I/O. RTC tamper / timestamp / alarm output (RTC_AF1). Output limited to 2 MHz / 3 mA.'},

    {num:3,  id:'PC14',  lbl:'PC14',  name:'PC14 / OSC32_IN',
     type:'XTAL',  funcs:['GPIO','XTAL'],
     volt:'3.3V',  curr:'3mA',
     note:'LSE 32.768 kHz oscillator input. When used as GPIO, output limited to 3 mA.'},

    {num:4,  id:'PC15',  lbl:'PC15',  name:'PC15 / OSC32_OUT',
     type:'XTAL',  funcs:['GPIO','XTAL'],
     volt:'3.3V',  curr:'3mA',
     note:'LSE 32.768 kHz oscillator output. When used as GPIO, output limited to 3 mA.'},

    {num:5,  id:'PH0',   lbl:'PH0',   name:'PH0 / OSC_IN (HSE)',
     type:'XTAL',  funcs:['GPIO','XTAL'],
     volt:'3.3V',  curr:'25mA',
     note:'HSE oscillator input (4–26 MHz). Can be used as general-purpose I/O when HSE is not used.'},

    {num:6,  id:'PH1',   lbl:'PH1',   name:'PH1 / OSC_OUT (HSE)',
     type:'XTAL',  funcs:['GPIO','XTAL'],
     volt:'3.3V',  curr:'25mA',
     note:'HSE oscillator output. Can be used as general-purpose I/O when HSE is not used.'},

    {num:7,  id:'NRST',  lbl:'NRST',  name:'NRST — System Reset',
     type:'RESET', funcs:['RESET'],
     volt:'—',     curr:'N/A',
     note:'Active-LOW system reset. Internal Schmitt filter and pull-up resistor. Connect 100 nF cap to GND.'},

    {num:8,  id:'PC0',   lbl:'PC0',   name:'PC0 / ADC1_IN10',
     type:'ADC',   funcs:['GPIO','ADC'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN10 analog input channel 10.'},

    {num:9,  id:'PC1',   lbl:'PC1',   name:'PC1 / ADC1_IN11',
     type:'ADC',   funcs:['GPIO','ADC'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN11 analog input channel 11.'},

    {num:10, id:'PC2',   lbl:'PC2',   name:'PC2 / ADC1_IN12 / SPI2_MISO',
     type:'ADC',   funcs:['GPIO','ADC','SPI'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN12. SPI2_MISO / I2S2ext_SD.'},

    {num:11, id:'PC3',   lbl:'PC3',   name:'PC3 / ADC1_IN13 / SPI2_MOSI',
     type:'ADC',   funcs:['GPIO','ADC','SPI','I2S'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN13. SPI2_MOSI / I2S2_SD.'},

    {num:12, id:'VSSA',  lbl:'VSSA',  name:'VSSA / VREF– — Analog Ground',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Analog ground / ADC negative reference. Must be at 0 V. Decouple VDDA with 1 µF + 10 nF ceramic caps.'},

    {num:13, id:'VDDA',  lbl:'VDDA',  name:'VDDA / VREF+ — Analog Supply',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Analog power supply / ADC positive reference. Decouple with 1 µF + 10 nF ceramic caps close to pin.'},

    {num:14, id:'PA0',   lbl:'PA0',   name:'PA0 / WKUP1 / ADC1_IN0',
     type:'ADC',   funcs:['GPIO','ADC','UART','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN0. WKUP1 wake-up from standby. TIM2_CH1_ETR. TIM5_CH1. USART2_CTS.'},

    {num:15, id:'PA1',   lbl:'PA1',   name:'PA1 / ADC1_IN1 / TIM5_CH2',
     type:'ADC',   funcs:['GPIO','ADC','TIMER','UART'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN1. TIM2_CH2. TIM5_CH2. USART2_RTS.'},

    {num:16, id:'PA2',   lbl:'PA2',   name:'PA2 / ADC1_IN2 / USART2_TX',
     type:'UART',  funcs:['GPIO','ADC','UART','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN2. USART2_TX. TIM2_CH3. TIM5_CH3. TIM9_CH1.'},

    // ═══════════════════════════════════════════════════════════
    // BOTTOM SIDE — pins 17–32 (left → right)
    // ═══════════════════════════════════════════════════════════
    {num:17, id:'PA3',   lbl:'PA3',   name:'PA3 / ADC1_IN3 / USART2_RX',
     type:'UART',  funcs:['GPIO','ADC','UART','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN3. USART2_RX. TIM2_CH4. TIM5_CH4. TIM9_CH2.'},

    {num:18, id:'VSS_1', lbl:'VSS',   name:'VSS — Digital Ground 1',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground. Decouple with 100 nF ceramic near each VDD/VSS pair.'},

    {num:19, id:'VDD_1', lbl:'VDD',   name:'VDD — Digital Supply 1',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Main digital power supply. 100 nF bypass capacitor per pin.'},

    {num:20, id:'PA4',   lbl:'PA4',   name:'PA4 / ADC1_IN4 / SPI1_NSS',
     type:'ADC',   funcs:['GPIO','ADC','SPI','UART'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN4. SPI1_NSS. SPI3_NSS / I2S3_WS. USART2_CK.'},

    {num:21, id:'PA5',   lbl:'PA5',   name:'PA5 / ADC1_IN5 / SPI1_SCK',
     type:'SPI',   funcs:['GPIO','ADC','SPI'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN5. SPI1_SCK. TIM2_CH1_ETR. Nucleo-64 user LED LD2 (active high).'},

    {num:22, id:'PA6',   lbl:'PA6',   name:'PA6 / ADC1_IN6 / SPI1_MISO',
     type:'SPI',   funcs:['GPIO','ADC','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN6. SPI1_MISO. TIM1_BKIN. TIM3_CH1. TIM13_CH1.'},

    {num:23, id:'PA7',   lbl:'PA7',   name:'PA7 / ADC1_IN7 / SPI1_MOSI',
     type:'SPI',   funcs:['GPIO','ADC','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN7. SPI1_MOSI. TIM1_CH1N. TIM3_CH2. TIM14_CH1.'},

    {num:24, id:'PC4',   lbl:'PC4',   name:'PC4 / ADC1_IN14',
     type:'ADC',   funcs:['GPIO','ADC'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN14 analog input channel 14.'},

    {num:25, id:'PC5',   lbl:'PC5',   name:'PC5 / ADC1_IN15',
     type:'ADC',   funcs:['GPIO','ADC'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN15 analog input channel 15.'},

    {num:26, id:'PB0',   lbl:'PB0',   name:'PB0 / ADC1_IN8 / TIM3_CH3',
     type:'ADC',   funcs:['GPIO','ADC','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN8. TIM1_CH2N. TIM3_CH3.'},

    {num:27, id:'PB1',   lbl:'PB1',   name:'PB1 / ADC1_IN9 / TIM3_CH4',
     type:'ADC',   funcs:['GPIO','ADC','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'ADC1_IN9. TIM1_CH3N. TIM3_CH4.'},

    {num:28, id:'PB2',   lbl:'PB2',   name:'PB2 / BOOT1',
     type:'BOOT',  funcs:['GPIO','BOOT'],
     volt:'3.3V',  curr:'25mA',
     note:'BOOT1 boot-mode configuration pin. Pulled low on Nucleo-64 to boot from flash. Also GPIO.'},

    {num:29, id:'PB10',  lbl:'PB10',  name:'PB10 / I2C2_SCL / SPI2_SCK',
     type:'I2C',   funcs:['GPIO','I2C','SPI','UART','I2S'],
     volt:'3.3V',  curr:'25mA',
     note:'I2C2_SCL open-drain clock. SPI2_SCK / I2S2_CK. USART3_TX. TIM2_CH3.'},

    {num:30, id:'VCAP1', lbl:'VCAP1', name:'VCAP_1 — Internal LDO Cap',
     type:'VCAP',  funcs:['VCAP'],
     volt:'~1.2V', curr:'N/A',
     note:'Internal 1.2 V LDO output. Connect 1 µF ±20% low-ESR ceramic capacitor to GND. Do NOT connect to VDD.'},

    {num:31, id:'VSS_2', lbl:'VSS',   name:'VSS — Digital Ground 2',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 2.'},

    {num:32, id:'VDD_2', lbl:'VDD',   name:'VDD — Digital Supply 2',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Main digital power supply 2.'},

    // ═══════════════════════════════════════════════════════════
    // RIGHT SIDE — pins 33–48 (bottom → top)
    // ═══════════════════════════════════════════════════════════
    {num:33, id:'PB12',  lbl:'PB12',  name:'PB12 / SPI2_NSS / I2S2_WS',
     type:'SPI',   funcs:['GPIO','SPI','I2C','I2S'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI2_NSS / I2S2_WS word-select. I2C2_SMBA alert. TIM1_BKIN break input.'},

    {num:34, id:'PB13',  lbl:'PB13',  name:'PB13 / SPI2_SCK / I2S2_CK',
     type:'SPI',   funcs:['GPIO','SPI','I2S','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI2_SCK / I2S2_CK serial clock. TIM1_CH1N complementary PWM output.'},

    {num:35, id:'PB14',  lbl:'PB14',  name:'PB14 / SPI2_MISO / TIM12_CH1',
     type:'SPI',   funcs:['GPIO','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI2_MISO / I2S2ext_SD. TIM1_CH2N. TIM12_CH1.'},

    {num:36, id:'PB15',  lbl:'PB15',  name:'PB15 / SPI2_MOSI / TIM12_CH2',
     type:'SPI',   funcs:['GPIO','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI2_MOSI / I2S2_SD. TIM1_CH3N. TIM12_CH2.'},

    {num:37, id:'PC6',   lbl:'PC6',   name:'PC6 / I2S2_MCK / TIM3_CH1',
     type:'I2S',   funcs:['GPIO','I2S','PWM','UART'],
     volt:'3.3V',  curr:'25mA',
     note:'I2S2_MCK master clock output. TIM3_CH1. TIM8_CH1. USART6_TX.'},

    {num:38, id:'PC7',   lbl:'PC7',   name:'PC7 / I2S3_MCK / TIM3_CH2',
     type:'I2S',   funcs:['GPIO','I2S','PWM','UART'],
     volt:'3.3V',  curr:'25mA',
     note:'I2S3_MCK master clock output. TIM3_CH2. TIM8_CH2. USART6_RX.'},

    {num:39, id:'PC8',   lbl:'PC8',   name:'PC8 / SDIO_D0 / TIM3_CH3',
     type:'SDIO',  funcs:['GPIO','SDIO','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'SDIO_D0 data line 0. TIM3_CH3. TIM8_CH3.'},

    {num:40, id:'PC9',   lbl:'PC9',   name:'PC9 / SDIO_D1 / MCO2',
     type:'SDIO',  funcs:['GPIO','SDIO','I2S','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'SDIO_D1 data line 1. I2S_CKIN. TIM3_CH4. TIM8_CH4. MCO2 (Master Clock Output 2).'},

    {num:41, id:'PA8',   lbl:'PA8',   name:'PA8 / MCO1 / TIM1_CH1',
     type:'PWM',   funcs:['GPIO','PWM','UART','I2C'],
     volt:'3.3V',  curr:'25mA',
     note:'TIM1_CH1 advanced PWM. MCO1 (Master Clock Output 1). USART1_CK. I2C3_SCL. OTG_FS_SOF.'},

    {num:42, id:'PA9',   lbl:'PA9',   name:'PA9 / USART1_TX / OTG_VBUS',
     type:'UART',  funcs:['GPIO','UART','PWM','USB'],
     volt:'3.3V',  curr:'25mA',
     note:'USART1_TX serial transmit. TIM1_CH2. I2C3_SMBA. OTG_FS_VBUS sense input.'},

    {num:43, id:'PA10',  lbl:'PA10',  name:'PA10 / USART1_RX / OTG_ID',
     type:'UART',  funcs:['GPIO','UART','PWM','USB'],
     volt:'3.3V',  curr:'25mA',
     note:'USART1_RX serial receive. TIM1_CH3. OTG_FS_ID host/device detection.'},

    {num:44, id:'PA11',  lbl:'PA11',  name:'PA11 / USB_DM / TIM1_CH4',
     type:'USB',   funcs:['GPIO','USB','PWM','UART'],
     volt:'3.3V',  curr:'25mA',
     note:'OTG_FS_DM USB full-speed D− data line. TIM1_CH4. USART1_CTS.'},

    {num:45, id:'PA12',  lbl:'PA12',  name:'PA12 / USB_DP / TIM1_ETR',
     type:'USB',   funcs:['GPIO','USB','PWM','UART'],
     volt:'3.3V',  curr:'25mA',
     note:'OTG_FS_DP USB full-speed D+ data line. TIM1_ETR. USART1_RTS.'},

    {num:46, id:'PA13',  lbl:'PA13',  name:'PA13 / JTMS-SWDIO',
     type:'JTAG',  funcs:['GPIO','JTAG'],
     volt:'3.3V',  curr:'25mA',
     note:'JTAG TMS / SWD Data I/O. Internal pull-up. Used by ST-LINK on Nucleo-64. Avoid repurposing.'},

    {num:47, id:'VSS_3', lbl:'VSS',   name:'VSS — Digital Ground 3',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 3.'},

    {num:48, id:'VDD_3', lbl:'VDD',   name:'VDD — Digital Supply 3',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Main digital power supply 3.'},

    // ═══════════════════════════════════════════════════════════
    // TOP SIDE — pins 49–64 (right → left)
    // ═══════════════════════════════════════════════════════════
    {num:49, id:'PA14',  lbl:'PA14',  name:'PA14 / JTCK-SWCLK',
     type:'JTAG',  funcs:['GPIO','JTAG'],
     volt:'3.3V',  curr:'25mA',
     note:'JTAG TCK / SWD Clock. Internal pull-down. Used by ST-LINK on Nucleo-64. Avoid repurposing.'},

    {num:50, id:'PA15',  lbl:'PA15',  name:'PA15 / JTDI / SPI1_NSS',
     type:'JTAG',  funcs:['GPIO','JTAG','SPI','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'JTAG TDI. SPI1_NSS (remap). SPI3_NSS / I2S3_WS. TIM2_CH1_ETR (remap). Internal pull-up.'},

    {num:51, id:'PC10',  lbl:'PC10',  name:'PC10 / SPI3_SCK / USART3_TX',
     type:'SPI',   funcs:['GPIO','SPI','UART','SDIO'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI3_SCK / I2S3_CK serial clock. USART3_TX. SDIO_D2 data line 2.'},

    {num:52, id:'PC11',  lbl:'PC11',  name:'PC11 / SPI3_MISO / USART3_RX',
     type:'SPI',   funcs:['GPIO','SPI','UART','SDIO'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI3_MISO / I2S3ext_SD. USART3_RX. SDIO_D3 data line 3.'},

    {num:53, id:'PC12',  lbl:'PC12',  name:'PC12 / SPI3_MOSI / SDIO_CK',
     type:'SDIO',  funcs:['GPIO','SPI','SDIO','I2S'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI3_MOSI / I2S3_SD. SDIO_CK clock output.'},

    {num:54, id:'PD2',   lbl:'PD2',   name:'PD2 / TIM3_ETR / SDIO_CMD',
     type:'SDIO',  funcs:['GPIO','SDIO','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'SDIO_CMD command line. TIM3_ETR external trigger.'},

    {num:55, id:'PB3',   lbl:'PB3',   name:'PB3 / JTDO / SPI1_SCK',
     type:'JTAG',  funcs:['GPIO','JTAG','SPI','TIMER'],
     volt:'3.3V',  curr:'25mA',
     note:'JTAG TDO / TRACESWO trace output. SPI1_SCK (remap) / I2S1_CK. TIM2_CH2 (remap).'},

    {num:56, id:'PB4',   lbl:'PB4',   name:'PB4 / NJTRST / SPI1_MISO',
     type:'JTAG',  funcs:['GPIO','JTAG','SPI','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'JTAG TRST (low disables TAP). SPI1_MISO (remap). TIM3_CH1 (remap). Internal pull-up.'},

    {num:57, id:'PB5',   lbl:'PB5',   name:'PB5 / SPI1_MOSI / I2C1_SMBA',
     type:'SPI',   funcs:['GPIO','SPI','I2C','I2S','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'SPI1_MOSI (remap) / I2S1_SD. I2C1_SMBA SMBus alert. TIM3_CH2.'},

    {num:58, id:'PB6',   lbl:'PB6',   name:'PB6 / I2C1_SCL / TIM4_CH1',
     type:'I2C',   funcs:['GPIO','I2C','UART','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'I2C1_SCL open-drain clock. TIM4_CH1 PWM/capture. USART1_TX (remap).'},

    {num:59, id:'PB7',   lbl:'PB7',   name:'PB7 / I2C1_SDA / TIM4_CH2',
     type:'I2C',   funcs:['GPIO','I2C','UART','PWM'],
     volt:'3.3V',  curr:'25mA',
     note:'I2C1_SDA open-drain data. TIM4_CH2 PWM/capture. USART1_RX (remap).'},

    {num:60, id:'BOOT0', lbl:'BOOT0', name:'BOOT0 — Boot Mode Select',
     type:'BOOT',  funcs:['BOOT'],
     volt:'3.3V',  curr:'N/A',
     note:'BOOT0: LOW = boot from flash (normal on Nucleo-64). HIGH = system memory / ISP boot. Pull LOW with 10 kΩ for normal operation.'},

    {num:61, id:'PB8',   lbl:'PB8',   name:'PB8 / TIM4_CH3 / I2C1_SCL',
     type:'PWM',   funcs:['GPIO','PWM','I2C','SDIO'],
     volt:'3.3V',  curr:'25mA',
     note:'TIM4_CH3 PWM/capture. I2C1_SCL (remap). SDIO_D4 data line 4.'},

    {num:62, id:'PB9',   lbl:'PB9',   name:'PB9 / TIM4_CH4 / I2C1_SDA',
     type:'PWM',   funcs:['GPIO','PWM','I2C','SPI','I2S'],
     volt:'3.3V',  curr:'25mA',
     note:'TIM4_CH4 PWM/capture. I2C1_SDA (remap). SPI2_NSS / I2S2_WS. SDIO_D5 data line 5.'},

    {num:63, id:'VSS_4', lbl:'VSS',   name:'VSS — Digital Ground 4',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 4.'},

    {num:64, id:'VDD_4', lbl:'VDD',   name:'VDD — Digital Supply 4',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Main digital power supply 4. Decouple with 100 nF ceramic cap close to pin.'},

  ], // end pins

  // ── ALTERNATE FUNCTIONS ────────────────────────────────────────
  altFuncs: {
    'PC13':  ['RTC_AF1','EXTI13'],
    'PC14':  ['RCC_OSC32_IN'],
    'PC15':  ['RCC_OSC32_OUT'],
    'PH0':   ['RCC_OSC_IN'],
    'PH1':   ['RCC_OSC_OUT'],
    'PC0':   ['ADC1_IN10'],
    'PC1':   ['ADC1_IN11'],
    'PC2':   ['ADC1_IN12','SPI2_MISO','I2S2ext_SD'],
    'PC3':   ['ADC1_IN13','SPI2_MOSI','I2S2_SD'],
    'PA0':   ['ADC1_IN0','WKUP1','TIM2_CH1_ETR','TIM5_CH1','USART2_CTS'],
    'PA1':   ['ADC1_IN1','TIM2_CH2','TIM5_CH2','USART2_RTS'],
    'PA2':   ['ADC1_IN2','TIM2_CH3','TIM5_CH3','TIM9_CH1','USART2_TX'],
    'PA3':   ['ADC1_IN3','TIM2_CH4','TIM5_CH4','TIM9_CH2','USART2_RX'],
    'PA4':   ['ADC1_IN4','SPI1_NSS','SPI3_NSS','I2S3_WS','USART2_CK'],
    'PA5':   ['ADC1_IN5','SPI1_SCK','TIM2_CH1_ETR','Nucleo-LD2-LED'],
    'PA6':   ['ADC1_IN6','SPI1_MISO','TIM1_BKIN','TIM3_CH1','TIM13_CH1'],
    'PA7':   ['ADC1_IN7','SPI1_MOSI','TIM1_CH1N','TIM3_CH2','TIM14_CH1'],
    'PA8':   ['MCO1','TIM1_CH1','USART1_CK','I2C3_SCL','OTG_FS_SOF'],
    'PA9':   ['USART1_TX','TIM1_CH2','I2C3_SMBA','OTG_FS_VBUS'],
    'PA10':  ['USART1_RX','TIM1_CH3','OTG_FS_ID'],
    'PA11':  ['OTG_FS_DM','TIM1_CH4','USART1_CTS'],
    'PA12':  ['OTG_FS_DP','TIM1_ETR','USART1_RTS'],
    'PA13':  ['JTMS','SWDIO'],
    'PA14':  ['JTCK','SWCLK'],
    'PA15':  ['JTDI','SPI1_NSS-remap','SPI3_NSS','I2S3_WS','TIM2_CH1_ETR-remap'],
    'PB0':   ['ADC1_IN8','TIM1_CH2N','TIM3_CH3'],
    'PB1':   ['ADC1_IN9','TIM1_CH3N','TIM3_CH4'],
    'PB3':   ['JTDO','TRACESWO','SPI1_SCK-remap','I2S1_CK','TIM2_CH2-remap'],
    'PB4':   ['JTRST','SPI1_MISO-remap','TIM3_CH1-remap'],
    'PB5':   ['SPI1_MOSI-remap','I2S1_SD','I2C1_SMBA','TIM3_CH2'],
    'PB6':   ['I2C1_SCL','TIM4_CH1','USART1_TX-remap'],
    'PB7':   ['I2C1_SDA','TIM4_CH2','USART1_RX-remap'],
    'PB8':   ['TIM4_CH3','I2C1_SCL-remap','SDIO_D4'],
    'PB9':   ['TIM4_CH4','I2C1_SDA-remap','SPI2_NSS','I2S2_WS','SDIO_D5'],
    'PB10':  ['I2C2_SCL','SPI2_SCK','I2S2_CK','USART3_TX','TIM2_CH3'],
    'PB12':  ['SPI2_NSS','I2S2_WS','I2C2_SMBA','TIM1_BKIN'],
    'PB13':  ['SPI2_SCK','I2S2_CK','TIM1_CH1N'],
    'PB14':  ['SPI2_MISO','I2S2ext_SD','TIM1_CH2N','TIM12_CH1'],
    'PB15':  ['SPI2_MOSI','I2S2_SD','TIM1_CH3N','TIM12_CH2'],
    'PC4':   ['ADC1_IN14'],
    'PC5':   ['ADC1_IN15'],
    'PC6':   ['I2S2_MCK','TIM3_CH1','TIM8_CH1','USART6_TX'],
    'PC7':   ['I2S3_MCK','TIM3_CH2','TIM8_CH2','USART6_RX'],
    'PC8':   ['SDIO_D0','TIM3_CH3','TIM8_CH3'],
    'PC9':   ['SDIO_D1','I2S_CKIN','TIM3_CH4','TIM8_CH4','MCO2'],
    'PC10':  ['SPI3_SCK','I2S3_CK','USART3_TX','SDIO_D2'],
    'PC11':  ['SPI3_MISO','I2S3ext_SD','USART3_RX','SDIO_D3'],
    'PC12':  ['SPI3_MOSI','I2S3_SD','SDIO_CK'],
    'PD2':   ['TIM3_ETR','SDIO_CMD'],
  },

  // ── QUICK SPECIFICATIONS ───────────────────────────────────────
  quickSpecs: [
    {label: 'Core',       value: 'Cortex-M4F @ 84 MHz',  color: '#e74c3c'},
    {label: 'Flash',      value: '512 KB',                color: '#e0e5ec'},
    {label: 'SRAM',       value: '96 KB',                 color: '#e0e5ec'},
    {label: 'Supply',     value: '1.8–3.6V',              color: '#78c878'},
    {label: 'I/O Pins',   value: '50 GPIO',               color: '#e0e5ec'},
    {label: 'ADC',        value: '1× 12-bit / 16 ch',    color: '#c8a850'},
    {label: 'Timers',     value: '10 (16/32-bit)',         color: '#50c8c8'},
    {label: 'USB',        value: 'FS OTG',                color: '#4da6ff'},
    {label: 'SDIO',       value: '1× (SD / SDIO)',        color: '#50c8c8'},
    {label: 'Interfaces', value: 'USART×3 · SPI×3 · I²C×3 · I²S×2'},
    {label: 'Package',    value: 'LQFP-64'},
  ],

  // ── DETAILED SPECIFICATIONS ────────────────────────────────────
  dsSpecs: [
    {label: 'Architecture',   value: '32-bit ARM Cortex-M4F with FPU & DSP'},
    {label: 'Max Frequency',  value: '84 MHz'},
    {label: 'Flash Memory',   value: '512 KB with ART Accelerator (0-wait execution)'},
    {label: 'SRAM',           value: '96 KB'},
    {label: 'Supply Voltage', value: '1.8V – 3.6V'},
    {label: 'I/O Pins',       value: '50 GPIO (5 V-tolerant capable)'},
    {label: 'ADC',            value: '1× 12-bit, 16 channels @ 2.4 MSPS'},
    {label: 'Timers',         value: '10 timers: TIM1 (advanced), TIM2/5 (32-bit), TIM3/4, TIM9–11'},
    {label: 'USART',          value: '3× USART (up to 10.5 Mbit/s)'},
    {label: 'SPI / I2S',      value: '3× SPI + 2× I2S (full-duplex)'},
    {label: 'I2C',            value: '3× I2C (SMBus / PMBus capable)'},
    {label: 'USB',            value: 'USB 2.0 Full-Speed OTG (12 Mbit/s)'},
    {label: 'SDIO',           value: '1× SDIO interface (SD / SDIO / MMC cards)'},
    {label: 'DMA',            value: '2× DMA controllers, 16 streams total'},
    {label: 'Debug',          value: 'SWD + JTAG (ST-LINK/V2-1 on Nucleo-64)'},
    {label: 'Operating Temp', value: '-40°C to +85°C (Industrial)'},
    {label: 'Package',        value: 'LQFP-64 (10×10 mm, 0.5 mm pitch)'},
    {label: 'Datasheet',      value: 'DS9716 (STM32F401xD/xE)'},
  ],

  // ── KEY FEATURES ───────────────────────────────────────────────
  dsFeatures: [
    'ARM Cortex-M4F core with hardware FPU and DSP instructions',
    'ART Accelerator — 0 wait-state flash execution at full 84 MHz speed',
    'Full-speed USB 2.0 OTG with on-chip PHY (no external PHY needed)',
    'SDIO interface for SD cards, SDIO cards, and MMC',
    'DMA: 2 controllers, 16 streams, supports circular, double-buffer, and scatter-gather',
    '12-bit ADC up to 2.4 MSPS with 16 external and internal channels',
    '10 timers: 1 advanced (TIM1), 2× 32-bit GP, general-purpose, and watchdog',
    '3× SPI (up to 42 Mbit/s) + 2× I2S audio interface',
    '3× I2C with SMBus / PMBus support',
    '3× USART (up to 10.5 Mbit/s) with hardware flow control',
    'Low-power modes: Sleep, Stop, Standby (down to 2.4 µA standby)',
    'Internal voltage reference, temperature sensor, and RC oscillator',
    'Nucleo-64 on-board: ST-LINK/V2-1 debugger, user LED on PA5, user button on PC13',
  ],
};
