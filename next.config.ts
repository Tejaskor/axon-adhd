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
