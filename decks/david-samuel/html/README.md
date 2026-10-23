# Extol × David Samuel: web deck

A single-file HTML deck built on the editorial-magazine template ("Style A") from
[guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill), re-themed in Extol's brand greens.

- **Present:** open `index.html` in Chrome. Use ← → to move between slides, `ESC` for the slide overview, `P` for presenter view (speaker notes, timer, audience window) and `B` to turn off the animated background.
- **Logo:** save the Extol logo as `images/logo.png` and it appears on the cover and the closing slide.
- **Offline backup:** `Extol-x-David-Samuel-web-deck.pdf`, one page per slide.
- **Edit:** change the slide text in `build.py`, then run `python3 build.py <path-to-guizang-ppt-skill>/assets/template.html`.

Animations load `assets/motion.min.js`, or a CDN copy when the deck is opened straight from disk. If neither loads, the slides still show in full, just without animation.
