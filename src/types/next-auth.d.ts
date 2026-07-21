import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    /** Lead Desk password session */
    deskAccess?: boolean;
    /** RDX OS magic-link session */
    osAccess?: boolean;
    osRole?: "admin" | "member";
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    deskAccess?: boolean;
    osAccess?: boolean;
    osRole?: "admin" | "member";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    deskAccess?: boolean;
    osAccess?: boolean;
    osRole?: "admin" | "member";
  }
}
