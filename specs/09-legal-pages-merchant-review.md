# 09 — Legal pages for payment-processor review

**Status:** Done (entity fields pending LLC filing)  
**Product:** marketing  
**Approved by:** Founder, 15 Oct 2026  
**Date:** 15 Oct 2026

## Problem

A US payment processor (Stripe) reviews the website by hand before approving a merchant account. They check business identity, policy pages, and a working support contact. Today:

- Privacy lives at `/privacy-policy` and Terms at `/terms-of-service`. `/privacy`, `/terms`, `/refund` return 404.
- There is no standalone Refund & Cancellation policy. Refund text inside Terms says "7 days after completion" and "no refunds for change of mind".
- The footer has no email, no contact channel, and no Refund link. It says "Global remote team" with no legal entity.
- Both pages name the operator as "Rajon Dey (formerly Rajon Dey X Technologies), Sylhet, Bangladesh". That will not match a US LLC Stripe account.
- Terms list old services (WordPress, email templates). They do not mention software products (IELTSReady, YearInReview) or subscriptions.
- Terms list "mobile banking" as a payment method. Privacy mentions a WordPress blog and "Google Analytics (if used)". The site actually loads GTM `GTM-TT9FG5TF` and Umami.
- Both pages are half Bangla. That is fine for people, but reviewers read the English.

## Goal

A reviewer on rdxhive.com can, in under a minute:

1. Open Privacy, Terms, Refund from the footer on every marketing page (no 404s).
2. See the legal entity name, a business address, and a support email in the footer and on each policy page.
3. Read a Refund & Cancellation policy covering (a) custom agency services and (b) digital products and subscriptions.
4. Read Terms that say what RDXHIVE sells: web development, CRM automation, software products. The Terms also cover scope, client duties, payment, IP, and limitation of liability.
5. Read a Privacy Policy covering data collected, cookies, form submissions, the processors actually in use, and user rights.

## Out of scope

- Stripe checkout or pricing changes (pricing is locked)
- Cookie consent banner (new UI, separate spec if wanted)
- Policies on IELTSReady.com / Yearinreview.online (separate repos)
- Lawyer review. The copy is a standard template. Founder confirms before going live.

## Context to read

- `context/ui-context.md` · `context/code-standards.md`
- `docs/RDX_Content_Copy_Bank.md` (no invented metrics)
- `src/content/rdx/navigation.ts` · `src/content/rdx/contact.ts`

## Files to touch

- `src/content/rdx/legal.ts` (new). Holds entity name, address, support email, effective date, and all policy copy in one place.
- `src/components/rdx/legal/LegalPage.tsx` (new). Shared layout using rdx tokens.
- `src/app/(others)/privacy-policy/page.tsx`. Rewrite in English only, from `legal.ts`.
- `src/app/(others)/terms-of-service/page.tsx`. Rewrite. Short refund summary that links to `/refund-policy`.
- `src/app/(others)/refund-policy/page.tsx` (new)
- `next.config.ts`. Add redirects `/privacy`, `/terms`, `/refund` to the canonical pages. Add-only; no existing redirect removed.
- `src/content/rdx/navigation.ts`. Add footer link "Refund Policy".
- `src/components/rdx/layout/Footer.tsx`. Add support email, contact link (`/start`), entity name in ©.
- `src/content/rdx/contact.ts`. Add `support` only if the mailbox exists.
- `src/app/sitemap.ts`. Add `/refund-policy`.
- `context/progress-tracker.md`

## Files to avoid

- `src/components/os/`, desk admin, `rdx_*` / `os_*` tables
- Pricing, Copy Bank, ICP docs

## Steps

1. Founder answers open questions (entity, email, address).
2. Create `legal.ts` + `LegalPage`. Rewrite Privacy and Terms. Add the Refund page.
3. Add redirects, the footer link, the support email, and the sitemap entry.
4. Verify: `npm run build` && `npm run lint`. Run `curl -I` on `/privacy`, `/terms`, `/refund` (308 to the canonical page). Footer links resolve on `/`, `/services`, `/start`.

## Decisions (15 Oct 2026)

- [x] Entity: pending. `registration` in `src/content/rdx/legal.ts` stays `null` until the Wyoming filing is accepted. Then set the exact filed name and the registered-agent address. Footer, all three pages, the "US-registered" note, and governing law (Wyoming) switch together. No bracket placeholders ship.
- [x] Support email: `support@rdxhive.com` for support, refunds, and privacy requests. `hello@` stays the general contact.
- [x] Address: US registered-agent address once filed. Until then, Sylhet.
- [x] Refund window: 14 days, case by case.
- [x] English only. Bangla dropped.

## Before submitting to Stripe

- [ ] LLC filed → fill `registration` in `legal.ts` → deploy
- [ ] `support@rdxhive.com` receives mail (send a test)
- [ ] Stripe account business name, address, and support email match the footer exactly
- [ ] IELTSReady / YearInReview: each site needs its own Terms/Privacy/Refund page, or Stripe must list them as products of this account
