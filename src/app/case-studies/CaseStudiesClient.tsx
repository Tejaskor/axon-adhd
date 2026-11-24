"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { caseStudies, caseStudiesPage } from "@/content/case-studies";

function norm(str: string | null | undefined): string {
  let s = str == null ? "" : String(str);
  if (typeof s.normalize === "function") {
    s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  return s
    .replace(/[\u2018\u2019\u02BC\u2032]/g, "'")
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/\u00A0/g, " ")
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSegments(text: string, query: string): { isMatch: boolean; text: string }[] {
  const rawTokens = query.trim().split(/\s+/).filter(Boolean);
  if (!rawTokens.length) return [{ isMatch: false, text }];

  const parts = rawTokens.map((t) =>
    t
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/'/g, "['\u2018\u2019]")
      .replace(/-/g, "[-\u2010-\u2015\u2212]")
  );

  try {
    const re = new RegExp(`(${parts.join("|")})`, "gi");
    const pieces = text.split(re);
    return pieces.map((piece) => {
      const isMatch = re.test(piece);
      re.lastIndex = 0;
      return { isMatch, text: piece };
    });
  } catch {
    return [{ isMatch: false, text }];
  }
}

function HighlightText({ text, query }: { text: string; query: string }) {
  const segments = getSegments(text, query);
  return (
    <>
      {segments.map((seg, index) =>
        seg.isMatch ? (
          <mark key={index} className="cs-hl">
            {seg.text}
          </mark>
        ) : (
          seg.text
        )
      )}
    </>
  );
}

export function CaseStudiesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const indexedCards = useMemo(() => {
    return caseStudies.map((cs) => {
      const haystackText = [
        cs.title,
        cs.excerpt,
        cs.dataExcerpt || "",
        cs.keywords || "",
        cs.category || "",
        cs.rawDate || "",
        cs.date,
        cs.time,
        "Aaron Dodini",
      ].join(" ");

      return {
        ...cs,
        haystack: norm(haystackText),
      };
    });
  }, []);

  const normQuery = norm(searchQuery);
  const tokens = useMemo(
    () => (normQuery ? normQuery.split(" ").filter(Boolean) : []),
    [normQuery]
  );

  const visibleCards = useMemo(() => {
    if (!tokens.length) return indexedCards;
    return indexedCards.filter((card) =>
      tokens.every((token) => card.haystack.includes(token))
    );
  }, [indexedCards, tokens]);

  return (
    <div className="cs-wrap">
      {/* Hero Section */}
      <section className="cs-hero-section">
        <div className="cs-hero-inner">
          <h1 className="type-h1 m-0 text-balance text-navy">
            ADHD Case Studies: <span className="text-primary">Real Adult Diagnosis Stories</span>
          </h1>
          <p className="cs-hero-sub">Stories of Strategic Impact</p>

          {/* Search Box */}
          <div className="cs-search">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                inputRef.current?.blur();
              }}
              className="cs-search-field"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                id="csSearchInput"
                placeholder="Search case studies..."
                autoComplete="off"
                aria-label="Search case studies"
                enterKeyHint="done"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    inputRef.current?.blur();
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    setSearchQuery("");
                  }
                }}
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  id="csSearchClear"
                  className="cs-search-clear"
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchQuery("");
                    inputRef.current?.focus();
                  }}
                >
                  &times;
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="cs-grid-section">
        <div className="cs-container">
          {visibleCards.length === 0 ? (
            <p className="cs-empty" id="csEmptyMessage">
              {searchQuery.trim()
                ? `No case studies match \u201C${searchQuery.trim()}\u201D`
                : "No Case Studies Found"}
            </p>
          ) : (
            <div className="cs-grid" id="csGrid">
              {visibleCards.map((cs) => {
                const href = cs.localHref || `${caseStudiesPage.baseUrl}${cs.slug}/`;
                return (
                  <article
                    key={cs.slug}
                    className="cs-card"
                    data-title={cs.title}
                    data-excerpt={cs.dataExcerpt || cs.excerpt}
                    data-keywords={cs.keywords}
                    data-category={cs.category}
                    data-date={cs.rawDate}
                  >
                    <Link
                      className="cs-card-img"
                      href={href}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Image
                        src={cs.image.src}
                        alt={cs.image.alt || cs.title}
                        width={cs.image.width}
                        height={cs.image.height}
                        loading="lazy"
                        sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 420px"
                      />
                    </Link>
                    <div className="cs-card-body">
                      <h3 className="cs-card-title">
                        <Link href={href}>
                          <HighlightText text={cs.title} query={searchQuery} />
                        </Link>
                      </h3>
                      <p className="cs-card-meta">
                        Aaron Dodini | {cs.date} | {cs.time}
                      </p>
                      <p className="cs-card-excerpt">
                        <HighlightText text={cs.excerpt} query={searchQuery} />
                      </p>
                      <Link href={href} className="inline-flex w-fit items-center leading-[1.5] rounded-full bg-[linear-gradient(90deg,#1E64AA_0%,#2578CA_45%,#5498DB_100%)] px-3.5 py-2 text-[14px] font-medium text-white transition-[filter] hover:brightness-110 mt-auto self-start !text-white">
                        Read More <ChevronsRight aria-hidden className="ml-1 size-3.5 self-center" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
