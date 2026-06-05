"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auditFormContent, companyNameFieldLabel } from "@/content/rdx/forms";
import {
  RDX_ANALYTICS_EVENTS,
  trackEvent,
} from "@/lib/analytics";
import { submitLeadForm } from "@/lib/submit-lead";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { FormField, rdxInputClassName } from "@/components/rdx/forms/FormField";

export function AuditForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    trackEvent(RDX_ANALYTICS_EVENTS.auditStart);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent(RDX_ANALYTICS_EVENTS.auditSubmit);

    const result = await submitLeadForm({
      formType: "audit",
      form: event.currentTarget,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push("/thank-you?type=audit");
  }

  return (
    <RdxCard>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label={companyNameFieldLabel} htmlFor="agency_name" required>
            <input
              id="agency_name"
              name="agency_name"
              required
              className={rdxInputClassName}
              placeholder="Your company or agency"
            />
          </FormField>
          <FormField label="Your name" htmlFor="contact_name" required>
            <input
              id="contact_name"
              name="contact_name"
              required
              className={rdxInputClassName}
              placeholder="Jane Smith"
            />
          </FormField>
        </div>

        <FormField label="Email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={rdxInputClassName}
            placeholder="you@agency.com"
          />
        </FormField>

        <FormField label="Website URL" htmlFor="website_url">
          <input
            id="website_url"
            name="website_url"
            type="url"
            className={rdxInputClassName}
            placeholder="https://youragency.com"
          />
        </FormField>

        <FormField label="Current tools" htmlFor="current_tools">
          <input
            id="current_tools"
            name="current_tools"
            className={rdxInputClassName}
            placeholder="HubSpot, Slack, Calendly, etc."
          />
        </FormField>

        <FormField label="Budget range" htmlFor="budget" required>
          <select
            id="budget"
            name="budget"
            required
            className={rdxInputClassName}
            defaultValue=""
          >
            <option value="" disabled>
              Select a range
            </option>
            {auditFormContent.budgetBands.map((band) => (
              <option key={band.value} value={band.value}>
                {band.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="What's not working today?"
          htmlFor="workflow_issues"
          required
        >
          <textarea
            id="workflow_issues"
            name="workflow_issues"
            required
            rows={5}
            className={rdxInputClassName}
            placeholder="Where do leads get stuck between your site and CRM?"
          />
        </FormField>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <RdxButton type="submit" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Submitting…" : auditFormContent.submitLabel}
        </RdxButton>

        <p className="text-sm text-rdx-subtle">{auditFormContent.floorCopy}</p>
      </form>
    </RdxCard>
  );
}
