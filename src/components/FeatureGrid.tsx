type FeatureItem = {
  title: string;
  body: string;
};

export function FeatureGrid({
  title,
  items,
  sectionTitleTone = "accent",
  cardTitleTone = "white",
  cardHeadingLevel = "h3",
}: {
  title?: string;
  items: FeatureItem[];
  sectionTitleTone?: "accent" | "white" | "light";
  cardTitleTone?: "accent" | "white";
  cardHeadingLevel?: "h3" | "h4";
}) {
  if (!items.length) return null;

  const cardTitleClass =
    cardTitleTone === "accent" ? "feature-card-title--accent" : "feature-card-title--white";

  const CardHeading = cardHeadingLevel;

  const sectionClass =
    sectionTitleTone === "white"
      ? "section-title-white"
      : sectionTitleTone === "light"
        ? "section-title-light"
        : "";

  return (
    <section className="section section-black">
      <div className="container">
        {title ? (
          <h2 className={`section-title ${sectionClass}`.trim()}>{title}</h2>
        ) : null}
        <div className="feature-grid">
          {items.map((item) => (
            <article key={item.title} className="feature-card">
              <CardHeading className={`feature-card-title ${cardTitleClass}`}>{item.title}</CardHeading>
              <p className="feature-card-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
