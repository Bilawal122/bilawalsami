"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactElement,
} from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Wraps a single child link/button. Tracks pointer inside the element and
 * applies a lerp-eased translate3d. Disabled on touch and reduced-motion.
 * Doesn't change the child's own styles or attributes — just the transform.
 */
export function MagneticButton({
  children,
  strength = 0.35,
}: {
  children: ReactElement<{ ref?: React.Ref<HTMLElement> }>;
  strength?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    let tx = 0;
    let ty = 0;
    let dx = 0;
    let dy = 0;
    let raf = 0;
    let active = false;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      tx = (e.clientX - cx) * strength;
      ty = (e.clientY - cy) * strength;
    };

    const onEnter = () => {
      active = true;
      raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const tick = () => {
      dx += (tx - dx) * 0.18;
      dy += (ty - dy) * 0.18;
      el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      if (active && (Math.abs(dx - tx) > 0.05 || Math.abs(dy - ty) > 0.05)) {
        raf = requestAnimationFrame(tick);
      } else if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        active = false;
        el.style.transform = "";
      }
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [reduced, strength]);

  if (!isValidElement(children)) return children;
  return cloneElement(children, { ref });
}
