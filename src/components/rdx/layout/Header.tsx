"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { rdxNavCta, rdxPrimaryNav } from "@/content/rdx/navigation";
import { siteMetadata } from "@/content/rdx/metadata";
import { cn } from "@/lib/utils";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxContainer } from "@/components/rdx/layout/Container";

export function RdxHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rdx-border bg-rdx-paper/95 backdrop-blur-sm">
      <RdxContainer className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-rdx-display text-lg font-normal tracking-tight text-rdx-ink transition-colors hover:text-rdx-accent"
        >
          {siteMetadata.siteName}
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Primary navigation"
        >
          {rdxPrimaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-rdx-ink"
                  : "text-rdx-muted hover:text-rdx-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <RdxButton href={rdxNavCta.href}>{rdxNavCta.label}</RdxButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-rdx p-2 text-rdx-ink md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="rdx-mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </RdxContainer>

      {mobileOpen && (
        <div
          id="rdx-mobile-nav"
          className="border-t border-rdx-border bg-rdx-paper md:hidden"
        >
          <RdxContainer className="flex flex-col gap-1 py-4">
            {rdxPrimaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-rdx px-2 py-3 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-rdx-surface text-rdx-ink"
                    : "text-rdx-muted hover:bg-rdx-surface hover:text-rdx-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
            <RdxButton
              href={rdxNavCta.href}
              className="mt-2 w-full"
              onClick={() => setMobileOpen(false)}
            >
              {rdxNavCta.label}
            </RdxButton>
          </RdxContainer>
        </div>
      )}
    </header>
  );
}
