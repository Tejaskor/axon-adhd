import type { IconName } from "@/components/ui/FeatureIcon";
import { ctas, links } from "./site";

export const hero = {
  titleLines: ["ADHD Is More Than", "A Focus Problem—"],
  titleAccent: "It's an Identity Problem.",
  subtitle: "You’re exhausted but you’re not broken. We can prove it.",
  video: "/videos/hero-section-new-2.webm",
  poster: { src: "/images/hero/herofollback.webp", alt: "", width: 1710, height: 926 },
};

export const symptoms = {
  title: "Does this sound like you?",
  subtitle: "Common signs that ADHD may be affecting your life",
  items: [
    "I start tasks but don't finish",
    "My mind feels constantly busy",
    "I feel overwhelmed by simple things",
    "I struggle with time and deadlines",
    "I feel frustrated with myself",
    "I've wondered if it's ADHD",
  ],
  /** One icon per item, in order. */
  icons: ["todo", "mind", "overwhelm", "hourglass", "frown", "question"] satisfies IconName[],
  reassurance: ["You’re not lazy. You’re not broken.", "You may just need the right support."],
  ctaLead: "Take the First Step",
  cta: ctas.screening,
};

export const services = {
  title: "How we support you",
  subtitle: "Comprehensive, personalized, and evidence-based ADHD support designed to help you thrive.",
  items: [
    {
      title: "Behavioral Health Screening",
      tagline: "Depression? Anxiety? ADHD?",
      text: "A quick online screener to help identify if your symptoms may be ADHD-related.",
      href: "/comprehensive-adhd-assessment/",
      icon: "screening",
      video: "/videos/patient.mp4",
    },
    {
      title: "Comprehensive ADHD Assessment",
      tagline: "Go deeper with a full evaluation.",
      text: "A clinical evaluation with certified professionals for clear diagnosis and tailored treatment.",
      href: "/comprehensive-adhd-assessment/",
      icon: "assessment",
      video: "/videos/Comprehensive-ADHD-Evaluation-snippit.mp4",
    },
    {
      title: "ADHD Care",
      tagline: "Turn answers into action.",
      text: "Ongoing support to improve focus, build structure, and thrive in everyday life.",
      href: "/adhd-care/",
      icon: "care",
      video: "/videos/ADHD-Care-snippit-1.mp4",
    },
  ] as const,
};

export const gettingHelp = {
  title: "Getting help is simple",
  subtitle: "Three easy steps to clarity and support",
  steps: [
    {
      title: "FREE Behavioral Health Screening",
      text: "Valid tools to screen for ADHD and related conditions",
      image: { src: "/images/services/FREE-Behavioral-Health-Screening.webp", alt: "FREE Behavioral Health Screening", width: 1548, height: 1016 },
    },
    {
      title: "Comprehensive ADHD Evaluation",
      text: "Diagnosis and Treatment from our ADHD experts",
      image: { src: "/images/services/Comprehensive-ADHD-Evaluation.webp", alt: "Comprehensive ADHD Evaluation", width: 1536, height: 1024 },
    },
    {
      title: "Personalized ADHD Care",
      text: "Access ADHD support, medication, coaching, and therapy",
      image: { src: "/images/services/Personalized-ADHD-Care.webp", alt: "Personalized ADHD Care", width: 1540, height: 1021 },
    },
  ],
  note: "Take our free screener to see if you’re at risk for ADHD or other conditions before paying for a full evaluation.",
  cta: { label: "Start Free Screening", href: links.freeScreening },
};

export const mythBuster = {
  question: "Why can't I figure this out?!",
  feelings: { src: "/images/services/CGF.webp", alt: "confusion guessing frustration", width: 1563, height: 143 },
  image: { src: "/images/services/Why-cant-I-figure-this-out.webp", alt: "Adult experiencing ADHD symptoms", width: 1821, height: 1215 },
  title: "Attention Deficit Hyperactivity Disorder",
  subtitle: "It’s not what most people think",
  diagram: { src: "/images/services/Attention-Deficit-Hyperactivity-Disorder.webp", alt: "Attention Deficit Hyperactivity Disorder", width: 1131, height: 756 },
  myths: ["ADHD ≠ Lack of attention", "ADHD ≠ Lack of effort", "ADHD ≠ Lack of intelligence"],
  definition: "ADHD = brain type that is highly sensitive and reactive to stimuli, leading to inconsistent attention, hyperfocus, and emotional reactivity.",
};

