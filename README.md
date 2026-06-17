# Star Group Construction (SGC) — Website

A fast, premium, **no-build** static website for Star Group Construction — kitchen &
bathroom remodeling and custom pergolas in **Miami & Fort Lauderdale**. Dark
**Charcoal & Gold** theme, mobile-first, with a real project gallery, accessible
lightbox, and clean scroll animations.

## Pages
- `index.html` — Home (hero, featured work, process, CTA)
- `services.html` — Remodeling (Kitchens & Bathrooms) + Pergolas & Outdoor Living + process
- `gallery.html` — Filterable project gallery (Kitchens / Bathrooms / Interiors) + lightbox
- `about.html` — Story, values
- `contact.html` — Contact info + free-estimate form

## Business details (live on the site)
- **Phone:** 954-830-6335
- **Email:** stargroupconstructionco@gmail.com
- **Address:** 4491 S State Rd 7, Davie, FL 33314
- **Service area:** Miami & Fort Lauderdale
- Licensed & Insured · Free Estimates

## How to view it
Open `index.html` in any browser — no server or build step. (Clean URLs like `/gallery`
only resolve once deployed on Vercel via `vercel.json` `cleanUrls`.)

## Tech notes
- **One stylesheet** (`css/style.css`) — re-skin via the color tokens under `:root`.
  Fonts: Playfair Display (display) + Inter (body), from Google Fonts.
- **One script** (`js/main.js`): drawer nav, hide-on-scroll header + mobile call-bar,
  scroll-reveal, hero parallax, the quote form, and the gallery + lightbox.
- **Gallery is data-driven** — manage photos in `js/gallery-data.js`
  (`{ f: filename, t: tag, c: caption, feat: featured }`). Tags in use:
  `kitchens` | `bathrooms` | `interiors`.

## The contact form (Web3Forms)
The form is wired for **Web3Forms** (no backend) — submissions email to the address
above. To activate: create a free key at **web3forms.com** for
`stargroupconstructionco@gmail.com` and paste it into the `access_key` hidden input in
`contact.html`. Until a real key is set, the form gracefully falls back to opening the
visitor's email app, so it never breaks.

## Still to add (real content)
- A **real** client review (the testimonial section was removed — no fabricated reviews).
- Verify the **"500+ / 50+" project counts** in `index.html` / `services.html`, or swap
  in real figures.

## Publishing
- **Vercel** — repo is connected; `vercel.json` enables clean URLs and `theme-color`/
  safe-area handling covers mobile. Push to the connected branch to deploy.
