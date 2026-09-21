# 07 — Product brand rules

**Status:** Done  
**Product:** shared  
**Approved by:** founder (Proceed, 20 Sep 2026)  
**Date:** 20 Sep 2026  
**Blocked by:** `06-brand-voice.md` Done

## Problem

YearInReview and IELTSReady already exist as products and case studies. There is no rule for how a child brand relates to RDXHIVE (name, mark, color, lockup). The identity sheet invents accents (green / purple) that must not leak into the parent or the banned Fiverr-green zone.

## Goal

`brand/` documents product-brand rules and a `products[]` list. `/brand` Products section shows the relationship. No new product marketing sites.

## Out of scope

- Building or restyling YearInReview / IELTSReady apps
- New product launches
- Child logos unless founder supplies or asks
- Changing OS seed / case-study pages except a link to `/brand` if useful

## Context to read

- `specs/01-brand-hq-program.md`
- `brand/brand.json`
- `src/content/rdx/case-studies/products.ts`
- `docs/RDX_OS_Spec.md` (only the YearInReview mention)
- `docs/RDX_Content_Copy_Bank.md` (no invented proof)

## Files to touch

- `brand/BRAND.md`
- `brand/brand.json` (`products`)
- `public/brand/products/year-in-review/` · `ielts-ready/` — only if assets exist
- `src/app/brand/` Products section
- `context/progress-tracker.md`

## Files to avoid

- Parent token restyle
- New npm
- Fake downloadable child brand kits

## Steps

1. Lock naming: **YearInReview** · **IELTSReady** · parent always **RDXHIVE**.
2. Rules: child may have one accent; parent mark stays ink; “Product by RDXHIVE” on footers; do not lock child color to `#10B901`.
3. Future-product checklist (name, accent, lockup, does it get a `/brand` row).
4. Bind `/brand` Products to `brand.json.products`.
5. Verify: parent palette unchanged. `npm run build` && `npm run lint`.

## Open questions

- [x] Child accents: **ink-only** until each product has its own spec
- [x] Legal: **Product by RDXHIVE** · trading name stays RDXHIVE

## Verify

- A new product can be added as one `brand.json` object without a new design system.
