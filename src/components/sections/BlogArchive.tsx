import Link from "next/link";
import { blogPage, type BlogCategory, type BlogPost } from "@/content/blogs";
import { cn } from "@/lib/utils";
import { getCategories, getPosts } from "@/lib/wordpress";
import { BlogRowCard } from "./BlogCard";

export const POSTS_PER_PAGE = 3;

/** Posts in a category, including posts in its sub-categories (as WordPress archives do). `null` if the category does not exist. */
export async function getCategoryArchive(slug: string): Promise<{ category: BlogCategory; posts: BlogPost[] } | null> {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()]);
  const category = categories.find((c) => c.slug === slug);
  if (!category) return null;
  const ids = new Set([category.id]);
  for (let grew = true; grew; ) {
    grew = false;
    for (const c of categories) {
      if (c.parent && ids.has(c.parent) && !ids.has(c.id)) {
        ids.add(c.id);
        grew = true;
      }
    }
  }
  return { category, posts: posts.filter((p) => p.categories?.some((c) => ids.has(c.id))) };
}

/** Number of pages for the main archive, or for a category when `categorySlug` is given. */
export async function getTotalBlogPages(categorySlug?: string) {
  const count = categorySlug ? ((await getCategoryArchive(categorySlug))?.posts.length ?? 0) : (await getPosts()).length;
  return Math.max(1, Math.ceil(count / POSTS_PER_PAGE));
}

const archiveBase = (categorySlug?: string) => (categorySlug ? `/blog/category/${categorySlug}/` : "/blog/");
const pageHref = (base: string, n: number) => (n === 1 ? base : `${base}page/${n}/`);

/** Page numbers with "…" gaps, e.g. 1 2 3 … 7 (first/last always shown, two neighbours either side of the current page). */
function pageItems(current: number, total: number) {
  const items: Array<number | "dots"> = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - current) <= 2) items.push(p);
    else if (items[items.length - 1] !== "dots") items.push("dots");
  }
  return items;
}

// Shape only; each state below adds its own colours so no two utilities fight over the same property.
const pageBtn =
  "flex h-9 items-center justify-center rounded-full border px-3 text-[13px] font-medium whitespace-nowrap transition-colors duration-300 sm:h-[42px] sm:px-4 sm:text-[15px]";
const pageNum = "min-w-9 px-0 sm:min-w-[42px] sm:px-0";
const pageBtnLink = `${pageBtn} border-[#D1D5DB] bg-white text-[#374151] hover:border-[#256ACC] hover:bg-[#256ACC] hover:text-white`;
const pageBtnCurrent = `${pageBtn} ${pageNum} border-[#256ACC] bg-[#256ACC] text-white`;
const pageBtnDisabled = `${pageBtn} border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF]`;
const pageDots = `${pageBtn} ${pageNum} border-transparent text-[#6B7280]`;

function Pagination({ current, total, base }: { current: number; total: number; base: string }) {
  if (total <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-6 flex flex-wrap items-center justify-center gap-1 sm:mt-[30px] sm:gap-2">
      {current > 1 ? (
        <Link href={pageHref(base, current - 1)} rel="prev" className={pageBtnLink}>
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={pageBtnDisabled}>
          Previous
        </span>
      )}
      {pageItems(current, total).map((item, i) =>
        item === "dots" ? (
          <span key={`d${i}`} aria-hidden className={pageDots}>
            …
          </span>
        ) : item === current ? (
          <span key={item} aria-current="page" className={pageBtnCurrent}>
            <span className="sr-only">Page </span>
            {item}
          </span>
        ) : (
          <Link key={item} href={pageHref(base, item)} className={`${pageBtnLink} ${pageNum}`}>
            <span className="sr-only">Page </span>
            {item}
          </Link>
        ),
      )}
      {current < total ? (
        <Link href={pageHref(base, current + 1)} rel="next" className={pageBtnLink}>
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={pageBtnDisabled}>
          Next
        </span>
      )}
    </nav>
  );
}

const widgetBox = "rounded-[6px] border border-[#D7DDE6] bg-white px-[22px] py-4";
const widgetTitle = "border-b border-[#E5E7EB] pb-4 text-[18px] font-bold text-[#1F2937] uppercase sm:text-[20px]";
const widgetItem =
  "relative py-2.5 pl-5 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:text-[16px] before:text-[#1F2937] before:content-['›'] sm:before:text-[18px]";
const widgetLink = "text-[16px] text-[#1F2937] transition-colors hover:text-[#2563EB] sm:text-[18px]";

/** The /blog/ archive (WordPress posts): post list + pagination on the left, Categories and Recent Posts on the right. */
export async function BlogArchive({ page, categorySlug }: { page: number; categorySlug?: string }) {
  const [allPosts, categories, archive] = await Promise.all([getPosts(), getCategories(), categorySlug ? getCategoryArchive(categorySlug) : null]);
  const listed = archive ? archive.posts : allPosts;
  const totalPages = Math.max(1, Math.ceil(listed.length / POSTS_PER_PAGE));
  const posts = listed.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  return (
    <section className="-mt-[var(--header-height)] pt-[150px] pb-[60px] max-md:pt-[200px]" aria-label="Blog articles">
      <div className="container-content flex flex-col gap-5 md:flex-row md:gap-0">
        <div className="p-2.5 md:w-[70%]">
          <h1 className="sr-only">{archive ? `${archive.category.name} – ${blogPage.title}` : blogPage.title}</h1>
          <ul className="flex flex-col gap-5">
            {posts.map((post) => (
              <li key={post.slug}>
                <BlogRowCard post={post} eager />
              </li>
            ))}
          </ul>
          {posts.length === 0 && <p className="rounded-[6px] border border-[#E2E5E8] bg-white p-6 text-[16px] text-body">No articles in this category yet.</p>}
          <Pagination current={page} total={totalPages} base={archiveBase(categorySlug)} />
        </div>
        <aside className="flex flex-col gap-5 p-2.5 md:w-[30%]">
          <div className={widgetBox}>
            <h2 className={widgetTitle}>Categories</h2>
            <nav aria-label="Categories">
              {/* Tag chips: name plus post count in brackets, wrapping to as many rows as needed. */}
              <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-3">
                {categories.map((c) => {
                  const current = c.slug === categorySlug;
                  return (
                    <li key={c.slug}>
                      <Link
                        href={`/blog/category/${c.slug}/`}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "inline-block rounded-[4px] border px-3 py-1.5 text-[14px] leading-snug transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                          current ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-[#E2E5E8] bg-[#F7F8FA] text-[#1F2937] hover:border-[#2563EB] hover:bg-white hover:text-[#2563EB]",
                        )}
                      >
                        {c.name}
                        {c.count !== undefined && ` (${c.count})`}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className={widgetBox}>
            <h2 className={widgetTitle}>Recent Posts</h2>
            <ul>
              {allPosts.slice(0, 5).map((p) => (
                <li key={p.slug} className={widgetItem}>
                  <Link href={`/blog/${p.slug}/`} className={widgetLink}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
