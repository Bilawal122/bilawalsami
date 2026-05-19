/**
 * Site Review note C — easter-egg discoverability moved from hero to footer.
 * Footer keeps the "dev's dev" signal without diluting the hero's one punch.
 */
export function Footer() {
  return (
    <footer className="section-rule px-6 py-10">
      <div className="mx-auto max-w-[1600px] flex flex-col items-center gap-4 text-center">
        <p className="label-mono text-ash flex items-center gap-2">
          <span>BUILT BY BILAWAL, IN MANCHESTER, WITH NEXT.JS AND A LOT OF LENIS.</span>
          <span className="mx-1">© 2026</span>
          <span
            className="inline-block h-1.5 w-1.5 bg-signal"
            style={{ animation: "pulseDot 1.5s ease-in-out infinite" }}
            aria-hidden="true"
          />
        </p>
        <p className="label-mono text-hairline flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>EASTER EGGS</span>
          <span className="text-ash">·</span>
          <span>TYPE YOUR NAME</span>
          <span className="text-ash">·</span>
          <kbd className="border hairline px-2 py-0.5 text-ash">⌘K</kbd>
          <span className="text-ash">·</span>
          <span>↑↑↓↓←→←→BA</span>
        </p>
        <p className="label-mono text-hairline">
          NO ANALYTICS · NO COOKIES · NO TRACKING
        </p>
      </div>
    </footer>
  );
}