export const weSeeYou = {
  title: "We see you.",
  subtitle: "Your experience is valid.",
  affirmations: ["You're not lazy", "You're not broken", "You're not alone", "You've been missing the right explanation"],
  image: { src: "/images/services/ImageWithFallback-1.webp", alt: "Personalized ADHD Care", width: 592, height: 444 },
};

export const whyAxon = {
  title: "You deserve clarity not guesswork",
  subtitle: "What makes AXON different",
  points: [
    { title: "Science-backed ADHD testing", text: "FDA Cleared adhd test, state of the art ADHD assessment", icon: "flask" },
    { title: "Clear, defensible diagnosis", text: "A report you can trust and share with providers.", icon: "file" },
    { title: "Fast results in days", text: "No months-long wait. Answers when you need them.", icon: "clock" },
    { title: "Personalized treatment plan", text: "Tailored next steps built for your life.", icon: "target" },
  ] as const,
};

export const readyBand = {
  title: "Ready to feel more in control?",
  subtitle: "Clarity starts with one simple step.",
  cta: { label: "Start Comprehensive ADHD Assessment", href: links.comprehensive },
};

export const careYouCanTrust = {
  title: "Care you can trust",
  subtitle: "Built on clinical standards you can rely on",
  stats: [
    { lead: "Gained clarity", value: "100", suffix: "+", label: "Clients" },
    { lead: "Than traditional testing.", value: "10", suffix: "%", label: "less", prefix: "Costs" },
    { lead: "No Traffic, No Hassel", value: "1", suffix: "%", label: "Online Testing" },
  ],
  features: [
    { title: "Licensed ADHD specialists", text: "Fully accredited clinicians specializing in ADHD.", icon: "badge" },
    { title: "Evidence-based assessments", text: "FDA cleared device provides accurate objective data, clear diagnosis", icon: "flask" },
    { title: "Fast appointment availability", text: "Most patients seen within days", icon: "calendar" },
    { title: "Insurance-friendly options", text: "Superbill provided for insurance reimbursement.", icon: "receipt" },
    { title: "HIPAA secure and private", text: "End-to-end encryption to protect your information.", icon: "shield" },
    { title: "Comprehensive ADHD care", text: "Assessment, diagnosis, and personalized treatment in one place.", icon: "heart" },
  ] as const,
};

export const testimonialsSection = {
  title: "Real People. Real Relief.",
  subtitle: "Real stories. Real diagnoses. Real clarity.",
};

export const latestBlogs = {
  title: "Latest Blogs",
  subtitle: "Access our growing list of free case study’s to simplify your everyday.",
};

export const faqSection = { title: "Frequently Asked Questions", subtitle: "We have the answers for you!" };

export const finalCta = {
  title: "You're not broken-and we'll prove it.",
  text: "Many high-achieving adults are told they can’t have ADHD because they’re successful, so it often goes misdiagnosed. But untreated ADHD can lead to anxiety, depression, binge eating, substance use, and loneliness. If you feel unheard, the right diagnosis can help you find the treatment that works.",
  lead: "Take the next step with our comprehensive diagnostic evaluation.",
  primary: { label: "Start Comprehensive Assessment", href: links.comprehensive },
  secondary: { label: "Start Free Assessment", href: links.freeScreening },
  image: { src: "/images/services/adult-adhd-diagnostic-evaluatio.webp", alt: "Adult ADHD Diagnostic Evaluation", width: 569, height: 582 },
};

export const contactSection = {
  title: "Get your ADHD care right.",
  subtitle: "Get clear answers, concise treatment, and a collaborative community every step of the way.",
  benefits: ["Take our FREE screening in seconds", "Get an official diagnosis in days", "Get treatment and support to help you thrive."],
  assistance: "Need assistance?",
  responseTime: "We typically respond within 2 business days.",
  formTitle: "Contact Us",
  formIntro: "We'd love to hear from you. Please fill out the form and we'll get back to you as soon as possible.",
};
