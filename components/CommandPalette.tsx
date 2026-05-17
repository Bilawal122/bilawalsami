"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "@/components/LenisProvider";
import { SECTIONS } from "@/lib/sections";

type Action = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

/**
 * ⌘K / Ctrl+K palette — keyboard-first jump menu. Brutalist styling,
 * no shadcn, built ground-up. Lists jump-to-section, copy email,
 * download CV, open external links.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();
  const { scrollTo } = useLenis();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIdx(0);
  }, []);

  const actions = useMemo<Action[]>(() => {
    const list: Action[] = SECTIONS.map((s) => ({
      id: `jump-${s.id}`,
      label: `Jump → ${s.title}`,
      hint: `Section ${s.number}`,
      run: () => {
        scrollTo(`#${s.anchor}`);
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", `#${s.anchor}`);
        }
      },
    }));

    list.push(
      {
        id: "copy-email",
        label: "Copy email address",
        hint: "b.ullahsami@gmail.com",
        run: () => {
          navigator.clipboard?.writeText("b.ullahsami@gmail.com").catch(() => {});
        },
      },
      {
        id: "open-mail",
        label: "Open email composer",
        hint: "mailto: with subject pre-filled",
        run: () => {
          window.location.href =
            "mailto:b.ullahsami@gmail.com?subject=" +
            encodeURIComponent("From bilawalsami.vercel.app — [your role here]");
        },
      },
      {
        id: "download-cv",
        label: "Download CV",
        hint: "Bilawal-Ullah-Sami-CV.pdf",
        run: () => {
          const a = document.createElement("a");
          a.href = "/cv/Bilawal-Ullah-Sami-CV.pdf";
          a.download = "Bilawal-Ullah-Sami-CV.pdf";
          a.click();
        },
      },
      {
        id: "open-github",
        label: "Open GitHub",
        hint: "github.com/Bilawal122",
        run: () => window.open("https://github.com/Bilawal122", "_blank", "noopener,noreferrer"),
      },
      {
        id: "open-linkedin",
        label: "Open LinkedIn",
        hint: "linkedin.com/in/bilawal-ullah-sami",
        run: () =>
          window.open("https://linkedin.com/in/bilawal-ullah-sami", "_blank", "noopener,noreferrer"),
      },
      {
        id: "try-tally",
        label: "Try the Tally demo",
        hint: "Section 002 → Tally inline demo",
        run: () => {
          scrollTo("#work-tally");
        },
      },
    );

    return list;
  }, [scrollTo]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q),
    );
  }, [actions, query]);

  // global hotkey
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setIdx(0);
  }, [query]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[idx]?.run();
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[15vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <button
            type="button"
            aria-label="Close palette"
            onClick={close}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />
          <motion.div
            initial={reduced ? false : { y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -4, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
            className="relative w-full max-w-xl bg-ink border hairline shadow-[0_0_0_1px_var(--color-hairline)]"
          >
            <div className="flex items-center gap-3 border-b hairline px-4 py-3">
              <span className="label-mono text-signal">⌘K</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Jump to section, copy email, open GitHub…"
                className="flex-1 bg-transparent text-bone placeholder:text-hairline outline-none"
                aria-label="Search commands"
              />
              <span className="label-mono text-hairline">ESC</span>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center label-mono text-hairline">NO MATCH</li>
              )}
              {filtered.map((a, i) => (
                <li key={a.id}>
                  <button
                    type="button"
                    data-cursor="hover"
                    onMouseEnter={() => setIdx(i)}
                    onClick={() => {
                      a.run();
                      close();
                    }}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between gap-4 border-b hairline transition-colors ${
                      i === idx ? "bg-signal/10 text-signal" : "text-bone hover:bg-steel"
                    }`}
                  >
                    <span className="mono-sm">{a.label}</span>
                    <span className="label-mono text-hairline">{a.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="px-4 py-2 border-t hairline label-mono text-hairline">
              ↑↓ NAVIGATE · ↵ SELECT · ESC CLOSE
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
