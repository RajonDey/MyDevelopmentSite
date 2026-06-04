# Phase 14 — Campaign landers

Outbound-only pages for cold email and partner links. **Not in main nav** and **noindexed** so they do not compete with the main site in search.

---

## 1. Live lander

| URL | Use |
|-----|-----|
| `/for-agencies` | Cold email / LinkedIn DM handoff for US marketing agencies |

**A/B copy:** append `?v=b` for alternate headline (same CTA, tracked separately in GA4).

Example cold-email link:

```
https://development.rajondey.com/for-agencies?utm_source=email&utm_medium=outbound&utm_campaign=agencies-q2-2026
```

CTA on the lander forwards UTM params to `/start` and sets `source=for-agencies`.

---

## 2. Start form prefill

Campaign traffic should land on `/start` with query params:

```
/start?need=website&source=for-agencies&utm_source=email&utm_campaign=agencies-q2-2026
```

| Param | Purpose |
|-------|---------|
| `need` | Pre-selects scope: `website` · `automation` · `both` |
| `source` | Stored as `lead_source` on submit (admin email + future DB) |
| `utm_source` · `utm_medium` · `utm_campaign` | Passed through as hidden fields |
| `v` | Copy variant (`a` default, `b` for A/B) |

Generic campaign source (from completion plan):

```
/start?need=website&source=campaign
```

---

## 3. Analytics events (GA4 / GTM dataLayer)

| Event | When |
|-------|------|
| `rdx_campaign_page_view` | Lander viewed — params: `campaign_slug`, `lead_source`, `copy_variant` |
| `rdx_campaign_cta_click` | Lander CTA clicked |
| `rdx_start_page_view` | `/start` viewed — includes `lead_source` |
| `rdx_start_form_submit` | Form submitted — includes `lead_source`, tier |

---

## 4. Manual test checklist

1. Open `/for-agencies` — letter layout, three bullets, case quote, CTA
2. Open `/for-agencies?v=b` — alternate headline
3. Click CTA — lands on `/start?need=website&source=for-agencies`
4. Submit form — admin email includes `lead_source: for-agencies` and UTM fields
5. Confirm page is **not** linked from header nav

---

## 5. Code map

| File | Purpose |
|------|---------|
| `src/app/for-agencies/page.tsx` | Campaign route (noindex) |
| `src/content/rdx/campaigns.ts` | Copy + A/B variants |
| `src/lib/campaign-attribution.ts` | UTM/source helpers |
| `src/components/rdx/sections/campaign/*` | Lander UI + tracking |
| `src/components/rdx/forms/UnifiedStartForm.tsx` | Hidden attribution fields |

---

## 6. Adding another lander

1. Add content block in `src/content/rdx/campaigns.ts`
2. Create `src/app/<slug>/page.tsx` mirroring `for-agencies`
3. Keep `robots: { index: false }` unless the page becomes a permanent SEO target

---

*Phase 14 — June 2026*
