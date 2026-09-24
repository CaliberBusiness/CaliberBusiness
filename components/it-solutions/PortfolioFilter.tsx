"use client";

import { useState } from 'react';
import type { LedgerItem, PortfolioTag } from '@/lib/it-solutions';
import type { ResolvedPortfolioGroup } from '@/lib/portfolio-images';

/**
 * Filter chips, the Caliber card grid, and the "Built by our IT lead" ledger.
 *
 * Client-side only because of the chip state; filtering hides rows in place
 * and never navigates. One filter drives BOTH lists, per the spec.
 *
 * Two deliberately different shapes:
 *   cards   have a screenshot. The parent has already dropped every item whose
 *           file is missing, so `src` is always real and there is no
 *           placeholder branch in this component at all.
 *   ledger  links only. No image field exists on LedgerItem, so there is
 *           nothing that can go missing and no box to leave empty.
 */

interface PortfolioFilterProps {
  groups: readonly ResolvedPortfolioGroup[];
  ledger: readonly LedgerItem[];
  ledgerLabel: string;
  ledgerSublabel: string;
  ledgerBuiltLabel: string;
  tags: readonly PortfolioTag[];
  allLabel: string;
  visitLabel: string;
  privateLabel: string;
  showGroupLabels: boolean;
}

/** Matches the hero "What we handle" chips; active state fills with #4a4a4a. */
const chipBase =
  'px-3 py-[7px] border text-[14px] font-medium transition-colors cursor-pointer';
const chipIdle = 'bg-white border-[#d0d0d0] text-[#4a4a4a] hover:border-[#4a4a4a]';
const chipActive = 'bg-[#4a4a4a] border-[#4a4a4a] text-white';

/** "https://elevarerp.com" -> "elevarerp.com" for display. */
function displayDomain(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export default function PortfolioFilter({
  groups,
  ledger,
  ledgerLabel,
  ledgerSublabel,
  ledgerBuiltLabel,
  tags,
  allLabel,
  visitLabel,
  privateLabel,
  showGroupLabels,
}: PortfolioFilterProps) {
  const [activeTag, setActiveTag] = useState<PortfolioTag | null>(null);

  const match = <T extends { tags: readonly PortfolioTag[] }>(item: T) =>
    activeTag === null || item.tags.includes(activeTag);

  const visibleGroups = groups
    .map((group) => ({ ...group, items: group.items.filter(match) }))
    .filter((group) => group.items.length > 0);

  const visibleLedger = ledger.filter(match);

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter work by service">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={`${chipBase} ${activeTag === null ? chipActive : chipIdle}`}
          >
            {allLabel}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={`${chipBase} ${activeTag === tag ? chipActive : chipIdle}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Caliber cards */}
      <div className="space-y-12">
        {visibleGroups.map((group) => (
          <div key={group.key}>
            {showGroupLabels && (
              <h3 className="text-xl sm:text-2xl font-bold text-[#4a4a4a] mb-6 pb-4 border-b border-[#e0e0e0]">
                {group.label}
              </h3>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.items.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col bg-white border border-[#e0e0e0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.title}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    className="w-full aspect-[16/10] object-cover border-b border-[#e0e0e0]"
                  />

                  <div className="flex flex-col flex-1 p-6">
                    <h4 className="text-base font-bold text-[#4a4a4a] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">{item.line}</p>

                    <ul className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="px-2.5 py-1 bg-white border border-[#d0d0d0] text-[12px] font-medium text-[#4a4a4a]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      {item.stack && (
                        <p className="text-[13px] text-[#6b6b6b]">{item.stack}</p>
                      )}
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 text-sm font-semibold text-[#0d9e70] hover:underline"
                        >
                          {visitLabel} &#8599;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Built by our IT lead — ledger rows, links only, never cards */}
      {visibleLedger.length > 0 && (
        <div className={visibleGroups.length > 0 ? 'mt-16' : ''}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#4a4a4a]">{ledgerLabel}</h3>
          </div>
          <p className="text-sm text-[#6b6b6b] mb-6">{ledgerSublabel}</p>

          <ul className="border-t border-[#e0e0e0]">
            {visibleLedger.map((row) => (
              <li
                key={row.title}
                className="grid lg:grid-cols-12 gap-x-8 gap-y-3 py-6 border-b border-[#e0e0e0]"
              >
                {/* Left — name + link */}
                <div className="lg:col-span-3">
                  <h4 className="text-base font-bold text-[#4a4a4a]">{row.title}</h4>
                  {row.url ? (
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-sm font-medium text-[#0d9e70] hover:underline break-all"
                    >
                      {displayDomain(row.url)} &#8599;
                    </a>
                  ) : (
                    <span className="inline-block mt-1 text-sm text-[#9b9b9b]">
                      {privateLabel}
                      {row.privateNote ? ` (${row.privateNote})` : ''}
                    </span>
                  )}
                </div>

                {/* Middle — what was built */}
                <div className="lg:col-span-6">
                  <span className="sr-only">{ledgerBuiltLabel}</span>
                  <ul className="space-y-1.5">
                    {row.built.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm text-[#6b6b6b]">
                        <span className="w-1 h-1 rounded-full bg-[#7fffd4] shrink-0 mt-2" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — stack */}
                <div className="lg:col-span-3">
                  <p className="text-[13px] text-[#6b6b6b]">{row.stack}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {visibleGroups.length === 0 && visibleLedger.length === 0 && (
        <p className="text-sm text-[#6b6b6b]">Nothing in this category yet.</p>
      )}
    </div>
  );
}
