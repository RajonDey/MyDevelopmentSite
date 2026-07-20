# RDX OS — Product & implementation spec

**Status:** Phase 0.5 mock built — team trial in progress (see §16)  
**Product:** Internal team operating system (North Star, goals, projects, rhythm)  
**Audience:** RDX team only — not client-facing  
**Governance:** Separate product zone inside this repo — **outside** marketing revamp phases

---

## 1. Problem & purpose

RDX works across multiple streams in a year: client services, SaaS, content, research, and ad-hoc bets. Without a shared view, the team drifts — unclear priorities, repeated “what are we doing?” conversations, and uneven load.

**RDX OS** is a calm internal command center that answers on login:

1. **Where are we going?** (North Star + pillars + quarterly objectives)
2. **What matters now, and why?** (priority projects linked to objectives)
3. **Are we on track — and is anyone overloaded?** (progress + load signals)

It is **not** a task manager (Jira/Trello). Tasks are optional and lightweight. The unit of work is **projects linked to objectives**.

### Success criteria (v1)

| Outcome | How we know it works |
|---------|----------------------|
| Alignment | Any member can name the North Star and top 3 priorities without asking |
| Execution | Every active project has owner, deadline, status, and linked objective |
| Motivation | Wins are visible on the home screen when projects ship |
| Sustainable pace | Home shows who has too many active projects (WIP signal) |
| Low friction | Weekly update for a member takes **< 2 minutes** |

---

## 2. Locked decisions (from brainstorming)

| Topic | Decision |
|-------|----------|
| Repo | Same codebase — isolated `/os` zone, no second deploy |
| v1 scope | Lean: Command Center + Goals + Projects + simple Progress view |
| Build order | **UI-first** against typed mock data → swap data layer to Supabase |
| Auth | Passwordless **magic link** via Resend + team allowlist |
| Roles | **Admin** (North Star, pillars, objectives) · **Member** (projects, wins) |
| Cadence | Yearly North Star → calendar quarters (Q1–Q4) → weekly rhythm (Phase 2) |
| Progress | Objectives **auto-derive** from projects; KRs **manual** current/target |
| Reports | v1 = current-quarter roll-up; **snapshot history** baked in from day one |
| Design | Dashboard/cockpit, dark-default, RDX tokens + OS-specific dark surface tokens |
| Metrics | Manual entry in v1; API integrations (YouTube, revenue) in Phase 3+ |

---

## 3. Governance & repo boundaries

RDX OS is **founder-approved** and lives alongside the marketing site without touching revamp-owned paths.

### Isolated zones (create new — do not refactor legacy)

```
src/app/(os)/os/           # Routes
src/components/os/         # UI
src/content/os/            # Seed/mock content (v1 UI-first)
src/lib/os/                # Data access, auth helpers, progress math
src/types/os/              # Shared TypeScript contracts
src/styles/os/             # Dark cockpit theme (extends rdx tokens)
supabase/migrations/01x_os_*.sql
```

### Do not touch (unless explicitly approved)

- `src/data/*` legacy mock data
- `src/components/sections/*`, `src/app/hire/*`, `src/app/order/*`
- Marketing rdx pages under revamp phase ownership
- Existing `/dashboard` client desk (leads/invoices) — separate product surface

### Shared (read/reuse, don’t couple)

- `src/styles/rdx/tokens.css` — brand colors, type scale, spacing
- `src/lib/supabase/admin.ts` — service-role client pattern
- `src/lib/utils.ts` — `cn()` helper
- Resend, NextAuth, Supabase — extend, don’t replace

### SEO & indexing

All `/os/*` routes: `robots: { index: false, follow: false }`. No sitemap entries. No public nav links.

---

## 4. Mental model (data hierarchy)

```text
North Star (1 per active year)
  └── Pillar (stream: Client · SaaS · YouTube · Research · custom)
        └── Objective (quarterly goal — "what it will bring")
              ├── Key Result(s) — manual metric (current / target / unit)
              └── Project(s) — owner, priority, deadline, status
                    └── Milestone(s) — optional key dates (v1: optional field on project)
```

