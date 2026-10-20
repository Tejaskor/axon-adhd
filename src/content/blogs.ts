import type { Block, Faq, ImageAsset } from "./types";
import { body as sleepBody } from "./posts/adhd-and-sleep-problems";
import { body as mythsBody } from "./posts/adhd-myths-and-facts";
import { body as womenBody } from "./posts/adhd-therapy-for-women";

export type BlogPost = {
  slug: string;
  title: string;
  /** ISO date (UTC) the post was published on the original site. */
  date: string;
  author: string;
  excerpt: string;
  description: string;
  image: ImageAsset;
  tags: string[];
  body: Block[];
};

export const author = {
  name: "Dr. Aaron Dodini",
  shortName: "Aaron Dodini",
  title: "Ph.D. Licensed Clinical Psychologist,Founder, AXON ADHD",
  image: { src: "/images/blog/meet-our-Dr-aron.png", alt: "Dr. Aaron Dodini", width: 243, height: 243 },
};

/**
 * Add a post: create `content/posts/<slug>.ts` exporting `body: Block[]`,
 * drop the cover image in `public/images/blog/`, then add an entry here.
 * Posts are sorted by date (newest first) wherever they are listed.
 */
const posts: BlogPost[] = [
  {
    slug: "adhd-and-sleep-problems",
    title: "ADHD and Sleep Problems: What’s Really Keeping You Up?",
    date: "2026-10-16T06:27:00Z",
    author: author.shortName,
    excerpt: "Ever feel exhausted all day but suddenly wide awake when it is time to go",
    description:
      "Why adults with ADHD struggle to fall asleep and wake up, common sleep problems that occur with ADHD, and small changes that make bedtime easier.",
    image: { src: "/images/blog/adhd-sleep-problems-what-keeps-you-up.webp", alt: "ADHD and Sleep Problems: Understanding What Keeps You Awake", width: 1672, height: 941 },
    tags: ["ADHDAwareness", "SleepHealth", "AdultADHD", "Insomnia", "ADHDTreatment", "HealthySleepHabits"],
    body: sleepBody,
  },
  {
    slug: "adhd-myths-and-facts",
    title: "ADHD Myths and Facts: 15 Myths Worth Retiring This October",
    date: "2026-10-11T04:47:00Z",
    author: author.shortName,
    excerpt: "Ever feel exhausted all day but suddenly wide awake when it is time to go",
    description: "Fifteen common ADHD myths — about who gets ADHD, what causes it, and how it is treated — and the facts that replace them.",
    image: { src: "/images/blog/adhd-myths-and-facts-15-myths-october.webp", alt: "adhd-myths-and-facts-15-myths-october", width: 2048, height: 1366 },
    tags: ["ADHD", "ADHDAwareness", "ADHDMyths", "ADHDFacts", "AdultADHD", "ADHDAwarenessMonth", "Neurodiversity"],
    body: mythsBody,
  },
  {
    slug: "adhd-therapy-for-women",
    title: "ADHD Therapy for Women: Which Type Works Best",
    date: "2026-09-23T12:37:00Z",
    author: author.shortName,
    excerpt: "You make a plan, grab a new planner, and vow this week will be different.",
    description: "Comparing therapy, coaching and other support options for women with ADHD, and how to choose the approach that fits you.",
    image: {
      src: "/images/blog/ADHD-Therapy-for-Women.webp",
      alt: "ADHD Therapy for Women: Which Type Works Best: a woman sitting at a desk looking distracted, with visual icons representing inattention, impulsivity, restlessness, and emotional dysregulation.",
      width: 2048,
      height: 1365,
    },
    tags: ["ADHDTherapyForWomen", "ADHDInWomen", "WomenWithADHD", "AdultADHD", "ADHDTreatment", "ADHDCoaching"],
    body: womenBody,
  },
];

export const blogPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

/** Splits a post body into article content and the trailing FAQ (rendered as an accordion). */
export function splitPostFaq(body: Block[]): { content: Block[]; faqs: Faq[] } {
  const idx = body.findIndex((b) => b.type === "h2" && /frequently asked questions/i.test(b.text));
  if (idx === -1) return { content: body, faqs: [] };
  const faqs: Faq[] = [];
  for (const block of body.slice(idx + 1)) {
    if (block.type === "q") faqs.push({ q: block.text.replace(/^\d+\.\s*/, ""), a: [] });
    else if (faqs.length) faqs[faqs.length - 1].a.push(block);
  }
  return { content: body.slice(0, idx), faqs };
}

export const blogPage = {
  title: "The AXON ADHD Blog",
  intro: "Expert-written guides on symptoms, focus strategies, and living well with ADHD — clear, practical, and clinically grounded.",
  hero: { src: "/images/hero/The-AXON-ADHD-Blog-Banner.webp", alt: "The AXON ADHD Blog", width: 1671, height: 941 },
  categories: ["ADHD", "ADHD in Adults", "ADHD Symptoms", "ADHD Testing Costs", "ADHD Treatment", "Mental health"],
  freeGuide: { title: "Free Guide to ADHD Diagnosis", cta: "Download Now" },
};
