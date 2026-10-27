import type { IconName } from "@/components/ui/FeatureIcon";
import { ctas, links } from "./site";

export const hero = {
  titleLines: ["ADHD Is More Than", "A Focus Problem—"],
  titleAccent: "It's an Identity Problem.",
  subtitle: "You’re exhausted but you’re not broken. We can prove it.",
  video: "/videos/hero-section-new-2.webm",
  poster: { src: "/images/hero/herofollback.webp", alt: "", width: 1710, height: 926 },
};

const signImage = (name: string, alt: string, width = 1672, height = 941) => ({ src: `/images/homepage/adhd-signs/${name}.webp`, alt, width, height });

export const symptoms = {
  title: { lead: "Does this ", highlight: "sound like you?" },
  subtitle: "Many adults experience these signs. They can be part of ADHD and you’re not alone.",
  /** In order; `icon` is a FeatureIcon name and `tone` picks the card accent. */
  items: [
    {
      title: "I start tasks but don’t finish",
      icon: "todo",
      tone: "green",
      image: signImage("adhd-task-initiation", "Woman resting her chin on her hand, distracted from her work", 1816, 866),
    },
    {
      title: "My mind feels constantly busy",
      icon: "mind",
      tone: "blue",
      image: signImage("adhd-racing-thoughts-man", "Man deep in thought with a tangled thought bubble"),
    },
    {
      title: "I feel overwhelmed by simple things",
      icon: "overwhelm",
      tone: "orange",
      image: signImage("adhd-overwhelmed-woman", "Woman holding her head, feeling overwhelmed"),
    },
    {
      title: "I struggle with time and deadlines",
      icon: "hourglass",
      tone: "purple",
      image: signImage("adhd-time-management-still-life", "Desk calendar with sticky notes beside an alarm clock"),
    },
    {
      title: "I feel frustrated with myself",
      icon: "frown",
      tone: "coral",
      image: signImage("adhd-self-frustration-man", "Man resting his head on his hand, looking frustrated"),
    },
    {
      title: "I’ve wondered if it’s ADHD",
      icon: "question",
      tone: "yellow",
      image: signImage("adhd-self-discovery-woman", "Woman looking thoughtful beside floating question marks"),
    },
  ] satisfies Array<{ title: string; icon: IconName; tone: string; image: unknown }>,
  reassurance: ["You’re not lazy. You’re not broken.", "You may just need the right support."],
  cta: ctas.screening,
};

export const services = {
  /** Rendered as `title` + " " + `titleAccent` (accent in a blue-to-cyan gradient): "How we support you". */
  title: "How we",
  titleAccent: "support you",
  subtitle: "Comprehensive, personalized, and evidence-based ADHD support designed to help you thrive.",
  items: [
    {
      title: "Behavioral Health Screening",
      tagline: "Depression? Anxiety? ADHD?",
      text: "A quick online screener to help identify if your symptoms may be ADHD-related.",
      href: "/comprehensive-adhd-assessment/",
      icon: "screening",
      video: "/videos/patient.mp4",
      tone: "blue",
    },
    {
      title: "Comprehensive ADHD Assessment",
      tagline: "Go deeper with a full evaluation.",
      text: "A clinical evaluation with certified professionals for clear diagnosis and tailored treatment.",
      href: "/comprehensive-adhd-assessment/",
      icon: "assessment",
      video: "/videos/Comprehensive-ADHD-Evaluation-snippit.mp4",
      tone: "teal",
    },
    {
      title: "ADHD Care",
      tagline: "Turn answers into action.",
      text: "Ongoing support to improve focus, build structure, and thrive in everyday life.",
      href: "/adhd-care/",
      icon: "care",
      video: "/videos/ADHD-Care-snippit-1.mp4",
      tone: "violet",
    },
  ] as const,
};

const journeyImage = (name: string, alt: string) => ({ src: `/images/homepage/journey-to-clarity/journey-${name}.webp`, alt, width: 1672, height: 941 });

