"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type OsModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function OsModal({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: OsModalProps) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[80] bg-black/50"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="os-modal-title"
        className={cn(
          "fixed left-1/2 top-1/2 z-[90] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-os-border bg-os-surface p-6 shadow-2xl",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="os-modal-title" className="text-lg font-medium text-os-text">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-os-muted">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-os-muted hover:bg-os-surface-raised hover:text-os-text"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </>
  );
}
