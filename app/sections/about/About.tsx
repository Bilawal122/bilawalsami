import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS.find((s) => s.id === "about")!;

export function About() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative min-h-[60svh] px-6 pt-20 pb-24"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>
      <div className="mt-16">
        <p className="text-ash mono-sm">[ ABOUT — phase 2 fills this ]</p>
      </div>
    </section>
  );
}
