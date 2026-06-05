# RDX Technologies — Strategic Decisions & Phase Plan

> **Status:** ✅ Locked v1.2  
> **Services & pricing:** [RDX_Services_and_Pricing.md](./RDX_Services_and_Pricing.md)

---

## Executive summary

| Decision | Value |
|----------|-------|
| ICP | US marketing agencies, 5–20 people |
| Services | **Agency Website** · **Lead & CRM Automation** |
| Price range | **$1,000 – $5,000+** (round numbers) |
| Flagship defaults | Website **$3,000** · Automation **$2,500** |
| **Pricing on site** | **Yes** — full tiers on `/services/*`; homepage **“From $1,000”** only |
| Audit CTA | **Free Website & Workflow Review** |
| Brand | RDX Technologies · global remote team |

**Pitch:** We build agency websites and connect them to your CRM — fixed projects from $1,000.

---

## Service menu

| Client sees | Slug | Tiers |
|-------------|------|-------|
| Agency Website | `/services/agency-website` | $1,000 · **$3,000** · $5,000 · Custom |
| Lead & CRM Automation | `/services/lead-automation` | $1,000 · **$2,500** · $4,000 |
| AI Chat & Search *(Phase 5)* | `/services/ai-chat-search` | $3,000 – $5,000+ |

**Bundle (audit):** $5,000 · **Care (Phase 5):** $500 / $1,000 mo

---

## Site architecture

**Nav:** Services | Work | Process | About | Blog | [Free Review]

| Route | Phase |
|-------|-------|
| `/`, `/audit`, `/contact` | 2 |
| `/services`, `/services/*`, `/estimate` | 3 |
| `/work`, `/process`, `/about` | 4 |
| `/retainer`, `/services/ai-chat-search` | 5 |

**Phase 0:** Remove `/work` → `/portfolio` redirect in `next.config.ts`.

---

## Phases

0 Foundation → 1 Shell → 2 MVP (audit-ready) → 3 Services (**full marketing starts**) → 4 Proof → 5–6 Expand

**Sequence detail:** [RDX_Phase_Sequence.md](./RDX_Phase_Sequence.md)  
**Checklists:** [RDX_Phase_Checklists.md](./RDX_Phase_Checklists.md)

---

## Ready

All docs aligned v1.2. Start with **Phase 0** when ready.

*Version 1.2 — June 2, 2026*
