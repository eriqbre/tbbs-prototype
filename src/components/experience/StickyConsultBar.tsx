"use client";

import { useEffect, useState } from "react";
import { siteConfig, CONSULT_URL } from "@/lib/site";

export function StickyConsultBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[60] border-t border-white/10 bg-[rgba(5,5,5,0.92)] backdrop-blur-md px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Book a consultation"
    >
      <div className="container flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/80 hidden sm:block">
          Ready for a <span className="text-[var(--color-accent)]">complimentary</span> virtual consultation?
        </p>
        <div className="flex gap-2 w-full sm:w-auto">
          <a
            href={siteConfig.phoneHref}
            className="btn btn-outline flex-1 sm:flex-none !border-white/25 !text-white !py-3"
          >
            Call now
          </a>
          <a
            href={CONSULT_URL}
            className="btn btn-primary flex-1 sm:flex-none !py-3 shadow-[0_0_32px_rgba(101,235,201,0.25)]"
            target="_blank"
            rel="noreferrer"
          >
            Book free consult
          </a>
        </div>
      </div>
    </div>
  );
}
