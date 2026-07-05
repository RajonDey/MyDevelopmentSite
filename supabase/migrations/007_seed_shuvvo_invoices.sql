-- RDX Lead Desk Phase 7b.6: Shuvvo / Hexas billing, HICU project, historical invoices
-- Safe to re-run: skips by legacy_ref

do $$
declare
  shuvvo_id uuid;
  hicu_id uuid;
  seed_rate numeric := 122;
begin
  select id into shuvvo_id
  from public.rdx_leads
  where email = 'saikatdascee@gmail.com'
     or agency_name = 'Shuvvo - Pujhons Vai'
     or agency_name ilike 'hexas%'
     or billing_name = 'Hexas'
  order by created_at asc
  limit 1;

  if shuvvo_id is null then
    raise notice 'Shuvvo/Hexas lead not found — run 004_seed_notion_leads.sql first';
    return;
  end if;

  update public.rdx_leads
  set
    billing_name = 'Hexas',
    billing_address = 'Sylhet',
    client_region = 'bd'
  where id = shuvvo_id;

  insert into public.rdx_projects (lead_id, title, summary, status)
  select
    shuvvo_id,
    'HICU Platform',
    'Hexas — HICU development, platform work, and classes',
    'active'
  where not exists (
    select 1
    from public.rdx_projects
    where lead_id = shuvvo_id and title = 'HICU Platform'
  );

  select id into hicu_id
  from public.rdx_projects
  where lead_id = shuvvo_id and title = 'HICU Platform'
  limit 1;

  -- RDX-2025-0001 · Aug 2025 · USD 770 · paid
  insert into public.rdx_invoices (
    lead_id, project_id, invoice_number, legacy_ref, billing_period,
    amount_usd, amount_bdt, usd_bdt_rate, status,
    bill_to_name, bill_to_address, client_region, payment_method,
    line_items, issued_at, paid_at
  )
  select
    shuvvo_id, hicu_id, 'RDX-2025-0001', '2025AUG3102', 'Aug 2025',
    770, round(770 * seed_rate), seed_rate, 'paid',
    'Hexas', 'Sylhet', 'bd', 'bank_transfer_bd',
    '[{"description":"Services — Aug 2025","amountUsd":770}]'::jsonb,
    '2025-08-31', '2025-09-05'::timestamptz
  where not exists (
    select 1 from public.rdx_invoices where legacy_ref = '2025AUG3102'
  );

  -- RDX-2025-0002 · Sep 2025 · USD 660 · paid
  insert into public.rdx_invoices (
    lead_id, project_id, invoice_number, legacy_ref, billing_period,
    amount_usd, amount_bdt, usd_bdt_rate, status,
    bill_to_name, bill_to_address, client_region, payment_method,
    line_items, issued_at, paid_at
  )
  select
    shuvvo_id, hicu_id, 'RDX-2025-0002', '2025SEP3001', 'Sep 2025',
    660, round(660 * seed_rate), seed_rate, 'paid',
    'Hexas', 'Sylhet', 'bd', 'bank_transfer_bd',
    '[{"description":"Services — Sep 2025","amountUsd":660}]'::jsonb,
    '2025-09-30', '2025-10-05'::timestamptz
  where not exists (
    select 1 from public.rdx_invoices where legacy_ref = '2025SEP3001'
  );

  -- RDX-2025-0003 · Oct 2025 · USD 650 · paid (legacy 2025OCT3103)
  insert into public.rdx_invoices (
    lead_id, project_id, invoice_number, legacy_ref, billing_period,
    amount_usd, amount_bdt, usd_bdt_rate, status,
    bill_to_name, bill_to_address, client_region, payment_method,
    line_items, issued_at, paid_at
  )
  select
    shuvvo_id, hicu_id, 'RDX-2025-0003', '2025OCT3103', 'Oct 2025',
    650, round(650 * seed_rate), seed_rate, 'paid',
    'Hexas', 'Sylhet', 'bd', 'bank_transfer_bd',
    '[{"description":"Services — Oct 2025","amountUsd":650}]'::jsonb,
    '2025-10-31', '2025-11-05'::timestamptz
  where not exists (
    select 1 from public.rdx_invoices where legacy_ref = '2025OCT3103'
  );

  -- RDX-2025-0004 · Nov–Dec 2025 · BDT 88,000 · paid
  insert into public.rdx_invoices (
    lead_id, project_id, invoice_number, legacy_ref, billing_period,
    amount_usd, amount_bdt, usd_bdt_rate, status,
    bill_to_name, bill_to_address, client_region, payment_method,
    line_items, issued_at, paid_at
  )
  select
    shuvvo_id, hicu_id, 'RDX-2025-0004', '2025NOV_DEC3103', 'Nov–Dec 2025',
    greatest(1, round(88000 / seed_rate)), 88000, seed_rate, 'paid',
    'Hexas', 'Sylhet', 'bd', 'bank_transfer_bd',
    '[{"description":"Services — Nov–Dec 2025","amountUsd":722}]'::jsonb,
    '2025-12-31', '2026-01-08'::timestamptz
  where not exists (
    select 1 from public.rdx_invoices where legacy_ref = '2025NOV_DEC3103'
  );

  -- RDX-2026-0001 · Jan–Feb 2026 · USD 665 · paid
  insert into public.rdx_invoices (
    lead_id, project_id, invoice_number, legacy_ref, billing_period,
    amount_usd, amount_bdt, usd_bdt_rate, status,
    bill_to_name, bill_to_address, client_region, payment_method,
    line_items, issued_at, paid_at
  )
  select
    shuvvo_id, hicu_id, 'RDX-2026-0001', '26JAN_FEB', 'Jan–Feb 2026',
    665, round(665 * seed_rate), seed_rate, 'paid',
    'Hexas', 'Sylhet', 'bd', 'bank_transfer_bd',
    '[{"description":"Services — Jan–Feb 2026","amountUsd":665}]'::jsonb,
    '2026-02-28', '2026-03-05'::timestamptz
  where not exists (
    select 1 from public.rdx_invoices where legacy_ref = '26JAN_FEB'
  );

  -- RDX-2026-0002 · Apr 2026 · BDT 45,000 · paid
  insert into public.rdx_invoices (
    lead_id, project_id, invoice_number, legacy_ref, billing_period,
    amount_usd, amount_bdt, usd_bdt_rate, status,
    bill_to_name, bill_to_address, client_region, payment_method,
    line_items, issued_at, paid_at
  )
  select
    shuvvo_id, hicu_id, 'RDX-2026-0002', '2026APRIL01', 'Apr 2026',
    greatest(1, round(45000 / seed_rate)), 45000, seed_rate, 'paid',
    'Hexas', 'Sylhet', 'bd', 'bank_transfer_bd',
    '[{"description":"Services — Apr 2026","amountUsd":369}]'::jsonb,
    '2026-04-01', '2026-04-08'::timestamptz
  where not exists (
    select 1 from public.rdx_invoices where legacy_ref = '2026APRIL01'
  );

  -- RDX-2026-0003 · May 2026 · BDT 50,000 · paid
  insert into public.rdx_invoices (
    lead_id, project_id, invoice_number, legacy_ref, billing_period,
    amount_usd, amount_bdt, usd_bdt_rate, status,
    bill_to_name, bill_to_address, client_region, payment_method,
    line_items, issued_at, paid_at
  )
  select
    shuvvo_id, hicu_id, 'RDX-2026-0003', '2026MAY04', 'May 2026',
    greatest(1, round(50000 / seed_rate)), 50000, seed_rate, 'paid',
    'Hexas', 'Sylhet', 'bd', 'bank_transfer_bd',
    '[{"description":"Services — May 2026","amountUsd":410}]'::jsonb,
    '2026-05-04', '2026-05-10'::timestamptz
  where not exists (
    select 1 from public.rdx_invoices where legacy_ref = '2026MAY04'
  );

  -- RDX-2026-0004 · Jun 2026 · BDT 21,600 · sent (unpaid)
  insert into public.rdx_invoices (
    lead_id, project_id, invoice_number, legacy_ref, billing_period,
    amount_usd, amount_bdt, usd_bdt_rate, status,
    bill_to_name, bill_to_address, client_region, payment_method,
    line_items, issued_at
  )
  select
    shuvvo_id, hicu_id, 'RDX-2026-0004', '2026JUN01', 'Jun 2026',
    176, 21600, seed_rate, 'sent',
    'Hexas', 'Sylhet', 'bd', 'bank_transfer_bd',
    '[
      {"description":"HICU platform development","quantity":22,"unit":"hours","unitRateUsd":8,"amountUsd":176}
    ]'::jsonb,
    '2026-07-05'
  where not exists (
    select 1 from public.rdx_invoices where legacy_ref = '2026JUN01'
  );

end $$;
