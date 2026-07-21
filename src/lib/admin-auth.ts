import { getServerSession } from "next-auth";
import { authOptions, isAdminEmail } from "@/lib/auth";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return null;
  }
  // OS magic-link sessions must not open Lead Desk
  if (session.osAccess && !session.deskAccess) {
    return null;
  }
  return session;
}
