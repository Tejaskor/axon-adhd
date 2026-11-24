/**
 * Keyword-driven SEO metadata, keyed by canonical path. Source: "Newly_Identified_Website_Keywords_Updated" sheet.
 * `pageMetadata()` (src/lib/seo.ts) applies the title/description/keywords for a matching path, and `<SeoJsonLd path>` adds a
 * WebPage schema carrying the same keywords. Paths are the site's CURRENT URLs: the sheet's "Suggested URL" column is not applied
 * (changing URLs/routing is out of scope).
 */
export type PageSeo = {
  title: string;
  description: string;
  /** Schema.org WebPage subtype. */
  schemaType?: "WebPage" | "MedicalWebPage" | "CollectionPage" | "AboutPage";
  primary: string;
  secondary: string[];
  /** Set only for pages that describe a service AXON provides; emitted as the page's Service schema (mainEntity). */
  service?: { name: string; serviceType: string };
};

export const pageSeo: Record<string, PageSeo> = {
  "/": {
    title: "Online ADHD Testing for Adults | Diagnosis in Days | AXON",
    description: "FDA-cleared online ADHD testing for adults. Free screening, expert evaluation, and an official diagnosis in days, not months. Start your free ADHD test.",
    primary: "online adhd testing for adults",
    secondary: ["online adhd diagnosis", "adult adhd screening test", "adhd evaluation for adults", "get diagnosed with adhd online"],
  },
  "/adult-adhd-assessment/": {
    title: "Adult ADHD Assessment Online | QbCheck Evaluation | AXON",
    description: "Comprehensive adult ADHD assessment online with FDA-cleared QbCheck testing, clinical interview and full report. Results in days. Superbills provided.",
    schemaType: "MedicalWebPage",
    service: { name: "Adult ADHD assessment and evaluation (QbCheck)", serviceType: "ADHD assessment" },
    primary: "adhd assessment for adults",
    secondary: ["comprehensive adhd evaluation", "online adhd test adults", "qbcheck test", "adhd testing cost", "adhd evaluation process"],
  },
  "/adhd-care/": {
    title: "Adult ADHD Care, Coaching & Support | AXON ADHD",
    description: "Turn your ADHD diagnosis into action. Get coaching, care coordination and ongoing support to improve focus, build structure and thrive.",
    schemaType: "MedicalWebPage",
    service: { name: "Adult ADHD care, coaching and support", serviceType: "ADHD treatment and coaching" },
    primary: "adult adhd coach",
    secondary: ["adhd coaching online", "treatment options for adhd in adults", "cbt for adhd", "adhd support for adults"],
  },
  "/adhd-accommodations-documentation/": {
    title: "ADHD Accommodations Documentation | ADA & 504 | AXON",
    description: "Get ADHD documentation that meets ADA and Section 504 standards for school, college and workplace accommodations like extended time. Learn more.",
    service: { name: "ADHD accommodations documentation and advocacy", serviceType: "ADHD accommodations documentation" },
    primary: "adhd accommodations",
    secondary: ["workplace accommodations for adhd", "ada accommodations for adhd", "adhd documentation for accommodations", "college accommodations for adhd"],
  },
  "/adhd-referral-for-universities/": {
    title: "ADHD Testing for College Students | University Referral",
    description: "A fast, reliable ADHD evaluation pathway for university disability services and students. Online testing, clear reports and accommodation support.",
    primary: "adhd testing for college students",
    secondary: ["university adhd", "college students with adhd", "adhd documentation for college", "adhd referral"],
  },
  "/adhd-referral-for-primary-care/": {
    title: "ADHD Referral for Providers | PCP Partner | AXON ADHD",
    description: "Refer patients for objective adult ADHD testing. AXON gives primary care providers fast evaluations, clear reports and shared care coordination.",
    primary: "adhd assessment referral",
    secondary: ["referral for adhd testing", "can primary care diagnose adhd", "how to get a referral for adhd testing", "axon adhd"],
  },
  "/about-adhd-evaluation/": {
    title: "About AXON ADHD | Licensed Online ADHD Specialists",
    description: "Meet AXON ADHD, a virtual practice of licensed ADHD specialists offering objective, data-driven adult ADHD evaluations across the United States.",
    schemaType: "AboutPage",
    primary: "adhd specialist",
    secondary: ["telehealth adhd evaluation", "adult adhd specialist", "adhd testing virginia", "how to get diagnosed with adhd"],
  },
  "/adhd-faqs/": {
    title: "ADHD Evaluation FAQs: Cost, Insurance & QbCheck | AXON",
    description: "Answers about online adult ADHD testing: how to get diagnosed, what QbCheck is, how much it costs, insurance and superbills, and what happens next.",
    primary: "how to get tested for adhd",
    secondary: ["how much does adhd testing cost", "is adhd testing covered by insurance", "what is qbcheck", "can you get diagnosed with adhd online"],
  },
  "/case-studies/": {
    title: "Adult ADHD Diagnosis Stories & Case Studies | AXON",
    description: "Real patient journeys. Read how adults found clarity through a late ADHD diagnosis and what changed after evaluation and support.",
    schemaType: "CollectionPage",
    primary: "late diagnosed adhd",
    secondary: ["adhd diagnosis in adult", "late adhd diagnosis in women", "undiagnosed adhd in adults", "adult adhd symptoms"],
  },
  "/blog/": {
    title: "ADHD Blog: Adult Symptoms, Tips & Strategies | AXON",
    description: "Expert-written ADHD guides on adult symptoms, signs in women and men, focus strategies and living well with ADHD. Clear, practical, clinically grounded.",
    schemaType: "CollectionPage",
    primary: "signs of adhd in adults",
    secondary: ["symptoms of adhd in an adult", "adhd in women", "adhd in women symptoms", "adhd strategies for adults", "adhd resources for adults", "adhd symptoms in men", "how to focus with adhd"],
  },
  "/adhd-data-privacy-trust-center/": {
    title: "HIPAA & SOC 2 Compliant ADHD Testing | AXON Trust Center",
    description: "See how AXON ADHD protects your data: HIPAA, SOC 2, GDPR and CCPA compliance, encrypted telehealth and confidential online ADHD evaluations.",
    primary: "is online adhd testing legit",
    secondary: ["are online adhd tests accurate", "fda cleared adhd test", "objective adhd test", "adhd evaluation cost"],
  },
  "/payment/": {
    title: "ADHD Evaluation Price & Payment | AXON ADHD",
    description: "Complete your ADHD evaluation payment securely. Evaluation $577, or evaluation plus accommodation support $827. Superbills provided for reimbursement.",
    primary: "adhd test price",
    secondary: ["how much does it cost to get tested for adhd", "can i use hsa for adhd testing", "adhd testing without insurance", "online adhd assessment cost", "affordable adhd testing"],
  },
};

export const keywordsFor = (path: string) => {
  const s = pageSeo[path];
  return s ? [s.primary, ...s.secondary] : undefined;
};
