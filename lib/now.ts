export type NowState = "LIVE" | "SHIPPED" | "BETA" | "DRAFT" | "RUNNING";

export interface NowRow {
  id: string;
  what: string;
  state: NowState;
  stateNote?: string;
  since: string;
  delta: string;
}

/**
 * Status board entries (Site Review Obs 07).
 * Mono throughout, columns: id · what · state · since · delta.
 * Sanitised — no PhD / UKRI / XAI / AI labels.
 */
export const NOW_BOARD: NowRow[] = [
  {
    id: "001",
    what: "Tally — App Store",
    state: "LIVE",
    stateNote: "GROWING (ASO)",
    since: "12 MAR 2024",
    delta: "+2Y 2M",
  },
  {
    id: "002",
    what: "JetLagPro — pre-flight schedule UX",
    state: "BETA",
    stateNote: "TESTFLIGHT",
    since: "21 FEB 2026",
    delta: "+87D",
  },
  {
    id: "003",
    what: "Go Ride — client ship",
    state: "SHIPPED",
    since: "02 MAY 2026",
    delta: "+17D",
  },
  {
    id: "004",
    what: "Seraphize — Q2 inventory planning",
    state: "RUNNING",
    since: "JUL 2022",
    delta: "+3Y 10M",
  },
  {
    id: "005",
    what: "NoteSnap dissertation writeup",
    state: "DRAFT",
    since: "10 APR 2026",
    delta: "+39D",
  },
  {
    id: "006",
    what: "Badminton — twice weekly",
    state: "RUNNING",
    since: "01 FEB 2026",
    delta: "+107D",
  },
];
