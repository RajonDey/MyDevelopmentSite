"use client";

import { useMemo } from "react";
import type {
  AutomationScope,
  ScopeEstimate,
  ServiceNeed,
  WebsiteScope,
} from "@/types/rdx";
import {
  automationScopeOptions,
  estimateScope,
  websiteScopeOptions,
} from "@/lib/scope-estimator";
import { RdxCard } from "@/components/rdx/ui/Card";
import { FormField } from "@/components/rdx/forms/FormField";
import { cn } from "@/lib/utils";

const needOptions: { id: ServiceNeed; label: string }[] = [
  { id: "website", label: "Agency Website" },
  { id: "automation", label: "Lead & CRM Automation" },
  { id: "both", label: "Website + Automation" },
];

export type ScopeSelectorProps = {
  need: ServiceNeed;
  websiteScope: WebsiteScope;
  automationScope: AutomationScope;
  onNeedChange: (need: ServiceNeed) => void;
  onWebsiteScopeChange: (scope: WebsiteScope) => void;
  onAutomationScopeChange: (scope: AutomationScope) => void;
};

export function ScopeSelector({
  need,
  websiteScope,
  automationScope,
  onNeedChange,
  onWebsiteScopeChange,
  onAutomationScopeChange,
}: ScopeSelectorProps) {
  const scopeOptions =
    need === "automation" ? automationScopeOptions : websiteScopeOptions;

  const activeScope = need === "automation" ? automationScope : websiteScope;

  const estimate: ScopeEstimate = useMemo(() => {
    if (need === "both") {
      return estimateScope("both", "core");
    }
    return estimateScope(need, activeScope);
  }, [need, activeScope]);

  return (
    <div className="space-y-6">
      <FormField label="What do you need?" htmlFor="scope-need">
        <div className="grid gap-2 sm:grid-cols-3">
          {needOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              id={option.id === need ? "scope-need" : undefined}
              onClick={() => onNeedChange(option.id)}
              className={cn(
                "rounded-rdx border px-3 py-3 text-left text-sm font-medium transition-colors",
                need === option.id
                  ? "border-rdx-accent bg-rdx-surface text-rdx-ink"
                  : "border-rdx-border text-rdx-muted hover:border-rdx-accent/40"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </FormField>

      {need !== "both" && (
        <FormField label="Scope" htmlFor="scope-detail">
          <div className="space-y-2">
            {scopeOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                id={activeScope === option.id ? "scope-detail" : undefined}
                onClick={() => {
                  if (need === "website") {
                    onWebsiteScopeChange(option.id as WebsiteScope);
                  } else {
                    onAutomationScopeChange(option.id as AutomationScope);
                  }
                }}
                className={cn(
                  "w-full rounded-rdx border px-4 py-3 text-left transition-colors",
                  activeScope === option.id
                    ? "border-rdx-accent bg-rdx-surface"
                    : "border-rdx-border hover:border-rdx-accent/40"
                )}
              >
                <span className="block text-sm font-medium text-rdx-ink">
                  {option.label}
                </span>
                <span className="mt-1 block text-sm text-rdx-muted">
                  {option.description}
                </span>
              </button>
            ))}
          </div>
        </FormField>
      )}

      {need === "both" && (
        <RdxCard className="bg-rdx-surface text-sm text-rdx-muted">
          Website Standard + Automation Standard bundle — scoped and confirmed on
          your free review call.
        </RdxCard>
      )}

      <EstimatePreview estimate={estimate} />
    </div>
  );
}

export function EstimatePreview({ estimate }: { estimate: ScopeEstimate }) {
  return (
    <div className="rounded-rdx border border-rdx-border bg-rdx-surface px-4 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-rdx-subtle">
        Suggested tier
      </p>
      <p className="mt-1 text-lg font-semibold text-rdx-ink">{estimate.tierName}</p>
      <p className="mt-2 text-sm text-rdx-muted">
        {estimate.priceLabel} · {estimate.bandLabel}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-rdx-muted">
        {estimate.summary}
      </p>
    </div>
  );
}

export function useScopeEstimate(
  need: ServiceNeed,
  websiteScope: WebsiteScope,
  automationScope: AutomationScope
): ScopeEstimate {
  return useMemo(() => {
    if (need === "both") {
      return estimateScope("both", "core");
    }
    const activeScope = need === "automation" ? automationScope : websiteScope;
    return estimateScope(need, activeScope);
  }, [need, websiteScope, automationScope]);
}
