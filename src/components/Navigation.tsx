"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "./ScrollDriven";

const navLinks = [
  { label: "Index",      index: 0 },
  { label: "About",      index: 1 },
  { label: "Work",       index: 2 },
  { label: "Experience", index: 3 },
  { label: "Contact",    index: 4 },
];

function ThemeIcon({ theme }: { theme: "dark" | "light" }) {
  return theme === "dark" ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navigation() {
  const { goTo, smoothProgress } = useProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    }
  }, []);

  useEffect(() => {
    return smoothProgress.on("change", (v) => setCurrent(Math.round(v)));
  }, [smoothProgress]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", next);
  };

  return (
    <div
      className="fixed z-50"
      style={{ top: "clamp(1rem, 2vh, 1.8rem)", left: "50%", transform: "translateX(-50%)" }}
    >
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: "var(--bg-nav)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--border)",
          borderRadius: "9999px",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1.4rem, 3vw, 4rem)",
          padding: "0 clamp(2.5rem, 5vw, 6rem)",
          height: "clamp(4.5rem, 7vh, 6.5rem)",
        }}>
          {/* Logo */}
          <button
            onClick={() => goTo(0)}
            style={{ color: "var(--text-muted)", letterSpacing: "0.18em", fontSize: "clamp(1.1rem, 1.6vw, 1.6rem)", fontFamily: "ui-monospace, monospace", fontWeight: 700, textTransform: "uppercase", marginRight: "clamp(0.6rem, 1.2vw, 1.5rem)" }}
          >
            MTV
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center" style={{ gap: "clamp(1.2rem, 2.5vw, 3rem)" }}>
            {navLinks.map(link => {
              const isActive = current === link.index;
              return (
                <button
                  key={link.label}
                  onClick={() => goTo(link.index)}
                  className="relative transition-colors duration-200"
                  style={{ color: isActive ? "var(--accent)" : "var(--text-muted)", fontSize: "clamp(1.1rem, 1.6vw, 1.6rem)", letterSpacing: "0.02em" }}
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
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px self-stretch my-2" style={{ background: "var(--border)" }} />

          {/* CV link */}
          <a
            href="/MV_portfolio/MV_CV_.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex transition-all duration-200"
            style={{ color: "var(--accent)", fontSize: "clamp(1rem, 1.4vw, 1.4rem)", padding: "0.45rem 1.4rem", borderRadius: "9999px", border: "1px solid var(--accent-glow)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--accent-dim)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            CV
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", width: "3rem", height: "3rem", borderRadius: "50%", border: "1px solid var(--border)", flexShrink: 0 }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--accent)"; el.style.borderColor = "var(--accent-glow)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-muted)"; el.style.borderColor = "var(--border)"; }}
          >
            <ThemeIcon theme={theme} />
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1 p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {[0, 1, 2].map(i => (
              <span key={i} className="block transition-all duration-300" style={{
                width: i === 1 ? "13px" : "17px",
                height: "1px",
                background: "var(--text-muted)",
                opacity: menuOpen && i === 1 ? 0 : 1,
                transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(3px, 3px)" : i === 2 ? "rotate(-45deg) translate(3px, -3px)" : "none") : "none",
              }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown — floats below the pill */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--bg-nav)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--border)",
              borderRadius: "1.5rem",
              padding: "0.75rem",
              minWidth: "180px",
            }}
          >
            {navLinks.map(link => (
              <button key={link.label} onClick={() => { goTo(link.index); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2.5 rounded-xl transition-colors duration-150"
                style={{
                  color: current === link.index ? "var(--accent)" : "var(--text-secondary)",
                  fontSize: "0.88rem",
                  background: current === link.index ? "var(--accent-dim)" : "transparent",
                }}>
                {link.label}
              </button>
            ))}
            <div style={{ height: "1px", background: "var(--border)", margin: "0.5rem 0" }} />
            <a href="/MV_portfolio/MV_CV_.pdf" target="_blank" rel="noopener noreferrer"
              className="block px-4 py-2.5 rounded-xl"
              style={{ color: "var(--accent)", fontSize: "0.88rem" }}>
              Download CV →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
