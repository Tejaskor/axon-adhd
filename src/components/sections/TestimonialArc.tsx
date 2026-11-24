"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { ReviewDate, type Review } from "./Testimonials";

type Rating = { label?: string; score: number; outOf: number; count: number | string };

type Props = {
  title: string;
  titleAccent: string;
  subtitle?: string;
  link?: { label: string; href: string };
  reviews: Review[];
  rating: Rating;
};

const INTERVAL = 6000;
const ARC = "#256ACC";
const STAR = "#F6B300";
/** Arc spans ±SWEEP degrees; reviewers sit STEP degrees apart on it. The circle's centre is at x = 0. */
const SWEEP = 56;
const STEP = 30;

/** Desktop / compact (phones) geometry, px. */
const GEO = {
  full: { radius: 240, height: 440, active: 88, side: 64 },
  compact: { radius: 200, height: 360, active: 64, side: 46 },
};

const mod = (n: number, m: number) => ((n % m) + m) % m;
const rad = (deg: number) => (deg * Math.PI) / 180;

function Avatar({ review, size, active }: { review: Review; size: number; active: boolean }) {
  const initials = review.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      style={{ width: size, height: size, borderColor: ARC }}
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full border-[3px] bg-white p-[2px] transition-[width,height] duration-500 ease-out",
        active ? "shadow-[0_10px_24px_-8px_rgba(37,106,204,.55)]" : "shadow-[0_6px_14px_-6px_rgba(37,106,204,.4)]",
      )}
    >
      {review.avatar ? (
        <Image src={review.avatar} alt="" width={160} height={160} className="size-full rounded-full object-cover" />
      ) : (
        <span aria-hidden className="grid size-full place-items-center rounded-full bg-navy text-[13px] font-bold text-white">
          {initials}
        </span>
      )}
    </span>
  );
}

