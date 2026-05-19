import { SectionLabel } from "@/components/SectionLabel";
import { NOW_BOARD, type NowState } from "@/lib/now";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS.find((s) => s.id === "now")!;

const stateClass: Record<NowState, string> = {
  LIVE: "text-signal",
  SHIPPED: "text-signal",
  BETA: "text-bone",
  DRAFT: "text-ash",
  RUNNING: "text-bone",
};

/**
 * Site Review Obs 07 — status board, not bullet list.
 * Columns: ID · WHAT · STATE · SINCE · DELTA. Mono throughout.
 */
export function Now() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative px-6 pt-20 pb-28"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>

      <div className="mx-auto max-w-[1400px] mt-20">
        <div className="border hairline bg-steel">
          <div className="px-5 py-3 border-b hairline flex items-center justify-between">
            <p className="label-mono text-signal flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2 w-2 bg-signal inline-block"
                style={{ animation: "pulseDot 1.5s ease-in-out infinite" }}
              />
              STATUS BOARD · LIVE
            </p>
            <p className="label-mono text-hairline">UPDATED 19 MAY 2026</p>
          </div>

          <div
            className="hidden md:grid label-mono text-ash gap-4 px-5 py-3 border-b hairline"
            style={{ gridTemplateColumns: "60px 1.6fr 1fr 1fr 110px" }}
          >
            <span>ID</span>
            <span>WHAT</span>
            <span>STATE</span>
            <span>SINCE</span>
            <span className="text-right">DELTA</span>
          </div>

          <ul>
            {NOW_BOARD.map((row) => (
              <li
                key={row.id}
                className="grid items-baseline gap-4 px-5 py-4 border-b hairline last:border-b-0"
                style={{ gridTemplateColumns: "60px 1fr" }}
              >
                <span className="label-mono text-ash self-baseline">{row.id}</span>
                <div
                  className="grid items-baseline gap-3 md:gap-4"
                  style={{ gridTemplateColumns: "1fr" }}
                >
                  <div
                    className="grid items-baseline gap-3 md:gap-4 md:grid-cols-[1.6fr_1fr_1fr_110px]"
                  >
                    <p
                      className="font-sans text-bone"
                      style={{ fontSize: "1rem", lineHeight: 1.35 }}
                    >
                      {row.what}
                    </p>
                    <p className={`label-mono ${stateClass[row.state]}`}>
                      {row.state}
                      {row.stateNote && (
                        <span className="text-ash"> · {row.stateNote}</span>
                      )}
                    </p>
                    <p className="label-mono text-ash">{row.since}</p>
                    <p className="label-mono text-ash md:text-right tabular-nums">
                      {row.delta}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="px-5 py-3 label-mono text-hairline border-t hairline">
            AUTO FROM <span className="text-ash">/lib/now.ts</span> MTIME · NO ANALYTICS, NO TRACKING
          </p>
        </div>
      </div>
    </section>
  );
}
