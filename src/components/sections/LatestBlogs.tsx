import { blogPosts } from "@/content/blogs";
import { latestBlogs } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "./BlogCard";

export function LatestBlogs({ count = 3 }: { count?: number }) {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="blogs-title">
      <Container>
        <SectionHeading id="blogs-title" title={latestBlogs.title} subtitle={latestBlogs.subtitle} />
        <ul className="grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, count).map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
