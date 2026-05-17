import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS.find((s) => s.id === "work")!;

export function Work() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative min-h-svh px-6 pt-20 pb-24"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>
      <div className="mt-16">
        <p className="text-ash mono-sm">[ FEATURED WORK — phase 3 fills this ]</p>
      </div>
    </section>
  );
}
