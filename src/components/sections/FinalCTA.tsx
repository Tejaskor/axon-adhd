import Image from "next/image";
import { ArrowRight, Brain, ChartNoAxesColumnIncreasing, UserRound, type LucideIcon } from "lucide-react";
import { finalCta } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = { brain: Brain, user: UserRound, growth: ChartNoAxesColumnIncreasing };

/** Icon discs on the glass benefit cards: soft light gradient with a coloured icon. */
const tones: Record<string, string> = {
  purple: "bg-[radial-gradient(circle_at_30%_25%,#F4EEFF,#CDBBFB)] text-[#7C3AED]",
  blue: "bg-[radial-gradient(circle_at_30%_25%,#EEF5FF,#B6D3F0)] text-primary",
  green: "bg-[radial-gradient(circle_at_30%_25%,#EAFBF3,#A9E9CF)] text-[#0E9F6E]",
};

/**
 * Closing CTA: copy and buttons on the left; the photo on the right with a blue glow and three frosted benefit cards
 * floating over its left edge (below md they sit in a row-stack overlapping the photo's bottom instead).
 */
export function FinalCTA() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#061634_0%,#0A2556_50%,#10397F_100%)] py-16 text-white sm:py-20 lg:py-24"
      aria-labelledby="final-cta-title"
    >
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[720px] rounded-full border border-white/[0.06] bg-[radial-gradient(circle,rgba(37,120,202,.22),transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-56 -left-40 -z-10 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(37,120,202,.18),transparent_68%)]" />

      <Container>
        {/* Fixed image column per breakpoint leaves the copy column wide enough (≈632px at 1181, ≈692px at 1440) for both
            buttons on one row from lg up. */}
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_380px] md:gap-12 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_520px] xl:gap-16">
          <Reveal>
            {/* Sized so "You're not broken-and" fits one line on desktop; the hyphenated word never splits at its hyphen. */}
            <h2 id="final-cta-title" className="max-w-[660px] text-[clamp(32px,3.9vw,54px)] leading-[1.1] font-bold tracking-[-0.02em] text-balance">
              {finalCta.title.split(/(\S+-\S+)/).map((part, i) =>
                part.includes("-") ? (
                  <span key={i} className="whitespace-nowrap">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}{" "}
              <span className="text-primary-400">{finalCta.titleAccent}</span>
            </h2>
            <p className="type-body mt-6 max-w-[600px] leading-[1.75] text-pretty text-white/85">{finalCta.text}</p>
            <p className="type-body mt-5 max-w-[600px] font-semibold text-white">{finalCta.lead}</p>
            {/* Side by side when they fit; flex-wrap stacks them only when the column is too narrow. */}
            <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap sm:gap-4">
              <ButtonLink href={finalCta.primary.href} className="group shadow-[0_12px_28px_rgba(37,120,202,.4)]">
                {finalCta.primary.label}
                <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href={finalCta.secondary.href} variant="white" className="group">
                {finalCta.secondary.label}
                <ArrowRight aria-hidden className="size-[18px] shrink-0 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative mx-auto w-full max-w-[420px] md:max-w-none">
            <Image
              src={finalCta.image.src}
              alt={finalCta.image.alt}
              width={finalCta.image.width}
              height={finalCta.image.height}
              sizes="(max-width: 1024px) 90vw, 520px"
              className="h-auto w-full rounded-[28px] shadow-[0_30px_80px_rgba(37,120,202,.35),0_0_0_1px_rgba(255,255,255,.08)]"
            />
            {/*
              The face sits ~30–58% across and ~9–34% down the photo. From md the stack is anchored bottom-left (its top
              stays below ~50% of the image height) and only tucks 24px into the column gap, so it covers chair and
              jacket, never the face. Below md it sits under the photo, overlapping just the bottom edge.
            */}
            <ul
              className={cn(
                "relative z-10 mx-4 -mt-12 flex flex-col gap-2.5 sm:mx-10",
                "md:absolute md:bottom-4 md:-left-6 md:mx-0 md:mt-0 md:w-[min(260px,56%)] lg:bottom-6",
              )}
            >
              {finalCta.benefits.map((b) => {
                const Icon = icons[b.icon];
                return (
                  <li
                    key={b.text}
                    className="flex items-center gap-3 rounded-2xl border border-white/20 bg-[#0E2A5A]/50 px-3.5 py-3 shadow-[0_12px_30px_rgba(3,12,32,.35),inset_0_1px_0_rgba(255,255,255,.15)] backdrop-blur-lg xl:gap-3.5 xl:px-4"
                  >
                    <span aria-hidden className={cn("grid size-10 shrink-0 place-items-center rounded-full xl:size-11", tones[b.tone])}>
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-[14px] leading-snug font-semibold text-white xl:text-[15px]">{b.text}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
