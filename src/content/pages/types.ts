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
  /** photo: substring of `title` shown in a blue gradient. */
  accent?: string;
  text: string[];
  ctas: Cta[];
  image: ImageAsset;
  trust?: boolean;
  note?: string;
  /** split (default): copy beside a framed image · banner: rounded blue gradient card with a cut-out image · photo: rounded full-bleed photo panel, `image` floats in a glass card */
  variant?: "split" | "banner" | "photo";
  /** Background photograph for the `photo` variant (decorative). */
  background?: ImageAsset;
  /** YouTube video shown as a floating card in the `photo` variant (replaces `image` there). */
  video?: { id: string; title: string };
};

/** Photo + playable-laptop overview followed by four photo feature cards (see AssessmentOverview). */
export type AssessmentOverviewSection = {
  type: "assessmentOverview";
  eyebrow?: string;
  title: string;
  /** Substring of `title` rendered in the brand blue. */
  accent: string;
  subtitle: string;
  checks: string[];
  background: ImageAsset;
  video: { id: string; title: string };
  items: Array<{ title: string; text: string; icon: "clinician" | "shield" | "insurance" | "document"; image: ImageAsset }>;
};

export type FeatureItem ={ title: string; text?: string; icon?: IconName; image?: ImageAsset; detail?: string };

export type FeaturesSection = {
  type: "features";
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  lead?: string;
  items: FeatureItem[];
  columns?: 2 | 3 | 4 | 5 | 6;
  /** card: icon card · stat: big number title · check: compact checklist · flow: arrowed chain · mission: glass cards on the green/blue/orange brand gradient */
  variant?: "card" | "stat" | "check" | "flow" | "mission" | "glassFlow";
  /** glassFlow: substring of `title` shown in the brand blue. */
  accent?: string;
  /** YouTube video shown with the section (ADHD Care services). */
  video?: { id: string; title: string };
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
  /** journey: frosted-glass, scroll-driven three-step layout (StepsJourney); step images are not used. */
  variant?: "journey";
  eyebrow?: string;
  /** Substring of `title` rendered in the brand blue. */
  accent?: string;
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
  /** axon: eyebrow pill, two-tone title, icon feature list and the image shown as a card background */
  variant?: "axon" | "glass";
  features?: FeatureItem[];
  /** glass: the substring of `title` shown in blue (the label above it is `eyebrow`), and the quick-facts row. */
  accent?: string;
  details?: Array<{ title: string; text: string }>;
  /** Word in the paragraphs to emphasise. */
  highlight?: string;
};

export type CtaSection = { type: "cta"; title: string; subtitle?: string; primary: Cta; secondary?: Cta; note?: string };

export type QuotesSection = { type: "quotes"; title: string; subtitle?: string; items: Array<{ quote: string; name: string; role: string }> };

export type BadgesSection = { type: "badges"; title: string; subtitle: string; badges: ImageAsset[]; image?: ImageAsset };

export type FaqSectionData = { type: "faq"; title: string; subtitle?: string; faqs: Faq[] };

export type SharedSection = { type: "blogs" } | { type: "contact" } | { type: "logos" };

export type PageSection = PageHero | AssessmentOverviewSection | FeaturesSection | StepsSection | SplitSection | CtaSection | QuotesSection | BadgesSection | FaqSectionData | SharedSection;

export type PageContent = {
  path: string;
  meta: { title: string; description: string; image?: string };
  breadcrumb: string;
  sections: PageSection[];
};
