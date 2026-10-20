import { links } from "../site";
import type { PageContent } from "./types";

const checkout = (label: string) => ({ label, href: links.accommodationCheckout });

export const accommodationPage: PageContent = {
  path: "/accommodation-documentation-advocacy/",
  breadcrumb: "Accommodation & Advocacy",
  meta: {
    title: "Accommodation Documentation & Advocacy",
    description:
      "Turn your AXON Comprehensive ADHD Evaluation into professional documentation that supports academic, standardized testing, and workplace accommodation requests (ADA & Section 504).",
    image: "/images/hero/AXON-ADHD-Support-Services-Banner.webp",
  },
  sections: [
    {
      type: "hero",
      title: "Accommodation Documentation & Advocacy",
      text: [
        "You’ve completed your Comprehensive ADHD Evaluation. Now let us transform your diagnostic findings into professional documentation that supports requests for academic, standardized testing, and workplace accommodations.",
        "This specialized report is available exclusively for individuals who have completed an AXON Comprehensive ADHD Evaluation.",
      ],
      ctas: [checkout("Add the Accommodation Documentation & Advocacy Package to My Evaluation")],
      image: { src: "/images/hero/AXON-ADHD-Support-Services-Banner.webp", alt: "AXON ADHD accommodation documentation and advocacy support", width: 1672, height: 941 },
      trust: true,
    },
    {
      type: "features",
      title: "Not Another Evaluation.",
      subtitle:
        "This is a specialized accommodations report created from the results of your completed AXON Comprehensive ADHD Evaluation. Because we already have comprehensive objective testing, clinical interviews, and documentation of functional impairment, we can prepare individualized recommendations.",
      lead: "This report is designed to help support accommodation requests not repeat the evaluation you’ve already completed.",
      items: [
        { title: "How ADHD impacts", text: "your academic and testing performance", icon: "trend" },
        { title: "Which accommodations", text: "are medically appropriate", icon: "clipboard" },
        { title: "The objective data", text: "supporting those recommendations", icon: "flask" },
      ],
    },
    {
      type: "features",
      title: "Your Accommodations Documentation Package",
      subtitle: "Everything an institution needs to evaluate your request prepared and reviewed by the psychologist who knows your case.",
      tone: "surface",
      variant: "check",
      image: { src: "/images/services/AccommodationDocumentation.webp", alt: "Accommodation documentation package", width: 2320, height: 2329 },
      items: [
        { title: "Individualized accommodations report" },
        { title: "Objective data supporting each recommendation" },
        { title: "Professional review by your evaluating psychologist" },
        { title: "Functional impairment analysis" },
        { title: "Evidence-based rationale tied to your evaluation findings" },
        { title: "Assistance completing required accommodation forms" },
        { title: "Appropriate for colleges, universities, licensing boards, standardized testing agencies, and employers" },
      ],
    },
    {
      type: "split",
      title: "Why is this an optional add-on?",
      paragraphs: [
        "Not everyone diagnosed with ADHD needs formal accommodations. Rather than including this service in every evaluation, we offer it only to those who plan to request accommodations from a school, standardized testing organization, professional licensing board, or employer. Preparing accommodations documentation requires considerably more work than simply sharing your diagnostic report.",
      ],
      image: { src: "/images/services/Accommodation_Documentation.webp", alt: "Accommodation documentation", width: 2113, height: 2200 },
      ctas: [checkout("Add Accommodation Support")],
    },
    {
      type: "split",
      title: "What our clinicians do for this package",
      paragraphs: ["Beyond your existing report, each package requires dedicated professional work:"],
      list: [
        "Analyze your evaluation through the lens of functional impairment",
        "Prepare a separate individualized accommodations report",
        "Identify appropriate accommodations supported by objective findings",
        "Complete institution-specific forms & supporting documentation",
      ],
      image: { src: "/images/services/Whatour.webp", alt: "What our clinicians do for the accommodation package", width: 2540, height: 1448 },
      reverse: true,
      tone: "soft",
      ctas: [checkout("Add AXON Accommodation & Advocacy Package")],
    },
    {
      type: "features",
      title: "Who is this for?",
      subtitle: "This service is ideal if you’re requesting accommodations for:",
      columns: 4,
      items: [
        { title: "College & university", text: "Disability services and campus accommodations.", icon: "graduation" },
        { title: "Standardized exams", text: "MCAT, LSAT, GRE, GMAT, SAT, ACT, Bar Exam, NCLEX, & more.", icon: "file" },
        { title: "Workplace (ADA)", text: "Accommodations under the Americans with Disabilities Act.", icon: "users" },
        { title: "Licensing & certification", text: "Professional certification and licensing examinations.", icon: "award" },
      ],
    },
    {
      type: "cta",
      title: "Ready to turn your diagnosis into documentation that works?",
      subtitle: "Your evaluation is done. Let your evaluating psychologist prepare the report, data, and forms that institutions actually accept and advocate for the accommodations you’re entitled to.",
      primary: checkout("Add the Accommodation Documentation & Advocacy Package"),
      note: "$250 one-time · taxes included · available only after your Comprehensive ADHD Evaluation",
    },
    { type: "blogs" },
    { type: "contact" },
  ],
};
