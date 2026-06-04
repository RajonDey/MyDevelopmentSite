# Phase 7 — Admin & backend (deferred plan)

**When:** After v1 launch on `development.rajondey.com` (Phase F complete).  
**Goal:** Leads in Supabase + `/dashboard` for your team — not required for first live traffic if Resend works.

---

## Prerequisites

- [ ] v1 live and `/start` tested with Resend on production
- [ ] Supabase project created
- [ ] Resend domain verified for `FROM_EMAIL`

---

## Implementation steps

| Step | Task | Reference |
|------|------|-----------|
| 1 | Run `supabase/migrations/001_rdx_leads.sql` | [RDX_Phase6_Setup.md](./RDX_Phase6_Setup.md) |
| 2 | Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` on prod | `.env.example` |
| 3 | Set `RDX_ADMIN_EMAILS` (comma-separated) | Dashboard access |
| 4 | Verify `POST /api/leads/submit` → row in `rdx_leads` | Already wired when Supabase env present |
| 5 | Protect `/dashboard` — auth + admin email allowlist | `src/app/dashboard/` |
| 6 | Prod test: submit → DB row + admin email + confirmation | Sign-off |

---

## Behavior today (without Supabase)

1. Client posts to `/api/leads/submit`
2. If `RESEND_API_KEY` set → emails only (`mode: "email"`)
3. If Resend missing → 503 → client falls back to Formspree

No code change needed for v1 if email path works.

---

## Out of scope for Phase 7

- Client portal / invoicing
- HubSpot auto-sync (manual or Zapier later)
- Blog CMS migration

---

*Draft — June 2026. Start after `rdx-v1-launch` tag.*
