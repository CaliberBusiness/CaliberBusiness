"use client";

import { CheckCircle2, ShieldCheck, Users, Clock } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CheckCircle2, ShieldCheck, Users, Clock
};

interface DifferentiationProps {
  data: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: { icon: string; title: string; description: string }[];
  };
}

export default function Differentiation({ data }: DifferentiationProps) {
  return (
    <section id="differentiation" className="py-20 sm:py-28 bg-gradient-to-b from-[#fffdd0] via-[#fffdd0]/70 to-white border-b border-[#e8e0c0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#4a4a4a] mb-3">
            {data.title} <span className="text-[#4a4a4a]">{data.titleHighlight}</span>
          </h2>
          <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full mb-5" />
          <p className="text-base sm:text-lg text-[#4a4a4a]/70 max-w-2xl mx-auto text-balance">
            {data.subtitle}
          </p>
        </div>

        {/* 2x2 grid with cross-dividers — no boxes */}
        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-0 divide-y divide-[#4a4a4a]/10">
          {data.items.map((diff, index) => {
            const IconComponent = iconMap[diff.icon];
            const isLeftCol = index % 2 === 0;
            return (
              <div
                key={diff.title}
                className={`flex items-start gap-5 py-8 ${isLeftCol ? 'sm:border-r sm:border-[#4a4a4a]/10 sm:pr-8' : 'sm:pl-8'}`}
              >
                <div className="w-10 h-10 rounded-full bg-[#4a4a4a] flex items-center justify-center shrink-0 mt-0.5">
                  {IconComponent && <IconComponent className="w-5 h-5 text-[#7fffd4]" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#4a4a4a] mb-2">{diff.title}</h3>
                  <p className="text-[#4a4a4a]/70 text-sm leading-relaxed">{diff.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
