import { AlertTriangle, ArrowRight } from 'lucide-react';
import { ASSESSMENT_CHECKS, ASSESSMENT_INTRO } from '@/lib/it-solutions';

/**
 * Makes the IT Assessment concrete. The copy is deliberately about problems in
 * general, not Caliber's own findings, and carries no frequency claims
 * ("most businesses have...") that we could not substantiate.
 */
export default function WhatWeLookFor() {
  return (
    <section className="section-padding bg-[#f9f9f9] border-y border-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9b9b9b]">
            {ASSESSMENT_INTRO.eyebrow}
          </span>
          <h2 className="heading-2 mt-3 mb-4 text-balance">{ASSESSMENT_INTRO.heading}</h2>
          <p className="body-text">{ASSESSMENT_INTRO.intro}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ASSESSMENT_CHECKS.map((check) => (
            <div
              key={check.problem}
              className="bg-white border border-[#e0e0e0] rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f6b130]/15 text-[#d4940a] flex items-center justify-center shrink-0 mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#4a4a4a] mb-2">{check.problem}</h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">{check.why}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a href={ASSESSMENT_INTRO.ctaHref} className="btn-primary w-full sm:w-auto">
            <span className="flex items-center justify-center gap-2">
              {ASSESSMENT_INTRO.ctaLabel}
              <ArrowRight className="w-5 h-5" />
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
