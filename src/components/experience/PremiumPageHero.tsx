import Image from "next/image";
import Link from "next/link";
import { CONSULT_URL } from "@/lib/site";

export function PremiumPageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative premium-page-hero overflow-hidden min-h-[42vh] flex items-end">
      {imageSrc ? (
        <>
          <Image src={imageSrc} alt={imageAlt || title} fill className="object-cover opacity-50" sizes="100vw" priority />
          <div className="premium-hero-scrim" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1614] to-black" />
      )}
      <div className="container relative z-10 py-20 md:py-24">
        <Link href="/" className="premium-breadcrumb">
          ← Home
        </Link>
        <h1 className="premium-page-title">{title}</h1>
        {subtitle ? <p className="premium-page-subtitle">{subtitle}</p> : null}
        <div className="flex flex-wrap gap-3 mt-8">
          <a href={CONSULT_URL} className="btn btn-primary premium-btn-glow" target="_blank" rel="noreferrer">
            Free virtual consult
          </a>
          <Link href="/#procedures" className="btn btn-outline !border-white/30 !text-white">
            View all procedures
          </Link>
        </div>
      </div>
    </section>
  );
}
