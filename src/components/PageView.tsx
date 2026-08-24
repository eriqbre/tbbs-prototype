import { Hero } from "@/components/Hero";
import { ContentSections } from "@/components/ContentSections";
import { ProcedureCards } from "@/components/ProcedureCards";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { GalleryGrid } from "@/components/GalleryGrid";
import { FaqAccordion } from "@/components/FaqAccordion";
import { imageSrc, type PageContent } from "@/lib/content";

function getSubtitle(page: PageContent): string | undefined {
  const first = page.sections[0];
  if (!first) return page.description;
  const p = first.blocks.find((b) => b.type === "p");
  if (p && p.type === "p") return p.text;
  return page.description;
}

export function PageView({ page }: { page: PageContent }) {
  const isHome = page.slug === "home";
  const isFemaleBaGallery = page.slug === "female-b-a-gallery";
  const isGallery =
    page.slug.includes("gallery") ||
    isFemaleBaGallery ||
    page.slug === "male-surgery-gallery" ||
    page.slug === "breast-surgery-gallery";

  const subtitle = getSubtitle(page);
  const heroImage = imageSrc(page.hero);

  // Avoid repeating the hero subtitle paragraph in the first content section
  const sections = [...page.sections];
  if (sections[0] && !sections[0].heading) {
    const blocks = sections[0].blocks.filter((b) => !(b.type === "p" && b.text === subtitle));
    sections[0] = { ...sections[0], blocks };
    if (!sections[0].blocks.length) sections.shift();
  }

  // Pull testimonial section out if present
  const testimonialSectionIndex = sections.findIndex((s) =>
    (s.heading || "").toLowerCase().includes("testamonial") ||
    (s.heading || "").toLowerCase().includes("testimonial")
  );
  let inlineTestimonials: string[] = page.testimonials;
  if (testimonialSectionIndex >= 0) {
    const tSection = sections[testimonialSectionIndex];
    const fromBlocks = tSection.blocks
      .filter((b) => b.type === "p")
      .map((b) => (b.type === "p" ? b.text : ""))
      .filter(Boolean);
    if (fromBlocks.length) inlineTestimonials = fromBlocks;
    sections.splice(testimonialSectionIndex, 1);
  }

  const faqs = page.faqs || [];
  // When dedicated FAQ accordion exists, drop dense FAQ prose sections to avoid duplication
  const contentSections =
    faqs.length > 0
      ? sections.filter((s) => !(s.heading || "").toLowerCase().includes("faq"))
      : sections;

  const filteredContentSections = isFemaleBaGallery
    ? contentSections.filter((s) => !(s.heading || "").toLowerCase().includes("before and after"))
    : contentSections;

  const gallerySectionHeading =
    sections.find((s) => (s.heading || "").toLowerCase().includes("before and after"))?.heading ??
    "Female body sculpting — before & after";

  return (
    <>
      <Hero
        title={page.h1}
        subtitle={subtitle}
        imageSrc={heroImage}
        imageAlt={page.hero?.alt || page.h1}
        brandFirst={isHome}
      />

      {isFemaleBaGallery ? (
        <BeforeAfterGallery title={gallerySectionHeading} intro={page.description} images={page.images} />
      ) : null}

      <ContentSections sections={filteredContentSections} />

      {page.cards.length > 0 && !isHome ? (
        <ProcedureCards
          title="Explore Procedures & Resources"
          cards={page.cards.filter((c) => c.href && c.href !== "#" && !c.title.includes("★"))}
        />
      ) : null}

      {faqs.length > 0 ? <FaqAccordion items={faqs} /> : null}

      {inlineTestimonials.length > 0 ? <Testimonials items={inlineTestimonials} /> : null}

      {!isFemaleBaGallery && (isGallery || page.images.length > 4) ? (
        <GalleryGrid
          title={isGallery ? page.h1 : "Before & After Inspiration"}
          images={page.images}
        />
      ) : null}

      <CTABanner />
    </>
  );
}
