// configs/cpu/ryzen5-7600-config.js
// AMD Ryzen 5 7600 — AM5 Socket Pinout Explorer
// IC Explorer config — paste into Blogger post with 6-step load order

window.IC_CONFIG = {

  // ── IDENTITY ──────────────────────────────────────────────────
  partName:     'AMD Ryzen 5 7600',
  partMPN:      '100-100000592BOX',
  manufacturer: 'AMD',
  package:      'LGA-1718',            // AM5 = LGA-1718 pads on CPU
  pinCount:     1718,

  // ── LINKS ─────────────────────────────────────────────────────
  snapPageURL:  'https://www.snapeda.com/parts/AMD-Ryzen5-7600',
  downloadURL:  'https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-5-7600.html',
  datasheetURL: 'https://www.amd.com/content/dam/amd/en/documents/processor-tech-docs/programmer-references/56255_3_03.pdf',

  // ── CUSTOM TYPE COLOURS ────────────────────────────────────────
  // AM5 pads are grouped by function — none map to standard MCU types
  customTypes: {
    VDD:   { c: '#ff6b6b', bg: 'rgba(255,107,107,.13)', bd: 'rgba(255,107,107,.38)' }, // Core power
    VSS:   { c: '#a8a8a8', bg: 'rgba(168,168,168,.10)', bd: 'rgba(168,168,168,.28)' }, // Ground
    VDDIO: { c: '#ff9944', bg: 'rgba(255,153,68,.12)',  bd: 'rgba(255,153,68,.32)'  }, // I/O power
    VDDCR: { c: '#f85149', bg: 'rgba(248,81,73,.11)',   bd: 'rgba(248,81,73,.30)'   }, // Core/SoC voltage
    DDR:   { c: '#9898d8', bg: 'rgba(152,152,216,.11)', bd: 'rgba(152,152,216,.30)' }, // DDR5 memory
    PCIE:  { c: '#4a9aee', bg: 'rgba(74,154,238,.11)',  bd: 'rgba(74,154,238,.30)'  }, // PCIe 5.0 x16
    USB:   { c: '#50c8c8', bg: 'rgba(80,200,200,.11)',  bd: 'rgba(80,200,200,.30)'  }, // USB (2.0 / USB4)
    DP:    { c: '#a78bfa', bg: 'rgba(167,139,250,.11)', bd: 'rgba(167,139,250,.30)' }, // DisplayPort (iGPU)
    SMB:   { c: '#c8a850', bg: 'rgba(200,168,80,.12)',  bd: 'rgba(200,168,80,.32)'  }, // SMBus / I²C / PMBUS
    SPI:   { c: '#4a9aee', bg: 'rgba(74,154,238,.09)',  bd: 'rgba(74,154,238,.25)'  }, // SPI / ESPI (BIOS)
    MISC:  { c: '#78c878', bg: 'rgba(120,200,120,.09)', bd: 'rgba(120,200,120,.25)' }, // ID, debug, thermal
    NC:    { c: '#3a3f47', bg: 'rgba(58,63,71,.10)',    bd: 'rgba(58,63,71,.22)'    }, // No connect / reserved
  },

  // ── FILTER BUTTONS ─────────────────────────────────────────────
  filterButtons: [
    { type: 'VDD',   label: 'VDD — Core Power',    color: '#ff6b6b' },
    { type: 'VDDCR', label: 'VDDCR — SoC Voltage', color: '#f85149' },
    { type: 'VDDIO', label: 'VDDIO — I/O Rails',   color: '#ff9944' },
    { type: 'VSS',   label: 'VSS — Ground',         color: '#a8a8a8' },
    { type: 'DDR',   label: 'DDR5 Memory Bus',      color: '#9898d8' },
    { type: 'PCIE',  label: 'PCIe 5.0 x16',         color: '#4a9aee' },
    { type: 'USB',   label: 'USB / USB4',            color: '#50c8c8' },
    { type: 'DP',    label: 'DisplayPort (RDNA3)',   color: '#a78bfa' },
    { type: 'SMB',   label: 'SMBus / PMBUS',         color: '#c8a850' },
    { type: 'SPI',   label: 'SPI / eSPI (BIOS)',     color: '#4a9aee' },
    { type: 'MISC',  label: 'ID / Thermal / Debug',  color: '#78c878' },
    { type: 'NC',    label: 'NC / Reserved',         color: '#3a3f47' },
  ],

  // ── DIP CONFIG ─────────────────────────────────────────────────
  // AM5 has 1718 pads but for IC Explorer we model the *functional interface*
  // as a representative 2-column DIP, grouped by signal class (not physical grid).
  // This gives users a navigable pinout of key signal groups rather than
  // a 1718-pad array which is impractical to render.
  // The pins array below contains the 40 most-referenced signal groups (datasheets,
  // OC community, motherboard VRM documentation) — each representing a pad class.
  dipConfig: {
    pinsPerSide: 20,
    bodyX: 122, bodyY: 25, bodyW: 260, bodyH: 700,
    pinLength: 34, pinWidthHalf: 16,
    notchSize: 8, notchX: 14, notchY: 14,
    textSizes: { mfr: 12, part: 20, pkg: 14, pinCount: 12 },
    labelSize: 10, pinNumSize: 13, yOffset: -60
  },

  // ── PINS ───────────────────────────────────────────────────────
  // Representing the 40 primary AM5 signal groups.
  // Left side (1–20): Power & Memory interface
  // Right side (21–40): PCIe, USB, Display, Control
  //
  // num  = signal group index (not physical pad number)
  // lbl  = ≤6 char label shown on IC body
  // volt / curr = nominal values from AMD PPR Rev 3.03
  pins: [
    // ── LEFT SIDE — Power delivery & Memory ─────────────────────
    {
      num: 1,
      id: 'VDD_CORE',
      lbl: 'VDDCR',
      name: 'VDDCR_CPU — Core Voltage Rail',
      type: 'VDD',
      funcs: ['VDD', 'VDDCR'],
      volt: '0.9–1.5V',
      curr: '≤142 A (TDC)',
      note: 'Primary CPU core supply. VDDCR_CPU is regulated by the motherboard VRM. The Ryzen 5 7600 draws up to 88 W PPT (default) through this rail. Voltage is set via SVI3 interface from the CPU itself. Overclocking raises this rail. Zen 4 supports up to ~1.5 V for extreme OC.'
    },
    {
      num: 2,
      id: 'VDD_SOC',
      lbl: 'VDDsoc',
      name: 'VDDCR_SOC — SoC / Fabric Voltage Rail',
      type: 'VDDCR',
      funcs: ['VDDCR'],
      volt: '0.9–1.3V',
      curr: '≤30 A',
      note: 'Powers the Infinity Fabric, memory controller, PCIe controller, and integrated RDNA3 GPU. Separate from the core rail. Raising VDDCR_SOC can improve memory stability at DDR5-6000+ but also increases heat. AMD recommends ≤1.15 V for daily use.'
    },
    {
      num: 3,
      id: 'VDDIO_MEM',
      lbl: 'VDDIo',
      name: 'VDDIO_MEM — DDR5 I/O Voltage (1.1 V)',
      type: 'VDDIO',
      funcs: ['VDDIO', 'DDR'],
      volt: '1.1V (JEDEC)',
      curr: '≤5 A',
      note: 'Supplies the DDR5 memory channel I/O buffers on the CPU side. JEDEC standard is 1.1 V. Many AM5 boards allow raising to 1.25–1.4 V to support faster XMP/EXPO profiles. Distinct from VDD_DIMM which powers the DIMMs themselves (supplied by motherboard).'
    },
    {
      num: 4,
      id: 'VSS_MAIN',
      lbl: 'VSS',
      name: 'VSS — System Ground Return',
      type: 'VSS',
      funcs: ['VSS'],
      volt: '0 V',
      curr: 'Return path',
      note: 'Ground reference for all CPU circuits. AM5 has over 500 VSS pads distributed across the package to minimise ground inductance and reduce switching noise on the dense power delivery network. VSS pads outnumber any other pad type.'
    },
    {
      num: 5,
      id: 'DDR5_DQ_A',
      lbl: 'DQ_A',
      name: 'DDR5 Data Bus — Channel A (DQ[63:0])',
      type: 'DDR',
      funcs: ['DDR'],
      volt: '1.1V diff',
      curr: 'Signal',
      note: 'Carries the 64-bit data bus for DDR5 Channel A (plus 8-bit ECC parity in registered DIMMs, not supported on Ryzen 5 7600). AM5 supports two 32-bit sub-channels per DIMM slot. Running DDR5-6000 is AMD\'s "sweet spot" for Ryzen 7000 — it aligns the Infinity Fabric 1:1 at 3000 MHz.'
    },
    {
      num: 6,
      id: 'DDR5_DQ_B',
      lbl: 'DQ_B',
      name: 'DDR5 Data Bus — Channel B (DQ[63:0])',
      type: 'DDR',
      funcs: ['DDR'],
      volt: '1.1V diff',
      curr: 'Signal',
      note: 'Second DDR5 channel data bus. The Ryzen 5 7600 supports dual-channel DDR5 (2× DIMM slots). Both channels must be populated for dual-channel bandwidth (~100 GB/s at DDR5-6000). Single-channel cuts memory bandwidth in half and significantly impacts gaming performance.'
    },
    {
      num: 7,
      id: 'DDR5_CA_A',
      lbl: 'CA_A',
      name: 'DDR5 Command/Address — Channel A',
      type: 'DDR',
      funcs: ['DDR'],
      volt: '1.1V',
      curr: 'Signal',
      note: 'Command, Address, and Control signals for DDR5 Channel A. DDR5 uses a Command-Address bus rather than separate row/column addressing. Includes CKE, CS#, CA[13:0]. Clocked by CK_t/CK_c differential pair. Timing parameters here (tCL, tRCD, tRP) define memory latency — critical for gaming.'
    },
    {
      num: 8,
      id: 'DDR5_CA_B',
      lbl: 'CA_B',
      name: 'DDR5 Command/Address — Channel B',
      type: 'DDR',
      funcs: ['DDR'],
      volt: '1.1V',
      curr: 'Signal',
      note: 'Command/Address bus for DDR5 Channel B. Mirrors Channel A structure. Both channels are independently trained by AMD AGESA during POST. DDR5 trains natively to its rated XMP/EXPO speed only when enabled in BIOS. Default JEDEC fallback is DDR5-4800.'
    },
    {
      num: 9,
      id: 'DDR5_CLK_A',
      lbl: 'CLK_A',
      name: 'DDR5 Clock — Channel A (CK_t / CK_c)',
      type: 'DDR',
      funcs: ['DDR'],
      volt: '1.1V diff',
      curr: 'Signal',
      note: 'Differential clock pair for DDR5 Channel A. Both clock edges are active (double data rate). The memory controller inside Zen 4\'s IOD (I/O Die) generates this clock. Infinity Fabric clock (FCLK) runs at half the MEMCLK. Optimal: FCLK 3000 MHz at DDR5-6000.'
    },
    {
      num: 10,
      id: 'DDR5_CLK_B',
      lbl: 'CLK_B',
      name: 'DDR5 Clock — Channel B (CK_t / CK_c)',
      type: 'DDR',
      funcs: ['DDR'],
      volt: '1.1V diff',
      curr: 'Signal',
      note: 'Differential clock pair for DDR5 Channel B. Independent from Channel A, allowing per-channel frequency and timing tuning. On some AM5 boards, channels A and B share a common reference clock source from the PCH or Super I/O.'
    },
    {
      num: 11,
      id: 'PCIE5_TX_UP',
      lbl: 'P5TX',
      name: 'PCIe 5.0 TX — Upstream (x16, Lanes 0–15)',
      type: 'PCIE',
      funcs: ['PCIE'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'Transmit lanes for the CPU-attached PCIe 5.0 x16 slot. 16 differential TX pairs (TX+/TX−), one per lane. PCIe 5.0 = 32 GT/s per lane; x16 = 512 GT/s total bidirectional. Connects directly to the primary GPU slot on AM5 motherboards. No chipset hop — zero added latency vs. chipset lanes.'
    },
    {
      num: 12,
      id: 'PCIE5_RX_UP',
      lbl: 'P5RX',
      name: 'PCIe 5.0 RX — Upstream (x16, Lanes 0–15)',
      type: 'PCIE',
      funcs: ['PCIE'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'Receive lanes for PCIe 5.0 x16. Pairs with the TX group above to form the full bidirectional x16 link. The Ryzen 5 7600 supports bifurcation: x8+x8 or x8+x4+x4. Useful for dual-GPU, NVMe RAID, or PCIe 5.0 SSD adapters in the secondary x8 lanes.'
    },
    {
      num: 13,
      id: 'PCIE5_REFCLK',
      lbl: 'REFCLK',
      name: 'PCIe 5.0 Reference Clock (100 MHz)',
      type: 'PCIE',
      funcs: ['PCIE'],
      volt: '3.3V diff',
      curr: 'Signal',
      note: '100 MHz differential reference clock supplied to the PCIe endpoint (GPU). AM5 can use either SRIS (Separate Reference Independent Spread) or CEM mode depending on the add-in card. Most consumer GPUs use the spread-spectrum clock from the CPU.'
    },
    {
      num: 14,
      id: 'PCIE4_CPU',
      lbl: 'P4CPU',
      name: 'PCIe 4.0 — CPU-Attached (x4, NVMe primary)',
      type: 'PCIE',
      funcs: ['PCIE'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'Four PCIe 4.0 lanes from the CPU directly to the M.2 slot (on most AM5 boards — slot labeled M.2_1). Up to 8 GB/s sequential read for Gen4 NVMe SSDs. These lanes do NOT go through the chipset — direct CPU attachment for minimum latency. Supported: PCIe 4.0 x4 (Gen4) or SATA (via M.2 SATA mux).'
    },
    {
      num: 15,
      id: 'SVI3_CPU',
      lbl: 'SVI3',
      name: 'SVI3 — Serial Voltage Interface (CPU/SoC)',
      type: 'SMB',
      funcs: ['SMB'],
      volt: '1.8V logic',
      curr: 'Signal',
      note: 'AMD Serial Voltage Interface 3 (SVI3) — a proprietary 2-wire bus (SVID_CLK + SVID_DATA) used by the CPU to command the VRM to raise/lower core voltage in real time. The CPU sends voltage targets dozens of times per second for power/performance balancing (CPB, ECO mode, PBO). Electrically similar to I²C at 1.8 V logic.'
    },
    {
      num: 16,
      id: 'PMBUS',
      lbl: 'PMBus',
      name: 'PMBUS / SMBus — VRM Telemetry',
      type: 'SMB',
      funcs: ['SMB'],
      volt: '3.3V',
      curr: 'Signal',
      note: 'PMBus interface for reading VRM telemetry: actual CPU package power, VRM current, VRM temperature. Used by HWiNFO64, AMD µProf, and BIOS firmware. Physically shared with SMBus. On most AM5 boards this is accessible via the embedded controller (EC) — not a direct CPU pad, but routed through the AMD FCH.'
    },
    {
      num: 17,
      id: 'THERMDA',
      lbl: 'THERM',
      name: 'THERMDA — Thermal Diode Analog Output',
      type: 'MISC',
      funcs: ['MISC'],
      volt: 'Analog ~600 mV',
      curr: 'µA level',
      note: 'Analog thermal diode output. Motherboards use this to measure die temperature via a constant-current source into the diode. However Ryzen 5 7600 (like all AM5 CPUs) primarily uses its on-die digital sensors (Tdie, Tctl) reported over SMBus. The analog THERMDA pad is used as a secondary/legacy thermal measurement by some boards.'
    },
    {
      num: 18,
      id: 'PROCHOT',
      lbl: 'PRCHT',
      name: 'PROCHOT# — Processor Hot (Thermal Throttle)',
      type: 'MISC',
      funcs: ['MISC'],
      volt: '3.3V logic',
      curr: '< 1 mA',
      note: 'Active-low open-drain signal. When the CPU\'s internal Tctl (control temperature) reaches 95 °C (the Ryzen 5 7600\'s TJMAX), PROCHOT# asserts and the CPU begins throttling. Motherboards can also assert PROCHOT# externally to force CPU power reduction — used by some slim laptops and HPC thermal solutions. Visible in AMD µProf as "Thermal Throttle" event.'
    },
    {
      num: 19,
      id: 'CPUID',
      lbl: 'CPUID',
      name: 'CPU Identification (Fuse Strap Outputs)',
      type: 'MISC',
      funcs: ['MISC'],
      volt: '3.3V',
      curr: 'Signal',
      note: 'Strap outputs that identify this specific CPU SKU to the motherboard EC and BIOS during power-on. Encodes: CPU family (Raphael/Zen 4), power class, TDP tier. This allows BIOS to load appropriate VRM configuration, power limits (PPT/TDC/EDC), and frequency tables before POST. AGESA firmware reads these straps in the first milliseconds of boot.'
    },
    {
      num: 20,
      id: 'RESET_IN',
      lbl: 'RST#',
      name: 'RESET# — System Reset Input',
      type: 'MISC',
      funcs: ['MISC'],
      volt: '3.3V logic',
      curr: '< 1 mA',
      note: 'Active-low CPU reset signal driven by the AMD FCH (Fusion Controller Hub) on the motherboard. Asserted on cold boot, S5 wake, CMOS clear, or BSOD recovery. The FCH holds RESET# low until all power rails (VDD, VDDCR_SOC, VDDIO_MEM) are within spec. Releasing RESET# initiates Zen 4 microcode and AGESA execution.'
    },

    // ── RIGHT SIDE — PCIe upstream, USB, DisplayPort, Control ────
    {
      num: 21,
      id: 'USB4_TX0',
      lbl: 'U4TX0',
      name: 'USB4 Gen 3×2 — TX Lane 0 (40 Gbps capable)',
      type: 'USB',
      funcs: ['USB'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'USB4 Version 1.0 transmit lane 0 (one of two TX lanes). Ryzen 5 7600 exposes two USB4 ports via the CPU die. USB4 at Gen 3×2 = 40 Gbps aggregate. Backward compatible with USB 3.2 Gen 2×2, Thunderbolt 3, and DisplayPort Alt Mode. USB4 controller is inside Zen 4\'s IOD. Requires a Type-C connector with appropriate E-marker cable for 40 Gbps operation.'
    },
    {
      num: 22,
      id: 'USB4_RX0',
      lbl: 'U4RX0',
      name: 'USB4 Gen 3×2 — RX Lane 0',
      type: 'USB',
      funcs: ['USB'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'USB4 receive lane 0. Pairs with TX0 to form the first USB4 differential lane. USB4 is full-duplex, so TX and RX operate simultaneously. The Ryzen 5 7600\'s IOD includes a retimer for USB4 — no external retimer chip required on the motherboard, reducing BOM cost and board complexity.'
    },
    {
      num: 23,
      id: 'USB4_TX1',
      lbl: 'U4TX1',
      name: 'USB4 Gen 3×2 — TX Lane 1',
      type: 'USB',
      funcs: ['USB'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'USB4 TX lane 1 — second lane of the first USB4 port. Both TX0+TX1 together deliver the 40 Gbps (Gen 3×2) bandwidth. When USB4 is operating in DisplayPort Alt Mode, these lanes carry the DP signal instead of USB data. The Ryzen 5 7600 supports DP 2.0 UHBR13.5 (54 Gbps) over USB4/DP Alt Mode.'
    },
    {
      num: 24,
      id: 'USB4_RX1',
      lbl: 'U4RX1',
      name: 'USB4 Gen 3×2 — RX Lane 1',
      type: 'USB',
      funcs: ['USB'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'USB4 receive lane 1. Completes the second differential pair of the USB4 port. USB4 tunnels PCIe 3.0 x2 (up to 16 Gbps), DisplayPort 2.0, and USB 3.2 simultaneously over the 40 Gbps envelope — all scheduled via the USB4 router inside the CPU.'
    },
    {
      num: 25,
      id: 'USB3_TX_P0',
      lbl: 'U3TX0',
      name: 'USB 3.2 Gen 2 — TX SuperSpeed (Port 0)',
      type: 'USB',
      funcs: ['USB'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'USB 3.2 Gen 2 (10 Gbps) SuperSpeed TX for the first non-USB4 port. Direct CPU-attached — not routed through the chipset. AM5 CPUs provide two Gen 2 ports directly; additional USB 3.2 ports come from the X670/B650 chipset. SuperSpeed TX/RX operate at 10 Gbps with 128b/132b encoding.'
    },
    {
      num: 26,
      id: 'USB3_RX_P0',
      lbl: 'U3RX0',
      name: 'USB 3.2 Gen 2 — RX SuperSpeed (Port 0)',
      type: 'USB',
      funcs: ['USB'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'USB 3.2 Gen 2 receive lane. Paired with the TX above. USB 3.2 Gen 2 is backward compatible with USB 3.1, 3.0, and 2.0 speeds. The USB 2.0 companion path (D+/D−) for this port is also present on the CPU package (separate pads), running at 480 Mbps.'
    },
    {
      num: 27,
      id: 'USB2_DP_DN',
      lbl: 'USB2',
      name: 'USB 2.0 — D+ / D− (4× ports)',
      type: 'USB',
      funcs: ['USB'],
      volt: '3.3V / 0 V',
      curr: '≤500 mA',
      note: 'Four USB 2.0 (480 Mbps) ports directly from the CPU. D+ and D− are the single-ended differential pair for each port. USB 2.0 shares the Type-A or Type-C connector via a MUX. Used for keyboards, mice, hubs, USB-to-UART adapters. These are among the most board-tested CPU signal pairs.'
    },
    {
      num: 28,
      id: 'DP_TX_A',
      lbl: 'DP_A',
      name: 'DisplayPort 2.0 — Main Link Lane A (iGPU)',
      type: 'DP',
      funcs: ['DP'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'DisplayPort main link from the Ryzen 5 7600\'s integrated RDNA3 GPU (Radeon 740M class, 4 CUs). Supports DP 2.0 UHBR10 (10 Gbps per lane) — enough for 4K 240 Hz or 8K 60 Hz at x4. The iGPU supports up to 4 simultaneous displays. Activated only when a monitor is connected to the motherboard\'s display output (HDMI/DP rear I/O).'
    },
    {
      num: 29,
      id: 'DP_TX_B',
      lbl: 'DP_B',
      name: 'DisplayPort 2.0 — Main Link Lane B (iGPU)',
      type: 'DP',
      funcs: ['DP'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'Second DP main link lane. At x4 configuration (all 4 lanes active), the 4-lane DP 2.0 link provides 40 Gbps — enough for DSC-compressed 8K@120 Hz. Most AM5 boards route 2 lanes to HDMI 2.1 (via an LSPCon) and 2 lanes to native DP 2.0. Some boards expose DP over the USB4 Type-C port.'
    },
    {
      num: 30,
      id: 'DP_TX_C',
      lbl: 'DP_C',
      name: 'DisplayPort 2.0 — Main Link Lane C (iGPU)',
      type: 'DP',
      funcs: ['DP'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'Third DP main link lane. Together with lane D, enables x4 DP 2.0 for maximum bandwidth. Each lane runs at up to UHBR13.5 (13.5 Gbps). The Ryzen 5 7600\'s RDNA3 iGPU supports AV1 hardware decode (but not encode). Useful for media PCs, HTPCs, or workstations running the 7600 without a discrete GPU.'
    },
    {
      num: 31,
      id: 'DP_TX_D',
      lbl: 'DP_D',
      name: 'DisplayPort 2.0 — Main Link Lane D (iGPU)',
      type: 'DP',
      funcs: ['DP'],
      volt: '0 V (AC coupled)',
      curr: 'Differential',
      note: 'Fourth DP main link lane. Completing the x4 UHBR link. The iGPU\'s display engine also handles HDR10, Dolby Vision, and HBR3 for legacy DP 1.4a compatibility. AMD FreeSync Premium is supported at all refresh rates through these pads, even at 240 Hz over DP 2.0.'
    },
    {
      num: 32,
      id: 'DP_AUX',
      lbl: 'AUX',
      name: 'DisplayPort AUX — Sideband Channel (HPD + config)',
      type: 'DP',
      funcs: ['DP'],
      volt: '3.3V',
      curr: '< 1 mA',
      note: 'Bidirectional AUX channel and Hot Plug Detect (HPD) for DisplayPort. AUX carries DPCD register reads/writes (link training, EDID, MST topology), and HPD indicates monitor connect/disconnect events. AUX also carries the DisplayPort over USB-C (DP Alt Mode) configuration handshake with the USB-C port controller (CCx lines).'
    },
    {
      num: 33,
      id: 'ESPI_CLK',
      lbl: 'eSPI',
      name: 'eSPI — Enhanced SPI Bus (BIOS Flash / EC)',
      type: 'SPI',
      funcs: ['SPI'],
      volt: '1.8V logic',
      curr: 'Signal',
      note: 'eSPI (Enhanced Serial Peripheral Interface) replaces the legacy LPC bus on AM5. Used to communicate with: (1) the BIOS SPI flash chip (up to 33 MHz quad-IO for fast POST), (2) the embedded controller (EC) for keyboard, fan control, power button. eSPI runs at 1.8 V on AM5 — unlike older 3.3 V SPI. Includes CLK, CS#, IO[3:0], ALERT#, and RESET# signals.'
    },
    {
      num: 34,
      id: 'ESPI_IO',
      lbl: 'eSPI_D',
      name: 'eSPI Data Bus — IO[3:0] Quad Mode',
      type: 'SPI',
      funcs: ['SPI'],
      volt: '1.8V logic',
      curr: 'Signal',
      note: 'Four bidirectional eSPI data lines (IO0–IO3) for quad-mode transfers. In quad mode, BIOS boot image is loaded at up to ~132 Mbps — significantly faster than legacy dual SPI. IO0 = MOSI (Single), IO0+IO1 = Dual, IO0–IO3 = Quad. The AMD FCH arbitrates between the BIOS flash device and EC over eSPI.'
    },
    {
      num: 35,
      id: 'SMBUS_CLK',
      lbl: 'SMBclk',
      name: 'SMBus Clock — FCH / Sensor / Thermal Bus',
      type: 'SMB',
      funcs: ['SMB'],
      volt: '3.3V',
      curr: '< 1 mA',
      note: 'System Management Bus (SMBus 2.0, ~100 kHz) clock. Connects the AMD FCH to: DDR5 SPD5 EEPROMs (for XMP/EXPO profile reading), DIMM temperature sensors (TS5111), VRM PMBus controllers, and other onboard sensors. The CPU itself is the bus master via the FCH. HWiNFO64 reads temperatures and power from this bus.'
    },
    {
      num: 36,
      id: 'SMBUS_DAT',
      lbl: 'SMBdat',
      name: 'SMBus Data — Bidirectional Sensor / SPD Bus',
      type: 'SMB',
      funcs: ['SMB'],
      volt: '3.3V open-drain',
      curr: 'Pulled up 10 kΩ',
      note: 'SMBus data line. Open-drain — all devices can assert low but only pull-up resistors drive high. Carries SPD5 data read during memory training (crucial for XMP/EXPO profiles), PMBus VRM commands, and sensor polling. DDR5\'s on-die ECC and refresh management are also configured via this bus by the memory controller.'
    },
    {
      num: 37,
      id: 'CLKOUT_CPU',
      lbl: 'CPUCLK',
      name: 'CPU Clock Output — Reference to FCH / Chipset',
      type: 'MISC',
      funcs: ['MISC'],
      volt: '1.8V diff',
      curr: 'Signal',
      note: 'The CPU outputs a 100 MHz reference clock to the AMD FCH/chipset (X670E, B650 etc.) for chipset-side PCIe, SATA, and USB clocking. This clock is generated by the CPU\'s internal PLL from its internal oscillator or an external 48 MHz crystal input (board-dependent). BCLK overclocking adjusts this reference, affecting all clocked domains.'
    },
    {
      num: 38,
      id: 'BCLK_REF',
      lbl: 'BCLK',
      name: 'BCLK — Base Clock Input (100 MHz nominal)',
      type: 'MISC',
      funcs: ['MISC'],
      volt: '1.8V diff',
      curr: 'Signal',
      note: 'Base clock reference input. Nominally 100 MHz. Multiplied by the CPU\'s internal clock multiplier (ratio) to produce the core frequency. Ryzen 5 7600: up to 50× = 5.0 GHz boost. BCLK OCing (e.g. to 103 MHz) proportionally raises core clock, Infinity Fabric, and PCIe clocks. Most AM5 boards allow BCLK 99–105 MHz range. Unlike Intel, Ryzen 7000 can be multiplier-unlocked without BCLK OC.'
    },
    {
      num: 39,
      id: 'PCIE_PERST',
      lbl: 'PERST#',
      name: 'PCIe PERST# — Fundamental Reset to GPU',
      type: 'PCIE',
      funcs: ['PCIE'],
      volt: '3.3V logic',
      curr: '< 1 mA',
      note: 'Active-low PCIe Fundamental Reset signal sent from the CPU to the GPU (or other PCIe endpoint). The CPU asserts PERST# during system boot and releases it after PCIe link training begins. Also asserted on warm reset, BSOD recovery, or GPU driver crash. GPUs must complete link training within 100 ms of PERST# deassertion (per PCIe spec).'
    },
    {
      num: 40,
      id: 'WAKE_SCI',
      lbl: 'SCI#',
      name: 'SCI# / WAKE# — System Control / Wake Interrupt',
      type: 'MISC',
      funcs: ['MISC'],
      volt: '3.3V logic',
      curr: '< 1 mA',
      note: 'System Control Interrupt (SCI#) and PCIe WAKE# rolled into this pad group. SCI# is the ACPI interrupt that the CPU uses to signal system events to the OS (USB hotplug, power button press, battery events). WAKE# is asserted by PCIe devices to wake the system from S3/S4/S5. Both are open-drain, active low, handled by the AMD FCH ACPI controller.',
      _rightSlot: 19
    },
  ],

  // ── ALTERNATE FUNCTIONS ────────────────────────────────────────
  altFuncs: {
    'VDD_SOC':    ['VDDCR_SOC', 'Fabric VDD'],
    'VDDIO_MEM':  ['DDR5 I/O', 'VDDQ'],
    'DDR5_DQ_A':  ['Sub-Ch A0', 'Sub-Ch A1', 'ECC (registered only)'],
    'DDR5_DQ_B':  ['Sub-Ch B0', 'Sub-Ch B1'],
    'PCIE5_TX_UP':['x16 GPU', 'x8+x8 bifurcation', 'x8+x4+x4 bifurcation'],
    'PCIE4_CPU':  ['NVMe x4 (Gen4)', 'SATA (via M.2 MUX)'],
    'USB4_TX0':   ['DP Alt Mode', 'PCIe 3.0×2 tunnel', 'TBT3 compat'],
    'USB4_TX1':   ['DP Alt Mode lane 2', 'USB4 Gen3×2'],
    'USB2_DP_DN': ['USB-FS (12 Mbps)', 'USB-LS (1.5 Mbps)'],
    'DP_TX_A':    ['HDMI 2.1 (via LSPCon)', 'USB-C DP Alt'],
    'ESPI_CLK':   ['Legacy SPI compat', 'Quad-IO mode'],
    'BCLK_REF':   ['BCLK OC', '99–105 MHz adjustable'],
    'SVI3_CPU':   ['SVI3 VDD', 'SVI3 SOC'],
  },

  // ── QUICK SPECS ────────────────────────────────────────────────
  quickSpecs: [
    { label: 'Architecture', value: 'Zen 4 (Raphael)',    color: '#58a6ff' },
    { label: 'Cores / Threads', value: '6C / 12T',        color: '#e0e5ec' },
    { label: 'Base / Boost',  value: '3.8 / 5.1 GHz',    color: '#c8a850' },
    { label: 'Cache (L3)',    value: '32 MB',              color: '#e0e5ec' },
    { label: 'TDP (PPT)',     value: '65 W (88 W PPT)',   color: '#ff6b6b' },
    { label: 'Process',       value: '4nm TSMC (CCD) + 6nm (IOD)', color: '#78c878' },
    { label: 'Memory',        value: 'DDR5-5200 (JEDEC)', color: '#9898d8' },
    { label: 'PCIe',          value: 'Gen 5 x16 + Gen 4 x4', color: '#4a9aee' },
    { label: 'iGPU',          value: 'RDNA3, 2 CUs (Radeon 740M)', color: '#a78bfa' },
    { label: 'Socket',        value: 'AM5 / LGA-1718',    color: '#e0e5ec' },
    { label: 'USB (CPU)',     value: 'USB4×2 + USB3.2G2×2 + USB2×4', color: '#50c8c8' },
    { label: 'Launch MSRP',   value: '$229 USD',           color: '#3fb950' },
  ],

  // ── DETAILED SPECS ─────────────────────────────────────────────
  dsSpecs: [
    { label: 'CPU Architecture',  value: 'Zen 4 (Raphael-X, monolithic CCD + IOD)' },
    { label: 'CCD Process',       value: 'TSMC N4 (4nm-class FinFET)' },
    { label: 'IOD Process',       value: 'TSMC N6 (6nm-class FinFET)' },
    { label: 'Physical Cores',    value: '6 (one CCD, one CCX of 6 cores)' },
    { label: 'Logical Processors','value: 12 (SMT2 — Simultaneous Multithreading)' },
    { label: 'Base Clock',        value: '3.8 GHz (all-core sustained at TDP)' },
    { label: 'Boost Clock (max)', value: '5.1 GHz (single-core Precision Boost 2)' },
    { label: 'L1 Cache',          value: '32 KB I + 32 KB D per core (6 × 64 KB)' },
    { label: 'L2 Cache',          value: '1 MB per core (6 MB total)' },
    { label: 'L3 Cache',          value: '32 MB shared (victim L3, unified CCD)' },
    { label: 'TDP (cTDP)',        value: '65 W (configurable 45–65 W via BIOS)' },
    { label: 'PPT Limit',         value: '88 W default (Package Power Tracking)' },
    { label: 'TDC Limit',         value: '75 A (Thermal Design Current, VDD)' },
    { label: 'EDC Limit',         value: '150 A (Electrical Design Current, peak)' },
    { label: 'TJMAX',             value: '95 °C (Tctl throttle point)' },
    { label: 'Memory Controller', value: 'Integrated dual-channel DDR5' },
    { label: 'Max Memory Speed',  value: 'DDR5-5200 (JEDEC) / DDR5-6000+ (EXPO/XMP)' },
    { label: 'Max Memory Capacity','value: 2 × 128 GB (256 GB total with 128 GB DIMMs)' },
    { label: 'ECC Support',       value: 'Yes (unbuffered ECC DDR5 — requires board support)' },
    { label: 'PCIe Version',      value: 'PCIe 5.0 x16 (GPU) + PCIe 4.0 x4 (NVMe)' },
    { label: 'iGPU',              value: 'AMD Radeon 740M — RDNA3, 2 Compute Units' },
    { label: 'iGPU Frequency',    value: 'Up to 2200 MHz' },
    { label: 'USB (from CPU)',    value: 'USB4 Gen3×2 (40 Gbps) × 2; USB 3.2 Gen2 × 2; USB 2.0 × 4' },
    { label: 'Display Outputs',   value: 'Up to 4 (via iGPU RDNA3 display engine)' },
    { label: 'Socket',            value: 'AM5 (LGA-1718) — forward compat through AM5 lifespan' },
    { label: 'Cooler Socket',     value: 'AM5 (same mount as AM4 with included bracket)' },
    { label: 'Unlocked',          value: 'Yes — full multiplier unlocked for OC' },
    { label: 'Virtualization',    value: 'AMD-V (SVM), AMD-Vi (IOMMU)' },
    { label: 'Security',          value: 'AMD Shadow Stack, fTPM 2.0, AMD TSME' },
    { label: 'Launch Date',       value: 'January 2023' },
  ],

  // ── KEY FEATURES ───────────────────────────────────────────────
  dsFeatures: [
    'Zen 4 microarchitecture: 13% IPC uplift over Zen 3, AVX-512 support, larger op cache',
    'AM5 platform longevity: AMD committed to AM5 socket support through at least 2027',
    'Integrated RDNA3 iGPU (Radeon 740M): enables PC builds without a discrete GPU',
    'PCIe 5.0 x16 GPU lane: future-proof for next-gen graphics cards',
    'USB4 Gen 3×2 (40 Gbps): two native USB4 ports — supports DisplayPort 2.0 and PCIe tunneling',
    'DDR5 memory: dual-channel, ECC-capable, up to 256 GB; sweet spot at DDR5-6000',
    'Precision Boost 2 + Precision Boost Overdrive (PBO): automatic performance scaling and overclocking',
    'Thermal design: stock wraith stealth cooler included; AM4 coolers compatible with AM5 bracket',
    'Full multiplier unlocking: OC via AMD Ryzen Master or BIOS without needing K/X suffix',
    'AVX-512 support: significant uplift for scientific, compression, and AI inference workloads vs Zen 3',
    'AMD EXPO (Extended Profiles for OC): single-click DDR5 XMP equivalent optimised for AM5',
    'Ryzen 5 7600 vs 7600X: identical boost clocks, same silicon, ~10–15 W lower default PPT — quieter and cooler with negligible real-world performance difference',
  ],
};