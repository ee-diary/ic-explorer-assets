# AI Hardware Explorer — Project Context & AI Instructions

## What This Project Is

This is a **pivot of the IC Explorer project** (originally a microcontroller pinout viewer
for chips like AVR, PIC, STM32) into a broader AI & hardware discovery site covering
CPUs, GPUs, NPUs, SoCs, and AI accelerators.

The site runs on **Blogger** with a custom dark-mode IBM Plex Mono theme (from ee-diary.com /
@wikianow). Each chip or tool gets its own blog post. **Tool widgets are pasted directly
into Blogger post HTML — no external hosting or iframes required.**

The Blogger theme accent color is `#58a6ff` (blue). The site uses IBM Plex Mono font
throughout. Dark mode is always on.

---

## Two Distinct Things This Project Has

### 1. The IC Explorer Widget (existing, carried over)
The original interactive pinout viewer for standard ICs. This still works for chips
like microcontrollers. Files live at `ee-diary.github.io/ic-explorer-assets/`.

### 2. NEW — AI Hardware Web Apps (what we are building now)
Standalone interactive widgets pasted **directly into Blogger post HTML editor**.
Each tool is a self-contained snippet — no `<html>`, `<head>`, `<body>`, or `<title>`
tags. Everything is plain `<div>`, `<style>`, and `<script>` — ready to paste straight
into the Blogger post HTML view.

The four planned tools are described below in priority order.

---

## Repository Structure (GitHub Pages asset host)

```
📦 
├─ AI_HARDWARE_SITE_README.md
├─ README.md
├─ configs
│  ├─ .keep
│  ├─ analog
│  │  ├─ lm3914-config.js
│  │  ├─ mc1496-config.js
│  │  ├─ mp1584-config.js
│  │  └─ op-amp
│  │     ├─ lm324-config.js
│  │     ├─ lm358-config.js
│  │     └─ tl072-config.js
│  ├─ boards
│  │  ├─ arduino-uno-config.js
│  │  ├─ rasberry-pi3-config.js
│  │  └─ teensy41-config.js
│  ├─ cpu
│  │  └─ ryzen5-7600-config.js
│  ├─ digital
│  │  ├─ 74hc4051-config.js
│  │  ├─ 74hc595-config.js
│  │  ├─ dm7486n-config.js
│  │  └─ ne555-timer-config.js
│  ├─ interface
│  │  ├─ ch340g-config.js
│  │  ├─ cp2102-config.js
│  │  ├─ ft232rl-config.js
│  │  ├─ max7219-config.js
│  │  ├─ mcp2515-config.js
│  │  └─ pca9685-config.js
│  ├─ mcu
│  │  ├─ arm
│  │  │  └─ rp2350-config.js
│  │  ├─ avr
│  │  │  ├─ atmega2560-config.js
│  │  │  ├─ atmega32-config.js
│  │  │  ├─ atmega328p-config.js
│  │  │  ├─ atmega32u4-config.js
│  │  │  ├─ attiny13-config.js
│  │  │  ├─ attiny45-config.js
│  │  │  └─ attiny85-config.js
│  │  ├─ msp430
│  │  │  ├─ msp430f5529-config.js
│  │  │  ├─ msp430fr5994-config.js
│  │  │  └─ msp430g2553-config.js
│  │  ├─ pic
│  │  │  ├─ pic12f683-config.js
│  │  │  ├─ pic16f877a-config.js
│  │  │  └─ pic18f4550-config.js
│  │  └─ stm32
│  │     ├─ stm32f103c8t6-config.js
│  │     ├─ stm32f401re-config.js
│  │     └─ stm32l4r5zit6-config.js
│  ├─ mixed
│  │  ├─ ads1115-config.js
│  │  ├─ l293d-config.js
│  │  ├─ mp2307-config.js
│  │  └─ mpu-6050-config.js
│  ├─ pmic
│  │  ├─ lm2596-config.js
│  │  ├─ mp2315-config.js
│  │  └─ tp4056-config.js
│  └─ soc
│     └─ nrf52840-config.js
├─ core
│  ├─ .keep
│  ├─ ic-explorer-base.js
│  └─ ic-explorer-core.css
├─ dip-renderer.js
├─ flashers
│  ├─ stk500-flasher.js
│  └─ webdfu.js
├─ ic-explorer-core.css
├─ ic-explorer-engine.js
├─ qfp-renderer.js
└─ renderers
   ├─ .keep
   ├─ arduino-uno-renderer.js
   ├─ cpu-socket-renderer.js
   ├─ custom-board-renderer.js
   ├─ dip-renderer.js
   ├─ gpu-renderer.js
   ├─ qfn-renderer.js
   ├─ qfp-renderer.js
   ├─ renderer-factory.js
   ├─ soic-renderer.js
   ├─ soc-renderer.js
   └─ teensy41-renderer.js
```

