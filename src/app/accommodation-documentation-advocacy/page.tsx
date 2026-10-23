import { innerPageMetadata } from "@/components/sections/InnerPage";
import {
  AccommodationBenefits,
  AccommodationBlogs,
  AccommodationContact,
  AccommodationCTA,
  AccommodationFeatureBanner,
  AccommodationHero,
  ClinicianGuidance,
  DocumentationPackage,
  ServiceAudience,
} from "@/components/sections/AccommodationSections";
import { JsonLd } from "@/components/ui/JsonLd";
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
      <AccommodationBlogs />
      <AccommodationContact />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: accommodationPage.breadcrumb, path: accommodationPage.path },
        ])}
      />
    </>
  );
}
