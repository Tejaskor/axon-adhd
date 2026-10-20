import type { ImageAsset } from "./types";

export type CaseStudy = { slug: string; title: string; date: string; time: string; excerpt: string; image: ImageAsset };

/**
 * Detail pages for case studies are not part of this rebuild yet; cards link
 * to the original WordPress URLs (see ASSETS_TODO.md → "Not yet migrated").
 */
export const caseStudiesPage = {
  title: "ADHD Case Studies: Real Adult Diagnosis Stories",
  subtitle: "Stories of Strategic Impact",
  description: "Real patient journeys and real ADHD success stories — adults who found clarity after years of misdiagnosis through AXON ADHD’s comprehensive evaluation.",
  hero: { src: "/images/hero/Real-Stories-Real-Progress.webp", alt: "Real Stories, Real Progress", width: 1672, height: 941 },
  baseUrl: "https://www.axonadhd.com/case-study/",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "diagnosed-in-days-after-20-years-of-waiting",
    title: "Diagnosed in Days, After 20 Years of Waiting",
    date: "Aug 20, 2026",
    time: "7:50 pm",
    excerpt: "Ryan's idea of control was a system of color-coded folders, calendar reminders stacked high, and a vision board he'd rewrite on Sundays ... “This is the week it all works out!”",
    image: { src: "/images/blog/undiagnosed-adhd-adults-20-years.webp", alt: "Diagnosed in Days, After 20 Years of Waiting", width: 1672, height: 941 },
  },
  {
    slug: "missed-for-decades-a-womans-adhd-diagnosis-at-age-41",
    title: "Missed for Decades: A Woman's ADHD Diagnosis at Age 41",
    date: "Aug 05, 2026",
    time: "6:50 pm",
    excerpt: "Elena was doing just fine, or so everyone thought. A senior marketing manager, a mother of two, and the friend who always remembered everyone's birthday",
    image: { src: "/images/blog/Missed-for-Decades-A-Womans-ADHD-Diagnosis-at-Age-41-0A.webp", alt: "Missed for Decades: A Woman's ADHD Diagnosis at Age 41", width: 1725, height: 912 },
  },
  {
    slug: "can-you-be-successful-organized-and-still-have-adhd",
    title: "Can You Be Successful, Organized, and Still Have ADHD?",
    date: "July 30, 2026",
    time: "8:40 pm",
    excerpt: "A high-performing professional always had systems for everything, except the one thing driving them",
    image: { src: "/images/blog/can-you-be-successful-organized-and-still-have-adhd.webp", alt: "Can You Be Successful, Organized, and Still Have ADHD?", width: 1729, height: 910 },
  },
  {
    slug: "from-army-mechanic-to-entrepreneur-a-veterans-undiagnosed-adhd-story",
    title: "From Army Mechanic to Entrepreneur: A Veteran's Undiagnosed ADHD Story",
    date: "July 23, 2026",
    time: "9:00 pm",
    excerpt: "After the Army, Marcus struggled with civilian life until an AXON evaluation revealed combined-type",
    image: { src: "/images/blog/army-mechanic-to-entrepreneur-veteran-undiagnosed-adhd-stor.webp", alt: "From Army Mechanic to Entrepreneur: A Veteran's Undiagnosed ADHD Story", width: 1746, height: 901 },
  },
  {
    slug: "i-thought-it-was-anxiety-it-was-adhd-at-39",
    title: "I Thought It Was Anxiety, It Was ADHD at 39",
    date: "July 6, 2026",
    time: "10:15 pm",
    excerpt: "If you've been wondering whether your symptoms are caused by ADHD, anxiety, or both, you're",
    image: { src: "/images/blog/I-Thought-It-Was-Anxiety—It-Was-ADHD-at-39.webp", alt: "I Thought It Was Anxiety, It Was ADHD at 39", width: 1536, height: 1024 },
  },
];
