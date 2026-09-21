# 06 — Brand voice

**Status:** Done  
**Product:** shared  
**Approved by:** founder (Proceed, 20 Sep 2026)  
**Date:** 20 Sep 2026  
**Blocked by:** `05-brand-hq-page.md` Done

## Problem

Copy Bank locks **market** phrases. It does not lock company tone, words we use, or words we avoid for SaaS, decks, and social. Agents invent voice.

## Goal

`brand/BRAND.md` + `brand.json` contain:

- Tone (how we sound)
- Messaging pillars (company layer)
- Words we use
- Words we avoid

`/brand` Voice section reads those lists. **Copy Bank stays the source for public site headlines and CTAs.** This spec updates Copy Bank only if the founder explicitly wants a company-line or tagline change on the marketing site.

## Out of scope

- Rewriting homepage/services/work pages
- Invented testimonials or metrics
- Product-specific voice for YearInReview / IELTSReady (spec 07)
- Social templates (spec 08)

## Context to read

- `docs/RDX_Content_Copy_Bank.md`
- `docs/RDX_Strategic_Decisions_and_Phase_Plan.md`
- `brand/BRAND.md` · `brand/brand.json`
- `src/content/rdx/metadata.ts`

## Files to touch

- `brand/BRAND.md`
- `brand/brand.json` (`voice`, `messaging`)
- `src/app/brand/` Voice section (data binding only)
- `docs/RDX_Content_Copy_Bank.md` — **only** if founder OK for a specific line
- `context/progress-tracker.md`

## Files to avoid

- Service/pricing docs
- OS copy
- Token / logo files

## Steps

1. Draft voice from locked facts: precise, calm, senior, no hype, no Fiverr energy, no fake proof.
2. Words we use: RDXHIVE, Many minds. One direction., global remote team, fixed scope, from $1,000 (market surfaces only).
3. Words we avoid: RDX Hive, 4.9 stars, 50+ clients, 24–48 hour delivery, Order Services, founder name as H1, Fiverr/Upwork in hero (already in Copy Bank Proof — DO NOT USE).
4. Company messaging pillars (3–5). Do not replace the agency service line on `/`.
5. Bind `/brand` Voice to `brand.json`.
6. Verify: public pages unchanged unless a listed Copy Bank edit was approved. `npm run build` && `npm run lint`.

## Open questions

- [x] Company line stays Brand HQ only (no Copy Bank / About / footer edit)
- [x] Mission / vision / values: left unwritten (no agent draft)

## Verify

- An agent writing a new SaaS README can follow `brand.json.voice` without opening service pages.
- Copy Bank Proof lists and Brand HQ avoid-list do not contradict.
