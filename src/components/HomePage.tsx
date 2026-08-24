import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { RichText } from "@/components/RichText";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";
import {
  homeAbout,
  homeDifference,
  homeWhyChoose,
  homeProcedures,
  homeTravel,
} from "@/content/home-sections";
import { CONTACT_URL } from "@/lib/site";
import type { PageContent } from "@/lib/content";

export function HomePage({ page }: { page: PageContent }) {
  const subtitle =
    "Lipo 360, Tummy Tuck, Breast Procedures, Arm and Thigh Liposuction, and Male Body Sculpting.";

  return (
    <>
      <Hero
        title={page.h1}
        subtitle={subtitle}
        imageSrc="/images/shutterstock_99994967_801684509466.JPG"
        imageAlt="Cosmetic surgery guidance in Tampa Bay"
        brandFirst
      />

      {/* About */}
      <section className="section section-black">
        <div className="container">
          <h2 className="section-title">{homeAbout.title}</h2>
          <div className="about-split">
            <div className="about-media">
              <Image
                src={homeAbout.image.src}
                alt={homeAbout.image.alt}
                width={640}
                height={640}
                className="about-image"
              />
            </div>
            <div className="about-copy">
              <h4 className="about-subtitle">{homeAbout.subtitle}</h4>
              {homeAbout.paragraphs.map((p) => (
                <RichText key={p.text.slice(0, 40)} text={p.text} links={p.links} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Difference */}
      <section className="section section-black">
        <div className="container">
          <h2 className="section-title section-title-light">{homeDifference.title}</h2>
          <h3 className="section-kicker">{homeDifference.introTitle}</h3>
          <p className="difference-intro">{homeDifference.intro}</p>
          <div className="text-center mt-8 mb-10">
            <a href={CONTACT_URL} className="btn btn-primary" target="_blank" rel="noreferrer">
              Contact us
            </a>
          </div>
          <div className="feature-grid feature-grid--difference">
            {homeDifference.columns.map((col) => (
              <article key={col.title} className="feature-card">
                <h3 className="feature-card-title feature-card-title--accent">{col.title}</h3>
                <p className="feature-card-body">{col.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid
        title={homeWhyChoose.title}
        items={homeWhyChoose.items}
        cardTitleTone="white"
        cardHeadingLevel="h4"
      />

      {/* Popular procedures */}
      <section className="section section-black">
        <div className="container">
          <h2 className="section-title">{homeProcedures.title}</h2>
          <div className="procedure-grid">
            {homeProcedures.items.map((item) => (
              <article key={item.title} className="procedure-card">
                <h4 className="procedure-card-title">{item.title}</h4>
                <Link href={item.href} className="procedure-card-media">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={640}
                    height={480}
                    className="procedure-card-image"
                  />
                </Link>
                <div className="procedure-card-body">
                  <RichText text={item.body} links={item.links} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {page.testimonials.length > 0 ? <Testimonials items={page.testimonials} /> : null}

      {/* Travel */}
      <section className="section section-black">
        <div className="container">
          <h2 className="section-title">{homeTravel.title}</h2>
          <div className="about-split">
            <div className="about-copy">
              <h4 className="about-subtitle">{homeTravel.subtitle}</h4>
              <RichText text={homeTravel.body} />
              <p className="mt-4 mb-2 text-[var(--color-heading-soft)]">We provide guidance on:</p>
              <ul className="travel-list">
                {homeTravel.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="about-media">
              <Image
                src={homeTravel.image}
                alt="Travel to Tampa Bay for cosmetic surgery"
                width={720}
                height={540}
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
