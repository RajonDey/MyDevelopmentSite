# RDX — Agent Workflow

How AI agents should operate on this project across sessions.

---

## Session start (mandatory)

1. Read [`PRODUCTS.md`](./PRODUCTS.md) — which product (marketing / lead desk / OS)?
2. Read [`docs/README.md`](./README.md) — confirm **active track** (maintenance / launch / OS / lead desk)
3. Open the living doc for that track (Launch Runbook, Ops Reference, Lead Desk, OS Spec, or Standards)
4. Skim [`RDX_Content_Copy_Bank.md`](./RDX_Content_Copy_Bank.md) if writing UI copy
5. State in response:
   - Active track
   - Files to create/edit
   - Files explicitly NOT touching
   - Exit criteria (what “done” means this session)

**If the track is unclear:** stop — ask founder. Do not invent a new phase gate.

---

## During implementation

1. Follow [`RDX_Code_Migration_Strategy.md`](./RDX_Code_Migration_Strategy.md) — additive first; no mass legacy deletes
2. Follow [`RDX_Implementation_Standards.md`](./RDX_Implementation_Standards.md)
3. Design pages with **Hallmark**: `.agents/skills/hallmark/SKILL.md`
4. Use **rdx-revamp** skill: `.agents/skills/rdx-revamp/SKILL.md`
5. One focus per session — avoid drive-by refactors on legacy files
6. Marketing copy only from Copy Bank or founder approval

---

## Session end (mandatory)

1. Run `npm run build` and `npm run lint` (or `npm run prelaunch` before launch)
2. Update **Current status** in `docs/README.md` if the track advanced
3. Provide session log:

```markdown
## Session summary
- **Track:** maintenance | launch | OS | lead desk
- **Completed:** ...
- **Files touched:** ...
- **Deferred:** ...
- **build/lint:** pass | fail
- **Next session:** ...
```

4. Do **not** commit unless founder asks

---

## Skills & rules map

| Tool | When |
|------|------|
| `@rdx-revamp` or rdx-revamp skill | rdx components / site work |
| Hallmark skill | New rdx pages, sections, visual design |
| `.cursor/rules/rdx-*.mdc` | Auto-loaded in Cursor |
| `AGENTS.md` | Entry point every agent reads |

---

## Escalation — stop and ask founder

- Active track unclear
- Need new npm dependency
- Need to delete legacy route/API files
- Copy requires metrics not in Copy Bank
- Supabase schema changes or new env vars
- Build fails on untouched legacy code (report, don't mass-fix)

---

## Global never / ask-first

**Never (unless founder requests):** invent metrics/testimonials; SEO ad campaigns; migrate off WordPress; domain change without approval; full dark-theme rewrite unrelated to Hallmark Quiet.

**Ask first:** new env variables; Supabase schema changes; removing redirected legacy page files; Framer Motion beyond hero + one section.

---

## Branch strategy (recommended)

```
main                    — production
feature/...             — focused work
```

---

## What “done” means

A session is done when:

- Stated exit criteria met
- build + lint pass
- Living docs / README status updated if needed
- Session log written

Launch is done when [RDX_Launch_Runbook.md](./RDX_Launch_Runbook.md) Phase F boxes are checked.

---

*Product map: [PRODUCTS.md](./PRODUCTS.md)*
