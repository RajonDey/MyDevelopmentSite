-- RDX Lead Desk Phase 7b.2: projects + invoice v2 (dual currency, bill-to snapshot)

create table if not exists public.rdx_projects (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.rdx_leads(id) on delete cascade,
  title text not null,
  summary text,
  notes text,
  links jsonb not null default '{}'::jsonb,
  status text not null default 'active' check (
    status in ('active', 'completed', 'archived')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists rdx_projects_lead_id_idx
  on public.rdx_projects (lead_id);

alter table public.rdx_projects enable row level security;

-- Invoice extensions
alter table public.rdx_invoices
  add column if not exists legacy_ref text,
  add column if not exists billing_period text,
  add column if not exists project_id uuid references public.rdx_projects(id) on delete set null,
  add column if not exists bill_to_name text,
  add column if not exists bill_to_address text,
  add column if not exists amount_bdt integer check (amount_bdt is null or amount_bdt > 0),
  add column if not exists usd_bdt_rate numeric(10, 4) check (usd_bdt_rate is null or usd_bdt_rate > 0),
  add column if not exists client_region text check (
    client_region is null
    or client_region in ('bd', 'international')
  );

create unique index if not exists rdx_invoices_legacy_ref_idx
  on public.rdx_invoices (legacy_ref)
  where legacy_ref is not null;

-- Relax USD-only constraint; require at least one positive amount
alter table public.rdx_invoices drop constraint if exists rdx_invoices_amount_usd_check;

alter table public.rdx_invoices
  add constraint rdx_invoices_amount_usd_check check (amount_usd >= 0);

alter table public.rdx_invoices drop constraint if exists rdx_invoices_amount_positive_check;

alter table public.rdx_invoices
  add constraint rdx_invoices_amount_positive_check check (
    amount_usd > 0 or amount_bdt > 0
  );

-- Add bank_transfer_bd payment method
alter table public.rdx_invoices drop constraint if exists rdx_invoices_payment_method_check;

alter table public.rdx_invoices
  add constraint rdx_invoices_payment_method_check check (
    payment_method is null
    or payment_method in ('payoneer', 'wise', 'wire', 'bank_transfer_bd', 'other')
  );
