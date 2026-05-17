import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS[0];

export function Hero() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="relative min-h-svh px-6 pt-24 pb-12 flex flex-col"
    >
      <div className="absolute left-6 top-20" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>
      <div className="flex-1 flex items-center">
        <p className="text-ash mono-sm">[ HERO — phase 2 fills this ]</p>
      </div>
    </section>
  );
}
