# Assets & content TODO

## Assets

All 127 referenced images (incl. 9 reviewer avatars), 5 videos and the favicon set were downloaded from `wp-content/uploads` (originals, with the `al_opt_content/…bv.webp` optimizer wrappers removed). No placeholders were needed.

| Item | Status |
|---|---|
| Google reviewer avatars (`public/images/trust/reviews/*.png`) | Downloaded at 96px from `lh3.googleusercontent.com`. Re-pull them if reviewers change their photos. |
| Partner logos `logo10.webp`, `logo11.webp` | No descriptive alt text on the live site ("logo10/11"); given generic "Partner logo" alt text. **Please supply the organization names.** |
| Hero video `public/videos/hero-section-new-2.webm` (2.4 MB) | Consider an MP4/H.264 fallback for older Safari, and a smaller mobile rendition. |
| Service clips (`patient.mp4`, …) | Original files (0.6–1.8 MB). Load lazily with `preload="none"`. |

## Content not yet migrated (linked from migrated pages)

These pages exist on the live site but were outside this rebuild's page list. Links to them currently 404 locally, or point at the live site:

- **Case-study detail pages:** `/case-study/<slug>/` (5 stories). The `/case-studies` cards link to the live WordPress URLs. Migrate them like blog posts, then change `caseStudiesPage.baseUrl` in `src/content/case-studies.ts`.
- **Other blog posts referenced inline:** `adhd-in-adults`, `adhd-in-women`, `adhd-symptoms-in-adults-the-18-most-common-signs-to-know`, `adhd-treatment-for-adults-what-actually-works`, `adhd-medication-for-adults`, `alternative-treatments-for-adhd`, `impact-of-adhd-at-work`, `undiagnosed-adhd-in-adults`, `adhd-vs-anxiety`, `adhd-fraternity-life`, `do-i-have-adult-adhd-take-a-free-screening-to-find-out` (plus the remaining archive pages 2–5). Add each via `src/content/posts/` (see README → "Adding a blog post").
- **Blog category and author archives** (`/blog/category/*`, `/blog/author/*`) redirect to `/blog/` (see `next.config.ts`).

## Copy that was carried over verbatim but may need a review

The live site has these as published; they were kept exactly as-is per the brief:

- Home: "1 % OnlineTesting", "No Traffic, No Hassel", "free case study’s".
- Home FAQ: the live site has **14** questions, not the 16 the brief listed.
- University referral: "Affordable Diagosis".
- `/blog/adhd-myths-and-facts`: the live post opens with the first three paragraphs of the sleep post (also the listing excerpt).
- About: "At AXON adhd evaluation process Digital Health, …".
