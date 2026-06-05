import { cn } from "@/lib/utils";

type SystemDiagramProps = {
  className?: string;
};

/** Site → forms → CRM flow — polished for homepage and service pages */
export function SystemDiagram({ className }: SystemDiagramProps) {
  return (
    <svg
      viewBox="0 0 520 140"
      role="img"
      aria-label="Website forms connected to CRM workflow"
      className={cn("h-auto w-full max-w-lg text-rdx-muted", className)}
    >
      <title>Website forms connected to CRM workflow</title>

      <rect
        x="0"
        y="0"
        width="520"
        height="140"
        rx="12"
        fill="var(--rdx-color-surface)"
        stroke="var(--rdx-color-border)"
      />

      <rect
        x="24"
        y="42"
        width="120"
        height="56"
        rx="8"
        fill="var(--rdx-color-paper)"
        stroke="var(--rdx-color-border)"
      />
      <text
        x="84"
        y="74"
        textAnchor="middle"
        className="fill-rdx-ink text-[13px] font-semibold"
      >
        Website
      </text>

      <path
        d="M152 70 H188"
        stroke="var(--rdx-color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#rdx-arrow)"
      />

      <rect
        x="196"
        y="42"
        width="120"
        height="56"
        rx="8"
        fill="var(--rdx-color-paper)"
        stroke="var(--rdx-color-border)"
      />
      <text
        x="256"
        y="74"
        textAnchor="middle"
        className="fill-rdx-ink text-[13px] font-semibold"
      >
        Forms
      </text>

      <path
        d="M324 70 H360"
        stroke="var(--rdx-color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#rdx-arrow)"
      />

      <rect
        x="368"
        y="34"
        width="128"
        height="72"
        rx="8"
        fill="var(--rdx-color-paper)"
        stroke="var(--rdx-color-accent)"
        strokeWidth="1.5"
      />
      <text
        x="432"
        y="68"
        textAnchor="middle"
        className="fill-rdx-ink text-[13px] font-semibold"
      >
        CRM
      </text>
      <text
        x="432"
        y="86"
        textAnchor="middle"
        className="fill-rdx-muted text-[11px]"
      >
        Slack · HubSpot
      </text>

      <text
        x="260"
        y="124"
        textAnchor="middle"
        className="fill-rdx-subtle text-[11px]"
      >
        Leads routed automatically. No inbox copy-paste.
      </text>

      <defs>
        <marker
          id="rdx-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--rdx-color-accent)" />
        </marker>
      </defs>
    </svg>
  );
}
