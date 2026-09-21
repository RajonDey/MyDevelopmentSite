# RDXHIVE

One Next.js app. **Three products.** Do not mix their UI, tables, or copy.

## Overview

RDXHIVE is a remote product and engineering company. The public site is credibility for outbound to **US marketing agencies (5–20 people)**. The same repo also holds founder ops (Lead Desk), team execution (RDXHIVE OS), and shared identity in `brand/` (not a fourth product).

## Goals

1. Convert warm traffic through `/start` (scope + form → sales@).
2. Run client revenue ops in Lead Desk instead of Notion.
3. Run team rhythm in OS (north star, capacity, rituals) without merging it into the desk.

## Core user flows

**Prospect**

1. Lands on `/` or a service page.
2. Opens `/start`, estimates scope, submits.
3. Gets email + optional Calendly; founder sees the lead in `/dashboard`.

**Founder (Lead Desk)**

1. Signs in at `/signin` (password).
2. Manages leads, invoices, client project notes on `/dashboard`.

**Team (OS)**

1. Requests a magic link at `/os/signin`.
2. Works goals, projects, capacity, review under `/os`.

## Features

### Marketing (shipped)

- Public pages: `/`, `/services/*`, `/work/*`, `/start`, `/process`, `/about`, `/retainer`, blog, legal
- Typed copy in `src/content/rdx/`
- Forms → `POST /api/leads/submit` (Resend + optional Supabase)

### Lead Desk (shipped · prod Supabase optional)

- Leads, invoices (PDF), client projects
- Tables: `rdx_*` — never reuse for OS

### RDXHIVE OS (Phase 1)

- Command center, goals, projects, team, review
- UI real; data still mostly mock until a spec wires `010_os_core.sql`
- Tables: `os_*` — never reuse for the desk

### Shared brand (not a product)

- Source of truth: `brand/BRAND.md` + `brand/brand.json` + `brand/assets.md`
- Served files: `public/brand/` (rasters today; SVG in spec 04)
- Editorial `/brand` page: shipped (spec 05) · public, noindex
- Public marketing copy still comes from the Copy Bank

## Scope

### In scope

- Maintenance of the shipped marketing site
- Launch sign-off (Phase F)
- Lead Desk ops enablement
- OS Phase 1 data + auth hardening — **via approved specs**
- Brand HQ program — **via approved specs** (`01`–`08` Done)

### Out of scope

- Merging OS and Lead Desk schemas or UIs
- Invented metrics or fake testimonials
- New npm packages without founder OK
- SEO-first lead gen / ad tooling
- Restoring deleted legacy (`src/data/`, `src/_legacy/`, Fiverr hire UI)

## Success criteria

1. A prospect can finish `/start` and the team gets the lead email.
2. Founder can run a client from lead → invoice on `/dashboard` when Supabase is on.
3. Team can sign into `/os` without seeing marketing chrome as the product shell.
4. New features ship only after a spec in `specs/` is founder-approved.

## Locked facts

| Item | Value |
|------|--------|
| Brand | RDXHIVE · Many minds. One direction. |
| Domain | rdxhive.com |
| Emails | hello@ · sales@ · team@ |
| Pricing | $1,000–$5,000+ · homepage “from $1,000” · full tiers on `/services` |
| Design | Hallmark modern-minimal / Quiet |

Detail: `docs/PRODUCTS.md` · `docs/RDX_Services_and_Pricing.md` · `docs/RDX_Content_Copy_Bank.md`
