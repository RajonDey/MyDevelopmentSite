"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { rdxBrandAssets } from "@/content/rdx/brand";
import { siteMetadata } from "@/content/rdx/metadata";
import { hiveMotion } from "./hiveMotion";

type HiveSystemDiagramProps = {
  className?: string;
};

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((60 * i - 30) * Math.PI) / 180;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

const field: readonly { cx: number; cy: number; r: number; o: number }[] = [
  { cx: 48, cy: 56, r: 18, o: 0.1 },
  { cx: 78, cy: 108, r: 16, o: 0.08 },
  { cx: 42, cy: 168, r: 14, o: 0.07 },
  { cx: 148, cy: 48, r: 14, o: 0.09 },
  { cx: 168, cy: 198, r: 15, o: 0.08 },
  { cx: 248, cy: 42, r: 16, o: 0.1 },
  { cx: 292, cy: 210, r: 14, o: 0.07 },
  { cx: 368, cy: 46, r: 15, o: 0.09 },
  { cx: 508, cy: 70, r: 16, o: 0.08 },
  { cx: 520, cy: 160, r: 18, o: 0.07 },
  { cx: 480, cy: 220, r: 14, o: 0.08 },
  { cx: 108, cy: 220, r: 12, o: 0.06 },
];

const stages = [
  {
    cx: 110,
    cy: 130,
    r: 54,
    n: "01",
    label: "Website",
    accent: false,
  },
  {
    cx: 280,
    cy: 130,
    r: 54,
    n: "02",
    label: "Forms",
    accent: false,
  },
  {
    cx: 450,
    cy: 130,
    r: 64,
    n: "03",
    label: "CRM",
    sub: "Slack · HubSpot",
    accent: true,
  },
] as const;

/** Bee local origin (14,14); flight path M300 96 C330 72, 360 72, 392 96 */
const beePath = {
  x: [286, 316, 346, 378],
  y: [82, 58, 58, 82],
};

/**
 * Homepage hero visual — continuous quiet motion while in view.
 * Bee + flow keep moving; reduced-motion shows a static final frame.
 */
