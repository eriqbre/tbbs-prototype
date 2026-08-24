import Link from "next/link";
import type { ReactNode } from "react";
import type { ContentBlock, ContentSection } from "@/lib/content";
import { FeatureGrid } from "@/components/FeatureGrid";

function renderLinkedText(text: string, links?: { href: string; text: string }[]) {
  if (!links?.length) return text;

  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  for (const link of links) {
    const idx = remaining.toLowerCase().indexOf(link.text.toLowerCase());
    if (idx === -1) continue;
    if (idx > 0) parts.push(<span key={`t-${key++}`}>{remaining.slice(0, idx)}</span>);
    const matched = remaining.slice(idx, idx + link.text.length);
    const href = link.href;
    if (href.startsWith("http")) {
      parts.push(
        <a key={`a-${key++}`} href={href} target="_blank" rel="noreferrer">
          {matched}
        </a>
      );
    } else {
      parts.push(
        <Link key={`a-${key++}`} href={href}>
          {matched}
        </Link>
      );
    }
    remaining = remaining.slice(idx + link.text.length);
  }
  if (remaining) parts.push(<span key={`t-${key++}`}>{remaining}</span>);
  return parts.length ? parts : text;
}

function Block({ block }: { block: ContentBlock }) {
  if (block.type === "h3") {
    return <h3 className="mt-4">{block.text}</h3>;
  }
  if (block.type === "h4") {
    return <h4 className="mt-3">{block.text}</h4>;
  }
  if (block.type === "list") {
    const ListTag = block.ordered ? "ol" : "ul";
    return (
      <ListTag className={block.ordered ? "list-decimal pl-5 space-y-1" : "list-disc pl-5 space-y-1"}>
        {block.items.map((item, idx) => (
          <li key={`${idx}-${item.slice(0, 24)}`}>{item}</li>
        ))}
      </ListTag>
    );
  }
  return <p>{renderLinkedText(block.text, block.links)}</p>;
}

/** Pair heading blocks with following paragraphs into feature cards when scrape order is messy. */
function extractFeatureItems(blocks: ContentBlock[]): { title: string; body: string }[] | null {
  const headings = blocks.filter((b) => b.type === "h3" || b.type === "h4");
  const paragraphs = blocks.filter((b) => b.type === "p");

  if (headings.length < 3 || paragraphs.length < 2) return null;

  // Ideal case: h, p, h, p...
  const interleaved: { title: string; body: string }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if ((b.type === "h3" || b.type === "h4") && blocks[i + 1]?.type === "p") {
      const p = blocks[i + 1];
      if (p.type === "p") {
        interleaved.push({ title: b.text, body: p.text });
      }
    }
  }
  if (interleaved.length >= 3) return interleaved;

  // Broken scrape order: all headings then paragraphs (or mixed clusters)
  // Use known pairing heuristics by index when counts are close
  if (headings.length >= 3 && paragraphs.length >= 3) {
    const count = Math.min(headings.length, paragraphs.length);
    // For "why choose" style: titles often appear in DOM before bodies in wrong order.
    // Prefer matching by unique content keywords when possible.
    const usedP = new Set<number>();
    const paired: { title: string; body: string }[] = [];

    const keywordMap: Record<string, string[]> = {
      "personalized treatment": ["tailored", "anatomy", "lifestyle"],
      "trusted cosmetic": ["experienced", "providers", "safety", "natural-looking"],
      "complimentary virtual": ["comfort of your home", "personalized consultation"],
      "transparent pricing": ["financing", "no hidden", "clear procedure"],
      "patient concierge": ["before, during, and after", "coordinate"],
      "serving tampa": ["travel from", "across the country", "throughout florida"],
      "personalized care": ["every cosmetic surgery journey", "understand your goals"],
      "concierge experience": ["stress-free", "transparent pricing, financing"],
    };

    for (const h of headings) {
      const key = Object.keys(keywordMap).find((k) => h.text.toLowerCase().includes(k));
      let bodyIdx = -1;
      if (key) {
        bodyIdx = paragraphs.findIndex(
          (p, idx) =>
            !usedP.has(idx) &&
            p.type === "p" &&
            keywordMap[key].some((kw) => p.text.toLowerCase().includes(kw))
        );
      }
      if (bodyIdx === -1) {
        bodyIdx = paragraphs.findIndex((_, idx) => !usedP.has(idx));
      }
      if (bodyIdx >= 0) {
        const p = paragraphs[bodyIdx];
        if (p.type === "p") {
          usedP.add(bodyIdx);
          paired.push({ title: h.text, body: p.text });
        }
      }
    }

    if (paired.length >= 3) return paired.slice(0, count);
  }

  return null;
}

const SKIP_HEADINGS = new Set([
  "contact us",
  "make a payment",
  "connect with us",
  "subscribe",
  "our blogs",
]);

export function ContentSections({
  sections,
}: {
  sections: ContentSection[];
  startIndex?: number;
}) {
  const filtered = sections.filter((section) => {
    if (!section.heading) return section.blocks.length > 0;
    return !SKIP_HEADINGS.has(section.heading.toLowerCase());
  });

  return (
    <>
      {filtered.map((section, idx) => {
        const features = extractFeatureItems(section.blocks);
        const heading = section.heading || "";
        const isFeatureSection =
          features &&
          (heading.toLowerCase().includes("why") ||
            heading.toLowerCase().includes("difference") ||
            heading.toLowerCase().includes("choose") ||
            features.length >= 3);

        if (isFeatureSection && features) {
          const cardTitleTone = heading.toLowerCase().includes("difference") ? "accent" : "white";
          const sectionTitleTone = heading.toLowerCase().includes("difference") ? "light" : "accent";
          return (
            <FeatureGrid
              key={`${heading}-${idx}`}
              title={heading || undefined}
              items={features}
              cardTitleTone={cardTitleTone}
              sectionTitleTone={sectionTitleTone}
              cardHeadingLevel={cardTitleTone === "white" ? "h4" : "h3"}
            />
          );
        }

        return (
          <section key={`${heading || "section"}-${idx}`} className="section section-black">
            <div className="container">
              {heading ? <h2 className="section-title">{heading}</h2> : null}
              <div className="prose-block">
                {section.blocks.map((block, bIdx) => (
                  <Block key={`${block.type}-${bIdx}`} block={block} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
