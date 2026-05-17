import { About } from "@/app/sections/about/About";
import { Contact } from "@/app/sections/contact/Contact";
import { Hero } from "@/app/sections/hero/Hero";
import { More } from "@/app/sections/more/More";
import { Now } from "@/app/sections/now/Now";
import { Work } from "@/app/sections/work/Work";

/**
 * Single-page composition (PRD §3).
 * Sections render in scroll order; each owns its own SectionLabel and styling.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <More />
      <Now />
      <Contact />
    </main>
  );
}