export const journeyToClarity = {
  title: "Your Journey to Clarity",
  subtitle: "Six simple steps. Answers and support, from wherever you are.",
  steps: [
    {
      title: "Free Screening",
      text: "Answer questions about ADHD and your well-being. Get immediate results.",
      image: journeyImage("free-screening", "Woman at a laptop completing an ADHD screening on attention, focus, well-being and daily life"),
    },
    {
      title: "Review Your Results",
      text: "See whether a comprehensive evaluation may be helpful.",
      image: journeyImage("review-results", "Man at a laptop reviewing his screening results"),
    },
    {
      title: "Online Evaluation",
      text: "Complete validated assessments and objective QbCheck testing from home.",
      image: journeyImage("online-evaluation", "Woman wearing headphones completing an online ADHD assessment"),
    },
    {
      title: "Clinician Consultation",
      text: "Meet virtually with a licensed ADHD specialist.",
      image: journeyImage("clinician-consultation", "Patient on a video call with a licensed ADHD clinician"),
    },
    {
      title: "Report & Recommendations",
      text: "Receive your diagnostic findings and personalized next steps.",
      image: journeyImage("report-recommendations", "Woman reading her diagnostic report and recommendations on a tablet"),
    },
    {
      title: "Support & Next Steps",
      text: "Explore treatment, coaching, and accommodation options.",
      image: journeyImage("support-next-steps", "Smiling student outdoors with treatment, coaching and accommodation options"),
    },
  ],
  ctas: [ctas.evaluation, ctas.screening],
  disclaimer: "Screening is not a diagnosis. Clinical findings depend on a comprehensive evaluation.",
};

export const mythBuster = {
  question: { lead: "Why can’t I ", highlight: "figure this out?!" },
  feelings: ["Confusion", "Guessing", "Frustration"],
  confused: {
    src: "/images/homepage/adhd-understanding/adhd-confusion-woman.webp",
    alt: "Woman resting her chin in her hands, looking up in confusion beneath question marks",
    width: 2280,
    height: 2524,
  },
  // Reading order (also the mobile order); ADHDMythBuster places each stage around the loop by `key`.
  stages: [
    {
      key: "symptoms",
      title: "Many different symptoms",
      image: {
        src: "/images/homepage/adhd-understanding/adhd-symptoms-illustration.webp",
        alt: "A worried face, a brain, a thought cloud, a checklist and puzzle pieces",
        width: 1536,
        height: 1024,
      },
    },
    { key: "treatments", title: "Failed treatments" },
    {
      key: "frustration",
      title: "Frustration and hopelessness",
      image: {
        src: "/images/homepage/adhd-understanding/adhd-frustration-woman.webp",
        alt: "Woman holding her head in frustration under a tangled scribble",
        width: 1784,
        height: 2116,
      },
    },
    {
      key: "exhaustion",
      title: "Exhaustion",
      image: {
        src: "/images/homepage/adhd-understanding/adhd-exhaustion-woman.webp",
        alt: "Woman asleep on a stack of books beside a laptop",
        width: 2500,
        height: 1460,
      },
    },
  ],
  clarity: {
    label: "Diagnostic clarity",
    text: "A clearer understanding can help guide the next step.",
    image: { src: "/images/homepage/adhd-understanding/adhd-diagnostic-clarity.webp", width: 1309, height: 1201 },
    relief: {
      src: "/images/homepage/adhd-understanding/adhd-relief-woman.webp",
      alt: "Woman smiling calmly with her hands over her heart",
      width: 1964,
      height: 2588,
    },
  },
  title: "Attention Deficit Hyperactivity Disorder",
  subtitle: "It’s not what most people think",
  brain: { src: "/images/homepage/adhd-understanding/adhd-brain-illustration.webp", alt: "Illustration of a human brain", width: 1536, height: 1024 },
  concepts: [
    { label: "Attention", icon: "target", tone: "blue" },
    { label: "Effort", icon: "gear", tone: "teal" },
    { label: "Intelligence", icon: "bulb", tone: "orange" },
  ],
  myths: [
    { text: "ADHD ≠ Lack of attention", tone: "blue" },
    { text: "ADHD ≠ Lack of effort", tone: "teal" },
    { text: "ADHD ≠ Lack of intelligence", tone: "orange" },
  ],
  definition: "ADHD is a different way of regulating attention, motivation, and emotions—not a lack of ability.",
} as const;

