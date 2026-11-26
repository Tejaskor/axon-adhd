import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Building2, ChevronRight, Mail, MapPin, Phone, Zap, type LucideIcon } from "lucide-react";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";
import { complianceBadgesColor } from "@/content/trust";
import { cn } from "@/lib/utils";
import { SocialIcon } from "./SocialIcon";

/** Brand-coloured social discs, keyed by `site.social[].label`. */
const socialStyle: Record<string, string> = {
  Facebook: "bg-[#13305E] text-[#1877F2]",
  LinkedIn: "bg-[#1A9BEF] text-[#0B2A4F]",
  Instagram: "bg-[radial-gradient(circle_at_30%_110%,#FDD835_0%,#F56040_35%,#C13584_65%,#5851DB_100%)] text-white",
  YouTube: "bg-[#13305E] text-[#FF0000]",
  X: "bg-[#13305E] text-white",
  TikTok: "bg-[#13305E]",
};

const complianceBadgesMeta: Record<string, { label: string; alt: string }> = {
  "/images/badges/color/compliance-badge-hipaa-color.png": {
    label: "HIPAA Compliant",
    alt: "HIPAA Compliant certification badge",
  },
  "/images/badges/color/compliance-badge-gdpr-color.png": {
    label: "EU GDPR Compliance",
    alt: "EU GDPR Compliance certification badge",
  },
  "/images/badges/color/compliance-badge-ccpa-color.png": {
    label: "CCPA Compliant",
    alt: "CCPA Compliant certification badge",
  },
  "/images/badges/color/compliance-badge-soc2-color.png": {
    label: "SOC 2 Type 2",
    alt: "SOC 2 Type 2 certification badge",
  },
};

/** Glassy icon tile + uppercase title + short accent bar (column heading). */
function FooterHeading({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <h2 className="flex items-center gap-4 font-display text-[18px] font-extrabold tracking-[0.04em] text-white uppercase lg:h-[68px]">
      <span
        aria-hidden
        className="grid size-12 shrink-0 place-items-center rounded-[14px] border border-white/10 bg-[linear-gradient(145deg,rgba(41,121,255,.45),rgba(13,45,99,.6))] shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_10px_24px_-10px_rgba(0,120,255,.6)] sm:size-[52px]"
      >
        <Icon className="size-6 text-[#3B9BFF]" fill={Icon === Zap ? "currentColor" : "none"} strokeWidth={2} />
      </span>
      <span>{title}</span>
    </h2>
  );
}

