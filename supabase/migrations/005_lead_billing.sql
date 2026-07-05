-- RDX Lead Desk Phase 7b.1: billing identity for invoicing

alter table public.rdx_leads
  add column if not exists billing_name text,
  add column if not exists billing_address text,
  add column if not exists client_region text check (
    client_region is null
    or client_region in ('bd', 'international')
  );
