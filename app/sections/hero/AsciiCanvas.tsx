"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const RAMP = " .:-=+*?#%@";
const RAMP_LEN = RAMP.length;

// per-intensity-bucket colour, looked up by ramp index range
const COLOR_PULSE = "rgba(230,255,0,0.9)"; // signal centre pulse
const COLOR_BRIGHT = "rgba(242,239,232,0.85)";
const COLOR_MID = "rgba(242,239,232,0.45)";
const COLOR_DIM = "rgba(107,107,107,0.5)";

/**
 * Hacker-terminal ASCII grid (PRD §4.1 hero canvas, default mode).
 *
 * Perf notes:
 *  - 15fps (drops to ~half of the original 24fps; still feels alive)
 *  - dpr capped at 1 (no scaling) — full-res text doesn't need 2× pixels
 *  - paints batched per colour bucket to minimise fillStyle assignments
 *  - paused via IntersectionObserver when off-screen
 *  - rAF stops entirely under prefers-reduced-motion after a single static frame
 */
export function AsciiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const FONT_SIZE = 14;
    const COL_W = 8;
    const ROW_H = 14;
    const FRAME_MS = 1000 / 15;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width);
      canvas.height = Math.floor(height);
      cols = Math.floor(width / COL_W);
      rows = Math.floor(height / ROW_H);
      ctx.font = `${FONT_SIZE}px var(--font-geist-mono), ui-monospace, monospace`;
      ctx.textBaseline = "top";
    };

    // pre-allocated buckets so we don't rebuild arrays each frame
    const pulse: { x: number; y: number; c: string }[] = [];
    const bright: { x: number; y: number; c: string }[] = [];
    const mid: { x: number; y: number; c: string }[] = [];
    const dim: { x: number; y: number; c: string }[] = [];

    const draw = (time: number) => {
      const t = time * 0.0005;
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      pulse.length = 0;
      bright.length = 0;
      mid.length = 0;
      dim.length = 0;

      const cx = cols / 2;
      const cy = rows / 2;
      const pulseR = 4 + (Math.sin(t * 2) * 0.5 + 0.5) * 4;
      const pulseR2 = pulseR * pulseR;

      for (let y = 0; y < rows; y++) {
        const yT = y * 0.16 - t * 0.6;
        for (let x = 0; x < cols; x++) {
          const n =
            Math.sin(x * 0.18 + t * 0.9) * Math.cos(yT) * 0.5 +
            Math.sin((x + y) * 0.07 + t * 1.2) * 0.25 +
            0.5;
          const idx = (n * RAMP_LEN) | 0;
          if (idx <= 0) continue;
          const ch = RAMP[idx >= RAMP_LEN ? RAMP_LEN - 1 : idx];
          if (ch === " ") continue;

          const dx = x - cx;
          const dy = y - cy;
          if (dx * dx + dy * dy < pulseR2) {
            pulse.push({ x: x * COL_W, y: y * ROW_H, c: ch });
          } else if (idx > RAMP_LEN - 3) {
            bright.push({ x: x * COL_W, y: y * ROW_H, c: ch });
          } else if (idx > RAMP_LEN - 6) {
            mid.push({ x: x * COL_W, y: y * ROW_H, c: ch });
          } else {
            dim.push({ x: x * COL_W, y: y * ROW_H, c: ch });
          }
        }
      }

      // single fillStyle assignment per bucket
      ctx.fillStyle = COLOR_DIM;
      for (let i = 0; i < dim.length; i++) ctx.fillText(dim[i].c, dim[i].x, dim[i].y);
      ctx.fillStyle = COLOR_MID;
      for (let i = 0; i < mid.length; i++) ctx.fillText(mid[i].c, mid[i].x, mid[i].y);
      ctx.fillStyle = COLOR_BRIGHT;
      for (let i = 0; i < bright.length; i++) ctx.fillText(bright[i].c, bright[i].x, bright[i].y);
      ctx.fillStyle = COLOR_PULSE;
      for (let i = 0; i < pulse.length; i++) ctx.fillText(pulse[i].c, pulse[i].x, pulse[i].y);
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();

    if (reduced) {
      draw(0);
      return () => ro.disconnect();
    }

    let raf = 0;
    let lastFrame = 0;
    let visible = true;

    const tick = (time: number) => {
      if (!visible) {
        // sleep one rAF then re-check; cheaper than running draw
        raf = requestAnimationFrame(tick);
        return;
      }
      if (time - lastFrame >= FRAME_MS) {
        draw(time);
        lastFrame = time;
      }
      raf = requestAnimationFrame(tick);
    };

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
        ASCII · 15FPS · PERLIN
      </p>
    </div>
  );
}
