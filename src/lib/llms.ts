import { blogPage, blogPosts } from "@/content/blogs";
import { caseStudies, caseStudiesPage } from "@/content/case-studies";
import { faqTabs, homeFaqs } from "@/content/faqs";
import { aboutPage, founder } from "@/content/pages/about";
import { accommodationPage } from "@/content/pages/accommodation";
import { adhdCarePage } from "@/content/pages/adhd-care";
import { comprehensiveAssessmentPage } from "@/content/pages/comprehensive-assessment";
import { pcpReferralPage, universityReferralPage } from "@/content/pages/referral";
import { trustCenter } from "@/content/pages/trust-center";
import { faqs as onlineEvalFaqs, flowSteps, onlineEval, statesCovered } from "@/content/online-evaluation";
import { pricing } from "@/content/pricing";
import { site } from "@/content/site";
import { googleRating } from "@/content/trust";
import { availableStates, unavailableStates } from "@/content/us-map";
import type { Faq } from "@/content/types";
import { blocksToText, plainText } from "@/lib/seo";

/**
 * Builds /llms.txt and /llms-full.txt from the site's own content modules, so the text stays in sync with the pages and
 * only contains copy that is already published. URLs use `site.url` (NEXT_PUBLIC_SITE_URL, default https://www.axonadhd.com).
 */

const url = (path: string) => `${site.url}${path}`;

/** Pages in navigation order; copy comes from each page's own metadata. */
const pages = [
  { name: "Home", path: "/", desc: "FDA-cleared online ADHD testing for adults. Free screening, expert evaluation, and an official diagnosis in days, not months." },
  { name: "Comprehensive ADHD Assessment", path: "/comprehensive-adhd-assessment/", desc: comprehensiveAssessmentPage.meta.description },
  { name: "Online ADHD Evaluation", path: onlineEval.path, desc: onlineEval.description },
  { name: "ADHD Care", path: "/adhd-care/", desc: adhdCarePage.meta.description },
  { name: "Accommodation Documentation & Advocacy", path: "/accommodation-documentation-advocacy/", desc: accommodationPage.meta.description },
  { name: "ADHD Referral for Universities", path: "/adhd-referral-for-universities/", desc: universityReferralPage.meta.description },
  { name: "ADHD Referral Partner Program for Primary Care Providers", path: "/referral-adhd-partners/", desc: pcpReferralPage.meta.description },
  { name: "About AXON ADHD", path: "/about-adhd-evaluation/", desc: aboutPage.meta.description },
  { name: "ADHD FAQs", path: "/adhd-faqs/", desc: "Answers for patients, primary care providers, and university leaders about AXON ADHD’s screening, comprehensive evaluations, QbCheck testing, cost, insurance, and privacy." },
  { name: "Case Studies", path: "/case-studies/", desc: caseStudiesPage.description },
  { name: "Blog", path: "/blog/", desc: blogPage.intro },
  { name: "Trust Center", path: "/trust-center/", desc: trustCenter.meta.description },
  { name: "Privacy Policy", path: "/axon-adhd-privacy-policy/", desc: "How AXON ADHD collects, uses, protects and shares personal and health information, including HIPAA-protected PHI." },
  { name: "Terms & Conditions", path: "/terms-conditions/", desc: "The terms that govern use of AXON ADHD screening, evaluation, telehealth and SMS services." },
  { name: "Telehealth Policy", path: "/telehealth-policy/", desc: "How AXON delivers behavioral health services remotely, including benefits, risks, confidentiality and your consent." },
];

const link = (name: string, path: string, desc: string) => `- [${name}](${url(path)}): ${desc}`;
const find = (path: string) => pages.filter((p) => p.path === path).map((p) => link(p.name, p.path, p.desc))[0];
const group = (paths: string[]) => paths.map(find).join("\n");

const contact = [
  `- Email: ${site.email}`,
  `- Support email: ${site.supportEmail}`,
  `- Phone: ${site.phone}`,
  `- Address: ${site.address.full}`,
];

