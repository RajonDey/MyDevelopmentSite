# 03 — Brand identity lock

**Status:** Done  
**Product:** shared  
**Approved by:** founder (Proceed, 20 Sep 2026 — path A defaults)  
**Date:** 20 Sep 2026  
**Blocked by:** `02-brand-system-of-record.md` Done

## Problem

The identity sheet and the live site disagree on type and accent. Without a written lock, later asset and `/brand` work will pick a side silently.

## Goal

Founder-locked decisions written into `brand/BRAND.md` and `brand/brand.json`:

- Color roles (paper, ink, muted, surface, accent, hex-ink)
- Type pairing (display + body)
- Logo rules (clear space, min size, do/don’t)
- Company line (not a homepage rewrite)
- Which path from spec 01 (A / B / C)

Marketing CSS tokens change **only** if the founder chose a migrate path. Default path A = docs only.

## Out of scope

- Drawing SVGs (spec 04)
- `/brand` page (spec 05)
- Voice word lists (spec 06)
- Public homepage / Copy Bank / pricing
- OS theme
- New fonts via npm

## Context to read

- `specs/01-brand-hq-program.md` (visual direction + type/color paths)
- `brand/BRAND.md` · `brand/brand.json` (after 02)
- `context/ui-context.md`
- `src/styles/rdx/tokens.css`
- `docs/RDX_Content_Copy_Bank.md` (Brand table only)
- `.agents/skills/hallmark/SKILL.md` (if path C)

## Files to touch

- `brand/BRAND.md`
- `brand/brand.json`
- `context/ui-context.md` — only if tokens/type actually change
- `src/styles/rdx/tokens.css` — **only if founder chose B or C**
- `context/progress-tracker.md`

## Files to avoid

- `src/app/` marketing pages
- `docs/RDX_Content_Copy_Bank.md` (company line stays in `brand/` until spec 06)
- `src/components/os/`
- `public/brand/`

## Steps

1. Confirm path from spec 01:
   - **A (default):** keep Instrument Serif, Source Sans 3, paper/ink/teal. Sheet = mark + layout only.
   - **B:** keep type; optionally adopt mock neutrals (midnight / slate / mist / snow). Accent stays teal unless founder names a hex that is **not** Fiverr-adjacent.
   - **C:** Playfair + Inter + hive green — **requires a follow-up marketing restyle spec**. Do not restyle pages inside this spec.
2. Write logo rules: H mark never gets a hex fill; lockup vs symbol vs stacked; mono on dark/light; min size; clear space; do not stretch, recolor, or add outlines.
3. Write company line into `brand/` only. Do not change `siteMetadata` or homepage.
4. Replace TBD color/type fields in `brand.json` with locked values (include both hex and current oklch for live tokens).
5. If path A: stop. If B/C: update tokens.css + ui-context **for tokens only**; do not redesign sections.
6. Verify: brand.json has no TBD for color, type, tagline, company line, logo rules. `npm run build` && `npm run lint`.

## Open questions

- [x] Path A (default)
- [x] Company line: draft locked (brand/ only, not homepage)
- [x] Accent: keep teal `#04585C`
- [x] Display italic in lockups: **no** — roman only; italic for editorial headlines

## Verify

- A new SaaS could copy `brand.json` colors/fonts without opening the marketing app.
- Public site copy and (on path A) look are unchanged.
