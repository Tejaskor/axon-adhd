import { AccommodationContact } from "@/components/sections/AccommodationSections";
import {
  AssessmentBannerCta,
  AssessmentClosingCta,
  AssessmentConfidence,
  AssessmentLearn,
  AssessmentOpensDoors,
  AssessmentProcess,
} from "@/components/sections/AssessmentSections";
import { innerPageMetadata } from "@/components/sections/InnerPage";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { PageSections } from "@/components/sections/PageSections";
import { JsonLd } from "@/components/ui/JsonLd";
import { contactSection } from "@/content/home";
import { comprehensiveAssessmentPage } from "@/content/pages/comprehensive-assessment";
import type { PageSection } from "@/content/pages/types";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata = innerPageMetadata(comprehensiveAssessmentPage);

const sections = comprehensiveAssessmentPage.sections;

/** Section at `index`, checked against the expected type so a reordered content file fails loudly instead of rendering wrong data. */
function at<T extends PageSection["type"]>(index: number, type: T) {
  const section = sections[index];
  if (section?.type !== type) throw new Error(`Assessment page: expected a "${type}" section at index ${index}`);
  return section as Extract<PageSection, { type: T }>;
}

export default function Page() {
  return (
    <>
      {/* Hero, overview and journey sections above "What You'll Learn" are unchanged. */}
      <PageSections sections={sections.slice(0, 3)} />

      <AssessmentLearn data={at(3, "split")} />
      <AssessmentBannerCta data={at(4, "cta")} />
      <AssessmentConfidence data={at(5, "features")} />
      <AssessmentOpensDoors data={at(6, "features")} />
      <AssessmentProcess data={at(7, "steps")} />
      <AssessmentClosingCta data={at(8, "cta")} />
      <LatestBlogs />
      <AccommodationContact eyebrow={null} description={contactSection.subtitle} compact />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: comprehensiveAssessmentPage.breadcrumb, path: comprehensiveAssessmentPage.path },
        ])}
      />
    </>
  );
}
