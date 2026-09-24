import { ArrowRight } from 'lucide-react';
import { HERO, HERO_CHIP_GROUPS, IT_FLAGS, isEnabled } from '@/lib/it-solutions';
import { resolvePortfolio } from '@/lib/portfolio-images';

/**
 * Section 1. Carries the page's only <h1>.
 *
 * The secondary CTA offers "See the work" only when the portfolio will
 * actually render, and falls back to "See services" otherwise. Keying it off
 * IT_FLAGS.showWork alone is not enough: with the flag on but no screenshots
 * on disk yet, ITPortfolio suppresses itself and #work would be a dead anchor.
 * Both read the same resolvePortfolio() result, so they cannot disagree.
 */
export default function ITHero() {
  const showWorkLink = IT_FLAGS.showWork && resolvePortfolio().hasContent;
  const secondary = showWorkLink ? HERO.secondaryCta : HERO.secondaryCtaFallback;

  return (
    <section
      id="it-hero"
      className="relative overflow-hidden bg-white pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20"
    >
      {/* Same dot grid the homepage hero uses */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #4a4a4a 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — copy + CTAs */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7fffd4]/15 border border-[#7fffd4]/40 mb-6 shadow-sm">
              <span className="text-sm font-medium text-[#4a4a4a]">{HERO.eyebrow}</span>
            </div>

            {/* leading-[1.25] is load-bearing: .heading-1 resolves to a
                line-height of 1.0–1.11, which is shorter than the padded
                highlight box below, so each highlighted line clipped the
                descenders of the line above it (the comma in "Your CRM,"
                read as a full stop). */}
            <h1 className="heading-1 leading-[1.25] mb-6 text-balance">
              {HERO.headline}{' '}
              <span className="bg-[#fffdd0] box-decoration-clone rounded-lg px-2 py-0.5 -mx-0.5">
                {HERO.headlineHighlight}
              </span>
            </h1>

            <p className="body-text max-w-xl mb-8 lg:mb-10">{HERO.subtext}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={HERO.primaryCta.href} className="btn-primary w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  {HERO.primaryCta.label}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </a>
              <a href={secondary.href} className="btn-secondary w-full sm:w-auto">
                {secondary.label}
              </a>
            </div>
          </div>

          {/* Right — "What we handle" panel.
              Intentionally NOT a .card-standard: this panel follows the
              mockup's flat rule-and-list layout rather than the repo's card
              style. Colours are still the repo palette. */}
          <div className="border-t-2 border-[#4a4a4a]">
            <div className="flex items-baseline justify-between pt-4 pb-1">
              <h2 className="font-[family-name:var(--font-montserrat)] font-bold text-[17px] text-[#4a4a4a]">
                {HERO.panelTitle}
              </h2>
              <span className="text-[12px] font-semibold text-[#6b6b6b]">
                {HERO.panelLabel}
              </span>
            </div>

            {HERO_CHIP_GROUPS.map((group) => {
              const chips = group.chips.filter((chip) => isEnabled(chip.requiresFlag));
              if (chips.length === 0) return null;

              return (
                <div
                  key={group.title}
                  className="flex flex-col gap-3 py-5 border-b border-[#e0e0e0]"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-[family-name:var(--font-montserrat)] font-extrabold text-[20px] text-[#4a4a4a]">
                      {group.title}
                    </span>
                    <span className="text-[13px] text-[#6b6b6b]">{group.label}</span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <li
                        key={chip.label}
                        className="px-3 py-[7px] bg-white border border-[#d0d0d0] rounded-none text-[14px] font-medium text-[#4a4a4a]"
                      >
                        {chip.label}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
