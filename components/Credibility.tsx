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
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#4a4a4a] mb-3">
            {data.title} <span className="text-[#4a4a4a]">{data.titleHighlight}</span>
          </h2>
          <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row">
          {data.points.map((point, idx) => {
            const IconComponent = iconMap[point.icon];
            return (
              <div
                key={point.title}
                className={`flex-1 px-6 sm:px-10 py-8 md:py-0 text-center flex flex-col items-center
                  ${idx < data.points.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#e0e0e0]' : ''}`}
              >
                <div className="w-12 h-12 rounded-full bg-[#4a4a4a] flex items-center justify-center mb-5">
                  {IconComponent && <IconComponent className="w-6 h-6 text-[#7fffd4]" />}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#4a4a4a] mb-3">{point.title}</h3>
                <p className="text-[#4a4a4a]/70 leading-relaxed text-sm sm:text-base max-w-xs">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
