"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Context ─────────────────────────────────────────────────────────────────

interface PageCtx {
  current: number;
  total: number;
  labels: string[];
  goTo: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
}

const PageContext = createContext<PageCtx>({
  current: 0,
  total: 0,
  labels: [],
  goTo: () => {},
  goNext: () => {},
  goPrev: () => {},
});

export const usePage = () => useContext(PageContext);

// ─── Variants ────────────────────────────────────────────────────────────────

const variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: "0%",
    opacity: 1,
    transition: {
      y: { type: "spring" as const, stiffness: 260, damping: 32 },
      opacity: { duration: 0.35 },
    },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      y: { type: "spring" as const, stiffness: 260, damping: 32 },
      opacity: { duration: 0.25 },
    },
  }),
};

// ─── Side Dots ───────────────────────────────────────────────────────────────

function SideDots({
  total,
  current,
  labels,
  goTo,
}: {
  total: number;
  current: number;
  labels: string[];
  goTo: (i: number) => void;
}) {
  const [tooltip, setTooltip] = useState<number | null>(null);

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      style={{ pointerEvents: "all" }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="relative flex items-center justify-end gap-2">
          {tooltip === i && (
            <motion.span
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              className="absolute right-8 text-xs whitespace-nowrap px-2 py-1 rounded-md pointer-events-none"
              style={{
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {labels[i]}
            </motion.span>
          )}
          <button
            onClick={() => goTo(i)}
            onMouseEnter={() => setTooltip(i)}
            onMouseLeave={() => setTooltip(null)}
            aria-label={labels[i]}
            className="transition-all duration-300"
            style={{
              width: i === current ? "6px" : "4px",
              height: i === current ? "24px" : "4px",
              borderRadius: "999px",
              background:
                i === current ? "var(--accent)" : "rgba(255,255,255,0.2)",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Section number indicator ────────────────────────────────────────────────

function SectionIndicator({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label: string;
}) {
  return (
    <div
      className="fixed bottom-8 left-6 z-50 flex items-center gap-3"
      style={{ pointerEvents: "none" }}
    >
      <span
        className="text-xs font-mono"
        style={{ color: "var(--accent)" }}
      >
        {String(current + 1).padStart(2, "0")}
      </span>
      <div
        className="h-px"
        style={{
          width: `${((current + 1) / total) * 48}px`,
          background: "var(--accent)",
          transition: "width 0.4s ease",
        }}
      />
      <span
        className="text-xs font-mono"
        style={{ color: "var(--text-muted)" }}
      >
        {String(total).padStart(2, "0")}
      </span>
      <span
        className="text-xs tracking-widest uppercase ml-1"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Arrow hints ─────────────────────────────────────────────────────────────

function ArrowHint({ current, total, goNext, goPrev }: { current: number; total: number; goNext: () => void; goPrev: () => void }) {
  return (
    <>
      {current > 0 && (
        <button
          onClick={goPrev}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 opacity-30 hover:opacity-80 transition-opacity duration-200"
          aria-label="Previous section"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 9L8 2L15 9" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </button>
      )}
      {current < total - 1 && (
        <button
          onClick={goNext}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity duration-200"
          aria-label="Next section"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 1L8 8L15 1" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </button>
      )}
    </>
  );
}

// ─── Main controller ─────────────────────────────────────────────────────────

interface Props {
  sections: { label: string; component: ReactNode }[];
}

export default function PageController({ sections }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const transitioning = useRef(false);
  const touchStartY = useRef(0);

  const THROTTLE = 900; // ms between transitions

  const goTo = useCallback(
    (index: number) => {
      if (transitioning.current || index === current) return;
      if (index < 0 || index >= sections.length) return;
      transitioning.current = true;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      setTimeout(() => {
        transitioning.current = false;
      }, THROTTLE);
    },
    [current, sections.length]
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (transitioning.current) return;
      if (e.deltaY > 20) goNext();
      else if (e.deltaY < -20) goPrev();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") goNext();
      if (e.key === "ArrowUp" || e.key === "PageUp") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // Touch
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      if (delta > 0) goNext();
      else goPrev();
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  const labels = sections.map((s) => s.label);

  return (
    <PageContext.Provider
      value={{ current, total: sections.length, labels, goTo, goNext, goPrev }}
    >
      {/* Fullscreen container */}
      <div className="fixed inset-0 overflow-hidden" style={{ background: "var(--bg)" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 overflow-y-auto"
          >
            {sections[current].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* UI overlays */}
      <SideDots
        total={sections.length}
        current={current}
        labels={labels}
        goTo={goTo}
      />
      <SectionIndicator
        current={current}
        total={sections.length}
        label={sections[current].label}
      />
      <ArrowHint current={current} total={sections.length} goNext={goNext} goPrev={goPrev} />
    </PageContext.Provider>
  );
}
