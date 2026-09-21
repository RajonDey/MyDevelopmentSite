# AGENTS.md — RDXHIVE

One Next.js app. Three products: **marketing site**, **Lead Desk**, **RDXHIVE OS**. Do not mix them.

## Start here

1. **[plot.md](./plot.md)** — which context and docs to open for this job
2. **[context/progress-tracker.md](./context/progress-tracker.md)** — current status
3. **[specs/README.md](./specs/README.md)** — new features need an **Approved** spec first

Product map (human): [docs/PRODUCTS.md](./docs/PRODUCTS.md).  
Identity: [brand/README.md](./brand/README.md) — not a fourth product.

## Hard rules

1. Match the job in `plot.md`. Do not load every doc.
2. New feature → `specs/` Draft → founder **approved** → then code.
3. Copy from [docs/RDX_Content_Copy_Bank.md](./docs/RDX_Content_Copy_Bank.md) only. No invented metrics.
4. Living paths: `src/components/rdx/`, `src/content/rdx/`, OS under `src/app/(os)/` and `src/components/os/`. Identity: `brand/`.
5. No new npm packages, no mass route deletes, no secrets in markdown.

## Locked facts

| Item | Value |
|------|--------|
| Brand | RDXHIVE · Many minds. One direction. |
| Domain | rdxhive.com |
| Emails | hello@ · sales@ · team@ |
| ICP | US marketing agencies, 5–20 employees |
| Pricing | $1K–$5K+ · homepage “from $1,000” · tiers on `/services` |
| Design | Hallmark modern-minimal / Quiet |

## Skills

| Skill | When |
|-------|------|
| `.agents/skills/rdx-revamp/SKILL.md` | Marketing / desk UI |
| `.agents/skills/hallmark/SKILL.md` | Visual design |

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run prelaunch
```

## New code

- Marketing + desk UI: `src/components/rdx/`
- Copy: `src/content/rdx/`
- OS: `src/app/(os)/os/`, `src/components/os/`
- Identity: `brand/` (`BRAND.md` + `brand.json`)
- Feature plans: `specs/`
