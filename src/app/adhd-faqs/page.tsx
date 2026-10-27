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
      <section className="-mt-[var(--header-height)] bg-[linear-gradient(180deg,#FFFFFF_0%,#EFEFEF_100%)] pt-[150px] pb-[50px] lg:pb-10 xl:pb-[50px]">
        <Container>
          {/* Only the heading block is centred; the toggle centres itself and answers stay left-aligned. */}
          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="text-[22px] leading-[1.2] font-semibold text-[#1E242A] sm:text-[40px]">Frequently Asked Questions</h1>
            <p className="text-[18px] text-[#888D92]">We have the answers for you!</p>
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
