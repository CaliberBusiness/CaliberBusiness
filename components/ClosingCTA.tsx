"use client";

import { ArrowRight } from 'lucide-react';

export default function ClosingCTA() {
  return (
    <section className="pt-12 sm:pt-16 pb-8 sm:pb-12 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-50" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="heading-1 mb-6 text-balance">
          Ready to Scale With Confidence?
        </h2>
        <p className="body-text mb-8 max-w-2xl mx-auto text-balance">
          Partner with Caliber Business Resource for premium managed staffing solutions.
          Reduce overhead while improving your operational efficiency.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#connect"
            className="btn-primary w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </span>
          </a>
          <a
            href="#connect"
            className="btn-secondary w-full sm:w-auto"
          >
            Request Talent Estimate
          </a>
        </div>
      </div>
    </section>
  );
}
