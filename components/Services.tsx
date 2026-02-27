"use client";

import {
  Headphones,
  Database,
  Calculator,
  Users,
  Wrench,
  Code2
} from 'lucide-react';

const services = [
  {
    icon: Headphones,
    title: 'Customer Service',
    description: 'Reliable support agents to handle inquiries, resolve issues, and maintain customer satisfaction across channels.',
    highlight: true
  },
  {
    icon: Database,
    title: 'Data Entry & Admin Support',
    description: 'Accurate data management, document processing, and administrative tasks to keep your operations running smoothly.'
  },
  {
    icon: Calculator,
    title: 'Accounting & Bookkeeping',
    description: 'Qualified professionals to manage transactions, financial reporting, and ensure compliance.'
  },
  {
    icon: Users,
    title: 'Sales Support',
    description: 'Skilled agents for lead generation, follow-ups, and pipeline management to drive revenue.'
  },
  {
    icon: Wrench,
    title: 'Technical Support',
    description: 'IT specialists to troubleshoot issues and provide technical assistance to your customers.'
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Experienced developers to build and maintain modern web applications using current technologies.'
  }
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-background w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">
            Outsourcing Solutions <span className="text-primary">Built for Business</span>
          </h2>
          <p className="body-text max-w-3xl mx-auto text-balance">
            From specialized technical roles to essential operational support, we build the team you need to succeed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service) => (
            <div
              key={service.title}
              className={`flex flex-col shadow-lg shadow-black/20 ${service.highlight ? 'card-highlight' : 'card-standard'}`}
            >
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mb-6
                ${service.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}
              `}>
                <service.icon className="w-6 h-6" />
              </div>

              <h3 className={`heading-3 mb-3 ${service.highlight ? 'text-primary' : ''}`}>
                {service.title}
              </h3>

              <p className="body-text mt-auto">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
