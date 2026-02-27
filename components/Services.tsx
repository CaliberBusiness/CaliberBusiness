"use client";

import {
  Headphones,
  Database,
  Calculator,
  Users,
  Wrench,
  Code2
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Headphones, Database, Calculator, Users, Wrench, Code2
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
    <section id="services" className="section-padding bg-background w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">
            {data.title} <span className="text-primary">{data.titleHighlight}</span>
          </h2>
          <p className="body-text max-w-3xl mx-auto text-balance">
            {data.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {data.items.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.title}
                className={`flex flex-col shadow-lg shadow-black/20 ${service.highlight ? 'card-highlight' : 'card-standard'}`}
              >
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-6
                  ${service.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}
                `}>
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                </div>

                <h3 className={`heading-3 mb-3 ${service.highlight ? 'text-primary' : ''}`}>
                  {service.title}
                </h3>

                <p className="body-text mt-auto">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
