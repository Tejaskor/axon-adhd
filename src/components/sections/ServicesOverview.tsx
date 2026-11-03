"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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
 *
 * Video behaviour: every card shows its thumbnail until someone interacts; nothing autoplays or loops.
 * - Hovering a video panel with a mouse plays that video with sound; leaving pauses it, rewinds it and shows the thumbnail again.
 * - "See Video" pins playback with sound (and native controls) so it keeps playing after the pointer leaves; the same button
 *   closes it. Touch devices have no reliable hover, so tapping it is how they play a video.
 * - Only one video plays at a time: a hover preview of another card pauses a pinned one, which resumes when the preview ends.
 * - Browsers block sound until the visitor has clicked, tapped or pressed a key on the page. A hover before that plays muted,
 *   and sound switches on at that first interaction.
 */
export function ServicesOverview() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  /** Last video to actually start rendering frames; its thumbnail fades out only once it does. */
  const [started, setStarted] = useState<number | null>(null);
  const [failed, setFailed] = useState<number[]>([]);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  /** Videos the browser forced to play muted; they are unmuted on the visitor's first click, tap or key press. */
  const autoMuted = useRef(new Set<number>());
  const current = hovered ?? pinned;

  // A video that can't load or play keeps its thumbnail and its button is disabled.
  const fail = useCallback((i: number) => {
    setHovered((cur) => (cur === i ? null : cur));
    setPinned((cur) => (cur === i ? null : cur));
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
      } else if (!v.paused || (i !== pinned && v.currentTime > 0.1)) {
        v.pause();
        // A pinned video keeps its place while another card previews; a finished preview starts over next time.
        if (i !== pinned) v.currentTime = 0.1;
      }
    });
  }, [current, pinned, playWithSound]);

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-16 sm:py-20 lg:py-24" aria-labelledby="services-title">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 id="services-title" className="font-display text-[clamp(28px,3.6vw,48px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance text-navy">
            {services.title} <span className="bg-[linear-gradient(90deg,#2578CA,#22B5D8)] bg-clip-text text-transparent">{services.titleAccent}</span>
          </h2>
          <p className="type-body mx-auto mt-3 max-w-[900px] text-pretty text-[#4B5B73]">{services.subtitle}</p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-[560px] gap-6 sm:mt-12 md:max-w-[1250px] md:grid-cols-3 md:gap-1">
          {services.items.map((item, i) => {
            const open = pinned === i;
            const broken = failed.includes(i);
            const showVideo = started === i && (current === i || open);
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
                        controls={open}
                        aria-label={`${item.title} video`}
                        onPlaying={() => setStarted(i)}
                        onEnded={() => {
                          setPinned((cur) => (cur === i ? null : cur));
                          setStarted((cur) => (cur === i ? null : cur));
                        }}
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
                          if (open) {
                            // Closing also ends any hover preview, so the video stops even with the pointer still over it.
                            setHovered(null);
                            setPinned(null);
                            return;
                          }
                          // Start playback inside the click itself: the click is what lets the browser play sound.
                          playWithSound(i);
                          setPinned(i);
                        }}
                        disabled={broken}
                        aria-pressed={open}
                        aria-label={broken ? `Video unavailable – ${item.title}` : `${open ? "Close" : "See"} Video – ${item.title}`}
                        className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/45 px-3.5 py-2 text-[12px] leading-none font-medium tracking-[0.02em] text-[#4B4F58] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,.6)] backdrop-blur-md transition-colors duration-200 hover:bg-white/70 hover:text-navy disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-white/45 sm:top-4 sm:left-4"
                      >
                        {open ? <X aria-hidden className="size-3 shrink-0" strokeWidth={3} /> : <Play aria-hidden className="size-3 shrink-0 fill-current" />}
                        {broken ? "Video unavailable" : open ? "Close Video" : "See Video"}
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
