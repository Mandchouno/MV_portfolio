"use client";

import ScrollDriven from "./ScrollDriven";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import BrainTransition from "./BrainTransition";

export default function Portfolio() {
  return (
    <ScrollDriven>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <BrainTransition />
    </ScrollDriven>
  );
}
