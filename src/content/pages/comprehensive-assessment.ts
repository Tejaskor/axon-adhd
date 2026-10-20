import { ctas, links } from "../site";
import type { PageContent } from "./types";

export const comprehensiveAssessmentPage: PageContent = {
  path: "/comprehensive-adhd-assessment/",
  breadcrumb: "ADHD Assessments",
  meta: {
    title: "Comprehensive ADHD Assessment & Evaluation in Arlington, VA",
    description:
      "Start with a free behavioral health check, then move to a full, clinically validated ADHD assessment and evaluation in Arlington, VA, with accurate diagnoses and personalized treatment recommendations.",
    image: "/images/hero/Comprehensive-ADHD-Assessment-Made-Simple.webp",
  },
  sections: [
    {
      type: "hero",
      title: "Comprehensive ADHD Assessment & Evaluation in Arlington, VA",
      text: [
        "Start with a free behavioral health check, then move to a full, clinically validated ADHD assessment and evaluation in Arlington, VA, designed to provide accurate diagnoses and personalized treatment recommendations.",
      ],
      ctas: [ctas.evaluation, ctas.screening],
      image: { src: "/images/hero/Comprehensive-ADHD-Assessment-Made-Simple.webp", alt: "Comprehensive ADHD Assessment Made Simple", width: 1672, height: 941 },
      trust: true,
    },
    {
      type: "features",
      title: "Comprehensive ADHD Evaluation in Arlington, VA",
      subtitle: "A complete assessment designed to bring accuracy, clarity, and direction to your ADHD journey.",
      columns: 4,
      items: [
        { title: "Licensed Clinicians", text: "Board-certified professionals with ADHD expertise", image: { src: "/images/services/Frame-1618877902-1.svg", alt: "", width: 64, height: 48 } },
        { title: "HIPAA Compliant", text: "Your health data is fully protected and encrypted", image: { src: "/images/services/Frame-1618877903-1-1.svg", alt: "", width: 79, height: 48 } },
        { title: "Insurance Accepted", text: "Most insurance plans reimburse this comprehensive evaluation.", image: { src: "/images/services/Frame-1618877903-2-1.svg", alt: "", width: 83, height: 48 } },
        { title: "Official Documentation", text: "Diagnosis and report for care and accommodations.", image: { src: "/images/services/Frame-1618877903-3.svg", alt: "", width: 79, height: 48 } },
      ],
    },
    {
      type: "steps",
      title: "From Diagnosis to Thriving in Three Easy Steps with AXON ADHD.",
      items: [
        { title: "Complete Free Screening", text: "Quick, guided questions to identify symptoms.", image: { src: "/images/services/Complete-Free-Screening.webp", alt: "Complete Free Screening", width: 2652, height: 2079 } },
        { title: "Complete Comprehensive ADHD Eval", text: "Providers confirm your diagnosis and provide a personalized treatment plan.", image: { src: "/images/services/Complete-Comprehensive-ADHD-Eval.webp", alt: "Complete Comprehensive ADHD Eval", width: 3719, height: 2856 } },
        { title: "Get Detailed Report & Plan", text: "Your report unlocks medication, therapy, coaching, and accommodations.", image: { src: "/images/services/Get-Detailed-Report-Plan.webp", alt: "Get Detailed Report & Plan", width: 3825, height: 2797 } },
      ],
    },
    {
      type: "split",
      title: "What You'll Learn from the Free Assessment",
      paragraphs: [
        "Comprehensive, personalised, and evidence-based ADHD support designed to help you thrive.",
        "Our free screening identifies common ADHD symptoms, depression, anxiety, and substance use issues.",
        "In just a few minutes, you’ll receive a score indicating your risk for ADHD or related conditions, helping you take the first step toward a clear diagnosis.",
      ],
      list: ["Clinically validated self report questionnaires", "Instant feedback on results", "Personalised summary and next steps"],
      image: { src: "/images/services/FreeAssessment.webp", alt: "Free ADHD assessment results on a laptop", width: 1934, height: 1334 },
    },
    {
      type: "features",
      id: "how-it-works",
      title: "How It Works",
      subtitle: "A simple, three-step process to understand your ADHD symptoms and access professional support.",
      variant: "flow",
      tone: "surface",
      items: [
        { title: "Complete Online Screening", text: "Answer research-backed questions in just 5-10 minutes" },
        { title: "Get Instant Results", text: "Receive your preliminary score and personalized insights" },
        { title: "Proceed to Comprehensive ADHD Evaluation", text: "Take the full eval from the comfort of your own home and have an official diagnosis you can trust." },
      ],
    },
    {
      type: "cta",
      title: "Ready for an Official Diagnosis?",
      subtitle:
        "Your free screening results inform whether a full evaluation is necessary, but isn’t sufficient for an official diagnosis. That requires our state of the art, FDA cleared assessment. Luckily, you can take that immediately and then meet with our licensed psychologists to discuss the results and get an official diagnosis within days.",
      primary: ctas.screening,
      secondary: ctas.evaluation,
    },
    {
      type: "features",
      title: "Understanding ADHD with Confidence",
      subtitle: "Learn how AXON ADHD delivers trusted, secure, expert-guided care to achieve better outcomes.",
      image: { src: "/images/services/Understanding-ADHD-with-Confidence.webp", alt: "Understanding ADHD with Confidence", width: 1505, height: 688 },
      items: [
        { title: "Clinically Validated", text: "FDA cleared, evidence-based tools trusted by healthcare professionals", icon: "flask" },
        { title: "Confidential & Secure", text: "Your privacy is protected with secure data handling and encryption", icon: "lock" },
        { title: "Expert Support", text: "Certified specialists ready to guide you through your ADHD journey", icon: "user" },
      ],
    },
    {
      type: "features",
      title: "A Diagnosis That Opens Doors",
      subtitle: "An official ADHD diagnosis provides more than just answers it unlocks access to support, accommodations, and treatments that can transform your daily life.",
      tone: "soft",
      items: [
        { title: "Access medication and treatment options", text: "Get prescriptions and explore evidence-based treatments tailored to your diagnosis", icon: "pill" },
        { title: "Receive school/work accommodation letters", text: "Official documentation to secure necessary accommodations for success", icon: "file" },
        { title: "Understand your symptoms with clinical clarity", text: "Gain deep insight into how ADHD affects you specifically and why", icon: "sparkles" },
      ],
    },
    {
      type: "steps",
      title: "Step-by-Step Comprehensive ADHD Assessment in Arlington, VA",
      subtitle:
        "Our process guides you from scheduling your assessment to completing your clinician consultation,receiving your detailed report, and beginning your personalized care plan.",
      tone: "white",
      items: [
        { title: "Complete QbCheck & Schedule Review", text: "Take the QbCheck any time you like, and then schedule a time to meet virtually with a psychologist to discuss the results.", image: { src: "/images/services/Book-Your-Assessment-scaled.webp", alt: "", width: 2560, height: 1315 } },
        { title: "Meet Your Clinician", text: "Attend a 30-minute video consultation with a licensed ADHD specialist to review your results and discuss your personalized treatment plan.", image: { src: "/images/services/Meet-Your-Clinician-scaled.webp", alt: "", width: 2560, height: 1395 } },
        { title: "Receive Your Report", text: "Receive a detailed diagnosis, personalized care plan, and accommodation documentation within minutes of completing your video consultation.", image: { src: "/images/services/Receive-Your-Report-scaled.webp", alt: "", width: 2560, height: 1547 } },
        { title: "Begin Treatment", text: "We coordinate care with your provider or connect you with an AXON ADHD expert.", image: { src: "/images/services/Begin-Treatment-scaled.webp", alt: "", width: 2560, height: 1491 } },
      ],
    },
    {
      type: "cta",
      title: "You don't have to manage ADHD alone.",
      subtitle: "Discover where you stand and get the support you deserve. From a free assessment to personalized treatment, AXON ADHD is here for every step of your journey.",
      primary: { label: "Start Comprehensive ADHD Evaluation", href: links.comprehensive },
      secondary: { label: "Start Free Assessment", href: links.freeScreening },
    },
    { type: "blogs" },
    { type: "contact" },
  ],
};
