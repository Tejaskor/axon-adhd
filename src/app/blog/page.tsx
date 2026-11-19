import { BlogArchive } from "@/components/sections/BlogArchive";
import { JsonLd } from "@/components/ui/JsonLd";
import { blogPage } from "@/content/blogs";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "ADHD Blog | Expert Guides & Articles", description: blogPage.intro, path: "/blog/", image: blogPage.hero.src });

export default function BlogIndexPage() {
  return (
    <>
      <BlogArchive page={1} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }])} />
    </>
  );
}
