"use client";

import { useScrollAnimation } from '@/lib/useScrollAnimation';

interface GoogleMapsSectionProps {
    data: {
        title: string;
        subtitle: string;
        embedUrl: string;
        address: string;
    };
}

export default function GoogleMapsSection({ data }: GoogleMapsSectionProps) {
    const mapsAnimation = useScrollAnimation({ threshold: 0.1 });

    return (
        <section
            ref={mapsAnimation.elementRef}
            className={`py-16 bg-secondary/30 scroll-slide-up ${mapsAnimation.isVisible ? 'visible' : ''}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{data.title}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">{data.subtitle}</p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-4xl mx-auto">
                    <iframe
                        src={data.embedUrl}
                        width="100%"
                        height="250"
                        className="h-[250px] sm:h-[350px] md:h-[400px]"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Caliber Business Resource - ${data.address}`}
                    ></iframe>
                </div>

                <div className="mt-8 text-center">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 border border-white/10 text-center sm:text-center max-w-xl mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary shrink-0 mx-auto sm:mx-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 1.621.497 3.142 1.358 4.412l-.78 3.538a.5.5 0 0 0 .654.654l3.538-.78A7.96 7.96 0 0 0 12 18c4.418 0 8-3.582 8-8z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span className="text-white text-sm sm:text-base">{data.address}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
