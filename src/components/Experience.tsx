"use client";

import { motion, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import { useState } from "react";
import { useSectionOffset } from "./ScrollDriven";

const experiences = [
  {
    role: "Co-founder", company: "Neotix AI",
    period: "Jan 2026 – Apr 2026", location: "Montréal, QC", type: "Full-time",
    points: ["AI-driven automation & conversational agents for business use cases.", "Workflow automations integrating AI services and external APIs.", "Prototyped web-based AI products and coordinated early-stage product and client development.", "Applied practical machine learning concepts to real-world data and automation pipelines."],
    tools: ["LangChain", "LangGraph", "n8n", "Make", "Retell AI", "ElevenLabs", "Python", "LLMs", "RAG"],
    accent: true, fromX: -160,
  },
  {
    role: "Web Catalog Clerk", company: "UAP Heavy-Duty Vehicle Parts",
    period: "May – Aug 2024", location: "Montréal, QC", type: "Internship",
    points: ["Standardized and cleaned product data for e-commerce integration.", "Prepared large-scale Excel datasets for automated import workflows.", "Supported the marketing team with data organization and operational tasks."],
    tools: ["Microsoft Excel", "VBA", "Data Management"],
    accent: false, fromX: 160,
  },
  {
    role: "Development Assistant", company: "Neuralytic",
    period: "Apr – Jul 2023", location: "Panama City, Panama", type: "Internship",
    points: ["ML algorithm development (Deep Learning specialization).", "Coordinated client meetings and supported business development.", "Designed and prototyped a web/mobile app using Figma."],
    tools: ["Python", "TensorFlow", "PyTorch", "Figma", "MLOps"],
    accent: false, fromX: -120,
  },
];

const education = [
  { degree: "B.Sc. — Bidisciplinary Bachelor in Mathematics/Statistics & Computer Science", specialty: "Data Science Specialization", institution: "Université of Montréal", period: "Jan 2022 – Dec 2025", location: "Montréal, QC", accent: true, fromX: -140 },
  { degree: "French Baccalaureate", specialty: "Mathematics, Physics and Chemistry Specialization", institution: "Lycée International de Panama", period: "2008 – 2022", location: "Panama City, Panama", accent: false, fromX: 140 },
];

function ExpCard({ exp, i, off }: { exp: typeof experiences[0]; i: number; off: MotionValue<number> }) {
  const delay = i * 0.06;
  const start = -0.55 + delay;
  const cx = useTransform(off, [start, 0, 0.5], [exp.fromX, 0, -exp.fromX * 0.4]);
  const cy = useTransform(off, [start, 0, 0.5], [30, 0, -15]);
  const co = useTransform(off, [start, start + 0.22, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);

  return (
    <motion.div style={{ x: cx, y: cy, opacity: co }}>
      <div className="glass" style={{
        borderColor: exp.accent ? "var(--accent-glow)" : "var(--border)",
        boxShadow: exp.accent ? "0 6px 24px rgba(0,0,0,0.15), 0 0 0 1px var(--accent-dim)" : "none",
        padding: "clamp(0.8rem, 1.4vh, 1.2rem) clamp(1rem, 2vw, 1.8rem)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "0.6rem", marginBottom: "clamp(0.5rem, 1vh, 0.9rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            <span className="font-semibold heading" style={{ color: "var(--text-primary)", fontSize: "clamp(0.92rem, 1.2vw, 1.15rem)" }}>{exp.role}</span>
            <span style={{
              fontSize: "clamp(0.68rem, 0.85vw, 0.82rem)", fontWeight: 500,
              padding: "0.18rem 0.65rem", borderRadius: "9999px",
              border: "1px solid " + (exp.accent ? "var(--accent-glow)" : "var(--border)"),
              color: exp.accent ? "var(--accent)" : "var(--text-muted)",
              background: exp.accent ? "var(--accent-dim)" : "var(--surface-subtle)",
            }}>{exp.type}</span>
            <span style={{ color: exp.accent ? "var(--accent)" : "var(--text-secondary)", fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)" }}>@ {exp.company}</span>
          </div>
          <div style={{ textAlign: "right", color: "var(--text-muted)", fontSize: "clamp(0.72rem, 0.9vw, 0.88rem)", flexShrink: 0 }}>
            <div>{exp.period}</div>
            <div style={{ marginTop: "0.15rem" }}>{exp.location}</div>
          </div>
        </div>

        {/* Bullet points */}
        <ul style={{ display: "flex", flexDirection: "column", gap: "clamp(0.2rem, 0.5vh, 0.45rem)", marginBottom: "clamp(0.5rem, 1vh, 0.9rem)" }}>
          {exp.points.map((pt, j) => (
            <li key={j} style={{ display: "flex", gap: "0.6rem", color: "var(--text-secondary)", fontSize: "clamp(0.78rem, 0.95vw, 0.9rem)", lineHeight: 1.6 }}>
              <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.1em" }}>·</span>{pt}
            </li>
          ))}
        </ul>

        {/* Tools */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {exp.tools.map(t => (
            <span key={t} style={{
              fontSize: "clamp(0.68rem, 0.85vw, 0.82rem)",
              padding: "0.2rem 0.65rem",
              borderRadius: "9999px",
              border: "1px solid var(--border-warm)",
              color: "var(--text-warm)",
              background: "var(--surface-warm)",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EduCard({ edu, i, off }: { edu: typeof education[0]; i: number; off: MotionValue<number> }) {
  const delay = i * 0.07;
  const start = -0.55 + delay;
  const cx = useTransform(off, [start, 0, 0.5], [edu.fromX, 0, -edu.fromX * 0.4]);
  const co = useTransform(off, [start, start + 0.22, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);

  return (
    <motion.div style={{ x: cx, opacity: co }}>
      <div className="glass" style={{
        borderColor: edu.accent ? "var(--accent-glow)" : "var(--border)",
        boxShadow: edu.accent ? "0 6px 24px rgba(0,0,0,0.15), 0 0 0 1px var(--accent-dim)" : "none",
        padding: "clamp(0.8rem, 1.4vh, 1.2rem) clamp(1rem, 2vw, 1.8rem)",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="font-semibold heading" style={{ color: "var(--text-primary)", fontSize: "clamp(0.92rem, 1.2vw, 1.15rem)" }}>{edu.degree}</p>
            {edu.specialty && <p style={{ color: "var(--accent)", fontSize: "clamp(0.82rem, 1vw, 0.95rem)", marginTop: "0.3rem" }}>{edu.specialty}</p>}
            <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.78rem, 0.95vw, 0.9rem)", marginTop: "0.25rem" }}>{edu.institution}</p>
          </div>
          <div style={{ textAlign: "right", color: "var(--text-muted)", fontSize: "clamp(0.72rem, 0.9vw, 0.88rem)", flexShrink: 0 }}>
            <div>{edu.period}</div>
            <div style={{ marginTop: "0.2rem" }}>{edu.location}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LangCard({ off }: { off: MotionValue<number> }) {
  const co = useTransform(off, [-0.65, -0.25, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);
  return (
    <motion.div style={{ opacity: co }}>
      <div className="glass" style={{ padding: "clamp(0.8rem, 1.4vh, 1.2rem) clamp(1rem, 2vw, 1.8rem)" }}>
        <div className="section-label" style={{ fontSize: "clamp(0.68rem, 0.85vw, 0.82rem)", marginBottom: "0.8rem" }}>Languages</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          {[{ l: "French", lv: "Native" }, { l: "Spanish", lv: "Native" }, { l: "English", lv: "Professional" }].map(item => (
            <div key={item.l} style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              padding: "0.4rem 1rem",
              borderRadius: "0.75rem",
              background: "var(--surface-subtle)",
              border: "1px solid var(--border)",
            }}>
              <span style={{ color: "var(--text-primary)", fontSize: "clamp(0.82rem, 1vw, 0.95rem)", fontWeight: 500 }}>{item.l}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "clamp(0.72rem, 0.85vw, 0.82rem)" }}>{item.lv}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const off = useSectionOffset(2);
  const [tab, setTab] = useState<"work" | "education">("work");

  const sectionO = useTransform(off, [-0.7, -0.2, 0, 0.4, 0.7], [0, 1, 1, 1, 0]);
  const headerX  = useTransform(off, [-0.5, 0, 0.5], [-80, 0, 50]);
  const headerO  = useTransform(off, [-0.5, -0.1, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);

  return (
    <motion.section style={{ opacity: sectionO }} className="absolute inset-0 overflow-y-auto">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div style={{ minHeight: "100%", display: "flex", alignItems: "center", padding: "clamp(2.5rem, 5vh, 4rem) clamp(1.2rem, 2.5vw, 3rem)" }}>
      <div style={{ width: "100%", maxWidth: "min(96vw, 1600px)", margin: "0 auto" }} className="relative z-10">
        <motion.div style={{ x: headerX, opacity: headerO }} className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <div>
            <div className="section-label mb-2">02 — Experience</div>
            <h2 className="font-bold heading" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3rem)" }}>
              <span style={{ color: "var(--text-primary)" }}>Where I&apos;ve </span>
              <span style={{ color: "var(--accent)" }}>worked</span>
            </h2>
          </div>
          {/* Tabs */}
          <div className="glass flex gap-1 p-1" style={{ borderRadius: "999px" }}>
            {(["work", "education"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="font-medium capitalize transition-all duration-200"
                style={{
                  borderRadius: "999px",
                  padding: "0.35rem clamp(0.8rem, 1.5vw, 1.4rem)",
                  fontSize: "clamp(0.78rem, 0.95vw, 0.9rem)",
                  background: tab === t ? "var(--accent-dim)" : "transparent",
                  color: tab === t ? "var(--accent)" : "var(--text-muted)",
                  border: tab === t ? "1px solid var(--accent-glow)" : "1px solid transparent",
                  letterSpacing: "0.01em",
                  cursor: "pointer",
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => { if (tab !== t) { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; } }}
                onMouseLeave={e => { if (tab !== t) { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; } }}
              >{t}</button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === "work" ? (
            <motion.div key="work" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2">
              {experiences.map((exp, i) => <ExpCard key={exp.company} exp={exp} i={i} off={off} />)}
            </motion.div>
          ) : (
            <motion.div key="edu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2">
              {education.map((edu, i) => <EduCard key={edu.institution} edu={edu} i={i} off={off} />)}
              <LangCard off={off} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </motion.section>
  );
}
