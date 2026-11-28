"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

/**
 * Full-screen popup that plays a complete YouTube video. Built on native <dialog>, so the browser handles
 * focus trapping and Escape. The × button or a click on the dark area around the video also closes it.
 * The iframe only exists while open: closing removes it, which stops playback, and nothing loads until the first open.
 * YouTube's own player provides play/pause, volume, progress bar and fullscreen.
 */
export function VideoModal({ video, onClose }: { video: { id: string; title: string } | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = video !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    // Lock page scroll while the popup is open; restore the previous value on close.
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={video?.title ?? "Video"}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-[#061A36]/92 p-0 backdrop:bg-black/60 open:animate-[video-modal-in_.35s_cubic-bezier(.22,1,.36,1)]"
    >
      {video && (
        // Click target for "outside the video": the padding area around the player.
        <div className="grid size-full place-items-center px-3 py-16 sm:px-10" onClick={(e) => e.target === e.currentTarget && onClose()}>
          {/* Largest 16:9 box that fits the screen. */}
          <div className="relative aspect-video w-[min(100%,calc((100dvh-8rem)*16/9))] overflow-hidden rounded-[12px] bg-black shadow-[0_30px_80px_rgba(0,0,0,.5)]">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&controls=1&playsinline=1`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 size-full border-0"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white text-navy shadow-[0_8px_24px_rgba(0,0,0,.35)] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:top-5 sm:right-5"
          >
            <X aria-hidden className="size-5" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </dialog>
  );
}
