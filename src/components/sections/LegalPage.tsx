import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Block } from "@/content/types";
import { JsonLd } from "@/components/ui/JsonLd";
import { Blocks, Inline } from "@/components/ui/RichText";
import { breadcrumbJsonLd } from "@/lib/seo";
import { slugify } from "@/lib/utils";
import { LegalToc } from "./LegalToc";

/** Plain text of a heading block (content files may use **bold** / [link](href) syntax). */
const plain = (text: string) => text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

/** Shared page header: soft gradient band, breadcrumb and title (used by the legal pages and the site map). */
export function PageIntro({ title, path, children }: { title: string; path: string; children?: React.ReactNode }) {
  return (
    <section className="-mt-[var(--header-height)] bg-gradient-to-b from-primary-soft to-white px-4 pt-[140px] pb-10 sm:px-6 sm:pb-12 lg:pt-[150px]">
      <div className="mx-auto w-full max-w-[1180px]">
        <nav aria-label="Breadcrumb" className="type-small mb-4 flex items-center gap-1.5 text-muted">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <ChevronRight aria-hidden className="size-3.5" />
          <span aria-current="page" className="font-medium text-navy">
            {title}
          </span>
        </nav>
        <h1 className="type-h1 max-w-[900px] text-balance text-navy">{title}</h1>
        {children}
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: title, path }])} />
    </section>
  );
}

/**
 * Shared template for Terms, Privacy and Telehealth policies: gradient header (title, lead paragraph and the effective-date
 * line), then a sticky table of contents beside the policy text in a card. Everything before the first numbered heading is
 * treated as the introduction; the rest is the body.
 */
export function LegalPage({ title, path, blocks }: { title: string; path: string; blocks: Block[] }) {
  const firstSection = blocks.findIndex((b) => b.type === "h2");
  const intro = blocks.slice(0, Math.max(firstSection, 0));
  const body = blocks.slice(Math.max(firstSection, 0));
  const [lead, ...meta] = intro;
  const toc = body.flatMap((b) => (b.type === "h2" && "text" in b ? [{ id: slugify(b.text), label: plain(b.text) }] : []));

  return (
    <>
      <PageIntro title={title} path={path}>
        {lead && "text" in lead && (
          <p className="type-lead mt-4 max-w-[820px] text-pretty text-body">
            <Inline text={lead.text} />
          </p>
        )}
        {meta.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {meta.map((m, i) =>
              "text" in m ? (
                <p key={i} className="type-small rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-primary shadow-[0_4px_14px_rgba(37,120,202,.08)] backdrop-blur-sm">
                  <Inline text={m.text} />
                </p>
              ) : null,
            )}
          </div>
        )}
      </PageIntro>

      <div className="px-4 pb-16 sm:px-6 sm:pb-20 lg:pb-24">
        <div className="mx-auto grid w-full max-w-[1180px] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-12">
          <LegalToc items={toc} />
          <article className="min-w-0 rounded-[22px] border border-black/[0.05] bg-white p-6 shadow-[0_12px_36px_rgba(15,27,46,.07)] sm:p-10 lg:p-12">
            <div className="prose-axon break-words [&_h2]:border-b [&_h2]:border-line-2 [&_h2]:pb-3 [&_h2:first-child]:mt-0">
              <Blocks blocks={body} />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
