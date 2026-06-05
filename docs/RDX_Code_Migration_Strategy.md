# RDX Revamp — Code Migration Strategy

**Goal:** Smooth transition. Legacy site keeps working until each replacement is ready. No big-bang rewrite. No AI-flooded duplicate abstractions.

---

## Core principles

1. **Additive first** — create new files; avoid editing legacy until the phase requires it.
2. **One route, one owner** — a URL is either legacy or rdx, never half-migrated.
3. **Redirect after replace** — add redirects only when the new page is done and tested.
4. **No delete until archive** — move to `_legacy` or leave file + redirect; delete in Phase 5+ only.
5. **Minimal diff** — prefer extending patterns already in repo over new frameworks.

---

## Folder architecture (target)

```
src/
├── app/                          # Routes (App Router)
│   ├── page.tsx                  # Phase 2: swap to rdx homepage
│   ├── audit/                    # Phase 2: new
│   ├── estimate/                 # Phase 3: new
│   ├── work/                     # Phase 4: new
│   ├── contact/                  # Phase 2: update in place
│   ├── blog/                     # Keep — minimal CTA changes Phase 5
│   ├── order/                    # Legacy — redirect Phase 3, archive Phase 5
│   ├── hire/                     # Legacy — redirect Phase 2, archive Phase 5
│   ├── portfolio/                # Legacy — redirect Phase 4, archive Phase 5
│   └── api/                      # Do not break — extend only when needed
│
├── components/
│   ├── common/                   # LEGACY — shared until rdx/ui replaces usage
│   ├── sections/                 # LEGACY — homepage sections replaced Phase 2
│   ├── features/                 # LEGACY — blog/portfolio cards reused where OK
│   └── rdx/                      # NEW — all revamp UI lives here
│       ├── layout/               # Header, Footer, Section, Container
│       ├── ui/                   # Button, Card, Badge (rdx variants)
│       ├── sections/             # Hero, ServicesTeaser, AuditCta, etc.
│       └── visuals/              # SystemDiagram, icons
│
├── content/
│   └── rdx/                      # NEW — typed content (no JSX)
│       ├── metadata.ts
│       ├── home.ts
│       ├── services.ts
│       ├── case-studies/
│       └── copy.ts
│
├── lib/
│   ├── analytics.ts              # Phase 0
│   └── scope-estimator.ts        # Phase 3
│
├── styles/
│   ├── globals.css               # Import rdx tokens; legacy vars until Phase 2
│   └── rdx/
│       └── tokens.css            # Hallmark Quiet tokens — Phase 0
│
└── data/                         # LEGACY — leave intact; do not refactor wholesale
    ├── mock-data.ts
    ├── pricing.ts                # Deprecated Phase 3; keep for reference
    └── services/
```

---

## Layout transition (recommended)

### Step A — Phase 0–1: Dual components, single layout

Root `layout.tsx` stays one file. Phase 1 introduces rdx Header/Footer:

```tsx
// layout.tsx — Phase 1 pattern
import { RdxHeader } from "@/components/rdx/layout/Header";
import { RdxFooter } from "@/components/rdx/layout/Footer";

// Use rdx chrome globally once Phase 1 ships
// Legacy pages may look slightly mismatched until their phase — acceptable briefly
```

**Do not** create a second root layout unless necessary. One layout = less duplication.

### Step B — Phase 2+: Page-level content swap

Replace `src/app/page.tsx` content with rdx sections. Old section imports removed from that file only — **do not delete** `components/sections/*` until Phase 5 archive.

### Step C — Route groups (optional, only if needed)

If legacy homepage must stay reachable during dev:

```
src/app/(legacy-preview)/old-home/page.tsx  — dev only, not linked
```

**Default:** No preview route — use git branch for rollback instead.

---

## Legacy file policy

| Action | When |
|--------|------|
| **Leave untouched** | File not in current phase ownership map |
| **Edit in place** | Single-route pages (`contact`, `services`) when phase owns them |
| **Create parallel rdx file** | New components, new content, new lib |
| **Redirect** | Replacement route deployed |
| **Archive** | `src/_legacy/` or comment `// @legacy Phase 5 archive` — Phase 5+ |
| **Delete** | Only after 7+ days redirect + founder OK |

---

## `next.config.ts` migration sequence

| Phase | Redirect change |
|-------|-----------------|
| **0** | **Remove** `{ source: "/work", destination: "/portfolio" }` |
| **2** | Add `{ source: "/hire", destination: "/contact", permanent: true }` |
| **3** | Add `{ source: "/order", destination: "/estimate", permanent: true }` |
| **4** | Add `{ source: "/portfolio", destination: "/work", permanent: true }` |
| **5** | Add `{ source: "/learn", destination: "/blog", permanent: true }` |

Do not add Phase 3+ redirects early.

---

## Reuse vs rewrite

| Legacy asset | Decision |
|--------------|----------|
| `Button`, `Card`, `Badge` in `common/ui` | **Extend** with rdx tokens OR wrap — do not duplicate third Button lib |
| `/order` calculator UI | **Reuse layout patterns** in `/estimate`; new logic in `scope-estimator.ts` |
| WordPress `fetchPosts`, blog pages | **Keep** — change CTAs only Phase 5 |
| NextAuth, dashboard, API routes | **Freeze** — hide UI Phase 1–2; Phase 6 only |
| `mock-data.ts`, `services.ts` | **Leave** — new content in `content/rdx/` |
| Fiverr reviews data | **Stop importing** on new pages; file stays |

---

## Rollback strategy

- Each phase = one git commit (or small logical commits) on branch `rdx-revamp`
- Tag after Phase 2 deploy: `rdx-mvp-v1`
- If homepage breaks: revert `page.tsx` + layout import only
- Legacy data files untouched = safe rollback

---

## Clean code during migration

- **No** `utils-v2`, `helpers-new`, `EnhancedEnhancedButton`
- **No** copying entire `order/page.tsx` to a new file — extract shared pieces only if >40 lines duplicate
- **No** global CSS rewrite — add `rdx/tokens.css`, migrate variables incrementally
- **No** converting all pages to client components — server-first default (Next.js 15)
- Max **one** new abstraction per phase (e.g. Phase 1: `Section`; Phase 3: `Estimator`)

---

## Pre-flight before any code session

```bash
npm run build
npm run lint
```

Same commands required before marking phase complete.

---

*See also: [RDX_Implementation_Standards.md](./RDX_Implementation_Standards.md)*
