"use client";

import { useRef, useState } from "react";
import { AUDIO } from "@/lib/assets";

/**
 * The word "Bilawal" inside the hero — clickable, plays /audio/bilawal.mp3.
 * Until the audio file lands the click silently no-ops and a "AUDIO PENDING"
 * tag appears next to the name.
 */
export function BilawalPronunciation() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [played, setPlayed] = useState(false);
  const ready = AUDIO.bilawalPronunciation.status === "ready";

  const handle = () => {
    if (!ready) return;
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.play().then(() => setPlayed(true)).catch(() => {/* user gesture missing? */});
  };

  return (
    <>
      <button
        type="button"
        onClick={handle}
        data-cursor="hover"
        data-bilawal-audio="true"
        className="underline-offset-[6px] decoration-hairline hover:decoration-signal hover:text-bone transition-colors"
        title={ready ? "Click to hear it pronounced" : "Pronunciation audio pending"}
        aria-label="Pronounce Bilawal"
      >
        Bilawal
      </button>
      {!ready && (
        <span className="label-mono text-hairline ml-2">[AUDIO PENDING]</span>
      )}
      {played && (
        <span className="label-mono text-signal ml-2" aria-hidden="true">[♪ PLAYED]</span>
      )}
      {ready && (
        // biome-ignore lint/a11y/useMediaCaption: pronunciation audio, no transcript needed
        <audio ref={audioRef} src={AUDIO.bilawalPronunciation.src} preload="none" />
      )}
    </>
  );
}
