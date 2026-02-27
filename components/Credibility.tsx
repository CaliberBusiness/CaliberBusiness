"use client";

import { Shield, Clock, Users } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Shield, Users, Clock };

interface CredibilityProps {
  data: {
    title: string;
    titleHighlight: string;
    points: { icon: string; title: string; description: string }[];
  };
}

export default function Credibility({ data }: CredibilityProps) {
  return (
    <section className="section-padding bg-secondary/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            {data.title} <span className="text-primary">{data.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.points.map((point) => {
            const IconComponent = iconMap[point.icon];
            return (
              <div
                key={point.title}
                className="card-standard flex flex-col items-center text-center shadow-lg shadow-black/20"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  {IconComponent && <IconComponent className="w-7 h-7 text-primary" />}
                </div>
                <h3 className="heading-3 mb-3">{point.title}</h3>
                <p className="body-text">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
