import type { Faq } from "@/content/types";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Blocks } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqJsonLd } from "@/lib/seo";

export function faqItems(faqs: Faq[]) {
  return faqs.map((f, i) => ({ id: `faq-${i}`, title: f.q, content: <Blocks blocks={f.a} /> }));
}

/** FAQ section + FAQPage JSON-LD. */
export function FAQAccordion({ faqs, title, subtitle, withSchema = true }: { faqs: Faq[]; title: string; subtitle?: string; withSchema?: boolean }) {
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
