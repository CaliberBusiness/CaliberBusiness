"use client";

import { Shield, Clock, Users } from 'lucide-react';

const credibilityPoints = [
  {
    icon: Shield,
    title: 'Structured Multi-Stage Vetting',
    description: 'Comprehensive screening and evaluation to ensure top-tier talent matches your operational needs perfectly.'
  },
  {
    icon: Users,
    title: 'Dedicated Account Management',
    description: 'A single point of contact dedicated to understanding your business and ensuring a long-term partnership.'
  },
  {
    icon: Clock,
    title: 'Managed Onboarding',
    description: 'We handle equipment, compliance, and initial training integration to minimize friction and speed up time-to-value.'
  }
];

export default function Credibility() {
  return (
    <section className="section-padding bg-secondary/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            Why Businesses <span className="text-primary">Trust Caliber</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {credibilityPoints.map((point) => (
            <div
              key={point.title}
              className="card-standard flex flex-col items-center text-center shadow-lg shadow-black/20"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <point.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="heading-3 mb-3">{point.title}</h3>
              <p className="body-text">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
