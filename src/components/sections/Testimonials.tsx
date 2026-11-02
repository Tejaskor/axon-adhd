"use client";

import Image from "next/image";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type TouchEvent,
} from "react";
import type { Review } from "@/content/trust";
import { Container } from "@/components/ui/Container";
import { cn, formatDate } from "@/lib/utils";

/** Slides cloned on each side of the track: the most cards ever visible at once (desktop). */
const CLONES = 3;
const DURATION = 600;
const INTERVAL = 5000;
const SWIPE = 50;

const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Closing-quote colour per card, cycling through the brand accents like the design. */
const quoteTones = ["text-primary-400", "text-[#3FD39A]", "text-[#FDBA74]"];

function timeAgo(iso: string, now: number) {
  const months = Math.floor(
    (now - Date.parse(iso)) / (30.44 * 24 * 3600 * 1000),
  );
  if (months < 1) return "this month";
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

// Read once, on the client only, so every card agrees and the snapshot stays stable.
let clientNow: number | undefined;
const noSubscribe = () => () => {};

/** Shows the exact date on the server, then "4 months ago" after hydration (relative time can't be prerendered). */
function ReviewDate({ iso }: { iso: string }) {
  const now = useSyncExternalStore(
    noSubscribe,
    () => (clientNow ??= Date.now()),
    () => null,
  );
  const label = now === null ? formatDate(iso) : timeAgo(iso, now);
  return (
    <time
      dateTime={iso}
      title={formatDate(iso)}
      className="block text-[14px] text-muted lg:text-[15px]"
    >
      {label}
    </time>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span
      className="flex text-[#F6B300]"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            className,
            i < rating ? "fill-current" : "fill-none opacity-40",
          )}
        />
      ))}
    </span>
  );
}

function ReviewCard({ review, tone }: { review: Review; tone: string }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 200;
  const initials = review.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    // Every region has a fixed or reserved size, so all cards share one height and their rows line up.
    <figure className="flex h-full w-full flex-col rounded-[22px] border border-[#E6EEF8] bg-white p-5 shadow-[0_10px_24px_-6px_rgba(30,64,120,.12)] xl:p-6">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt=""
            width={96}
            height={96}
            className="size-14 rounded-full object-cover shadow-[0_4px_12px_rgba(15,27,46,.12)] ring-[3px] ring-white xl:size-16"
          />
        ) : (
          <span
            aria-hidden
            className="grid size-14 place-items-center rounded-full bg-[#E3EDFC] text-[18px] font-bold text-primary-600 xl:size-16"
          >
            {initials}
          </span>
        )}
        {/* Fits a two-line name, so the review text starts at the same height on every card. */}
        <figcaption className="min-h-[90px] min-w-0 pt-0.5">
          <span className="block text-[16px] leading-snug font-bold break-words text-navy xl:text-[17px]">
            {review.name}
          </span>
          <ReviewDate iso={review.date} />
          <span className="mt-1.5 flex items-center gap-1">
            <Stars rating={review.rating} className="size-4" />
            <BadgeCheck
              aria-label="Verified Google review"
              className="ml-0.5 size-4 shrink-0 fill-primary text-white"
            />
          </span>
        </figcaption>
        <GoogleIcon className="mt-0.5 size-6" />
      </div>

      <blockquote className="relative mt-4 pl-4 text-[15px] leading-[1.65] text-ink-2">
        <span
          aria-hidden
          className="absolute top-0 left-0 font-serif text-[22px] leading-none text-[#C9D3E0]"
        >
          &ldquo;
        </span>
        {/* Exactly six lines tall: clamped when collapsed, scrolls inside when expanded, so the card never grows. */}
        <p
          className={cn(
            "h-[9.9em]",
            expanded
              ? "overflow-y-auto pr-1 [scrollbar-width:thin]"
              : "line-clamp-6",
          )}
          tabIndex={expanded ? 0 : undefined}
        >
          &ldquo;{review.text}&rdquo;
        </p>
      </blockquote>

      <div className="mt-1 flex h-10 items-center justify-between pl-4">
        {long ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="text-[14px] font-semibold text-primary hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        ) : (
          <span />
        )}
        <span
          aria-hidden
          className={cn(
            "h-10 font-serif text-[64px] leading-[0.9] font-bold opacity-30 select-none",
            tone,
          )}
        >
          &rdquo;
        </span>
      </div>
    </figure>
  );
}

