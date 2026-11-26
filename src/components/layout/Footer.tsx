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
  Facebook: "bg-[#0E2C59] text-[#0866FF]",
  LinkedIn: "bg-[#0A66C2] text-white",
  Instagram: "bg-[radial-gradient(circle_at_30%_107%,#FDF497_0%,#FDF497_5%,#FD5949_45%,#D6249F_60%,#285AEB_90%)] text-white",
  YouTube: "bg-[#0E2C59] text-[#FF0000]",
  X: "bg-[#0E2C59] text-white",
  TikTok: "bg-[#0E2C59]",
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
              <ChevronRight aria-hidden className="size-5 shrink-0 text-[#3B9BFF] transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
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
                  className={cn("grid size-11 place-items-center rounded-full sm:size-12 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_8px_18px_-8px_rgba(0,0,0,.6)] transition-transform duration-200 ease-brand hover:-translate-y-0.5 hover:scale-105", socialStyle[s.label])}
                >
                  <SocialIcon name={s.label} color className="size-[22px] sm:size-6" />
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
              <Mail aria-hidden className="size-6 shrink-0 text-[#3B9BFF]" strokeWidth={2} /> {site.email}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-4 text-white/95 transition-colors hover:text-[#4FC3F7] active:text-white">
              <Phone aria-hidden className="size-6 shrink-0 text-[#3B9BFF]" fill="currentColor" stroke="#061A36" strokeWidth={1.25} /> {site.phone}
            </a>
            <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 leading-[1.6] text-white/95 transition-colors hover:text-[#4FC3F7] active:text-white">
              <MapPin aria-hidden className="mt-1 size-6 shrink-0 text-[#3B9BFF]" fill="currentColor" stroke="#061A36" strokeWidth={1.25} />
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

      {/* Bottom bar: 1px top and bottom rules in a subtle navy gradient. */}
      <div
        className="relative"
        style={{ borderWidth: "1px 0", borderStyle: "solid", borderImage: "linear-gradient(90deg, #17335B 0%, #1A3861 100%) 1" }}
      >
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
