# 04 — Canonical identity assets

**Status:** Done  
**Product:** shared  
**Approved by:** founder (Proceed, 20 Sep 2026)  
**Date:** 20 Sep 2026  
**Blocked by:** `03-brand-identity-lock.md` Done

## Problem

Current marks are raster crops. There is no SVG source, no tidy folder, no dedicated favicon/app-icon/social avatar set. Invoices, `RdxLogo`, and schema already depend on today’s PNG paths.

## Goal

Canonical files exist for:

1. H symbol (SVG + PNG, light/dark)
2. Horizontal lockup
3. Stacked lockup
4. Monochrome (black / white)
5. Favicon (ICO + SVG)
6. App / social avatar
7. One default OG still (may reuse `/og.png` if it already matches)

`public/brand/` matches the program tree. Old flat paths keep working. `brand/assets.md` + `brand.json` + `src/content/rdx/brand.ts` list the new files.

## Out of scope

- `/brand` page
- Social/YouTube/proposal templates (spec 08)
- Pattern library beyond one hex field graphic if needed for OG
- Merch mockups
- Replacing `RdxLogo` with a new component API unless a path breaks
- New font files / npm

## Context to read

- `specs/01-brand-hq-program.md` (folder truth)
- `brand/BRAND.md` · `brand/brand.json` · `brand/assets.md`
- `src/content/rdx/brand.ts`
- `src/components/rdx/brand/RdxLogo.tsx`
- `src/lib/invoice-pdf/InvoicePdfDocument.tsx`
- `src/lib/seo/schema.ts`
- `src/app/favicon.ico`

## Files to touch

- `public/brand/**` — new structured files; keep or alias existing PNGs
- `brand/assets.md`
- `brand/brand.json` (`assets` map)
- `src/content/rdx/brand.ts`
- `src/app/favicon.ico` and/or `src/app/icon.tsx` / `apple-icon` if we add app icons the Next way
- `context/progress-tracker.md`

## Files to avoid

- Marketing section redesigns
- `src/components/os/` except if `RdxLogo` src changes (it should not need OS edits)
- Copy Bank
- Template artboards

## Steps

1. Produce **vector** H mark from the identity sheet (re-draw, do not autotrace garbage). Export SVG + PNG @1x/@2x.
2. Build horizontal + stacked lockups (mark + RDXHIVE word). Wordmark letterforms must match the lock (spec 03 type), not a random geometric sans from the mock.
3. Mono: black on light, white on dark. No grey-on-grey as a primary file.
4. Favicon from the symbol (safe at 16px). App icon 512 with padding. Social avatar 400+ square.
5. Place files under `public/brand/logo|icons|social|og/` per spec 01. Leave `public/brand/rdxhive-*.png` in place **or** add `next.config` rewrites only if a move is required — prefer keep + add.
6. Update `brand.ts`, `brand.json`, `assets.md`. Each consumer (`RdxLogo`, invoice PDF, schema logo) must still resolve.
7. Verify in browser: header logo, footer, `/signin`, `/os/signin`, favicon tab. `npm run build` && `npm run lint`.

## Open questions

- [x] Who draws the SVG — agent in-repo (redraw, not autotrace)
- [x] Wordmark: Instrument Serif roman, outlined in the lockup SVGs
- [x] Replace `/og.png` now or wait for spec 08? **Wait** — copied to `/brand/og/og.png` only

## Verify

- At least one SVG exists for the symbol.
- Old PNG URLs still 200.
- Logo readable at favicon size and in the header.
- Invoice PDF still finds a mark file.
