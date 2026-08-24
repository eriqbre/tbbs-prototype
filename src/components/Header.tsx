"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

export function Header({ premium = false }: { premium?: boolean }) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={`sticky top-0 z-50 ${premium ? "premium-header" : "bg-black/95 backdrop-blur"}`}>
      <div className="container flex items-center justify-between gap-4 py-3 md:py-4">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)} aria-label={siteConfig.brand}>
          <Image
            src={siteConfig.logo}
            alt={siteConfig.brand}
            width={56}
            height={56}
            className="h-12 w-12 object-contain opacity-90"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex flex-col items-end gap-1">
          <nav className="flex items-center">
            {siteConfig.main.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-[0.72rem] uppercase tracking-[0.14em] font-semibold transition-colors border-b-2 ${
                    isActive(item.href)
                      ? "text-[var(--color-accent)] border-[var(--color-accent)]"
                      : "text-white border-transparent hover:text-[var(--color-accent)]"
                  }`}
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {item.label}
                </Link>
                {item.children && activeMenu === item.label ? (
                  <div className="absolute right-0 top-full min-w-[250px] border border-[var(--color-border)] bg-black py-2 shadow-xl">
                    {item.children.map((child, childIdx) => (
                      <Link
                        key={`${item.label}-${childIdx}-${child.href}`}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-white/85 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <a
            href={siteConfig.phoneHref}
            className="pr-3 text-xs tracking-[0.06em] text-white/90"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {siteConfig.phone}
          </a>
          </div>
          <a
            href={siteConfig.consultUrl}
            className="btn btn-primary !py-2.5 !px-4 !text-[0.72rem] shrink-0 premium-btn-glow"
            target="_blank"
            rel="noreferrer"
          >
            Free consult
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a href={siteConfig.consultUrl} className="btn btn-primary !py-2 !px-3 !text-[0.7rem]" target="_blank" rel="noreferrer">
            Consultation
          </a>
          <button
            type="button"
            className="border border-[var(--color-border-strong)] px-3 py-2 text-xs uppercase tracking-wider text-white"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-black">
          <div className="container py-4 flex flex-col gap-2">
            {siteConfig.main.map((item) => (
              <div key={item.href} className="border-b border-[var(--color-border)] pb-2">
                <Link
                  href={item.href}
                  className={`block py-2 font-semibold uppercase tracking-wide text-sm ${
                    isActive(item.href) ? "text-[var(--color-accent)]" : "text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="pl-3 flex flex-col gap-1 pb-2">
                    {item.children.map((child, childIdx) => (
                      <Link
                        key={`m-${item.label}-${childIdx}-${child.href}`}
                        href={child.href}
                        className="py-1 text-sm text-white/65"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <a href={siteConfig.phoneHref} className="py-2 font-semibold text-white">
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
