"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const RAMP = " .:-=+*?#%@";
const RAMP_LEN = RAMP.length;

const COLOR_PULSE = "rgba(230,255,0,0.65)";
const COLOR_BRIGHT = "rgba(242,239,232,0.55)";
const COLOR_MID = "rgba(242,239,232,0.30)";
const COLOR_DIM = "rgba(107,107,107,0.40)";

interface Props {
  /** "watermark" runs at low fps and a capped resolution behind a mask */
  variant?: "watermark" | "feature";
}

/**
 * The watermark variant is the perf-critical one (it lives behind the hero).
 * Strategy:
 *   - Cap internal canvas resolution to a fixed grid (~80 cols × 30 rows) and
 *     CSS-scale up. The radial mask hides the scaling.
 *   - 3 fps. The look comes from the noise field, not motion smoothness.
 *   - Skip every other row (effectively half-density) so the inner loop is
 *     ~1200 cells per frame instead of ~13,000.
 */
export function AsciiCanvas({ variant = "feature" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const isWatermark = variant === "watermark";
    const FONT_SIZE = 14;
    const COL_W = 8;
    const ROW_H = 14;
    const FRAME_MS = isWatermark ? 1000 / 5 : 1000 / 15;
    const ROW_STEP = isWatermark ? 2 : 1;

    // capped internal canvas size for the watermark variant — keeps the cost
    // bounded on big screens but stays large enough that ASCII chars read as
    // chars after the radial mask
    const MAX_W = isWatermark ? 1280 : 1600;
    const MAX_H = isWatermark ? 520 : 1600;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.min(MAX_W, Math.floor(rect.width));
      const targetH = Math.min(MAX_H, Math.floor(rect.height));
      width = targetW;
      height = targetH;
      canvas.width = targetW;
      canvas.height = targetH;
      cols = Math.floor(width / COL_W);
      rows = Math.floor(height / ROW_H);
      ctx.font = `${FONT_SIZE}px var(--font-geist-mono), ui-monospace, monospace`;
      ctx.textBaseline = "top";
    };

    const pulse: { x: number; y: number; c: string }[] = [];
    const bright: { x: number; y: number; c: string }[] = [];
    const mid: { x: number; y: number; c: string }[] = [];
    const dim: { x: number; y: number; c: string }[] = [];

    const draw = (time: number) => {
      const t = time * 0.0003;
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      pulse.length = 0;
      bright.length = 0;
      mid.length = 0;
      dim.length = 0;

      const cx = cols * 0.72;
      const cy = rows * 0.55;
      const pulseR = 4 + (Math.sin(t * 1.5) * 0.5 + 0.5) * 4;
      const pulseR2 = pulseR * pulseR;

      for (let y = 0; y < rows; y += ROW_STEP) {
        const yT = y * 0.16 - t * 0.6;
        const sinY = Math.cos(yT);
        for (let x = 0; x < cols; x++) {
          const n =
            Math.sin(x * 0.18 + t * 0.9) * sinY * 0.5 +
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
  }, [reduced, variant]);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
