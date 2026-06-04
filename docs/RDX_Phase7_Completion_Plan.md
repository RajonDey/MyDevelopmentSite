# RDX — Completion Plan (Phase 7+)

> **Starting point:** Phases 0–6 shipped (structure, routes, basic copy).  
> **Goal:** A site that feels like a real agency — credible, cohesive, one clear path to hire you.  
> **Status:** Planning — work one phase at a time.  
> **Deferred (founder):** Supabase migration, `/dashboard` admin, prod env for leads — revisit when ready. See [Phase 7](#phase-7--go-live-ops-deferred).

---

## Honest read on where you are

| What exists | What it feels like today |
|-------------|--------------------------|
| All core routes | ✅ Complete information architecture |
| Pricing & tiers | ✅ Locked and on `/services` |
| Hallmark Quiet tokens | ✅ Started — not fully applied |
| Page layouts | ⚠️ Wireframe-level — text blocks, little visual proof |
| Case studies | ⚠️ Placeholder structure — need real projects + screenshots |
| Conversion | ⚠️ Split across `/audit`, `/contact`, `/estimate` — confusing |
| Sales ops | ⚠️ Forms work; Calendly + nurture emails not wired yet |
| Lead DB / admin | ⏸️ **Deferred** — Supabase + `/dashboard` skipped for now |

**Bottom line:** Phases 0–6 built the **basement**. Phases 7–14 build the **finished house**.

**Design note:** Hallmark Quiet ≠ “empty.” It means restrained typography, real imagery, editorial rhythm — not generic SaaS gradients or dark-mode clones. Current pages are **under-designed**, not “minimal enough.”

---

## Strategic decisions (locked for Phase 7+)

### One form, not two

| Old | New |
|-----|-----|
| `/audit` — review request | **Merge** |
| `/contact` — general message | **Merge** |
| `/estimate` — scope calculator | **Step 1** of unified flow |

**Primary route:** `/start` (or keep `/contact` as URL — your choice at Phase 8 kickoff)

**Flow:**
1. **Interactive scope** — reuse `ScopeEstimator` logic (need → scope → suggested tier + band)
2. **Qualification** — agency name, team size, timeline, site URL, message
3. **Submit** — single API endpoint, single thank-you page
4. **Follow-up** — email confirmation + optional Calendly link for qualified bands ($1.5K+)

**Redirects:** `/audit` → `/start`, `/estimate` → `/start#scope`, `/hire` → `/start`

**Keep the offer language:** “Free Website & Workflow Review” stays as the **CTA label**, not a separate page.

### Audit call — yes, but as sales mechanics, not a page

You do **not** need a standalone “audit product.” You need:

1. **Value-first CTA** on every money page (already in copy bank)
2. **15-min review call** offered **after** form submit for qualified leads (budget $1.5K+, clear need)
3. **Calendly embed** on thank-you page (conditional) or link in reply email
4. **Manual review** for sub-$1.5K or vague leads — email only, no call

No paid audit funnel. The “audit” is your **discovery call** dressed as a free review — standard for $1K–$5K agency sales.

### Landing pages — optional, not required for v1

For a **warm outbound** site (DMs, referrals, Upwork handoff), the main site **is** the landing page.

Add **campaign landers** only when you run targeted outbound at scale:

| When | Page | Example |
|------|------|---------|
| Cold email sequence | Single-offer lander | `/for-agencies` |
| LinkedIn ad (later) | Service-specific | `/services/agency-website` *(already exists)* |
| Partner referral | Short credibility page | `/partner` |

**Phase 13 is optional.** Skip until you have a specific campaign.

### What “satisfactory completion” means

- [ ] One conversion path that feels intentional
- [ ] Homepage + service pages look **designed**, not templated
- [ ] At least **2 real case studies** with screenshots
- [ ] Process + about answer “why trust a remote team?”
- [ ] Form submit works (email notify OK; DB optional until Phase 7)
- [ ] Legacy archived when stable *(Phase 7, non-Supabase tasks)*
- [ ] Mobile QA on every primary route

---

## Phase dependency chain

```
Phase 7   Go-live ops        ⏸️ DEFERRED — Supabase · admin · prod env (founder later)
    ↓
Phase 8   Conversion         one /start flow · merge forms · redirects   ← START HERE
    ↓
Phase 9   Design system      tokens · typography · section library · imagery kit
    ↓
Phase 10  Homepage           hero · proof · sections (Hallmark pass)
    ↓
Phase 11  Services module    each service page — one sub-phase each
    ↓
Phase 12  Trust module       work · process · about · retainer
    ↓
Phase 13  Sales ops          Calendly · emails *(dashboard deferred with Phase 7)*
    ↓
Phase 14  Campaign (opt.)    outbound landers · UTM · A/B copy
    ↓
Phase 15  Final QA           perf · SEO · accessibility · launch sign-off
```

**Rule:** Same as before — `npm run build` + `lint` pass before closing each phase.

---

## Phase 7 — Go-live ops *(deferred)*

**Status:** ⏸️ Skipped for now — founder will revisit Supabase + admin later.

When you return to this phase:

| Task | Owner |
|------|-------|
| Run `supabase/migrations/001_rdx_leads.sql` | You |
| Set `SUPABASE_SERVICE_ROLE_KEY`, `RDX_ADMIN_EMAILS` in prod | You |
| Verify `/api/leads/submit` + `/dashboard` in prod | You |
| Confirm Resend (or notify email) fires on submit | Dev |
| GA4 events verified on prod domain | Dev |
| Archive legacy routes to `src/_legacy/` after 7+ days stable redirects | Dev |

**Sign-off:** Test submit from prod → row in DB → admin email → dashboard shows lead.

**Doc:** [RDX_Phase6_Setup.md](./RDX_Phase6_Setup.md)

**Until then:** Forms can use email notify (Resend/Formspree) without DB. Do not block Phases 8–15 on this.

---

## Phase 8 — Unified conversion *(highest ROI)*

**Module:** Single intake funnel

### Deliverables

| Item | Detail |
|------|--------|
| `src/app/start/page.tsx` | Two-step or single-page: scope + contact fields |
| `UnifiedStartForm` | Merges `AuditForm` + `ContactForm` + estimator state |
| Submit | Email notify + optional API payload (`estimated_tier`, `scope_need`, `scope_band`) — DB when Phase 7 done |
| Thank-you | One page; copy references review call for qualified leads |
| Redirects | `/audit`, `/estimate`, `/hire` → `/start` |
| Nav CTA | Header button → `/start` (“Free Review”) |
| Remove duplication | Deprecate standalone audit/contact pages (redirect only) |

### Form fields (final)

**Step A — Scope (interactive)**
- Need: Website · Automation · Both
- Scope chips (from `scope-estimator.ts`)
- Live preview: suggested tier + band (no checkout)

**Step B — You**
- Name, email, agency name
- Team size, timeline
- Website URL (optional)
- Message / current pain
- Hidden: estimator result JSON

### Analytics events

- `start_scope_complete`
- `start_form_submit`
- Include tier/band in submit payload (for email + future DB)

**Sign-off:** ✅ Phase 8 complete (2026-06-02) — `/start` live, all CTAs unified, legacy routes redirect.

---

## Phase 9 — Design system elevation *(global, build once)*

**Module:** Reusable section library before page-by-page polish

### 9A — Tokens & typography
- Refine `tokens.css`: spacing scale, section rhythm, display vs body type
- One display font pairing (Hallmark editorial — not Inter-only default feel)
- Hairline rules, subtle surface shifts between sections

### 9B — Section components (new `components/rdx/sections/`)
| Component | Used on |
|-----------|---------|
| `SplitHero` | Homepage, service heroes |
| `StatStrip` | Homepage, about |
| `LogoIntegrationRow` | Homepage, service footers (HubSpot, Slack, GA4, Calendly icons) |
| `BentoFeatureGrid` | Service pages |
| `PullQuote` | Case studies, homepage |
| `ComparisonTable` | Service tiers (upgrade from plain table) |
| `StickyCtaBar` | Mobile — “Free Review” on long pages |
| `FaqAccordion` | Services, start page sidebar |

### 9C — Imagery kit
- Placeholder → real: hero diagram polish, case study screenshots, optional founder photo on `/about` only
- OG image template per route type

**Sign-off:** Storybook-style reference page OR `/design-system` dev route listing all sections (dev-only, optional).

**Sign-off:** ✅ Phase 9 complete (2026-06-02) — section library + tokens + `/design-system` preview.

---

## Phase 10 — Homepage *(first full Hallmark pass)*

**Depends on:** Phase 9 section library

| Section | Upgrade |
|---------|---------|
| Hero | Split layout + stronger headline hierarchy + integration diagram polish |
| Services teaser | Bento or card grid with tier “from” prices |
| Work teaser | Real thumbnail + one-line outcome per case |
| Process snap | Numbered strip with timeline hint |
| Social proof | Integration logos OR one honest quote (no fake metrics) |
| Final CTA | Full-width band → `/start` |

**Copy:** [RDX_Content_Copy_Bank.md](./RDX_Content_Copy_Bank.md) — no invented numbers.

**Sign-off:** ✅ Phase 10 complete (2026-06-02) — homepage uses Phase 9 section library.

---

## Phase 11 — Services module *(one sub-phase per page)*

Work **one page per session** to avoid half-finished polish.

### 11A — `/services` overview
- Hero + two offer cards with outcomes (not just prices)
- Comparison hint: “Most agencies start at Standard”
- FAQ block
- CTA → `/start`

### 11B — `/services/agency-website`
- Outcome-led hero (“Forms that reach your CRM”)
- Tier table → `ComparisonTable` with recommended badge on Standard
- “What’s included” visual (connections diagram)
- Example deliverables list
- Sticky mobile CTA

### 11C — `/services/lead-automation`
- Before/after workflow diagram (form → email chaos vs form → CRM → Slack)
- Tier table + Standard example automations
- Integration logos

### 11D — `/services/ai-chat-search`
- Lighter page OK — “advanced offer” positioning
- Clear “API costs separate” callout
- CTA → `/start` with need pre-selected via query `?need=ai`

### 11E — `/estimate` *(if kept as standalone)*
- Either redirect to `/start#scope` **or** slim standalone for link sharing
- Recommendation: redirect after Phase 8

**Sign-off:** ✅ Phase 11 complete (2026-06-02) — all service routes polished (11A–11D).

---

## Phase 12 — Trust module *(one sub-phase each)*

### 12A — `/work` index
- Grid with industry tag, service tag, outcome line
- Filter optional (defer if only 2–4 studies)

### 12B — Case studies *(minimum 2 real)*
Per study structure:
- Client context (anonymous OK if NDA)
- Problem → approach → stack → outcome
- 2–4 screenshots (browser frames)
- Related service link + CTA

**You provide:** project names, screenshots, permission level.

### 12C — `/process`
- Expand 4 steps with “what you do / what we do / timeline”
- Deliverables checklist per phase
- Link to pricing tiers

### 12D — `/about`
- RDX story (agency positioning, not freelancer CV)
- Brief founder mention + photo optional
- Global remote team — how communication works (async, Loom, Slack)
- No Fiverr badges

### 12E — `/retainer`
- Tie to Care plans in pricing doc
- When to buy vs project scope

**Sign-off:** ✅ Phase 12 complete (2026-06-02) — work, case studies, process, about, retainer.

---

## Phase 13 — Sales ops *(close the loop)*

| Item | Detail |
|------|--------|
| Calendly | Embed on thank-you for qualified leads OR link in Resend template |
| Email: lead confirm | “We received your review request” + what happens next |
| Email: admin notify | Resend (or Formspree) — verify in dev/prod |
| Email: qualified follow-up | Template with Calendly + 3 bullet prep questions |
| Dashboard | ⏸️ Deferred with Phase 7 — manual inbox tracking until then |
| Reply SLA | Document: 1 business day |

**Optional defer:** CRM sync (HubSpot free tier), Zapier webhook, Supabase dashboard.

**Sign-off:** ✅ Phase 13 complete (2026-06-02) — see [RDX_Phase13_Setup.md](./RDX_Phase13_Setup.md).

---

## Phase 14 — Campaign landers *(optional)*

Only if running structured outbound:

| Page | Purpose |
|------|---------|
| `/for-agencies` | Short letter-style page for cold email link |
| Query prefill | `/start?need=website&source=campaign` |

Includes: one hero, three bullets, one case snippet, one CTA. No new nav item — unlisted URLs (noindex).

**Sign-off:** ✅ Phase 14 complete (2026-06-02) — see [RDX_Phase14_Setup.md](./RDX_Phase14_Setup.md).

---

## Phase 15 — Final QA & launch

| Area | Check |
|------|-------|
| Build | `npm run build` + `lint` |
| Links | No broken internal links; all legacy redirects work |
| SEO | Meta + OG per page; SchemaOrg spot-check |
| Perf | Lighthouse mobile ≥ 85 on homepage |
| A11y | Form labels, focus states, contrast |
| Content | No lorem, no fake testimonials, no Fiverr proof |
| Legal | Privacy + terms mention form data storage |
| Launch | Tag `rdx-v1-launch` |

**Sign-off:** ✅ Phase 15 complete (2026-06-02) — see [RDX_Phase15_Setup.md](./RDX_Phase15_Setup.md). Run Lighthouse on prod + `git tag rdx-v1-launch` when deployed.

---

## What you’re still missing (checklist)

| Gap | Status |
|-----|--------|
| Production Supabase + admin | 7 ⏸️ deferred — see [RDX_Launch_Plan.md](./RDX_Launch_Plan.md) |
| One unified form + estimator | ✅ Phase 8 |
| Work module + screenshots | ✅ June 2026 |
| Calendly + email nurture | ✅ Phase 13 |
| Legacy hire UI archived | ✅ `src/_legacy/hire-sections/` |
| Campaign landers | ✅ `/for-agencies` (optional use) |
| Prod form test + Lighthouse + launch tag | **Founder** — Phase F |
| Blog rewrite | **Defer** |
| Paid ads / SEO program | **Out of scope** |

---

## Recommended work order (if time is limited)

1. **Phase 8** — merge forms *(biggest UX win)* ← **start here**
2. **Phase 9** — section library *(enables polish)*
3. **Phase 10** — homepage polish *(first impression)*
4. **Phase 11B** — agency website service page *(core offer)*
5. **Phase 12B** — one real case study
6. **Phase 13** — Calendly + emails *(no dashboard)*
7. **Phase 7** — when ready: Supabase + admin + prod env
8. Everything else in phase order

---

## Session prompt template

When starting a module in a new chat:

```
Phase: 11B
Module: /services/agency-website
Read: docs/RDX_Phase7_Completion_Plan.md, RDX_Services_and_Pricing.md
Goal: Hallmark pass on agency-website page using Phase 9 section components
Out of scope: other service pages, form changes
```

---

## Related docs

- [RDX_Phase_Checklists.md](./RDX_Phase_Checklists.md) — Phases 0–6 (complete)
- [RDX_Services_and_Pricing.md](./RDX_Services_and_Pricing.md) — pricing source of truth
- [RDX_Content_Copy_Bank.md](./RDX_Content_Copy_Bank.md) — approved messaging
- [RDX_Implementation_Standards.md](./RDX_Implementation_Standards.md) — code rules

---

*Version 1.1 — June 2, 2026 — Phase 7 Supabase/admin deferred; active track starts at Phase 8*