export function buildLlmsTxt() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.blurb}`,
    "",
    `${site.name} is operated by ${site.legalName}, ${site.address.city}, ${site.address.region}, USA. Booking and screening happen on the patient portal at https://prp.axondigitalhealth.ai. A more detailed version of this file is at ${url("/llms-full.txt")}.`,
    "",
    "## Services",
    group(["/comprehensive-adhd-assessment/", "/online-adhd-evaluation/", "/adhd-care/", "/accommodation-documentation-advocacy/"]),
    "",
    "## Referral partners",
    group(["/adhd-referral-for-universities/", "/referral-adhd-partners/"]),
    "",
    "## About and resources",
    group(["/about-adhd-evaluation/", "/adhd-faqs/", "/case-studies/", "/blog/"]),
    "",
    "## Trust and policies",
    group(["/trust-center/", "/axon-adhd-privacy-policy/", "/terms-conditions/", "/telehealth-policy/"]),
    "",
    "## Contact",
    ...contact,
    "",
    "## Optional",
    `- [Full AI-readable overview](${url("/llms-full.txt")}): detailed services, pricing, availability, FAQs and articles`,
    `- [XML sitemap](${url("/sitemap.xml")})`,
    "",
  ].join("\n");
}

function uniqueFaqs(): Faq[] {
  const seen = new Set<string>();
  return [...homeFaqs, ...faqTabs.flatMap((t) => t.items), ...onlineEvalFaqs].filter((f) => {
    const key = f.q.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildLlmsFullTxt() {
  const faqs = uniqueFaqs();
  const out: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.blurb}`,
    "",
    "## Organization",
    `- Name: ${site.name} (operated by ${site.legalName})`,
    `- Website: ${site.url}`,
    ...contact,
    `- Rating shown on the site: ${googleRating.score}/${googleRating.outOf} on Google`,
    `- Social profiles: ${site.social.map((s) => `${s.label} (${s.href})`).join(", ")}`,
    `- Psychology Today profile: ${site.psychologyTodayUrl}`,
    "",
    "## Founder",
    `${founder.name} — ${founder.title}`,
    "",
    plainText(founder.bio),
    "",
    "## Pages",
    ...pages.map((p) => link(p.name, p.path, p.desc)),
    "",
    "## Pricing",
    "Prices are in USD, as listed on the site. Patient-portal links: free screening https://prp.axondigitalhealth.ai/free-assessment, evaluation booking https://prp.axondigitalhealth.ai/direct-comprehensive-adhd.",
    "",
    ...pricing.plans.flatMap((plan) => [
      `### ${plan.name} — ${plan.price === 0 ? "Free" : `$${plan.price}`}`,
      ...("summary" in plan && plan.summary ? [plan.summary] : []),
      ...("breakdown" in plan && plan.breakdown ? [plan.breakdown] : []),
      ...plan.features.map((f) => `- ${f}`),
      "",
    ]),
    "## How the online evaluation works",
    `Source page: ${url(onlineEval.path)}`,
    "",
    ...flowSteps.map((s, i) => `${i + 1}. **${s.title}** — ${s.text}`),
    "",
    "### Where online evaluations are available",
    statesCovered.sub,
    "",
    `Available (${availableStates.length}): ${availableStates.join(", ")}.`,
    "",
    `Not available yet: ${unavailableStates.join(", ")}.`,
    "",
    "## Trust and compliance",
    trustCenter.hero.text,
    `Trust Center: ${url("/trust-center/")}`,
    "",
    "## Articles",
    ...blogPosts.map((p) => `- [${p.title}](${url(`/blog/${p.slug}/`)}) (${p.date.slice(0, 10)}): ${p.description}`),
    "",
    "## Case studies",
    `${caseStudiesPage.description} (${url("/case-studies/")})`,
    "",
    ...caseStudies.map((c) => `- ${c.title} (${c.date})`),
    "",
    "## Frequently asked questions",
    "",
    ...faqs.flatMap((f) => [`### ${f.q}`, blocksToText(f.a), ""]),
    "## Contact",
    ...contact,
    "",
  ];
  return out.join("\n");
}
