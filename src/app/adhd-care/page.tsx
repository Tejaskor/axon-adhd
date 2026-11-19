import { AdhdCareClosingCta, AdhdCareHero, AdhdCarePath, AdhdCareServices, AdhdCareSpecialized, AdhdCareStartCta, AdhdCareTools } from "@/components/sections/AdhdCareSections";
import { CoverageContact } from "@/components/sections/CoverageContact";
import { innerPageMetadata } from "@/components/sections/InnerPage";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { JsonLd } from "@/components/ui/JsonLd";
import { adhdCarePage } from "@/content/pages/adhd-care";
import type { PageSection } from "@/content/pages/types";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata = innerPageMetadata(adhdCarePage);

const sections = adhdCarePage.sections;

/** Section at `index`, checked against the expected type so a reordered content file fails loudly instead of rendering wrong data. */
function at<T extends PageSection["type"]>(index: number, type: T) {
  const section = sections[index];
  if (section?.type !== type) throw new Error(`ADHD Care page: expected a "${type}" section at index ${index}`);
  return section as Extract<PageSection, { type: T }>;
}

export default function Page() {
  return (
    <>
      <AdhdCareHero data={at(0, "hero")} />
      <AdhdCareServices data={at(1, "features")} />
      <AdhdCareSpecialized data={at(2, "features")} />
      <AdhdCareStartCta data={at(3, "cta")} />
      <AdhdCarePath data={at(4, "features")} />
      <AdhdCareTools data={at(5, "split")} />
      <AdhdCareClosingCta data={at(6, "cta")} />
      <LatestBlogs />
      <CoverageContact />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: adhdCarePage.breadcrumb, path: adhdCarePage.path },
        ])}
      />
    </>
  );
}
