# 10 — Cookie consent + form privacy notice

**Status:** Done  
**Product:** marketing  
**Approved by:** Founder, 15 Oct 2026 (banner for everyone · notice line, no checkbox)  
**Date:** 15 Oct 2026

## Problem

- `src/app/layout.tsx` loads Google Tag Manager (`GTM-TT9FG5TF`) on every page before any consent. GA4 inside GTM sets cookies, so EU/UK visitors get tracking cookies without opting in (GDPR / ePrivacy).
- The `/start` form (`UnifiedStartForm`, the only live intake form) does not link to Terms or Privacy at the point of submission.

## Goal

1. On first visit, a small bottom banner says: "We use cookies to analyze site traffic and improve your experience." It has **Accept**, **Decline**, and a Privacy Policy link. The two buttons are equal weight (no dark pattern).
2. Google Consent Mode v2 defaults to `denied` for `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` **before** GTM loads. Accept sends `consent update → granted`. Decline keeps `denied`.
3. The choice is stored in `localStorage` (`rdx-cookie-consent`) for 12 months, after which the banner shows again. A "Cookie settings" link in the footer reopens the banner.
4. Below the `/start` submit button: "By submitting this form, you agree to our Terms of Service and Privacy Policy." Both are links. This is a notice, not a required checkbox.
5. Privacy Policy section 4 mentions the banner and the footer link.

## Out of scope

- New npm packages (no `cookieconsent` lib; a small client component is enough)
- Per-category preference center
- Geo-targeting the banner (it shows to everyone; simpler and safe)
- Beehiiv embed wording (third-party iframe)
- Unused `AuditForm` / `ContactForm`

## Context to read

- `context/ui-context.md` · `context/code-standards.md`
- `src/app/layout.tsx` · `src/components/rdx/forms/UnifiedStartForm.tsx` · `src/content/rdx/forms.ts`

## Files to touch

- `src/components/rdx/legal/CookieConsent.tsx` (new, client). Banner + `gtag('consent','update')`.
- `src/content/rdx/legal.ts`. Banner copy, form notice copy, Privacy §4 update.
- `src/app/layout.tsx`. Consent-default inline script **before** the GTM script. Mount the banner.
- `src/components/rdx/layout/Footer.tsx`. "Cookie settings" button.
- `src/components/rdx/forms/UnifiedStartForm.tsx`. Notice line under submit.
- `context/progress-tracker.md`

## Files to avoid

- OS / desk code, `next.config.ts`, GTM container IDs

## Steps

1. Add the consent default script, the banner, and the footer reopen link.
2. Add the form notice and update Privacy §4.
3. Verify: `npm run build` && `npm run lint`. In the browser with a fresh profile, check that `dataLayer` has `consent default denied` before `gtm.js` and that no `_ga` cookie exists before Accept. Accept → `_ga` set. Decline → none. Reload → no banner.
4. Founder, outside the code: in GTM, confirm GA4 tags use built-in consent checks (Google tags respect Consent Mode automatically). Any non-Google tag needs "Require additional consent: analytics_storage".

## Verified (dev, 15 Oct 2026)

- `dataLayer` order: `consent default denied` → `gtm.js`. No cookies before a choice.
- Accept → `consent update granted` → `_ga` and `_ga_EB2L52F9M5` set. The GA4 tags in the container respect Consent Mode.
- Reload → no banner. Cookie settings → banner reopens. Decline → `update denied`, stored.
- `/start` notice links go to `/terms-of-service` and `/privacy-policy`.
- Banner hidden under `/os` (the OS overlay uses the same z-index).
