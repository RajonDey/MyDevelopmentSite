"use client";

import { useEffect } from "react";
import { getCalendlyUrl, salesOpsContent } from "@/content/rdx/sales-ops";
import { cn } from "@/lib/utils";

type CalendlyBookingProps = {
  className?: string;
};

export function CalendlyBooking({ className }: CalendlyBookingProps) {
  const calendlyUrl = getCalendlyUrl();
  const { prepQuestions, calendlyEventLabel } = salesOpsContent;

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }, []);

  return (
    <div className={className}>
      <p className="text-sm font-medium text-rdx-ink">{calendlyEventLabel}</p>
      <ul className="mt-4 space-y-2 text-left text-sm text-rdx-muted">
        {prepQuestions.map((question) => (
          <li key={question} className="flex gap-2">
            <span className="text-rdx-accent" aria-hidden>
              •
            </span>
            {question}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col items-center gap-4">
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex w-full items-center justify-center rounded-rdx px-4 py-2 text-sm font-medium transition-colors sm:w-auto",
            "bg-rdx-accent text-white hover:bg-rdx-accent-hover"
          )}
        >
          Book on Calendly
        </a>
        <div
          className="calendly-inline-widget w-full min-w-[280px] overflow-hidden rounded-rdx border border-rdx-border"
          data-url={`${calendlyUrl}?hide_gdpr_banner=1`}
          style={{ minWidth: "280px", height: "580px" }}
        />
      </div>
    </div>
  );
}
