import Image from "next/image";
import { Check, ClipboardCheck, ShieldCheck, UsersRound, Wallet } from "lucide-react";
import type { AssessmentOverviewSection } from "@/content/pages/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LaptopScreenVideo, VideoCardPlayer } from "./AssessmentVideo";

const icons = {
  clinician: { Icon: UsersRound, tint: "bg-[#E4EEFD] text-primary" },
  shield: { Icon: ShieldCheck, tint: "bg-[#E1F5E8] text-[#1E9A55]" },
  insurance: { Icon: Wallet, tint: "bg-[#ECE8FD] text-[#6A48DD]" },
  document: { Icon: ClipboardCheck, tint: "bg-[#FFEFD9] text-[#E5811A]" },
} as const;

/** Connector wave: crosses y=50 at each card's node (x ≈ 9.6 / 34.9 / 60.3 / 85.6 of 100). */
const connector = "M0 62 C 30 62, 50 50, 96 50 C 190 50, 220 6, 349 50 C 470 94, 500 50, 603 50 C 710 50, 740 8, 856 50 C 930 76, 960 56, 1000 52";

/** Photo + laptop/video composition (≥1024px) or stacked copy + video card, then four photo feature cards on a faint connector. */
export function AssessmentOverview({ data }: { data: AssessmentOverviewSection }) {
  const { video, background } = data;
  const [lead, accent] = data.title.split(data.accent);
  const heading = (
    <h2 className="font-display text-[32px] leading-[1.12] font-bold tracking-[-0.02em] text-balance text-navy sm:text-[40px] lg:max-w-[9.2em] lg:text-[clamp(30px,4vw,58px)]">
      {lead}
      <span className="relative inline-block whitespace-nowrap text-primary">
        {data.accent}
        <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-[0.22em] h-[0.2em] w-full text-primary/45" fill="none">
          <path d="M2 10 C 70 2, 190 2, 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
      {accent}
    </h2>
  );
  const copy = (
    <>
      <p className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] text-primary uppercase lg:text-[clamp(11px,0.9vw,14px)]">
        <span aria-hidden className="h-0.5 w-8 rounded-full bg-primary" />
        {data.eyebrow}
      </p>
      <div className="mt-3 lg:mt-[1.2vw]">{heading}</div>
      <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-pretty text-body lg:mt-[1.4vw] lg:max-w-[28em] lg:text-[clamp(14px,1.3vw,20px)] lg:leading-[1.6]">{data.subtitle}</p>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 lg:mt-[1.8vw] lg:gap-x-[1.6vw]">
        {data.checks.map((c) => (
          <li key={c} className="flex items-center gap-2 text-[14px] font-semibold text-ink lg:text-[clamp(12px,1.05vw,16px)]">
            <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white lg:size-[clamp(20px,1.7vw,26px)]">
              <Check className="size-3 lg:size-[60%]" strokeWidth={3} />
            </span>
            {c}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F4F8FD_0%,#FFFFFF_100%)] pb-14 sm:pb-20" aria-label={data.title}>
      {/* Soft decorative curves + dots, behind everything. */}
      <svg aria-hidden className="pointer-events-none absolute -top-24 -left-24 hidden size-[420px] text-primary/10 sm:block" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div aria-hidden className="pointer-events-none absolute top-10 right-6 hidden h-24 w-40 bg-[radial-gradient(circle,rgba(37,106,204,.22)_1.5px,transparent_1.5px)] [background-size:14px_14px] lg:block" />

      {/* ≥1024px: one large canvas. The photo is scaled up (132% wide, shifted left/up) so its laptop reads big on the right;
          the real player is mapped onto that laptop's screen on an identical layer. Cards overlap the canvas bottom. */}
      <div className="relative mx-auto hidden max-w-[1440px] px-6 pt-4 lg:block">
        <div className="relative aspect-[100/50] overflow-hidden rounded-[32px] bg-[#EEF4FC] shadow-[0_24px_60px_rgba(11,37,75,.10)]">
          <div className="absolute w-[132%] [mask-image:linear-gradient(to_bottom,#000_88%,transparent_100%)]" style={{ left: "-21.3%", top: "-33.4%" }}>
            <Image src={background.src} alt={background.alt} width={background.width} height={background.height} sizes="(max-width: 1440px) 132vw, 1900px" className="h-auto w-full max-w-none" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,248,253,.96)_0%,rgba(244,248,253,.86)_20%,rgba(244,248,253,.4)_32%,rgba(244,248,253,0)_42%)]" />
          <svg aria-hidden className="pointer-events-none absolute -bottom-[14%] -left-[4%] w-[34%] text-primary/10" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="190" fill="currentColor" opacity=".5" />
            <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="absolute inset-y-0 left-[5.2%] flex w-[40%] flex-col justify-center pb-[6%]">
            {/* White backing for the copy only; its right edge fades out so nothing whitens the laptop (which starts ~48.7%). */}
            <div className="relative isolate">
              <div aria-hidden className="absolute -inset-y-[2.2vw] right-0 -left-[3vw] -z-10 rounded-l-[2.4vw] bg-white/85 [mask-image:linear-gradient(90deg,#000_0%,#000_78%,transparent_100%)] backdrop-blur-[2px]" />
              {copy}
            </div>
          </div>
          <div className="absolute w-[132%]" style={{ left: "-21.3%", top: "-33.4%", aspectRatio: "1774 / 887" }}>
            <LaptopScreenVideo id={video.id} title={video.title} />
          </div>
        </div>
      </div>

      {/* <1024px: stacked copy and a regular video card. */}
      <Container className="pt-10 sm:pt-14 lg:hidden">
        {copy}
        <VideoCardPlayer id={video.id} title={video.title} className="mx-auto mt-8 max-w-[640px]" />
      </Container>

      <div className="relative mx-auto mt-14 max-w-[1440px] px-6 lg:mt-[calc(min(7vw,100px)*-1)] lg:px-16">
        <svg aria-hidden className="pointer-events-none absolute inset-x-16 top-9 hidden h-20 -translate-y-1/2 text-primary/35 lg:block" style={{ width: "calc(100% - 8rem)" }} viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none">
          <path d={connector} stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        </svg>
        <ul className="relative grid gap-x-5 gap-y-14 pt-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[1.4vw] lg:gap-y-0">
          {data.items.map((item, i) => {
            const { Icon, tint } = icons[item.icon];
            return (
              <li key={item.title} className="relative">
                <Reveal delay={i * 0.1} className="h-full">
                  <article className="group relative flex h-full flex-col rounded-[28px] border border-white bg-white/95 shadow-[0_16px_44px_rgba(11,37,75,.10)] transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(11,37,75,.16)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <span className={`absolute -top-9 left-6 flex size-[72px] items-center justify-center rounded-full ring-[6px] ring-white shadow-[0_8px_20px_rgba(11,37,75,.10)] ${tint}`}>
                      <Icon className="size-8" aria-hidden />
                    </span>
                    <span aria-hidden className="absolute -top-[6px] left-[40%] hidden size-3 rounded-full bg-primary ring-[5px] ring-primary/15 lg:block" />
                    <div className="flex-1 px-6 pt-[52px] pb-4">
                      <h3 className="font-display text-[21px] leading-tight font-bold text-navy">{item.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-body">{item.text}</p>
                    </div>
                    <div className="relative mx-3 mb-3 aspect-[16/10] overflow-hidden rounded-[20px]">
                      <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 330px" className="object-cover transition-transform duration-500 ease-brand group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
