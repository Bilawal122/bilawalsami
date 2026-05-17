"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface LenisContextValue {
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number }) => void;
}

const LenisContext = createContext<LenisContextValue>({
  scrollTo: (target) => {
    if (typeof window === "undefined") return;
    if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  },
});

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const start = () => {
      const lenis = new Lenis({
        // shorter duration + lighter wheel multiplier feels snappier and
        // reduces the rAF work-per-frame
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        autoRaf: true,
      });
      lenisRef.current = lenis;
      return () => {
        lenis.destroy();
        lenisRef.current = null;
      };
    };

    let teardown: (() => void) | undefined;
    const ric =
      "requestIdleCallback" in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 600 })
        : (cb: () => void) => window.setTimeout(cb, 200);
    const handle = ric(() => {
      teardown = start();
    });

    return () => {
      if ("cancelIdleCallback" in window && typeof handle === "number") {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle as unknown as number);
      }
      teardown?.();
    };
  }, [reducedMotion]);

  const scrollTo = useCallback<LenisContextValue["scrollTo"]>((target, opts) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target as Parameters<Lenis["scrollTo"]>[0], {
        offset: opts?.offset ?? -64,
      });
      return;
    }
    // graceful fallback when reduced-motion or not yet initialised
    if (typeof window === "undefined") return;
    if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "auto", block: "start" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "auto" });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, []);

  return (
    <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>
  );
}
