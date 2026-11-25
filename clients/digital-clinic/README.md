# Digital Clinic (digitalclinic.ai): website

Client: Amit Chavda, The Digital Clinic. Static one-page site plus a privacy page.

| Folder | What it is | Source in Google Drive |
|---|---|---|
| `website/` | Current production build (25 Nov 2026): self-hosted fonts, SEO and social tags, JSON-LD, FAQ, contact form, privacy notice, favicons, sitemap, llms.txt | HQ / "The Digital Clinic website (Amit) - site files.zip" |
| `handover/` | Agreed design and copy reference (24 Nov 2026) and the original logo files | Digital Clinic / Project / Resources / Website / digitalclinic-website-handover.zip |

## Preview locally

```bash
cd clients/digital-clinic/website && python3 -m http.server 8765
```

Then open http://localhost:8765.

## Open items before launch (from the handover README)

- `hello@digitalclinic.ai` is a placeholder. It appears in `index.html` (form, link, JSON-LD), `llms.txt` and `privacy.html`.
- The contact form has no backend. It opens the visitor's email app (mailto).
- Domain and hosting are not set up yet.
- Departments: specialist partners are not signed yet. Keep them as areas of expertise, with no firm names.
- The About section needs Amit's final check.
- The privacy notice is a draft. Amit must confirm the controller details.
- No stock photos of doctors or clinics.
