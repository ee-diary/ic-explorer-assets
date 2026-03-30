

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'Raspberry Pi 3',
  partMPN:      'Raspberry Pi 3 Model B',
  manufacturer: 'Raspberry Pi Foundation',
  package:      'Raspberry Pi 3 Model B',
  pinCount:     40,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/SC0073/Raspberry+Pi/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/SC0073/Raspberry+Pi/view-part/?ref=snapeda',
  datasheetURL: 'https://datasheets.raspberrypi.com/rpi3/raspberry-pi-3-b-product-brief.pdf',

  // ── PINS ──────────────────────────────────────────────────────
  pins: [
    /* Row 0 */
    { num:  1, id: 'P3V3_1',  lbl: '3V3',  name: '3.3V Power',           type: 'PWR',  funcs: ['PWR'],              volt: '3.3V', curr: '~50mA max',     note: '3.3V supply from onboard LDO. Shared total ~50mA budget with all 3.3V pins. Use for low-power sensors only.' },
    { num:  2, id: 'P5V_2',   lbl: '5V',   name: '5V Power',             type: 'PWR',  funcs: ['PWR'],              volt: '5V',   curr: 'PSU limited',   note: '5V input direct from micro-USB supply. Current limited only by your power supply — a 2.5A PSU is recommended.' },
    /* Row 1 */
    { num:  3, id: 'GPIO2',   lbl: 'G2',   name: 'GPIO 2 / SDA1',       type: 'I2C',  funcs: ['GPIO', 'I2C'],      volt: '3.3V', curr: '16mA',          note: 'I2C1 Data (SDA). Has 1.8kΩ pull-up to 3.3V on board. Use with smbus2 or the RPi GPIO library.' },
    { num:  4, id: 'P5V_4',   lbl: '5V',   name: '5V Power',             type: 'PWR',  funcs: ['PWR'],              volt: '5V',   curr: 'PSU limited',   note: 'Second 5V pin. Same net as pin 2.' },
    /* Row 2 */
    { num:  5, id: 'GPIO3',   lbl: 'G3',   name: 'GPIO 3 / SCL1',       type: 'I2C',  funcs: ['GPIO', 'I2C'],      volt: '3.3V', curr: '16mA',          note: 'I2C1 Clock (SCL). Has 1.8kΩ pull-up to 3.3V on board.' },
    { num:  6, id: 'GND_6',   lbl: 'GND',  name: 'Ground',               type: 'GND',  funcs: ['GND'],              volt: '0V',   curr: 'N/A',           note: 'Ground reference.' },
    /* Row 3 */
    { num:  7, id: 'GPIO4',   lbl: 'G4',   name: 'GPIO 4 / GPCLK0',     type: 'TIMER',funcs: ['GPIO', 'TIMER'],    volt: '3.3V', curr: '16mA',          note: 'General clock output GPCLK0. Also used as BOOT mode pin via config.txt.' },
    { num:  8, id: 'GPIO14',  lbl: 'G14',  name: 'GPIO 14 / TXD0',      type: 'UART', funcs: ['GPIO', 'UART'],     volt: '3.3V', curr: '16mA',          note: 'UART0 transmit. Disable the Linux console in raspi-config to free this pin for general UART use.' },
    /* Row 4 */
    { num:  9, id: 'GND_9',   lbl: 'GND',  name: 'Ground',               type: 'GND',  funcs: ['GND'],              volt: '0V',   curr: 'N/A',           note: 'Ground reference.' },
    { num: 10, id: 'GPIO15',  lbl: 'G15',  name: 'GPIO 15 / RXD0',      type: 'UART', funcs: ['GPIO', 'UART'],     volt: '3.3V', curr: '16mA',          note: 'UART0 receive. Has built-in pull-up. Disable the Linux serial console in raspi-config before use.' },
    /* Row 5 */
    { num: 11, id: 'GPIO17',  lbl: 'G17',  name: 'GPIO 17',             type: 'GPIO', funcs: ['GPIO'],             volt: '3.3V', curr: '16mA',          note: 'General purpose I/O. Default input with no pull resistor configured.' },
    { num: 12, id: 'GPIO18',  lbl: 'G18',  name: 'GPIO 18 / PCM_CLK',  type: 'PWM',  funcs: ['GPIO', 'PWM', 'SPI'], volt: '3.3V', curr: '16mA',        note: 'Hardware PWM0 (shared with GPIO12). Also PCM Clock and SPI1 CE0.' },
    /* Row 6 */
    { num: 13, id: 'GPIO27',  lbl: 'G27',  name: 'GPIO 27',             type: 'GPIO', funcs: ['GPIO'],             volt: '3.3V', curr: '16mA',          note: 'General purpose I/O.' },
    { num: 14, id: 'GND_14',  lbl: 'GND',  name: 'Ground',              type: 'GND',  funcs: ['GND'],              volt: '0V',   curr: 'N/A',           note: 'Ground reference.' },
    /* Row 7 */
    { num: 15, id: 'GPIO22',  lbl: 'G22',  name: 'GPIO 22',             type: 'GPIO', funcs: ['GPIO'],             volt: '3.3V', curr: '16mA',          note: 'General purpose I/O.' },
    { num: 16, id: 'GPIO23',  lbl: 'G23',  name: 'GPIO 23',             type: 'GPIO', funcs: ['GPIO'],             volt: '3.3V', curr: '16mA',          note: 'General purpose I/O.' },
    /* Row 8 */
    { num: 17, id: 'P3V3_17', lbl: '3V3',  name: '3.3V Power',          type: 'PWR',  funcs: ['PWR'],              volt: '3.3V', curr: '~50mA max',     note: 'Second 3.3V supply pin. Same net as pin 1.' },
    { num: 18, id: 'GPIO24',  lbl: 'G24',  name: 'GPIO 24',             type: 'GPIO', funcs: ['GPIO'],             volt: '3.3V', curr: '16mA',          note: 'General purpose I/O.' },
    /* Row 9 */
    { num: 19, id: 'GPIO10',  lbl: 'G10',  name: 'GPIO 10 / MOSI',     type: 'SPI',  funcs: ['GPIO', 'SPI'],      volt: '3.3V', curr: '16mA',          note: 'SPI0 MOSI (Master Out Slave In).' },
    { num: 20, id: 'GND_20',  lbl: 'GND',  name: 'Ground',              type: 'GND',  funcs: ['GND'],              volt: '0V',   curr: 'N/A',           note: 'Ground reference.' },
    /* Row 10 */
    { num: 21, id: 'GPIO9',   lbl: 'G9',   name: 'GPIO 9 / MISO',      type: 'SPI',  funcs: ['GPIO', 'SPI'],      volt: '3.3V', curr: '16mA',          note: 'SPI0 MISO (Master In Slave Out).' },
    { num: 22, id: 'GPIO25',  lbl: 'G25',  name: 'GPIO 25',             type: 'GPIO', funcs: ['GPIO'],             volt: '3.3V', curr: '16mA',          note: 'General purpose I/O.' },
    /* Row 11 */
    { num: 23, id: 'GPIO11',  lbl: 'G11',  name: 'GPIO 11 / SCLK',     type: 'SPI',  funcs: ['GPIO', 'SPI'],      volt: '3.3V', curr: '16mA',          note: 'SPI0 Clock.' },
    { num: 24, id: 'GPIO8',   lbl: 'G8',   name: 'GPIO 8 / CE0',       type: 'SPI',  funcs: ['GPIO', 'SPI'],      volt: '3.3V', curr: '16mA',          note: 'SPI0 Chip Enable 0 (active low).' },
    /* Row 12 */
    { num: 25, id: 'GND_25',  lbl: 'GND',  name: 'Ground',              type: 'GND',  funcs: ['GND'],              volt: '0V',   curr: 'N/A',           note: 'Ground reference.' },
    { num: 26, id: 'GPIO7',   lbl: 'G7',   name: 'GPIO 7 / CE1',       type: 'SPI',  funcs: ['GPIO', 'SPI'],      volt: '3.3V', curr: '16mA',          note: 'SPI0 Chip Enable 1 (active low).' },
    /* Row 13 */
    { num: 27, id: 'ID_SD',   lbl: 'IDSD', name: 'ID EEPROM SDA',      type: 'I2C',  funcs: ['I2C'],              volt: '3.3V', curr: 'N/A',           note: 'HAT ID EEPROM I2C data. Reserved for HAT identification only — do not use for general I/O.' },
    { num: 28, id: 'ID_SC',   lbl: 'IDSC', name: 'ID EEPROM SCL',      type: 'I2C',  funcs: ['I2C'],              volt: '3.3V', curr: 'N/A',           note: 'HAT ID EEPROM I2C clock. Reserved for HAT identification only.' },
    /* Row 14 */
    { num: 29, id: 'GPIO5',   lbl: 'G5',   name: 'GPIO 5 / GPCLK1',    type: 'TIMER',funcs: ['GPIO', 'TIMER'],    volt: '3.3V', curr: '16mA',          note: 'General clock output GPCLK1.' },
    { num: 30, id: 'GND_30',  lbl: 'GND',  name: 'Ground',              type: 'GND',  funcs: ['GND'],              volt: '0V',   curr: 'N/A',           note: 'Ground reference.' },
    /* Row 15 */
    { num: 31, id: 'GPIO6',   lbl: 'G6',   name: 'GPIO 6 / GPCLK2',    type: 'TIMER',funcs: ['GPIO', 'TIMER'],    volt: '3.3V', curr: '16mA',          note: 'General clock output GPCLK2.' },
    { num: 32, id: 'GPIO12',  lbl: 'G12',  name: 'GPIO 12 / PWM0',     type: 'PWM',  funcs: ['GPIO', 'PWM'],      volt: '3.3V', curr: '16mA',          note: 'Hardware PWM channel 0. 16-bit resolution; use pigpio for precise frequency control.' },
    /* Row 16 */
    { num: 33, id: 'GPIO13',  lbl: 'G13',  name: 'GPIO 13 / PWM1',     type: 'PWM',  funcs: ['GPIO', 'PWM'],      volt: '3.3V', curr: '16mA',          note: 'Hardware PWM channel 1.' },
    { num: 34, id: 'GND_34',  lbl: 'GND',  name: 'Ground',              type: 'GND',  funcs: ['GND'],              volt: '0V',   curr: 'N/A',           note: 'Ground reference.' },
    /* Row 17 */
    { num: 35, id: 'GPIO19',  lbl: 'G19',  name: 'GPIO 19 / PCM_FS',   type: 'PWM',  funcs: ['GPIO', 'PWM', 'SPI'], volt: '3.3V', curr: '16mA',        note: 'Hardware PWM1 alternate. Also PCM Frame Sync and SPI1 MISO.' },
    { num: 36, id: 'GPIO16',  lbl: 'G16',  name: 'GPIO 16',             type: 'GPIO', funcs: ['GPIO', 'SPI'],      volt: '3.3V', curr: '16mA',          note: 'SPI1 CE2 alternate function.' },
    /* Row 18 */
    { num: 37, id: 'GPIO26',  lbl: 'G26',  name: 'GPIO 26',             type: 'GPIO', funcs: ['GPIO'],             volt: '3.3V', curr: '16mA',          note: 'General purpose I/O.' },
    { num: 38, id: 'GPIO20',  lbl: 'G20',  name: 'GPIO 20 / PCM_DIN',  type: 'SPI',  funcs: ['GPIO', 'SPI'],      volt: '3.3V', curr: '16mA',          note: 'SPI1 MOSI and PCM Data In.' },
    /* Row 19 */
    { num: 39, id: 'GND_39',  lbl: 'GND',  name: 'Ground',              type: 'GND',  funcs: ['GND'],              volt: '0V',   curr: 'N/A',           note: 'Ground reference.' },
    { num: 40, id: 'GPIO21',  lbl: 'G21',  name: 'GPIO 21 / PCM_DOUT', type: 'SPI',  funcs: ['GPIO', 'SPI'],      volt: '3.3V', curr: '16mA',          note: 'SPI1 SCLK and PCM Data Out.' },
  ],

  // ── ALTERNATE FUNCTIONS ───────────────────────────────────────
  altFuncs: {
    'GPIO2':  ['I2C1_SDA', 'BSC1'],
    'GPIO3':  ['I2C1_SCL', 'BSC1'],
    'GPIO4':  ['GPCLK0'],
    'GPIO5':  ['GPCLK1'],
    'GPIO6':  ['GPCLK2'],
    'GPIO7':  ['SPI0_CE1'],
    'GPIO8':  ['SPI0_CE0'],
    'GPIO9':  ['SPI0_MISO'],
    'GPIO10': ['SPI0_MOSI'],
    'GPIO11': ['SPI0_SCLK'],
    'GPIO12': ['PWM0'],
    'GPIO13': ['PWM1'],
    'GPIO14': ['UART0_TXD'],
    'GPIO15': ['UART0_RXD'],
    'GPIO16': ['SPI1_CE2'],
    'GPIO17': ['SPI1_CE1'],
    'GPIO18': ['SPI1_CE0', 'PCM_CLK'],
    'GPIO19': ['SPI1_MISO', 'PCM_FS'],
    'GPIO20': ['SPI1_MOSI', 'PCM_DIN'],
    'GPIO21': ['SPI1_SCLK', 'PCM_DOUT'],
    'GPIO22': ['SD1_CLK'],
    'GPIO23': ['SD1_CMD'],
    'GPIO24': ['SD1_DAT0'],
    'GPIO25': ['SD1_DAT1'],
    'GPIO26': ['SD1_DAT2'],
    'GPIO27': ['SD1_DAT3'],
    'ID_SD':  ['HAT_EEPROM_SDA'],
    'ID_SC':  ['HAT_EEPROM_SCL'],
  },

  // ── QUICK SPECS ───────────────────────────────────────────────
  quickSpecs: [
    { label: 'CPU',        value: 'BCM2837 Quad-Core',  color: '#e0e5ec' },
    { label: 'Speed',      value: '1.2 GHz',            color: '#c8a850' },
    { label: 'RAM',        value: '1 GB LPDDR2',        color: '#e0e5ec' },
    { label: 'GPIO',       value: '40-pin header',      color: '#78c878' },
    { label: 'Wireless',   value: 'WiFi 802.11n + BT 4.1', color: '#4a9aee' },
    { label: 'Supply',     value: '5V / 2.5A micro-USB', color: '#ff6b6b' },
    { label: 'GPIO Volt',  value: '3.3V (NOT 5V tolerant)', color: '#ff9944' },
    { label: 'Max GPIO I', value: '16mA per pin',       color: '#50c8c8' },
  ],

  // ── DETAILED SPECS ────────────────────────────────────────────
  dsSpecs: [
    { label: 'SoC',              value: 'Broadcom BCM2837' },
    { label: 'Architecture',     value: 'ARM Cortex-A53 (64-bit)' },
    { label: 'Core Count',       value: '4 (Quad-Core)' },
    { label: 'Clock Speed',      value: '1.2 GHz' },
    { label: 'RAM',              value: '1 GB LPDDR2 SDRAM' },
    { label: 'GPIO Header',      value: '40-pin (26 GPIO, 2× I2C, 2× SPI, 1× UART, PWM, CLK)' },
    { label: 'USB',              value: '4× USB 2.0' },
    { label: 'Video Out',        value: 'HDMI 1.3, Composite via 3.5mm' },
    { label: 'Storage',          value: 'MicroSD card slot' },
    { label: 'Wireless',         value: 'BCM43438 — 802.11n WiFi + Bluetooth 4.1' },
    { label: 'Ethernet',         value: '100Base-T' },
    { label: 'Camera',           value: 'CSI-2 connector (up to 1080p30)' },
    { label: 'Supply Voltage',   value: '5V via micro-USB' },
    { label: 'Recommended PSU',  value: '2.5A minimum' },
    { label: 'GPIO Voltage',     value: '3.3V — NOT 5V tolerant' },
    { label: 'Max GPIO Current', value: '16mA per pin, 50mA total 3.3V rail' },
    { label: 'Operating Temp',   value: '0°C to 50°C' },
  ],

  // ── KEY FEATURES ──────────────────────────────────────────────
  dsFeatures: [
    'Quad-core 64-bit ARM Cortex-A53 running at 1.2 GHz',
    '1 GB LPDDR2 SDRAM shared between CPU and GPU',
    '40-pin GPIO header with I2C, SPI, UART, hardware PWM, and general clock outputs',
    'Onboard BCM43438 providing 802.11n WiFi and Bluetooth 4.1 Classic + LE',
    '4× USB 2.0 ports, 100 Mbps Ethernet, HDMI video output',
    'CSI camera interface supporting up to 1080p30 capture',
    'MicroSD card slot for OS storage and boot',
    'GPIO pins operate at 3.3V — never connect 5V signals directly',
    'HAT-compatible ID EEPROM pins (pins 27/28) for automatic add-on board identification',
    'Two hardware PWM channels (GPIO12/GPIO13, shared alt on GPIO18/GPIO19)',
  ],
};
