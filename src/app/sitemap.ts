import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getPosts } from "@/lib/wordpress";

/**
 * Public, indexable pages and the date their page or content module last changed (from git history, 2026-11-05).
 * Update a date when that page's copy changes. Left out on purpose: /api/*, and /adhd-assessment-lp/ (a near-duplicate
 * paid landing page of /online-adhd-evaluation/).
 */
const staticPages: Array<[path: string, lastModified: string]> = [
  ["/", "2026-11-05"],
  ["/adult-adhd-assessment/", "2026-11-05"],
  ["/online-adhd-evaluation/", "2026-11-05"],
  ["/adhd-care/", "2026-11-05"],
  ["/adhd-accommodations-documentation/", "2026-11-05"],
  ["/adhd-referral-for-universities/", "2026-11-05"],
  ["/adhd-referral-for-primary-care/", "2026-11-05"],
  ["/about-adhd-evaluation/", "2026-11-02"],
  ["/adhd-faqs/", "2026-11-02"],
  ["/case-studies/", "2026-10-27"],
  ["/blog/", "2026-10-27"],
  ["/trust-center/", "2026-10-27"],
  ["/adhd-data-privacy-trust-center/", "2026-11-05"],
  ["/payment/", "2026-11-05"],
  ["/terms-conditions/", "2026-10-20"],
  ["/axon-adhd-privacy-policy/", "2026-11-02"],
  ["/telehealth-policy/", "2026-11-02"],
  ["/sitemap/", "2026-11-05"],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getPosts();
  return [
    ...staticPages.map(([path, lastModified]) => ({ url: `${site.url}${path}`, lastModified, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...blogPosts.map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