**Pillar examples**

| Pillar | Example objective | Example KR |
|--------|-------------------|------------|
| Client Services | Close $X revenue from agency projects | Revenue: $12k / $40k |
| SaaS | Launch v1 and reach first paying users | Paying users: 3 / 50 |
| Content | Monetize YouTube channel | Subscribers: 800 / 5,000 |
| Research | Publish two papers | Papers submitted: 0 / 2 |

---

## 5. TypeScript contracts (source of truth for UI-first build)

File: `src/types/os/index.ts`

```typescript
export type OsRole = "admin" | "member";

export type ProjectStatus = "backlog" | "active" | "blocked" | "done";
export type ProjectPriority = "p1" | "p2" | "p3";
export type Health = "green" | "yellow" | "red";

export interface OsMember {
  id: string;
  email: string;
  name: string;
  role: OsRole;
  avatarUrl?: string;
}

export interface NorthStar {
  id: string;
  year: number;           // e.g. 2026
  statement: string;      // one sentence
  updatedAt: string;
}

export interface Pillar {
  id: string;
  slug: string;           // client-services | saas | content | research
  name: string;
  emoji?: string;
  sortOrder: number;
}

export interface Objective {
  id: string;
  pillarId: string;
  year: number;
  quarter: 1 | 2 | 3 | 4;
  title: string;
  outcome: string;        // "what it will bring" — plain language
  health: Health;         // derived or admin-set override
  sortOrder: number;
}

export interface KeyResult {
  id: string;
  objectiveId: string;
  label: string;
  current: number;
  target: number;
  unit: string;           // USD, users, papers, projects, etc.
  updatedAt: string;
}

export interface Project {
  id: string;
  objectiveId: string;
  title: string;
  ownerId: string;        // accountable — counts toward load
  collaboratorIds?: string[]; // helpers — display only, no load impact
  status: ProjectStatus;
  priority: ProjectPriority;
  deadline: string | null; // ISO date
  impactNote?: string;    // short "why this matters"
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Win {
  id: string;
  projectId?: string;
  title: string;
  note?: string;
  createdById: string;
  createdAt: string;
}

/** Weekly snapshot for future trend reports — captured automatically */
export interface ProgressSnapshot {
  id: string;
  capturedAt: string;     // ISO datetime (weekly cron or on KR update)
  year: number;
  quarter: 1 | 2 | 3 | 4;
  objectiveId: string;
  progressPct: number;    // 0–100, derived from projects
  krValues: { krId: string; current: number }[];
}

/** Aggregates for Command Center — computed, not stored */
export interface CommandCenterData {
  northStar: NorthStar;
  pillars: Pillar[];
  objectives: Objective[];
  keyResults: KeyResult[];
  projects: Project[];
  members: OsMember[];
  wins: Win[];
  focusProjectIds: string[];  // admin-set "focus of the week" (max 3)
}
```

---

## 6. Database schema (Supabase)

Prefix all tables with `os_`. Enable RLS on every table. API routes use service role (same pattern as leads desk) until direct client Supabase auth is needed.

Migration file: `supabase/migrations/010_os_core.sql`

### Tables

| Table | Purpose |
|-------|---------|
| `os_members` | Team allowlist + role |
| `os_north_stars` | One row per year (active year flagged) |
| `os_pillars` | Work streams |
| `os_objectives` | Quarterly goals per pillar |
| `os_key_results` | Metrics per objective |
| `os_projects` | Work items |
| `os_wins` | Shipped / celebrated items |
| `os_focus_weeks` | Admin picks up to 3 project IDs for current week |
| `os_progress_snapshots` | Historical roll-ups for reports |

### `os_members`

```sql
create table public.os_members (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  role text not null check (role in ('admin', 'member')),
  avatar_url text,
  created_at timestamptz not null default now()
);
```

### `os_north_stars`

```sql
create table public.os_north_stars (
  id uuid primary key default gen_random_uuid(),
  year int not null unique,
  statement text not null,
  is_active boolean not null default false,
  updated_at timestamptz not null default now()
);
```

