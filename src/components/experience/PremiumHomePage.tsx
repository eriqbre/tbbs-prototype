"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@/components/RichText";
import { Testimonials } from "@/components/Testimonials";
import { homeAbout, homeProcedures, homeTravel } from "@/content/home-sections";
import {
  trustSignals,
  conciergeSteps,
  procedureCategories,
  homeDifference,
  homeWhyChoose,
  type ProcedureCategoryId,
} from "@/content/premium-home";
import { CONSULT_URL, CONTACT_URL } from "@/lib/site";
import type { PageContent } from "@/lib/content";

const categoryMap: Record<string, ProcedureCategoryId> = {
  "Lipo 360": "body",
  "Tummy Tuck": "body",
  "Brazilian Butt Lift": "body",
  "Chin & Neck Liposuction": "face",
  "Breast Augmentation": "breast",
  "Male Body Sculpting": "men",
};

function procedureCategory(title: string): ProcedureCategoryId {
  return categoryMap[title] ?? "body";
}

export function PremiumHomePage({ page }: { page: PageContent }) {
  const [filter, setFilter] = useState<ProcedureCategoryId>("all");

  const filteredProcedures = useMemo(() => {
    if (filter === "all") return homeProcedures.items;
    return homeProcedures.items.filter((p) => procedureCategory(p.title) === filter);
  }, [filter]);

  const featuredQuote =
    page.testimonials[0] ??
    "The team made cosmetic surgery feel manageable—from my first virtual consult through recovery.";

  return (
    <div className="premium-home pb-24">
      {/* Hero */}
      <section className="premium-hero">
        <div className="premium-hero-media">
          <Image
            src="/images/shutterstock_99994967_801684509466.JPG"
            alt="Cosmetic surgery guidance in Tampa Bay"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="premium-hero-scrim" />
        </div>
        <div className="container premium-hero-content">
          <div className="premium-hero-copy">
            <p className="premium-eyebrow">Tampa Bay · Concierge cosmetic surgery guidance</p>
            <h1 className="premium-hero-title">
              Confidence isn&apos;t one procedure.
              <span className="premium-hero-accent"> It&apos;s the right plan.</span>
            </h1>
            <p className="premium-hero-lead">
              Lipo 360, tummy tuck, breast surgery, and male body sculpting—with a team that guides you
              from complimentary consult through recovery.
            </p>
            <div className="premium-hero-cta">
              <a href={CONSULT_URL} className="btn btn-primary premium-btn-glow" target="_blank" rel="noreferrer">
                Book free virtual consult
              </a>
              <Link href="/liposuction-360" className="btn btn-outline !border-white/30 !text-white">
                Explore procedures
              </Link>
            </div>
          </div>
          <blockquote className="premium-hero-quote">
            <p>&ldquo;{featuredQuote}&rdquo;</p>
            <footer>— Tampa Bay Body Sculpting patient</footer>
          </blockquote>
        </div>
      </section>

      {/* Trust strip */}
      <section className="premium-trust" aria-label="Why patients trust us">
        <div className="container premium-trust-grid">
          {trustSignals.map((item) => (
            <div key={item.label} className="premium-trust-item">
              <p className="premium-trust-label">{item.label}</p>
              <p className="premium-trust-detail">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="premium-section">
        <div className="container premium-split">
          <div className="premium-split-media">
            <Image
              src={homeAbout.image.src}
              alt={homeAbout.image.alt}
              width={720}
              height={720}
              className="premium-split-image"
            />
          </div>
          <div>
            <p className="premium-eyebrow">{homeAbout.title}</p>
            <h2 className="premium-section-title">{homeAbout.subtitle}</h2>
            <div className="premium-prose stack-4 mt-6">
              {homeAbout.paragraphs.map((p) => (
                <RichText key={p.text.slice(0, 48)} text={p.text} links={p.links} />
              ))}
            </div>
            <a href={CONTACT_URL} className="inline-link mt-6 inline-block font-ui text-sm uppercase tracking-wider" target="_blank" rel="noreferrer">
              Contact our team →
            </a>
          </div>
        </div>
      </section>

      {/* Procedures */}
      <section className="premium-section premium-section--soft" id="procedures">
        <div className="container">
          <div className="premium-section-head">
            <div>
              <p className="premium-eyebrow">Procedures</p>
              <h2 className="premium-section-title">{homeProcedures.title}</h2>
            </div>
            <p className="premium-section-intro">
              Filter by what you&apos;re exploring. Every path leads to the same thing: clarity before you commit.
            </p>
          </div>
          <div className="premium-filter" role="tablist" aria-label="Filter procedures">
            {procedureCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={filter === cat.id}
                className={`premium-filter-btn ${filter === cat.id ? "is-active" : ""}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="premium-procedure-grid">
            {filteredProcedures.map((item) => (
              <article key={item.title} className="premium-procedure-card">
                <Link href={item.href} className="premium-procedure-media">
                  <Image src={item.image} alt={item.imageAlt} width={640} height={480} className="premium-procedure-image" />
                </Link>
                <div className="premium-procedure-body">
                  <h3 className="premium-procedure-title">
                    <Link href={item.href}>{item.title}</Link>
                  </h3>
                  <RichText text={item.body} links={item.links} className="!text-left !text-[0.95rem]" />
                  <Link href={item.href} className="premium-card-link">
                    Learn about {item.title} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge journey */}
      <section className="premium-section">
        <div className="container">
          <p className="premium-eyebrow text-center">How it works</p>
          <h2 className="premium-section-title text-center max-w-2xl mx-auto">
            A concierge path from curiosity to consultation
          </h2>
          <ol className="premium-journey">
            {conciergeSteps.map((step) => (
              <li key={step.step} className="premium-journey-step">
                <span className="premium-journey-num">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Difference */}
      <section className="premium-section premium-section--soft">
        <div className="container">
          <p className="premium-eyebrow text-center">{homeDifference.title}</p>
          <h2 className="premium-section-title text-center">{homeDifference.introTitle}</h2>
          <p className="premium-section-intro text-center mx-auto">{homeDifference.intro}</p>
          <div className="premium-bento mt-12">
            {homeDifference.columns.map((col) => (
              <article key={col.title} className="premium-bento-card">
                <h3>{col.title}</h3>
                <p>{col.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="premium-section">
        <div className="container">
          <h2 className="premium-section-title text-center">{homeWhyChoose.title}</h2>
          <div className="premium-benefits">
            {homeWhyChoose.items.map((item) => (
              <div key={item.title} className="premium-benefit">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.testimonials.length > 0 ? (
        <div className="premium-section premium-section--soft">
          <Testimonials items={page.testimonials.slice(0, 6)} />
        </div>
      ) : null}

      {/* Travel */}
      <section className="premium-section">
        <div className="container premium-split premium-split--reverse">
          <div>
            <p className="premium-eyebrow">{homeTravel.subtitle}</p>
            <h2 className="premium-section-title">{homeTravel.title}</h2>
            <RichText text={homeTravel.body} className="mt-4" />
            <ul className="premium-checklist mt-6">
              {homeTravel.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/travel-information" className="btn btn-outline !border-white/25 !text-white">
                Travel information
              </Link>
              <Link href="/out-of-town-patient-guide" className="inline-link self-center">
                Out-of-town guide →
              </Link>
            </div>
          </div>
          <div className="premium-split-media">
            <Image
              src={homeTravel.image}
              alt="Travel to Tampa Bay for cosmetic surgery"
              width={800}
              height={600}
              className="premium-split-image"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="premium-final-cta">
        <div className="container premium-final-inner">
          <h2>Your cosmetic surgery journey starts here</h2>
          <p>
            Schedule your complimentary virtual consultation and discover the personalized, concierge
            experience that sets Tampa Bay Body Sculpting apart.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={CONSULT_URL} className="btn btn-dark !bg-black !text-white !px-8" target="_blank" rel="noreferrer">
              Start consultation
            </a>
            <a href={CONTACT_URL} className="btn btn-outline !border-black/30 !text-black" target="_blank" rel="noreferrer">
              Contact us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
