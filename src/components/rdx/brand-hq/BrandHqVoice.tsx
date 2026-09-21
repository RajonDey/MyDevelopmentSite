import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { brandHqChrome } from "@/content/rdx/brand-hq";
import type { BrandBook } from "@/types/rdx/brand-book";

type BrandHqVoiceProps = {
  brand: BrandBook;
};

export function BrandHqVoice({ brand }: BrandHqVoiceProps) {
  const listsReady =
    Array.isArray(brand.voice.use) &&
    brand.voice.use.length > 0 &&
    brand.voice.tone !== "TBD";

  return (
    <RdxSection id="voice" className="scroll-mt-32">
      <RdxContainer>
        <SectionHeader
          eyebrow="05"
          title="Voice"
          description={listsReady ? brand.voice.tone : brandHqChrome.voicePending}
        />
        {listsReady ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-xs uppercase tracking-[0.12em] text-rdx-subtle">
                Pillars
              </h3>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-[var(--rdx-leading-body)] text-rdx-ink">
                {brand.messaging.pillars.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-[0.12em] text-rdx-subtle">
                  Words we use
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-rdx-ink">
                  {brand.voice.use.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.12em] text-rdx-subtle">
                  Words we avoid
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-rdx-ink">
                  {brand.voice.avoid.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </RdxContainer>
    </RdxSection>
  );
}
