# Specs

New behavior starts here. **Draft → Approved (founder) → Implement → Done.**

## How to use

1. Founder asks for a feature (or an agent proposes one).
2. Agent copies `_template.md` to the next number: `01-short-slug.md`.
3. Fill product, problem, files, steps, out of scope. Status stays **Draft**.
4. Founder replies **approved** (or edits the spec).
5. Agent implements **only** that spec, then sets status **Done** and updates `context/progress-tracker.md`.

No approved spec = no feature code.

Tiny bugfixes and copy-from-Copy-Bank tweaks do not need a spec. If you are unsure, write a spec.

## Numbering

| Prefix | Meaning |
|--------|---------|
| `00` | Process / repo workflow |
| `01+` | Product work, in the order we take it |
| `completed/` | Optional archive of finished specs |

One concern per file. Split rather than write a 20-page spec.

## Status values

`Draft` · `Approved` · `Done` · `Rejected`

## Existing product specs (already written, not numbered)

These stay in `docs/` because they are the long source of truth for shipped / in-flight products:

- OS product: `docs/RDX_OS_Spec.md`
- Lead Desk: `docs/RDX_Lead_Desk.md`

New OS or desk **features** still get a numbered file here that points at the sections they change.

## Brand HQ program (shared)

Not a fourth product. Sequence is locked in `01-brand-hq-program.md`. Implement **only** the next Approved spec.

| Spec | Unit | Status |
|------|------|--------|
| [01](./01-brand-hq-program.md) | Program (rules + order) | Approved |
| [02](./02-brand-system-of-record.md) | `brand/` source of truth | Done |
| [03](./03-brand-identity-lock.md) | Colors, type, logo rules, company line | Done |
| [04](./04-brand-canonical-assets.md) | SVG/PNG, favicon, avatar | Done |
| [05](./05-brand-hq-page.md) | `/brand` editorial page | Done |
| [06](./06-brand-voice.md) | Tone, words we use/avoid | Done |
| [07](./07-brand-product-brands.md) | YearInReview · IELTSReady rules | Done |
| [08](./08-brand-templates.md) | Templates: pattern → OG/social → card | Done |
