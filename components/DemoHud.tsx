"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Hacker-dashboard HUD that pins to bottom-right while the user is inside the
 * Tally chapter. Listens for a "bilawalsami:tally-quota" custom event emitted
 * by TallyDemo whenever a request completes — shows remaining requests + limit.
 */
export function DemoHud() {
  const [visible, setVisible] = useState(false);
  const [quota, setQuota] = useState<{ remaining: number; limit: number } | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const tally = document.getElementById("work-tally");
    if (!tally) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(tally);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onQuota = (e: Event) => {
      const detail = (e as CustomEvent<{ remaining: number; limit: number }>).detail;
      if (detail) setQuota(detail);
    };
    window.addEventListener("bilawalsami:tally-quota", onQuota);
    return () => window.removeEventListener("bilawalsami:tally-quota", onQuota);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
          className="fixed bottom-6 right-6 z-40 border hairline bg-ink/90 backdrop-blur-md px-4 py-3 max-w-[280px] hidden md:block"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="block h-2 w-2 bg-signal" style={{ animation: "pulseDot 1.5s ease-in-out infinite" }} />
            <p className="label-mono text-signal">DEMO ACTIVE</p>
          </div>
          <p className="mono-sm text-bone">
            {quota
              ? `${quota.remaining}/${quota.limit} requests left this minute`
              : "Type into the Tally input and hit Enter."}
          </p>
          <p className="label-mono text-hairline mt-2">SECTION 002 · WORK · TALLY</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
