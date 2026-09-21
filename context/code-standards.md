# Code Standards

## General

- One product per change. State which product before editing.
- Small modules. Fix the cause. No `Enhanced*`, `*V2`, `*New` names.
- No AI bloat, no commented-out legacy, no `console.log` in shipped paths.

## TypeScript

- Strict. No `@ts-ignore` / `any` without a comment.
- Export types for content models (`src/types/rdx/`, `src/types/os/`).
- Validate unknown input at API boundaries.

## Next.js

- Server Components by default. `"use client"` only for forms, estimators, OS interactivity.
- Pages ~150 lines — extract sections. Sections prefer ~80 lines.
- One job per route handler.

## Styling

- Marketing: `src/styles/rdx/tokens.css` — no hardcoded hex, no Fiverr green (`#1dbf73`).
- OS: `src/styles/os/theme.css` on top of rdx tokens.
- `cn()` from `src/lib/utils.ts`. No one-off `@apply`.
- Hallmark Quiet for public pages — `.agents/skills/hallmark/` · genre `modern-minimal` · theme `Quiet`.

## API routes

- Parse and validate before logic.
- Enforce the right auth flag (`deskAccess` / `osAccess`) before mutations.
- Living lead intake: `POST /api/leads/submit` only.

## Data and storage

- New marketing copy → `src/content/rdx/` (or Copy Bank first).
- New desk schema → founder OK + `supabase/migrations/`.
- New OS schema → founder OK + `01x_os_*.sql`. Never share desk tables.
- Do not resurrect `src/data/` or `src/_legacy/`.

## File organization

- `src/components/rdx/` — marketing + Lead Desk admin
- `src/content/rdx/` — typed marketing / desk labels
- `src/components/os/` · `src/lib/os/` · `src/app/(os)/` — OS
- `src/app/api/leads|invoices|projects/` — desk APIs
- `src/app/api/os/` — OS APIs
- `specs/` — feature specs (required before new work)
- `context/` — how the system works
- `docs/` — human / locked product reference

## Copy

- Public words from `docs/RDX_Content_Copy_Bank.md` only.
- Never invent client counts, %, star ratings, or logo walls.

## Dependencies

| Without ask | Founder OK required |
|-------------|---------------------|
| lucide-react icons | Any new npm package |
| Existing framer-motion (sparingly) | shadcn/radix full install, Stripe, new CMS |

## Session check

```
npm run build && npm run lint
```

Commit prefix when asked: `rdx:` / `desk:` / `os:` / `docs:`.
