"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Receives the Konami-code event and flips --color-signal → --color-blood
 * inside the hero only, for ttlMs. Adds a small [DEV MODE] mono badge.
 */
export function HeroDevMode({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onKonami = (e: Event) => {
      const detail = (e as CustomEvent<{ ttlMs?: number }>).detail;
      const ttl = detail?.ttlMs ?? 8000;
      setActive(true);
      const id = window.setTimeout(() => setActive(false), ttl);
      return () => window.clearTimeout(id);
    };
    window.addEventListener("bilawalsami:konami", onKonami);
    return () => window.removeEventListener("bilawalsami:konami", onKonami);
  }, []);

  return (
    <div
      data-dev-mode={active ? "true" : undefined}
      style={
        active
          ? ({ "--color-signal": "var(--color-blood)" } as React.CSSProperties)
          : undefined
      }
      className="relative"
    >
      {active && (
        <div
          className="absolute top-2 right-2 z-10 label-mono text-blood border border-blood px-2 py-1 bg-ink/80 backdrop-blur-sm"
          aria-hidden="true"
        >
          [ DEV MODE · {Math.ceil(((typeof window !== "undefined" ? performance.now() : 0) % 8000) / 1000)}S ]
        </div>
      )}
      {children}
    </div>
  );
}
