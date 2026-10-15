import Link from "next/link";
import type { LegalDocument } from "@/types/rdx";
import { legalEntity } from "@/content/rdx/legal";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";

const legalNav = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Refund & Cancellation", href: "/refund-policy" },
] as const;

const linkClass = "text-rdx-accent underline-offset-4 hover:underline";

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <RdxSection className="pt-4 md:pt-8">
        <RdxContainer className="max-w-3xl">
          <SectionHeader
            eyebrow="Legal"
            title={doc.title}
            description={`Effective ${legalEntity.effectiveDate}`}
            titleAs="h1"
          />
          <nav aria-label="Legal pages" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.href === `/${doc.slug}` ? "page" : undefined}
                className={
                  item.href === `/${doc.slug}`
                    ? "font-semibold text-rdx-ink"
                    : "text-rdx-muted hover:text-rdx-accent"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="surface" spacing="tight" className="pb-20 md:pb-24">
        <RdxContainer className="max-w-3xl">
          <article className="space-y-10 text-base leading-[var(--rdx-leading-body)] text-rdx-muted">
            <div className="space-y-4">
              {doc.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {doc.sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="text-lg font-semibold text-rdx-ink">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.items && (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section
              aria-labelledby="legal-contact"
              className="rounded-rdx border border-rdx-border bg-rdx-paper p-6 md:p-8"
            >
              <h2 id="legal-contact" className="text-lg font-semibold text-rdx-ink">
                Contact
              </h2>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[10rem_1fr]">
                <dt className="font-medium text-rdx-ink">Business</dt>
                <dd>{legalEntity.legalName}</dd>
                <dt className="font-medium text-rdx-ink">Address</dt>
                <dd>{legalEntity.address}</dd>
                <dt className="font-medium text-rdx-ink">Support</dt>
                <dd>
                  <a href={`mailto:${legalEntity.supportEmail}`} className={linkClass}>
                    {legalEntity.supportEmail}
                  </a>
                </dd>
                <dt className="font-medium text-rdx-ink">General</dt>
                <dd>
                  <a href={`mailto:${legalEntity.generalEmail}`} className={linkClass}>
                    {legalEntity.generalEmail}
                  </a>
                </dd>
                <dt className="font-medium text-rdx-ink">Contact form</dt>
                <dd>
                  <Link href={legalEntity.contactPath} className={linkClass}>
                    rdxhive.com{legalEntity.contactPath}
                  </Link>
                </dd>
              </dl>
              <p className="mt-4 text-sm text-rdx-subtle">{legalEntity.operatingNote}</p>
            </section>
          </article>
        </RdxContainer>
      </RdxSection>
    </>
  );
}
