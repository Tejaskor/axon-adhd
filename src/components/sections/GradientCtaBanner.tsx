import Image from "next/image";
import type { CtaSection } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Arrow } from "./AccommodationSections";

/**
 * Full-bleed blue call-to-action band: optional pill, heading with a cyan accent and curved underline, intro, one or two
 * pill buttons and the clipboard artwork on the right (stacked below the copy before lg). `accent` is the part of the
 * title shown in cyan. Used by the assessment page's "Ready for an Official Diagnosis?" and the ADHD Care "Haven't Started Yet?".
 */
export function GradientCtaBanner({ data, accent, titleId }: { data: CtaSection; accent: string; titleId: string }) {
  const [before, after] = data.title.includes(accent) ? data.title.split(accent) : [data.title, ""];
  const pill = "group rounded-full! px-7! whitespace-normal transition duration-300 hover:-translate-y-0.5 max-sm:px-5! max-sm:text-[14px]!";
  return (
    // Full-bleed band: no outer padding, so it sits flush against the sections above and below.
    <section aria-labelledby={titleId}>
      <div>
        <div className="relative isolate overflow-hidden bg-[linear-gradient(110deg,#0160CC_0%,#013A94_36%,#0148B8_68%,#0A6FDC_100%)] text-white">
          {/* Two soft lighter waves, top centre and bottom left. */}
          <svg aria-hidden viewBox="0 0 1000 400" preserveAspectRatio="none" fill="none" className="absolute inset-0 -z-10 size-full max-lg:hidden">
            <path d="M380 0C470 70 600 95 760 60C830 44 890 20 940 0Z" fill="rgba(80,160,255,.28)" />
            <path d="M0 400V330C70 350 180 400 300 400Z" fill="rgba(60,140,255,.3)" />
          </svg>

          {/* Copy stays on the site's content width (the header's box) while the band itself runs edge to edge. */}
          <div className="relative z-10 mx-auto w-full max-w-[1372px] px-4 py-10 sm:py-12 lg:py-14">
            <Reveal className="lg:w-[56%]">
              {data.eyebrow && <p className="inline-block rounded-full bg-white/18 px-5 py-2 text-[15px] font-medium text-white/95 backdrop-blur-sm sm:text-[17px]">{data.eyebrow}</p>}
              <h2 id={titleId} className={cn("type-section font-display leading-[1.2] tracking-[-0.02em] text-balance", data.eyebrow && "mt-4")}>
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
              {data.subtitle && <p className="mt-5 max-w-[640px] text-[16px] leading-[1.65] text-pretty text-white/92 sm:text-[18px]">{data.subtitle}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <ButtonLink href={data.primary.href} size="lg" className={cn(pill, "bg-white! font-semibold text-[#0A4FF0]! shadow-[0_10px_26px_-8px_rgba(0,20,80,.5)]! hover:bg-[#EAF2FF]!")}>
                  {data.primary.label}
                  <Arrow />
                </ButtonLink>
                {data.secondary && (
                  <ButtonLink
                    href={data.secondary.href}
                    size="lg"
                    className={cn(pill, "border border-[#0CB4F6] bg-[linear-gradient(90deg,#0066FC,#009CFC)]! font-semibold text-white! shadow-[0_10px_30px_-6px_rgba(0,156,252,.65)]! hover:brightness-110")}
                  >
                    {data.secondary.label}
                    <Arrow />
                  </ButtonLink>
                )}
              </div>
            </Reveal>
          </div>

          {/* Clipboard artwork: fills the right of the card from lg (fading into the blue on its left edge), stacked below the copy before that. */}
          <div className="relative aspect-[739/728] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_22%)] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-[739/728] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_24%)]">
            <Image src="/images/assessment/journey/official-diagnosis.webp" alt="ADHD Assessment Summary clipboard showing attention, impulsivity and activity level bars with a completed clinical evaluation checklist" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover object-[60%_center]" />
          </div>
        </div>
      </div>
    </section>
  );
}
