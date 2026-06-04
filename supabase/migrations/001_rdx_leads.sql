-- RDX Phase 6: lead storage
-- Run in Supabase SQL editor (service role bypasses RLS for API routes)

create table if not exists public.rdx_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form_type text not null check (form_type in ('start', 'audit', 'contact')),
  agency_name text not null,
  contact_name text not null,
  email text not null,
  status text not null default 'new' check (
    status in ('new', 'reviewing', 'qualified', 'closed')
  ),
  payload jsonb not null default '{}'::jsonb,
  source text not null default 'website'
);

create index if not exists rdx_leads_created_at_idx
  on public.rdx_leads (created_at desc);

create index if not exists rdx_leads_status_idx
  on public.rdx_leads (status);

alter table public.rdx_leads enable row level security;

-- No public policies: website writes via service role in Next.js API only.
