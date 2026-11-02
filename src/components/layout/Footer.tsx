import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";
import { complianceBadgesColor } from "@/content/trust";
import { SocialIcon } from "./SocialIcon";

function FooterLinks({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h2 className="flex items-center font-display text-[17px] font-semibold tracking-[-0.01em] text-white capitalize lg:h-[68px]">{title}</h2>
      <ul className="mt-5 space-y-3.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="type-body text-white/75 transition-colors duration-200 hover:text-white">
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
    <footer className="relative isolate overflow-hidden bg-[radial-gradient(60%_80%_at_85%_0%,rgba(41,121,230,.35),transparent_70%),radial-gradient(50%_70%_at_0%_100%,rgba(23,105,210,.22),transparent_70%),linear-gradient(160deg,#0C2F6B_0%,#08224F_45%,#061A3D_100%)] text-white">
      {/* Full-width faded wordmark resting on the footer's bottom edge, behind the content. */}
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 translate-y-[0.16em] text-center font-serif text-[14vw] leading-none font-bold whitespace-nowrap text-white/[0.035] select-none"
      >
        AXON ADHD
      </p>
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 pt-12 pb-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.7fr_0.9fr_0.9fr_1.3fr] lg:gap-12 lg:px-12 lg:pt-16 lg:pb-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={`${site.name} home`} className="flex h-14 items-center sm:h-[68px]">
            <Image src={site.footerLogo.src} alt="AXON ADHD Brand Logo" width={site.footerLogo.width} height={site.footerLogo.height} className="h-14 w-auto sm:h-[68px]" />
          </Link>
          <p className="type-body mt-6 max-w-[520px] leading-[1.75] text-white/75">{site.blurb}</p>
        </div>

        <div>
          <FooterLinks title="Quick Links" links={footerNav.quickLinks} />
        </div>
        <div>
          <FooterLinks title="Company" links={footerNav.company} />
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="flex items-center font-display text-[17px] font-semibold tracking-[-0.01em] text-white capitalize lg:h-[68px]">Contact Us</h2>
          <address className="type-body mt-5 space-y-3.5 not-italic">
            <a href={`mailto:${site.email}`} className="flex items-center gap-3.5 text-white/75 transition-colors duration-200 hover:text-white">
              <Mail aria-hidden className="size-6 shrink-0 text-[#6CB4FF]" strokeWidth={1.6} /> {site.email}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-3.5 text-white/75 transition-colors duration-200 hover:text-white">
              <Phone aria-hidden className="size-6 shrink-0 text-[#6CB4FF]" strokeWidth={1.6} /> {site.phone}
            </a>
            <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3.5 leading-[1.8] text-white/75 transition-colors duration-200 hover:text-white">
              <MapPin aria-hidden className="mt-1 size-6 shrink-0 text-[#6CB4FF]" strokeWidth={1.6} />
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
                className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-md transition duration-200 ease-brand hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.16]"
              >
                <SocialIcon name={s.label} className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center gap-5 rounded-[18px] border border-white/10 bg-white/[0.05] px-5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-md sm:gap-7" aria-label="Compliance certifications">
          {complianceBadgesColor.map((b) => (
            <li key={b.src}>
              <Link href="/trust-center/" className="block transition duration-300 ease-brand hover:-translate-y-0.5 hover:drop-shadow-[0_6px_14px_rgba(0,0,0,.35)]">
                <Image src={b.src} alt={b.alt} width={b.width} height={b.height} className={b.src.includes("hipaa") ? "h-11 w-auto sm:h-12" : "h-14 w-auto sm:h-16"} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/[0.12] bg-[#051634]/40">
        <div className="type-body mx-auto flex w-full max-w-[1440px] flex-col items-center gap-4 px-4 py-7 sm:px-6 lg:flex-row lg:justify-between lg:px-12">
          <p className="text-white/70">{site.copyright}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {footerNav.legal.map((l, i) => (
              <Fragment key={l.href}>
                {i > 0 && (
                  <li aria-hidden className="hidden text-white/30 xs:list-item">
                    |
                  </li>
                )}
                <li>
                  <Link href={l.href} className="text-white/70 transition-colors duration-200 hover:text-white">
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
