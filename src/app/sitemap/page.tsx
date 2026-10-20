import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { blogPosts } from "@/content/blogs";
import { footerNav, mainNav } from "@/content/nav";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Site Map", description: "Every page on the AXON ADHD website.", path: "/sitemap/" });

const services = mainNav.flatMap((item) => (item.kind === "mega" ? item.links.map((l) => ({ label: l.label, href: l.href })) : []));

const groups = [
  { title: "Quick Links", links: [{ label: "Home", href: "/" }, ...services] },
  { title: "Company", links: [...footerNav.company, { label: "Trust Center", href: "/trust-center/" }] },
  { title: "Blog", links: blogPosts.map((p) => ({ label: p.title, href: `/blog/${p.slug}/` })) },
  { title: "Legal Pages", links: footerNav.legal },
];

export default function SitemapPage() {
  return (
    <section className="-mt-[var(--header-height)] pt-[140px] pb-20">
      <Container className="max-w-[1100px]">
        <h1 className="mb-10 font-display text-[32px] font-bold text-navy sm:text-[44px]">SiteMap</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <nav key={g.title} aria-labelledby={`sm-${g.title}`} className="rounded-panel border border-line-2 bg-white p-6 shadow-card">
              <h2 id={`sm-${g.title}`} className="mb-4 text-[18px] font-bold text-navy">
                {g.title}
              </h2>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[15px] text-primary hover:text-primary-hover hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
    </section>
  );
}
