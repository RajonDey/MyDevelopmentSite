# RDX Lead Desk — Phase 7b Plan

**Status:** Phase 7b complete (July 2026)  
**Lead:** Shuvvo - Pujhons Vai  
**Bill-to (all invoices):** Hexas · Sylhet · `client_region = bd`

---

## Goals

1. **Project docs** — short notes + links per lead (optional `rdx_projects`)
2. **Lead rename + billing identity** — display name, contact, bill-to name/address, region
3. **Invoicing v2** — standard numbering, flexible line items, USD + BDT, PDF export
4. **Seed Shuvvo history** — 8 invoices from Notion → RDX numbers

---

## Invoice numbering standard

**New invoices only:**

```text
RDX-YYYY-NNNN
```

| Part | Meaning | Example |
|------|---------|---------|
| `RDX` | Brand | RDX |
| `YYYY` | Issue year | 2026 |
| `NNNN` | Sequence per year | 0001, 0002, … |

**Also stored (not shown as primary on PDF):**

| Field | Purpose |
|-------|---------|
| `legacy_ref` | Old Notion ID for search / migration |
| `billing_period` | Human label, e.g. "Aug 2025", "Nov–Dec 2025" |

---

## Schema changes

### `rdx_leads` — add columns (`005_lead_billing.sql`)

| Column | Type | Notes |
|--------|------|-------|
| `billing_name` | text | Default from `agency_name`; Shuvvo → **Hexas** |
| `billing_address` | text | Shuvvo → **Sylhet** |
| `client_region` | text | `bd` \| `international` |

### `rdx_invoices` — extend (`006_invoices_v2.sql`)

| Column | Type | Notes |
|--------|------|-------|
| `legacy_ref` | text | Nullable; unique when set |
| `billing_period` | text | Nullable |
| `project_id` | uuid | FK → `rdx_projects`, nullable |
| `bill_to_name` | text | Snapshot on **sent** |
| `bill_to_address` | text | Snapshot on **sent** |
| `amount_bdt` | integer | Nullable; whole taka |
| `usd_bdt_rate` | numeric | Manual rate at issue |
| `client_region` | text | Copy from lead or override |
| `payment_method` | text | Add `bank_transfer_bd` |

Line items JSON:

```ts
{
  description: string;
  quantity?: number;
  unit?: "hours" | "fixed";
  unitRateUsd?: number;
  amountUsd: number;
}
```

No default hourly rate — enter per line ($8–10 BD, $20–30 international).

### `rdx_projects` — new (`006_invoices_v2.sql`)

| Column | Purpose |
|--------|---------|
| `lead_id` | FK |
| `title` | e.g. "HICU Platform" |
| `summary` | Short scope |
| `notes` | Internal |
| `links` | JSON `{ repo, staging, figma, … }` |
| `status` | active / completed / archived |

---

## Dual currency rules

| Storage | Use |
|---------|-----|
| `amount_usd` | Canonical for dashboard totals / reports |
| `amount_bdt` | BD client totals on PDF |
| `usd_bdt_rate` | Rate locked at issue (no live FX API) |

**PDF:** Show USD + BDT when both exist. BD clients get Bank Asia block from `src/content/rdx/invoice-settings.ts`.

**Seed note:** When only one currency was provided historically, derive the other using rate **122** (rounded) for migration display only — editable after import.

---

## PDF export

**Package:** `@react-pdf/renderer` (founder-approved for 7b)

**Route:** `GET /api/invoices/[id]/pdf` (admin-only)

**Layout:** RDX Technologies header · bill-to · invoice # · billing period · dates · line items · USD + BDT totals · payment block · contact footer.

---

## UI changes (Lead Desk)

### Lead panel

- Edit: display name, contact, billing name, address, region
- Projects section (title, summary, notes, links)
- Invoices: full editor (line items, dual currency, billing period, PDF download)

### Correlation

- Invoice list → links to lead
- Draft bill-to from lead; **sent/paid** uses snapshot
- Renaming lead does not change sent PDFs

---

## Shuvvo seed data (confirmed)

**Lead lookup:** `agency_name = 'Shuvvo - Pujhons Vai'`  
**Billing:** Hexas · Sylhet · region `bd`  
**Payment method (seed):** `bank_transfer_bd`  
**Project (optional):** "HICU Platform"

### Legacy → RDX mapping

