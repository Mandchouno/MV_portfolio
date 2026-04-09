"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { useSectionOffset } from "./ScrollDriven";

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false, timeZone: "America/Toronto",
      }) + " EST"
    );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

function SocialLink({ icon, label, handle, href, accent, off, delay }: {
  icon: string; label: string; handle: string; href: string;
  accent?: boolean; off: MotionValue<number>; delay: number;
}) {
  const lx = useTransform(off, [-0.3 + delay, 0], [90, 0]);
  const ly = useTransform(off, [-0.3 + delay, 0], [delay * 200 + 20, 0]);
  const lo = useTransform(off, [-0.3 + delay, -0.05 + delay, 0], [0, 1, 1]);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass glass-hover"
      style={{ x: lx, y: ly, opacity: lo, display: "block", textDecoration: "none", borderColor: accent ? "var(--accent-glow)" : "var(--border)" }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--accent-glow)";
        el.style.transform = "translateX(6px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = accent ? "var(--accent-glow)" : "var(--border)";
        el.style.transform = "none";
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(1.2rem, 2.5vw, 3rem)",
        padding: "clamp(1.2rem, 2.5vh, 2.2rem) clamp(1.4rem, 3vw, 3.2rem)",
      }}>
        {/* Icon badge */}
        <div style={{
          width: "clamp(2rem, 2.8vw, 2.8rem)",
          height: "clamp(2rem, 2.8vw, 2.8rem)",
          borderRadius: "0.85rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          background: accent ? "var(--accent-dim)" : "var(--surface-medium)",
          color: accent ? "var(--accent)" : "var(--text-secondary)",
          border: "1px solid " + (accent ? "var(--accent-glow)" : "var(--border)"),
          fontSize: "clamp(0.85rem, 1.4vw, 1.5rem)",
          fontFamily: "ui-monospace, monospace",
          fontWeight: 700,
        }}>
          {icon}
        </div>
        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{
            color: "var(--accent)",
            fontSize: "clamp(0.6rem, 0.8vw, 0.85rem)",
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}>{label}</div>
          <div style={{
            color: accent ? "var(--accent)" : "var(--text-primary)",
            fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
            fontWeight: 500,
            marginTop: "0.2rem",
          }}>{handle}</div>
        </div>
        <span style={{ color: accent ? "var(--accent)" : "var(--text-muted)", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}>↗</span>
      </div>
    </motion.a>
  );
}

const links = [
  { icon: "GH", label: "GitHub",   handle: "@Mandchouno",  href: "https://github.com/Mandchouno",             accent: false },
  { icon: "LI", label: "LinkedIn", handle: "mandi-vigier", href: "https://www.linkedin.com/in/mandi-vigier/", accent: false },
  { icon: "CV", label: "Resume",   handle: "Download CV",  href: "/MV_CV_.pdf",                               accent: true  },
];

export default function Contact() {
  const off = useSectionOffset(4);
  const [copied, setCopied] = useState(false);

  const sectionO = useTransform(off, [-0.5, -0.25, 0, 0.5], [0, 0, 1, 1]);
  const titleX   = useTransform(off, [-0.25, 0], [-80, 0]);
  const titleO   = useTransform(off, [-0.25, -0.02, 0], [0, 1, 1]);
  const descX    = useTransform(off, [-0.22, 0], [-60, 0]);
  const descO    = useTransform(off, [-0.22, -0.02, 0], [0, 1, 1]);
  const emailY   = useTransform(off, [-0.2, 0], [40, 0]);
  const emailO   = useTransform(off, [-0.2, -0.02, 0], [0, 1, 1]);

  return (
    <motion.section
      style={{ opacity: sectionO }}
      className="absolute inset-0 flex flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div
        className="relative z-10"
        style={{
          padding: "0 2.5vw clamp(3rem, 7vh, 6rem)",
          maxWidth: "99vw",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 6vw, 8rem)", alignItems: "end" }}>

          {/* ── Left column ────────────────────────────────────────────── */}
          <div>
            {/* Section label — sits right above the heading */}
            <div className="section-label" style={{ fontSize: "clamp(0.75rem, 1vw, 1.1rem)", marginBottom: "0.6rem" }}>
              04 — Contact
            </div>
            <motion.h2
              style={{ x: titleX, opacity: titleO, fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              className="font-bold mb-5 heading"
            >
              <span style={{ color: "var(--text-primary)", display: "block" }}>
                Let&apos;s build something<br />
                <span style={{ color: "var(--accent)" }}>together</span>.
              </span>
            </motion.h2>

            <motion.p style={{ x: descX, opacity: descO, marginBottom: "clamp(1.5rem, 3vh, 3rem)" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "clamp(0.95rem, 1.4vw, 1.5rem)", lineHeight: 1.8 }}>
                Open to new opportunities, collaborations, or a good conversation about
                data, AI, or football. Feel free to reach out.
              </span>
            </motion.p>

            {/* Email copy button */}
            <motion.button
              style={{ y: emailY, opacity: emailO, width: "100%" }}
              onClick={() => {
                navigator.clipboard.writeText("mandi.vigier@gmail.com");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="glass glass-hover text-left"
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent-glow)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(1rem, 2vw, 2rem)",
                padding: "clamp(1rem, 2vh, 1.8rem) clamp(1.2rem, 2.5vw, 2.6rem)",
              }}>
                <div style={{
                  width: "clamp(2.6rem, 4.5vw, 5rem)",
                  height: "clamp(2.6rem, 4.5vw, 5rem)",
                  borderRadius: "0.85rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  background: "var(--accent-dim)",
                  color: "var(--accent)",
                  border: "1px solid var(--accent-glow)",
                  fontSize: "clamp(0.85rem, 1.4vw, 1.5rem)",
                  fontFamily: "ui-monospace, monospace",
                  fontWeight: 700,
                }}>@</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--accent)", fontSize: "clamp(0.6rem, 0.8vw, 0.85rem)", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase" }}>Email</div>
                  <div style={{ color: "var(--text-primary)", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", fontWeight: 500, marginTop: "0.2rem" }}>mandi.vigier@gmail.com</div>
                </div>
                <span style={{ color: "var(--accent)", fontSize: "clamp(0.85rem, 1.2vw, 1.3rem)" }}>
                  {copied ? "Copied ✓" : "Copy →"}
                </span>
              </div>
            </motion.button>
          </div>

          {/* ── Right column — social links ─────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.8rem, 1.5vh, 1.6rem)" }}>
            {links.map((link, i) => (
              <SocialLink key={link.label} {...link} off={off} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 border-t flex flex-wrap items-center justify-between gap-4"
        style={{
          borderColor: "var(--border)",
          color: "var(--text-muted)",
          fontSize: "clamp(0.75rem, 1vw, 1rem)",
          fontFamily: "ui-monospace, monospace",
          letterSpacing: "0.02em",
          padding: "clamp(0.9rem, 1.8vh, 1.6rem) 2.5vw",
        }}
      >
        <span>Mandi Téo Vigier © {new Date().getFullYear()}</span>
        <span>Montréal, QC</span>
        <Clock />
        <span>Next.js · Framer Motion · Tailwind</span>
      </div>
    </motion.section>
  );
}
