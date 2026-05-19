import type { Status } from "@/components/StatusBadge";

export interface FeaturedProject {
  id: string;
  index: string; // "001"
  total: string; // "003"
  name: string;
  oneLiner: string;
  stack: string[];
  role: string;
  statuses: Status[];
  what: string[];
}

export interface MoreProject {
  id: string;
  name: string;
  oneLiner: string;
  stack: string;
  statuses: Status[];
  note?: string;
}

/** Featured Work chapter content */
export const FEATURED: FeaturedProject[] = [
  {
    id: "notesnap",
    index: "001",
    total: "003",
    name: "NoteSnap",
    statuses: ["ACADEMIC", "IN DEV"],
    role: "Solo build",
    oneLiner:
      "A study companion that turns lecture slides, PDFs, and YouTube videos into flashcards, quizzes, and a personal tutor.",
    stack: ["React Native", "Expo", "Supabase", "TypeScript"],
    what: [
      "Full stack solo: auth + RLS Postgres schema, multi-source ingestion (camera / PDF / PPTX / DOCX / URL / YouTube), pipelines for flashcards / quizzes / cheatsheets.",
      "SM-2 spaced repetition, a tutor with 6 tools, streaks / XP / mastery analytics.",
      "108-page dissertation, predicted First.",
    ],
  },
  {
    id: "tally",
    index: "002",
    total: "003",
    name: "Tally",
    statuses: ["LIVE"],
    role: "Solo build",
    oneLiner: "Calorie tracking without the database scroll — type or say what you ate, get macros back.",
    stack: ["React Native", "Expo", "Supabase", "RevenueCat"],
    what: [
      "Onboarding quiz, free-text → macros parsing pipeline, daily tracking + analytics screens.",
      "RevenueCat-powered subscription paywall, App-Store-grade onboarding, Supabase auth.",
      "Live on the App Store. Try the demo below — same parser as the app, rate-limited.",
    ],
  },
  {
    id: "arisecode",
    index: "003",
    total: "003",
    name: "AriseCode",
    statuses: ["LIVE"],
    role: "Solo build",
    oneLiner: "A natural-language website builder — describe a site, get a working React + Tailwind preview in seconds.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    what: [
      "Prompt → spec pipeline with a template engine that guarantees compilable output across 23 section types.",
      "Live preview rendered in-browser, one-click export to GitHub + Vercel.",
      "23 section types, compilable TSX output, one-click export.",
    ],
  },
];

/** More section, 8 cards in order of recruiter relevance */
export const MORE: MoreProject[] = [
  {
    id: "SIDE-01",
    name: "Go Ride",
    statuses: ["CLIENT", "LIVE"],
    oneLiner:
      "Private-hire car rental site for taxi drivers across the UK — fleet browser, pricing, multi-page flow, WhatsApp lead capture.",
    stack: "Next.js · Tailwind · Vercel",
    note: "Paid freelance build for a Rochdale-based client.",
  },
  {
    id: "SIDE-02",
    name: "JetLagPro",
    statuses: ["BETA"],
    oneLiner:
      "Jet-lag protocol generator — pre-flight schedule, light-exposure timing, route-specific recovery plans.",
    stack: "React Native · Expo · RevenueCat",
  },
  {
    id: "SIDE-03",
    name: "ResumeHax",
    statuses: ["LIVE"],
    oneLiner: "CV and cover-letter builder with job-description tailoring.",
    stack: "Next.js · Node · Postgres",
  },
  {
    id: "SIDE-04",
    name: "Gesture Control",
    statuses: ["IN DEV"],
    oneLiner:
      "Webcam-driven hand-gesture recognition — perform actions on the computer with gestures alone. Real-time CV pipeline running fully offline.",
    stack: "Python · OpenCV · MediaPipe",
  },
  {
    id: "SIDE-05",
    name: "Exam Guide",
    statuses: ["IN DEV"],
    oneLiner: "Personal study tool — quiz and flashcard generator for exam prep, built during finals.",
    stack: "Next.js",
  },
  {
    id: "SIDE-06",
    name: "PromptForge",
    statuses: ["LIVE"],
    oneLiner: "Structures rough ideas into clean, reusable prompts for creative and coding tasks.",
    stack: "Next.js · Tailwind",
  },
  {
    id: "SIDE-07",
    name: "HPC Classifier",
    statuses: ["ACADEMIC"],
    oneLiner:
      "Transformer text classifier trained from scratch on Edge Hill's HPC. Interpreted with SHAP, LIME, and attention probing.",
    stack: "PyTorch · BERT · Slurm",
  },
  {
    id: "SIDE-08",
    name: "Seraphize",
    statuses: ["BUSINESS"],
    oneLiner:
      "Profitable Amazon FBA business across UK and EU marketplaces. Founder, director, and the entire ops team.",
    stack: "Amazon SP-API · analytics · forecasting",
    note: "Role only, no public link.",
  },
];
