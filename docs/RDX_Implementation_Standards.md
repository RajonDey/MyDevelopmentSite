# RDX Revamp — Implementation Standards

**Purpose:** Keep code clean, consistent, and free of AI-generated bloat.

---

## Stack (do not change)

- Next.js 15 App Router · React 19 · TypeScript · Tailwind 3
- Headless WordPress for blog only
- Existing: NextAuth, Supabase adapter, Resend — **extend, don't replace**

---

## Living paths (prefer these)

| Path | Use |
|------|-----|
| `src/components/rdx/` | Marketing + admin UI |
| `src/content/rdx/` | Typed content |
| `src/styles/rdx/tokens.css` | Design tokens |
| `src/types/rdx/` | Shared types |
| `src/app/(os)/os/`, `src/components/os/` | RDX OS only |
| `supabase/migrations/` | Lead desk schema |

Do **not** invent marketing metrics. Prefer `src/components/rdx/` and `src/content/rdx/`.

## File & naming rules

| Rule | Example |
|------|---------|
| rdx components under `src/components/rdx/` | `rdx/sections/Hero.tsx` |
| Content as data under `src/content/rdx/` | `content/rdx/services.ts` |
| PascalCase components | `ScopeEstimator.tsx` |
| kebab-case routes | `/agency-website`, `/lead-automation` |
| No `Enhanced`, `New`, `V2` suffixes | `ServiceCard.tsx` not `EnhancedServiceCardV2.tsx` |
| Co-locate types with content or `types/rdx/` | `types/rdx/case-study.ts` |

---

## Component rules

1. **Server Components by default** — `"use client"` only for forms, estimator interactivity, mobile nav toggle.
2. **One component, one job** — Hero renders hero; no Hero+FAQ+CTA mega-files.
3. **Props over config soup** — prefer explicit props to 20-key config objects unless data-driven list.
4. **No premature abstraction** — wait until 3rd duplicate before extracting.
5. **Reuse existing UI** — extend `Button`/`Card` with rdx token classes before cloning.

### Max file size (soft limit)

| Type | Target max |
|------|------------|
| Page | ~150 lines — extract sections |
| Section component | ~80 lines |
| `/order` is legacy debt — **do not** use as template for line count |

---

## Styling rules

1. **Design tokens** — colors/spacing from `src/styles/rdx/tokens.css` via CSS variables + Tailwind theme extension.
2. **No inline styles** except dynamic values (rare).
3. **No new gradient hero backgrounds** — Hallmark Quiet = paper + single accent.
4. **No Fiverr green** (`#1dbf73`) on new rdx components.
5. **Hallmark** — invoke `.agents/skills/hallmark/` for page design; run slop-test mentally before shipping.

### Tailwind

- Use existing `tailwind.config` — extend with rdx token colors in Phase 0
- Prefer `className={cn(...)}` via existing `lib/utils.ts`
- No `@apply` blocks for one-off styles

---

## Copy & content rules

1. All marketing copy from [RDX_Content_Copy_Bank.md](./RDX_Content_Copy_Bank.md) or founder approval.
2. **Never invent:** client counts, % improvements, star ratings, logo walls.
3. Use `"metric to confirm"` or omit stat — Hallmark gate 56.
4. Case study attribution must be honest (agency/team delivery).

---

## Data & API rules

1. New marketing content → `src/content/rdx/*.ts` (typed exports).
2. Do not add marketing content to legacy mock files — use `content/rdx/` only.
3. Forms: reuse existing patterns (`contact`, Resend, API routes) — one submission pipeline.
4. New DB tables / migrations require founder OK — see [RDX_Lead_Desk.md](./RDX_Lead_Desk.md).

---

## Dependencies

| Allowed without ask | Requires founder OK |
|---------------------|---------------------|
| lucide-react icons | Any new npm package |
| framer-motion (sparingly) | shadcn / radix full install, new CMS, Stripe SDK |

---

## Anti-patterns (reject in review)

- [ ] Duplicate Header/Footer implementations
- [ ] Commented-out blocks of old code left in file
- [ ] `console.log` left in production paths
- [ ] Unused imports / dead components created same session
- [ ] Generic AI copy: "Unlock the power of AI", "In today's fast-paced world"
- [ ] 6+ badge pills in hero
- [ ] Stock photo placeholders
- [ ] Third identical CTA on same page
- [ ] `any` type without justification
- [ ] Fetch in client component when server fetch works

---

## TypeScript

- Strict mode — no `@ts-ignore` without comment
- Export types for content models
- Zod **only if** form validation needs it — don't add Zod project-wide in Phase 2

---

## Git / session hygiene

- One focus per PR/session
- Commit message: `rdx: short description` (or track-specific prefix)
- List files touched at end of agent session
- Run `npm run build && npm run lint` before sign-off

---

## Global never / ask-first

**Never (unless founder requests):** invent metrics or testimonials; mass-delete legacy routes/API; SEO ad tooling; migrate off WordPress; domain change without approval.

**Ask first:** new env vars; Supabase schema changes; deleting redirected legacy page files; Framer Motion beyond hero + one section.

---

## Review checklist (every rdx PR)

```
[ ] Only files for this session’s track touched
[ ] build passes
[ ] lint passes
[ ] No invented metrics
[ ] No new deps (or approved)
[ ] Server components where possible
[ ] Legacy routes still work or redirect documented
[ ] Copy matches Content Copy Bank
[ ] Mobile: no horizontal scroll at 375px
```

---

*Agents: enforce this doc + [RDX_Agent_Workflow.md](./RDX_Agent_Workflow.md)*
