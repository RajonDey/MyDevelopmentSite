# 01 — Brand HQ program

**Status:** Approved  
**Product:** shared  
**Approved by:** founder (Proceed, 20 Sep 2026 — spec 01 defaults)  
**Date:** 20 Sep 2026

## Problem

RDXHIVE already has a live mark, a tagline, locked marketing copy, and raster files under `public/brand/` — but no single source of truth. Agents, new SaaS repos, decks, and social posts cannot pull the same logo, colors, fonts, messaging, and rules. A ChatGPT plan mixed a pretty `/brand` page, a second folder tree, mock fonts/colors, and templates into one build. That will fork the brand and restyle the shipped site by accident.

## Goal

Founder approves this **program** (sequence + rules). No Brand HQ code ships from this file.

After approval, work proceeds **one numbered spec at a time**, in order. Later specs stay Draft until the one before them is **Done** (or the founder skips a parked spec in writing).

## Out of scope

- Building `/brand`, `brand/`, logos, templates, or token changes
- Rewriting the public homepage, ICP, or Copy Bank
- Restyling Lead Desk or OS
- New npm packages
- Treating Brand HQ as a fourth customer product

## Context to read

- `plot.md` (Brand HQ row, after this spec is approved)
- `context/progress-tracker.md`
- `context/project-overview.md`
- `context/ui-context.md`
- `docs/PRODUCTS.md`
- `docs/RDX_Content_Copy_Bank.md` (Brand + Proof sections)
- `docs/RDX_Strategic_Decisions_and_Phase_Plan.md` (locked ICP / pricing)
- `src/content/rdx/brand.ts`
- `src/styles/rdx/tokens.css`

## Files to touch

None in this spec. Approval unlocks `02`.

## Files to avoid

- `src/app/` pages (except later `src/app/brand/` in spec 05)
- `src/components/os/`
- `src/components/rdx/admin/`
- `docs/RDX_Content_Copy_Bank.md` until spec 06
- `src/styles/rdx/tokens.css` until spec 03 says migrate
- `next.config.ts` redirects

## What already exists (do not reinvent)

| Thing | Where | Note |
|-------|--------|------|
| Wordmark + tagline | Copy Bank · `siteMetadata` | **RDXHIVE** · Many minds. One direction. |
| Market offer | Copy Bank · Strategic Decisions | US agencies · websites & CRM · from $1,000 |
| Live tokens | `src/styles/rdx/tokens.css` | Paper / ink / teal · Instrument Serif · Source Sans 3 |
| Logo component | `src/components/rdx/brand/RdxLogo.tsx` | Used by marketing, desk, OS sign-in |
| Raster lockups | `public/brand/*.png` | Cropped from identity sheet — **no SVG source** |
| Asset map | `src/content/rdx/brand.ts` | Paths to those rasters + `/og.png` |
| Section library | `/design-system` | Dev-only component preview — **not** Brand HQ |
| Hive motif | `--rdx-hex-ink` + hive visuals | Hex field only — never on the H mark |
| Product names | Copy / case studies / OS spec | YearInReview · IELTSReady |

## Three layers (this is the system)

ChatGPT proposed two overlapping trees. We keep **one job per layer**.

```text
1. Source of truth     brand/                 humans + agents
2. Served files        public/brand/          logos, OG, patterns
3. Editorial HQ        /brand                 page that *reads* 1 + 2
```

| Layer | Lives | Contains | Does not contain |
|-------|--------|----------|------------------|
| Source of truth | `brand/` | `README.md` · `BRAND.md` · `brand.json` · `assets.md` | Rendered pages, secrets |
| Served files | `public/brand/` | SVG / PNG / ICO only | Markdown, JSON prose |
| Editorial HQ | `src/app/brand/` | Page + rdx sections that display the source | A second copy of the rules |

`src/content/rdx/brand.ts` stays the **typed app pointer** into `public/brand/` (and later `brand.json`). Do not duplicate hex/fonts in three places.

Templates (social, YouTube, proposal) are **layer 2 or `brand/templates/`**, and only after identity is locked (spec 08).

## Folder truth (target — built across 02–08)

