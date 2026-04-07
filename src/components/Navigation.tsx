"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "./ScrollDriven";

const navLinks = [
  { label: "Index",      index: 0 },
  { label: "About",      index: 1 },
  { label: "Work",       index: 2 },
  { label: "Experience", index: 3 },
  { label: "Contact",    index: 4 },
];

export default function Navigation() {
  const { goTo } = useProgress();
  const [menuOpen, setMenuOpen] = useState(false);

  // Read current section from scroll progress
  const [current, setCurrent] = useState(0);

  // We can't use hooks from context here directly for current — listen via effect
  const { smoothProgress } = useProgress();
  if (smoothProgress) {
    smoothProgress.on("change", (v) => setCurrent(Math.round(v)));
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(9,11,15,0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => goTo(0)}
          className="text-xs font-mono font-bold tracking-widest uppercase"
          style={{ color: "var(--text-muted)", letterSpacing: "0.18em" }}
        >
          MTV
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => {
            const isActive = current === link.index;
            return (
              <button
                key={link.label}
                onClick={() => goTo(link.index)}
                className="relative text-xs tracking-wide transition-colors duration-200"
                style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ background: "var(--accent)" }}
                  />
                )}
              </button>
            );
          })}
          <a
            href="/MV_CV_.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 rounded-full border transition-all duration-200"
            style={{ borderColor: "rgba(110,231,183,0.3)", color: "var(--accent)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--accent-dim)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            CV
          </a>
        </div>

        {/* Mobile */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {[0, 1, 2].map(i => (
            <span key={i} className="block h-px transition-all duration-300" style={{
              width: i === 1 ? "14px" : "18px",
              background: "var(--text-muted)",
              opacity: menuOpen && i === 1 ? 0 : 1,
              transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(3px, 3px)" : i === 2 ? "rotate(-45deg) translate(3px, -3px)" : "none") : "none",
            }} />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 pb-5"
            style={{ background: "rgba(13,13,13,0.95)", borderBottom: "1px solid var(--border)" }}
          >
            {navLinks.map(link => (
              <button key={link.label} onClick={() => { goTo(link.index); setMenuOpen(false); }}
                className="block w-full text-left py-3 text-sm border-b"
                style={{ color: current === link.index ? "var(--accent)" : "var(--text-secondary)", borderColor: "var(--border)" }}>
                {link.label}
              </button>
            ))}
            <a href="/MV_CV_.pdf" target="_blank" rel="noopener noreferrer" className="block mt-4 text-sm" style={{ color: "var(--accent)" }}>
              Download CV →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
