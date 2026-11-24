import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import type { Faq } from "@/content/types";
import { AxtcFaqAccordion } from "./AxtcFaqAccordion";
import type { FaqItem } from "./AxtcFaqAccordion";
import "./trust-center.css";
import { SeoJsonLd } from "@/components/ui/SeoJsonLd";

export const metadata = pageMetadata({
  title: "ADHD Data Privacy & HIPAA Compliance | Axon ADHD",
  description:
    "Axon ADHD Trust Center explains our ADHD data privacy, HIPAA compliance, security practices, and how we protect your personal health information.",
  path: "/adhd-data-privacy-trust-center/",
  image: "/images/hero/futuristic-healthcare-cybersecurity-shield.webp",
  absoluteTitle: true,
});

const faqItems: FaqItem[] = [
  {
    q: "Where is patient data stored?",
    a: "All Protected Health Information (PHI) is processed and stored exclusively within U.S. Amazon Web Services (AWS) infrastructure.",
  },
  {
    q: "Is AXON HIPAA compliant?",
    a: "Yes. AXON is a HIPAA-compliant digital health platform, and an independent HIPAA compliance assessment by Aegisra Assurance LLP was completed in September 2026. The report is available on request through our Trust Vault.",
  },
  {
    q: "Do you have a SOC 2 report?",
    a: "Our controls are aligned with SOC 2, and our SOC 2 Type II attestation is currently in progress. Its status is tracked in our Trust Vault.",
  },
  {
    q: "Has the platform been penetration tested?",
    a: "Yes. An independent vulnerability assessment and penetration test of our telehealth and patient portal platform was completed by Scrut in September 2026, against the OWASP Top 10 and OWASP ASVS benchmarks.",
  },
  {
    q: "How can I get the full reports?",
    a: (
      <>
        Open our{" "}
        <a href="https://d06ba1928e.scrut.io/" target="_blank" rel="noopener">
          Trust Vault
        </a>{" "}
        and use &ldquo;Get Access&rdquo; on the document you need, or email{" "}
        <a href="mailto:info@axonadhd.com">info@axonadhd.com</a>.
      </>
    ),
  },
  {
    q: "Who operates AXON?",
    a: "AXON Digital Health & Diagnosis is operated by Dodini Behavioral Health, P.L.L.C. Evaluations are led by Dr. Aaron Dodini, PhD, a licensed clinical psychologist.",
  },
  {
    q: "How do I report a security or privacy concern?",
    a: (
      <>
        Email <a href="mailto:info@axonadhd.com">info@axonadhd.com</a> or call{" "}
        <a href="tel:+17039095101">(703) 909-5101</a>. We take every report seriously.
      </>
    ),
  },
];

const faqsForSchema: Faq[] = [
  {
    q: "Where is patient data stored?",
    a: [{ type: "p", text: "All Protected Health Information (PHI) is processed and stored exclusively within U.S. Amazon Web Services (AWS) infrastructure." }],
  },
  {
    q: "Is AXON HIPAA compliant?",
    a: [
      {
        type: "p",
        text: "Yes. AXON is a HIPAA-compliant digital health platform, and an independent HIPAA compliance assessment by Aegisra Assurance LLP was completed in September 2026. The report is available on request through our Trust Vault.",
      },
    ],
  },
  {
    q: "Do you have a SOC 2 report?",
    a: [{ type: "p", text: "Our controls are aligned with SOC 2, and our SOC 2 Type II attestation is currently in progress. Its status is tracked in our Trust Vault." }],
  },
  {
    q: "Has the platform been penetration tested?",
    a: [
      {
        type: "p",
        text: "Yes. An independent vulnerability assessment and penetration test of our telehealth and patient portal platform was completed by Scrut in September 2026, against the OWASP Top 10 and OWASP ASVS benchmarks.",
      },
    ],
  },
  {
    q: "How can I get the full reports?",
    a: [{ type: "p", text: "Open our Trust Vault and use “Get Access” on the document you need, or email info@axonadhd.com." }],
  },
  {
    q: "Who operates AXON?",
    a: [{ type: "p", text: "AXON Digital Health & Diagnosis is operated by Dodini Behavioral Health, P.L.L.C. Evaluations are led by Dr. Aaron Dodini, PhD, a licensed clinical psychologist." }],
  },
  {
    q: "How do I report a security or privacy concern?",
    a: [{ type: "p", text: "Email info@axonadhd.com or call (703) 909-5101. We take every report seriously." }],
  },
];

