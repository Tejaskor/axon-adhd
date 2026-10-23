import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { faqItems } from "@/components/sections/FAQAccordion";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Blocks } from "@/components/ui/RichText";
import { author, blogPage, blogPosts, getPost, splitPostFaq } from "@/content/blogs";
import { links } from "@/content/site";
import { blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata, plainText } from "@/lib/seo";
import { formatDate, slugify } from "@/lib/utils";

// Unknown slugs fall through to notFound() below (dynamicParams is not allowed with Cache Components).
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}/`, image: post.image.src, type: "article", publishedTime: post.date });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content, faqs } = splitPostFaq(post.body);
  const toc = content.filter((b): b is { type: "h2"; text: string } => b.type === "h2");

  return (
    <article>
      <header className="-mt-[var(--header-height)] bg-gradient-to-b from-primary-soft to-white pt-[130px] pb-10">
        <Container className="max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="mb-5 text-[14px] text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <ChevronRight aria-hidden className="size-3.5" />
              <li>
                <Link href="/blog/" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <ChevronRight aria-hidden className="size-3.5" />
              <li aria-current="page" className="line-clamp-1 text-ink-2">
                {post.title}
              </li>
            </ol>
          </nav>
          <h1 className="font-display text-[28px] leading-[1.2] font-bold text-ink sm:text-[40px]">{post.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-4 text-[14px] text-muted">
            <span className="inline-flex items-center gap-2">
              <Image src={author.image.src} alt="" width={32} height={32} className="size-8 rounded-full" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays aria-hidden className="size-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
          </p>
          <Image src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} priority sizes="(max-width: 1100px) 100vw, 1100px" className="mt-8 h-auto w-full rounded-xl2 shadow-soft" />
        </Container>
      </header>

      <Container className="max-w-[1100px] pb-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="prose-axon min-w-0">
            <Blocks blocks={content} />
            {faqs.length > 0 && (
              <section aria-labelledby="post-faq" className="not-prose mt-12">
                <h2 id="post-faq" className="mb-5 font-display text-[26px] font-bold text-navy">
                  Frequently Asked Questions
                </h2>
                <Accordion items={faqItems(faqs)} defaultOpen={null} />
              </section>
            )}
            <p className="mt-8 flex flex-wrap gap-2 text-[14px] text-primary">
              {post.tags.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </p>
            <aside className="mt-10 flex flex-col gap-5 rounded-xl2 bg-surface p-6 sm:flex-row sm:items-center" aria-label="About the author">
              <Image src={author.image.src} alt={author.image.alt} width={96} height={96} className="size-24 shrink-0 rounded-full" />
              <div>
                <p className="text-[19px] font-bold text-navy">{author.name}</p>
                <p className="text-[14px] text-muted">{author.title}</p>
              </div>
            </aside>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-[var(--header-offset)] space-y-6">
              {toc.length > 0 && (
                <nav aria-labelledby="toc-title" className="rounded-panel border border-line-2 bg-white p-5 shadow-card">
                  <h2 id="toc-title" className="text-[16px] font-bold text-navy">
                    Table of Contents
                  </h2>
                  <ol className="mt-3 space-y-2 text-[14px]">
                    {toc.map((h) => (
                      <li key={h.text}>
                        <a href={`#${slugify(h.text)}`} className="text-body hover:text-primary">
                          {plainText(h.text)}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="rounded-panel bg-navy p-6 text-white">
                <h2 className="font-display text-[20px] font-bold">{blogPage.freeGuide.title}</h2>
                <ButtonLink href={links.freeScreening} variant="white" size="sm" className="mt-4">
                  {blogPage.freeGuide.cta}
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      <LatestBlogs />
      <JsonLd data={blogPostingJsonLd({ title: post.title, description: post.description, slug: post.slug, date: post.date, image: post.image.src, author: author.name })} />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: post.title, path: `/blog/${post.slug}/` }])} />
    </article>
  );
}
