# RDX Technologies — Site Revamp or Repossitioning Plan 

> **⚠️ Historical brief only — superseded by [README.md](./README.md) and [RDX_Services_and_Pricing.md](./RDX_Services_and_Pricing.md). Do not implement from this file.**

---

## PROJECT CONTEXT (Read before doing anything)

I am rebuilding my business website from scratch. The current live site is at:
**https://development.rajondey.com/**

This is a Next.js project connected to a headless WordPress CMS backend at
`development-admin.rajondey.com`. The frontend repo is on my GitHub.

**What the current site is:**
A freelancer-style portfolio site for "Rajon Dey | Software Developer" with 7 low-ticket
services ($99–$999), Fiverr/Upwork testimonials, a developer-focused blog, and generic
copy that positions me as a developer for hire.

**What the new site must be:**
A premium agency (But I want to make a renowned company out of it in future, which will start as a agency and eventually grow as a well established company) site for "RDX Technologies" — positioned as an AI Growth Systems
Partner for service businesses and agencies. 4 premium services ($3,997–$20,000+),
outcome-based copy, case studies instead of simple portfolios, and a lead qualification funnel
built into the site.

**My business context:**
- Company: RDX Technologies (small, 1–5 person team)
- Founder: Rajon Dey
- Capability: Full-stack (Next.js, React, Node.js) + AI workflows + automation (n8n, Make.com), AI Agent
- Target client: Mid Type Business, Agencies, Service businesses (5–30 employees)
- Goal: 1–2 premium projects/month ($3K–$8K each) as a side business alongside my full-time job
- The site's job: Validate credibility when prospects check me out after LinkedIn or from any other outreach.
  It is NOT the primary lead generator — outbound LinkedIn is. The site must convert
  warm traffic, not cold search traffic - May be in future if organic search increase

---

Note: My Current Site is running almost 1+ years - and here is a google analytic report: https://analytics.google.com/analytics/web/?utm_source=marketingplatform.google.com&utm_medium=et&utm_campaign=marketingplatform.google.com%2Fabout%2Fanalytics%2F#/a297209899p482603463/reports/dashboard?params=_u..nav%3Dmaui%26_u.dateOption%3Dlast90Days%26_u.comparisonOption%3Ddisabled&r=reporting-hub


## TECHNICAL STACK (Keep unless noted otherwise)

You can check the current Codebase to get the Idea

---

## NEW SITE ARCHITECTURE

### Navigation (replace current nav entirely)
**Old nav:** Services | Portfolio | Blog & Learn | Work With Us | Contact | [Order Services CTA]
**New nav:** Services | Work | About | Process | Blog | [Get a Free Audit CTA — primary button] - That's a my short plan - but you can better plan after reviwing this 

### Pages to build (full list)
```
/                          → Homepage (full revamp — highest priority)
/services                  → Services overview (4 services only) - Again You Can decide 
/services/ai-growth-website
/services/agency-tech
/services/ai-automation
/services/ai-application
/work                      → Case studies (replaces /portfolio)
/work/[slug]               → Individual case study pages
/about                     → Rajon + RDX story, credibility
/process                   → How we work (4-step system)
/retainer                  → Dedicated retainer/partnership page
/audit                     → Free AI Audit lead magnet (HIGHEST PRIORITY - to plan)
/contact                   → Qualified lead intake form
/blog                      → Keep, but change newsletter CTA copy
/blog/[slug]               → Keep existing

Additionally - I have a Service Calculator Feature on my Existing Site - which was made with care - you need to make a solid plan how to keep that with proper changes to make the allignment with the new version
Design - It was done by Inspiring from Fiverr & Minimalism - I need your decision here to take for the design, should we keep as is or we need changes or improvisation 
```

### Pages to remove or redirect
These are again few of my thought, after discussing with Claude
```
/order      → Redirect to /contact (Fiverr-style order page kills premium positioning)
/hire       → Redirect to /contact ("Hire me" = contractor framing)
/learn      → Archive or remove (off-topic for client acquisition)
/faq        → Keep but move to footer only, not nav
```

---

## DESIGN DIRECTION

### Visual aesthetic
- **Target feel:** Vercel.com meets Linear.app — premium, dark, technical but clean
- **NOT:** colorful freelancer portfolio, card-heavy layouts, generic blue/white SaaS look
- Further you can better decide, Hallmark is there as design skill

### Typography
- Further you can better decide, Hallmark is there as design skill

### Layout principles
- Further you can better decide, Hallmark is there as design skill
But few of my points are: 
- Generous whitespace — sections breathe, not cramped
- Subtle entrance animations via Framer Motion may be 
- No stock photography. Use: abstract system/flow diagrams, dark gradient blobs,
  or nothing — negative space is premium.
- Replace the profile photo in the hero with a visual system diagram (nodes/connections)
  representing: Website → Automation → AI → Leads

---

## PHASE-BY-PHASE BUILD PLAN
I need from you - I want you to review and plan module by module, if feel too much to do in one short, when plans get set - you can create a doc, which we will progress one by one 

---


Update meta tags (do this first, takes 5 minutes)
For example:
```
title: "RDX Technologies | AI Growth Systems for Agencies & Service Businesses"
description: "RDX Technologies builds AI-powered growth systems — combining high-performance
web infrastructure, automated lead pipelines, and intelligent workflows for scaling agencies
and service businesses."
og:title: "RDX Technologies | AI Growth Systems"
```

## WHAT TO DO RIGHT NOW

1. Read [docs/README.md](./README.md) — documentation hub.
2. Confirm active phase in [RDX_Phase_Checklists.md](./RDX_Phase_Checklists.md).
3. Begin **Phase 0** only when ready — see [RDX_Strategic_Decisions_and_Phase_Plan.md](./RDX_Strategic_Decisions_and_Phase_Plan.md).

**Documentation status:** ✅ Complete · **Services & pricing:** ✅ Locked · Implementation: not started. 
