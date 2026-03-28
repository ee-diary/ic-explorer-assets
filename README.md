# IC Explorer — Modular Architecture
## How to go from one 80KB monolith per page → three shared files + a tiny data snippet

---

## The Problem (what you had)
Each Blogger post contained ~80 KB of HTML — every line of CSS, every line of JavaScript
engine logic, and the chip-specific pin data, all duplicated verbatim.

| What was duplicated | Size approx. |
|---|---|
| CSS (all visual styles) | ~8 KB |
| HTML scaffold (tabs, panels) | ~6 KB |
| JS engine (pin explorer, canvas, SnapMagic, PDF) | ~30 KB |
| IC-specific data (pins, specs) | ~35 KB |
| **Total per page** | **~80 KB** |

With 10 IC pages, that's 800 KB of redundant code — and a change to any shared style
or behaviour requires editing every single post.

---

## The Solution (what you have now)

```
YOUR CDN (GitHub Pages / Cloudflare Pages / jsDelivr)
├── ic-explorer-core.css      ← ALL styles (~8 KB, cached once, used everywhere)
└── ic-explorer-engine.js     ← ALL logic (~30 KB, cached once, used everywhere)

Each Blogger post (HTML in post body)
├── <link> to ic-explorer-core.css      (1 line)
├── <script id="ic-data"> window.IC_CONFIG = { ... } </script>   ← CHIP DATA ONLY
├── ic-explorer-shell.html content (the fixed HTML scaffold)     ← copy-paste once
├── <script> for pdf.js (CDN, browser-cached)
├── <script src="...ic-explorer-engine.js">
└── <script> ICExplorer.init(window.IC_CONFIG); </script>
```

**Per-page payload after caching:**
- CSS: 0 KB (browser cache hit after first visit)
- Engine JS: 0 KB (browser cache hit)
- Shell HTML: ~3 KB (unavoidable — Blogger serves it)
- **IC data snippet: ~5–15 KB** (the only unique part per page)

**That's an 80% reduction in per-page data on repeat visits.**

---

## File Breakdown

### `ic-explorer-core.css`
Contains 100% of the CSS — fonts, layout, colours, animations, responsive rules.
**Never contains any chip-specific content.**
Host it on any static CDN and link from every post.

### `ic-explorer-engine.js`
Contains 100% of the JavaScript engine:
- SVG pin drawing (DIP layout)
- Pin hover, click, filter, list interactions
- Tooltip
- Main tab switching (PIN / DESIGN / DATASHEET)
- SnapMagic API fetch + canvas rendering
- Local fallback schematic/symbol/footprint drawing
- Datasheet tab (sample data + PDF.js upload)

**Reads everything it needs from `window.IC_CONFIG`.**
No hard-coded chip references anywhere.

### `ic-explorer-shell.html`
The fixed HTML scaffold — the `#a13wrap` div, all tab buttons, all panel divs.
**Identical on every page.**
The header text (title, badge, subtitle) is filled in dynamically from IC_CONFIG.

---

## Adding a New IC Page (e.g. ATmega328P, Arduino Uno, Teensy 4.0)

1. **Copy** `ic-explorer-shell.html` into a new Blogger post (HTML view).
2. **Replace** the `<script id="ic-data">` block with your new chip's data:

```html
<script id="ic-data">
window.IC_CONFIG = {
  partName:     'ATmega328P',
  partMPN:      'ATmega328P-PU',
  manufacturer: 'MICROCHIP/ATMEL',
  package:      'DIP-28',
  pinCount:     28,
  snapPageURL:  'https://www.snapeda.com/parts/ATMEGA328P-PU/...',
  downloadURL:  '...',
  datasheetURL: '...',

  dipConfig: { pinsPerSide: 14, bodyX: 122, bodyY: 25, bodyW: 200, bodyH: 490 },

  pins: [
    { num:1, id:'PC6', lbl:'PC6', name:'PC6 / RESET', type:'RESET', funcs:['RESET','GPIO'], volt:'5V', curr:'N/A', note:'...' },
    // ... all 28 pins
  ],

  altFuncs: { 'PC6': ['RESET'], ... },
  quickSpecs: [ {label:'Flash', value:'32 KB'}, ... ],
  dsSpecs:    [ {label:'Architecture', value:'8-bit AVR'}, ... ],
  dsFeatures: [ 'Feature one', 'Feature two', ... ],
};
</script>
```

