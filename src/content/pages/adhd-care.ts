import { ctas, links } from "../site";
import type { PageContent } from "./types";

export const adhdCarePage: PageContent = {
  path: "/adhd-care/",
  breadcrumb: "ADHD Care",
  meta: {
    title: "ADHD Treatment for Adults: Personalized Care, Therapy & Coaching",
    description:
      "Explore personalized ADHD treatment for adults: ADHD therapy, ADHD coaching, medication management, and practical strategies to help you navigate everyday challenges.",
    image: "/images/hero/AXON-ADHD-Personalized-Care-Banner.webp",
  },
  sections: [
    {
      type: "hero",
      title: "ADHD Treatment for Adults: Personalized Care, Therapy & Coaching",
      text: [
        "Explore personalized ADHD treatment for adults with care options designed around your needs. Learn about ADHD therapy for adults, ADHD coaching for adults, medication management, and practical strategies to help you navigate everyday challenges.",
      ],
      ctas: [{ label: "Free ADHD Screening", href: links.freeScreening }],
      image: { src: "/images/adhdcare/qbcheck-dashboard-overview 1.webp", alt: "QbCheck dashboard showing ADHD assessment totals, symptom analysis and attention and activity results", width: 1466, height: 959 },
      trust: true,
    },
    {
      type: "features",
      title: "Comprehensive ADHD Care and Support Services for Adults",
      accent: "ADHD Care and Support Services",
      video: { id: "go27SIWS4sQ", title: "How AXON ADHD supports adults with ADHD" },
      subtitle:
        "Learn how AXON ADHD supports adults with ADHD. In this video, Aaron explains our services, including medication management, therapy, ADHD coaching, executive skills training, and help with ADHD testing and requesting accommodations. Discover how the right care and support can help you manage daily challenges and feel more confident.",
      columns: 4,
      items: [
        { title: "Certified Care", text: "All care are certified in ADHD coaching or therapy", icon: "shield" },
        { title: "Flexible Scheduling", text: "Book sessions that fit your lifestyle and timezone", icon: "clock" },
        { title: "Evidence-Based", text: "Using proven CBT and ADHD-specific strategies", icon: "filecheck" },
        { title: "Ongoing Support", text: "Message your coach between sessions for guidance", icon: "users" },
      ],
    },
    {
      type: "features",
      title: "The ADHD brain is specialized. Your ADHD Care should be too.",
      accent: "Your ADHD Care should be too.",
      subtitle:
        "The research is very clear. The best treatment for ADHD should include medication, coaching, self care strategies, executive function skills training, and other therapies. AXON ADHD has a team of partners who can provide all this and more. We can also coordinate care with your current team of physicians, coaches, and therapists. The goal is to help you thrive with this amazing ADHD brain.",
      tone: "surface",
      image: { src: "/images/services/The-ADHD-brain-is-specialized.webp", alt: "The ADHD brain is specialized", width: 1912, height: 1337 },
      items: [
        { title: "Medications", text: "Whether stimulant or non-stimulant medications, they are an effective way to improve attention, focus, and effectiveness.", icon: "pill" },
        { title: "Coaching", text: "Individual coaching helps you identify brain strengths and learn executive function skills that make a difference. Group coaching provides additional learning, support, accountability, and a community who \"gets it\".", icon: "users" },
        { title: "Self Care", text: "The best thing we can do for long term health and wellbeing is to exercise with elevated heart rate for 20 minutes daily, get good consistent sleep, have good nutrition habits, and maintain healthy relationships.", icon: "heart" },
        { title: "Psychotherapy", text: "We address the emotional aspects of ADHD, including rejection sensitivity, perfectionism, and fear of judgment. Individual and group therapy help build emotional awareness, encourage healthy vulnerability, and strengthen relationships.", icon: "handshake" },
      ],
    },
    {
      type: "cta",
      title: "Haven't Started Yet?",
      subtitle: "Begin with our FREE Behavioral Health Screening to gain insights into whether you have risk factors for ADHD, depression, anxiety, or substance use issues that often co-occur.",
      primary: ctas.screening,
    },
    {
      type: "features",
      title: "Your Path to Long-Term Success",
      accent: "Long-Term Success",
      subtitle: "Transform your daily life with medication, evidence-based strategies, and ongoing expert support.",
      columns: 4,
      items: [
        { title: "Manage focus and time effectively", text: "Learn proven techniques to stay on task and make the most of your time", icon: "clock" },
        { title: "Reduce overwhelm and improve productivity", text: "Break through mental blocks and create sustainable work patterns", icon: "trend" },
        { title: "Build structure around your daily life", text: "Create routines and systems that work with your brain, not against it", icon: "bulb" },
        { title: "Stay motivated with ongoing expert support", text: "Never feel alone your coach is there to guide you every step", icon: "award" },
      ],
    },
    {
      type: "split",
      title: "Practical Tools for Everyday Success",
      accent: "Everyday Success",
      paragraphs: ["Your coach doesn’t just talk they equip you with actionable strategies you can use immediately. From morning routines to project management, you’ll learn what truly works for your brain."],
      list: ["Task prioritization techniques", "Time management frameworks", "Emotional regulation strategies", "Habit formation systems"],
      image: { src: "/images/adhdcare/adhd-coaching-session.webp", alt: "ADHD coaching session with practical tools", width: 1536, height: 1024 },
      reverse: true,
      tone: "soft",
    },
    {
      type: "cta",
      title: "You don't have to manage ADHD alone.",
      subtitle: "Discover where you stand and get the support you deserve. From a free assessment to personalized treatment, AXON ADHD is here for every step of your journey.",
      primary: { label: "Start Comprehensive ADHD Evaluation", href: links.comprehensive },
      secondary: ctas.screening,
    },
    { type: "blogs" },
    { type: "contact" },
  ],
};
