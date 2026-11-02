import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Site Map", description: "Every page on the AXON ADHD website.", path: "/sitemap/" });

type Leaf = { label: string; href: string };
type Item = { label: string; href?: string; children?: Leaf[] };
type Group = { title: string; items: Item[] };

/** Numbered tree, matching the live site map: groups → numbered pages (1.1, 1.2…) → un-numbered sub-pages. */
const groups: Group[] = [
  {
    title: "Quick Links",
    items: [
      { label: "Home", href: "/" },
      {
        label: "Services",
        children: [
          { label: "ADHD Assessments", href: "/comprehensive-adhd-assessment/" },
          { label: "ADHD Care", href: "/adhd-care/" },
          { label: "Accommodation Documentation & Advocacy", href: "/accommodation-documentation-advocacy/" },
        ],
      },
      {
        label: "Referral",
        children: [
          { label: "Referral University", href: "/adhd-referral-for-universities/" },
          { label: "Referral PCP", href: "/referral-adhd-partners/" },
        ],
      },
      {
        label: "Resources",
        children: [
          { label: "Blog", href: "/blog/" },
          { label: "Case Study", href: "/case-studies/" },
        ],
      },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about-adhd-evaluation/" },
      { label: "FAQ", href: "/adhd-faqs/" },
      { label: "Testimonials", href: "/#Testimonials" },
      { label: "Contact Us", href: "/#contact" },
    ],
  },
  {
    title: "Legal Pages",
    items: [
      { label: "Privacy Policy", href: "/axon-adhd-privacy-policy/" },
      { label: "Terms & Conditions", href: "/terms-conditions/" },
      { label: "Telehealth Policy", href: "/telehealth-policy/" },
      { label: "Sitemap", href: "/sitemap/" },
    ],
  },
];

function Label({ label, href }: { label: string; href?: string }) {
  return href ? (
    <Link href={href} className="text-[15px] leading-snug text-ink-2 underline-offset-2 transition-colors hover:text-primary hover:underline">
      {label}
    </Link>
  ) : (
    <span className="text-[15px] leading-snug text-ink-2">{label}</span>
  );
}

/** One column: dark root box, gray numbered boxes on a trunk line, and L-shaped connectors to sub-pages. */
function Tree({ group, n }: { group: Group; n: number }) {
  return (
    <nav aria-labelledby={`sm-${n}`}>
      <h2 id={`sm-${n}`} className="text-[22px] leading-tight font-bold text-primary sm:text-[24px]">
        {group.title}
      </h2>
      <div className="mt-6 pl-4">
        <span aria-hidden className="relative z-10 grid size-6 place-items-center bg-[#2B2B2B] text-[12px] font-semibold text-white">
          {n}
        </span>
        {/* The list's left border is the trunk running down from the centre of the root box. */}
        <ol className="ml-3 border-l border-[#9CA3AF] pt-3 pb-1">
          {group.items.map((item, i) => (
            <li key={item.label} className="pt-3 pl-8">
              <div className="relative flex min-h-6 items-center gap-3.5 before:absolute before:top-1/2 before:-left-8 before:w-8 before:border-t before:border-[#9CA3AF]">
                <span aria-hidden className="grid h-6 w-[35px] shrink-0 place-items-center bg-[#555] text-[11.5px] font-semibold text-white">
                  {n}.{i + 1}
                </span>
                <Label label={item.label} href={item.href} />
              </div>
              {item.children && (
                <ul className="ml-[17px] border-l border-[#9CA3AF] pb-1">
                  {item.children.map((c) => (
                    <li key={c.href} className="pt-4 pl-11">
                      <div className="relative before:absolute before:top-[0.7em] before:-left-11 before:w-10 before:border-t before:border-[#9CA3AF]">
                        <Label label={c.label} href={c.href} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export default function SitemapPage() {
  return (
    <section className="-mt-[var(--header-height)] bg-white pt-[128px] pb-20 sm:pt-[136px] sm:pb-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <h1 className="text-[34px] leading-tight font-bold tracking-[-0.02em] text-navy sm:text-[40px]">
          Site<span className="text-primary">Map</span>
        </h1>
        <span aria-hidden className="mt-2 block h-[3px] w-14 rounded-full bg-gradient-to-r from-[#22C083] to-primary" />
        <p className="mt-6 text-[16px] text-body sm:text-[17px]">For Easy Navigation and Better Visibility.</p>
        <ButtonLink
          href="/#contact"
          variant="outline"
          className="mt-7 h-[52px] w-[220px] rounded-[4px]! border-2 bg-white text-[14px] font-semibold tracking-[0.04em] uppercase hover:bg-primary hover:text-white"
        >
          Contact Us
        </ButtonLink>

        <div className="mt-14 grid gap-12 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {groups.map((g, i) => (
            <Tree key={g.title} group={g} n={i + 1} />
          ))}
        </div>
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Site Map", path: "/sitemap/" }])} />
    </section>
  );
}