export function HiveSystemDiagram({ className }: HiveSystemDiagramProps) {
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
    <figure ref={rootRef} className={cn("w-full max-w-xl", className)}>
      <svg
        viewBox="0 0 560 300"
        role="img"
        aria-label="Website forms connected to CRM workflow — leads move through the hive"
        className="h-auto w-full text-rdx-muted"
      >
        <title>Website forms connected to CRM workflow</title>

        <defs>
          <marker
            id="hive-flow-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4.5"
            orient="auto"
          >
            <path d="M0 0 L9 4.5 L0 9 Z" fill="var(--rdx-color-accent)" />
          </marker>
          <linearGradient id="hive-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--rdx-color-surface)" />
            <stop offset="100%" stopColor="var(--rdx-color-paper)" />
          </linearGradient>
        </defs>

        <rect
          x="0.75"
          y="0.75"
          width="558.5"
          height="298.5"
          rx="16"
          fill="url(#hive-panel)"
          stroke="var(--rdx-color-border)"
          strokeWidth="1.25"
        />

        {/* Ambient hex field — continuous readable drift */}
        {field.map((cell, index) => {
          const a = hiveMotion.drift.amount;
          const dx = index % 2 === 0 ? a : -a * 0.9;
          const dy = index % 3 === 0 ? -a * 0.85 : a * 0.8;
          return (
            <motion.g
              key={`${cell.cx}-${cell.cy}`}
              initial={false}
              animate={
                live
                  ? {
                      x: [0, dx, 0, -dx * 0.75, 0],
                      y: [0, dy, 0, -dy * 0.65, 0],
                    }
                  : { x: 0, y: 0 }
              }
              transition={
                live
                  ? {
                      duration:
                        hiveMotion.drift.duration + (index % 4) * 0.35,
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
                stroke="var(--rdx-hex-ink)"
                strokeWidth="1"
                strokeLinejoin="round"
                initial={false}
                animate={
                  live
                    ? {
                        opacity: [
                          cell.o,
                          Math.min(cell.o * 2.2, 0.28),
                          cell.o,
                          cell.o * 0.55,
                          cell.o,
                        ],
                      }
                    : { opacity: cell.o }
                }
                transition={
                  live
                    ? {
                        duration:
                          hiveMotion.breath.duration + (index % 3) * 0.2,
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

        {/* Solid flow spine */}
        <path
          d="M164 130 H226"
          fill="none"
          stroke="var(--rdx-color-accent)"
          strokeWidth="2.25"
          strokeLinecap="round"
          markerEnd="url(#hive-flow-arrow)"
        />
        <path
          d="M334 130 H386"
          fill="none"
          stroke="var(--rdx-color-accent)"
          strokeWidth="2.25"
          strokeLinecap="round"
          markerEnd="url(#hive-flow-arrow)"
        />

        {/* Moving “data” dashes on the spine */}
        <motion.path
          d="M164 130 H226"
          fill="none"
          stroke="var(--rdx-color-paper)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeDasharray="5 12"
          animate={
            live ? { strokeDashoffset: [0, -34] } : { strokeDashoffset: 0 }
          }
          transition={
            live
              ? { duration: 1.6, ease: "linear", repeat: Infinity }
              : { duration: 0 }
          }
        />
        <motion.path
          d="M334 130 H386"
          fill="none"
          stroke="var(--rdx-color-paper)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeDasharray="5 12"
          animate={
            live ? { strokeDashoffset: [0, -34] } : { strokeDashoffset: 0 }
          }
          transition={
            live
              ? { duration: 1.6, ease: "linear", repeat: Infinity }
              : { duration: 0 }
          }
        />

        <motion.path
          d="M300 96 C330 72, 360 72, 392 96"
          fill="none"
          stroke="var(--rdx-color-accent)"
          strokeOpacity="0.45"
          strokeWidth="1.25"
          strokeDasharray="3 5"
          strokeLinecap="round"
          animate={
            live ? { strokeDashoffset: [0, -32] } : { strokeDashoffset: 0 }
          }
          transition={
            live
              ? { duration: 2.4, ease: "linear", repeat: Infinity }
              : { duration: 0 }
          }
        />

        {stages.map((stage) => (
          <g key={stage.label}>
            {stage.accent ? (
              <motion.polygon
                points={hexPoints(stage.cx, stage.cy, stage.r + 8)}
                fill="none"
                stroke="var(--rdx-color-accent)"
                strokeWidth="1.25"
                strokeLinejoin="round"
                animate={
                  live
                    ? { opacity: [0.22, 0.55, 0.22] }
                    : { opacity: 0.28 }
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
              />
            ) : null}
            <polygon
              points={hexPoints(stage.cx, stage.cy, stage.r)}
              fill="var(--rdx-color-paper)"
              stroke={
                stage.accent
                  ? "var(--rdx-color-accent)"
                  : "var(--rdx-color-border)"
              }
              strokeWidth={stage.accent ? 2 : 1.35}
              strokeLinejoin="round"
            />
            {stage.accent ? (
              <polygon
                points={hexPoints(stage.cx, stage.cy, stage.r - 10)}
                fill="var(--rdx-color-accent)"
                fillOpacity="0.05"
                stroke="none"
              />
            ) : null}

            <text
              x={stage.cx}
              y={stage.cy - stage.r + 22}
              textAnchor="middle"
              className="fill-rdx-subtle text-[10px] font-semibold tracking-[0.14em]"
            >
              {stage.n}
            </text>

            {stage.accent ? (
              <image
                href={rdxBrandAssets.mark}
                x={stage.cx - 20}
                y={stage.cy - 22}
                width="40"
                height="45"
                opacity="0.95"
              />
            ) : (
              <text
                x={stage.cx}
                y={stage.cy + 6}
                textAnchor="middle"
                className="fill-rdx-ink text-[15px] font-semibold"
              >
                {stage.label}
              </text>
            )}

            <text
              x={stage.cx}
              y={stage.cy + stage.r + 24}
              textAnchor="middle"
              className={
                stage.accent
                  ? "fill-rdx-ink text-[13px] font-semibold"
                  : "fill-rdx-muted text-[12px] font-medium"
              }
            >
              {stage.label}
            </text>
            {"sub" in stage && stage.sub ? (
              <text
                x={stage.cx}
                y={stage.cy + stage.r + 42}
                textAnchor="middle"
                className="fill-rdx-subtle text-[10px]"
              >
                {stage.sub}
              </text>
            ) : null}
          </g>
        ))}

        {/* Bee — continuous Forms ↔ CRM flight */}
        <motion.g
          aria-hidden
          initial={false}
          animate={
            live
              ? { x: beePath.x, y: beePath.y }
              : {
                  x: beePath.x[Math.floor(beePath.x.length / 2)],
                  y: beePath.y[Math.floor(beePath.y.length / 2)],
                }
          }
          transition={
            live
              ? {
                  duration: hiveMotion.flight.duration,
                  ease: hiveMotion.flight.ease,
                  times: [0, 0.35, 0.65, 1],
                  repeat: Infinity,
                  repeatType: "mirror",
                }
              : { duration: 0 }
          }
        >
          <circle
            cx="14"
            cy="14"
            r="16"
            fill="var(--rdx-color-paper)"
            stroke="var(--rdx-color-accent)"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <g transform="translate(2 2) scale(1.15)" className="text-rdx-accent">
            <ellipse
              cx="12"
              cy="14"
              rx="4.2"
              ry="5.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <line
              x1="9.2"
              y1="14"
              x2="14.8"
              y2="14"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <circle
              cx="12"
              cy="8.2"
              r="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <ellipse
              cx="7.2"
              cy="10.5"
              rx="3.4"
              ry="2"
              transform="rotate(-28 7.2 10.5)"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.15"
            />
            <ellipse
              cx="16.8"
              cy="10.5"
              rx="3.4"
              ry="2"
              transform="rotate(28 16.8 10.5)"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.15"
            />
          </g>
        </motion.g>

        <text
          x="280"
          y="34"
          textAnchor="middle"
          className="fill-rdx-subtle text-[10px] font-semibold tracking-[0.2em]"
        >
          {siteMetadata.tagline.toUpperCase()}
        </text>

        <text
          x="280"
          y="278"
          textAnchor="middle"
          className="fill-rdx-muted text-[12px]"
        >
          Leads routed automatically. No inbox copy-paste.
        </text>
      </svg>
    </figure>
  );
}
