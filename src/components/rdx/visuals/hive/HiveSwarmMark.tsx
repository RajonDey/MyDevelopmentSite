"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { rdxBrandAssets } from "@/content/rdx/brand";
import { siteMetadata } from "@/content/rdx/metadata";
import { cn } from "@/lib/utils";
import { hiveMotion } from "./hiveMotion";

type Cell = { cx: number; cy: number; r: number; opacity: number };

/** Tighter near the H, sparser at the edge — many minds, one direction. */
const cells: readonly Cell[] = [
  { cx: 160, cy: 108, r: 30, opacity: 0.1 },
  { cx: 108, cy: 86, r: 16, opacity: 0.28 },
  { cx: 214, cy: 90, r: 16, opacity: 0.28 },
  { cx: 90, cy: 132, r: 14, opacity: 0.2 },
  { cx: 230, cy: 136, r: 14, opacity: 0.2 },
  { cx: 160, cy: 50, r: 12, opacity: 0.24 },
  { cx: 160, cy: 168, r: 12, opacity: 0.18 },
  { cx: 68, cy: 68, r: 10, opacity: 0.14 },
  { cx: 254, cy: 66, r: 10, opacity: 0.14 },
  { cx: 54, cy: 162, r: 9, opacity: 0.1 },
  { cx: 270, cy: 158, r: 9, opacity: 0.1 },
  { cx: 118, cy: 38, r: 8, opacity: 0.12 },
  { cx: 202, cy: 36, r: 8, opacity: 0.12 },
];

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((60 * i - 30) * Math.PI) / 180;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

type HiveSwarmMarkProps = {
  className?: string;
};

/**
 * About mark — continuous settle around the H while in view.
 * Same drift/breath timing as the hero hive field.
 */
export function HiveSwarmMark({ className }: HiveSwarmMarkProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const live = inView && !reduceMotion;

  return (
    <figure ref={rootRef} className={cn("mx-auto w-full max-w-sm", className)}>
      <div className="relative">
        <svg
          viewBox="0 0 320 210"
          className="h-auto w-full text-rdx-ink"
          aria-hidden
        >
          {cells.map((cell, index) => {
            const a = hiveMotion.drift.amount;
            const dx = index % 2 === 0 ? a * 0.9 : -a * 0.85;
            const dy = index % 3 === 0 ? -a * 0.8 : a * 0.75;
            const o = cell.opacity;
            return (
              <motion.g
                key={`${cell.cx}-${cell.cy}`}
                initial={false}
                animate={
                  live
                    ? {
                        x: [0, dx, 0, -dx * 0.7, 0],
                        y: [0, dy, 0, -dy * 0.6, 0],
                      }
                    : { x: 0, y: 0 }
                }
                transition={
                  live
                    ? {
                        duration: hiveMotion.drift.duration + (index % 4) * 0.35,
                        ease: hiveMotion.drift.ease,
                        repeat: Infinity,
                        delay: index * hiveMotion.drift.stagger,
                      }
                    : { duration: 0 }
                }
              >
                <motion.polygon
                  points={hexPoints(cell.cx, cell.cy, cell.r)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                  initial={false}
                  animate={
                    live
                      ? { opacity: [o, Math.min(o * 1.55, 0.45), o, o * 0.75, o] }
                      : { opacity: o }
                  }
                  transition={
                    live
                      ? {
                          duration: hiveMotion.breath.duration + (index % 3) * 0.25,
                          ease: hiveMotion.breath.ease,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }
                      : { duration: 0 }
                  }
                />
              </motion.g>
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={false}
            animate={
              live
                ? { scale: [1, 1.03, 1], opacity: [0.92, 1, 0.92] }
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
            <Image
              src={rdxBrandAssets.mark}
              alt=""
              width={140}
              height={156}
              className="h-[4.5rem] w-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-rdx-subtle">
        {siteMetadata.tagline}
      </figcaption>
    </figure>
  );
}
