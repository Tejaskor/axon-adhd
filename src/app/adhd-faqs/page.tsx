import { FAQTabs } from "@/components/sections/FAQTabs";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqTabs } from "@/content/faqs";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ADHD FAQs | Adult ADHD Testing, Referrals & Care",
  description: "Answers for patients, primary care providers, and university leaders about AXON ADHD’s screening, comprehensive evaluations, QbCheck testing, cost, insurance, and privacy.",
  path: "/adhd-faqs/",
});

/** Same structure as the live page: heading, subtitle, audience toggle and the three FAQ groups, then the footer. */
export default function FaqPage() {
  return (
    <>
      <section className="-mt-[var(--header-height)] bg-white pt-[150px] pb-16 sm:pb-20">
        <Container>
          {/* Only the heading block is centred; the toggle centres itself and answers stay left-aligned. */}
          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="font-sans text-[26px] leading-[1.2] font-bold text-[#111827] sm:text-[36px]">Frequently Asked Questions</h1>
            <p className="-mt-2 font-sans text-[15px] text-[#6B7280] sm:text-[16px]">We have the answers for you!</p>
          </div>
          <div className="mt-5">
            <FAQTabs tabs={faqTabs} />
          </div>
        </Container>
      </section>
      <JsonLd data={faqJsonLd(faqTabs.flatMap((t) => t.items))} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQs", path: "/adhd-faqs/" }])} />
    </>
  );
}
