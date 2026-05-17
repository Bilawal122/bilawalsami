"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AssetSlot } from "@/components/AssetSlot";
import { REELS } from "@/lib/assets";

const PROMPTS = [
  { id: 0, text: "A bold portfolio for a typographer", reel: REELS.arisecode1 },
  { id: 1, text: "A minimal landing page for a sleep app", reel: REELS.arisecode2 },
  { id: 2, text: "A brutalist agency site with a manifesto", reel: REELS.arisecode3 },
];

const TYPE_MS = 28;

export function AriseCodeDemo() {
  const [active, setActive] = useState<number>(0);
  const [typedPrompt, setTypedPrompt] = useState<string>("");
  const [running, setRunning] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  const runPrompt = useCallback(
    (idx: number) => {
      setActive(idx);
      setRunning(true);
      const full = PROMPTS[idx].text;
      setTypedPrompt("");
      if (reduced) {
        setTypedPrompt(full);
        return;
      }
      let i = 0;
      const id = setInterval(() => {
        i += 1;
        setTypedPrompt(full.slice(0, i));
        if (i >= full.length) clearInterval(id);
      }, TYPE_MS);
    },
    [reduced],
  );

  useEffect(() => {
    if (!running) return;
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {
      /* autoplay blocked — user can click play */
    });
  }, [running, active]);

  const reel = PROMPTS[active].reel;

  return (
    <div className="flex flex-col gap-4">
      <div className="border hairline bg-steel">
        <div className="px-4 py-3 border-b hairline flex items-center justify-between">
          <p className="label-mono text-signal">EMBEDDED DEMO · ARISECODE PROMPT → SITE</p>
          <p className="label-mono text-hairline">PRE-RECORDED PLAYBACK</p>
        </div>

        {/* mock prompt strip */}
        <div className="px-4 py-3 border-b hairline flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="label-mono text-hairline shrink-0">PROMPT →</span>
          <p
            className="flex-1 mono-sm text-bone min-h-[1.5em]"
            aria-live="polite"
          >
            {typedPrompt}
            <span className="inline-block w-[0.5ch] -mb-0.5 ml-0.5 bg-signal align-baseline" style={{ animation: "pulseDot 1s steps(2) infinite" }} />
          </p>
        </div>

        {/* video panel */}
        <div className="relative bg-ink">
          {reel.status === "pending" ? (
            <AssetSlot spec={reel.spec} aspect={reel.aspect} label="DEMO PLAYBACK PENDING" />
          ) : (
            <video
              ref={videoRef}
              className="block w-full h-auto"
              style={{ aspectRatio: reel.aspect ?? "16 / 9" }}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-label={reel.label}
            >
              {reel.srcWebm && <source src={reel.srcWebm} type="video/webm" />}
              <source src={reel.src} type="video/mp4" />
            </video>
          )}
        </div>

        {/* chips */}
        <div className="px-4 py-3 border-t hairline flex flex-wrap gap-2">
          <span className="label-mono text-hairline self-center">TRY A PROMPT:</span>
          {PROMPTS.map((p, i) => {
            const isActive = active === i && running;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => runPrompt(i)}
                data-cursor="hover"
                className={`label-mono border px-3 py-1.5 transition-colors ${
                  isActive
                    ? "border-signal text-signal"
                    : "hairline text-ash hover:text-bone hover:border-bone"
                }`}
              >
                {p.text}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {running && (
          <motion.p
            key="caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="label-mono text-hairline"
          >
            DEMO PLAYBACK · OPEN THE LIVE APP TO RUN YOUR OWN PROMPT ↗
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
