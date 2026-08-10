"use client";

import type { InvoiceLineItemKind, InvoiceLineItemUnit } from "@/types/rdx/invoice";
import { FormField, rdxInputClassName } from "@/components/rdx/forms/FormField";
import {
  emptyDetail,
  type LineDetailDraft,
  type LineItemDraft,
} from "@/components/rdx/admin/invoice-draft";

const unitOptions: { value: InvoiceLineItemUnit | ""; label: string }[] = [
  { value: "", label: "—" },
  { value: "hours", label: "Hours" },
  { value: "fixed", label: "Fixed" },
];

type InvoiceLineEditorProps = {
  index: number;
  row: LineItemDraft;
  disabled: boolean;
  defaultHourlyRate: string;
  canRemove: boolean;
  onChange: (patch: Partial<Omit<LineItemDraft, "key">>) => void;
  onRemove: () => void;
};

export function InvoiceLineEditor({
  index,
  row,
  disabled,
  defaultHourlyRate,
  canRemove,
  onChange,
  onRemove,
}: InvoiceLineEditorProps) {
  const isInfo = row.kind === "info";
  const label = isInfo ? `Note ${index + 1}` : `Service ${index + 1}`;

  function updateDetail(
    key: string,
    patch: Partial<Omit<LineDetailDraft, "key">>
  ) {
    onChange({
      details: row.details.map((detail) =>
        detail.key === key ? { ...detail, ...patch } : detail
      ),
    });
  }

  function addDetail() {
    onChange({ details: [...row.details, emptyDetail()] });
  }

  function removeDetail(key: string) {
    onChange({
      details: row.details.filter((detail) => detail.key !== key),
    });
  }

  function changeKind(kind: InvoiceLineItemKind) {
    if (kind === "info") {
      onChange({
        kind,
        quantity: "",
        unit: "",
        unitRateUsd: "",
        amountUsd: "",
      });
      return;
    }
    onChange({ kind });
  }

  return (
    <div className="space-y-2 rounded-rdx border border-rdx-border p-2">
      <FormField label="Type" htmlFor={`inv_line_kind_${row.key}`}>
        <select
          id={`inv_line_kind_${row.key}`}
          className={rdxInputClassName}
          value={row.kind}
          disabled={disabled}
          onChange={(event) =>
            changeKind(event.target.value as InvoiceLineItemKind)
          }
        >
          <option value="service">Service (billable)</option>
          <option value="info">Note (no charge)</option>
        </select>
      </FormField>

      <FormField label={label} htmlFor={`inv_line_desc_${row.key}`}>
        <input
          id={`inv_line_desc_${row.key}`}
          className={rdxInputClassName}
          value={row.description}
          disabled={disabled}
          placeholder={
            isInfo
              ? "e.g. HICU — no additional hours"
              : "e.g. Admin Panel Features"
          }
          onChange={(event) => onChange({ description: event.target.value })}
        />
      </FormField>

      {!isInfo && (
        <div className="grid grid-cols-2 gap-2">
          <FormField label="Qty" htmlFor={`inv_line_qty_${row.key}`}>
            <input
              id={`inv_line_qty_${row.key}`}
              type="number"
              min="0"
              step="0.5"
              className={rdxInputClassName}
              value={row.quantity}
              disabled={disabled}
              onChange={(event) => onChange({ quantity: event.target.value })}
            />
          </FormField>
          <FormField label="Unit" htmlFor={`inv_line_unit_${row.key}`}>
            <select
              id={`inv_line_unit_${row.key}`}
              className={rdxInputClassName}
              value={row.unit}
              disabled={disabled}
              onChange={(event) =>
                onChange({
                  unit: event.target.value as InvoiceLineItemUnit | "",
                })
              }
            >
              {unitOptions.map((option) => (
                <option key={option.value || "none"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Rate $" htmlFor={`inv_line_rate_${row.key}`}>
            <input
              id={`inv_line_rate_${row.key}`}
              type="number"
              min="0"
              step="1"
              className={rdxInputClassName}
              value={row.unitRateUsd}
              disabled={disabled}
              placeholder={
                row.unit === "hours" && defaultHourlyRate
                  ? defaultHourlyRate
                  : undefined
              }
              onChange={(event) =>
                onChange({ unitRateUsd: event.target.value })
              }
            />
          </FormField>
          <FormField label="Amount $" htmlFor={`inv_line_amt_${row.key}`}>
            <input
              id={`inv_line_amt_${row.key}`}
              type="number"
              min="0"
              step="1"
              className={rdxInputClassName}
              value={row.amountUsd}
              disabled={disabled}
              placeholder="Auto from qty × rate"
              onChange={(event) => onChange({ amountUsd: event.target.value })}
            />
          </FormField>
        </div>
      )}

      {(row.details.length > 0 || !disabled) && (
      <div className="space-y-2">
        <p className="text-xs font-medium text-rdx-muted">Details</p>
        {row.details.map((detail) => (
          <div key={detail.key} className="space-y-2 rounded-rdx bg-rdx-surface p-2">
            <div className="flex items-start gap-2">
              <label className="mt-2 flex shrink-0 items-center gap-1 text-xs text-rdx-muted">
                <input
                  type="checkbox"
                  checked={detail.done}
                  disabled={disabled}
                  onChange={(event) =>
                    updateDetail(detail.key, { done: event.target.checked })
                  }
                />
                Done
              </label>
              <input
                className={rdxInputClassName}
                value={detail.text}
                disabled={disabled}
                placeholder="Breakdown item"
                onChange={(event) =>
                  updateDetail(detail.key, { text: event.target.value })
                }
              />
            </div>
            <input
              className={rdxInputClassName}
              value={detail.note}
              disabled={disabled}
              placeholder="Optional note (e.g. AI assisted not done)"
              onChange={(event) =>
                updateDetail(detail.key, { note: event.target.value })
              }
            />
            {!disabled && (
              <button
                type="button"
                className="text-xs text-rdx-muted hover:text-red-600"
                onClick={() => removeDetail(detail.key)}
              >
                Remove detail
              </button>
            )}
          </div>
        ))}
        {!disabled && (
          <button
            type="button"
            className="text-xs text-rdx-accent hover:text-rdx-accent-hover"
            onClick={addDetail}
          >
            + Add detail
          </button>
        )}
      </div>
      )}

      {!disabled && canRemove && (
        <button
          type="button"
          className="text-xs text-rdx-muted hover:text-red-600"
          onClick={onRemove}
        >
          Remove line
        </button>
      )}
    </div>
  );
}