> **Note:** There is no `tools/` folder. Tool widgets are not hosted as separate files.
> They are pasted directly into Blogger posts as inline HTML snippets.

---

## Design Rules for All New Tool Widgets

All tools must visually match the existing Blogger theme:

| Property         | Value                                  |
|------------------|----------------------------------------|
| Background       | `#0d1117` (near-black)                 |
| Surface/card bg  | `#161b22`                              |
| Border color     | `#30363d`                              |
| Primary accent   | `#58a6ff` (blue — matches theme)       |
| Success green    | `#3fb950`                              |
| Warning yellow   | `#d29922`                              |
| Danger red       | `#f85149`                              |
| Purple (AI/NPU)  | `#a78bfa`                              |
| Font family      | `'IBM Plex Mono', monospace`           |
| Font size (body) | `15px`                                 |
| Border radius    | `6px` (cards), `4px` (inputs/buttons) |
| Scrollbar        | Styled dark (use `::-webkit-scrollbar`)|

Load IBM Plex Mono from Google Fonts in every widget's `<style>` block using `@import`:
```html
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
/* ... rest of styles ... */
</style>
```

Do not use any external UI frameworks (no Bootstrap, no Tailwind, no React).
Write plain HTML + CSS + vanilla JS only.

---

## Blogger Post Widget Format

Each tool widget is a **self-contained snippet** with no document-level tags.
The output structure is always:

```html
<style>
  /* All widget CSS here — scoped to a unique wrapper ID to avoid conflicts */
</style>

<div id="tool-bottleneck-calc">
  <!-- All widget HTML here -->
</div>

<script>
  // All widget JS here — wrapped in an IIFE to avoid global scope pollution
  (function() {
    // data + logic + DOM interaction
  })();
</script>
```

**Rules:**
- ❌ No `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, `<title>` tags
- ❌ No `<link>` tags — use `@import` inside `<style>` for Google Fonts
- ✅ Use a unique wrapper `id` on the root `<div>` (e.g. `tool-bottleneck-calc`)
- ✅ Scope all CSS selectors under that wrapper ID to avoid conflicts with Blogger theme
- ✅ Wrap all JS in an IIFE `(function(){ ... })();`
- ✅ Everything self-contained — no external JS files, no iframes

---

## Tool #1 — Bottleneck & Synergy Calculator
**Blogger post title:** e.g. "CPU & GPU Bottleneck Calculator — AI Hardware Explorer"
**Build this first.**

### What it does
User picks a CPU and GPU from dropdown menus. The tool outputs:
- A "Synergy Rating" for 1080p, 1440p, and 4K (shown as colored bars or scores)
- A verdict: which component is the bottleneck at each resolution
- Actionable advice (e.g. "Your GPU is 30% underutilized at 1080p — switch to 1440p")

### Data
Hardcode a JSON dataset inside the `<script>` block. Include at minimum:

**CPUs (20+ entries):** Intel Core i5-12600K, i7-12700K, i9-12900K, i5-13600K,
i7-13700K, i9-13900K, i5-14600K, i7-14700K, i9-14900K, Core Ultra 5 245K,
Core Ultra 7 265K, Core Ultra 9 285K, AMD Ryzen 5 5600X, Ryzen 7 5800X3D,
Ryzen 9 5900X, Ryzen 5 7600X, Ryzen 7 7800X3D, Ryzen 9 7950X, Ryzen AI 9 365,
Ryzen AI 9 HX 370.

Each CPU entry needs:
```js
{
  id: 'r7-7800x3d',
  name: 'AMD Ryzen 7 7800X3D',
  tier: 9,          // 1–10 CPU gaming performance tier
  cores: 8,
  threads: 16,
  tdp: 120,
  hasNPU: false,
  npuTops: 0
}
```

**GPUs (20+ entries):** RTX 3060, 3070, 3080, 3090, 4060, 4070, 4070 Ti, 4080,
4090, 5070, 5080, 5090, RX 6700 XT, 6800 XT, 7800 XT, 7900 XTX, 9070 XT, 9080.

Each GPU entry needs:
```js
{
  id: 'rtx-4090',
  name: 'NVIDIA GeForce RTX 4090',
  tier: 10,         // 1–10 GPU gaming performance tier
  vram: 24,
  tdp: 450,
  vendor: 'nvidia'
}
```

### UI layout
```
[CPU Dropdown ▼]          [GPU Dropdown ▼]          [Calculate]

