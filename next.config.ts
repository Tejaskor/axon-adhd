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
  poweredByHeader: false,
  async headers() {
    // Safe, enforced set. A full script/style CSP is deliberately not enforced: Next's inline bootstrap scripts need per-request
    // nonces, and the YouTube embeds / analytics origins must be allow-listed first (see the security report).
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), usb=(), interest-cohort=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'" },
    ];
    return [
      { source: "/:path*", headers: security },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
  async redirects() {
    return [
      { source: "/blog/author/:slug*", destination: "/blog/", permanent: true },
      // Keyword-optimised URLs (SEO sheet): the previous paths redirect permanently to the new ones.
      { source: "/comprehensive-adhd-assessment", destination: "/adult-adhd-assessment/", permanent: true },
      { source: "/accommodation-documentation-advocacy", destination: "/adhd-accommodations-documentation/", permanent: true },
      { source: "/referral-adhd-partners", destination: "/adhd-referral-for-primary-care/", permanent: true },
      // Renamed brand/hero images (logo, social-share and hero images may be cached or linked from outside the site).
      { source: "/images/brand/Axon-Digital-Health-Ek-Mukta-font-ADHD.webp", destination: "/images/brand/axon-adhd-logo.webp", permanent: true },
      { source: "/images/brand/Understand-ADHD-Find-Your-Next-Step.webp", destination: "/images/brand/axon-adhd-social-share-default.webp", permanent: true },
      { source: "/images/hero/pcpsubmenu.webp", destination: "/images/referral-for-pcp/pcp-referral-trusted-partner-primary-care-providers.webp", permanent: true },
      // Old WordPress URLs still linked from imported blog posts (they 404ed): send them to the matching pages.
      { source: "/adhd-in-adults", destination: "/blog/category/adhd-in-adults/", permanent: true },
      { source: "/adhd-in-women", destination: "/blog/adhd-in-women/", permanent: true },
      { source: "/adhd-symptoms-in-adults-the-18-most-common-signs-to-know", destination: "/blog/adhd-symptoms-in-adults-the-18-most-common-signs-to-know/", permanent: true },
    ];
  },
};

export default nextConfig;
