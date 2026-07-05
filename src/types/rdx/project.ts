export type ProjectStatus = "active" | "completed" | "archived";

export type ProjectLinks = {
  repo?: string;
  staging?: string;
  figma?: string;
  drive?: string;
  [key: string]: string | undefined;
};

export type ProjectRecord = {
  id: string;
  lead_id: string;
  title: string;
  summary: string | null;
  notes: string | null;
  links: ProjectLinks;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
};

export type CreateProjectInput = {
  leadId: string;
  title: string;
  summary?: string;
  notes?: string;
  links?: ProjectLinks;
  status?: ProjectStatus;
};

export type UpdateProjectInput = {
  id: string;
  title?: string;
  summary?: string | null;
  notes?: string | null;
  links?: ProjectLinks;
  status?: ProjectStatus;
};
