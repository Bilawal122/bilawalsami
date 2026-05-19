import type { Status } from "@/components/StatusBadge";

export interface FeaturedProject {
  id: string;
  index: string;
  total: string;
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

export const FEATURED: FeaturedProject[] = [
  {
    id: "notesnap",
    index: "001",
    total: "003",
    name: "NoteSnap",
    statuses: ["ACADEMIC", "IN DEV"],
    role: "Solo build",
    oneLiner:
      "Drop a lecture slide, a PDF or a YouTube link in. Get back flashcards, a quiz, and something you can ask questions to.",
    stack: ["React Native", "Expo", "Supabase", "TypeScript"],
    what: [
      "I wrote every line. Auth and a Postgres schema with row-level security. Six ways to feed content in: camera, PDF, slides, Word doc, URL, YouTube.",
      "SM-2 spaced repetition. A tutor with six tools that can quiz you, recite, summarise, or argue with you. Streaks and XP to keep coming back.",
      "Wrote the dissertation off the back of it. 108 pages, predicted First.",
    ],
  },
  {
    id: "tally",
    index: "002",
    total: "003",
    name: "Tally",
    statuses: ["LIVE"],
    role: "Solo build",
    oneLiner: "Calorie tracking with no food database. Type what you ate. Speak it. Get your macros.",
    stack: ["React Native", "Expo", "Supabase", "RevenueCat"],
    what: [
      "Onboarding quiz, the parser that turns 'two slices of toast' into 198 kcal and 6g of protein, daily tracking screens.",
      "Subscription paywall through RevenueCat. Auth and storage on Supabase.",
      "Already on the App Store. The demo above uses the same parser, with a tighter rate limit.",
    ],
  },
  {
    id: "arisecode",
    index: "003",
    total: "003",
    name: "AriseCode",
    statuses: ["LIVE"],
    role: "Solo build",
    oneLiner: "Describe the site you want. It writes the React and Tailwind. You change anything by typing more.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    what: [
      "Two stages. The prompt becomes a spec, the spec becomes JSX. The template engine guarantees it compiles.",
      "Preview renders in the browser as the code lands. One click to push to GitHub and deploy on Vercel.",
      "Twenty-three section types. All of them compile. No half-baked outputs.",
    ],
  },
];

export const MORE: MoreProject[] = [
  {
    id: "SIDE-01",
    name: "Go Ride",
    statuses: ["CLIENT", "LIVE"],
    oneLiner:
      "Private-hire rental site for a taxi firm in Rochdale. Fleet browser, pricing, WhatsApp lead capture.",
    stack: "Next.js, Tailwind, Vercel",
    note: "Paid freelance build.",
  },
  {
    id: "SIDE-02",
    name: "JetLagPro",
    statuses: ["BETA"],
    oneLiner:
      "Tells you when to sleep, when to look at light, when to drink coffee before a long flight, so you don't feel awful when you land.",
    stack: "React Native, Expo, RevenueCat",
  },
  {
    id: "SIDE-03",
    name: "ResumeHax",
    statuses: ["LIVE"],
    oneLiner: "Paste a job description and your CV. Get one tuned for that role and a cover letter that doesn't sound like a template.",
    stack: "Next.js, Node, Postgres",
  },
  {
    id: "SIDE-04",
    name: "Gesture Control",
    statuses: ["IN DEV"],
    oneLiner:
      "Wave at your webcam to control your computer. Real time, runs offline. Mostly an excuse to write some Python with OpenCV.",
    stack: "Python, OpenCV, MediaPipe",
  },
  {
    id: "SIDE-05",
    name: "Exam Guide",
    statuses: ["IN DEV"],
    oneLiner: "Quizzes and flashcards from my own notes. Built it during finals because the existing apps were slow.",
    stack: "Next.js",
  },
  {
    id: "SIDE-06",
    name: "PromptForge",
    statuses: ["LIVE"],
    oneLiner: "Takes a rough idea and turns it into a clean, reusable prompt. Saves me typing the same boilerplate every time.",
    stack: "Next.js, Tailwind",
  },
  {
    id: "SIDE-07",
    name: "HPC Classifier",
    statuses: ["ACADEMIC"],
    oneLiner:
      "Transformer text classifier I trained from scratch on the university's HPC. Looked into why it makes its calls using SHAP, LIME, and attention probing.",
    stack: "PyTorch, BERT, Slurm",
  },
  {
    id: "SIDE-08",
    name: "Seraphize",
    statuses: ["BUSINESS"],
    oneLiner:
      "My Amazon FBA business across the UK and EU. £100k+ a year. I'm the founder, director, and the whole ops team.",
    stack: "Amazon SP-API, analytics, forecasting",
    note: "Role only.",
  },
];
