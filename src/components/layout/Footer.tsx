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

const complianceBadgesMeta: Record<string, { label: string; alt: string }> = {
  "/images/badges/color/hipaa.png": {
    label: "HIPAA Compliant",
    alt: "HIPAA Compliant certification badge",
  },
  "/images/badges/color/gdpr.png": {
    label: "EU GDPR Compliance",
    alt: "EU GDPR Compliance certification badge",
  },
  "/images/badges/color/ccpa.png": {
    label: "CCPA Compliant",
    alt: "CCPA Compliant certification badge",
  },
  "/images/badges/color/soc2.png": {
    label: "SOC 2 Type 2",
    alt: "SOC 2 Type 2 certification badge",
  },
};

function FooterLinks({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h2 className="flex items-center font-display text-[18px] font-extrabold tracking-[0.08em] text-white uppercase lg:h-[68px]">{title}</h2>
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
    <footer className="relative isolate overflow-hidden bg-[linear-gradient(81.25deg,#061A36_0.51%,#1D3C67_100%)] text-white">
      {/* Full-width faded wordmark resting on the footer's bottom edge, behind the content. */}
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 translate-y-[0.16em] text-center font-serif text-[14vw] leading-none font-bold whitespace-nowrap text-white/[0.06] select-none"
      >
        AXON ADHD
      </p>
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 pt-12 pb-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.7fr_0.9fr_0.9fr_1.3fr] lg:gap-12 lg:px-12 lg:pt-16 lg:pb-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={`${site.name} home`} className="flex h-14 items-center sm:h-[68px]">
            <Image src={site.footerLogo.src} alt="AXON ADHD Brand Logo" width={site.footerLogo.width} height={site.footerLogo.height} className="-ml-1 h-11 w-auto sm:h-[52px]" />
          </Link>
          <p className="type-body mt-6 max-w-[520px] text-white/95">{site.blurb}</p>
          <ul className="mt-6 flex flex-wrap items-center gap-4" aria-label="Social media">
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
        </div>

        <div>
          <FooterLinks title="Quick Links" links={footerNav.quickLinks} />
        </div>
        <div>
          <FooterLinks title="Company" links={footerNav.company} />
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="flex items-center font-display text-[18px] font-extrabold tracking-[0.08em] text-white uppercase lg:h-[68px]">Contact Us</h2>
          <address className="type-body mt-6 space-y-4 not-italic">
            <a href={`mailto:${site.email}`} className="flex items-center gap-4 text-white/95 transition-colors hover:text-[#4FC3F7] active:text-white">
              <Mail aria-hidden className="size-6 shrink-0 text-[#29B6F6]" strokeWidth={1.5} /> {site.email}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-4 text-white/95 transition-colors hover:text-[#4FC3F7] active:text-white">
              <Phone aria-hidden className="size-6 shrink-0 text-[#29B6F6]" strokeWidth={1.5} /> {site.phone}
            </a>
            <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 leading-[1.9] text-white/95 transition-colors hover:text-[#4FC3F7] active:text-white">
              <MapPin aria-hidden className="mt-1 size-6 shrink-0 text-[#29B6F6]" strokeWidth={1.5} />
              <span>
                {site.address.street},
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </a>
          </address>
          <ul className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4 lg:gap-3.5 xl:gap-3" aria-label="Compliance certifications">
            {complianceBadgesColor.map((b) => {
              const meta = complianceBadgesMeta[b.src] ?? {
                label: b.alt,
                alt: b.alt,
              };
              return (
                <li key={b.src} className="shrink-0">
                  <Link
                    href="/adhd-data-privacy-trust-center/"
                    aria-label={`${meta.label} - View ADHD Data Privacy Trust Center`}
                    className="group block transition duration-300 ease-brand hover:-translate-y-1 hover:scale-105 hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29B6F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A36]"
                  >
                    <Image
                      src={b.src}
                      alt={meta.alt}
                      width={b.width}
                      height={b.height}
                      className={cn(
                        "transition-opacity duration-300 group-hover:opacity-95",
                        b.src.includes("hipaa") ? "h-11 w-auto sm:h-12 lg:h-9 xl:h-12" : "h-14 w-auto sm:h-16 lg:h-11 xl:h-14",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
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
    </footer>
  );
}
