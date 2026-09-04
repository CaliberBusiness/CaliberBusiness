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
    <section className="py-20 sm:py-28 bg-[#fffdd0]">
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

        {/*
          Single render for both breakpoints. Mobile is a divided vertical
          stack; lg+ becomes a 4-column timeline. Rendering the steps twice
          and hiding one with CSS puts every heading and paragraph in the
          DOM twice, which SEO crawlers flag as duplicate content.
        */}
        <div className="relative">
          {/* Horizontal connecting line (decorative, desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#4a4a4a]/15" />

          <div className="divide-y divide-[#4a4a4a]/10 lg:divide-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
            {data.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div
                  key={step.title}
                  className="flex items-start gap-5 py-7 lg:flex-col lg:items-center lg:text-center lg:gap-0 lg:py-0"
                >
                  <div className="relative shrink-0 z-10 lg:mb-6">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#4a4a4a] flex items-center justify-center shadow-sm lg:shadow-md">
                      {IconComponent && <IconComponent className="w-6 h-6 lg:w-7 lg:h-7 text-[#7fffd4]" />}
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1.5 -right-1.5 lg:-top-2 lg:-right-2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#7fffd4] flex items-center justify-center">
                      <span className="text-[10px] lg:text-xs font-bold text-[#4a4a4a]">{index + 1}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base lg:text-lg font-bold text-[#4a4a4a] mb-1 lg:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#4a4a4a]/65 text-sm leading-relaxed lg:max-w-[200px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
