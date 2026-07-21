---
name: rdx-revamp
description: >-
  RDX Technologies site — agency marketing site + lead desk. Use when editing
  rdx components, /start funnel, services, case studies, or admin. Always read
  docs/PRODUCTS.md then docs/README.md first.
---

# RDX Site Skill

## Before any code

1. Read `docs/PRODUCTS.md` — which product?
2. Read `docs/README.md` — confirm **active track**
3. Open the living doc for that track (Launch, Ops, Lead Desk, OS Spec, Standards)
4. State: track, files to edit, files NOT touching, exit criteria

If track unknown → **stop and ask**.

## Implementation rules

- **Migration:** `docs/RDX_Code_Migration_Strategy.md` — additive first, no mass deletes
- **Standards:** `docs/RDX_Implementation_Standards.md`
- **Copy:** `docs/RDX_Content_Copy_Bank.md` — never invent metrics
- **Design:** Hallmark (`.agents/skills/hallmark/`) — genre `modern-minimal`, theme `Quiet`
- **Ops:** `docs/RDX_Ops_Reference.md` · Lead desk: `docs/RDX_Lead_Desk.md`
- **Launch:** `docs/RDX_Launch_Runbook.md`

## Folder conventions

```
src/components/rdx/     # marketing + admin UI
src/content/rdx/        # typed marketing content
src/styles/rdx/tokens.css
src/lib/                 # analytics, leads, invoices, etc.
supabase/migrations/     # lead desk
```

Do **not** add to legacy mock files for new content. Do **not** create `Enhanced*V2` files.

## Status

| Track | Focus |
|-------|--------|
| Marketing revamp | **Complete** (Phases 0–15 shipped) |
| Launch Phase F | Deploy + prod smoke + tag — see Launch Runbook |
| Lead desk | Shipped; prod Supabase admin optional |
| RDX OS | Separate — `docs/RDX_OS_Spec.md` |

## Session end

```bash
npm run build && npm run lint
```

Update `docs/README.md` status per `docs/RDX_Agent_Workflow.md`.

## Out of scope (always)

- New npm deps without founder OK
- shadcn full install, CMS migration, domain change without approval
- Deleting legacy routes without founder OK + redirect plan
- Fiverr proof on marketing pages
- Invented client counts or % stats

## Reference docs

- Products: `docs/PRODUCTS.md`
- Hub: `docs/README.md`
- Strategy: `docs/RDX_Strategic_Decisions_and_Phase_Plan.md`
- Agent workflow: `docs/RDX_Agent_Workflow.md`
- Root entry: `AGENTS.md`
