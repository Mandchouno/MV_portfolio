"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useState } from "react";
import { useSectionOffset } from "./ScrollDriven";

const projects = [
  { id: "01", title: "PL Prediction",       subtitle: "Premier League",        year: "2025", tags: ["Python", "GCN", "Bayes"],      desc: "Predicts Premier League standings using FNN, Bayesian classifiers, and Graph Convolutional Networks.", github: "https://github.com/TokamLilian/PL-prediction-db" },
  { id: "02", title: "Chatbot Finance",     subtitle: "Copilote IA Financier",  year: "2025", tags: ["FastAPI", "RAG", "LangChain"], desc: "Educational finance chatbot combining semantic search (RAG), intent detection, and financial calculators.", github: "https://github.com/Mandchouno/Chatbot_Finance" },
  { id: "03", title: "Text Classification", subtitle: "Kaggle IFT3395/6390",   year: "2024", tags: ["Scikit-learn", "SVM", "NLP"],   desc: "Binary text classification on imbalanced datasets. Lemmatization, Mann-Whitney selection, Bayesian optimization.", github: "https://github.com/Mandchouno/Kaggle_ML_classification-de-texte" },
  { id: "04", title: "La Liga Prediction",  subtitle: "Match Outcomes",         year: "2025", tags: ["Python", "ML", "Pandas"],       desc: "La Liga match outcome prediction with multiple ML models. Full data pipeline from collection to evaluation.", github: "https://github.com/Mandchouno/Laliga-prediction" },
  { id: "05", title: "UniShop",             subtitle: "Student Marketplace",    year: "2023", tags: ["Java", "OOP", "JUnit"],         desc: "OOP marketplace for students to buy/sell academic items. Separate roles, orders, metrics, JSON persistence.", github: "https://github.com/medinammartin3/UniShop" },
];

const origins = [
  { x: -120, y:  70 },
  { x:  120, y:  70 },
  { x:    0, y: 110 },
  { x: -100, y:  50 },
  { x:  100, y:  50 },
];

function ProjectCard({ p, i, off }: { p: typeof projects[0]; i: number; off: MotionValue<number> }) {
  const [hovered, setHovered] = useState(false);
  const { x: ox, y: oy } = origins[i];
  const delay = i * 0.045;
  const start = -0.55 + delay;

  const cx = useTransform(off, [start, 0, 0.5], [ox, 0, -ox * 0.4]);
  const cy = useTransform(off, [start, 0, 0.5], [oy, 0, -oy * 0.4]);
  const co = useTransform(off, [start, start + 0.22, 0, 0.38, 0.62], [0, 1, 1, 1, 0]);
  const cs = useTransform(off, [-0.5 + delay, 0, 0.4], [0.86, 1, 0.98]);

  return (
    <motion.div style={{ x: cx, y: cy, opacity: co, scale: cs, height: "100%" }}>
      <a
        href={p.github}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="glass glass-hover h-full"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(1rem, 1.8vh, 1.8rem)",
          padding: "clamp(1.4rem, 3vh, 3rem) clamp(1.4rem, 2.5vw, 2.8rem)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: hovered ? "var(--accent-glow)" : "var(--border)",
          boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.22), 0 0 0 1px var(--accent-dim)" : "none",
          transform: hovered ? "translateY(-4px)" : "none",
          transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="section-label" style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.95rem)", marginBottom: "0.5rem" }}>{p.id}</div>
            <h3 className="font-semibold heading" style={{
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
            }}>{p.title}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.8rem, 1vw, 1rem)", marginTop: "0.3rem" }}>{p.subtitle}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0, marginTop: "0.25rem" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "clamp(0.85rem, 1.1vw, 1.1rem)" }}>{p.year}</span>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderColor: hovered ? "var(--accent-glow)" : "var(--border-strong)",
                color: hovered ? "var(--accent)" : "var(--text-muted)",
                fontSize: "clamp(0.9rem, 1.2vw, 1.3rem)",
                padding: "0.25rem 0.7rem",
                borderRadius: "9999px",
                border: "1px solid",
                transition: "all 0.2s",
              }}
            >↗</a>
          </div>
        </div>

        {/* Description */}
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
          lineHeight: 1.7,
          flex: 1,
        }}>{p.desc}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {p.tags.map(tag => (
            <span key={tag} style={{
              fontSize: "clamp(0.85rem, 1.1vw, 1.2rem)",
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              border: "1px solid var(--border-warm)",
              color: "var(--text-warm)",
              background: "var(--surface-warm)",
            }}>{tag}</span>
          ))}
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const off = useSectionOffset(3);
  const sectionO = useTransform(off, [-0.7, -0.2, 0, 0.4, 0.7], [0, 1, 1, 1, 0]);
  const headerX  = useTransform(off, [-0.5, 0, 0.5], [-80, 0, 50]);
  const headerO  = useTransform(off, [-0.5, -0.1, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);

  return (
    <motion.section style={{ opacity: sectionO }} className="absolute inset-0 overflow-y-auto">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div style={{ minHeight: "100%", display: "flex", alignItems: "center", padding: "5vh 2.5vw 2vh" }}>
      <div style={{ width: "100%", maxWidth: "min(96vw, 1600px)", margin: "0 auto" }} className="relative z-10">

        <motion.div style={{ x: headerX, opacity: headerO }} className="flex items-end justify-between flex-wrap gap-3">
          <div style={{ marginBottom: "clamp(1.5rem, 3vh, 3rem)" }}>
            <div className="section-label" style={{ fontSize: "clamp(0.75rem, 1vw, 1rem)", marginBottom: "0.75rem" }}>03 — Work</div>
            <h2 className="font-bold heading" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3rem)" }}>
              <span style={{ color: "var(--text-primary)" }}>Selected </span>
              <span style={{ color: "var(--accent)" }}>projects</span>
            </h2>
          </div>
          <a
            href="https://github.com/Mandchouno"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem, 1.2vw, 1.3rem)", marginBottom: "clamp(1.5rem, 3vh, 3rem)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            All on GitHub →
          </a>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(1rem, 2vw, 2.5rem)",
          alignItems: "stretch",
          gridAutoRows: "1fr",
        }}>
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} off={off} />)}
        </div>

      </div>
      </div>
    </motion.section>
  );
}
