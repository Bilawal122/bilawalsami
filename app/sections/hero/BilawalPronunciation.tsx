"use client";

import { useRef } from "react";
import { AUDIO } from "@/lib/assets";

/**
 * The word "Bilawal" inside the hero. When the audio file is ready, it becomes
 * clickable and plays /audio/bilawal.mp3. Until then it stays plain — no
 * "PENDING" badge on the ship-asap build.
 */
export function BilawalPronunciation() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const ready = AUDIO.bilawalPronunciation.status === "ready";

  if (!ready) {
    return <span>Bilawal</span>;
  }

  const handle = () => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  return (
    <>
      <button
        type="button"
        onClick={handle}
        data-cursor="hover"
        data-bilawal-audio="true"
        className="underline-offset-[6px] decoration-hairline hover:decoration-signal hover:text-bone transition-colors"
        title="Click to hear it pronounced"
        aria-label="Pronounce Bilawal"
      >
        Bilawal
      </button>
      {/* biome-ignore lint/a11y/useMediaCaption: pronunciation audio, no transcript needed */}
      <audio ref={audioRef} src={AUDIO.bilawalPronunciation.src} preload="none" />
    </>
  );
}
