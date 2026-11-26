import { ctas, links } from "../site";
import type { PageContent } from "./types";

export const comprehensiveAssessmentPage: PageContent = {
  path: "/adult-adhd-assessment/",
  breadcrumb: "ADHD Assessments",
  meta: {
    title: "Comprehensive ADHD Assessment & Evaluation in Arlington, VA",
    description:
      "Start with a free behavioral health check, then move to a full, clinically validated ADHD assessment and evaluation in Arlington, VA, with accurate diagnoses and personalized treatment recommendations.",
    image: "/images/hero/comprehensive-adhd-assessment-made-simple.webp",
  },
  sections: [
    {
      type: "hero",
      variant: "photo",
      title: "Comprehensive ADHD Assessment & Evaluation in Arlington, VA",
      accent: "ADHD Assessment & Evaluation",
      text: [
        "Start with a free behavioral health check, then move to a full, clinically validated ADHD assessment and evaluation in Arlington, VA, designed to provide accurate diagnoses and personalized treatment recommendations.",
      ],
      ctas: [ctas.evaluation, ctas.screening],
      image: { src: "/images/hero/comprehensive-adhd-assessment-made-simple.webp", alt: "Adult ADHD assessment online: comprehensive ADHD evaluation with QbCheck testing", width: 1672, height: 941 },
      // Placeholder photo: swap for a woman-centred lifestyle image (see hero brief) by changing this src only.
      background: { src: "/images/hero/comprehensive-assessment-hero-background.webp", alt: "", width: 2027, height: 776 },
      video: { id: "esUAxx-UXCM", title: "Could You Have Undiagnosed ADHD?" },
      videoFrame: false,
      videoAspect: "16 / 9.6",
      videoDevice: "desktop",
      breakAfter: "Comprehensive ADHD Assessment &",
      alignTop: true,
      ctaStyle: "homepage",
      homeType: true,
      sectionPaddingY: 88,
      ringsCentered: true,
      trust: true,
      trustStyle: "homepage",
    },
    {
      type: "assessmentOverview",
      title: "Comprehensive ADHD Evaluation in Arlington, VA",
      accent: "Arlington, VA",
      subtitle: "A complete assessment designed to bring accuracy, clarity, and direction to your ADHD journey.",
      checks: ["Evidence-based", "Clinically validated", "Personalized insights"],
      background: { src: "/images/assessment/comprehensive-assessment-workspace-background.webp", alt: "Laptop on a sunlit desk beside a plant, books and a notebook", width: 1774, height: 887 },
      video: { id: "DY1l9JxNwms", title: "AXON ADHD Comprehensive Assessment Video" },
      // Card copy is the page's existing approved wording (carried over from the features block this section replaces).
      items: [
        { title: "Licensed Clinicians", text: "Board-certified professionals with ADHD expertise", icon: "clinician", image: { src: "/images/assessment/features/comprehensive-assessment-feature-licensed-clinician.webp", alt: "Female clinician speaking with an adult patient in a bright, modern consultation room", width: 1536, height: 1024 } },
        { title: "HIPAA Compliant", text: "Your health data is fully protected and encrypted", icon: "shield", image: { src: "/images/assessment/features/comprehensive-assessment-feature-hipaa-data-security.webp", alt: "Laptop displaying a digital security shield on a desk in a modern workspace", width: 1536, height: 1024 } },
        { title: "Insurance Accepted", text: "Most insurance plans reimburse this comprehensive evaluation.", icon: "insurance", image: { src: "/images/assessment/features/comprehensive-assessment-feature-insurance-coverage.webp", alt: "Insurance coverage paperwork and a pen on a desk in a bright office", width: 1536, height: 1024 } },
        { title: "Official Documentation", text: "Diagnosis and report for care and accommodations.", icon: "document", image: { src: "/images/assessment/features/comprehensive-assessment-feature-evaluation-report.webp", alt: "Comprehensive ADHD evaluation report on a desk beside a laptop, notebook, and pen", width: 1536, height: 1024 } },
      ],
    },
    {
      type: "steps",
      variant: "journey",
      hideLine: true,
      roomy: true,
      cardTitle20: true,
      accentColor: "text-[#2578CA]",
      accent: "All in One Day.",
      title: "From Screening to a Personalized Care Plan — All in One Day.",
      subtitle: "A simple, clinician-guided process to assess, understand, and plan your ADHD care with Aaron.",
      items: [
        { title: "Free ADHD\nScreening", text: "A quick, confidential multiple-choice questionnaire (MCQ) to check for possible ADHD symptoms.", duration: "~ 5–10 Minutes" },
        { title: "Comprehensive ADHD Assessment", text: "A detailed, clinically validated evaluation using the QB Check Test that measures attention, impulsivity, and activity levels.", duration: "~ 20–30 Minutes" },
        { title: "Receive Your Personalized Report", text: "Get a clear, easy-to-understand report with your results, clinical insights, and recommendations.", duration: "~ Same Day" },
        { title: "30-Minute Zoom Consultation with Aaron", text: "Meet with Aaron on Zoom for 30 minutes to review your report, discuss the results, and plan your personalized next steps.", duration: "~ 30 Minutes" },
      ],
    },
    {
      type: "split",
      variant: "glass",
      accent: "Free Assessment",
      title: "What You'll Learn from the Free Assessment",
      paragraphs: [
        "Comprehensive, personalised, and evidence-based ADHD support designed to help you thrive.",
        "Our free screening identifies common ADHD symptoms, depression, anxiety, and substance use issues.",
        "In just a few minutes, you’ll receive a score indicating your risk for ADHD or related conditions, helping you take the first step toward a clear diagnosis.",
      ],
      list: ["Clinically validated self report questionnaires", "Instant feedback on results", "Personalised summary and next steps"],
      features: [
        { title: "Guided Screening", text: "Short, structured questions about your symptoms and experiences." },
        { title: "Personalised Summary", text: "A clear overview of your screening results." },
        { title: "Suggested Next Steps", text: "Information on potential follow-up options such as evaluation, treatment, and support." },
      ],
      // Quick facts use details already on this page ("5-10 minutes", "Instant feedback on results", "Clinically validated self report questionnaires"); no question count is published, so none is shown.
      details: [
        { title: "5–10 minutes", text: "Estimated time" },
        { title: "Self-report questionnaires", text: "Clinically validated" },
        { title: "Instant feedback", text: "Get your results right away" },
      ],
      image: { src: "/images/assessment/free-assessment-results-preview.webp", alt: "Preview of the free ADHD assessment and screening results", width: 2473, height: 1707 },
    },
    {
      type: "cta",
      ctaStyle: "homepage",
      title: "Ready for an Official Diagnosis?",
      subtitle:
        "Your free screening results inform whether a full evaluation is necessary, but isn’t sufficient for an official diagnosis. That requires our state of the art, FDA cleared assessment. Luckily, you can take that immediately and then meet with our licensed psychologists to discuss the results and get an official diagnosis within days.",
      // Same two buttons, order and styles as the homepage hero: blue "Take Comprehensive ADHD Evaluation", then white "Start Free ADHD Screening".
      primary: ctas.evaluation,
      secondary: ctas.screening,
    },
    {
      type: "features",
      title: "Understanding ADHD with Confidence",
      subtitle: "Learn how AXON ADHD delivers trusted, secure, expert-guided care to achieve better outcomes.",
      image: { src: "/images/assessment/comprehensive-assessment-understanding-adhd-with-confidence.webp", alt: "Understanding ADHD with Confidence", width: 1505, height: 688 },
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
        "Our process guides you from scheduling your assessment to completing your clinician consultation, receiving your detailed report, and beginning your personalized care plan.",
      tone: "white",
      items: [
        { title: "Complete QbCheck & Schedule Review", text: "Take the QbCheck any time you like, and then schedule a time to meet virtually with a psychologist to discuss the results.", image: { src: "/images/assessment/comprehensive-assessment-step-book-assessment.webp", alt: "Appointment booking screen with a calendar and available time slots for scheduling an ADHD assessment", width: 2560, height: 1315 } },
        { title: "Meet Your Clinician", text: "Attend a 30-minute video consultation with a licensed ADHD specialist to review your results and discuss your personalized treatment plan.", image: { src: "/images/assessment/comprehensive-assessment-step-meet-clinician.webp", alt: "Video consultation between an AXON ADHD clinician and a patient", width: 2560, height: 1395 } },
        { title: "Receive Your Report", text: "Receive a detailed diagnosis, personalized care plan, and accommodation documentation within minutes of completing your video consultation.", image: { src: "/images/assessment/comprehensive-assessment-step-receive-report.webp", alt: "QbCheck ADHD report showing a total symptom level chart and results", width: 2560, height: 1547 } },
        { title: "Begin Treatment", text: "We coordinate care with your provider or connect you with an AXON ADHD expert.", image: { src: "/images/assessment/comprehensive-assessment-step-begin-treatment.webp", alt: "Two people talking at home beside an AXON ADHD report with treatment next steps", width: 2560, height: 1491 } },
      ],
    },
    {
      type: "cta",
      ctaStyle: "light",
      title: "You don't have to manage ADHD alone.",
      subtitle: "Discover where you stand and get the support you deserve. From a free assessment to personalized treatment, AXON ADHD is here for every step of your journey.",
      primary: { label: "Start Comprehensive ADHD Evaluation", href: links.comprehensive },
      secondary: { label: "Start Free Assessment", href: links.freeScreening },
    },
    { type: "blogs" },
    { type: "contact" },
  ],
};
