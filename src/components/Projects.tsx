"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useState } from "react";
import { useSectionOffset } from "./ScrollDriven";

const projects = [
  { id: "01", title: "PL Prediction",       subtitle: "Premier League",        year: "2025", tags: ["Python", "GCN", "Bayes"],      desc: "Predicts Premier League standings using FNN, Bayesian classifiers, and Graph Convolutional Networks.", github: "https://github.com/Mandchouno/PL-prediction-db" },
  { id: "02", title: "Chatbot Finance",     subtitle: "Copilote IA Financier",  year: "2025", tags: ["FastAPI", "RAG", "LangChain"], desc: "Educational finance chatbot combining semantic search (RAG), intent detection, and financial calculators.", github: "https://github.com/Mandchouno/Chatbot_Finance" },
  { id: "03", title: "Text Classification", subtitle: "Kaggle IFT3395/6390",   year: "2024", tags: ["Scikit-learn", "SVM", "NLP"],   desc: "Binary text classification on imbalanced datasets. Lemmatization, Mann-Whitney selection, Bayesian optimization.", github: "https://github.com/Mandchouno/Kaggle_Text_Classification" },
  { id: "04", title: "La Liga Prediction",  subtitle: "Match Outcomes",         year: "2025", tags: ["Python", "ML", "Pandas"],       desc: "La Liga match outcome prediction with multiple ML models. Full data pipeline from collection to evaluation.", github: "https://github.com/Mandchouno/La-Liga-Prediction" },
  { id: "05", title: "UniShop",             subtitle: "Student Marketplace",    year: "2023", tags: ["Java", "OOP", "JUnit"],         desc: "OOP marketplace for students to buy/sell academic items. Separate roles, orders, metrics, JSON persistence.", github: "https://github.com/Mandchouno/UniShop" },
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
    <motion.div style={{ x: cx, y: cy, opacity: co, scale: cs }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="glass glass-hover p-5 flex flex-col gap-3 cursor-default h-full"
        style={{
          borderColor: hovered ? "var(--accent-glow)" : "var(--border)",
          boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.22), 0 0 0 1px var(--accent-dim)" : "none",
          transform: hovered ? "translateY(-3px)" : "none",
          transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="section-label mb-1">{p.id}</div>
            <h3 className="font-semibold heading" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em", fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)" }}>{p.title}</h3>
            <p className="mt-0.5" style={{ color: "var(--text-muted)", fontSize: "clamp(0.88rem, 1.1vw, 1.05rem)" }}>{p.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{p.year}</span>
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              className="text-xs px-2 py-0.5 rounded-full border transition-all duration-200"
              style={{
                borderColor: hovered ? "var(--accent-glow)" : "var(--border-strong)",
                color: hovered ? "var(--accent)" : "var(--text-muted)",
              }}>↗</a>
          </div>
        </div>
        <p className="leading-relaxed flex-1" style={{ color: "var(--text-secondary)", fontSize: "clamp(0.92rem, 1.2vw, 1.1rem)" }}>{p.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const off = useSectionOffset(2);
  const sectionO = useTransform(off, [-0.7, -0.2, 0, 0.4, 0.7], [0, 1, 1, 1, 0]);
  const headerX  = useTransform(off, [-0.5, 0, 0.5], [-80, 0, 50]);
  const headerO  = useTransform(off, [-0.5, -0.1, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);

  return (
    <motion.section style={{ opacity: sectionO }} className="absolute inset-0 overflow-y-auto">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div style={{ minHeight: "100%", display: "flex", alignItems: "center", padding: "5vh 2.5vw 2vh" }}>
      <div style={{ width: "100%", maxWidth: "99vw", margin: "0 auto" }} className="relative z-10">
        <motion.div style={{ x: headerX, opacity: headerO }} className="flex items-end justify-between mb-10 flex-wrap gap-3">
          <div>
            <div className="section-label mb-3" style={{ fontSize: "clamp(0.75rem, 1vw, 1rem)" }}>02 — Work</div>
            <h2 className="font-bold heading" style={{ fontSize: "clamp(3.5rem, 7vw, 10rem)" }}>
              <span style={{ color: "var(--text-primary)" }}>Selected </span>
              <span style={{ color: "var(--accent)" }}>projects</span>
            </h2>
          </div>
          <a href="https://github.com/Mandchouno" target="_blank" rel="noopener noreferrer"
            className="text-xs transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
            All on GitHub →
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} off={off} />)}
        </div>
      </div>
      </div>
    </motion.section>
  );
}
