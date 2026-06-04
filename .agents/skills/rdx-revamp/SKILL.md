---
name: rdx-revamp
description: >-
  RDX Technologies site repositioning from freelancer portfolio to premium agency.
  Use when implementing the RDX revamp, working on phases 0-6, or editing rdx
  components, audit funnel, scope estimator, or case studies. Always read docs/
  first and respect phase scope boundaries.
---

# RDX Revamp Skill

## Before any code

1. Read `docs/README.md` — confirm **active phase**
2. Read `docs/RDX_Scope_Boundaries.md` for that phase
3. Read `docs/RDX_File_Ownership_Map.md` — only touch allowed files
4. State: phase, files to edit, files NOT touching, exit criteria

If phase unknown → **stop and ask**. Default: Phase 0 only.

## Implementation rules

- **Migration:** `docs/RDX_Code_Migration_Strategy.md` — additive first, no mass deletes
- **Standards:** `docs/RDX_Implementation_Standards.md`
- **Copy:** `docs/RDX_Content_Copy_Bank.md` — never invent metrics
- **Design:** invoke Hallmark (`.agents/skills/hallmark/`) for rdx pages — genre `modern-minimal`, theme `Quiet`
- **Checklists:** `docs/RDX_Phase_Checklists.md` before marking phase done

## Folder conventions

```
src/components/rdx/     # all new UI
src/content/rdx/        # typed marketing content
src/styles/rdx/tokens.css
src/lib/scope-estimator.ts   # Phase 3
src/lib/analytics.ts         # Phase 0
```

Do **not** add to `mock-data.ts` for new content. Do **not** create `Enhanced*V2` files.

## Phase summary

| Phase | Focus |
|-------|-------|
| 0 | Tokens, metadata, analytics stub, remove /work→/portfolio redirect |
| 1 | RdxHeader, RdxFooter, design tokens wired |
| 2 | Homepage, /audit, /contact — **MVP ship** |
| 3 | Services, /estimate |
| 4 | /work case studies, /process, /about |
| 5 | Blog CTAs, retainer, ai-chat-search |
| 6 | Client DB / admin |

## Session end

```bash
npm run build && npm run lint
```

Update phase checklists + session log per `docs/RDX_Agent_Workflow.md`.

## Out of scope (always)

- New npm deps without founder OK
- shadcn full install, CMS migration, domain change
- Deleting legacy routes before redirect + archive plan
- Fiverr proof on new homepage
- Invented client counts or % stats

## Reference docs

- Strategy: `docs/RDX_Strategic_Decisions_and_Phase_Plan.md`
- Agent workflow: `docs/RDX_Agent_Workflow.md`
- Root entry: `AGENTS.md`
