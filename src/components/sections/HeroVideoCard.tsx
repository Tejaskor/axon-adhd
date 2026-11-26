"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * YouTube card for photo heroes (white frame around a 16:9 player). Shows the poster with a play button; the iframe (and any audio)
 * only loads after an explicit click, so nothing autoplays on page load.
 * `device="desktop"` puts the same player on the screen of a drawn desktop monitor instead.
 */
export function HeroVideoCard({
  id,
  title,
  className,
  frame = true,
  aspect,
  device,
}: {
  id: string;
  title: string;
  className?: string;
  frame?: boolean;
  aspect?: string;
  device?: "desktop";
}) {
  const [playing, setPlaying] = useState(false);

  const player = (
    <>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0 size-full cursor-pointer">
          {/* 1280×720 poster: sharp at card size and already 16:9, so nothing is letterboxed or blurred */}
          {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube poster; avoids adding an image host to next.config */}
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 ease-brand group-hover:scale-105" />
          <span aria-hidden className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_22px_rgba(6,22,46,.4),0_0_0_6px_rgba(255,255,255,.25)] transition-transform duration-300 ease-brand group-hover:scale-110">
            <Play className="ml-0.5 size-7 fill-current" />
          </span>
        </button>
      )}
    </>
  );

  if (device === "desktop") {
    return (
      <div className={cn("relative min-w-0", className)}>
        {/* Soft brand-blue glow behind the monitor so it sits in the hero's light, airy palette. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-[6%] top-[8%] bottom-[18%] -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(37,120,202,.28),rgba(37,120,202,.08)_60%,transparent)] blur-2xl" />

        {/* Monitor: thin glass bezel with a camera dot, the player as the screen, then a brushed-silver chin. */}
        <div className="relative rounded-[18px] bg-[linear-gradient(180deg,#1B2433,#0B111B)] p-[1.6%] pb-0 shadow-[0_40px_80px_-36px_rgba(11,37,75,.65),0_18px_36px_-24px_rgba(11,37,75,.45),inset_0_1px_0_rgba(255,255,255,.14),inset_0_0_0_1px_rgba(255,255,255,.06)] sm:rounded-[22px]">
          <span aria-hidden className="absolute top-[0.55%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#2A3546] ring-1 ring-white/10 sm:top-[0.7%]" />
          <div className="relative overflow-hidden rounded-[6px] bg-navy sm:rounded-[8px]" style={{ aspectRatio: aspect ?? "16 / 9" }}>
            {player}
            {/* Faint glass reflection across the top-left of the screen (never blocks clicks). */}
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.12)_0%,rgba(255,255,255,.03)_28%,transparent_45%)]" />
          </div>
          <div className="relative mt-[1.6%] -mx-[1.65%] flex h-[clamp(22px,3.4vw,40px)] items-center justify-center rounded-b-[18px] bg-[linear-gradient(180deg,#E9EEF5,#C9D2DE)] shadow-[inset_0_1px_0_rgba(255,255,255,.9),inset_0_-2px_4px_rgba(11,37,75,.12)] sm:rounded-b-[22px]">
            <span aria-hidden className="size-2.5 rounded-full bg-[linear-gradient(145deg,#B6C2D1,#8E9CB0)] shadow-[inset_0_1px_1px_rgba(255,255,255,.6)] sm:size-3" />
          </div>
        </div>

        {/* Stand: tapered aluminium neck and an oval base with a contact shadow. */}
        <div aria-hidden className="relative mx-auto h-[clamp(34px,6vw,72px)] w-[18%]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#AEB9C8,#E6EBF2_35%,#F4F7FB_50%,#D5DDE7_70%,#A3AFBF)] [clip-path:polygon(16%_0,84%_0,100%_100%,0_100%)]" />
          <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-[rgba(11,37,75,.22)] to-transparent [clip-path:polygon(16%_0,84%_0,100%_100%,0_100%)]" />
        </div>
        <div aria-hidden className="relative mx-auto -mt-px h-[clamp(9px,1.4vw,14px)] w-[40%] rounded-[50%/100%_100%_40%_40%] bg-[linear-gradient(180deg,#F3F6FA,#C7D0DC)] shadow-[inset_0_1px_0_#fff,0_10px_18px_-8px_rgba(11,37,75,.45)]" />
        <div aria-hidden className="mx-auto mt-1 h-3 w-[56%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(11,37,75,.28),transparent)] blur-[2px]" />
      </div>
    );
  }

  return (
    // `frame={false}` drops the white card behind the player but keeps its padding, so the video stays exactly the same size.
    <div className={cn("min-w-0 rounded-[28px] border p-3 sm:p-3.5", frame ? "border-white bg-white/80 shadow-[0_24px_60px_-24px_rgba(37,120,202,.45)]" : "border-transparent", className)}>
      <div className={cn("relative overflow-hidden rounded-[20px] bg-navy", !aspect && "aspect-video")} style={aspect ? { aspectRatio: aspect } : undefined}>
        {player}
      </div>
    </div>
  );
}
