import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type {
  CreateProjectInput,
  ProjectLinks,
  ProjectRecord,
  ProjectStatus,
  UpdateProjectInput,
} from "@/types/rdx/project";

const PROJECT_STATUSES: ProjectStatus[] = ["active", "completed", "archived"];

function mapProjectRow(data: Record<string, unknown>): ProjectRecord {
  const rawLinks = data.links;
  const links =
    rawLinks && typeof rawLinks === "object" && !Array.isArray(rawLinks)
      ? (rawLinks as ProjectLinks)
      : {};

  return {
    id: String(data.id),
    lead_id: String(data.lead_id),
    title: String(data.title),
    summary: data.summary ? String(data.summary) : null,
    notes: data.notes ? String(data.notes) : null,
    links,
    status: (data.status as ProjectStatus) ?? "active",
    created_at: String(data.created_at),
    updated_at: String(data.updated_at),
  };
}

export async function listProjects(leadId?: string): Promise<ProjectRecord[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("rdx_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (leadId) {
    query = query.eq("lead_id", leadId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to list projects:", error.message);
    return [];
  }

  return (data ?? []).map((row) => mapProjectRow(row as Record<string, unknown>));
}

export async function getProject(id: string): Promise<ProjectRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("rdx_projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to get project:", error.message);
    return null;
  }

  return mapProjectRow(data as Record<string, unknown>);
}

export async function createProject(
  input: CreateProjectInput
): Promise<ProjectRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("rdx_projects")
    .insert({
      lead_id: input.leadId,
      title: input.title.trim(),
      summary: input.summary?.trim() || null,
      notes: input.notes?.trim() || null,
      links: input.links ?? {},
      status: input.status ?? "active",
    })
    .select("*")
    .single();

  if (error) {
    console.error("Failed to create project:", error.message);
    return null;
  }

  return mapProjectRow(data as Record<string, unknown>);
}

export async function updateProject(
  input: UpdateProjectInput
): Promise<ProjectRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (input.title !== undefined) patch.title = input.title.trim();
  if (input.summary !== undefined) patch.summary = input.summary;
  if (input.notes !== undefined) patch.notes = input.notes;
  if (input.links !== undefined) patch.links = input.links;
  if (input.status !== undefined) patch.status = input.status;

  const { data, error } = await supabase
    .from("rdx_projects")
    .update(patch)
    .eq("id", input.id)
    .select("*")
    .single();

  if (error) {
    console.error("Failed to update project:", error.message);
    return null;
  }

  return mapProjectRow(data as Record<string, unknown>);
}

export async function deleteProject(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return false;
  }

  const { error } = await supabase.from("rdx_projects").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete project:", error.message);
    return false;
  }

  return true;
}

export function validateCreateProjectInput(
  body: unknown
): CreateProjectInput | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const leadId = record.leadId;
  const title = record.title;

  if (typeof leadId !== "string" || !leadId.trim()) {
    return { error: "Lead id is required" };
  }

  if (typeof title !== "string" || !title.trim()) {
    return { error: "Project title is required" };
  }

  const status = record.status;
  if (
    status !== undefined &&
    (typeof status !== "string" ||
      !PROJECT_STATUSES.includes(status as ProjectStatus))
  ) {
    return { error: "Invalid project status" };
  }

  return {
    leadId: leadId.trim(),
    title: title.trim(),
    summary: typeof record.summary === "string" ? record.summary : undefined,
    notes: typeof record.notes === "string" ? record.notes : undefined,
    links:
      record.links && typeof record.links === "object" && !Array.isArray(record.links)
        ? (record.links as ProjectLinks)
        : undefined,
    status: status as ProjectStatus | undefined,
  };
}

export function validateUpdateProjectInput(
  body: unknown
): UpdateProjectInput | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const id = record.id;

  if (typeof id !== "string" || !id.trim()) {
    return { error: "Project id is required" };
  }

  const title = record.title;
  if (
    title !== undefined &&
    (typeof title !== "string" || !title.trim())
  ) {
    return { error: "Project title cannot be empty" };
  }

  const status = record.status;
  if (
    status !== undefined &&
    (typeof status !== "string" ||
      !PROJECT_STATUSES.includes(status as ProjectStatus))
  ) {
    return { error: "Invalid project status" };
  }

  return {
    id,
    title: typeof title === "string" ? title : undefined,
    summary:
      record.summary === null
        ? null
        : typeof record.summary === "string"
          ? record.summary
          : undefined,
    notes:
      record.notes === null
        ? null
        : typeof record.notes === "string"
          ? record.notes
          : undefined,
    links:
      record.links && typeof record.links === "object" && !Array.isArray(record.links)
        ? (record.links as ProjectLinks)
        : undefined,
    status: status as ProjectStatus | undefined,
  };
}
