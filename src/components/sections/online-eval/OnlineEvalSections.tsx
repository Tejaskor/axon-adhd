import { ArrowRight, Award, BadgeCheck, Check, Clock, Phone, ShieldCheck, Video, X } from "lucide-react";
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
} from "@/content/online-evaluation";
import { availableStates } from "@/content/us-map";
import { links } from "@/content/site";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { StateChecker } from "./StateChecker";

const Arrow = () => <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />;

export function EvalHero() {
  return (
    <section id="axn-top" className="axn-dhero">
      <div className="axn-wrap axn-wrap--d axn-dhero__grid">
        <div className="axn-dhero__copy">
          <span className="axn-dhero__badge axn-rise">
            <span className="axn-dhero__badge-ic">
              <Video size={15} strokeWidth={2.2} color="#FFFFFF" aria-hidden="true" />
            </span>
            100% online in 43 states + DC
          </span>
          <h1 className="axn-dhero__h1 axn-rise axn-d1">
            A clear ADHD diagnosis from home, <span>in days.</span>
          </h1>
          <p className="axn-dhero__lead axn-rise axn-d2">
            The FDA-cleared QbCheck ADHD test at home, a 1:1 Zoom visit with an ADHD expert, and an official clinical report. One flat fee of $577.
          </p>
          <div className="axn-dhero__ctas axn-rise axn-d3">
            <a className="axn-btn axn-btn--lg" href={bookingHref("hero-cta")}>
              Book My Online Evaluation
              <Arrow />
            </a>
            <a className="axn-dhero__link" href="#axn-how">
              See How it Works
            </a>
          </div>
          <div className="axn-dhero__proof axn-rise axn-d4">
            <span className="axn-dhero__rating">
              <svg className="axn-dhero__glogo" width="32" height="32" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span className="axn-dhero__rating-body">
                <span className="axn-dhero__stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span>
                  <strong>4.9/5</strong> <span className="axn-dhero__rating-n">(100+ reviews)</span>
                </span>
              </span>
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

        <div id="axn-book" className="axn-dhero__side axn-rise axn-d2">
          <StateChecker bookHref={bookingHref("state-checker-book")} />
          <div className="axn-dhero__float axn-hide-sm" aria-hidden="true">
            <span className="axn-dhero__float-ic">
              <ShieldCheck size={22} strokeWidth={2} color="#0D7C66" />
            </span>
            <span className="t">
              <strong>PSYPACT authorized</strong>
              <small>+ licensed in VA and NY</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatBand() {
  return (
    <section className="axn-statband" aria-label="At a glance">
      <div className="axn-wrap axn-wrap--d">
        <div className="axn-statband__grid">
          {statBand.map((s) => (
            <div key={s.n} className="axn-statband__c">
              <span className="axn-statband__n">{s.n}</span>
              <span className="axn-statband__l">{s.l}</span>
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
    <section id="axn-how" className="axn-sec axn-sec--white axn-sec--ref">
      <div className="axn-wrap axn-wrap--d axn-stack axn-reveal" style={{ gap: 64 }}>
        <div className="axn-head axn-head--wide">
          <span className="axn-eyebrow axn-eyebrow--ref">How it works</span>
          <h2 className="axn-h2 axn-h2--ref">Four steps. No waiting room.</h2>
          <p className="axn-body">Book today, and most people have their report within days of the Zoom visit.</p>
        </div>
        <div className="axn-flow__wrap">
          <ol className="axn-flow__list">
            {flowSteps.map((s, i) => (
              <li key={s.title} className="axn-flow__item">
                <span className="axn-flow__num" aria-hidden="true">
                  {i + 1}
                </span>
                {s.art === "doctor" ? (
                  <span className="axn-flow__ill axn-flow__ill--photo">
                    <Image src={onlineEval.doctorImage.src} alt={onlineEval.doctorImage.alt} width={92} height={92} sizes="92px" />
                    <span className="axn-flow__cam" aria-hidden="true">
                      <Video size={14} fill="#fff" color="#fff" />
                    </span>
                  </span>
                ) : (
                  <span className="axn-flow__ill" aria-hidden="true">
                    <FlowArt art={s.art} />
                  </span>
                )}
                <span className="axn-flow__n">STEP {i + 1}</span>
                <h3 className="axn-flow__t">{s.title}</h3>
                <p className="axn-flow__p">{s.text}</p>
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
    <section id="axn-compare" className="axn-sec axn-sec--soft axn-sec--bd axn-sec--ref">
      <div className="axn-wrap axn-wrap--d axn-stack axn-reveal" style={{ gap: 56 }}>
        <div className="axn-head axn-head--wide">
          <span className="axn-eyebrow axn-eyebrow--ref">A full evaluation, not a quiz</span>
          <h2 className="axn-h2 axn-h2--ref">Online quizzes can&apos;t diagnose ADHD. This can.</h2>
          <p className="axn-body">
            A free screener tells you whether to look closer. An evaluation gives you an answer you can act on with your doctor, school or employer.
          </p>
        </div>
        <div className="axn-vs__grid">
          <div className="axn-vs__card">
            <p className="axn-vs__k">{quizCard.kicker}</p>
            <p className="axn-vs__big">{quizCard.big}</p>
            <ul className="axn-vs__list">
              {quizCard.items.map((t) => (
                <li key={t}>
                  <X size={20} strokeWidth={2.2} color="#B4BFCE" aria-hidden="true" style={{ flex: "none", marginTop: 3 }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="axn-vs__card axn-vs__card--hi axn-lift">
            <p className="axn-vs__k">{evalCard.kicker}</p>
            <p className="axn-vs__big">{evalCard.big}</p>
            <ul className="axn-vs__list">
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
    <p className="axn-pc__offer">
      <span className="axn-pc__clock" aria-hidden="true">
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
    <div className="axn-pc__price">
      <del className="axn-pc__was">
        <span className="axn-vh">Regular price </span>
        {was}
      </del>
      <span className="axn-pc__now">
        <span className="axn-vh">With 10% off: </span>
        {now}
      </span>
      <span className="axn-pc__save">
        <strong>Save 10%</strong>
        <small>{saveText}</small>
      </span>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="axn-pricing" className="axn-sec axn-sec--white axn-sec--ref axn-pc-sec" aria-labelledby="axn-pc-h">
      <div className="axn-wrap axn-wrap--d axn-pc-wrap axn-reveal">
        <div className="axn-head axn-head--wide axn-pc-head">
          <span className="axn-eyebrow axn-eyebrow--ref axn-pc-eyebrow">Pricing</span>
          <h2 className="axn-h2 axn-h2--ref" id="axn-pc-h">
            Choose Your Next Step
          </h2>
          <p className="axn-body">
            Start with a free screening to get clarity. If you complete the comprehensive evaluation payment <strong>within 24 hours</strong>, you&apos;ll
            receive <strong>10% off.</strong>
          </p>
        </div>

        <div className="axn-pc">
          <article className="axn-pc__card axn-pc__card--hi">
            <span className="axn-pc__badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Most popular
            </span>
            <div className="axn-pc__top">
              <span className="axn-pc__ic" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.5c.5 4.6 2.9 7 7.5 7.5-4.6.5-7 2.9-7.5 7.5-.5-4.6-2.9-7-7.5-7.5 4.6-.5 7-2.9 7.5-7.5z" />
                </svg>
              </span>
              <div className="axn-pc__titles">
                <h3 className="axn-pc__name">{evaluationPlan.name}</h3>
              </div>
            </div>
            <PriceRow was={evaluationPlan.was} now={evaluationPlan.now} saveText={evaluationPlan.saveText} />
            <Offer text={evaluationPlan.offer} />
            <div className="axn-pc__body">
              <ul className="axn-pc__list">
                {evaluationPlan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="axn-pc__foot">
              <a className="axn-btn axn-btn--block" href={bookingHref("pricing-evaluation")}>
                Get 10% Off My Evaluation
                <Arrow />
              </a>
              <p className="axn-pc__fine">
                Secure &amp; confidential <span aria-hidden="true">•</span> Clinician-led <span aria-hidden="true">•</span> Superbills provided
              </p>
            </div>
          </article>

          <article className="axn-pc__card">
            <div className="axn-pc__top">
              <span className="axn-pc__ic" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3 21 12 12 21 3 12z" />
                </svg>
              </span>
              <div className="axn-pc__titles">
                <span className="axn-pc__tag">{packagePlan.tag}</span>
                <h3 className="axn-pc__name">{packagePlan.name}</h3>
              </div>
            </div>
            <PriceRow was={packagePlan.was} now={packagePlan.now} saveText={packagePlan.saveText} />
            <p className="axn-pc__break">{packagePlan.breakdown}</p>
            <Offer text={packagePlan.offer} />
            <div className="axn-pc__body">
              <p className="axn-pc__plus">
                <Check size={16} strokeWidth={2.8} aria-hidden="true" />
                Everything in the evaluation, plus:
              </p>
              <ul className="axn-pc__list">
                {packagePlan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="axn-pc__foot">
              <a className="axn-btn-o axn-btn--block" href={bookingHref("pricing-package")}>
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
    <section id="axn-doctor" className="axn-sec axn-spec axn-spec--grad">
      <div className="axn-wrap axn-wrap--d axn-spec__grid axn-reveal">
        <div className="axn-spec__media">
          <div className="axn-spec__back" aria-hidden="true" />
          <div className="axn-spec__photo">
            <Image src={onlineEval.doctorImage.src} alt={onlineEval.doctorImage.alt} width={970} height={970} sizes="(max-width: 767px) 350px, 480px" />
          </div>
          <div className="axn-spec__years">
            <span className="axn-spec__num">25</span>
            <span>
              years of
              <br />
              clinical practice
            </span>
          </div>
          <div className="axn-spec__speaker">
            <span className="axn-spec__ic">
              <Award size={20} strokeWidth={2} aria-hidden="true" />
            </span>
            <p>
              <strong>Speaker</strong>, International Conference on ADHD 2025
            </p>
          </div>
        </div>
        <div className="axn-spec__body">
          <span className="axn-eyebrow axn-eyebrow--ref">Who leads your care</span>
          <div className="axn-spec__id">
            <h2 className="axn-spec__name">{doctor.name}</h2>
            <div className="axn-spec__creds">{doctor.creds}</div>
          </div>
          <figure className="axn-spec__quote">
            <svg width="30" height="24" viewBox="0 0 30 24" fill="#256ACC" aria-hidden="true">
              <path d="M0 24V14.4C0 6.2 4.1 1.4 12.2 0l1.4 3.4C9.3 4.6 7.1 7.2 6.8 11H12v13H0zm16.4 0V14.4C16.4 6.2 20.5 1.4 28.6 0L30 3.4c-4.3 1.2-6.5 3.8-6.8 7.6h5.2v13h-12z" />
            </svg>
            <blockquote>{doctor.quote}</blockquote>
          </figure>
          <div className="axn-spec__stats">
            {doctor.stats.map((s) => (
              <div key={s.v}>
                <div className="axn-spec__stat">{s.v}</div>
                <div className="axn-spec__statl">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="axn-spec__licrow">
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
    <section className="axn-rvw" id="axn-reviews" aria-labelledby="axn-rvw-h">
      <div className="axn-wrap axn-wrap--d">
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}

export function StatesCovered() {
  return (
    <section id="axn-states" className="axn-sec axn-sec--white axn-sec--ref axn-sec--nt">
      <div className="axn-wrap axn-wrap--d axn-reveal">
        <div className="axn-states">
          <div className="axn-states__head">
            <span className="axn-eyebrow axn-eyebrow--ref">States we cover</span>
            <h2 className="axn-states__h">{statesCovered.heading}</h2>
            <p className="axn-states__sub">{statesCovered.sub}</p>
          </div>
          <ul className="axn-states__list">
            {availableStates.map((s) => (
              <li key={s}>
                <Check size={14} strokeWidth={3} color="#0D7C66" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <p className="axn-states__note">
            <strong>Not available yet:</strong> {statesCovered.note}
          </p>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="axn-faq" className="axn-sec axn-sec--white axn-faq-sec">
      <div className="axn-wrap axn-wrap--d axn-stack axn-stack--36">
        <h2 className="axn-h2 axn-center">Before you book</h2>
        <div className="axn-faq">
          {faqs.map((f) => (
            <div key={f.q} className="axn-faq__item">
              <h3 className="axn-faq__q">{f.q}</h3>
              <p className="axn-faq__a">{f.a[0].type === "p" ? f.a[0].text : ""}</p>
            </div>
          ))}
        </div>
        <div className="axn-faq-cta">
          <span>Still have a question?</span>
          <a href={onlineEval.phoneHref} className="axn-btn-o">
            Call <span className="axn-tel">+1 {onlineEval.phone}</span>
          </a>
          <a href={bookingHref("faq-cta")} className="axn-btn">
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
    <section className="axn-fin" aria-labelledby="axn-fin-h">
      <div className="axn-fin__card">
        <h2 className="axn-fin__h" id="axn-fin-h">
          Get a clear answer about ADHD, from home.
        </h2>
        <p className="axn-fin__p">$577 flat fee · FSA accepted · No referral needed</p>
        <div className="axn-fin__ctas">
          <span className="axn-fin__ring">
            <a className="axn-btn axn-btn--lg" href={bookingHref("final-cta")}>
              Book my online evaluation
              <Arrow />
            </a>
          </span>
          <a className="axn-fin__call" href={onlineEval.phoneHref}>
            <Phone size={18} strokeWidth={2.2} aria-hidden="true" />
            call {onlineEval.phone}
          </a>
        </div>
        <p className="axn-fin__sub">
          Not ready yet? <a href={links.freeScreening}>Take the free ADHD screener</a>
        </p>
      </div>
    </section>
  );
}

export function StickyBookingBar() {
  return (
    <div className="axn-sticky">
      <div>
        <div className="axn-sticky__amt">$577 flat</div>
        <div className="axn-sticky__sub">100% online</div>
      </div>
      <a href={bookingHref("mobile-sticky-bar")} className="axn-btn">
        Book My Online Evaluation
      </a>
    </div>
  );
}
