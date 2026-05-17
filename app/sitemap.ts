import type { MetadataRoute } from "next";
import { SECTIONS } from "@/lib/sections";

const BASE = "https://bilawalsami.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...SECTIONS.filter((s) => s.id !== "hero").map((s) => ({
      url: `${BASE}/#${s.anchor}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
