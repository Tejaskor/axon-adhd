import { links, site } from "@/content/site";
import type { Faq } from "@/content/types";

/** Booking links carry the page's UTM tags; BookingLinkTagger overrides them with any tags/click IDs in the visitor's URL. */
export const bookingLinkPrefix = links.comprehensive;

export function bookingHref(content: string) {
  return `${links.comprehensive}?utm_source=axonadhd&utm_medium=website&utm_campaign=online-adhd-evaluation&utm_content=${content}`;
}

export const onlineEval = {
  path: "/adhd-assessment-lp/",
  title: "Online ADHD Evaluation | Clear Diagnosis from Home",
  description:
    "The FDA-cleared QbCheck ADHD test at home, a 1:1 Zoom visit with an ADHD expert, and an official clinical report. One flat fee of $577.",
  phone: site.phone,
  phoneHref: site.phoneHref,
  email: site.email,
  doctorImage: { src: "/images/adhd-assessment-lp/meet-aaron-dodini.webp", alt: "Dr. Aaron Dodini, PhD", width: 970, height: 970 },
};

/** Links in the landing-page header, in order; each target is a section id on this page. */
export const headerNav = [
  { label: "How it works", href: "#alp-how" },
  { label: "Pricing", href: "#alp-pricing" },
  { label: "Dr. Dodini", href: "#alp-doctor" },
  { label: "FAQ", href: "#alp-faq" },
];

export const statBand = [
  { n: "$577", l: "One flat fee, FSA accepted" },
  { n: "20 min", l: "QbCheck test at home" },
  { n: "1:1", l: "Zoom visit, 20 to 30 min" },
  { n: "Days", l: "Not a months-long waitlist" },
];

export type FlowStep = { title: string; text: string; art: "calendar" | "test" | "doctor" | "report" };

export const flowSteps: FlowStep[] = [
  { title: "Book and pay online", text: "Pay the $577 flat fee and fill in a short intake form. It takes 5 to 10 minutes.", art: "calendar" },
  {
    title: "Take the QbCheck test at home",
    text: "The FDA-cleared test takes 20 minutes. Plan about 40 in total for setup, a short video and a 1-minute practice run.",
    art: "test",
  },
  {
    title: "Meet an ADHD expert on Zoom",
    text: "Pick a time on our calendar. In 20 to 30 minutes you go through your results and set a personalized treatment plan.",
    art: "doctor",
  },
  { title: "Get your comprehensive report", text: "We email your report after the visit, and send it to your doctor if you'd like.", art: "report" },
];

export const quizCard = {
  kicker: "Free online quiz",
  big: "A hint",
  items: [
    "Questions you answer about yourself",
    "No objective attention test",
    "No clinician and no diagnosis",
    "Nothing to share with a doctor or school",
  ],
};

export const evalCard = {
  kicker: "AXON online evaluation",
  big: "An answer",
  items: [
    "FDA-cleared QbCheck attention test",
    "1:1 Zoom visit with an ADHD expert",
    "Official diagnosis and comprehensive report",
    "Personalized treatment plan and follow-up assessment",
    "Report sent to your doctor, with your permission",
  ],
};

export const evaluationPlan = {
  name: "Comprehensive ADHD Evaluation",
  was: "$577",
  now: "$519.30",
  saveText: "(Save $57.70)",
  offer: "Get 10% off when you complete the evaluation payment",
  features: [
    "Comprehensive ADHD evaluation",
    "FDA-cleared QbCheck objective testing",
    "Clinical interview with a licensed professional",
    "ASRS, PHQ-9 & GAD-7 results",
    "Full clinical ADHD report",
    "Official diagnostic evaluation",
    "Results in days, not months",
    "Consultation to discuss next steps",
  ],
};

export const packagePlan = {
  name: "Evaluation + Accommodation Package",
  tag: "For students & professionals",
  was: "$827",
  now: "$744.30",
  saveText: "(Save $82.70)",
  breakdown: "$577 (Evaluation) + $250 (Accommodation Support)",
  offer: "Get 10% off when you complete the package payment",
  features: [
    "Accommodation documentation & advocacy package",
    "Written to ADA, Section 504 and higher-education disability office standards",
    "Supports requests like extended testing time and distraction-reduced settings",
    "Guidance for school, college or workplace accommodations",
  ],
};

