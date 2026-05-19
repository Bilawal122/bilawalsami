/**
 * Inline CV content (Site Review Obs 05). Pulled from the actual CV PDF
 * the user supplied — sanitised to drop AI-labelled lines per the prior
 * editorial pass.
 */

export const CV_HEAD = {
  name: "Bilawal Ullah Sami",
  role: "Software engineer",
  location: "Manchester, UK",
  email: "bilawal.sami.2@gmail.com",
  phone: "+44 7833 110 545",
  github: "github.com/Bilawal122",
  linkedin: "linkedin.com/in/bilawal-sami-1ba691322",
};

export interface CvEntry {
  title: string;
  when: string;
  bullets: string[];
}

export const CV_EXPERIENCE: CvEntry[] = [
  {
    title: "Founder & E-commerce Executive — Seraphize",
    when: "10/2022 — Present",
    bullets: [
      "Built and scaled a private-label brand to £100K+ annual revenue across Amazon UK / EU.",
      "Launched 15+ optimised listings; boosted organic sales 35% via SEO and A+ content.",
      "£3K/month PPC budget held at <25% ACOS; total sales up 60%.",
      "Sourcing, logistics, inventory — 95%+ stock availability year-round.",
      "Handled VAT filings and customer service; sustained 4.5+ seller rating.",
    ],
  },
  {
    title: "Technical Support Specialist — John Lewis & Partners",
    when: "07/2022 — 06/2025",
    bullets: [
      "Resolved 90% of issues on first contact across consumer devices.",
      "Managed 50+ daily support cases; cut resolution time by 25%.",
      "Lifted department sales 20% through recommendations and upsell.",
    ],
  },
  {
    title: "Call Centre Agent — COVID Response",
    when: "07/2021 — 03/2022",
    bullets: [
      "Handled 100+ daily wellness calls supporting COVID-positive patients.",
      "Logged data with 100% accuracy in support of NHS response.",
    ],
  },
];

export const CV_PROJECTS: CvEntry[] = [
  {
    title: "Tally — calorie tracking · LIVE",
    when: "2024 — present · solo build · App Store",
    bullets: [
      "React Native + Expo + Supabase + RevenueCat. Onboarding quiz, free-text → macros parsing pipeline, subscription paywall, analytics.",
    ],
  },
  {
    title: "NoteSnap — study companion · ACADEMIC",
    when: "2024 — 2026 · dissertation",
    bullets: [
      "Multi-source ingestion, flashcards / quizzes / cheatsheets, SM-2 spaced repetition, 6-tool tutor. 108pp dissertation, predicted First.",
    ],
  },
  {
    title: "AriseCode — natural-language site builder · LIVE",
    when: "2023 — present",
    bullets: [
      "Next.js. Prompt → spec → compilable React + Tailwind across 23 section types. Live preview, GitHub + Vercel export.",
    ],
  },
  {
    title: "Go Ride — private-hire site · CLIENT · LIVE",
    when: "2026 · paid freelance",
    bullets: [
      "Next.js + Tailwind. Fleet browser, pricing, WhatsApp lead capture. Built for a Rochdale-based client.",
    ],
  },
];

export const CV_EDUCATION: CvEntry = {
  title: "Edge Hill University — BSc Software Engineering",
  when: "09/2023 — Present · Predicted First",
  bullets: [
    "Focus: full-stack development, software testing, cloud systems.",
    "Coursework: data structures, agile project management, DevOps.",
  ],
};

export const CV_SKILLS = [
  "TypeScript",
  "JavaScript",
  "Python",
  "React",
  "React Native",
  "Next.js",
  "Node.js",
  "Express",
  "Postgres",
  "Supabase",
  "Firebase",
  "AWS",
  "GitHub",
  "REST APIs",
  "Pandas",
  "NumPy",
  "Amazon SP-API",
  "Tailwind",
];

export const CV_ACHIEVEMENTS = [
  {
    title: "Tech-enabled brand systems",
    body: "Built a brand operation by integrating automation and analytics across marketing and logistics.",
  },
  {
    title: "Data-driven decisions",
    body: "Forecasted ad performance, analysed keyword trends, predicted inventory gaps.",
  },
  {
    title: "Technical excellence",
    body: "#1 performance for five straight months on accuracy, speed, and client feedback at John Lewis.",
  },
];
