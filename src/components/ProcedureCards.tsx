import Link from "next/link";

type Card = {
  title: string;
  description: string;
  href: string;
};

function excerpt(text: string, max = 160) {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

export function ProcedureCards({
  title = "Related procedures",
  cards,
  variant = "default",
}: {
  title?: string;
  cards: Card[];
  variant?: "default" | "premium-related";
}) {
  if (!cards.length) return null;

  const seen = new Set<string>();
  const unique = cards.filter((card) => {
    const key = card.title.toLowerCase();
    if (seen.has(key)) return false;
    if (key.includes("★")) return false;
    seen.add(key);
    return true;
  });

  if (variant === "premium-related") {
    return (
      <section className="related-procedures" aria-labelledby="related-procedures-heading">
        <header className="related-procedures-header">
          <p className="premium-eyebrow">Continue exploring</p>
          <h2 id="related-procedures-heading" className="related-procedures-title">
            {title}
          </h2>
          <p className="related-procedures-lead">
            Review complementary procedures and patient resources that often align with your goals.
          </p>
        </header>
        <ul className="related-procedures-grid">
          {unique.map((card) => (
            <li key={`${card.href}-${card.title}`}>
              <article className="related-procedures-card">
                <h3 className="related-procedures-card-title">
                  <Link href={card.href}>{card.title}</Link>
                </h3>
                <p className="related-procedures-card-body">{excerpt(card.description, 200)}</p>
                <Link href={card.href} className="related-procedures-card-cta">
                  View details
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="section section-black">
      <div className="container">
        {title ? <h2 className="section-title">{title}</h2> : null}
        <div className="feature-grid">
          {unique.map((card) => (
            <Link key={`${card.href}-${card.title}`} href={card.href} className="feature-card group">
              <h4 className="feature-card-title feature-card-title--white group-hover:text-[var(--color-accent)] transition-colors">
                {card.title}
              </h4>
              <p className="feature-card-body">{card.description}</p>
              <span className="inline-block mt-3 text-xs uppercase tracking-[0.12em] font-semibold text-[var(--color-accent)] font-ui">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
