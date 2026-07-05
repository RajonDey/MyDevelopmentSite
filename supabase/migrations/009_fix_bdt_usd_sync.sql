-- Fix BDT-primary invoices saved without a locked rate (legacy $1 USD placeholder)

update public.rdx_invoices
set
  usd_bdt_rate = coalesce(usd_bdt_rate, 122),
  amount_usd = round(amount_bdt / coalesce(usd_bdt_rate, 122))
where amount_bdt > 0
  and (usd_bdt_rate is null or amount_usd <= 1);
