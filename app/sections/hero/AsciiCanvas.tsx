"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const RAMP = " .:-=+*?#%@";
const RAMP_LEN = RAMP.length;

/**
 * Hacker-terminal ASCII grid (PRD §4.1 hero canvas, default mode).
 * Each cell brightness is a Perlin-ish noise — two summed sines with
 * different frequencies + time drift — mapped to the RAMP char set.
 * The grain overlay handles the additional texture.
 *
 * Throttled to ~24fps; paused when off-screen; static frame under
 * prefers-reduced-motion. Below 768px viewport renders a static SVG.
 */
export function AsciiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FONT_SIZE = 14;
    const COL_W = 8;
    const ROW_H = 14;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      cols = Math.floor(width / COL_W);
      rows = Math.floor(height / ROW_H);
      ctx.font = `${FONT_SIZE}px var(--font-geist-mono), ui-monospace, monospace`;
      ctx.textBaseline = "top";
    };

    const draw = (time: number) => {
      const t = time * 0.0005;
      ctx.clearRect(0, 0, width, height);
      // background fill
      ctx.fillStyle = "rgba(10,10,10,1)";
      ctx.fillRect(0, 0, width, height);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // composite noise — two summed sines + a slow drift
          const n =
            Math.sin(x * 0.18 + t * 0.9) *
              Math.cos(y * 0.16 - t * 0.6) *
              0.5 +
            Math.sin((x + y) * 0.07 + t * 1.2) * 0.25 +
            0.5;
          const idx = Math.min(RAMP_LEN - 1, Math.max(0, Math.floor(n * RAMP_LEN)));
          const ch = RAMP[idx];
          if (ch === " ") continue;

          // accent: a small cluster near the centre that pulses yellow
          const cx = cols / 2;
          const cy = rows / 2;
          const dist = Math.hypot(x - cx, y - cy);
          const pulse = (Math.sin(t * 2) * 0.5 + 0.5) * 4;
          if (dist < 4 + pulse) {
            ctx.fillStyle = "rgba(230,255,0,0.9)";
          } else if (idx > RAMP_LEN - 3) {
            ctx.fillStyle = "rgba(242,239,232,0.85)";
          } else if (idx > RAMP_LEN - 6) {
            ctx.fillStyle = "rgba(242,239,232,0.45)";
          } else {
            ctx.fillStyle = "rgba(107,107,107,0.5)";
          }
          ctx.fillText(ch, x * COL_W, y * ROW_H);
        }
      }
    };

    let raf = 0;
    let lastFrame = 0;
    let visible = true;
    const FRAME_MS = 1000 / 24;

    const tick = (time: number) => {
      if (!visible) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (time - lastFrame >= FRAME_MS) {
        draw(time);
        lastFrame = time;
      }
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();

    if (reduced) {
      draw(0);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [reduced]);

  return (
    <div
      className="relative h-48 sm:h-64 border hairline overflow-hidden bg-ink"
      aria-hidden="true"
      data-print-hide="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <p className="absolute bottom-2 right-2 label-mono text-hairline pointer-events-none">
        ASCII · 24FPS · PERLIN
      </p>
    </div>
  );
}
