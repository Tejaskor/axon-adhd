import type { Metadata } from "next";
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
};

export function pageMetadata({ title, description, path, image = site.ogImage, type = "website", absoluteTitle, publishedTime }: PageMetaInput): Metadata {
  return {
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

function blocksToText(blocks: Block[]) {
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
    image: `${site.url}${post.image}`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${site.url}/#organization` },
  };
}
