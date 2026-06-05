"use client";

import { useState } from "react";
import type {
  AutomationScope,
  ScopeEstimate,
  ServiceNeed,
  WebsiteScope,
} from "@/types/rdx";
import {
  RDX_ANALYTICS_EVENTS,
  trackEvent,
} from "@/lib/analytics";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import {
  ScopeSelector,
  useScopeEstimate,
} from "@/components/rdx/forms/ScopeSelector";

export function ScopeEstimator() {
  const [need, setNeed] = useState<ServiceNeed>("website");
  const [websiteScope, setWebsiteScope] = useState<WebsiteScope>("core");
  const [automationScope, setAutomationScope] =
    useState<AutomationScope>("pipeline");
  const [result, setResult] = useState<ScopeEstimate | null>(null);

  const preview = useScopeEstimate(need, websiteScope, automationScope);
  const activeScope = need === "automation" ? automationScope : websiteScope;

  function handleNeedChange(nextNeed: ServiceNeed) {
    setNeed(nextNeed);
    setResult(null);
    if (nextNeed === "website") {
      setWebsiteScope("core");
    } else if (nextNeed === "automation") {
      setAutomationScope("pipeline");
    }
  }

  function handleCalculate() {
    const estimate =
      need === "both"
        ? preview
        : preview;
    setResult(estimate);
    trackEvent(RDX_ANALYTICS_EVENTS.estimatorComplete, {
      need,
      scope: need === "both" ? "bundle" : activeScope,
      tier: estimate.tierName,
    });
  }

  const displayResult = result ?? null;

  return (
    <div className="space-y-6">
      <ScopeSelector
        need={need}
        websiteScope={websiteScope}
        automationScope={automationScope}
        onNeedChange={handleNeedChange}
        onWebsiteScopeChange={(scope) => {
          setWebsiteScope(scope);
          setResult(null);
        }}
        onAutomationScopeChange={(scope) => {
          setAutomationScope(scope);
          setResult(null);
        }}
      />

      <RdxButton type="button" onClick={handleCalculate}>
        Show suggested tier
      </RdxButton>

      {displayResult && (
        <RdxCard className="space-y-4 border-rdx-accent/20">
          <div>
            <p className="text-sm font-medium text-rdx-accent">Suggested tier</p>
            <h3 className="mt-1 text-xl font-semibold text-rdx-ink">
              {displayResult.tierName}
            </h3>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-rdx-subtle">
                Price
              </dt>
              <dd className="text-lg font-semibold text-rdx-ink">
                {displayResult.priceLabel}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-rdx-subtle">
                Budget band
              </dt>
              <dd className="text-lg font-semibold text-rdx-ink">
                {displayResult.bandLabel}
              </dd>
            </div>
          </dl>
          <p className="text-sm leading-relaxed text-rdx-muted">
            {displayResult.summary}
          </p>
          <p className="text-xs text-rdx-subtle">
            Estimates are directional. Exact scope is confirmed on the free review
            call. No checkout on this page.
          </p>
          <RdxButton href="/start">Get exact scope</RdxButton>
        </RdxCard>
      )}
    </div>
  );
}