┌──────────────────────────────────────────────────────────────┐
│  1080p   Synergy: ████████░░  82%   Bottleneck: CPU          │
│  1440p   Synergy: █████████░  91%   Bottleneck: Balanced ✓   │
│  4K      Synergy: ██████████  97%   Bottleneck: GPU          │
└──────────────────────────────────────────────────────────────┘

💡 Your GPU is 30% underutilised at 1080p.
   Switch to 1440p for the best balance.
```

---

## Tool #2 — AI Readiness & NPU Checker
**Blogger post title:** e.g. "AI Readiness & NPU Checker — Can Your PC Run Local AI?"
**Build this second.**

### What it does
User selects their CPU and GPU. The tool outputs:
- An "AI Capability Score" out of 100
- Whether the CPU has a dedicated NPU and its TOPS rating
- A list of AI models the user can run locally, with estimated performance
- Badge: "AI PC Ready ✓" or "Not AI Ready ✗"

### Data — add to CPU entries:
```js
hasNPU: true,
npuTops: 48,          // dedicated NPU TOPS (0 if none)
cpuInferenceTops: 10, // CPU-side AI TOPS
ramBandwidth: 89.6,   // GB/s (affects LLM token speed)
```

### Data — add to GPU entries:
```js
tensorTops: 1457,     // FP8 tensor TOPS for RTX 40 series
vramBandwidth: 1008,  // GB/s
```

### AI model compatibility table (hardcode this):
```js
const AI_MODELS = [
  { name: 'Llama 3.2 1B',   ramGB: 2,  vramGB: 2,  bw_req: 10  },
  { name: 'Llama 3.2 3B',   ramGB: 4,  vramGB: 4,  bw_req: 20  },
  { name: 'Llama 3.1 8B',   ramGB: 8,  vramGB: 6,  bw_req: 40  },
  { name: 'Llama 3.1 70B',  ramGB: 48, vramGB: 48, bw_req: 200 },
  { name: 'Mistral 7B',     ramGB: 8,  vramGB: 6,  bw_req: 40  },
  { name: 'Phi-3 Mini',     ramGB: 4,  vramGB: 3,  bw_req: 15  },
  { name: 'Gemma 2 9B',     ramGB: 10, vramGB: 8,  bw_req: 50  },
  { name: 'DeepSeek R1 7B', ramGB: 8,  vramGB: 6,  bw_req: 40  },
];
```

Add a RAM slider input (8 GB / 16 GB / 32 GB / 64 GB / 128 GB) so the user can
specify how much system RAM they have — this affects which models run on CPU.

### UI layout
```
[CPU Dropdown]    [GPU Dropdown]    [RAM: 32GB ▼]    [Check Now]

┌─────────────────────────────────────────────┐
│  AI Capability Score         [====|   ] 72  │
│  NPU: Intel AI Boost — 48 TOPS  ✓           │
│  GPU Tensor: RTX 4070 — 641 TOPS ✓          │
└─────────────────────────────────────────────┘

Model Compatibility:
  ✓ Llama 3.2 1B    — GPU  ~85 tok/s
  ✓ Llama 3.1 8B    — GPU  ~32 tok/s
  ✓ Mistral 7B      — GPU  ~28 tok/s
  ✓ Phi-3 Mini      — NPU  ~40 tok/s  ★ Best for NPU
  ~ DeepSeek R1 7B  — CPU  ~8 tok/s   (slow)
  ✗ Llama 3.1 70B   — Insufficient VRAM
