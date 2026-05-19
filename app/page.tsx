import { About } from "@/app/sections/about/About";
import { Contact } from "@/app/sections/contact/Contact";
import { CV } from "@/app/sections/cv/CV";
import { Hero } from "@/app/sections/hero/Hero";
import { Log } from "@/app/sections/log/Log";
import { More } from "@/app/sections/more/More";
import { TryIt } from "@/app/sections/tryit/TryIt";
import { Work } from "@/app/sections/work/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TryIt />
      <Work />
      <More />
      <Log />
      <CV />
      <Contact />
    </main>
  );
}
