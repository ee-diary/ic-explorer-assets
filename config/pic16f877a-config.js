// configs/pic16f877a-config.js
window.IC_CONFIG = {
  // REQUIRED FIELDS
  partName: 'PIC16F877A',
  partMPN: 'PIC16F877A-I/P',
  manufacturer: 'MICROCHIP',  // ← This was missing!
  package: 'DIP-40',
  pinCount: 40,
  
  // Optional but recommended
  snapPageURL: 'https://www.snapeda.com/parts/PIC16F877A-I%2FP/Microchip+Technology/view-part/',
  downloadURL: 'https://www.snapeda.com/parts/PIC16F877A-I%2FP/Microchip+Technology/view-part/?ref=snapeda',
  datasheetURL: 'https://ww1.microchip.com/downloads/en/DeviceDoc/39582b.pdf',
  
  // DIP layout (optional - engine will auto-calculate if missing)
  dipConfig: {
    pinsPerSide: 20,
    bodyX: 122,
    bodyY: 25,
    bodyW: 260,
    bodyH: 700
  },
  
  pins: [
    // ... your pins data ...
  ],
  
  altFuncs: { /* ... */ },
  quickSpecs: [ /* ... */ ],
  dsSpecs: [ /* ... */ ],
  dsFeatures: [ /* ... */ ]
};
