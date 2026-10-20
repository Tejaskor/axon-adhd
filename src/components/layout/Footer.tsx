import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";
import { complianceBadges } from "@/content/trust";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SocialIcon } from "./SocialIcon";

function FooterLinks({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h2 className="mb-5 text-[15px] font-semibold tracking-[0.08em] text-white uppercase">{title}</h2>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] text-[#D5D9DF] transition-colors hover:text-white">
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
    <footer className="bg-navy-footer text-[#D5D9DF]">
      <div className="container-content grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.3fr] lg:py-16">
        <div>
          <Link href="/" aria-label={`${site.name} home`} className="inline-block">
            <Image src={site.footerLogo.src} alt="AXON ADHD Brand Logo" width={site.footerLogo.width} height={site.footerLogo.height} className="h-12 w-auto" />
          </Link>
          <p className="mt-5 max-w-[380px] text-[15px] leading-[1.7]">{site.blurb}</p>
        </div>
        <FooterLinks title="Quick Links" links={footerNav.quickLinks} />
        <FooterLinks title="Company" links={footerNav.company} />
        <div>
          <h2 className="text-[15px] font-semibold tracking-[0.08em] text-white uppercase">Subscribe to Newsletter</h2>
          <p className="mt-4 text-[15px] leading-[1.6]">Sign up for our newsletter for updates and offers. At AXON ADHD, we’re here to help you succeed!</p>
          <NewsletterForm />
          <address className="mt-2 space-y-3 text-[15px] not-italic">
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
              <Mail aria-hidden className="size-4 shrink-0 text-[#8EB8F2]" /> {site.email}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-3 hover:text-white">
              <Phone aria-hidden className="size-4 shrink-0 text-[#8EB8F2]" /> {site.phone}
            </a>
            <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-[#8EB8F2]" /> {site.address.full}
            </a>
          </address>
        </div>
      </div>

      <div className="container-content">
        <ul className="flex flex-wrap items-center gap-4 border-t border-white/10 py-6" aria-label="Compliance certifications">
          {complianceBadges.map((b) => (
            <li key={b.src}>
              <Link href="/trust-center/" className="block rounded-[8px] bg-white px-3 py-2 transition-opacity hover:opacity-90">
                <Image src={b.src} alt={b.alt} width={b.width} height={b.height} className="h-8 w-auto" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-center gap-4 py-6 text-[14px] lg:flex-row lg:justify-between">
          <p>{site.copyright}</p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-2">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary"
                >
                  <SocialIcon name={s.label} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
