import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  getEnvAdminEmails,
  getEnvTeamEmails,
  normalizeOsEmail,
} from "@/lib/os/team-allowlist";
import { mockCommandCenter } from "@/content/os/mock-data";

/** Magic links expire in 20 minutes */
export const OS_MAGIC_LINK_TTL_MS = 20 * 60 * 1000;

export type OsAuthMember = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
};

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Resolve core member from env + §12 seed (DB lookup lands with API wire-up). */
export function resolveOsAllowlistedMember(
  email: string
): OsAuthMember | null {
  const normalized = normalizeOsEmail(email);
  const envTeam = getEnvTeamEmails();
  const envAdmins = getEnvAdminEmails();

  const fromSeed = mockCommandCenter.members.find(
    (m) =>
      normalizeOsEmail(m.email) === normalized &&
      m.kind !== "employee" &&
      m.status !== "disabled"
  );

  if (fromSeed) {
    const role: "admin" | "member" =
      envAdmins.length > 0
        ? envAdmins.includes(normalized)
          ? "admin"
          : fromSeed.role
        : fromSeed.role;
    return {
      id: fromSeed.id,
      email: fromSeed.email,
      name: fromSeed.name,
      role,
    };
  }

  // Env-only bootstrap before seed members exist
  if (envTeam.length > 0 && envTeam.includes(normalized)) {
    return {
      id: `env-${normalized}`,
      email: normalized,
      name: normalized.split("@")[0] ?? normalized,
      role: envAdmins.includes(normalized) ? "admin" : "member",
    };
  }

  return null;
}

export async function createOsMagicToken(email: string): Promise<string> {
  const normalized = normalizeOsEmail(email);
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + OS_MAGIC_LINK_TTL_MS).toISOString();

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("os_magic_tokens").insert({
      token_hash: tokenHash,
      email: normalized,
      expires_at: expiresAt,
    });
    if (error) {
      // Table may not exist yet — fall through to signed fallback
      if (process.env.NODE_ENV === "development") {
        console.warn("[os-auth] os_magic_tokens insert failed:", error.message);
      }
    } else {
      return token;
    }
  }

  // Stateless fallback (short TTL) when Supabase / table unavailable
  const payload = Buffer.from(
    JSON.stringify({ email: normalized, exp: Date.now() + OS_MAGIC_LINK_TTL_MS })
  ).toString("base64url");
  const secret = process.env.NEXTAUTH_SECRET ?? "dev-os-magic";
  const sig = createHash("sha256")
    .update(`${payload}.${secret}`)
    .digest("base64url");
  return `fb.${payload}.${sig}`;
}

export async function consumeOsMagicToken(
  token: string
): Promise<string | null> {
  if (!token) return null;

  if (token.startsWith("fb.")) {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [, payload, sig] = parts;
    const secret = process.env.NEXTAUTH_SECRET ?? "dev-os-magic";
    const expected = createHash("sha256")
      .update(`${payload}.${secret}`)
      .digest("base64url");
    try {
      const a = Buffer.from(sig);
      const b = Buffer.from(expected);
      if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
      const data = JSON.parse(
        Buffer.from(payload, "base64url").toString("utf8")
      ) as { email?: string; exp?: number };
      if (!data.email || !data.exp || Date.now() > data.exp) return null;
      return normalizeOsEmail(data.email);
    } catch {
      return null;
    }
  }

  const tokenHash = hashToken(token);
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("os_magic_tokens")
    .select("email, expires_at, used_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (error || !data) return null;
  if (data.used_at) return null;
  if (new Date(data.expires_at).getTime() < Date.now()) return null;

  const { error: updateError } = await supabase
    .from("os_magic_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("token_hash", tokenHash)
    .is("used_at", null);

  if (updateError) return null;
  return normalizeOsEmail(data.email);
}
