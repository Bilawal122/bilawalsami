"use client";

import { motion, useReducedMotion } from "motion/react";

const lines = ["Software engineer.", "Building AI tools that", "ship, not slideware."];

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

export function HeroPunchLine() {
  const reduced = useReducedMotion();

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
          key={line}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.06em" }}
        >
          {line.split(" ").map((word, wordIdx) => (
            <motion.span
              key={`${lineIdx}-${wordIdx}-${word}`}
              variants={reduced ? undefined : wordVariant}
              className="inline-block"
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
