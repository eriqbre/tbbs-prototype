import Link from "next/link";
import { siteConfig } from "@/lib/site";

const resourceLinks = [
  { label: "Financing Options", href: "/financing-options" },
  { label: "Travel Information", href: "/travel-information" },
  { label: "Recovery Guides", href: "/recovery-guides" },
  { label: "Out-of-Town Patient Guide", href: "/out-of-town-patient-guide" },
  { label: "FAQs", href: "/faqs" },
];

const procedureLinks = [
  { label: "Lipo 360", href: "/liposuction-360" },
  { label: "Tummy Tuck", href: "/tummy-tuck" },
  { label: "Breast Augmentation", href: "/breast-augmentation" },
  { label: "Brazilian Butt Lift", href: "/brazilian-butt-lift-bbl" },
  { label: "Male Body Contouring", href: "/men" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-[var(--color-border)]">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <p
            className="text-xl mb-3 uppercase tracking-[0.06em] text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {siteConfig.brand}
          </p>
          <p className="text-sm text-white/65 mb-4">
            Personalized cosmetic surgery guidance across Tampa Bay and beyond.
          </p>
          <a href={siteConfig.phoneHref} className="block font-semibold mb-2 text-white">
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="block text-sm text-white/75 hover:text-[var(--color-accent)]">
            {siteConfig.email}
          </a>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.12em] text-[var(--color-accent)] mb-3">Procedures</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {procedureLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--color-accent)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.12em] text-[var(--color-accent)] mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--color-accent)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.12em] text-[var(--color-accent)] mb-3">Connect</h3>
          <div className="flex flex-col gap-3 text-sm">
            <a href={siteConfig.consultUrl} className="btn btn-primary !text-xs w-fit" target="_blank" rel="noreferrer">
              Start a consultation
            </a>
            <a href={siteConfig.paymentUrl} className="text-white/75 hover:text-[var(--color-accent)]" target="_blank" rel="noreferrer">
              Make a payment
            </a>
            <a href={siteConfig.social.instagram} className="text-white/75 hover:text-[var(--color-accent)]" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={siteConfig.social.facebook} className="text-white/75 hover:text-[var(--color-accent)]" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)]">
        <div className="container py-4 text-xs text-white/45 flex flex-col sm:flex-row gap-2 sm:justify-between">
          <span>Copyright © {new Date().getFullYear()} Tampa Bay Body Sculpting — All Rights Reserved.</span>
          <span>Prototype recreation for development.</span>
        </div>
      </div>
    </footer>
  );
}
