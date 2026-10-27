"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Compact YouTube card for photo heroes. Shows the poster with a play button; the iframe (and any audio)
 * only loads after an explicit click, so nothing autoplays on page load.
 */
export function HeroVideoCard({ id, title, className }: { id: string; title: string; className?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={cn("rounded-[20px] border border-white/30 bg-white/15 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_18px_44px_rgba(6,22,46,.32)] backdrop-blur-md", className)}>
      <div className="relative aspect-video overflow-hidden rounded-[14px] bg-navy">
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
            {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube poster; avoids adding an image host to next.config */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 ease-brand group-hover:scale-105" />
            <span aria-hidden className="absolute inset-0 bg-navy/20" />
            <span aria-hidden className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-[0_6px_18px_rgba(6,22,46,.35)] transition-transform duration-300 ease-brand group-hover:scale-110">
              <Play className="ml-0.5 size-5 fill-current" />
            </span>
          </button>
        )}
      </div>
      <p className="type-body px-2 pt-2 pb-1 font-semibold text-white">{title}</p>
    </div>
  );
}
