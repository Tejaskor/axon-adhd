"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/content/trust";
import { cn } from "@/lib/utils";

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 260;
  return (
    <figure className="flex h-full flex-col rounded-panel border border-line-2 bg-white p-6 shadow-card">
      <div className="flex items-center gap-3">
        <Image src={review.avatar} alt="" width={44} height={44} className="size-11 rounded-full" />
        <figcaption>
          <span className="block text-[15px] font-semibold text-ink-2">{review.name}</span>
          <span className="text-[12.5px] text-muted">Posted on Google</span>
        </figcaption>
        <svg viewBox="0 0 48 48" aria-hidden className="ml-auto size-5">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
          <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
        </svg>
      </div>
      <div className="mt-3 flex text-orange-star" role="img" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} aria-hidden className="size-4 fill-current" />
        ))}
      </div>
      <blockquote className={cn("mt-3 flex-1 text-[15px] leading-relaxed text-body", !expanded && long && "line-clamp-6")}>{review.text}</blockquote>
      {long && (
        <button type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="mt-3 self-start text-[14px] font-semibold text-primary hover:underline">
          {expanded ? "Hide" : "Read more"}
        </button>
      )}
    </figure>
  );
}

/** Scroll-snap carousel: native swipe on touch, prev/next buttons, no autoplay. */
export function Testimonials({ title, subtitle, reviews }: { title: string; subtitle: string; reviews: Review[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 24), behavior: "smooth" });
  };

  return (
    <section id="Testimonials" className="scroll-mt-[var(--header-offset)] bg-gradient-to-b from-primary-soft to-white py-16 sm:py-20" aria-labelledby="testimonials-title" aria-roledescription="carousel">
      <div className="container-content">
        <div className="mb-10 flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <h2 id="testimonials-title" className="font-display text-[26px] font-bold text-navy sm:text-[36px] lg:text-[40px]">
              {title}
            </h2>
            <p className="mt-3 text-[17px] text-body">{subtitle}</p>
            <p className="mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-ink-2">
              <span className="rounded-pill bg-white px-3 py-1 shadow-card">EXCELLENT</span> 4.9 / 5 on Google
            </p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Previous reviews" className="grid size-11 place-items-center rounded-full border border-line-3 bg-white text-primary transition hover:bg-primary hover:text-white disabled:opacity-40">
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label="Next reviews" className="grid size-11 place-items-center rounded-full border border-line-3 bg-white text-primary transition hover:bg-primary hover:text-white disabled:opacity-40">
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </div>
        </div>
        <ul ref={track} className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0} aria-label="Google reviews">
          {reviews.map((review, i) => (
            <li key={review.name} className="w-[85%] shrink-0 snap-start xs:w-[60%] sm:w-[46%] md:w-[31.5%]" aria-roledescription="slide" aria-label={`${i + 1} of ${reviews.length}`}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
