/**
 * Inline CV content, pulled from the actual CV PDF.
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

export const CV_SUMMARY =
  "Software engineering student with hands-on experience shipping real products. I run an Amazon FBA business doing six figures a year alongside my degree, and I've shipped three apps as solo builds. I prefer building over talking about building.";

export interface CvEntry {
  title: string;
  org?: string;
  when: string;
  bullets: string[];
}

export const CV_EXPERIENCE: CvEntry[] = [
  {
    title: "Founder and E-commerce Executive",
    org: "Seraphize (Amazon UK / EU)",
    when: "Oct 2022 — present",
    bullets: [
      "Built a private-label brand to £100k+ in annual revenue across Amazon UK and EU.",
      "Launched 15+ optimised listings; organic sales up 35% through SEO and A+ content.",
      "Managed £3k/month PPC budget, kept ACOS under 25%, total sales up 60%.",
      "Sourcing, logistics, inventory. 95%+ stock availability year round.",
      "Handled VAT filings and customer service, 4.5+ seller rating.",
    ],
  },
  {
    title: "Technical Support Specialist",
    org: "John Lewis & Partners",
    when: "Jul 2022 — Jun 2025",
    bullets: [
      "Resolved 90% of issues on first contact across consumer tech.",
      "Managed 50+ daily support cases, cut resolution time by 25%.",
      "Lifted department sales 20% through recommendations and upsell.",
    ],
  },
  {
    title: "Call Centre Agent",
    org: "COVID Response",
    when: "Jul 2021 — Mar 2022",
    bullets: [
      "Handled 100+ daily wellness calls supporting COVID-positive patients.",
      "Logged data with 100% accuracy in support of the NHS response.",
    ],
  },
];

export const CV_PROJECTS: CvEntry[] = [
  {
    title: "Tally",
    when: "2024 — present · solo build · App Store",
    bullets: [
      "React Native + Expo + Supabase + RevenueCat. Onboarding quiz, free-text → macros parser, subscription paywall, analytics.",
    ],
  },
  {
    title: "NoteSnap",
    when: "2024 — 2026 · dissertation",
    bullets: [
      "Multi-source ingestion. Flashcards, quizzes, cheatsheets. SM-2 spaced repetition. Six-tool tutor. 108-page dissertation, predicted First.",
    ],
  },
  {
    title: "AriseCode",
    when: "2023 — present · solo build",
    bullets: [
      "Natural-language site builder. Prompt → spec → compilable React and Tailwind across 23 section types. Live preview, GitHub and Vercel export.",
    ],
  },
  {
    title: "Go Ride",
    when: "2026 · paid freelance",
    bullets: [
      "Next.js + Tailwind. Fleet browser, pricing, WhatsApp lead capture. Shipped for a private-hire firm in Rochdale.",
    ],
  },
];

export const CV_EDUCATION: CvEntry = {
  title: "BSc Software Engineering",
  org: "Edge Hill University",
  when: "Sep 2023 — present · predicted First",
  bullets: [
    "Full-stack development, software testing, cloud systems.",
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

export const CV_HIGHLIGHTS = [
  {
    title: "Tech-enabled brand systems",
    body: "Built the brand on automation and analytics across marketing and logistics.",
  },
  {
    title: "Data-driven decisions",
    body: "Forecasted ad performance, analysed keyword trends, predicted inventory gaps.",
  },
  {
    title: "Technical excellence",
    body: "Top performer for five straight months on accuracy, speed, and feedback at John Lewis.",
  },
];
