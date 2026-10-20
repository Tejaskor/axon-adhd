import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type { Block } from "@/content/types";
import { isExternal, slugify } from "@/lib/utils";

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

/** Renders the inline syntax used in content files: `**bold**` and `[label](href)`. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          return isExternal(href) ? (
            <a key={i} href={href}>
              {label.trim()}
            </a>
          ) : (
            <Link key={i} href={href}>
              {label.trim()}
            </Link>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Renders a list of content blocks. Headings get stable ids for tables of contents. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i): ReactNode => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} id={slugify(block.text)}>
                <Inline text={block.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={slugify(block.text)}>
                <Inline text={block.text} />
              </h3>
            );
          case "h4":
            return (
              <h4 key={i}>
                <Inline text={block.text} />
              </h4>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "q":
            return (
              <p key={i}>
                <strong>
                  <Inline text={block.text} />
                </strong>
              </p>
            );
          default:
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
        }
      })}
    </>
  );
}
