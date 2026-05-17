"use client";

import { useEffect, useRef, useState } from "react";
import { AssetSlot } from "./AssetSlot";
import type { ReelAsset } from "@/lib/assets";

/**
 * Autoplaying muted MP4 with a "watch with sound" toggle. Honours intersection
 * observer so the video only paints when in view (saves mobile battery).
 */
export function Reel({ asset, className = "" }: { asset: ReelAsset; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* autoplay blocked — user can click play */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (asset.status === "pending") {
    return <AssetSlot spec={asset.spec} aspect={asset.aspect} label="REEL PENDING" className={className} />;
  }

  return (
    <div className={`relative border hairline overflow-hidden bg-steel ${className}`}>
      <video
        ref={videoRef}
        className="block w-full h-auto"
        style={{ aspectRatio: asset.aspect ?? "16 / 9" }}
        muted={muted}
        playsInline
        loop
        autoPlay
        preload="metadata"
        aria-label={asset.label}
      >
        {asset.srcWebm && <source src={asset.srcWebm} type="video/webm" />}
        <source src={asset.src} type="video/mp4" />
      </video>
      <button
        type="button"
        data-cursor="hover"
        onClick={() => setMuted((m) => !m)}
        className="absolute bottom-3 right-3 label-mono bg-ink/80 backdrop-blur-sm border hairline px-3 py-2 text-bone hover:text-signal hover:border-signal transition-colors"
      >
        {muted ? "WATCH WITH SOUND ↑" : "MUTE ↓"}
      </button>
      {!visible && (
        <span
          className="absolute top-3 left-3 label-mono text-hairline"
          aria-hidden="true"
        >
          PAUSED · OFFSCREEN
        </span>
      )}
    </div>
  );
}
