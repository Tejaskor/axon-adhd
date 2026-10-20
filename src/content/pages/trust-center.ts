import type { Faq } from "../types";
import { links } from "../site";

export const trustVaultUrl = "https://d06ba1928e.scrut.io/";

export const trustCenter = {
  meta: {
    title: "AXON ADHD Trust Center | HIPAA, Security & Compliance",
    description: "AXON Digital Health & Diagnosis is a HIPAA-compliant platform for ADHD assessment and care. All PHI is processed and stored exclusively on U.S. AWS infrastructure.",
    image: "/images/hero/Futuristic-Healthcare-Cybersecurity-Shield.webp",
  },
  hero: {
    eyebrow: "Trust & Compliance",
    title: "AXON ADHD Trust Center",
    text: "AXON Digital Health & Diagnosis is a HIPAA-compliant platform for ADHD assessment and care. All Protected Health Information is processed and stored exclusively on U.S. AWS infrastructure, under security controls aligned with HIPAA, HITECH, SOC 2 and GDPR.",
    image: { src: "/images/hero/Futuristic-Healthcare-Cybersecurity-Shield.webp", alt: "Healthcare cybersecurity shield", width: 1672, height: 941 },
    ctas: [
      { label: "Visit Live Trust Vault", href: trustVaultUrl },
      { label: "View Assessments", href: "#axtc-assessments" },
    ],
    highlights: [
      { title: "HIPAA Assessed", text: "Completed Sept 2026" },
      { title: "Penetration Tested", text: "OWASP Top 10 & ASVS" },
      { title: "SOC 2 Type II", text: "In progress" },
    ],
  },
  assessments: {
    eyebrow: "Certifications & Assessments",
    title: "Independently verified, not just promised",
    subtitle: "Third-party assessments of the AXON platform, tracked in our Scrut Trust Center. Full reports are available on request.",
    items: [
      { status: "Completed", title: "HIPAA Compliance Assessment", text: "Independent assessment of the AXON platform: telehealth services, patient portal, FDA-cleared ADHD diagnostic tools (QbCheck), patient communication scheduling and clinical data management.", by: "By Aegisra Assurance LLP · September 2026" },
      { status: "Completed", title: "Vulnerability Assessment & Penetration Test", text: "Independent VAPT of our telehealth and patient portal platform against the OWASP Top 10 and OWASP ASVS benchmarks, using industry-standard penetration testing methodology.", by: "By Scrut · September 2026" },
      { status: "In progress", title: "SOC 2 Type II", text: "Our security controls are aligned with the SOC 2 framework, and our Type II attestation is currently in progress. We update this page and our Trust Vault as it advances.", by: "Status tracked in the Trust Vault" },
    ],
    alignedLead: "Security and privacy controls aligned with",
    aligned: ["HIPAA", "HITECH Act", "SOC 2", "GDPR", "CCPA"],
  },
  practices: {
    eyebrow: "Security Practices",
    title: "How we protect patient information",
    subtitle: "Enterprise-grade controls built around the HIPAA Security Rule’s administrative, technical and physical safeguards.",
    items: [
      { title: "U.S.-Only Data Residency", text: "All PHI is processed and stored exclusively within U.S. Amazon Web Services infrastructure.", icon: "shield" as const },
      { title: "Data Protection", text: "Safeguards that protect patient data in transit and at rest, in line with HIPAA and HITECH requirements.", icon: "lock" as const },
      { title: "Access Controls", text: "Access to PHI is limited to authorized people with a legitimate need, following the minimum-necessary principle.", icon: "user" as const },
      { title: "Monitoring & Audit Controls", text: "Activity on systems that handle PHI is monitored and reviewed as part of our compliance program.", icon: "clipboard" as const },
      { title: "Independent Security Testing", text: "Our platform has undergone an independent vulnerability assessment and penetration test against OWASP standards.", icon: "badge" as const },
      { title: "Secure Telehealth", text: "Evaluations are delivered through HIPAA-compliant secure video and a protected patient portal.", icon: "chat" as const },
    ],
  },
  hipaa: {
    eyebrow: "HIPAA & Privacy",
    title: "Built for healthcare from day one",
    subtitle: "AXON is a healthcare platform, so HIPAA is not an add-on: it shapes how we build, host and operate every part of the service.",
    list: [
      "Independent HIPAA compliance assessment completed in September 2026",
      "Covers telehealth, patient portal, QbCheck diagnostics, scheduling and clinical data",
      "PHI processed and stored only within the United States",
      "Privacy practices aligned with GDPR and CCPA",
    ],
    facts: [
      { label: "Operated by", value: "Dodini Behavioral Health, P.L.L.C." },
      { label: "Hosting", value: "U.S. AWS" },
      { label: "Assessed by", value: "Aegisra Assurance LLP" },
      { label: "Pen test by", value: "Scrut" },
    ],
    baa: {
      title: "Need a BAA or security documents?",
      text: "Compliance teams, partners and providers can request our reports and agreements. We’ll respond promptly.",
      ctas: [
        { label: "Request Documentation", href: "mailto:info@axonadhd.com?subject=Security%20documentation%20request" },
        { label: "Email the Security Team", href: "mailto:info@axonadhd.com?subject=Security%20question" },
      ],
    },
  },
  residency: {
    eyebrow: "Data & Privacy",
    title: "Your PHI stays in the United States",
    subtitle: "AXON is operated by Dodini Behavioral Health, P.L.L.C. Protected Health Information is handled under controls aligned with HIPAA, the HITECH Act, SOC 2 and GDPR, and never leaves U.S. AWS infrastructure.",
    stats: [
      { value: "100%", text: "of PHI stored on U.S. AWS infrastructure" },
      { value: "2", text: "independent assessments completed in Sept 2026" },
      { value: "OWASP", text: "Top 10 & ASVS tested" },
      { value: "FDA", text: "cleared QbCheck diagnostic tool" },
    ],
  },
  reports: {
    eyebrow: "Reports & Documents",
    title: "Review the evidence",
    subtitle: "Full reports are available in our Trust Vault to verified requesters.",
    items: [
      { title: "HIPAA Compliance Report 2026", text: "Independent assessment by Aegisra Assurance LLP, completed September 2026." },
      { title: "Web Application Security Report", text: "Vulnerability assessment and penetration test against OWASP Top 10 and ASVS, completed September 2026." },
    ],
    note: "Monitored continuously with Scrut Automation.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Straight answers about how AXON protects your data, what has been independently verified, and how to get the reports.",
    aside: { title: "Reviewing AXON for your organization?", text: "Our team can walk you through our security program and answer your due-diligence questions.", cta: { label: "Contact our team", href: "mailto:info@axonadhd.com?subject=Security%20questionnaire" } },
    items: [
      { q: "Where is patient data stored?", a: [{ type: "p", text: "All Protected Health Information (PHI) is processed and stored exclusively within U.S. Amazon Web Services (AWS) infrastructure." }] },
      { q: "Is AXON HIPAA compliant?", a: [{ type: "p", text: "Yes. AXON is a HIPAA-compliant digital health platform, and an independent HIPAA compliance assessment by Aegisra Assurance LLP was completed in September 2026. The report is available on request through our Trust Vault." }] },
      { q: "Do you have a SOC 2 report?", a: [{ type: "p", text: "Our controls are aligned with SOC 2, and our SOC 2 Type II attestation is currently in progress. Its status is tracked in our Trust Vault." }] },
      { q: "Has the platform been penetration tested?", a: [{ type: "p", text: "Yes. An independent vulnerability assessment and penetration test of our telehealth and patient portal platform was completed by Scrut in September 2026, against the OWASP Top 10 and OWASP ASVS benchmarks." }] },
      { q: "How can I get the full reports?", a: [{ type: "p", text: `Open our [Trust Vault](${trustVaultUrl}) and use “Get Access” on the document you need, or email [info@axonadhd.com](mailto:info@axonadhd.com).` }] },
      { q: "Who operates AXON?", a: [{ type: "p", text: "AXON Digital Health & Diagnosis is operated by Dodini Behavioral Health, P.L.L.C. Evaluations are led by Dr. Aaron Dodini, PhD, a licensed clinical psychologist." }] },
      { q: "How do I report a security or privacy concern?", a: [{ type: "p", text: "Email [info@axonadhd.com](mailto:info@axonadhd.com) or call [(703) 909-5101](tel:+17039095101). We take every report seriously." }] },
    ] satisfies Faq[],
  },
  cta: {
    title: "Care you can trust, privacy you can verify",
    subtitle: "Start with a clinician-led ADHD evaluation, or explore our full Trust Vault and request the reports your team needs.",
    primary: { label: "Book Your Evaluation", href: links.comprehensive },
    secondary: { label: "Open Trust Vault", href: trustVaultUrl },
  },
};
