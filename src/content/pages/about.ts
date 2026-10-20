import { links } from "../site";
import type { PageContent } from "./types";

export const founder = {
  name: "Dr. Aaron Dodini",
  title: "Ph.D. Licensed Clinical Psychologist,Founder, AXON ADHD",
  image: { src: "/images/blog/meet-our-Dr-aron.png", alt: "Dr. Aaron Dodini", width: 243, height: 243 },
  bio: "Dr. Aaron Dodini is a licensed clinical psychologist and marriage and family therapist who founded Dodini Behavioral Health in 2001 to provide exceptional individual, couples, and group psychotherapy. Driven by his own family experience and frustrated by outdated, costly and unreliable ADHD evaluation models, Dr. Dodini built AXON Digital Health & Diagnosis (AXON ADHD) combining clinical expertise with innovative digital tools to deliver faster, less expensive, and more accurate ADHD diagnoses. His work bridges behavioral health, primary care, and higher education to improve outcomes and deliver meaningful results at scale. Through AXON, he is redefining how individuals, primary care providers, and universities move from confusion to clarity and from diagnosis to meaningful change.",
};

export const aboutPage: PageContent = {
  path: "/about-adhd-evaluation/",
  breadcrumb: "About",
  meta: {
    title: "About AXON ADHD | Clarity, Connection, Care & ADHD Evaluation",
    description: "AXON ADHD combines objective testing, expert clinical insight, and fast, accessible evaluations to help people move from confusion to clarity. Meet founder Dr. Aaron Dodini.",
    image: "/images/hero/AXON-ADHD-Evaluation-Overview.webp",
  },
  sections: [
    {
      type: "hero",
      title: "Clarity, Connection, Care, and ADHD Evaluation That’s AXON ADHD.",
      text: ["At AXON ADHD, our ADHD evaluation process is inspired by the brain’s natural communication pathways, bringing clarity and precision to ADHD understanding."],
      ctas: [
        { label: "Start Free Screening", href: links.freeScreening },
        { label: "Meet Our Founder", href: "#Meet" },
      ],
      image: { src: "/images/hero/AXON-ADHD-Evaluation-Overview.webp", alt: "AXON ADHD evaluation overview", width: 1670, height: 942 },
      trust: true,
    },
    {
      type: "features",
      title: "Our Mission: Turning Confusion into Clarity",
      subtitle: "At AXON ADHD, we’re redefining how people understand their minds. By combining objective testing, expert clinical insight, and fast, accessible evaluations, we help individuals move from confusion to action and from struggle to success",
      items: [
        { title: "Standard Testing", text: "FDA Cleared Objective Testing", icon: "flask" },
        { title: "Expert Insight", text: "ADHD Experts at your fingertips", icon: "user" },
        { title: "Fast & Accessible", text: "No waiting,no barriers.", icon: "clock" },
      ],
    },
    {
      type: "split",
      title: "Why We Chose the Name AXON ADHD",
      paragraphs: ["Axons are the brain’s communication highways. We chose the name AXON because we deliver clarity, connection, understanding, and action FAST!"],
      list: [
        "Axons are the brain’s communication highways fast, efficient messengers.",
        "They keep information flowing clearly and precisely between neurons.",
        "We chose the name AXON because it reflects our core purpose.",
        "We deliver clarity, speed, and understanding to support better mental-health care.",
        "Our mission is to help people move forward with confidence and thrive.",
      ],
      image: { src: "/images/services/AxonGIF.gif", alt: "Animated axon signal", width: 271, height: 540 },
      tone: "surface",
    },
    {
      type: "split",
      title: "Connecting Patients, Clinics & Universities Through AXON",
      paragraphs: [
        "Our companion platform, AXON Digital Health & Diagnosis, advances this mission by building HIPAA-compliant connections across patients, clinicians, universities, and primary care providers ensuring critical data flows securely to the right people at the right time.",
      ],
      video: "/videos/Aboutgif.mp4",
      reverse: true,
    },
    {
      type: "cta",
      title: "Moving Forward with Confidence",
      subtitle: "Clear communication drives effective care and just like biological axons, our digital pathways help people move forward with confidence, direction, and momentum.",
      primary: { label: "Start Free Screening", href: links.freeScreening },
      secondary: { label: "Meet Our Team", href: "#Meet" },
    },
    {
      type: "split",
      title: "Transforming ADHD Care with Science and Compassion",
      paragraphs: [
        "At AXON adhd evaluation process Digital Health, we’re redefining how clinicians deliver ADHD care by combining science-backed assessments, secure online therapy, and accessible digital tools. Our platform seamlessly connects patients with their care teams, making collaborative care a reality.",
        "Our HIPAA-compliant platform enables patients to receive personalized mental and behavioral health care from anywhere through secure, encrypted audio and video sessions.",
        "With AXON, geographic and scheduling barriers are no longer obstacles. Patients can connect with licensed professionals safely, efficiently, and confidentially at their convenience.",
      ],
      image: { src: "/images/services/Transforming-ADHD-Care-with-Science-and-Compassion-.webp", alt: "Transforming ADHD Care with Science and Compassion", width: 1875, height: 1563 },
    },
    {
      type: "features",
      title: "Why Clinics & Universities Choose AXON ADHD",
      subtitle: "A comprehensive ADHD platform designed to improve outcomes while saving time and unlocking measurable financial value.",
      tone: "surface",
      items: [
        { title: "High-Quality, Evidence-Based Care", text: "Comprehensive ADHD assessments and therapy, delivered by qualified clinicians using evidence-based protocols, drive better clinical, academic, and long-term health outcomes.", icon: "award" },
        { title: "New Revenue & Measurable Cost Savings", text: "AXON creates new revenue opportunities for primary care providers and clinics while helping universities save millions by reducing dropout rates, missed diagnoses, and unmanaged mental health costs.", icon: "trend" },
        { title: "Saves Time. Reduces Lost Revenue.", text: "Automated screenings, streamlined workflows, and easy scheduling reduce staff burden, missed appointments, and delays in care allowing teams to focus on patient care, not administration.", icon: "clock" },
      ],
    },
    {
      type: "split",
      title: "Overcoming Barriers to Collaborative Care",
      paragraphs: [
        "Many individuals struggle to fit therapy into their busy schedules, from long commutes to inconsistent availability. AXON Digital Health bridges this gap by delivering clinical-grade ADHD and behavioral health care directly to patients’ devices.",
        "Our model helps users stay consistent with care, supporting meaningful progress and improved mental wellness over time.",
      ],
      image: { src: "/images/services/Overcoming-Barriers-to-Collaborative-Care.webp", alt: "Overcoming Barriers to Collaborative Care", width: 1913, height: 1050 },
      reverse: true,
    },
    {
      type: "split",
      title: "Seamless Solutions for Clinicians and Clients",
      paragraphs: [
        "AXON integrates seamlessly into existing clinical workflows, enabling providers to deliver high-quality care without logistical barriers.",
        "Patients can access therapy and assessments when they need them, while clinicians manage appointments, documentation, and outcomes within a single secure platform. The system also allows care teams to coordinate seamlessly with external collaborative care partners.",
        "This flexible platform empowers both patients and providers by supporting clear communication, strengthening collaboration, and improving continuity of care and long-term treatment outcomes.",
      ],
      image: { src: "/images/services/Seamless-Solutions-for-Clinicians-and-Clients.webp", alt: "Seamless Solutions for Clinicians and Clients", width: 607, height: 365 },
      tone: "soft",
    },
  ],
};
