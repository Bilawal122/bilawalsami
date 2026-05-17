/**
 * Single-page composition. Each section is its own component under app/sections/*.
 * Phase 0 ships a placeholder; phases 1–6 fill in the real sections.
 */
export default function Home() {
  return (
    <main id="section-000" className="min-h-svh flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl">
          <p className="label-mono text-ash mb-6">PHASE 000 / 007 — SCAFFOLD</p>
          <h1
            className="font-sans font-black tracking-tight text-bone leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            bilawalsami<span className="text-signal">.</span>
          </h1>
          <p className="mt-6 text-ash mono-sm">
            Theme tokens live in <code className="text-bone">app/globals.css</code>. Phase 1
            wires the nav, footer, cursor and grain overlay.
          </p>
        </div>
      </div>
      <footer className="border-t hairline px-6 py-4 label-mono text-ash">
        © 2026 · BUILT IN MANCHESTER
      </footer>
    </main>
  );
}