function FooterLinks({ title, icon, links }: { title: string; icon: LucideIcon; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <FooterHeading title={title} icon={icon} />
      <ul className="mt-6 space-y-4">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group type-body inline-flex items-center gap-3 text-white/95 transition-colors hover:text-[#4FC3F7]">
              <ChevronRight aria-hidden className="size-5 shrink-0 text-[#2F8CFF] transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
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
    <footer className="relative isolate overflow-hidden bg-[#06173A] text-white">
      {/* Deep-navy base with soft blue light sweeps (left top, right side) like the reference. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_100%_10%,rgba(0,102,255,.55),transparent_70%),radial-gradient(40%_60%_at_0%_0%,rgba(30,110,220,.35),transparent_70%),radial-gradient(50%_70%_at_95%_100%,rgba(0,90,230,.35),transparent_70%),linear-gradient(81deg,#041330_0%,#0A2556_55%,#0C3478_100%)]"
      />
      <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1440 480">
        <path d="M-20 120 C 220 10, 380 10, 560 -20" fill="none" stroke="rgba(80,150,255,.18)" strokeWidth="60" />
        <path d="M1000 480 C 1150 300, 1300 200, 1480 160" fill="none" stroke="rgba(80,150,255,.14)" strokeWidth="80" />
        <path d="M1100 -10 C 1220 120, 1320 160, 1480 140" fill="none" stroke="rgba(120,180,255,.12)" strokeWidth="40" />
      </svg>
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 pt-8 pb-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.7fr_0.9fr_0.9fr_1.3fr] lg:gap-12 lg:px-12 lg:pt-10 lg:pb-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={`${site.name} home`} className="flex h-14 items-center sm:h-[68px]">
            <Image src={site.footerLogo.src} alt="AXON ADHD Brand Logo" width={site.footerLogo.width} height={site.footerLogo.height} className="-ml-1 h-11 w-auto sm:h-[52px]" />
          </Link>
          <p className="type-body mt-6 max-w-[520px] text-white/95">{site.blurb}</p>
          <ul className="mt-7 flex flex-wrap items-center gap-3 sm:gap-5" aria-label="Social media">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={cn("grid size-11 place-items-center rounded-full sm:size-12 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_8px_18px_-8px_rgba(0,0,0,.6)] transition-transform duration-200 ease-brand hover:-translate-y-0.5 hover:scale-105", socialStyle[s.label])}
                >
                  <SocialIcon name={s.label} color className="size-[22px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterLinks title="Quick Links" icon={Zap} links={footerNav.quickLinks} />
        </div>
        <div>
          <FooterLinks title="Company" icon={Building2} links={footerNav.company} />
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <FooterHeading title="Contact Us" icon={Mail} />
          <address className="type-body mt-6 space-y-4 not-italic">
            <a href={`mailto:${site.email}`} className="flex items-center gap-4 text-white/95 transition-colors hover:text-[#4FC3F7] active:text-white">
              <Mail aria-hidden className="size-6 shrink-0 text-[#2F8CFF]" strokeWidth={2} /> {site.email}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-4 text-white/95 transition-colors hover:text-[#4FC3F7] active:text-white">
              <Phone aria-hidden className="size-6 shrink-0 text-[#2F8CFF]" fill="currentColor" stroke="#06173A" strokeWidth={1.25} /> {site.phone}
            </a>
            <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 leading-[1.6] text-white/95 transition-colors hover:text-[#4FC3F7] active:text-white">
              <MapPin aria-hidden className="mt-1 size-6 shrink-0 text-[#2F8CFF]" fill="currentColor" stroke="#06173A" strokeWidth={1.25} />
              <span>
                {site.address.street},
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </a>
          </address>
          <ul className="mt-7 flex flex-wrap items-center gap-3.5 border-t border-white/15 pt-7 sm:gap-4 lg:gap-3.5 xl:gap-3" aria-label="Compliance certifications">
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

      <div className="relative">
        {/* Thin glowing line that curves up at both ends, as in the reference. */}
        <svg aria-hidden className="pointer-events-none absolute inset-x-0 -top-3 h-6 w-full" preserveAspectRatio="none" viewBox="0 0 1440 24">
          <defs>
            <linearGradient id="footer-line" x1="0" x2="1">
              <stop offset="0" stopColor="#3B9BFF" stopOpacity=".2" />
              <stop offset=".5" stopColor="#3B9BFF" stopOpacity=".9" />
              <stop offset="1" stopColor="#3B9BFF" stopOpacity=".2" />
            </linearGradient>
          </defs>
          <path d="M0 22 C 60 10, 120 12, 220 12 L 1220 12 C 1320 12, 1380 10, 1440 22" fill="none" stroke="url(#footer-line)" strokeWidth="1.5" />
        </svg>
        <div className="type-body mx-auto flex w-full max-w-[1440px] flex-col items-center gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:justify-between lg:px-12">
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/95">
            {site.copyright}
            <span aria-hidden className="hidden text-[#2F8CFF] sm:inline">|</span>
            <span className="font-display font-bold text-[#2F8CFF]">{site.name}</span>
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {footerNav.legal.map((l, i) => (
              <Fragment key={l.href}>
                {i > 0 && (
                  <li aria-hidden className="hidden text-[#2F8CFF] xs:list-item">
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
