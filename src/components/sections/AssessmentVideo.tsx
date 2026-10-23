"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const embedSrc = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
const iframeProps = { allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", allowFullScreen: true, referrerPolicy: "strict-origin-when-cross-origin" } as const;

/**
 * Homography mapping a 1600×1060 rectangle onto the laptop screen of adhd-evaluation-workspace-bg.webp
 * (corners measured in the image's 1774×887 space: TL 966,298 · TR 1526,276 · BR 1510,668 · BL 942,653).
 * The 3×3 matrix is pre-scaled by stage width / 1774 at runtime, so the player tracks the photo at any size.
 */
const SCREEN = { w: 1600, h: 1060, imageW: 1774, h11: 0.26058808, h12: -0.03750493, h13: 966, h21: -0.02992149, h22: 0.32460225, h23: 298, h31: -5.8592e-5, h32: -1.5779e-5 };

/**
 * Puts the real YouTube player on the laptop screen already in the background photograph (no second laptop).
 * The iframe only loads after a click, so nothing autoplays. Must sit inside a positioned parent that matches
 * the photo's bounds (`absolute inset-0` here).
 */
export function LaptopScreenVideo({ id, title }: { id: string; title: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / SCREEN.imageW);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const s = scale;
  const transform = `matrix3d(${SCREEN.h11 * s},${SCREEN.h21 * s},0,${SCREEN.h31},${SCREEN.h12 * s},${SCREEN.h22 * s},0,${SCREEN.h32},0,0,1,0,${SCREEN.h13 * s},${SCREEN.h23 * s},0,1)`;

  return (
    <div ref={stage} className="absolute inset-0">
      <div className="absolute top-0 left-0 origin-top-left" style={{ width: SCREEN.w, height: SCREEN.h, transform, visibility: scale ? "visible" : "hidden" }}>
        {playing ? (
          <div className="flex size-full items-center bg-black">
            <iframe src={embedSrc(id)} title={title} {...iframeProps} className="aspect-video w-full border-0" />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="size-full cursor-pointer bg-white/0 transition-colors duration-300 hover:bg-white/10 focus-visible:outline-[24px] focus-visible:outline-offset-[-24px] focus-visible:outline-primary"
          />
        )}
      </div>
    </div>
  );
}

/** Stand-alone 16:9 player card for viewports too narrow for the laptop photograph. Click-to-load, like the laptop. */
export function VideoCardPlayer({ id, title, className }: { id: string; title: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={className}>
      <div className="relative aspect-video overflow-hidden rounded-[20px] bg-navy shadow-[0_18px_44px_rgba(11,37,75,.22)]">
        {playing ? (
          <iframe src={embedSrc(id)} title={title} {...iframeProps} className="absolute inset-0 size-full border-0" />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0 size-full cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube poster; avoids adding an image host to next.config */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 ease-brand group-hover:scale-105" />
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
