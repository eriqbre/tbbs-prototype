"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  title = "Frequently Asked Questions",
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <section className="section">
      <div className="container max-w-3xl">
        <h2 className="section-title">{title}</h2>
        <div className="mt-6 border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
          {items.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={`faq-${idx}`} className="border-b border-[var(--color-border)] last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-white"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <span className="font-semibold" style={{ fontFamily: "var(--font-ui)" }}>
                    {item.q}
                  </span>
                  <span className="text-[var(--color-accent)] text-xl leading-none">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen ? (
                  <div className="px-4 pb-4 text-[var(--color-text-body)] text-base leading-relaxed">
                    {item.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