function RatingSummary({
  rating,
}: {
  rating: { label: string; score: number; outOf: number; count: number };
}) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <p className="text-[20px] font-extrabold tracking-[0.04em] text-navy xl:text-[22px]">
        {rating.label}
      </p>
      <p className="mt-2 flex items-baseline gap-2 text-navy">
        <span className="font-display text-[52px] leading-none font-extrabold tracking-[-0.02em] xl:text-[64px]">
          {rating.score}
        </span>
        <span className="text-[24px] font-medium text-muted xl:text-[28px]">
          / {rating.outOf}
        </span>
      </p>
      <span className="mt-3">
        <Stars rating={5} className="size-7 xl:size-9" />
      </span>
      <p className="mt-3 text-[15px] text-ink-2 xl:text-[17px]">
        Based on{" "}
        <strong className="font-bold text-navy">{rating.count} reviews</strong>
      </p>
      <p
        className="mt-1 text-[34px] leading-none font-medium tracking-[-0.02em] xl:text-[40px]"
        aria-label="on Google"
      >
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </p>
      <svg
        aria-hidden
        viewBox="0 0 100 40"
        className="absolute -right-4 -bottom-12 hidden w-[84px] text-[#7B8FAE] lg:block"
        fill="none"
      >
        <path
          d="M2 4c6 22 30 36 88 22"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M82 18l9 8-11 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

type Props = {
  title: string;
  titleAccent: string;
  subtitle: string;
  reviews: Review[];
  rating: { label: string; score: number; outOf: number; count: number };
};

/**
 * Looping review carousel: 1 / 2 / 3 cards (mobile / tablet / desktop), autoplay that pauses on hover, focus, touch or
 * a hidden tab, arrows, dots and swipe. Clones of the first/last cards sit on each side of the track; after sliding
 * onto a clone the track snaps (without transition) to the matching real card, so the loop never shows a gap.
 */
