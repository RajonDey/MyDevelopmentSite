# Phase 13 — Sales ops setup

Close the loop after `/start` form submit: confirmation email, admin notify, optional Calendly on thank-you.

**Dashboard / Supabase:** still optional — see [RDX_Phase6_Setup.md](./RDX_Phase6_Setup.md) when ready.

---

## 1. Environment variables (`.env.local`)

```bash
# Required for email pipeline (admin + lead confirmation)
RESEND_API_KEY=re_...

# Where admin notifications go
BUSINESS_EMAIL=contact@rajondey.com
FROM_EMAIL=contact@rajondey.com

# Calendly booking link (public — safe in client)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/rajondey
```

If `RESEND_API_KEY` is missing, the API falls back to Formspree (submit only — no auto confirmation emails).

---

## 2. What happens on submit

| Step | Action |
|------|--------|
| 1 | Lead validated via `POST /api/leads/submit` |
| 2 | **Admin email** — full payload + QUALIFIED tag when budget ≥ $1.5K band |
| 3 | **Lead confirmation email** — SLA + prep questions; Calendly link if qualified |
| 4 | Redirect to `/thank-you?type=start` (+ `&qualified=1` when band is $1.5K+) |
| 5 | Thank-you page shows **Calendly embed** for qualified leads only |

### Qualification rule

Review call offered when budget band is:

- `$1.5K–$3K` · `$3K–$5K` · `$5K+`

(Lower bands get email-only follow-up within 1 business day.)

---

## 3. Reply SLA

**Locked:** reply within **1 business day** — stated on thank-you page and in confirmation email.

---

## 4. Manual test checklist

1. Set `RESEND_API_KEY` + `BUSINESS_EMAIL` in `.env.local`
2. Submit `/start` with Standard-tier scope (budget $1.5K+)
3. Confirm admin inbox + submitter inbox receive emails
4. Thank-you page shows Calendly block
5. Book a test Calendly slot
6. Repeat with Starter band — no Calendly on thank-you, confirmation email without booking link

---

## 5. Code map

| File | Purpose |
|------|---------|
| `src/lib/lead-qualification.ts` | Budget → qualified for call |
| `src/lib/lead-notifications.ts` | Admin + confirmation emails |
| `src/content/rdx/sales-ops.ts` | Copy, prep questions, Calendly URL |
| `src/components/rdx/sections/CalendlyBooking.tsx` | Thank-you embed |
| `src/app/thank-you/page.tsx` | Qualified vs standard UX |

---

*Phase 13 — June 2026*
