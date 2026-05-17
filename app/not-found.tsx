import Link from "next/link";

export const metadata = {
  title: "404 — Resource not indexed",
};

export default function NotFound() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center px-6 py-20 text-center">
      <p className="label-mono text-blood mb-8">
        STATUS · 404 · RESOURCE NOT INDEXED
      </p>
      <h1
        className="font-sans font-black text-bone"
        style={{
          fontSize: "clamp(5rem, 18vw, 18rem)",
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
        }}
      >
        4<span className="text-signal">0</span>4
      </h1>
      <p
        className="mt-6 text-ash max-w-xl"
        style={{ fontSize: "1.125rem", lineHeight: 1.55 }}
      >
        Nothing here. Either the path's wrong or the file's been refactored out of
        existence. The index is still warm.
      </p>
      <Link
        href="/"
        data-cursor="hover"
        className="mt-10 inline-flex items-center gap-2 bg-signal text-ink px-6 py-3 label-mono hover:bg-signal-dim transition-colors"
      >
        <span aria-hidden="true">←</span>
        <span>BACK TO INDEX</span>
      </Link>
    </main>
  );
}
