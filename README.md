# LagSync

Browser extension + marketing site that eliminates Bluetooth audio delay during video playback.

**Extension live on:** Chrome, Firefox, Safari (macOS), Edge, Brave  
**Website:** [lagsync.com](https://lagsync.com)  
**Safari App Store:** [id6766511020](https://apps.apple.com/app/id6766511020)

---

## What It Does

LagSync intercepts the browser's media pipeline and applies a configurable delay (0–500ms) to video playback, compensating for Bluetooth headphone/speaker latency. Works on YouTube, Twitch, Netflix, Prime Video, and more — across all major browsers.

---

## Extension

### Features

- **Real-time delay compensation** — buffer-aware delay syncs audio to video
- **Bluetooth audio support** — compensate for typical 100–300ms BT headphone lag
- **Zero-latency live streams** — works on live-edge and no-DVR streams (YouTube, Twitch, Prime)
- **Three sync modes:**
  - **Instant** — single hard jump, fastest feel, best for Bluetooth
  - **Gradual** — ~1s playback speed ramp, smooth and natural
  - **Trim** — strips leading buffer first, then applies delay (lowest buffer inflation)
- **One-click presets** — aptX, AAC, SBC, High (common BT codec delays)
- **Live stats** — current delay, buffer state, latency measurements
- **Visual countdown** — "Turning on in ~3s" progress while syncing
- **No telemetry** — 100% on-device, no server communication

### Platform Support

| Platform | Pipeline | Notes |
|----------|----------|-------|
| YouTube VOD | MSE + Trim | Frame-perfect via `timestampOffset` |
| YouTube Live | Canvas | No-DVR live-edge support |
| Twitch | Canvas | Blob-backed codec, multi-bitrate |
| Netflix | Canvas | DRM-safe, gradual mode |
| Prime Video | Instant hard-jump | FairPlay HLS — no MSE/canvas on Safari |
| Generic WebAudio | Canvas fallback | Any site with WebAudio |

Prime Video on Safari is unsupported — FairPlay HLS has no viable delay path.

### Browser Pipelines

**MSE Pipeline (Chrome/Edge):**  
Intercept `MediaSource.prototype.addSourceBuffer` → patch `SourceBuffer.appendBuffer` to inject `timestampOffset` shifts. Frame-perfect with minimal CPU overhead (~2–5%).

**Canvas Pipeline (Firefox/Safari/fallback):**  
Capture audio via `AudioContext.createScriptProcessor`, write to offscreen canvas/buffer, render with calculated delay offset. Required for DRM content and cross-origin streams (~15–25% CPU).

**Browser-specific quirks:**
- Safari: page-script injection at `document_start` via inline script
- Edge: dual injection pattern — manifest `world: "MAIN"` fallback from content script
- Firefox: canvas pipeline only (no MSE patching)

### Extension Structure

```
src/
├── background.ts         # Service worker: persistent state, message relay
├── content.ts            # Content script: DOM access, frame capture
├── page_script.ts        # Page injection: WebAudio/MSE API hooks
├── worker_mse_shim.js    # Web Worker shim for MSE interception
├── types.ts              # Shared message and config types
├── utils.ts              # Timing, buffering, detection helpers
└── popup/
    ├── App.tsx
    └── components/
        ├── ViewMain.tsx          # Delay slider + controls
        ├── ViewSettings.tsx      # User preferences
        ├── ViewStats.tsx         # Real-time metrics
        ├── ViewOnboarding.tsx    # First-run setup
        ├── ViewRatingPrompt.tsx  # Rating/feedback
        ├── ViewTest.tsx          # Diagnostic tools
        └── Header.tsx
```

### Build

```bash
npm install

# Per-browser builds
npm run build:chrome
npm run build:firefox
npm run build:safari
npm run build:edge

# Watch mode
npm run dev              # Chrome
npm run dev:firefox
npm run dev:safari
npm run dev:edge

# Type check
npm run typecheck
```

**Safari → Xcode (prep + open):**
```bash
npm run prep:safari:macos
```
Builds extension, syncs into Xcode project, bumps `MARKETING_VERSION` from `package.json`, auto-increments `CURRENT_PROJECT_VERSION`, opens Xcode ready for *Product → Archive*.

**Safari App Store release (no Xcode GUI):**
```bash
npm run release:safari:macos
```
Same as prep, plus archive + signed `.pkg` export + `xcrun altool --validate-app`.  
See [docs/run-and-convert-macos.md](docs/run-and-convert-macos.md).

---

## Website

Astro 6 marketing and documentation site at [lagsync.com](https://lagsync.com).

### Pages

| Route | Content |
|-------|---------|
| `/` | Landing — hero, browser download CTAs, screenshot carousel, feature cards |
| `/documentation/` | Getting started, keyboard shortcuts, troubleshooting, per-site guides |
| `/help/` | FAQ — 15+ questions, live search, category filtering |
| `/releases/` | Changelog (v1.0 → current) |
| `/fix/` | Fix guide index — YouTube, Netflix, Twitch, Prime Video |
| `/fix/[site]/` | Pre-rendered per-platform fix guides |
| `/donate/` | Stripe donation — "Coffee" ($5+) / "Pizza" ($15+) |
| `/thank-you/` | Post-donation confirmation |
| `/privacy/` | Privacy policy |
| `/terms/` | Terms of service |
| `/rss.xml` | Auto-generated RSS feed |
| `/sitemap.xml` | Auto-generated sitemap with `<lastmod>` |

### Key Components

- **Hero** — headline, install CTA, browser-detection-aware primary button, PromoRotator
- **PromoRotator** — auto-advancing carousel (5s, pauses on hover), manual nav, 16:9 locked
- **BrowserLinks** — 5-browser grid pulling store links + version from `src/config.ts`
- **Screenshots** — full-width marquee + lightbox with keyboard navigation
- **Features** — 3-column cards: MSE hooking, Web Audio fallback, one-click presets
- **Footer** — nav + per-platform solution links + dynamic copyright year

### Tech Stack

- [Astro 6](https://astro.build) — static output
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- TypeScript — pages, components, config, route handlers
- `@astrojs/sitemap` — auto sitemap generation
- IBM Plex Sans + Space Mono — preloaded woff2, dark `#080808` theme
- Node >= 22.12.0

### Local Dev

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # output: ./dist/
```

### Website Structure

```text
src/
  components/   # Hero, BrowserLinks, Screenshots, PromoRotator, Features, Footer
  layouts/      # Layout.astro — root layout, meta, fonts, dark theme
  pages/        # All routes + RSS/sitemap generators
  styles/       # global.css — Tailwind import + @font-face
  config.ts     # Centralized: site meta, version, browser store links, screenshot list
public/
  images/       # Marketing assets + product screenshots
  fonts/        # Local woff2 files
```

---

## Release Notes

### v1.2.2 (2026-05-28)
- Safari: Netflix works (MSE path)
- Safari: Twitch delay works and can be changed mid-stream (canvas pipeline)
- Safari: Prime Video dropped — FairPlay HLS has no viable delay path
- macOS: `LSApplicationCategoryType` added to fix App Store validation
- macOS: `npm run prep:safari:macos` opens Xcode with version + build bumped
- macOS: `npm run release:safari:macos` — one-command archive + validate via xcrun
- Donations: surfaced more prominently after real usage

### v1.02 (2026-04-17)
- Edge support: dual injection for manifest world fallback
- Twitch blob-codec canvas pipeline on Edge
- Prime Video hard-jump for instant mode
- YouTube no-DVR live fix via canvas
- Improved countdown estimation

### v1.01 (2026-04-06)
- TypeScript rewrite for type safety
- Capability-based pipeline selection
- Prime Video compatibility
- Firefox Kick compatibility fix
- Twitch HUD z-index fix

### v1.0 (2024-01-01)
- Initial release: MSE delay syncing, Bluetooth audio offset controls

---

## Docs

- [Browser Differences](docs/browser-differences.md) — MSE vs canvas, injection timing per browser
- [Detection & Site Types](docs/detection-techniques-and-site-types.md) — platform detection, stream-type behaviors
- [Timing & Modes](docs/sync-timing-and-speed-modes.md) — countdown accuracy, mode selection
- [macOS Safari Setup](docs/run-and-convert-macos.md) — building and converting for Safari via Xcode

---

## License

LagSync is proprietary. See LICENSE file for terms.  
**Questions?** [kodu.simon@gmail.com](mailto:kodu.simon@gmail.com)
