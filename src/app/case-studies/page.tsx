import "./case-studies.css";
import { CaseStudiesClient } from "./CaseStudiesClient";
import { JsonLd } from "@/components/ui/JsonLd";
import { caseStudiesPage } from "@/content/case-studies";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: caseStudiesPage.title,
  description: caseStudiesPage.description,
  path: "/case-studies/",
  image: caseStudiesPage.hero.src,
});

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesClient />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies/" },
        ])}
      />
    </>
  );
}
