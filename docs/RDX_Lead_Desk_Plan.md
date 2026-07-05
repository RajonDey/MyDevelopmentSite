# RDX Lead Desk — Plan & schema

**Status:** Phase 7 implementation  
**Replaces:** Notion Leads table

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

### Status mapping

| Notion | RDX |
|--------|-----|
| New | `new` |
| In Discussion | `in_discussion` |
| Won | `won` |
| Lost | `lost` |
| (internal items) | `archived` optional |

### Lead kinds

| Kind | Use |
|------|-----|
| `lead` | Real prospects / clients |
| `task` | Internal ops (Check Old Clients, Share TrustPilot) |
| `idea` | Product ideas (Invoice Generator was migrated as idea) |

---

## Migrations (run in order)

1. `001_rdx_leads.sql` — base table (done)
2. `002_rdx_leads_workflow.sql` — notes, next_step, last_contact, expanded statuses
3. `003_rdx_invoices.sql` — per-lead invoicing
4. `004_seed_notion_leads.sql` — import 8 rows from Notion screenshot
5. `005_lead_billing.sql` — billing name, address, client region
6. `006_invoices_v2.sql` — projects table, dual currency, bill-to snapshot
7. `007_seed_shuvvo_invoices.sql` — Shuvvo billing, HICU project, 8 invoices
8. `008_reseed_shuvvo_flexible.sql` — re-seed if lead was renamed before 007 ran

Re-run `004` is safe — skips duplicates by `agency_name` + `source = notion-import`.

---

## CRUD surface

| Action | API | UI |
|--------|-----|-----|
| List leads | `GET /api/leads` | Lead desk table |
| Report | `GET /api/leads?report=1` | Stats cards |
| Get lead | `GET /api/leads/[id]` | Side panel |
| Create (manual) | `POST /api/leads` | Add lead form |
| Update | `PATCH /api/leads` | Side panel save |
| Delete | `DELETE /api/leads/[id]` | Side panel |
| Public submit | `POST /api/leads/submit` | /start forms |

### Invoices

| Action | API |
|--------|-----|
| List | `GET /api/invoices?leadId=` |
| Create | `POST /api/invoices` |
| Update status | `PATCH /api/invoices` |
| Delete | `DELETE /api/invoices?id=` |

Payment methods: `payoneer`, `wise`, `wire`, `bank_transfer_bd`, `other` (no Stripe — BD-friendly).

---

## Reports (built-in)

`GET /api/leads?report=1` returns:

- Total leads
- Count by status / kind / source
- Open pipeline (new + in_discussion)
- Needs follow-up (stale 14d or next_step = follow_up)
- Won count
- Invoice summary: draft / sent / paid, outstanding USD, paid USD
- Per-lead billing: `billingByLead` (paid USD, outstanding, invoice counts)

---

## Invoicing workflow (manual, v1)

```text
Lead won or scoped
  → Create draft invoice in dashboard
  → Mark sent (after Payoneer/Wise request)
  → Mark paid when received
```

**Phase 7b (in progress):** See [RDX_Lead_Desk_Phase7b_Plan.md](./RDX_Lead_Desk_Phase7b_Plan.md)

- Standard invoice numbers (`RDX-YYYY-NNNN`)
- Dual currency (USD + BDT), flexible line items
- PDF export (`@react-pdf/renderer`)
- Project docs + lead billing identity
- Shuvvo / Hexas invoice seed

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

---

## Out of scope

- Notion API sync
- Client portal
- Stripe checkout
- Full accounting (QuickBooks)

---

*June 2026*
