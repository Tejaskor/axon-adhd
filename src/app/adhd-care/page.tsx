import { AccommodationBlogs, AccommodationContact } from "@/components/sections/AccommodationSections";
import { AdhdCareHero, AdhdCarePath, AdhdCareServices, AdhdCareSpecialized, AdhdCareTools } from "@/components/sections/AdhdCareSections";
import { AssessmentBannerCta, AssessmentClosingCta } from "@/components/sections/AssessmentSections";
import { innerPageMetadata } from "@/components/sections/InnerPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { contactSection, latestBlogs } from "@/content/home";
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
      <AssessmentBannerCta data={at(3, "cta")} />
      <AdhdCarePath data={at(4, "features")} />
      <AdhdCareTools data={at(5, "split")} />
      <AssessmentClosingCta data={at(6, "cta")} />
      <AccommodationBlogs title={latestBlogs.title} subtitle={latestBlogs.subtitle} />
      <AccommodationContact eyebrow={null} description={contactSection.subtitle} placeholders={false} compact />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: adhdCarePage.breadcrumb, path: adhdCarePage.path },
        ])}
      />
    </>
  );
}
