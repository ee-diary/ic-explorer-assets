// configs/pic12f683-config.js
window.IC_CONFIG = {
  partName: 'PIC12F683',
  partMPN: 'PIC12F683-I/P',
  manufacturer: 'MICROCHIP',
  package: 'DIP-8',
  pinCount: 8,

  snapPageURL: 'https://www.snapeda.com/parts/PIC12F683-I%2FP/Microchip+Technology/view-part/',
  downloadURL: 'https://www.snapeda.com/parts/PIC12F683-I%2FP/Microchip+Technology/view-part/?ref=snapeda',
  datasheetURL: 'https://ww1.microchip.com/downloads/en/DeviceDoc/41211D_.pdf',

  //dipConfig: { pinsPerSide: 4, bodyX: 62, bodyY: 20, bodyW: 76, bodyH: 98 },

  pins: [
    {num:1, id:'VDD', lbl:'VDD', name:'VDD — Power Supply', type:'PWR', funcs:['PWR'], volt:'2.0-5.5V', curr:'N/A', note:'Positive supply. Decouple with 100nF cap.'},
    {num:2, id:'GP5', lbl:'GP5', name:'GP5 / AN4 / CCP1', type:'GPIO', funcs:['GPIO','ADC','PWM'], volt:'5V', curr:'25mA', note:'GPIO GP5. ADC channel AN4. CCP1 PWM output.'},
    {num:3, id:'GP4', lbl:'GP4', name:'GP4 / AN3', type:'ADC', funcs:['GPIO','ADC'], volt:'5V', curr:'25mA', note:'GPIO GP4. ADC AN3.'},
    {num:4, id:'GP3', lbl:'GP3', name:'GP3 / MCLR', type:'RESET', funcs:['RESET'], volt:'5V', curr:'N/A', note:'Input-only pin. MCLR active-low reset.'},
    {num:5, id:'GP2', lbl:'GP2', name:'GP2 / AN2 / CCP1', type:'PWM', funcs:['GPIO','ADC','PWM'], volt:'5V', curr:'25mA', _rightSlot:3, note:'GPIO GP2. ADC AN2. CCP1 PWM.'},
    {num:6, id:'GP1', lbl:'GP1', name:'GP1 / AN1', type:'ADC', funcs:['GPIO','ADC'], volt:'5V', curr:'25mA', _rightSlot:2, note:'GPIO GP1. ADC AN1.'},
    {num:7, id:'GP0', lbl:'GP0', name:'GP0 / AN0', type:'ADC', funcs:['GPIO','ADC'], volt:'5V', curr:'25mA', _rightSlot:1, note:'GPIO GP0. ADC AN0.'},
    {num:8, id:'VSS', lbl:'VSS', name:'VSS — Ground', type:'GND', funcs:['GND'], volt:'0V', curr:'N/A', _rightSlot:0, note:'Ground reference.'},
  ],

  altFuncs: {
    'GP0': ['AN0'], 'GP1': ['AN1'], 'GP2': ['AN2','CCP1'], 'GP3': ['MCLR'],
    'GP4': ['AN3'], 'GP5': ['AN4','CCP1'],
  },

  quickSpecs: [
    {label:'Flash', value:'3.5 KB', color:'#e0e5ec'},
    {label:'SRAM', value:'128 bytes', color:'#e0e5ec'},
    {label:'Max Freq', value:'20 MHz', color:'#c8a850'},
    {label:'Supply', value:'2.0–5.5V', color:'#78c878'},
    {label:'I/O Pins', value:'6', color:'#e0e5ec'},
  ],

  dsSpecs: [
    {label:'Architecture', value:'8-bit PIC12 RISC'},
    {label:'Flash', value:'3.5 KB'},
    {label:'SRAM', value:'128 bytes'},
  ],

  dsFeatures: [
    '8-pin DIP package',
    '10-bit ADC with 4 channels',
    'Internal 8 MHz oscillator',
    'ICSP programming',
  ],
};
