import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getInvoice } from "@/lib/invoices";
import { getLead } from "@/lib/leads";
import { renderInvoicePdfBuffer } from "@/lib/invoice-pdf/render";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const invoice = await getInvoice(id);

  if (!invoice) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const lead = await getLead(invoice.lead_id);
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const billToName =
    invoice.bill_to_name?.trim() ||
    lead.billing_name?.trim() ||
    lead.agency_name;
  const billToAddress =
    invoice.bill_to_address?.trim() || lead.billing_address?.trim() || null;

  const pdfBuffer = await renderInvoicePdfBuffer({
    invoice,
    billToName,
    billToAddress,
  });

  const filename = `${invoice.invoice_number.replace(/\s+/g, "-")}.pdf`;

  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
