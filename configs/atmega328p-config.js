window.IC_CONFIG = {
  partName: "ATmega328P",
  manufacturer: "Microchip",
  package: "DIP-28",
  pinCount: 28,
  datasheet: "https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega328P-Data-Sheet-DS-40002061A.pdf",
  footprint: "https://www.snapeda.com/parts/ATmega328P/Microchip/view-part/",
  dipConfig: { leftPins: 14, rightPins: 14 },

  pins: [
    { num: 1, id: "PC6", lbl: "RESET", type: "RST", funcs: ["RESET"], note: "Active low reset" },
    { num: 2, id: "PD0", lbl: "RXD", type: "UART", funcs: ["RXD0"] },
    { num: 3, id: "PD1", lbl: "TXD", type: "UART", funcs: ["TXD0"] },
    { num: 4, id: "PD2", lbl: "INT0", type: "Digital I/O", funcs: ["INT0"] },
    { num: 5, id: "PD3", lbl: "INT1/OC2B", type: "Digital I/O", funcs: ["INT1","OC2B"] },
    { num: 6, id: "PD4", lbl: "T0/XCK", type: "Digital I/O", funcs: ["T0","XCK"] },
    { num: 7, id: "VCC", lbl: "VCC", type: "Power", funcs: ["Supply"], note: "5V supply" },
    { num: 8, id: "GND", lbl: "GND", type: "Power", funcs: ["Ground"] },
    { num: 9, id: "PB6", lbl: "XTAL1", type: "Oscillator", funcs: ["XTAL1"] },
    { num: 10, id: "PB7", lbl: "XTAL2", type: "Oscillator", funcs: ["XTAL2"] },
    { num: 11, id: "PD5", lbl: "OC0B/T1", type: "Digital I/O", funcs: ["OC0B","T1"] },
    { num: 12, id: "PD6", lbl: "OC0A/AIN0", type: "Digital I/O", funcs: ["OC0A","AIN0"] },
    { num: 13, id: "PD7", lbl: "AIN1", type: "Digital I/O", funcs: ["AIN1"] },
    { num: 14, id: "PB0", lbl: "ICP1/CLKO", type: "Digital I/O", funcs: ["ICP1","CLKO"] },
    { num: 15, id: "PB1", lbl: "OC1A", type: "Digital I/O", funcs: ["OC1A"] },
    { num: 16, id: "PB2", lbl: "OC1B", type: "Digital I/O", funcs: ["OC1B"] },
    { num: 17, id: "PB3", lbl: "OC2A/MOSI", type: "Digital I/O", funcs: ["OC2A","MOSI"] },
    { num: 18, id: "PB4", lbl: "MISO", type: "Digital I/O", funcs: ["MISO"] },
    { num: 19, id: "PB5", lbl: "SCK", type: "Digital I/O", funcs: ["SCK"] },
    { num: 20, id: "AVCC", lbl: "AVCC", type: "Power", funcs: ["Analog Supply"], note: "Analog VCC" },
    { num: 21, id: "AREF", lbl: "AREF", type: "Analog", funcs: ["ADC Reference"] },
    { num: 22, id: "GND", lbl: "GND", type: "Power", funcs: ["Ground"] },
    { num: 23, id: "PC0", lbl: "ADC0", type: "Analog/Digital I/O", funcs: ["ADC0"] },
    { num: 24, id: "PC1", lbl: "ADC1", type: "Analog/Digital I/O", funcs: ["ADC1"] },
    { num: 25, id: "PC2", lbl: "ADC2", type: "Analog/Digital I/O", funcs: ["ADC2"] },
    { num: 26, id: "PC3", lbl: "ADC3", type: "Analog/Digital I/O", funcs: ["ADC3"] },
    { num: 27, id: "PC4", lbl: "ADC4/SDA", type: "Analog/Digital I/O", funcs: ["ADC4","SDA"] },
    { num: 28, id: "PC5", lbl: "ADC5/SCL", type: "Analog/Digital I/O", funcs: ["ADC5","SCL"] }
  ],

  quickSpecs: [
    "8-bit AVR RISC architecture",
    "32 KB Flash, 2 KB SRAM, 1 KB EEPROM",
    "20 MHz max clock speed"
  ],

  features: [
    "USART, SPI, I2C",
    "6-channel 10-bit ADC",
    "3 timers/counters",
    "Watchdog timer",
    "External and internal interrupts"
  ]
};
