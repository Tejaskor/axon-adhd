# AXON ADHD — Next.js site

A Next.js rebuild of [axonadhd.com](https://www.axonadhd.com) (WordPress + Elementor). It reproduces the original pages, copy, design tokens, assets, CTAs and SEO. All text lives in typed content files, so you can edit copy without touching components.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — the site works without any env vars
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build (prerenders every page) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`next/core-web-vitals` + TypeScript rules) |

Requires Node 20+.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components + Partial Prerendering), **React 19**, **TypeScript (strict)**
- **Tailwind CSS v4**. Design tokens are in `tailwind.config.ts` (loaded through `@config`) and mirrored as CSS variables in `src/styles/globals.css`.
- `next/font` (Roboto, Manrope, Inter) and `next/image` for every image
- `react-hook-form` + `zod` for forms, with the same schemas validating on the server
- `lucide-react` icons, plus inline SVG for the social brand icons
- Resend or Nodemailer for contact email, with a console fallback

> **Animation:** scroll reveals use CSS scroll-driven animations (`.reveal` in `globals.css`) rather than Framer Motion. Content is always visible without JavaScript, the effect is off for `prefers-reduced-motion`, and no animation JS ships to the client.

## Environment variables

All variables are optional. See `.env.example`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (default `https://www.axonadhd.com`) |
| `CONTACT_TO_EMAIL` | Recipient for contact-form submissions |
| `CONTACT_FROM_EMAIL` | Sender address (must be verified with your provider) |
| `RESEND_API_KEY` | Use Resend to send contact emails |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Use SMTP instead (when no Resend key is set) |
| `NEWSLETTER_PROVIDER` | `console` (default) or `mailchimp` |
| `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID` | Mailchimp adapter |

If neither email provider is configured, contact submissions are logged to the server console and the user still sees the success modal.

## Folder map

```
public/
  images/{brand,hero,services,trust,blog,badges}/   original assets from wp-content/uploads
  icons/                                            favicons
  videos/                                           hero + service clips
src/
  app/                    routes (one folder per original WordPress slug)
    api/contact, api/newsletter   POST endpoints (zod validation, honeypot, rate limit)
    blog/[slug]                   blog post template (statically generated)
    sitemap.ts, robots.ts, not-found.tsx
  components/
    layout/    AnnouncementBar, Header (+ MegaMenu, MobileNav), Footer
    sections/  home sections + PageSections (renders inner pages from content)
    ui/        Button, Container, SectionHeading, Accordion, Card, Badge, Input, Textarea, PhoneInput, Modal, RichText, Reveal
    forms/     ContactForm, NewsletterForm
  content/     ALL copy: site, nav, home, pricing, trust, faqs, blogs, case-studies, pages/*, legal/*, posts/*
  lib/         seo (metadata + JSON-LD), utils, validators, mailer, newsletter, rate-limit
  styles/      globals.css
```

## Editing content

- **Contact details, social links, CTA URLs:** `src/content/site.ts`. Every "Start Free ADHD Screening" and "Take Comprehensive ADHD Evaluation" button reads `links`/`ctas` from here.
- **Navigation, mega menus, footer links:** `src/content/nav.ts`
- **Home page copy:** `src/content/home.ts`
- **Prices:** `src/content/pricing.ts`. Set the base `price`; the 10% early-payment price and the savings are computed in code (`EARLY_DISCOUNT`).
- **Reviews, partner logos, compliance badges:** `src/content/trust.ts`
- **FAQs:** `src/content/faqs.ts` (`homeFaqs` plus the three tabs on `/adhd-faqs`, which the referral pages reuse)
- **Inner pages:** `src/content/pages/*.ts`. Each page is an ordered list of typed sections (`hero`, `features`, `steps`, `split`, `cta`, `quotes`, `badges`, `faq`, `blogs`, `contact`). Reorder, add or remove entries freely.
- **Legal pages:** `src/content/legal/*.ts`

Long text supports two inline marks: `**bold**` and `[link text](/path-or-url)`.

## Adding a blog post

1. Put the cover image in `public/images/blog/`.
2. Create `src/content/posts/<slug>.ts`:
   ```ts
   import type { Block } from "../types";
   export const body: Block[] = [
     { type: "p", text: "Intro paragraph with a [link](/adhd-faqs/)." },
     { type: "h2", text: "A section heading" },
     { type: "ul", items: ["First point", "**Bold** point"] },
     { type: "h2", text: "Frequently Asked Questions" },   // optional: becomes an accordion + FAQPage JSON-LD
     { type: "q", text: "1. A question?" },
     { type: "p", text: "Its answer." },
   ];
   ```
3. Import it in `src/content/blogs.ts` and add an entry (slug, title, ISO date, excerpt, description, image, tags).

The post is statically generated, appears in `/blog`, "Latest Blogs" and `sitemap.xml`, and gets a table of contents, BlogPosting and Breadcrumb JSON-LD.

## SEO & accessibility

- Per-page `metadata`: title, description, canonical, OpenGraph, Twitter. The home title and description match the live site.
- JSON-LD: MedicalBusiness/Organization (Arlington, VA address and phone) site-wide, plus FAQPage, BlogPosting and BreadcrumbList.
- `trailingSlash: true` keeps the WordPress URL format; non-slash URLs 308-redirect.
- Skip link, semantic landmarks, one `<h1>` per page, visible focus rings, labelled fields, an `aria-expanded` accordion, WAI-ARIA tabs, and native `<dialog>` for the mobile menu and success modal (focus trap and ESC to close).

## Deploying to Vercel

1. Push the repo to GitHub/GitLab and import it at [vercel.com/new](https://vercel.com/new). The framework preset is detected automatically.
2. Add the environment variables you need under Project → Settings → Environment Variables.
3. Deploy, then add `www.axonadhd.com` under Project → Domains and update DNS.
4. **Rate limiting:** the in-memory limiter in `src/lib/rate-limit.ts` is per-instance. For production traffic on serverless, swap its store for Upstash Redis or Vercel KV.

See `PLAN.md` for the extracted design tokens and decisions, and `ASSETS_TODO.md` for anything not yet migrated.
