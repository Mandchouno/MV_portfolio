"use client";

import { motion, useTransform } from "framer-motion";
import { useSectionOffset } from "./ScrollDriven";

const skills = [
  { category: "Languages",     items: ["Python", "Java", "JavaScript", "TypeScript", "HTML/CSS"] },
  { category: "ML / AI",       items: ["Scikit-learn", "TensorFlow", "PyTorch", "XGBoost", "LangChain"] },
  { category: "AI Automation", items: ["n8n", "Make", "Retell AI", "ElevenLabs", "RAG", "LLMs"] },
  { category: "Data",          items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly"] },
  { category: "Tools",         items: ["Git", "Docker", "Figma", "MLflow", "R", "MATLAB"] },
];

const stats = [
  { value: "3+", label: "Years in Data Science" },
  { value: "5+", label: "ML & AI projects" },
  { value: "3",  label: "Languages spoken" },
  { value: "18y",label: "Living abroad" },
];

const card: React.CSSProperties = {
  background: "var(--bg-card)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid var(--border)",
  borderRadius: "1.5rem",
};

export default function About() {
  const off = useSectionOffset(1);

  const sectionO = useTransform(off, [-0.6, -0.2, 0, 0.4, 0.7], [0, 1, 1, 1, 0]);
  const labelX   = useTransform(off, [-0.5, 0, 0.5], [-60, 0, 40]);
  const labelO   = useTransform(off, [-0.5, -0.15, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);
  const titleX   = useTransform(off, [-0.5, 0, 0.5], [-100, 0, 60]);
  const titleO   = useTransform(off, [-0.5, -0.1, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);
  const bioX     = useTransform(off, [-0.55, 0, 0.5], [-80, 0, 50]);
  const bioO     = useTransform(off, [-0.55, -0.15, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);
  const statsY   = useTransform(off, [-0.6, 0, 0.5], [40, 0, -25]);
  const statsO   = useTransform(off, [-0.6, -0.2, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);
  const skillsX  = useTransform(off, [-0.5, 0, 0.5], [100, 0, -60]);
  const skillsO  = useTransform(off, [-0.5, -0.1, 0, 0.4, 0.65], [0, 1, 1, 1, 0]);

  return (
    <motion.section
      style={{
        opacity: sectionO,
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "5vh 2.5vw 2vh",
        overflowY: "auto",
      }}
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div style={{ width: "100%", maxWidth: "99vw", position: "relative", zIndex: 1 }}>

        {/* Label */}
        <motion.div style={{ x: labelX, opacity: labelO }} className="mb-6">
          <span className="section-label" style={{ fontSize: "clamp(0.75rem, 1vw, 1rem)" }}>01 — About</span>
        </motion.div>

        {/* 2-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4vw", alignItems: "start" }}>

          {/* Left */}
          <div>
            <motion.h2 style={{ x: titleX, opacity: titleO }} className="heading">
              <span style={{
                display: "block",
                color: "var(--text-primary)",
                fontSize: "clamp(3.5rem, 7vw, 10rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: "2rem",
              }}>
                Turning complexity<br />into{" "}
                <span style={{ color: "var(--accent)" }}>clarity</span>.
              </span>
            </motion.h2>

            <motion.div style={{ x: bioX, opacity: bioO }}>
              {[
                "Data Science student at Université de Montréal, passionate about ML, AI automation, and data-driven problem solving.",
                <span key="neotix">Co-founder of <span style={{ color: "var(--accent)", fontWeight: 500 }}>Neotix AI</span> — building intelligent automation pipelines and conversational AI agents using LLMs and RAG.</span>,
                "Originally from Panama, trilingual (French, Spanish, English), fuelled by curiosity.",
              ].map((text, i) => (
                <p key={i} style={{
                  color: "var(--text-secondary)",
                  fontSize: "clamp(1.1rem, 1.8vw, 2rem)",
                  lineHeight: 1.8,
                  marginBottom: "1.1rem",
                }}>{text}</p>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div style={{ y: statsY, opacity: statsO, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginTop: "2rem" }}>
              {stats.map(s => (
                <div key={s.label} style={{ ...card, padding: "1.2rem 0.75rem", textAlign: "center" }}>
                  <div style={{ color: "var(--accent)", fontSize: "clamp(2rem, 3.5vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>{s.value}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "clamp(0.85rem, 1.1vw, 1.2rem)", marginTop: "0.4rem", lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — skills card */}
          <motion.div style={{ x: skillsX, opacity: skillsO, ...card, padding: "clamp(1.5rem, 3vw, 3.5rem)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              {skills.map(group => (
                <div key={group.category}>
                  <div style={{
                    color: "var(--accent)",
                    fontSize: "clamp(0.75rem, 1vw, 1.1rem)",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: "0.6rem",
                  }}>
                    {group.category}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {group.items.map(tag => (
                      <span key={tag} style={{
                        fontSize: "clamp(0.9rem, 1.2vw, 1.3rem)",
                        padding: "0.35rem 1rem",
                        borderRadius: "9999px",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                        background: "var(--surface-subtle)",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
