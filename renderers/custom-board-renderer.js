// Add to configs/teensy41-config.js (append after components)
chips: [  // For component interactivity
  { id: 'iMXRT1062', name: 'iMXRT1062', type: 'MCU', fullName: 'NXP i.MX RT1062 Crossover MCU', specs: { Clock: '600 MHz', Core: 'Cortex-M7', RAM: '1 MB' }, note: 'Main processor. High-performance crossover MCU with real-time functionality.' },
  { id: 'MKL02', name: 'MKL02', type: 'MCU', fullName: 'Kinetis KL02 MCU (Bootloader)', specs: { Clock: '48 MHz', Core: 'Cortex-M0+', Function: 'Bootloader/USB' }, note: 'Handles bootloading and USB-to-serial communication for the iMXRT.' },
  { id: 'W25Q128', name: 'W25Q128', type: 'FLASH', fullName: '16MB Serial Nor Flash Memory', specs: { Capacity: '16 MB', Interface: 'SPI / QPI' }, note: 'External flash memory for program and data storage.' },
  { id: 'DP83825I', name: 'DP83825I', type: 'PHY', fullName: '10/100 Mbps Ethernet PHY', specs: { Speed: '10/100 Mbps', Interface: 'RMII' }, note: 'Physical layer transceiver for Ethernet connectivity.' },
  { id: 'TPD3S014', name: 'TPD3S014', type: 'SWITCH', fullName: 'USB Power Switch & Protection', specs: { Current: '1.5 A', ESD_Prot: '±15 kV' }, note: 'Current limit switch and ESD protection for the USB-C port.' },
  { id: 'TLV75733P', name: 'TLV75733P', type: 'LDO', fullName: '3.3V Low-Dropout Regulator', specs: { Output: '3.3 V', Max_Curr: '1 A' }, note: 'Regulates board power to 3.3V for all components.' },
  { id: 'DMG2305UX', name: 'DMG2305UX', type: 'MOSFET', fullName: 'P-Channel MOSFET', specs: { Vds: '-20 V', Id: '-4.2 A' }, note: 'Used for power switching and reverse polarity protection.' },
  { id: 'RESET', name: 'RESET', type: 'SWITCH', fullName: 'Program/Reset Pushbutton', specs: { Function: 'Reset / Program' }, note: 'Press to put Teensy into program mode or reset (if held).' },
  { id: 'USB_HOST_HDR', name: 'USB Host', type: 'HEADER', fullName: 'USB Host Header (5-pin)', specs: { Pins: '5-pin', Spacing: '2.54 mm' }, note: 'Connects to external USB port for hosting devices.' },
  { id: 'ETH_HDR', name: 'Ethernet', type: 'HEADER', fullName: 'Ethernet Header (6-pin)', specs: { Pins: '2x3', Speed: '10/100 Mbps' }, note: 'Direct connections to Ethernet jack. Requires DP83825I PHY chip.' },
  { id: 'EXP_HDR', name: 'Expansion', type: 'HEADER', fullName: 'Expansion Header (5-pin)', specs: { Pins: '5-pin' }, note: 'Extra pins for auxiliary signals located between the main pin rows.' }
]