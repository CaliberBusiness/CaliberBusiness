"use client";

import { TrendingUp, Shield, DollarSign, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useScrollCountUp } from '@/lib/useCountUp';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Shield, DollarSign
};

interface StatItem {
  icon: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  source?: string;
}

interface StatisticsProps {
  data: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    stats: StatItem[];
    approaches: { title: string; description: string; points: string[] }[];
  };
}

export default function Statistics({ data }: StatisticsProps) {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-primary/5 -skew-y-6 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20 animate-slide-up px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            {data.title} <span className="text-primary">{data.titleHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div ref={elementRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24">
          {data.stats.map((stat, index) => (
            <AnimatedStat key={stat.label} stat={stat} index={index} isParentVisible={isVisible} />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.approaches.map((approach) => (
            <div
              key={approach.title}
              className="bg-secondary/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{approach.title}</h3>
              <p className="text-gray-400 text-sm mb-4 sm:mb-6">{approach.description}</p>

              <ul className="space-y-2 sm:space-y-3">
                {approach.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({ stat, index, isParentVisible }: { stat: StatItem; index: number; isParentVisible: boolean }) {
  const { elementRef, displayValue } = useScrollCountUp({
    end: stat.value,
    suffix: stat.suffix || '',
    prefix: stat.prefix || '',
    duration: 2000,
    threshold: 0.5
  });

  const IconComponent = iconMap[stat.icon];

  return (
    <div
      ref={elementRef}
      className={`group relative p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 scroll-slide-up stagger-${index + 1} ${isParentVisible ? 'visible' : ''}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {IconComponent && <IconComponent className="w-16 sm:w-24 h-16 sm:h-24 text-primary" />}
      </div>

      <div className="relative z-10">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {displayValue}
        </div>
        <div className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">{stat.label}</div>
        <p className="text-gray-400 text-sm mb-2 leading-relaxed">{stat.description}</p>
        {stat.source && <span className="text-xs text-gray-500 italic">{stat.source}</span>}
      </div>
    </div>
  );
}
