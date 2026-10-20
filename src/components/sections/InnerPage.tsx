import type { ReactNode } from "react";
import type { PageContent } from "@/content/pages/types";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageSections } from "./PageSections";

export function innerPageMetadata(page: PageContent) {
  return pageMetadata({ title: page.meta.title, description: page.meta.description, path: page.path, image: page.meta.image });
}

/** Renders a content-driven inner page plus BreadcrumbList JSON-LD. `children` render after the sections. */
export function InnerPage({ page, children }: { page: PageContent; children?: ReactNode }) {
  return (
    <>
      <PageSections sections={page.sections} />
      {children}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: page.breadcrumb, path: page.path },
        ])}
      />
    </>
  );
}
