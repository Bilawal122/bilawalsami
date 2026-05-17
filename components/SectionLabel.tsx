import type { SectionMeta } from "@/lib/sections";

/**
 * The "SECTION 001 / 005 — About" mono label fixed top-left of each section.
 * Lives inside the section so it scrolls with it; the nav has its own labels.
 */
export function SectionLabel({
  section,
  total,
}: {
  section: SectionMeta;
  total: number;
}) {
  return (
    <p className="label-mono text-ash select-none">
      <span className="text-bone">SECTION</span>
      <span className="mx-2">{section.number}</span>
      <span className="text-hairline">/</span>
      <span className="ml-2">{String(total - 1).padStart(3, "0")}</span>
      <span className="mx-3 text-hairline">·</span>
      <span>{section.title}</span>
    </p>
  );
}
