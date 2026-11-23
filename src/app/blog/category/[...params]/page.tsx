import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogArchive, getCategoryArchive, getTotalBlogPages } from "@/components/sections/BlogArchive";
import { JsonLd } from "@/components/ui/JsonLd";
import { blogPage } from "@/content/blogs";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getCategories } from "@/lib/wordpress";

// /blog/category/<slug>/ and /blog/category/<slug>/page/<n>/ (one optional catch-all keeps both in a single file).
// Every path is prerendered by generateStaticParams, so this route is allowed to block on its `params` (no Suspense
// placeholder needed); this only opts it out of the dev-time instant-navigation validation.
export const instant = false;

export async function generateStaticParams() {
  const out: Array<{ params: string[] }> = [];
  for (const c of await getCategories()) {
    out.push({ params: [c.slug] });
    const pages = await getTotalBlogPages(c.slug);
    for (let n = 2; n <= pages; n++) out.push({ params: [c.slug, "page", String(n)] });
  }
  return out;
}

async function resolve(params: string[]) {
  const [slug, marker, num, ...rest] = params;
  let page = 1;
  if (marker !== undefined) {
    page = Number(num);
    if (marker !== "page" || rest.length || !Number.isInteger(page) || page < 2) return null;
  }
  const archive = await getCategoryArchive(slug);
  if (!archive || page > (await getTotalBlogPages(slug))) return null;
  return { slug, page, category: archive.category };
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[...params]">): Promise<Metadata> {
  const r = await resolve((await params).params);
  if (!r) return {};
  const path = r.page === 1 ? `/blog/category/${r.slug}/` : `/blog/category/${r.slug}/page/${r.page}/`;
  return pageMetadata({ title: `${r.category.name} | ADHD Blog${r.page > 1 ? ` | Page ${r.page}` : ""}`, description: `ADHD articles in the ${r.category.name} category. ${blogPage.intro}`, path, image: blogPage.hero.src });
}

export default async function BlogCategoryPage({ params }: PageProps<"/blog/category/[...params]">) {
  const r = await resolve((await params).params);
  if (!r) notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: r.category.name, path: `/blog/category/${r.slug}/` }];
  return (
    <>
      <BlogArchive page={r.page} categorySlug={r.slug} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
