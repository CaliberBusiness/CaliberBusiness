import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { HIRE_VS_BUILD } from '@/lib/it-solutions';

/**
 * Section 2. Option A sends people back to the homepage staffing grid;
 * Option B is an in-page jump, so it stays a plain anchor rather than a Link.
 */
export default function HireVsBuild() {
  return (
    <section className="section-padding-sm bg-[#f9f9f9] border-y border-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {HIRE_VS_BUILD.map((option) => {
            const isAnchor = option.href.startsWith('#');

            const linkBody = (
              <>
                {option.linkLabel}
                {isAnchor ? (
                  <ArrowDown className="w-4 h-4 shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 shrink-0" />
                )}
              </>
            );

            const linkClasses =
              'inline-flex items-center gap-2 text-sm font-semibold text-[#0d9e70] hover:underline';

            return (
              <div
                key={option.title}
                className={`rounded-2xl p-6 sm:p-8 border ${
                  option.emphasised
                    ? 'bg-[#fffdd0] border-[#e8e0c0] border-l-[3px] border-l-[#f6b130]'
                    : 'bg-white border-[#e0e0e0]'
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9b9b9b]">
                  {option.eyebrow}
                </span>
                <h3 className="heading-3 mt-3 mb-3">{option.title}</h3>
                <p className="text-[#6b6b6b] text-sm sm:text-base leading-relaxed mb-5">
                  {option.body}
                </p>

                {isAnchor ? (
                  <a href={option.href} className={linkClasses}>
                    {linkBody}
                  </a>
                ) : (
                  <Link href={option.href} className={linkClasses}>
                    {linkBody}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
