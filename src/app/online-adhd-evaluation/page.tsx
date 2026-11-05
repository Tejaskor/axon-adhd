import { OnlineEvalHeader } from "@/components/sections/online-eval/OnlineEvalHeader";
import { BookingLinkTagger } from "@/components/sections/online-eval/BookingLinkTagger";
import {
  Compare,
  EvalHero,
  FinalCta,
  HowItWorks,
  Pricing,
  Specialist,
  StatBand,
  StatesCovered,
  StickyBookingBar,
} from "@/components/sections/online-eval/OnlineEvalSections";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Testimonials } from "@/components/sections/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { bookingHref, faqs, googleReviewsHref, onlineEval, reviews } from "@/content/online-evaluation";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import "./online-evaluation.css";

export const metadata = pageMetadata({
  title: onlineEval.title,
  description: onlineEval.description,
  path: onlineEval.path,
});

/** Online evaluation landing page: hero + state map, stats, steps, comparison, pricing, specialist, reviews, coverage, FAQ, closing CTA. */
export default function OnlineAdhdEvaluationPage() {
  return (
    <>
      <OnlineEvalHeader />
      <div className="axn">
        <EvalHero />
        <StatBand />
        <HowItWorks />
        <Compare />
        <Pricing />
        <Specialist />
      </div>
      {/* Same design as the home page reviews (shared component) with this page's own reviews; outside `.axn` so the landing-page CSS can't restyle it. */}
      <div id="axn-reviews">
        <Testimonials
          title="4.9 out of 5"
          titleAccent="from 100+ reviews"
          link={{ label: "Read all reviews on Google", href: googleReviewsHref }}
          // The card wraps each quote in quotation marks itself, so drop any already in the review text.
          reviews={reviews.map(({ name, role, text }) => ({ name, role, text: text.replace(/^"|"$/g, "") }))}
          rating={{ score: 4.9, outOf: 5, count: "100+" }}
        />
      </div>
      <div className="axn">
        <StatesCovered />
      </div>
      {/* Universities-page FAQ design (shared "split" layout) with this page's own questions; the page's JSON-LD below already covers the schema. */}
      <div id="axn-faq">
        <FAQAccordion
          variant="split"
          faqs={faqs}
          title="Before you book"
          accent="book"
          withSchema={false}
          aside={{
            title: "Still have a question?",
            titleClassName: "max-w-none text-[clamp(24px,2.2vw,30px)] leading-[1.15]",
            children: (
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href={onlineEval.phoneHref} variant="outline" size="md">
                  Call +1 {onlineEval.phone}
                </ButtonLink>
                <ButtonLink href={bookingHref("faq-cta")} size="md">
                  Book Your Evaluation · $577
                </ButtonLink>
              </div>
            ),
          }}
        />
      </div>
      <div className="axn">
        <FinalCta />
        <StickyBookingBar />
        <BookingLinkTagger />
        <JsonLd data={faqJsonLd(faqs)} />
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Online ADHD Evaluation", path: onlineEval.path }])} />
      </div>
    </>
  );
}
