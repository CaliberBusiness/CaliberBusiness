"use client";

import { MessageSquare, Users, Handshake, Rocket } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare, Users, Handshake, Rocket
};

interface HowItWorksProps {
  data: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: { icon: string; number: string; title: string; description: string }[];
  };
}

export default function HowItWorks({ data }: HowItWorksProps) {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-white via-[#fffdd0]/60 to-[#7fffd4]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#4a4a4a] mb-3">
            {data.title} <span className="text-[#4a4a4a]">{data.titleHighlight}</span>
          </h2>
          <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full mb-5" />
          <p className="text-base sm:text-lg text-[#4a4a4a]/70 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Desktop: connecting line layout */}
        <div className="hidden lg:block relative">
          {/* Horizontal connecting line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#4a4a4a]/15" />

          <div className="grid lg:grid-cols-4 gap-8">
            {data.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div key={step.title} className="relative flex flex-col items-center text-center pt-0">
                  {/* Circle on the line */}
                  <div className="relative w-16 h-16 rounded-full bg-[#4a4a4a] flex items-center justify-center mb-6 shadow-md z-10">
                    {IconComponent && <IconComponent className="w-7 h-7 text-[#7fffd4]" />}
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#7fffd4] flex items-center justify-center">
                      <span className="text-xs font-bold text-[#4a4a4a]">{index + 1}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#4a4a4a] mb-2">{step.title}</h3>
                  <p className="text-[#4a4a4a]/65 text-sm leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stack with dividers */}
        <div className="lg:hidden space-y-0 divide-y divide-[#4a4a4a]/10">
          {data.steps.map((step, index) => {
            const IconComponent = iconMap[step.icon];
            return (
              <div key={step.title} className="flex items-start gap-5 py-7">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#4a4a4a] flex items-center justify-center shadow-sm">
                    {IconComponent && <IconComponent className="w-6 h-6 text-[#7fffd4]" />}
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#7fffd4] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#4a4a4a]">{index + 1}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#4a4a4a] mb-1">{step.title}</h3>
                  <p className="text-[#4a4a4a]/65 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