```

---

## Tool #3 — Chip Anatomy Explorer (Visual)
**Blogger post title:** e.g. "Chip Anatomy Explorer — CPU & GPU Architecture Visualizer"
**Build this third.**

### What it does
Side-by-side visual comparison of CPU/GPU architectures. Shows core topology blocks
using SVG — P-cores, E-cores, GPU clusters, cache hierarchy, NPU block.

### Data format per chip:
```js
{
  id: 'apple-m4',
  name: 'Apple M4',
  type: 'SoC',
  manufacturer: 'Apple',
  process: '3nm TSMC',
  year: 2024,
  transistors: '28B',
  topology: {
    pCores: 4,
    eCores: 6,
    gpuClusters: 10,
    npuCores: 16,
    npuTops: 38,
    l2Cache: '16MB',
    unifiedMemory: true
  }
}
```

Render the topology as an SVG block diagram: rectangles for core clusters,
colored by type (P-core = blue, E-core = green, GPU = purple, NPU = orange,
Cache = gray). Scale block sizes proportionally to core count.

### Chips to include (minimum):
Apple M4, Apple M4 Pro, Intel Core Ultra 9 285K (Arrow Lake),
AMD Ryzen AI 9 HX 370 (Strix Point), Qualcomm Snapdragon X Elite,
NVIDIA H100, AMD MI300X, Intel Gaudi 3.

---

## Tool #4 — GPU Power & Thermal Sanity Check
**Blogger post title:** e.g. "GPU PSU & Thermal Calculator — Power Sanity Check"
**Build this last.**

### What it does
User selects GPU + CPU + case type. Tool calculates:
- Minimum PSU wattage needed (with 20% headroom)
- Whether their PSU connector (12VHPWR vs 2x8-pin) is safe
- Thermal headroom estimate based on case airflow profile

### PSU connector safety rules (hardcode):
- RTX 4090, 5090: Requires 16-pin 12VHPWR. Flag 3x8-pin adapters as risky.
- RTX 5080, 4080: 16-pin preferred; 2x8-pin acceptable.
- RTX 4070 Ti and below: 2x8-pin is fine.

### Case airflow profiles (dropdown):
Mini-ITX (poor), mATX compact (fair), Mid-tower standard (good),
Mid-tower mesh front (excellent), Full tower (excellent).

---

## How Each Blog Post Should Be Structured

For each CPU/GPU blog post (paralleling how AVR/PIC posts work for IC Explorer):

1. **Post title:** e.g. "NVIDIA RTX 5090 — AI Capabilities, Specs & Bottleneck Analysis"
2. **Labels/tags:** gpu, nvidia, rtx-5090, ai-readiness, 2025
3. **Post body structure:**
   - Brief intro paragraph
   - Key specs table (process node, CUDA cores, VRAM, TDP, bandwidth, Tensor TOPS)
   - AI Readiness Checker widget (pasted inline, pre-filtered or linked to that GPU)
   - Architecture notes section
   - Bottleneck Calculator widget (pasted inline)
   - Buy / datasheet links

---

## IC Explorer Renderer Files — What to Touch and When

The renderer files serve the original IC Explorer pages. The rules below replace any
previous blanket "do not touch" guidance and give you clear criteria for each file.

### Never modify (bug fixes only)
These files are core infrastructure. Only touch them if you have identified and can
reproduce a specific bug:

- `core/ic-explorer-core.css`
- `core/ic-explorer-base.js`
- `renderers/dip-renderer.js`
- `renderers/qfn-renderer.js`
- `renderers/custom-board-renderer.js`
- `renderers/arduino-uno-renderer.js`
- `renderers/teensy41-renderer.js`

### Modify when a new chip or renderer requires it
`renderer-factory.js` maps package strings and part names to renderer objects.
You **must** update it when:

- Adding a CPU, GPU, or SoC whose `package` value does not match any existing
  factory entry (e.g. a new socket type, a new GPU family, a new SoC form factor).
- Creating a brand-new renderer file — the factory must register it before any
  chip page can use it.

When editing `renderer-factory.js`:
- Add the new match condition following the pattern of existing entries.
- Do not remove or reorder existing conditions — all existing chip pages must keep working.
- Return the correct renderer object from the factory function.

### Modify to check or fix renderer completeness
If the chip's package routes to one of the renderers below but the rendered output
is wrong or incomplete, inspect and update the relevant file:

- `renderers/qfp-renderer.js` — for QFP / LQFP / TQFP chips
- `renderers/cpu-socket-renderer.js` — for socketed CPUs (AM5, LGA1851, etc.)
- `renderers/gpu-renderer.js` — for PCIe GPU cards
- `renderers/soc-renderer.js` — for SoC / integrated die packages

### Create a new renderer when the form factor is not covered
If the chip's physical form factor does not match any existing renderer (e.g. an
AI accelerator mezzanine, a BGA module, or a custom connector layout), **create a
new renderer** rather than forcing the chip into the wrong one:

1. Create `renderers/CHIPTYPE-renderer.js`.
2. Implement `draw(svg, config)` and `updatePins(selectedId, filterType, filterFn)`.
3. Register it on `window` (e.g. `window.MyChipRenderer = { draw, updatePins }`).
4. Add a `<script>` tag for it in the 6-step load order on the chip's HTML page.
5. Add a match condition in `renderer-factory.js` pointing to the new renderer.

---

## Task Instructions for AI

### When asked to build a new tool widget

1. Read the relevant tool spec above (Tool #1, #2, #3, or #4).
2. Output a **Blogger-ready HTML snippet** — no `<html>`, `<head>`, `<body>`, or `<title>` tags.
3. Structure: `<style>` block → root `<div>` → `<script>` block (IIFE).
4. Use `@import` inside the `<style>` block for Google Fonts (no `<link>` tags).
5. Scope all CSS under the root wrapper ID to avoid conflicts with the Blogger theme.
6. Apply the design rules (dark theme, IBM Plex Mono, color palette above).
7. Hardcode all data as a JS object/array inside the `<script>` block.
8. No external dependencies except Google Fonts.
9. Must be fully functional offline (except the font).
10. Output the complete snippet, ready to paste into the Blogger post HTML editor.

### When asked to add a new CPU or GPU to an existing tool

1. Find the `const CPUS = [...]` or `const GPUS = [...]` array in the snippet.
2. Add the new entry following the exact same field structure as existing entries.
3. Output either the full updated snippet or a clearly marked diff/patch showing
   exactly where to insert the new entry.

### When asked to create a new IC Explorer chip page (original feature)

Follow the original IC Explorer rules defined in `README.md`:
- Write only `configs/CHIPNAME-config.js`
- Use lowercase-hyphenated names: `rtx4090`, `corei9-14900k`, etc.
- Follow the `window.IC_CONFIG` schema from `README.md`
- The HTML page for the blog post loads scripts in the 6-step order defined there
- For CPU / GPU / SoC packages, check and update `renderer-factory.js` if the
  package string is new, and create a new renderer file if the form factor is not
  covered by any existing renderer

### Output format rules

- Always provide **complete, copy-paste-ready snippets**
- State clearly at the top of your response: **which tool this is for**
  and **that it should be pasted into the Blogger post HTML editor**
- If modifying an existing snippet, show the full updated snippet OR a minimal diff
  with enough surrounding context to locate the change unambiguously
- Flag any issues you notice:
  - Data inconsistency (e.g. TOPS number that seems wrong)
  - Missing fields in a chip entry
  - CSS that would break the IBM Plex Mono / dark theme
  - Any external dependency that requires a server (must be avoided)

---

## Reference — Standard IC Explorer Config (for legacy chip pages)

The IC Explorer config format for standard microcontroller chips (AVR, PIC, STM32 etc.)
is unchanged. See `README.md` for the full `window.IC_CONFIG` schema, pin ordering
rules, renderer factory routing, and the 6-step HTML load order.

The gold-standard reference page for IC Explorer behavior is the PIC16F877A page.

---

## Summary Cheat Sheet

| What you want to build          | Output format                                    | Pattern to follow         |
|---------------------------------|--------------------------------------------------|---------------------------|
| Bottleneck Calculator tool      | Blogger HTML snippet (no doc tags)               | Tool #1 spec above        |
| AI Readiness Checker tool       | Blogger HTML snippet (no doc tags)               | Tool #2 spec above        |
| Chip Anatomy Explorer tool      | Blogger HTML snippet (no doc tags)               | Tool #3 spec above        |
| PSU/Thermal Sanity Check tool   | Blogger HTML snippet (no doc tags)               | Tool #4 spec above        |
| New CPU/GPU blog post           | Paste widget snippet into Blogger post HTML      | Post structure above      |
| New standard IC pinout page     | `configs/CHIPNAME-config.js`                     | README.md                 |
| New CPU / GPU / SoC pinout page | `configs/TYPE/CHIPNAME-config.js` + factory update if needed | README.md + renderer rules above |
| New dev board pinout page       | `configs/BOARD-config.js` + `boards/BOARD-board.js` | README.md             |
| New renderer (unsupported form factor) | `renderers/CHIPTYPE-renderer.js` + `renderer-factory.js` update | README.md step 8 |