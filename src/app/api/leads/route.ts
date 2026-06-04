import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, isAdminEmail } from "@/lib/auth";
import { listLeads, updateLeadStatus } from "@/lib/leads";
import type { LeadStatus } from "@/types/rdx/lead";

async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await listLeads();
  return NextResponse.json({ leads });
}

export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const id = typeof body.id === "string" ? body.id : "";
  const status = body.status as LeadStatus;
  const validStatuses: LeadStatus[] = [
    "new",
    "reviewing",
    "qualified",
    "closed",
  ];

  if (!id || !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }

  const updated = await updateLeadStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
