import Image from "next/image";
import { BlogCard } from "@/components/sections/BlogCard";
import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPage, blogPosts } from "@/content/blogs";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "ADHD Blog | Expert Guides & Articles", description: blogPage.intro, path: "/blog/", image: blogPage.hero.src });

export default function BlogIndexPage() {
  return (
    <>
      <section className="-mt-[var(--header-height)] bg-gradient-to-b from-primary-soft to-white pt-[140px] pb-10">
        <Container>
          <SectionHeading as="h1" title={blogPage.title} subtitle={blogPage.intro} />
          <Image src={blogPage.hero.src} alt={blogPage.hero.alt} width={blogPage.hero.width} height={blogPage.hero.height} priority sizes="(max-width: 1340px) 100vw, 1100px" className="mx-auto h-auto w-full max-w-[1100px] rounded-xl2 shadow-soft" />
        </Container>
      </section>
      <section className="py-14 sm:py-16" aria-label="Articles">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <ul className="grid gap-6 sm:grid-cols-2">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <BlogCard post={post} headingLevel="h2" />
                </li>
              ))}
            </ul>
            <aside aria-labelledby="categories-title" className="self-start rounded-panel border border-line-2 bg-surface-2 p-6">
              <h2 id="categories-title" className="text-[18px] font-bold text-navy">
                Categories
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {blogPage.categories.map((c) => (
                  <li key={c} className="rounded-pill bg-white px-3 py-1.5 text-[14px] text-ink-2 shadow-card">
                    {c}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>
      <ContactSection />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }])} />
    </>
  );
}
