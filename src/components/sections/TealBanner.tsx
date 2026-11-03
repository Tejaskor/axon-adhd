import { ArrowRight } from "lucide-react";
import type { CtaSection } from "@/content/pages/types";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/** Full-width deep-teal banner: centered one-line title (accent in turquoise), copy and a glass pill button over glowing SVG waves. */
export function TealBanner({ data }: { data: CtaSection }) {
  const [before, after] = data.accent && data.title.includes(data.accent) ? data.title.split(data.accent) : [data.title];
  return (
    <section aria-label={data.title} className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#00404C_0%,#004B57_45%,#02586A_100%)] px-4 py-16 text-center sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 -z-10 size-[520px] rounded-full bg-[#20C9C9]/35 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-24 -z-10 size-[520px] rounded-full bg-[#1FB5B0]/30 blur-[110px]" />
      <svg aria-hidden viewBox="0 0 600 200" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[55%] w-[45%] max-w-[760px]">
        <path d="M0 70C140 70 240 150 400 185S560 200 600 200H0Z" fill="#23B8B0" fillOpacity=".4" />
        <path d="M0 120C120 120 220 170 340 192S520 200 600 200H0Z" fill="#35D0C6" fillOpacity=".3" />
        <path d="M0 70C140 70 240 150 400 185S560 200 600 200" stroke="#5FE6DC" strokeOpacity=".5" strokeWidth="1.5" />
      </svg>
      <svg aria-hidden viewBox="0 0 600 200" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute top-0 right-0 -z-10 h-[55%] w-[45%] max-w-[760px] rotate-180">
        <path d="M0 70C140 70 240 150 400 185S560 200 600 200H0Z" fill="#23B8B0" fillOpacity=".4" />
        <path d="M0 120C120 120 220 170 340 192S520 200 600 200H0Z" fill="#35D0C6" fillOpacity=".3" />
        <path d="M0 70C140 70 240 150 400 185S560 200 600 200" stroke="#5FE6DC" strokeOpacity=".5" strokeWidth="1.5" />
      </svg>
      <Container>
        <h2 className="type-h2 font-bold text-balance text-white lg:text-nowrap">
          {before}
          {data.accent && <span className="text-[#32E6DF]">{data.accent}</span>}
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
