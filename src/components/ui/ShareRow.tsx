"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";

const circle = "flex size-[42px] items-center justify-center rounded-full bg-[#F3F4F6] text-[#6B7280] transition-colors hover:bg-[#E5E7EB]";

const paths = {
  linkedin: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  x: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z",
  facebook: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z",
};

function Brand({ d }: { d: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-[18px] fill-current">
      <path d={d} />
    </svg>
  );
}

/** "Share" row under a blog article: copy link + LinkedIn / X / Facebook share links. */
export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: nothing to do */
    }
  };
  const share = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, d: paths.linkedin },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${encodeURIComponent(title)}`, d: paths.x },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, d: paths.facebook },
  ];
  return (
    <div className="mb-5 flex flex-col items-center gap-3.5 md:mb-7 md:grid md:grid-cols-[1fr_auto_1fr]">
      <p className="m-0 flex items-center gap-2.5 text-[16px] text-[#7A7A7A] md:justify-self-start">
        <Share2 aria-hidden className="size-[18px] text-[#1F2937]" /> Share
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} className={circle}>
          {copied ? <Check aria-hidden className="size-[18px]" /> : <Link2 aria-hidden className="size-[18px]" />}
        </button>
        {share.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={circle}>
            <Brand d={s.d} />
          </a>
        ))}
      </div>
    </div>
  );
}
