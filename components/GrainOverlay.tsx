/**
 * Fixed full-viewport film-grain overlay (PRD §2.3).
 * SVG feTurbulence is GPU-accelerated and zero-cost network-wise.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      data-print-hide="true"
      className="grain-overlay pointer-events-none fixed inset-0 z-[60] opacity-[0.12] mix-blend-overlay"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="block h-full w-full"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
