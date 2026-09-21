# 05 — Brand HQ editorial page

**Status:** Done  
**Product:** shared  
**Approved by:** founder (Proceed, 20 Sep 2026)  
**Date:** 20 Sep 2026  
**Blocked by:** `04-brand-canonical-assets.md` Done

## Problem

The source of truth is files. Humans still need one editorial surface that feels like RDXHIVE — not a dashboard and not `/design-system`.

## Goal

`/brand` is a premium editorial page that **displays** `brand.json` + `BRAND.md` facts + `public/brand` assets.

Sections (v1, single page, in-page nav — not a nested app):

1. Identity — mark, lockups, mono, rules
2. Color
3. Typography
4. Brand — positioning, mission/vision/values if locked, story
5. Voice — summary (full lists may still be TBD until 06)
6. Assets — download links to canonical files
7. Products — YearInReview / IELTSReady relationship (names + rules if 07 not done: names only)
8. Rules — pointer to `BRAND.md` / `brand.json`

Access follows spec 01 (default: **public, noindex**).

## Out of scope

- Nested `/brand/identity/logo` routes
- Template generators or Canva-like editors
- Auth work unless spec 01 chose desk/OS auth
- Restyling `/`, `/os`, `/dashboard`
- Merging with `/design-system`
- New npm (no extra font loaders, no PDF libs)
- Indexing `/brand` in sitemap unless founder chose public indexed

## Context to read

- `specs/01-brand-hq-program.md`
- `brand/*`
- `context/ui-context.md`
- `context/code-standards.md`
- `.agents/skills/rdx-revamp/SKILL.md`
- `.agents/skills/hallmark/SKILL.md` (Quiet / modern-minimal)
- `src/components/rdx/ui/*` · `src/components/rdx/layout/*`

## Files to touch

- `src/app/brand/page.tsx` (and small `src/components/rdx/brand-hq/` sections if the page exceeds ~150 lines)
- `src/content/rdx/brand-hq.ts` — page chrome labels only; **values come from `brand.json`**
- `src/app/sitemap.ts` / robots — only if access = indexed
- `context/progress-tracker.md`

## Files to avoid

- `src/components/os/`
- `src/components/rdx/admin/`
- `src/app/design-system/page.tsx`
- Copy Bank (do not paste new public marketing headlines)
- Token file (read-only)

## Steps

1. State product: **shared** · spec 05 · touch `src/app/brand/` + `src/components/rdx/brand-hq/` · avoid OS/desk.
2. Load `brand/brand.json` on the server (import or `fs` read — pick one, document it). Do not hardcode hex/fonts on the page.
3. Build one long editorial page: paper, hairlines, display headlines, asset specimens. Hallmark Quiet. Distinctive hex field as a graphic, not a hero collage.
4. In-page nav for the eight sections. No sidebar app chrome (that would look like OS).
5. Asset downloads = static links to `public/brand/...`.
6. `robots: { index: false }` unless spec 01 said indexed.
7. Verify in browser (desktop + mobile): every section, downloads 200, no marketing CTA swap, no OS overlay. `npm run build` && `npm run lint`.

## Open questions

- [x] Mission/vision/values: **hide** until written
- [x] Chrome: root layout header/footer (no second shell)
- [x] Footer link to `/brand`: **no**

## Verify

- Changing a color name in `brand.json` shows on `/brand` after refresh (no second palette in the page file).
- `/design-system` still dev-only and separate.
- Production build does not 404 `/brand`.
