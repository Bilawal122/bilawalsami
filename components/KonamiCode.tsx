"use client";

import { useEffect } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Listens window-scope for the Konami sequence. On match, dispatches a custom
 * "bilawalsami:konami" event with `detail: { ttlMs }`. Components that want to
 * react (Hero accent flip) subscribe to that event.
 *
 * No UI of its own — invisible by design (PRD: "confined to hero, no other
 * side-effects" — visible side-effect lives in the hero).
 */
export function KonamiCode({ ttlMs = 8000 }: { ttlMs?: number }) {
  useEffect(() => {
    const buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer.push(key);
      while (buffer.length > SEQUENCE.length) buffer.shift();
      if (buffer.length === SEQUENCE.length && buffer.every((k, i) => k === SEQUENCE[i])) {
        buffer.length = 0;
        window.dispatchEvent(
          new CustomEvent("bilawalsami:konami", { detail: { ttlMs } }),
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ttlMs]);

  return null;
}
