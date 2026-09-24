import PortfolioFilter from './PortfolioFilter';
import {
  IT_FLAGS,
  LEDGER,
  PORTFOLIO,
  PORTFOLIO_TAGS,
  type PortfolioTag,
} from '@/lib/it-solutions';
import { resolvePortfolio } from '@/lib/portfolio-images';

/**
 * Portfolio — id="work". The hero's "See the work" button targets it, and
 * ITHero reads the same resolvePortfolio() result to decide whether to offer
 * that button, so the anchor and the link can never disagree.
 *
 * Every missing-screenshot decision lives in lib/portfolio-images.ts. Nothing
 * here can render a Caliber card without a real image, and the ledger has no
 * image field at all.
 */
export default function ITPortfolio() {
  if (!IT_FLAGS.showWork) return null;

  const { featured, groups, ledger, hasContent } = resolvePortfolio();

  // Nothing survived — render no section at all rather than a heading over an
  // empty grid.
  if (!hasContent) return null;

  // Only offer a filter that actually matches something, across both the cards
  // and the ledger. Same reasoning as leaving "Apps" out: an empty filter
  // advertises a gap.
  const tagged: { tags: readonly PortfolioTag[] }[] = [
    ...groups.flatMap((group) => group.items),
    ...ledger,
  ];
  const activeTags: PortfolioTag[] = PORTFOLIO_TAGS.filter((tag) =>
    tagged.some((item) => item.tags.includes(tag)),
  );

  // Group labels only earn their place when both lists are showing.
  const showGroupLabels = groups.length > 0 && ledger.length > 0;

  return (
    <section id="work" className="section-padding bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9b9b9b]">
            {PORTFOLIO.eyebrow}
          </span>
          <h2 className="heading-2 mt-3 mb-4 text-balance">{PORTFOLIO.heading}</h2>
          <p className="body-text">{PORTFOLIO.intro}</p>
        </div>

        {/* Featured row — screenshot 7/12, text 5/12, stacked on mobile */}
        {featured && (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-16">
            <div className="lg:col-span-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.src}
                alt={featured.title}
                width={1600}
                height={1000}
                className="w-full aspect-[16/10] object-cover rounded-2xl border border-[#e0e0e0]"
              />
            </div>
            <div className="lg:col-span-5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9b9b9b]">
                {featured.kicker}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#4a4a4a] mt-3 mb-3">
                {featured.title}
              </h3>
              <p className="text-sm sm:text-base text-[#6b6b6b] leading-relaxed mb-5">
                {featured.body}
              </p>
              <ul className="flex flex-wrap gap-2 mb-4">
                {featured.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-3 py-[7px] bg-white border border-[#d0d0d0] text-[13px] font-medium text-[#4a4a4a]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <p className="text-[13px] text-[#6b6b6b]">{featured.stack}</p>
              {featured.url && (
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm font-semibold text-[#0d9e70] hover:underline"
                >
                  {PORTFOLIO.visitLabel} &#8599;
                </a>
              )}
            </div>
          </div>
        )}

        <PortfolioFilter
          groups={groups}
          ledger={ledger}
          ledgerLabel={LEDGER.label}
          ledgerSublabel={LEDGER.sublabel}
          ledgerBuiltLabel={LEDGER.builtLabel}
          tags={activeTags}
          allLabel={PORTFOLIO.allLabel}
          visitLabel={PORTFOLIO.visitLabel}
          privateLabel={PORTFOLIO.privateLabel}
          showGroupLabels={showGroupLabels}
        />

      </div>
    </section>
  );
}
