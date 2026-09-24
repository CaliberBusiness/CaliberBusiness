import { ShieldCheck } from 'lucide-react';
import {
  SYSTEMS,
  SYSTEMS_ITEMS,
  SYSTEMS_MIN_APPROVED,
  approvedOnly,
} from '@/lib/it-solutions';

/**
 * Section 5 — access and data handling.
 *
 * Hidden entirely below SYSTEMS_MIN_APPROVED. Every line here is a security or
 * contractual promise; one or two of them on their own read as an assertion
 * rather than a policy, and a half-filled section invites the exact question
 * it is meant to answer.
 */
export default function SystemsStayYours() {
  const items = approvedOnly(SYSTEMS_ITEMS);
  if (items.length < SYSTEMS_MIN_APPROVED) return null;

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9b9b9b]">
            {SYSTEMS.eyebrow}
          </span>
          <h2 className="heading-2 mt-3 mb-4 text-balance">{SYSTEMS.heading}</h2>
          <p className="body-text">{SYSTEMS.intro}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#e0e0e0] rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-[#4a4a4a]/10 text-[#0d9e70] flex items-center justify-center shrink-0 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#4a4a4a] mb-2">{item.title}</h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