export function Testimonials({
  title,
  titleAccent,
  subtitle,
  reviews,
  rating,
}: Props) {
  const count = reviews.length;
  const slides = [
    ...reviews.slice(-CLONES),
    ...reviews,
    ...reviews.slice(0, CLONES),
  ];

  const [index, setIndex] = useState(CLONES);
  const [animate, setAnimate] = useState(true);
  const [per, setPer] = useState(3);
  const [reduced, setReduced] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [drag, setDrag] = useState<number | null>(null);
  const indexRef = useRef(CLONES);
  const busy = useRef(false);
  const touch = useRef<{
    x: number;
    y: number;
    horizontal: boolean | null;
  } | null>(null);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1181px)");
    const sm = window.matchMedia("(min-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setPer(lg.matches ? 3 : sm.matches ? 2 : 1);
      setReduced(motion.matches);
    };
    sync();
    [lg, sm, motion].forEach((q) => q.addEventListener("change", sync));
    return () =>
      [lg, sm, motion].forEach((q) => q.removeEventListener("change", sync));
  }, []);

  const go = useCallback(
    (to: number) => {
      if (busy.current) return;
      busy.current = true;
      setAnimate(true);
      indexRef.current = to;
      setIndex(to);
      window.setTimeout(
        () => {
          const real = mod(indexRef.current - CLONES, count) + CLONES;
          if (real !== indexRef.current) {
            setAnimate(false);
            indexRef.current = real;
            setIndex(real);
          }
          // Re-enable the transition only after the snap has painted.
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              setAnimate(true);
              busy.current = false;
            }),
          );
        },
        reduced ? 0 : DURATION,
      );
    },
    [count, reduced],
  );

  const paused = hovered || focused || drag !== null || reduced;
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (!document.hidden) go(indexRef.current + 1);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, go]);

  const onTouchStart = (e: TouchEvent) => {
    if (busy.current) return;
    touch.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      horizontal: null,
    };
  };
  const onTouchMove = (e: TouchEvent) => {
    const t = touch.current;
    if (!t) return;
    const dx = e.touches[0].clientX - t.x;
    const dy = e.touches[0].clientY - t.y;
    if (t.horizontal === null && Math.max(Math.abs(dx), Math.abs(dy)) > 8)
      t.horizontal = Math.abs(dx) > Math.abs(dy);
    if (t.horizontal) setDrag(dx);
  };
  const onTouchEnd = () => {
    const dx = drag ?? 0;
    touch.current = null;
    setDrag(null);
    if (Math.abs(dx) > SWIPE) go(indexRef.current + (dx < 0 ? 1 : -1));
  };

  const real = mod(index - CLONES, count);
  const pages = Math.ceil(count / per);
  const page = Math.min(Math.floor(real / per), pages - 1);

  return (
    <section
      id="Testimonials"
      className="relative isolate scroll-mt-[var(--header-offset)] overflow-hidden bg-[linear-gradient(180deg,#F5F9FF_0%,#EEF4FD_100%)] py-16 sm:py-20"
      aria-labelledby="testimonials-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[38%] -left-40 -z-10 h-[420px] w-[560px] rotate-[-12deg] rounded-[45%_55%_60%_40%] bg-[linear-gradient(160deg,rgba(219,234,254,.9),rgba(232,241,253,.5))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 -z-10 size-[420px] rounded-full border border-white/80 bg-white/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 -right-40 -z-10 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(219,234,254,.85),transparent_68%)]"
      />

      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <h2
            id="testimonials-title"
            className="type-h1 font-extrabold text-navy"
          >
            {title} <span className="text-primary">{titleAccent}</span>
          </h2>
          <p className="type-body mt-3 text-body">{subtitle}</p>
        </div>

        {/*
          Row 1: summary + carousel (summary centres on the cards alone). Row 2: dots under the carousel column.
          From sm the carousel reserves a 48px lane on each side for the arrows, so they never sit on a card.
        */}
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-x-6 xl:grid-cols-[230px_minmax(0,1fr)] xl:gap-x-8">
          <div className="self-center">
            <RatingSummary rating={rating} />
          </div>

          <div
            className="relative min-w-0 sm:px-12"
            aria-roledescription="carousel"
            aria-label="Google reviews"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
            }}
          >
            <div
              className="-mx-3 -my-6 touch-pan-y overflow-hidden py-6"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onTouchCancel={onTouchEnd}
            >
              <ul
                className="flex [--per:1] sm:[--per:2] lg:[--per:3]"
                aria-live={paused ? "polite" : "off"}
                style={{
                  transform: `translate3d(calc(${-index} * 100% / var(--per) + ${drag ?? 0}px), 0, 0)`,
                  transition:
                    animate && drag === null && !reduced
                      ? `transform ${DURATION}ms cubic-bezier(.22,.61,.36,1)`
                      : "none",
                }}
              >
                {slides.map((review, i) => {
                  const clone = i < CLONES || i >= CLONES + count;
                  const visible = i >= index && i < index + per;
                  return (
                    <li
                      key={clone ? `clone-${i}` : review.name}
                      className="flex shrink-0 basis-[calc(100%/var(--per))] px-3"
                      aria-roledescription="slide"
                      aria-label={
                        clone ? undefined : `${i - CLONES + 1} of ${count}`
                      }
                      aria-hidden={clone || !visible || undefined}
                      inert={!visible}
                    >
                      <ReviewCard
                        review={review}
                        tone={
                          quoteTones[mod(i - CLONES, count) % quoteTones.length]
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => go(indexRef.current - 1)}
              aria-label="Previous review"
              className="absolute top-1/2 left-0 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full border border-primary-100 bg-white text-navy shadow-[0_6px_16px_rgba(15,27,46,.10)] transition hover:bg-primary hover:text-white sm:grid"
            >
              <ChevronLeft aria-hidden className="size-5" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => go(indexRef.current + 1)}
              aria-label="Next review"
              className="absolute top-1/2 right-0 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full border border-primary-100 bg-white text-navy shadow-[0_6px_16px_rgba(15,27,46,.10)] transition hover:bg-primary hover:text-white sm:grid"
            >
              <ChevronRight aria-hidden className="size-5" strokeWidth={2.25} />
            </button>
          </div>

          <div className="-mt-2 flex justify-center gap-1 lg:col-start-2">
            {Array.from({ length: pages }, (_, p) => (
              <button
                key={p}
                type="button"
                onClick={() => go(CLONES + p * per)}
                aria-label={`Show reviews page ${p + 1} of ${pages}`}
                aria-current={p === page || undefined}
                className="grid size-7 place-items-center"
              >
                <span
                  className={cn(
                    "block size-3 rounded-full transition-colors duration-300",
                    p === page
                      ? "bg-primary"
                      : "bg-[#CBD5E1] hover:bg-[#94A3B8]",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
