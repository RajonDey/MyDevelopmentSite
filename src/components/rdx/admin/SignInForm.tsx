import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { FormField, rdxInputClassName } from "@/components/rdx/forms/FormField";

type SignInFormProps = {
  initialPassword?: string;
  error?: boolean;
};

export function SignInForm({
  initialPassword = "",
  error = false,
}: SignInFormProps) {
  return (
    <RdxCard className="mx-auto max-w-md">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-rdx-ink">
          RDX leads
        </h1>
        <p className="text-sm text-rdx-muted">Admin access only.</p>
      </div>

      <form
        id="desk-signin"
        method="POST"
        action="/api/admin/desk-login"
        className="space-y-5"
      >
        <input
          type="text"
          name="username"
          autoComplete="username"
          defaultValue="rdx-admin"
          readOnly
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        />
        <FormField label="Password" htmlFor="password" required>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            defaultValue={initialPassword}
            className={rdxInputClassName}
            placeholder="Enter admin password"
          />
        </FormField>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            Incorrect password.
          </p>
        )}

        <RdxButton type="submit" className="w-full">
          Sign in
        </RdxButton>
      </form>

      {initialPassword ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.getElementById("desk-signin")?.requestSubmit();`,
          }}
        />
      ) : null}
    </RdxCard>
  );
}
