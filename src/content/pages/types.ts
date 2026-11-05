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
  variant?: "split" | "banner" | "photo" | "network";
  /** network variant: glass hub label and the partner logos placed around it (clockwise from the top). `image` is not rendered. */
  /** `hub: "glow"` gives the centre a glowing disc with a people icon (and a stethoscope pill, bottom wave); the default is the open outlined circle. */
  network?: { hubLabel: string; logos: ImageAsset[]; hub?: "glow" };
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

export type FeatureItem ={ title: string; text?: string; icon?: IconName; image?: ImageAsset; detail?: string; /** gap / ribbon variants: card colour (ribbon uses blue, red, green, orange; campusBanner uses blue, orange, green). */ accent?: "blue" | "red" | "green" | "orange" | "purple" | "teal" | "pink" | "cyan" };

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
  variant?: "card" | "stat" | "check" | "flow" | "mission" | "glassFlow" | "partner" | "gap" | "ribbon" | "campusBanner" | "earlyReferral" | "universityBenefits";
  /** partner: white split card (lead + check list + quote beside `image`); glassFlow: substring of `title` shown in the brand blue / bold. */
  accent?: string;
  /** partner: replaces the heading; `title` then becomes the pill above it and `accent` (a substring of `text`) is shown in blue. */
  headline?: { text: string; accent: string };
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
  items: Array<{ title: string; text: string; image?: ImageAsset; /** journey: time estimate shown in the pill at the bottom of the card. */ duration?: string; /** stack: extra sub-points shown under the text. */ details?: Array<{ title: string; text: string }>; /** stack: optional smaller second screenshot overlapping the main one. */ inset?: ImageAsset }>;
  tone?: Tone;
  /** journey: numbered steps joined by a line, over tinted cards with a picture and duration pill (StepsJourney). stack: sticky, overlapping pastel cards with browser-framed screenshots (WorkflowStack). */
  variant?: "journey" | "stack";
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

/** `arcs`: full-width blue banner, left-aligned copy and both buttons over concentric arcs. `screening`: gradient banner with pill, accented title, copy and CTA beside three floating glass stat cards (see ScreeningBanner). */
export type CtaSection = { type: "cta"; title: string; subtitle?: string; primary: Cta; secondary?: Cta; note?: string; variant?: "screening" | "teal" | "blue"; eyebrow?: string; accent?: string; stats?: Array<{ value: string; label: string; accent: "cyan" | "green" | "orange" }> };

export type QuotesSection = { type: "quotes"; title: string; subtitle?: string; variant?: "glass"; accent?: string; items: Array<{ quote: string; name: string; role: string }> };

/** Centered heading (pill, title with an accented lead, subtitle) over a paged testimonial carousel (see TestimonialCarousel). */
export type TestimonialCarouselSection = { type: "testimonialCarousel"; eyebrow: string; title: string; accent: string; subtitle: string; items: Array<{ quote: string; name: string; role: string }> };

/** `compliance`: pill + accented title + subtitle + note bar beside a certification orbit built from `badges` (HIPAA, GDPR, CCPA, SOC 2 order). */
export type BadgesSection = { type: "badges"; title: string; subtitle: string; badges: ImageAsset[]; image?: ImageAsset; variant?: "compliance"; eyebrow?: string; accent?: string; note?: string; /** compliance: a shorter card (smaller badge orbit, tighter padding) for pages where it sits right under a strip. */ compact?: boolean };

/** `split`: centred heading (with `accent` underlined), an `aside` card on the left and a compact accordion on the right. */
export type FaqSectionData = { type: "faq"; title: string; subtitle?: string; faqs: Faq[]; variant?: "split"; accent?: string; aside?: { title: string; text: string } };

export type SharedSection = { type: "blogs" } | { type: "contact" } | { type: "logos" } | { type: "reviewStrip"; stat: { value: string; label: string } };

export type PageSection = PageHero | AssessmentOverviewSection | FeaturesSection | StepsSection | SplitSection | CtaSection | QuotesSection | TestimonialCarouselSection | BadgesSection | FaqSectionData | SharedSection;

export type PageContent = {
  path: string;
  meta: { title: string; description: string; image?: string };
  breadcrumb: string;
  sections: PageSection[];
};
