"use client";

import { newsletterContent } from "@/content/rdx/newsletter";

export default function BeehiivSubscribe() {
  return (
    <section className="rounded-rdx border border-rdx-border bg-rdx-surface p-6 sm:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-xl font-semibold text-rdx-ink md:text-2xl">
          {newsletterContent.headline}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-rdx-muted md:text-base">
          {newsletterContent.subhead}
        </p>
        <div className="mx-auto mt-6 w-full max-w-md">
          <iframe
            src="https://embeds.beehiiv.com/664364ea-a049-49b3-82c0-b52fa54eaf2f?slim=true"
            data-test-id="beehiiv-embed"
            height="52"
            frameBorder="0"
            scrolling="no"
            title="Newsletter signup"
            style={{
              margin: 0,
              borderRadius: "8px",
              backgroundColor: "transparent",
              width: "100%",
              minHeight: "52px",
            }}
          />
        </div>
        <p className="mt-4 text-xs text-rdx-subtle">{newsletterContent.footnote}</p>
      </div>
    </section>
  );
}
