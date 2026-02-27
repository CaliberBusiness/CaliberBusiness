"use client";

import { getImagePath } from '@/lib/utils';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

interface CultureSectionProps {
    data: {
        title: string;
        titleHighlight: string;
        subtitle: string;
        videoUrl: string;
        videoPoster: string;
        cards: { icon: string; title: string; description: string }[];
        quoteText: string;
        quoteAuthor: string;
    };
}

export default function CultureSection({ data }: CultureSectionProps) {
    const cultureAnimation = useScrollAnimation({ threshold: 0.1 });
    const cultureCardsAnimation = useScrollAnimation({ threshold: 0.2 });

    return (
        <div className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={cultureAnimation.elementRef}
                    className={`text-center mb-16 scroll-slide-up ${cultureAnimation.isVisible ? 'visible' : ''}`}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        {data.title} <span className="text-primary">{data.titleHighlight}</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                        {data.subtitle}
                    </p>
                </div>

                <div
                    ref={cultureAnimation.elementRef}
                    className={`relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-w-4xl mx-auto bg-black scroll-slide-up stagger-1 ${cultureAnimation.isVisible ? 'visible' : ''}`}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500 rounded-2xl" />

                    <video
                        src={getImagePath(data.videoUrl)}
                        className="w-full aspect-video object-cover"
                        poster={getImagePath(data.videoPoster)}
                        controls
                        preload="metadata"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>

                {/* Culture Details */}
                <div
                    ref={cultureCardsAnimation.elementRef}
                    className={`mt-12 sm:mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto scroll-slide-up ${cultureCardsAnimation.isVisible ? 'visible' : ''}`}
                >
                    {data.cards.map((card, idx) => (
                        <div key={idx} className={`bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 text-center ${idx === 2 ? 'sm:col-span-2 md:col-span-1' : ''}`}>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                    <path d="M9 9h.01"></path>
                                    <path d="M15 9h.01"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{card.title}</h3>
                            <p className="text-gray-400 text-sm sm:text-base">{card.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 sm:mt-12 text-center max-w-3xl mx-auto px-2">
                    <blockquote className="text-base sm:text-lg md:text-xl text-gray-300 italic border-l-4 border-primary pl-4 sm:pl-6 py-2 text-left sm:text-center">
                        &quot;{data.quoteText}&quot;
                    </blockquote>
                    <p className="mt-3 sm:mt-4 text-primary font-bold text-sm sm:text-base">- {data.quoteAuthor}</p>
                </div>
            </div>
        </div>
    );
}
