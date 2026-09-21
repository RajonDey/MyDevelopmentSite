# 08 — Brand templates

**Status:** Done  
**Product:** shared  
**Approved by:** founder (best order + tagline on OG, 21 Sep 2026)  
**Date:** 21 Sep 2026  
**Blocked by:** `07-brand-product-brands.md` Done

## Problem

Identity is locked (original H + path A type/color). Decks, social, OG, and print still get improvised. The ChatGPT kit mixed useful template boards with a **rejected** palette (Hive Green `#10B981`) and copy that is not in the Copy Bank.

## Goal

Static files (not an editor), one unit per session, original H only, path A colors only. Each unit is listed on `/brand` Assets.

## Mock → decision

| Mock board | Decision |
|------------|----------|
| Color palette (Midnight / Slate / Hive Green `#10B981`) | **Reject.** Spec 03 is locked: paper / ink / teal `#04585C`. Never `#10B901`, `#1dbf73`, or `#10B981`. |
| Favicon (32) + app icon (512) | **Skip.** Spec 04 already shipped these from the original H. |
| Brand graphic elements (hex pattern + visual style) | **Unit 1** |
| Social post + OG image | **Unit 2** |
| Business card (concept) | **Unit 3** |
| YouTube thumb / end card, proposal cover, email signature | **Later** — not this round unless founder adds them |

## Copy rules (all units)

Site copy still comes from the Copy Bank. These two lines are **template-only** (founder, 22 Sep 2026) — they do not go on `/` or into the Copy Bank.

| Use | Where |
|-----|--------|
| RDXHIVE | Lockup |
| Building digital products for what’s next. | Dark OG / social headline |
| Software Engineering & Product Studio | Paper OG / social headline (`&` italic) |
| MANY MINDS. ONE DIRECTION. | Small footer on those boards |
| Company line | `brand.json` — `/brand` only |

Hex pattern is a graphic. **Never** put it on the H mark.

## Unit 1 — Pattern + visual style

**Status:** Done (21 Sep 2026)

**Done looks like:**

- `public/brand/patterns/rdxhive-hex-pattern.svg` (+ PNG) — hive-ink hex field, Quiet, downloadable
- `public/brand/patterns/rdxhive-visual-style.svg` (+ PNG) — abstract paper/ink panel (the mock’s folded-plane idea, not a photo)
- Listed on `/brand` Assets with previews
- `brand/assets.md` + `brand.json` updated

**Out of this unit:** OG, social, card, replacing `/og.png`, token file, new npm.

## Unit 2 — OG + square social

**Status:** Done (21 Sep 2026)

**Copy:** dark boards — *Building digital products for what’s next.* Paper boards — *Software Engineering & Product Studio.* Tagline small at the bottom (founder, 22 Sep 2026).

**Done looks like:**

- OG `1200×630` — original H + Instrument Serif, path A paper/ink (teal only if a hairline/CTA, not the mark)
- Square social `1080×1080`
- Hex field as background graphic only
- Listed on `/brand` Assets
- Default `src/content/rdx/metadata.ts` `ogImage` **unchanged** unless founder says replace `/og.png`

**Open before drawing:**

- [x] Public OG uses **tagline only** → **superseded 22 Sep 2026:** headlines as on the mock; tagline small at the bottom
- [x] Replace site-wide `/og.png` in this unit? **Yes** — live `/og.png` is the paper OG. Path in `metadata.ts` stays `/og.png`.

## Unit 3 — Business card (concept)

**Status:** Done (22 Sep 2026)

**Done looks like:**

- Front: original H + RDXHIVE + tagline on ink
- Back: name/email/domain/location from locked facts (not mock “Software Product & Engineering”)
- Static PNG (and SVG if it stays sharp). Print PDF only if we can do it **without** a new npm package
- Listed on `/brand` Assets as concept — not a print vendor file unless founder asks

## Out of scope (whole spec)

- Canva / Figma plugin
- Invoice PDF redesign
- Merch photography
- Motion / bumper video
- New npm
- Restyling `/`, OS, or desk
- ChatGPT Hive Green palette
- Rebuilding favicon / app icon

## Context to read

- `brand/BRAND.md` · `brand/brand.json` · `brand/assets.md`
- `public/brand/logo/rdxhive-logo.svg`
- `docs/RDX_Content_Copy_Bank.md` (Brand table)
- `src/content/rdx/metadata.ts`
- `src/components/rdx/brand-hq/BrandHqHexField.tsx` (live hex, not a download)
- `.agents/skills/hallmark/SKILL.md` (Quiet)

## Files to touch (per unit)

- Unit 1: `public/brand/patterns/` · `brand/assets.md` · `brand/brand.json` · `src/content/rdx/brand-hq.ts` · Brand HQ Assets · `context/progress-tracker.md`
- Unit 2: `public/brand/og/` · `public/brand/social/` · same book + Assets · `metadata.ts` only if replacing OG
- Unit 3: `public/brand/templates/` · same book + Assets

## Files to avoid

- `src/styles/rdx/tokens.css`
- Copy Bank
- OS / desk UI
- Service pages
- `next.config.ts` redirects

## Steps (after founder unparks **one** unit)

1. Implement only that unit.
2. Show it on `/brand` Assets.
3. `npm run build` && `npm run lint`.
4. Stop. Do not start the next unit until founder says so.

## Verify

- Templates do not introduce a second palette.
- Original H paths only — no redraw.
- SEO `og:image` still a real file.
- No Hive Green. No hex on the mark.
