import { SectionLabel } from "@/components/SectionLabel";
import { MORE } from "@/lib/projects";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS.find((s) => s.id === "more")!;

/**
 * Site Review Obs 03 — More rendered as an editorial index, not a card grid.
 * Asymmetric row: id · status tick · name · desc · stack · arrow.
 * Sorted by recruiter relevance (LIVE first, IN DEV last). LIVE cards get
 * heavier name type so the eye walks down the page.
 */

const ORDER = ["LIVE", "CLIENT", "BETA", "BUSINESS", "ACADEMIC", "IN DEV"] as const;

const tickClass = (status: string) => {
  if (status === "LIVE") return "bg-signal border-signal text-ink";
  if (status === "BETA" || status === "CLIENT") return "bg-bone border-bone text-ink";
  return "text-ash";
};

const tickGlyph = (status: string) => {
  if (status === "LIVE") return "●";
  if (status === "BETA") return "○";
  if (status === "CLIENT") return "◆";
  if (status === "BUSINESS") return "◧";
  if (status === "ACADEMIC") return "△";
  return "·";
};

export function More() {
  const sorted = [...MORE].sort((a, b) => {
    const ai = Math.min(...a.statuses.map((s) => ORDER.indexOf(s as (typeof ORDER)[number])));
    const bi = Math.min(...b.statuses.map((s) => ORDER.indexOf(s as (typeof ORDER)[number])));
    return ai - bi;
  });

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
        <ol className="border-t hairline">
          {sorted.map((card) => {
            const primary = card.statuses[0];
            const live = card.statuses.includes("LIVE");
            return (
              <li
                key={card.id}
                className="grid items-baseline gap-4 sm:gap-6 border-b hairline py-5 px-1 transition-colors hover:bg-steel"
                style={{
                  gridTemplateColumns:
                    "minmax(64px,auto) minmax(28px,auto) minmax(0,1.6fr) minmax(0,1.4fr) minmax(0,0.9fr) minmax(20px,auto)",
                }}
              >
                <span className="label-mono text-ash">{card.id}</span>
                <span
                  className={`w-5 h-5 border hairline inline-flex items-center justify-center label-mono ${tickClass(primary)}`}
                  aria-hidden="true"
                >
                  {tickGlyph(primary)}
                </span>
                <span className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className={`font-sans font-bold text-bone ${live ? "text-2xl" : "text-xl"}`}
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {card.name}
                  </span>
                  <span className="label-mono text-ash">
                    {card.statuses.join(" · ")}
                  </span>
                </span>
                <span className="text-bone hidden md:block" style={{ fontSize: "0.9375rem", lineHeight: 1.45 }}>
                  {card.oneLiner}
                </span>
                <span className="mono-sm text-ash hidden lg:block">{card.stack}</span>
                <span aria-hidden="true" className="label-mono text-hairline text-right">
                  ↗
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-4 flex flex-wrap items-center gap-5 label-mono text-ash">
          <span className="inline-flex items-center gap-2">
            <i className="w-2.5 h-2.5 bg-signal" aria-hidden="true" /> LIVE
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="w-2.5 h-2.5 bg-bone" aria-hidden="true" /> BETA / CLIENT
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="w-2.5 h-2.5 border hairline" aria-hidden="true" /> ACADEMIC / IN DEV / BUSINESS
          </span>
          <span className="ml-auto text-hairline hidden md:inline">
            SORTED BY RECRUITER RELEVANCE — STATUS &gt; RECENCY
          </span>
        </div>
      </div>
    </section>
  );
}
