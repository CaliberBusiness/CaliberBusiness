"use client";

import { CheckCircle2 } from 'lucide-react';
import { useScrollCountUp } from '@/lib/useCountUp';

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
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#4a4a4a] mb-3">
            {data.title} <span className="text-[#4a4a4a]">{data.titleHighlight}</span>
          </h2>
          <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full mb-5" />
          <p className="text-base sm:text-lg text-[#4a4a4a]/70 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Open number strip — no boxes, dividers only */}
        <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#4a4a4a]/15 mb-16 sm:mb-20 bg-[#f7f7f7] rounded-2xl overflow-hidden">
          {data.stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Approaches — grid with dividers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#4a4a4a]/15">
          {data.approaches.map((approach, idx) => (
            <div
              key={approach.title}
              className={`px-6 sm:px-8 py-8 ${idx > 0 && idx < 3 ? 'sm:border-t-0' : ''} ${idx >= 3 ? 'border-t border-[#4a4a4a]/15' : ''}`}
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#4a4a4a] mb-3">{approach.title}</h3>
              <p className="text-[#4a4a4a]/70 text-sm mb-5">{approach.description}</p>

              <ul className="space-y-2 sm:space-y-3">
                {approach.points.map((point, pidx) => (
                  <li key={pidx} className="flex items-start gap-2 sm:gap-3 text-sm text-[#4a4a4a]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#0d9e70] mt-0.5 shrink-0" />
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

function AnimatedStat({ stat }: { stat: StatItem }) {
  const { elementRef, displayValue } = useScrollCountUp({
    end: stat.value,
    suffix: stat.suffix || '',
    prefix: stat.prefix || '',
    duration: 2000,
    threshold: 0.5
  });

  return (
    <div
      ref={elementRef}
      className="flex-1 px-6 sm:px-10 py-8 sm:py-10 text-center"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#4a4a4a] mb-2">
        {displayValue}
      </div>
      <div className="text-base sm:text-lg font-semibold text-[#0d9e70] mb-2">{stat.label}</div>
      <p className="text-[#4a4a4a]/65 text-xs sm:text-sm leading-relaxed max-w-[200px] mx-auto">{stat.description}</p>
      {stat.source && <span className="text-xs text-[#4a4a4a]/45 italic">{stat.source}</span>}
    </div>
  );
}
