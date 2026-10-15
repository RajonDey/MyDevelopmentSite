"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cookieConsentContent } from "@/content/rdx/legal";
import { RdxButton } from "@/components/rdx/ui/Button";
import { CONSENT_MAX_AGE_MS, CONSENT_STORAGE_KEY } from "@/lib/rdx/consent";

const OPEN_EVENT = "rdx:open-cookie-settings";

type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readStoredChoice(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { value?: string; ts?: number };
    if (parsed.value !== "granted" && parsed.value !== "denied") return null;
    if (!parsed.ts || Date.now() - parsed.ts > CONSENT_MAX_AGE_MS) return null;
    return parsed.value;
  } catch {
    return null;
  }
}

function applyChoice(value: ConsentChoice) {
  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ value, ts: Date.now() })
    );
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.gtag?.("consent", "update", {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

export function CookieConsent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readStoredChoice() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open || pathname?.startsWith("/os")) return null;

  const choose = (value: ConsentChoice) => {
    applyChoice(value);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rdx-border bg-rdx-paper/95 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-rdx flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-rdx-muted">
          {cookieConsentContent.message}{" "}
          <Link
            href="/privacy-policy"
            className="text-rdx-accent underline-offset-4 hover:underline"
          >
            {cookieConsentContent.policyLabel}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <RdxButton variant="secondary" onClick={() => choose("denied")}>
            {cookieConsentContent.decline}
          </RdxButton>
          <RdxButton variant="secondary" onClick={() => choose("granted")}>
            {cookieConsentContent.accept}
          </RdxButton>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      {cookieConsentContent.settingsLabel}
    </button>
  );
}
