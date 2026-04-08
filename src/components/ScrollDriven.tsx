"use client";

import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

// ─── Context ──────────────────────────────────────────────────────────────────

const ProgressCtx = createContext<{
  smoothProgress: MotionValue<number>;
  rawProgress: MotionValue<number>;
  goTo: (i: number) => void;
}>({
  smoothProgress: null as unknown as MotionValue<number>,
  rawProgress: null as unknown as MotionValue<number>,
  goTo: () => {},
});

export const useProgress = () => useContext(ProgressCtx);

// ─── Section offset helper ────────────────────────────────────────────────────

export function useSectionOffset(index: number) {
  const { smoothProgress } = useProgress();
  return useTransform(smoothProgress, (v) => v - index);
}

// ─── Side Dots ────────────────────────────────────────────────────────────────

const LABELS = ["Index", "About", "Work", "Experience", "Contact"];
const NUM_SECTIONS = LABELS.length;

function SideDots() {
  const { smoothProgress, goTo } = useProgress();
  const [active, setActive] = useState(0);
  const [tooltip, setTooltip] = useState<number | null>(null);

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      setActive(Math.round(v));
    });
  }, [smoothProgress]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-end">
      {LABELS.map((label, i) => (
        <div key={i} className="relative flex items-center gap-3">
          {tooltip === i && (
            <motion.span
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute right-8 text-xs whitespace-nowrap px-2 py-1 rounded-md pointer-events-none"
              style={{
                background: "rgba(13,16,21,0.92)",
                backdropFilter: "blur(12px)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-strong)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
              }}
            >
              {label}
            </motion.span>
          )}
          <button
            onClick={() => goTo(i)}
            onMouseEnter={() => setTooltip(i)}
            onMouseLeave={() => setTooltip(null)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: active === i ? "6px" : "4px",
              height: active === i ? "22px" : "4px",
              background: active === i ? "var(--accent)" : "rgba(255,255,255,0.18)",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Bottom progress bar ──────────────────────────────────────────────────────

function ProgressBar() {
  const { smoothProgress } = useProgress();
  const [label, setLabel] = useState(LABELS[0]);
  const [idx, setIdx] = useState(0);
  const width = useTransform(
    smoothProgress,
    [0, NUM_SECTIONS - 1],
    ["0%", "100%"]
  );

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      const i = Math.min(NUM_SECTIONS - 1, Math.max(0, Math.round(v)));
      setIdx(i);
      setLabel(LABELS[i]);
    });
  }, [smoothProgress]);

  return (
    <div className="fixed bottom-8 left-6 z-50 flex items-center gap-4" style={{ pointerEvents: "none" }}>
      <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>
        {String(idx + 1).padStart(2, "0")}
      </span>
      <div className="w-24 h-px" style={{ background: "var(--border)" }}>
        <motion.div className="h-full" style={{ background: "var(--accent)", width }} />
      </div>
      <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export default function ScrollDriven({ children }: { children: ReactNode }) {
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 55,
    damping: 18,
    mass: 0.4,
  });

  const goTo = (i: number) => {
    rawProgress.set(Math.max(0, Math.min(NUM_SECTIONS - 1, i)));
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const current = rawProgress.get();
      const next = Math.max(0, Math.min(NUM_SECTIONS - 1, current + e.deltaY / 500));
      rawProgress.set(next);
    };

    const onKey = (e: KeyboardEvent) => {
      const c = rawProgress.get();
      if (e.key === "ArrowDown" || e.key === "PageDown")
        rawProgress.set(Math.min(NUM_SECTIONS - 1, Math.ceil(c + 0.01)));
      if (e.key === "ArrowUp" || e.key === "PageUp")
        rawProgress.set(Math.max(0, Math.floor(c - 0.01)));
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const delta = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      const next = Math.max(0, Math.min(NUM_SECTIONS - 1, rawProgress.get() + delta / 300));
      rawProgress.set(next);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [rawProgress]);

  return (
    <ProgressCtx.Provider value={{ smoothProgress, rawProgress, goTo }}>
      <div className="fixed inset-0 overflow-hidden" style={{ background: "var(--bg)" }}>
        {children}
        <SideDots />
      </div>
    </ProgressCtx.Provider>
  );
}
