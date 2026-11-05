import { innerPageMetadata } from "@/components/sections/InnerPage";
import {
  AccommodationBenefits,
  AccommodationContact,
  AccommodationCTA,
  AccommodationFeatureBanner,
  AccommodationHero,
  ClinicianGuidance,
  DocumentationPackage,
  ServiceAudience,
} from "@/components/sections/AccommodationSections";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { JsonLd } from "@/components/ui/JsonLd";
import { contactSection } from "@/content/home";
import { accommodationPage } from "@/content/pages/accommodation";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata = innerPageMetadata(accommodationPage);

export default function Page() {
  return (
    <>
      <AccommodationHero />
      <AccommodationBenefits />
      <DocumentationPackage />
      <AccommodationFeatureBanner />
      <ClinicianGuidance />
      <ServiceAudience />
      <AccommodationCTA />
      <LatestBlogs />
      <AccommodationContact eyebrow={null} description={contactSection.subtitle} compact />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: accommodationPage.breadcrumb, path: accommodationPage.path },
        ])}
      />
    </>
  );
}
