import { KonamiCode } from "@/components/KonamiCode";
import { LiveClock } from "@/components/LiveClock";
import { MagneticButton } from "@/components/MagneticButton";
import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";
import { AsciiCanvas } from "./AsciiCanvas";
import { HeroDevMode } from "./HeroDevMode";

const meta = SECTIONS[0];

/**
 * Site Review Obs 01 — collapse the hero to a single monumental punch.
 * ASCII is demoted to a background watermark behind the type. Right column
 * removed. Pitch + CTAs sit beneath the type in a single ribbon. The keyboard
 * hint moves to the footer (Obs C).
 */
export function Hero() {
  return (
    <HeroDevMode>
      <section
        id={meta.anchor}
        aria-labelledby={`${meta.anchor}-label`}
        className="relative min-h-svh flex flex-col overflow-hidden"
      >
        <KonamiCode />

        {/* ASCII watermark — full-bleed behind the type */}
        <div
          aria-hidden="true"
          data-print-hide="true"
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 60% at 70% 55%, black, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 70% 55%, black, transparent 80%)",
          }}
        >
          <AsciiCanvas variant="watermark" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col px-6 pt-20 pb-12">
          {/* top metadata strip */}
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

          {/* monumental punch */}
          <div className="flex-1 flex items-center">
            <div className="max-w-[26ch]">
              <p className="label-mono text-ash mb-6">SECTION 000 · HERO</p>
              <h1
                className="font-sans font-black text-bone"
                style={{
                  fontSize: "clamp(4rem, 14vw, 12rem)",
                  letterSpacing: "-0.045em",
                  lineHeight: 0.88,
                }}
              >
                SHIP,
                <br />
                NOT
                <br />
                <span className="text-signal">SLIDEWARE.</span>
              </h1>
            </div>
          </div>

          {/* bottom ribbon — credit + CTAs */}
          <div className="border-t hairline pt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-end">
            <div className="mono-sm text-ash max-w-[58ch] leading-[1.55]">
              <span className="text-bone">Bilawal Ullah Sami</span> — final-year CS, Edge Hill.
              <br />
              Solo-shipped 3 production apps. Runs a profitable e-commerce business.
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <MagneticButton>
                <a
                  href="#section-002"
                  data-cursor="hover"
                  className="inline-flex items-center justify-center gap-2 border border-bone px-6 py-3 label-mono text-bone hover:bg-bone hover:text-ink transition-colors"
                >
                  <span>TRY IT</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </MagneticButton>
              <MagneticButton strength={0.45}>
                <a
                  href="#section-007"
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
