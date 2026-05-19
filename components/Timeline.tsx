import { TIMELINE, TIMELINE_NOW_MARKER, TIMELINE_YEARS } from "@/lib/timeline";

/**
 * Career rail (Site Review Obs 04).
 * Horizontal 6-column grid 2021→2026, milestones beneath, three signal-coloured
 * key moments. Story told in five seconds without removing the prose below.
 */
export function Timeline() {
  return (
    <div className="border hairline bg-steel">
      <div className="px-5 sm:px-7 pt-6 pb-2 flex items-baseline justify-between gap-4">
        <p className="label-mono text-ash">EST. 2003 → NOW</p>
        <p className="label-mono text-hairline hidden sm:block">1 LINE · 6 MILESTONES</p>
      </div>

      <div className="px-5 sm:px-7 pb-6">
        <div className="grid grid-cols-3 lg:grid-cols-6">
          {TIMELINE_YEARS.map((y) => (
            <div key={y} className="label-mono text-ash">
              {y}
            </div>
          ))}
        </div>

        <div className="my-3 h-px bg-hairline" />

        <div className="grid grid-cols-3 lg:grid-cols-6 mt-2">
          {TIMELINE.map((ev, i) => (
            <div
              key={i}
              className={`border-l hairline pl-2 pt-2 min-h-[96px] ${i === 0 ? "border-l-0" : ""} ${
                ev.signal ? "text-signal" : "text-bone"
              }`}
            >
              <p
                className={`label-mono mb-1 ${ev.signal ? "text-signal" : "text-ash"}`}
              >
                {ev.when}
              </p>
              <p className="text-[0.8125rem] leading-snug pr-3">{ev.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 relative pl-4 label-mono text-signal">
          <span
            aria-hidden="true"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 bg-signal"
            style={{ animation: "pulseDot 1.5s ease-in-out infinite" }}
          />
          {TIMELINE_NOW_MARKER}
        </p>
      </div>
    </div>
  );
}
