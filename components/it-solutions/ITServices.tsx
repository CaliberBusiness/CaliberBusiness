import {
  ArrowRight,
  Check,
  Headset,
  KeyRound,
  LayoutGrid,
  Mail,
  Phone,
  ShieldCheck,
  Code2,
  Smartphone,
  Workflow,
  Link2,
} from 'lucide-react';
import {
  IT_ASSESSMENT,
  IT_FLAGS,
  SERVICE_GROUPS,
  SERVICES_INTRO,
  isEnabled,
  type ServiceGroup,
} from '@/lib/it-solutions';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Headset, LayoutGrid, Mail, Phone, KeyRound, ShieldCheck,
  Code2, Smartphone, Workflow, Link2,
};

/**
 * A price renders only when showPricing is on AND a price actually exists.
 * Both halves matter: a null price is an unapproved one, and must produce no
 * element at all rather than an empty slot.
 */
function priceOf(price: string | null): string | null {
  return IT_FLAGS.showPricing && price ? price : null;
}

/** Run is a 3-up grid, Build a 4-up. Both collapse to one column on mobile. */
const GRID_CLASSES: Record<ServiceGroup['key'], string> = {
  run: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-5',
  build: 'grid sm:grid-cols-2 lg:grid-cols-4 gap-5',
};

export default function ITServices() {
  const assessmentPrice = priceOf(IT_ASSESSMENT.price);

  return (
    <section id="services" className="section-padding bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12">
          <div className="w-10 h-1 bg-[#7fffd4] rounded-full mb-5" />
          <h2 className="heading-2 mb-4 text-balance">{SERVICES_INTRO.heading}</h2>
          <p className="body-text">{SERVICES_INTRO.intro}</p>
        </div>

        {/* Start-here strip — IT Assessment */}
        <div className="rounded-2xl bg-[#f6b130] p-6 sm:p-8 lg:p-10 mb-14">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1a1a1a]/70">
                {IT_ASSESSMENT.eyebrow}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-3">
                {IT_ASSESSMENT.title}
              </h3>
              <p className="text-[#1a1a1a]/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                {IT_ASSESSMENT.body}
              </p>
            </div>

            <div className="lg:justify-self-end w-full lg:w-auto">
              {assessmentPrice && (
                <p className="text-2xl font-bold text-[#1a1a1a] mb-4">{assessmentPrice}</p>
              )}
              <a
                href={IT_ASSESSMENT.ctaHref}
                className="inline-flex items-center justify-center gap-2 w-full lg:w-auto px-8 py-3.5 rounded-xl bg-[#1a1a1a] text-white font-semibold hover:bg-[#4a4a4a] transition-colors btn-press"
              >
                {IT_ASSESSMENT.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-8 pt-6 border-t border-[#1a1a1a]/15">
            {IT_ASSESSMENT.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#1a1a1a]/85">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Run / Build groups */}
        <div className="space-y-14">
          {SERVICE_GROUPS.map((group) => {
            const tiles = group.tiles.filter((tile) => isEnabled(tile.requiresFlag));
            if (tiles.length === 0) return null;

            const groupPrice = priceOf(group.price);

            return (
              <div key={group.key}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-6 pb-4 border-b border-[#e0e0e0]">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#4a4a4a]">
                      {group.heading}
                    </h3>
                    <span className="text-sm text-[#6b6b6b]">{group.subheading}</span>
                  </div>
                  <span className="text-xs text-[#9b9b9b]">
                    {group.terms}
                    {groupPrice && (
                      <span className="ml-2 font-semibold text-[#4a4a4a]">{groupPrice}</span>
                    )}
                  </span>
                </div>

                <div className={GRID_CLASSES[group.key]}>
                  {tiles.map((tile) => {
                    const IconComponent = iconMap[tile.icon];
                    return (
                      <div
                        key={tile.title}
                        className="flex flex-col bg-white border border-[#e0e0e0] rounded-2xl p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-[#4a4a4a]/10 text-[#0d9e70] flex items-center justify-center shrink-0">
                            {IconComponent && <IconComponent className="w-5 h-5" />}
                          </div>
                          {tile.tag && (
                            <span className="px-2.5 py-1 rounded-full bg-[#fffdd0] border border-[#e8e0c0] text-[10px] font-semibold uppercase tracking-wider text-[#4a4a4a] whitespace-nowrap">
                              {tile.tag}
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-[#4a4a4a] mb-2">{tile.title}</h4>
                        <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">{tile.line}</p>

                        <ul className="mt-auto space-y-1.5 pt-4 border-t border-[#e0e0e0]">
                          {tile.includes.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-xs text-[#6b6b6b]"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#7fffd4] shrink-0 mt-1.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
