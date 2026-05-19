import { SectionLabel } from "@/components/SectionLabel";
import { StatusBadge } from "@/components/StatusBadge";
import { MORE } from "@/lib/projects";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS.find((s) => s.id === "more")!;

export function More() {
  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative px-6 pt-20 pb-28"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>

      <div className="mx-auto max-w-[1600px] mt-20">
        <ul
          className="grid gap-px bg-hairline border hairline"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(360px, 100%), 1fr))" }}
        >
          {MORE.map((card) => (
            <li key={card.id} className="bg-ink">
              <article className="group relative h-full p-6 flex flex-col gap-4">
                <header className="flex items-start justify-between gap-4">
                  <span className="label-mono text-ash">{card.id}</span>
                  <StatusBadge statuses={card.statuses} />
                </header>
                <h3
                  className="font-sans font-bold text-bone"
                  style={{ fontSize: "1.75rem", letterSpacing: "-0.02em", lineHeight: 1.05 }}
                >
                  {card.name}
                </h3>
                <p className="text-bone" style={{ fontSize: "0.9375rem", lineHeight: 1.5 }}>
                  {card.oneLiner}
                </p>
                <p className="mono-sm text-ash mt-auto">{card.stack}</p>
                {card.note && (
                  <p className="label-mono text-hairline">{card.note}</p>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
