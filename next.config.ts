import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Vercel's /_next/image endpoint answers 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) once the account's image-optimization
    // quota is used up, which blanks every <Image>. The sources in /public are already compressed WebP (<0.5 MB each), so they
    // are served straight from the CDN instead. Remove this line if the plan's optimization quota is raised.
    unoptimized: true,
  },
  // Preserve WordPress URLs that had trailing slashes / alternate spellings.
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/blog/author/:slug*", destination: "/blog/", permanent: true },
      { source: "/blog/category/:slug*", destination: "/blog/", permanent: false },
    ];
  },
};

export default nextConfig;
