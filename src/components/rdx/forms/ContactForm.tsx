"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  contactBudgetOptions,
  companyNameFieldLabel,
  contactFormContent,
  needOptions,
  teamSizeOptions,
  timelineOptions,
} from "@/content/rdx/forms";
import {
  RDX_ANALYTICS_EVENTS,
  trackEvent,
} from "@/lib/analytics";
import { submitLeadForm } from "@/lib/submit-lead";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { FormField, rdxInputClassName } from "@/components/rdx/forms/FormField";

export function ContactForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent(RDX_ANALYTICS_EVENTS.contactSubmit);

    const result = await submitLeadForm({
      formType: "contact",
      form: event.currentTarget,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push("/thank-you?type=contact");
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

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Team size" htmlFor="team_size" required>
            <select
              id="team_size"
              name="team_size"
              required
              className={rdxInputClassName}
              defaultValue=""
            >
              <option value="" disabled>
                Select team size
              </option>
              {teamSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="What do you need?" htmlFor="need" required>
            <select
              id="need"
              name="need"
              required
              className={rdxInputClassName}
              defaultValue=""
            >
              <option value="" disabled>
                Select an option
              </option>
              {needOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
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
              {contactBudgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Timeline" htmlFor="timeline" required>
            <select
              id="timeline"
              name="timeline"
              required
              className={rdxInputClassName}
              defaultValue=""
            >
              <option value="" disabled>
                Select timeline
              </option>
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Message" htmlFor="message">
          <textarea
            id="message"
            name="message"
            rows={5}
            className={rdxInputClassName}
            placeholder="Anything else we should know about your project?"
          />
        </FormField>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <RdxButton type="submit" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Submitting…" : contactFormContent.submitLabel}
        </RdxButton>
      </form>
    </RdxCard>
  );
}