### `os_pillars`

```sql
create table public.os_pillars (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  emoji text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
```

### `os_objectives`

```sql
create table public.os_objectives (
  id uuid primary key default gen_random_uuid(),
  pillar_id uuid not null references public.os_pillars(id) on delete cascade,
  year int not null,
  quarter int not null check (quarter between 1 and 4),
  title text not null,
  outcome text not null default '',
  health_override text check (health_override in ('green', 'yellow', 'red')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (pillar_id, year, quarter, title)
);
```

### `os_key_results`

```sql
create table public.os_key_results (
  id uuid primary key default gen_random_uuid(),
  objective_id uuid not null references public.os_objectives(id) on delete cascade,
  label text not null,
  current_value numeric not null default 0,
  target_value numeric not null,
  unit text not null default '',
  updated_at timestamptz not null default now()
);
```

### `os_projects`

```sql
create table public.os_projects (
  id uuid primary key default gen_random_uuid(),
  objective_id uuid not null references public.os_objectives(id) on delete restrict,
  title text not null,
  owner_id uuid not null references public.os_members(id),
  status text not null default 'backlog'
    check (status in ('backlog', 'active', 'blocked', 'done')),
  priority text not null default 'p2'
    check (priority in ('p1', 'p2', 'p3')),
  deadline date,
  impact_note text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `os_wins`

```sql
create table public.os_wins (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.os_projects(id) on delete set null,
  title text not null,
  note text,
  created_by_id uuid not null references public.os_members(id),
  created_at timestamptz not null default now()
);
```

### `os_focus_weeks`

```sql
create table public.os_focus_weeks (
  id uuid primary key default gen_random_uuid(),
  week_start date not null unique,  -- Monday of ISO week
  project_ids uuid[] not null default '{}',
  set_by_id uuid references public.os_members(id),
  created_at timestamptz not null default now()
);
```

### `os_progress_snapshots`

```sql
create table public.os_progress_snapshots (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  year int not null,
  quarter int not null check (quarter between 1 and 4),
  objective_id uuid not null references public.os_objectives(id) on delete cascade,
  progress_pct numeric not null check (progress_pct between 0 and 100),
  kr_values jsonb not null default '[]'::jsonb
);

create index os_snapshots_objective_time_idx
  on public.os_progress_snapshots (objective_id, captured_at desc);
