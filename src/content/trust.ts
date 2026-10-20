import type { ImageAsset } from "./types";

export const trustBar = {
  google: { src: "/images/trust/google1.svg", alt: "Google", width: 14, height: 14 },
  rating: "4.9/5",
  reviews: "(100+ reviews)",
  avatars: [
    { src: "/images/trust/Avatar.webp", alt: "", width: 128, height: 128 },
    { src: "/images/trust/Avatar2.webp", alt: "", width: 128, height: 128 },
    { src: "/images/trust/Avatar1.webp", alt: "", width: 128, height: 128 },
    { src: "/images/trust/Avatar4.webp", alt: "", width: 128, height: 128 },
  ] satisfies ImageAsset[],
  helped: "1,000+ Adults Helped Find Clarity",
  psychologyToday: { src: "/images/trust/psychology-Photoroom.webp", alt: "Verified by Psychology Today", width: 1808, height: 870 },
};

export const partnerLogos = {
  title: "TRUSTED BY LEADING PRIMARY CARE GROUPS & UNIVERSITIES",
  logos: [
    { src: "/images/trust/logo15.webp", alt: "Inova Logo", width: 1163, height: 204 },
    { src: "/images/trust/logo13.webp", alt: "University Logo", width: 204, height: 204 },
    { src: "/images/trust/logo12.webp", alt: "George Mason University Disability Services logo", width: 595, height: 204 },
    { src: "/images/trust/logo11.webp", alt: "Partner logo", width: 414, height: 204 },
    { src: "/images/trust/logo14.webp", alt: "Western Governors University logo", width: 833, height: 204 },
    { src: "/images/trust/logo10.webp", alt: "Partner logo", width: 411, height: 204 },
    { src: "/images/trust/logo8.webp", alt: "PAPA Health Logo", width: 756, height: 204 },
    { src: "/images/trust/logo9.webp", alt: "Privia Health Logo", width: 837, height: 204 },
    { src: "/images/trust/logo7.webp", alt: "CloseKnit Logo", width: 1081, height: 204 },
    { src: "/images/trust/logo5.webp", alt: "Accessibility Services Logo", width: 914, height: 204 },
    { src: "/images/trust/logo4.webp", alt: "Medical Services Icon", width: 208, height: 204 },
    { src: "/images/trust/logo3.webp", alt: "Northern Virginia Family Service logo", width: 433, height: 204 },
    { src: "/images/trust/logo6.webp", alt: "Marymount University Logo", width: 595, height: 204 },
    { src: "/images/trust/logo2.webp", alt: "DV Logo", width: 822, height: 195 },
    { src: "/images/trust/logo1.webp", alt: "American University Logo", width: 1715, height: 204 },
    { src: "/images/trust/gw.webp", alt: "George Washington University Logo", width: 1827, height: 861 },
    { src: "/images/trust/hryabhrje4nufpnwxpox.webp", alt: "VHC Medical Faculty Associates Logo", width: 800, height: 336 },
  ] satisfies ImageAsset[],
};

export const complianceBadges = [
  { src: "/images/badges/hipaa.webp", alt: "HIPAA compliant badge", width: 529, height: 116 },
  { src: "/images/badges/cdpr.webp", alt: "GDPR compliant badge", width: 376, height: 144 },
  { src: "/images/badges/ccpa.webp", alt: "CCPA compliant badge", width: 376, height: 149 },
  { src: "/images/badges/soc2.webp", alt: "SOC 2 certified badge", width: 448, height: 218 },
] satisfies ImageAsset[];

export type Review = { name: string; avatar: string; text: string };

