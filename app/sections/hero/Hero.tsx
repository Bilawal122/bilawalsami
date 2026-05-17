import { LiveClock } from "@/components/LiveClock";
import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";
import { HeroPunchLine } from "./HeroPunchLine";

const meta = SECTIONS[0];

export function Hero() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="relative min-h-svh px-6 pt-20 pb-12 flex flex-col"
    >
      {/* top metadata strip — PRD §4.1 */}
      <div className="mt-2 flex items-start justify-between gap-6">
        <p id={`${meta.anchor}-label`} className="label-mono text-ash">
          <span>BILAWAL ULLAH SAMI</span>
          <span className="mx-2 text-hairline">/</span>
          <span>EST. 2003</span>
          <span className="mx-2 text-hairline">/</span>
          <span>MANCHESTER, UK</span>
        </p>
        <p className="label-mono text-ash tabular-nums">
          <LiveClock />
        </p>
      </div>

      {/* middle — the punch */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end pt-16 lg:pt-24">
        <div>
          <p
            className="font-sans text-ash"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)", letterSpacing: "-0.02em" }}
          >
            <span
              data-cursor="hover"
              data-bilawal-audio="true"
              className="cursor-pointer underline-offset-[6px] decoration-hairline hover:decoration-signal hover:text-bone transition-colors"
              title="Click for pronunciation (audio coming in phase 5)"
            >
              Bilawal
            </span>{" "}
            Ullah Sami
          </p>
          <HeroPunchLine />
        </div>

        {/* right column — canvas slot + pitch + CTAs */}
        <div className="flex flex-col gap-8">
          {/* canvas slot — filled in phase 5 */}
          <div
            className="relative h-48 sm:h-64 border hairline overflow-hidden"
            aria-hidden="true"
            data-print-hide="true"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="label-mono text-hairline">
                ASCII CANVAS — RENDERED IN PHASE 005
              </p>
            </div>
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, var(--color-hairline) 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, var(--color-hairline) 0 1px, transparent 1px 4px)",
              }}
            />
          </div>

          <p
            className="text-bone"
            style={{ fontSize: "1.125rem", lineHeight: 1.55 }}
          >
            Final-year CS at Edge Hill (predicted First).
            <br />
            Solo-shipped 3 AI products and run a profitable
            <br />
            e-commerce business on the side.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#section-002"
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 border border-bone px-6 py-3 label-mono text-bone hover:bg-bone hover:text-ink transition-colors"
            >
              <span>SEE THE WORK</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href="#section-005"
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 bg-signal text-ink px-6 py-3 label-mono hover:bg-signal-dim transition-colors"
            >
              <span>HIRE ME</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