```

### RLS policy (v1)

Same as leads desk: **no public policies**. All reads/writes go through Next.js API routes with service role + session check. Keeps auth logic in one place and matches existing patterns.

---

## 7. Progress & health rules

### Objective progress (auto-derived)

```text
progressPct = round( doneProjects / totalProjects * 100 )
```

- If `totalProjects === 0` → progress = 0, health = yellow (needs projects)
- Weight all projects equally in v1 (no weight field yet)

### Objective health

| Condition | Health |
|-----------|--------|
| Admin set `health_override` | Use override |
| progress ≥ 70% OR on pace for quarter | green |
| progress 40–69% OR deadline risk | yellow |
| progress < 40% OR blocked P1 project | red |

**On pace heuristic (v1):** `expectedProgress = (daysElapsedInQuarter / daysInQuarter) * 100`. If `progressPct + 15 < expectedProgress` → downgrade one level.

### Key result progress

Display only: `current / target unit` + bar `(current / target) * 100` capped at 100%.

### Member load (WIP signal)

```text
activeCount = projects where ownerId = member AND status IN ('active', 'blocked')
```

Collaborators (`collaboratorIds`) are **not** counted. One accountable owner per project keeps load honest for a 2-person team.

| activeCount | Signal |
|-------------|--------|
| 0–2 | OK |
| 3 | Watch |
| 4+ | Overloaded (show on home) |

### Year progress ring (home)

Average of all objectives in the active year (equal weight).

---

## 8. Authentication

### Requirements

- Per-user identity (for owners, wins, load)
- Team-only access
- No shared password
- Reuse Resend + NextAuth

### Flow

1. User visits `/os/signin`
2. Enters email → NextAuth **Email provider** sends magic link via Resend
3. On verify: session created with email + member id
4. Middleware/layout checks email exists in `os_members` (or env fallback seed)
5. Non-allowlisted emails → sign out + “Not on the team list” message

### Implementation notes

- **Separate sign-in page** at `/os/signin` — do not reuse client desk `/signin` (password-based today)
- Extend `src/lib/auth.ts` or add `src/lib/os/auth.ts` with Email provider
- Env: `RDX_OS_TEAM_EMAILS` for bootstrap before `os_members` table is populated
- Session callback attaches `role: admin | member` from `os_members`
- Magic link tokens: NextAuth default (JWT session strategy, same as today)

### Role permissions

| Action | Admin | Member |
|--------|-------|--------|
| Edit North Star | ✅ | ❌ |
| CRUD pillars | ✅ | ❌ |
| CRUD objectives & KRs | ✅ | ❌ |
| Set focus of the week | ✅ | ❌ |
| CRUD projects (own + others) | ✅ | ✅ |
| Mark project done + log win | ✅ | ✅ |
| Update KR current values | ✅ | ✅ |
| View all pages | ✅ | ✅ |

---

## 9. Routes & pages

Base path: `/os`

| Route | Page | v1 |
|-------|------|-----|
| `/os/signin` | Magic link entry | ✅ |
| `/os` | Command Center (home) | ✅ |
| `/os/goals` | North Star + pillars + objectives + KRs | ✅ |
| `/os/projects` | Kanban board | ✅ |
| `/os/progress` | Current quarter roll-up | ✅ |
| `/os/team` | Member list + load view | ✅ mock |
| `/os/review` | Quarterly review guided page | Phase 0.5 |
| `/os/reports` | Month/quarter/year trends (charts) | Phase 2 |

All pages behind auth. Redirect unauthenticated → `/os/signin`.

---

## 10. Page specifications

### 10.1 App shell (`OsShell`)

```text
┌──────────────────────────────────────────────────────────────┐
│ [RDX OS]                              Q3 2026  [+ Quick add] │
├──────────┬───────────────────────────────────────────────────┤
│ Home     │                                                   │
│ Goals    │              { page content }                     │
│ Projects │                                                   │
│ Progress │                                                   │
│          │                                                   │
│ ──────── │                                                   │
│ [avatar] │                                                   │
└──────────┴───────────────────────────────────────────────────┘
```

- **Sidebar:** fixed left, 220px desktop; collapsible drawer on mobile
- **Top bar:** current quarter chip, focus-of-week pills (when set), quick-add dropdown (project / win / KR update)
- **Theme:** dark surface (`--os-color-bg`, `--os-color-surface`) with RDX accent for progress and CTAs
- **Quick-add:** Member → project or win. Admin → also objective/KR

### 10.2 Command Center (`/os`)

Sections top → bottom:

1. **North Star banner** — statement + year ring (overall progress %)
2. **Pillar row** — 4 cards max visible, horizontal scroll on mobile. Each: name, objective count, avg progress, active projects count
3. **This quarter** — objective cards with progress bar, health dot, linked P1 project count
4. **Three columns (stack on mobile):**
   - Priority projects (P1 + active, sorted by deadline)
   - Due soon (deadline within 14 days)
   - Wins strip (last 5 wins)
5. **Team load footer** — compact avatars with active project count; highlight 4+

**Empty states:** friendly copy + CTA for admin to set North Star / first objective.

### 10.3 Goals (`/os/goals`)

- Year selector (default: active year)
- North Star editable inline (admin only)
- Accordion per pillar → objectives grouped by quarter
- Each objective expands to: outcome text, KRs with current/target inputs, linked projects list
- Admin: add/edit/archive objective & KR
- Member: update KR current values only

### 10.4 Projects (`/os/projects`)

Kanban columns: **Backlog · Active · Blocked · Done**

Card shows: title, owner avatar, priority badge, deadline, objective pill (pillar color).

- Drag-and-drop: Phase 2 (v1: status dropdown on card or detail panel)
- Click card → slide-over detail: edit fields, link to objective, mark done → prompt to log win
- Filters: pillar, owner, priority, quarter

### 10.5 Progress (`/os/progress`)

v1 = **current quarter dashboard** (not full historical reports yet):

- Quarter selector
- Summary cards: objectives on track / at risk, projects shipped this quarter, wins count
- Table: objective · progress bar · health · projects done/total · KR summary
- **Snapshot note:** “Trend charts coming — history is being captured weekly.”

Phase 2 `/os/reports`: line charts from `os_progress_snapshots`, quarter compare, year review export.

---

## 11. Data access pattern (mock → Supabase)

Single module boundary — components never import Supabase directly.

File: `src/lib/os/data.ts`

```typescript
// Phase 0–1: mock
import { mockCommandCenter } from "@/content/os/mock-data";

