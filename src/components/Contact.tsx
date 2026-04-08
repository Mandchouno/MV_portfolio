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
      style={{ x: lx, y: ly, opacity: lo, display: "block", textDecoration: "none", borderColor: accent ? "var(--accent-glow)" : undefined }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--accent-glow)";
        el.style.transform = "translateX(5px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = accent ? "var(--accent-glow)" : "var(--border)";
        el.style.transform = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.9rem, 1.5vw, 1.5rem)", padding: "clamp(0.9rem, 1.5vh, 1.4rem) clamp(1rem, 1.8vw, 1.6rem)" }}>
        {/* Icon */}
        <div style={{
          width: "clamp(2.4rem, 3.5vw, 3.2rem)",
          height: "clamp(2.4rem, 3.5vw, 3.2rem)",
          borderRadius: "0.75rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          background: accent ? "var(--accent-dim)" : "var(--surface-medium)",
          color: accent ? "var(--accent)" : "var(--text-secondary)",
          border: "1px solid " + (accent ? "var(--accent-glow)" : "var(--border)"),
          fontSize: "clamp(0.75rem, 1vw, 0.95rem)",
          fontFamily: "ui-monospace, monospace",
          fontWeight: 700,
        }}>
          {icon}
        </div>
        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{ color: "var(--accent)", fontSize: "clamp(0.6rem, 0.75vw, 0.72rem)", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase" }}>{label}</div>
          <div style={{ color: accent ? "var(--accent)" : "var(--text-primary)", fontSize: "clamp(0.95rem, 1.35vw, 1.2rem)", fontWeight: 500, marginTop: "0.25rem" }}>{handle}</div>
        </div>
        <span style={{ color: accent ? "var(--accent)" : "var(--text-muted)", fontSize: "1.1rem" }}>↗</span>
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
          padding: "0 clamp(1.2rem, 2.5vw, 3rem) clamp(3.5rem, 8vh, 6rem)",
          maxWidth: "min(97vw, 1700px)",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Section label — properly aligned with content */}
        <div className="section-label" style={{ fontSize: "clamp(0.65rem, 0.85vw, 0.8rem)", marginBottom: "clamp(1rem, 2vh, 1.8rem)" }}>
          04 — Contact
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 5vw, 6rem)", alignItems: "end" }}>

          {/* ── Left column ────────────────────────────────────────────── */}
          <div>
            <motion.h2
              style={{ x: titleX, opacity: titleO, fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }}
              className="font-bold mb-5 heading"
            >
              <span style={{ color: "var(--text-primary)", display: "block" }}>
                Let&apos;s build something<br />
                <span style={{ color: "var(--accent)" }}>together</span>.
              </span>
            </motion.h2>

            <motion.p style={{ x: descX, opacity: descO, marginBottom: "clamp(1.2rem, 2.5vh, 2rem)" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "clamp(1rem, 1.45vw, 1.25rem)", lineHeight: 1.85 }}>
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
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.9rem, 1.5vw, 1.4rem)", padding: "clamp(0.9rem, 1.5vh, 1.4rem) clamp(1rem, 1.8vw, 1.6rem)" }}>
                <div style={{
                  width: "clamp(2.4rem, 3.5vw, 3.2rem)",
                  height: "clamp(2.4rem, 3.5vw, 3.2rem)",
                  borderRadius: "0.75rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  background: "var(--accent-dim)",
                  color: "var(--accent)",
                  border: "1px solid var(--accent-glow)",
                  fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
                  fontFamily: "ui-monospace, monospace",
                  fontWeight: 700,
                }}>@</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--accent)", fontSize: "clamp(0.6rem, 0.75vw, 0.72rem)", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase" }}>Email</div>
                  <div style={{ color: "var(--text-primary)", fontSize: "clamp(0.95rem, 1.35vw, 1.2rem)", fontWeight: 500, marginTop: "0.25rem" }}>mandi.vigier@gmail.com</div>
                </div>
                <span style={{ color: "var(--accent)", fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}>
                  {copied ? "Copied ✓" : "Copy →"}
                </span>
              </div>
            </motion.button>
          </div>

          {/* ── Right column — social links ─────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.7rem, 1.2vh, 1.1rem)" }}>
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
          fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)",
          fontFamily: "ui-monospace, monospace",
          letterSpacing: "0.02em",
          padding: "clamp(0.75rem, 1.5vh, 1.2rem) clamp(1.2rem, 2.5vw, 3rem)",
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
