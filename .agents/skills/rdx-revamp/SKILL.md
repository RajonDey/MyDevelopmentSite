---
name: rdx-revamp
description: >-
  RDXHIVE site — marketing + lead desk. Use when editing rdx components,
  /start, services, case studies, or admin. Read plot.md first.
---

# RDX Site Skill

## Before any code

1. `plot.md` — match the job; open only those files
2. `context/progress-tracker.md`
3. New feature → `specs/` **Approved**, or write Draft and stop
4. State: product, spec id or maintenance, files to touch, files to avoid

## Implementation

- Standards: `context/code-standards.md`
- Copy: `docs/RDX_Content_Copy_Bank.md`
- Design: Hallmark · `modern-minimal` / Quiet
- Desk schema: `docs/RDX_Lead_Desk.md`
- Ops / env: `docs/RDX_Ops_Reference.md`

## Folders

```
src/components/rdx/      marketing + admin
src/content/rdx/
src/styles/rdx/tokens.css
src/app/api/leads|invoices|projects/
```

No `Enhanced*V2`. No new content in deleted `src/data/`.

## Out of scope

- New npm deps without founder OK
- OS work (use `docs/RDX_OS_Spec.md` + an OS spec)
- Invented metrics

## Session end

```bash
npm run build && npm run lint
```

Update `context/progress-tracker.md`.
