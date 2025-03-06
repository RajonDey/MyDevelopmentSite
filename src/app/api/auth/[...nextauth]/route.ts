// /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const GET = NextAuth({
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
          console.log("Sign-in failed:", error?.message || "No user");
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.full_name, // From signup metadata
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
    strategy: "jwt" as const,
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
            console.log("Error checking user:", selectError.message);
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
              console.log("Error inserting user:", insertError.message);
              return false;
            }
          }
        } catch (err) {
          console.log("Unexpected error during Google sign-in:", err);
          return false;
        }
      }
      return true;
    },
  },
});

export const POST = GET;
