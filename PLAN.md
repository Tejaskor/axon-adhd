# AXON ADHD — Next.js Rebuild Plan

Source: https://www.axonadhd.com/ (WordPress + Elementor, inspected 2026-10-20).
All 18 pages fetched (HTTP 200) plus per-page Elementor CSS (`post-*.css`), header (`post-12311`) and footer (`post-6632`) CSS.

## 1. Design tokens (extracted from live CSS — not guessed)

| Token | Value | Where it's used |
|---|---|---|
| `primary` | `#256ACC` | Buttons, links, icons (most-used color, 78× in home CSS) |
| `primary-hover` | `#1A56A8` | Button hover |
| `primary-deep` | `#10458D` | H1 accent span ("It's an Identity Problem.") |
| `navy` | `#0B254B` | Section headings |
| `ink` | `#1A2748` | Hero H1 |
| `ink-2` / `ink-3` | `#30353A` / `#1E242A` | Body headings, card titles |
| `body` | `#4B5563` | Hero subtext, paragraphs |
| `muted` | `#5B6B84` / `#70777D` | Mega-menu descriptions, meta |
| `teal` | `#0D7C66` | Checkmarks, "Most popular", success |
| `orange` | `#EB8B01` | Accent badges, stars |
| `green-bar` | radial `#068E5A → #003621` | Announcement bar |
| `surface` | `#F2F6F9`, `#F8F9FB`, `#EFF6FF`, `#EEFBF7`, `#FFF7EB` | Section backgrounds |
| `line` | `#EEF0F2`, `#E5E7EB`, `#D1DEEA` | Borders |
| `footer-bg` | `#061A36` / `#1D3C67` | Footer |

**Fonts** (all via `next/font/google`):
- **Roboto**, weights 400/500/600/700: body, most headings, nav (`--font-menu`).
- **Manrope**, weights 500/600/700/800: hero H1, display headings.
- **Inter**, weights 400/500/600/700: header shell and announcement bar (`--font`, `--ann-font`).

**Type scale** (desktop → tablet → mobile):
- Hero H1: Manrope 700, 50px / 1.5, letter-spacing −1px → 40px / 1.2 → 28px → 24px / 35px.
- Section H2: 40px → 32px → 28px → 24px.
- Body: 16–18px. Small text: 14–15px.

**Layout:**
- Content width 1340px (`--content-width`); the header bar is `min(1340px, 100vw - 32px)`.
- Breakpoints: 480, 767, 1024, 1180 (desktop nav collapses), 1439.
- Radii: 12, 14, 16, 18 and 50px (pill buttons).
- Shadows: `0 0 10px rgba(0,0,0,.04)` (cards), `0 8px 20px rgba(37,99,235,.32)` (primary CTA), `0 24px 60px rgba(15,27,46,.16)` (mega-menu glass panel).
- Easing: `cubic-bezier(.22,.61,.36,1)`.

## 2. Deviations from the brief (decide before I go further)

1. **Project root:** the repo is already a Next 16.4.2 app, so I build at the repo root instead of creating a nested `axonadhd-next/`. Existing `app/` moves to `src/app/`.
2. **Tailwind v4** is installed. Tokens live in `tailwind.config.ts`, which is loaded through `@config` in `src/styles/globals.css`, and are mirrored as CSS variables in `globals.css`.
3. **`next.config.ts`** is kept instead of `next.config.mjs`. The existing file already enables `cacheComponents`, `partialPrefetching` and the turbopack Tailwind loader, and the typed config is safer. It can be renamed if you want `.mjs`.
4. **Animation without Framer Motion:** scroll reveals are CSS scroll-driven animations (`animation-timeline: view()`). Framer Motion server-rendered content at `opacity: 0` until hydration, which left sections blank without JS, for screenshot tools and for some crawlers. The CSS version is progressive enhancement and ships zero client JS.
5. **Next 16 conventions:** before writing code I read `node_modules/next/dist/docs/` (per `AGENTS.md`). Typed `PageProps`/`LayoutProps` helpers, async `params`, and Cache Components rules apply.

## 3. Pages (same slugs)

