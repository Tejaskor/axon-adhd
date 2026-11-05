import { ArrowRight, Award, BadgeCheck, Check, Clock, Phone, Video, X } from "lucide-react";
import Image from "next/image";
import {
  bookingHref,
  doctor,
  evalCard,
  evaluationPlan,
  faqs,
  flowSteps,
  onlineEval,
  packagePlan,
  quizCard,
  reviews,
  statBand,
  statesCovered,
  type FlowStep,
} from "@/content/adhd-assessment-lp";
import { availableStates } from "@/content/us-map";
import { links } from "@/content/site";
import { ReviewsCarousel } from "./ReviewsCarousel";

const Arrow = () => <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />;

export function EvalHero() {
  return (
    <section id="alp-top" className="alp-dhero">
      <div className="alp-wrap alp-wrap--d alp-dhero__grid">
        <div className="alp-dhero__copy">
          <span className="alp-dhero__badge alp-rise">
            <span className="alp-dhero__badge-ic">
              <Video size={15} strokeWidth={2.2} color="#FFFFFF" aria-hidden="true" />
            </span>
            100% online in 43 states + DC
          </span>
          <h1 className="alp-dhero__h1 alp-rise alp-d1">
            A clear ADHD diagnosis from home, <span>in days.</span>
          </h1>
          <p className="alp-dhero__lead alp-rise alp-d2">
            The FDA-cleared QbCheck ADHD test at home, a 1:1 Zoom visit with an ADHD expert, and an official clinical report. One flat fee of $577.
          </p>
          <div className="alp-dhero__ctas alp-rise alp-d3">
            <a className="alp-btn alp-btn--lg" href={bookingHref("hero-cta")}>
              Book My Online Evaluation
              <Arrow />
            </a>
            <a className="alp-dhero__link" href="#alp-how">
              See How it Works
            </a>
          </div>
          <div className="alp-dhero__proof alp-rise alp-d4">
            <span>
              <span className="alp-dhero__stars" aria-hidden="true">
                ★★★★★
              </span>
              <strong>4.9</strong> from 100+ reviews
            </span>
            <span>
              <Check size={18} strokeWidth={2.4} color="#0D7C66" aria-hidden="true" />
              No referral needed
            </span>
            <span>
              <Check size={18} strokeWidth={2.4} color="#0D7C66" aria-hidden="true" />
              FSA accepted
            </span>
          </div>
        </div>

        <div id="alp-book" className="alp-dhero__side alp-rise alp-d2">
          <article className="alp-pc__card alp-pc__card--hi alp-hero-pc">
            <div className="alp-pc__top">
              <span className="alp-pc__ic" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.5c.5 4.6 2.9 7 7.5 7.5-4.6.5-7 2.9-7.5 7.5-.5-4.6-2.9-7-7.5-7.5 4.6-.5 7-2.9 7.5-7.5z" />
                </svg>
              </span>
              <div className="alp-pc__titles">
                <h3 className="alp-pc__name">{evaluationPlan.name}</h3>
              </div>
            </div>
            <PriceRow was={evaluationPlan.was} now={evaluationPlan.now} saveText={evaluationPlan.saveText} />
            <Offer text="Get 10% off when you complete payment" />
            <div className="alp-pc__body">
              <ul className="alp-pc__list">
                {evaluationPlan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="alp-pc__foot">
              <a className="alp-btn alp-btn--block" href={bookingHref("hero-card")}>
                Get 10% Off My Evaluation
                <Arrow />
              </a>
              <p className="alp-pc__fine">
                Secure &amp; confidential <span aria-hidden="true">•</span> Clinician-led <span aria-hidden="true">•</span> FSA accepted
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function StatBand() {
  return (
    <section className="alp-statband" aria-label="At a glance">
      <div className="alp-wrap alp-wrap--d">
        <div className="alp-statband__grid">
          {statBand.map((s) => (
            <div key={s.n} className="alp-statband__c">
              <span className="alp-statband__n">{s.n}</span>
              <span className="alp-statband__l">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowArt({ art }: { art: FlowStep["art"] }) {
  const common = { viewBox: "0 0 120 96", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
  if (art === "calendar")
    return (
      <svg {...common}>
        <rect x="10" y="12" width="64" height="58" rx="9" fill="var(--ilf)" stroke="var(--il)" strokeWidth="3" />
        <path d="M10 29h64" stroke="var(--il)" strokeWidth="3" />
        <path d="M26 6v12M58 6v12" stroke="var(--il)" strokeWidth="3.5" />
        <path d="M27 49l9 9 18-19" stroke="var(--ila)" strokeWidth="6" />
        <rect x="46" y="54" width="66" height="38" rx="8" fill="var(--ils)" stroke="var(--il)" strokeWidth="3" />
        <path d="M46 66h66" stroke="var(--il)" strokeWidth="7" />
        <path d="M55 80h22" stroke="var(--il)" strokeWidth="3" />
        <rect x="92" y="75" width="13" height="8" rx="2" fill="var(--ila)" stroke="none" />
      </svg>
    );
  if (art === "test")
    return (
      <svg {...common}>
        <rect x="12" y="8" width="96" height="62" rx="8" fill="var(--ilf)" stroke="var(--il)" strokeWidth="3" />
        <circle cx="60" cy="15" r="2" fill="var(--il)" stroke="none" />
        <circle cx="60" cy="41" r="19" fill="var(--ils)" stroke="var(--il)" strokeWidth="3" />
        <circle cx="60" cy="41" r="11" fill="var(--ilf)" stroke="var(--ila)" strokeWidth="3" />
        <circle cx="60" cy="41" r="3.5" fill="var(--ila)" stroke="none" />
        <path d="M51 70l-4 17h26l-4-17M38 87h44" stroke="var(--il)" strokeWidth="3" />
        <circle cx="100" cy="70" r="15" fill="var(--ila)" stroke="var(--il)" strokeWidth="3" />
        <path d="M100 62v8l5 3.5" stroke="#fff" strokeWidth="3.2" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M26 6h40l20 20v56a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6V12a6 6 0 0 1 6-6z" fill="var(--ilf)" stroke="var(--il)" strokeWidth="3" />
      <path d="M66 6v20h20" fill="var(--ils)" stroke="var(--il)" strokeWidth="3" />
      <path d="M32 38h20M32 48h14" stroke="var(--il)" strokeWidth="3" />
      <path d="M33 80V68M43 80V60M53 80V72" stroke="var(--ila)" strokeWidth="6" />
      <circle cx="88" cy="76" r="16" fill="var(--ila)" stroke="var(--il)" strokeWidth="3" />
      <path d="M80 76l6 6 11-13" stroke="#fff" strokeWidth="4.5" />
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section id="alp-how" className="alp-sec alp-sec--white alp-sec--ref">
      <div className="alp-wrap alp-wrap--d alp-stack alp-reveal" style={{ gap: 64 }}>
        <div className="alp-head alp-head--wide">
          <span className="alp-eyebrow alp-eyebrow--ref">How it works</span>
          <h2 className="alp-h2 alp-h2--ref">Four steps. No waiting room.</h2>
          <p className="alp-body">Book today, and most people have their report within days of the Zoom visit.</p>
        </div>
        <div className="alp-flow__wrap">
          <ol className="alp-flow__list">
            {flowSteps.map((s, i) => (
              <li key={s.title} className="alp-flow__item">
                <span className="alp-flow__num" aria-hidden="true">
                  {i + 1}
                </span>
                {s.art === "doctor" ? (
                  <span className="alp-flow__ill alp-flow__ill--photo">
                    <Image src={onlineEval.doctorImage.src} alt={onlineEval.doctorImage.alt} width={92} height={92} sizes="92px" />
                    <span className="alp-flow__cam" aria-hidden="true">
                      <Video size={14} fill="#fff" color="#fff" />
                    </span>
                  </span>
                ) : (
                  <span className="alp-flow__ill" aria-hidden="true">
                    <FlowArt art={s.art} />
                  </span>
                )}
                <span className="alp-flow__n">STEP {i + 1}</span>
                <h3 className="alp-flow__t">{s.title}</h3>
                <p className="alp-flow__p">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Compare() {
  return (
    <section id="alp-compare" className="alp-sec alp-sec--soft alp-sec--bd alp-sec--ref">
      <div className="alp-wrap alp-wrap--d alp-stack alp-reveal" style={{ gap: 56 }}>
        <div className="alp-head alp-head--wide">
          <span className="alp-eyebrow alp-eyebrow--ref">A full evaluation, not a quiz</span>
          <h2 className="alp-h2 alp-h2--ref">Online quizzes can&apos;t diagnose ADHD. This can.</h2>
          <p className="alp-body">
            A free screener tells you whether to look closer. An evaluation gives you an answer you can act on with your doctor, school or employer.
          </p>
        </div>
        <div className="alp-vs__grid">
          <div className="alp-vs__card">
            <p className="alp-vs__k">{quizCard.kicker}</p>
            <p className="alp-vs__big">{quizCard.big}</p>
            <ul className="alp-vs__list">
              {quizCard.items.map((t) => (
                <li key={t}>
                  <X size={20} strokeWidth={2.2} color="#B4BFCE" aria-hidden="true" style={{ flex: "none", marginTop: 3 }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="alp-vs__card alp-vs__card--hi alp-lift">
            <p className="alp-vs__k">{evalCard.kicker}</p>
            <p className="alp-vs__big">{evalCard.big}</p>
            <ul className="alp-vs__list">
              {evalCard.items.map((t) => (
                <li key={t}>
                  <Check size={20} strokeWidth={2.4} color="#9FE3D2" aria-hidden="true" style={{ flex: "none", marginTop: 3 }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Offer({ text }: { text: string }) {
  return (
    <p className="alp-pc__offer">
      <span className="alp-pc__clock" aria-hidden="true">
        <Clock size={16} strokeWidth={2.2} />
      </span>
      <span>
        {text} <strong>within 24 hours</strong> after finishing your free screening.
      </span>
    </p>
  );
}

function PriceRow({ was, now, saveText }: { was: string; now: string; saveText: string }) {
  return (
    <div className="alp-pc__price">
      <del className="alp-pc__was">
        <span className="alp-vh">Regular price </span>
        {was}
      </del>
      <span className="alp-pc__now">
        <span className="alp-vh">With 10% off: </span>
        {now}
      </span>
      <span className="alp-pc__save">
        <strong>Save 10%</strong>
        <small>{saveText}</small>
      </span>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="alp-pricing" className="alp-sec alp-sec--white alp-sec--ref alp-pc-sec" aria-labelledby="alp-pc-h">
      <div className="alp-wrap alp-wrap--d alp-pc-wrap alp-reveal">
        <div className="alp-head alp-head--wide alp-pc-head">
          <span className="alp-eyebrow alp-eyebrow--ref alp-pc-eyebrow">Pricing</span>
          <h2 className="alp-h2 alp-h2--ref" id="alp-pc-h">
            Choose Your Next Step
          </h2>
          <p className="alp-body">
            Start with a free screening to get clarity. If you complete the comprehensive evaluation payment <strong>within 24 hours</strong>, you&apos;ll
            receive <strong>10% off.</strong>
          </p>
        </div>

        <div className="alp-pc">
          <article className="alp-pc__card alp-pc__card--hi">
            <span className="alp-pc__badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Most popular
            </span>
            <div className="alp-pc__top">
              <span className="alp-pc__ic" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.5c.5 4.6 2.9 7 7.5 7.5-4.6.5-7 2.9-7.5 7.5-.5-4.6-2.9-7-7.5-7.5 4.6-.5 7-2.9 7.5-7.5z" />
                </svg>
              </span>
              <div className="alp-pc__titles">
                <h3 className="alp-pc__name">{evaluationPlan.name}</h3>
              </div>
            </div>
            <PriceRow was={evaluationPlan.was} now={evaluationPlan.now} saveText={evaluationPlan.saveText} />
            <Offer text={evaluationPlan.offer} />
            <div className="alp-pc__body">
              <ul className="alp-pc__list">
                {evaluationPlan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="alp-pc__foot">
              <a className="alp-btn alp-btn--block" href={bookingHref("pricing-evaluation")}>
                Get 10% Off My Evaluation
                <Arrow />
              </a>
              <p className="alp-pc__fine">
                Secure &amp; confidential <span aria-hidden="true">•</span> Clinician-led <span aria-hidden="true">•</span> Superbills provided
              </p>
            </div>
          </article>

          <article className="alp-pc__card">
            <div className="alp-pc__top">
              <span className="alp-pc__ic" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3 21 12 12 21 3 12z" />
                </svg>
              </span>
              <div className="alp-pc__titles">
                <span className="alp-pc__tag">{packagePlan.tag}</span>
                <h3 className="alp-pc__name">{packagePlan.name}</h3>
              </div>
            </div>
            <PriceRow was={packagePlan.was} now={packagePlan.now} saveText={packagePlan.saveText} />
            <p className="alp-pc__break">{packagePlan.breakdown}</p>
            <Offer text={packagePlan.offer} />
            <div className="alp-pc__body">
              <p className="alp-pc__plus">
                <Check size={16} strokeWidth={2.8} aria-hidden="true" />
                Everything in the evaluation, plus:
              </p>
              <ul className="alp-pc__list">
                {packagePlan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="alp-pc__foot">
              <a className="alp-btn-o alp-btn--block" href={bookingHref("pricing-package")}>
                Book Evaluation + Accommodations
                <Arrow />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Specialist() {
  return (
    <section id="alp-doctor" className="alp-sec alp-spec alp-spec--grad">
      <div className="alp-wrap alp-wrap--d alp-spec__grid alp-reveal">
        <div className="alp-spec__media">
          <div className="alp-spec__back" aria-hidden="true" />
          <div className="alp-spec__photo">
            <Image src={onlineEval.doctorImage.src} alt={onlineEval.doctorImage.alt} width={970} height={970} sizes="(max-width: 767px) 350px, 480px" />
          </div>
          <div className="alp-spec__years">
            <span className="alp-spec__num">25</span>
            <span>
              years of
              <br />
              clinical practice
            </span>
          </div>
          <div className="alp-spec__speaker">
            <span className="alp-spec__ic">
              <Award size={20} strokeWidth={2} aria-hidden="true" />
            </span>
            <p>
              <strong>Speaker</strong>, International Conference on ADHD 2025
            </p>
          </div>
        </div>
        <div className="alp-spec__body">
          <span className="alp-eyebrow alp-eyebrow--ref">Who leads your care</span>
          <div className="alp-spec__id">
            <h2 className="alp-spec__name">{doctor.name}</h2>
            <div className="alp-spec__creds">{doctor.creds}</div>
          </div>
          <figure className="alp-spec__quote">
            <svg width="30" height="24" viewBox="0 0 30 24" fill="#256ACC" aria-hidden="true">
              <path d="M0 24V14.4C0 6.2 4.1 1.4 12.2 0l1.4 3.4C9.3 4.6 7.1 7.2 6.8 11H12v13H0zm16.4 0V14.4C16.4 6.2 20.5 1.4 28.6 0L30 3.4c-4.3 1.2-6.5 3.8-6.8 7.6h5.2v13h-12z" />
            </svg>
            <blockquote>{doctor.quote}</blockquote>
          </figure>
          <div className="alp-spec__stats">
            {doctor.stats.map((s) => (
              <div key={s.v}>
                <div className="alp-spec__stat">{s.v}</div>
                <div className="alp-spec__statl">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="alp-spec__licrow">
            <BadgeCheck size={20} strokeWidth={2} color="#0D7C66" aria-hidden="true" />
            <span>{doctor.license}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function PatientReviews() {
  return (
    <section className="alp-rvw" id="alp-reviews" aria-labelledby="alp-rvw-h">
      <div className="alp-wrap alp-wrap--d">
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}

export function StatesCovered() {
  return (
    <section id="alp-states" className="alp-sec alp-sec--white alp-sec--ref alp-sec--nt">
      <div className="alp-wrap alp-wrap--d alp-reveal">
        <div className="alp-states">
          <div className="alp-states__head">
            <span className="alp-eyebrow alp-eyebrow--ref">States we cover</span>
            <h2 className="alp-states__h">{statesCovered.heading}</h2>
            <p className="alp-states__sub">{statesCovered.sub}</p>
          </div>
          <ul className="alp-states__list">
            {availableStates.map((s) => (
              <li key={s}>
                <Check size={14} strokeWidth={3} color="#0D7C66" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <p className="alp-states__note">
            <strong>Not available yet:</strong> {statesCovered.note}
          </p>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="alp-faq" className="alp-sec alp-sec--white alp-faq-sec">
      <div className="alp-wrap alp-wrap--d alp-stack alp-stack--36">
        <h2 className="alp-h2 alp-center">Before you book</h2>
        <div className="alp-faq">
          {faqs.map((f) => (
            <div key={f.q} className="alp-faq__item">
              <h3 className="alp-faq__q">{f.q}</h3>
              <p className="alp-faq__a">{f.a[0].type === "p" ? f.a[0].text : ""}</p>
            </div>
          ))}
        </div>
        <div className="alp-faq-cta">
          <span>Still have a question?</span>
          <a href={onlineEval.phoneHref} className="alp-btn-o">
            Call <span className="alp-tel">+1 {onlineEval.phone}</span>
          </a>
          <a href={bookingHref("faq-cta")} className="alp-btn">
            Book Your Evaluation · $577
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="alp-fin" aria-labelledby="alp-fin-h">
      <div className="alp-fin__card">
        <h2 className="alp-fin__h" id="alp-fin-h">
          Get a clear answer about ADHD, from home.
        </h2>
        <p className="alp-fin__p">$577 flat fee · FSA accepted · No referral needed</p>
        <div className="alp-fin__ctas">
          <span className="alp-fin__ring">
            <a className="alp-btn alp-btn--lg" href={bookingHref("final-cta")}>
              Book my online evaluation
              <Arrow />
            </a>
          </span>
          <a className="alp-fin__call" href={onlineEval.phoneHref}>
            <Phone size={18} strokeWidth={2.2} aria-hidden="true" />
            call {onlineEval.phone}
          </a>
        </div>
        <p className="alp-fin__sub">
          Not ready yet? <a href={links.freeScreening}>Take the free ADHD screener</a>
        </p>
      </div>
    </section>
  );
}

export function StickyBookingBar() {
  return (
    <div className="alp-sticky">
      <div>
        <div className="alp-sticky__amt">$577 flat</div>
        <div className="alp-sticky__sub">100% online</div>
      </div>
      <a href={bookingHref("mobile-sticky-bar")} className="alp-btn">
        Book My Online Evaluation
      </a>
    </div>
  );
}
