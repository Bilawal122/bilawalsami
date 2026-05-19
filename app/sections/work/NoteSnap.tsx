import { StatusBadge } from "@/components/StatusBadge";
import { FEATURED } from "@/lib/projects";

const p = FEATURED.find((x) => x.id === "notesnap")!;

export function NoteSnap() {
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
        <div className="grid grid-cols-3 gap-px bg-hairline border hairline">
          <Stat label="DISSERTATION" value="108pp" sub="predicted first" />
          <Stat label="SOURCES" value="6" sub="PDF · DOCX · YT · URL · camera · PPTX" />
          <Stat label="AI TOOLS" value="6" sub="flashcards · quizzes · tutor · SM-2" />
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

        <div className="border-t hairline pt-6">
          <p className="label-mono text-ash mb-3">RESEARCH ANGLE</p>
          <p className="text-bone" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
            Users rated AI-generated study schedules as <em>more confident</em> than human-made ones — but
            their actual recall didn't improve. That trust-calibration gap is what's pushing the next
            year of work toward XAI: how do we make AI in education{" "}
            <em>visibly</em> trustworthy, not just persuasive.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="label-mono border border-bone px-5 py-3 text-bone hover:bg-bone hover:text-ink transition-colors"
            >
              LIVE SITE ↗
            </a>
          )}
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="label-mono border hairline px-5 py-3 text-bone hover:border-signal hover:text-signal transition-colors"
            >
              GITHUB ↗
            </a>
          )}
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
        style={{ fontSize: "2rem", letterSpacing: "-0.02em", lineHeight: 1 }}
      >
        {value}
      </p>
      <p className="label-mono text-ash">{sub}</p>
    </div>
  );
}
