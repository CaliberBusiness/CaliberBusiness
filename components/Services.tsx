"use client";

import {
  Headphones,
  Database,
  Calculator,
  Users,
  Wrench,
  Code2,
  Workflow,
  Zap
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Headphones, Database, Calculator, Users, Wrench, Code2, Workflow, Zap
};

interface ServicesProps {
  data: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: { icon: string; title: string; description: string; highlight: boolean }[];
  };
}

export default function Services({ data }: ServicesProps) {
  return (
    <section id="services" className="section-padding bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-3">
            {data.title} <span className="text-[#4a4a4a]">{data.titleHighlight}</span>
          </h2>
          <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full mb-5" />
          <p className="body-text max-w-3xl mx-auto text-balance">
            {data.subtitle}
          </p>
        </div>

        {/* Unified table layout — one border, rows with dividers */}
        <div className="grid md:grid-cols-2 gap-0 divide-y divide-[#e0e0e0] border border-[#e0e0e0] rounded-2xl overflow-hidden">
          {data.items.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.title}
                className={`flex items-start gap-5 px-7 py-7 transition-colors hover:bg-[#f9f9f9] ${
                  service.highlight ? 'bg-[#fffdd0]' : 'bg-white'
                } ${
                  // Add right border on left-column items
                  'odd:md:border-r odd:md:border-[#e0e0e0]'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  service.highlight ? 'bg-[#4a4a4a] text-[#7fffd4]' : 'bg-[#4a4a4a]/10 text-[#0d9e70]'
                }`}>
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                </div>

                <div>
                  <h3 className={`text-base sm:text-lg font-bold mb-1.5 ${service.highlight ? 'text-[#4a4a4a]' : 'text-[#4a4a4a]'}`}>
                    {service.title}
                  </h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
