import { innerPageMetadata } from "@/components/sections/InnerPage";
import { AboutSections } from "@/components/sections/about/AboutSections";
import { JsonLd } from "@/components/ui/JsonLd";
import { aboutPage } from "@/content/pages/about";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata = innerPageMetadata(aboutPage);

export default function AboutPage() {
  return (
    <>
      <AboutSections />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: aboutPage.breadcrumb, path: aboutPage.path }])} />
    </>
  );
}
