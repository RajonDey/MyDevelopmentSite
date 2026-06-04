# RDX Revamp — Scope Boundaries

**Purpose:** Prevent scope creep. If a task is not listed under the **active phase**, do not do it.

---

## Global rules (all phases)

### Always in scope
- Files explicitly listed in [RDX_File_Ownership_Map.md](./RDX_File_Ownership_Map.md) for the active phase
- Bug fixes that block `npm run build` or `npm run lint` **only for files you already touched this phase**
- Copy from [RDX_Content_Copy_Bank.md](./RDX_Content_Copy_Bank.md)

### Never in scope (unless founder explicitly requests)
- Deleting legacy routes, API routes, or auth without Phase 6 plan
- Refactoring unrelated files “while we’re here”
- Adding new npm dependencies without justification in PR/session notes
- SEO campaigns, ad spend, LinkedIn automation tools
- New CMS, migrating off WordPress
- Domain migration off `development.rajondey.com`
- Inventing client metrics, logos, or testimonials
- Full dark-theme rewrite unrelated to Hallmark Quiet spec
- Rewriting entire blog archive
- Building client portal + invoicing before Phase 6
- Payoneer / checkout flow in new estimator

### Ask first (gray zone)
- New env variables
- Supabase schema changes
- Changing WordPress API URL or blog rendering logic
- Removing `/hire`, `/order`, `/learn` files (redirect is OK; delete is Phase 5+)
- Framer Motion on more than hero + one section

---

## Phase 0 — Foundation

### In scope
- `docs/*` maintenance
- `next.config.ts`: remove `/work` → `/portfolio` redirect; **do not** add new marketing redirects yet
- `src/styles/rdx/tokens.css` (new)
- `src/content/rdx/` scaffold (metadata, services stub, home stub)
- `src/types/rdx/` minimal shared types
- `src/lib/analytics.ts`
- `next.config.ts`: remove `/work` → `/portfolio` redirect only
- `src/app/layout.tsx` — wire metadata from `content/rdx/metadata.ts`
- `src/app/SchemaOrg.tsx` — RDX organization (not Rajon Dey)
- `AGENTS.md`, `.cursor/rules/*`, skill files

### Out of scope
- Homepage redesign
- Header/footer visual redesign
- New pages (`/audit`, `/estimate`, etc.)
- Deleting legacy components
- Auth changes

---

## Phase 1 — Design shell

### In scope
- `src/components/rdx/layout/Header.tsx`, `Footer.tsx` (new)
- `src/components/rdx/ui/*` — only Button, Card, Badge if needed (extend existing if simpler)
- Wire rdx Header/Footer via layout split OR conditional in root layout (see Migration Strategy)
- `src/components/rdx/layout/Container.tsx`, `Section.tsx` (new)
- Update `src/styles/globals.css` to import rdx tokens (keep legacy vars until Phase 2)

### Out of scope
- Page content rewrites (`page.tsx` sections)
- `/audit`, `/contact` forms
- Services data rewrite
- Blog changes
- Removing Fiverr proof from homepage (Phase 2)

---

## Phase 2 — Launch MVP

### In scope
- `src/app/page.tsx` — homepage revamp; **“From $1,000” + link to `/services` only** (no full tier table)
- `src/app/audit/page.tsx` + thank-you state
- `src/app/contact/page.tsx` — qualified intake fields
- `src/app/thank-you/page.tsx` — updated copy
- Redirect: `/hire` → `/contact`
- Hide auth UI in header (rdx Header)
- `src/content/rdx/home.ts`, `services-teaser.ts` (teaser only — no `/services` page yet)
- Homepage CTAs: primary `/audit`, secondary `/contact` — **not `/services` until Phase 3**

### Out of scope
- Full `/services` pages
- `/estimate` calculator
- `/work` case studies
- `/process`, `/about`
- Removing legacy `/order` page file (redirect in Phase 3)
- Client database
- Blog content changes

---

## Phase 3 — Services & estimator

### In scope
- `src/app/services/page.tsx` (rdx version or replace)
- `src/app/services/agency-website/page.tsx` — full tier prices visible
- `src/app/services/lead-automation/page.tsx` — full tier prices visible
- `src/app/estimate/page.tsx` — refactor from `/order` **UI patterns only**
- `src/content/rdx/services.ts`, `src/lib/scope-estimator.ts`
- Redirect: `/order` → `/estimate`
- `src/data/pricing.ts` — **do not delete**; leave for reference or mark deprecated

### Out of scope
- AI Chat & Search service page (Phase 5)
- Payoneer checkout on estimate
- Hiding prices on service detail pages (tiers must show exact $)
- Case study pages
- Auth/dashboard

---

## Phase 4 — Proof & trust

### In scope
- `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`
- `src/content/rdx/case-studies/*`
- `src/app/process/page.tsx`, `src/app/about/page.tsx`
- Redirect: `/portfolio` → `/work`
- Remove Fiverr testimonial sections from any page still showing them

### Out of scope
- `/retainer`
- AI Integration service
- Client portal
- Deleting `src/app/portfolio/` (archive OK in Phase 5)

---

## Phase 5 — Content expansion

### In scope
- Blog CTA copy (`BeehiivSubscribe`, blog page headers)
- 1–2 new WordPress posts (content outside repo OK)
- `/retainer/page.tsx`
- `/services/ai-integration/page.tsx`
- Redirect `/learn` → `/blog`
- FAQ footer-only positioning
- Archive/delete legacy pages **only after redirects live 7+ days**

### Out of scope
- Phase 6 client ops
- Domain migration

---

## Phase 6 — Client ops

### In scope
- Lead storage (Supabase tables)
- Minimal admin/dashboard for leads
- Optional client magic-link portal
- Invoice links (manual Stripe/Payoneer OK)

### Out of scope
- Full CRM replacement
- Subscription billing platform

---

## Scope creep examples — say NO

| Request | Response |
|---------|----------|
| “Also redesign the blog while you’re on homepage” | Phase 5 |
| “Add a chatbot widget” | Not in plan — ask founder |
| “Rewrite all TypeScript types” | Out of scope |
| “Switch to shadcn” | Out of scope — use existing + rdx/ui |
| “Delete order page now” | Phase 3+ after redirect |
| “Make it dark mode like Vercel” | Out of spec — Hallmark Quiet |

---

*If unsure: check active phase here → check File Ownership Map → ask founder.*
