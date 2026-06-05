import type { CaseStudy, CaseStudyVisual } from "@/types/rdx/case-study";
import { CaseStudyFrame } from "@/components/rdx/visuals/CaseStudyFrame";
import { cn } from "@/lib/utils";

type CaseStudyVisualGalleryProps = {
  study: CaseStudy;
  browserUrl: string;
};

function withPlacement(
  visual: CaseStudyVisual,
  placement: CaseStudyVisual["placement"]
): CaseStudyVisual {
  return { ...visual, placement: visual.placement ?? placement };
}

function resolveChrome(visual: CaseStudyVisual): "browser" | "device" {
  if (visual.placement === "sidebar" && visual.frameMode === "mobile") {
    return "device";
  }
  return "browser";
}

function VisualBlock({
  visual,
  browserUrl,
  tallViewport,
}: {
  visual: CaseStudyVisual;
  browserUrl: string;
  tallViewport?: boolean;
}) {
  const chrome = resolveChrome(visual);
  const isCrop = (visual.frameMode ?? "crop") === "crop";

  return (
    <CaseStudyFrame
      visual={visual}
      browserUrl={browserUrl}
      chrome={chrome}
      tallViewport={tallViewport}
      aspectClassName={isCrop ? "aspect-[16/10]" : undefined}
      className="w-full"
    />
  );
}

function SplitMainMobileGallery({
  browserUrl,
  mainItems,
  sidebarItems,
}: {
  browserUrl: string;
  mainItems: CaseStudyVisual[];
  sidebarItems: CaseStudyVisual[];
}) {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
      <div className="flex min-w-0 flex-1 flex-col gap-10 lg:w-[62%]">
        {mainItems.map((visual) => (
          <VisualBlock
            key={`${visual.label}-${visual.src}`}
            visual={visual}
            browserUrl={browserUrl}
            tallViewport
          />
        ))}
      </div>
      {sidebarItems.length > 0 && (
        <aside className="flex shrink-0 flex-col gap-4 lg:sticky lg:top-20 lg:w-[34%] lg:max-w-[360px]">
          <p className="text-xs font-medium uppercase tracking-wide text-rdx-subtle">
            Mobile
          </p>
          {sidebarItems.map((visual) => (
            <VisualBlock
              key={`${visual.label}-${visual.src}`}
              visual={visual}
              browserUrl={browserUrl}
              tallViewport
            />
          ))}
        </aside>
      )}
    </div>
  );
}

function StackGallery({
  browserUrl,
  items,
}: {
  browserUrl: string;
  items: CaseStudyVisual[];
}) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      {items.map((visual) => (
        <VisualBlock
          key={`${visual.label}-${visual.src}`}
          visual={visual}
          browserUrl={browserUrl}
          tallViewport={(visual.frameMode ?? "crop") !== "crop"}
        />
      ))}
    </div>
  );
}

function GridGallery({
  study,
  browserUrl,
}: CaseStudyVisualGalleryProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {study.visuals.map((visual) => {
        const wide =
          visual.frameMode === "scroll" || visual.frameMode === "mobile";
        return (
          <div
            key={visual.label}
            className={cn(wide && "md:col-span-2 lg:col-span-2")}
          >
            <VisualBlock visual={visual} browserUrl={browserUrl} />
          </div>
        );
      })}
    </div>
  );
}

export function CaseStudyVisualGallery({ study, browserUrl }: CaseStudyVisualGalleryProps) {
  const layout = study.visualLayout ?? "grid";

  if (layout === "split-main-mobile") {
    const mainFromVisuals = study.visuals.filter(
      (v) => (v.placement ?? "main") !== "sidebar"
    );
    const sidebarItems = study.visuals.filter((v) => v.placement === "sidebar");
    const mainItems: CaseStudyVisual[] = [];

    if (study.heroVisual) {
      mainItems.push(withPlacement(study.heroVisual, "main"));
    }
    mainItems.push(...mainFromVisuals.map((v) => withPlacement(v, "main")));

    return (
      <SplitMainMobileGallery
        browserUrl={browserUrl}
        mainItems={mainItems}
        sidebarItems={sidebarItems}
      />
    );
  }

  if (layout === "stack") {
    const items: CaseStudyVisual[] = [];
    if (study.heroVisual) {
      items.push(study.heroVisual);
    }
    items.push(...study.visuals);
    return (
      <StackGallery browserUrl={browserUrl} items={items} />
    );
  }

  return <GridGallery study={study} browserUrl={browserUrl} />;
}
