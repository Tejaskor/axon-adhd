import { cacheLife, cacheTag } from "next/cache";
import { author, blogPage, blogPosts as localPosts, type BlogCategory, type BlogPost } from "@/content/blogs";
import type { ImageAsset } from "@/content/types";
import { slugify } from "@/lib/utils";

/**
 * Read-only client for the WordPress REST API (GET requests only, nothing is ever written to WordPress).
 * Posts are normalised into the site's own `BlogPost` shape so cards, pagination, SEO and JSON-LD are shared with the
 * local content. Results are cached ("use cache", 5 minutes, tag `wordpress`) and revalidate automatically; if the API
 * is unreachable the local posts in `content/blogs.ts` are served instead, so the blog never goes blank.
 */
const API_URL = (process.env.WORDPRESS_API_URL || "https://www.axonadhd.com/wp-json/wp/v2").replace(/\/$/, "");
const TIMEOUT_MS = 10_000;
const PER_PAGE = 100;

type WpTerm = { id: number; name: string; slug: string; parent?: number; taxonomy?: string; count?: number };
type WpMedia = { source_url?: string; alt_text?: string; media_details?: { width?: number; height?: number } };
type WpPost = {
  id: number;
  slug: string;
  date_gmt: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  categories: number[];
  _embedded?: { "wp:featuredmedia"?: WpMedia[]; "wp:term"?: WpTerm[][]; author?: Array<{ name?: string }> };
};

// `_links` must be requested too, otherwise WordPress drops `_embedded` when `_fields` is used.
const LIST_FIELDS = "id,slug,date_gmt,title,excerpt,categories,_links,_embedded";
const EMBED = "wp:featuredmedia,wp:term,author";
const FALLBACK_IMAGE: ImageAsset = blogPage.hero;

/* ── text helpers ─────────────────────────────────────────────────────────── */

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", ndash: "–", mdash: "—" };

function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

const stripTags = (html: string) => decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length).replace(/[\s,;:.–-]+$/, "")}…`;
}

/** "<p>…[&hellip;]</p>" → plain text without WordPress's trailing "[…]". */
const excerptText = (html: string) => stripTags(html).replace(/\s*\[…\]$|\s*…$/, "").trim();

/* ── article HTML clean-up ────────────────────────────────────────────────── */

/** Same-site links stay inside the app (`https://www.axonadhd.com/x/` → `/x/`); uploads and WordPress internals do not. */
function localiseLinks(html: string) {
  return html.replace(/href="https?:\/\/(?:www\.)?axonadhd\.com(\/(?!wp-)[^"]*)?"/gi, (_m, path?: string) => `href="${path || "/"}"`);
}

const fileName = (src: string) => decodeURIComponent(src.split("?")[0].split("/").pop() ?? "").toLowerCase();

/** Range of the `<div>` that opens at the first match of `open`, through its matching `</div>` (nested divs counted). */
function findDivBlock(html: string, open: RegExp, from = 0): { start: number; end: number } | null {
  const re = new RegExp(open.source, open.flags.replace("g", ""));
  const m = re.exec(html.slice(from));
  if (!m) return null;
  const start = from + m.index;
  const tag = /<div\b|<\/div>/gi;
  tag.lastIndex = start;
  let depth = 0;
  for (let t = tag.exec(html); t; t = tag.exec(html)) {
    depth += t[0][1] === "/" ? -1 : 1;
    if (depth === 0) return { start, end: t.index + t[0].length };
  }
  return null;
}

function removeDivBlocks(html: string, open: RegExp) {
  let out = html;
  for (let block = findDivBlock(out, open); block; block = findDivBlock(out, open)) out = out.slice(0, block.start) + out.slice(block.end);
  return out;
}

type FaqEntry = { q: string; html: string };

/**
 * Turns WordPress/Elementor markup into something the article layout can render: scripts are dropped (FAQ JSON-LD is
 * kept separately), the duplicate hero image is removed, `<h2>`s get ids for the table of contents, and the custom FAQ
 * block is lifted out so the site's own Accordion renders it.
 */
