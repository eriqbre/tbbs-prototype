import { PremiumPageHero } from "@/components/experience/PremiumPageHero";
import { ConversionRail } from "@/components/experience/ConversionRail";
import { ContentSections } from "@/components/ContentSections";
import { ProcedureCards } from "@/components/ProcedureCards";
import { Testimonials } from "@/components/Testimonials";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { GalleryGrid } from "@/components/GalleryGrid";
import { FaqAccordion } from "@/components/FaqAccordion";
import { imageSrc, type PageContent } from "@/lib/content";
import { CONSULT_URL } from "@/lib/site";

function pickRelatedCards(
  cards: { title: string; description: string; href: string }[],
  pagePath: string
) {
  const filtered = cards.filter((c) => c.href && c.href !== "#" && !c.title.includes("★"));
  const seenHref = new Set<string>();
  const seenTitle = new Set<string>();

  const scored = filtered
    .map((card) => {
      const pathOnly = card.href.split("#")[0].split("?")[0];
      const isOffPage = pathOnly !== pagePath && pathOnly !== "";
      const isHashOnly = card.href.includes("#") && pathOnly === pagePath;
      return { card, pathOnly, isOffPage, isHashOnly };
    })
    .filter(({ isHashOnly, card }) => {
      if (isHashOnly) return false;
      const titleKey = card.title.toLowerCase();
      if (seenTitle.has(titleKey)) return false;
      seenTitle.add(titleKey);
      return true;
    })
    .sort((a, b) => Number(b.isOffPage) - Number(a.isOffPage));

  const out: typeof filtered = [];
  for (const { card, pathOnly } of scored) {
    const key = pathOnly || card.href;
    if (seenHref.has(key) && !card.href.includes("#")) continue;
    seenHref.add(key);
    out.push(card);
    if (out.length >= 6) break;
  }
  return out;
}

function getSubtitle(page: PageContent): string | undefined {
  const first = page.sections[0];
  if (!first) return page.description;
  const p = first.blocks.find((b) => b.type === "p");
  if (p && p.type === "p") return p.text;
  return page.description;
}

export function PremiumPageView({ page }: { page: PageContent }) {
  const isFemaleBaGallery = page.slug === "female-b-a-gallery";
  const isGallery =
    page.slug.includes("gallery") ||
    isFemaleBaGallery ||
    page.slug === "male-surgery-gallery" ||
    page.slug === "breast-surgery-gallery";

  const subtitle = getSubtitle(page);
  const heroImage = imageSrc(page.hero);

  const sections = [...page.sections];
  if (sections[0] && !sections[0].heading) {
    const blocks = sections[0].blocks.filter((b) => !(b.type === "p" && b.text === subtitle));
    sections[0] = { ...sections[0], blocks };
    if (!sections[0].blocks.length) sections.shift();
  }

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
  let contentSections =
    faqs.length > 0
      ? sections.filter((s) => !(s.heading || "").toLowerCase().includes("faq"))
      : sections;

  if (isFemaleBaGallery) {
    contentSections = contentSections.filter(
      (s) => !(s.heading || "").toLowerCase().includes("before and after")
    );
  }

  const gallerySectionHeading =
    sections.find((s) => (s.heading || "").toLowerCase().includes("before and after"))?.heading ??
    "Female body sculpting — before & after";

  return (
    <>
      <PremiumPageHero
        title={page.h1}
        subtitle={page.description}
        imageSrc={heroImage}
        imageAlt={page.hero?.alt || page.h1}
      />

      {isFemaleBaGallery ? (
        <BeforeAfterGallery title={gallerySectionHeading} intro={page.description} images={page.images} />
      ) : null}

      <div className="container premium-page-layout pb-24">
        <div className="premium-page-main">
          <ContentSections sections={contentSections} />

          {page.cards.length > 0 ? (
            <ProcedureCards
              title="Related procedures & resources"
              variant="premium-related"
              cards={pickRelatedCards(page.cards, page.path)}
            />
          ) : null}

          {faqs.length > 0 ? <FaqAccordion items={faqs} /> : null}

          {inlineTestimonials.length > 0 ? <Testimonials items={inlineTestimonials} /> : null}

          {!isFemaleBaGallery && (isGallery || page.images.length > 4) ? (
            <GalleryGrid title={isGallery ? page.h1 : "Before & after inspiration"} images={page.images} />
          ) : null}

          <section className="premium-inline-cta mt-12">
            <h2 className="premium-section-title">Questions about {page.h1.split("|")[0].trim()}?</h2>
            <p className="premium-section-intro mt-2">
              Speak with our concierge team in a complimentary virtual consultation—no obligation.
            </p>
            <a href={CONSULT_URL} className="btn btn-primary mt-6 premium-btn-glow" target="_blank" rel="noreferrer">
              Book your free consult
            </a>
          </section>
        </div>
        <ConversionRail />
      </div>
    </>
  );
}
