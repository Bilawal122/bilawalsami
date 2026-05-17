import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    // pin workspace root to this project to silence the multi-lockfile warning
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