| # | Legacy ref | RDX number | Billing period | Primary amount | Status | Notes |
|---|------------|------------|----------------|----------------|--------|-------|
| 1 | `2025AUG3102` | `RDX-2025-0001` | Aug 2025 | **USD 770** | paid | |
| 2 | `2025SEP3001` | `RDX-2025-0002` | Sep 2025 | **USD 660** | paid | |
| 3 | `2025OCT3103` | `RDX-2025-0003` | Oct 2025 | **USD 650** | paid | ⚠️ See ambiguity below |
| 4 | `2025NOV_DEC3103` | `RDX-2025-0004` | Nov–Dec 2025 | **BDT 88,000** | paid | ~USD 722 @ 122 |
| 5 | `26JAN_FEB` | `RDX-2026-0001` | Jan–Feb 2026 | **USD 665** | paid | |
| 6 | `2026APRIL01` | `RDX-2026-0002` | Apr 2026 | **BDT 45,000** | paid | ~USD 369 @ 122 |
| 7 | `2026MAY04` | `RDX-2026-0003` | May 2026 | **BDT 50,000** | paid | ~USD 410 @ 122 |
| 8 | `2026JUN01` | `RDX-2026-0004` | Jun 2026 | **BDT 21,600** | **sent** | Unpaid; PDF breakdown exists |

**Line items for #8 (from reference PDF):**

- Development: 22 hrs × $8/hr → USD 176
- Classes (HICU): 14.5 hrs (detail in PDF)
- Total BDT 21,600 · USD 176 on original PDF

### Ambiguity — please confirm before seed SQL

You listed **`2025AUG3102` twice** (USD 770 and USD 650). The Notion screenshot also has **`2025OCT3103`** with no amount.

**Assumption for seed (unless you correct):**

| Legacy | Amount |
|--------|--------|
| `2025AUG3102` | USD **770** |
| `2025OCT3103` | USD **650** (you may have mistyped legacy ID on the second AUG line) |

If both amounts are truly August invoices, we will use:

- `RDX-2025-0001` → `2025AUG3102-a` legacy USD 770
- `RDX-2025-0001b` or renumber → second August USD 650

Reply **"AUG 770 + OCT 650"** or **"two August invoices"** to lock seed migration.

---

## Implementation order

| Step | Deliverable |
|------|-------------|
| 7b.1 | `005_lead_billing.sql` + lead name/billing UI | ✅ Done |
| 7b.2 | `006_invoices_v2.sql` + projects table + API | ✅ Done |
| 7b.3 | Invoice editor (line items, dual currency) | ✅ Done |
| 7b.4 | `@react-pdf/renderer` + PDF route | ✅ Done |
| 7b.5 | Projects UI in lead panel | ✅ Done |
| 7b.6 | `007_seed_shuvvo_invoices.sql` + remove `public/_references/` | ✅ Done |
| 7c.5 | `008_reseed_shuvvo_flexible.sql` — seed after lead rename to Hexas | ✅ Done |

---

## Files to touch

- `supabase/migrations/005_*.sql` … `007_*.sql`
- `src/types/rdx/lead.ts`, `invoice.ts`, `project.ts`
- `src/lib/leads.ts`, `invoices.ts`, `projects.ts`
- `src/app/api/invoices/[id]/pdf/route.ts`, `src/app/api/projects/`
- `src/components/rdx/admin/LeadDesk.tsx` (+ split if needed)
- `src/content/rdx/invoice-settings.ts`, `lead-desk.ts`
- `docs/RDX_Lead_Desk_Plan.md` — link to this doc

---

## Out of scope

Stripe · client portal · Notion sync · live FX · default hourly rates · rigid service categories

---

## Phase 7c — QA + reporting polish (July 2026)

| Step | Deliverable | Status |
|------|-------------|--------|
| 7c.1 | Fix lead delete (guard + cascade + API errors) | ✅ Done |
| 7c.2 | Global + per-lead billing summaries | ✅ Done |
| 7c.3 | Expanded stats cards + client summary strip | ✅ Done |
| 7c.4 | Tabbed side panel + archive-over-delete UX | ✅ Done |

**Delete policy:** Hard delete only when no sent/paid invoices; archive otherwise.

**Report additions:** `billingByLead` on `GET /api/leads?report=1` for table revenue columns.

---

*July 2026 — seed amounts confirmed by founder*
