"use client";

import { TrendingUp, Shield, DollarSign, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useScrollCountUp } from '@/lib/useCountUp';

const stats = [
  {
    icon: DollarSign,
    value: 27,
    suffix: 'B',
    prefix: '$',
    label: 'Industry Value',
    description: 'The Philippines outsourcing industry revenue reached $27 billion USD in 2023.',
    source: '(Source: Statista)'
  },
  {
    icon: Shield,
    value: 65,
    suffix: '%',
    label: 'Quality Focus',
    description: 'We directly address the quality issues cited by 65% of businesses in remote outsourcing.',
    source: '(Source: Harvard Business Review)'
  },
  {
    icon: TrendingUp,
    value: 80,
    suffix: '%',
    label: 'Cost Savings',
    description: 'Businesses can achieve up to 80% cost savings by using our micro call center solutions.',
    source: '(Source: Deloitte)'
  }
];

const approaches = [
  {
    title: 'Super Saver Overhead',
    description: 'Maximize your budget with our strategic location and efficient operations.',
    points: [
      'Up to 80% savings on labor costs',
      'Lower cost of living location benefit',
      'Reduced staff turnover rates'
    ]
  },
  {
    title: 'Focused Quality Service',
    description: 'Bridge skill gaps and optimize internal processes with dedicated staff.',
    points: [
      'Access global talent pools',
      'Boost brand reputation',
      'Redirect on-shore resources to innovation'
    ]
  },
  {
    title: 'Scale Faster',
    description: 'Tailor offshore operations to quickly meet market demand.',
    points: [
      'Rapidly scale team size',
      'Access specialized talent',
      'Zero additional overhead expenses'
    ]
  }
];

export default function Statistics() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-primary/5 -skew-y-6 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Intro */}
        <div className="text-center mb-16 sm:mb-20 animate-slide-up px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Why Choose <span className="text-primary">Caliber?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            We combine world-class talent with strategic cost advantages to deliver
            unparalleled value for your business.
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={elementRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24">
          {stats.map((stat, index) => (
            <AnimatedStat key={stat.label} stat={stat} index={index} isParentVisible={isVisible} />
          ))}
        </div>

        {/* Approach Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {approaches.map((approach, index) => (
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

interface AnimatedStatProps {
  stat: typeof stats[0];
  index: number;
  isParentVisible: boolean;
}

function AnimatedStat({ stat, index, isParentVisible }: AnimatedStatProps) {
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
      className={`group relative p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 scroll-slide-up stagger-${index + 1} ${isParentVisible ? 'visible' : ''}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <stat.icon className="w-16 sm:w-24 h-16 sm:h-24 text-primary" />
      </div>

      <div className="relative z-10">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {displayValue}
        </div>
        <div className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">{stat.label}</div>
        <p className="text-gray-400 text-sm mb-2 leading-relaxed">{stat.description}</p>
        <span className="text-xs text-gray-500 italic">{stat.source}</span>
      </div>
    </div>
  );
}
