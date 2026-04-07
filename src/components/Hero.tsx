"use client";

import { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { useSectionOffset } from "./ScrollDriven";

const roles = ["Data Scientist", "AI Builder", "ML Engineer", "Co-founder @ Neotix AI"];

export default function Hero() {
  const off = useSectionOffset(0);

  const sectionO  = useTransform(off, [-0.5, -0.15, 0, 0.4, 0.7], [0, 1, 1, 1, 0]);
  const badgeY    = useTransform(off, [-0.5, 0, 0.5], [50,  0, -35]);
  const badgeO    = useTransform(off, [-0.45, -0.1, 0, 0.35, 0.6], [0, 1, 1, 1, 0]);
  const titleY    = useTransform(off, [-0.4, 0, 0.45], [80, 0, -50]);
  const titleO    = useTransform(off, [-0.4, -0.08, 0, 0.35, 0.6], [0, 1, 1, 1, 0]);
  const titleScale= useTransform(off, [-0.3, 0, 0.4], [0.9, 1, 1.03]);
  const subY      = useTransform(off, [-0.5, 0, 0.45], [55, 0, -38]);
  const subO      = useTransform(off, [-0.5, -0.1, 0, 0.35, 0.6], [0, 1, 1, 1, 0]);
  const descY     = useTransform(off, [-0.55, 0, 0.45], [45, 0, -30]);
  const descO     = useTransform(off, [-0.55, -0.15, 0, 0.35, 0.6], [0, 1, 1, 1, 0]);
  const btnY      = useTransform(off, [-0.6, 0, 0.45], [36, 0, -25]);
  const btnO      = useTransform(off, [-0.6, -0.2, 0, 0.35, 0.6], [0, 1, 1, 1, 0]);

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
    <motion.section style={{ opacity: sectionO }} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Radial glow — blue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(122,154,189,0.08) 0%, transparent 65%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Badge */}
        <motion.div style={{ y: badgeY, opacity: badgeO }} className="mb-7">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border"
            style={{ color: "var(--accent)", borderColor: "var(--accent-glow)", background: "var(--accent-dim)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)", animation: "pulse 2s ease-in-out infinite" }} />
            Open to opportunities
          </span>
        </motion.div>

        {/* Title — tight tracking */}
        <motion.h1 style={{ y: titleY, opacity: titleO, scale: titleScale }}
          className="text-6xl md:text-8xl font-bold mb-5 heading">
          <span style={{ color: "var(--text-primary)", display: "block" }}>The online home of</span>
          <span style={{ color: "var(--accent)" }}>Mandi&apos;s</span>
          <span style={{ color: "var(--text-primary)" }}> work.</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div style={{ y: subY, opacity: subO }} className="text-lg md:text-2xl mb-5 h-9 font-light">
          <span style={{ color: "var(--text-secondary)" }}>{displayed}</span>
          <span className="inline-block w-0.5 h-6 ml-0.5 align-middle rounded-sm"
            style={{ background: "var(--accent)", animation: "blink 1s step-end infinite" }} />
        </motion.div>

        {/* Description */}
        <motion.p style={{ y: descY, opacity: descO }} className="text-sm md:text-base max-w-md mx-auto mb-10">
          <span style={{ color: "var(--text-muted)", lineHeight: 1.85 }}>
            Data Science student at Université de Montréal & Co-founder of Neotix AI —
            turning raw data into actionable insights.
          </span>
        </motion.p>

        {/* Buttons */}
        <motion.div style={{ y: btnY, opacity: btnO }} className="flex flex-wrap gap-3 justify-center">
          <a href="/MV_CV_.pdf" target="_blank" rel="noopener noreferrer"
            className="px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 inline-block"
            style={{ background: "var(--accent)", color: "#090b0f" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--accent-strong)"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 12px 36px var(--accent-glow)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--accent)"; el.style.transform = "none"; el.style.boxShadow = "none"; }}>
            Download CV
          </a>
          <a href="https://github.com/Mandchouno" target="_blank" rel="noopener noreferrer"
            className="px-7 py-3 rounded-full text-sm font-medium border transition-all duration-300 inline-block"
            style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
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