export async function getCommandCenter(): Promise<CommandCenterData> {
  return mockCommandCenter;
}

// Phase 1b: swap implementation
// export async function getCommandCenter() {
//   return fetchFromSupabase(...);
// }
```

Same pattern for mutations: `createProject`, `updateKeyResult`, etc.

API routes (when wired):

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/os/command-center` | Home aggregate |
| GET/POST/PATCH | `/api/os/objectives` | Objectives CRUD |
| GET/POST/PATCH | `/api/os/projects` | Projects CRUD |
| GET/POST/PATCH | `/api/os/key-results` | KR updates |
| GET/POST | `/api/os/wins` | Wins |
| POST | `/api/os/snapshots/capture` | Weekly snapshot (cron or manual admin) |

---

## 12. Mock seed content (UI-first)

File: `src/content/os/mock-data.ts`

Seed a realistic **2026** scenario matching founder examples:

- **North Star:** “Build a sustainable RDX engine: client revenue, one shipped SaaS, and one public content channel — without burning out the team.”
- **Pillars:** Client Services, SaaS, YouTube, Research
- **4–6 objectives** across Q3/Q4 with KRs
- **8–12 projects** in mixed statuses
- **3 members** (1 admin, 2 members) with realistic load spread
- **3–5 wins**

This lets the team click through and validate UX before any database work.

---

## 13. Design system (OS layer)

Extend — do not replace — Hallmark tokens.

File: `src/styles/os/theme.css`

```css
.os-theme {
  --os-color-bg: oklch(16% 0.01 260);
  --os-color-surface: oklch(20% 0.01 260);
  --os-color-surface-raised: oklch(24% 0.01 260);
  --os-color-border: oklch(30% 0.01 260);
  --os-color-text: oklch(95% 0 0);
  --os-color-muted: oklch(65% 0.01 260);
  /* Reuse --rdx-color-accent for progress, CTAs, health highlights */
}
```

Apply `.os-theme` on `(os)` layout root only — marketing pages stay light/quiet.

**Typography:** `--rdx-font-sans` for UI; `--rdx-font-display` for North Star statement only.

**Motion:** subtle framer-motion on page enter and card hover — no confetti, no gamification noise.

---

## 14. Snapshot capture (for future reports)

Even in v1, run snapshot capture so Phase 2 reports have data:

**Trigger:** every Monday 06:00 UTC (Vercel cron → `POST /api/os/snapshots/capture`) OR on any KR `current_value` update (debounced).

**Payload per objective:** `progress_pct` + array of `{ krId, current }`.

Do not build charts in v1 — just store and show “capturing history” in Progress page footer.

---

## 15. Environment variables

Add to `.env.example`:

```bash
# RDX OS — internal team (Phase 0+)
RDX_OS_TEAM_EMAILS=founder@example.com,teammate@example.com
# Optional bootstrap admin subset (defaults to first team email)
RDX_OS_ADMIN_EMAILS=founder@example.com

# Magic link (NextAuth Email provider — uses existing Resend)
# RESEND_API_KEY=          # already present
# NEXTAUTH_SECRET=         # already present
# NEXTAUTH_URL=            # site URL for magic link callback
```

