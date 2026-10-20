import { faqTabs } from "../faqs";
import type { ImageAsset } from "../types";
import type { PageContent } from "./types";

const img = (src: string, alt: string, width: number, height: number): ImageAsset => ({ src: `/images/services/${src}`, alt, width, height });

const clinicalBadges: ImageAsset[] = [87, 89, 90, 91, 92, 93].map((n) => ({ src: `/images/services/Frame-16188786${n}.png`, alt: "Clinical standard and compliance badge", width: 80, height: 48 }));

/** Endorsements shown in the hero carousel of both referral pages. */
export const endorsements = [
  { name: "Julia Stanford, MD", role: "Stanford MD, Concierge Internal Medicine & Pediatrics", quote: "I have enjoyed a collaborative relationship with Dr. Dodini and Dodini Behavioral Health (now AXON ADHD) for nearly 18 years. I have come to trust his team to provide exceptional individual psychotherapy, couples therapy, and adult ADHD testing. The AXON adult ADHD testing protocol allows me to get diagnostic clarity within 24 to 48 hours of our referral. Patients love his bedside manner. I love that he gives us clear, concise, differential diagnoses with reports that give us the objective data and recommendations I need to make decisions about whether to prescribe medication and how much to get the best treatment possible. I love that his test takes the guesswork out of making a determination of whether to prescribe a stimulant or not." },
  { name: "Sam Pappas, M", role: "Pappas Health", quote: "It is with great pleasure that I share my excellent experiences with Dr. Aaron Dodini and his dynamic team at AXON ADHD. I’ve had the privilege to have collaborated with Aaron for over 15 years and have found his holistic and comprehensive approach to emotional health a breath of fresh air. His belief in growth and learning of life’s lessons through the company of others connects relevantly with my belief based on the traditional Greek wisdom that we should all strive to have meaningful connections with others as a counterweight to the hyperindividualism and isolation of our fractured society. Dr. Dodini’s broad and extensive system to help my patients and I effectively diagnose the growing epidemic of ADHD has been very helpful. The ease and speed of the process coupled with the accuracy and details of the report has given my team and I confidence in our ability to personalize treatment recommendations while also better understanding the possibility that other concomitant factors such as anxiety and depression may also be contributing to a patient’s challenges. Having reliable and objective data that I trust and can review with patients has also been very valuable to my care of the patient. I highly recommend that physicians and clinicians involved in the care of those who may suffer from ADHD utilize Dr. Dodini’s comprehensive yet easy program." },
  { name: "S.S., M", role: "President, Premier Primary Care Physicians; Professor, Georgetown University School of Medicine", quote: "Given the complexities of diagnosing ADHD in adults with potentially overlapping conditions (e.g. depression, anxiety, sleep issues, and disordered eating), I trust the process that Dr. Dodini and his team at AXON ADHD have developed. I am confident that this approach ensures my patients receive the most appropriate care." },
  { name: "Jennie Byrne, MD, Ph.D", role: "Constellation PLL", quote: "Dr. Aaron Dodini brings a rare combination of deep ADHD expertise and a practical, grounded approach. He takes the time to carefully differentiate ADHD from other conditions that can look similar, and the AXON ADHD model makes it easier for patients to access a high-quality assessment without unnecessary delays or cost. I would confidently recommend Dr. Dodini to primary care clinicians and to anyone seeking a thoughtful, evidence-based ADHD evaluation." },
  { name: "Dr Arti Lal, MD", role: "Austin, Texas", quote: "I have known Dr. Dodini for the past 5 years doing collaborative work in the ADHD space. Dr Dodini, besides being a very astute and smart clinician, is very empathetic, an excellent listener, and kindhearted. He is always seeking to understand and provide intelligent patient centered care. He brings out the best in his patients and colleagues, while constantly seeking new ways to help patients." },
  { name: "Sarah Cheyette, MD", role: "Pediatric Neurologist ADHD Expert", quote: "I’ve known Aaron to be a very knowledgeable, forward thinking psychologist who is passionate about ADHD assessment and care. His proactive screening system is exciting to hear about and will help a lot of people who would otherwise be missed." },
  { name: "Ryan R. Gorman, MSN, RN, PMHNP-BC", role: "Adult Psychiatric Mental Health Nurse Practitioner", quote: "As a psychiatric nurse practitioner, I’ve referred multiple clients to Dr. Dodini and AXON ADHD for ADHD assessment and have received 100% positive feedback. My clients describe the process as thorough, accurate, and clearly explained, and many share real relief in finally having an answer after years of negative self-perception. Whenever I reach out, Dr. Dodini is quick to respond and consistently warm, kind, and eager to help. I genuinely trust him with my clients. As a provider licensed in multiple states, I also appreciate being able to refer clients outside of Virginia, especially when local options are limited or wait times are long." },
  { name: "Danielle Vaeth", role: "QbTech, Head of Strategic Market Development - US", quote: "Having worked closely with Dr. Aaron Dodini for the past decade and as part of the ADHD Expert Consortium, I’ve seen firsthand his commitment to improving how ADHD is identified and treated. AXON ADHD is a natural extension of that work–bringing together objective measurement, clinical insight, and scalable access in a way that actually moves the field forward." },
];

