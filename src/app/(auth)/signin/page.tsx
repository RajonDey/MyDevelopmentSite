import { Metadata } from "next";
import { SignInForm } from "@/components/rdx/admin/SignInForm";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <RdxSection className="pt-4 md:pt-12">
      <RdxContainer className="max-w-lg">
        <SignInForm />
      </RdxContainer>
    </RdxSection>
  );
}
