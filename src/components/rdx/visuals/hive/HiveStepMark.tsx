"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HiveHex } from "./HiveHex";
import { hiveMotion } from "./hiveMotion";

type HiveStepMarkProps = {
  step: string;
  className?: string;
  /** 0-based index — keeps step marks pulsing in one wave. */
  index?: number;
};

/**
 * Process step hex — continuous soft pulse while in view + hover nudge.
 */
export function HiveStepMark({
  step,
  className,
  index = 0,
}: HiveStepMarkProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const live = inView && !reduceMotion;

  return (
    <motion.span
      ref={rootRef}
      className={cn(
        "group relative inline-flex h-10 w-9 shrink-0 items-center justify-center text-rdx-accent",
        className,
      )}
      aria-hidden
      initial={false}
      animate={
        live
          ? {
              y: [0, -2.5, 0, 2, 0],
              scale: [1, 1.07, 1, 0.97, 1],
              opacity: [0.85, 1, 0.85, 0.8, 0.85],
            }
          : { y: 0, scale: 1, opacity: 1 }
      }
      transition={
        live
          ? {
              duration: hiveMotion.step.duration,
              ease: hiveMotion.step.ease,
              repeat: Infinity,
              delay: index * hiveMotion.step.stagger,
            }
          : { duration: 0 }
      }
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.08,
              opacity: 1,
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
    >
      <HiveHex className="absolute inset-0" filled />
      <span className="relative font-rdx-display text-lg leading-none">
        {step}
      </span>
    </motion.span>
  );
}
