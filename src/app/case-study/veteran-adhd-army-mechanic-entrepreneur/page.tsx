import { CaseStudyArticleLayout, type RelatedCaseStudy } from "../CaseStudyArticleLayout";
import "../case-study-detail.css";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Veteran ADHD: From Army Mechanic to Entrepreneur",
  description:
    "Discover how Marcus, an Army veteran, overcame undiagnosed ADHD and became an entrepreneur after receiving an accurate ADHD diagnosis.",
  path: "/case-study/veteran-adhd-army-mechanic-entrepreneur/",
  image: "/images/blog/case-study-veteran-army-mechanic-entrepreneur-cover.webp",
});

const relatedCards: RelatedCaseStudy[] = [
  {
    href: "/case-study/undiagnosed-adult-adhd-diagnosis/",
    image: "/images/blog/case-study-undiagnosed-adult-adhd-20-years-cover.webp",
    alt: "Diagnosed in Days, After 20 Years of Waiting",
    width: 1672,
    height: 941,
    title: "Diagnosed in Days, After 20 Years of Waiting",
    meta: "Aaron Dodini | Aug 20, 2026",
    excerpt: "Ryan's idea of control was a system of color-coded folders, calendar reminders, and a vision board.",
    tag: "ADHD Adult",
  },
  {
    href: "/case-study/missed-for-decades-a-womans-adhd-diagnosis-at-age-41/",
    image: "/images/blog/case-study-missed-for-decades-diagnosis-at-41-cover.webp",
    alt: "Missed for Decades: A Woman's ADHD Diagnosis at Age 41",
    width: 1725,
    height: 912,
    title: "Missed for Decades: A Woman's ADHD Diagnosis at Age 41",
    meta: "Aaron Dodini | Aug 05, 2026",
    excerpt: "Elena was doing just fine, or so everyone thought. A senior marketing manager, a mother of two, and the friend who always remembered everyone's birthday",
    tag: "ADHD Adult",
  },
  {
    href: "/case-study/can-you-be-successful-organized-and-still-have-adhd/",
    image: "/images/blog/case-study-successful-organized-still-adhd-cover.webp",
    alt: "Can You Be Successful, Organized, and Still Have ADHD?",
    width: 1729,
    height: 910,
    title: "Can You Be Successful, Organized, and Still Have ADHD?",
    meta: "Aaron Dodini | July 30, 2026",
    excerpt: "The assumption feels reasonable. The popular image of ADHD is a restless kid or a chaotic adult whose life is falling apart.",
    tag: "ADHD",
  },
];

