import type { IconName } from "@/components/ui/FeatureIcon";
import { links } from "./site";

/** Flat discount (USD) on the evaluation when payment is completed within the offer window after the free screening. */
export const EARLY_DISCOUNT = 50;

export type Plan = {
  id: string;
  badge?: { label: string; tone: "teal" | "primary" | "orange" };
  name: string;
  icon: IconName;
  /** Base price in USD. 0 = free. Discounted price is computed in code. */
  price: number;
  discounted: boolean;
  breakdown?: string;
  /** Short line under the plan name (paid plans; the free plan uses `description` there). */
  summary?: string;
  /** Free plan: the line under the name. Paid plans: the 24-hour discount panel text. */
  description: string;
  lead?: string;
  features: string[];
  cta: { label: string; href: string };
  footnote: string;
  highlight?: boolean;
};

export const pricing = {
  title: "Choose Your Next Step",
  intro:
    "Start with a free screening to get clarity. If you complete the comprehensive evaluation payment within 10 minutes, you'll receive $50 off.",
  plans: [
    {
      id: "screening",
      badge: { label: "START HERE", tone: "teal" },
      name: "Behavioral Health Screening",
      icon: "file",
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
      icon: "brain",
      price: 577,
      discounted: true,
      summary: "A complete, in-depth evaluation with clinical insights and a personalized plan.",
      description:
        "Complete your payment within 10 minutes and save $50.",
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
      cta: { label: "Get $50 Off My Evaluation →", href: links.comprehensive },
      footnote: "Secure & confidential • Clinician-led • Superbills provided",
      highlight: true,
    },
    {
      id: "package",
      badge: { label: "For students & professionals", tone: "orange" },
      name: "Evaluation + Accommodation Package",
      icon: "home",
      price: 827,
      discounted: true,
      breakdown: "$577 (Evaluation) + $250 (Accommodation Support)",
      summary: "Comprehensive evaluation with documentation and ongoing support.",
      description:
        "Complete your payment within 10 minutes and save $50 (on the comprehensive evaluation).",
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
  steps: [
    { title: "Take the Free Screening", text: "Complete a quick online assessment at no cost." },
    { title: "Make Payment Within 10 Minutes", text: "Complete the evaluation or package payment within 10 minutes to get $50 off." },
    { title: "Get Clarity and Support", text: "Receive a detailed evaluation and next-step guidance." },
  ],
};
