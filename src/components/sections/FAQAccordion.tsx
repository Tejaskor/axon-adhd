import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { Faq } from "@/content/types";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Blocks } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqJsonLd } from "@/lib/seo";
import { cn, slugify } from "@/lib/utils";

/** `anchors` gives each item the live site's `#question-slug` id (only where it can't clash with heading ids). */
export function faqItems(
  faqs: Faq[],
  { anchors = false }: { anchors?: boolean } = {},
) {
  return faqs.map((f, i) => ({
    id: `faq-${i}`,
    title: f.q,
    content: <Blocks blocks={f.a} />,
    anchor: anchors ? slugify(f.q) : undefined,
  }));
}

/** Centred "Frequently Asked Questions" heading: `accent` is blue with a curved underline; shared by the split FAQ layouts. */
export function FaqSplitHeading({
  title,
  subtitle,
  accent,
}: {
  title: string;
  subtitle?: string;
  accent?: string;
}) {
  const [before, after] =
    accent && title.includes(accent) ? title.split(accent) : [title, undefined];
  return (
    <div className="text-center">
      <h2
        id="faq-title"
        className="type-section leading-[1.15] tracking-[-0.01em] text-[#0B1F4D]"
      >
        {before}
        {after !== undefined && (
          <span className="relative inline-block text-primary">
            {accent}
            <svg
              aria-hidden
              viewBox="0 0 200 12"
              fill="none"
              preserveAspectRatio="none"
              className="absolute inset-x-0 -bottom-1.5 h-2.5 w-full"
            >
              <path
                d="M3 8C50 2 150 2 197 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        )}
        {after}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[16px] font-medium text-[#4B5C75] sm:text-[17px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

type FaqAsideData = {
  title: string;
  text?: string;
  link?: { label: string; href: string };
  children?: ReactNode;
  /** Replaces the default title size/width. */
  titleClassName?: string;
};

/** Frosted "Have Questions?" card with the glossy blue question-mark speech bubbles; sticks below the header while the questions scroll (desktop). */
export function FaqAside({ title, text, link, children, titleClassName }: FaqAsideData) {
  return (
    <div className="rounded-[32px] border-2 border-white/90 bg-[linear-gradient(160deg,rgba(255,255,255,.75)_0%,rgba(226,238,253,.5)_100%)] p-7 shadow-[0_24px_56px_-24px_rgba(37,120,202,.5),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-xl sm:p-9 lg:sticky lg:top-[calc(var(--header-offset)+16px)] lg:min-h-[460px] lg:px-8 lg:py-10">
      <svg aria-hidden viewBox="0 0 230 150" fill="none" className="h-28 w-auto sm:h-32">
        <defs>
          <radialGradient id="faq-bubble-a" cx=".35" cy=".25" r=".9">
            <stop offset="0" stopColor="#A6D3FF" />
            <stop offset=".55" stopColor="#4C9CF5" />
            <stop offset="1" stopColor="#2A7BE8" />
          </radialGradient>
          <radialGradient id="faq-bubble-b" cx=".35" cy=".25" r=".9">
            <stop offset="0" stopColor="#C4E1FF" />
            <stop offset=".6" stopColor="#7DB9F7" />
            <stop offset="1" stopColor="#4F9DEF" />
          </radialGradient>
          <filter id="faq-bubble-blur" x="-20%" y="-20%" width="140%" height="160%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <ellipse cx="110" cy="136" rx="80" ry="7" fill="#2A7BE8" fillOpacity=".25" filter="url(#faq-bubble-blur)" />
        {/* small bubble (behind) */}
        <path d="M178 108l16 26-34-14z" fill="url(#faq-bubble-b)" />
        <ellipse cx="150" cy="96" rx="46" ry="36" fill="url(#faq-bubble-b)" />
        <ellipse cx="138" cy="82" rx="22" ry="10" fill="#fff" fillOpacity=".3" />
        <circle cx="132" cy="98" r="3.4" fill="#fff" fillOpacity=".95" />
        <circle cx="148" cy="98" r="3.4" fill="#fff" fillOpacity=".95" />
        <circle cx="164" cy="98" r="3.4" fill="#fff" fillOpacity=".95" />
        {/* large bubble */}
        <path d="M48 96L32 126l44-18z" fill="url(#faq-bubble-a)" />
        <ellipse cx="92" cy="56" rx="72" ry="52" fill="url(#faq-bubble-a)" />
        <ellipse cx="74" cy="26" rx="40" ry="14" fill="#fff" fillOpacity=".28" />
        <text x="92" y="76" fontSize="60" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="inherit">
          ?
        </text>
      </svg>
      <h3 className={cn("mt-6 font-extrabold tracking-[-0.02em] text-[#0B1F4D]", titleClassName ?? "max-w-[9ch] text-[clamp(32px,3.2vw,46px)] leading-[1.05]")}>{title}</h3>
      {text && <p className="mt-4 text-[16px] leading-[1.55] font-medium text-[#56667F] sm:text-[17px]">{text}</p>}
      {children}
      {link && (
        <ButtonLink
          href={link.href}
          className="group mt-7 gap-2 bg-[linear-gradient(180deg,#5498DB_0%,#2578CA_55%,#1E64AA_100%)] shadow-[0_12px_26px_rgba(37,120,202,.35),inset_0_1px_0_rgba(255,255,255,.35)]! transition-[filter,box-shadow] duration-300 hover:brightness-110"
        >
          {link.label}
          <ArrowRight aria-hidden className="size-[18px] transition-transform group-hover:translate-x-1" />
        </ButtonLink>
      )}
    </div>
  );
}

/**
 * FAQ section + FAQPage JSON-LD. `variant="split"` (university referral page and home page): accent-underlined heading,
 * a "Have Questions?" aside and frosted question rows. `anchors` gives each question a `#question-slug` link target.
 */
export function FAQAccordion({
  faqs,
  title,
  subtitle,
  withSchema = true,
  variant = "default",
  accent,
  aside,
  anchors = false,
  background = "bg-[linear-gradient(180deg,#F5F9FF_0%,#E8F1FD_100%)]",
}: {
  faqs: Faq[];
  title: string;
  subtitle?: string;
  withSchema?: boolean;
  variant?: "default" | "split";
  accent?: string;
  aside?: FaqAsideData;
  anchors?: boolean;
  /** Background classes for the split layout (replaces its default pale blue gradient). */
  background?: string;
}) {
  if (variant === "split") {
    return (
      <section
        className={cn("relative isolate overflow-clip py-12 sm:py-16 lg:py-20", background)}
        aria-labelledby="faq-title"
      >
        <Container>
          <FaqSplitHeading title={title} subtitle={subtitle} accent={accent} />
          <div className={cn("mt-8 grid gap-6 sm:mt-10 lg:items-start lg:gap-6", aside && "lg:grid-cols-[minmax(0,5fr)_minmax(0,16fr)]")}>
            {aside && <FaqAside {...aside} />}
            {/* The first question starts open. */}
            <Accordion variant="glassList" defaultOpen={0} items={faqItems(faqs, { anchors })} />
          </div>
        </Container>
        {withSchema && <JsonLd data={faqJsonLd(faqs)} />}
      </section>
    );
  }
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="faq-title">
      <Container className="max-w-[960px]">
        <SectionHeading id="faq-title" title={title} subtitle={subtitle} />
        <Accordion items={faqItems(faqs)} />
      </Container>
      {withSchema && <JsonLd data={faqJsonLd(faqs)} />}
    </section>
  );
}
