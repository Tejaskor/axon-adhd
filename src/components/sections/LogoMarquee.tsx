import Image from "next/image";
import { partnerLogos } from "@/content/trust";

/**
 * Logos range from square seals to ~8:1 wordmarks, so one shared height makes wordmarks dominate and seals vanish.
 * Each logo instead gets the same visual area (desktop px²), capped in height and width, then scaled per breakpoint
 * by `--logo-s`. Spacing is a single fixed gap between the boxes, so every pair of neighbours sits the same distance apart.
 */
const AREA = 4600;
const MAX_H = 56;
const MAX_W = 210;

function logoBox(width: number, height: number) {
  const ratio = width / height;
  let h = Math.min(MAX_H, Math.sqrt(AREA / ratio));
  if (h * ratio > MAX_W) h = MAX_W / ratio;
  return { width: Math.round(h * ratio), height: Math.round(h) };
}

/**
 * Infinite logo row. The list is rendered twice and translated -50%; the
 * duplicate is hidden from assistive tech. Pauses on hover/focus; with
 * prefers-reduced-motion it becomes a static, centred, wrapping grid (see globals.css).
 */
export function LogoMarquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee-row flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14 lg:gap-16 lg:pr-16" aria-hidden={hidden || undefined}>
      {partnerLogos.logos.map((logo) => {
        const box = logoBox(logo.width, logo.height);
        return (
          <li
            key={logo.src}
            className="flex shrink-0 items-center justify-center"
            style={{ width: `calc(${box.width}px * var(--logo-s))`, height: `calc(${box.height}px * var(--logo-s))` }}
          >
            <Image
              src={logo.src}
              alt={hidden ? "" : logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="200px"
              className="size-full object-contain transition-opacity hover:opacity-80"
            />
          </li>
        );
      })}
    </ul>
  );

  return (
    <section aria-labelledby="partners-title" className="border-y border-line-2 bg-white py-10 [--logo-s:0.8] sm:py-12 sm:[--logo-s:0.9] lg:[--logo-s:1]">
      <p id="partners-title" className="type-small container-content mb-7 text-center font-semibold tracking-[0.14em] text-balance text-muted sm:mb-9">
        {partnerLogos.title}
      </p>
      {/* Fixed-height lane so logos of different heights share one centre line. */}
      <div className="marquee relative flex min-h-[calc(56px*var(--logo-s))] items-center overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="marquee-track flex w-max items-center">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
