"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { hiveMotion } from "./hiveMotion";

type Cell = {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  filled?: boolean;
};

/** Compact cluster — arrival / “cells locked,” not a full swarm. */
const cells: readonly Cell[] = [
  { cx: 80, cy: 72, r: 28, opacity: 0.22, filled: true },
  { cx: 44, cy: 52, r: 18, opacity: 0.32 },
  { cx: 116, cy: 52, r: 18, opacity: 0.32 },
  { cx: 44, cy: 92, r: 18, opacity: 0.26 },
  { cx: 116, cy: 92, r: 18, opacity: 0.26 },
  { cx: 80, cy: 32, r: 14, opacity: 0.2 },
  { cx: 80, cy: 112, r: 14, opacity: 0.18 },
];

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((60 * i - 30) * Math.PI) / 180;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

type HiveAssembleMarkProps = {
  className?: string;
};

/**
 * Thank-you mark — continuous lock pulse while in view.
 * Same drift/breath timing as the rest of the hive system.
 */
export function HiveAssembleMark({ className }: HiveAssembleMarkProps) {
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
      className={cn("mx-auto w-full max-w-[10rem] text-rdx-accent", className)}
      aria-hidden
    >
      <svg viewBox="0 0 160 144" className="h-auto w-full">
        {cells.map((cell, index) => {
          const a = hiveMotion.drift.amount * 0.7;
          const dx = index % 2 === 0 ? a : -a * 0.9;
          const dy = index % 3 === 0 ? -a : a * 0.85;
          const o = cell.opacity;
          return (
            <motion.g
              key={`${cell.cx}-${cell.cy}`}
              initial={false}
              animate={
                live
                  ? {
                      x: [0, dx, 0, -dx * 0.65, 0],
                      y: [0, dy, 0, -dy * 0.55, 0],
                    }
                  : { x: 0, y: 0 }
              }
              transition={
                live
                  ? {
                      duration: hiveMotion.drift.duration + (index % 3) * 0.3,
                      ease: hiveMotion.drift.ease,
                      repeat: Infinity,
                      delay: index * hiveMotion.drift.stagger,
                    }
                  : { duration: 0 }
              }
            >
              <motion.polygon
                points={hexPoints(cell.cx, cell.cy, cell.r)}
                fill={cell.filled ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
                initial={false}
                animate={
                  live
                    ? {
                        opacity: [
                          o,
                          Math.min(o * 1.6, 0.5),
                          o,
                          o * 0.72,
                          o,
                        ],
                        fillOpacity: cell.filled
                          ? [0.08, 0.14, 0.08, 0.06, 0.08]
                          : undefined,
                      }
                    : {
                        opacity: o,
                        fillOpacity: cell.filled ? 0.08 : undefined,
                      }
                }
                transition={
                  live
                    ? {
                        duration: hiveMotion.breath.duration,
                        ease: hiveMotion.breath.ease,
                        repeat: Infinity,
                        delay: index * 0.18,
                      }
                    : { duration: 0 }
                }
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
