import { innerPageMetadata } from "@/components/sections/InnerPage";
import { PageSections } from "@/components/sections/PageSections";
import { UniversityReferralHero } from "@/components/sections/UniversityReferralHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { universityReferralPage } from "@/content/pages/referral";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SeoJsonLd } from "@/components/ui/SeoJsonLd";

export const metadata = innerPageMetadata(universityReferralPage);

const [hero, ...rest] = universityReferralPage.sections;

export default function Page() {
  if (hero?.type !== "hero") throw new Error("ADHD Referral for Universities: expected the hero as the first section");
  return (
    <>
      <UniversityReferralHero data={hero} />
      <PageSections sections={rest} />
      <SeoJsonLd path="/adhd-referral-for-universities/" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: universityReferralPage.breadcrumb, path: universityReferralPage.path },
        ])}
      />
    </>
  );
}
