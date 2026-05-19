import { StatusBadge } from "@/components/StatusBadge";
import { FEATURED } from "@/lib/projects";

const p = FEATURED.find((x) => x.id === "tally")!;

/**
 * Tally chapter in Featured Work. The interactive demo has been hoisted to
 * the TRY IT section above; this chapter is now the narrative + context.
 */
export function Tally() {
  return (
    <article
      id={`work-${p.id}`}
      className="relative grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 px-6 py-16 section-rule"
    >
      <header className="lg:sticky lg:top-24 lg:self-start flex flex-col gap-4">
        <p className="label-mono text-ash">
          <span className="text-bone">WORK</span> {p.index}
          <span className="mx-2 text-hairline">/</span>
          {p.total}
        </p>
        <h3
          className="font-sans font-black text-bone"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
        >
          {p.name}
        </h3>
        <p
          className="text-bone"
          style={{ fontSize: "1.125rem", lineHeight: 1.5 }}
        >
          {p.oneLiner}
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          {p.stack.map((s) => (
            <span key={s} className="label-mono border hairline px-3 py-1.5 text-bone">
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-2">
          <span className="label-mono text-ash">{p.role.toUpperCase()}</span>
          <StatusBadge statuses={p.statuses} />
        </div>
      </header>

      <div className="flex flex-col gap-10">
        <a
          href="#section-002"
          data-cursor="hover"
          className="block border hairline bg-steel p-5 hover:border-signal transition-colors"
        >
          <p className="label-mono text-signal mb-2">↑ DEMO MOVED · TRY IT 001/001</p>
          <p className="text-bone" style={{ fontSize: "1rem", lineHeight: 1.5 }}>
            The inline macro estimator was hoisted out of this chapter so a recruiter touches it first. The full chapter context lives below.
          </p>
        </a>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-hairline border hairline">
          <Stat label="PARSE" value="<800ms" sub="p50 stub mode" />
          <Stat label="LIMIT" value="5/MIN" sub="upstash sliding window" />
          <Stat label="PAYWALL" value="REVENUECAT" sub="onboarding + entitlements" />
          <Stat label="LIVE" value="APP STORE" sub="released 2024" />
        </div>

        <div>
          <p className="label-mono text-ash mb-4">WHAT I BUILT</p>
          <ul className="space-y-3">
            {p.what.map((line, i) => (
              <li
                key={i}
                className="flex gap-3 text-bone"
                style={{ fontSize: "1rem", lineHeight: 1.55 }}
              >
                <span className="text-signal select-none mt-1" aria-hidden="true">→</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-ink p-5 flex flex-col gap-1">
      <p className="label-mono text-hairline">{label}</p>
      <p
        className="font-sans font-bold text-bone tabular-nums"
        style={{ fontSize: "1.25rem", letterSpacing: "-0.02em", lineHeight: 1 }}
      >
        {value}
      </p>
      <p className="label-mono text-ash">{sub}</p>
    </div>
  );
}
