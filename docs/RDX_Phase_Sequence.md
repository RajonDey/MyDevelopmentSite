# RDX Revamp — Phase Sequence & Dependencies

**Purpose:** Work in strict order so global/reusable pieces come first and nothing gets rebuilt twice.

**Rule:** Do not start Phase N+1 until Phase N checklist is 100% complete and `npm run build` passes.

---

## Dependency chain (why this order)

```
Phase 0  Foundation     tokens · types · content scaffold · config · meta
    ↓
Phase 1  Shell          Header · Footer · UI primitives · Section/Container
    ↓                  (every later page uses these — build once)
Phase 2  MVP pages      Homepage · /audit · /contact · thank-you
    ↓                  (uses shell + content; no full /services yet)
Phase 3  Services       /services · detail pages · /estimate · redirects
    ↓                  ⭐ START MARKETING HERE (pricing pages exist)
Phase 4  Trust          /work · /process · /about · portfolio redirect
    ↓
Phase 5  Expand         Blog CTAs · retainer · AI page · legacy archive
    ↓
Phase 6  Ops            Lead DB · admin (only when you have pipeline)
```

---

## Phase 0 — Global foundation (no visible redesign)

**Build once, reuse everywhere:**

| Deliverable | Why first |
|-------------|-----------|
| `src/styles/rdx/tokens.css` | All rdx components read same colors/fonts |
| `tailwind.config` token extension | Tailwind classes match tokens |
| `src/content/rdx/` scaffold | All copy/pricing in one place — not `mock-data.ts` |
| `src/content/rdx/metadata.ts` | Single source for titles/descriptions |
| `src/content/rdx/services.ts` stub | Pricing tiers defined before any service page |
| `src/types/rdx/` (minimal) | Shared types for forms, tiers, case studies |
| `src/lib/analytics.ts` | Events wired once; pages call helpers later |
| `next.config.ts` | Remove blocking `/work`→`/portfolio` redirect |
| `layout.tsx` metadata | Point to RDX metadata (not Rajon Dey) |
| `SchemaOrg.tsx` | RDX organization schema (avoid SEO rework) |

**Do NOT:** redesign pages, swap header, delete legacy files, bulk-edit `mock-data.ts`.

**Legacy data:** Leave old files intact. New site reads `content/rdx/` only.

---

## Phase 1 — Global shell (all routes share this)

**Build once:**

| Deliverable | Reused by |
|-------------|-----------|
| `RdxHeader` | Every page |
| `RdxFooter` | Every page |
| `Container` + `Section` | Every rdx section |
| `Button` / `Card` / `Badge` (rdx or extended) | All CTAs, tiers, forms |
| `SystemDiagram` visual | Homepage hero |
| `globals.css` imports tokens | Whole site |

**Swap `layout.tsx`** to RdxHeader + RdxFooter. Legacy page *content* may look mismatched briefly — that is OK until each route’s phase.

**Do NOT:** rewrite homepage, build /audit, touch blog logic.

---

## Phase 2 — First rdx pages (shell already exists)

| Page | Depends on |
|------|------------|
| Homepage | Phase 1 shell + `content/rdx/home.ts` |
| `/audit` | Phase 1 shell + shared form patterns |
| `/contact` | Phase 1 shell + qualified fields |
| `/thank-you` | Copy only |

**Homepage CTAs (Phase 2 — before /services exists):**
- Primary → `/audit`
- Secondary → `/contact` or scroll to services **teaser** on homepage (not broken `/services` link)

**Redirect:** `/hire` → `/contact`

**Do NOT:** full `/services` pages, `/estimate`, case studies.

**Marketing:** Do **not** send prospects to `/services` until Phase 3 ships. Phase 2 outbound = `/audit` link only.

---

## Phase 3 — Pricing & services (now safe to market fully)

| Page | Depends on |
|------|------------|
| `/services` overview | `content/rdx/services.ts` |
| `/services/agency-website` | Same + tier UI from Phase 1 |
| `/services/lead-automation` | Same |
| `/estimate` | `scope-estimator.ts` + tier mapping doc |

**Redirect:** `/order` → `/estimate`

**Update homepage:** secondary CTA → `/services` (safe now).

**⭐ Start full outbound** (audit + services + pricing) after Phase 3.

---

## Phase 4 — Proof (needs stable services links)

Case studies, process, about — link back to `/services` and `/audit`.

**Redirect:** `/portfolio` → `/work`

---

## Phase 5 — Cleanup & expansion

Blog CTAs, retainer, AI page, **archive** legacy routes (not delete until redirects stable 7+ days).

---

## Phase 6 — Client ops

Only when leads exist. Supabase/forms DB, minimal admin.

---

## What we deliberately do NOT do early

| Temptation | Why wait |
|------------|----------|
| Delete `/order`, `/hire`, `/portfolio` files | Phase 5 archive — redirects first |
| Refactor all of `mock-data.ts` | Never bulk — stop importing on new pages |
| Build `/estimate` before `/services` | Estimator references tiers in `services.ts` |
| Marketing before Phase 3 | `/services` pricing must exist |
| Client portal / auth revamp | Phase 6 |
| Blog rewrite | Phase 5 CTA copy only |

---

## Rework prevention checklist

Before closing any phase, ask:

1. Did I only touch files allowed for this phase?
2. Did I create reusable pieces in `components/rdx/` instead of one-off page code?
3. Did I put copy/pricing in `content/rdx/` not hardcoded in JSX?
4. Did I add redirects **after** the replacement page works?
5. Will the next phase need to undo anything I did today?

If yes to #5 → stop and fix before sign-off.

---

## Git discipline (recommended)

```bash
git checkout -b rdx-revamp    # before Phase 0 code
# one phase = one commit (or small logical commits per phase)
git tag rdx-mvp-v1            # after Phase 3 deploy (marketing-ready)
```

---

*Version 1.0 — aligns with plan v1.2*
