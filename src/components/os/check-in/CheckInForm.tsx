"use client";

import { useState } from "react";
import { OsModal } from "@/components/os/ui/OsModal";
import { useOsData } from "@/components/os/context/OsDataContext";
import { cn } from "@/lib/utils";

type CheckInFormProps = {
  open: boolean;
  onClose: () => void;
};

function RatingInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: 1 | 2 | 3 | 4 | 5) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-os-text">{label}</p>
      <div className="mt-2 flex gap-2">
        {([1, 2, 3, 4, 5] as const).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors",
              value === n
                ? "border-os-accent bg-os-accent/15 text-os-accent"
                : "border-os-border text-os-muted hover:border-os-accent/40"
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CheckInForm({ open, onClose }: CheckInFormProps) {
  const { submitCheckIn } = useOsData();
  const [moved, setMoved] = useState("");
  const [next, setNext] = useState("");
  const [blockers, setBlockers] = useState("");
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [energy, setEnergy] = useState<1 | 2 | 3 | 4 | 5>(3);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!moved.trim() || !next.trim()) return;

    submitCheckIn({
      moved,
      next,
      blockers: blockers || undefined,
      confidence,
      energy,
    });

    setMoved("");
    setNext("");
    setBlockers("");
    onClose();
  }

  return (
    <OsModal
      open={open}
      onClose={onClose}
      title="Weekly check-in"
      description="~60 seconds. Syncs to Team page instantly."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ci-moved" className="block text-sm font-medium text-os-text">
            What moved this week?
          </label>
          <textarea
            id="ci-moved"
            value={moved}
            onChange={(e) => setMoved(e.target.value)}
            rows={2}
            required
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>

        <div>
          <label htmlFor="ci-next" className="block text-sm font-medium text-os-text">
            What&apos;s next?
          </label>
          <textarea
            id="ci-next"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            rows={2}
            required
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>

        <div>
          <label htmlFor="ci-blockers" className="block text-sm font-medium text-os-text">
            Blockers (optional)
          </label>
          <input
            id="ci-blockers"
            value={blockers}
            onChange={(e) => setBlockers(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <RatingInput label="Confidence" value={confidence} onChange={setConfidence} />
          <RatingInput label="Energy" value={energy} onChange={setEnergy} />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-os-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Submit check-in
        </button>
      </form>
    </OsModal>
  );
}
