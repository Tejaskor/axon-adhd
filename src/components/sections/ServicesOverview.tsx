"use client";

import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { services } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Three service cards in the testimonial-card style: a rounded video panel with a frosted "See Video" button,
 * then a separate light-grey panel with heading → description → green "Learn More" pill.
 * Only one video plays at a time: the first starts on load; "See Video" switches playback to that card.
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
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="services-title">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 id="services-title" className="font-inter text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-balance text-navy sm:text-[40px] lg:text-[52px]">
            {services.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[900px] font-inter text-[16px] leading-[1.75] text-pretty text-body sm:text-[18px]">{services.subtitle}</p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-[560px] gap-6 sm:mt-12 md:max-w-[1250px] md:grid-cols-3 md:gap-1">
          {services.items.map((item, i) => {
            const playing = active === i;
            return (
              <li key={item.title} className="flex">
                <Reveal delay={i * 0.08} className="flex w-full">
                  <article className="group flex w-full flex-col gap-1">
                    <div className="relative overflow-hidden rounded-[20px] border border-black/[0.04] bg-[#E6E6E9] shadow-[0_1px_3px_rgba(15,27,46,.06)]">
                      <video
                        ref={(el) => {
                          videos.current[i] = el;
                        }}
                        className="aspect-[413/400] h-auto w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
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
                    <div className="flex flex-1 flex-col items-start rounded-[20px] border border-black/[0.04] bg-[#F4F4F5] px-5 pt-6 pb-6 shadow-[0_1px_3px_rgba(15,27,46,.05)] sm:px-6">
                      <h3 className="text-[21px] leading-[1.35] font-medium text-balance text-[#0B1B3F] sm:text-[23px]">{item.title}</h3>
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#6B7280] sm:text-[16px]">{item.text}</p>
                      <Link
                        href={item.href}
                        className="mt-5 inline-flex h-9 items-center rounded-full bg-[#4FA27A] px-4 text-[13px] font-semibold text-white shadow-[0_2px_6px_rgba(79,162,122,.3)] transition-colors duration-200 hover:bg-[#3F8D67]"
                      >
                        Learn More<span className="sr-only"> about {item.title}</span>
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
