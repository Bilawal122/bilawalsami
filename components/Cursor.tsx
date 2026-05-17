"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Brutalist custom cursor (PRD §2.5).
 *   - 8px dot tracks the pointer exactly
 *   - 32px outlined ring lags via lerp (~0.15)
 *   - over [data-cursor=hover], dot grows to fill the ring and flips to --signal
 *   - hidden on touch + when prefers-reduced-motion
 *
 * The CSS rule `html.has-custom-cursor *` hides the native pointer; we set the
 * class only after we know we're rendering, so non-fine-pointer devices keep
 * the system cursor.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let isHover = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;

      const target = e.target as HTMLElement | null;
      const hover = !!target?.closest?.("[data-cursor=hover], a, button, input, textarea");
      if (hover !== isHover) {
        isHover = hover;
        ring.dataset.hover = hover ? "true" : "false";
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reducedMotion]);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        data-print-hide="true"
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[70] h-2 w-2 bg-bone will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        data-print-hide="true"
        data-hover="false"
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 border border-bone will-change-transform transition-[background-color,border-color,transform-origin] duration-200 ease-out data-[hover=true]:border-signal data-[hover=true]:bg-signal/15"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </>
  );
}
