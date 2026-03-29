// configs/pic18f4550-config.js

window.IC_CONFIG = {
  partName:     'PIC12F683',
  partMPN:      'PIC12F683-I/P',
  manufacturer: 'MICROCHIP',
  package:      'DIP-8',
  pinCount:     8,

  snapPageURL:  'https://www.snapeda.com/parts/PIC12F683-I%2FP/Microchip+Technology/view-part/',
  downloadURL:  'https://www.snapeda.com/parts/PIC12F683-I%2FP/Microchip+Technology/view-part/?ref=snapeda',
  datasheetURL: 'https://ww1.microchip.com/downloads/en/DeviceDoc/41211D_.pdf',

  // Override default DIP-8 layout if needed
  //dipConfig: { pinsPerSide: 4, bodyX: 62, bodyY: 20, bodyW: 76, bodyH: 98 },

  pins: [
    // LEFT side (pins 1-4, top to bottom)
    {num:1, id:'VDD', lbl:'VDD', name:'VDD — Power Supply',
     type:'PWR', funcs:['PWR'], volt:'2.0-5.5V', curr:'N/A',
     note:'Positive supply. Decouple with 100nF cap close to pin. Pin 1 marked by notch/dot.'},
    
    {num:2, id:'GP5', lbl:'GP5', name:'GP5 / AN4 / CCP1 / T1CKI / OSC1 / CLKIN',
     type:'GPIO', funcs:['GPIO','ADC','PWM','TIMER','XTAL'], volt:'5V', curr:'25mA',
     note:'GPIO GP5. ADC channel AN4. CCP1 alternate PWM/capture output. Timer1 ext clock (T1CKI). Crystal in (OSC1/CLKIN).'},
    
    {num:3, id:'GP4', lbl:'GP4', name:'GP4 / AN3 / T1G / OSC2 / CLKOUT',
     type:'ADC', funcs:['GPIO','ADC','TIMER','XTAL'], volt:'5V', curr:'25mA',
     note:'GPIO GP4. ADC AN3. Timer1 gate (T1G). Crystal out (OSC2) or CLKOUT (Fosc/4).'},
    
    {num:4, id:'GP3', lbl:'GP3', name:'GP3 / MCLR / VPP',
     type:'RESET', funcs:['RESET'], volt:'5V', curr:'N/A',
     note:'Input-only pin. MCLR active-low reset. VPP ICSP programming voltage.'},
    
    // RIGHT side (pins 5-8, top to bottom - note reversed order)
    {num:5, id:'GP2', lbl:'GP2', name:'GP2 / AN2 / T0CKI / INT / COUT / CCP1',
     type:'PWM', funcs:['GPIO','ADC','TIMER','INT','PWM','ACMP'], volt:'5V', curr:'25mA',
     _rightSlot:3,  // Bottom-right in DIP-8
     note:'GPIO GP2. ADC AN2. Timer0 ext clock. Ext interrupt INT. Comparator COUT. CCP1 PWM/capture.'},
    
    {num:6, id:'GP1', lbl:'GP1', name:'GP1 / AN1 / CIN- / VREF / ICSPCLK',
     type:'ADC', funcs:['GPIO','ADC','ACMP','RESET'], volt:'5V', curr:'25mA',
     _rightSlot:2,
     note:'GPIO GP1. ADC AN1. Comparator inverting input (CIN-). External ADC VREF. ICSP programming CLOCK.'},
    
    {num:7, id:'GP0', lbl:'GP0', name:'GP0 / AN0 / CIN+ / ICSPDAT / ULPWU',
     type:'ADC', funcs:['GPIO','ADC','ACMP','RESET'], volt:'5V', curr:'25mA',
     _rightSlot:1,
     note:'GPIO GP0. ADC AN0. Comparator non-inverting input (CIN+). ICSP programming DATA. Ultra Low-Power Wake-up.'},
    
    {num:8, id:'VSS', lbl:'VSS', name:'VSS — Ground',
     type:'GND', funcs:['GND'], volt:'0V', curr:'N/A',
     _rightSlot:0,  // Top-right in DIP-8
     note:'Ground reference. Pin 8 is top-right corner.'},
  ],

  altFuncs: {
    'GP0': ['AN0','CIN+','ICSPDAT','ULPWU'],
    'GP1': ['AN1','CIN-','VREF','ICSPCLK'],
    'GP2': ['AN2','T0CKI','INT','COUT','CCP1'],
    'GP3': ['MCLR','VPP'],
    'GP4': ['AN3','T1G','OSC2','CLKOUT'],
    'GP5': ['AN4','CCP1','T1CKI','OSC1','CLKIN'],
  },

  quickSpecs: [
    {label:'Flash',     value:'3.5 KB', color:'#e0e5ec'},
    {label:'SRAM',      value:'128 bytes', color:'#e0e5ec'},
    {label:'EEPROM',    value:'256 bytes', color:'#e0e5ec'},
    {label:'Max Freq',  value:'20 MHz', color:'#c8a850'},
    {label:'Supply',    value:'2.0–5.5V', color:'#78c878'},
    {label:'I/O Pins',  value:'6 (GP0–GP5)', color:'#e0e5ec'},
    {label:'ADC',       value:'10-bit, 4 ch', color:'#c8a850'},
    {label:'PWM/CCP',   value:'CCP1 on GP2', color:'#cc6888'},
    {label:'Comparators',value:'1x analog', color:'#ff9944'},
  ],

  dsSpecs: [
    {label:'Architecture',   value:'8-bit PIC12 RISC (mid-range core)'},
    {label:'Flash',          value:'3.5 KB (2048 x 14-bit words)'},
    {label:'SRAM',           value:'128 bytes'},
    {label:'EEPROM',         value:'256 bytes'},
    {label:'Max Frequency',  value:'20 MHz external / 8 MHz internal'},
    {label:'Supply Voltage', value:'2.0V – 5.5V'},
    {label:'I/O Pins',       value:'6 total: GP0-GP5 (GP3 input-only)'},
    {label:'ADC',            value:'10-bit, 4 channels: AN0-AN3'},
    {label:'Timers',         value:'TMR0 (8-bit), TMR1 (16-bit), TMR2 (8-bit)'},
    {label:'CCP/PWM',        value:'CCP1 on GP2: capture / compare / PWM'},
    {label:'Comparator',     value:'1x analog: CIN+, CIN-, COUT'},
    {label:'Oscillator',     value:'Int 8MHz / ext crystal / EC / RC'},
    {label:'Package',        value:'DIP-8, SOIC-8, DFN-8'},
  ],

  dsFeatures: [
    '8-pin DIP — smallest PIC MCU package for space-constrained designs',
    '10-bit ADC: 4 channels on GP0, GP1, GP2, GP4',
    'CCP1 on GP2: PWM output (up to 10-bit), capture, compare',
    'Analog comparator: CIN+, CIN-, COUT',
    'Internal 8 MHz oscillator — no external crystal required',
    'ICSP programming via GP0 (ICSPDAT) and GP1 (ICSPCLK)',
    'Ultra Low-Power Wake-up (ULPWU) on GP0 from sleep',
    'Timer1 supports 32.768 kHz crystal on GP4/GP5 for RTC',
    'All I/O pins have programmable weak pull-ups and IOC',
    'NanoWatt: < 100 nA sleep, WDT from dedicated oscillator',
    '35 single-word instructions; most execute in 1 cycle (200 ns @ 20 MHz)',
  ],
};
