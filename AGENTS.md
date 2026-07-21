# AGENTS.md — RDX Technologies Site

Marketing site repositioned to **RDX Technologies** (agency). Revamp Phases 0–15 are shipped; remaining work is launch sign-off, maintenance, lead desk ops, and RDX OS.

---

## Start here

1. **[docs/PRODUCTS.md](./docs/PRODUCTS.md)** — three products in this repo (don’t mix them)
2. **[docs/README.md](./docs/README.md)** — documentation hub and current status

---

## Hard rules

1. **Know the product** — [PRODUCTS.md](./docs/PRODUCTS.md) then [docs/README.md](./docs/README.md); know which track you’re on (marketing / lead desk / OS / launch).
2. **Additive migration** — [RDX_Code_Migration_Strategy.md](./docs/RDX_Code_Migration_Strategy.md). No mass deletes of legacy without founder OK.
3. **Clean code** — [RDX_Implementation_Standards.md](./docs/RDX_Implementation_Standards.md). No AI bloat, no invented metrics.
4. **Copy** — use [RDX_Content_Copy_Bank.md](./docs/RDX_Content_Copy_Bank.md) only.
5. **Living paths** — prefer `src/components/rdx/`, `src/content/rdx/`, OS zones.
6. **Session protocol** — [RDX_Agent_Workflow.md](./docs/RDX_Agent_Workflow.md).
7. **Launch** — founder checklist in [RDX_Launch_Runbook.md](./docs/RDX_Launch_Runbook.md).

---

## Locked product decisions

| Item | Value |
|------|-------|
| Brand | RDX Technologies |
| ICP | US marketing agencies, 5–20 employees |
| Pricing | **$1K–$5K+** round · public tiers on `/services` — see `docs/RDX_Services_and_Pricing.md` |
| Pricing display | Homepage “from $1,000”; full tiers on service pages; no checkout on estimator |
| Design | Hallmark modern-minimal / Quiet — not Vercel clone |
| Site role | Credibility for outbound — not SEO-first |

Full detail: [RDX_Strategic_Decisions_and_Phase_Plan.md](./docs/RDX_Strategic_Decisions_and_Phase_Plan.md)

---

## Skills

| Skill | Path | Use |
|-------|------|-----|
| **rdx-revamp** | `.agents/skills/rdx-revamp/SKILL.md` | Site / rdx component work |
| **hallmark** | `.agents/skills/hallmark/SKILL.md` | Visual design for rdx pages |

---

## Commands

```bash
npm run dev      # local dev
npm run build    # required before sign-off
npm run lint     # required before sign-off
npm run typecheck
npm run prelaunch  # lint + typecheck + build
```

---

## Current status

| Field | Value |
|-------|-------|
| **Marketing revamp** | Shipped (Phases 0–15) |
| **Active track** | Launch Phase F open · RDX OS Phase 1 (real seed + magic link) |
| **Next step** | Launch: [Runbook](./docs/RDX_Launch_Runbook.md) · OS: apply `010_os_core.sql` in Supabase · wire `/api/os/*` data layer |

---

## New code locations

- Components: `src/components/rdx/`
- Content: `src/content/rdx/`
- Tokens: `src/styles/rdx/tokens.css`
- OS: `src/app/(os)/os/`, `src/components/os/`

---

*Update "Current status" when tracks advance.*
