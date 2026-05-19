/**
 * Canonical section metadata. Section numbers are 000-padded.
 * Nav, section labels, command palette, and sitemap all read from here.
 */
export type SectionId = "hero" | "about" | "work" | "more" | "contact";

export interface SectionMeta {
  id: SectionId;
  /** DOM id used for anchor links (#section-000 …) */
  anchor: string;
  /** Zero-padded number shown in the top-left label */
  number: string;
  /** Display title in the section label */
  title: string;
  /** Label shown in the centre nav */
  navLabel: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: "hero", anchor: "section-000", number: "000", title: "Hero", navLabel: "Top" },
  { id: "about", anchor: "section-001", number: "001", title: "About", navLabel: "About" },
  { id: "work", anchor: "section-002", number: "002", title: "Featured Work", navLabel: "Work" },
  { id: "more", anchor: "section-003", number: "003", title: "More", navLabel: "More" },
  { id: "contact", anchor: "section-004", number: "004", title: "Contact", navLabel: "Contact" },
];

export const SECTION_TOTAL = SECTIONS.length;

export const sectionByAnchor = (anchor: string) =>
  SECTIONS.find((s) => s.anchor === anchor);
