import { About } from "@/app/sections/about/About";
import { Contact } from "@/app/sections/contact/Contact";
import { CV } from "@/app/sections/cv/CV";
import { Hero } from "@/app/sections/hero/Hero";
import { More } from "@/app/sections/more/More";
import { Now } from "@/app/sections/now/Now";
import { TryIt } from "@/app/sections/tryit/TryIt";
import { Work } from "@/app/sections/work/Work";

/**
 * Single-page composition, redesign-branch order (Site Review):
 *   Hero → About (with timeline) → Try It (Tally demo) → Featured Work →
 *   More (editorial index) → Now (status board) → CV (inline) → Contact.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TryIt />
      <Work />
      <More />
      <Now />
      <CV />
      <Contact />
    </main>
  );
}
