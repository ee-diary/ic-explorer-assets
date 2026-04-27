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
ic-explorer-assets/
│
├── core/
│   ├── ic-explorer-core.css          # Shared dark-theme UI (DO NOT MODIFY)
│   └── ic-explorer-base.js           # Shared engine (DO NOT MODIFY)
│
├── renderers/                        # IC renderers (DO NOT MODIFY unless bug fix)
│   ├── renderer-factory.js
│   ├── dip-renderer.js
│   ├── qfp-renderer.js
│   ├── qfn-renderer.js
│   ├── custom-board-renderer.js
│   ├── arduino-uno-renderer.js
│   └── teensy41-renderer.js
│
├── configs/                          # One JS config file per standard IC chip
│   ├── pic16f877a-config.js
│   ├── pic18f4550-config.js
│   └── stm32f103c8t6-config.js
│
├── boards/                           # Board geometry for dev boards (Raspberry Pi, Arduino, etc.)
│   ├── raspberry-pi-4b-board.js
│   └── arduino-uno-board.js
│
└── ic-explorer-shell.html            # Reference scaffold for IC chip pages
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
  name: 'NVIDIA RTX 4090',
  tier: 10,         // 1–10 GPU gaming performance tier
  vram: 24,         // GB
  tdp: 450,         // watts
  bandwidth: 1008,  // GB/s
  hasRTCores: true,
  hasTensorCores: true
}
```

### Bottleneck calculation logic
```
bottleneck_pct = abs(cpu_tier - gpu_tier) * 10  // rough percentage
resolution_weight:
  1080p → CPU-heavy (cpu_tier matters more)
  1440p → balanced
  4K    → GPU-heavy (gpu_tier matters more)

synergy_1080p = 100 - max(0, (gpu_tier - cpu_tier) * 12)
synergy_1440p = 100 - abs(cpu_tier - gpu_tier) * 7
synergy_4K    = 100 - max(0, (cpu_tier - gpu_tier) * 12)
```

### UI layout
```
[CPU Dropdown]    [GPU Dropdown]    [Calculate Button]

─────────────────────────────────────
  Resolution  │  Synergy  │  Verdict
─────────────────────────────────────
  1080p        [====|====] 78%  CPU bottleneck -22%
  1440p        [=========] 94%  Balanced ✓
  4K           [====|====] 82%  GPU bottleneck -18%
─────────────────────────────────────

  💡 Advice: Your GPU is underutilized at 1080p.
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

## What NOT to Touch

These files must not be modified unless fixing a confirmed bug:

- `core/ic-explorer-core.css`
- `core/ic-explorer-base.js`
- `renderers/renderer-factory.js`
- `renderers/dip-renderer.js`
- `renderers/qfp-renderer.js`
- `renderers/qfn-renderer.js`
- `renderers/custom-board-renderer.js`
- `renderers/arduino-uno-renderer.js`
- `renderers/teensy41-renderer.js`

These serve the original IC Explorer pages and must remain backward compatible.

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

Follow the original IC Explorer rules:
- Write only `configs/CHIPNAME-config.js`
- Use lowercase-hyphenated names: `rtx4090`, `corei9-14900k`, etc.
- Follow the `window.IC_CONFIG` schema from the original readme
- The HTML page for the blog post loads scripts in the 6-step order defined
  in the original readme

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
is unchanged. See original `readme.txt` for the full `window.IC_CONFIG` schema,
pin ordering rules, renderer factory routing, and the 6-step HTML load order.

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
| New standard IC pinout page     | `configs/CHIPNAME-config.js`                     | Original readme.txt       |
| New dev board pinout page       | `configs/BOARD-config.js` + `boards/BOARD-board.js` | Original readme.txt    |
