"use client";

import { ArrowRight } from 'lucide-react';

export default function ClosingCTA() {
  return (
    <section className="pt-12 sm:pt-16 pb-8 sm:pb-12 bg-gradient-to-br from-[#fffdd0]/50 via-white to-[#7fffd4]/10 border-t border-[#e8e0c0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full mb-6" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a4a4a] mb-6 text-balance">
          Ready to Scale With Confidence?
        </h2>
        <p className="text-base sm:text-lg text-[#6b6b6b] mb-8 max-w-2xl mx-auto text-balance">
          Partner with Caliber Business Resource for premium managed staffing solutions.
          Reduce overhead while improving your operational efficiency.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#connect"
            className="bg-[#f6b130] hover:bg-[#d4940a] text-[#1a1a1a] font-bold px-8 py-4 rounded-xl text-base sm:text-lg transition-colors duration-200 w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            Schedule a Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#connect"
            className="bg-transparent text-[#4a4a4a] font-medium px-8 py-4 rounded-xl text-base sm:text-lg border border-[#4a4a4a]/40 hover:border-[#4a4a4a] hover:bg-[#4a4a4a]/5 transition-all duration-200 w-full sm:w-auto inline-flex items-center justify-center"
          >
            Request Talent Estimate
          </a>
        </div>
      </div>
    </section>
  );
}
