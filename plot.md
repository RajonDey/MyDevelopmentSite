# Plot — what to read for this job

Read this file first. Open **only** the rows that match the prompt. Then follow `context/ai-workflow-rules.md`.

## Always (every session)

1. `context/progress-tracker.md` — what is true right now
2. `context/ai-workflow-rules.md` — spec-first, one product
3. `specs/` — is there an **Approved** spec for this work? If the prompt is a new feature and there is no approved spec → **write the spec and stop**

## New feature / behavior change

| Step | File |
|------|------|
| Template | `specs/_template.md` |
| How numbering works | `specs/README.md` |
| After founder says “approved” | Implement that spec only |

Do not implement from a Draft spec.

## Match the prompt

| If the job is about… | Read (in order) | You may touch | Do not touch |
|----------------------|-----------------|---------------|--------------|
| **Which product / repo shape** | `context/project-overview.md` · `docs/PRODUCTS.md` | — | Mixing folders |
| **Marketing page, `/start`, services, work, copy** | `context/ui-context.md` · `context/code-standards.md` · `docs/RDX_Content_Copy_Bank.md` · `docs/RDX_Services_and_Pricing.md` | `src/components/rdx/` (not `admin/`) · `src/content/rdx/` · matching `src/app/` page | `src/components/os/` · desk APIs · OS tables |
| **Visual design / redesign** | `context/ui-context.md` · `.agents/skills/hallmark/SKILL.md` · Copy Bank | rdx sections + tokens | OS theme unless spec says so |
| **Lead Desk / invoices / `/dashboard`** | `context/architecture.md` · `docs/RDX_Lead_Desk.md` · `docs/RDX_Ops_Reference.md` | `src/components/rdx/admin/` · `src/app/api/leads\|invoices\|projects/` · `src/lib/leads.ts` `invoices.ts` `projects.ts` | `src/components/os/` · `os_*` tables |
| **RDXHIVE OS** | `context/architecture.md` · `docs/RDX_OS_Spec.md` (only the sections the spec cites) | `src/app/(os)/` · `src/components/os/` · `src/lib/os/` · `src/app/api/os/` | `rdx/admin/` · `rdx_*` tables |
| **Auth / sessions** | `context/architecture.md` · `src/lib/auth.ts` | Auth callbacks, `/signin`, `/os/signin` | Unifying desk + OS login |
| **Env, Resend, deploy, redirects** | `docs/RDX_Ops_Reference.md` · `docs/RDX_Launch_Runbook.md` | Host env (not committed) · `next.config.ts` only if spec says | Deleting redirects |
| **Launch / production smoke** | `docs/RDX_Launch_Runbook.md` · `context/progress-tracker.md` | Runbook checkboxes | New features without a spec |
| **SEO / llms.txt / sitemap** | `docs/RDX_SEO_and_AI_Discoverability.md` · `src/content/rdx/seo.ts` | Those files + `sitemap.ts` `robots.ts` | Inventing keywords/stats |
| **Locked positioning / ICP / pricing change** | `docs/RDX_Strategic_Decisions_and_Phase_Plan.md` · Pricing · Copy Bank | Those docs after founder OK | Silent contradiction |
| **Brand HQ / identity / logo / brand.json / `/brand`** | `brand/README.md` · `brand/BRAND.md` · `brand/brand.json` · `specs/01-brand-hq-program.md` · `context/ui-context.md` · Copy Bank (Brand table) · `src/content/rdx/brand.ts` | Only the files the **Approved** Brand HQ spec lists | Homepage/ICP rewrite · OS theme · desk schema · `/design-system` merge · Fiverr-green accent |
| **Bugfix / typo / one-file maintenance** | `context/code-standards.md` + the file | The broken file only | Drive-by refactors |
| **Cleanup / deletes** | `context/architecture.md` invariants | Only what the approved spec lists | “While we’re here” |

## Default living paths

```
src/components/rdx/          marketing + desk admin
src/content/rdx/             marketing / desk copy
src/styles/rdx/tokens.css    marketing tokens
src/app/(os)/os/             OS routes
src/components/os/           OS UI
src/lib/os/                  OS logic
brand/                       Brand HQ source of truth (`BRAND.md` + `brand.json`)
public/brand/                served logos / OG (do not invent a second tree)
supabase/migrations/         SQL (founder OK)
specs/                       new work starts here
```

## Stop and ask

- Product unclear (marketing vs desk vs OS)
- Need a new npm package or env var
- Schema / migration
- Anything that contradicts a locked doc
- Spec would be larger than one unit — split first
