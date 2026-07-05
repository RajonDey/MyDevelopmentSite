import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getInvoice } from "@/lib/invoices";

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

  return NextResponse.json({ invoice });
}
