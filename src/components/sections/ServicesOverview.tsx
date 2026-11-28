"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { services } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { VideoModal } from "@/components/ui/VideoModal";
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
 *
 * Video behaviour: every card shows its thumbnail until someone interacts; nothing autoplays or loops.
 * - Hovering a video panel with a mouse plays that video with sound; leaving pauses it, rewinds it and shows the thumbnail again.
 * - "See Video" opens the complete video (YouTube, with full playback controls) in a full-screen popup; the card's own
 *   clip is only a ~5s preview. Closing the popup stops the video.
 * - Browsers block sound until the visitor has clicked, tapped or pressed a key on the page. A hover before that plays muted,
 *   and sound switches on at that first interaction.
 */
export function ServicesOverview() {
  const [hovered, setHovered] = useState<number | null>(null);
  /** Full-length video shown in the popup, or null when it is closed. */
  const [modal, setModal] = useState<(typeof services.items)[number]["fullVideo"] | null>(null);
  /** Last video to actually start rendering frames; its thumbnail fades out only once it does. */
  const [started, setStarted] = useState<number | null>(null);
  const [failed, setFailed] = useState<number[]>([]);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  /** Videos the browser forced to play muted; they are unmuted on the visitor's first click, tap or key press. */
  const autoMuted = useRef(new Set<number>());
  // No hover preview plays (or makes sound) behind the open popup.
  const current = modal ? null : hovered;
  const closeModal = useCallback(() => setModal(null), []);

  // A preview clip that can't load or play keeps its thumbnail.
  const fail = useCallback((i: number) => {
    setHovered((cur) => (cur === i ? null : cur));
    setFailed((cur) => (cur.includes(i) ? cur : [...cur, i]));
  }, []);

  /** Plays a video with sound, falling back to muted playback when the browser blocks audio (no user interaction yet). */
  const playWithSound = useCallback(
    (i: number) => {
      const v = videos.current[i];
      if (!v) return;
      autoMuted.current.delete(i);
      v.muted = false;
      // AbortError only means a pause() interrupted this play() (the pointer left quickly), not a broken video.
      const aborted = (err: unknown) => err instanceof DOMException && err.name === "AbortError";
      v.play().catch((err: unknown) => {
        if (aborted(err)) return;
        if (err instanceof DOMException && err.name === "NotAllowedError") {
          v.muted = true;
          autoMuted.current.add(i);
          v.play().catch((e: unknown) => !aborted(e) && fail(i));
          return;
        }
        fail(i);
      });
    },
    [fail],
  );

  // The first click, tap or key press anywhere lets the page play sound, so unmute whatever was forced muted.
  useEffect(() => {
    const unmute = () => {
      autoMuted.current.forEach((i) => {
        const v = videos.current[i];
        if (v) v.muted = false;
      });
      autoMuted.current.clear();
    };
    window.addEventListener("pointerdown", unmute, true);
    window.addEventListener("keydown", unmute, true);
    return () => {
      window.removeEventListener("pointerdown", unmute, true);
      window.removeEventListener("keydown", unmute, true);
    };
  }, []);

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) {
        playWithSound(i);
      } else if (!v.paused || v.currentTime > 0.1) {
        v.pause();
        // A finished or interrupted preview starts over next time.
        v.currentTime = 0.1;
      }
    });
  }, [current, playWithSound]);

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! section-py" aria-labelledby="services-title">
      <div className="mx-auto w-full max-w-[1372px] px-4">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 id="services-title" className="type-h2 text-navy text-balance">
            {services.title} <span className="text-primary">{services.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[900px] text-[16px] leading-[1.7] sm:text-[20px] text-pretty text-[#4B5B73]">{services.subtitle}</p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-[560px] gap-6 sm:mt-12 md:max-w-none md:grid-cols-3 md:gap-1">
          {services.items.map((item, i) => {
            const broken = failed.includes(i);
            const showVideo = started === i && current === i;
            const t = tones[item.tone];
            return (
              <li key={item.title} className="flex">
                <Reveal delay={i * 0.08} className="flex w-full">
                  <article className="group flex w-full flex-col gap-1">
                    {/* Video panel: thumbnail until hovered (mouse only) or opened with "See Video". */}
                    <div
                      className={cn("relative overflow-hidden rounded-[20px] bg-[#E6E6E9]", "border border-white/80", t.card)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && !broken && setHovered(i)}
                      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered((cur) => (cur === i ? null : cur))}
                    >
                      <video
                        ref={(el) => {
                          videos.current[i] = el;
                        }}
                        className="aspect-[413/360] h-auto w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                        // #t=0.1 makes a paused or closed card hold a real frame instead of a blank box.
                        src={`${item.video}#t=0.1`}
                        playsInline
                        preload="metadata"
                        aria-label={`${item.title} video`}
                        onPlaying={() => setStarted(i)}
                        onEnded={() => setStarted((cur) => (cur === i ? null : cur))}
                        onError={() => fail(i)}
                      />
                      <Image
                        src={item.thumbnail}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 560px) 560px, 100vw"
                        className={cn(
                          "pointer-events-none object-cover transition-[opacity,scale] duration-700 ease-brand group-hover:scale-[1.03]",
                          showVideo ? "opacity-0" : "opacity-100",
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          // End the hover preview so it doesn't resume under the pointer after the popup closes.
                          setHovered(null);
                          setModal(item.fullVideo);
                        }}
                        aria-haspopup="dialog"
                        aria-label={`See Full Video – ${item.title}`}
                        className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/45 px-3.5 py-2 text-[12px] leading-none font-medium tracking-[0.02em] text-[#4B4F58] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,.6)] backdrop-blur-md transition-[background,color,box-shadow] duration-300 hover:bg-white/70 hover:text-navy group-hover:bg-[linear-gradient(90deg,#1E64AA_0%,#2578CA_45%,#5498DB_100%)] group-hover:text-white group-hover:shadow-[0_12px_28px_rgba(37,120,202,.35)] hover:group-hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 disabled:group-hover:bg-white/45 disabled:group-hover:text-[#4B4F58] disabled:group-hover:shadow-none sm:top-4 sm:left-4"
                      >
                        <Play aria-hidden className="size-3 shrink-0 fill-current" />
                        See Full Video
                      </button>
                    </div>

                    {/* Text panel: title, description and a small Learn More pill. */}
                    <div className={cn("flex flex-1 flex-col items-start rounded-[20px] px-5 pt-5 pb-5 sm:px-6", "border border-white/80 bg-white", t.card)}>
                      <h3 className="text-[20px] leading-snug font-semibold text-balance text-navy">{item.title}</h3>
                      <p className="mt-2 flex-1 text-[16px] leading-relaxed text-pretty text-[#4B5B73]">{item.text}</p>
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

      <VideoModal video={modal} onClose={closeModal} />
    </section>
  );
}
