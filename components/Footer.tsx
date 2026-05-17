/**
 * PRD §4.7 — single mono line, centred, ash colour, with a pulsing signal dot.
 * Privacy line sits beneath (elevation §6 — privacy as a feature for this audience).
 */
export function Footer() {
  return (
    <footer className="section-rule px-6 py-10">
      <div className="mx-auto max-w-[1600px] flex flex-col items-center gap-3 text-center">
        <p className="label-mono text-ash flex items-center gap-2">
          <span>BUILT BY BILAWAL, IN MANCHESTER, WITH NEXT.JS AND A LOT OF LENIS.</span>
          <span className="mx-1">© 2026</span>
          <span
            className="inline-block h-1.5 w-1.5 bg-signal"
            style={{ animation: "pulseDot 1.5s ease-in-out infinite" }}
            aria-hidden="true"
          />
        </p>
        <p className="label-mono text-hairline">
          NO ANALYTICS · NO COOKIES · NO TRACKING
        </p>
      </div>
    </footer>
  );
}
