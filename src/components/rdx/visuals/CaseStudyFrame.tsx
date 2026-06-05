"use client";

import type { CaseStudyVisual, VisualChrome } from "@/types/rdx/case-study";
import { WorkPreviewFrame } from "@/components/rdx/visuals/WorkPreviewFrame";

type CaseStudyFrameProps = {
  visual: CaseStudyVisual;
  browserUrl?: string;
  aspectClassName?: string;
  fallback?: React.ReactNode;
  className?: string;
  chrome?: VisualChrome;
  tallViewport?: boolean;
};

export function CaseStudyFrame(props: CaseStudyFrameProps) {
  return <WorkPreviewFrame {...props} />;
}
