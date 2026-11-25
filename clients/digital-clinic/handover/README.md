# digitalclinic.ai website: handover

This folder holds the agreed design and copy for the digitalclinic.ai website. Please treat it as the design reference and build the production site from it.

## What's in the folder

- `index.html` is the complete one-page site. It is a single file with all styles and the one small script inline. Open it in a browser to see the design. It works at desktop and phone widths, and in light and dark mode.
- `logos/logo-on-dark.svg` and `logos/logo-on-light.svg` are the original logo files. Use these. The logo inside `index.html` is a hand-drawn approximation for the mock-up only, and should be replaced with the correct file (dark version in the header and contact section, which sit on dark backgrounds).

## Brand

- Fonts: Instrument Serif for headings, Instrument Sans for everything else. Both are free on Google Fonts and already linked in the page.
- Colours:
  - Ink #14181C (dark backgrounds, main text)
  - Paper #F6F3EE (light backgrounds)
  - Rust #C8552F (accent)
  - Rust deep #A8421F (buttons, small accent text on light backgrounds)
  - Green #1F6F63 (second accent)
  - Greys #6E665B, #8A8175 and #A39A8C (secondary text)
  - Line #E2DACD (rules and borders)
- Tagline: "Diagnostics for any business".
- All colours are defined once as CSS variables at the top of the stylesheet.

## Page structure

1. Header and hero, including the horseshoe diagram of the four-step method (an inline SVG)
2. Why good start-ups stall
3. "If it doesn't pay, it doesn't stay" headline band
4. How the clinic works (Examine, Diagnose, Prescribe, Monitor)
5. Five-stage pathway
6. Departments
7. Working with us
8. iSlot
9. About
10. Contact

## What still needs doing

- **Contact email.** hello@digitalclinic.ai is a placeholder until it is set up.
- **Contact form.** The page currently shows the email address with a copy button. A form, or a booking link for paid consultations, would replace it.
- **Domain and hosting.** The site needs hosting and the digitalclinic.ai domain pointing at it. The page is static, so any static host will do.
- **Privacy and cookies.** A privacy notice is needed, and a cookie banner if analytics are added.
- **Analytics and search.** Page analytics, the page title and description for search, and social sharing images.
- **Favicon.** Can be made from the logo mark.
- **Content not final.**
  - The Departments section lists specialist partners that are not yet signed. Copy may change before launch.
  - The About section content needs a final check.

## Not wanted

- No stock photos of doctors or clinics. The site is a business clinic, not a medical service, and imagery should not suggest otherwise.
