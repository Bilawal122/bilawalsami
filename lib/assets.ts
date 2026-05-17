/**
 * One-file registry for every media asset on the site (PRD §9, build plan
 * "Asset strategy"). Components import from here only, so swapping a missing
 * asset is one edit + one drop into /public.
 *
 * status="ready"   — file exists on disk; render it normally.
 * status="pending" — render an AssetSlot placeholder card in its place.
 */

export type AssetStatus = "ready" | "pending";

export interface ReelAsset {
  status: AssetStatus;
  /** /public-relative path */
  src: string;
  /** matching WebM variant, optional */
  srcWebm?: string;
  /** display spec for the placeholder card */
  spec: string;
  /** alt / sr-only label */
  label: string;
  /** intended natural aspect ratio for layout */
  aspect?: string;
}

export interface ShotAsset {
  status: AssetStatus;
  src: string;
  alt: string;
  spec?: string;
}

export const REELS = {
  notesnap: {
    status: "pending",
    src: "/reels/notesnap.mp4",
    srcWebm: "/reels/notesnap.webm",
    spec: "30s · 1080×1920 · h264 · muted",
    label: "NoteSnap app demo reel",
    aspect: "9 / 16",
  },
  arisecode1: {
    status: "pending",
    src: "/reels/arisecode-prompt-1.mp4",
    srcWebm: "/reels/arisecode-prompt-1.webm",
    spec: "8s · 1920×1080 · h264 · muted",
    label: "AriseCode prompt → site",
    aspect: "16 / 9",
  },
  arisecode2: {
    status: "pending",
    src: "/reels/arisecode-prompt-2.mp4",
    srcWebm: "/reels/arisecode-prompt-2.webm",
    spec: "8s · 1920×1080 · h264 · muted",
    label: "AriseCode prompt → site",
    aspect: "16 / 9",
  },
  arisecode3: {
    status: "pending",
    src: "/reels/arisecode-prompt-3.mp4",
    srcWebm: "/reels/arisecode-prompt-3.webm",
    spec: "8s · 1920×1080 · h264 · muted",
    label: "AriseCode prompt → site",
    aspect: "16 / 9",
  },
  gestureControl: {
    status: "pending",
    src: "/reels/gesture-control.mp4",
    srcWebm: "/reels/gesture-control.webm",
    spec: "15s · 1920×1080 · h264 · muted",
    label: "Gesture Control demo",
    aspect: "16 / 9",
  },
} as const satisfies Record<string, ReelAsset>;

export const SHOTS = {
  notesnap: [1, 2, 3, 4, 5].map<ShotAsset>((i) => ({
    status: "pending",
    src: `/shots/notesnap/0${i}.png`,
    alt: `NoteSnap screen ${i}`,
    spec: "1170×2532 · png",
  })),
  tally: [1, 2, 3, 4, 5].map<ShotAsset>((i) => ({
    status: "pending",
    src: `/shots/tally/0${i}.png`,
    alt: `Tally screen ${i}`,
    spec: "1170×2532 · png",
  })),
  arisecode: [1, 2, 3].map<ShotAsset>((i) => ({
    status: "pending",
    src: `/shots/arisecode/0${i}.png`,
    alt: `AriseCode screen ${i}`,
    spec: "1920×1080 · png",
  })),
} as const;

export const AUDIO = {
  bilawalPronunciation: {
    status: "pending" as AssetStatus,
    src: "/audio/bilawal.mp3",
    spec: "~1.5s · mp3 · mono",
    label: "Bilawal — name pronunciation",
  },
};

export const CV = {
  status: "pending" as AssetStatus,
  src: "/cv/Bilawal-Ullah-Sami-CV.pdf",
  spec: "a4 · pdf",
  label: "Bilawal Ullah Sami — CV",
};
