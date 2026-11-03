import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/content/blogs";
import { latestBlogs } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "./BlogCard";

export function LatestBlogs({ count = 3 }: { count?: number }) {
  return (
    // Same background as "Care you can trust".
    <section className="bg-[linear-gradient(249deg,#dfeaf4_24.89%,hsla(0,0%,100%,0.2)_64.07%)]! py-16 sm:py-20" aria-labelledby="blogs-title">
      <Container>
        <SectionHeading id="blogs-title" title={latestBlogs.title} subtitle={latestBlogs.subtitle} />
        <ul className="grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, count).map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
        {/* Same treatment as the "We see you." CTA. */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <ButtonLink
            href={latestBlogs.cta.href}
            size="lg"
            className="group h-14 gap-2 bg-[linear-gradient(180deg,#5498DB_0%,#2578CA_55%,#1E64AA_100%)] px-8 shadow-[0_14px_30px_rgba(37,120,202,.38),inset_0_1px_0_rgba(255,255,255,.35)]! transition-[filter,box-shadow,background-color] duration-300 hover:shadow-[0_18px_38px_rgba(37,120,202,.48),inset_0_1px_0_rgba(255,255,255,.35)]! hover:brightness-110"
          >
            {latestBlogs.cta.label}
            <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
