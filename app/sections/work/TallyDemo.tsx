/**
 * Phase 4 will replace this with the real Gemini-powered interactive demo.
 * The slot already exists in the layout so the carousel/bullets above don't
 * shift when the live UI lands.
 */
export function TallyDemo() {
  return (
    <div className="border hairline bg-steel p-6 flex flex-col gap-4">
      <p className="label-mono text-signal">LIVE DEMO · WIRED IN PHASE 004</p>
      <p className="text-bone" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
        An inline input here will let you type{" "}
        <span className="mono-sm text-ash">"two slices of toast and a coffee"</span>{" "}
        and get a streamed macro breakdown back from Gemini Flash. Rate-limited
        to 5 / min per IP via Upstash.
      </p>
      <p className="label-mono text-hairline">POWERED BY GEMINI · NO ACCOUNT REQUIRED</p>
    </div>
  );
}
