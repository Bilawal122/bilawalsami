import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";
import { TallyDemo } from "@/app/sections/work/TallyDemo";

const meta = SECTIONS.find((s) => s.id === "tryit")!;

/**
 * Site Review Obs 02 — Tally hoisted out of WORK 002/003 into a TRY IT
 * section right after About. Recruiter touches the product before they
 * read the chapter.
 */
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
          <p className="label-mono text-ash">TRY IT 001/001 · TALLY · LIVE</p>
          <h2
            className="font-sans font-bold text-bone mt-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.02 }}
          >
            Type a meal. Get the macros.
          </h2>
          <p
            className="text-ash mt-4 max-w-[60ch]"
            style={{ fontSize: "1rem", lineHeight: 1.55 }}
          >
            The same parser that powers Tally on the App Store, embedded inline. 200 chars, 5 requests per minute per IP, no signup. Full chapter with what-I-built bullets lives in WORK 002/003 below.
          </p>
        </div>

        <TallyDemo />
      </div>
    </section>
  );
}
