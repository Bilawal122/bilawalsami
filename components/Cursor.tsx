"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Brutalist custom cursor (PRD §2.5).
 *
 * Perf notes:
 *  - `pointermove` only writes to local vars; the rAF loop owns all DOM writes.
 *  - Hover detection uses `pointerover`/`pointerout` (event delegation) — fires
 *    once on element boundary cross, not on every pixel of movement.
 *  - rAF self-stops once the ring has caught up to the dot (within 0.5px) and
 *    restarts on the next move. Idle cost is zero.
 *  - Only mounts at (pointer: fine) and obeys prefers-reduced-motion.
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
    let running = false;
    let isHover = false;

    const HOVER_SELECTOR = "[data-cursor=hover], a, button, input, textarea, select";

    const setHover = (next: boolean) => {
      if (next === isHover) return;
      isHover = next;
      ring.dataset.hover = next ? "true" : "false";
    };

    const onPointerOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.(HOVER_SELECTOR)) setHover(true);
    };
    const onPointerOut = (e: PointerEvent) => {
      const next = e.relatedTarget as HTMLElement | null;
      if (!next?.closest?.(HOVER_SELECTOR)) setHover(false);
    };

    const tick = () => {
      // dot tracks exactly (no lerp)
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      // ring lerps
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;

      const dx = Math.abs(mx - rx);
      const dy = Math.abs(my - ry);
      if (dx > 0.5 || dy > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
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
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 border border-bone will-change-transform transition-colors duration-150 ease-out data-[hover=true]:border-signal data-[hover=true]:bg-signal/15"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </>
  );
}