const earlyReferral = [
  { title: "Earlier Diagnosis & Intervention", text: "Identify ADHD before complications develop, enabling timely treatment and support.", icon: "schedule" as const },
  { title: "Reduced Substance Use Risk", text: "Early treatment cuts substance abuse risk by up to 50% in vulnerable populations.", icon: "shield" as const },
  { title: "Improved Academic Retention", text: "Diagnosed students stay enrolled longer, reducing dropout rates and increasing graduation.", icon: "graduation" as const },
  { title: "Lower Healthcare Costs", text: "Early intervention reduces emergency visits, hospitalizations, and long-term medical expenses.", icon: "receipt" as const },
  { title: "Better Long-Term Health", text: "Treatment improves life expectancy, mental health, and overall quality of life.", icon: "heart" as const },
];

const contact = (label: string) => ({ label, href: "#contact" });
const howItWorks = { label: "Learn How Referral Works", href: "#How-Referral-works" };

export const universityReferralPage: PageContent = {
  path: "/adhd-referral-for-universities/",
  breadcrumb: "Referral University",
  meta: {
    title: "ADHD Referral for Universities Made Simple",
    description: "AXON ADHD catches early signals and connects students to free screening and fast, affordable ADHD evaluations before issues escalate — at no cost to the university.",
    image: "/images/hero/ADHD-University-Referral-Support.webp",
  },
  sections: [
    {
      type: "hero",
      title: "ADHD Referral for Universities Made Simple",
      text: ["Universities don’t have a visibility problem they have a timing problem. Students are often identified too late, when they’re already behind and at risk. AXON ADHD catches early signals and connects them to support before issues escalate."],
      ctas: [contact("Claim Your University Account"), howItWorks],
      image: { src: "/images/hero/ADHD-University-Referral-Support.webp", alt: "hero section referral university", width: 1672, height: 941 },
      trust: true,
      note: "1000’s — Students & patients supported across universities and clinics",
    },
    { type: "badges", title: "Clinical Standards & Compliance You Can Trust", subtitle: "We follow industry-leading medical, privacy, and security frameworks to ensure every assessment, referral, and report is handled with complete integrity.", badges: clinicalBadges, image: img("clinical-standard.webp", "Clinical standards and compliance", 1341, 1173) },
    {
      type: "features",
      title: "Why Partner With AXON ADHD",
      subtitle: "Purpose-built to deliver high-quality ADHD support while saving time and creating value for universities and student support programs.",
      lead: "For Universities & Colleges",
      tone: "surface",
      image: img("referral-universityy.webp", "AXON ADHD university partnership", 1254, 1254),
      items: [
        { title: "Early Identification of at risk students", text: "ADHD, depression, anxiety, and substance abuse are the leading causes of drop out.", icon: "user" },
        { title: "Protect the Investment", text: "A lost semester can cost families dearly and the school risks losing the student entirely.", icon: "shield" },
        { title: "One streamlined screening", text: "for ADHD, anxiety, depression, and substance use", icon: "clipboard" },
        { title: "Fast, Accurate, Affordable Diagosis", text: "without adding staff or operational burden", icon: "clock" },
      ],
      quote: "“Early ADHD identification protects both student outcomes and institutional revenue.”",
    },
    {
      type: "features",
      title: "The Hidden ADHD Gap",
      subtitle: "Understanding the scale of undiagnosed ADHD and its impact on individuals, institutions, and healthcare systems.",
      variant: "stat",
      items: [
        { title: "1 in 4", text: "College students have ADHD", detail: "Higher prevalence than general population" },
        { title: "3x", text: "Higher dropout risk", detail: "Compared to neurotypical peers" },
        { title: "Only 25%", text: "Receive academic accommodations", detail: "Despite diagnosis or suspected ADHD" },
        { title: "-0.5 to -1.0 GPA", text: "Average GPA gap", detail: "Vs. peers without ADHD or related conditions." },
        { title: "60%", text: "Have a comorbid mental health condition", detail: "Anxiety, depression, or both" },
        { title: "$1,400+", text: "Additional annual cost per student", detail: "From unmanaged ADHD to institutions" },
      ],
    },
    {
      type: "features",
      title: "What Happens When ADHD Is Untreated",
      subtitle: "The cascading consequences of undiagnosed ADHD across health, productivity, and economic outcomes.",
      variant: "flow",
      tone: "navy",
      columns: 4,
      items: [
        { title: "Undiagnosed ADHD", text: "Symptoms go unrecognized" },
        { title: "Mental Health", text: "3× depression & anxiety" },
        { title: "Academic", text: "22+ Academic days lost per year" },
        { title: "$24.5 Million", text: "annual lost tuition due to drop out for midsize state university." },
      ],
    },
    {
      type: "features",
      title: "The Cost of Missed ADHD on Campus",
      subtitle: "Undiagnosed ADHD drives dropout rates, reduces retention, and costs universities millions in lost revenue.",
      variant: "stat",
      items: [
        { title: "30-50%", text: "Of college dropouts cite mental health or substance use as the primary reason" },
        { title: "$50-100M", text: "Lost every 6 years in tuition & alumni revenue" },
        { title: "$35K-80K", text: "Lost per student per year due to untreated ADHD & co-occurring conditions" },
      ],
      footnote: "Per Student Impact: Early ADHD Identification Can Save Institutions $35K–$80K Per Student Per Year In Retention And Support Costs.",
    },
    { type: "features", title: "Why Early Referral Matters", subtitle: "Early identification in primary care and universities significantly improves population health and financial outcomes.", columns: 5, tone: "surface", items: earlyReferral },
    {
      type: "cta",
      title: "Proactive, Free Screening is the First Step Toward Better Outcomes",
      subtitle: "Early identification of ADHD, depression, anxiety, and substance use supports student success while protecting family investment and preventing revenue loss from dropouts.",
      primary: contact("Partner with AXON Digital Health & Diagnosis"),
    },
    {
      type: "steps",
      id: "How-Referral-works",
      title: "How Our Referral Workflow Works",
      subtitle: "Our automated workflow helps providers invite patients to complete assessments, delivering trusted results through a behavioral health partner.",
      items: [
        { title: "Partner with AXON ADHD", text: "At no cost to the school and easy integration with your learning management system (LMS).", image: img("Initiation-by-PCPUniversity.webp", "", 2593, 1454) },
        { title: "University Details Entered", text: "AXON identifies your preferred workflow to make it easy for your team to provide proactive, free screenings for all your students and staff.", image: img("Details-Entered-by-Aaron.webp", "", 2478, 1630) },
        { title: "Magic Link Shared", text: "AXON generates a link that can be shared within your LMS messaging system to invite students to complete the free screening 2-4 weeks prior to the start of a new academic year/semester.", image: img("Magic-Link-Shared.webp", "", 2400, 1460) },
        { title: "Students Complete Free Screening", text: "Students easily complete the screening on their phone or laptop in 4-5 minutes.", image: img("Patient-Registration.webp", "", 2075, 1328) },
        { title: "Screening Results Automatically Shared", text: "Students/Families receive screening results. If risk is elevated, students immediately directed to an FDA-cleared, comprehensive neuropsych evaluation via provided link.", image: img("Complete-Free-Assessment_11zon.webp", "", 1224, 838) },
        { title: "Consultation with AXON's team of Clinical Psychologists", text: "Within days, students meet virtually with an AXON psychologist to review data, confirm diagnosis, and discuss treatment. Students receive a concise report including accommodation recommendations to streamline disability support protocols within the school.", image: img("Healthcare-professionals-connected-t.webp", "", 1891, 1125) },
      ],
    },
    { type: "cta", title: "Fast, Seamless ADHD Referrals for Your Students", subtitle: "Help your students get clarity and treatment quickly through our streamlined University referral workflow.", primary: contact("Claim Your University Account"), secondary: howItWorks },
    {
      type: "features",
      title: "Key Benefits for University",
      subtitle: "AXON ADHD streamlines student intake, improves campus communication, and supports better student success decisions.",
      columns: 5,
      items: [
        { title: "Fast Student Import", text: "Import existing students into AXON ADHD in a few clicks.", icon: "users" },
        { title: "Secure Data Exchange", text: "Industry-level encryption for secure student information transfer.", icon: "lock" },
        { title: "Better Student Insights", text: "Receive comprehensive ADHD assessment reports for referred students.", icon: "filecheck" },
        { title: "Coordinated Support", text: "Streamlined communication between university teams and students.", icon: "chat" },
        { title: "Zero Setup Cost", text: "Free, fast onboarding with no technical integration required.", icon: "sparkles" },
      ],
    },
    { type: "cta", title: "Expand Your Referral Network Effortlessly", subtitle: "A single, secure process for onboarding referred students from universities and partnered institutions.", primary: contact("Contact Us") },
    { type: "quotes", title: "What Universities Say About AXON ADHD", subtitle: "Academic institutions, primary care providers, and families trust AXON ADHD for clear evaluations and streamlined student referral support.", items: endorsements },
    { type: "faq", title: "Frequently Asked Questions", subtitle: "We have the answers for you!", faqs: faqTabs[1].items },
    { type: "contact" },
  ],
};

