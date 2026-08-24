import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  localSrc?: string;
};

function resolveSrc(img: GalleryImage) {
  return img.localSrc || img.src;
}

function captionFromAlt(alt: string, index: number) {
  const cleaned = alt.replace(/\s+/g, " ").trim();
  if (cleaned.length > 12) return cleaned;
  return `Body contouring results — patient case ${index + 1}`;
}

function usableImages(images: GalleryImage[]) {
  return images
    .map((img) => ({ ...img, src: resolveSrc(img) }))
    .filter((img) => img.src && !img.src.startsWith("data:") && img.src.includes("/images/"));
}

function SplitHalf({
  src,
  alt,
  side,
}: {
  src: string;
  alt: string;
  side: "before" | "after";
}) {
  const positionClass = side === "before" ? "ba-split-img--before" : "ba-split-img--after";
  const label = side === "before" ? "Before" : "After";

  return (
    <figure className={`ba-panel ba-panel--${side}`}>
      <span className="ba-tag">{label}</span>
      <div className="ba-panel-frame">
        {/* Native img for precise 50% crop of composite side-by-side assets */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={`${label}: ${alt}`} className={`ba-split-img ${positionClass}`} loading="lazy" />
      </div>
    </figure>
  );
}

export function BeforeAfterGallery({
  title = "Before & after gallery",
  intro,
  images,
}: {
  title?: string;
  intro?: string;
  images: GalleryImage[];
}) {
  const items = usableImages(images);
  if (items.length < 1) return null;

  return (
    <section className="ba-gallery" aria-labelledby="ba-gallery-heading">
      <div className="container">
        <header className="ba-gallery-header">
          <p className="ba-eyebrow">Patient results</p>
          <h2 id="ba-gallery-heading" className="ba-gallery-title">
            {title}
          </h2>
          {intro ? <p className="ba-gallery-intro">{intro}</p> : null}
          <p className="ba-gallery-disclaimer">
            Individual results vary. Photos represent real patients; outcomes depend on anatomy, procedure plan, and
            recovery.
          </p>
        </header>

        <ul className="ba-gallery-cases">
          {items.map((img, idx) => (
            <li key={`${img.src}-${idx}`} className="ba-case">
              <div className="ba-case-header">
                <span className="ba-case-index">Case {String(idx + 1).padStart(2, "0")}</span>
              </div>
              <div className="ba-case-pair">
                <SplitHalf src={img.src} alt={img.alt || "Body contouring"} side="before" />
                <div className="ba-case-divider" aria-hidden />
                <SplitHalf src={img.src} alt={img.alt || "Body contouring"} side="after" />
              </div>
              <p className="ba-case-caption">{captionFromAlt(img.alt, idx)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
