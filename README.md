# RDXHIVE

Marketing site and internal tools for **RDXHIVE** (rdxhive.com).

**Many minds. One direction.**

One Next.js app, **three products**. Do not mix folders or data models.

| Product | Entry | Job |
|---------|-------|-----|
| Marketing site | `/`, `/services`, `/work`, `/start` | Credibility + conversion |
| Lead Desk | `/signin` → `/dashboard` | Client leads, invoices, projects |
| RDXHIVE OS | `/os` | Team goals, capacity, rituals |

- People: [docs/PRODUCTS.md](docs/PRODUCTS.md) · [docs/README.md](docs/README.md)
- Agents: [plot.md](plot.md) · [context/](context/) · [specs/](specs/)

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
npm run prelaunch
```

Env names: [docs/RDX_Ops_Reference.md](docs/RDX_Ops_Reference.md). Values stay in `.env` / the host.

## Living code

- `src/components/rdx/` · `src/content/rdx/` — marketing + Lead Desk
- `src/app/(os)/os/` · `src/components/os/` — OS
- `supabase/migrations/` — SQL
- Old public URLs redirect in `next.config.ts` — keep those redirects