export const doctor = {
  name: "Dr. Aaron Dodini, PhD",
  creds: "Licensed Clinical Psychologist · Founder, AXON ADHD",
  quote:
    "I love being able to help adults who may never have been assessed for ADHD finally get the definitive answers they seek, with data they can trust.",
  stats: [
    { v: "PhD", l: "Catholic University of America" },
    { v: "Member", l: "ADHD Expert Consortium" },
    { v: "43 + DC", l: "States covered online" },
  ],
  license: "Licensed in Virginia and New York, and authorized to provide telepsychology in PSYPACT participating states.",
};

export type Review = { name: string; role: string; text: string; avatar: "mint" | "sky" | "green"; initials: string; dark?: boolean };

export const googleReviewsHref = "https://maps.app.goo.gl/ZBpoutfR9UrnyxPX9";

export const reviews: Review[] = [
  {
    dark: true,
    initials: "KH",
    avatar: "mint",
    name: "Dr. Kate H.",
    role: "Physician and Parent",
    text: "I am a local primary care physician, and have been so grateful for this resource in the last few years. Dr. Dodini and his staff are awesome at what they do. They make scheduling easy. The testing is efficient, affordable, and accurate--having the online option is a great convenience for my patients. The reports they send are so helpful. It has honestly been the solution I'd needed in my practice for ADHD evaluation in adult patients.",
  },
  {
    initials: "SS",
    avatar: "sky",
    name: "Su S.",
    role: "Parent of a teen",
    text: `"We are grateful that we found out about Dr. Dodini’s services. He is really amazing and I cannot recommend him enough. It is the most efficient process doing all this online and his assessment is so spot on.

We wasted several years getting misdiagnosis or not a complete diagnosis. It was a lot of trial and error on my teenage son’s expense. Let me tell you, it cost us thousands of dollars in the process. I wish we knew that our son had ADHD earlier. It would have redirected our efforts.

Dr Dodini’s assessment is based on analytics from what I can tell, but I can tell you qualitatively that it is very accurate. I am amazed how much he knew about Adam in such a short period of time based on his analysis from the online test.

His prices are reasonable especially compared to other ADHD assessments which are north of $4k. I would highly recommend his services. He knows what he is doing and is very smart."`,
  },
  {
    initials: "JL",
    avatar: "green",
    name: "Joseph L.",
    role: "Accommodation package",
    text: `"Awesome experience. Aaron and his team guided me to the testing accommodation solution I was looking for."`,
  },
  {
    initials: "BH",
    avatar: "sky",
    name: "Brett Hammer",
    role: "Google review",
    text: "Incredible experience. I did the self test and had thought I no symptoms of ADHD. Then I took the objective test and definitely showed symptoms. I truly had no clue I had adhd and going through this process taught me so much and has helped me learn how to handle some of the things that come with ADHD. 10/10 highly recommend!",
  },
  {
    initials: "JG",
    avatar: "mint",
    name: "Jayesh Gangurde",
    role: "Google review",
    text: "Great experience with AXON ADHD! The team was professional, supportive, and made the entire process smooth and stress-free. Highly recommend their services to anyone seeking ADHD assessment and care.",
  },
  {
    initials: "NF",
    avatar: "sky",
    name: "Nora Fotuhi",
    role: "Google review",
    text: "I had an amazing experience working with Dr. Aaron Dodini. He was always very responsive, took the time to answer my questions, and genuinely cared about helping his patients. He is knowledgeable, thoughtful, and goes above and beyond to support the people he works with. I really appreciated how easy he was to communicate with and how invested he was in making sure I had the best experience possible. I would highly recommend Dr. Dodini to anyone looking for a compassionate, dedicated, and knowledgeable provider.",
  },
  {
    initials: "TK",
    avatar: "green",
    name: "Tejas Kor",
    role: "Google review",
    text: `Dr. Aaron Dodini and the team at Axon ADHD provided a professional and supportive experience throughout the evaluation process. The initial assessment was straightforward, and the comprehensive testing process was well organized and easy to understand.

What stood out most was the time taken to explain the results, answer questions, and create a clear path forward. The staff was responsive, the onboarding process was smooth, and the overall experience felt welcoming and patient-focused.

For anyone who suspects they may have ADHD, seeking an evaluation can be an important step toward better understanding themselves and accessing appropriate support. The team at Axon ADHD offers a structured and thoughtful approach that helps patients feel informed and comfortable throughout the process.`,
  },
  { initials: "JA", avatar: "mint", name: "John Ashton-Atkinson", role: "Google review", text: "Very streamlined and detailed experience" },
  {
    initials: "TW",
    avatar: "sky",
    name: "Thomas Woo",
    role: "Google review",
    text: "Very professional and helpful with ADHD diagnosis and coaching, would definitely recommend for anyone looking - also a very reasonable price compared to many other options out there!",
  },
];

