import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { hero } from "@/content/home";
import { ctas } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { TrustBar } from "./TrustBar";

/** Full-bleed hero: muted looping video on ≥768px, poster image on mobile (as on the live site). */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative -mt-[var(--header-height)] flex min-h-[533px] items-start overflow-hidden pt-[124px] pb-12 sm:min-h-[640px] sm:pt-[150px] sm:pb-16 lg:min-h-[calc(100svh-41px)] lg:pt-[172px]"
    >
      {/* Media anchored right of centre so the person stays in frame as the viewport narrows. */}
      <Image src={hero.poster.src} alt="" fill priority sizes="100vw" className="-z-30 object-cover object-[68%_center]" />
      {/* White wash: solid behind the copy, fading out before the person (stronger on mobile, where copy overlays them). */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-white/70 sm:bg-transparent sm:bg-gradient-to-r sm:from-white sm:from-10% sm:via-white/75 sm:via-35% sm:to-transparent sm:to-60%"
      />
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

      <div className="container-content">
        {/* Wide enough for the one-row trust bar; the H1 wraps by its explicit lines, not this width. */}
        <div className="max-w-[700px]">
          <h1 id="hero-title" className="font-display text-[24px] leading-[35px] font-bold tracking-[-1px] text-ink xs:text-[28px] xs:leading-[1.25] sm:text-[40px] sm:leading-[1.2] lg:text-[50px] lg:leading-[1.5]">
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-primary-deep">{hero.titleAccent}</span>
          </h1>
          <p className="mt-4 text-[15px] leading-[26px] font-medium text-body sm:text-[16px] lg:text-[18px] lg:leading-[1.4]">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap sm:gap-4 lg:mt-10">
            <ButtonLink href={ctas.evaluation.href} className="h-auto! min-h-12 py-2.5 whitespace-normal text-center sm:text-[17px]!">
              {ctas.evaluation.label}
              <ArrowRight aria-hidden className="size-[18px] shrink-0" strokeWidth={2.75} />
            </ButtonLink>
            <ButtonLink href={ctas.screening.href} variant="outline" className="sm:text-[17px]!">
              {ctas.screening.label}
              <ArrowRight aria-hidden className="size-[18px] shrink-0" strokeWidth={2.75} />
            </ButtonLink>
          </div>
          <TrustBar />
        </div>
      </div>
    </section>
  );
}
