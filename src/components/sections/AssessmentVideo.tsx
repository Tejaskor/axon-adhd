"use client";

import { Play } from "lucide-react";
import { useState } from "react";

const embedSrc = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
const iframeProps = { allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", allowFullScreen: true, referrerPolicy: "strict-origin-when-cross-origin" } as const;

/**
 * 16:9 player card (also the screen of the CSS laptop in AssessmentOverview). Click-to-load, so nothing autoplays.
 * `poster="maxres"` uses YouTube's 1280×720 thumbnail for large players (only exists for HD uploads).
 */
export function VideoCardPlayer({ id, title, className, poster = "hq" }: { id: string; title: string; className?: string; poster?: "hq" | "maxres" }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={className}>
      <div className="relative aspect-video overflow-hidden rounded-[20px] bg-navy shadow-[0_18px_44px_rgba(11,37,75,.22)]">
        {playing ? (
          <iframe src={embedSrc(id)} title={title} {...iframeProps} className="absolute inset-0 size-full border-0" />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0 size-full cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube poster; avoids adding an image host to next.config */}
            <img src={`https://i.ytimg.com/vi/${id}/${poster}default.jpg`} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 ease-brand group-hover:scale-105" />
            <span aria-hidden className="absolute inset-0 bg-navy/15" />
            <span aria-hidden className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-[0_6px_18px_rgba(6,22,46,.35)] transition-transform duration-300 ease-brand group-hover:scale-110">
              <Play className="ml-1 size-7 fill-current" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
