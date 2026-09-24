"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { IT_FAQ, IT_FAQ_ITEMS, approvedOnly } from '@/lib/it-solutions';

/**
 * Section 9 — IT-specific FAQ. The homepage FAQ covers staffing; nothing is
 * repeated here, and the last item links across.
 *
 * Renders approvedOnly(IT_FAQ_ITEMS). app/it-solutions/page.tsx builds the
 * FAQPage JSON-LD from that same call, so an unapproved answer can never reach
 * structured data and surface as a rich result for a question we have not
 * actually answered yet.
 */
export default function ITFaq() {
  const items = approvedOnly(IT_FAQ_ITEMS);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <section id="it-faq" className="section-padding bg-white scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="heading-2 mb-3">
            {IT_FAQ.heading} <span className="text-[#4a4a4a]">{IT_FAQ.headingHighlight}</span>
          </h2>
          <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full" />
        </div>

        <div className="divide-y divide-[#e0e0e0] border-y border-[#e0e0e0]">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`it-faq-panel-${index}`}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                  >
                    <span className="text-base sm:text-lg font-semibold text-[#4a4a4a] group-hover:text-[#0d9e70] transition-colors">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 mt-0.5 text-[#6b6b6b] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`it-faq-panel-${index}`}
                  hidden={!isOpen}
                  className="pb-5 -mt-1"
                >
                  <p className="text-sm sm:text-base text-[#6b6b6b] leading-relaxed">
                    {item.answer}
                    {item.link && (
                      <>
                        {' '}
                        <Link
                          href={item.link.href}
                          className="text-[#0d9e70] hover:underline font-medium"
                        >
                          {item.link.label} &rarr;
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[#6b6b6b]">
          {IT_FAQ.footerText}{' '}
          <Link href={IT_FAQ.footerHref} className="text-[#0d9e70] hover:underline font-medium">
            {IT_FAQ.footerLabel} &rarr;
          </Link>
        </p>

      </div>
    </section>
  );
}
