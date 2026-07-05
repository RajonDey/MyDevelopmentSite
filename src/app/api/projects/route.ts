import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  createProject,
  listProjects,
  updateProject,
  validateCreateProjectInput,
  validateUpdateProjectInput,
} from "@/lib/projects";

export async function GET(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get("leadId") ?? undefined;
  const projects = await listProjects(leadId);

  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = validateCreateProjectInput(body);

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const project = await createProject(parsed);
  if (!project) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }

  return NextResponse.json({ project }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = validateUpdateProjectInput(body);

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const project = await updateProject(parsed);
  if (!project) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ project });
}
