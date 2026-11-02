import type { Faq } from "@/content/types";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Blocks } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqJsonLd } from "@/lib/seo";
import { slugify } from "@/lib/utils";

/** `anchors` gives each item the live site's `#question-slug` id (only where it can't clash with heading ids). */
export function faqItems(faqs: Faq[], { anchors = false }: { anchors?: boolean } = {}) {
  return faqs.map((f, i) => ({
    id: `faq-${i}`,
    title: f.q,
    content: <Blocks blocks={f.a} />,
    anchor: anchors ? slugify(f.q) : undefined,
  }));
}

/** FAQ section + FAQPage JSON-LD. `variant="home"` is the home page design: centred heading over full-width cards. */
export function FAQAccordion({ faqs, title, subtitle, withSchema = true, variant = "default" }: { faqs: Faq[]; title: string; subtitle?: string; withSchema?: boolean; variant?: "default" | "home" }) {
  if (variant === "home") {
    return (
      <section
        className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F5F9FF_0%,#EAF2FD_55%,#F3F7FE_100%)] py-8 sm:py-10 md:py-5 lg:py-[100px] xl:py-28"
        aria-labelledby="faq-title"
      >
        {/* Soft colour washes behind the cards so the glass blur has something to frost. */}
        <div aria-hidden className="pointer-events-none absolute top-[18%] -left-40 -z-10 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(134,182,229,.55),transparent_68%)]" />
        <div aria-hidden className="pointer-events-none absolute top-[45%] left-[38%] -z-10 size-[460px] rounded-full bg-[radial-gradient(circle,rgba(196,181,253,.35),transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 bottom-[-10%] -z-10 size-[620px] rounded-full bg-[radial-gradient(circle,rgba(94,234,212,.30),transparent_68%)]" />
        <Container>
          <div className="flex flex-col items-center gap-2.5 text-center">
            <h2 id="faq-title" className="text-[24px] leading-[1.2] font-semibold text-[#1E242A] sm:text-[26px] md:text-[32px]">
              {title}
            </h2>
            {subtitle && <p className="text-[15px] font-medium text-[#0B254B]/70 md:text-[18px]">{subtitle}</p>}
          </div>
          <Accordion variant="cards" columns={2} className="mt-5" items={faqItems(faqs, { anchors: true })} />
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
