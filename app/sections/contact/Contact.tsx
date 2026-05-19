"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";

const meta = SECTIONS.find((s) => s.id === "contact")!;

const EMAIL = "bilawal.sami.2@gmail.com";

const ROLE_CHIPS = [
  { id: "grad", label: "GRAD ROLE", subject: "Grad SWE role" },
  { id: "intern", label: "INTERNSHIP", subject: "Internship" },
  { id: "freelance", label: "FREELANCE", subject: "Freelance lead" },
  { id: "other", label: "OTHER", subject: "Quick chat" },
] as const;

/**
 * Site Review note E — role chip selector above the email link. Click sets
 * the mailto subject prefix. Removes typing, increases conversion.
 */
export function Contact() {
  const [chip, setChip] = useState<(typeof ROLE_CHIPS)[number]>(ROLE_CHIPS[0]);
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`From bilawalsami.vercel.app — ${chip.subject}`)}`;

  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative px-6 pt-20 pb-32"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>

      <div className="mx-auto max-w-[1200px] mt-20 flex flex-col items-center gap-10 text-center">
        <p className="label-mono text-ash">
          <span className="text-bone">CONTACT</span>
          <span className="mx-2">{meta.number}</span>
          <span className="text-hairline">/</span>
          <span className="ml-2">{String(SECTION_TOTAL - 1).padStart(3, "0")}</span>
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          <span className="label-mono text-hairline self-center mr-2">WHEN YOU EMAIL ME:</span>
          {ROLE_CHIPS.map((c) => {
            const on = c.id === chip.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setChip(c)}
                data-cursor="hover"
                className={`label-mono border px-3 py-1.5 transition-colors ${
                  on
                    ? "border-signal text-signal bg-signal/5"
                    : "hairline text-ash hover:text-bone hover:border-bone"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <a
          href={mailto}
          data-cursor="hover"
          className="group relative inline-block font-sans font-bold text-bone hover:text-signal transition-colors break-all"
          style={{
            fontSize: "clamp(1.5rem, 5vw, 4rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {EMAIL}
          <span
            aria-hidden="true"
            className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100"
            style={{ transformOrigin: "left center" }}
          />
        </a>

        <p className="mono-sm text-ash max-w-[55ch]">
          Subject pre-fills with{" "}
          <span className="text-bone">{`"From bilawalsami.vercel.app — ${chip.subject}"`}</span>. Replies within a day, usually faster.
        </p>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 w-full max-w-[700px]">
          <li className="flex flex-col items-center gap-2">
            <span className="label-mono text-hairline">LINKEDIN</span>
            <a
              href="https://linkedin.com/in/bilawal-sami-1ba691322"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="label-mono text-bone hover:text-signal transition-colors"
            >
              linkedin.com/in/bilawal-sami-1ba691322
            </a>
          </li>
          <li className="flex flex-col items-center gap-2">
            <span className="label-mono text-hairline">CV.PDF</span>
            <a
              href="/cv/Bilawal-Ullah-Sami-CV.pdf"
              download
              data-cursor="hover"
              className="label-mono text-bone hover:text-signal transition-colors"
            >
              DOWNLOAD ↓
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
