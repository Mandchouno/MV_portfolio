"use client";

import ScrollDriven from "./ScrollDriven";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";

export default function Portfolio() {
  return (
    <ScrollDriven>
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </ScrollDriven>
  );
}
