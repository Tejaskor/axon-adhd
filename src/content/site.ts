import type { Cta } from "./types";

export const site = {
  name: "AXON ADHD",
  legalName: "AXON Digital Health & Diagnosis",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.axonadhd.com",
  logo: { src: "/images/brand/Axon-Digital-Health-Ek-Mukta-font-ADHD.webp", width: 454, height: 160 },
  /** Vector logo for the header + mobile menu (JSON-LD keeps the raster `logo`). */
  headerLogo: { src: "/images/header/logo.svg", width: 114, height: 40 },
  footerLogo: { src: "/images/brand/axonadhd.svg", width: 136, height: 48 },
  ogImage: "/images/brand/Understand-ADHD-Find-Your-Next-Step.webp",
  email: "info@axonadhd.com",
  supportEmail: "support@axonadhd.com",
  phone: "(703) 909-5101",
  phoneHref: "tel:+17039095101",
  address: {
    street: "1501 Langston Blvd. Suite 110",
    city: "Arlington",
    region: "VA",
    postalCode: "22209",
    country: "US",
    full: "1501 Langston Blvd. Suite 110, Arlington, VA 22209",
    mapUrl: "https://maps.app.goo.gl/ZBpoutfR9UrnyxPX9",
  },
  blurb:
    "AXON ADHD has been helping adults overcome the struggles of ADHD through our signature, state-of-the-art approach of proactive screening, objective data driven diagnosis, and collaborative treatment with primary care. With AXON ADHD you can thrive with ADHD.",
  copyright: "© Copyright 2026, All Rights Reserved",
  psychologyTodayUrl: "https://www.psychologytoday.com/profile/55035",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/share/1Bpo7SY48B/?mibextid=wwXIfr" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/104779691/admin/dashboard/" },
    { label: "Instagram", href: "https://www.instagram.com/axonadhd/" },
    { label: "YouTube", href: "https://www.youtube.com/@AXONADHD" },
    { label: "X", href: "https://x.com/axonadhd_26" },
    { label: "TikTok", href: "https://www.tiktok.com/@axon_adhd1?_r=1&_t=ZS-99dTRx6ASVc" },
  ],
} as const;

/** External patient portal links used by every CTA on the original site. */
export const links = {
  freeScreening: "https://prp.axondigitalhealth.ai/free-assessment",
  comprehensive: "https://prp.axondigitalhealth.ai/direct-comprehensive-adhd",
  accommodationCheckout: "https://prp.axondigitalhealth.ai/accommodation-checkout",
} as const;

export const ctas = {
  evaluation: { label: "Take Comprehensive ADHD Evaluation", href: links.comprehensive },
  screening: { label: "Start Free ADHD Screening", href: links.freeScreening },
} satisfies Record<string, Cta>;
