import type { OsMember } from "@/types/os";

export function normalizeOsEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Parse comma-separated env allowlist */
export function parseEmailList(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((e) => normalizeOsEmail(e))
    .filter(Boolean);
}

/**
 * Bootstrap allowlist from env (Phase 1+). Empty → caller should fall back to
 * seeded `os_members` / mock members.
 */
export function getEnvTeamEmails(): string[] {
  return parseEmailList(process.env.RDX_OS_TEAM_EMAILS);
}

export function getEnvAdminEmails(): string[] {
  const admins = parseEmailList(process.env.RDX_OS_ADMIN_EMAILS);
  if (admins.length > 0) return admins;
  return getEnvTeamEmails();
}

export function isEmailOnAllowlist(
  email: string,
  allowlist: string[]
): boolean {
  const normalized = normalizeOsEmail(email);
  return allowlist.some((e) => e === normalized);
}

export function findCoreMemberByEmail(
  email: string,
  members: OsMember[]
): OsMember | undefined {
  const normalized = normalizeOsEmail(email);
  return members.find(
    (m) =>
      normalizeOsEmail(m.email) === normalized &&
      m.kind !== "employee" &&
      m.status !== "disabled"
  );
}
