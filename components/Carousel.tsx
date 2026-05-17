"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { AssetSlot } from "./AssetSlot";
import type { ShotAsset } from "@/lib/assets";

/**
 * Horizontal carousel for screenshots. Embla under the hood, brutalist chrome:
 * mono "01 / 05" counter + ← → buttons + 1px-bordered slides.
 */
export function Carousel({
  shots,
  aspect = "9 / 16",
  className = "",
}: {
  shots: ShotAsset[];
  aspect?: string;
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [idx, setIdx] = useState(0);
  const [count, setCount] = useState(shots.length);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIdx(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (shots.length === 0) return null;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {shots.map((shot, i) => (
            <div
              key={`${shot.src}-${i}`}
              className="shrink-0"
              style={{ flex: "0 0 78%", maxWidth: "320px" }}
            >
              {shot.status === "pending" ? (
                <AssetSlot spec={shot.spec ?? "image"} aspect={aspect} label={`SHOT ${String(i + 1).padStart(2, "0")}`} />
              ) : (
                <div className="relative border hairline bg-steel overflow-hidden" style={{ aspectRatio: aspect }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="label-mono text-ash tabular-nums">
          {String(idx + 1).padStart(2, "0")} <span className="text-hairline">/</span>{" "}
          {String(count).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={idx === 0}
            data-cursor="hover"
            className="label-mono border hairline px-3 py-2 text-bone hover:border-signal hover:text-signal transition-colors disabled:opacity-30"
            aria-label="Previous screenshot"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={idx === count - 1}
            data-cursor="hover"
            className="label-mono border hairline px-3 py-2 text-bone hover:border-signal hover:text-signal transition-colors disabled:opacity-30"
            aria-label="Next screenshot"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
