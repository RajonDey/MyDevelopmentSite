-- RDX Lead Desk: Notion-aligned workflow fields + expanded statuses

alter table public.rdx_leads
  add column if not exists phone text,
  add column if not exists next_step text,
  add column if not exists notes text,
  add column if not exists last_contact_at timestamptz,
  add column if not exists lead_kind text not null default 'lead';

alter table public.rdx_leads
  alter column email drop not null;

alter table public.rdx_leads
  drop constraint if exists rdx_leads_status_check;

update public.rdx_leads
set status = case status
  when 'reviewing' then 'in_discussion'
  when 'qualified' then 'in_discussion'
  when 'closed' then 'won'
  else status
end;

alter table public.rdx_leads
  add constraint rdx_leads_status_check check (
    status in ('new', 'in_discussion', 'won', 'lost', 'archived')
  );

alter table public.rdx_leads
  drop constraint if exists rdx_leads_form_type_check;

alter table public.rdx_leads
  add constraint rdx_leads_form_type_check check (
    form_type in ('start', 'audit', 'contact', 'manual')
  );

alter table public.rdx_leads
  add constraint rdx_leads_next_step_check check (
    next_step is null
    or next_step in ('follow_up', 'send_proposal', 'no_response', 'waiting', 'none')
  );

alter table public.rdx_leads
  add constraint rdx_leads_lead_kind_check check (
    lead_kind in ('lead', 'task', 'idea')
  );

create index if not exists rdx_leads_last_contact_idx
  on public.rdx_leads (last_contact_at desc nulls last);

create index if not exists rdx_leads_next_step_idx
  on public.rdx_leads (next_step);
