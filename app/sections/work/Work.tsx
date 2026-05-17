import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";
import { AriseCode } from "./AriseCode";
import { NoteSnap } from "./NoteSnap";
import { Tally } from "./Tally";

const meta = SECTIONS.find((s) => s.id === "work")!;

export function Work() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative pt-20"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>

      <div className="mt-16">
        <NoteSnap />
        <Tally />
        <AriseCode />
      </div>
    </section>
  );
}
