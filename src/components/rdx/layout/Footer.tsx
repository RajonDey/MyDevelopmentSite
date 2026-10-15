import Link from "next/link";
import { rdxFooterLinks } from "@/content/rdx/navigation";
import { siteMetadata } from "@/content/rdx/metadata";
import { legalEntity } from "@/content/rdx/legal";
import { CookieSettingsButton } from "@/components/rdx/legal/CookieConsent";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxLogo } from "@/components/rdx/brand/RdxLogo";

export function RdxFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rdx-border bg-rdx-surface">
      <RdxContainer className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 lg:col-span-1">
            <RdxLogo href="/" className="text-base text-rdx-ink" />
            <p className="max-w-xs text-sm leading-relaxed text-rdx-muted">
              {siteMetadata.tagline}
            </p>
            <address className="space-y-1 text-sm not-italic text-rdx-muted">
              <p>
                Support:{" "}
                <a
                  href={`mailto:${legalEntity.supportEmail}`}
                  className="text-rdx-ink transition-colors hover:text-rdx-accent"
                >
                  {legalEntity.supportEmail}
                </a>
              </p>
              <p>
                <Link
                  href={legalEntity.contactPath}
                  className="text-rdx-ink transition-colors hover:text-rdx-accent"
                >
                  Contact us
                </Link>
              </p>
              <p className="text-rdx-subtle">{legalEntity.address}</p>
            </address>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-rdx-ink">Services</h2>
            <ul className="space-y-2">
              {rdxFooterLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-rdx-muted transition-colors hover:text-rdx-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-rdx-ink">Company</h2>
            <ul className="space-y-2">
              {rdxFooterLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-rdx-muted transition-colors hover:text-rdx-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-rdx-ink">Legal</h2>
            <ul className="space-y-2">
              {rdxFooterLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-rdx-muted transition-colors hover:text-rdx-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="text-sm text-rdx-muted transition-colors hover:text-rdx-accent" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-rdx-border pt-6 text-sm text-rdx-subtle sm:flex-row sm:justify-between">
          <p>
            © {year} {legalEntity.legalName}. All rights reserved.
          </p>
          <p>{legalEntity.operatingNote}</p>
        </div>
      </RdxContainer>
    </footer>
  );
}
