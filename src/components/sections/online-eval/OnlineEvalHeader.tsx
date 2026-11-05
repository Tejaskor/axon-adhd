import Image from "next/image";
import Link from "next/link";
import { bookingHref, headerNav } from "@/content/online-evaluation";
import { site } from "@/content/site";

/**
 * Landing-page header: thin green strip, floating glass pill with the logo, links to this page's sections and the
 * booking button. Replaces the site-wide header on this route (the layout's header wrapper is hidden by
 * online-evaluation.css while this component is mounted). Same 96px pill height as the site header, so the hero's
 * `--header-height` pull-up still lines up.
 */
export function OnlineEvalHeader() {
  return (
    <div className="axn-lp-header sticky top-0 z-40">
      <div aria-hidden className="h-[6px] bg-[linear-gradient(90deg,#0B6654,#0D7C66_55%,#0A5C45)]" />
      <header className="px-4 pt-3 pb-1">
        <div className="relative mx-auto flex h-20 w-full max-w-[1340px] items-center justify-between gap-3 rounded-[40px] border border-white/60 bg-white/50 px-3 shadow-[0_12px_36px_rgba(15,27,46,.12),inset_0_1px_0_rgba(255,255,255,.7)] backdrop-blur-xl backdrop-saturate-150 xs:px-4">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Image
              src={site.headerLogo.src}
              alt={site.name}
              width={site.headerLogo.width}
              height={site.headerLogo.height}
              priority
              unoptimized
              className="h-[39px] w-auto xs:h-[52px] lg:h-11"
            />
          </Link>

          <nav aria-label="On this page" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-3 font-sans xl:gap-5">
              {headerNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="rounded-pill px-3 py-1.5 text-[16px] leading-[1.2] font-normal text-ink-menu hover:text-brand xl:px-4">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={bookingHref("header-cta")}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#256ACC] px-4 py-2.5 text-[13px] leading-[1.2] font-normal whitespace-nowrap text-white shadow-[0_8px_20px_-8px_rgba(37,106,204,.7)] transition-colors duration-200 hover:bg-[#1D57AB] xs:px-5 xs:text-[15px] lg:min-h-[54px] lg:px-6 lg:text-[16px]"
          >
            Book an Evaluation — $577
          </a>
        </div>
      </header>
    </div>
  );
}
