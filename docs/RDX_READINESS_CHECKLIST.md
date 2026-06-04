# RDX Revamp — Readiness Checklist

**Last reviewed:** June 4, 2026 · **Status:** ✅ Launch track (Phases A–E)

Use before tagging production. Admin/backend (Supabase) is a **separate phase** — see [RDX_Launch_Plan.md](./RDX_Launch_Plan.md).

---

## Production v1 (current)

- [x] Site URL: `https://development.rajondey.com`
- [x] Email: `contact@rajondey.com`
- [x] Calendly: [calendly.com/rajondey](https://calendly.com/rajondey)
- [x] Env template: `.env.example`
- [ ] Founder: prod `/start` submit → emails + thank-you

---

## Product (shipped)

- [x] Phases 0–6 structure + Phases 8–15 (funnel, services, work, SEO, legal)
- [x] `/work` — clients, products, prior experience + real screenshots
- [x] Company-first positioning copy (agencies = primary wedge)
- [x] Legacy routes → thin redirects; hire UI archived under `src/_legacy/`

---

## Founder sign-off (Phase F)

See **[RDX_PhaseF_Deploy.md](./RDX_PhaseF_Deploy.md)**.

- [x] `npm run prelaunch` passes locally (lint + typecheck + build)
- [ ] Deploy + prod `/start` test (emails + thank-you)
- [ ] Lighthouse mobile ≥ 85 on prod homepage
- [ ] `git tag rdx-v1-launch` when ready

---

## Deferred (not blocking v1)

- [ ] Supabase + `/dashboard` — [RDX_Phase6_Setup.md](./RDX_Phase6_Setup.md)
- [ ] Custom production domain (when ready)
- [ ] Blog IA / full sitemap refresh
- [ ] Archive `src/data/mock-data.ts` when confirmed unused

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [RDX_Launch_Plan.md](./RDX_Launch_Plan.md) | **Active** launch phases A–F |
| [RDX_Phase15_Setup.md](./RDX_Phase15_Setup.md) | QA + env |
| [RDX_Services_and_Pricing.md](./RDX_Services_and_Pricing.md) | Pricing source of truth |

**Historical only:** [RDX_Repossitioning_Plan.md](./RDX_Repossitioning_Plan.md)
