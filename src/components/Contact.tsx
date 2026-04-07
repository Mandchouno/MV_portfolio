"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { useSectionOffset } from "./ScrollDriven";

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(
      new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "America/Toronto" }) + " EST"
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
  const lx = useTransform(off, [-0.5 + delay, 0], [110, 0]);
  const ly = useTransform(off, [-0.5 + delay, 0], [delay * 300 + 25, 0]);
  const lo = useTransform(off, [-0.5 + delay, -0.1 + delay, 0], [0, 1, 1]);

  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer"
      style={{ x: lx, y: ly, opacity: lo, display: "block", textDecoration: "none" }}
      className="glass glass-hover flex items-center gap-4 p-4"
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent-glow)"; el.style.transform = "translateX(4px)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = accent ? "var(--accent-glow)" : "var(--border)"; el.style.transform = "none"; }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
        style={{ background: accent ? "var(--accent-dim)" : "rgba(231,236,244,0.06)", color: accent ? "var(--accent)" : "var(--text-secondary)", border: "1px solid var(--border)" }}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="section-label">{label}</div>
        <div className="text-sm font-medium mt-0.5" style={{ color: accent ? "var(--accent)" : "var(--text-primary)" }}>{handle}</div>
      </div>
      <span style={{ color: accent ? "var(--accent)" : "var(--text-muted)" }}>↗</span>
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

  const sectionO = useTransform(off, [-0.7, -0.2, 0, 0.5], [0, 1, 1, 1]);
  const titleX   = useTransform(off, [-0.5, 0], [-100, 0]);
  const titleO   = useTransform(off, [-0.5, -0.1, 0], [0, 1, 1]);
  const descX    = useTransform(off, [-0.55, 0], [-80, 0]);
  const descO    = useTransform(off, [-0.55, -0.15, 0], [0, 1, 1]);
  const emailY   = useTransform(off, [-0.6, 0], [55, 0]);
  const emailO   = useTransform(off, [-0.6, -0.2, 0], [0, 1, 1]);

  return (
    <motion.section style={{ opacity: sectionO }} className="absolute inset-0 overflow-y-auto">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "4.5rem 2rem 1rem" }}>
        <div style={{ width: "100%", maxWidth: "64rem", margin: "0 auto" }} className="relative z-10">
          <div className="section-label mb-10">04 — Contact</div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.h2 style={{ x: titleX, opacity: titleO }} className="text-4xl md:text-5xl font-bold mb-5 heading">
                <span style={{ color: "var(--text-primary)", display: "block" }}>
                  Let&apos;s build something<br />
                  <span style={{ color: "var(--accent)" }}>together</span>.
                </span>
              </motion.h2>

              <motion.p style={{ x: descX, opacity: descO }} className="text-sm mb-8">
                <span style={{ color: "var(--text-secondary)", lineHeight: 1.85 }}>
                  Open to new opportunities, collaborations, or a good conversation about
                  data, AI, or football. Feel free to reach out.
                </span>
              </motion.p>

              {/* Email copy */}
              <motion.button style={{ y: emailY, opacity: emailO }}
                onClick={() => { navigator.clipboard.writeText("mandi.vigier@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="glass glass-hover flex items-center gap-3 p-4 w-full text-left"
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent-glow)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-bold flex-shrink-0"
                  style={{ background: "var(--accent-dim)", color: "var(--accent)", border: "1px solid var(--accent-glow)" }}>@</div>
                <div className="flex-1">
                  <div className="section-label">Email</div>
                  <div className="text-sm font-medium mt-0.5" style={{ color: "var(--text-primary)" }}>mandi.vigier@gmail.com</div>
                </div>
                <span className="text-xs" style={{ color: "var(--accent)" }}>{copied ? "Copied ✓" : "Copy →"}</span>
              </motion.button>
            </div>

            {/* Right */}
            <div className="space-y-3">
              {links.map((link, i) => <SocialLink key={link.label} {...link} off={off} delay={i * 0.06} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t py-5 flex flex-wrap items-center justify-between gap-4"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)", fontSize: "0.7rem", fontFamily: "ui-monospace, monospace", letterSpacing: "0.02em", padding: "1.25rem 2rem" }}>
        <span>Mandi Téo Vigier © {new Date().getFullYear()}</span>
        <span>Montréal, QC</span>
        <Clock />
        <span>Next.js · Framer Motion · Tailwind</span>
      </div>
      </div>
    </motion.section>
  );
}
