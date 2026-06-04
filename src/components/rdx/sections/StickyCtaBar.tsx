"use client";

import { useEffect, useState } from "react";
import { rdxNavCta } from "@/content/rdx/navigation";
import { RdxButton } from "@/components/rdx/ui/Button";
import { cn } from "@/lib/utils";

type StickyCtaBarProps = {
  label?: string;
  href?: string;
  showAfterPx?: number;
  className?: string;
};

export function StickyCtaBar({
  label = rdxNavCta.label,
  href = rdxNavCta.href,
  showAfterPx = 480,
  className,
}: StickyCtaBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > showAfterPx);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-rdx-border bg-rdx-paper/95 p-3 backdrop-blur-sm transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
        className
      )}
      aria-hidden={!visible}
    >
      <RdxButton href={href} className="w-full">
        {label}
      </RdxButton>
    </div>
  );
}
