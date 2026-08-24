import Link from "next/link";
import type { ReactNode } from "react";

export function RichText({
  text,
  links = [],
  className = "",
}: {
  text: string;
  links?: { href: string; text: string }[];
  className?: string;
}) {
  if (!links.length) {
    return <p className={`rich-text ${className}`.trim()}>{text}</p>;
  }

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
        <a key={`a-${key++}`} href={href} className="inline-link" target="_blank" rel="noreferrer">
          {matched}
        </a>
      );
    } else {
      parts.push(
        <Link key={`a-${key++}`} href={href} className="inline-link">
          {matched}
        </Link>
      );
    }
    remaining = remaining.slice(idx + link.text.length);
  }
  if (remaining) parts.push(<span key={`t-${key++}`}>{remaining}</span>);

  return <p className={`rich-text ${className}`.trim()}>{parts}</p>;
}
