"use client";

import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { services } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Per-card glow colour: brand blue, teal (assessment) and violet (care). */
const tones = {
  blue: {
    card: "shadow-[0_24px_60px_rgba(37,120,202,.13),inset_0_1px_0_rgba(255,255,255,.95)]",
  },
  teal: {
    card: "shadow-[0_24px_60px_rgba(13,148,136,.13),inset_0_1px_0_rgba(255,255,255,.95)]",
  },
  violet: {
    card: "shadow-[0_24px_60px_rgba(124,58,237,.12),inset_0_1px_0_rgba(255,255,255,.95)]",
  },
} as const;

/** One brand-blue gradient for every "Learn More" pill. */
const ctaButton =
  "bg-[linear-gradient(90deg,#1E64AA_0%,#2578CA_45%,#5498DB_100%)] shadow-[0_12px_28px_rgba(37,120,202,.35)] hover:shadow-[0_16px_34px_rgba(37,120,202,.45)]";

/**
 * "How we support you": three cards, each a rounded video panel above a separate frosted-glass panel with title,
 * description and a small brand-blue "Learn More" pill (panels keep blue / teal / violet glows).
 * Video behaviour is unchanged: only one plays at a time; the first starts on load; "See Video" switches playback.
 */
export function ServicesOverview() {
  const [active, setActive] = useState<number | null>(0);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        // Autoplay can be refused (e.g. data-saver); the button stays usable either way.
        v.play().catch(() => setActive((cur) => (cur === i ? null : cur)));
      } else {
        v.pause();
      }
    });
  }, [active]);

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#EEF5FC_0%,#E4EEF9_55%,#EEF5FC_100%)] py-16 sm:py-20 lg:py-24" aria-labelledby="services-title">
      {/* Large soft shapes and lighting behind the glass. */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-56 -z-10 h-[620px] w-[640px] rotate-[-20deg] rounded-[50%] bg-[linear-gradient(160deg,rgba(201,222,244,.9),rgba(255,255,255,.2))]" />
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-40 -z-10 h-[560px] w-[520px] rotate-[25deg] rounded-[50%] border border-white/70 bg-[linear-gradient(200deg,rgba(255,255,255,.85),rgba(201,222,244,.35))]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-32 -z-10 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(134,182,229,.45),transparent_68%)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-[-10%] -z-10 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,.22),transparent_70%)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute top-[35%] left-1/2 -z-10 h-[520px] w-[min(1100px,100%)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(84,152,219,.22),transparent_65%)] blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 id="services-title" className="font-display text-[clamp(28px,3.6vw,48px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance text-navy">
            {services.title} <span className="bg-[linear-gradient(90deg,#2578CA,#22B5D8)] bg-clip-text text-transparent">{services.titleAccent}</span>
          </h2>
          <p className="type-body mx-auto mt-3 max-w-[900px] text-pretty text-[#4B5B73]">{services.subtitle}</p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-[560px] gap-6 sm:mt-12 md:max-w-[1250px] md:grid-cols-3 md:gap-1">
          {services.items.map((item, i) => {
            const playing = active === i;
            const t = tones[item.tone];
            return (
              <li key={item.title} className="flex">
                <Reveal delay={i * 0.08} className="flex w-full">
                  <article className="group flex w-full flex-col gap-1">
                    {/* Video panel: same sources, attributes and single-play behaviour as before. */}
                    <div className={cn("relative overflow-hidden rounded-[20px] bg-[#E6E6E9]", "border border-white/80", t.card)}>
                      <video
                        ref={(el) => {
                          videos.current[i] = el;
                        }}
                        className="aspect-[413/360] h-auto w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                        // #t=0.1 makes paused cards show a real first frame instead of a blank box.
                        src={`${item.video}#t=0.1`}
                        muted
                        loop
                        playsInline
                        preload={i === 0 ? "auto" : "metadata"}
                        aria-label={`${item.title} video`}
                      />
                      <button
                        type="button"
                        onClick={() => setActive(playing ? null : i)}
                        aria-pressed={playing}
                        aria-label={`See Video – ${item.title}`}
                        className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/45 px-3.5 py-2 text-[12px] leading-none font-medium tracking-[0.02em] text-[#4B4F58] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,.6)] backdrop-blur-md transition-colors duration-200 hover:bg-white/70 hover:text-navy sm:top-4 sm:left-4"
                      >
                        {playing ? <Pause aria-hidden className="size-3 shrink-0 fill-current" /> : <Play aria-hidden className="size-3 shrink-0 fill-current" />}
                        See Video
                      </button>
                    </div>

                    {/* Text panel: title, description and a small Learn More pill. */}
                    <div className={cn("flex flex-1 flex-col items-start rounded-[20px] px-5 pt-5 pb-5 sm:px-6", "border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,.62)_0%,rgba(228,239,250,.40)_100%)] backdrop-blur-[20px]", t.card)}>
                      <h3 className="text-[18px] leading-snug font-semibold text-balance text-navy">{item.title}</h3>
                      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-pretty text-[#4B5B73]">{item.text}</p>
                      <Link
                        href={item.href}
                        className={cn(
                          "group/cta mt-4 inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold text-white transition-[box-shadow,filter] duration-300 hover:brightness-110",
                          ctaButton,
                        )}
                      >
                        Learn More<span className="sr-only"> about {item.title}</span>
                        <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover/cta:translate-x-0.5" />
                      </Link>
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
