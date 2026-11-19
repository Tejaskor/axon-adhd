"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * YouTube card for photo heroes (white frame around a 16:9 player). Shows the poster with a play button; the iframe (and any audio)
 * only loads after an explicit click, so nothing autoplays on page load.
 */
export function HeroVideoCard({ id, title, className, frame = true, aspect }: { id: string; title: string; className?: string; frame?: boolean; aspect?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    // `frame={false}` drops the white card behind the player but keeps its padding, so the video stays exactly the same size.
    <div className={cn("min-w-0 rounded-[28px] border p-3 sm:p-3.5", frame ? "border-white bg-white/80 shadow-[0_24px_60px_-24px_rgba(37,120,202,.45)]" : "border-transparent", className)}>
      <div className={cn("relative overflow-hidden rounded-[20px] bg-navy", !aspect && "aspect-video")} style={aspect ? { aspectRatio: aspect } : undefined}>
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
      </div>
    </div>
  );
}
