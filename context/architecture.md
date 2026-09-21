# Architecture

## Stack

| Layer | Technology | Role |
|-------|------------|------|
| Framework | Next.js 15 App Router · React 19 · TypeScript | One deploy, three products |
| UI | Tailwind 3 + rdx/os tokens | No shadcn install |
| Auth | NextAuth (JWT) | Desk password + OS magic-link providers |
| Database | Supabase Postgres | Desk `rdx_*` · OS `os_*` |
| Email | Resend | Leads + OS magic links |
| Blog | Headless WordPress | `/blog` + `/api/posts` only |
| Analytics | GTM + Umami | Public site |

## System boundaries

- `src/components/rdx/` + `src/content/rdx/` — marketing UI and copy
- `src/components/rdx/admin/` + `src/app/api/leads|invoices|projects/` — Lead Desk
- `src/app/(os)/` + `src/components/os/` + `src/lib/os/` — OS only
- `brand/` — shared identity source of truth (`BRAND.md`, `brand.json`). Not a fourth product. `/brand` page is spec 05.
- `src/app/layout.tsx` — marketing chrome (header/footer). OS overlays with `fixed inset-0 z-50` — do not “fix” by merging shells without a spec
- `next.config.ts` `redirects()` — old public URLs (`/hire`, `/portfolio`, `/learn`, …). **Keep.**
- `src/app/services/[id]/page.tsx` — old numeric Fiverr IDs. **Keep.**

## Storage model

- **Supabase `rdx_*`:** leads, invoices, client projects (Lead Desk)
- **Supabase `os_*`:** north star, pillars, objectives, team projects, capacity (`010_os_core.sql` — apply in host, then wire via spec)
- **WordPress:** blog posts only
- **`src/content/rdx/`:** marketing and desk labels (typed TS, not a CMS)
- **`src/content/os/mock-data.ts`:** OS seed until the data-layer spec ships
- **`brand/`:** identity book + `brand.json` (humans and agents). No secrets.
- **`public/brand/`:** served logo/OG rasters. App pointer: `src/content/rdx/brand.ts`. Do not move paths until spec 04.

**“Project” is two tables.** Client project = `rdx_projects`. Team project = `os_projects`. One-way link only (`client_linked` → Desk). No bidirectional status sync.

## Auth and access

- **Lead Desk:** credentials provider · `RDX_ADMIN_PASSWORD` · `RDX_ADMIN_EMAILS` · `deskAccess`
- **OS:** `os-magic` provider · allowlisted team emails · `osAccess`
- Same NextAuth cookie, different flags. Desk session must not open OS; OS session must not open the desk.
- `/signin` = desk. `/os/signin` = OS. Do not unify the pages.

## Invariants

1. Do not put OS UI under `components/rdx/` or desk UI under `components/os/`.
2. Do not reuse `rdx_*` tables for OS or `os_*` for the desk.
3. Request handlers do not invent metrics or testimonials.
4. No new npm package without founder OK.
5. Do not remove `next.config.ts` redirects or `/services/[id]`.
6. Secrets stay in env — never in `docs/`, `context/`, `specs/`, or `brand/`.
7. New product behavior requires an approved file in `specs/` first.
8. Do not treat Brand HQ as a fourth product. Identity lives in `brand/`; marketing / desk / OS consume it.
