import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";
import { TallyDemo } from "@/app/sections/work/TallyDemo";

const meta = SECTIONS.find((s) => s.id === "tryit")!;

export function TryIt() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative px-6 pt-20 pb-28"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>

      <div className="mx-auto max-w-[1200px] mt-20 flex flex-col gap-8">
        <div>
          <p className="label-mono text-ash">TRY IT · TALLY · LIVE</p>
          <h2
            className="font-sans font-bold text-bone mt-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.02 }}
          >
            Type what you ate. Get the macros.
          </h2>
          <p
            className="text-ash mt-4 max-w-[60ch]"
            style={{ fontSize: "1rem", lineHeight: 1.55 }}
          >
            Same parser as Tally on the App Store. Up to 200 characters, five goes a minute. No signup. There&apos;s more about the build in Work below.
          </p>
        </div>

        <TallyDemo />
      </div>
    </section>
  );
}
