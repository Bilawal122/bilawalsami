import { KonamiCode } from "@/components/KonamiCode";
import { LiveClock } from "@/components/LiveClock";
import { MagneticButton } from "@/components/MagneticButton";
import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";
import { AsciiCanvas } from "./AsciiCanvas";
import { BilawalPronunciation } from "./BilawalPronunciation";
import { HeroDevMode } from "./HeroDevMode";
import { HeroPunchLine } from "./HeroPunchLine";

const meta = SECTIONS[0];

export function Hero() {
  return (
    <HeroDevMode>
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="relative min-h-svh px-6 pt-20 pb-12 flex flex-col"
    >
      <KonamiCode />
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
            <BilawalPronunciation /> Ullah Sami
          </p>
          <HeroPunchLine />
          <p className="label-mono text-hairline mt-6">
            TIP — TYPE YOUR NAME · TRY <kbd className="text-bone border hairline px-1.5 py-0.5">⌘K</kbd> · ↑↑↓↓←→←→BA
          </p>
        </div>

        {/* right column — canvas + pitch + CTAs */}
        <div className="flex flex-col gap-8">
          <AsciiCanvas />

          <p
            className="text-bone"
            style={{ fontSize: "1.125rem", lineHeight: 1.55 }}
          >
            Final-year CS at Edge Hill (predicted First).
            <br />
            Solo-shipped 3 production apps and run a profitable
            <br />
            e-commerce business on the side.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <MagneticButton>
              <a
                href="#section-002"
                data-cursor="hover"
                className="inline-flex items-center justify-center gap-2 border border-bone px-6 py-3 label-mono text-bone hover:bg-bone hover:text-ink transition-colors"
              >
                <span>SEE THE WORK</span>
                <span aria-hidden="true">↓</span>
              </a>
            </MagneticButton>
            <MagneticButton strength={0.45}>
              <a
                href="#section-005"
                data-cursor="hover"
                className="inline-flex items-center justify-center gap-2 bg-signal text-ink px-6 py-3 label-mono hover:bg-signal-dim transition-colors"
              >
                <span>HIRE ME</span>
                <span aria-hidden="true">→</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
    </HeroDevMode>
  );
}