export default function AdhdDataPrivacyTrustCenterPage() {
  return (
    <div className="axtc" id="axtc-top">
      {/* Inline SVG Sprite containing all icons used on this page */}
      <svg className="axtc-sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <symbol id="axtc-i-shield" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </symbol>
        <symbol id="axtc-i-check" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" />
        </symbol>
        <symbol id="axtc-i-lock" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </symbol>
        <symbol id="axtc-i-cloud" viewBox="0 0 24 24">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </symbol>
        <symbol id="axtc-i-eye" viewBox="0 0 24 24">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </symbol>
        <symbol id="axtc-i-key" viewBox="0 0 24 24">
          <circle cx="8" cy="15" r="4" />
          <path d="M10.85 12.15L19 4M18 5l3 3M15 8l3 3" />
        </symbol>
        <symbol id="axtc-i-video" viewBox="0 0 24 24">
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" />
        </symbol>
        <symbol id="axtc-i-file" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </symbol>
        <symbol id="axtc-i-arrow" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </symbol>
        <symbol id="axtc-i-search" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </symbol>
        <symbol id="axtc-i-plus" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" />
        </symbol>
        <symbol id="axtc-i-down" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" />
        </symbol>
        <symbol id="axtc-i-clock" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </symbol>
        <symbol id="axtc-i-flag" viewBox="0 0 24 24">
          <path d="M4 22V4M4 4h13l-2 4 2 4H4" />
        </symbol>
      </svg>

      {/* Hero Section */}
      <header className="axtc-hero" aria-labelledby="axtc-h1">
        <div className="axtc-wrap axtc-hero__in">
          <div className="axtc-hero__grid">
            {/* Left Column: Text & CTAs */}
            <div className="axtc-hero__copy">
              <span className="axtc-hero__eyebrow">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-shield" />
                </svg>
                TRUST &amp; COMPLIANCE
              </span>

              <h1 className="axtc-hero__title" id="axtc-h1">
                <span className="axtc-hero__title-line1">AXON ADHD</span>
                <span className="axtc-hero__title-line2">Trust Center</span>
              </h1>

              <p className="axtc-hero__p">
                AXON Digital Health &amp; Diagnosis is a HIPAA-compliant platform for ADHD assessment and care. All Protected Health Information is processed and stored exclusively on U.S. AWS infrastructure, under security controls aligned with HIPAA, HITECH, SOC&nbsp;2 and GDPR.
              </p>

              <div className="axtc-cta axtc-hero__cta">
                <ButtonLink href="https://d06ba1928e.scrut.io/" target="_blank" rel="noopener" variant="primary">Visit Live Trust Vault</ButtonLink>
                <ButtonLink href="#axtc-assessments" variant="outline">View Assessments</ButtonLink>
              </div>
            </div>

            {/* Right Column: Large glowing 3D brain with protective shield & floating indicator cards */}
            <div className="axtc-hero__visual">
              <div className="axtc-hero__art-wrap">
                <Image
                  src="/images/trust-center/trust-center-hero-brain-security.webp"
                  alt="AXON ADHD 3D glowing brain on pedestal protected by security shield and padlock, certified for HIPAA, HITECH, SOC 2, and GDPR"
                  width={1536}
                  height={1024}
                  priority
                  className="axtc-hero__art-img"
                />
              </div>
            </div>
          </div>

          {/* Bottom: Wide Glassmorphism Compliance Status Panel */}
          <div className="axtc-hero__status-panel" role="region" aria-label="Compliance status highlights">
            <div className="axtc-hero__status-item">
              <span className="axtc-hero__status-icon axtc-hero__status-icon--green">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-check" />
                </svg>
              </span>
              <div className="axtc-hero__status-copy">
                <strong className="axtc-hero__status-title">HIPAA Assessed</strong>
                <span className="axtc-hero__status-desc">Completed Sept 2026</span>
              </div>
            </div>

            <div className="axtc-hero__status-divider" aria-hidden="true" />

            <div className="axtc-hero__status-item">
              <span className="axtc-hero__status-icon axtc-hero__status-icon--green">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-check" />
                </svg>
              </span>
              <div className="axtc-hero__status-copy">
                <strong className="axtc-hero__status-title">Penetration Tested</strong>
                <span className="axtc-hero__status-desc">OWASP Top 10 &amp; ASVS</span>
              </div>
            </div>

            <div className="axtc-hero__status-divider" aria-hidden="true" />

            <div className="axtc-hero__status-item">
              <span className="axtc-hero__status-icon axtc-hero__status-icon--amber">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-clock" />
                </svg>
              </span>
              <div className="axtc-hero__status-copy">
                <strong className="axtc-hero__status-title">SOC 2 Type II</strong>
                <span className="axtc-hero__status-desc">In progress</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {/* 1. Certifications & Assessments */}
      <section className="axtc-sec" id="axtc-assessments" aria-labelledby="axtc-h-assess">
        <div className="axtc-wrap">
          <div className="axtc-head" data-axtc-r>
            <span className="axtc-eyebrow">Certifications &amp; Assessments</span>
            <h2 className="axtc-h2" id="axtc-h-assess">
              Independently verified, <span className="axtc-ac">not just promised</span>
            </h2>
            <p className="axtc-lead">
              Third-party assessments of the AXON platform, tracked in our Scrut Trust Center. Full reports are available on request.
            </p>
          </div>
          <div className="axtc-grid axtc-grid--3">
            <article className="axtc-card axtc-card--blue" data-axtc-r>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-shield" />
                </svg>
              </div>
              <span className="axtc-status">Completed</span>
              <h3>HIPAA Compliance Assessment</h3>
              <p>
                Independent assessment of the AXON platform: telehealth services, patient portal, FDA-cleared ADHD diagnostic tools (QbCheck), patient communication scheduling and clinical data management.
              </p>
              <span className="axtc-meta">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-file" />
                </svg>
                By Aegisra Assurance LLP · September 2026
              </span>
            </article>
            <article className="axtc-card axtc-card--green" data-axtc-r>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-search" />
                </svg>
              </div>
              <span className="axtc-status">Completed</span>
              <h3>Vulnerability Assessment &amp; Penetration Test</h3>
              <p>
                Independent VAPT of our telehealth and patient portal platform against the OWASP Top 10 and OWASP ASVS benchmarks, using industry-standard penetration testing methodology.
              </p>
              <span className="axtc-meta">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-file" />
                </svg>
                By Scrut · September 2026
              </span>
            </article>
            <article className="axtc-card axtc-card--orange" data-axtc-r>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-lock" />
                </svg>
              </div>
              <span className="axtc-status axtc-status--wip">In progress</span>
              <h3>SOC 2 Type II</h3>
              <p>
                Our security controls are aligned with the SOC 2 framework, and our Type II attestation is currently in progress. We update this page and our Trust Vault as it advances.
              </p>
              <span className="axtc-meta">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-clock" />
                </svg>
                Status tracked in the Trust Vault
              </span>
            </article>
          </div>
          <p className="axtc-chips-l" data-axtc-r>
            Security and privacy controls aligned with
          </p>
          <ul className="axtc-chips" data-axtc-r aria-label="Aligned frameworks">
            <li>HIPAA</li>
            <li>HITECH Act</li>
            <li>SOC 2</li>
            <li>GDPR</li>
            <li>CCPA</li>
          </ul>
        </div>
      </section>

      {/* 2. Security Practices */}
      <section className="axtc-sec axtc-sec--tint" id="axtc-practices" aria-labelledby="axtc-h-prac">
        <div className="axtc-wrap">
          <div className="axtc-head" data-axtc-r>
            <span className="axtc-eyebrow">Security Practices</span>
            <h2 className="axtc-h2" id="axtc-h-prac">
              How we <span className="axtc-ac">protect patient</span> information
            </h2>
            <p className="axtc-lead">
              Enterprise-grade controls built around the HIPAA Security Rule&rsquo;s administrative, technical and physical safeguards.
            </p>
          </div>
          <div className="axtc-grid axtc-grid--3">
            <article className="axtc-card axtc-card--tone-blue" data-axtc-r>
              <svg aria-hidden="true" viewBox="0 0 200 140" preserveAspectRatio="none" className="axtc-card__curve">
                <path d="M200 0C150 20 150 80 95 105S20 130 0 140H200Z" />
              </svg>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-cloud" />
                </svg>
              </div>
              <h3>U.S.-Only Data Residency</h3>
              <p>All PHI is processed and stored exclusively within U.S. Amazon Web Services infrastructure.</p>
            </article>
            <article className="axtc-card axtc-card--tone-green" data-axtc-r>
              <svg aria-hidden="true" viewBox="0 0 200 140" preserveAspectRatio="none" className="axtc-card__curve">
                <path d="M200 0C150 20 150 80 95 105S20 130 0 140H200Z" />
              </svg>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-lock" />
                </svg>
              </div>
              <h3>Data Protection</h3>
              <p>Safeguards that protect patient data in transit and at rest, in line with HIPAA and HITECH requirements.</p>
            </article>
            <article className="axtc-card axtc-card--tone-purple" data-axtc-r>
              <svg aria-hidden="true" viewBox="0 0 200 140" preserveAspectRatio="none" className="axtc-card__curve">
                <path d="M200 0C150 20 150 80 95 105S20 130 0 140H200Z" />
              </svg>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-key" />
                </svg>
              </div>
              <h3>Access Controls</h3>
              <p>Access to PHI is limited to authorized people with a legitimate need, following the minimum-necessary principle.</p>
            </article>
            <article className="axtc-card axtc-card--tone-orange" data-axtc-r>
              <svg aria-hidden="true" viewBox="0 0 200 140" preserveAspectRatio="none" className="axtc-card__curve">
                <path d="M200 0C150 20 150 80 95 105S20 130 0 140H200Z" />
              </svg>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-eye" />
                </svg>
              </div>
              <h3>Monitoring &amp; Audit Controls</h3>
              <p>Activity on systems that handle PHI is monitored and reviewed as part of our compliance program.</p>
            </article>
            <article className="axtc-card axtc-card--tone-teal" data-axtc-r>
              <svg aria-hidden="true" viewBox="0 0 200 140" preserveAspectRatio="none" className="axtc-card__curve">
                <path d="M200 0C150 20 150 80 95 105S20 130 0 140H200Z" />
              </svg>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-search" />
                </svg>
              </div>
              <h3>Independent Security Testing</h3>
              <p>Our platform has undergone an independent vulnerability assessment and penetration test against OWASP standards.</p>
            </article>
            <article className="axtc-card axtc-card--tone-indigo" data-axtc-r>
              <svg aria-hidden="true" viewBox="0 0 200 140" preserveAspectRatio="none" className="axtc-card__curve">
                <path d="M200 0C150 20 150 80 95 105S20 130 0 140H200Z" />
              </svg>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-video" />
                </svg>
              </div>
              <h3>Secure Telehealth</h3>
              <p>Evaluations are delivered through HIPAA-compliant secure video and a protected patient portal.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 3. HIPAA & Privacy */}
      <section className="axtc-sec" id="axtc-hipaa" aria-labelledby="axtc-h-hipaa">
        <div className="axtc-wrap">
          <div className="axtc-head" data-axtc-r>
            <span className="axtc-eyebrow">HIPAA &amp; Privacy</span>
            <h2 className="axtc-h2" id="axtc-h-hipaa">
              Built for healthcare <span className="axtc-ac">from day one</span>
            </h2>
            <p className="axtc-lead">
              AXON is a healthcare platform, so HIPAA is not an add-on: it shapes how we build, host and operate every part of the service.
            </p>
          </div>
          <div className="axtc-baa" data-axtc-r>
            <div className="axtc-baa__left">
              <ul className="axtc-checks">
                <li>
                  <svg className="axtc-ico" aria-hidden="true">
                    <use href="#axtc-i-check" />
                  </svg>
                  <span>Independent HIPAA compliance assessment completed in September 2026</span>
                </li>
                <li>
                  <svg className="axtc-ico" aria-hidden="true">
                    <use href="#axtc-i-check" />
                  </svg>
                  <span>Covers telehealth, patient portal, QbCheck diagnostics, scheduling and clinical data</span>
                </li>
                <li>
                  <svg className="axtc-ico" aria-hidden="true">
                    <use href="#axtc-i-check" />
                  </svg>
                  <span>PHI processed and stored only within the United States</span>
                </li>
                <li>
                  <svg className="axtc-ico" aria-hidden="true">
                    <use href="#axtc-i-check" />
                  </svg>
                  <span>Privacy practices aligned with GDPR and CCPA</span>
                </li>
              </ul>
              <dl className="axtc-dl">
                <div>
                  <dt>Operated by</dt>
                  <dd>Dodini Behavioral Health, P.L.L.C.</dd>
                </div>
                <div>
                  <dt>Hosting</dt>
                  <dd>U.S. AWS</dd>
                </div>
                <div>
                  <dt>Assessed by</dt>
                  <dd>Aegisra Assurance LLP</dd>
                </div>
                <div>
                  <dt>Pen test by</dt>
                  <dd>Scrut</dd>
                </div>
              </dl>
            </div>

            <div className="axtc-baa__divider" aria-hidden="true" />

            <aside className="axtc-baa__side" aria-labelledby="axtc-h-panel">
              <div className="axtc-baa__icon-wrap" aria-hidden="true">
                <svg className="axtc-baa__shield-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 3.5L6.5 8V16C6.5 23.4 11.4 30.2 18 32C24.6 30.2 29.5 23.4 29.5 16V8L18 3.5Z"
                    stroke="#1769D2"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="rgba(23, 105, 210, 0.06)"
                  />
                  <rect
                    x="13.5"
                    y="16.5"
                    width="9"
                    height="7.5"
                    rx="1.75"
                    stroke="#1769D2"
                    strokeWidth="2"
                    fill="#1769D2"
                  />
                  <path
                    d="M15.5 16.5V14.25C15.5 12.87 16.62 11.75 18 11.75C19.38 11.75 20.5 12.87 20.5 14.25V16.5"
                    stroke="#1769D2"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="18" cy="20.25" r="0.9" fill="#FFFFFF" />
                </svg>
              </div>
              <h3 id="axtc-h-panel">Need a BAA or security documents?</h3>
              <p>Compliance teams, partners and providers can request our reports and agreements. We&rsquo;ll respond promptly.</p>
              <ButtonLink href="mailto:info@axonadhd.com?subject=Security%20documentation%20request" variant="primary">Request Documentation</ButtonLink>
              <ButtonLink href="mailto:info@axonadhd.com?subject=Security%20question" variant="outline">Email the Security Team</ButtonLink>
            </aside>
          </div>
        </div>
      </section>

      {/* 4. Data Residency Band */}
      <section className="axtc-sec axtc-band" id="axtc-data" aria-labelledby="axtc-h-data">
        {/* Ambient glow orbs */}
        <div aria-hidden="true" className="axtc-band__glow axtc-band__glow--tr" />
        <div aria-hidden="true" className="axtc-band__glow axtc-band__glow--bl" />

        {/* Flowing curved wave shapes */}
        <svg aria-hidden="true" viewBox="0 0 600 200" fill="none" preserveAspectRatio="none" className="axtc-band__wave axtc-band__wave--bl">
          <path d="M0 70C140 70 240 150 400 185S560 200 600 200H0Z" fill="#23B8B0" fillOpacity=".4" />
          <path d="M0 120C120 120 220 170 340 192S520 200 600 200H0Z" fill="#35D0C6" fillOpacity=".3" />
          <path d="M0 70C140 70 240 150 400 185S560 200 600 200" stroke="#5FE6DC" strokeOpacity=".5" strokeWidth="1.5" />
        </svg>

        <svg aria-hidden="true" viewBox="0 0 600 200" fill="none" preserveAspectRatio="none" className="axtc-band__wave axtc-band__wave--tr">
          <path d="M0 70C140 70 240 150 400 185S560 200 600 200H0Z" fill="#23B8B0" fillOpacity=".4" />
          <path d="M0 120C120 120 220 170 340 192S520 200 600 200H0Z" fill="#35D0C6" fillOpacity=".3" />
          <path d="M0 70C140 70 240 150 400 185S560 200 600 200" stroke="#5FE6DC" strokeOpacity=".5" strokeWidth="1.5" />
        </svg>

        <div className="axtc-wrap axtc-band__in">
          <div data-axtc-r>
            <span className="axtc-eyebrow">Data &amp; Privacy</span>
            <h2 className="axtc-h2" id="axtc-h-data">
              Your PHI stays in the <span className="axtc-ac">United States</span>
            </h2>
            <p className="axtc-lead">
              AXON is operated by Dodini Behavioral Health, P.L.L.C. Protected Health Information is handled under controls aligned with HIPAA, the HITECH Act, SOC&nbsp;2 and GDPR, and never leaves U.S. AWS infrastructure.
            </p>
          </div>
          <div className="axtc-stats" data-axtc-r>
            <div className="axtc-stat">
              <b>100%</b>
              <span>of PHI stored on U.S. AWS infrastructure</span>
            </div>
            <div className="axtc-stat">
              <b>2</b>
              <span>independent assessments completed in Sept 2026</span>
            </div>
            <div className="axtc-stat">
              <b>OWASP</b>
              <span>Top 10 &amp; ASVS tested</span>
            </div>
            <div className="axtc-stat">
              <b>FDA</b>
              <span>cleared QbCheck diagnostic tool</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Reports & Documents */}
      <section className="axtc-sec axtc-sec--tint" id="axtc-docs" aria-labelledby="axtc-h-docs">
        <div className="axtc-wrap">
          <div className="axtc-head" data-axtc-r>
            <span className="axtc-eyebrow">Reports &amp; Documents</span>
            <h2 className="axtc-h2" id="axtc-h-docs">
              Review <span className="axtc-ac">the evidence</span>
            </h2>
            <p className="axtc-lead">Full reports are available in our Trust Vault to verified requesters.</p>
          </div>
          <div className="axtc-grid axtc-grid--2">
            <article className="axtc-card axtc-doc" data-axtc-r>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-file" />
                </svg>
              </div>
              <div>
                <h3>HIPAA Compliance Report 2026</h3>
                <p>Independent assessment by Aegisra Assurance LLP, completed September 2026.</p>
                <ButtonLink href="https://d06ba1928e.scrut.io/" target="_blank" rel="noopener" variant="outline">Request access</ButtonLink>
              </div>
            </article>
            <article className="axtc-card axtc-doc" data-axtc-r>
              <div className="axtc-icon">
                <svg className="axtc-ico" aria-hidden="true">
                  <use href="#axtc-i-file" />
                </svg>
              </div>
              <div>
                <h3>Web Application Security Report</h3>
                <p>Vulnerability assessment and penetration test against OWASP Top 10 and ASVS, completed September 2026.</p>
                <ButtonLink href="https://d06ba1928e.scrut.io/" target="_blank" rel="noopener" variant="outline">Request access</ButtonLink>
              </div>
            </article>
          </div>
          <p className="axtc-note" data-axtc-r>
            Monitored continuously with Scrut Automation.
          </p>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="axtc-sec" id="axtc-faq" aria-labelledby="axtc-h-faq">
        <div className="axtc-wrap">
          <div className="axtc-head text-center" data-axtc-r>
            <span className="axtc-eyebrow">FAQ</span>
            <h2 className="axtc-h2" id="axtc-h-faq">
              Frequently Asked{" "}
              <span className="axtc-faq__accent">
                Questions
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  className="axtc-faq__underline"
                >
                  <path
                    d="M3 8C50 2 150 2 197 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="axtc-lead">
              Straight answers about how AXON protects your data, what has been independently verified, and how to get the reports.
            </p>
          </div>
          <div className="axtc-faq">
            <div className="axtc-faq__side" data-axtc-r>
              <div className="axtc-faq__aside-card">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 230 150"
                  fill="none"
                  className="axtc-faq__aside-art"
                >
                  <defs>
                    <radialGradient id="axtc-faq-bubble-a" cx=".35" cy=".25" r=".9">
                      <stop offset="0" stopColor="#A6D3FF" />
                      <stop offset=".55" stopColor="#4C9CF5" />
                      <stop offset="1" stopColor="#2A7BE8" />
                    </radialGradient>
                    <radialGradient id="axtc-faq-bubble-b" cx=".35" cy=".25" r=".9">
                      <stop offset="0" stopColor="#C4E1FF" />
                      <stop offset=".6" stopColor="#7DB9F7" />
                      <stop offset="1" stopColor="#4F9DEF" />
                    </radialGradient>
                    <filter id="axtc-faq-bubble-blur" x="-20%" y="-20%" width="140%" height="160%">
                      <feGaussianBlur stdDeviation="5" />
                    </filter>
                  </defs>
                  <ellipse cx="110" cy="136" rx="80" ry="7" fill="#2A7BE8" fillOpacity=".25" filter="url(#axtc-faq-bubble-blur)" />
                  {/* small bubble (behind) */}
                  <path d="M178 108l16 26-34-14z" fill="url(#axtc-faq-bubble-b)" />
                  <ellipse cx="150" cy="96" rx="46" ry="36" fill="url(#axtc-faq-bubble-b)" />
                  <ellipse cx="138" cy="82" rx="22" ry="10" fill="#fff" fillOpacity=".3" />
                  <circle cx="132" cy="98" r="3.4" fill="#fff" fillOpacity=".95" />
                  <circle cx="148" cy="98" r="3.4" fill="#fff" fillOpacity=".95" />
                  <circle cx="164" cy="98" r="3.4" fill="#fff" fillOpacity=".95" />
                  {/* large bubble */}
                  <path d="M48 96L32 126l44-18z" fill="url(#axtc-faq-bubble-a)" />
                  <ellipse cx="92" cy="56" rx="72" ry="52" fill="url(#axtc-faq-bubble-a)" />
                  <ellipse cx="74" cy="26" rx="40" ry="14" fill="#fff" fillOpacity=".28" />
                  <text x="92" y="76" fontSize="60" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="inherit">
                    ?
                  </text>
                </svg>

                <h3 className="axtc-faq__aside-title">Have Questions?</h3>
                <p className="axtc-faq__aside-text">
                  Find quick answers to the most common questions about ADHD data privacy, HIPAA compliance, and security with AXON ADHD.
                </p>

                <ButtonLink href="/adhd-faqs/">View all FAQs</ButtonLink>

                <div className="axtc-faq__aside-org">
                  <h4 className="axtc-faq__aside-org-title">Reviewing AXON for your organization?</h4>
                  <p className="axtc-faq__aside-org-text">
                    Our team can walk you through our security program and answer your due-diligence questions.
                  </p>
                  <a
                    className="axtc-faq__aside-org-link"
                    href="mailto:info@axonadhd.com?subject=Security%20questionnaire"
                  >
                    <span>Contact our team</span>
                    <svg className="axtc-ico" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <AxtcFaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <SeoJsonLd path="/adhd-data-privacy-trust-center/" />
      <JsonLd data={faqJsonLd(faqsForSchema)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Trust Center", path: "/adhd-data-privacy-trust-center/" },
        ])}
      />
    </div>
  );
}
