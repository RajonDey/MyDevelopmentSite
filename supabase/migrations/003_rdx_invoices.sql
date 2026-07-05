-- RDX Lead Desk: manual invoicing per lead (Payoneer / Wise / wire)

create table if not exists public.rdx_invoices (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.rdx_leads(id) on delete cascade,
  invoice_number text not null unique,
  amount_usd integer not null check (amount_usd > 0),
  currency text not null default 'USD',
  status text not null default 'draft' check (
    status in ('draft', 'sent', 'paid', 'cancelled')
  ),
  description text,
  line_items jsonb not null default '[]'::jsonb,
  issued_at date,
  due_at date,
  paid_at timestamptz,
  payment_method text check (
    payment_method is null
    or payment_method in ('payoneer', 'wise', 'wire', 'other')
  ),
  payment_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists rdx_invoices_lead_id_idx
  on public.rdx_invoices (lead_id);

create index if not exists rdx_invoices_status_idx
  on public.rdx_invoices (status);

create index if not exists rdx_invoices_issued_at_idx
  on public.rdx_invoices (issued_at desc nulls last);

alter table public.rdx_invoices enable row level security;

-- No public policies: admin API uses service role only.
