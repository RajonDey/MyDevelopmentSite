import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials?.email || "",
          password: credentials?.password || "",
        });

        if (error || !data.user) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.full_name,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { data: existingUser, error: selectError } = await supabase
            .from("users")
            .select("id")
            .eq("email", user.email)
            .single();

          if (selectError && selectError.code !== "PGRST116") {
            return false;
          }

          if (!existingUser) {
            const { error: insertError } = await supabase.from("users").insert({
              id: user.id,
              email: user.email!,
              name: user.name,
              password: null,
            });

            if (insertError) {
              return false;
            }
          }
        } catch {
          return false;
        }
      }
      return true;
    },
  },
};

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowlist = process.env.RDX_ADMIN_EMAILS?.split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  if (!allowlist?.length) {
    return false;
  }
  return allowlist.includes(email.toLowerCase());
}
