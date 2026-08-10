"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HiveHex } from "./HiveHex";
import { HiveBeeGlyph } from "./HiveBeeGlyph";
import { hiveMotion } from "./hiveMotion";

type HiveEmptyCellProps = {
  className?: string;
};

/** 404 motif: empty hex + a small geometric bee glyph. Not a logo. */
export function HiveEmptyCell({ className }: HiveEmptyCellProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const live = inView && !reduceMotion;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative mx-auto h-[5.5rem] w-[5rem] text-rdx-subtle",
        className,
      )}
      aria-hidden
    >
      <motion.div
        className="h-full w-full"
        initial={false}
        animate={
          live
            ? {
                scale: [1, 1.04, 1, 0.98, 1],
                opacity: [0.75, 1, 0.75, 0.65, 0.75],
              }
            : { scale: 1, opacity: 1 }
        }
        transition={
          live
            ? {
                duration: hiveMotion.breath.duration,
                ease: hiveMotion.breath.ease,
                repeat: Infinity,
              }
            : { duration: 0 }
        }
      >
        <HiveHex className="h-full w-full" />
      </motion.div>
      <motion.div
        className="absolute -right-1 top-1 h-5 w-5 text-rdx-muted"
        initial={false}
        animate={
          live
            ? { x: [0, 3, 0, -2, 0], y: [0, -3, 0, 2, 0] }
            : { x: 0, y: 0 }
        }
        transition={
          live
            ? {
                duration: hiveMotion.flight.duration,
                ease: hiveMotion.flight.ease,
                repeat: Infinity,
                repeatType: "mirror",
              }
            : { duration: 0 }
        }
      >
        <HiveBeeGlyph className="h-full w-full" />
      </motion.div>
    </div>
  );
}
