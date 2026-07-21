# RDX Technologies — Documentation Hub

**Read this first** before implementation work.

👉 **Three products in this repo:** [PRODUCTS.md](./PRODUCTS.md) — marketing site · Lead Desk · RDX OS.  
👉 **Pricing & services:** [RDX_Services_and_Pricing.md](./RDX_Services_and_Pricing.md) — locked.  
👉 **Launch sign-off:** [RDX_Launch_Runbook.md](./RDX_Launch_Runbook.md) — Phase F open.

---

## Document map

| Doc | Purpose | When to read |
|-----|---------|--------------|
| [PRODUCTS.md](./PRODUCTS.md) | Map of the three products — avoid mixing them | Every session start |
| [RDX_Strategic_Decisions_and_Phase_Plan.md](./RDX_Strategic_Decisions_and_Phase_Plan.md) | Locked decisions — ICP, services, pricing, routes | Positioning / pricing |
| [RDX_Services_and_Pricing.md](./RDX_Services_and_Pricing.md) | Service tiers, inclusions, estimator mapping | Pricing / services UI |
| [RDX_Content_Copy_Bank.md](./RDX_Content_Copy_Bank.md) | Approved messaging, CTAs | Writing UI copy |
| [RDX_Implementation_Standards.md](./RDX_Implementation_Standards.md) | Code quality, living paths, anti–AI-slop | During coding |
| [RDX_Code_Migration_Strategy.md](./RDX_Code_Migration_Strategy.md) | Additive migration / legacy rules | Touching legacy |
| [RDX_Agent_Workflow.md](./RDX_Agent_Workflow.md) | How agents run each session | Agent sessions |
| [RDX_Launch_Runbook.md](./RDX_Launch_Runbook.md) | Deploy, smoke, Lighthouse, launch tag | Before production tag |
| [RDX_Ops_Reference.md](./RDX_Ops_Reference.md) | Env, forms, campaigns, redirects, admin | Ops / env setup |
| [RDX_Lead_Desk.md](./RDX_Lead_Desk.md) | Lead desk schema, invoices, API | Dashboard / Supabase |
| [RDX_SEO_and_AI_Discoverability.md](./RDX_SEO_and_AI_Discoverability.md) | SEO + llms.txt / schema | Discoverability |
| [RDX_OS_Spec.md](./RDX_OS_Spec.md) | Internal team OS (`/os`) — separate product | Before OS work |

---

## Root project files

| File | Purpose |
|------|---------|
| [`../AGENTS.md`](../AGENTS.md) | Agent entry point |
| [`../.cursor/rules/`](../.cursor/rules/) | Cursor rules |
| [`../.agents/skills/rdx-revamp/`](../.agents/skills/rdx-revamp/) | Revamp skill |

---

## Current status

| Item | Status |
|------|--------|
| **Marketing revamp (Phases 0–15)** | Shipped in repo |
| **Launch Phase F** | Open — deploy, prod `/start` test, Lighthouse, `rdx-v1-launch` tag |
| **Lead desk (7 / 7b / 7c)** | Shipped — client projects management · prod Supabase admin optional |
| **RDX OS (internal)** | Phase 1 in progress · real §12 seed in mock + `010_os_core.sql` · magic-link auth wired · [Spec](./RDX_OS_Spec.md) §12 |

### Deferred (not blocking v1)

- Prod Supabase + `/dashboard` enablement
- Custom domain
- Blog IA / full sitemap refresh (WordPress archive structure)

---

## Living code paths

| Path | Use |
|------|-----|
| `src/components/rdx/` | Marketing + admin UI (incl. `rdx/blog/`) |
| `src/content/rdx/` | Typed marketing / ops content |
| `src/styles/rdx/tokens.css` | Design tokens |
| `src/app/(os)/os/` · `src/components/os/` | RDX OS (isolated) |
| `supabase/migrations/` | Lead desk schema |

---

## Quick reference (locked)

- **Brand:** RDX Technologies
- **ICP:** US marketing agencies, 5–20 employees
- **Services:** Agency Website · Lead & CRM Automation
- **Flagship tiers:** **$3,000** (website) · **$2,500** (automation)
- **Range:** **$1,000 – $5,000+**
- **Pricing on site:** Full tiers on `/services`; homepage “From $1,000” only
- **Audit CTA:** Free Website & Workflow Review → `/start`
- **Site role:** Credibility for warm outbound — not primary SEO lead gen
- **Design:** Hallmark `modern-minimal` / Quiet
- **Domain (now):** `development.rajondey.com`

---

## How to start work (human or agent)

1. Read [PRODUCTS.md](./PRODUCTS.md) — which of the three products?
2. Skim this hub — confirm track (maintenance / launch / OS / lead desk)
3. Open the relevant living doc from the map above
4. Follow [RDX_Implementation_Standards.md](./RDX_Implementation_Standards.md) and [RDX_Agent_Workflow.md](./RDX_Agent_Workflow.md)
5. Use copy from [RDX_Content_Copy_Bank.md](./RDX_Content_Copy_Bank.md) — do not invent metrics
6. For launch: complete [RDX_Launch_Runbook.md](./RDX_Launch_Runbook.md)

---

*Last updated: July 21, 2026 — OS Phase 1: real seed + magic-link auth*