export function processArticleHtml(raw: string, featured?: ImageAsset) {
  let html = raw;

  const schema: Array<Record<string, unknown>> = [];
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(m[1]);
      if (data && data["@type"] === "FAQPage") schema.push(data);
    } catch {
      /* malformed schema in the source post: skip it */
    }
  }
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<!--[\s\S]*?-->/g, "");

  // The original article opens with its featured image inside the content; if a post does not, put it there so every post matches.
  if (featured?.src) {
    const first = /<figure[^>]*>[\s\S]*?<\/figure>/i.exec(html);
    const src = first && /<img[^>]*\ssrc="([^"]+)"/i.exec(first[0])?.[1];
    if (!src || fileName(src) !== fileName(featured.src)) {
      const alt = featured.alt.replace(/"/g, "&quot;");
      html = `<figure class="wp-block-image size-full"><img src="${featured.src}" alt="${alt}" width="${featured.width}" height="${featured.height}" /></figure>${html}`;
    }
  }

  // The article ships its own share buttons and author card (the page renders the site's), plus inline event handlers.
  html = removeDivBlocks(html, /<div[^>]*class="[^"]*\b(?:share-section|author-card)\b[^"]*"[^>]*>/gi).replace(/\s+on[a-z]+="[^"]*"/gi, "");

  // The custom FAQ block: questions/answers go to the site's Accordion, hashtags become the post's tags.
  const faqs: FaqEntry[] = [];
  const tags: string[] = [];
  let faqTitle = "Frequently Asked Questions";
  const wrapper = findDivBlock(html, /<div[^>]*class="[^"]*\bcustom-faq-wrapper\b[^"]*"[^>]*>/i);
  if (wrapper) {
    const inner = html.slice(wrapper.start, wrapper.end);
    for (const m of inner.matchAll(/<button[^>]*class="[^"]*faq-question[^"]*"[^>]*>([\s\S]*?)<\/button>\s*<div class="faq-answer">([\s\S]*?)<\/div>/gi)) {
      faqs.push({ q: stripTags(m[1].replace(/<span[\s\S]*?<\/span>/gi, "")), html: m[2].trim() });
    }
    for (const m of inner.matchAll(/<span[^>]*class="[^"]*axon-tag[^"]*"[^>]*>\s*#?([^<]+?)\s*<\/span>/gi)) tags.push(`#${decodeEntities(m[1])}`);
    const before = html.slice(0, wrapper.start).replace(/<h2[^>]*>\s*(Frequently Asked Questions[^<]*?)\s*<\/h2>\s*$/i, (_m, title: string) => {
      faqTitle = decodeEntities(title);
      return "";
    });
    html = before + html.slice(wrapper.end);
  }

  const headings: Array<{ id: string; text: string; level: 2 | 3 }> = [];
  const used = new Set<string>();
  html = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, level: string, attrs: string, inner: string) => {
    const text = stripTags(inner);
    let id = /\sid="([^"]+)"/i.exec(attrs)?.[1] ?? (slugify(text) || "section");
    for (let n = 2; used.has(id); n++) id = `${slugify(text) || "section"}-${n}`;
    used.add(id);
    headings.push({ id, text, level: Number(level) as 2 | 3 });
    return `<h${level}${attrs.replace(/\sid="[^"]*"/i, "")} id="${id}">${inner}</h${level}>`;
  });

  return { html: localiseLinks(html).trim(), headings, faqs, faqTitle, tags, faqSchema: schema };
}

/* ── normalisation ────────────────────────────────────────────────────────── */

function toImage(media: WpMedia | undefined, title: string): ImageAsset {
  if (!media?.source_url) return FALLBACK_IMAGE;
  return {
    src: media.source_url,
    alt: decodeEntities(media.alt_text?.trim() || title),
    width: media.media_details?.width || 1672,
    height: media.media_details?.height || 941,
  };
}

function toPost(p: WpPost): BlogPost {
  const title = stripTags(p.title.rendered);
  const excerpt = excerptText(p.excerpt.rendered);
  const terms = (p._embedded?.["wp:term"] ?? []).flat();
  const categories: BlogCategory[] = terms.filter((t) => t.taxonomy === "category").map((t) => ({ id: t.id, name: decodeEntities(t.name), slug: t.slug }));
  const wpTags = terms.filter((t) => t.taxonomy === "post_tag").map((t) => decodeEntities(t.name));
  const image = toImage(p._embedded?.["wp:featuredmedia"]?.[0], title);

  let postTags: string[] = [];
  let page: Pick<BlogPost, "html" | "headings" | "faqs" | "faqTitle" | "faqSchema"> = {};
  if (p.content) {
    const a = processArticleHtml(p.content.rendered, image === FALLBACK_IMAGE ? undefined : image);
    page = { html: a.html, headings: a.headings, faqs: a.faqs, faqTitle: a.faqTitle, faqSchema: a.faqSchema };
    postTags = a.tags;
  }

  return {
    id: p.id,
    slug: p.slug,
    title,
    date: `${p.date_gmt}Z`,
    author: p._embedded?.author?.[0]?.name ?? author.shortName,
    excerpt: truncate(excerpt, 180),
    description: truncate(excerpt, 160),
    image,
    tags: wpTags.length ? wpTags : postTags.length ? postTags : categories.map((c) => c.name),
    body: [],
    categories,
    ...page,
  };
}

/* ── fetching ─────────────────────────────────────────────────────────────── */

