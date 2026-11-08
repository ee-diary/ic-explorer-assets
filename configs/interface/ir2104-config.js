/**
 * IC Explorer Config: IR2104PBF
 * High- and low-side MOSFET/IGBT gate driver
 *
 * Pin functions are for the 8-pin IR2104 package. Verify the exact
 * manufacturer part suffix and package against its datasheet before use.
 */
window.IC_CONFIG = {
  partName: 'IR2104',
  partMPN: 'IR2104PBF',
  manufacturer: 'Infineon Technologies',
  package: 'DIP-8',
  pinCount: 8,

  snapPageURL: 'https://www.snapeda.com/parts/IR2104PBF/Infineon%20Technologies/view-part/',
  downloadURL: 'https://www.snapeda.com/parts/IR2104PBF/Infineon%20Technologies/view-part/?ref=snapeda',
  datasheetURL: 'https://www.infineon.com/dgdl/Infineon-IR2104-DS-v01_00-EN.pdf?fileId=5546d462533600a4015355c80333167e',

  dipConfig: {
    pinsPerSide: 4,
    bodyX: 62, bodyY: 28, bodyW: 180, bodyH: 240,
    pinLength: 28, pinWidthHalf: 14,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 11, part: 17, pkg: 11, pinCount: 9 },
    labelSize: 10, pinNumSize: 12, yOffset: -22
  },

  customTypes: {
    OUT:   { c: '#50c8a0', bg: 'rgba(80,200,160,.12)', bd: 'rgba(80,200,160,.32)' },
    CTRL:  { c: '#4a9aee', bg: 'rgba(74,154,238,.12)', bd: 'rgba(74,154,238,.32)' },
    BOOT:  { c: '#c8a850', bg: 'rgba(200,168,80,.12)', bd: 'rgba(200,168,80,.32)' },
    FLOAT: { c: '#a78bfa', bg: 'rgba(167,139,250,.12)', bd: 'rgba(167,139,250,.32)' }
  },

  filterButtons: [
    { type: 'OUT',   label: 'Gate Outputs', color: '#50c8a0' },
    { type: 'CTRL',  label: 'Logic Inputs', color: '#4a9aee' },
    { type: 'BOOT',  label: 'Bootstrap', color: '#c8a850' },
    { type: 'FLOAT', label: 'High Side', color: '#a78bfa' },
    { type: 'PWR',   label: 'Supply', color: '#ff6b6b' },
    { type: 'GND',   label: 'COM', color: '#a8a8a8' }
  ],

  // DIP order: pins 1–4 down the left; pins 8–5 down the right.
  pins: [
    {
      num: 1, id: 'LO', lbl: 'LO', name: 'Low-Side Gate Driver Output',
      type: 'OUT', funcs: ['OUT'], volt: 'COM to VCC', curr: 'See datasheet',
      note: 'Low-side driver output. Connect to the low-side MOSFET or IGBT gate through a suitably selected gate resistor.'
    },
    {
      num: 2, id: 'COM', lbl: 'COM', name: 'Driver Ground / Return',
      type: 'GND', funcs: ['GND'], volt: 'Reference', curr: 'N/A',
      note: 'Low-side driver return and logic reference. Connect to the appropriate power-ground reference with careful layout.'
    },
    {
      num: 3, id: 'VCC', lbl: 'VCC', name: 'Driver Supply',
      type: 'PWR', funcs: ['PWR'], volt: '10–20 V operating', curr: 'See datasheet',
      note: 'Supply for the low-side driver and bootstrap charging circuit. Bypass close to VCC and COM, and observe datasheet ratings.'
    },
    {
      num: 4, id: 'IN', lbl: 'IN', name: 'Logic Input',
      type: 'CTRL', funcs: ['CTRL'], volt: 'Logic-level input', curr: 'N/A',
      note: 'Control input for the driver. Refer to the datasheet truth table for how IN and SD control HO and LO. Do not leave logic inputs floating.'
    },
    {
      num: 8, id: 'VS', lbl: 'VS', name: 'High-Side Floating Return',
      type: 'FLOAT', funcs: ['FLOAT'], volt: 'Switch node', curr: 'N/A',
      note: 'Floating return for the high-side driver. Connect to the half-bridge switch node and the negative side of the bootstrap capacitor.',
      _rightSlot: 0
    },
    {
      num: 7, id: 'HO', lbl: 'HO', name: 'High-Side Gate Driver Output',
      type: 'OUT', funcs: ['OUT'], volt: 'VS to VB', curr: 'See datasheet',
      note: 'Floating high-side driver output. Connect to the high-side MOSFET or IGBT gate through a suitably selected gate resistor.',
      _rightSlot: 1
    },
    {
      num: 6, id: 'VB', lbl: 'VB', name: 'High-Side Floating Supply',
      type: 'BOOT', funcs: ['BOOT'], volt: 'VS + bootstrap voltage', curr: 'N/A',
      note: 'Positive supply for the floating high-side driver. Commonly powered using a bootstrap diode and capacitor; follow the datasheet application guidance.',
      _rightSlot: 2
    },
    {
      num: 5, id: 'SD', lbl: 'SD', name: 'Shutdown Input',
      type: 'CTRL', funcs: ['CTRL'], volt: 'Logic-level input', curr: 'N/A',
      note: 'Shutdown control input. Use the datasheet truth table to determine its effect on HO and LO; do not leave it floating.',
      _rightSlot: 3
    }
  ],

  altFuncs: {
    LO: ['Low-side output'],
    HO: ['High-side output'],
    IN: ['PWM / control input'],
    SD: ['Shutdown control'],
    VB: ['Bootstrap positive'],
    VS: ['Switch-node reference']
  },

  quickSpecs: [
    { label: 'Driver', value: 'High + low side', color: '#50c8a0' },
    { label: 'Package', value: 'DIP-8 (IR2104PBF)', color: '#e0e5ec' },
    { label: 'VCC', value: '10–20 V operating', color: '#ff6b6b' },
    { label: 'VS offset rating', value: '600 V max', color: '#a78bfa' },
    { label: 'Inputs', value: 'IN + SD', color: '#4a9aee' }
  ],

  dsSpecs: [
    { label: 'Function', value: 'High- and low-side MOSFET/IGBT driver' },
    { label: 'Outputs', value: 'HO (floating high side), LO (low side)' },
    { label: 'Inputs', value: 'IN and SD' },
    { label: 'VCC operating range', value: '10–20 V; check datasheet conditions' },
    { label: 'High-side offset rating', value: '600 V maximum; not a supply-voltage setting' },
    { label: 'Package shown', value: 'DIP-8; other package variants exist' }
  ],

  dsFeatures: [
    'Drives high-side and low-side power switches in a half-bridge',
    'Uses IN and SD logic inputs to control the driver outputs',
    'High-side output operates relative to the floating VS switch-node reference',
    'Includes undervoltage-lockout and dead-time behavior; consult the datasheet for details',
    'Requires appropriate external power switches and bootstrap components for typical high-side operation'
  ]
};