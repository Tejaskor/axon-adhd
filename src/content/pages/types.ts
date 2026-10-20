import type { IconName } from "@/components/ui/FeatureIcon";
import type { Cta, Faq, ImageAsset } from "../types";

/**
 * Inner pages are described as an ordered list of sections. Each section
 * type maps to one component in `components/sections/PageSections.tsx`.
 */
export type Tone = "white" | "surface" | "soft" | "navy";

export type PageHero = {
  type: "hero";
  eyebrow?: string;
  title: string;
  text: string[];
  ctas: Cta[];
  image: ImageAsset;
  trust?: boolean;
  note?: string;
};

export type FeatureItem = { title: string; text?: string; icon?: IconName; image?: ImageAsset; detail?: string };

export type FeaturesSection = {
  type: "features";
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  lead?: string;
  items: FeatureItem[];
  columns?: 2 | 3 | 4 | 5 | 6;
  /** card: icon card · stat: big number title · check: compact checklist · flow: arrowed chain */
  variant?: "card" | "stat" | "check" | "flow";
  tone?: Tone;
  image?: ImageAsset;
  quote?: string;
  footnote?: string;
  ctas?: Cta[];
};

export type StepsSection = {
  type: "steps";
  id?: string;
  title: string;
  subtitle?: string;
  items: Array<{ title: string; text: string; image?: ImageAsset }>;
  tone?: Tone;
};

export type SplitSection = {
  type: "split";
  id?: string;
  eyebrow?: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  image?: ImageAsset;
  video?: string;
  reverse?: boolean;
  ctas?: Cta[];
  tone?: Tone;
  note?: string;
};

export type CtaSection = { type: "cta"; title: string; subtitle?: string; primary: Cta; secondary?: Cta; note?: string };

export type QuotesSection = { type: "quotes"; title: string; subtitle?: string; items: Array<{ quote: string; name: string; role: string }> };

export type BadgesSection = { type: "badges"; title: string; subtitle: string; badges: ImageAsset[]; image?: ImageAsset };

export type FaqSectionData = { type: "faq"; title: string; subtitle?: string; faqs: Faq[] };

export type SharedSection = { type: "blogs" } | { type: "contact" } | { type: "logos" };

export type PageSection = PageHero | FeaturesSection | StepsSection | SplitSection | CtaSection | QuotesSection | BadgesSection | FaqSectionData | SharedSection;

export type PageContent = {
  path: string;
  meta: { title: string; description: string; image?: string };
  breadcrumb: string;
  sections: PageSection[];
};
