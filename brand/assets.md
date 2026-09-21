# Brand assets — inventory

Canonical files live under `public/brand/logo|icons|social|og/`.  
Flat `public/brand/rdxhive-*.png` crops stay so invoices and schema keep working.

App pointer: `src/content/rdx/brand.ts`.

## Original vector (locked)

| File | Use |
|------|-----|
| `/brand/logo/rdxhive-logo.svg` | **Original H** — fill `#0D1421`, no C2PA metadata |
| `/brand/logo/rdxhive-logo-currentcolor.svg` | Same paths, `currentColor` |

Every other mark file is derived from those two. Do not reconstruct the H from a raster.

## Canonical (spec 04)

| File | Use |
|------|-----|
| `/brand/logo/symbol/rdxhive-mark.svg` | Source mark copy (same paths as `rdxhive-logo.svg`) |
| `/brand/logo/symbol/rdxhive-mark-on-dark.svg` | White mark |
| `/brand/logo/symbol/rdxhive-mark.png` | Raster export of the original (invoices still use the legacy flat PNG) |
| `/brand/logo/primary/rdxhive-lockup-primary.svg` | Mark + Instrument Serif wordmark |
| `/brand/logo/horizontal/rdxhive-lockup-horizontal.svg` | Wide lockup |
| `/brand/logo/stacked/rdxhive-lockup-stacked.svg` | Square / cover lockup |
| `/brand/logo/monochrome/rdxhive-mark-black.svg` | Pure black mark |
| `/brand/logo/monochrome/rdxhive-mark-white.svg` | Pure white mark |
| `/brand/icons/favicon.svg` | Tab icon (also `src/app/icon.svg`) |
| `/brand/icons/favicon.ico` | 32 ICO |
| `/brand/icons/app-icon-512.png` | App icon, ink tile, padding |
| `/brand/social/avatar.png` | 400×400 social avatar |
| `/og.png` | Default Open Graph — paper OG, original H + *Software Engineering & Product Studio* |
| `/brand/og/rdxhive-og.png` | OG 1200×630 paper |
| `/brand/og/rdxhive-og-on-dark.png` | OG 1200×630 on hive-ink |
| `/brand/social/rdxhive-social.png` | Square social 1080×1080 paper |
| `/brand/social/rdxhive-social-on-dark.png` | Square social 1080×1080 on hive-ink |
| `/brand/templates/rdxhive-card-front.png` | Business card front (concept) |
| `/brand/templates/rdxhive-card-back.png` | Business card back (concept) |
| `/brand/patterns/rdxhive-hex-pattern.svg` | Hex field graphic — never on the H |
| `/brand/patterns/rdxhive-visual-style.svg` | Abstract paper/ink panel |

Wordmark in lockups is **Instrument Serif roman**, outlined (no live font dependency).

## Legacy rasters (keep)

| File | Consumers |
|------|-----------|
| `/brand/rdxhive-mark.png` | Invoice PDF, `global-error` |
| `/brand/rdxhive-mark-on-dark.png` | Legacy invert crop |
| `/brand/rdxhive-lockup-*.png` | Old sheet crops |
| `/brand/rdxhive-icon.png` | Schema.org logo |
| `/brand/rdxhive-icon-light.png` | Legacy light icon |

## Chrome

| File | Use |
|------|-----|
| `src/app/favicon.ico` | From the original mark |
| `src/app/icon.svg` | Next.js app icon |
| `/icon.png` | 32×32 |
| `/icon-192.png` · `/icon-512.png` | PWA |
| `/apple-touch-icon.png` | 180×180 |
| `/rdxhive-branding.png` | Identity sheet crop — **not** a logo |

## When to use which

| Need | Use |
|------|-----|
| Header / nav / sign-in | `RdxLogo` → inline original H (`RdxMark`) + typeset wordmark |
| Download / Figma / new SaaS | `rdxhive-logo.svg` or SVG in `logo/` |
| Inherit text color | `rdxhive-logo-currentcolor.svg` |
| Invoice PDF | `public/brand/rdxhive-mark.png` (legacy, still valid) |
| Schema.org logo | `/brand/rdxhive-icon.png` |
| Favicon | `/brand/icons/favicon.svg` |
| Social avatar | `/brand/social/avatar.png` |
| Hex field / backgrounds | `/brand/patterns/rdxhive-hex-pattern.svg` |
| Visual style panel | `/brand/patterns/rdxhive-visual-style.svg` |
| Social / link preview | `/og.png` (paper OG) |
| Social post | `/brand/social/rdxhive-social-on-dark.png` or paper twin |
| Business card (concept) | `/brand/templates/rdxhive-card-front.png` · back |

## Missing (later)

- YouTube / proposal / signature
- Structured `public/brand/products/` kits (spec 07)
