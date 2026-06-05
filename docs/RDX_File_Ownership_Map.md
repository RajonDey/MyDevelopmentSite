# RDX Revamp — File Ownership Map

**Legend:** 🟢 edit · 🟡 touch carefully · 🔴 do not touch (phase) · ⭐ create new

---

## Phase 0

| File / path | Status | Notes |
|-------------|--------|-------|
| `docs/*` | 🟢 | All planning docs |
| `next.config.ts` | 🟡 | Remove `/work`→`/portfolio` redirect only |
| `src/styles/rdx/tokens.css` | ⭐ | Hallmark Quiet tokens |
| `tailwind.config.ts` | 🟡 | Extend colors from tokens |
| `src/lib/analytics.ts` | ⭐ | GA4 event helpers |
| `src/content/rdx/metadata.ts` | ⭐ | Site title, description |
| `AGENTS.md`, `.cursor/rules/*` | 🟢 | Agent setup |
| `.agents/skills/rdx-revamp/*` | 🟢 | Project skill |
| Everything else | 🔴 | |

---

## Phase 1

| File / path | Status | Notes |
|-------------|--------|-------|
| `src/components/rdx/layout/Header.tsx` | ⭐ | |
| `src/components/rdx/layout/Footer.tsx` | ⭐ | |
| `src/components/rdx/layout/Container.tsx` | ⭐ | Optional wrapper |
| `src/components/rdx/ui/Button.tsx` | ⭐ | Or extend common/ui |
| `src/components/rdx/visuals/system-diagram.tsx` | ⭐ | |
| `src/app/layout.tsx` | 🟡 | Swap Header/Footer imports only |
| `src/styles/globals.css` | 🟡 | Import rdx tokens |
| `src/components/common/layout/Header.tsx` | 🔴 | Keep until Phase 5 archive |
| `src/app/page.tsx` | 🔴 | Phase 2 |

---

## Phase 2

| File / path | Status | Notes |
|-------------|--------|-------|
| `src/app/page.tsx` | 🟢 | Full rdx homepage |
| `src/app/audit/page.tsx` | ⭐ | |
| `src/app/contact/page.tsx` | 🟢 | Qualified fields |
| `src/app/thank-you/page.tsx` | 🟡 | Copy update |
| `src/content/rdx/home.ts` | ⭐ | |
| `src/components/rdx/sections/*` | ⭐ | Hero, ServicesTeaser, ProcessSnap, AuditCta |
| `next.config.ts` | 🟡 | Add `/hire`→`/contact` |
| `src/data/metadata/pages.ts` | 🟡 | Or migrate to content/rdx |
| `src/app/hire/*` | 🔴 | Redirect only |
| `src/app/order/*` | 🔴 | |
| `src/app/api/*` | 🔴 | Unless contact endpoint needs tweak |

---

## Phase 3

| File / path | Status | Notes |
|-------------|--------|-------|
| `src/app/services/page.tsx` | 🟢 | Replace content |
| `src/app/services/agency-website/page.tsx` | ⭐ | |
| `src/app/services/lead-automation/page.tsx` | ⭐ | |
| `src/app/estimate/page.tsx` | ⭐ | Refactor from order UX |
| `src/lib/scope-estimator.ts` | ⭐ | |
| `src/content/rdx/services.ts` | ⭐ | |
| `src/app/order/page.tsx` | 🔴 | Redirect only |
| `src/data/pricing.ts` | 🔴 | Reference only |
| `next.config.ts` | 🟡 | `/order`→`/estimate` |

---

## Phase 4

| File / path | Status | Notes |
|-------------|--------|-------|
| `src/app/work/page.tsx` | ⭐ | |
| `src/app/work/[slug]/page.tsx` | ⭐ | |
| `src/content/rdx/case-studies/*` | ⭐ | |
| `src/app/process/page.tsx` | ⭐ | |
| `src/app/about/page.tsx` | 🟢 | RDX story |
| `src/components/rdx/sections/CaseStudy*.tsx` | ⭐ | |
| `src/app/portfolio/*` | 🔴 | Redirect only |
| `next.config.ts` | 🟡 | `/portfolio`→`/work` |

---

## Phase 5

| File / path | Status | Notes |
|-------------|--------|-------|
| `src/components/BeehiivSubscribe.tsx` | 🟡 | CTA copy |
| `src/app/blog/page.tsx` | 🟡 | Header CTA |
| `src/app/retainer/page.tsx` | ⭐ | |
| `src/app/services/ai-chat-search/page.tsx` | ⭐ | Phase 5 |
| `src/app/learn/*` | 🔴 | Redirect then archive |
| Legacy hire/order/portfolio folders | 🟡 | Archive after redirect stable |

---

## Phase 6

| File / path | Status | Notes |
|-------------|--------|-------|
| `src/app/dashboard/page.tsx` | 🟢 | Leads admin |
| `src/app/api/*` | 🟢 | Extend for leads |
| Supabase schema | 🟡 | Founder approval |

---

## Always protected (never break)

| Path | Reason |
|------|--------|
| `src/app/blog/[slug]/page.tsx` | Live content |
| `src/lib/wp-api.ts` | WordPress fetch |
| `src/app/api/auth/*` | Auth |
| `.env.local` keys | Secrets |
| `public/*` assets | Unless replacing deliberately |

---

## Legacy inventory (do not refactor bulk)

```
src/data/mock-data.ts
src/data/mock-data-temp.ts
src/data/services/services.ts
src/data/pricing.ts
src/app/hire/sections/*
src/components/sections/ProblemSolution.tsx
src/components/sections/EnhancedCTA.tsx
src/components/features/services/enhanced-*.tsx
```

Replace by **stop importing**, not mass delete.

---

*Cross-check with [RDX_Scope_Boundaries.md](./RDX_Scope_Boundaries.md) before every session.*
