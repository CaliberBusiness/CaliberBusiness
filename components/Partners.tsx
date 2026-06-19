'use client';

import { getImagePath } from '@/lib/utils';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

interface PartnerLogo {
  name: string;
  image: string;
  /** Render this logo larger (e.g. icon-only marks that read small at the default size). */
  enlarge?: boolean;
}

// Literal class strings so Tailwind picks them up (it does not scan JSON content).
const DEFAULT_LOGO_SIZE = 'h-10 sm:h-12';
const ENLARGED_LOGO_SIZE = 'h-16 sm:h-20';

interface PartnersProps {
  data: {
    title: string;
    titleHighlight: string;
    logos: PartnerLogo[];
  };
}

// Repeat the small logo set enough times that one half of the track is wider
// than the viewport, so the tight loop never reveals a blank gap.
const SET_REPEAT = 3;

export default function Partners({ data }: PartnersProps) {
  const animation = useScrollAnimation({ threshold: 0.2 });

  const half = Array.from({ length: SET_REPEAT }).flatMap(() => data.logos);
  // Two identical halves; the track shifts -50% (exactly one half) for a seamless loop.
  const track = [...half, ...half];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div
        ref={animation.elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-slide-up ${animation.isVisible ? 'visible' : ''}`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#4a4a4a] mb-3">
            {data.title} <span className="text-[#0d9e70]">{data.titleHighlight}</span>
          </h2>
          <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full" />
        </div>

        <div className="marquee-paused overflow-hidden">
          <ul className="animate-marquee flex w-max items-center gap-16">
            {track.map((logo, idx) => (
              <li key={`${logo.name}-${idx}`} aria-hidden={idx >= half.length} className="shrink-0">
                <img
                  src={getImagePath(logo.image)}
                  alt={logo.name}
                  className={`${logo.enlarge ? ENLARGED_LOGO_SIZE : DEFAULT_LOGO_SIZE} w-auto object-contain`}
                  style={{ filter: 'grayscale(100%)', opacity: 1 }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
