# Phase 6 — Lead ops setup

Run after deploying Phase 6 code.

## 1. Supabase table

In the Supabase SQL editor, run:

`supabase/migrations/001_rdx_leads.sql`

## 2. Environment variables (`.env.local`)

```bash
# Existing
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Phase 6 — server only (never expose to client)
SUPABASE_SERVICE_ROLE_KEY=

# Admin dashboard — password-only sign-in at /signin
RDX_ADMIN_PASSWORD=              # openssl rand -base64 24
RDX_ADMIN_EMAILS=contact@rajondey.com

# Optional — lead notification emails (uses existing Resend setup)
RESEND_API_KEY=
BUSINESS_EMAIL=contact@rajondey.com
FROM_EMAIL=contact@rajondey.com
```

## 3. Access leads admin

1. Sign in at `/signin` with `RDX_ADMIN_PASSWORD`
2. Open `/dashboard` to view and update lead status

## 4. Form pipeline

`/audit` and `/contact` submit to `POST /api/leads/submit` → Supabase `rdx_leads` + optional Resend notification.

Formspree is no longer used for rdx forms.

## 5. Deferred

- Client magic-link portal
- Automated invoicing (Stripe/Payoneer links stay manual)
