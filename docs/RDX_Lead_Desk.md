# RDX Lead Desk

**Status:** Shipped (Phase 7 + 7b + 7c)  
**Replaces:** Notion Leads table  
**UI:** `/dashboard` (admin)

---

## Notion → RDX field map

| Notion column | RDX field | Notes |
|---------------|-----------|-------|
| Name | `agency_name` | Primary label |
| Contact Email | `email` | Nullable for tasks |
| Lead Source | `source` / `payload.lead_source` | e.g. Friend, website |
| Next Step | `next_step` | follow_up, send_proposal, … |
| Status | `status` | new, in_discussion, won, lost, archived |
| Last Contact | `last_contact_at` | timestamptz |
| Notes | `notes` | Free text |

### Status / kind

| Notion | RDX |
|--------|-----|
| New | `new` |
| In Discussion | `in_discussion` |
| Won | `won` |
| Lost | `lost` |

| Kind | Use |
|------|-----|
| `lead` | Prospects / clients |
| `task` | Internal ops |
| `idea` | Product ideas |

---

## Migrations (run in order)

1. `001_rdx_leads.sql` — base table
2. `002_rdx_leads_workflow.sql` — notes, next_step, last_contact, statuses
3. `003_rdx_invoices.sql` — per-lead invoicing
4. `004_seed_notion_leads.sql` — Notion import (skips dupes by `agency_name` + `source = notion-import`)
5. `005_lead_billing.sql` — billing name, address, client region
6. `006_invoices_v2.sql` — projects, dual currency, bill-to snapshot
7. `007_seed_shuvvo_invoices.sql` — Shuvvo / Hexas invoices
8. `008_reseed_shuvvo_flexible.sql` — re-seed if lead renamed before 007

---

## CRUD / API

| Action | API | UI |
|--------|-----|-----|
| List / report | `GET /api/leads` · `?report=1` | Lead desk + stats |
| Get / create / update / delete | `GET|POST|PATCH|DELETE /api/leads` | Side panel |
| Public submit | `POST /api/leads/submit` | `/start` |
| Invoices | `GET|POST|PATCH|DELETE /api/invoices` | Invoice editor |
| PDF | `GET /api/invoices/[id]/pdf` | Admin download |

**Payment methods:** `payoneer`, `wise`, `wire`, `bank_transfer_bd`, `other` (no Stripe).

**Delete policy:** Hard delete only when no sent/paid invoices; otherwise archive.

---

## Reports

`GET /api/leads?report=1` returns:

- Totals by status / kind / source
- Open pipeline (new + in_discussion)
- Needs follow-up (stale 14d or `next_step = follow_up`)
- Won count
- Invoice summary: draft / sent / paid, outstanding + paid USD
- `billingByLead` for table revenue columns

---

## Invoicing

```text
Lead won or scoped
  → Create draft invoice
  → Mark sent (after Payoneer/Wise/bank request)
  → Mark paid when received
```

### Invoice numbering

```text
RDX-YYYY-NNNN
```

Also stored: `legacy_ref` (Notion ID), `billing_period` (e.g. "Aug 2025").

### Dual currency

| Storage | Use |
|---------|-----|
| `amount_usd` | Canonical for dashboard totals |
| `amount_bdt` | BD client totals on PDF |
| `usd_bdt_rate` | Locked at issue (no live FX) |

**PDF:** `@react-pdf/renderer` — USD + BDT when both exist; BD clients get Bank Asia block from `src/content/rdx/invoice-settings.ts`.

### Line items shape

```ts
{
  description: string;
  quantity?: number;
  unit?: "hours" | "fixed";
  unitRateUsd?: number;
  amountUsd: number;
}
```

No default hourly rate — enter per line.

### Schema highlights

**`rdx_leads` billing:** `billing_name`, `billing_address`, `client_region` (`bd` | `international`)

**`rdx_invoices`:** `legacy_ref`, `billing_period`, `project_id`, bill-to snapshot on **sent**, `amount_bdt`, `usd_bdt_rate`, `payment_method`

**`rdx_projects`:** title, summary, notes, links JSON, status (active / completed / archived)

These are **client projects** (delivery / billing context). They are **not** RDX OS team projects (`os_projects`). Do not merge schemas. Future OS sync is optional one-way link only — see [RDX_OS_Spec.md](./RDX_OS_Spec.md) §3.1 and [PRODUCTS.md](./PRODUCTS.md).

Draft bill-to from lead; **sent/paid** uses snapshot — renaming lead does not change sent PDFs.

---

## Seeded Notion rows (004)

| Name | Status | Kind |
|------|--------|------|
| Shuvvo - Pujhons Vai | won | lead |
| Joyanto | won | lead |
| Check Old Clients | new | task |
| Invoice Generator & Payment Tracker | new | idea |
| Halliburton Roofing | in_discussion | lead |
| Jaber's Business Site | new | lead |
| Share TrustPilot | new | task |
| Shishir Tex Site | new | lead |

### Shuvvo / Hexas invoices (007)

**Billing:** Hexas · Sylhet · `client_region = bd` · `bank_transfer_bd`

| Legacy ref | RDX number | Period | Amount | Status |
|------------|------------|--------|--------|--------|
| `2025AUG3102` | `RDX-2025-0001` | Aug 2025 | USD 770 | paid |
| `2025SEP3001` | `RDX-2025-0002` | Sep 2025 | USD 660 | paid |
| `2025OCT3103` | `RDX-2025-0003` | Oct 2025 | USD 650 | paid |
| `2025NOV_DEC3103` | `RDX-2025-0004` | Nov–Dec 2025 | BDT 88,000 | paid |
| `26JAN_FEB` | `RDX-2026-0001` | Jan–Feb 2026 | USD 665 | paid |
| `2026APRIL01` | `RDX-2026-0002` | Apr 2026 | BDT 45,000 | paid |
| `2026MAY04` | `RDX-2026-0003` | May 2026 | BDT 50,000 | paid |
| `2026JUN01` | `RDX-2026-0004` | Jun 2026 | BDT 21,600 | sent |

Migration display rate when deriving missing currency: **122**.

---

## Code map

| Area | Paths |
|------|-------|
| Types | `src/types/rdx/lead.ts`, `invoice.ts`, `project.ts` |
| Lib | `src/lib/leads.ts`, `invoices.ts`, `projects.ts` |
| API | `src/app/api/leads/`, `src/app/api/invoices/`, `src/app/api/projects/` |
| UI | `src/components/rdx/admin/LeadDesk.tsx` |
| Content | `src/content/rdx/invoice-settings.ts`, `lead-desk.ts` |
| Migrations | `supabase/migrations/001_*.sql` … `008_*.sql` |

---

## Out of scope

Notion API sync · client portal · Stripe checkout · live FX · full accounting (QuickBooks) · merging with RDX OS project model · bidirectional OS status sync

---

*Consolidated from Lead Desk Plan + Phase 7b/7c — July 2026 · boundary note July 21, 2026*
