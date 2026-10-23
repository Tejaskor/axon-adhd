import { AccommodationBlogs, AccommodationContact } from "@/components/sections/AccommodationSections";
import {
  AssessmentBannerCta,
  AssessmentClosingCta,
  AssessmentConfidence,
  AssessmentHowItWorks,
  AssessmentLearn,
  AssessmentOpensDoors,
  AssessmentProcess,
} from "@/components/sections/AssessmentSections";
import { innerPageMetadata } from "@/components/sections/InnerPage";
import { PageSections } from "@/components/sections/PageSections";
import { JsonLd } from "@/components/ui/JsonLd";
import { latestBlogs, contactSection } from "@/content/home";
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
      <AssessmentHowItWorks data={at(4, "features")} />
      <AssessmentBannerCta data={at(5, "cta")} />
      <AssessmentConfidence data={at(6, "features")} />
      <AssessmentOpensDoors data={at(7, "features")} />
      <AssessmentProcess data={at(8, "steps")} />
      <AssessmentClosingCta data={at(9, "cta")} />
      <AccommodationBlogs title={latestBlogs.title} subtitle={latestBlogs.subtitle} />
      <AccommodationContact eyebrow={null} description={contactSection.subtitle} placeholders={false} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: comprehensiveAssessmentPage.breadcrumb, path: comprehensiveAssessmentPage.path },
        ])}
      />
    </>
  );
}
