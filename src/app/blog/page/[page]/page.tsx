import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogArchive, getTotalBlogPages } from "@/components/sections/BlogArchive";
import { JsonLd } from "@/components/ui/JsonLd";
import { blogPage } from "@/content/blogs";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Pages 2..N. Page 1 lives at /blog/. Cache Components needs at least one param, so when there is only one page
// "1" is returned and rendered as a 404 below.
export async function generateStaticParams() {
  const pages = Array.from({ length: (await getTotalBlogPages()) - 1 }, (_, i) => String(i + 2));
  return pages.length ? pages.map((page) => ({ page })) : [{ page: "1" }];
}

async function parsePage(raw: string) {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 2 && n <= (await getTotalBlogPages()) ? n : null;
}

export async function generateMetadata({ params }: PageProps<"/blog/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  const n = await parsePage(page);
  if (!n) return {};
  return pageMetadata({ title: `ADHD Blog | Page ${n}`, description: blogPage.intro, path: `/blog/page/${n}/`, image: blogPage.hero.src });
}

export default async function BlogPaginatedPage({ params }: PageProps<"/blog/page/[page]">) {
  const { page } = await params;
  const n = await parsePage(page);
  if (!n) notFound();
  return (
    <>
      <BlogArchive page={n} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: `Page ${n}`, path: `/blog/page/${n}/` }])} />
    </>
  );
}
