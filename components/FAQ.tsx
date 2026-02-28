'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

interface FAQProps {
    data: {
        title: string;
        titleHighlight: string;
        items: { question: string; answer: string }[];
    };
}

export default function FAQ({ data }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const headerAnimation = useScrollAnimation({ threshold: 0.2 });

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div
                    ref={headerAnimation.elementRef as React.RefObject<HTMLDivElement>}
                    className={`text-center mb-12 transition-all duration-700 ${headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        {data.title} <span className="text-gradient-gold">{data.titleHighlight}</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                        Everything you need to know about working with Caliber Business Resource.
                    </p>
                </div>

                <div className="space-y-3">
                    {data.items.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border transition-all duration-300 ${isOpen
                                    ? 'bg-white/10 border-primary/30 shadow-lg shadow-primary/5'
                                    : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                                    }`}
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`text-base sm:text-lg font-semibold pr-4 transition-colors ${isOpen ? 'text-primary' : 'text-white group-hover:text-primary/80'}`}>
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 shrink-0 transition-all duration-300 ${isOpen ? 'text-primary rotate-180' : 'text-gray-400 group-hover:text-primary/60'
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="px-6 pb-5 text-gray-400 leading-relaxed text-sm sm:text-base">
                                        {item.answer}
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