function GoogleWord() {
  return (
    <span className="font-medium" aria-label="Google">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

/**
 * Reviewer list laid out on a thin arc: the selected reviewer sits at the arc's apex (larger), the previous and next one
 * above and below it. Selecting a reviewer (click, arrow keys or autoplay) rotates the arc and swaps the quote.
 */
export function TestimonialArc({ title, titleAccent, subtitle, link, reviews, rating }: Props) {
  const n = reviews.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 639px)");
    const sync = () => {
      setReduced(motion.matches);
      setCompact(small.matches);
    };
    sync();
    [motion, small].forEach((q) => q.addEventListener("change", sync));
    return () => [motion, small].forEach((q) => q.removeEventListener("change", sync));
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((a) => mod(a + 1, n));
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, reduced, n]);

  const current = reviews[active];
  const g = compact ? GEO.compact : GEO.full;
  const cy = g.height / 2;
  const arcStart = { x: g.radius * Math.cos(rad(-SWEEP)), y: cy + g.radius * Math.sin(rad(-SWEEP)) };
  const arcEnd = { x: g.radius * Math.cos(rad(SWEEP)), y: cy + g.radius * Math.sin(rad(SWEEP)) };

  return (
    <section
      id="Testimonials"
      className="relative isolate scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(108deg,#dfeaf4_19.84%,hsla(0,0%,100%,0.2)_62.33%)] section-py"
      aria-labelledby="testimonials-title"
    >
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 id="testimonials-title" className="type-h2 text-navy">
            {title} <span className="text-primary">{titleAccent}</span>
          </h2>
          {subtitle && <p className="mt-3 text-[16px] leading-[1.7] sm:text-[20px] text-body">{subtitle}</p>}
          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener"
              className="type-body mt-3 inline-block font-semibold text-primary underline underline-offset-4"
            >
              {link.label}
            </a>
          )}
          <span className="mt-5 flex justify-center gap-3 sm:gap-4" role="img" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} aria-hidden className="size-7 sm:size-9" style={{ fill: STAR, color: STAR }} />
            ))}
          </span>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 text-[16px] text-ink-2 sm:text-[18px]">
            {rating.label && <strong className="font-extrabold tracking-[0.02em] text-navy">{rating.label}</strong>}
            <span className="font-bold text-navy">
              {rating.score} / {rating.outOf}
            </span>
            <span>
              Based on 100+ reviews on <GoogleWord />
            </span>
          </p>
        </div>

        <div
          className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-x-8 xl:gap-x-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          {/* Arc of reviewers */}
          <div
            role="tablist"
            aria-label="Reviewers"
            aria-orientation="vertical"
            className="relative w-full max-w-[430px]"
            style={{ height: g.height }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") setActive((a) => mod(a + 1, n));
              if (e.key === "ArrowUp" || e.key === "ArrowLeft") setActive((a) => mod(a - 1, n));
            }}
          >
            <svg
              aria-hidden
              className="pointer-events-none absolute top-0 overflow-visible"
              style={{ left: -arcStart.x }}
              width={g.radius + 4}
              height={g.height}
              fill="none"
            >
              <path
                d={`M ${arcStart.x} ${arcStart.y} A ${g.radius} ${g.radius} 0 0 1 ${arcEnd.x} ${arcEnd.y}`}
                stroke={ARC}
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>

            {reviews.map((review, i) => {
              let d = mod(i - active, n);
              if (d > n / 2) d -= n;
              const isActive = d === 0;
              const visible = Math.abs(d) <= 1;
              const angle = rad(Math.max(-2, Math.min(2, d)) * STEP);
              const size = isActive ? g.active : g.side;
              const x = g.radius * Math.cos(angle);
              const y = cy + g.radius * Math.sin(angle);
              return (
                <button
                  key={review.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!visible || undefined}
                  disabled={!visible}
                  onClick={() => setActive(i)}
                  style={{
                    left: x - arcStart.x - size / 2,
                    top: y,
                    opacity: visible ? 1 : 0,
                    transform: "translateY(-50%)",
                  }}
                  className="absolute flex max-w-[calc(100%-1rem)] items-center gap-3 text-left transition-[left,top,opacity] duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:gap-4"
                >
                  <Avatar review={review} size={size} active={isActive} />
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block truncate leading-tight font-medium text-navy transition-[font-size] duration-500",
                        isActive ? "text-[18px] sm:text-[22px]" : "text-[15px] sm:text-[18px]",
                      )}
                    >
                      {review.name}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 text-muted">
                      <Star aria-hidden className="size-4 shrink-0" style={{ fill: STAR, color: STAR }} />
                      <span className="text-[14px] font-semibold sm:text-[16px]" style={{ color: "#E8A317" }}>
                        {(review.rating ?? 5).toFixed(1)}
                      </span>
                      {review.date ? (
                        <span className="text-[13px] [&_time]:inline [&_time]:text-[inherit] sm:text-[15px]">
                          <ReviewDate iso={review.date} />
                        </span>
                      ) : review.role ? (
                        <span className="text-[13px] sm:text-[15px]">{review.role}</span>
                      ) : null}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quote card */}
          <figure
            className="relative min-w-0 rounded-[28px] border border-[#34365B] bg-[linear-gradient(145deg,#080B2E_0%,#151137_45%,#333354_75%,#514F79_100%)] px-6 py-8 shadow-[0_24px_60px_-20px_rgba(8,11,46,.55)] sm:px-10 sm:py-10"
            aria-live={paused ? "polite" : "off"}
          >
            <Quote aria-hidden className="size-9 fill-current sm:size-11" style={{ color: "#8482B8" }} />
            <blockquote
              key={active}
              className="mt-3 max-h-[300px] animate-[fadeIn_.5s_ease-out] overflow-y-auto pr-2 pl-0 [scrollbar-width:thin] sm:pl-4"
            >
              <p className="text-[20px] leading-[1.7] text-white/90 italic">{current.text}</p>
            </blockquote>
            <figcaption className="sr-only">{current.name}</figcaption>
          </figure>
        </div>
      </Container>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
