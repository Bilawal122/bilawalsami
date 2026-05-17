import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://bilawalsami.vercel.app/sitemap.xml",
    host: "https://bilawalsami.vercel.app",
  };
}
