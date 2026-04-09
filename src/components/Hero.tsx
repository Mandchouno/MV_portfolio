"use client";

import { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { useSectionOffset } from "./ScrollDriven";

const roles = ["Data Scientist", "AI Builder", "ML Engineer", "Co-founder @ Neotix AI"];

export default function Hero() {
  const off = useSectionOffset(0);

  const sectionO   = useTransform(off, [-0.5, -0.15, 0, 0.4, 0.7], [0, 1, 1, 1, 0]);
  const badgeY     = useTransform(off, [-0.5, 0, 0.5], [40, 0, -28]);
  const badgeO     = useTransform(off, [-0.45, -0.1, 0, 0.35, 0.6], [0, 1, 1, 1, 0]);
  const titleY     = useTransform(off, [-0.4, 0, 0.45], [60, 0, -38]);
  const titleO     = useTransform(off, [-0.4, -0.08, 0, 0.35, 0.6], [0, 1, 1, 1, 0]);
  const titleScale = useTransform(off, [-0.3, 0, 0.4], [0.92, 1, 1.02]);
  const subY       = useTransform(off, [-0.5, 0, 0.45], [42, 0, -28]);
  const subO       = useTransform(off, [-0.5, -0.1, 0, 0.35, 0.6], [0, 1, 1, 1, 0]);
  const btnY       = useTransform(off, [-0.55, 0, 0.45], [30, 0, -20]);
  const btnO       = useTransform(off, [-0.55, -0.18, 0, 0.35, 0.6], [0, 1, 1, 1, 0]);

  // Typewriter
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const cur = roles[roleIdx];
    if (typing) {
      if (charIdx < cur.length) {
        const t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 65);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 38);
        return () => clearTimeout(t);
      } else { setRoleIdx(i => (i + 1) % roles.length); setTyping(true); }
    }
  }, [charIdx, typing, roleIdx]);

  return (
    <motion.section
      style={{ opacity: sectionO }}
      className="absolute inset-0 flex flex-col justify-end overflow-hidden"
    >
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: "clamp(400px, 60vmin, 800px)", height: "clamp(400px, 60vmin, 800px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)" }} />

      {/* Content — anchored to the bottom, below the brain */}
      <div
        className="relative z-10 text-center"
        style={{ padding: "0 clamp(1rem, 4vw, 3rem) clamp(5rem, 11vh, 9rem)" }}
      >
        {/* Badge */}
        <motion.div style={{ y: badgeY, opacity: badgeO }} className="mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
            style={{ color: "var(--accent)", borderColor: "var(--accent-glow)", background: "var(--accent-dim)", fontSize: "clamp(0.65rem, 0.85vw, 0.8rem)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)", animation: "pulse 2s ease-in-out infinite" }} />
            Open to opportunities
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          style={{ y: titleY, opacity: titleO, scale: titleScale, fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}
          className="font-bold mb-4 heading"
        >
          <span style={{ color: "var(--text-primary)", display: "block" }}>The online home of</span>
          <span style={{ color: "var(--accent)" }}>Mandi&apos;s</span>
          <span style={{ color: "var(--text-primary)" }}> work.</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          style={{ y: subY, opacity: subO, fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", marginBottom: "clamp(2.5rem, 6vh, 5rem)", height: "clamp(1.8rem, 3.5vh, 2.8rem)" }}
          className="font-light"
        >
          <span style={{ color: "var(--text-secondary)" }}>{displayed}</span>
          <span className="inline-block w-0.5 ml-0.5 align-middle rounded-sm"
            style={{ height: "clamp(1rem, 2vw, 1.4rem)", background: "var(--accent)", animation: "blink 1s step-end infinite" }} />
        </motion.div>

        {/* Buttons */}
        <motion.div style={{ y: btnY, opacity: btnO, gap: "clamp(0.8rem, 1.5vw, 1.8rem)" }} className="flex flex-wrap justify-center">
          <a href="/MV_portfolio/MV_CV_.pdf" target="_blank" rel="noopener noreferrer"
            className="rounded-full font-semibold transition-all duration-300 inline-block"
            style={{ background: "var(--accent)", color: "#090b0f", fontSize: "clamp(1.1rem, 2vw, 2.2rem)", padding: "clamp(0.85rem, 1.8vh, 1.6rem) clamp(2rem, 4vw, 4.5rem)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--accent-strong)"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 12px 36px var(--accent-glow)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--accent)"; el.style.transform = "none"; el.style.boxShadow = "none"; }}>
            Download CV
          </a>
          <a href="https://github.com/Mandchouno" target="_blank" rel="noopener noreferrer"
            className="rounded-full font-medium border transition-all duration-300 inline-block"
            style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)", fontSize: "clamp(1.1rem, 2vw, 2.2rem)", padding: "clamp(0.85rem, 1.8vh, 1.6rem) clamp(2rem, 4vw, 4.5rem)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent-glow)"; el.style.color = "var(--accent)"; el.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-strong)"; el.style.color = "var(--text-secondary)"; el.style.transform = "none"; }}>
            GitHub →
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.35} }
      `}</style>
    </motion.section>
  );
}
