import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { LenisProvider } from "@/components/LenisProvider";
import { Nav } from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://bilawalsami.vercel.app";
const SITE_NAME = "Bilawal Ullah Sami";
const SITE_DESCRIPTION =
  "Software engineer in Manchester. Building AI tools that ship, not slideware. Final-year CS at Edge Hill, three live AI products, profitable e-commerce on the side.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Software engineer building AI tools that ship`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "Bilawal Ullah Sami",
    "software engineer",
    "AI",
    "XAI",
    "Manchester",
    "Edge Hill",
    "Next.js",
    "React Native",
    "Gemini",
    "NoteSnap",
    "Tally",
    "AriseCode",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Software engineer building AI tools that ship`,
    description: SITE_DESCRIPTION,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Software engineer building AI tools that ship`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  givenName: "Bilawal",
  familyName: "Ullah Sami",
  jobTitle: "Software engineer",
  url: SITE_URL,
  email: "mailto:b.ullahsami@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Manchester",
    addressCountry: "GB",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Edge Hill University",
    sameAs: "https://www.edgehill.ac.uk/",
  },
  sameAs: ["https://github.com/Bilawal122"],
  knowsAbout: [
    "Software engineering",
    "Artificial intelligence",
    "Explainable AI",
    "TypeScript",
    "React Native",
    "Next.js",
    "Python",
    "PyTorch",
    "Gemini",
    "Postgres",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is server-rendered, no user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-ink text-bone selection:bg-signal selection:text-ink">
        <a
          href="#section-000"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-ink focus:px-3 focus:py-2 focus:border focus:border-signal focus:text-signal label-mono"
        >
          Skip to content
        </a>
        <LenisProvider>
          <Nav />
          {children}
          <Footer />
        </LenisProvider>
        <GrainOverlay />
        <Cursor />
      </body>
    </html>
  );
}