Uses existing `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` when DB is wired.

---

## 16. Implementation phases

### Phase 0 — UI shell + interactive mock ✅

**Goal:** Clickable cockpit the team can react to — with synced mock state.

| Task | Output | Status |
|------|--------|--------|
| Types | `src/types/os/index.ts` | ✅ |
| Mock data | `src/content/os/mock-data.ts` | ✅ |
| Theme | `src/styles/os/theme.css`, `(os)` layout with `.os-theme` | ✅ |
| Shell | `OsShell`, sidebar nav, top bar | ✅ |
| Pages | `/os`, `/os/goals`, `/os/projects`, `/os/progress`, `/os/team` | ✅ |
| Sign-in stub | `/os/signin` UI only (no real auth yet) | ✅ |
| Mock store | `OsDataContext` + sessionStorage sync | ✅ |
| Quick-add | Park idea → backlog (capacity-aware) | ✅ |
| Project detail | Activate / park / ship with guards | ✅ |
| Check-in | Weekly form → Team page | ✅ |
| Goals edit | Vision + KR inline (admin mock) | ✅ |
| Progress trends | SVG charts + snapshot seed | ✅ |

**Exit:** Founder + team review UX in dev — **done**. Proceed to Phase 0.5 before backend.

---

### Phase 0.5 — Mock validation (team trial) 📋 **ACTIVE**

**Goal:** Run the mock with the real team for **2–4 weeks** using real rituals (even if data stays mock). Discover gaps *before* Supabase work. **Do not start Phase 1 until this checklist is signed off.**

#### Gate question (must answer “yes”)

> Can any teammate, on Monday morning, say in one breath: where we're going this year, what's focused this week, whether we have room for more — and name something good we shipped last week?

If no — fix mock/ritual, not backend.

---

#### Phase 0.5 mock build checklist

Build or validate these in mock **before** Phase 1. Priority order:

| # | Item | Purpose | Mock acceptance criteria | Status |
|---|------|---------|---------------------------|--------|
| 1 | **Decline / archive backlog** | Stop backlog graveyard | Backlog item → Decline (reason) or Archive; removed from active park list; optional “declined” view | ✅ |
| 2 | **Capacity override** | Real teams bend rules | Admin activates over limit with required reason; reason visible on project + Team log | ✅ |
| 3 | **Ship reflection** | Fulfillment habit | “Mark shipped” prompts: *What changed for them?* → becomes win note | ✅ |
| 4 | **Quarterly review page** | Cadence anchor | `/os/review` mock: read-only quarter summary + set next-quarter focus stub | ✅ |
| 5 | **Check-in nudge** | No founder-only updates | Team page shows who hasn't checked in this week | ✅ |
| 6 | **Project links** | OS = why; tools = how | Detail panel: Links field (Figma, GitHub, lead desk URL) | ✅ |
| 7 | **Pillar lead** | Lane ownership | Each category card shows lead name (optional member) | ✅ |

**Already done in mock (validate during trial):** quick-add, capacity bars, backlog park, check-in form, vision edit, trends, project detail actions, team load.

---

#### Recurring rituals (calendar)

These are **product behaviors**, not meeting notes. Phase 0.5 validates that the UI supports them.

| When | Ritual | Who | Duration | OS surfaces |
|------|--------|-----|----------|-------------|
| **Monday** | Set / confirm focus (max 3) | Admin | 5 min | Top bar focus pills, Projects focus strip |
| **Monday** | Team reads North Star + capacity | Everyone | 2 min | Home: vision banner + capacity bar |
| **Wed** | Async check-in | Each member | 60 sec | Team → check-in form |
| **Friday** | Ship + park | Whoever shipped / got distracted | 5 min | Mark shipped + wins strip; Park idea |
| **Last week of quarter** | Quarterly review | Admin + team | 30–45 min | `/os/review` (Phase 0.5 mock) |
| **Monthly** | Backlog triage | Admin | 15 min | Decline stale items; max ~10 parked |

