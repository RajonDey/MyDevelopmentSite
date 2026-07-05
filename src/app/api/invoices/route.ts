import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  createInvoice,
  deleteInvoice,
  listInvoices,
  updateInvoice,
  validateCreateInvoiceInput,
  validateUpdateInvoiceInput,
} from "@/lib/invoices";

export async function GET(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get("leadId") ?? undefined;
  const invoices = await listInvoices(leadId);

  return NextResponse.json({ invoices });
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = validateCreateInvoiceInput(body);

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const invoice = await createInvoice(parsed);
  if (!invoice) {
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }

  return NextResponse.json({ invoice }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = validateUpdateInvoiceInput(body);

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const invoice = await updateInvoice(parsed);
  if (!invoice) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ invoice });
}

export async function DELETE(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Invoice id required" }, { status: 400 });
  }

  const deleted = await deleteInvoice(id);
  if (!deleted) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
