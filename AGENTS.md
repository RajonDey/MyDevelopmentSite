# AGENTS.md — RDX Technologies Site Revamp

This repository is undergoing a **positioned revamp** (freelancer site → RDX Technologies agency site).  
**Do not start implementation until you have read the docs below.**

---

## Start here

📁 **[docs/README.md](./docs/README.md)** — documentation hub and current phase status

---

## Hard rules

1. **One active phase** — see [RDX_Scope_Boundaries.md](./docs/RDX_Scope_Boundaries.md). Out-of-phase work is rejected.
2. **Additive migration** — see [RDX_Code_Migration_Strategy.md](./docs/RDX_Code_Migration_Strategy.md). No mass deletes.
3. **Clean code** — see [RDX_Implementation_Standards.md](./docs/RDX_Implementation_Standards.md). No AI bloat, no invented metrics.
4. **Copy** — use [RDX_Content_Copy_Bank.md](./docs/RDX_Content_Copy_Bank.md) only.
5. **Files** — touch only paths listed in [RDX_File_Ownership_Map.md](./docs/RDX_File_Ownership_Map.md) for the active phase.
6. **Sign-off** — complete [RDX_Phase_Checklists.md](./docs/RDX_Phase_Checklists.md) before advancing phases.
7. **Session protocol** — follow [RDX_Agent_Workflow.md](./docs/RDX_Agent_Workflow.md).

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
| **rdx-revamp** | `.agents/skills/rdx-revamp/SKILL.md` | All revamp implementation |
| **hallmark** | `.agents/skills/hallmark/SKILL.md` | Visual design for rdx pages |

---

## Commands

```bash
npm run dev      # local dev
npm run build    # required before phase sign-off
npm run lint     # required before phase sign-off
npm run typecheck
```

---

## Current status

| Field | Value |
|-------|-------|
| **Implementation** | Not started |
| **Active phase** | None — documentation ready |
| **Next step** | Phase 0 when founder approves |

---

## New code locations

- Components: `src/components/rdx/`
- Content: `src/content/rdx/`
- Tokens: `src/styles/rdx/tokens.css`

Legacy code in `src/data/`, `src/components/sections/`, `src/app/hire/`, `src/app/order/` — **do not refactor unless phase allows**.

---

*Update "Current status" when phases advance.*
