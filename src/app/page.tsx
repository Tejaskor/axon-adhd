import { ADHDMythBuster } from "@/components/sections/ADHDMythBuster";
import { CareYouCanTrust } from "@/components/sections/CareYouCanTrust";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTABand } from "@/components/sections/CTABand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { GettingHelpSimple } from "@/components/sections/GettingHelpSimple";
import { Hero } from "@/components/sections/Hero";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { PricingCards } from "@/components/sections/PricingCards";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { SymptomChecklist } from "@/components/sections/SymptomChecklist";
import { Testimonials } from "@/components/sections/Testimonials";
import { WeSeeYou } from "@/components/sections/WeSeeYou";
import { WhyAxon } from "@/components/sections/WhyAxon";
import { homeFaqs } from "@/content/faqs";
import { faqSection, readyBand, testimonialsSection } from "@/content/home";
import { reviews } from "@/content/trust";
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
      <PricingCards />
      <GettingHelpSimple />
      <ADHDMythBuster />
      <WeSeeYou />
      <WhyAxon />
      <CTABand variant="plain" title={readyBand.title} subtitle={readyBand.subtitle} primary={readyBand.cta} />
      <CareYouCanTrust />
      <Testimonials title={testimonialsSection.title} subtitle={testimonialsSection.subtitle} reviews={reviews} />
      <LatestBlogs />
      <FAQAccordion faqs={homeFaqs} title={faqSection.title} subtitle={faqSection.subtitle} />
      <FinalCTA />
      <ContactSection />
    </>
  );
}