export const statesCovered = {
  heading: "43 states, DC and the Northern Mariana Islands",
  sub: "You need to be physically in a PSYPACT participating state or New York during your video session.",
  note: "California, Guam, Hawaii, Iowa, Louisiana, Massachusetts, New Mexico, Oregon, Puerto Rico, U.S. Virgin Islands. Email info@axonadhd.com and we'll talk through other options. Need an in-person visit in Arlington, VA? Ask us by email.",
};

const p = (text: string): Faq["a"] => [{ type: "p", text }];

export const faqs: Faq[] = [
  {
    q: "I don’t live in Virginia. Can I still book?",
    a: p(
      "Yes. Dr. Dodini is licensed in Virginia and New York, and authorized to provide telepsychology in PSYPACT participating states. You need to be physically in a PSYPACT participating state or New York during your video session.",
    ),
  },
  {
    q: "Is an online evaluation as thorough as one in the office?",
    a: p(
      "Yes. You take the same FDA-cleared QbCheck test and have the same 1:1 visit with an ADHD expert. Online is easier and faster, which is why we recommend it for everyone.",
    ),
  },
  {
    q: "What do I need for the online visit?",
    a: p(
      "A quiet, private space and a computer with a webcam and a steady internet connection. The QbCheck test takes 20 minutes, but plan about 40 minutes in total to set up, watch the instructional video, take a 1-minute practice test and complete the full assessment.",
    ),
  },
  {
    q: "What happens after the test?",
    a: p(
      "You get access to our calendar to book a Zoom meeting with one of our ADHD experts. In 20 to 30 minutes you discuss your results, review the full report and set a personalized treatment plan. We email you the comprehensive report after that meeting.",
    ),
  },
  {
    q: "Do you take insurance?",
    a: p(
      "AXON is out of network. You pay the $577 flat fee, and we give you a superbill you can send to your insurer for possible reimbursement. You can also pay with an FSA card.",
    ),
  },
  {
    q: "What’s the difference between the evaluation and the accommodation package?",
    a: p(
      "The evaluation report focuses on your diagnosis and treatment plan. The accommodation package adds a separate report on how your specific symptoms affect school, testing or work, with each recommended accommodation backed by your data. We also advocate for those accommodations and complete any forms your institution requires.",
    ),
  },
  {
    q: "Can you send my report to my doctor?",
    a: p("Yes. With your permission, we send it to any medical provider you choose. We just need their name, practice name and fax number."),
  },
  {
    q: "Can you evaluate my child?",
    a: p("Yes. We evaluate children and teens from age 6, as well as adults. A parent or guardian joins the results review."),
  },
  { q: "Do I need a referral?", a: p("No. You can book directly online.") },
  {
    q: "Can I meet in person instead?",
    a: p(
      "We recommend online for everyone, including people in Virginia, DC and Maryland, because it’s easier and faster. If you need an in-person visit at our Arlington, VA office, email info@axonadhd.com.",
    ),
  },
];
