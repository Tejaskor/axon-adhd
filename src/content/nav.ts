import type { Cta, ImageAsset } from "./types";

export type MegaLink = { label: string; description: string; href: string; icon: "assessment" | "care" | "advocacy" | "university" | "pcp" | "blog" | "case" };

export type NavItem =
  | { label: string; href: string; kind: "link" }
  | {
      label: string;
      href: string;
      kind: "mega";
      eyebrow: string;
      links: MegaLink[];
      featured: { image: ImageAsset; title: string; text: string; cta: Cta };
    };

export const mainNav: NavItem[] = [
  {
    kind: "mega",
    label: "Services",
    href: "/comprehensive-adhd-assessment/",
    eyebrow: "Our Services",
    links: [
      { label: "ADHD Assessments", description: "Comprehensive evaluations for accurate ADHD diagnosis.", href: "/comprehensive-adhd-assessment/", icon: "assessment" },
      { label: "ADHD Care", description: "Personalized treatment and ongoing support for lasting success.", href: "/adhd-care/", icon: "care" },
      { label: "Accommodation & Advocacy", description: "Reports that meet ADA & Section 504 standards.", href: "/accommodation-documentation-advocacy/", icon: "advocacy" },
    ],
    featured: {
      image: { src: "/images/services/servicedropdown.webp", alt: "Comprehensive ADHD Assessment", width: 1774, height: 887 },
      title: "Comprehensive ADHD Assessment",
      text: "Documentation and advocacy for school and workplace accommodations.",
      cta: { label: "View ADHD Assessment", href: "/comprehensive-adhd-assessment/" },
    },
  },
  {
    kind: "mega",
    label: "Referral",
    href: "/adhd-referral-for-universities/",
    eyebrow: "Refer to AXON",
    links: [
      { label: "Referral University", description: "Educational resources for healthcare professionals.", href: "/adhd-referral-for-universities/", icon: "university" },
      { label: "Referral PCP", description: "Resources and guidance for primary care providers.", href: "/referral-adhd-partners/", icon: "pcp" },
    ],
    featured: {
      image: { src: "/images/services/refraluniversity.webp", alt: "Become a Referral Partner", width: 1484, height: 1060 },
      title: "Become a Referral Partner",
      text: "Give your patients, students, and clients a fast, reliable ADHD pathway. Tell us about your practice and we'll tailor it.",
      cta: { label: "Learn More About Referral University", href: "/adhd-referral-for-universities/" },
    },
  },
  {
    kind: "mega",
    label: "Resources",
    href: "/blog/",
    eyebrow: "Learn & Explore",
    links: [
      { label: "Blogs", description: "Stay informed with expert ADHD insights and tips.", href: "/blog/", icon: "blog" },
      { label: "Case Studies", description: "Real patient journeys. Real ADHD success stories.", href: "/case-studies/", icon: "case" },
    ],
    featured: {
      image: { src: "/images/services/serviceblog.webp", alt: "ADHD Guides and Articles", width: 1492, height: 1054 },
      title: "ADHD Guides & Articles",
      text: "Expert-written guides on symptoms, focus strategies, and living well with ADHD — clear, practical, and clinically grounded.",
      cta: { label: "Explore Our ADHD Blog", href: "/blog/" },
    },
  },
  { kind: "link", label: "About", href: "/about-adhd-evaluation/" },
];

export const footerNav = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "ADHD Assessments", href: "/comprehensive-adhd-assessment/" },
    { label: "ADHD Care", href: "/adhd-care/" },
    { label: "Referral University", href: "/adhd-referral-for-universities/" },
    { label: "Referral PCP", href: "/referral-adhd-partners/" },
  ],
  company: [
    { label: "About", href: "/about-adhd-evaluation/" },
    { label: "FAQs", href: "/adhd-faqs/" },
    { label: "Blog", href: "/blog/" },
    { label: "Testimonials", href: "/#Testimonials" },
    { label: "Contact Us", href: "/#contact" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms-conditions/" },
    { label: "Privacy Policy", href: "/axon-adhd-privacy-policy/" },
    { label: "Telehealth Policy", href: "/telehealth-policy/" },
    { label: "Site Map", href: "/sitemap/" },
  ],
} satisfies Record<string, Cta[]>;