**Rule:** Updating OS any week should take **< 2 minutes per person** (check-in + one action).

---

#### Quarterly review ritual (walkthrough)

Use this agenda the first time with the mock (or a call + screen share). No backend required.

**Prep (admin, 10 min before)**

1. Open `/os/progress` — screenshot or note trend direction per objective.
2. Open `/os/team` — note who was overloaded (4+ active) any week.
3. Open Backlog park — count parked items; list any older than 60 days.

**Agenda (30–45 min, whole team)**

| Step | Time | Prompt | OS action |
|------|------|--------|-----------|
| 1. Re-read North Star | 5 min | “Still true? Still us?” | `/os/goals` — read vision aloud; edit if needed (mock) |
| 2. Wins | 10 min | “What are we proud of — for *people*, not just money?” | Home wins strip; each win: who it helped |
| 3. Objectives scorecard | 10 min | Per pillar: green / yellow / red — honest, no blame | `/os/progress` table + trends |
| 4. Capacity retrospective | 5 min | “Did limits help or hurt? Adjust slots?” | Team scaling rules; propose new limits if needed |
| 5. Backlog triage | 5 min | Activate / decline / keep parked | Decline noise; activate only if slot free |
| 6. Next quarter bets | 10 min | Max 1–2 objectives per pillar; rest waits | Goals page — note Q+1 objectives (mock edit) |
| 7. Focus for week 1 | 5 min | Pick 3 projects for first week of new quarter | Set focus (mock admin) |

**Outputs (must exist after review)**

- [ ] Updated or confirmed North Star text
- [ ] List of declined backlog items (with reasons)
- [ ] Agreed capacity limits for next quarter (team + per pillar + per person)
- [ ] 3 focus projects for first week of new quarter
- [ ] 1–2 sentences: *“What we learned about how we work”* (log in review page mock)

**Mock page spec: `/os/review` (Phase 0.5 build)**

- Quarter selector (default: current)
- Auto-filled sections: wins count, shipped projects, avg team load, objectives at risk
- Text area: “What we learned” (session-persisted like other mock data)
- Checklist UI matching outputs above
- CTA: “Set focus for next quarter” → links to Projects (stub)

---

#### Failure modes to watch during trial

| Signal | Meaning | Response |
|--------|---------|----------|
| Only admin updates OS | Tool = founder diary | Mandatory check-in; nudge on Team |
| Backlog > 10 items | Anxiety, not relief | Monthly decline ritual; max cap in UI |
| Focus changes daily | No discipline | Admin-only focus; weekly change max |
| Categories ignored | Work doesn't ladder up | Every project must pick a pillar |
| Wins empty for 2+ weeks | Nothing shipping | Friday ship prompt; smaller projects |
| Team ignores capacity warnings | Limits meaningless | Override log + retro conversation |
| Parallel Notion/Slack truth | OS dies | OS owns priorities only; link out |

---

#### Phase 0.5 sign-off (before Phase 1)

| # | Criterion | Owner | Done |
|---|-----------|-------|------|
| 1 | Team used mock (or real OS) for ≥ 2 weeks of Monday/Wed/Friday rituals | Founder | ⬜ |
| 2 | Checklist items 1–7 built or explicitly deferred with reason | Dev | ⬜ |
| 3 | Quarterly review run once (even on current quarter) | Team | ⬜ |
| 4 | Gate question answered “yes” by ≥ 2 team members | Founder | ⬜ |
| 5 | Phase 0.5 gaps logged as Phase 1 tasks (not surprises) | Dev | ⬜ |

**Deferred items** must be noted in this doc with founder approval — not silently skipped.

---

### Phase 1 — Auth + Supabase + wire-up

**Goal:** Real team can log in and edit data.

| Task | Output |
|------|--------|
| Migration | `010_os_core.sql` + seed pillars/members |
| Auth | Email magic link, allowlist, role in session |
| Data layer | Replace mock imports in `src/lib/os/data.ts` |
| API routes | CRUD for projects, objectives, KRs, wins |
| Mutations | Forms on Goals + Projects + quick-add |
| Snapshots | Capture job + manual trigger |
| Middleware | Protect `/os/*` routes |

