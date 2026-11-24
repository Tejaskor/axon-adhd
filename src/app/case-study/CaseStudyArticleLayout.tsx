"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";

export type RelatedCaseStudy = {
  href: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  meta: string;
  excerpt: string;
  tag: string;
};

export type CaseStudyArticleLayoutProps = {
  title: string;
  description: string;
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  downloadFileName: string;
  downloadTitle: string;
  children: React.ReactNode;
  relatedCards: RelatedCaseStudy[];
};

export function CaseStudyArticleLayout({
  title,
  description,
  heroImage,
  downloadFileName,
  downloadTitle,
  children,
  relatedCards,
}: CaseStudyArticleLayoutProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const content = document.getElementById("case-study-content")?.innerText || "";
    const textData = `${downloadTitle}\n\nAXON ADHD Case Study\n${typeof window !== "undefined" ? window.location.href : ""}\n\n${content}`;
    const blob = new Blob([textData], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Audio narration is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const contentEl = document.getElementById("case-study-content");
    if (!contentEl) return;

    const textToRead = `${contentEl.innerText}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openShareWindow = (url: string) => {
    if (typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  return (
    <article className="case-study">
      {/* Hero section */}
      <section className="case-study__hero" aria-label="Case study introduction">
        <div className="case-study__hero-media">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            priority
            loading="eager"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="case-study__shell case-study__hero-shell">
          <div className="case-study__hero-card">
            <h1 className="case-study__title">{title}</h1>

            <p className="case-study__desc">{description}</p>

            <div className="case-study__actions">
              <ButtonLink href="#download-placeholder" download onClick={handleDownload}>
                Download Case Study
              </ButtonLink>

              {!isPlaying ? (
                <Button
                  data-case-study-play
                  aria-controls="case-study-content"
                  onClick={handlePlay}
                >
                  Read Case Study
                </Button>
              ) : (
                <div className="case-study__player" data-case-study-player>
                  {!isPaused ? (
                    <button
                      type="button"
                      className="case-study__player-btn case-study__player-btn--pause"
                      data-case-study-pause
                      title="Pause"
                      aria-label="Pause narration"
                      onClick={handlePause}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <rect x="6.5" y="4" width="4" height="16" rx="2" />
                        <rect x="13.5" y="4" width="4" height="16" rx="2" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="case-study__player-btn case-study__player-btn--resume"
                      data-case-study-resume
                      title="Resume"
                      aria-label="Resume narration"
                      onClick={handleResume}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.2a1 1 0 0 1 1.53-.85l9 6.8a1 1 0 0 1 0 1.7l-9 6.8A1 1 0 0 1 8 18.8V5.2Z" />
                      </svg>
                    </button>
                  )}

                  <button
                    type="button"
                    className="case-study__player-btn case-study__player-btn--stop"
                    data-case-study-stop
                    title="Stop"
                    aria-label="Stop narration"
                    onClick={handleStop}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="6" width="12" height="12" rx="2.5" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {isPlaying && (
              <span className="case-study__sr-only" data-case-study-speech-status aria-live="polite">
                Reading&hellip;
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="case-study__main">
        <div className="case-study__shell">
          <section id="case-study-content" className="case-study__content" aria-label="Case study article">
            {children}
          </section>

          {/* Social share */}
          <div className="case-study__share case-study__share--horizontal" aria-label="Share this case study">
            <span className="case-study__share-label">Share This Content</span>
            <div className="case-study__share-icons">
              <button
                type="button"
                className="case-study__share-btn case-study__share-btn--copy"
                title={copied ? "Copied!" : "Copy link"}
                aria-label="Copy link to this case study"
                data-case-study-copy-link
                onClick={handleCopy}
              >
                {copied ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                className="case-study__share-btn case-study__share-btn--fb"
                aria-label="Share this case study on Facebook"
                onClick={() =>
                  openShareWindow(
                    "https://www.facebook.com/sharer/sharer.php?u=" +
                      encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")
                  )
                }
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 5.02 3.68 9.19 8.49 9.94v-7.03H7.83v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.81-.75 8.49-4.92 8.49-9.94Z" />
                </svg>
              </button>

              <button
                type="button"
                className="case-study__share-btn case-study__share-btn--li"
                aria-label="Share this case study on LinkedIn"
                onClick={() =>
                  openShareWindow(
                    "https://www.linkedin.com/sharing/share-offsite/?url=" +
                      encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")
                  )
                }
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0Z" />
                </svg>
              </button>

              <button
                type="button"
                className="case-study__share-btn case-study__share-btn--x"
                aria-label="Share this case study on X (Twitter)"
                onClick={() =>
                  openShareWindow(
                    "https://twitter.com/intent/tweet?url=" +
                      encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")
                  )
                }
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Related Case Studies */}
          {relatedCards.length > 0 && (
            <section className="case-study__explore" aria-label="Related case studies">
              <div className="case-study__explore-head">
                <h2>Explore More</h2>
                <p className="case-study__explore-sub">
                  Continue exploring related content and deepen your understanding
                </p>
              </div>

              <div className="case-study__cards">
                {relatedCards.map((card, idx) => (
                  <article key={idx} className="case-study__card">
                    <Link className="case-study__card-media" href={card.href}>
                      <Image
                        src={card.image}
                        alt={card.alt}
                        width={card.width}
                        height={card.height}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 420px"
                      />
                    </Link>
                    <div className="case-study__card-body">
                      <div className="case-study__card-top">
                        <h3 className="case-study__card-title">
                          <Link href={card.href}>{card.title}</Link>
                        </h3>
                        <p className="case-study__card-meta">{card.meta}</p>
                        <p className="case-study__card-excerpt">{card.excerpt}</p>
                      </div>
                      <div className="case-study__card-tags">
                        <span className="case-study__tag">{card.tag}</span>
                      </div>
                      <Link className="inline-flex w-fit items-center leading-[1.5] rounded-full bg-[linear-gradient(90deg,#1E64AA_0%,#2578CA_45%,#5498DB_100%)] px-3.5 py-2 text-[14px] font-medium text-white transition-[filter] hover:brightness-110 mt-auto self-start !text-white" href={card.href}>
                        Read More <ChevronsRight aria-hidden className="ml-1 size-3.5 self-center" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </article>
  );
}
