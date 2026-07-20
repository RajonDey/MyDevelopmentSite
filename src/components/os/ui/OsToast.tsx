"use client";

import { useOsData } from "@/components/os/context/OsDataContext";

export function OsToast() {
  const { toast, dismissToast } = useOsData();

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[100] max-w-md -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-lg border border-os-border bg-os-surface-raised px-4 py-3 shadow-lg">
        <p className="text-sm text-os-text">{toast}</p>
        <button
          type="button"
          onClick={dismissToast}
          className="shrink-0 text-xs text-os-muted hover:text-os-text"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
