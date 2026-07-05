-- One-time import from Notion Leads table (July 2026)
-- Safe to re-run: skips rows that match agency_name + source = notion-import

insert into public.rdx_leads (
  agency_name,
  contact_name,
  email,
  phone,
  form_type,
  status,
  source,
  next_step,
  notes,
  last_contact_at,
  lead_kind,
  payload
)
select *
from (
  values
    (
      'Shuvvo - Pujhons Vai',
      'Shuvvo',
      'saikatdascee@gmail.com',
      null::text,
      'manual',
      'won',
      'notion-import',
      'follow_up',
      'All the best!',
      '2025-07-18'::timestamptz,
      'lead',
      '{"lead_source":"Friend","imported_from":"notion"}'::jsonb
    ),
    (
      'Joyanto',
      'Joyanto',
      null::text,
      null::text,
      'manual',
      'won',
      'notion-import',
      'follow_up',
      null::text,
      '2025-10-06'::timestamptz,
      'lead',
      '{"lead_source":"Friend","imported_from":"notion"}'::jsonb
    ),
    (
      'Check Old Clients',
      '—',
      null::text,
      null::text,
      'manual',
      'new',
      'notion-import',
      null::text,
      null::text,
      null::timestamptz,
      'task',
      '{"imported_from":"notion"}'::jsonb
    ),
    (
      'Invoice Generator & Payment Tracker',
      '—',
      null::text,
      null::text,
      'manual',
      'new',
      'notion-import',
      null::text,
      'Internal product idea — build inside RDX Lead Desk instead of Notion.',
      null::timestamptz,
      'idea',
      '{"imported_from":"notion"}'::jsonb
    ),
    (
      'Halliburton Roofing',
      'Halliburton Roofing',
      null::text,
      null::text,
      'manual',
      'in_discussion',
      'notion-import',
      'send_proposal',
      null::text,
      '2025-11-12'::timestamptz,
      'lead',
      '{"lead_source":"Friend","imported_from":"notion"}'::jsonb
    ),
    (
      'Jaber''s Business Site',
      'Jaber',
      null::text,
      null::text,
      'manual',
      'new',
      'notion-import',
      null::text,
      null::text,
      null::timestamptz,
      'lead',
      '{"imported_from":"notion"}'::jsonb
    ),
    (
      'Share TrustPilot',
      '—',
      null::text,
      null::text,
      'manual',
      'new',
      'notion-import',
      null::text,
      'Marketing task — share TrustPilot reviews.',
      null::timestamptz,
      'task',
      '{"imported_from":"notion"}'::jsonb
    ),
    (
      'Shishir Tex Site',
      'Shishir',
      null::text,
      null::text,
      'manual',
      'new',
      'notion-import',
      null::text,
      null::text,
      null::timestamptz,
      'lead',
      '{"imported_from":"notion"}'::jsonb
    )
) as seed (
  agency_name,
  contact_name,
  email,
  phone,
  form_type,
  status,
  source,
  next_step,
  notes,
  last_contact_at,
  lead_kind,
  payload
)
where not exists (
  select 1
  from public.rdx_leads existing
  where existing.agency_name = seed.agency_name
    and existing.source = 'notion-import'
);
