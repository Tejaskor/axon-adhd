import type { Metadata } from "next";
import { ArrowRight, Check, Clock3, Star } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { links } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import "./payment.css";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Axon ADHD Payment Portal | Secure Online Payments",
  description:
    "Axon ADHD Payment portal makes it easy to pay securely for ADHD assessments and services online using your preferred payment method.",
  path: "/payment/",
  absoluteTitle: true,
});

export default function PaymentPage() {
  return (
    <>
      <section className="axon-payment-section" aria-labelledby="payment-pricing-title">
        {/* Ambient Electric Royal Blue & Cyan Glow Highlights */}
        <div className="axon-ambient-glow axon-ambient-glow-top" aria-hidden="true" />
        <div className="axon-ambient-glow axon-ambient-glow-center" aria-hidden="true" />
        <div className="axon-ambient-glow axon-ambient-glow-bottom" aria-hidden="true" />

        {/* Subtle Outer Dotted Pattern */}
        <div className="axon-outer-dots" aria-hidden="true" />

        <div className="axon-payment-container">
          {/* Centered Heading Area */}
          <div className="axon-payment-header">
            <div className="axon-pricing-label">
              <span className="axon-pricing-line" aria-hidden="true" />
              <span>PRICING</span>
              <span className="axon-pricing-line" aria-hidden="true" />
            </div>

            <h1 id="payment-pricing-title">
              Complete Your <span className="axon-heading-cyan">Payment</span>
            </h1>

            <p>
              Start with a free screening to get clarity. If you complete the comprehensive evaluation payment{" "}
              <strong>within 24 hours, you&apos;ll receive 10% off.</strong>
            </p>
          </div>

          {/* Horizontally Aligned Glassmorphism Pricing Cards */}
          <div className="axon-pricing-grid">
            {/* 1. Behavioral Health Screening ($0) */}
            <article className="axon-glass-card" aria-labelledby="plan-screening-title">
              <div className="axon-card-top">
                <div className="axon-icon-circle" aria-hidden="true">
                  <Check className="size-6 stroke-[3]" />
                </div>
                <div className="axon-card-title-area">
                  <span className="axon-small-badge">START HERE</span>
                  <h3 id="plan-screening-title">
                    Behavioral Health<br />Screening
                  </h3>
                </div>
              </div>

              <div className="axon-price">
                <span>$0</span>
              </div>

              <p className="axon-price-description">
                Start with clarity — completely free.
              </p>

              <div className="axon-divider" aria-hidden="true" />

              <ul className="axon-feature-list">
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>ADHD symptom screening</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Anxiety &amp; depression screening</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Validated questionnaires</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Quick online assessment</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Immediate screening results</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>No payment required</span>
                </li>
              </ul>

              <div className="axon-card-button-wrap">
                <ButtonLink href={links.freeScreening} variant="outline" newTab>Start Free Screening</ButtonLink>
                <span className="axon-button-note">
                  No credit card required
                </span>
              </div>
            </article>

            {/* 2. Comprehensive ADHD Evaluation ($519.30) - Bright Neon-Cyan Border & Glow */}
            <article className="axon-glass-card axon-glass-card-featured" aria-labelledby="plan-evaluation-title">
              <div className="axon-popular-badge">
                <Star className="size-3.5 fill-white text-white stroke-none" aria-hidden="true" />
                <span>MOST POPULAR</span>
              </div>

              <div className="axon-card-top">
                <div className="axon-icon-circle" aria-hidden="true">
                  <svg className="size-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
                  </svg>
                </div>
                <div className="axon-card-title-area">
                  <h3 id="plan-evaluation-title">
                    Comprehensive<br />ADHD Evaluation
                  </h3>
                </div>
              </div>

              <div className="axon-price-row">
                <div className="axon-old-price" aria-label="Original price $577">
                  $577
                </div>
                <div className="axon-new-price">
                  $519.30
                </div>
                <div className="axon-save-box">
                  <strong>SAVE 10%</strong>
                  <span>(Save $57.70)</span>
                </div>
              </div>

              <div className="axon-discount-info">
                <div className="axon-clock" aria-hidden="true">
                  <Clock3 className="size-4 stroke-[2.2]" />
                </div>
                <p>
                  Get 10% off when you complete the evaluation payment{" "}
                  <strong>within 24 hours</strong> after finishing your free screening.
                </p>
              </div>

              <div className="axon-divider" aria-hidden="true" />

              <ul className="axon-feature-list">
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Comprehensive ADHD evaluation</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>FDA-cleared QbCheck objective testing</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Clinical interview with a licensed professional</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>ASRS, PHQ-9 &amp; GAD-7 results</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Full clinical ADHD report</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Official diagnostic evaluation</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Results in days, not months</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Consultation to discuss next steps</span>
                </li>
              </ul>

              <div className="axon-card-button-wrap">
                <ButtonLink href={links.comprehensive} variant="primary" newTab>Get 10% Off My Evaluation</ButtonLink>
                <span className="axon-button-note">
                  Secure &amp; confidential &nbsp; • &nbsp; Clinician-led &nbsp; • &nbsp; Superbills provided
                </span>
              </div>
            </article>

            {/* 3. Evaluation + Accommodation Package ($744.30) */}
            <article className="axon-glass-card" aria-labelledby="plan-package-title">
              <div className="axon-card-top">
                <div className="axon-icon-circle" aria-hidden="true">
                  <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2L21 12L12 22L3 12Z" fill="rgba(255,255,255,0.3)" />
                    <path d="M12 6L18 12L12 18L6 12Z" fill="#ffffff" />
                  </svg>
                </div>
                <div className="axon-card-title-area">
                  <span className="axon-student-badge">
                    For students &amp; professionals
                  </span>
                  <h3 id="plan-package-title">
                    Evaluation + Accommodation<br />Package
                  </h3>
                </div>
              </div>

              <div className="axon-price-row">
                <div className="axon-old-price" aria-label="Original price $827">
                  $827
                </div>
                <div className="axon-new-price">
                  $744.30
                </div>
                <div className="axon-save-box">
                  <strong>SAVE 10%</strong>
                  <span>(Save $82.70)</span>
                </div>
              </div>

              <div className="axon-package-breakdown">
                $577 (Evaluation) + $250 (Accommodation Support)
              </div>

              <div className="axon-discount-info">
                <div className="axon-clock" aria-hidden="true">
                  <Clock3 className="size-4 stroke-[2.2]" />
                </div>
                <p>
                  Get 10% off when you complete the package payment{" "}
                  <strong>within 24 hours</strong> after finishing your free screening.
                </p>
              </div>

              <div className="axon-divider" aria-hidden="true" />

              <div className="axon-plus-title">
                <span className="axon-check" aria-hidden="true">
                  <Check className="size-3 stroke-[3]" />
                </span>
                <span>Everything in the evaluation, plus:</span>
              </div>

              <ul className="axon-feature-list">
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>Accommodation documentation &amp; advocacy package</span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>
                    Written to ADA, Section 504 and higher-education disability office standards
                  </span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>
                    Supports requests like extended testing time and distraction-reduced settings
                  </span>
                </li>
                <li>
                  <span className="axon-check" aria-hidden="true">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>
                    Guidance for school, college or workplace accommodations
                  </span>
                </li>
              </ul>

              <div className="axon-card-button-wrap">
                <ButtonLink href={links.accommodationCheckout} variant="white" newTab>Book Evaluation + Accommodations</ButtonLink>
              </div>
            </article>
          </div>

          {/* Process Steps: Brighter Blue Glassmorphism Bar */}
          <div className="axon-process-bar" aria-label="Three-step process">
            <div className="axon-process-item">
              <div className="axon-number" aria-hidden="true">
                1
              </div>
              <div>
                <h4>Take the Free Screening</h4>
                <p>Complete a quick online assessment at no cost.</p>
              </div>
            </div>

            <div className="axon-process-arrow" aria-hidden="true">
              <ArrowRight className="size-6 text-cyan-400 stroke-[2.5]" />
            </div>

            <div className="axon-process-item">
              <div className="axon-number" aria-hidden="true">
                2
              </div>
              <div>
                <h4>Make Payment Within 24 Hours</h4>
                <p>
                  Complete the evaluation or package payment{" "}
                  <strong>within 24 hours to get 10% off.</strong>
                </p>
              </div>
            </div>

            <div className="axon-process-arrow" aria-hidden="true">
              <ArrowRight className="size-6 text-cyan-400 stroke-[2.5]" />
            </div>

            <div className="axon-process-item">
              <div className="axon-number" aria-hidden="true">
                3
              </div>
              <div>
                <h4>Get Clarity and Support</h4>
                <p>Receive a detailed evaluation and next-step guidance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Payment", path: "/payment/" },
        ])}
      />
    </>
  );
}
