# EffectivePoint website

Static site (HTML/CSS/JS, no build step) for EffectivePoint Consulting: Finance Transformation advisory for SMEs and mid-market organisations.

- Source: Google Drive `Website/EffectivePoint_Homepage_Prototype_v2` (imported 2026-11-25).
- Preview: open `index.html` in a browser, or run `python3 -m http.server` in this folder.

| File | Purpose |
|---|---|
| `index.html` | Homepage |
| `finance-transformation.html`, `assessment.html`, `insights.html`, `about.html`, `contact.html` | Inner pages (placeholders in v2) |
| `privacy.html`, `cookies.html`, `terms.html` | Legal pages (wording to be confirmed) |
| `styles.css`, `main.js` | Shared styles and behaviour (header, overlay menu, scroll reveal) |
| `assets/` | Logo, hero video (`hero.mp4`) and poster |
| `assets/fonts/` | HK Grotesk (400/500/600/700, woff2) — the only typeface on the site. SIL Open Font License included. |

## Hero video

`assets/hero.mp4` is a 19.5-second seamless loop (1280×720, 24 fps, H.264, no audio, ~2.1 MB). Three scenes cross-fade over 1 second each:

1. **Towers from below** (0–7 s, slow push-in). Photo by Jan Weber on Unsplash: https://unsplash.com/photos/yVbPfo7jtMA
2. **Formula-style race car** (6–13 s, drift in direction of travel). Photo by Isaac Maffeis on Unsplash: https://unsplash.com/photos/DjV_RWqLOv0
3. **Team at the window** (12–19 s). The original prototype hero clip (seconds 1–8).

The last frame fades back into the first, so the loop has no visible jump. `assets/hero-poster.jpg` is the first frame. Unsplash licence: free for commercial use, no attribution required. The race-car shot was chosen because it shows no readable team or sponsor branding.
