import type { ImageAsset } from "./types";

export type CaseStudy = {
  slug: string;
  title: string;
  date: string;
  time: string;
  excerpt: string;
  image: ImageAsset;
  dataExcerpt?: string;
  keywords?: string;
  category?: string;
  rawDate?: string;
  localHref?: string;
};

/**
 * Detail pages for all 5 case studies are created locally in Next.js.
 */
export const caseStudiesPage = {
  title: "ADHD Case Studies: Real Adult Diagnosis Stories",
  subtitle: "Stories of Strategic Impact",
  description: "Real patient journeys and real ADHD success stories — adults who found clarity after years of misdiagnosis through AXON ADHD’s comprehensive evaluation.",
  hero: { src: "/images/hero/case-studies-hero.webp", alt: "Real Stories, Real Progress", width: 1672, height: 941 },
  baseUrl: "https://www.axonadhd.com/case-study/",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "diagnosed-in-days-after-20-years-of-waiting",
    title: "Diagnosed in Days, After 20 Years of Waiting",
    date: "Aug 20, 2026",
    time: "7:50 pm",
    excerpt: "Ryan's idea of control was a system of color-coded folders, calendar reminders stacked high, and a vision board he'd rewrite on Sundays ... “This is the week it all works out!”",
    dataExcerpt: "Ryan's idea of control was a system of color-coded folders, calendar reminders, and a vision board.",
    keywords: "high performing, organized, professional",
    category: "ADHD Adult",
    rawDate: "2026-08-20",
    localHref: "/case-study/undiagnosed-adult-adhd-diagnosis/",
    image: { src: "/images/blog/case-study-undiagnosed-adult-adhd-20-years-cover.webp", alt: "Diagnosed in Days, After 20 Years of Waiting", width: 1672, height: 941 },
  },
  {
    slug: "missed-for-decades-a-womans-adhd-diagnosis-at-age-41",
    title: "Missed for Decades: A Woman's ADHD Diagnosis at Age 41",
    date: "Aug 05, 2026",
    time: "6:50 pm",
    excerpt: "Elena was doing just fine, or so everyone thought. A senior marketing manager, a mother of two, and the friend who always remembered everyone's birthday",
    dataExcerpt: "Elena was doing just fine, or so everyone thought.",
    keywords: "women, misdiagnosed, adult adhd",
    category: "ADHD Adult",
    rawDate: "2026-08-05",
    localHref: "/case-study/missed-for-decades-a-womans-adhd-diagnosis-at-age-41/",
    image: { src: "/images/blog/case-study-missed-for-decades-diagnosis-at-41-cover.webp", alt: "Missed for Decades: A Woman's ADHD Diagnosis at Age 41", width: 1725, height: 912 },
  },
  {
    slug: "can-you-be-successful-organized-and-still-have-adhd",
    title: "Can You Be Successful, Organized, and Still Have ADHD?",
    date: "July 30, 2026",
    time: "8:40 pm",
    excerpt: "A high-performing professional always had systems for everything, except the one thing driving them",
    dataExcerpt: "A high-performing professional always had systems for everything, except the one thing driving them.",
    keywords: "high performing, organized, professional",
    category: "ADHD Adult",
    rawDate: "2026-07-30",
    localHref: "/case-study/can-you-be-successful-organized-and-still-have-adhd/",
    image: { src: "/images/blog/case-study-successful-organized-still-adhd-cover.webp", alt: "Can You Be Successful, Organized, and Still Have ADHD?", width: 1729, height: 910 },
  },
  {
    slug: "from-army-mechanic-to-entrepreneur-a-veterans-undiagnosed-adhd-story",
    title: "From Army Mechanic to Entrepreneur: A Veteran's Undiagnosed ADHD Story",
    date: "July 23, 2026",
    time: "9:00 pm",
    excerpt: "After the Army, Marcus struggled with civilian life until an AXON evaluation revealed combined-type",
    dataExcerpt: "After the Army, Marcus struggled with civilian life until an AXON evaluation revealed combined-type ADHD.",
    keywords: "veteran, military, undiagnosed, entrepreneur",
    category: "Undiagnosed ADHD",
    rawDate: "2026-07-23",
    localHref: "/case-study/veteran-adhd-army-mechanic-entrepreneur/",
    image: { src: "/images/blog/case-study-veteran-army-mechanic-entrepreneur-cover.webp", alt: "From Army Mechanic to Entrepreneur: A Veteran's Undiagnosed ADHD Story", width: 1746, height: 901 },
  },
  {
    slug: "i-thought-it-was-anxiety-it-was-adhd-at-39",
    title: "I Thought It Was Anxiety, It Was ADHD at 39",
    date: "July 6, 2026",
    time: "10:15 pm",
    excerpt: "If you've been wondering whether your symptoms are caused by ADHD, anxiety, or both, you're",
    dataExcerpt: "If you've been wondering whether your symptoms are caused by ADHD, anxiety, or both, you're not alone.",
    keywords: "anxiety, misdiagnosis, adult adhd, symptoms",
    category: "ADHD Adult",
    rawDate: "2026-07-06",
    localHref: "/case-study/i-thought-it-was-anxiety-it-was-adhd-at-39/",
    image: { src: "/images/blog/case-study-anxiety-or-adhd-at-39-cover.webp", alt: "I Thought It Was Anxiety, It Was ADHD at 39", width: 1536, height: 1024 },
  },
];
