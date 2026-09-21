# RDXHIVE — Brand book

**Status:** Identity locked (spec 03). Path **A**.  
**Machine file:** [brand.json](./brand.json)  
**Asset inventory:** [assets.md](./assets.md)

Public headlines and CTAs still come from [docs/RDX_Content_Copy_Bank.md](../docs/RDX_Content_Copy_Bank.md). This book does not replace it.

---

## Locked

| Item | Value |
|------|--------|
| Name | RDXHIVE (never “RDX Hive”) |
| Legal | RDXHIVE (trading name), operated by Rajon Dey (formerly Rajon Dey X Technologies) |
| Tagline | Many minds. One direction. |
| Company line | RDXHIVE is a global software company. We build client products and platforms, and we operate our own. |
| Domain | rdxhive.com |
| Emails | hello@ · sales@ · team@rdxhive.com |
| Location | Global remote team |
| Market offer | Websites & CRM automation for marketing agencies |
| Market line | RDXHIVE builds agency websites and connects them to your CRM — fixed projects from $1,000. |
| ICP | US marketing agencies, 5–20 employees |
| Price floor | From $1,000 (full tiers on `/services` only) |
| Design | Hallmark modern-minimal / Quiet |
| Path | **A** — live type and teal. Identity sheet = mark + layout only |

The company line lives here and on `/brand` only. Do not put it on About, the footer, or the homepage until the founder opens Copy Bank.

---

## Color

Source: `src/styles/rdx/tokens.css`. Apps should use the CSS variables; hex is for decks, Figma, and other repos.

| Role | CSS | oklch | Hex |
|------|-----|-------|-----|
| Paper | `--rdx-color-paper` | `oklch(100% 0 0)` | `#FFFFFF` |
| Ink | `--rdx-color-ink` | `oklch(22% 0.01 260)` | `#181B1F` |
| Muted | `--rdx-color-muted` | `oklch(48% 0.01 260)` | `#5A5E63` |
| Subtle | `--rdx-color-subtle` | `oklch(62% 0.01 260)` | `#83868C` |
| Border | `--rdx-color-border` | `oklch(91% 0 0)` | `#E1E1E1` |
| Surface | `--rdx-color-surface` | `oklch(98% 0 0)` | `#F8F8F8` |
| Accent | `--rdx-color-accent` | `oklch(42% 0.07 200)` | `#04585C` |
| Accent hover | `--rdx-color-accent-hover` | `oklch(36% 0.07 200)` | `#00484C` |
| Hive ink | `--rdx-hex-ink` | `oklch(18.98% 0.0458 261.9)` | `#081328` |

Accent is restrained teal. Never `#10B901` or Fiverr `#1dbf73`.  
Hive ink is for the hex field only — never on the H mark.

---

## Typography

| Role | Face |
|------|------|
| Display | Instrument Serif |
| Body | Source Sans 3 |

- UI wordmark: Instrument Serif **roman**, tracking tight — same as `RdxLogo`.
- Italic: editorial headlines only. **Never** in the logo or nav wordmark.
- Do not switch to Playfair Display or Inter.

---

## Logo

The mark is a two-stem **H** with a curved crossbar. That curve is part of the mark — do not straighten it or swap it for a hex.

**Source vector:** `public/brand/logo/rdxhive-logo.svg` (fill `#0D1421`). UI that should inherit type color uses `rdxhive-logo-currentcolor.svg`. Do not redraw the H from a PNG.

**Primary digital lockup:** H symbol + typeset `RDXHIVE` in Instrument Serif roman. This is what the site, desk, and OS already do.

| Variant | When |
|---------|------|
| Symbol | Favicon, avatar, tight UI, next to a typeset wordmark |
| Horizontal | Wide headers, documents, slides |
| Stacked | Covers, OG, square crops |
| Mono (ink on paper / white on dark) | The only color treatments |

**Clear space:** 25% of the mark height on all sides.  
**Minimum sizes:** symbol 24px in UI (16px favicon only); horizontal 144px wide; stacked 80px wide.

**Do**

- Ink on paper, or white on dark
- Keep the tagline as its own line — not inside the nav lockup
- Use stacked when the crop is square
- Use the hex field as a background graphic only (`public/brand/patterns/`)

**Do not**

- Fill or overlay the H with the hex pattern
- Recolor the mark to accent, teal, or green
- Stretch, rotate, outline, or add shadows
- Spell “RDX Hive”
- Set the wordmark in Playfair, Inter, or italic
- Use `/rdxhive-branding.png` as a logo

Existing `public/brand/*.png` rasters stay until spec 04. New SVG lockups must follow this book (Instrument Serif, not the sheet’s geometric wordmark).

---

## Program

| Decision | Value |
|----------|--------|
| `/brand` access | public, noindex |
| Type / color path | **A** |
| Classification | Shared infrastructure, not a fourth product |
| Market copy | Locked |
| Asset downloads on `/brand` | Yes, logos |

---

## Voice

**Tone:** Precise, calm, and senior. Short sentences. No hype, no fake proof, no marketplace energy.

**Company pillars**

1. Many minds. One direction.
2. We build client products and platforms, and we operate our own.
3. Fixed scope. Named prices. No open-ended retainers as the default offer.
4. Proof is named work with honest attribution — never invented counts.
5. A global remote team. One name: RDXHIVE.

These pillars do not replace the locked agency service line on the public site.

**Words we use:** RDXHIVE · Many minds. One direction. · global remote team · fixed scope · from $1,000 *(market surfaces only)*

**Words we avoid** — same as Copy Bank **Proof — DO NOT USE**, plus “RDX Hive”:

- RDX Hive
- 4.9 stars / 4.9 (150 reviews)
- 50+ clients worldwide
- 24–48 hour delivery
- Order Services
- Fiverr or Upwork in a hero or primary section
- Rajon Dey as a primary H1
- Invented metrics, star ratings, or logo walls

Mission, vision, and values are still unwritten. Do not invent them.

---

## Product brands

Parent is always **RDXHIVE**. Children do not replace the H mark or the parent teal.

| Product | Status | Accent | Credit |
|---------|--------|--------|--------|
| YearInReview | live | ink until a product spec names a hex | Product by RDXHIVE |
| IELTSReady | beta | ink until a product spec names a hex | Product by RDXHIVE |

**Rules**

- One optional child accent, named in that product’s spec. Until then, ink only.
- Never `#10B901`, Fiverr `#1dbf73`, or parent teal as the child identity.
- Footer / legal on product sites: **Product by RDXHIVE**. Trading name stays RDXHIVE.
- Add a future product as one object in `brand.json.products` — no new design system.

**Future-product checklist**

1. Lock the name (closed compound, like YearInReview)
2. Do not replace or recolor the parent H mark
3. One optional accent hex — not the banned greens or parent teal
4. Footer credit: Product by RDXHIVE
5. Add one `brand.json.products` object
6. It gets a `/brand` Products row

No child logo kits until the founder supplies or asks for them.

---

## How to use this book

1. New SaaS, deck, or social — copy colors, type, `voice`, and `productBrand` from `brand.json`.
2. New public website copy — Copy Bank first.
3. New logo file — use SVG under `public/brand/logo/`. Keep flat `rdxhive-*.png` paths working.
4. `/brand` page — live, noindex. Reads this book.
