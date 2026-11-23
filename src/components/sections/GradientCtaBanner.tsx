import Image from "next/image";
import type { ReactNode } from "react";
import type { CtaSection } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { ExpandOnScroll } from "@/components/ui/ExpandOnScroll";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Arrow } from "./AccommodationSections";
const LOGO_W = 150;
const LOGO_H = 53;

/** The "AXON ADHD" logo repeated (staggered) across the whole band, pale and slightly translucent, so the brand name shows in the background. */
function PlainBannerLogos() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full opacity-[.26]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="axon-adhd-logos" width="420" height="250" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <image href="/images/brand/axon-adhd-footer-logo.svg" x="20" y="24" width={LOGO_W} height={LOGO_H} />
          <image href="/images/brand/axon-adhd-footer-logo.svg" x="230" y="146" width={LOGO_W} height={LOGO_H} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#axon-adhd-logos)" />
    </svg>
  );
}

/**
 * Full-bleed blue call-to-action band: optional pill, heading with a cyan accent and curved underline, intro, one or two
 * pill buttons and the clipboard artwork on the right (stacked below the copy before lg). `accent` is the part of the
 * title shown in cyan. `splitFromSm` keeps the copy-left / artwork-right layout from 768px instead of 1181px (the artwork then
 * fills the band's full height on the right, at most 44% wide, cropped by object-cover rather than stretched) and hides the
 * artwork below 768px, where the copy takes the full width. `plain` drops the artwork and uses the lighter-left-to-navy-right gradient with a
 * soft, blurred ADHD doodle pattern across the whole band, with the AXON ADHD logo repeated over it. Used by the assessment page's "Ready for an Official Diagnosis?" and the ADHD Care "Haven't Started Yet?".
 */
