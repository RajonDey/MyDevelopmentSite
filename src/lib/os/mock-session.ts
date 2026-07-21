/** Mock OS session — Phase 0.5. Phase 1 replaces with NextAuth magic link. */

export const OS_MOCK_SESSION_KEY = "rdx-os-mock-session-v1";

export type OsMockSession = {
  email: string;
  signedInAt: string;
};

export function readOsMockSession(): OsMockSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(OS_MOCK_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OsMockSession;
    if (!parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeOsMockSession(email: string): void {
  if (typeof window === "undefined") return;
  const session: OsMockSession = {
    email: email.trim().toLowerCase(),
    signedInAt: new Date().toISOString(),
  };
  sessionStorage.setItem(OS_MOCK_SESSION_KEY, JSON.stringify(session));
}

export function clearOsMockSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(OS_MOCK_SESSION_KEY);
}
