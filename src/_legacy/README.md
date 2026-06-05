# Legacy archive

Code and assets removed from active routes but kept for reference.

## Redirects (still live in `next.config.ts`)

| Legacy path | Target |
|-------------|--------|
| `/hire`, `/hire/*` | `/start` |
| `/contact`, `/audit` | `/start` |
| `/estimate`, `/order` | `/start?step=scope` |
| `/portfolio`, `/portfolio/*` | `/work` |
| `/projects` | `/work` |
| `/resources` | `/blog` |
| `/learn`, `/learn/*` | `/blog` |
| `/services/[numeric-id]` | RDX service pages (see `src/app/services/[id]/page.tsx`) |

## Archived folders

| Path | Notes |
|------|--------|
| `hire-sections/sections/` | Old Fiverr hire page UI (from `src/app/hire/sections/`) |
| `PayoneerPayment.tsx` | Legacy order payment UI (unused) |
| `ToolsContent.tsx` | Old `/resources` page content |

## Still in repo (not archived)

- `src/data/mock-data.ts` — used only if legacy code is restored; safe to archive when confirmed unused
- `src/app/learn/` — redirects via config; thin pages may remain
- Auth (`signin`, `signup`) + `/dashboard` — Phase 7 admin (deferred)
