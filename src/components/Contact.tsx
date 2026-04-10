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

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function IconDocument() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function SocialLink({ icon, label, handle, href, accent, off, delay }: {
  icon: React.ReactNode; label: string; handle: string; href: string;
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
        el.style.transform = "translateX(5px)";
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
        gap: "0.85rem",
        padding: "0.7rem 1.1rem",
      }}>
        {/* Icon badge */}
        <div style={{
          width: "2.1rem",
          height: "2.1rem",
          borderRadius: "0.6rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          background: accent ? "var(--accent-dim)" : "var(--surface-medium)",
          color: accent ? "var(--accent)" : "var(--text-secondary)",
          border: "1px solid " + (accent ? "var(--accent-glow)" : "var(--border)"),
        }}>
          {icon}
        </div>
        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{
            color: "var(--accent)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>{label}</div>
          <div style={{
            color: accent ? "var(--accent)" : "var(--text-primary)",
            fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
            fontWeight: 500,
            marginTop: "0.15rem",
          }}>{handle}</div>
        </div>
        <span style={{ color: accent ? "var(--accent)" : "var(--text-muted)", fontSize: "0.85rem" }}>↗</span>
      </div>
    </motion.a>
  );
}

const links = [
  { icon: <IconGitHub />,  label: "GitHub",   handle: "@Mandchouno",  href: "https://github.com/Mandchouno",             accent: false },
  { icon: <IconLinkedIn />,label: "LinkedIn", handle: "mandi-vigier", href: "https://www.linkedin.com/in/mandi-vigier/", accent: false },
  { icon: <IconDocument />,label: "Resume",   handle: "Download CV",  href: "/MV_portfolio/MV_CV_.pdf",                  accent: true  },
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
          padding: "0 2.5vw clamp(2.5rem, 6vh, 5rem)",
          maxWidth: "min(96vw, 1400px)",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 5vw, 6rem)", alignItems: "end" }}>

          {/* ── Left column ────────────────────────────────────────────── */}
          <div>
            <div className="section-label" style={{ fontSize: "clamp(0.72rem, 0.9vw, 0.88rem)", marginBottom: "0.5rem" }}>
              04 — Contact
            </div>
            <motion.h2
              style={{ x: titleX, opacity: titleO, fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)" }}
              className="font-bold mb-4 heading"
            >
              <span style={{ color: "var(--text-primary)", display: "block" }}>
                Let&apos;s build something<br />
                <span style={{ color: "var(--accent)" }}>together</span>.
              </span>
            </motion.h2>

            <motion.p style={{ x: descX, opacity: descO, marginBottom: "clamp(1.2rem, 2.5vh, 2.2rem)" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "clamp(0.85rem, 1.05vw, 1rem)", lineHeight: 1.75 }}>
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
                gap: "0.85rem",
                padding: "0.7rem 1.1rem",
              }}>
                <div style={{
                  width: "2.1rem",
                  height: "2.1rem",
                  borderRadius: "0.6rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  background: "var(--accent-dim)",
                  color: "var(--accent)",
                  border: "1px solid var(--accent-glow)",
                }}><IconMail /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--accent)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>Email</div>
                  <div style={{ color: "var(--text-primary)", fontSize: "clamp(0.82rem, 1vw, 0.95rem)", fontWeight: 500, marginTop: "0.15rem" }}>mandi.vigier@gmail.com</div>
                </div>
                <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>
                  {copied ? "Copied ✓" : "Copy →"}
                </span>
              </div>
            </motion.button>
          </div>

          {/* ── Right column — social links ─────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
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
          fontSize: "clamp(0.72rem, 0.9vw, 0.88rem)",
          fontFamily: "ui-monospace, monospace",
          letterSpacing: "0.02em",
          padding: "clamp(0.7rem, 1.4vh, 1.2rem) 2.5vw",
        }}
      >
        <span>Mandi Téo Vigier © {new Date().getFullYear()}</span>
        <span>Montréal, QC</span>
        <Clock />
      </div>
    </motion.section>
  );
}