3. **Done.** The CSS and engine are already cached from your other pages.

---

## dipConfig for Different Packages

| Package | pinsPerSide | bodyX | bodyY | bodyW | bodyH |
|---|---|---|---|---|---|
| DIP-40 (PIC16F877A, PIC18F4550) | 20 | 122 | 25 | 260 | 700 |
| DIP-28 (ATmega328P, UNO) | 14 | 122 | 25 | 200 | 490 |
| DIP-20 (ATtiny2313) | 10 | 122 | 25 | 160 | 350 |
| DIP-8 (ATtiny85) | 4 | 122 | 25 | 120 | 140 |

For non-DIP packages (QFP, QFN), you can extend the engine's draw logic.
The `dipConfig` is intentionally separated for this reason.

---

## Right-side Pin Ordering (`_rightSlot`)

For DIP packages, left-side pins use `num` directly (pin 1 = top-left).
Right-side pins use `_rightSlot`:
- `_rightSlot: 0` = top-right = highest pin number (e.g. pin 40 on DIP-40)
- `_rightSlot: 19` = bottom-right = pin 21 on DIP-40

**Formula:** `_rightSlot = pinCount - num`
- DIP-40 pin 40: `_rightSlot = 40 - 40 = 0` ✓
- DIP-40 pin 21: `_rightSlot = 40 - 21 = 19` ✓
- DIP-28 pin 28: `_rightSlot = 28 - 28 = 0` ✓

---

## CDN Hosting Options (free)

### Option A — GitHub Pages (recommended)
1. Create a repo: `github.com/yourname/ic-explorer-assets`
2. Enable GitHub Pages on `main` branch
3. Upload `ic-explorer-core.css` and `ic-explorer-engine.js`
4. Your URLs:
   ```
   https://yourname.github.io/ic-explorer-assets/ic-explorer-core.css
   https://yourname.github.io/ic-explorer-assets/ic-explorer-engine.js
   ```

### Option B — jsDelivr (CDN acceleration for GitHub)
After pushing to GitHub:
```
https://cdn.jsdelivr.net/gh/yourname/ic-explorer-assets@main/ic-explorer-core.css
https://cdn.jsdelivr.net/gh/yourname/ic-explorer-assets@main/ic-explorer-engine.js
```
jsDelivr adds global CDN edge caching automatically.

### Option C — Cloudflare Pages
Connect your GitHub repo to Cloudflare Pages for free global CDN.

---

## Updating Shared Behaviour

To change styles (colours, layout) across ALL pages at once:
→ Edit `ic-explorer-core.css` and push to CDN. Done.

To fix a bug or add a feature to the JS engine:
→ Edit `ic-explorer-engine.js` and push to CDN.
→ All pages get the update automatically on next visit (after cache expires).

For instant updates, add a version query string in the shell:
```html
<link rel="stylesheet" href=".../ic-explorer-core.css?v=2">
<script src=".../ic-explorer-engine.js?v=2"></script>
```

---

## Files in This Package

| File | Purpose |
|---|---|
| `ic-explorer-core.css` | All CSS — host on CDN |
| `ic-explorer-engine.js` | All JS logic — host on CDN |
| `ic-explorer-shell.html` | HTML scaffold + PIC16F877A data — copy into Blogger posts |
| `pic18f4550-data.html` | PIC18F4550 IC_CONFIG data block — replace the `<script id="ic-data">` section |
| `README.md` | This file |
