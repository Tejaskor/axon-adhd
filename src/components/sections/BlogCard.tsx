import Image from "next/image";
import Link from "next/link";
import { CalendarDays, UserRound } from "lucide-react";
import type { BlogPost } from "@/content/blogs";
import { formatDate } from "@/lib/utils";

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
