import Link from "next/link";
import { rdxFooterLinks } from "@/content/rdx/navigation";
import { siteMetadata } from "@/content/rdx/metadata";
import { RdxContainer } from "@/components/rdx/layout/Container";

export function RdxFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rdx-border bg-rdx-surface">
      <RdxContainer className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 lg:col-span-1">
            <p className="font-rdx text-base font-semibold text-rdx-ink">
              {siteMetadata.siteName}
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-rdx-muted">
              {siteMetadata.tagline}
            </p>
            <p className="text-sm text-rdx-subtle">Global remote team</p>
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
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-rdx-border pt-6">
          <p className="text-sm text-rdx-subtle">
            © {year} {siteMetadata.siteName}
          </p>
        </div>
      </RdxContainer>
    </footer>
  );
}
