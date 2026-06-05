import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  children: ReactNode;
  caption?: string;
  url?: string;
  className?: string;
};

/** Screenshot / mockup frame for case studies and hero visuals */
export function BrowserFrame({
  children,
  caption,
  url = "youragency.com",
  className,
}: BrowserFrameProps) {
  return (
    <figure className={cn("space-y-3", className)}>
      <div className="overflow-hidden rounded-rdx border border-rdx-border bg-rdx-surface shadow-sm">
        <div className="flex items-center gap-2 border-b border-rdx-border px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-rdx-border" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-rdx-border" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-rdx-border" aria-hidden />
          <span className="ml-2 truncate text-xs text-rdx-subtle">{url}</span>
        </div>
        <div className="bg-rdx-paper">{children}</div>
      </div>
      {caption && (
        <figcaption className="text-center text-xs text-rdx-subtle">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