export default function VeteranAdhdPage() {
  return (
    <>
      <CaseStudyArticleLayout
        title="From Army Mechanic to Entrepreneur: A Veteran's Undiagnosed ADHD Story"
        description="After fifteen years in uniform, Marcus lost the structure that had quietly been holding everything together. A comprehensive evaluation at AXON finally named what had been there all along — combined-type ADHD."
        heroImage={{
          src: "/images/blog/case-study-veteran-army-mechanic-entrepreneur-cover.webp",
          alt: "Former Army mechanic standing outside his successful auto repair shop, illustrating a veteran's journey from undiagnosed ADHD to business ownership.",
          width: 1746,
          height: 901,
        }}
        downloadTitle="From Army Mechanic to Entrepreneur: A Veteran's Undiagnosed ADHD Story"
        downloadFileName="axon-adhd-marcus-case-study.txt"
        relatedCards={relatedCards}
      >
        <h2>How Military Structure Masked Marcus&apos;s ADHD Symptoms</h2>
        <p>
          Marcus spent fifteen years keeping the U.S. Army moving. As a mechanic, he could pull apart a tank engine, diagnose a failing transmission by ear, and lead a team under pressure. People relied on him, and he loved that. So when he left the service at thirty-five to build a civilian life and maybe his own garage someday, he assumed the hardest part was behind him.
        </p>
        <p>
          It wasn&apos;t. Within a year, the man who had thrived in uniform was struggling to hold a job, drinking more than he wanted to, and snapping at the wife he loved. What changed wasn&apos;t Marcus. It was the structure around him and what that structure had quietly been hiding.
        </p>

        <h2 id="cs-early-signs">Early Signs of Undiagnosed ADHD in Childhood</h2>
        <p>
          Long before the Army, Marcus was the boy teachers called &ldquo;hyper&rdquo; and a &ldquo;troublemaker.&rdquo; School felt like a cage. He couldn&apos;t sit still or focus on worksheets, and he was told more than once that he wasn&apos;t college material. At twenty, tired of being counted out, he enlisted.
        </p>
        <p>
          Those early labels are common in the ADHD story, and they&apos;re often where the trouble starts. Bright but restless kids get read as behavior problems instead of being evaluated, especially African American or Black boys, who are more likely to be disciplined and less likely to be diagnosed.
        </p>

        <h2>How Military Structure Can Mask ADHD Symptoms</h2>
        <p>
          In uniform, Marcus flourished. The structure was relentless in the best way: clear routines, hands-on learning, immediate feedback, and a mission that mattered. He became a gifted mechanic, rose through the ranks, and discovered he was a natural leader.
        </p>
        <p>
          This is one of the least understood facts about ADHD: it doesn&apos;t disappear in a structured, high-stakes environment; it gets masked by it. ADHD diagnoses among veterans nearly quadrupled between 2009 and 2016, yet Black veterans saw some of the smallest increases, leaving many men like Marcus undiagnosed well into adulthood.
        </p>

        <h2>Why ADHD Symptoms Often Emerge After Military Transition</h2>
        <p>
          Civilian life pulled the scaffolding out all at once. Marcus wasn&apos;t hired right away, and the rejection stung. When he did land a job at a local shop, he clashed with coworkers and their &ldquo;drama.&rdquo; His dream of opening a garage stalled on the details. Getting a business license, passing the civilian certification tests, and the difficulty networking all felt overwhelming and made him feel small.
        </p>
        <p>
          Researchers see this pattern often: when military structure falls away, veterans with ADHD struggle with planning, time management, and finishing long projects, and executive-function challenges make job-hunting especially hard. Marcus grew depressed. He drank more. He overreacted to small things. Eventually he went to his primary care provider for help with the depression and the anger.
        </p>
        <p>
          Marcus was one of the lucky ones. Many in his shoes don&apos;t have the social support or access to resources like a trusted primary care doctor. They spiral in the trauma, problematic substance use, depression, anger, and disillusionment. For far too many, that leads to suicidal ideation or worse.
        </p>

        <h2>Seeking an Adult ADHD Diagnosis</h2>
        <p>
          His doctor listened, then asked something no one had before: Could Marcus be missing the Army&apos;s structure, and had focusing and following through on long-term goals always been this hard? The question reframed everything. Instead of treating only the depression, the provider referred him to AXON ADHD for a full evaluation.
        </p>

        <h2>Receiving a Combined-Type ADHD Diagnosis</h2>
        <p>
          At AXON, Marcus completed a comprehensive telehealth evaluation: QbCheck, the only FDA-cleared online ADHD test, paired with validated questionnaires (the ASRS, PHQ-9, and GAD-7) and a live interview with a licensed clinician. In days rather than months, he had an answer: combined-type ADHD.
        </p>
        <p>
          This meant hyperactivity that manifested as both a physical and a mental &ldquo;running&rdquo; all the time. It also meant impulsivity and increased sensitivity and reactivity to external and/or internal stimuli that manifest as distractibility and hyperfocus. It also meant inattention, manifested by difficulty focusing on long-term plans and completing multi-step processes, the inattentive, disorganized side that surfaced as a civilian.
        </p>
        <p>
          For the first time, his whole history clicked into place. It wasn&apos;t a character flaw, lack of intelligence, or a discipline problem. It was a treatable, lifelong condition that the structure of his military career had been masking for him all along.
        </p>

        <h2>Adult ADHD Treatment and Executive Function Support</h2>
        <p>
          Marcus started medication and ADHD coaching to rebuild the routines the Army once supplied. Through AXON&apos;s Accommodations and Advocacy package, he secured testing accommodations for his mechanic certification and passed with high scores.
        </p>
        <p>
          The change rippled outward. His relationships at work steadied, and his boss asked him to manage the garage. Handed the financial books, Marcus, who had always believed he was &ldquo;terrible at math,&rdquo; found he was sharp with numbers once his attention was supported. He hadn&apos;t been bad at math. He&apos;d been fighting his own brain without knowing it.
        </p>

        <h2>From Veteran to Successful Business Owner After AXON ADHD Treatment</h2>
        <p>
          Confident again, Marcus proposed opening a second location in partnership with his boss. They did. Today he earns roughly four times what he made that discouraging first year, trains new mechanics, and is preparing to open a third shop. The leader the Army built hadn&apos;t vanished in civilian life; he just needed the right diagnosis to lead again.
        </p>
        <p>
          If you or a veteran you love is struggling to focus, plan, or feel like themselves, an accurate diagnosis can be the turning point. It was for Marcus, and it was also the turning point in another AXON patient&apos;s story of late-diagnosed ADHD. Take AXON ADHD&apos;s{" "}
          <a href="https://prp.axondigitalhealth.ai/free-assessment" target="_blank" rel="noopener noreferrer">
            free behavioral health screener
          </a>{" "}
          to learn whether a{" "}
          <a href="https://prp.axondigitalhealth.ai/direct-comprehensive-adhd" target="_blank" rel="noopener noreferrer">
            comprehensive ADHD evaluation
          </a>{" "}
          may be right for you.
        </p>
      </CaseStudyArticleLayout>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies/" },
          {
            name: "From Army Mechanic to Entrepreneur: A Veteran's Undiagnosed ADHD Story",
            path: "/case-study/veteran-adhd-army-mechanic-entrepreneur/",
          },
        ])}
      />
    </>
  );
}
