import { AUDIENCE_ITEMS, WHO_ITS_FOR } from '@/lib/it-solutions';

/** Sits between Hire vs Build and Services. 2x2 on desktop, stacked on mobile. */
export default function WhoItsFor() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9b9b9b]">
            {WHO_ITS_FOR.eyebrow}
          </span>
          <h2 className="heading-2 mt-3 text-balance">{WHO_ITS_FOR.heading}</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {AUDIENCE_ITEMS.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#e0e0e0] border-l-[3px] border-l-[#7fffd4] rounded-2xl p-6 sm:p-7"
            >
              <h3 className="text-base sm:text-lg font-bold text-[#4a4a4a] mb-2">{item.title}</h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
