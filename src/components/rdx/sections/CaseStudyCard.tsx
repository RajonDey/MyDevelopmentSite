import Link from "next/link";
import type { CaseStudy } from "@/types/rdx/case-study";
import {
  getCaseStudyHeroVisual,
  getServicePath,
  getWorkBrowserUrl,
} from "@/content/rdx/case-studies";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { CaseStudyFrame } from "@/components/rdx/visuals/CaseStudyFrame";
import { workStatusLabel } from "@/lib/rdx/work-status";

type CaseStudyCardProps = {
  study: CaseStudy;
};

function caseStudyCardFallback(study: CaseStudy) {
  return (
    <div className="flex aspect-[16/10] flex-col justify-between bg-gradient-to-br from-rdx-surface to-rdx-paper p-6">
      <div className="flex flex-wrap gap-2">
        <RdxBadge>{study.industryTag}</RdxBadge>
        {workStatusLabel(study.status) && (
          <RdxBadge>{workStatusLabel(study.status)}</RdxBadge>
        )}
      </div>
      <p className="max-w-sm text-sm font-medium leading-relaxed text-rdx-ink">
        {study.outcome}
      </p>
    </div>
  );
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const heroVisual = getCaseStudyHeroVisual(study);
  const status = workStatusLabel(study.status);

  return (
    <article className="flex h-full flex-col gap-4">
      <CaseStudyFrame
        visual={{ ...heroVisual, frameMode: heroVisual.frameMode ?? "crop" }}
        browserUrl={getWorkBrowserUrl(study)}
        fallback={caseStudyCardFallback(study)}
      />

      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-rdx-ink">
            <Link
              href={`/work/${study.slug}`}
              className="transition-colors hover:text-rdx-accent"
            >
              {study.title}
            </Link>
          </h2>
          {status && (
            <span className="rounded-rdx border border-rdx-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-rdx-muted">
              {status}
            </span>
          )}
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-rdx-muted">
          {study.summary}
        </p>
        <p className="mt-3 text-xs text-rdx-subtle">{study.attributionLabel}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href={`/work/${study.slug}`}
            className="text-sm font-medium text-rdx-accent transition-colors hover:text-rdx-accent-hover"
          >
            {study.category === "prior" ? "Read scope →" : "Read case study →"}
          </Link>
          {study.liveUrl && (
            <Link
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
            >
              Visit live →
            </Link>
          )}
          {study.category === "client" && (
            <Link
              href={getServicePath(study.service)}
              className="text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
            >
              Services →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
