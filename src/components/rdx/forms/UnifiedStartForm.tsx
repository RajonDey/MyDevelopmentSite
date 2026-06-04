"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  startFormContent,
  teamSizeOptions,
  timelineOptions,
} from "@/content/rdx/forms";
import {
  RDX_ANALYTICS_EVENTS,
  trackEvent,
} from "@/lib/analytics";
import { submitLeadForm } from "@/lib/submit-lead";
import { isQualifiedBudget } from "@/lib/lead-qualification";
import {
  attributionToHiddenFields,
  parseAttributionFromSearchParams,
} from "@/lib/campaign-attribution";
import type {
  AutomationScope,
  ServiceNeed,
  WebsiteScope,
} from "@/types/rdx";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { FormField, rdxInputClassName } from "@/components/rdx/forms/FormField";
import {
  EstimatePreview,
  ScopeSelector,
  useScopeEstimate,
} from "@/components/rdx/forms/ScopeSelector";

function parseNeedParam(value: string | null): ServiceNeed | null {
  if (value === "website" || value === "automation" || value === "both") {
    return value;
  }
  return null;
}

function scopeNeedToBudgetBand(need: ServiceNeed, estimateBand: string): string {
  if (need === "both") return "3000-5000";
  if (estimateBand.includes("$5,000+")) return "5000-plus";
  if (estimateBand.includes("$3,000")) return "3000-5000";
  if (estimateBand.includes("$1,500")) return "1500-3000";
  return "1000-1500";
}

export function UnifiedStartForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = searchParams.get("step") === "scope" ? "scope" : "scope";
  const [step, setStep] = useState<"scope" | "details">(initialStep);
  const [need, setNeed] = useState<ServiceNeed>("website");
  const [websiteScope, setWebsiteScope] = useState<WebsiteScope>("core");
  const [automationScope, setAutomationScope] =
    useState<AutomationScope>("pipeline");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const estimate = useScopeEstimate(need, websiteScope, automationScope);
  const activeScope = need === "automation" ? automationScope : websiteScope;
  const attribution = useMemo(
    () => parseAttributionFromSearchParams(searchParams),
    [searchParams]
  );
  const attributionFields = attributionToHiddenFields(attribution);

  const aiInterest =
    searchParams.get("interest") === "ai" || searchParams.get("need") === "ai";

  useEffect(() => {
    trackEvent(RDX_ANALYTICS_EVENTS.startPageView, {
      lead_source: attribution.lead_source,
      ...(attribution.utm_campaign
        ? { utm_campaign: attribution.utm_campaign }
        : {}),
    });
    const needParam = parseNeedParam(searchParams.get("need"));
    if (needParam) {
      setNeed(needParam);
    }
  }, [searchParams, attribution.lead_source, attribution.utm_campaign]);

  const aiCallout = aiInterest ? (
    <RdxCard className="border-rdx-accent/20 bg-rdx-surface text-sm text-rdx-muted">
      <p className="font-medium text-rdx-ink">AI Chat & Search</p>
      <p className="mt-1 leading-relaxed">
        We&apos;ll scope FAQ chat, site search, or a custom tool on your review call.
        API usage is billed separately.
      </p>
    </RdxCard>
  ) : null;

  function handleNeedChange(nextNeed: ServiceNeed) {
    setNeed(nextNeed);
    if (nextNeed === "website") {
      setWebsiteScope("core");
    } else if (nextNeed === "automation") {
      setAutomationScope("pipeline");
    }
  }

  function handleContinue() {
    trackEvent(RDX_ANALYTICS_EVENTS.startScopeComplete, {
      need,
      scope: need === "both" ? "bundle" : activeScope,
      tier: estimate.tierName,
    });
    setStep("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent(RDX_ANALYTICS_EVENTS.startFormSubmit, {
      need,
      tier: estimate.tierName,
      lead_source: attribution.lead_source,
    });

    const result = await submitLeadForm({
      formType: "start",
      form: event.currentTarget,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push(
      `/thank-you?type=start${isQualifiedBudget(budgetValue) ? "&qualified=1" : ""}`
    );
  }

  if (step === "scope") {
    return (
      <div className="space-y-6">
        {aiCallout}
        <ScopeSelector
          need={need}
          websiteScope={websiteScope}
          automationScope={automationScope}
          onNeedChange={handleNeedChange}
          onWebsiteScopeChange={setWebsiteScope}
          onAutomationScopeChange={setAutomationScope}
        />
        <RdxButton type="button" onClick={handleContinue} className="w-full sm:w-auto">
          {startFormContent.continueLabel}
        </RdxButton>
      </div>
    );
  }

  const budgetValue = scopeNeedToBudgetBand(need, estimate.bandLabel);

  return (
    <div className="space-y-6">
      {aiCallout}
      <button
        type="button"
        onClick={() => setStep("scope")}
        className="text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
      >
        ← Adjust scope
      </button>

      <EstimatePreview estimate={estimate} />

      <RdxCard>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="scope_need" value={need} />
          <input
            type="hidden"
            name="scope_detail"
            value={need === "both" ? "bundle" : activeScope}
          />
          <input type="hidden" name="estimated_tier" value={estimate.tierName} />
          <input type="hidden" name="estimated_price" value={estimate.priceLabel} />
          <input type="hidden" name="scope_band" value={estimate.bandLabel} />
          <input type="hidden" name="budget" value={budgetValue} />
          {aiInterest && (
            <input type="hidden" name="interest" value="ai-chat-search" />
          )}
          {Object.entries(attributionFields).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              label={startFormContent.companyNameLabel}
              htmlFor="agency_name"
              required
            >
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

          <FormField
            label="What's not working today?"
            htmlFor="message"
            required
          >
            <textarea
              id="message"
              name="message"
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

          <RdxButton
            type="submit"
            className="w-full sm:w-auto"
            disabled={submitting}
          >
            {submitting ? "Submitting…" : startFormContent.submitLabel}
          </RdxButton>

          <p className="text-sm text-rdx-subtle">{startFormContent.floorCopy}</p>
        </form>
      </RdxCard>
    </div>
  );
}
