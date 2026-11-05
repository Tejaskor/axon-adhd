import { ArrowRight } from "lucide-react";
import type { CtaSection } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const tones = {
  teal: {
    bg: "bg-[linear-gradient(135deg,#00404C_0%,#004B57_45%,#02586A_100%)]",
    glowA: "bg-[#20C9C9]/35",
    glowB: "bg-[#1FB5B0]/30",
    wave1: "#23B8B0",
    wave2: "#35D0C6",
    line: "#5FE6DC",
    accent: "text-[#32E6DF]",
  },
  blue: {
    bg: "bg-[linear-gradient(91.82deg,#256ACC_23.38%,#133566_101.8%)]",
    glowA: "bg-[#5AA8FF]/30",
    glowB: "bg-[#2F7BE8]/30",
    wave1: "#3F86E6",
    wave2: "#6AA7F2",
    line: "#9CC8FF",
    accent: "text-[#7FD6FF]",
  },
} as const;

/** Full-width banner: centered one-line title (accent highlighted), copy and a glass pill button over glowing SVG waves. Deep teal by default, or the brand blue gradient with `tone="blue"`. */
export function TealBanner({ data, tone = "teal" }: { data: CtaSection; tone?: keyof typeof tones }) {
  const t = tones[tone];
  const [before, after] = data.accent && data.title.includes(data.accent) ? data.title.split(data.accent) : [data.title];
  return (
    <section aria-label={data.title} className={cn("relative isolate overflow-hidden px-4 py-16 text-center sm:py-20 lg:py-24", t.bg)}>
      <div aria-hidden className={cn("pointer-events-none absolute -top-40 -right-32 -z-10 size-[520px] rounded-full blur-[110px]", t.glowA)} />
      <div aria-hidden className={cn("pointer-events-none absolute -bottom-48 -left-24 -z-10 size-[520px] rounded-full blur-[110px]", t.glowB)} />
      <svg aria-hidden viewBox="0 0 600 200" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[55%] w-[45%] max-w-[760px]">
        <path d="M0 70C140 70 240 150 400 185S560 200 600 200H0Z" fill={t.wave1} fillOpacity=".4" />
        <path d="M0 120C120 120 220 170 340 192S520 200 600 200H0Z" fill={t.wave2} fillOpacity=".3" />
        <path d="M0 70C140 70 240 150 400 185S560 200 600 200" stroke={t.line} strokeOpacity=".5" strokeWidth="1.5" />
      </svg>
      <svg aria-hidden viewBox="0 0 600 200" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute top-0 right-0 -z-10 h-[55%] w-[45%] max-w-[760px] rotate-180">
        <path d="M0 70C140 70 240 150 400 185S560 200 600 200H0Z" fill={t.wave1} fillOpacity=".4" />
        <path d="M0 120C120 120 220 170 340 192S520 200 600 200H0Z" fill={t.wave2} fillOpacity=".3" />
        <path d="M0 70C140 70 240 150 400 185S560 200 600 200" stroke={t.line} strokeOpacity=".5" strokeWidth="1.5" />
      </svg>
      <Container>
        <h2 className="type-h2 text-balance text-white lg:text-nowrap">
          {before}
          {data.accent && <span className={t.accent}>{data.accent}</span>}
          {after}
        </h2>
        {data.subtitle && <p className={cn("type-lead mx-auto mt-4 max-w-[900px] text-white", data.subtitle.length <= 120 && "lg:max-w-none lg:text-nowrap")}>{data.subtitle}</p>}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink
            href={data.primary.href}
            size="lg"
            className="group gap-3 border border-white/60 bg-white/15 font-semibold text-white shadow-[0_0_28px_rgba(50,230,223,.35),inset_0_1px_0_rgba(255,255,255,.4)] backdrop-blur-md hover:bg-white/25 hover:shadow-[0_0_36px_rgba(50,230,223,.5),inset_0_1px_0_rgba(255,255,255,.5)]"
          >
            {data.primary.label}
            <ArrowRight aria-hidden className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </ButtonLink>
          {data.secondary && (
            <ButtonLink
              href={data.secondary.href}
              size="lg"
              className="group gap-3 border border-white/60 bg-white/15 font-semibold text-white shadow-[0_0_28px_rgba(50,230,223,.35),inset_0_1px_0_rgba(255,255,255,.4)] backdrop-blur-md hover:bg-white/25 hover:shadow-[0_0_36px_rgba(50,230,223,.5),inset_0_1px_0_rgba(255,255,255,.5)]"
            >
              {data.secondary.label}
              <ArrowRight aria-hidden className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
