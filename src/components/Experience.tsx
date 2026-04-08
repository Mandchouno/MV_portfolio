"use client";

import { motion, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import { useState } from "react";
import { useSectionOffset } from "./ScrollDriven";

const experiences = [
  {
    role: "Co-founder", company: "Neotix AI",
    period: "Jan 2026 – Present", location: "Montréal, QC", type: "Full-time",
    points: ["AI-driven automation & conversational agents for business use cases.", "Workflow automations integrating AI services and external APIs.", "Prototyped web AI products and coordinated early-stage client dev."],
    tools: ["LangChain", "LangGraph", "n8n", "Make", "Retell AI", "ElevenLabs", "RAG"],
    accent: true, fromX: -160,
  },
  {
    role: "Development Assistant", company: "Neuralytic",
    period: "Apr – Jul 2023", location: "Panama City, Panama", type: "Internship",
    points: ["ML algorithm development — Deep Learning specialization.", "Coordinated client meetings and supported business development.", "Designed and prototyped a web/mobile app using Figma."],
    tools: ["Python", "TensorFlow", "PyTorch", "Figma", "MLOps"],
    accent: false, fromX: 160,
  },
  {
    role: "Web Catalog Clerk", company: "UAP Heavy-Duty Vehicle Parts",
    period: "May – Aug 2024", location: "Montréal, QC", type: "Seasonal",
    points: ["Standardized and cleaned product data for e-commerce integration.", "Prepared large-scale Excel datasets for automated import workflows."],
    tools: ["Excel", "VBA", "Data Management"],
    accent: false, fromX: -120,
  },
];

const education = [
  { degree: "B.Sc. — Bidisciplinary Mathematics & Computer Science", specialty: "Data Science Specialization", institution: "Université de Montréal", period: "Jan 2022 – Dec 2025", location: "Montréal, QC", accent: true, fromX: -140 },
  { degree: "French Baccalaureate", specialty: "", institution: "Lycée International de Panama", period: "2008 – 2022", location: "Panama City, Panama", accent: false, fromX: 140 },
];

function ExpCard({ exp, i, off }: { exp: typeof experiences[0]; i: number; off: MotionValue<number> }) {
  const delay = i * 0.06;
  const start = -0.55 + delay;
  const cx = useTransform(off, [start, 0, 0.5], [exp.fromX, 0, -exp.fromX * 0.4]);
  const cy = useTransform(off, [start, 0, 0.5], [35, 0, -18]);
  const co = useTransform(off, [start, start + 0.22, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);

  return (
    <motion.div style={{ x: cx, y: cy, opacity: co }}>
      <div className="glass p-5"
        style={{
          borderColor: exp.accent ? "var(--accent-glow)" : "var(--border)",
          boxShadow: exp.accent ? "0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px var(--accent-dim)" : "none",
        }}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold heading" style={{ color: "var(--text-primary)", fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)" }}>{exp.role}</span>
            <span className="tag" style={{ color: exp.accent ? "var(--accent)" : "var(--text-muted)", borderColor: exp.accent ? "var(--accent-glow)" : "var(--border)" }}>{exp.type}</span>
            <span className="text-sm" style={{ color: exp.accent ? "var(--accent)" : "var(--text-secondary)" }}>@ {exp.company}</span>
          </div>
          <div className="text-right" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
            <div>{exp.period}</div><div>{exp.location}</div>
          </div>
        </div>
        <ul className="space-y-1 mb-3">
          {exp.points.map((pt, j) => (
            <li key={j} className="flex gap-2" style={{ color: "var(--text-secondary)", fontSize: "clamp(0.95rem, 1.25vw, 1.15rem)" }}>
              <span style={{ color: "var(--accent)", flexShrink: 0 }}>·</span>{pt}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {exp.tools.map(t => <span key={t} className="tag">{t}</span>)}
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
      <div className="glass p-5" style={{ borderColor: edu.accent ? "var(--accent-glow)" : "var(--border)" }}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-semibold heading" style={{ color: "var(--text-primary)", fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)" }}>{edu.degree}</p>
            {edu.specialty && <p className="mt-1" style={{ color: "var(--accent)", fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}>{edu.specialty}</p>}
            <p className="mt-1" style={{ color: "var(--text-secondary)", fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}>{edu.institution}</p>
          </div>
          <div className="text-right" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
            <div>{edu.period}</div><div>{edu.location}</div>
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
      <div className="glass p-5">
        <div className="section-label mb-3">Languages</div>
        <div className="flex flex-wrap gap-3">
          {[{ l: "French", lv: "Native" }, { l: "Spanish", lv: "Native" }, { l: "English", lv: "Professional" }].map(item => (
            <div key={item.l} className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: "var(--surface-subtle)", border: "1px solid var(--border)" }}>
              <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.l}</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.lv}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const off = useSectionOffset(3);
  const [tab, setTab] = useState<"work" | "education">("work");

  const sectionO = useTransform(off, [-0.7, -0.2, 0, 0.4, 0.7], [0, 1, 1, 1, 0]);
  const headerX  = useTransform(off, [-0.5, 0, 0.5], [-80, 0, 50]);
  const headerO  = useTransform(off, [-0.5, -0.1, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);

  return (
    <motion.section style={{ opacity: sectionO }} className="absolute inset-0 overflow-y-auto">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div style={{ minHeight: "100%", display: "flex", alignItems: "center", padding: "clamp(3rem, 6vh, 5rem) clamp(1.2rem, 2.5vw, 3rem)" }}>
      <div style={{ width: "100%", maxWidth: "min(97vw, 1700px)", margin: "0 auto" }} className="relative z-10">
        <motion.div style={{ x: headerX, opacity: headerO }} className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="section-label mb-3">03 — Experience</div>
            <h2 className="font-bold heading" style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}>
              <span style={{ color: "var(--text-primary)" }}>Where I&apos;ve </span>
              <span style={{ color: "var(--accent)" }}>worked</span>
            </h2>
          </div>
          {/* Tabs */}
          <div className="glass flex gap-1 p-1" style={{ borderRadius: "999px" }}>
            {(["work", "education"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200"
                style={{
                  borderRadius: "999px",
                  background: tab === t ? "var(--accent-dim)" : "transparent",
                  color: tab === t ? "var(--accent)" : "var(--text-muted)",
                  border: tab === t ? "1px solid var(--accent-glow)" : "1px solid transparent",
                  letterSpacing: "0.01em",
                }}>{t}</button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === "work" ? (
            <motion.div key="work" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-3">
              {experiences.map((exp, i) => <ExpCard key={exp.company} exp={exp} i={i} off={off} />)}
            </motion.div>
          ) : (
            <motion.div key="edu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-3">
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