export const weSeeYou = {
  title: "We see you.",
  subtitle: "Your experience is valid.",
  /** `icon`/`tone` are picked up by WeSeeYou. */
  affirmations: [
    { title: "You’re not lazy", icon: "person", tone: "green" },
    { title: "You’re not broken", icon: "heart", tone: "blue" },
    { title: "You’re not alone", icon: "people", tone: "orange" },
    { title: "There’s a reason it feels hard", icon: "bulb", tone: "purple" },
  ],
  image: { src: "/images/services/ImageWithFallback-1.webp", alt: "A smiling woman talking with an ADHD clinician who is taking notes", width: 592, height: 444 },
  ctas: [ctas.screening, ctas.evaluation],
} as const;

export const whyAxon = {
  title: { lead: "You deserve ", highlight: "clarity", tail: " not guesswork" },
  subtitle: "What makes AXON different",
  /** `icon`/`tone` are picked up by WhyAxon. */
  points: [
    { title: "Science-backed ADHD testing", text: "FDA Cleared adhd test, state of the art ADHD assessment.", icon: "gear", tone: "blue" },
    { title: "Clear, defensible diagnosis", text: "A report you can trust and share with providers.", icon: "clipboard", tone: "green" },
    { title: "Fast results in days", text: "No months-long wait. Answers when you need them.", icon: "clock", tone: "orange" },
    { title: "Personalized treatment plan", text: "Tailored next steps built for your life.", icon: "checklist", tone: "purple" },
  ] as const,
};

export const readyBand = {
  title: "Ready to feel more in control?",
  subtitle: "Clarity starts with one simple step.",
  cta: { label: "Start Comprehensive ADHD Assessment", href: links.comprehensive },
};

export const careYouCanTrust = {
  title: "Care you can trust",
  subtitle: "Built on clinical standards, advanced technology and a patient-first approach.",
  /** `icon`/`tone` are picked up by CareYouCanTrust. */
  stats: [
    { label: "Clients", value: { count: 1000, suffix: "+" }, text: "Gained clarity on their ADHD journey.", icon: "users", tone: "blue" },
    { label: "Lower Cost", value: { count: 90, suffix: "%" }, text: "Than traditional testing.", icon: "coins", tone: "teal" },
    { label: "Online Testing", value: { count: 100, suffix: "%" }, text: "No traffic, no waiting rooms, no hassle.", icon: "laptop", tone: "orange" },
  ],
  features: [
    { title: "Licensed ADHD specialists", text: "Fully accredited clinicians.", icon: "shield", tone: "blue" },
    { title: "Evidence-based assessments", text: "FDA cleared device for accurate data.", icon: "assessment", tone: "teal" },
    { title: "Fast appointment availability", text: "Most patients seen within days.", icon: "calendar", tone: "blue" },
    { title: "Insurance-friendly options", text: "Superbill provided for reimbursement.", icon: "card", tone: "orange" },
    { title: "HIPAA secure and private", text: "End-to-end encryption.", icon: "lock", tone: "pink" },
    { title: "Comprehensive ADHD care", text: "Assessment, diagnosis, and treatment in one place.", icon: "care", tone: "purple" },
  ],
} as const;

export const testimonialsSection = {
  title: "Real People.",
  titleAccent: "Real Relief.",
  subtitle: "Real stories. Real diagnoses. Real clarity.",
};

export const latestBlogs = {
  title: "Latest Blogs",
  subtitle: "Access our growing list of free case study’s to simplify your everyday.",
};

export const faqSection = { title: "Frequently Asked Questions", subtitle: "We have the answers for you!" };

export const finalCta = {
  /** Rendered as `title` + " " + `titleAccent` (the accent in light blue): "You're not broken-and we'll prove it." */
  title: "You're not broken-and",
  titleAccent: "we'll prove it.",
  /** `icon`/`tone` are picked up by FinalCTA. */
  benefits: [
    { text: "Reduce anxiety and overwhelm", icon: "brain", tone: "purple" },
    { text: "Feel more in control", icon: "user", tone: "blue" },
    { text: "Build a healthier, happier future", icon: "growth", tone: "green" },
  ],
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
