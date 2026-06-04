# RDX Revamp — Phase Checklists

**Rule:** Every box must be checked before starting the next phase.

---

## Phase 0 — Foundation

### Docs & governance
- [x] `docs/README.md` exists and links all docs
- [x] `AGENTS.md` exists at repo root
- [x] `.cursor/rules/` has rdx rules
- [x] `.agents/skills/rdx-revamp/SKILL.md` exists

### Code scaffold
- [x] `src/styles/rdx/tokens.css` created (Hallmark Quiet base)
- [x] `tailwind.config` extended with rdx token colors
- [x] `src/content/rdx/services.ts` stub with tier prices
- [x] `src/types/rdx/` minimal types
- [x] `layout.tsx` + `SchemaOrg.tsx` — RDX metadata
- [x] `src/lib/analytics.ts` with event helper stubs
- [x] `src/content/rdx/` folder structure exists

### Config
- [x] Removed `/work` → `/portfolio` redirect from `next.config.ts`
- [x] No premature redirects for `/order`, `/hire`, `/portfolio`

### Verify
- [x] `npm run build` passes
- [x] `npm run lint` passes
- [x] Site visually unchanged (or meta-only change)

**Sign-off:** ✅ Phase 0 complete (2026-06-02) → Phase 1 allowed

---

## Phase 1 — Design shell

### Components
- [x] `RdxHeader` — nav matches architecture doc
- [x] `RdxFooter` — global remote team, legal links
- [x] `Container` + `Section` layout primitives
- [x] rdx Button/Card/Badge OR extended common/ui with tokens

### Layout
- [x] `layout.tsx` uses RdxHeader + RdxFooter
- [x] Auth dropdown hidden from public nav
- [x] Fiverr green not used in rdx components

### Verify
- [x] All existing routes still load
- [x] Mobile nav works at 375px
- [x] `npm run build` + `lint` pass

**Sign-off:** ✅ Phase 1 complete (2026-06-02) → Phase 2 allowed

---

## Phase 2 — Launch MVP ⭐

### Pages
- [x] Homepage: rdx hero, no profile photo, no Fiverr proof
- [x] `/audit` — form + qualification + thank you
- [x] `/contact` — qualified intake
- [x] `/thank-you` — updated expectations

### Content
- [x] Copy matches Content Copy Bank
- [x] No invented metrics on homepage

### Config
- [x] `/hire` → `/contact` redirect live
- [x] GA events fire on audit + contact submit

### Verify
- [x] Founder can send `/audit` link in a DM confidently
- [x] `npm run build` + `lint` pass
- [x] Mobile QA on homepage + audit + contact

**Sign-off:** ✅ Phase 2 complete (2026-06-02) → Phase 3 allowed (full marketing starts after Phase 3)

---

## Phase 3 — Services & estimator

### Pages
- [x] `/services` overview — 2 services live (not AI Integration yet)
- [x] `/services/agency-website`
- [x] `/services/lead-automation`
- [x] `/estimate` — scope band estimator (no checkout)

### Logic
- [x] `scope-estimator.ts` maps to round tier bands ($1K–$5K+)
- [x] Homepage secondary CTA updated to `/services`
- [x] Estimator CTA → `/audit`

### Config
- [x] `/order` → `/estimate` redirect live

### Verify
- [x] Legacy `/order` unreachable without redirect
- [x] `npm run build` + `lint` pass

**Sign-off:** ✅ Phase 3 complete (2026-06-02) → **Start full outbound marketing** → Phase 4 allowed

---

## Phase 4 — Proof & trust

### Pages
- [x] `/work` index
- [x] Minimum **2** case study slugs live
- [x] `/process` — 4 steps
- [x] `/about` — RDX story, brief founder mention

### Content
- [x] Case studies use honest attribution
- [x] No Fiverr testimonials on any primary page

### Config
- [x] `/portfolio` → `/work` redirect live

### Verify
- [x] Case study links work from homepage
- [x] `npm run build` + `lint` pass

**Sign-off:** ✅ Phase 4 complete (2026-06-02) → Phase 5 allowed

---

## Phase 5 — Content expansion

- [x] Blog/newsletter CTA updated
- [x] `/retainer` page (optional ops offer)
- [x] `/services/ai-chat-search` page
- [x] `/learn` → `/blog` redirect
- [ ] Legacy pages archived (not deleted) if stable 7+ days — **deferred**; see `src/_legacy/README.md`

**Sign-off:** ✅ Phase 5 complete (2026-06-02) → Phase 6 when pipeline exists

---

## Phase 6 — Client ops

- [x] Lead submissions stored in DB
- [x] Minimal admin view for leads
- [ ] Optional client portal scoped — **deferred** (manual invoicing OK for v1)

**Sign-off:** ✅ Phase 6 complete (2026-06-02) — see [RDX_Phase6_Setup.md](./RDX_Phase6_Setup.md)

## Session log template

Copy into commit message or session notes:

```
Phase: N
Date: YYYY-MM-DD
Files touched: (list)
Out of scope deferred: (list)
build: pass/fail
lint: pass/fail
Next: Phase N+1 — (first task)
```

---

*Update checkboxes in this file as phases complete.*
