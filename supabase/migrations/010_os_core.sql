-- RDX OS Phase 1: core schema + §12 locked real seed (July 21, 2026)
-- Idempotent where practical. No dummy client/revenue metrics.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.os_role_defs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  summary text not null default '',
  responsibilities jsonb not null default '[]'::jsonb,
  principles jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.os_members (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  role text not null check (role in ('admin', 'member')),
  org_role_id uuid references public.os_role_defs(id) on delete set null,
  kind text not null default 'core' check (kind in ('core', 'employee')),
  status text not null default 'active'
    check (status in ('active', 'invited', 'disabled')),
  avatar_url text,
  active_limit int,
  created_at timestamptz not null default now()
);

create table if not exists public.os_north_stars (
  id uuid primary key default gen_random_uuid(),
  year int not null unique,
  statement text not null,
  mission text not null default '',
  why_it_matters text not null default '',
  is_active boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.os_pillars (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  emoji text,
  description text not null default '',
  sort_order int not null default 0,
  active_slot_limit int not null default 1,
  lead_id uuid references public.os_members(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.os_team_capacity (
  id int primary key default 1 check (id = 1),
  team_active_limit int not null default 5,
  updated_at timestamptz not null default now()
);

create table if not exists public.os_objectives (
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

create table if not exists public.os_key_results (
  id uuid primary key default gen_random_uuid(),
  objective_id uuid not null references public.os_objectives(id) on delete cascade,
  label text not null,
  current_value numeric not null default 0,
  target_value numeric not null,
  unit text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.os_projects (
  id uuid primary key default gen_random_uuid(),
  objective_id uuid not null references public.os_objectives(id) on delete restrict,
  title text not null,
  kind text not null default 'internal'
    check (kind in ('client_linked', 'internal')),
  owner_id uuid not null references public.os_members(id),
  collaborator_ids uuid[] not null default '{}',
  status text not null default 'backlog'
    check (status in ('backlog', 'active', 'blocked', 'done', 'declined', 'archived')),
  priority text not null default 'p2'
    check (priority in ('p1', 'p2', 'p3')),
  deadline date,
  summary text,
  notes text,
  who_it_helps text,
  fulfillment_note text,
  blocker_note text,
  backlog_reason text,
  decline_reason text,
  links jsonb not null default '[]'::jsonb,
  rdx_project_id uuid,
  rdx_lead_id uuid,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists os_projects_objective_idx on public.os_projects (objective_id);
create index if not exists os_projects_owner_idx on public.os_projects (owner_id);
create index if not exists os_projects_status_idx on public.os_projects (status);

create table if not exists public.os_wins (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.os_projects(id) on delete set null,
  title text not null,
  note text,
  created_by_id uuid not null references public.os_members(id),
  created_at timestamptz not null default now()
);

create table if not exists public.os_focus_weeks (
  id uuid primary key default gen_random_uuid(),
  week_start date not null unique,
  project_ids uuid[] not null default '{}',
  set_by_id uuid references public.os_members(id),
  created_at timestamptz not null default now()
);

create table if not exists public.os_progress_snapshots (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  year int not null,
  quarter int not null check (quarter between 1 and 4),
  objective_id uuid not null references public.os_objectives(id) on delete cascade,
  progress_pct numeric not null check (progress_pct between 0 and 100),
  kr_values jsonb not null default '[]'::jsonb
);

create index if not exists os_snapshots_objective_time_idx
  on public.os_progress_snapshots (objective_id, captured_at desc);

create table if not exists public.os_magic_tokens (
  token_hash text primary key,
  email text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists os_magic_tokens_email_idx
  on public.os_magic_tokens (email);

-- RLS on; no public policies (service role via API only)
alter table public.os_role_defs enable row level security;
alter table public.os_members enable row level security;
alter table public.os_north_stars enable row level security;
alter table public.os_pillars enable row level security;
alter table public.os_team_capacity enable row level security;
alter table public.os_objectives enable row level security;
alter table public.os_key_results enable row level security;
alter table public.os_projects enable row level security;
alter table public.os_wins enable row level security;
alter table public.os_focus_weeks enable row level security;
alter table public.os_progress_snapshots enable row level security;
alter table public.os_magic_tokens enable row level security;

-- ---------------------------------------------------------------------------
-- Bootstrap + operational seed (§12)
-- Deterministic IDs for stable references across environments
-- ---------------------------------------------------------------------------

do $$
declare
  role_founder uuid := 'a1000001-0000-4000-8000-000000000001';
  role_cofounder uuid := 'a1000001-0000-4000-8000-000000000002';
  member_raj uuid := 'a2000001-0000-4000-8000-000000000001';
  member_gourob uuid := 'a2000001-0000-4000-8000-000000000002';
  ns_2026 uuid := 'a3000001-0000-4000-8000-000000000001';
  pillar_client uuid := 'a4000001-0000-4000-8000-000000000001';
  pillar_saas uuid := 'a4000001-0000-4000-8000-000000000002';
  pillar_yt uuid := 'a4000001-0000-4000-8000-000000000003';
  pillar_research uuid := 'a4000001-0000-4000-8000-000000000004';
  obj_client uuid := 'a5000001-0000-4000-8000-000000000001';
  obj_saas uuid := 'a5000001-0000-4000-8000-000000000002';
  obj_yt uuid := 'a5000001-0000-4000-8000-000000000003';
  obj_research uuid := 'a5000001-0000-4000-8000-000000000004';
  proj_hicu uuid := 'a6000001-0000-4000-8000-000000000001';
  proj_ielts uuid := 'a6000001-0000-4000-8000-000000000002';
  proj_youtube uuid := 'a6000001-0000-4000-8000-000000000003';
  proj_ieee uuid := 'a6000001-0000-4000-8000-000000000004';
  proj_survey uuid := 'a6000001-0000-4000-8000-000000000005';
  desk_project_id uuid;
  desk_lead_id uuid;
  week_monday date;
begin
  insert into public.os_role_defs (id, slug, name, summary, responsibilities, principles, sort_order, active)
  values
    (
      role_founder, 'founder', 'Founder',
      'Handles vision, fundraising, technology architecture, sales, hiring, and culture.',
      '["Own company vision and North Star","Fundraising and strategic partnerships","Technology architecture direction","Sales and client relationships","Hiring and culture"]'::jsonb,
      '["Vision first — every priority ladders up","Hire for ownership; protect culture","Architecture and sales stay honest and sustainable"]'::jsonb,
      1, true
    ),
    (
      role_cofounder, 'co-founder', 'Co-founder',
      'Head of Engineering — handles product execution, delivery, and the engineering team.',
      '["Head of Engineering","Product execution and shipping cadence","Delivery quality across active work","Lead and grow the engineering team"]'::jsonb,
      '["Execution over theory — ship what matters","Engineering bar is non-negotiable","Delivery clarity: blockers surface early"]'::jsonb,
      2, true
    )
  on conflict (id) do nothing;

  insert into public.os_members (id, email, name, role, org_role_id, kind, status, active_limit)
  values
    (member_raj, 'rajondeyofficial@gmail.com', 'Rajon', 'admin', role_founder, 'core', 'active', 3),
    (member_gourob, 'gourobdn15@gmail.com', 'Gourob', 'admin', role_cofounder, 'core', 'active', 3)
  on conflict (email) do update set
    name = excluded.name,
    role = excluded.role,
    org_role_id = excluded.org_role_id,
    kind = excluded.kind,
    status = excluded.status,
    active_limit = excluded.active_limit;

  insert into public.os_north_stars (id, year, statement, mission, why_it_matters, is_active, updated_at)
  values (
    ns_2026,
    2026,
    'Build and ship honest work across client delivery, our own product, and research — as one small team that stays sustainable.',
    'Help real users and clients with things that work; grow IELTS Ready and research that others can cite; keep client delivery calm and linked to how we operate.',
    'Client work funds the engine; IELTS Ready and papers compound what we own; YouTube waits until we have capacity — we improve together, not as separate lanes.',
    true,
    now()
  )
  on conflict (year) do update set
    statement = excluded.statement,
    mission = excluded.mission,
    why_it_matters = excluded.why_it_matters,
    is_active = true,
    updated_at = now();

  insert into public.os_team_capacity (id, team_active_limit, updated_at)
  values (1, 5, now())
  on conflict (id) do update set team_active_limit = 5, updated_at = now();

  insert into public.os_pillars (id, slug, name, emoji, description, sort_order, active_slot_limit, lead_id)
  values
    (pillar_client, 'client-services', 'Client Services', '💼',
     'Paid delivery — team projects link to Lead Desk; Desk owns billing and client notes.', 1, 2, member_raj),
    (pillar_saas, 'saas', 'SaaS', '🚀',
     'Products we own — roadmap and notes live in OS.', 2, 1, member_gourob),
    (pillar_yt, 'content', 'YouTube', '📺',
     'Public channel — parked until we have capacity.', 3, 0, member_raj),
    (pillar_research, 'research', 'Research Paper', '📄',
     'Published and in-progress papers — knowledge we own.', 4, 1, member_gourob)
  on conflict (slug) do update set
    name = excluded.name,
    emoji = excluded.emoji,
    description = excluded.description,
    sort_order = excluded.sort_order,
    active_slot_limit = excluded.active_slot_limit,
    lead_id = excluded.lead_id;

  insert into public.os_objectives (id, pillar_id, year, quarter, title, outcome, health_override, sort_order)
  values
    (obj_client, pillar_client, 2026, 3,
     'Deliver HICU Platform calmly',
     'Client runs on a reliable platform; Desk stays source of truth.', 'green', 1),
    (obj_saas, pillar_saas, 2026, 3,
     'Advance IELTS Ready',
     'Learners get a better practice product; roadmap lives in OS.', 'green', 1),
    (obj_yt, pillar_yt, 2026, 3,
     'Hold until ready',
     'Channel stays backlog — no fake progress.', 'yellow', 1),
    (obj_research, pillar_research, 2026, 3,
     'Finish journal survey; stand on published work',
     'One paper live; one moving toward submission.', 'green', 1)
  on conflict (id) do nothing;

  -- KRs: insert if objective has none yet
  if not exists (select 1 from public.os_key_results where objective_id = obj_client) then
    insert into public.os_key_results (objective_id, label, current_value, target_value, unit)
    values (obj_client, 'Active linked Desk projects on track', 1, 1, 'projects');
  end if;
  if not exists (select 1 from public.os_key_results where objective_id = obj_saas) then
    insert into public.os_key_results (objective_id, label, current_value, target_value, unit)
    values (obj_saas, 'IELTS Ready in active delivery', 1, 1, 'products');
  end if;
  if not exists (select 1 from public.os_key_results where objective_id = obj_yt) then
    insert into public.os_key_results (objective_id, label, current_value, target_value, unit)
    values (obj_yt, 'Channel setup steps done', 0, 3, 'steps');
  end if;
  if not exists (select 1 from public.os_key_results where objective_id = obj_research) then
    insert into public.os_key_results (objective_id, label, current_value, target_value, unit)
    values (obj_research, 'Papers published', 1, 2, 'papers');
  end if;

  -- Link HICU to Lead Desk when present
  select p.id, p.lead_id into desk_project_id, desk_lead_id
  from public.rdx_projects p
  where p.title = 'HICU Platform'
  order by p.created_at asc
  limit 1;

  insert into public.os_projects (
    id, objective_id, title, kind, owner_id, collaborator_ids, status, priority,
    summary, who_it_helps, fulfillment_note, links, rdx_project_id, rdx_lead_id, created_at, updated_at
  )
  values (
    proj_hicu, obj_client, 'HICU Platform', 'client_linked', member_raj, array[member_gourob],
    'active', 'p1',
    'Hexas — HICU development, platform work, and classes.',
    'Hexas / HICU team — reliable platform for their work',
    'Desk owns billing and client notes; OS owns priority and load.',
    '[{"label":"Lead Desk","url":"/dashboard"}]'::jsonb,
    desk_project_id, desk_lead_id,
    '2025-01-01T00:00:00Z', now()
  )
  on conflict (id) do update set
    rdx_project_id = coalesce(excluded.rdx_project_id, os_projects.rdx_project_id),
    rdx_lead_id = coalesce(excluded.rdx_lead_id, os_projects.rdx_lead_id),
    updated_at = now();

  insert into public.os_projects (
    id, objective_id, title, kind, owner_id, collaborator_ids, status, priority,
    summary, notes, who_it_helps, fulfillment_note, links, created_at, updated_at
  )
  values (
    proj_ielts, obj_saas, 'IELTS Ready', 'internal', member_gourob, array[member_raj],
    'active', 'p1',
    'IELTS Academic practice product we own. Split further work in notes as needed.',
    'Live product. Capture next slices here (features, fixes) without spinning up new capacity projects unless needed.',
    'IELTS Academic learners practicing for the exam',
    'A product we own — roadmap lives in OS, not Desk.',
    '[{"label":"Live site","url":"https://ieltsready.org/"}]'::jsonb,
    '2025-06-01T00:00:00Z', now()
  )
  on conflict (id) do nothing;

  insert into public.os_projects (
    id, objective_id, title, kind, owner_id, collaborator_ids, status, priority,
    summary, backlog_reason, who_it_helps, created_at, updated_at
  )
  values (
    proj_youtube, obj_yt, 'YouTube channel — setup', 'internal', member_raj, array[member_gourob],
    'backlog', 'p3',
    'Public YouTube channel for builders — not initiated yet.',
    'Not initiated — wait until client + SaaS capacity allows.',
    'Builders and small teams who learn from honest tutorials',
    now(), now()
  )
  on conflict (id) do nothing;

  insert into public.os_projects (
    id, objective_id, title, kind, owner_id, collaborator_ids, status, priority,
    summary, who_it_helps, fulfillment_note, links, completed_at, created_at, updated_at
  )
  values (
    proj_ieee, obj_research, 'Code Poisoning (IEEE)', 'internal', member_gourob, array[member_raj],
    'done', 'p1',
    'Code Poisoning Through Misleading Comments: Jailbreaking Large Language Models via Contextual Deception',
    'Researchers and practitioners studying LLM safety',
    'Published — knowledge others can cite.',
    '[{"label":"IEEE Xplore","url":"https://ieeexplore.ieee.org/document/11491067"}]'::jsonb,
    '2026-01-15T00:00:00Z', '2025-01-01T00:00:00Z', '2026-01-15T00:00:00Z'
  )
  on conflict (id) do nothing;

  insert into public.os_projects (
    id, objective_id, title, kind, owner_id, collaborator_ids, status, priority,
    summary, notes, who_it_helps, fulfillment_note, created_at, updated_at
  )
  values (
    proj_survey, obj_research, 'Agentic AI survey (journal)', 'internal', member_gourob, array[member_raj],
    'active', 'p1',
    'Agentic AI with Large Language Models: A Survey of Architectures, Evolutionary Dynamics, Governance, and Bounded Self-Improvement',
    'Journal paper in progress — track draft / venue / next milestone here.',
    'Researchers mapping agentic LLM systems and governance',
    'Second paper in flight toward submission.',
    '2026-03-01T00:00:00Z', now()
  )
  on conflict (id) do nothing;

  if not exists (select 1 from public.os_wins where project_id = proj_ieee) then
    insert into public.os_wins (project_id, title, note, created_by_id, created_at)
    values (
      proj_ieee,
      'IEEE paper published',
      'Code Poisoning Through Misleading Comments — jailbreaking LLMs via contextual deception',
      member_gourob,
      '2026-01-15T00:00:00Z'
    );
  end if;

  if not exists (select 1 from public.os_wins where project_id = proj_ielts and title = 'IELTS Ready live') then
    insert into public.os_wins (project_id, title, note, created_by_id, created_at)
    values (
      proj_ielts,
      'IELTS Ready live',
      'Product on the web at ieltsready.org',
      member_gourob,
      '2025-09-01T00:00:00Z'
    );
  end if;

  -- Focus week: Monday of current week (UTC)
  week_monday := date_trunc('week', timezone('utc', now()))::date;
  insert into public.os_focus_weeks (week_start, project_ids, set_by_id)
  values (week_monday, array[proj_hicu, proj_ielts, proj_survey], member_raj)
  on conflict (week_start) do update set
    project_ids = excluded.project_ids,
    set_by_id = excluded.set_by_id;

end $$;
