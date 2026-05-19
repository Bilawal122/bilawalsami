/**
 * Canonical section metadata. Section 005 used to be the status-board "Now";
 * it's now a personal changelog of things shipped.
 */
export type SectionId =
  | "hero"
  | "about"
  | "tryit"
  | "work"
  | "more"
  | "log"
  | "cv"
  | "contact";

export interface SectionMeta {
  id: SectionId;
  anchor: string;
  number: string;
  title: string;
  navLabel: string;
  navHidden?: boolean;
}

export const SECTIONS: SectionMeta[] = [
  { id: "hero", anchor: "section-000", number: "000", title: "Hero", navLabel: "Top", navHidden: true },
  { id: "about", anchor: "section-001", number: "001", title: "About", navLabel: "About" },
  { id: "tryit", anchor: "section-002", number: "002", title: "Try It", navLabel: "Try It" },
  { id: "work", anchor: "section-003", number: "003", title: "Work", navLabel: "Work" },
  { id: "more", anchor: "section-004", number: "004", title: "More", navLabel: "More" },
  { id: "log", anchor: "section-005", number: "005", title: "Changelog", navLabel: "Log" },
  { id: "cv", anchor: "section-006", number: "006", title: "CV", navLabel: "CV", navHidden: true },
  { id: "contact", anchor: "section-007", number: "007", title: "Contact", navLabel: "Contact" },
];

export const SECTION_TOTAL = SECTIONS.length;

export const sectionByAnchor = (anchor: string) =>
  SECTIONS.find((s) => s.anchor === anchor);
