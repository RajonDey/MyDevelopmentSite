"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CaseStudyVisual, VisualChrome } from "@/types/rdx/case-study";
import { BrowserFrame } from "@/components/rdx/visuals/BrowserFrame";
import { cn } from "@/lib/utils";

const SCROLL_VIEWPORT_DEFAULT = "h-[min(420px,65vh)]";
const SCROLL_VIEWPORT_TALL = "h-[min(560px,78vh)]";

type WorkPreviewFrameProps = {
  visual: CaseStudyVisual;
  browserUrl?: string;
  aspectClassName?: string;
  fallback?: React.ReactNode;
  className?: string;
  /** browser = chrome bar; device = phone bezel only (no browser frame) */
  chrome?: VisualChrome;
  tallViewport?: boolean;
};

function scrollViewportClass(tall?: boolean) {
  return tall ? SCROLL_VIEWPORT_TALL : SCROLL_VIEWPORT_DEFAULT;
}

function ScrollableImage({
  visual,
  autoScroll,
  deviceOnly,
  viewportClass,
  onError,
}: {
  visual: CaseStudyVisual;
  autoScroll: boolean;
  deviceOnly: boolean;
  viewportClass: string;
  onError: () => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const tick = useCallback(() => {
    const el = viewportRef.current;
    if (!el || paused || !autoScroll) return;
    const max = el.scrollHeight - el.clientHeight;
    if (max <= 4) return;
    el.scrollTop += 0.6;
    if (el.scrollTop >= max - 1) el.scrollTop = 0;
  }, [paused, autoScroll]);

  useEffect(() => {
    if (!autoScroll) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(tick, 24);
    return () => window.clearInterval(id);
  }, [autoScroll, tick]);

  if (!visual.src) {
    return null;
  }

  const behavior = visual.scrollBehavior ?? "both";
  const allowAuto =
    autoScroll && (behavior === "auto" || behavior === "both");
  const allowManual = behavior === "manual" || behavior === "both";

  const image = (
    <Image
      src={visual.src}
      alt={visual.alt ?? visual.label}
      width={1200}
      height={2400}
      className="h-auto w-full"
      sizes={deviceOnly ? "320px" : "(max-width: 1024px) 100vw, 62vw"}
      onError={onError}
      priority={false}
    />
  );

  const scrollPane = (
    <div
      ref={viewportRef}
      className={cn(
        "overflow-y-auto overscroll-contain bg-rdx-paper rdx-scrollbar",
        viewportClass,
        !allowManual && "overflow-hidden"
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      tabIndex={allowManual ? 0 : undefined}
      aria-label={allowManual ? `${visual.label} — scroll to explore` : undefined}
    >
      {image}
    </div>
  );

  return (
    <div className={cn(deviceOnly && "mx-auto w-full max-w-[300px]")}>
      {deviceOnly ? (
        <div className="rounded-[1.75rem] border-[10px] border-rdx-ink/10 bg-rdx-ink/5 p-1.5 shadow-sm">
          <div
            className="mx-auto mb-1.5 mt-1 h-1 w-14 rounded-full bg-rdx-border"
            aria-hidden
          />
          <div className="overflow-hidden rounded-[1.35rem]">{scrollPane}</div>
        </div>
      ) : (
        scrollPane
      )}
      {allowManual && allowAuto && (
        <p className="mt-2 text-center text-[10px] text-rdx-subtle">
          Scroll or hover to pause auto-preview
        </p>
      )}
    </div>
  );
}

export function WorkPreviewFrame({
  visual,
  browserUrl,
  aspectClassName = "aspect-[16/10]",
  fallback,
  className,
  chrome = "browser",
  tallViewport = false,
}: WorkPreviewFrameProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const frameMode = visual.frameMode ?? "crop";
  const showImage = visual.src && !imageFailed;
  const viewportClass = scrollViewportClass(tallViewport);
  const deviceOnly = chrome === "device";

  const cropContent = showImage ? (
    <div className={cn("relative overflow-hidden bg-rdx-surface", aspectClassName)}>
      <Image
        src={visual.src!}
        alt={visual.alt ?? visual.label}
        fill
        className={cn(
          "object-cover",
          visual.objectPosition === "center" ? "object-center" : "object-top"
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 62vw, 900px"
        onError={() => setImageFailed(true)}
      />
    </div>
  ) : null;

  const defaultFallback = (
    <div
      className={cn(
        "flex flex-col justify-end bg-gradient-to-br from-rdx-paper to-rdx-surface p-5",
        frameMode === "crop" ? aspectClassName : viewportClass
      )}
    >
      <p className="text-sm font-semibold text-rdx-ink">{visual.label}</p>
      {visual.caption && (
        <p className="mt-1 text-xs text-rdx-muted">{visual.caption}</p>
      )}
      {visual.src && imageFailed && process.env.NODE_ENV === "development" && (
        <p className="mt-2 text-xs text-rdx-subtle">
          Missing: <code className="text-rdx-ink">{visual.src}</code>
        </p>
      )}
    </div>
  );

  const isScroll = frameMode === "scroll" || frameMode === "mobile";
  const scrollContent =
    showImage && isScroll ? (
      <ScrollableImage
        visual={visual}
        autoScroll={
          visual.scrollBehavior === "auto" || visual.scrollBehavior === "both"
        }
        deviceOnly={deviceOnly}
        viewportClass={viewportClass}
        onError={() => setImageFailed(true)}
      />
    ) : null;

  const body = isScroll
    ? scrollContent ?? fallback ?? defaultFallback
    : cropContent ?? fallback ?? defaultFallback;

  if (deviceOnly) {
    return (
      <figure className={cn("space-y-3", className)}>
        {body}
        {(visual.caption || visual.label) && (
          <figcaption className="text-center text-xs text-rdx-subtle">
            {visual.caption ?? visual.label}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <BrowserFrame url={browserUrl} caption={visual.caption} className={className}>
      {body}
    </BrowserFrame>
  );
}
