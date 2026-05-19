"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const BASE_LINES = ["Software engineer.", "Building tools that", "ship, not slideware."];

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.25 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] as const },
  },
};

const NAME_HOLD_MS = 4000;
const NAME_DEBOUNCE_MS = 400;
const NAME_MIN_LEN = 2;
const NAME_MAX_LEN = 24;

function useTypedName(): string | null {
  const [, setTyped] = useState("");
  const [override, setOverride] = useState<string | null>(null);
  const debounceRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);
  const stop = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (stop.current) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        setTyped((prev) => (prev + e.key).slice(-NAME_MAX_LEN));
      } else if (e.key === "Backspace") {
        setTyped((prev) => prev.slice(0, -1));
      } else {
        return;
      }
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        setTyped((prev) => {
          if (prev.length >= NAME_MIN_LEN) {
            const formatted = prev.charAt(0).toUpperCase() + prev.slice(1).toLowerCase();
            setOverride(formatted);
            if (holdRef.current) window.clearTimeout(holdRef.current);
            holdRef.current = window.setTimeout(() => {
              setOverride(null);
            }, NAME_HOLD_MS);
          }
          return "";
        });
      }, NAME_DEBOUNCE_MS);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      if (holdRef.current) window.clearTimeout(holdRef.current);
      stop.current = true;
    };
  }, []);

  return override;
}

export function HeroPunchLine() {
  const reduced = useReducedMotion();
  const override = useTypedName();

  const lines = override ? [BASE_LINES[0], "Building tools", `for ${override}.`] : BASE_LINES;

  return (
    <motion.h2
      className="font-sans font-black text-bone leading-[0.95] mt-6"
      style={{
        fontSize: "clamp(2.75rem, 9vw, 7.5rem)",
        letterSpacing: "-0.04em",
      }}
      variants={reduced ? undefined : container}
      initial="hidden"
      animate="show"
      aria-label={lines.join(" ")}
    >
      {lines.map((line, lineIdx) => (
        <span
          key={`${lineIdx}-${line}`}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.06em" }}
        >
          {line.split(" ").map((word, wordIdx) => (
            <motion.span
              key={`${lineIdx}-${wordIdx}-${word}`}
              variants={reduced ? undefined : wordVariant}
              className={`inline-block ${override && lineIdx === 2 ? "text-signal" : ""}`}
              style={{ marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}
