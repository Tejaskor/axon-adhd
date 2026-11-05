import { AlpHeader } from "@/components/sections/adhd-assessment-lp/AlpHeader";
import { BookingLinkTagger } from "@/components/sections/adhd-assessment-lp/BookingLinkTagger";
import {
  Compare,
  EvalHero,
  FaqSection,
  FinalCta,
  HowItWorks,
  PatientReviews,
  Pricing,
  Specialist,
  StatBand,
  StatesCovered,
  StickyBookingBar,
} from "@/components/sections/adhd-assessment-lp/AlpSections";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqs, onlineEval } from "@/content/adhd-assessment-lp";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import "./adhd-assessment-lp.css";

export const metadata = pageMetadata({
  title: onlineEval.title,
  description: onlineEval.description,
  path: onlineEval.path,
});

/** ADHD assessment landing page: hero + pricing card, stats, steps, comparison, pricing, specialist, reviews, coverage, FAQ, closing CTA. Self-contained; shares nothing with /online-adhd-evaluation. */
export default function AdhdAssessmentLpPage() {
  return (
    <>
      <AlpHeader />
      <div className="alp">
        <EvalHero />
        <StatBand />
        <HowItWorks />
        <Compare />
        <Pricing />
        <Specialist />
        <PatientReviews />
        <StatesCovered />
        <FaqSection />
        <FinalCta />
        <StickyBookingBar />
        <BookingLinkTagger />
        <JsonLd data={faqJsonLd(faqs)} />
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "ADHD Assessment", path: onlineEval.path }])} />
      </div>
    </>
  );
}
