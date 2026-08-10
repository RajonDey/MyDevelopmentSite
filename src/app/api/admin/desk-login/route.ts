import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import {
  getAdminEmail,
  verifyAdminPassword,
} from "@/lib/auth";

const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

function sessionCookieName() {
  return process.env.NODE_ENV === "production"
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";
}

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const form = await request.formData();
  const password = String(form.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return NextResponse.redirect(new URL("/signin?error=1", origin), 303);
  }

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/signin?error=1", origin), 303);
  }

  const token = await encode({
    token: {
      id: "rdx-admin",
      sub: "rdx-admin",
      email: getAdminEmail(),
      name: "RDX Admin",
      deskAccess: true,
      osAccess: false,
    },
    secret,
    maxAge: SESSION_MAX_AGE,
  });

  const response = NextResponse.redirect(new URL("/dashboard", origin), 303);
  response.cookies.set(sessionCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  return NextResponse.redirect(new URL("/signin", origin), 303);
}
