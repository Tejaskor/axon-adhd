import Image from "next/image";
import { partnerLogos } from "@/content/trust";

/**
 * Infinite logo row. The list is rendered twice and translated -50%; the
 * duplicate is hidden from assistive tech. Pauses on hover/focus and stops
 * for prefers-reduced-motion (see globals.css).
 */
export function LogoMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16" aria-hidden={hidden || undefined}>
      {partnerLogos.logos.map((logo) => (
        <li key={logo.src} className="shrink-0">
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.alt}
            width={logo.width}
            height={logo.height}
            sizes="200px"
            className="h-10 w-auto object-contain transition-opacity hover:opacity-80 sm:h-12"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="partners-title" className="border-y border-line-2 bg-white py-10">
      <p id="partners-title" className="container-content mb-7 text-center text-[13px] font-semibold tracking-[0.14em] text-muted sm:text-[14px]">
        {partnerLogos.title}
      </p>
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
