# RDX Launch Runbook

**Site (v1):** https://rdxhive.com  
**Public email:** hello@rdxhive.com  
**Sales inbox:** sales@rdxhive.com  
**Resend FROM:** contact@rajondey.com (free plan — rdxhive.com not verified yet)  
**Calendly:** https://calendly.com/rajondey

Marketing revamp Phases 0–15 are shipped in repo. This doc is the remaining **founder launch sign-off**.

---

## Status

| Track | Status |
|-------|--------|
| Phases A–E (trust, copy, assets, legacy redirects, docs) | Done |
| Phase F — deploy + prod smoke + tag | **Open** |
| Prod Supabase `/dashboard` | Deferred — see [RDX_Ops_Reference.md](./RDX_Ops_Reference.md) |

---

## Founder sign-off (Phase F)

- [x] `npm run prelaunch` locally (lint + typecheck + build)
- [ ] Deploy to `rdxhive.com`
- [ ] Prod `/start` submit → admin + confirmation emails + thank-you (+ Calendly if qualified)
- [ ] Lighthouse mobile ≥ 85 on prod homepage
- [ ] `git tag rdx-v1-launch` when ready

---

## 1. Pre-deploy (local)

```bash
npm run prelaunch
```

---

## 2. Production environment

Set on host (Vercel, etc.) — see `.env.example`:

| Variable | Required v1 | Notes |
|----------|-------------|--------|
| `RESEND_API_KEY` | **Yes** | Without it, submit returns 503 → Formspree fallback |
| `BUSINESS_EMAIL` | Yes | `sales@rdxhive.com` |
| `FROM_EMAIL` | Yes | Verified Resend sender (`contact@rajondey.com` until rdxhive.com is verified) |
| `NEXT_PUBLIC_CALENDLY_URL` | Yes | `https://calendly.com/rajondey` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://rdxhive.com` |

**Optional (not blocking v1):** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RDX_ADMIN_EMAILS`

---

## 3. Deploy

1. Push production branch / trigger deploy
2. Confirm host build succeeds
3. Hard-refresh or purge CDN if assets look stale

---

## 4. Smoke test (~15 min)

| # | URL | Pass? |
|---|-----|-------|
| 1 | `/` | Hero, work teaser, CTA → `/start` |
| 2 | `/start` | Scope step + form submit |
| 3 | `/thank-you?qualified=1` | Calendly widget loads |
| 4 | `/work` + `/work/harlig-stad` | Images, reviews link |
| 5 | `/services/agency-website` | Tiers visible |
| 6 | `/hire`, `/portfolio` | Redirect to `/start` or `/work` |
| 7 | `/privacy-policy`, `/terms-of-service` | RDXHIVE / form data mentioned |

### Form submit

1. Open `/start` on **production**
2. Complete scope + contact (real inbox you control)
3. Expect: redirect to `/thank-you`, admin email, confirmation email
4. On failure: check host logs + Resend `FROM_EMAIL` domain

---

## 5. Lighthouse (mobile)

```bash
npx lighthouse https://rdxhive.com \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile \
  --chrome-flags="--headless"
```

**Target:** Performance ≥ 85. Known weight: GTM + Umami + Tally + WP media.

---

## 6. Launch tag

```bash
git tag -a rdx-v1-launch -m "RDXHIVE site v1 — rdxhive.com"
git push origin rdx-v1-launch
```

Only when production is verified.

---

## 7. Post-launch (optional)

- [ ] Submit sitemap in GSC: `https://rdxhive.com/sitemap.xml`
- [ ] Share `/work/harlig-stad` + Google reviews in outbound
- [ ] Enable prod Supabase admin when ready — [RDX_Ops_Reference.md](./RDX_Ops_Reference.md)

---

## Deferred (not blocking v1)

- Supabase + `/dashboard` on production
- Verify rdxhive.com on Resend (paid) so FROM can leave rajondey.com
- Blog IA / full sitemap refresh (WP structure)
- Client portal (manual invoicing OK)

---

## Completed A–E (summary)

- Subdomain + email + Calendly kept; `.env.example` documented
- Company-first positioning; agencies as primary wedge
- Work assets compressed to WebP under `public/work/`
- Legacy routes → thin redirects; orphan hire/mock layers removed from `src/`
- Blog rewritten to rdx components; OG uses `/opengraph-image`

---

*Consolidated from Launch Plan, Phase F Deploy, and Readiness Checklist — July 2026*
