import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChartNoAxesColumn, ChevronsRight, UserRound } from "lucide-react";
import type { BlogPost } from "@/content/blogs";
import { formatDate } from "@/lib/utils";

/** Horizontal archive card used on /blog/ (image left, details right; stacks on mobile). */
export function BlogRowCard({ post }: { post: BlogPost }) {
  const href = `/blog/${post.slug}/`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-[6px] border border-[#E2E5E8] bg-white transition-shadow hover:shadow-soft md:flex-row">
      <Link href={href} tabIndex={-1} aria-hidden className="block overflow-hidden p-2.5 md:w-[46%] md:shrink-0">
        <Image src={post.image.src} alt="" width={post.image.width} height={post.image.height} sizes="(max-width: 767px) 100vw, 480px" className="aspect-[16/9] h-auto w-full rounded-[6px] object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col justify-start gap-2.5 p-2.5">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#70777D] sm:text-[14px]">
          <span className="inline-flex items-center gap-1.5">
            <UserRound aria-hidden className="size-4 text-[#1D3C67]" /> {post.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden className="size-4 text-[#1D3C67]" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          {post.views !== undefined && (
            <span className="inline-flex items-center gap-1.5 ml-auto" title="Views">
              <ChartNoAxesColumn aria-hidden className="size-4 text-[#1D3C67]" />
              <span className="sr-only">Views: </span>
              {post.views}
            </span>
          )}
        </p>
        <h2 className="text-[18px] leading-[1.4] font-bold text-[#1E242A] lg:text-[22px]">
          <Link href={href} className="transition-colors hover:text-[#256ACC]">
            {post.title}
          </Link>
        </h2>
        <p className="text-[14px] text-body sm:text-[16px]">{post.excerpt}</p>
        <Link href={href} className="mt-1 inline-flex w-fit rounded-full bg-[#256ACC] px-4 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1A56A8]">
          Read More <ChevronsRight aria-hidden className="ml-1 size-4 self-center" />
          <span className="sr-only">about {post.title}</span>
        </Link>
      </div>
    </article>
  );
}

export function BlogCard({ post, headingLevel = "h3" }: { post: BlogPost; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const href = `/blog/${post.slug}/`;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-panel border border-line-2 bg-white shadow-card transition-shadow hover:shadow-soft">
      <Link href={href} tabIndex={-1} aria-hidden className="block overflow-hidden">
        <Image src={post.image.src} alt="" width={post.image.width} height={post.image.height} sizes="(max-width: 1024px) 100vw, 420px" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="type-small flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
          <span className="inline-flex items-center gap-1.5">
            <UserRound aria-hidden className="size-3.5" /> {post.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden className="size-3.5" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
        </p>
        <Heading className="type-h4 mt-3 text-navy">
          <Link href={href} className="hover:text-primary">
            {post.title}
          </Link>
        </Heading>
        <p className="type-body mt-2 flex-1 text-body">{post.excerpt}</p>
        <Link href={href} className="type-body mt-4 font-semibold text-primary hover:text-primary-hover">
          Read More » <span className="sr-only">about {post.title}</span>
        </Link>
      </div>
    </article>
  );
}
