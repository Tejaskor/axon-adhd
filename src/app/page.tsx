import { ADHDMythBuster } from "@/components/sections/ADHDMythBuster";
import { CareYouCanTrust } from "@/components/sections/CareYouCanTrust";
import { AccommodationContact } from "@/components/sections/AccommodationSections";
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
import { contactSection, faqSection, readyBand, testimonialsSection } from "@/content/home";
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
      <PricingCards />
      <GettingHelpSimple />
      <ADHDMythBuster />
      <WeSeeYou />
      <WhyAxon />
      <CTABand variant="plain" title={readyBand.title} subtitle={readyBand.subtitle} primary={readyBand.cta} />
      <CareYouCanTrust />
      <Testimonials {...testimonialsSection} reviews={reviews} rating={googleRating} />
      <LatestBlogs />
      <FAQAccordion variant="home" faqs={homeFaqs} title={faqSection.title} subtitle={faqSection.subtitle} />
      <FinalCTA />
      {/* Accommodation-page contact design; its built-in copy is identical to `contactSection`, which supplies the rest. */}
      <AccommodationContact eyebrow={null} description={contactSection.subtitle} placeholders={false} compact />
    </>
  );
}
