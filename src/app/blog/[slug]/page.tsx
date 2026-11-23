import Image from "next/image";
import { notFound } from "next/navigation";
import { ChartNoAxesColumn } from "lucide-react";
import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { ArticleToc } from "@/components/ui/ArticleToc";
import { ShareRow } from "@/components/ui/ShareRow";
import { JsonLd } from "@/components/ui/JsonLd";
import { Blocks } from "@/components/ui/RichText";
import { author, splitPostFaq } from "@/content/blogs";
import { links, site } from "@/content/site";
import { blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata, plainText } from "@/lib/seo";
import { formatDate, slugify } from "@/lib/utils";
import { getPost, getPosts } from "@/lib/wordpress";

// Unknown slugs fall through to notFound() below (dynamicParams is not allowed with Cache Components).
// Every path is prerendered by generateStaticParams, so this route is allowed to block on its `params` (no Suspense
// placeholder needed); this only opts it out of the dev-time instant-navigation validation.
export const instant = false;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}/`, image: post.image.src, type: "article", publishedTime: post.date });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // WordPress posts carry cleaned HTML; the three bundled posts (used if WordPress is unreachable) carry content blocks.
  const wp = post.html !== undefined;
  const { content, faqs: blockFaqs } = splitPostFaq(post.body);
  const faqCount = wp ? (post.faqs ?? []).length : blockFaqs.length;
  const faqAccordion = wp
    ? (post.faqs ?? []).map((f, i) => ({ id: `faq-${i}`, title: f.q, content: <div dangerouslySetInnerHTML={{ __html: f.html }} /> }))
    : blockFaqs.map((f, i) => ({ id: `faq-${i}`, title: f.q, content: <Blocks blocks={f.a} /> }));
  // Like the original WordPress page, the Table of Contents lists the article's H2 headings (FAQ section included).
  const toc = wp
    ? (post.headings ?? []).filter((h) => h.level === 2).map((h) => ({ id: h.id, text: h.text }))
    : content.filter((b): b is { type: "h2"; text: string } => b.type === "h2").map((h) => ({ id: slugify(h.text), text: plainText(h.text) }));
  const faqTitle = post.faqTitle ?? "Frequently Asked Questions";
  if (faqCount) toc.push({ id: "faq", text: faqTitle });
  const tags = post.tags.map((t) => (t.startsWith("#") ? t : `#${t}`));
  const url = `${site.url}/blog/${post.slug}/`;

  return (
    <>
    <article className="-mt-[var(--header-height)] px-2.5 pt-[150px] pb-5 max-md:pt-[200px]">
      <div className="container-content flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="min-w-0 rounded-[6px] border border-[#E3E6EF] bg-white p-5 pt-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] lg:w-[70%] lg:pt-10">
          <h1 className="text-[18px] leading-[1.5] font-bold text-[#1D3C67] md:text-[24px] lg:text-[32px]">{post.title}</h1>
          <div className="mt-4 mb-5 flex items-center justify-between gap-5">
            <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#54595F] sm:text-[16px]">
              <span className="inline-flex items-center gap-2.5">
                <Image src={author.image.src} alt="" width={40} height={40} className="size-[25px] rounded-full sm:size-10" />
                {post.author}
              </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            {post.views !== undefined && (
              <p className="m-0 inline-flex items-center gap-1.5 text-[12px] text-[#54595F] sm:text-[16px]" title="Views">
                <ChartNoAxesColumn aria-hidden className="size-4" />
                <span className="sr-only">Views: </span>
                {post.views}
              </p>
            )}
          </div>

          <div className="axon-article">
            {wp ? <div dangerouslySetInnerHTML={{ __html: post.html ?? "" }} /> : <Blocks blocks={content} />}
            {faqCount > 0 && (
              <section aria-labelledby="faq">
                <h2 id="faq">{faqTitle}</h2>
                <Accordion variant="article" items={faqAccordion} defaultOpen={0} />
              </section>
            )}
            {tags.length > 0 && (
              <p className="mt-[1.6rem] flex flex-wrap gap-2 border-t border-[#e3e8ee] pt-[1.2rem] sm:gap-2.5">
                {tags.map((t) => (
                  <span key={t} className="inline-block rounded-md border border-[#e2e6ea] bg-[#f7f8fa] px-[11px] py-1.5 text-[14px] leading-[1.2] font-medium text-[#0669ff] sm:px-3.5 sm:py-[7px] sm:text-[16px]">
                    {t}
                  </span>
                ))}
              </p>
            )}
          </div>

          <div className="mt-7">
            <ShareRow url={url} title={post.title} />
            <aside aria-label="About the author" className="flex flex-col gap-4 rounded-[18px] border border-[#E5E7EB] bg-white p-5 max-sm:text-center sm:flex-row sm:items-center sm:gap-[18px] sm:px-8 sm:py-6">
              <Image src={author.image.src} alt={author.image.alt} width={82} height={82} className="size-[72px] shrink-0 rounded-full object-cover max-sm:mx-auto sm:size-[82px]" />
              <div className="min-w-0">
                <p className="m-0 text-[20px] leading-[1.2] font-semibold text-[#1F2937] sm:text-[22px]">{author.name}</p>
                <p className="mt-2 text-[16px] leading-[1.5] text-[#6B7280] sm:text-[18px]">{author.title.replace(",", ", ")}</p>
              </div>
            </aside>
          </div>
        </div>

        <aside className="flex flex-col gap-5 p-2.5 lg:sticky lg:top-[var(--header-offset)] lg:w-[30%] lg:shrink-0">
          <ArticleToc items={toc} />
          <div className="flex flex-col items-center rounded-[6px] border border-[#E3E6EF] bg-[#F8FBFF] pb-[15px]">
            <Image src="/images/blog/blog-post-free-guide-complete-guide-to-adhd.webp" alt="Complete Guide to ADHD" width={259} height={324} className="h-auto w-[259px] max-w-full" />
            <h2 className="mt-1 px-4 text-center text-[18px] leading-[29px] font-bold text-[#0A0A0A] lg:text-[22px]">Free Guide to ADHD Diagnosis</h2>
            <a href={links.freeScreening} target="_blank" rel="noopener noreferrer" className="mt-3 rounded-full border border-[#256ACC] bg-[#256ACC] px-4 py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-[#669CE4]">
              Download Now
            </a>
          </div>
        </aside>
      </div>
    </article>

      <JsonLd data={blogPostingJsonLd({ title: post.title, description: post.description, slug: post.slug, date: post.date, image: post.image.src, author: author.name })} />
      {wp ? (post.faqSchema ?? []).map((data, i) => <JsonLd key={i} data={data} />) : blockFaqs.length > 0 && <JsonLd data={faqJsonLd(blockFaqs)} />}
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: post.title, path: `/blog/${post.slug}/` }])} />
    </>
  );
}
