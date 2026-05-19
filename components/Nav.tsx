"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useLenis } from "@/components/LenisProvider";
import { SECTIONS } from "@/lib/sections";

/**
 * Fixed top nav. Note B from the Site Review: availability pill now
 * carries the concrete answer — role / start / location.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleAnchor = (anchor: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo(`#${anchor}`);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${anchor}`);
    }
  };

  return (
    <header
      data-print-hide="true"
      className={`fixed inset-x-0 top-0 z-50 h-16 border-b transition-colors duration-300 ${
        scrolled
          ? "border-hairline bg-ink/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6 gap-4">
        <a
          href="#section-000"
          onClick={handleAnchor("section-000")}
          className="label-mono text-bone tracking-[0.2em] hover:text-signal transition-colors shrink-0"
          data-cursor="hover"
          aria-label="Bilawal Ullah Sami — home"
        >
          BUS
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {SECTIONS.filter((s) => !s.navHidden).map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.anchor}`}
                  onClick={handleAnchor(s.anchor)}
                  className="label-mono text-ash hover:text-bone transition-colors"
                  data-cursor="hover"
                >
                  {s.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <a
            href="/cv/Bilawal-Ullah-Sami-CV.pdf"
            download
            className="hidden sm:inline-block label-mono text-ash hover:text-bone transition-colors"
            data-cursor="hover"
          >
            CV.PDF ↓
          </a>
          <a
            href="#section-007"
            onClick={handleAnchor("section-007")}
            className="group flex items-center gap-2 label-mono text-signal hover:text-bone transition-colors"
            data-cursor="hover"
            aria-label="Available for grad SWE roles starting Sept 2026, UK or remote"
          >
            <span
              className="inline-block h-2 w-2 bg-signal"
              style={{ animation: "pulseDot 1.5s ease-in-out infinite" }}
            />
            <span className="hidden lg:inline">AVAILABLE · GRAD SWE · SEPT 2026 · UK / REMOTE</span>
            <span className="hidden md:inline lg:hidden">AVAILABLE · SEPT 2026</span>
            <span className="md:hidden">AVAILABLE</span>
          </a>
        </div>
      </div>
      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.85); }
        }
      `}</style>
    </header>
  );
}
