// Content migrated from axonadhd.com. Edit text here; components render it.
import type { Block } from "../types";

export const termsBlocks: Block[] = [
  {
    "type": "p",
    "text": "Our mission is simple: to bring clarity, speed, and confidence to behavioral health diagnosis and care. These Terms exist to protect both you and AXON while ensuring a safe, transparent, and high-quality experience."
  },
  {
    "type": "p",
    "text": "Effective Date: February 19, 2026 · AXON Digital Health & Diagnosis (“AXON,” “we,” “us,” or “our”)"
  },
  {
    "type": "h2",
    "text": "1. Our Commitment to You"
  },
  {
    "type": "p",
    "text": "At AXON, our mission is simple:"
  },
  {
    "type": "p",
    "text": "To bring clarity, speed, and confidence to behavioral health diagnosis and care."
  },
  {
    "type": "p",
    "text": "We understand that many people come to AXON after years of uncertainty, frustration, or feeling overlooked. Our platform is designed to make the path forward clearer, faster, and more accessible."
  },
  {
    "type": "p",
    "text": "These Terms exist to protect both you and AXON while ensuring a safe, transparent, and high-quality experience."
  },
  {
    "type": "h2",
    "text": "2. What AXON Is and What It Is Not"
  },
  {
    "type": "p",
    "text": "AXON is a digital health platform that provides:"
  },
  {
    "type": "ul",
    "items": [
      "Evidence-based behavioral health screening",
      "Structured ADHD evaluation pathways",
      "Access to licensed clinical providers",
      "Tools for primary care and institutional partners"
    ]
  },
  {
    "type": "p",
    "text": "AXON is not an emergency service and does not replace in-person medical care when needed."
  },
  {
    "type": "h2",
    "text": "3. End-to-End SMS Flow"
  },
  {
    "type": "p",
    "text": "AXON ADHD uses a stage-based automated SMS campaign workflow to communicate with patients based on their progress in the onboarding and treatment process."
  },
  {
    "type": "h3",
    "text": "User Consent & Enrollment"
  },
  {
    "type": "ul",
    "items": [
      "Patients provide their mobile number during onboarding and explicitly consent to receive SMS communications.",
      "Only users who have opted in are enrolled in messaging."
    ]
  },
  {
    "type": "h3",
    "text": "Initial Referral Message"
  },
  {
    "type": "ul",
    "items": [
      "Once onboarded, the patient receives an initial SMS containing a secure link to complete their assessment."
    ]
  },
  {
    "type": "h3",
    "text": "Assessment Stage"
  },
  {
    "type": "ul",
    "items": [
      "If the patient does not complete the assessment, reminder messages are sent at defined intervals.",
      "Once the assessment is completed, no further assessment reminders are sent."
    ]
  },
  {
    "type": "h3",
    "text": "Payment Stage"
  },
  {
    "type": "ul",
    "items": [
      "After completing the assessment, the patient receives a payment link via SMS.",
      "Reminder messages are sent until payment is completed.",
      "Once payment is successful, all payment reminders stop."
    ]
  },
  {
    "type": "h3",
    "text": "Intake Form Stage"
  },
  {
    "type": "ul",
    "items": [
      "After payment, the patient receives intake form reminder messages.",
      "These reminders continue until the intake form is completed.",
      "Once completed, no further intake reminders are sent."
    ]
  },
  {
    "type": "h3",
    "text": "Schedule Meeting Stage"
  },
  {
    "type": "ul",
    "items": [
      "After completing the intake form, the patient receives an SMS with a secure link to schedule a consultation/meeting.",
      "Reminder messages may be sent until the meeting is scheduled.",
      "Once the meeting is scheduled, no further scheduling reminders are sent."
    ]
  },
  {
    "type": "h3",
    "text": "Google Review Request Stage"
  },
  {
    "type": "ul",
    "items": [
      "After the consultation/meeting stage is completed, the patient receives an SMS requesting feedback or a Google review.",
      "This message includes a secure link to submit their review.",
      "This is typically a one-time message and no repeated reminders are sent."
    ]
  },
  {
    "type": "h3",
    "text": "Stage-Based Messaging Logic"
  },
  {
    "type": "ul",
    "items": [
      "All messages are triggered dynamically based on the patient’s current stage.",
      "Each stage (referral, assessment, payment, intake, scheduling, review) has its own SMS type.",
      "Once a stage is completed, the system ensures that no duplicate or irrelevant messages are sent for that stage."
    ]
  },
  {
    "type": "h3",
    "text": "Opt-Out & Support"
  },
  {
    "type": "ul",
    "items": [
      "Patients can opt out at any time by replying STOP.",
      "Patients can reply HELP for assistance.",
      "Opted-out users immediately stop receiving messages."
    ]
  },
  {
    "type": "h3",
    "text": "Compliance & Data Handling"
  },
  {
    "type": "ul",
    "items": [
      "Messages are only sent to users who have provided direct consent.",
      "No third-party or purchased contact lists are used.",
      "All messages are transactional and related to patient care and service workflow."
    ]
  },
  {
    "type": "h2",
    "text": "4. If You Need Immediate Help"
  },
  {
    "type": "p",
    "text": "If you are in crisis or experiencing thoughts of self-harm:"
  },
  {
    "type": "ul",
    "items": [
      "Call 911",
      "Contact the 988 Suicide & Crisis Lifeline",
      "Go to the nearest emergency room"
    ]
  },
  {
    "type": "p",
    "text": "AXON is not designed for urgent or emergency care."
  },
  {
    "type": "h2",
    "text": "5. When a Clinical Relationship Begins"
  },
  {
    "type": "p",
    "text": "You can explore AXON freely—including taking screeners—without becoming a patient."
  },
  {
    "type": "p",
    "text": "A clinical relationship begins only when all of the following occur:"
  },
  {
    "type": "ol",
    "items": [
      "You complete required intake steps",
      "You are accepted by a licensed provider",
      "You sign a separate clinical consent agreement"
    ]
  },
  {
    "type": "p",
    "text": "Until then, everything you receive is informational and educational."
  },
  {
    "type": "h2",
    "text": "6. Screening, Results, and Clarity"
  },
  {
    "type": "p",
    "text": "AXON’s screening tools and assessments are designed to provide clarity and direction, not instant diagnoses."
  },
  {
    "type": "p",
    "text": "You acknowledge that:"
  },
  {
    "type": "ul",
    "items": [
      "Screening results are not diagnoses",
      "Results help determine whether further evaluation is appropriate",
      "Final diagnoses are made only by licensed professionals"
    ]
  },
  {
    "type": "p",
    "text": "Our goal is to replace confusion with structured, data-informed insight."
  },
  {
    "type": "h2",
    "text": "7. A Note on Speed, Cost, and Expectations"
  },
  {
    "type": "p",
    "text": "AXON is designed to be:"
  },
  {
    "type": "ul",
    "items": [
      "Faster than traditional evaluation models",
      "More affordable and accessible",
      "Technology-enabled, but clinician-guided"
    ]
  },
  {
    "type": "p",
    "text": "However:"
  },
  {
    "type": "ul",
    "items": [
      "We do not guarantee specific diagnoses",
      "We do not guarantee treatment outcomes",
      "We do not guarantee eligibility for accommodations"
    ]
  },
  {
    "type": "p",
    "text": "We do guarantee a process built around clarity, efficiency, and clinical integrity."
  },
  {
    "type": "h2",
    "text": "8. Who Can Use AXON"
  },
  {
    "type": "p",
    "text": "You may use AXON if:"
  },
  {
    "type": "ul",
    "items": [
      "You are 18 or older, or",
      "You have consent from a parent or legal guardian"
    ]
  },
  {
    "type": "p",
    "text": "You agree to provide accurate, honest information so we can serve you effectively."
  },
  {
    "type": "h2",
    "text": "9. Payments and Services"
  },
  {
    "type": "p",
    "text": "Some AXON services require payment (e.g., comprehensive evaluations)."
  },
  {
    "type": "p",
    "text": "By purchasing, you understand:"
  },
  {
    "type": "ul",
    "items": [
      "Pricing is clearly disclosed upfront",
      "Payment provides access to services—not outcomes",
      "Insurance reimbursement is not guaranteed unless explicitly stated"
    ]
  },
  {
    "type": "p",
    "text": "Refund policies, if applicable, will be presented before purchase."
  },
  {
    "type": "h2",
    "text": "10. Telehealth and Availability"
  },
  {
    "type": "p",
    "text": "AXON provides services via telehealth where permitted."
  },
  {
    "type": "p",
    "text": "Because healthcare is regulated at the state level:"
  },
  {
    "type": "ul",
    "items": [
      "Services may not be available in all locations",
      "Provider availability depends on licensure"
    ]
  },
  {
    "type": "p",
    "text": "We aim to expand access while remaining fully compliant."
  },
  {
    "type": "h2",
    "text": "11. AI, Technology, and Human Oversight"
  },
  {
    "type": "p",
    "text": "AXON uses advanced technology—including automation and AI—to improve speed, organization, and insight."
  },
  {
    "type": "p",
    "text": "Importantly:"
  },
  {
    "type": "ul",
    "items": [
      "AI supports but does not replace clinical judgment",
      "All clinical decisions are made by licensed professionals",
      "Technology is used to enhance clarity, not automate care decisions"
    ]
  },
  {
    "type": "h2",
    "text": "12. Your Account and Data Security"
  },
  {
    "type": "p",
    "text": "If you create an account:"
  },
  {
    "type": "ul",
    "items": [
      "You are responsible for safeguarding login credentials",
      "You must notify us of unauthorized access",
      "We may suspend accounts to protect platform integrity"
    ]
  },
  {
    "type": "p",
    "text": "We take security seriously and continuously improve safeguards."
  },
  {
    "type": "h2",
    "text": "13. Your Privacy"
  },
  {
    "type": "p",
    "text": "Your trust matters."
  },
  {
    "type": "p",
    "text": "AXON handles your information in accordance with:"
  },
  {
    "type": "ul",
    "items": [
      "Our Privacy Policy",
      "Applicable healthcare laws, including HIPAA where relevant"
    ]
  },
  {
    "type": "p",
    "text": "Your data may be used to:"
  },
  {
    "type": "ul",
    "items": [
      "Deliver services",
      "Improve platform performance",
      "Support care coordination"
    ]
  },
  {
    "type": "p",
    "text": "We **do not sell your personal health information**."
  },
  {
    "type": "h2",
    "text": "14. Intellectual Property"
  },
  {
    "type": "p",
    "text": "Everything you see on AXON—including branding, content, workflows, and technology—is protected."
  },
  {
    "type": "p",
    "text": "You may not copy, reproduce, or distribute materials without written permission."
  },
  {
    "type": "h2",
    "text": "15. Acceptable Use"
  },
  {
    "type": "p",
    "text": "To maintain a safe platform, you agree not to:"
  },
  {
    "type": "ul",
    "items": [
      "Use AXON for unlawful purposes",
      "Interfere with system functionality",
      "Provide false or misleading information",
      "Attempt to access restricted systems"
    ]
  },
  {
    "type": "h2",
    "text": "16. For Universities and Educational Partners"
  },
  {
    "type": "p",
    "text": "AXON partners with universities to support proactive student mental health."
  },
  {
    "type": "p",
    "text": "By using AXON, institutions acknowledge:"
  },
  {
    "type": "ul",
    "items": [
      "AXON provides screening and analytics tools, not emergency services",
      "Screening identifies risk—it does not replace institutional intervention systems",
      "Universities remain responsible for student support policies and compliance (including FERPA where applicable)"
    ]
  },
  {
    "type": "p",
    "text": "AXON’s role is to help institutions move from reactive support to proactive identification."
  },
  {
    "type": "h2",
    "text": "17. For Primary Care and Healthcare Partners"
  },
  {
    "type": "p",
    "text": "AXON integrates with primary care to enhance behavioral health detection and care pathways."
  },
  {
    "type": "p",
    "text": "Partner organizations acknowledge:"
  },
  {
    "type": "ul",
    "items": [
      "AXON provides tools, workflows, and diagnostic support—not independent medical decision-making",
      "Clinical responsibility remains with licensed providers",
      "Billing outcomes depend on payer rules and provider compliance"
    ]
  },
  {
    "type": "p",
    "text": "AXON’s goal is to help practices deliver better care with less friction."
  },
  {
    "type": "h2",
    "text": "18. Third-Party Integrations"
  },
  {
    "type": "p",
    "text": "AXON may integrate with:"
  },
  {
    "type": "ul",
    "items": [
      "Payment processors",
      "EHR systems",
      "Telehealth platforms"
    ]
  },
  {
    "type": "p",
    "text": "We are not responsible for third-party services or their policies."
  },
  {
    "type": "h2",
    "text": "19. No Guarantees"
  },
  {
    "type": "p",
    "text": "AXON services are provided “as available.”"
  },
  {
    "type": "p",
    "text": "We do not guarantee:"
  },
  {
    "type": "ul",
    "items": [
      "Continuous uptime",
      "Specific diagnoses",
      "Treatment outcomes"
    ]
  },
  {
    "type": "p",
    "text": "We do commit to continuous improvement and high standards."
  },
  {
    "type": "h2",
    "text": "20. Limitation of Liability"
  },
  {
    "type": "p",
    "text": "To the fullest extent permitted by law:"
  },
  {
    "type": "p",
    "text": "AXON is not liable for indirect or consequential damages."
  },
  {
    "type": "p",
    "text": "Total liability is limited to the amount paid for services in the prior 12 months."
  },
  {
    "type": "h2",
    "text": "21. Indemnification"
  },
  {
    "type": "p",
    "text": "You agree to hold AXON harmless from claims resulting from misuse of the platform or violation of these Terms."
  },
  {
    "type": "h2",
    "text": "22. Updates to These Terms"
  },
  {
    "type": "p",
    "text": "We may update these Terms periodically."
  },
  {
    "type": "p",
    "text": "Continued use of AXON means you accept any updates."
  },
  {
    "type": "h2",
    "text": "23. Governing Law"
  },
  {
    "type": "p",
    "text": "These Terms are governed by the laws of the Commonwealth of Virginia."
  },
  {
    "type": "h2",
    "text": "24. Contact Us"
  },
  {
    "type": "p",
    "text": "AXON Digital Health & Diagnosis"
  },
  {
    "type": "p",
    "text": "Address: [1501 Langston Blvd. Suite 110, Arlington, VA 22209](https://share.google/l26swjwWSpQ4CjEdW) Email: [drdodini@axonadhd.com](mailto:drdodini@axonadhd.com) Phone: [(703) 909-5101](tel:+17039095101) Website: [www.axonadhd.com](/)"
  }
];