/** Google reviews as rendered by the Trustindex widget on the live home page. */
export const reviews: Review[] = [
  {
    name: "Brett Hammer",
    avatar: "/images/trust/reviews/brett-hammer.png",
    text: "Incredible experience. I did the self test and had thought I no symptoms of ADHD. Then I took the objective test and definitely showed symptoms. I truly had no clue I had adhd and going through this process taught me so much and has helped me learn how to handle some of the things that come with ADHD. 10/10 highly recommend!",
  },
  {
    name: "Sam Johnso",
    avatar: "/images/trust/reviews/sam-johnso.png",
    text: "Dr Dodini is an incredible psychologist! I went through the website for ADHD evaluation and I really appreciated how in depth it was. Not only was it questionnaires, but also I was able to write out how I was feeling, my struggles, etc. I felt like I was actually able to express everything that I was feeling and struggling with, in addition to taking the ADHD FDA approved exam. This made me feel more sure of my diagnosis. I wasn’t questioning whether or not I had it, I was able to get the real data of how my brain reacts. The whole experience was very smooth and easy. It took me around 1 hour to do all of the questionnaires and exam, and after was able to talk with Dr Dodini specifically about my results, receive clarifications about certain struggles or concerns, and really have a personalized treatment plan, with in depth steps. He explained to me how in my case, medication would help, but that’s not the end all be all. He explained in depth 3 other steps that have been helping me in the past week to function better and feel better. With my report from Dr Dodini, I wasn’t questioning whether able to meet with a doctor, who was able to analyze my report, making my appointment smooth, and he was able to help me out! I did the full evaluation, including the questionnaires, self report questions, and FDA color exam. The exam I think was really good because even though it was frustrating taking the exam, it really highlighted the issues I was struggling with which included not being able to focus, disassociating, etc. As we discussed afterwards, he broke down the analytics of how I did in the game, compared to the general population, explained how my results looked like in real life, and I shared what that was like in my schoolwork, work, and social life. I had struggled getting a proper diagnosis through normal doctors before, so I appreciated how DR Dodini was patient, listened to me, and help give me a accurate and proper diagnosis of someone who got it later in life, at 22. I was also able to get the medication necessary to improve my functions, and have seen results already in my work! Everything felt personalized, and I finally felt like someone listened to me and my struggles!",
  },
  {
    name: "Jayesh Gangurde",
    avatar: "/images/trust/reviews/jayesh-gangurde.png",
    text: "Great experience with AXON ADHD! The team was professional, supportive, and made the entire process smooth and stress-free. Highly recommend their services to anyone seeking ADHD assessment and care.",
  },
  {
    name: "Su S",
    avatar: "/images/trust/reviews/su-s.png",
    text: "We are grateful that we found out about Dr. Dodini’s services. He is really amazing and I cannot recommend him enough. It is the most efficient process doing all this online and his assessment is so spot on. We wasted several years getting misdiagnosis or not a complete diagnosis. It was a lot of trial and error on my teenage son’s expense. Let me tell you, it cost us thousands of dollars in the process. I wish we knew that our son had ADHD earlier. It would have redirected our efforts. Dr Dodini’s assessment is based on analytics from what I can tell, but I can tell you qualitatively that it is very accurate. I am amazed how much he knew about Adam in such a short period of time based on his analysis from the online test. His prices are reasonable especially compared to other ADHD assessments which are north of $4k. I would highly recommend his services. He knows what he is doing and is very smart.",
  },
  {
    name: "Nora Fotuhi",
    avatar: "/images/trust/reviews/nora-fotuhi.png",
    text: "I had an amazing experience working with Dr. Aaron Dodini. He was always very responsive, took the time to answer my questions, and genuinely cared about helping his patients. He is knowledgeable, thoughtful, and goes above and beyond to support the people he works with. I really appreciated how easy he was to communicate with and how invested he was in making sure I had the best experience possible. I would highly recommend Dr. Dodini to anyone looking for a compassionate, dedicated, and knowledgeable provider.",
  },
  {
    name: "Tejas Kor",
    avatar: "/images/trust/reviews/tejas-kor.png",
    text: "Dr. Aaron Dodini and the team at Axon ADHD provided a professional and supportive experience throughout the evaluation process. The initial assessment was straightforward, and the comprehensive testing process was well organized and easy to understand. What stood out most was the time taken to explain the results, answer questions, and create a clear path forward. The staff was responsive, the onboarding process was smooth, and the overall experience felt welcoming and patient-focused. For anyone who suspects they may have ADHD, seeking an evaluation can be an important step toward better understanding themselves and accessing appropriate support. The team at Axon ADHD offers a structured and thoughtful approach that helps patients feel informed and comfortable throughout the process.",
  },
  {
    name: "John Ashton-Atkinson",
    avatar: "/images/trust/reviews/john-ashton-atkinson.png",
    text: "Very streamlined and detailed experience",
  },
  {
    name: "Thomas Woo",
    avatar: "/images/trust/reviews/thomas-woo.png",
    text: "Very professional and helpful with ADHD diagnosis and coaching, would definitely recommend for anyone looking - also a very reasonable price compared to many other options out there!",
  },
  {
    name: "Joseph Letteri",
    avatar: "/images/trust/reviews/joseph-letteri.png",
    text: "Awesome experience. Aaron and his team guided me to the testing accommodation solution I was looking for.",
  },
];
