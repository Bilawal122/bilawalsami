import fs from "node:fs";
import path from "node:path";
import { SectionLabel } from "@/components/SectionLabel";
import { NOW_BULLETS } from "@/lib/now";
import { SECTIONS, SECTION_TOTAL } from "@/lib/sections";
import { GitHubStrip } from "./GitHubStrip";

const meta = SECTIONS.find((s) => s.id === "now")!;

function lastUpdated(): string {
  try {
    const stat = fs.statSync(path.join(process.cwd(), "lib", "now.ts"));
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(stat.mtime)
      .toUpperCase();
  } catch {
    return "RECENTLY";
  }
}

export function Now() {
  const updated = lastUpdated();

  return (
    <section
      id={meta.anchor}
      aria-labelledby={`${meta.anchor}-label`}
      className="section-rule relative px-6 pt-20 pb-28"
    >
      <div className="absolute left-6 top-6" id={`${meta.anchor}-label`}>
        <SectionLabel section={meta} total={SECTION_TOTAL} />
      </div>

      <div className="mx-auto max-w-[1100px] mt-20">
        <p className="label-mono text-ash mb-10">LAST UPDATED {updated}</p>
        <ul className="space-y-4">
          {NOW_BULLETS.map((line, i) => (
            <li
              key={i}
              className="flex gap-4 text-bone"
              style={{ fontSize: "1.125rem", lineHeight: 1.55 }}
            >
              <span aria-hidden="true" className="text-signal select-none mt-1">
                →
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <GitHubStrip />
      </div>
    </section>
  );
}
