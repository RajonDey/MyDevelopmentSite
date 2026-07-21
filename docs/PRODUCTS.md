# RDX — Products in this repo

This repository holds **three products**. They share one Next.js app and deploy, but they are **not the same product**. Always know which one you are changing.

**Do not put secrets here** — no API keys, passwords, client invoice amounts, bank details, or private pipeline notes. Those stay in env / password manager / private notes.

---

## At a glance

| Product | Audience | Job | Entry | Status |
|---------|----------|-----|-------|--------|
| **1. Marketing site** | Public (agencies / prospects) | Credibility + `/start` | `/`, `/services`, `/work`, `/start` | Shipped · launch Phase F open |
| **2. Lead Desk** | Founder / ops (admin) | **Client projects management** — leads, invoices, billing, client notes | `/dashboard` (via `/signin`) | Shipped · prod Supabase optional |
| **3. RDX OS** | Internal team | **Team management** — North Star, goals, capacity, rituals | `/os` | Phase 1 · real seed + magic link |

```text
Prospect  →  Marketing site (/start)
                ↓
            Lead Desk (/dashboard)  — client / revenue ops
Team      →  RDX OS (/os)           — team execution & rhythm
```

Lead Desk and OS are **both internal**, but they solve different jobs. Do not merge UI or data models.

**“Project” means two different things**

| Name in UI | Product | Table (when live) | Owns |
|------------|---------|-------------------|------|
| **Client project** | Lead Desk | `rdx_projects` | Delivery notes, links to invoices / lead |
| **Team project** | RDX OS | `os_projects` | Priority, owner, capacity, objective link |

**Sync policy (locked):** one-way **link** for client work (`client_linked` → Desk); internal work (IELTS, papers, YouTube) lives richly in OS. No merged schema, no bidirectional status sync. Details: [RDX_OS_Spec.md](./RDX_OS_Spec.md) §3.1 · §12.

---

## 1. Marketing site (public)

| | |
|--|--|
| **Job** | Credibility for outbound — convert warm traffic via `/start` |
| **Routes** | `/`, `/services/*`, `/work/*`, `/process`, `/about`, `/retainer`, `/start`, `/thank-you`, `/for-agencies`, blog, legal |
| **Code** | `src/components/rdx/` (marketing), `src/content/rdx/`, `src/styles/rdx/` |
| **Docs** | [Strategic Decisions](./RDX_Strategic_Decisions_and_Phase_Plan.md) · [Pricing](./RDX_Services_and_Pricing.md) · [Copy Bank](./RDX_Content_Copy_Bank.md) · [Launch Runbook](./RDX_Launch_Runbook.md) · [Ops](./RDX_Ops_Reference.md) · [SEO](./RDX_SEO_and_AI_Discoverability.md) |

Forms post to `POST /api/leads/submit` → email (Resend) and optionally Supabase.

---

## 2. Lead Desk (admin ops)

| | |
|--|--|
| **Job** | Client projects management — replace Notion for leads, invoices, client project notes, billing |
| **Routes** | `/signin` → `/dashboard` (noindex) |
| **Code** | `src/components/rdx/admin/`, `src/app/api/leads/`, `src/app/api/invoices/`, `src/app/api/projects/`, `supabase/migrations/` |
| **Docs** | [RDX_Lead_Desk.md](./RDX_Lead_Desk.md) · [Ops Reference](./RDX_Ops_Reference.md) (env + admin enablement) |

**Env (names only):** `SUPABASE_*`, `RDX_ADMIN_PASSWORD`, `RDX_ADMIN_EMAILS`, `RESEND_API_KEY`, `BUSINESS_EMAIL`, `FROM_EMAIL` — values in `.env` / host, never in docs.

---

## 3. RDX OS (team OS)

| | |
|--|--|
| **Job** | Team management — north star, pillars, objectives, team projects, capacity, rituals |
| **Routes** | `/os` and nested OS routes (isolated app zone) |
| **Code** | `src/app/(os)/os/`, `src/components/os/` — **do not** put OS UI under `components/rdx/` |
| **Docs** | [RDX_OS_Spec.md](./RDX_OS_Spec.md) |

Separate from Lead Desk: OS = team execution; Lead Desk = client/revenue ops. Do not reuse `rdx_*` tables for OS.

---

## Shared vs isolated

| Shared | Isolated |
|--------|----------|
| Next.js app, deploy, auth primitives, Resend patterns | Marketing pages vs `/dashboard` vs `/os` |
| Design tokens where it makes sense | OS components (`os/`) vs rdx marketing (`rdx/`) |
| Repo docs under `docs/` | Lead desk DB schema vs OS schema (when live) |

**Rules of thumb**

1. Public marketing copy → Copy Bank + `content/rdx/`
2. Admin lead/invoice work → Lead Desk docs + `admin/` + APIs
3. Team planning / rituals → OS Spec + `os/` only
4. When unsure which product — ask before mixing folders

---

## Where to start

| You want to… | Open |
|--------------|------|
| Orient yourself | This file |
| Code standards / paths | [Implementation Standards](./RDX_Implementation_Standards.md) |
| Agent session protocol | [Agent Workflow](./RDX_Agent_Workflow.md) |
| Ship production | [Launch Runbook](./RDX_Launch_Runbook.md) |
| Full doc index | [README.md](./README.md) |

---

*GitHub-safe product map — July 2026*
