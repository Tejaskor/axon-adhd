"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { googleReviewsHref, type Review } from "@/content/adhd-assessment-lp";
import { cn } from "@/lib/utils";

function Stars() {
  return (
    <span className="alp-rvw__stars" role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" fill="#F5B400" />
        </svg>
      ))}
    </span>
  );
}

/** Sideways-scrolling review row: arrows scroll one card, every card clamps to 4 lines, and only one review is expanded at a time. */
export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [overflows, setOverflows] = useState<boolean[]>(() => reviews.map(() => true));
  const [edge, setEdge] = useState({ start: true, end: false });

  const syncEdges = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setEdge({ start: t.scrollLeft <= 2, end: t.scrollLeft >= t.scrollWidth - t.clientWidth - 2 });
  }, []);

  // Hide "Read more" on reviews that already fit in 4 lines.
  const measure = useCallback(() => {
    setOverflows((prev) => {
      const next = textRefs.current.map((el, i) => (openIndex === i ? prev[i] : el ? el.scrollHeight > el.clientHeight + 2 : prev[i]));
      return next.some((v, i) => v !== prev[i]) ? next : prev;
    });
  }, [openIndex]);

  useLayoutEffect(() => {
    measure();
    syncEdges();
  }, [measure, syncEdges]);

  useEffect(() => {
    const onResize = () => {
      measure();
      syncEdges();
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure, syncEdges]);

  const go = (dir: 1 | -1) => {
    const t = trackRef.current;
    const card = t?.querySelector<HTMLElement>(".alp-rvw__card");
    if (!t || !card) return;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="alp-rvw__head">
        <div className="alp-rvw__title">
          <span className="alp-eyebrow alp-eyebrow--ref">Patient reviews</span>
          <h2 className="alp-rvw__h" id="alp-rvw-h">
            4.9 out of 5 from 100+ reviews
          </h2>
        </div>
        <div className="alp-rvw__tools">
          <a className="alp-rvw__g" href={googleReviewsHref} target="_blank" rel="noopener">
            Read all reviews on Google
          </a>
          <div className="alp-rvw__nav" role="group" aria-label="Scroll reviews">
            <button type="button" className="alp-rvw__arrow" aria-label="Previous reviews" aria-controls="alp-rvw-track" disabled={edge.start} onClick={() => go(-1)}>
              <ChevronLeft size={18} strokeWidth={2.4} aria-hidden="true" />
            </button>
            <button type="button" className="alp-rvw__arrow" aria-label="Next reviews" aria-controls="alp-rvw-track" disabled={edge.end} onClick={() => go(1)}>
              <ChevronRight size={18} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="alp-rvw__track"
        id="alp-rvw-track"
        tabIndex={0}
        role="region"
        aria-label="Patient reviews, scroll sideways for more"
        onScroll={() => requestAnimationFrame(syncEdges)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
        }}
      >
        {reviews.map((r, i) => {
          const isOpen = openIndex === i;
          return (
            <article key={r.name} className={cn("alp-rvw__card", r.dark && "alp-rvw__card--dark", isOpen && "is-open")}>
              {r.dark ? (
                <svg className="alp-rvw__q" width="38" height="30" viewBox="0 0 38 30" aria-hidden="true">
                  <path
                    d="M0 30V17.2C0 7.3 5.1 1.4 14.4 0l1.6 4.1C10.8 5.6 8.9 8.7 8.7 12.4H16V30H0zm21 0V17.2C21 7.3 26.1 1.4 35.4 0L37 4.1c-5.2 1.5-7.1 4.6-7.3 8.3H37V30H21z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <Stars />
              )}
              <p
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                id={`alp-rvw-text-${i + 1}`}
                className="alp-rvw__t"
                style={{ whiteSpace: "pre-line" }}
              >
                {r.text}
              </p>
              <button
                type="button"
                className="alp-rvw__rm"
                aria-expanded={isOpen}
                aria-controls={`alp-rvw-text-${i + 1}`}
                hidden={!overflows[i] && !isOpen}
                onClick={() => {
                  setOpenIndex(isOpen ? null : i);
                  requestAnimationFrame(() => {
                    measure();
                    syncEdges();
                  });
                }}
              >
                {isOpen ? "Show less" : "Read more"}
              </button>
              <div className="alp-rvw__by">
                <span className={cn("alp-rvw__av", `alp-rvw__av--${r.avatar}`)}>{r.initials}</span>
                <span className="alp-rvw__who">
                  <span className="alp-rvw__name">{r.name}</span>
                  <span className="alp-rvw__role">{r.role}</span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
