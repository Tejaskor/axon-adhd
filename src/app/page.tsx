import { ADHDMythBuster } from "@/components/sections/ADHDMythBuster";
import { CareYouCanTrust } from "@/components/sections/CareYouCanTrust";
import { CoverageContact } from "@/components/sections/CoverageContact";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { GettingHelpSimple } from "@/components/sections/GettingHelpSimple";
import { Hero } from "@/components/sections/Hero";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { PricingCards } from "@/components/sections/PricingCards";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { SymptomChecklist } from "@/components/sections/SymptomChecklist";
import { TestimonialArc } from "@/components/sections/TestimonialArc";
import { WeSeeYou } from "@/components/sections/WeSeeYou";
import { WhyAxon } from "@/components/sections/WhyAxon";
import { homeFaqs } from "@/content/faqs";
import { faqSection, testimonialsSection } from "@/content/home";
import { googleRating, reviews } from "@/content/trust";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Online ADHD Testing for Adults | Diagnosis in Days | AXON",
  description:
    "FDA-cleared online ADHD testing for adults. Free screening, expert evaluation, and an official diagnosis in days—not months. Start your free ADHD test today.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <SymptomChecklist />
      <ServicesOverview />
      <GettingHelpSimple />
      <PricingCards />
      <ADHDMythBuster />
      <WeSeeYou />
      <WhyAxon />
      <CareYouCanTrust />
      <TestimonialArc {...testimonialsSection} reviews={reviews} rating={googleRating} />
      <LatestBlogs />
      <FinalCTA />
      {/* Background matches the Latest Blogs section. */}
      <FAQAccordion
        variant="split"
        faqs={homeFaqs}
        title={faqSection.title}
        subtitle={faqSection.subtitle}
        accent={faqSection.accent}
        aside={faqSection.aside}
        anchors
        background="bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]"
      />
      <CoverageContact />
    </>
  );
}