```text
brand/
├── README.md          how agents and humans use this
├── BRAND.md           human brand book
├── brand.json         machine tokens, names, rules
└── assets.md          inventory: file → when to use it

public/brand/
├── logo/
│   ├── primary/
│   ├── horizontal/
│   ├── stacked/
│   ├── symbol/
│   └── monochrome/
├── icons/             favicon + app icon
├── social/
├── og/
├── patterns/
├── templates/         added in spec 08
└── products/
    ├── year-in-review/
    └── ielts-ready/

src/app/brand/page.tsx
src/content/rdx/brand.ts
src/styles/rdx/tokens.css      marketing consumption, not a second brand book
```

Keep today’s flat `public/brand/rdxhive-*.png` paths working until spec 04 adds aliases or updates every consumer.

## Product classification

Brand HQ is **shared infrastructure**, not a fourth product.

```text
Prospect  →  Marketing site
Founder   →  Lead Desk
Team      →  OS
Everyone  →  brand/ + /brand   (same identity)
```

`docs/PRODUCTS.md` gets a **Shared brand** note in spec 02. Marketing, desk, and OS keep their folders and tables.

## Positioning layers (do not collapse)

| Layer | Job | Locked today | Brand HQ may… |
|-------|-----|--------------|---------------|
| **Company** | Who RDXHIVE is | Name + tagline | Hold a company line (software company; client work + own products) |
| **Market** | What we sell now | ICP, services, prices, homepage | **Not** rewrite unless founder opens a Copy Bank spec |
| **Product** | Child brands | Names exist | Rules in spec 07 — no new product sites |

Recommended company line (draft, not public until 03/06):

> RDXHIVE is a global software company. We build client products and platforms, and we operate our own.

Keep **Many minds. One direction.** as the brand line on every layer.

## Visual direction (reference sheet)

The identity sheet is **direction**, not a pixel spec and not a copy source (its labels are garbled).

**Take**

- Editorial board, lots of paper, strong type, restrained color
- Distinctive H mark; horizontal / stacked / symbol / mono
- Geometric hex field as graphic, not as the logo
- Child products get a small accent, parent stays RDXHIVE
- Dark bar with lockup + tagline as a closing device

**Do not take blindly**

| Mock | Why it is unsafe |
|------|------------------|
| Playfair Display + Inter | Live site is Instrument Serif + Source Sans 3 (Hallmark Quiet). Switching restyles every public page. |
| Hive Green `#10B901` | Very close to banned Fiverr green `#1dbf73`. Live accent is a restrained teal. |
| “Software Engineering & Product Studio” as hero | Market site is already locked to agency websites & CRM. |

Type/color path is a **founder choice in spec 03**. Default recommendation: **keep live type + teal**; use the sheet for mark, layout, and whitespace.

## Sequence

| Spec | Unit | Ships |
|------|------|-------|
| **01** | This program | Decisions only |
| **02** | System of record | `brand/` files + plot / architecture / PRODUCTS note |
| **03** | Identity lock | Fill `BRAND.md` + `brand.json` (type, color, logo rules, company line) |
| **04** | Canonical assets | SVG mark/lockups, favicon, avatar; tidy `public/brand/` |
| **05** | `/brand` page | Editorial HQ that reads the source |
| **06** | Voice | Tone, words we use/avoid; Copy Bank only if founder OK |
| **07** | Product brands | YearInReview · IELTSReady · future-product rules |
| **08** | Templates | OG, social, YouTube, proposal — **parked** until 04–06 are Done |

Approve **01**, then **02**. Do not approve 04–08 until 03 is Done.

## Rules for every later spec

1. One concern per spec. No “while we’re here.”
2. Source of truth is `brand/`. The page displays it; it does not invent it.
3. No invented metrics. No mock-sheet copy pasted onto the public site.
4. Do not change marketing tokens unless spec 03 chooses a migrate path.
5. Do not merge `/brand` with `/design-system`.
6. No new npm packages.
7. Keep existing `public/brand/*.png` consumers working (`RdxLogo`, invoices, OG, schema).
8. Secrets never go in `brand/` or markdown.

## Open questions

Answer these when you reply **approved** on this spec (or in a short note). Defaults in *italics* if you skip an item.

- [x] **`/brand` access:** public noindex (default)
- [x] **Type/color path:** A keep live (default)
- [x] **Confirm shared infrastructure** (not a fourth product). Yes
- [x] **Confirm market copy stays locked.** Yes
- [ ] **Company line:** wait for spec 03 (draft recorded, not locked)
- [x] **Asset downloads on `/brand`:** yes for logos (default)

## Verify

- Founder can point at this file and know the order.
- No code changed.
- Specs 02–08 exist as Draft and point back here.
