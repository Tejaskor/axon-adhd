import Image from "next/image";
import { hero } from "@/content/home";
import { ctas } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { TrustBar } from "./TrustBar";

/** Full-bleed hero: muted looping video on ≥768px, poster image on mobile (as on the live site). */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative -mt-[var(--header-height)] flex min-h-[533px] items-center overflow-hidden pt-[120px] pb-10 sm:min-h-[640px] lg:min-h-[100vh] lg:pt-[140px]">
      <Image src={hero.poster.src} alt="" fill priority sizes="100vw" className="-z-30 object-cover" />
      {/* Light wash keeps the H1 + trust bar legible over the footage (stronger on mobile). */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-white/65 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/85 sm:via-white/45 sm:to-transparent" />
      <video
        className="absolute inset-0 -z-20 hidden h-full w-full object-cover motion-reduce:hidden sm:block"
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
        <div className="max-w-[640px]">
          <h1 id="hero-title" className="font-display text-[24px] leading-[35px] font-bold tracking-[-1px] text-ink xs:text-[28px] xs:leading-[1.25] sm:text-[40px] sm:leading-[1.2] lg:text-[50px] lg:leading-[1.5]">
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-primary-deep">{hero.titleAccent}</span>
          </h1>
          <p className="mt-4 text-[15px] leading-[26px] font-medium text-body sm:text-[16px] lg:text-[18px] lg:leading-[1.4]">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <ButtonLink href={ctas.evaluation.href} size="lg" className="whitespace-normal text-center">
              {ctas.evaluation.label}
            </ButtonLink>
            <ButtonLink href={ctas.screening.href} variant="outline" size="lg">
              {ctas.screening.label}
            </ButtonLink>
          </div>
          <TrustBar />
        </div>
      </div>
    </section>
  );
}
