# 02 — Brand system of record

**Status:** Done  
**Product:** shared  
**Approved by:** founder (Proceed, 20 Sep 2026)  
**Date:** 20 Sep 2026  
**Blocked by:** `01-brand-hq-program.md` Approved

## Problem

Identity facts live in Copy Bank, `siteMetadata`, CSS tokens, and flat PNGs. There is no `brand/` folder an agent or a new Cursor project can open first.

## Goal

A `brand/` source of truth exists and is filled with **current locked facts only**. Undecided fields are explicit `TBD` (not invented). Plot, architecture, and PRODUCTS tell agents this is shared infrastructure. No `/brand` page. No new artwork. No token restyle.

## Out of scope

- SVG / new logos / favicon work (spec 04)
- `/brand` UI (spec 05)
- Voice lists and Copy Bank edits (spec 06)
- Product-brand rules beyond names that already exist (spec 07)
- Changing `--rdx-color-*` or fonts

## Context to read

- `specs/01-brand-hq-program.md`
- `docs/RDX_Content_Copy_Bank.md` (Brand table)
- `docs/PRODUCTS.md`
- `context/architecture.md`
- `context/project-overview.md`
- `plot.md`
- `src/content/rdx/brand.ts`
- `src/content/rdx/metadata.ts`
- `src/styles/rdx/tokens.css`

## Files to touch

- `brand/README.md` — how to use the system
- `brand/BRAND.md` — human book; current facts + TBD sections
- `brand/brand.json` — machine schema; current facts + TBD
- `brand/assets.md` — inventory of existing `public/brand/*` and `/og.png`
- `plot.md` — Brand HQ row
- `context/architecture.md` — `brand/` as shared storage
- `context/project-overview.md` — shared brand note (not a fourth product)
- `docs/PRODUCTS.md` — Shared brand section
- `context/progress-tracker.md` — mark this spec Done when shipped
- `AGENTS.md` — point at `brand/` for identity (keep “three products”)

## Files to avoid

- `src/app/brand/`
- `src/styles/rdx/tokens.css`
- `src/styles/os/theme.css`
- `public/brand/` (no moves yet — spec 04)
- `docs/RDX_Content_Copy_Bank.md`
- OS / desk schemas

## Steps

1. Create `brand/` with the four files. `README.md` states the three layers and “read this before making a logo, deck, or new SaaS.”
2. Write `brand.json` schema (version, name, tagline, emails, domain, positioning.company TBD, positioning.market from Copy Bank, colors from current tokens, typography from current tokens, assets pointing at today’s PNG paths, products: YearInReview + IELTSReady names only).
3. Write `BRAND.md` as the human mirror. Mark logo rules, voice, and company line **TBD — spec 03/06**.
4. Write `assets.md`: one row per existing file (path, use, missing SVG).
5. Add plot row: Brand HQ jobs open `brand/` + spec 01; do not mix OS/desk.
6. Add PRODUCTS **Shared brand** note: source `brand/`, page `/brand` (later), not a fourth product.
7. Architecture: `brand/` + `public/brand/` in storage model.
8. Verify: `npm run build` && `npm run lint` (docs-only; should be unchanged). JSON parses. No public route added.

## Open questions

- [ ] None beyond spec 01. If 01 access/type answers exist, copy them into `BRAND.md` as “Pending identity lock (03)” — do not apply tokens here.

## Verify

- `brand/brand.json` is valid JSON and contains only locked or `TBD` values.
- An agent following `plot.md` for “logo / brand / /brand” opens `brand/` and does not open OS folders.
- Existing pages still use `src/content/rdx/brand.ts` unchanged.
