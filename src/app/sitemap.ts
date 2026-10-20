import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blogs";
import { site } from "@/content/site";

const staticPaths = [
  "/",
  "/comprehensive-adhd-assessment/",
  "/adhd-care/",
  "/accommodation-documentation-advocacy/",
  "/adhd-referral-for-universities/",
  "/referral-adhd-partners/",
  "/about-adhd-evaluation/",
  "/adhd-faqs/",
  "/case-studies/",
  "/blog/",
  "/trust-center/",
  "/terms-conditions/",
  "/axon-adhd-privacy-policy/",
  "/telehealth-policy/",
  "/sitemap/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...blogPosts.map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
