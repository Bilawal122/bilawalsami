"use client";

import { useEffect, useState } from "react";

/**
 * Subscribes to `prefers-reduced-motion`. Returns true on the server during SSR
 * to make reduced-motion the safe default — animated paths must always check this
 * before starting timers, raf loops, or motion()s.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
