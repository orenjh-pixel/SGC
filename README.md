# Star Group Construction (SGC) — Website

A fast, premium, **no-build** static website for Star Group Construction — luxury
remodeling, roofing, and exteriors. Dark **Charcoal & Gold** theme (matches the brand
logo), mobile-first, with a real project gallery, accessible lightbox, and clean
scroll animations.

## Pages
- `index.html` — Home (hero, stats, services, featured projects, process, promo, CTA)
- `services.html` — Remodeling (lead) + Roofing & Exteriors + process
- `gallery.html` — Filterable project gallery (Kitchens / Bathrooms / Interiors) + lightbox
- `about.html` — Story, values, stats
- `contact.html` — Contact info + free-estimate form

## How to view it
Open `index.html` in any browser — no server or build step needed.
(For the gallery's `<dialog>` lightbox, any modern browser works.)

## Tech notes
- **One stylesheet** (`css/style.css`). Re-skin the whole site by editing the color
  tokens under `:root` at the top. Fonts: Cormorant Garamond (display) + Inter (body),
  loaded from Google Fonts.
- **One script** (`js/main.js`): drawer nav, sticky header, scroll-reveal
  (IntersectionObserver, respects `prefers-reduced-motion`), light hero parallax,
  the quote form's email handoff, and the gallery + lightbox.
- **Gallery is data-driven** — manage photos in ONE place: `js/gallery-data.js`.
  Each entry is `{ f: filename, t: tag, c: caption, feat: featured }`.

## Adding / changing photos
1. Drop the image in `images/`.
2. Add a line to `js/gallery-data.js` with its filename, a tag
   (`kitchens` | `bathrooms` | `interiors`), and a caption.
3. To add **Roofing** or **Exteriors** to the gallery: tag photos `roofing` /
   `exteriors` in `gallery-data.js`, then add matching `<button class="filter-btn"
   data-cat="roofing">` buttons in `gallery.html`. (Labels already exist in
   `SGC_TAG_LABEL`.) Note: all current photos are interior remodels — there are no
   roofing/exterior photos yet.

## Logo
- `images/logo-mark.svg` — gold emblem used in the header/footer (recreation of the brand mark).
- `images/logo.svg` — full horizontal lockup (emblem + wordmark) for social/letterhead.
- `images/favicon.svg` — browser tab icon.
- `images/sgc logo.jpg` — your original gold-on-marble render (reference).

## Before launch — fill in real details
Search & replace these placeholders across all `.html` files:

| Placeholder | What to put |
|---|---|
| `(000) 000-0000` and `tel:+10000000000` | Your phone number |
| `INFO@EXAMPLE.COM` | Your real inbox — **also** the form's `data-to` in `contact.html` |
| `[Street Address, City, ST]` | Your address |
| `[YOUR SERVICE AREA]` | The towns/region you serve |
| Stats (`15+`, `500+`, `5★`) | Your real numbers |
| Testimonial `[Client Name]` / `[Project / City]` | A real review (home page) |
| About `[Add a line or two…]` | A sentence about your founder / years / roots |
| Promo `$500 off…` | Your real current offer |

## The contact form
No backend — on submit it opens the visitor's email app with the details prefilled
(destination = the form's `data-to`). To collect submissions server-side later, point
the `<form>` at a free service like **Formspree** or **Netlify Forms** (a few minutes
to set up).

## Publishing (free)
- **GitHub Pages** — push this repo, enable Pages on `main`.
- **Netlify / Vercel** — drag-and-drop the folder or connect the repo.