**Exit:** Admin can set North Star/objectives; members can manage projects; home reflects live data.

### Phase 2 — Rhythm & reports (post-v1)

- Weekly async check-in form
- `/os/team` load heatmap
- `/os/reports` trend charts from snapshots
- Drag-and-drop kanban
- Monday digest email via Resend
- Focus-of-week picker UI

### Phase 3 — Integrations

- YouTube / analytics API for live KR values
- GitHub commit/link on projects
- Export year review PDF

---

## 17. File map (Phase 0 create list)

```text
src/app/(os)/os/layout.tsx
src/app/(os)/os/page.tsx
src/app/(os)/os/goals/page.tsx
src/app/(os)/os/projects/page.tsx
src/app/(os)/os/progress/page.tsx
src/app/(os)/os/signin/page.tsx

src/components/os/shell/OsShell.tsx
src/components/os/shell/OsSidebar.tsx
src/components/os/shell/OsTopBar.tsx
src/components/os/home/NorthStarBanner.tsx
src/components/os/home/PillarCards.tsx
src/components/os/home/QuarterObjectives.tsx
src/components/os/home/PriorityProjects.tsx
src/components/os/home/WinsStrip.tsx
src/components/os/home/TeamLoad.tsx
src/components/os/goals/GoalsView.tsx
src/components/os/projects/ProjectsBoard.tsx
src/components/os/projects/ProjectCard.tsx
src/components/os/progress/ProgressSummary.tsx

src/content/os/mock-data.ts
src/lib/os/data.ts
src/lib/os/progress.ts          # health + progress math
src/types/os/index.ts
src/styles/os/theme.css
```

---

## 18. Out of scope (v1)

- Task/subtask lists per project
- Comments / threads
- File attachments
- Notifications (except magic link email)
- Mobile native app
- Multi-workspace / multi-tenant
- Client desk integration (leads ↔ projects link) — future optional
- Replacing Notion entirely — OS complements ops tools

---

## 19. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Tool becomes stale | < 2 min update rule; wins visible; weekly focus; check-in nudge |
| Scope creep into Jira | Projects only — no task hierarchy in v1 |
| Auth confusion with client desk | Separate `/os/signin` + magic link vs password `/signin` |
| Marketing revamp conflict | Isolated `(os)` zone + this doc as governance |
| No historical data for reports | Snapshots from Phase 1 day one |
| Dark theme drift from brand | OS theme extends rdx tokens, not a new palette |
| Founder-only updates | Mandatory check-in; Team nudge for missing |
| Backlog hoarding | Decline/archive ritual; max ~10 parked (Phase 0.5) |
| Two sources of truth | OS = priorities; link to Notion/Slack/GitHub, don't duplicate |
| Mission copy feels hollow | Ship reflection + quarterly impact revisit |

---

## 20. Open questions (resolve at Phase 0 kickoff)

| # | Question | Default if no answer |
|---|----------|----------------------|
| 1 | Active year — always calendar year? | Yes — `2026` |
| 2 | How many pillars max? | 6 (UI wraps) |
| 3 | Can one project link to multiple objectives? | No in v1 (1:1) |
| 4 | Archive done projects or keep in Done column? | Keep in Done; filter by quarter |
| 5 | Subdomain later (`os.rdx...`)? | Same path for now; middleware rewrite optional |

---

## 21. Related docs

- [RDX_Lead_Desk_Plan.md](./RDX_Lead_Desk_Plan.md) — separate admin surface (`/dashboard`)
- [RDX_Implementation_Standards.md](./RDX_Implementation_Standards.md) — code quality (adapt: use `os/` not `rdx/` for OS components)
- [RDX_File_Ownership_Map.md](./RDX_File_Ownership_Map.md) — add OS zone when Phase 0 starts

---

*Last updated: July 20, 2026 — Phase 0.5 validation spec added*