export const pcpReferralPage: PageContent = {
  path: "/referral-adhd-partners/",
  breadcrumb: "Referral PCP",
  meta: {
    title: "ADHD Referral Partner Program for Primary Care Providers",
    description: "Partner with AXON ADHD to identify at-risk patients early and gain diagnostic clarity before visits at no cost — freeing staff, reducing strain, and improving patient care and revenue.",
    image: "/images/hero/AXON-ADHD-Referral-Program-Banner.webp",
  },
  sections: [
    {
      type: "hero",
      title: "ADHD Referral Partner Program for Primary Care Providers",
      text: ["Partner with AXON ADHD through our ADHD Referral Partners Program to identify at-risk patients early and gain diagnostic clarity before visits at no cost. Our ADHD Referral Partners solution helps free up staff, reduce strain, and improve patient care and revenue."],
      ctas: [contact("Claim Your PCP Account"), howItWorks],
      image: { src: "/images/hero/AXON-ADHD-Referral-Program-Banner.webp", alt: "hero section primary care provider", width: 1671, height: 941 },
      trust: true,
      note: "100+ Providers and institutions collaborating with AXON",
    },
    { type: "badges", title: "Clinical Standards & Compliance You Can Trust", subtitle: "We follow industry-leading medical, privacy, and security frameworks to ensure every assessment, referral, and report is handled with complete integrity.", badges: clinicalBadges, image: img("clinical-standard.webp", "Clinical standards and compliance", 1341, 1173) },
    {
      type: "features",
      title: "Why Partner With AXON ADHD",
      subtitle: "Purpose-built to deliver high-quality care while saving time and creating financial value for healthcare systems and academic institutions.",
      lead: "For Primary Care Providers",
      tone: "surface",
      image: img("pcpp.webp", "AXON ADHD primary care partnership", 1254, 1254),
      items: [
        { title: "Early identification", text: "of ADHD and co-occurring conditions", icon: "user" },
        { title: "Reduce repeat visits", text: "and diagnostic uncertainty", icon: "calendar" },
        { title: "One streamlined screening", text: "for ADHD, anxiety, depression, and substance use", icon: "clipboard" },
        { title: "Faster diagnosis", text: "without adding staff or operational burden", icon: "clock" },
      ],
      quote: "“Turn unmet behavioral health demand into coordinated care without increasing clinician workload.”",
    },
    {
      type: "features",
      title: "The Hidden ADHD Gap",
      subtitle: "Understanding the scale of undiagnosed ADHD and its impact on individuals, institutions, and healthcare systems.",
      variant: "stat",
      items: [
        { title: "1 in 9", text: "Adults with ADHD properly diagnosed", detail: "Up to 90% remain undiagnosed" },
        { title: "1 in 4", text: "Adults suspect ADHD", detail: "But have never been evaluated" },
        { title: "7–9 years lost", text: "Reduction in life expectancy", detail: "Due to untreated ADHD" },
        { title: "2-3x", text: "Higher risk of substance abuse", detail: "Compared to general population" },
        { title: "3x", text: "Higher rates of depression & anxiety", detail: "With untreated ADHD" },
        { title: "$143 - $266B", text: "Annual U.S. economic burden", detail: "From undiagnosed ADHD" },
      ],
    },
    {
      type: "features",
      title: "What Happens When ADHD Is Untreated",
      subtitle: "The cascading consequences of undiagnosed ADHD across health, productivity, and economic outcomes.",
      variant: "flow",
      tone: "navy",
      columns: 4,
      items: [
        { title: "Undiagnosed ADHD", text: "Symptoms go unrecognized" },
        { title: "Mental Health", text: "3× depression & anxiety" },
        { title: "Work Impact", text: "22+ workdays lost per year" },
        { title: "Economic Cost", text: "4× higher medical costs" },
      ],
    },
    { type: "features", title: "Why Early Referral Matters", subtitle: "Early identification in primary care significantly improves patient outcomes and reduces long-term healthcare costs.", columns: 5, tone: "surface", items: earlyReferral },
    { type: "cta", title: "Referral Is the First Step Toward Better Outcomes", subtitle: "Early ADHD identification improves patient health and practice outcomes. Join leading healthcare providers improving ADHD care delivery.", primary: contact("Become Referral Partner") },
    {
      type: "steps",
      id: "How-Referral-works",
      title: "How Our Referral Workflow Works",
      subtitle: "Our automated workflow helps providers invite patients to complete assessments, delivering trusted results through a behavioral health partner.",
      items: [
        { title: "Partner with AXON ADHD", text: "We integrate with your EHR at no cost to your practice.", image: img("Initiation-by-PCPUniversity.webp", "", 2593, 1454) },
        { title: "Provider Details Entered", text: "AXON identifies your preferred workflow to make it easy for your team to provide proactive, free screenings for all your patients.", image: img("Details-Entered-by-Aaron.webp", "", 2478, 1630) },
        { title: "Magic Link Shared", text: "AXON generates a link that can be shared within your EHR messaging system to invite patients to complete the free screening two weeks prior to their annual visit.", image: img("Magic-Link-Shared.webp", "", 2400, 1460) },
        { title: "Patients Complete Free Assessment", text: "Patients easily complete the screening on their phone or laptop in 4–5 minutes.", image: img("Complete-Free-Assessment_11zon.webp", "", 1224, 838) },
        { title: "Screening Results Automatically Shared", text: "All parties receive screening results. If risk is elevated, patients are immediately directed to an FDA-cleared neuropsych evaluation via a provided link.", image: img("Receive-ADHD-Result.webp", "", 1168, 820) },
        { title: "Consultation with AXON's team of Clinical Psychologists", text: "Within days, patients meet virtually with an AXON psychologist to review data, confirm diagnosis, and discuss treatment. Both patient and PCP receive a concise report before the annual visit, enabling faster, confident care.", image: img("Healthcare-professionals-connected-t.webp", "", 1891, 1125) },
      ],
    },
    { type: "cta", title: "Fast, Seamless ADHD Referrals for Your Practice", subtitle: "Help your patients get clarity and treatment quickly through our streamlined PCP referral workflow.", primary: contact("Claim Your PCP Account"), secondary: howItWorks },
    {
      type: "features",
      title: "Key Benefits for PCPs",
      subtitle: "AXON ADHD streamlines patient intake, enhances provider communication, and supports better clinical decision-making.",
      columns: 5,
      items: [
        { title: "Fast Patient Import", text: "Import existing patients into AXON ADHD in a few clicks.", icon: "users" },
        { title: "Secure, HIPAA-Compliant Data Exchange", text: "Industry-level encryption for safe data transfer.", icon: "lock" },
        { title: "Better Clinical Insights", text: "Receive comprehensive ADHD assessment reports for your patients.", icon: "filecheck" },
        { title: "Coordinated Care", text: "Streamlined communication between PCPs, clinicians, and patients.", icon: "chat" },
        { title: "Zero Setup Cost", text: "Free, fast onboarding with no technical integration required.", icon: "sparkles" },
      ],
    },
    { type: "cta", title: "Get a TRUE Collaborative Partner for Behavioral Health Needs.", subtitle: "Have confidence in the care you provide and the partners you trust to give you objective, validated diagnostic certainty.", primary: contact("Contact Us") },
    { type: "quotes", title: "What PCPs Say About AXON ADHD", subtitle: "PCPs trust AXON ADHD for clear, accurate evaluations and seamless patient referrals.", items: endorsements },
    { type: "faq", title: "Frequently Asked Questions", subtitle: "We have the answers for you!", faqs: faqTabs[0].items },
    { type: "contact" },
  ],
};
