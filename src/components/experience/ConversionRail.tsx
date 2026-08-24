import Link from "next/link";
import { CONSULT_URL, siteConfig } from "@/lib/site";

export function ConversionRail({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={`premium-rail ${compact ? "premium-rail--compact" : ""}`}
      aria-label="Schedule a consultation"
    >
      <div className="premium-rail-inner">
        <p className="premium-rail-kicker">Next step</p>
        <h3 className="premium-rail-title">Your transformation starts with a conversation</h3>
        <p className="premium-rail-body">
          Complimentary virtual consult. Personalized recommendations. Transparent guidance—no pressure.
        </p>
        <a href={CONSULT_URL} className="btn btn-primary w-full !py-3.5" target="_blank" rel="noreferrer">
          Start free consultation
        </a>
        <a href={siteConfig.phoneHref} className="btn btn-outline w-full !py-3 !border-white/20 !text-white mt-2">
          {siteConfig.phone}
        </a>
        <ul className="premium-rail-list">
          <li>Board-certified surgeon network</li>
          <li>Financing & travel support</li>
          <li>Serving Tampa Bay & out-of-town patients</li>
        </ul>
        <Link href="/faqs" className="premium-rail-link">
          Read FAQs →
        </Link>
      </div>
    </aside>
  );
}