async function wpFetch(path: string, params: Record<string, string>): Promise<{ data: unknown; totalPages: number }> {
  const url = new URL(`${API_URL}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(TIMEOUT_MS), next: { revalidate: 300, tags: ["wordpress"] } });
  if (!res.ok) throw new Error(`WordPress API ${res.status} for ${path}`);
  return { data: await res.json(), totalPages: Number(res.headers.get("x-wp-totalpages")) || 1 };
}

// Healthy responses are reused for 5 minutes. When WordPress cannot be reached the local content is cached instead, but only
// for a minute, so the site recovers on its own. (Not shorter: a lifetime under 5 minutes of `expire` would exclude the
// page from prerendering, and a throw inside a cache scope fails the whole prerender.)
const LIVE = { stale: 300, revalidate: 300, expire: 86_400 };
const RETRY = { stale: 300, revalidate: 60, expire: 3_600 };
/**
 * Local content is only substituted while building or in dev. In the running server a failed refresh is rethrown instead:
 * Next then keeps serving the last good cached page rather than replacing 19 posts with the 3 bundled ones.
 */
function fallBack(what: string, error: unknown) {
  if (process.env.NEXT_PHASE === "phase-production-server") throw error;
  console.error(`[wordpress] ${what} unavailable, using local content:`, error instanceof Error ? error.message : error);
}

/** Read-only view counts (Post Views Counter plugin, GET). A failure just means no count is shown. */
async function withViews(posts: BlogPost[]): Promise<BlogPost[]> {
  return Promise.all(
    posts.map(async (post) => {
      try {
        const res = await fetch(`${API_URL.replace(/\/wp\/v2$/, "")}/post-views-counter/get-post-views/${post.id}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
        const n = res.ok ? Number(await res.json()) : NaN;
        return Number.isFinite(n) ? { ...post, views: n } : post;
      } catch {
        return post;
      }
    }),
  );
}

/** All published posts, newest first. Falls back to the local posts if WordPress is unreachable. */
export async function getPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheTag("wordpress");
  try {
    const posts: WpPost[] = [];
    let totalPages = 1;
    for (let page = 1; page <= totalPages && page <= 10; page++) {
      const res = await wpFetch("/posts", { page: String(page), per_page: String(PER_PAGE), status: "publish", orderby: "date", order: "desc", _embed: EMBED, _fields: LIST_FIELDS });
      if (!Array.isArray(res.data)) throw new Error("unexpected payload");
      posts.push(...(res.data as WpPost[]));
      totalPages = res.totalPages;
    }
    if (!posts.length) throw new Error("no posts returned");
    cacheLife(LIVE);
    return withViews(posts.map(toPost));
  } catch (error) {
    fallBack("posts", error);
    cacheLife(RETRY);
    return localPosts;
  }
}

/**
 * One post with its full article HTML, or `null` when WordPress has no published post with that slug. If WordPress is
 * unreachable the bundled copy is used when there is one; otherwise this throws (an error page, never a cached 404).
 */
export async function getPost(slug: string): Promise<BlogPost | null> {
  "use cache";
  cacheTag("wordpress", `wordpress-post-${slug}`);
  try {
    const res = await wpFetch("/posts", { slug, status: "publish", _embed: EMBED, _fields: `${LIST_FIELDS},content` });
    if (!Array.isArray(res.data)) throw new Error("unexpected payload");
    const post = (res.data as WpPost[])[0];
    cacheLife(LIVE);
    return post ? (await withViews([toPost(post)]))[0] : null;
  } catch (error) {
    const local = localPosts.find((p) => p.slug === slug);
    if (!local) throw error;
    fallBack(`post "${slug}"`, error);
    cacheLife(RETRY);
    return local;
  }
}

/** Blog categories that have posts. */
export async function getCategories(): Promise<BlogCategory[]> {
  "use cache";
  cacheTag("wordpress");
  try {
    const res = await wpFetch("/categories", { per_page: "100", hide_empty: "true", orderby: "name", _fields: "id,name,slug,count,parent" });
    if (!Array.isArray(res.data)) throw new Error("unexpected payload");
    cacheLife(LIVE);
    return (res.data as WpTerm[]).map((c) => ({ id: c.id, name: decodeEntities(c.name), slug: c.slug, parent: c.parent }));
  } catch (error) {
    fallBack("categories", error);
    cacheLife(RETRY);
    return blogPage.categories.map((name, i) => ({ id: -i - 1, name, slug: slugify(name) }));
  }
}

/** Up to `count` other posts, same-category posts first, then the newest. */
export async function getRelatedPosts(post: Pick<BlogPost, "slug" | "categories">, count = 3): Promise<BlogPost[]> {
  const others = (await getPosts()).filter((p) => p.slug !== post.slug);
  const ids = new Set((post.categories ?? []).map((c) => c.id));
  const shared = others.filter((p) => p.categories?.some((c) => ids.has(c.id)));
  return [...shared, ...others.filter((p) => !shared.includes(p))].slice(0, count);
}
