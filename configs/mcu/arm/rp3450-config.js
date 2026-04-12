window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'RP2350',
  partMPN:      'RP2350A',
  manufacturer: 'Raspberry Pi Ltd',
  package:      'QFP-60',
  pinCount:     60,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/RP2350A/Raspberry%20Pi%20Ltd/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/RP2350A/Raspberry%20Pi%20Ltd/view-part/?ref=snapeda',
  datasheetURL: 'https://datasheets.raspberrypi.com/rp2350/rp2350-datasheet.pdf',

  // ── QFP LAYOUT ────────────────────────────────────────────────
  // 60 pins, 15 per side
  qfpConfig: {
    pinsPerSide: 15,
    bodySize:    420,
    pinLength:   28,
    pinWidth:    18,
    pinGap:      2,
  },

  // ── PINS ──────────────────────────────────────────────────────
  // QFP counter-clockwise: LEFT (1–15) → BOTTOM (16–30) → RIGHT (31–45) → TOP (46–60)
  // Pin 1 mark at top-left corner.
  pins: [
    // ── LEFT SIDE — pins 1–15, top → bottom ──────────────────
    {
      num: 1,  id: 'GP0',  lbl: 'GP0',  name: 'GPIO 0',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 0. Default UART0 TX (UART), SPI0 RX (SPI), I2C0 SDA (I2C), PWM0 A. Schmitt-trigger input, slew-rate and drive-strength configurable.'
    },
    {
      num: 2,  id: 'GP1',  lbl: 'GP1',  name: 'GPIO 1',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 1. Default UART0 RX (UART), SPI0 CSn (SPI), I2C0 SCL (I2C), PWM0 B. Schmitt-trigger input, slew-rate and drive-strength configurable.'
    },
    {
      num: 3,  id: 'GND_L1', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 4,  id: 'GP2',  lbl: 'GP2',  name: 'GPIO 2',
      type: 'GPIO', funcs: ['GPIO','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 2. Default SPI0 SCK, I2C1 SDA, PWM1 A. Full digital I/O with configurable pull-up / pull-down.'
    },
    {
      num: 5,  id: 'GP3',  lbl: 'GP3',  name: 'GPIO 3',
      type: 'GPIO', funcs: ['GPIO','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 3. Default SPI0 TX, I2C1 SCL, PWM1 B. Full digital I/O with configurable pull-up / pull-down.'
    },
    {
      num: 6,  id: 'GP4',  lbl: 'GP4',  name: 'GPIO 4',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 4. Default UART1 TX, SPI0 RX (alt), I2C0 SDA (alt), PWM2 A.'
    },
    {
      num: 7,  id: 'GP5',  lbl: 'GP5',  name: 'GPIO 5',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 5. Default UART1 RX, SPI0 CSn (alt), I2C0 SCL (alt), PWM2 B.'
    },
    {
      num: 8,  id: 'GND_L2', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 9,  id: 'GP6',  lbl: 'GP6',  name: 'GPIO 6',
      type: 'GPIO', funcs: ['GPIO','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 6. Default SPI0 SCK (alt), I2C1 SDA (alt), PWM3 A.'
    },
    {
      num: 10, id: 'GP7',  lbl: 'GP7',  name: 'GPIO 7',
      type: 'GPIO', funcs: ['GPIO','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 7. Default SPI0 TX (alt), I2C1 SCL (alt), PWM3 B.'
    },
    {
      num: 11, id: 'GP8',  lbl: 'GP8',  name: 'GPIO 8',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 8. Default UART1 TX (alt), SPI1 RX, I2C0 SDA (alt), PWM4 A.'
    },
    {
      num: 12, id: 'GP9',  lbl: 'GP9',  name: 'GPIO 9',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 9. Default UART1 RX (alt), SPI1 CSn, I2C0 SCL (alt), PWM4 B.'
    },
    {
      num: 13, id: 'GND_L3', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 14, id: 'GP10', lbl: 'GP10', name: 'GPIO 10',
      type: 'GPIO', funcs: ['GPIO','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 10. Default SPI1 SCK, I2C1 SDA (alt), PWM5 A.'
    },
    {
      num: 15, id: 'GP11', lbl: 'GP11', name: 'GPIO 11',
      type: 'GPIO', funcs: ['GPIO','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 11. Default SPI1 TX, I2C1 SCL (alt), PWM5 B.'
    },

    // ── BOTTOM SIDE — pins 16–30, left → right ────────────────
    {
      num: 16, id: 'GP12', lbl: 'GP12', name: 'GPIO 12',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 12. Default UART0 TX (alt), SPI1 RX (alt), I2C0 SDA (alt), PWM6 A.'
    },
    {
      num: 17, id: 'GP13', lbl: 'GP13', name: 'GPIO 13',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 13. Default UART0 RX (alt), SPI1 CSn (alt), I2C0 SCL (alt), PWM6 B.'
    },
    {
      num: 18, id: 'GND_B1', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 19, id: 'GP14', lbl: 'GP14', name: 'GPIO 14',
      type: 'GPIO', funcs: ['GPIO','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 14. Default SPI1 SCK (alt), I2C1 SDA (alt), PWM7 A.'
    },
    {
      num: 20, id: 'GP15', lbl: 'GP15', name: 'GPIO 15',
      type: 'GPIO', funcs: ['GPIO','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 15. Default SPI1 TX (alt), I2C1 SCL (alt), PWM7 B.'
    },
    {
      num: 21, id: 'TESTEN', lbl: 'TSTEN', name: 'Test Enable',
      type: 'GPIO', funcs: ['GPIO'],
      volt: '3.3V', curr: 'N/A',
      note: 'Test enable pin — must be connected to GND in all normal operation. Pulling high enters factory test mode and is not intended for end-user use.'
    },
    {
      num: 22, id: 'XIN',   lbl: 'XIN',  name: 'Crystal Oscillator In',
      type: 'XTAL', funcs: ['XTAL'],
      volt: '1.8V', curr: 'N/A',
      note: 'Crystal oscillator input. Connect a 12 MHz crystal between XIN and XOUT. Can also accept a CMOS clock source directly on this pin with XOUT left unconnected.'
    },
    {
      num: 23, id: 'XOUT',  lbl: 'XOUT', name: 'Crystal Oscillator Out',
      type: 'XTAL', funcs: ['XTAL'],
      volt: '1.8V', curr: 'N/A',
      note: 'Crystal oscillator output. Connect the other leg of the 12 MHz crystal here. Leave unconnected when driving XIN directly with an external clock source.'
    },
    {
      num: 24, id: 'VDDIO_B0', lbl: 'VIO',  name: 'I/O Supply (Bank 0)',
      type: 'PWR', funcs: ['PWR'],
      volt: '1.8–3.3V', curr: 'N/A',
      note: 'I/O supply voltage for GPIO bank 0. Can be 1.8 V or 3.3 V. All GPIOs in this bank operate at VDDIO_QSPI level. Decouple with 100 nF + 10 µF capacitors close to the pin.'
    },
    {
      num: 25, id: 'GND_B2', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 26, id: 'USB_DM', lbl: 'D−',   name: 'USB D−',
      type: 'USB', funcs: ['USB'],
      volt: '3.3V', curr: '500mA',
      note: 'USB 1.1 full-speed (12 Mbit/s) / low-speed (1.5 Mbit/s) differential data minus. Integrated pull-up/pull-down resistors controlled by the USB controller. Connect directly to USB connector with short, matched-length traces.'
    },
    {
      num: 27, id: 'USB_DP', lbl: 'D+',   name: 'USB D+',
      type: 'USB', funcs: ['USB'],
      volt: '3.3V', curr: '500mA',
      note: 'USB 1.1 full-speed / low-speed differential data plus. Pair with USB_DM using matched-length, impedance-controlled differential traces (90 Ω differential).'
    },
    {
      num: 28, id: 'GND_B3', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 29, id: 'VDD',   lbl: 'VDD',  name: 'Core Supply Voltage',
      type: 'PWR', funcs: ['PWR'],
      volt: '1.1V', curr: 'N/A',
      note: 'Digital core supply. Nominally 1.1 V, generated internally by the on-chip SMPS from VREG_VIN, or supplied externally. Decouple with 100 nF close to each VDD pin.'
    },
    {
      num: 30, id: 'VDD_2', lbl: 'VDD',  name: 'Core Supply Voltage (2)',
      type: 'PWR', funcs: ['PWR'],
      volt: '1.1V', curr: 'N/A',
      note: 'Second digital core supply pin. Connect to the same 1.1 V supply as VDD. Required for adequate decoupling — do not leave floating.'
    },

    // ── RIGHT SIDE — pins 31–45, bottom → top ────────────────
    {
      num: 31, id: 'GND_R1', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 32, id: 'VREG_VIN', lbl: 'VREG', name: 'Voltage Regulator Input',
      type: 'PWR', funcs: ['PWR'],
      volt: '1.8–3.3V', curr: 'N/A',
      note: 'Input to the on-chip switch-mode power supply that generates the 1.1 V core rail. Accepts 1.8–3.3 V. Decouple with 1 µF ceramic capacitor. Can be tied to IOVDD when running from 3.3 V.'
    },
    {
      num: 33, id: 'VREG_VOUT', lbl: 'VOUT', name: 'Voltage Regulator Output',
      type: 'PWR', funcs: ['PWR'],
      volt: '1.1V', curr: 'N/A',
      note: 'Output of the on-chip SMPS. Nominally 1.1 V. Connect to all VDD pins. Add 1 µF decoupling capacitor and a small ferrite bead in series when routing to VDD to reduce noise coupling.'
    },
    {
      num: 34, id: 'GND_R2', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 35, id: 'GP26_ADC0', lbl: 'GP26', name: 'GPIO 26 / ADC 0',
      type: 'ADC', funcs: ['ADC','GPIO','I2C','SPI'],
      volt: '3.3V', curr: '4mA',
      note: 'GPIO 26 with dedicated ADC input channel 0 (12-bit, up to 500 ksps). Also serves as I2C1 SDA, SPI1 SCK. When used as ADC, apply signal within 0–3.3 V range. Do not apply voltage when VDDIO_ADC is unpowered.'
    },
    {
      num: 36, id: 'GP27_ADC1', lbl: 'GP27', name: 'GPIO 27 / ADC 1',
      type: 'ADC', funcs: ['ADC','GPIO','I2C','SPI'],
      volt: '3.3V', curr: '4mA',
      note: 'GPIO 27 with dedicated ADC input channel 1 (12-bit, up to 500 ksps). Also serves as I2C1 SCL, SPI1 TX. Internally shared ADC SAR with ADC0, ADC2, and the temperature sensor.'
    },
    {
      num: 37, id: 'GND_R3', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 38, id: 'GP28_ADC2', lbl: 'GP28', name: 'GPIO 28 / ADC 2',
      type: 'ADC', funcs: ['ADC','GPIO','UART','SPI'],
      volt: '3.3V', curr: '4mA',
      note: 'GPIO 28 with dedicated ADC input channel 2 (12-bit, up to 500 ksps). Also serves as UART0 TX (alt), SPI1 RX (alt). Keep trace short and away from switching signals for best ADC accuracy.'
    },
    {
      num: 39, id: 'GP29_ADC3', lbl: 'GP29', name: 'GPIO 29 / ADC 3',
      type: 'ADC', funcs: ['ADC','GPIO','UART','SPI'],
      volt: '3.3V', curr: '4mA',
      note: 'GPIO 29 with dedicated ADC input channel 3 (12-bit, up to 500 ksps). Also serves as UART0 RX (alt), SPI1 CSn (alt). On Pico boards this pin monitors VSYS/3 for battery level sensing.'
    },
    {
      num: 40, id: 'AGND',  lbl: 'AGND', name: 'ADC Analogue Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Analogue ground for the ADC subsystem. Connect directly to the main ground plane with a low-impedance path. Keep separate from noisy digital ground return currents where possible.'
    },
    {
      num: 41, id: 'ADC_AVDD', lbl: 'AVDD', name: 'ADC Analogue Supply',
      type: 'PWR', funcs: ['PWR'],
      volt: '3.3V', curr: 'N/A',
      note: 'Analogue supply for the ADC and analogue references. Should be the cleanest available 3.3 V on the board. Decouple with 100 nF + 1 µF ceramics. Use a ferrite bead to isolate from the digital IOVDD if ADC noise performance is critical.'
    },
    {
      num: 42, id: 'GND_R4', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 43, id: 'GP22', lbl: 'GP22', name: 'GPIO 22',
      type: 'GPIO', funcs: ['GPIO','I2C','SPI','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 22. Default I2C0 SDA (alt), SPI0 SCK (alt), PWM3 A (alt). Supports PIO state-machine assignment like all other GPIOs.'
    },
    {
      num: 44, id: 'GP21', lbl: 'GP21', name: 'GPIO 21',
      type: 'GPIO', funcs: ['GPIO','I2C','SPI','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 21. Default I2C0 SCL (alt), SPI0 TX (alt), PWM2 B (alt).'
    },
    {
      num: 45, id: 'GP20', lbl: 'GP20', name: 'GPIO 20',
      type: 'GPIO', funcs: ['GPIO','UART','I2C','SPI','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 20. Default UART1 TX (alt), I2C0 SDA (alt), SPI0 RX (alt), PWM2 A (alt).'
    },

    // ── TOP SIDE — pins 46–60, right → left ──────────────────
    {
      num: 46, id: 'GP19', lbl: 'GP19', name: 'GPIO 19',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 19. Default UART1 RX (alt), SPI0 TX, I2C1 SCL, PWM1 B (alt).'
    },
    {
      num: 47, id: 'GP18', lbl: 'GP18', name: 'GPIO 18',
      type: 'GPIO', funcs: ['GPIO','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 18. Default SPI0 SCK, I2C1 SDA, PWM1 A (alt).'
    },
    {
      num: 48, id: 'GND_T1', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 49, id: 'GP17', lbl: 'GP17', name: 'GPIO 17',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 17. Default UART0 RX (alt), SPI0 CSn, I2C0 SCL (alt), PWM0 B (alt).'
    },
    {
      num: 50, id: 'GP16', lbl: 'GP16', name: 'GPIO 16',
      type: 'GPIO', funcs: ['GPIO','UART','SPI','I2C','PWM'],
      volt: '3.3V', curr: '4mA',
      note: 'General-purpose I/O 16. Default UART0 TX (alt), SPI0 RX, I2C0 SDA (alt), PWM0 A (alt). Also usable as a PIO state-machine I/O.'
    },
    {
      num: 51, id: 'RUN',   lbl: 'RUN',  name: 'Run / Reset',
      type: 'RESET', funcs: ['RESET'],
      volt: '3.3V', curr: 'N/A',
      note: 'Active-high enable and reset. Pull low to hold the chip in reset; release to run. Has an internal pull-up — can be left unconnected in designs that never need a hardware reset button. Drive with an open-drain signal or simple push-button to GND.'
    },
    {
      num: 52, id: 'GND_T2', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 53, id: 'IOVDD_B1', lbl: 'IOVDD', name: 'I/O Supply Voltage (Bank 1)',
      type: 'PWR', funcs: ['PWR'],
      volt: '1.8–3.3V', curr: 'N/A',
      note: 'I/O supply for GPIO bank 1 (GP16–GP29 and higher). Accepts 1.8–3.3 V independently of bank 0. Decouple with 100 nF + 10 µF capacitors close to the pin.'
    },
    {
      num: 54, id: 'SWCLK', lbl: 'SWCLK', name: 'SWD Clock',
      type: 'JTAG', funcs: ['JTAG'],
      volt: '3.3V', curr: 'N/A',
      note: 'Serial Wire Debug clock. Part of the 2-wire SWD debug interface (SWCLK + SWDIO). Used by debuggers such as J-Link, CMSIS-DAP, and the Raspberry Pi Debug Probe to program flash and debug both cores.'
    },
    {
      num: 55, id: 'SWDIO', lbl: 'SWDIO', name: 'SWD Data I/O',
      type: 'JTAG', funcs: ['JTAG'],
      volt: '3.3V', curr: 'N/A',
      note: 'Serial Wire Debug bidirectional data. Combined with SWCLK to form the standard SWD interface. Both pins have internal pull-up resistors. Bring both signals out on a debug header for ease of programming.'
    },
    {
      num: 56, id: 'GND_T3', lbl: 'GND', name: 'Ground',
      type: 'GND', funcs: ['GND'],
      volt: '0V', curr: 'N/A',
      note: 'Ground reference. Must be connected to system ground plane.'
    },
    {
      num: 57, id: 'QSPI_SD3', lbl: 'SD3',  name: 'QSPI Data 3',
      type: 'SPI', funcs: ['SPI'],
      volt: '3.3V', curr: '4mA',
      note: 'QSPI/SPI data line 3 for the external flash interface. Part of the dedicated quad-SPI bus used to execute-in-place (XIP) code from external SPI/QSPI flash memory. Do not repurpose for user GPIO in normal designs.'
    },
    {
      num: 58, id: 'QSPI_SD2', lbl: 'SD2',  name: 'QSPI Data 2',
      type: 'SPI', funcs: ['SPI'],
      volt: '3.3V', curr: '4mA',
      note: 'QSPI/SPI data line 2 for the external flash interface. Connects to the HOLD# / WP# pin of the flash device depending on flash package. Required for quad-mode XIP operation.'
    },
    {
      num: 59, id: 'QSPI_SS', lbl: 'SS',   name: 'QSPI Chip Select',
      type: 'SPI', funcs: ['SPI'],
      volt: '3.3V', curr: '4mA',
      note: 'Active-low chip-select for the dedicated external flash. The SSI controller drives this automatically during XIP and explicit flash transactions. Connect to CS# of the external SPI/QSPI flash.'
    },
    {
      num: 60, id: 'QSPI_SCLK', lbl: 'SCLK', name: 'QSPI Serial Clock',
      type: 'SPI', funcs: ['SPI'],
      volt: '3.3V', curr: '4mA',
      note: 'Clock for the dedicated external flash interface. Driven by the on-chip SSI peripheral. Supports standard SPI, dual-SPI, and quad-SPI modes. Maximum clock rate depends on the flash device — typically up to 133 MHz.'
    },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'GP0':        ['UART0_TX', 'SPI0_RX',  'I2C0_SDA', 'PWM0_A', 'PIO0', 'PIO1', 'PIO2'],
    'GP1':        ['UART0_RX', 'SPI0_CSn', 'I2C0_SCL', 'PWM0_B', 'PIO0', 'PIO1', 'PIO2'],
    'GP2':        ['SPI0_SCK', 'I2C1_SDA', 'PWM1_A',   'PIO0', 'PIO1', 'PIO2'],
    'GP3':        ['SPI0_TX',  'I2C1_SCL', 'PWM1_B',   'PIO0', 'PIO1', 'PIO2'],
    'GP4':        ['UART1_TX', 'SPI0_RX',  'I2C0_SDA', 'PWM2_A', 'PIO0', 'PIO1', 'PIO2'],
    'GP5':        ['UART1_RX', 'SPI0_CSn', 'I2C0_SCL', 'PWM2_B', 'PIO0', 'PIO1', 'PIO2'],
    'GP6':        ['SPI0_SCK', 'I2C1_SDA', 'PWM3_A',   'PIO0', 'PIO1', 'PIO2'],
    'GP7':        ['SPI0_TX',  'I2C1_SCL', 'PWM3_B',   'PIO0', 'PIO1', 'PIO2'],
    'GP8':        ['UART1_TX', 'SPI1_RX',  'I2C0_SDA', 'PWM4_A', 'PIO0', 'PIO1', 'PIO2'],
    'GP9':        ['UART1_RX', 'SPI1_CSn', 'I2C0_SCL', 'PWM4_B', 'PIO0', 'PIO1', 'PIO2'],
    'GP10':       ['SPI1_SCK', 'I2C1_SDA', 'PWM5_A',   'PIO0', 'PIO1', 'PIO2'],
    'GP11':       ['SPI1_TX',  'I2C1_SCL', 'PWM5_B',   'PIO0', 'PIO1', 'PIO2'],
    'GP12':       ['UART0_TX', 'SPI1_RX',  'I2C0_SDA', 'PWM6_A', 'PIO0', 'PIO1', 'PIO2'],
    'GP13':       ['UART0_RX', 'SPI1_CSn', 'I2C0_SCL', 'PWM6_B', 'PIO0', 'PIO1', 'PIO2'],
    'GP14':       ['SPI1_SCK', 'I2C1_SDA', 'PWM7_A',   'PIO0', 'PIO1', 'PIO2'],
    'GP15':       ['SPI1_TX',  'I2C1_SCL', 'PWM7_B',   'PIO0', 'PIO1', 'PIO2'],
    'GP16':       ['UART0_TX', 'SPI0_RX',  'I2C0_SDA', 'PWM0_A', 'PIO0', 'PIO1', 'PIO2'],
    'GP17':       ['UART0_RX', 'SPI0_CSn', 'I2C0_SCL', 'PWM0_B', 'PIO0', 'PIO1', 'PIO2'],
    'GP18':       ['SPI0_SCK', 'I2C1_SDA', 'PWM1_A',   'PIO0', 'PIO1', 'PIO2'],
    'GP19':       ['UART1_RX', 'SPI0_TX',  'I2C1_SCL', 'PWM1_B', 'PIO0', 'PIO1', 'PIO2'],
    'GP20':       ['UART1_TX', 'SPI0_RX',  'I2C0_SDA', 'PWM2_A', 'PIO0', 'PIO1', 'PIO2'],
    'GP21':       ['SPI0_TX',  'I2C0_SCL', 'PWM2_B',   'PIO0', 'PIO1', 'PIO2'],
    'GP22':       ['SPI0_SCK', 'I2C0_SDA', 'PWM3_A',   'PIO0', 'PIO1', 'PIO2'],
    'GP26_ADC0':  ['ADC_CH0', 'SPI1_SCK', 'I2C1_SDA'],
    'GP27_ADC1':  ['ADC_CH1', 'SPI1_TX',  'I2C1_SCL'],
    'GP28_ADC2':  ['ADC_CH2', 'UART0_TX', 'SPI1_RX'],
    'GP29_ADC3':  ['ADC_CH3', 'UART0_RX', 'SPI1_CSn'],
    'SWCLK':      ['SWD_CLK'],
    'SWDIO':      ['SWD_DIO'],
    'QSPI_SD3':   ['XIP_SD3'],
    'QSPI_SD2':   ['XIP_SD2'],
    'QSPI_SS':    ['XIP_CSn'],
    'QSPI_SCLK':  ['XIP_SCK'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    {label: 'Cores',      value: '2 × Cortex-M33 + 2 × RISC-V Hazard3', color: '#e0e5ec'},
    {label: 'Speed',      value: 'Up to 150 MHz',                         color: '#c8a850'},
    {label: 'Flash',      value: '520 KB SRAM + external QSPI flash',     color: '#e0e5ec'},
    {label: 'Supply',     value: '1.8–3.3 V I/O, 1.1 V core (on-chip SMPS)', color: '#78c878'},
    {label: 'ADC',        value: '12-bit, 4 channels, 500 ksps',          color: '#c8a850'},
    {label: 'Interfaces', value: 'USB 1.1, 2× SPI, 2× I²C, 2× UART, 3× PIO'},
    {label: 'Security',   value: 'Secure boot, OTP, TrustZone-M',         color: '#4a9aee'},
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    {label: 'Architecture',      value: 'Dual Arm Cortex-M33 (150 MHz) + dual RISC-V Hazard3 (125 MHz) — user-selectable'},
    {label: 'SRAM',              value: '520 KB on-chip (10 × 52 KB banks)'},
    {label: 'ROM',               value: '32 KB on-chip bootrom'},
    {label: 'OTP',               value: '8 Kbit one-time-programmable fuses (16 Kbit raw)'},
    {label: 'External Flash',    value: 'Dedicated QSPI bus, up to 16 MB; execute-in-place (XIP) supported'},
    {label: 'DMA',               value: '12-channel DMA controller'},
    {label: 'PWM',               value: '24 PWM channels (12 slices), each with independent clock divider'},
    {label: 'PIO',               value: '3 × PIO state-machine blocks, 4 state machines each (12 total)'},
    {label: 'Timers',            value: '2 × 64-bit general-purpose timers, each with 4 alarm comparators'},
    {label: 'Watchdog',          value: 'Dual watchdog timers'},
    {label: 'USB',               value: 'USB 1.1 controller and PHY, host or device mode, full-speed 12 Mbit/s'},
    {label: 'I²C',               value: '2 × I²C controllers, up to 1 Mbit/s (Fast-mode Plus)'},
    {label: 'SPI',               value: '2 × SPI (Motorola), up to 62.5 MHz, plus 1 × SSI for QSPI flash'},
    {label: 'UART',              value: '2 × UART with hardware flow control'},
    {label: 'ADC',               value: '12-bit SAR ADC, 4 external channels (GP26–GP29), 1 internal temp sensor'},
    {label: 'Security',          value: 'TrustZone-M, secure boot via signed OTP keys, SHA-256 hardware accelerator'},
    {label: 'Crypto',            value: 'AES-128/256, SHA-256, TRNG on-chip'},
    {label: 'Operating Temp.',   value: '−40 °C to +85 °C'},
    {label: 'Package',           value: '7 × 7 mm QFP-60 (0.4 mm pitch) or 2 × 2 mm QFN-30 (RP2350B in QFN-80 for more GPIO)'},
    {label: 'GPIO',              value: '30 user-accessible GPIOs (RP2350A QFP-60); 48 on RP2350B QFN-80'},
  ],

  // ── KEY FEATURES ─────────────────────────────────────────────
  dsFeatures: [
    'Dual Arm Cortex-M33 cores with TrustZone-M security and DSP/FPU extensions, running up to 150 MHz',
    'Two additional RISC-V Hazard3 cores — either ARM or RISC-V cores can be used at boot time',
    'Three Programmable I/O (PIO) blocks with 4 state machines each, enabling flexible custom peripherals at high speed',
    'On-chip switched-mode power supply generates 1.1 V core rail from 1.8–3.3 V input',
    'Dedicated QSPI flash bus for execute-in-place operation from external SPI/QSPI flash',
    'USB 1.1 full-speed controller with integrated PHY, supporting host and device modes',
    'Hardware AES-128/256 and SHA-256 accelerators with TRNG for secure applications',
    'Secure boot with OTP-based key storage and boot signing verification',
    '12-bit ADC with 4 user channels and an internal temperature sensor channel',
    '24-channel PWM with independent clocking per slice, suitable for motor control and audio',
    '12-channel DMA controller offloads data transfers from both cores',
    'Dual independent I/O voltage banks (IOVDD) supporting mixed 1.8 V / 3.3 V systems',
  ],
};