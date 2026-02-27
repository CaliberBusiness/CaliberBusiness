"use client";

import { MessageSquare, Users, Handshake, Rocket } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Talent Sourcing Strategy',
    description: 'We collaborate to define the exact skill profile, cultural fit, and operational requirements for the role.'
  },
  {
    icon: Users,
    number: '02',
    title: 'Multi-Stage Screening',
    description: 'Candidates undergo rigorous skills assessments, behavioral interviews, and cultural alignment evaluations.'
  },
  {
    icon: Handshake,
    number: '03',
    title: 'Client Matching & Approval',
    description: 'Review a curated shortlist of top-tier professionals. You hold final approval on who joins your team.'
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Managed Onboarding & Monitoring',
    description: 'We handle integration logistics and provide ongoing performance oversight to ensure long-term success.'
  }
];

export default function HowItWorks() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Getting Started <span className="text-primary">Is Simple</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            A straightforward process designed to get you the talent you need, fast.
          </p>
        </div>

        <div ref={elementRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative scroll-slide-up stagger-${index + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-primary/30">{step.number}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
