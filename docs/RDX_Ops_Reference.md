# RDX Ops Reference

Operational reference for forms, email, campaigns, redirects, and admin. For launch sign-off see [RDX_Launch_Runbook.md](./RDX_Launch_Runbook.md). For lead desk schema see [RDX_Lead_Desk.md](./RDX_Lead_Desk.md).

---

## Environment variables

### Required for v1 (email pipeline)

```bash
RESEND_API_KEY=
BUSINESS_EMAIL=contact@rajondey.com
FROM_EMAIL=contact@rajondey.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/rajondey
NEXT_PUBLIC_SITE_URL=https://development.rajondey.com
```

If `RESEND_API_KEY` is missing: API returns 503 → client may fall back to Formspree (submit only — no confirmation emails).

### Optional — Supabase + admin dashboard

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # server only
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
RDX_ADMIN_PASSWORD=            # openssl rand -base64 24
RDX_ADMIN_EMAILS=contact@rajondey.com
```

### Optional — RDX OS (internal team)

```bash
# Core allowlist — only these emails may sign in to /os
RDX_OS_TEAM_EMAILS=rajondeyofficial@gmail.com,gourobdn15@gmail.com
# Both founders are admins (full control)
RDX_OS_ADMIN_EMAILS=rajondeyofficial@gmail.com,gourobdn15@gmail.com
```

Phase 0.5 used a mock allowlist gate on `/os/signin`. Phase 1 uses **magic link** via Resend (`POST /api/os/auth/request` → `/os/verify`) against §12 members / `RDX_OS_TEAM_EMAILS`. Lead Desk password sessions do **not** grant `/os` (`osAccess` vs `deskAccess` claims). Apply `supabase/migrations/010_os_core.sql` for schema + real seed + `os_magic_tokens`.

---

## Form → email → thank-you

| Step | Action |
|------|--------|
| 1 | Lead validated via `POST /api/leads/submit` |
| 2 | **Admin email** — full payload + QUALIFIED tag when budget ≥ $1.5K band |
| 3 | **Lead confirmation** — SLA + prep questions; Calendly link if qualified |
| 4 | Redirect to `/thank-you?type=start` (+ `&qualified=1` when band is $1.5K+) |
| 5 | Thank-you shows **Calendly embed** for qualified leads only |

### Qualification rule

Review call offered for budget bands: `$1.5K–$3K` · `$3K–$5K` · `$5K+`  
Lower bands: email-only follow-up within **1 business day**.

### Code map

| File | Purpose |
|------|---------|
| `src/lib/lead-qualification.ts` | Budget → qualified for call |
| `src/lib/lead-notifications.ts` | Admin + confirmation emails |
| `src/content/rdx/sales-ops.ts` | Copy, prep questions, Calendly URL |
| `src/components/rdx/sections/CalendlyBooking.tsx` | Thank-you embed |
| `src/app/thank-you/page.tsx` | Qualified vs standard UX |

---

## Campaign landers

Outbound-only, **not in main nav**, **noindexed**.

| URL | Use |
|-----|-----|
| `/for-agencies` | Cold email / LinkedIn for US marketing agencies |

**A/B:** `?v=b` for alternate headline.

Example:

```
https://development.rajondey.com/for-agencies?utm_source=email&utm_medium=outbound&utm_campaign=agencies-q2-2026
```

CTA forwards UTMs to `/start` and sets `source=for-agencies`.

### Start form prefill

```
/start?need=website&source=for-agencies&utm_source=email&utm_campaign=agencies-q2-2026
```

| Param | Purpose |
|-------|---------|
| `need` | `website` · `automation` · `both` |
| `source` | Stored as `lead_source` |
| `utm_*` | Hidden fields |
| `v` | Copy variant (`a` / `b`) |

### Analytics events

| Event | When |
|-------|------|
| `rdx_campaign_page_view` | Lander viewed |
| `rdx_campaign_cta_click` | Lander CTA |
| `rdx_start_page_view` | `/start` viewed |
| `rdx_start_form_submit` | Form submitted |

### Code map

| File | Purpose |
|------|---------|
| `src/app/for-agencies/page.tsx` | Campaign route (noindex) |
| `src/content/rdx/campaigns.ts` | Copy + A/B |
| `src/lib/campaign-attribution.ts` | UTM helpers |
| `src/components/rdx/sections/campaign/*` | Lander UI |
| `src/components/rdx/forms/UnifiedStartForm.tsx` | Hidden attribution |

**New lander:** add content in `campaigns.ts`, create `src/app/<slug>/page.tsx`, keep `robots: { index: false }` unless it becomes a permanent SEO page.

---

## Redirects (legacy → funnel)

Configured in `next.config.ts`:

| From | To |
|------|-----|
| `/audit`, `/contact`, `/hire` | `/start` |
| `/estimate`, `/order` | `/start?step=scope` |
| `/portfolio`, `/portfolio/*` | `/work` |
| `/learn`, `/learn/*` | `/blog` |
| `/home` | `/` |
| `/projects` | `/portfolio` → `/work` |

App-level redirects also on `/audit`, `/contact`, `/estimate` pages.

---

## Primary routes (smoke)

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/start` | Unified conversion |
| `/services` + detail pages | Pricing |
| `/work` + case studies | Trust |
| `/process`, `/about`, `/retainer` | Trust |
| `/thank-you` | Post-submit (noindex) |
| `/for-agencies` | Campaign (noindex) |
| `/privacy-policy`, `/terms-of-service` | Legal |

---

## Prod admin enablement (deferred)

**When:** After `rdx-v1-launch` and Resend proven on production.

| Step | Task |
|------|------|
| 1 | Run lead desk migrations — [RDX_Lead_Desk.md](./RDX_Lead_Desk.md) |
| 2 | Set Supabase + `RDX_ADMIN_EMAILS` on prod |
| 3 | Verify submit → row in `rdx_leads` |
| 4 | Sign in at `/signin` → `/dashboard` |
| 5 | Prod test: submit → DB + emails |

**Without Supabase today:** emails only (`mode: "email"`) when Resend is set.

**Out of scope for admin enablement:** client portal, HubSpot auto-sync, Stripe checkout.

---

## Access lead desk (local / when configured)

1. Sign in at `/signin` with `RDX_ADMIN_PASSWORD`
2. Open `/dashboard`

---

*Consolidated from Phase 6/13/14/15 setup + Phase 7 Admin — July 2026*
