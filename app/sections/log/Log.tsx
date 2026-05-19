import { SectionLabel } from "@/components/SectionLabel";
import { CHANGELOG } from "@/lib/changelog";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS.find((s) => s.id === "log")!;

/**
 * Personal changelog. Same idea as a software changelog, but the product
 * is me. Each entry is a real thing that happened, dated.
 */
export function Log() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative px-6 pt-20 pb-28"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>

      <div className="mx-auto max-w-[900px] mt-20">
        <header className="mb-10">
          <h2
            className="font-sans font-bold text-bone"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            Recently shipped.
          </h2>
          <p className="mt-3 text-ash mono-sm">
            Things I&apos;ve actually done. Newest at the top.
          </p>
        </header>

        <ol className="border-l hairline pl-6 space-y-10">
          {CHANGELOG.map((entry) => (
            <li key={entry.version} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1.5 h-2 w-2 bg-signal"
              />
              <p className="label-mono text-signal">
                {entry.version}
                <span className="text-hairline mx-2">·</span>
                <span className="text-ash">{entry.date}</span>
              </p>
              <p
                className="text-bone mt-2"
                style={{ fontSize: "1.0625rem", lineHeight: 1.55 }}
              >
                {entry.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
