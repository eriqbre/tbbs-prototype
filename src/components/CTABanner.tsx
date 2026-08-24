import { CONSULT_URL, siteConfig } from "@/lib/site";

export function CTABanner({
  title = "Your Cosmetic Surgery Journey Starts Here",
  body = "Schedule your complimentary virtual consultation and discover the personalized, concierge experience that sets Tampa Bay Body Sculpting apart.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="section section-accent">
      <div className="container flex flex-col items-center text-center gap-5">
        <div className="max-w-3xl">
          <h2 className="section-title !mb-3">{title}</h2>
          <p className="section-lead mx-auto">{body}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={CONSULT_URL} className="btn btn-dark" target="_blank" rel="noreferrer">
            Start a consultation
          </a>
          <a href={siteConfig.phoneHref} className="btn btn-outline !border-black/40 !text-[var(--color-on-accent)]">
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
