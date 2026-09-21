# AI Workflow Rules

## Approach

**Spec-driven.** Context files describe the system. `plot.md` says which files to open. `specs/` says what to build next. Do not invent product behavior.

## Every session

1. Read `plot.md` and match the job.
2. Read `context/progress-tracker.md`.
3. If the work is a **new feature or behavior change**:
   - Find a spec in `specs/` with status **Approved**, or
   - Write the spec (see `specs/_template.md`), **stop**, and wait for founder approval.
4. State: product · spec id (or “maintenance”) · files to touch · files to avoid.
5. Implement only what the spec (or a tiny maintenance fix) allows.

## Scoping

- One feature unit per session.
- Do not mix marketing + desk + OS in one change.
- If it cannot be verified quickly, split it.

## Split if the step mixes

- Public UI and admin/OS UI
- Schema/migration and unrelated screens
- Copy invention and code
- Two specs

## Missing requirements

- Do not guess. Add an open question to `context/progress-tracker.md` and/or the spec.
- Ambiguous product rules go in `context/` or `docs/` **before** code.

## Protected

Do not change unless the founder (or an approved spec) says so:

- `next.config.ts` redirects
- `src/app/services/[id]/page.tsx`
- Locked pricing / Copy Bank facts
- OS ↔ desk sync policy
- Third-party lockfiles / new dependencies

## Docs sync

| If you change… | Update |
|----------------|--------|
| Architecture / boundaries | `context/architecture.md` |
| Standards | `context/code-standards.md` |
| Visual system | `context/ui-context.md` |
| Scope / goals | `context/project-overview.md` |
| What is done / next | `context/progress-tracker.md` |
| A shipped spec | spec status → **Done** |
| Locked pricing or copy | the matching `docs/` file |

## Before calling work done

1. Scope in the spec (or the tiny fix) works end to end.
2. No architecture invariant broken.
3. `progress-tracker.md` updated.
4. `npm run build` and `npm run lint` pass.

## Hard stops

- No invented metrics or testimonials
- No new npm package without founder OK
- No mass deletes of living routes/APIs
- No secrets in markdown
