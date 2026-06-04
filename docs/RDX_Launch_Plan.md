# RDX Launch Plan — Active track

**Site URL (v1):** `https://development.rajondey.com`  
**Email:** `contact@rajondey.com`  
**Calendly:** [calendly.com/rajondey](https://calendly.com/rajondey)  
**Admin/backend:** deferred to a later phase (Supabase + `/dashboard`)

---

## Phase A — Production & trust ✅

- [x] Keep subdomain + email + Calendly (no rebrand blockers)
- [x] Document prod env in `.env.example`
- [ ] Founder: test `/start` submit on production after deploy

## Phase B — Positioning copy ✅

- [x] Company-first metadata, FAQ, services, reviews (agencies = primary wedge, not only ICP)

## Phase C — Work & assets ✅

- [x] Compress `public/work/**/*.png` (max width 1600)
- [x] Hexa IELTS platform link on case study
- [x] Härlig ↔ reviews anchor on `/work`

## Phase D — Legacy cleanup ✅

- [x] Thin redirect pages: `/hire`, `/portfolio`, `/projects`, `/order`, `/services/[id]`, `/resources`
- [x] Remove Fiverr hire sections (archived under `src/_legacy/`)
- [x] Redirect `/projects` → `/work` in `next.config`
- [x] Move root prior PNGs into `public/work/prior-experience/`

## Phase E — Docs hygiene ✅

- [x] Update readiness + Phase 15 + Phase 7 “still missing” sections

## Phase F — Launch sign-off (founder)

**Runbook:** [RDX_PhaseF_Deploy.md](./RDX_PhaseF_Deploy.md)

- [x] `npm run prelaunch` in repo (lint + typecheck + build)
- [ ] Deploy to `development.rajondey.com`
- [ ] Prod `/start` submit → emails + thank-you (+ Calendly if qualified)
- [ ] Lighthouse mobile on prod homepage
- [ ] `git tag rdx-v1-launch` when ready

## Later — Admin / backend (separate plan)

**Plan:** [RDX_Phase7_Admin_Plan.md](./RDX_Phase7_Admin_Plan.md)  
**Setup:** [RDX_Phase6_Setup.md](./RDX_Phase6_Setup.md)

---

*Updated: June 2026 — Phases A–E implemented in repo; F is manual.*
