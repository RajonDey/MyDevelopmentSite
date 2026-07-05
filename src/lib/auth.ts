import { timingSafeEqual } from "crypto";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function getAdminEmail(): string {
  const allowlist = process.env.RDX_ADMIN_EMAILS?.split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  return allowlist?.[0] ?? "admin@rdx.local";
}

function verifyAdminPassword(password: string): boolean {
  const expected = process.env.RDX_ADMIN_PASSWORD;
  if (!expected || !password) {
    return false;
  }

  const provided = Buffer.from(password);
  const secret = Buffer.from(expected);
  if (provided.length !== secret.length) {
    return false;
  }

  return timingSafeEqual(provided, secret);
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!verifyAdminPassword(credentials?.password ?? "")) {
          return null;
        }

        return {
          id: "rdx-admin",
          email: getAdminEmail(),
          name: "RDX Admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        if (!session.user) {
          session.user = { id: token.id as string };
        } else {
          session.user.id = token.id as string;
        }
      }
      return session;
    },
  },
};

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowlist = process.env.RDX_ADMIN_EMAILS?.split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  if (!allowlist?.length) {
    return email.toLowerCase() === getAdminEmail().toLowerCase();
  }
  return allowlist.includes(email.toLowerCase());
}
