import { links } from "./site";

/** Discount applied when payment is completed within 24h of the free screening. */
export const EARLY_DISCOUNT = 0.1;

export type Plan = {
  id: string;
  badge?: { label: string; tone: "teal" | "primary" | "orange" };
  name: string;
  /** Short label for the plan tabs. */
  tab: string;
  /** Base price in USD. 0 = free. Discounted price is computed in code. */
  price: number;
  discounted: boolean;
  breakdown?: string;
  description: string;
  lead?: string;
  features: string[];
  cta: { label: string; href: string };
  footnote: string;
  highlight?: boolean;
};

export const pricing = {
  eyebrow: "PRICING",
  title: "Choose Your Next Step",
  intro:
    "Start with a free screening to get clarity. If you complete the comprehensive evaluation payment within 24 hours, you'll receive 10% off.",
  plans: [
    {
      id: "screening",
      badge: { label: "START HERE", tone: "teal" },
      name: "Behavioral Health Screening",
      tab: "Free Screening",
      price: 0,
      discounted: false,
      description: "Start with clarity — completely free.",
      features: [
        "ADHD symptom screening",
        "Anxiety & depression screening",
        "Validated questionnaires",
        "Quick online assessment",
        "Immediate screening results",
        "No payment required",
      ],
      cta: { label: "Start Free Screening →", href: links.freeScreening },
      footnote: "No credit card required",
    },
    {
      id: "evaluation",
      badge: { label: "MOST POPULAR", tone: "primary" },
      name: "Comprehensive ADHD Evaluation",
      tab: "Evaluation",
      price: 577,
      discounted: true,
      description:
        "Get 10% off when you complete the evaluation payment within 24 hours after finishing your free screening.",
      features: [
        "Comprehensive ADHD evaluation",
        "FDA-cleared QbCheck objective testing",
        "Clinical interview with a licensed professional",
        "ASRS, PHQ-9 & GAD-7 results",
        "Full clinical ADHD report",
        "Official diagnostic evaluation",
        "Results in days, not months",
        "Consultation to discuss next steps",
      ],
      cta: { label: "Get 10% Off My Evaluation →", href: links.comprehensive },
      footnote: "Secure & confidential • Clinician-led • Superbills provided",
      highlight: true,
    },
    {
      id: "package",
      badge: { label: "For students & professionals", tone: "orange" },
      name: "Evaluation + Accommodation Package",
      tab: "Eval + Accommodations",
      price: 827,
      discounted: true,
      breakdown: "$577 (Evaluation) + $250 (Accommodation Support)",
      description:
        "Get 10% off when you complete the package payment within 24 hours after finishing your free screening.",
      lead: "Everything in the evaluation, plus:",
      features: [
        "Accommodation documentation & advocacy package",
        "Written to ADA, Section 504 and higher-education disability office standards",
        "Supports requests like extended testing time and distraction-reduced settings",
        "Guidance for school, college or workplace accommodations",
      ],
      cta: { label: "Book Evaluation + Accommodations →", href: links.accommodationCheckout },
      footnote: "",
    },
  ] satisfies Plan[],
  /** Left panel: founder introduction (facts drawn from the About page bio). */
  founderIntro: {
    titleAccent: "Care designed by",
    titleRest: "Dr. Aaron Dodini",
    text: "A licensed clinical psychologist who founded Dodini Behavioral Health in 2001, Dr. Dodini built AXON ADHD to replace slow, costly evaluation models with faster, more affordable, and more accurate ADHD diagnoses.",
    credentials: ["Licensed clinical psychologist", "Marriage & family therapist", "Founded Dodini Behavioral Health in 2001"],
    cta: { label: "About us", href: "/about-adhd-evaluation/" },
  },
  /** Price toggle: with / without the 24-hour early-payment discount. */
  discountOptions: ["Paid within 24 hours", "Standard price"],
  assurances: ["Start with a free screening — no credit card required", "Clinician-led care", "Superbills provided"],
  secureNote: "Secure & confidential",
  steps: [
    { title: "Take the Free Screening", text: "Complete a quick online assessment at no cost." },
    { title: "Make Payment Within 24 Hours", text: "Complete the evaluation or package payment within 24 hours to get 10% off." },
    { title: "Get Clarity and Support", text: "Receive a detailed evaluation and next-step guidance." },
  ],
};
