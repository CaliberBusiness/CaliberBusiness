import { Check, X } from 'lucide-react';
import {
  MONTHLY_PLAN,
  PLAN_EXCLUDED,
  PLAN_INCLUDED,
  approvedOnly,
} from '@/lib/it-solutions';

/**
 * Two plain columns, no icons on the list items themselves.
 *
 * The exclusions carry `approved`: "you buy hardware direct" and "after-hours
 * emergency support" are commitments about what the plan does NOT do, and
 * getting either wrong sets a false expectation, so they stay hidden until
 * signed off. The column renders with whatever is approved.
 */
export default function MonthlyPlan() {
  const excluded = approvedOnly(PLAN_EXCLUDED);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12">
          <div className="w-10 h-1 bg-[#7fffd4] rounded-full mb-5" />
          <h2 className="heading-2 text-balance">{MONTHLY_PLAN.heading}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-white border border-[#e0e0e0] border-l-[3px] border-l-[#7fffd4] rounded-2xl p-6 sm:p-8">
            <h3 className="heading-3 mb-5">{MONTHLY_PLAN.includedLabel}</h3>
            <ul className="space-y-3">
              {PLAN_INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#6b6b6b]">
                  <Check className="w-4 h-4 text-[#0d9e70] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {excluded.length > 0 && (
            <div className="bg-[#f9f9f9] border border-[#e0e0e0] rounded-2xl p-6 sm:p-8">
              <h3 className="heading-3 mb-5">{MONTHLY_PLAN.excludedLabel}</h3>
              <ul className="space-y-3">
                {excluded.map((item) => (
                  <li key={item.text} className="flex items-start gap-3 text-sm text-[#6b6b6b]">
                    <X className="w-4 h-4 text-[#9b9b9b] shrink-0 mt-0.5" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
