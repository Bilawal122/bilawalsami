import { About } from "@/app/sections/about/About";
import { Contact } from "@/app/sections/contact/Contact";
import { Hero } from "@/app/sections/hero/Hero";
import { More } from "@/app/sections/more/More";
import { Work } from "@/app/sections/work/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <More />
      <Contact />
    </main>
  );
}
