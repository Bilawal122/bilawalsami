import type { ReactNode } from "react";

export interface TimelineEvent {
  when: string;
  body: ReactNode;
  /** signal-coloured key moments */
  signal?: boolean;
}

export const TIMELINE_YEARS = ["2021", "2022", "2023", "2024", "2025", "2026"] as const;

export const TIMELINE: TimelineEvent[] = [
  { when: "SEP 2021", body: <>Started BSc Software Engineering, Edge Hill University.</> },
  {
    when: "OCT 2022",
    signal: true,
    body: (
      <>
        Founded <b>Seraphize Ltd</b>
        <br />
        Amazon FBA, UK + EU.
      </>
    ),
  },
  { when: "AUG 2023", body: <>Shipped <b>ResumeHax</b> &amp; <b>PromptForge</b>.</> },
  {
    when: "MAR 2024",
    signal: true,
    body: (
      <>
        <b>Tally</b> — live on App Store,
        <br />
        RevenueCat paywall.
      </>
    ),
  },
  {
    when: "DEC 2025",
    body: (
      <>
        <b>NoteSnap</b> dissertation —
        <br />
        108 pages, predicted First.
      </>
    ),
  },
  {
    when: "MAY 2026",
    signal: true,
    body: (
      <>
        <b>Go Ride</b> client ship.
        <br />
        Available for grad roles.
      </>
    ),
  },
];

export const TIMELINE_NOW_MARKER = "NOW — AVAILABLE · GRAD SWE · SEPT 2026 · UK / REMOTE";
