import type { Cta, ImageAsset } from "./types";

export type MegaFeatured = { image: ImageAsset; title: string; text: string; cta: Cta };

/** `featured` (optional) is the preview card shown on the right while this link is hovered or focused; without it the menu's default card stays. */
export type MegaLink = { label: string; description: string; href: string; icon: "assessment" | "care" | "advocacy" | "university" | "pcp" | "blog" | "case"; featured?: MegaFeatured };

export type NavItem =
  | { label: string; href: string; kind: "link" }
  | {
      label: string;
      href: string;
      kind: "mega";
      eyebrow: string;
      links: MegaLink[];
      featured: MegaFeatured;
    };

export const mainNav: NavItem[] = [
  {
    kind: "mega",
    label: "Services",
    href: "/comprehensive-adhd-assessment/",
    eyebrow: "Our Services",
    links: [
      { label: "ADHD Assessments", description: "Comprehensive evaluations for accurate ADHD diagnosis.", href: "/comprehensive-adhd-assessment/", icon: "assessment" },
      {
        label: "ADHD Care",
        description: "Personalized treatment and ongoing support for lasting success.",
        href: "/adhd-care/",
        icon: "care",
        featured: {
          image: { src: "/images/header/ADHD%20Care_%20Personalized%20Student%20Support.webp", alt: "ADHD Care: personalized treatment and ongoing support", width: 1774, height: 887 },
          title: "ADHD Care",
          text: "Personalized treatment and ongoing support to improve focus, build structure, and thrive in everyday life.",
          cta: { label: "View ADHD Care", href: "/adhd-care/" },
        },
      },
      {
        label: "Accommodation & Advocacy",
        description: "Reports that meet ADA & Section 504 standards.",
        href: "/accommodation-documentation-advocacy/",
        icon: "advocacy",
        featured: {
          image: { src: "/images/header/ADHD%20Academic%20Support%20Study%20Scene.webp", alt: "ADHD accommodations: academic support, workplace accommodations and personalized recommendations", width: 1672, height: 941 },
          title: "Accommodation & Advocacy",
          text: "Reports that meet ADA & Section 504 standards, with documentation and advocacy for school and work accommodations.",
          cta: { label: "View Accommodation & Advocacy", href: "/accommodation-documentation-advocacy/" },
        },
      },
    ],
    featured: {
      image: { src: "/images/header/Student%20Success_%20Comprehensive%20ADHD%20Support.webp", alt: "Comprehensive ADHD Assessment: in-depth evaluation, personalized plan and ongoing support", width: 1536, height: 1024 },
      title: "Comprehensive ADHD Assessment",
      text: "A clinical evaluation with certified professionals for a clear diagnosis, tailored treatment, and accommodation support.",
      cta: { label: "View ADHD Assessment", href: "/comprehensive-adhd-assessment/" },
    },
  },
  {
    kind: "mega",
    label: "Referral",
    href: "/adhd-referral-for-universities/",
    eyebrow: "Refer to AXON",
    links: [
      {
        label: "Referral University",
        description: "Educational resources for healthcare professionals.",
        href: "/adhd-referral-for-universities/",
        icon: "university",
        featured: {
          image: { src: "/images/referral-for-universities/university-referral-contact-section.webp", alt: "Students looking toward a university hall", width: 1774, height: 887 },
          title: "Referral University",
          text: "Educational resources for healthcare professionals, giving students a fast, reliable ADHD pathway to evaluation and care.",
          cta: { label: "Learn More About Referral University", href: "/adhd-referral-for-universities/" },
        },
      },
      {
        label: "Referral PCP",
        description: "Resources and guidance for primary care providers.",
        href: "/referral-adhd-partners/",
        icon: "pcp",
        featured: {
          image: { src: "/images/hero/pcpsubmenu.webp", alt: "Referral PCP", width: 1533, height: 1026 },
          title: "Referral PCP",
          text: "Resources and guidance for primary care providers, giving patients a fast, reliable ADHD pathway to evaluation and care.",
          cta: { label: "Learn More About Referral PCP", href: "/referral-adhd-partners/" },
        },
      },
    ],
    featured: {
      image: { src: "/images/referral-for-universities/university-referral-contact-section.webp", alt: "Become a Referral Partner: students looking toward a university hall", width: 1774, height: 887 },
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
      {
        label: "Blogs",
        description: "Stay informed with expert ADHD insights and tips.",
        href: "/blog/",
        icon: "blog",
        featured: {
          image: { src: "/images/header/nav-mega-menu-resources-blogs.webp", alt: "ADHD Blog: expert insights on symptoms, focus strategies and living well with ADHD", width: 1672, height: 941 },
          title: "ADHD Blog",
          text: "Expert-written guides on symptoms, focus strategies, and living well with ADHD — clear, practical, and clinically grounded.",
          cta: { label: "Explore Our ADHD Blog", href: "/blog/" },
        },
      },
      {
        label: "Case Studies",
        description: "Real patient journeys. Real ADHD success stories.",
        href: "/case-studies/",
        icon: "case",
        featured: {
          image: { src: "/images/header/nav-mega-menu-resources-case-studies.webp", alt: "ADHD Case Studies: real patient journeys and success stories", width: 1672, height: 941 },
          title: "ADHD Case Studies",
          text: "Real patient journeys and ADHD success stories, showing how evaluation, care, and the right support change everyday life.",
          cta: { label: "Read Case Studies", href: "/case-studies/" },
        },
      },
    ],
    featured: {
      image: { src: "/images/header/nav-mega-menu-resources-blogs.webp", alt: "ADHD Blog: expert insights on symptoms, focus strategies and living well with ADHD", width: 1672, height: 941 },
      title: "ADHD Blog",
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
