/**
 * IC Explorer — Chip Configuration
 * Chip:         STM32L4R5ZIT6
 * Package:      LQFP-144
 * Manufacturer: STMicroelectronics
 * ARM Cortex-M4 with FPU, 640 KB Flash, 128 KB RAM
 *
 * Drop this file into:  configs/stm32l4r5zit6-config.js
 * Load it on your page BEFORE the engine scripts.
 *
 * Pin layout (LQFP-144, counter-clockwise from top-left):
 *   Left   → pins  1–36  (top → bottom)
 *   Bottom → pins 37–72  (left → right)
 *   Right  → pins 73–108 (bottom → top)
 *   Top    → pins 109–144 (right → left)
 */

window.IC_CONFIG = {

  /* ── Identity ─────────────────────────────────────────── */
  partName:     'STM32L4R5ZIT6',
  partMPN:      'STM32L4R5ZIT6',
  manufacturer: 'STMicroelectronics',
  package:      'LQFP-144',
  pinCount:     144,

  /* ── External links ────────────────────────────────────── */
  snapPageURL:  'https://www.snapeda.com/parts/STM32L4R5ZIT6/STMicroelectronics/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/STM32L4R5ZIT6/STMicroelectronics/view-part/?ref=snapeda',
  datasheetURL: 'https://www.st.com/resource/en/datasheet/stm32l4r5zi.pdf',

  /* ── QFP layout hint (used by QFPRenderer) ─────────────
   *  pinsPerSide: how many pins on each of the 4 sides
   *  The renderer reads this so it spaces pins correctly.
   * ──────────────────────────────────────────────────────── */
  qfpConfig: {
    pinsPerSide: 36,          // 4 × 36 = 144 pins total
    bodySize:    560,         // SVG viewBox units (square)
    pinLength:   30,
    pinWidth:    20,
    pinGap:      2            // gap between adjacent pins
  },

  /* ── Pin definitions ───────────────────────────────────
   *
   *  Each pin must have:
   *    num   – physical pin number (1–144)
   *    id    – unique string id used for selection / lookup
   *    lbl   – short label shown on the IC body
   *    name  – full descriptive name shown in detail panel
   *    type  – primary type: GPIO | ADC | PWR | GND | UART |
   *            SPI | I2C | USB | CAN | PWM | TIMER | XTAL |
   *            RESET | JTAG | BOOT | INT | COMP | DAC
   *    funcs – array of function tags (drives filter buttons)
   *    volt  – operating voltage string
   *    curr  – max current string
   *    note  – human-readable note shown in detail panel
   *
   *  Side assignment (LQFP counter-clockwise, pin 1 top-left):
   *    Pins  1–36   → LEFT   side, top → bottom
   *    Pins 37–72   → BOTTOM side, left → right
   *    Pins 73–108  → RIGHT  side, bottom → top
   *    Pins 109–144 → TOP    side, right → left
   * ──────────────────────────────────────────────────────── */
  pins: [

    /* ── LEFT SIDE (pins 1–36, top → bottom) ─────────────── */
    {num:1,   id:'VDDUSB',   lbl:'VDDUSB', name:'VDDUSB — USB Power Supply',
     type:'PWR',   funcs:['PWR'],
     volt:'3.0–3.6V', curr:'N/A',
     note:'Dedicated 3.3V supply for USB transceiver. Decouple with 1 µF ceramic cap.'},

    {num:2,   id:'VSSA1',    lbl:'VSSA',   name:'VSSA1 — Analog Ground 1',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Analog ground reference. Connect to VSSA2 and VSS with low impedance.'},

    {num:3,   id:'VDDA',     lbl:'VDDA',   name:'VDDA — Analog Supply',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Analog power supply for ADC, DAC, PGA, comparators. Decouple with 1 µF + 100 nF.'},

    {num:4,   id:'VREF+',    lbl:'VREF+',  name:'VREF+ — ADC Reference',
     type:'PWR',   funcs:['PWR','ADC'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'ADC positive reference voltage (typ. same as VDDA). Decouple with 100 nF.'},

    {num:5,   id:'PA0',      lbl:'PA0',    name:'PA0 / WKUP1',
     type:'GPIO',  funcs:['GPIO','ADC','PWM','UART','TIMER'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 0. Wakeup source WKUP1. ADC_IN5. TIM2_CH1_ETR. USART2_CTS.'},

    {num:6,   id:'PA1',      lbl:'PA1',    name:'PA1 / WKUP2',
     type:'GPIO',  funcs:['GPIO','ADC','PWM','UART','TIMER'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 1. Wakeup source WKUP2. ADC_IN6. TIM2_CH2. USART2_RTS.'},

    {num:7,   id:'PA2',      lbl:'PA2',    name:'PA2 / WKUP3',
     type:'GPIO',  funcs:['GPIO','ADC','PWM','UART','TIMER'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 2. Wakeup source WKUP3. ADC_IN7. TIM2_CH3. USART2_TX.'},

    {num:8,   id:'PA3',      lbl:'PA3',    name:'PA3 / WKUP4',
     type:'GPIO',  funcs:['GPIO','ADC','PWM','UART','TIMER'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 3. Wakeup source WKUP4. ADC_IN8. TIM2_CH4. USART2_RX.'},

    {num:9,   id:'PA4',      lbl:'PA4',    name:'PA4 / DAC_OUT1',
     type:'GPIO',  funcs:['GPIO','ADC','DAC','SPI','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 4. DAC_OUT1 (12-bit digital-to-analog). ADC_IN9. SPI1_NSS.'},

    {num:10,  id:'PA5',      lbl:'PA5',    name:'PA5 / DAC_OUT2',
     type:'GPIO',  funcs:['GPIO','ADC','DAC','SPI','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 5. DAC_OUT2 (12-bit). ADC_IN10. SPI1_SCK.'},

    {num:11,  id:'PA6',      lbl:'PA6',    name:'PA6 / COMP1_INP',
     type:'GPIO',  funcs:['GPIO','ADC','SPI','PWM','COMP'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 6. ADC_IN11. SPI1_MISO. TIM3_CH1. COMP1_INP comparator input.'},

    {num:12,  id:'PA7',      lbl:'PA7',    name:'PA7 / COMP2_INP',
     type:'GPIO',  funcs:['GPIO','ADC','SPI','PWM','COMP'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 7. ADC_IN12. SPI1_MOSI. TIM3_CH2. COMP2_INP comparator input.'},

    {num:13,  id:'PA8',      lbl:'PA8',    name:'PA8 / MCO',
     type:'GPIO',  funcs:['GPIO','PWM','TIMER'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 8. Master Clock Output (system/PLL). TIM1_CH1. USART1_CK.'},

    {num:14,  id:'PA9',      lbl:'PA9',    name:'PA9 / USART1_TX',
     type:'GPIO',  funcs:['GPIO','UART','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 9. USART1_TX serial transmit. TIM1_CH2.'},

    {num:15,  id:'PA10',     lbl:'PA10',   name:'PA10 / USART1_RX',
     type:'GPIO',  funcs:['GPIO','UART','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 10. USART1_RX serial receive. TIM1_CH3.'},

    {num:16,  id:'PA11',     lbl:'PA11',   name:'PA11 / USB_DM',
     type:'GPIO',  funcs:['GPIO','USB','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 11. USB Full-Speed D- differential line. TIM1_CH4. Cannot use as GPIO with USB active.'},

    {num:17,  id:'PA12',     lbl:'PA12',   name:'PA12 / USB_DP',
     type:'GPIO',  funcs:['GPIO','USB','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 12. USB Full-Speed D+ differential line. TIM1_ETR. Cannot use as GPIO with USB active.'},

    {num:18,  id:'PA13',     lbl:'PA13',   name:'PA13 / SWDIO',
     type:'GPIO',  funcs:['GPIO','JTAG'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 13. SWD / JTAG Data I/O. Internal pull-up. Keep for debugging.'},

    {num:19,  id:'PA14',     lbl:'PA14',   name:'PA14 / SWCLK',
     type:'GPIO',  funcs:['GPIO','JTAG'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 14. SWD / JTAG Clock. Internal pull-down. Keep for debugging.'},

    {num:20,  id:'PA15',     lbl:'PA15',   name:'PA15 / JTDI',
     type:'GPIO',  funcs:['GPIO','JTAG','TIMER','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 15. JTAG Data Input / SPI3_NSS. Internal pull-up. TIM2_CH1_ETR.'},

    {num:21,  id:'PB0',      lbl:'PB0',    name:'PB0 / ADC_IN15',
     type:'GPIO',  funcs:['GPIO','ADC','PWM','TIMER'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 0. ADC_IN15. TIM1_CH2N. TIM3_CH3.'},

    {num:22,  id:'PB1',      lbl:'PB1',    name:'PB1 / ADC_IN16',
     type:'GPIO',  funcs:['GPIO','ADC','PWM','TIMER'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 1. ADC_IN16. TIM1_CH3N. TIM3_CH4.'},

    {num:23,  id:'PB2',      lbl:'PB2',    name:'PB2 / BOOT1',
     type:'GPIO',  funcs:['GPIO','BOOT'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 2. BOOT1 boot mode config. With BOOT0 selects boot source at reset.'},

    {num:24,  id:'PB3',      lbl:'PB3',    name:'PB3 / JTDO / SPI3_SCK',
     type:'GPIO',  funcs:['GPIO','SPI','JTAG','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 3. JTAG Data Output / SPI3_SCK. TIM1_CH4N.'},

    {num:25,  id:'PB4',      lbl:'PB4',    name:'PB4 / JTRST / SPI3_MISO',
     type:'GPIO',  funcs:['GPIO','SPI','JTAG','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 4. JTAG Reset / SPI3_MISO. TIM3_CH1.'},

    {num:26,  id:'PB5',      lbl:'PB5',    name:'PB5 / I2C1_SMBA / SPI3_MOSI',
     type:'GPIO',  funcs:['GPIO','I2C','SPI','PWM','TIMER'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 5. I2C1 SMBus Alert. SPI3_MOSI. TIM3_CH2.'},

    {num:27,  id:'PB6',      lbl:'PB6',    name:'PB6 / I2C1_SCL / USART1_TX',
     type:'GPIO',  funcs:['GPIO','I2C','UART','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 6. I2C1_SCL open-drain clock. USART1_TX. TIM4_CH1.'},

    {num:28,  id:'PB7',      lbl:'PB7',    name:'PB7 / I2C1_SDA / USART1_RX',
     type:'GPIO',  funcs:['GPIO','I2C','UART','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 7. I2C1_SDA open-drain data. USART1_RX. TIM4_CH2.'},

    {num:29,  id:'VSS1',     lbl:'VSS',    name:'VSS1 — Digital Ground 1',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference. Connect all VSS and VSSA with low impedance.'},

    {num:30,  id:'VDD1',     lbl:'VDD',    name:'VDD1 — Digital Supply 1',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Main digital core supply. Decouple with 100 nF ceramic close to pin.'},

    {num:31,  id:'PB8',      lbl:'PB8',    name:'PB8 / I2C3_SCL / USART3_TX',
     type:'GPIO',  funcs:['GPIO','I2C','UART','PWM','CAN'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 8. I2C3_SCL. USART3_TX. TIM4_CH3. CAN_RX.'},

    {num:32,  id:'PB9',      lbl:'PB9',    name:'PB9 / I2C3_SDA / USART3_RX',
     type:'GPIO',  funcs:['GPIO','I2C','UART','PWM','CAN'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 9. I2C3_SDA. USART3_RX. TIM4_CH4. CAN_TX.'},

    {num:33,  id:'PB10',     lbl:'PB10',   name:'PB10 / I2C2_SCL / USART3_TX',
     type:'GPIO',  funcs:['GPIO','I2C','UART','SPI','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 10. I2C2_SCL open-drain. USART3_TX. SPI2_SCK (remap).'},

    {num:34,  id:'PB11',     lbl:'PB11',   name:'PB11 / I2C2_SDA / USART3_RX',
     type:'GPIO',  funcs:['GPIO','I2C','UART','SPI','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 11. I2C2_SDA open-drain. USART3_RX. SPI2_MOSI (remap).'},

    {num:35,  id:'VSS2',     lbl:'VSS',    name:'VSS2 — Digital Ground 2',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 2.'},

    {num:36,  id:'VDD2',     lbl:'VDD',    name:'VDD2 — Digital Supply 2',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Digital supply 2. Decouple with 100 nF.'},

    /* ── BOTTOM SIDE (pins 37–72, left → right) ──────────── */
    {num:37,  id:'PB12',     lbl:'PB12',   name:'PB12 / SPI2_NSS / I2S2_WS',
     type:'GPIO',  funcs:['GPIO','SPI','I2C','UART','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 12. SPI2_NSS. I2S2_WS. I2C2_SMBA. USART3_CK. CAN_TX.'},

    {num:38,  id:'PB13',     lbl:'PB13',   name:'PB13 / SPI2_SCK / I2S2_CK',
     type:'GPIO',  funcs:['GPIO','SPI','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 13. SPI2_SCK. I2S2_CK serial clock.'},

    {num:39,  id:'PB14',     lbl:'PB14',   name:'PB14 / SPI2_MISO / I2S2ext_SD',
     type:'GPIO',  funcs:['GPIO','SPI','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 14. SPI2_MISO. I2S2ext slave data input.'},

    {num:40,  id:'PB15',     lbl:'PB15',   name:'PB15 / SPI2_MOSI / I2S2_SD',
     type:'GPIO',  funcs:['GPIO','SPI','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 15. SPI2_MOSI. I2S2_SD serial data output.'},

    {num:41,  id:'PC0',      lbl:'PC0',    name:'PC0 / ADC_IN10',
     type:'GPIO',  funcs:['GPIO','ADC'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 0. ADC_IN10.'},

    {num:42,  id:'PC1',      lbl:'PC1',    name:'PC1 / ADC_IN11',
     type:'GPIO',  funcs:['GPIO','ADC'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 1. ADC_IN11.'},

    {num:43,  id:'PC2',      lbl:'PC2',    name:'PC2 / ADC_IN12',
     type:'GPIO',  funcs:['GPIO','ADC','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 2. ADC_IN12. SPI2_MISO (remap).'},

    {num:44,  id:'PC3',      lbl:'PC3',    name:'PC3 / ADC_IN13',
     type:'GPIO',  funcs:['GPIO','ADC','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 3. ADC_IN13. SPI2_MOSI (remap).'},

    {num:45,  id:'VSSA2',    lbl:'VSSA',   name:'VSSA2 — Analog Ground 2',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Analog ground reference 2. Connect to VSSA1 with low impedance.'},

    {num:46,  id:'VREF-',    lbl:'VREF-',  name:'VREF- — ADC Negative Ref',
     type:'GND',   funcs:['GND','ADC'],
     volt:'0V',    curr:'N/A',
     note:'ADC negative reference (typically 0V / GND). Connect to VSSA.'},

    {num:47,  id:'PC4',      lbl:'PC4',    name:'PC4 / ADC_IN14',
     type:'GPIO',  funcs:['GPIO','ADC'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 4. ADC_IN14.'},

    {num:48,  id:'PC5',      lbl:'PC5',    name:'PC5 / ADC_IN15',
     type:'GPIO',  funcs:['GPIO','ADC','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 5. ADC_IN15. USART3_RX (remap).'},

    {num:49,  id:'PC6',      lbl:'PC6',    name:'PC6 / USART6_TX',
     type:'GPIO',  funcs:['GPIO','UART','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 6. USART6_TX. TIM3_CH1 (remap). TIM8_CH1.'},

    {num:50,  id:'PC7',      lbl:'PC7',    name:'PC7 / USART6_RX',
     type:'GPIO',  funcs:['GPIO','UART','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 7. USART6_RX. TIM3_CH2 (remap). TIM8_CH2.'},

    {num:51,  id:'PC8',      lbl:'PC8',    name:'PC8 / USART5_TX / SDIO_D0',
     type:'GPIO',  funcs:['GPIO','UART','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 8. USART5_TX. TIM3_CH3 (remap).'},

    {num:52,  id:'PC9',      lbl:'PC9',    name:'PC9 / USART5_RX / SDIO_D1',
     type:'GPIO',  funcs:['GPIO','UART','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 9. USART5_RX. TIM3_CH4 (remap).'},

    {num:53,  id:'PA16',     lbl:'PA16',   name:'PA16 / CEC',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 16. HDMI CEC.'},

    {num:54,  id:'PA17',     lbl:'PA17',   name:'PA17 / IR_OUT',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 17. Infrared out.'},

    {num:55,  id:'PA18',     lbl:'PA18',   name:'PA18',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 18. General purpose I/O.'},

    {num:56,  id:'PA19',     lbl:'PA19',   name:'PA19',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port A Pin 19. General purpose I/O.'},

    {num:57,  id:'PC10',     lbl:'PC10',   name:'PC10 / UART4_TX / SDIO_D2',
     type:'GPIO',  funcs:['GPIO','UART','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 10. UART4_TX. SPI3_SCK (remap).'},

    {num:58,  id:'PC11',     lbl:'PC11',   name:'PC11 / UART4_RX / SDIO_D3',
     type:'GPIO',  funcs:['GPIO','UART','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 11. UART4_RX. SPI3_MISO (remap).'},

    {num:59,  id:'PC12',     lbl:'PC12',   name:'PC12 / UART5_TX / SDIO_CK',
     type:'GPIO',  funcs:['GPIO','UART','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 12. UART5_TX. SPI3_MOSI (remap).'},

    {num:60,  id:'PD0',      lbl:'PD0',    name:'PD0 / CAN1_RX',
     type:'GPIO',  funcs:['GPIO','CAN','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 0. CAN1_RX. UART5_RX (remap).'},

    {num:61,  id:'PD1',      lbl:'PD1',    name:'PD1 / CAN1_TX',
     type:'GPIO',  funcs:['GPIO','CAN','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 1. CAN1_TX. UART5_TX (remap).'},

    {num:62,  id:'PD2',      lbl:'PD2',    name:'PD2 / UART5_RX',
     type:'GPIO',  funcs:['GPIO','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 2. UART5_RX.'},

    {num:63,  id:'VSS3',     lbl:'VSS',    name:'VSS3 — Digital Ground 3',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 3.'},

    {num:64,  id:'VDD3',     lbl:'VDD',    name:'VDD3 — Digital Supply 3',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Digital supply 3. Decouple with 100 nF.'},

    {num:65,  id:'PD3',      lbl:'PD3',    name:'PD3 / USART2_CTS',
     type:'GPIO',  funcs:['GPIO','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 3. USART2_CTS.'},

    {num:66,  id:'PD4',      lbl:'PD4',    name:'PD4 / USART2_RTS',
     type:'GPIO',  funcs:['GPIO','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 4. USART2_RTS.'},

    {num:67,  id:'PD5',      lbl:'PD5',    name:'PD5 / USART2_TX',
     type:'GPIO',  funcs:['GPIO','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 5. USART2_TX.'},

    {num:68,  id:'PD6',      lbl:'PD6',    name:'PD6 / USART2_RX',
     type:'GPIO',  funcs:['GPIO','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 6. USART2_RX.'},

    {num:69,  id:'PD7',      lbl:'PD7',    name:'PD7 / USART2_CK',
     type:'GPIO',  funcs:['GPIO','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 7. USART2_CK synchronous clock.'},

    {num:70,  id:'PD8',      lbl:'PD8',    name:'PD8 / USART3_TX',
     type:'GPIO',  funcs:['GPIO','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 8. USART3_TX.'},

    {num:71,  id:'PD9',      lbl:'PD9',    name:'PD9 / USART3_RX',
     type:'GPIO',  funcs:['GPIO','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 9. USART3_RX.'},

    {num:72,  id:'PD10',     lbl:'PD10',   name:'PD10 / USART3_CK',
     type:'GPIO',  funcs:['GPIO','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 10. USART3_CK synchronous clock.'},

    /* ── RIGHT SIDE (pins 73–108, bottom → top) ──────────── */
    {num:73,  id:'PD11',     lbl:'PD11',   name:'PD11 / USART3_CTS',
     type:'GPIO',  funcs:['GPIO','UART'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 11. USART3_CTS.'},

    {num:74,  id:'PD12',     lbl:'PD12',   name:'PD12 / USART3_RTS',
     type:'GPIO',  funcs:['GPIO','UART','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 12. USART3_RTS. TIM4_CH1.'},

    {num:75,  id:'PD13',     lbl:'PD13',   name:'PD13 / SPI4_MOSI',
     type:'GPIO',  funcs:['GPIO','SPI','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 13. SPI4_MOSI. TIM4_CH2.'},

    {num:76,  id:'PD14',     lbl:'PD14',   name:'PD14 / I2S4_SCK',
     type:'GPIO',  funcs:['GPIO','SPI','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 14. SPI4_SCK. TIM4_CH3.'},

    {num:77,  id:'PD15',     lbl:'PD15',   name:'PD15 / SPI4_MISO',
     type:'GPIO',  funcs:['GPIO','SPI','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port D Pin 15. SPI4_MISO. TIM4_CH4.'},

    {num:78,  id:'PE0',      lbl:'PE0',    name:'PE0 / TIM4_ETR',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 0. TIM4 External Trigger.'},

    {num:79,  id:'PE1',      lbl:'PE1',    name:'PE1 / TIM1_CH1',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 1. TIM1_CH1.'},

    {num:80,  id:'VSS4',     lbl:'VSS',    name:'VSS4 — Digital Ground 4',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 4.'},

    {num:81,  id:'VDD4',     lbl:'VDD',    name:'VDD4 — Digital Supply 4',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Digital supply 4. Decouple with 100 nF.'},

    {num:82,  id:'PE2',      lbl:'PE2',    name:'PE2 / TIM3_ETR',
     type:'GPIO',  funcs:['GPIO','TIMER'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 2. TIM3 External Trigger.'},

    {num:83,  id:'PE3',      lbl:'PE3',    name:'PE3 / TIM3_CH1',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 3. TIM3_CH1 PWM/capture.'},

    {num:84,  id:'PE4',      lbl:'PE4',    name:'PE4 / TIM3_CH2',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 4. TIM3_CH2 PWM/capture.'},

    {num:85,  id:'PE5',      lbl:'PE5',    name:'PE5 / TIM3_CH3',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 5. TIM3_CH3 PWM/capture.'},

    {num:86,  id:'PE6',      lbl:'PE6',    name:'PE6 / TIM3_CH4 / SAI1_SD_A',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 6. TIM3_CH4 PWM/capture. SAI1_SD_A serial data.'},

    {num:87,  id:'PE7',      lbl:'PE7',    name:'PE7 / TIM1_ETR',
     type:'GPIO',  funcs:['GPIO','TIMER','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 7. TIM1 External Trigger. SPI4_NSS.'},

    {num:88,  id:'PE8',      lbl:'PE8',    name:'PE8 / COMP1_OUT',
     type:'GPIO',  funcs:['GPIO','TIMER','COMP'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 8. TIM1_CH1N. COMP1 output.'},

    {num:89,  id:'PE9',      lbl:'PE9',    name:'PE9 / TIM1_CH1',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 9. TIM1_CH1 PWM.'},

    {num:90,  id:'PE10',     lbl:'PE10',   name:'PE10 / TIM1_CH2N',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 10. TIM1_CH2N complementary PWM.'},

    {num:91,  id:'PE11',     lbl:'PE11',   name:'PE11 / TIM1_CH2',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 11. TIM1_CH2 PWM. SPI4_NSS (remap).'},

    {num:92,  id:'PE12',     lbl:'PE12',   name:'PE12 / TIM1_CH3N',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 12. TIM1_CH3N complementary PWM. SPI4_SCK (remap).'},

    {num:93,  id:'PE13',     lbl:'PE13',   name:'PE13 / TIM1_CH3',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 13. TIM1_CH3 PWM. SPI4_MISO (remap).'},

    {num:94,  id:'PE14',     lbl:'PE14',   name:'PE14 / TIM1_CH4 / SAI1_CK_A',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 14. TIM1_CH4 PWM. SPI4_MOSI (remap). SAI1_CK_A.'},

    {num:95,  id:'PE15',     lbl:'PE15',   name:'PE15 / TIM1_BKIN / SAI1_FS_A',
     type:'GPIO',  funcs:['GPIO','TIMER'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port E Pin 15. TIM1_BKIN break input. SAI1_FS_A.'},

    {num:96,  id:'VSS5',     lbl:'VSS',    name:'VSS5 — Digital Ground 5',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 5.'},

    {num:97,  id:'VDD5',     lbl:'VDD',    name:'VDD5 — Digital Supply 5',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Digital supply 5. Decouple with 100 nF.'},

    {num:98,  id:'PF0',      lbl:'PF0',    name:'PF0 / I2C2_SDA',
     type:'GPIO',  funcs:['GPIO','I2C'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 0. I2C2_SDA open-drain.'},

    {num:99,  id:'PF1',      lbl:'PF1',    name:'PF1 / I2C2_SCL',
     type:'GPIO',  funcs:['GPIO','I2C'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 1. I2C2_SCL open-drain.'},

    {num:100, id:'PF2',      lbl:'PF2',    name:'PF2 / I2C2_SMBA',
     type:'GPIO',  funcs:['GPIO','I2C'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 2. I2C2 SMBus Alert.'},

    {num:101, id:'PF3',      lbl:'PF3',    name:'PF3',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 3. General purpose I/O.'},

    {num:102, id:'PF4',      lbl:'PF4',    name:'PF4',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 4. General purpose I/O.'},

    {num:103, id:'PF5',      lbl:'PF5',    name:'PF5',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 5. General purpose I/O.'},

    {num:104, id:'PF6',      lbl:'PF6',    name:'PF6 / TIM5_CH1',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM','I2C'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 6. TIM5_CH1. I2C4_SCL.'},

    {num:105, id:'PF7',      lbl:'PF7',    name:'PF7 / TIM5_CH2',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM','I2C'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 7. TIM5_CH2. I2C4_SDA.'},

    {num:106, id:'PF8',      lbl:'PF8',    name:'PF8 / TIM5_CH3',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 8. TIM5_CH3.'},

    {num:107, id:'PF9',      lbl:'PF9',    name:'PF9 / TIM5_CH4',
     type:'GPIO',  funcs:['GPIO','TIMER','PWM'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 9. TIM5_CH4.'},

    {num:108, id:'PF10',     lbl:'PF10',   name:'PF10 / SPI5_NSS',
     type:'GPIO',  funcs:['GPIO','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 10. SPI5_NSS.'},

    /* ── TOP SIDE (pins 109–144, right → left) ──────────── */
    {num:109, id:'PF11',     lbl:'PF11',   name:'PF11 / SPI5_SCK',
     type:'GPIO',  funcs:['GPIO','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 11. SPI5_SCK.'},

    {num:110, id:'PF12',     lbl:'PF12',   name:'PF12 / SPI5_MOSI',
     type:'GPIO',  funcs:['GPIO','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port F Pin 12. SPI5_MOSI.'},

    {num:111, id:'PG0',      lbl:'PG0',    name:'PG0 / SPI5_MISO',
     type:'GPIO',  funcs:['GPIO','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port G Pin 0. SPI5_MISO.'},

    {num:112, id:'PG1',      lbl:'PG1',    name:'PG1 / SPI5_NSS',
     type:'GPIO',  funcs:['GPIO','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port G Pin 1. SPI5_NSS.'},

    {num:113, id:'VSS6',     lbl:'VSS',    name:'VSS6 — Digital Ground 6',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 6.'},

    {num:114, id:'VDD6',     lbl:'VDD',    name:'VDD6 — Digital Supply 6',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Digital supply 6. Decouple with 100 nF.'},

    {num:115, id:'PG2',      lbl:'PG2',    name:'PG2 / SPI5_MOSI',
     type:'GPIO',  funcs:['GPIO','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port G Pin 2. SPI5_MOSI.'},

    {num:116, id:'PG3',      lbl:'PG3',    name:'PG3 / SPI5_MISO',
     type:'GPIO',  funcs:['GPIO','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port G Pin 3. SPI5_MISO.'},

    {num:117, id:'PG4',      lbl:'PG4',    name:'PG4 / SPI5_SCK',
     type:'GPIO',  funcs:['GPIO','SPI'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port G Pin 4. SPI5_SCK.'},

    {num:118, id:'PG5',      lbl:'PG5',    name:'PG5 / SPI5_MOSI',
     type:'GPIO',  funcs:['GPIO','SPI','I2C'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port G Pin 5. SPI5_MOSI. I2C4_SMBA.'},

    {num:119, id:'PG6',      lbl:'PG6',    name:'PG6',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port G Pin 6. General purpose I/O.'},

    {num:120, id:'PG7',      lbl:'PG7',    name:'PG7',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port G Pin 7. General purpose I/O.'},

    {num:121, id:'PG8',      lbl:'PG8',    name:'PG8',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port G Pin 8. General purpose I/O.'},

    {num:122, id:'PH0',      lbl:'PH0',    name:'PH0 / OSC_IN',
     type:'GPIO',  funcs:['GPIO','XTAL'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port H Pin 0. High-speed oscillator input (4–50 MHz).'},

    {num:123, id:'PH1',      lbl:'PH1',    name:'PH1 / OSC_OUT',
     type:'GPIO',  funcs:['GPIO','XTAL'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port H Pin 1. High-speed oscillator output.'},

    {num:124, id:'NRST',     lbl:'NRST',   name:'NRST — System Reset',
     type:'RESET', funcs:['RESET'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Active-LOW system reset. Connect 100 nF cap to GND. Internal 40 kΩ pull-up.'},

    {num:125, id:'VSSA3',    lbl:'VSSA',   name:'VSSA3 — Analog Ground 3',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Analog ground reference 3.'},

    {num:126, id:'VDDA2',    lbl:'VDDA2',  name:'VDDA2 — Analog Supply 2',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Analog power supply 2. Decouple with 1 µF + 100 nF.'},

    {num:127, id:'VSS7',     lbl:'VSS',    name:'VSS7 — Digital Ground 7',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 7.'},

    {num:128, id:'VDD7',     lbl:'VDD',    name:'VDD7 — Digital Supply 7',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Digital supply 7. Decouple with 100 nF.'},

    {num:129, id:'PB16',     lbl:'PB16',   name:'PB16',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 16. General purpose I/O.'},

    {num:130, id:'PB17',     lbl:'PB17',   name:'PB17',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 17. General purpose I/O.'},

    {num:131, id:'PC13',     lbl:'PC13',   name:'PC13 / TAMPER-RTC / WKUP2',
     type:'GPIO',  funcs:['GPIO','INT'],
     volt:'1.8–3.6V', curr:'3mA',
     note:'Port C Pin 13. TAMPER / RTC alarm output. Output current limited to 3 mA.'},

    {num:132, id:'PC14',     lbl:'PC14',   name:'PC14 / OSC32_IN',
     type:'GPIO',  funcs:['GPIO','XTAL'],
     volt:'1.8–3.6V', curr:'3mA',
     note:'Port C Pin 14. Low-speed oscillator input (32.768 kHz LSE).'},

    {num:133, id:'PC15',     lbl:'PC15',   name:'PC15 / OSC32_OUT',
     type:'GPIO',  funcs:['GPIO','XTAL'],
     volt:'1.8–3.6V', curr:'3mA',
     note:'Port C Pin 15. Low-speed oscillator output.'},

    {num:134, id:'PB20',     lbl:'PB20',   name:'PB20 / WKUP5',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 20. Wakeup source WKUP5.'},

    {num:135, id:'PB21',     lbl:'PB21',   name:'PB21 / WKUP6',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port B Pin 21. Wakeup source WKUP6.'},

    {num:136, id:'PI0',      lbl:'PI0',    name:'PI0 / WKUP7',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port I Pin 0. Wakeup source WKUP7.'},

    {num:137, id:'PI1',      lbl:'PI1',    name:'PI1 / WKUP8',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port I Pin 1. Wakeup source WKUP8.'},

    {num:138, id:'VSS8',     lbl:'VSS',    name:'VSS8 — Digital Ground 8',
     type:'GND',   funcs:['GND'],
     volt:'0V',    curr:'N/A',
     note:'Digital ground reference 8.'},

    {num:139, id:'VDD8',     lbl:'VDD',    name:'VDD8 — Digital Supply 8',
     type:'PWR',   funcs:['PWR'],
     volt:'1.8–3.6V', curr:'N/A',
     note:'Digital supply 8. Decouple with 100 nF.'},

    {num:140, id:'PI2',      lbl:'PI2',    name:'PI2',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port I Pin 2. General purpose I/O.'},

    {num:141, id:'PI3',      lbl:'PI3',    name:'PI3',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port I Pin 3. General purpose I/O.'},

    {num:142, id:'PC16',     lbl:'PC16',   name:'PC16',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 16. General purpose I/O.'},

    {num:143, id:'PC17',     lbl:'PC17',   name:'PC17',
     type:'GPIO',  funcs:['GPIO'],
     volt:'1.8–3.6V', curr:'25mA',
     note:'Port C Pin 17. General purpose I/O.'},

    {num:144, id:'VDDIO2',   lbl:'VDDIO2', name:'VDDIO2 — GPIO Supply 2',
     type:'PWR',   funcs:['PWR'],
     volt:'1.65–3.6V', curr:'N/A',
     note:'Secondary GPIO power domain (for ports H/I/J). Separate from main VDD.'}

  ]

};
