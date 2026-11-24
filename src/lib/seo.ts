import type { Metadata } from "next";
import { founder } from "@/content/pages/about";
import { keywordsFor, pageSeo } from "@/content/seo";
import { site } from "@/content/site";
import type { Block, Faq } from "@/content/types";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  /** Use the title verbatim (no " | AXON ADHD" suffix). */
  absoluteTitle?: boolean;
  publishedTime?: string;
  /** Override the default (indexable) robots directive, e.g. `{ index: false, follow: true }` for a duplicate landing page. */
  robots?: Metadata["robots"];
};

export function pageMetadata(input: PageMetaInput): Metadata {
  // Keyword-mapped pages (content/seo.ts) take their title and description from that sheet, verbatim (no suffix added).
  const seo = pageSeo[input.path];
  const { path, image = site.ogImage, type = "website", publishedTime, robots } = input;
  const title = seo?.title ?? input.title;
  const description = seo?.description ?? input.description;
  const absoluteTitle = seo ? true : input.absoluteTitle;
  const keywords = keywordsFor(path);
  return {
    ...(keywords ? { keywords } : {}),
    ...(robots ? { robots } : {}),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type,
      images: [{ url: image }],
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** Strips inline markup used in content files (`**bold**`, `*italic*`, `[label](href)`, `\n` line breaks). */
export function plainText(text: string) {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s*\n\s*/g, " ");
}

export function blocksToText(blocks: Block[]) {
  return blocks.map((b) => ("items" in b ? b.items.map(plainText).join(" ") : plainText(b.text))).join(" ");
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Organization"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}${site.logo.src}`,
    image: `${site.url}${site.ogImage}`,
    email: site.email,
    telephone: "+1-703-909-5101",
    medicalSpecialty: "Psychiatric",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", bestRating: "5", reviewCount: "100" },
    sameAs: site.social.map((s) => s.href),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: blocksToText(f.a) },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${site.url}${item.path}` })),
  };
}

export function blogPostingJsonLd(post: { title: string; description: string; slug: string; date: string; image: string; author: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: post.image.startsWith("http") ? post.image : `${site.url}${post.image}`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/** WebPage schema for keyword-mapped pages: name/description match the metadata, `keywords` carries the page's primary + secondary terms. */
export function webPageJsonLd(path: string) {
  const seo = pageSeo[path];
  if (!seo) return null;
  return {
    "@context": "https://schema.org",
    "@type": seo.schemaType ?? "WebPage",
    "@id": `${site.url}${path}#webpage`,
    url: `${site.url}${path}`,
    name: seo.title,
    description: seo.description,
    keywords: [seo.primary, ...seo.secondary].join(", "),
    inLanguage: "en-US",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    ...(seo.service
      ? { mainEntity: { "@type": "Service", name: seo.service.name, serviceType: seo.service.serviceType, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "Country", name: "United States" }, url: `${site.url}${path}` } }
      : {}),
  };
}

/** Site-level WebSite entity that every WebPage points at via isPartOf. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en-US",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/** Founder profile (About page). Only facts stated on the page: name, title line, photo, employer. */
export function founderPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/about-adhd-evaluation/#founder`,
    name: founder.name,
    jobTitle: founder.title,
    image: `${site.url}${founder.image.src}`,
    url: `${site.url}/about-adhd-evaluation/`,
    worksFor: { "@id": `${site.url}/#organization` },
  };
}
