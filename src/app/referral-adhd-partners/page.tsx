import { innerPageMetadata } from "@/components/sections/InnerPage";
import { PageSections } from "@/components/sections/PageSections";
import { UniversityReferralHero } from "@/components/sections/UniversityReferralHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { pcpReferralPage } from "@/content/pages/referral";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata = innerPageMetadata(pcpReferralPage);

const [hero, ...rest] = pcpReferralPage.sections;

/** Same hero as the ADHD Referral for Universities page (the ADHD Care hero with the partner network on the right), then the page's own sections. */
export default function Page() {
  if (hero?.type !== "hero") throw new Error("Referral ADHD Partners: expected the hero as the first section");
  return (
    <>
      <UniversityReferralHero data={hero} />
      <PageSections sections={rest} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: pcpReferralPage.breadcrumb, path: pcpReferralPage.path },
        ])}
      />
    </>
  );
}