| Route | Source sections (from live H1/H2s) |
|---|---|
| `/` | 19 home sections (spec §5) |
| `/comprehensive-adhd-assessment` | Hero, trust strip (4 badges), 3-step "Diagnosis to Thriving", free-assessment learnings, How It Works, CTA, "Understanding ADHD with Confidence", FAQ, blogs, contact |
| `/adhd-care` | Hero, 4 badges, Medications / Coaching / Self Care / Psychotherapy, "Haven't Started Yet?", Path to Success, Practical Tools, CTA, blogs, contact |
| `/accommodation-documentation-advocacy` | Hero, "Not Another Evaluation", package list, optional add-on, clinician work, "Who is this for?", CTA, blogs |
| `/adhd-referral-for-universities` | Hero, compliance, Why Partner, Hidden ADHD Gap stats, Untreated impact, cost on campus, referral flow steps, testimonials, form CTA |
| `/referral-adhd-partners` | Same template as universities, with PCP copy and stats |
| `/about-adhd-evaluation` | Hero, mission (3 pillars), name story, connecting patients, science & compassion, why clinics choose, barriers, seamless solutions, founder |
| `/adhd-faqs` | Full FAQ list (accordion + JSON-LD) |
| `/case-studies` | Hero + case-study cards |
| `/blog`, `/blog/[slug]` | Listing + post template (TOC, author box "Dr. Aaron Dodini", FAQ, free-guide CTA) |
| `/trust-center` | Verifications, protections, data residency, evidence reports, FAQ, CTA |
| `/terms-conditions`, `/axon-adhd-privacy-policy`, `/telehealth-policy` | Long-form legal; shared `LegalPage` template driven by content data |
| `/sitemap` | Quick Links / Company / Legal |
| `not-found`, `sitemap.ts`, `robots.ts`, `api/contact`, `api/newsletter` | — |

## 4. Components

- **layout/**: `AnnouncementBar`, `Header` (sticky; shadow and shrink on scroll), `MegaMenu` (glass panel with a featured card), `MobileNav` (drawer with focus trap, ESC to close, accordion submenus), `Footer`.
- **sections/**: the 17 listed in the brief, plus shared inner-page blocks: `PageHero`, `FeatureGrid`, `StatGrid`, `StepsRow`, `ImageTextSplit`, `CTABand`.
- **ui/**: `Button`, `Container`, `SectionHeading`, `Accordion`, `Card`, `Badge`, `Input`, `Textarea`, `PhoneInput`, `Modal`, `Reveal` (CSS scroll-driven fade-up, reduced-motion aware).
- **forms/**: `ContactForm` (react-hook-form + zod, honeypot, success modal), `NewsletterForm`.
- **content/**: `site.ts`, `nav.ts`, `faqs.ts`, `pricing.ts` (base prices; discount computed in code), `trust.ts` (logos, badges, reviews), `blogs.ts`, plus `pages/*.ts` for inner-page copy and `legal/*.ts`.
- **lib/**: `seo.ts` (metadata builder + JSON-LD), `utils.ts` (`cn`, money, dates), `validators.ts` (zod schemas shared by client and server), `rate-limit.ts`, `mailer.ts` (Resend → SMTP → console fallback), `newsletter.ts` (provider adapter).

## 5. Data notes

- **Testimonials** are a server-rendered Trustindex Google widget: 9 reviews, extracted verbatim to `content/trust.ts`. Avatars point at `lh3.googleusercontent.com`; I'll download them locally if reachable, otherwise use initials.
- **Logo marquee:** 15 logos (`2026/06/logo1–15.webp`, `gw.webp`, `hryabhrje4nufpnwxpox.webp`).
- **Hero:** background video `2026/08/hero-section-new-2.webm` (hidden on mobile) with poster `herofollback.webp`.
- **Images** are served through a BV optimizer (`al_opt_content/...bv.webp`); originals are fetched from the unwrapped `wp-content/uploads/...` path. Manifest: 150+ originals.

## 6. Build order

1. `npm install` and add deps (framer-motion, lucide-react, react-hook-form, zod, @hookform/resolvers, resend, nodemailer). Read the Next 16 docs.
2. Restructure to `src/`, set up tokens/fonts/globals, `.env.example`.
3. Download assets → `public/images/**`; record failures in `ASSETS_TODO.md`.
4. UI primitives → layout (announcement, header, mega menu, mobile nav, footer).
5. Content files → home sections in order (§5.1–5.19).
6. API routes (contact, newsletter), mailer, rate limiter.
7. Inner pages (service → referral → about → FAQs → case studies → blog → trust → legal → sitemap).
8. SEO: metadata, JSON-LD, `sitemap.ts`, `robots.ts`, favicons, 404.
9. `npm run build` and `npm run lint` until clean; then dev-server visual comparison at 1440/1024/768/390.
10. README, final report.
