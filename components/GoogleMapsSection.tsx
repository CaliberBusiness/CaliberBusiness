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
            className={`py-16 bg-[#fffdd0] border-t border-[#e0e0e0] scroll-slide-up ${mapsAnimation.isVisible ? 'visible' : ''}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#4a4a4a] mb-3">{data.title}</h2>
                    <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full mb-4" />
                    <p className="text-[#4a4a4a]/70 max-w-2xl mx-auto">{data.subtitle}</p>
                </div>

                <div className="rounded-2xl overflow-hidden border-2 border-[#7fffd4] shadow-md max-w-4xl mx-auto">
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
                    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-white rounded-lg px-4 sm:px-6 py-3 border border-[#e0e0e0] shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#0d9e70] shrink-0 mx-auto sm:mx-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 1.621.497 3.142 1.358 4.412l-.78 3.538a.5.5 0 0 0 .654.654l3.538-.78A7.96 7.96 0 0 0 12 18c4.418 0 8-3.582 8-8z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span className="text-[#4a4a4a] text-sm sm:text-base font-medium">{data.address}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
