import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  localSrc?: string;
};

export function GalleryGrid({
  title = "Gallery",
  images,
}: {
  title?: string;
  images: GalleryImage[];
}) {
  const usable = images
    .map((img) => ({ ...img, src: img.localSrc || img.src }))
    .filter((img) => img.src && !img.src.startsWith("data:") && img.src.includes("/images/"));

  if (usable.length < 2) return null;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          {usable.slice(0, 12).map((img, idx) => (
            <div key={`${img.src}-${idx}`} className="relative aspect-[4/5] overflow-hidden bg-black">
              <Image
                src={img.src}
                alt={img.alt || `Gallery image ${idx + 1}`}
                fill
                className="object-cover grayscale transition duration-500 hover:scale-105 hover:grayscale-0"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
