import { Metadata } from "next";
import { OsSignInForm } from "@/components/os/signin/OsSignInForm";

export const metadata: Metadata = {
  title: "Sign in · RDX OS",
  robots: { index: false, follow: false },
};

export default function OsSignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <OsSignInForm />
    </div>
  );
}
