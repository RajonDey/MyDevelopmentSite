import { timingSafeEqual } from "crypto";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  consumeOsMagicToken,
  resolveOsAllowlistedMember,
} from "@/lib/os/magic-link";

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
      id: "credentials",
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
          deskAccess: true,
          osAccess: false,
        };
      },
    }),
    CredentialsProvider({
      id: "os-magic",
      name: "OS Magic Link",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const email = await consumeOsMagicToken(credentials?.token ?? "");
        if (!email) return null;

        const member = resolveOsAllowlistedMember(email);
        if (!member) return null;

        return {
          id: member.id,
          email: member.email,
          name: member.name,
          deskAccess: false,
          osAccess: true,
          osRole: member.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/os/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const u = user as {
          deskAccess?: boolean;
          osAccess?: boolean;
          osRole?: "admin" | "member";
        };
        token.deskAccess = Boolean(u.deskAccess);
        token.osAccess = Boolean(u.osAccess);
        token.osRole = u.osRole;
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
      session.deskAccess = Boolean(token.deskAccess);
      session.osAccess = Boolean(token.osAccess);
      session.osRole = token.osRole as "admin" | "member" | undefined;
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
