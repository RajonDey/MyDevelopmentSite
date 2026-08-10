"use client";

import { useState } from "react";
import { RdxButton } from "@/components/rdx/ui/Button";
import { rdxInputClassName } from "@/components/rdx/forms/FormField";
import {
  parseInvoiceEstimate,
  type ParsedEstimate,
} from "@/lib/invoice-estimate-parse";

type InvoiceEstimatePasteProps = {
  disabled: boolean;
  projects: { id: string; title: string }[];
  hasExistingLines: boolean;
  onApply: (result: ParsedEstimate & { projectId?: string }) => void;
};

export function InvoiceEstimatePaste({
  disabled,
  projects,
  hasExistingLines,
  onApply,
}: InvoiceEstimatePasteProps) {
  const [text, setText] = useState("");
  const [note, setNote] = useState<string | null>(null);

  function apply() {
    const parsed = parseInvoiceEstimate(text);
    if (parsed.lines.length === 0) {
      setNote("Could not find any line items in that paste.");
      return;
    }

    if (
      hasExistingLines &&
      !window.confirm("Replace current line items with the pasted estimate?")
    ) {
      return;
    }

    let projectId: string | undefined;
    const warnings = [...parsed.warnings];
    if (parsed.title) {
      const match = projects.find(
        (project) =>
          project.title.trim().toLowerCase() === parsed.title?.toLowerCase()
      );
      if (match) {
        projectId = match.id;
      } else {
        warnings.push(
          `No project named “${parsed.title}” — select or create it for the PDF heading.`
        );
      }
    }

    onApply({ ...parsed, warnings, projectId });

    const summary = `${parsed.lines.length} line${
      parsed.lines.length === 1 ? "" : "s"
    } applied.`;
    setNote(
      warnings.length > 0 ? `${summary} ${warnings.join(" ")}` : summary
    );
  }

  if (disabled) return null;

  return (
    <details className="rounded-rdx border border-rdx-border p-2">
      <summary className="cursor-pointer text-xs font-medium text-rdx-muted">
        Paste estimate
      </summary>
      <div className="mt-2 space-y-2">
        <textarea
          rows={8}
          className={rdxInputClassName}
          value={text}
          placeholder={`## Admin Panel Features — 16 hrs\n- Add and manage branches. ✅\n- Provide feedback. ✅ (AI assisted not done)\n\nDeployment: 1hr\nInvoice: 36*$8= $288; $288*123=35424`}
          onChange={(event) => setText(event.target.value)}
        />
        <p className="text-xs text-rdx-muted">
          Headings with hours become services. Bullets become details. “No
          additional hours” becomes a note line. Invoice formula sets rate and
          FX.
        </p>
        <RdxButton type="button" variant="secondary" onClick={apply}>
          Apply to lines
        </RdxButton>
        {note && (
          <p className="text-xs text-rdx-muted" role="status">
            {note}
          </p>
        )}
      </div>
    </details>
  );
}
