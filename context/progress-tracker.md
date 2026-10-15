# Progress Tracker

Update after every meaningful implementation change.

## Current phase

- Marketing revamp: **shipped** (Phases 0–15)
- Launch Phase F: **open** (deploy + prod smoke + tag)
- Lead Desk: **shipped** (prod Supabase optional)
- RDXHIVE OS: **Phase 1** (UI + magic link; data still mock)
- Leftover cleanup: **done** (Waves A–F, 20 Sep 2026)
- Spec-driven setup: **done** (20 Sep 2026)

## Current goal

- Use this context + `plot.md` + `specs/` for all new work.
- Brand HQ: original H locked. Spec **08** Done (hex field, visual style, OG + social, business card concept).
- Other product work (OS data layer or launch F) still needs its own approved spec. Do not start those until founder names them.

## Completed

- Marketing site + `/start` funnel
- Lead Desk (leads, invoices, client projects)
- OS Phase 1 UI, mock seed, magic-link auth
- Leftover stub pages, empty `lib/api.ts`, 410 order/Tally APIs, Tally embed script
- Spec-driven workflow files (`context/`, `plot.md`, `specs/`)
- Brand HQ system of record (`brand/README.md`, `BRAND.md`, `brand.json`, `assets.md`)
- Brand identity lock (path A: Instrument Serif / Source Sans 3 / teal `#04585C`; company line in `brand/` only)
- Brand canonical assets from the original vector (`rdxhive-logo.svg`). Legacy PNGs kept.
- Brand HQ page at `/brand` (reads `brand.json`, noindex, no footer link)
- Brand voice locked (tone, pillars, use/avoid). Company line still HQ-only. Copy Bank unchanged.
- Product brands locked: YearInReview · IELTSReady · ink accent until a product spec · Product by RDXHIVE

## In progress

- Launch Phase F (deploy + prod smoke) and OS data layer still waiting on their own specs.

## Next up

- Other tracks still waiting: launch F vs OS `010_os_core.sql` + `/api/os/*` — do not mix into Brand HQ.
- Host env still needed for launch: `NEXT_PUBLIC_SITE_URL`, `BUSINESS_EMAIL=sales@rdxhive.com` (Resend `FROM_EMAIL` stays on verified rajondey.com until paid domain)

## Open questions

- When to apply `010_os_core.sql` in prod Supabase
- When to enable prod Lead Desk Supabase
- Whether to give OS its own root chrome (today: overlay on marketing layout)

## Architecture decisions

- Three products, one Next.js deploy — do not split repos yet
- Desk `rdx_*` vs OS `os_*` — no merged schema
- One NextAuth config, two providers / access flags
- Old public URLs live in `next.config.ts` redirects only
- New features are spec-approved before code
- Brand HQ is shared infrastructure (`brand/`), not a fourth product

## Session notes

- 20 Sep 2026: leftover A–F applied. Tally script and 410 APIs gone. Living intake is `/api/leads/submit`.
- 20 Sep 2026: moved agent process out of `docs/` into `context/` + `plot.md` + `specs/`.
- 20 Sep 2026: Brand HQ program drafted (`specs/01`–`08`). ChatGPT’s dual folder trees and mock Playfair / hive-green path rejected as the default. No `brand/` or `/brand` page until 01+02 approved.
- 20 Sep 2026: Founder Proceed → spec 01 Approved (defaults). Spec 02 Done: `brand/` created. No `/brand` route. `src/content/rdx/brand.ts` unchanged.
- 20 Sep 2026: Spec 03 Done. Path A locked. Company line in `brand/` only. Tokens and public copy unchanged.
- 20 Sep 2026: Spec 04 Done. Vector H mark + Instrument Serif lockups + favicon/app icon/avatar. `/og.png` unchanged. Flat `rdxhive-*.png` kept.
- 20 Sep 2026: Spec 05 Done. `/brand` editorial page. noindex. Values from `brand.json`. Footer not linked.
- 20 Sep 2026: Spec 06 Done. Voice + company pillars in `brand.json`. Copy Bank and public pages unchanged.
- 20 Sep 2026: Spec 07 Done. Product-brand rules locked. No child kits. Parent tokens unchanged.
- 21 Sep 2026: `/brand` Identity + Assets now lead with the original SVGs, show lockups/mono/chrome with previews, and drop the duplicate mark download.
- 21 Sep 2026: Spec 08 unit 1 Done. Hex field + visual style in `public/brand/patterns/`. OG copy locked to tagline only. Units 2–3 parked.
- 21 Sep 2026: `/brand` Identity lockups now draw the same `RdxMark` as the header — not separate scaled SVGs.
- 21 Sep 2026: Assets lockup thumbs use `RdxMark`. Download SVGs flattened so the original H renders in the file.
- 21 Sep 2026: Spec 08 unit 2 Done. OG 1200×630 + square social 1080×1080 (paper and on-dark). Tagline only. Live `/og.png` replaced with the paper OG. Unit 3 parked.
- 22 Sep 2026: Founder set OG/social headlines to the mock lines (dark: *Building digital products for what’s next.* · paper: *Software Engineering & Product Studio*) with the tagline small at the bottom. Copy Bank unchanged.
- 22 Sep 2026: Spec 08 unit 3 Done. Business card concept (original H front, locked contact facts on back). All templates listed on `/brand` Assets.
- 22 Sep 2026: Card type scaled up, stack tightened, corners rounded to match the mock.
- 22 Sep 2026: Brand HQ in-page nav centered in the page container; close band sits inside `RdxContainer` (not full-bleed).
- 15 Oct 2026: Spec 09 Done. English-only Privacy/Terms rewritten and new `/refund-policy` added, all from `src/content/rdx/legal.ts`. Short URLs `/privacy` `/terms` `/refund` redirect to them. Footer now shows the support email, a contact link, the address, and the legal name. Still to do: fill LLC name + US address in `legal.ts` after the Wyoming filing.
- 15 Oct 2026: Spec 10 Done. Cookie banner (Consent Mode v2, default denied before GTM, choice stored 12 months, "Cookie settings" in the footer, hidden on `/os`). `/start` now shows a Terms + Privacy notice under the submit button. No new packages.
