"use client";

import { motion, useTransform } from "framer-motion";
import { useProgress } from "./ScrollDriven";

// Brain fills ~55% of the smaller viewport dimension
const SIZE = "clamp(280px, 54vmin, 640px)";
// Glow circle is much larger — fills most of the upper screen area
const GLOW_SIZE = "clamp(580px, 96vmin, 1150px)";

export default function BrainTransition() {
  const { smoothProgress } = useProgress();

  const leftX  = useTransform(smoothProgress, [0, 0.7, 3.3, 4], ["0%", "-120vw", "-120vw", "0%"]);
  const rightX = useTransform(smoothProgress, [0, 0.7, 3.3, 4], ["0%",  "120vw",  "120vw", "0%"]);

  // Visible at Hero (0) and Contact (4), hidden in between
  const opacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.65, 3.3, 3.65, 4],
    [1,    1,    0,   0,    1,   1]
  );

  return (
    <motion.div
      aria-hidden
      style={{
        opacity,
        position: "fixed",
        inset: 0,
        zIndex: 25,
        pointerEvents: "none",
      }}
    >
      {/* ── Glow plate — behind brain, fades into page background ─────────── */}
      <div
        style={{
          position: "absolute",
          top: "36%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          borderRadius: "50%",
          background: "var(--brain-glow)",
        }}
      />

      {/* ── Brain container — same anchor point as glow ───────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "36%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: SIZE,
          height: SIZE,
        }}
      >
        {/* Left half */}
        <motion.div
          style={{
            x: leftX,
            position: "absolute",
            inset: 0,
            clipPath: "inset(0 50% 0 0)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/MV_portfolio/brain.svg" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </motion.div>

        {/* Right half */}
        <motion.div
          style={{
            x: rightX,
            position: "absolute",
            inset: 0,
            clipPath: "inset(0 0 0 50%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/MV_portfolio/brain.svg" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
