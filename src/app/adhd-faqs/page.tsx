import { ContactSection } from "@/components/sections/ContactSection";
import { FAQTabs } from "@/components/sections/FAQTabs";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqTabs } from "@/content/faqs";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ADHD FAQs | Adult ADHD Testing, Referrals & Care",
  description: "Answers for patients, primary care providers, and university leaders about AXON ADHD’s screening, comprehensive evaluations, QbCheck testing, cost, insurance, and privacy.",
  path: "/adhd-faqs/",
});

export default function FaqPage() {
  return (
    <>
      <section className="-mt-[var(--header-height)] bg-gradient-to-b from-primary-soft to-surface pt-[140px] pb-16 sm:pb-20">
        <Container className="max-w-[960px]">
          <SectionHeading as="h1" title="Frequently Asked Questions" subtitle="We have the answers for you!" />
          <FAQTabs tabs={faqTabs} />
        </Container>
      </section>
      <ContactSection />
      <JsonLd data={faqJsonLd(faqTabs.flatMap((t) => t.items))} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQs", path: "/adhd-faqs/" }])} />
    </>
  );
}
