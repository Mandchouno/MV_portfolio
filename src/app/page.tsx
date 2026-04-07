"use client";

import dynamic from "next/dynamic";

// The entire portfolio is client-only (scroll-driven animations require browser APIs)
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: false });

export default function Home() {
  return <Portfolio />;
}
