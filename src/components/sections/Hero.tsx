import Image from "next/image";
import { Oswald } from "next/font/google";
import { ArrowRight, Star } from "lucide-react";
import { hero } from "@/content/home";
import { ctas, site } from "@/content/site";
import { trustBar } from "@/content/trust";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Condensed face for the Psychology Today wordmark only; next/font preloads it just where this hero renders.
const condensed = Oswald({ subsets: ["latin"], weight: "600", display: "swap" });

/**
 * Full-bleed hero: muted looping video on ≥768px (poster image on mobile) under a deep navy wash that is solid behind
 * the copy on the left and fades out before the person; white copy, light-blue accent line, two pill CTAs, trust row.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-[var(--header-height)] flex min-h-[600px] items-center overflow-hidden pt-[124px] pb-14 text-white sm:min-h-[660px] sm:pt-[150px] sm:pb-16 lg:min-h-[calc(100svh-41px)] lg:pt-[140px]"
    >
      {/* Media anchored right of centre so the person stays in frame as the viewport narrows. */}
      <Image src={hero.poster.src} alt="" fill priority sizes="100vw" className="-z-30 object-cover object-[68%_center]" />
      <video
        className="absolute inset-0 -z-20 hidden h-full w-full object-cover object-[68%_center] motion-reduce:hidden sm:block"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={hero.poster.src}
        aria-hidden
      >
        <source src={hero.video} type="video/webm" />
      </video>
      {/* Navy wash: even over the whole frame on mobile (copy overlays the person), a left-to-right fade from sm. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#0A2740]/80 sm:bg-transparent sm:bg-[linear-gradient(90deg,rgba(8,34,58,.94)_0%,rgba(10,39,64,.86)_30%,rgba(12,44,70,.55)_48%,rgba(12,44,70,0)_64%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-[#08223A]/50 to-transparent" />

      <div className="mx-auto w-full max-w-[1372px] px-4">
        <div className="max-w-[760px]">
          <h1 id="hero-title" className="text-[clamp(34px,4.6vw,64px)] leading-[1.15] font-bold tracking-[-0.01em]">
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-[#80D0F8]">
              {hero.titleAccent.lead}
              <span className="relative inline-block whitespace-nowrap">
                {hero.titleAccent.underline}
                <svg aria-hidden viewBox="0 0 300 16" fill="none" preserveAspectRatio="none" className="absolute right-[5%] -bottom-[0.34em] h-[0.26em] w-[58%]">
                  <path d="M3 13C80 4 200 1 297 6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>
          <p className="mt-8 text-[clamp(18px,1.9vw,26px)] leading-[1.4] font-medium text-white/95 sm:mt-10">
            {hero.subtitleLines.map((line) => (
              <span key={line} className="sm:block">
                {line}{" "}
              </span>
            ))}
          </p>

          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap sm:gap-4 lg:mt-10">
            <ButtonLink
              href={ctas.evaluation.href}
              size="lg"
              className="group h-14 gap-2 bg-[#0058F0]! font-semibold whitespace-normal shadow-[0_12px_28px_rgba(0,88,240,.4)]! hover:bg-[#004FD8]!"
            >
              {ctas.evaluation.label}
              <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </ButtonLink>
            <ButtonLink
              href={ctas.screening.href}
              size="lg"
              variant="white"
              className="group h-14 gap-2 border-2 border-[#0058F0] font-semibold text-[#0058F0]! hover:bg-[#EAF2FF]!"
            >
              {ctas.screening.label}
              <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </ButtonLink>
          </div>

          <ul aria-label="Why people trust AXON ADHD" className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5 sm:mt-12 lg:w-max lg:flex-nowrap lg:gap-x-7">
            <li className="flex items-center gap-3">
              <Image src={trustBar.google.src} alt={trustBar.google.alt} width={44} height={44} className="size-10 lg:size-11" />
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold">{hero.trust.label}</span>
                <span className="mt-0.5 flex items-center gap-2">
                  <span className="text-[17px] font-semibold">{hero.trust.rating}</span>
                  <span className="flex gap-0.5 text-[#F0B800]" aria-hidden>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-[15px] fill-current" strokeWidth={0} />
                    ))}
                  </span>
                  <span className="text-[13px] text-white/85">{hero.trust.reviews}</span>
                  <span className="sr-only"> on Google</span>
                </span>
              </span>
            </li>
            <li aria-hidden className="hidden h-12 w-px bg-[#4C92BF]/70 sm:block" />
            <li className="flex flex-col items-center gap-2">
              <span className="flex -space-x-2.5">
                {trustBar.avatars.map((a) => (
                  <Image key={a.src} src={a.src} alt="" width={40} height={40} className="size-10 rounded-full border-2 border-white object-cover" />
                ))}
              </span>
              <span className="max-w-[170px] text-center text-[15px] leading-snug font-semibold">{trustBar.helped}</span>
            </li>
            <li aria-hidden className="hidden h-16 w-px bg-white/30 sm:block" />
            <li>
              {/* "Verified by Psychology Today" drawn for the dark hero: open white ring, green check breaking out of it. */}
              <a href={site.psychologyTodayUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-opacity hover:opacity-85">
                <svg aria-hidden viewBox="0 0 64 64" fill="none" className="size-14 shrink-0 lg:size-16">
                  <path d="M50.5 21.5A23 23 0 1 1 41 12.6" stroke="#E8E8E8" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M17 34l10 10 25-29" stroke="#30C810" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="flex flex-col leading-none">
                  <span className="text-[13px] font-bold tracking-[0.08em] text-[#E8E8E8] lg:text-[15px]">VERIFIED BY</span>
                  <span className={cn(condensed.className, "mt-1 text-[28px] font-semibold tracking-[-0.01em] text-[#44A0E8] lg:text-[32px]")}>Psychology Today</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
