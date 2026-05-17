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
  liveUrl?: string;
  githubUrl?: string;
  what: string[];
}

export interface MoreProject {
  id: string;
  name: string;
  oneLiner: string;
  stack: string;
  statuses: Status[];
  href?: string;
  hrefLabel?: string;
  note?: string;
}

/** PRD §4.3 — Featured Work chapter content */
export const FEATURED: FeaturedProject[] = [
  {
    id: "notesnap",
    index: "001",
    total: "003",
    name: "NoteSnap",
    statuses: ["ACADEMIC", "IN DEV"],
    role: "Solo build",
    oneLiner:
      "An AI study companion that turns lecture slides, PDFs, and YouTube videos into flashcards, quizzes, and a personal tutor.",
    stack: ["React Native", "Expo", "Supabase", "Gemini Flash", "TypeScript"],
    what: [
      "Full stack solo: auth + RLS Postgres schema, multi-source ingestion (camera / PDF / PPTX / DOCX / URL / YouTube), AI pipelines for flashcards / quizzes / cheatsheets.",
      "SM-2 spaced repetition, an AI tutor with 6 tools, streaks / XP / mastery analytics.",
      "108-page dissertation, predicted First. The trust-calibration finding is what's pushing me toward XAI research.",
    ],
    liveUrl: "https://notesnap.dev",
    githubUrl: "https://github.com/Bilawal122/notesnap",
  },
  {
    id: "tally",
    index: "002",
    total: "003",
    name: "Tally",
    statuses: ["LIVE"],
    role: "Solo build",
    oneLiner: "Calorie tracking without the database scroll — type or say what you ate, AI does the rest.",
    stack: ["React Native", "Expo", "Supabase", "Gemini", "RevenueCat"],
    what: [
      "Onboarding quiz, free-text → macros AI parsing pipeline, daily tracking + analytics screens.",
      "RevenueCat-powered subscription paywall, App-Store-grade onboarding, Supabase auth.",
      "Live on the App Store. Try the demo below — it's the same Gemini parser, rate-limited.",
    ],
    liveUrl: "https://apps.apple.com/app/id/tally",
  },
  {
    id: "arisecode",
    index: "003",
    total: "003",
    name: "AriseCode",
    statuses: ["LIVE"],
    role: "Solo build",
    oneLiner: "A natural-language website builder — describe a site, get a working React + Tailwind preview in seconds.",
    stack: ["Next.js", "TypeScript", "Gemini", "Tailwind", "Vercel"],
    what: [
      "Prompt → spec pipeline with a template engine that guarantees compilable output across 23 section types.",
      "Live preview rendered in-browser, one-click export to GitHub + Vercel.",
      "Try the embedded demo — full live app, no signup required.",
    ],
    liveUrl: "https://arisecode-zeta.vercel.app",
    githubUrl: "https://github.com/Bilawal122/arisecode",
  },
];

/** PRD §4.4 — More section, 8 cards in order of recruiter relevance */
export const MORE: MoreProject[] = [
  {
    id: "SIDE-01",
    name: "Go Ride",
    statuses: ["CLIENT", "LIVE"],
    oneLiner:
      "Private-hire car rental site for taxi drivers across the UK — fleet browser, pricing, multi-page flow, WhatsApp lead capture.",
    stack: "Next.js · Tailwind · Vercel",
    href: "https://go-ridenw.vercel.app",
    hrefLabel: "go-ridenw.vercel.app",
    note: "Paid freelance build for a Rochdale-based client.",
  },
  {
    id: "SIDE-02",
    name: "JetLagPro",
    statuses: ["BETA"],
    oneLiner:
      "AI-driven jet-lag protocol generator — pre-flight schedule, light-exposure timing, route-specific recovery plans.",
    stack: "React Native · Expo · RevenueCat",
    href: "#testflight-pending",
    hrefLabel: "TESTFLIGHT INVITE ↗",
  },
  {
    id: "SIDE-03",
    name: "ResumeHax",
    statuses: ["LIVE"],
    oneLiner: "AI CV and cover-letter builder with job-description tailoring.",
    stack: "Next.js · Node · Postgres · OpenAI",
    href: "https://resumehax.vercel.app",
    hrefLabel: "resumehax.vercel.app",
  },
  {
    id: "SIDE-04",
    name: "Gesture Control",
    statuses: ["IN DEV"],
    oneLiner:
      "Webcam-driven hand-gesture recognition — perform actions on the computer with gestures alone. Real-time CV pipeline running fully offline.",
    stack: "Python · OpenCV · MediaPipe",
    href: "https://github.com/Bilawal122",
    hrefLabel: "GITHUB ↗",
  },
  {
    id: "SIDE-05",
    name: "Exam Guide",
    statuses: ["IN DEV"],
    oneLiner: "Personal study tool — quiz and flashcard generator for exam prep, built during finals.",
    stack: "Next.js",
    href: "https://exam-guide-seven.vercel.app",
    hrefLabel: "exam-guide-seven.vercel.app",
  },
  {
    id: "SIDE-06",
    name: "PromptForge",
    statuses: ["LIVE"],
    oneLiner: "Turns rough ideas into structured prompts for creative and coding tasks.",
    stack: "Next.js · OpenAI · Tailwind",
    href: "https://github.com/Bilawal122",
    hrefLabel: "GITHUB ↗",
  },
  {
    id: "SIDE-07",
    name: "NLP-XAI",
    statuses: ["ACADEMIC"],
    oneLiner:
      "Transformer text classifier trained from scratch on Edge Hill's HPC. Interpreted with SHAP, LIME, and attention.",
    stack: "PyTorch · BERT · Slurm",
    href: "https://github.com/Bilawal122",
    hrefLabel: "GITHUB ↗",
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
