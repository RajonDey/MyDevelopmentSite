# Phase 15 — Final QA & launch sign-off

Pre-launch checklist for RDX Technologies v1 (`development.rajondey.com`).

---

## 1. Build & lint

| Check | Status |
|-------|--------|
| `npm run lint` | ✅ Pass |
| `npm run build` | ✅ Pass (run after each phase; re-run before deploy) |

---

## 2. Redirects (legacy → unified funnel)

Configured in `next.config.ts`:

| From | To |
|------|-----|
| `/audit`, `/contact`, `/hire` | `/start` |
| `/estimate`, `/order` | `/start?step=scope` |
| `/portfolio`, `/portfolio/*` | `/work` |
| `/learn`, `/learn/*` | `/blog` |
| `/home` | `/` |
| `/projects` | `/portfolio` → `/work` (double hop) |

App-level redirects also exist on `/audit`, `/contact`, `/estimate` pages.

---

## 3. Primary routes (manual smoke test)

| Route | Purpose |
|-------|---------|
| `/` | Homepage — Hallmark pass |
| `/start` | Unified conversion |
| `/services` + 3 service detail pages | Pricing & offers |
| `/work` + 2 case studies | Trust |
| `/process`, `/about`, `/retainer` | Trust |
| `/thank-you` | Post-submit (noindex) |
| `/for-agencies` | Campaign lander (noindex, unlisted) |
| `/privacy-policy`, `/terms-of-service` | Legal |

**Footer / nav links:** all point to live RDX routes (no `/audit` or `/contact` in nav).

---

## 4. SEO

| Item | Status |
|------|--------|
| Root metadata + OG | ✅ `layout.tsx` + `siteMetadata` |
| Per-page metadata | ✅ Primary RDX routes export `metadata` |
| Dynamic OG image | ✅ `src/app/opengraph-image.tsx` (replaces missing `/og-image.jpg`) |
| Schema.org | ✅ `ProfessionalService` + offer catalog + contact email |
| Campaign / admin noindex | ✅ `/for-agencies`, `/thank-you`, `/dashboard`, `/design-system` |
| `robots.txt` | ✅ Disallows admin/auth/campaign paths |

**Note:** Legacy `sitemap.xml` route still uses mock data — acceptable for v1; refresh when blog IA is prioritized.

---

## 5. Performance

Run before deploy (production URL or `npm run build && npm run start`):

```bash
npx lighthouse https://development.rajondey.com --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --chrome-flags="--headless"
```

**Target:** mobile Performance ≥ 85 on homepage.

**Known weight:** GTM + Umami + Tally script in root layout; blog fetches WordPress media at build time.

---

## 6. Accessibility

| Item | Status |
|------|--------|
| `/start` form labels | ✅ `FormField` + `htmlFor` on all inputs |
| Focus rings | ✅ `focus-visible:ring-rdx-accent` on buttons/inputs |
| Color contrast | ✅ RDX tokens — spot-check on `/` and `/start` |

---

## 7. Content integrity

| Item | Status |
|------|--------|
| RDX copy bank (`src/content/rdx/`) | ✅ No lorem, no Fiverr references |
| Case studies | ✅ Real PNGs in `public/work/` — clients, products, prior experience |
| Legacy `/hire` page | Redirects to `/start`; legacy Fiverr content not reachable via nav |

---

## 8. Legal

| Item | Status |
|------|--------|
| Privacy — `/start` form data | ✅ Updated June 2, 2026 |
| Privacy — Resend / Supabase / Formspree | ✅ Third-party list |
| Privacy — retention for leads | ✅ Section 8 |
| Terms — form submissions | ✅ Project Inquiries section |

---

## 9. Launch tag

After deploy verification on production:

```bash
git tag -a rdx-v1-launch -m "RDX Technologies agency site v1 — Phases 8–15"
git push origin rdx-v1-launch
```

*(Run only when you are ready to mark production live.)*

---

## 10. Deferred (not blocking v1 launch)

| Item | Phase |
|------|-------|
| Supabase + `/dashboard` admin | 7 ⏸️ |
| Legacy `mock-data.ts` full removal | Cleanup |
| Blog rewrite / sitemap refresh | Defer |
| Lighthouse score confirmation | Run on prod before tag |
| Custom domain (when ready) | Founder |

---

## 11. Pre-deploy env checklist

```bash
RESEND_API_KEY=
BUSINESS_EMAIL=contact@rajondey.com
FROM_EMAIL=contact@rajondey.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/rajondey
# Optional when Phase 7 returns:
# SUPABASE_SERVICE_ROLE_KEY=
# RDX_ADMIN_EMAILS=
```

---

*Phase 15 — June 2026*
