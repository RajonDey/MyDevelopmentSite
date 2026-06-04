# RDX Revamp — Agent Workflow

How AI agents (Cursor, etc.) should operate on this project across sessions.

---

## Session start (mandatory — 5 min)

1. Read [`docs/README.md`](./README.md) — confirm **active phase**
2. Read [`RDX_Scope_Boundaries.md`](./RDX_Scope_Boundaries.md) for that phase only
3. Read [`RDX_File_Ownership_Map.md`](./RDX_File_Ownership_Map.md) — list files you will touch
4. Skim [`RDX_Content_Copy_Bank.md`](./RDX_Content_Copy_Bank.md) if writing UI copy
5. State aloud in response:
   - Active phase
   - Files to create/edit
   - Files explicitly NOT touching
   - Exit criteria from [`RDX_Phase_Checklists.md`](./RDX_Phase_Checklists.md)

**If active phase is unknown:** stop — do not write code. Ask founder or default to Phase 0.

---

## During implementation

1. Follow [`RDX_Code_Migration_Strategy.md`](./RDX_Code_Migration_Strategy.md) — additive first
2. Follow [`RDX_Implementation_Standards.md`](./RDX_Implementation_Standards.md)
3. Design pages with **Hallmark** skill: `.agents/skills/hallmark/SKILL.md`
4. Use **rdx-revamp** skill: `.agents/skills/rdx-revamp/SKILL.md`
5. One phase per session when possible — avoid starting Phase 3 work in Phase 2 session
6. No drive-by refactors on legacy files

---

## Session end (mandatory)

1. Run `npm run build` and `npm run lint`
2. Update checkboxes in `RDX_Phase_Checklists.md` if items completed
3. Update **Current status** table in `docs/README.md` if phase advanced
4. Provide session log:

```markdown
## Session summary
- **Phase:** N
- **Completed:** (checklist items)
- **Files touched:** ...
- **Deferred (out of scope):** ...
- **build/lint:** pass | fail
- **Next session starts at:** Phase N, task X
```

5. Do **not** commit unless founder asks

---

## Skills & rules map

| Tool | When |
|------|------|
| `@rdx-revamp` or rdx-revamp skill | Any revamp implementation |
| Hallmark skill | New rdx pages, sections, visual design |
| `.cursor/rules/rdx-*.mdc` | Auto-loaded in Cursor |
| `AGENTS.md` | Entry point every agent reads |

---

## Escalation — stop and ask founder

- Active phase unclear
- Need new npm dependency
- Need to delete legacy route files
- Copy requires metrics not in Copy Bank
- Scope request not in Phase Boundaries doc
- Build fails on untouched legacy code (report, don't mass-fix)

---

## Branch strategy (recommended)

```
main                    — production
rdx-revamp              — all revamp work
rdx/phase-0-foundation  — optional per-phase branches
```

Merge to main only after phase checklist sign-off.

---

## What “done” means

A phase is **not done** when “it looks OK.” It is done when:

- Phase checklist 100% for that phase
- build + lint pass
- Scope boundaries respected
- Session log written

---

*This workflow exists so tomorrow's session does not redo today's decisions.*
