# RDX Technologies — Revamp Documentation Hub

**Read this first** before any implementation work. These docs define scope, architecture, and agent behavior so work stays consistent across days/weeks.

👉 **Pricing & services:** [RDX_Services_and_Pricing.md](./RDX_Services_and_Pricing.md) — ✅ locked.

---

## Document map

| Doc | Purpose | When to read |
|-----|---------|--------------|
| [RDX_Repossitioning_Plan.md](./RDX_Repossitioning_Plan.md) | Original brief & vision | Context only |
| [RDX_Strategic_Decisions_and_Phase_Plan.md](./RDX_Strategic_Decisions_and_Phase_Plan.md) | **Locked decisions** — ICP, services, pricing, phases | Every session start |
| [RDX_Services_and_Pricing.md](./RDX_Services_and_Pricing.md) | **Service tiers, inclusions, market pricing** — approve before Phase 0 | Before implementation |
| [RDX_Scope_Boundaries.md](./RDX_Scope_Boundaries.md) | In/out of scope per phase — **prevents scope creep** | Before starting any phase |
| [RDX_Code_Migration_Strategy.md](./RDX_Code_Migration_Strategy.md) | How to revamp without breaking legacy code | Before writing code |
| [RDX_Implementation_Standards.md](./RDX_Implementation_Standards.md) | Code quality, file rules, anti–AI-slop | During all coding |
| [RDX_File_Ownership_Map.md](./RDX_File_Ownership_Map.md) | Which files are legacy / new / phase-owned | Before touching a file |
| [RDX_Content_Copy_Bank.md](./RDX_Content_Copy_Bank.md) | Approved messaging, CTAs, service copy | When writing UI copy |
| [RDX_Phase_Checklists.md](./RDX_Phase_Checklists.md) | Exit criteria per phase — **do not advance until checked** | End of each phase |
| [RDX_Phase_Sequence.md](./RDX_Phase_Sequence.md) | **Phase order & dependencies** — read before Phase 0 |
| [RDX_READINESS_CHECKLIST.md](./RDX_READINESS_CHECKLIST.md) | Pre-flight before Phase 0 |
| [RDX_SEO_and_AI_Discoverability.md](./RDX_SEO_and_AI_Discoverability.md) | Google SEO + AI/LLM indexing (llms.txt, schema) |
| [RDX_Phase15_Setup.md](./RDX_Phase15_Setup.md) | Final QA & launch sign-off (Phase 15) |
| [RDX_Phase14_Setup.md](./RDX_Phase14_Setup.md) | Campaign landers + UTM attribution (Phase 14) |
| [RDX_Phase13_Setup.md](./RDX_Phase13_Setup.md) | Calendly + confirmation emails (Phase 13) |
| [RDX_Phase6_Setup.md](./RDX_Phase6_Setup.md) | Supabase leads + admin env setup |
| [RDX_Phase7_Completion_Plan.md](./RDX_Phase7_Completion_Plan.md) | **Phases 7–15** — finish design, one form, sales ops, launch | After Phase 6 |
| [RDX_Agent_Workflow.md](./RDX_Agent_Workflow.md) | How AI agents should run each session | Agent sessions |

---

## Root project files

| File | Purpose |
|------|---------|
| [`../AGENTS.md`](../AGENTS.md) | Agent entry point — links docs + hard rules |
| [`../.cursor/rules/`](../.cursor/rules/) | Cursor rules (auto-loaded in IDE) |
| [`../.agents/skills/rdx-revamp/`](../.agents/skills/rdx-revamp/) | Project skill: `@rdx-revamp` or revamp tasks |

---

## Current status

| Item | Status |
|------|--------|
| **Docs & planning** | ✅ Complete v1.2 — see [RDX_READINESS_CHECKLIST.md](./RDX_READINESS_CHECKLIST.md) |
| **Phase 0 — Foundation** | ✅ Complete (2026-06-02) — tokens, content scaffold, metadata, analytics |
| **Phase 1 — Design shell** | ✅ Complete (2026-06-02) — RdxHeader, RdxFooter, layout primitives, UI tokens |
| **Phase 2 — Launch MVP** | ✅ Complete (2026-06-02) — homepage, `/audit`, `/contact`, `/hire` redirect |
| **Phase 3 — Services** | ✅ Complete (2026-06-02) — `/services`, detail pages, `/estimate`, `/order` redirect |
| **Phase 4 — Proof & trust** | ✅ Complete (2026-06-02) — `/work`, case studies, `/process`, `/about`, `/portfolio` redirect |
| **Phase 5 — Expand** | ✅ Complete (2026-06-02) — blog CTAs, `/retainer`, AI service, `/learn` redirect |
| **Phase 6 — Client ops** | ✅ Complete (2026-06-02) — Supabase leads, `/dashboard` admin |

**Active phase:** Phase 15 complete — **RDX v1 ready for deploy.** See [RDX_Phase15_Setup.md](./RDX_Phase15_Setup.md) for Lighthouse + launch tag.

---

## Quick reference (locked)

- **Brand:** RDX Technologies (not Rajon Dey hero)
- **ICP:** US marketing agencies, 5–20 employees
- **Services:** Agency Website · Lead & CRM Automation
- **Flagship tiers:** **$3,000** (website) · **$2,500** (automation)
- **Range:** **$1,000 – $5,000+** · round numbers on site
- **Pricing on site:** Full tiers on `/services`; homepage “From $1,000” only
- **Audit CTA:** Free Website & Workflow Review
- **Site role:** Credibility for warm outbound — not primary SEO lead gen
- **Design:** Hallmark `modern-minimal` / Quiet — not Vercel dark clone
- **Domain (now):** `development.rajondey.com`

---

## How to start work (human or agent)

0. Read [RDX_READINESS_CHECKLIST.md](./RDX_READINESS_CHECKLIST.md) once before Phase 0.
1. Read [RDX_Strategic_Decisions_and_Phase_Plan.md](./RDX_Strategic_Decisions_and_Phase_Plan.md) — confirm active phase.
2. Open [RDX_Scope_Boundaries.md](./RDX_Scope_Boundaries.md) for that phase only.
3. Open [RDX_File_Ownership_Map.md](./RDX_File_Ownership_Map.md) — touch only allowed files.
4. Follow [RDX_Code_Migration_Strategy.md](./RDX_Code_Migration_Strategy.md) and [RDX_Implementation_Standards.md](./RDX_Implementation_Standards.md).
5. Use copy from [RDX_Content_Copy_Bank.md](./RDX_Content_Copy_Bank.md) — do not invent metrics.
6. Complete [RDX_Phase_Checklists.md](./RDX_Phase_Checklists.md) before marking phase done.

---

*Last updated: June 2, 2026*