export function GradientCtaBanner({ data, accent, titleId, splitFromSm = false, plain = false, scrim = false, aside, actionsWithAside = false }: { data: CtaSection; accent: string; titleId: string; splitFromSm?: boolean; plain?: boolean; /** With `plain`: a darker navy wash behind the copy on the left (fading out to the right) so the text stays clearly readable over the pattern. */ scrim?: boolean; /** Replaces the buttons with a card on the right of the copy (two columns from lg). */ aside?: ReactNode; /** Keep the buttons under the copy when an `aside` is given (otherwise the aside replaces them). */ actionsWithAside?: boolean }) {
  const [before, after] = data.title.includes(accent) ? data.title.split(accent) : [data.title, ""];
  const pill = "group rounded-full! px-7! whitespace-normal transition duration-300 hover:-translate-y-0.5 max-sm:px-5! max-sm:text-[14px]!";
  return (
    // Full-bleed band: no outer padding, so it sits flush against the sections above and below.
    <section aria-labelledby={titleId}>
      <ExpandOnScroll>
        <div className={cn("relative isolate overflow-hidden text-white", plain ? "bg-[linear-gradient(100deg,#2B72DB_0%,#2060C4_45%,#1A4789_100%)]" : "bg-[linear-gradient(110deg,#0160CC_0%,#013A94_36%,#0148B8_68%,#0A6FDC_100%)]")}>
          {plain ? (
            // Soft, blurred ADHD doodle pattern (brain, tangled lines, "bouncy mind", lightbulb...) across the whole band: the light-on-white sketch
            // is inverted and screened over the gradient at low opacity, so it shows as a faint pale texture. The AXON ADHD logo is repeated over it.
            <>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-[.45] mix-blend-screen [filter:invert(1)_brightness(5)_blur(1px)]"
                style={{ backgroundImage: "url(/images/assessment/cta-banner-doodle-pattern.webp)", backgroundSize: "640px auto", backgroundRepeat: "repeat" }}
              />
              <PlainBannerLogos />
              {scrim && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(90deg,rgba(7,36,90,.58)_0%,rgba(7,36,90,.44)_38%,rgba(7,36,90,.14)_62%,rgba(7,36,90,0)_76%)]"
                />
              )}
            </>
          ) : (
            /* Two soft lighter waves, top centre and bottom left. */
            <svg aria-hidden viewBox="0 0 1000 400" preserveAspectRatio="none" fill="none" className="absolute inset-0 -z-10 size-full max-lg:hidden">
              <path d="M380 0C470 70 600 95 760 60C830 44 890 20 940 0Z" fill="rgba(80,160,255,.28)" />
              <path d="M0 400V330C70 350 180 400 300 400Z" fill="rgba(60,140,255,.3)" />
            </svg>
          )}

          {/* Copy stays on the site's content width (the header's box) while the band itself runs edge to edge. */}
          <div className={cn("relative z-10 mx-auto w-full max-w-[1372px] px-4 py-10 sm:py-12 lg:py-14", !!aside && "grid items-center gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-20")}>
            <Reveal className={aside ? undefined : splitFromSm ? "sm:w-[56%]" : "lg:w-[56%]"}>
              {data.eyebrow && <p className="inline-block rounded-full bg-white/18 px-5 py-2 text-[15px] font-medium text-white/95 backdrop-blur-sm sm:text-[17px]">{data.eyebrow}</p>}
              <h2 id={titleId} className={cn("type-h2 text-balance", data.eyebrow && "mt-4")}>
                {before}
                {before !== data.title && (
                  <span className="relative inline-block text-[#4EDEFC]">
                    {accent}
                    <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-[2%] -bottom-[0.22em] h-[0.2em] w-[96%]" fill="none">
                      <path d="M2 10 C 70 2, 190 2, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                )}
                {after}
              </h2>
              {data.subtitle && <p className={cn("mt-5 text-pretty text-white/92", aside ? "max-w-[780px]" : "max-w-[640px]", plain ? "text-[16px] leading-[1.7] sm:text-[20px]" : "text-[16px] leading-[1.65] sm:text-[18px]")}>{data.subtitle}</p>}
              {(!aside || actionsWithAside) && (
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <ButtonLink href={data.primary.href} size="lg" variant={data.ctaStyle === "light" ? "white" : undefined} borderColor={data.ctaStyle === "homepage" ? "#FFFFFF" : undefined} className={cn(pill, "bg-white! font-semibold text-[#0A4FF0]! shadow-[0_10px_26px_-8px_rgba(0,20,80,.5)]! hover:bg-[#EAF2FF]!")}>
                  {data.primary.label}
                  <Arrow />
                </ButtonLink>
                {data.secondary && (
                  <ButtonLink
                    href={data.secondary.href}
                    size="lg"
                    variant={data.ctaStyle === "light" || data.ctaStyle === "homepage" ? "white" : undefined}
                    className={cn(pill, "border border-[#0CB4F6] bg-[linear-gradient(90deg,#0066FC,#009CFC)]! font-semibold text-white! shadow-[0_10px_30px_-6px_rgba(0,156,252,.65)]! hover:brightness-110")}
                  >
                    {data.secondary.label}
                    <Arrow />
                  </ButtonLink>
                )}
              </div>
              )}
            </Reveal>
            {aside && <Reveal delay={0.1}>{aside}</Reveal>}
          </div>

          {!plain && (
            <>
              {/* Clipboard artwork: fills the right of the card from lg (fading into the blue on its left edge), stacked below the copy before that. */}
              <div
                className={
                  splitFromSm
                    ? "hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_24%)] sm:absolute sm:inset-y-0 sm:right-0 sm:block sm:h-full sm:aspect-[739/728] sm:max-w-[44%]"
                    : "relative aspect-[739/728] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_22%)] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-[739/728] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_24%)]"
                }
              >
                <Image src="/images/assessment/journey/cta-banner-official-diagnosis-summary.webp" alt="ADHD Assessment Summary clipboard showing attention, impulsivity and activity level bars with a completed clinical evaluation checklist" fill sizes={splitFromSm ? "(min-width: 768px) 640px, 100vw" : "(min-width: 1024px) 640px, 100vw"} className="object-cover object-[60%_center]" />
              </div>
            </>
          )}
        </div>
      </ExpandOnScroll>
    </section>
  );
}
