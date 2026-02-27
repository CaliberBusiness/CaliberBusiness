"use client";

import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { Briefcase, FileText, Globe } from 'lucide-react';

export default function JobListings() {
  const animation = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="space-y-20">
      <section
        id="open-roles"
        ref={animation.elementRef}
        className={`scroll-mt-24 scroll-slide-up ${animation.isVisible ? 'visible' : ''}`}
      >
        <div className="bg-white/5 border border-primary/20 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Join Our <span className="text-primary">Talent Network</span>
            </h2>

            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We are constantly seeking highly skilled professionals in customer support, administration, accounting, scaling operations, and software development to join our managed staffing pool.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                <Briefcase className="w-6 h-6 text-primary shrink-0" />
                <span className="text-gray-300 text-sm">Long-term remote placements with premium international clients.</span>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                <FileText className="w-6 h-6 text-primary shrink-0" />
                <span className="text-gray-300 text-sm">Structured vetting and professional growth opportunities.</span>
              </div>
            </div>

            <a
              href="https://forms.gle/2w6CKLNdJGGdwHiz6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-background px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(255,193,7,0.5)] transform hover:-translate-y-1"
            >
              <FileText className="w-5 h-5" />
              Submit Your Resume
            </a>

            <p className="text-gray-500 text-sm mt-6">
              Please include your updated CV and a brief introduction of your core competencies.
            </p>

            {/* Phase 7: Fraud Protection Notice */}
            <p className="text-gray-600 text-xs mt-4 border-t border-white/5 pt-4">
              Caliber Business Resource does not charge applicants any recruitment fees. Please report suspicious communications.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
