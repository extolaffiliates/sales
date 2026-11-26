# EffectivePoint website

Static site (HTML/CSS/JS, no build step) for EffectivePoint Consulting: Finance Transformation advisory for SMEs and mid-market organisations.

- Source: Google Drive `Website/EffectivePoint_Homepage_Prototype_v2` (imported 2026-11-25).
- Preview: open `index.html` in a browser, or run `python3 -m http.server` in this folder.

| File | Purpose |
|---|---|
| `index.html` | Homepage |
| `finance-transformation.html`, `assessment.html`, `insights.html`, `about.html`, `contact.html` | Inner pages, built on the homepage design system. Wording sources and open questions: `COPY-REVIEW.md` |
| `privacy.html`, `cookies.html`, `terms.html` | Legal pages: branded layout, legal text still to be written |
| `styles.css`, `main.js` | Shared styles and behaviour (header, overlay menu, scroll reveal, forms, insights filter). Forms post to their `data-endpoint` once one is set |
| `assets/` | Logo, hero video (`hero.mp4`) and poster |
| `assets/fonts/` | HK Grotesk (400/500/600/700, woff2) — the only typeface on the site. SIL Open Font License included. |

## Hero video

`assets/hero.mp4` is an 11-second seamless loop of real moving footage (1280×720, 24 fps, H.264, no audio, ~1.7 MB). Three scenes of about 4 seconds each, with 0.6-second cross-fades:

1. **City towers** (0–4 s): camera slowly turns while clouds move between the towers.
2. **Formula-style race car** (3.4–7.4 s): car drives through frame with motion-blurred background.
3. **Team at the window** (6.8–10.8 s): the original prototype hero clip (seconds 1–5).

Scenes 1 and 2 are AI-generated video (Kling 3.0, image-to-video, via PromptWise), each started from an Unsplash photo:
- Towers: photo by Jan Weber, https://unsplash.com/photos/yVbPfo7jtMA
- Race car: photo by Isaac Maffeis, https://unsplash.com/photos/DjV_RWqLOv0

The last frame fades back into the first, so the loop has no visible jump. `assets/hero-poster.jpg` is the first frame. The race car was chosen because it shows no readable team or sponsor branding.
