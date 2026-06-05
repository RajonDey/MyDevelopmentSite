# Phase F — Deploy & launch sign-off

**Site (v1):** https://development.rajondey.com  
**Email:** contact@rajondey.com  
**Calendly:** https://calendly.com/rajondey

Run this after merging Phases A–E. Admin/Supabase is **not** required for v1 if Resend is configured.

---

## 1. Pre-deploy (local)

```bash
npm run prelaunch
```

Checks: `lint` → `typecheck` → `build`.

---

## 2. Production environment

Set on your host (Vercel, etc.) — copy from `.env.example`:

| Variable | Required v1 | Notes |
|----------|-------------|--------|
| `RESEND_API_KEY` | **Yes** | Without it, `/api/leads/submit` returns 503 → Formspree fallback on client |
| `BUSINESS_EMAIL` | Yes | `contact@rajondey.com` |
| `FROM_EMAIL` | Yes | Must be a verified Resend sender domain |
| `NEXT_PUBLIC_CALENDLY_URL` | Yes | `https://calendly.com/rajondey` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://development.rajondey.com` |

**Optional (Phase 7 — not blocking v1):**

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RDX_ADMIN_EMAILS`

---

## 3. Deploy

1. Push to your production branch / trigger deploy.
2. Confirm build succeeds on the host dashboard.
3. Hard-refresh or purge CDN cache if assets look stale.

---

## 4. Smoke test (15 min)

| # | URL | Pass? |
|---|-----|-------|
| 1 | `/` | Hero, work teaser, CTA → `/start` |
| 2 | `/start` | Scope step + form submit |
| 3 | `/thank-you?qualified=1` | Calendly widget loads |
| 4 | `/work` + `/work/harlig-stad` | Images, scroll frames, reviews link |
| 5 | `/services/agency-website` | Tiers visible |
| 6 | `/hire`, `/portfolio` | Redirect to `/start` or `/work` |
| 7 | `/privacy-policy`, `/terms-of-service` | RDX / form data mentioned |

### Form submit test

1. Open `/start` on **production** (not localhost).
2. Complete scope + contact (use a real inbox you control).
3. Expect:
   - Redirect to `/thank-you` (with `&qualified=1` if budget band qualifies).
   - **Admin email** to `contact@rajondey.com`.
   - **Confirmation email** to the address you entered.
4. If submit fails: check host logs for Resend errors; verify `FROM_EMAIL` domain in Resend.

---

## 5. Lighthouse (mobile)

On production homepage:

```bash
npx lighthouse https://development.rajondey.com \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile \
  --chrome-flags="--headless"
```

**Target:** Performance ≥ 85 (Phase 15). Large work PNGs are compressed; hero LCP may still depend on OG/fonts.

---

## 6. Launch tag (when satisfied)

```bash
git tag -a rdx-v1-launch -m "RDX Technologies site v1 — development.rajondey.com"
git push origin rdx-v1-launch
```

Only run when you are ready to mark production live.

---

## 7. Post-launch (optional)

- [ ] Submit sitemap in Google Search Console: `https://development.rajondey.com/sitemap.xml`
- [ ] Share `/work/harlig-stad` + Google reviews in outbound
- [ ] Plan Phase 7 (Supabase + `/dashboard`) — see [RDX_Launch_Plan.md](./RDX_Launch_Plan.md)

---

*Phase F — June 2026*
