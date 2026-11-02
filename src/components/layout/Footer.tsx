import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";
import { complianceBadgesColor } from "@/content/trust";
import { cn } from "@/lib/utils";
import { SocialIcon } from "./SocialIcon";

/** Brand-coloured social discs, keyed by `site.social[].label`. */
const socialStyle: Record<string, string> = {
  Facebook: "bg-[#21407A] text-[#1877F2]",
  LinkedIn: "bg-[#1A9BEF] text-[#0B2A4F]",
  Instagram: "bg-[radial-gradient(circle_at_30%_110%,#FDD835_0%,#F56040_35%,#C13584_65%,#5851DB_100%)] text-white",
  YouTube: "bg-[#21407A] text-[#FF0000]",
  X: "border border-white/25 bg-black text-white",
  TikTok: "border border-white/25 bg-black text-white",
};

function FooterLinks({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h2 className="flex items-center font-display text-[17px] font-bold tracking-normal text-white uppercase lg:h-[68px]">{title}</h2>
      <ul className="mt-6 space-y-4">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="type-body text-white/95 transition-colors hover:text-[#4FC3F7]">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-white text-white">
      {/* Layered waves rising from white into the navy body: light dome cresting right of centre, two mid layers, navy front. */}
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="-mb-px block h-[clamp(40px,5.6vw,96px)] w-full">
        <defs>
          <linearGradient id="footer-wave-light" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6AB2F7" />
            <stop offset="100%" stopColor="#2F7FE0" />
          </linearGradient>
          {/* Same colours as the body gradient so the front wave runs straight into it. */}
          <linearGradient id="footer-wave-front" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#041C46" />
            <stop offset="100%" stopColor="#0A2B60" />
          </linearGradient>
        </defs>
        <path d="M0,52 C265,38 575,22 795,13 C930,5 1015,1 1105,12 C1235,30 1340,50 1440,62 L1440,80 L0,80 Z" fill="url(#footer-wave-light)" />
        <path d="M0,60 C300,52 600,38 860,30 C1000,26 1110,24 1200,34 C1300,46 1380,58 1440,66 L1440,80 L0,80 Z" fill="#2C74D6" fillOpacity=".9" />
        <path d="M0,66 C320,62 640,50 900,44 C1080,40 1220,44 1440,70 L1440,80 L0,80 Z" fill="#1A55B4" fillOpacity=".85" />
        <path d="M0,72 C350,70 650,60 900,54 C1100,50 1270,58 1440,76 L1440,80 L0,80 Z" fill="url(#footer-wave-front)" />
      </svg>
      <div className="relative isolate overflow-hidden bg-[linear-gradient(81.25deg,#041C46_0%,#0A2B60_100%)]">
      {/* Full-width faded wordmark resting on the footer's bottom edge, behind the content. */}
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 translate-y-[0.16em] text-center font-serif text-[14vw] leading-none font-bold whitespace-nowrap text-white/[0.06] select-none"
      >
        AXON ADHD
      </p>
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 pt-6 pb-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.7fr_0.9fr_0.9fr_1.3fr] lg:gap-12 lg:px-12 lg:pt-6 lg:pb-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={`${site.name} home`} className="flex h-14 items-center sm:h-[68px]">
            <Image src={site.footerLogo.src} alt="AXON ADHD Brand Logo" width={site.footerLogo.width} height={site.footerLogo.height} className="h-14 w-auto sm:h-[68px]" />
          </Link>
          <p className="type-body mt-6 max-w-[520px] text-white/95">{site.blurb}</p>
        </div>

        <div>
          <FooterLinks title="Quick Links" links={footerNav.quickLinks} />
        </div>
        <div>
          <FooterLinks title="Company" links={footerNav.company} />
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="flex items-center font-display text-[17px] font-bold tracking-normal text-white uppercase lg:h-[68px]">Contact Us</h2>
          <address className="type-body mt-6 space-y-4 not-italic">
            <a href={`mailto:${site.email}`} className="flex items-center gap-4 text-white/95 transition-colors hover:text-[#4FC3F7]">
              <Mail aria-hidden className="size-6 shrink-0 text-[#29B6F6]" strokeWidth={1.5} /> {site.email}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-4 text-white/95 transition-colors hover:text-[#4FC3F7]">
              <Phone aria-hidden className="size-6 shrink-0 text-[#29B6F6]" strokeWidth={1.5} /> {site.phone}
            </a>
            <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 leading-[1.9] text-white/95 transition-colors hover:text-[#4FC3F7]">
              <MapPin aria-hidden className="mt-1 size-6 shrink-0 text-[#29B6F6]" strokeWidth={1.5} />
              <span>
                {site.address.street},
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </a>
          </address>
        </div>
      </div>

      {/* Social icons (left) and full-colour compliance badges (right) on one line, above the copyright bar. */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-4 pb-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12 lg:pb-12">
        <ul className="flex flex-wrap items-center gap-4" aria-label="Social media">
          {site.social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={cn("grid size-10 place-items-center rounded-full transition-transform duration-200 ease-brand hover:-translate-y-0.5 hover:scale-105", socialStyle[s.label])}
              >
                <SocialIcon name={s.label} className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center gap-5 sm:gap-7" aria-label="Compliance certifications">
          {complianceBadgesColor.map((b) => (
            <li key={b.src}>
              <Link href="/trust-center/" className="block transition duration-300 ease-brand hover:-translate-y-0.5 hover:drop-shadow-[0_6px_14px_rgba(0,0,0,.35)]">
                <Image src={b.src} alt={b.alt} width={b.width} height={b.height} className={b.src.includes("hipaa") ? "h-11 w-auto sm:h-12" : "h-14 w-auto sm:h-16"} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10">
        <div className="type-body mx-auto flex w-full max-w-[1440px] flex-col items-center gap-4 px-4 py-7 sm:px-6 lg:flex-row lg:justify-between lg:px-12">
          <p className="text-white/95">{site.copyright}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {footerNav.legal.map((l, i) => (
              <Fragment key={l.href}>
                {i > 0 && (
                  <li aria-hidden className="hidden text-[#29B6F6] xs:list-item">
                    |
                  </li>
                )}
                <li>
                  <Link href={l.href} className="text-white/95 transition-colors hover:text-[#4FC3F7]">
                    {l.label}
                  </Link>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </footer>
  );
}
