export interface ChangelogEntry {
  version: string;
  date: string;
  body: string;
}

/**
 * Personal changelog. Latest first.
 * Editing this file bumps the section's lastUpdated stamp at build time.
 */
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v0.5.0",
    date: "MAY 2026",
    body: "Shipped Go Ride to the client. Private-hire rental site, live for a firm in Rochdale.",
  },
  {
    version: "v0.4.2",
    date: "APR 2026",
    body: "Submitted my dissertation. 108 pages on NoteSnap and how people calibrate trust in study tools.",
  },
  {
    version: "v0.4.1",
    date: "MAR 2026",
    body: "Tally released on the App Store. First downloads through App Store search.",
  },
  {
    version: "v0.3.0",
    date: "FEB 2026",
    body: "JetLagPro went into TestFlight. Sixty testers, mostly long-haul cabin crew I cold-emailed.",
  },
  {
    version: "v0.2.0",
    date: "DEC 2025",
    body: "Started playing badminton again, twice a week. My right knee is annoyed about it.",
  },
  {
    version: "v0.1.0",
    date: "OCT 2022",
    body: "Started Seraphize on Amazon. First order arrived the next day.",
  },
];
