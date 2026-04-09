"use client";

import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Briefcase, FileText } from 'lucide-react';

interface JobListingsProps {
  data: {
    title: string;
    titleHighlight: string;
    description: string;
    features: string[];
    ctaLabel: string;
    ctaLink: string;
    ctaSubtext: string;
    fraudNotice: string;
  };
}

export default function JobListings({ data }: JobListingsProps) {
  const animation = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="space-y-20">
      <section
        id="open-roles"
        ref={animation.elementRef}
        className={`scroll-mt-24 scroll-slide-up ${animation.isVisible ? 'visible' : ''}`}
      >
        <div className="bg-white border border-[#e0e0e0] border-l-[3px] border-l-[#7fffd4] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
          {/* Subtle corner decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7fffd4]/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#7fffd4]/15 border border-[#7fffd4]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-[#0d9e70]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#4a4a4a] mb-3">
              {data.title} <span className="text-[#4a4a4a]">{data.titleHighlight}</span>
            </h2>
            <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full mb-4" />

            <p className="text-lg text-[#6b6b6b] mb-8 leading-relaxed">
              {data.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
              {data.features.map((feature, idx) => (
                <div key={idx} className="bg-[#f8f8f8] p-4 rounded-xl border border-[#e0e0e0] flex items-center gap-4">
                  {idx === 0
                    ? <Briefcase className="w-6 h-6 text-[#0d9e70] shrink-0" />
                    : <FileText className="w-6 h-6 text-[#0d9e70] shrink-0" />
                  }
                  <span className="text-[#4a4a4a] text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <a
              href={data.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#f6b130] hover:bg-[#d4940a] text-[#1a1a1a] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <FileText className="w-5 h-5" />
              {data.ctaLabel}
            </a>

            <p className="text-[#9b9b9b] text-sm mt-6">
              {data.ctaSubtext}
            </p>

            <p className="text-[#b0b0b0] text-xs mt-4 border-t border-[#e0e0e0] pt-4">
              {data.fraudNotice}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
