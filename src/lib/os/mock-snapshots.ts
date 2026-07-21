import type { ProgressSnapshot } from "@/types/os";

/**
 * Minimal trend seeds aligned to §12 KRs (honest baselines).
 * Phase 1 will replace with real weekly captures.
 */
export const mockProgressSnapshots: ProgressSnapshot[] = [
  {
    id: "snap-client-1",
    capturedAt: "2026-07-07T06:00:00.000Z",
    year: 2026,
    quarter: 3,
    objectiveId: "obj-client-q3",
    progressPct: 0,
    krValues: [{ krId: "kr-client-desk", current: 1 }],
  },
  {
    id: "snap-client-2",
    capturedAt: "2026-07-14T06:00:00.000Z",
    year: 2026,
    quarter: 3,
    objectiveId: "obj-client-q3",
    progressPct: 0,
    krValues: [{ krId: "kr-client-desk", current: 1 }],
  },
  {
    id: "snap-client-3",
    capturedAt: "2026-07-21T06:00:00.000Z",
    year: 2026,
    quarter: 3,
    objectiveId: "obj-client-q3",
    progressPct: 0,
    krValues: [{ krId: "kr-client-desk", current: 1 }],
  },
  {
    id: "snap-saas-1",
    capturedAt: "2026-07-07T06:00:00.000Z",
    year: 2026,
    quarter: 3,
    objectiveId: "obj-saas-q3",
    progressPct: 0,
    krValues: [{ krId: "kr-saas-ielts", current: 1 }],
  },
  {
    id: "snap-saas-2",
    capturedAt: "2026-07-21T06:00:00.000Z",
    year: 2026,
    quarter: 3,
    objectiveId: "obj-saas-q3",
    progressPct: 0,
    krValues: [{ krId: "kr-saas-ielts", current: 1 }],
  },
  {
    id: "snap-yt-1",
    capturedAt: "2026-07-21T06:00:00.000Z",
    year: 2026,
    quarter: 3,
    objectiveId: "obj-content-q3",
    progressPct: 0,
    krValues: [{ krId: "kr-yt-setup", current: 0 }],
  },
  {
    id: "snap-research-1",
    capturedAt: "2026-07-07T06:00:00.000Z",
    year: 2026,
    quarter: 3,
    objectiveId: "obj-research-q3",
    progressPct: 50,
    krValues: [{ krId: "kr-research-papers", current: 1 }],
  },
  {
    id: "snap-research-2",
    capturedAt: "2026-07-21T06:00:00.000Z",
    year: 2026,
    quarter: 3,
    objectiveId: "obj-research-q3",
    progressPct: 50,
    krValues: [{ krId: "kr-research-papers", current: 1 }],
  },
];

/** Bump when seed shape changes so stale sessionStorage is discarded */
export const MOCK_STORAGE_KEY = "rdx-os-mock-v9-real";
