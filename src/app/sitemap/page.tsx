import Link from "next/link";
import { BookOpen, Building2, ChevronRight, House, Scale, type LucideIcon } from "lucide-react";
import { PageIntro } from "@/components/sections/LegalPage";
import { Reveal } from "@/components/ui/Reveal";
import { blogPosts } from "@/content/blogs";
import { footerNav, mainNav } from "@/content/nav";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({ title: "Site Map", description: "Every page on the AXON ADHD website.", path: "/sitemap/" });

const services = mainNav.flatMap((item) => (item.kind === "mega" ? item.links.map((l) => ({ label: l.label, href: l.href })) : []));

/** Each group gets a brand tint (card wash, border, icon disc) so the four columns read as distinct blocks. */
const groups: Array<{ title: string; icon: LucideIcon; tone: string; disc: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Quick Links",
    icon: House,
    tone: "from-[#22C083]/[0.12] border-[#22C083]/30",
    disc: "from-[#4FE0AE] to-[#16A56E] shadow-[0_8px_20px_rgba(34,192,131,.35)]",
    links: [{ label: "Home", href: "/" }, ...services],
  },
  {
    title: "Company",
    icon: Building2,
    tone: "from-primary/[0.12] border-primary/30",
    disc: "from-primary-400 to-primary-600 shadow-[0_8px_20px_rgba(37,120,202,.35)]",
    links: [...footerNav.company, { label: "Trust Center", href: "/trust-center/" }],
  },
  {
    title: "Blog",
    icon: BookOpen,
    tone: "from-[#EB8B01]/[0.12] border-[#EB8B01]/30",
    disc: "from-[#FFC15A] to-[#E08200] shadow-[0_8px_20px_rgba(235,139,1,.35)]",
    links: blogPosts.map((p) => ({ label: p.title, href: `/blog/${p.slug}/` })),
  },
  {
    title: "Legal Pages",
    icon: Scale,
    tone: "from-[#8B5CF6]/[0.12] border-[#8B5CF6]/30",
    disc: "from-[#A78BFA] to-[#7C3AED] shadow-[0_8px_20px_rgba(124,58,237,.32)]",
    links: footerNav.legal,
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageIntro title="SiteMap" path="/sitemap/" />
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:pb-24">
        <div className="mx-auto grid w-full max-w-[1180px] gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.07} className="flex">
              <nav
                aria-labelledby={`sm-${g.title}`}
                className={cn("w-full rounded-[22px] border bg-gradient-to-br to-white p-5 shadow-[0_12px_36px_rgba(15,27,46,.07)] sm:p-6", g.tone)}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span aria-hidden className={cn("grid size-11 shrink-0 place-items-center rounded-full border border-white/50 bg-gradient-to-br text-white", g.disc)}>
                    <g.icon className="size-5 stroke-[1.7]" />
                  </span>
                  <h2 id={`sm-${g.title}`} className="type-h4 text-navy">
                    {g.title}
                  </h2>
                </div>
                <ul className="space-y-0.5">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group type-body flex items-start justify-between gap-2 rounded-[12px] px-3 py-2.5 font-medium text-ink-2 transition-colors duration-200 hover:bg-white hover:text-primary">
                        <span className="min-w-0 leading-snug">{l.label}</span>
                        <ChevronRight aria-hidden className="mt-1 size-4 shrink-0 text-primary/40 transition duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
