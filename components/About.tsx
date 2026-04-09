'use client';

import { Building2, Target, Heart, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';
import { getImagePath } from '@/lib/utils';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

const valueIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Target, Heart
};

interface AboutProps {
  data: {
    storyTitle: string;
    storyTitleHighlight: string;
    storyParagraphs: string[];
    storyVideoUrl: string;
    ceoQuote: string;
    ceoMessage: string;
    ceoName: string;
    ceoTitle: string;
    ceoImage: string;
    visionText: string;
    missionText: string;
    teamTitle: string;
    teamTitleHighlight: string;
    teamSubtitle: string;
    teamMembers: { name: string; role: string; image: string }[];
    ethos: { letter: string; text: string }[];
    whyJoinTitle: string;
    whyJoinSubtitle: string;
    values: { icon: string; title: string; description: string }[];
  };
}

export default function About({ data }: AboutProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const storyAnimation = useScrollAnimation({ threshold: 0.1 });
  const ceoAnimation = useScrollAnimation({ threshold: 0.2 });
  const visionMissionAnimation = useScrollAnimation({ threshold: 0.2 });
  const teamAnimation = useScrollAnimation({ threshold: 0.1 });
  const ethosAnimation = useScrollAnimation({ threshold: 0.2 });
  const valuesAnimation = useScrollAnimation({ threshold: 0.2 });

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Our Story */}
        <div id="our-story" className="mb-24 sm:mb-32">
          <div
            ref={storyAnimation.elementRef}
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-slide-up ${storyAnimation.isVisible ? 'visible' : ''}`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#4a4a4a] mb-3 text-balance">
              {data.storyTitle} <span className="text-[#4a4a4a]">{data.storyTitleHighlight}</span>
            </h2>
            <div className="w-10 h-1 bg-[#7fffd4] rounded-full mb-6 sm:mb-8" />

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-4 sm:space-y-6 text-[#6b6b6b] text-base sm:text-lg leading-relaxed">
                {data.storyParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="relative group lg:sticky lg:top-24">
                <div className="relative rounded-xl overflow-hidden border border-[#e0e0e0] shadow-lg">
                  <video
                    ref={videoRef}
                    src={getImagePath(data.storyVideoUrl)}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full max-h-[450px] object-contain"
                  />
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-[#4a4a4a]/80 hover:bg-[#4a4a4a] text-white backdrop-blur-sm transition-all duration-300 border border-white/20 shadow-lg"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message from CEO */}
        <div
          ref={ceoAnimation.elementRef}
          className={`mb-24 sm:mb-32 scroll-slide-up ${ceoAnimation.isVisible ? 'visible' : ''}`}
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 p-6 sm:p-8 md:p-12 items-center bg-[#fffdd0] rounded-3xl border border-[#e0e0e0]">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-8 sm:w-12 h-1 bg-[#7fffd4] rounded-full" />
                <span className="text-[#4a4a4a] font-bold uppercase tracking-widest text-xs sm:text-sm">Message from the CEO</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4a4a4a] mb-4 sm:mb-6 leading-tight">
                &quot;{data.ceoQuote}&quot;
              </h3>
              <p className="text-[#6b6b6b] mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                {data.ceoMessage}
              </p>
              <cite className="not-italic">
                <div className="font-bold text-[#4a4a4a] text-base sm:text-lg">{data.ceoName}</div>
                <div className="text-[#0d8a63] text-sm sm:text-base font-medium">{data.ceoTitle}</div>
              </cite>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={getImagePath(data.ceoImage)}
                alt="CEO"
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto border border-[#e0e0e0]"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div
          ref={visionMissionAnimation.elementRef}
          className={`grid sm:grid-cols-2 gap-4 sm:gap-6 mb-24 sm:mb-32 scroll-slide-up ${visionMissionAnimation.isVisible ? 'visible' : ''}`}
        >
          {[
            { title: 'Vision', text: data.visionText },
            { title: 'Mission', text: data.missionText }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#fffdd0] border border-[#e0e0e0] shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-[#4a4a4a] mb-3 sm:mb-4">{item.title}</h3>
              <p className="text-[#6b6b6b] leading-relaxed text-sm sm:text-base">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Meet Our Team */}
        <div className="mb-24 sm:mb-32">
          <div
            ref={teamAnimation.elementRef}
            className={`text-center mb-12 sm:mb-16 scroll-slide-up ${teamAnimation.isVisible ? 'visible' : ''} px-4 sm:px-0`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#4a4a4a] mb-3">
              {data.teamTitle} <span className="text-[#4a4a4a]">{data.teamTitleHighlight}</span>
            </h2>
            <div className="w-10 h-1 bg-[#7fffd4] mx-auto rounded-full mb-4 sm:mb-6" />
            <p className="text-[#6b6b6b] text-base sm:text-lg max-w-2xl mx-auto text-balance leading-relaxed">
              {data.teamSubtitle}
            </p>
          </div>

          <div ref={teamAnimation.elementRef} className={`flex flex-wrap justify-center gap-8 scroll-slide-up stagger-2 ${teamAnimation.isVisible ? 'visible' : ''}`}>
            {data.teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="group relative w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] xl:w-[calc(20%-2rem)]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white border border-[#e0e0e0] shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg h-full">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={getImagePath(member.image)}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4a4a4a] via-[#4a4a4a]/20 to-transparent opacity-70" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-[#7fffd4] font-medium text-sm uppercase tracking-wider">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ethos */}
        <div
          ref={ethosAnimation.elementRef}
          className={`mb-32 scroll-slide-up ${ethosAnimation.isVisible ? 'visible' : ''}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4a4a4a] mb-4">Our Ethos</h2>
            <div className="w-24 h-1 bg-[#7fffd4] mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.ethos.map((item) => (
              <div
                key={item.letter}
                className="group p-6 rounded-2xl bg-white border border-[#e0e0e0] shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-[#7fffd4]/20 border border-[#7fffd4]/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-bold text-[#4a4a4a]">{item.letter}</span>
                </div>
                <p className="text-[#6b6b6b] font-medium group-hover:text-[#4a4a4a] transition-colors">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Join Us */}
        <div
          ref={valuesAnimation.elementRef}
          className={`relative rounded-3xl overflow-hidden bg-[#fffdd0] border border-[#e0e0e0] scroll-slide-up ${valuesAnimation.isVisible ? 'visible' : ''}`}
        >
          <div className="relative z-10 p-8 md:p-16 lg:p-20">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#4a4a4a] mb-6">{data.whyJoinTitle}</h2>
              <p className="text-[#6b6b6b] text-lg">{data.whyJoinSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {data.values.map((value, index) => {
                const IconComponent = valueIconMap[value.icon];
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 border border-[#e0e0e0] shadow-sm hover:shadow-md transition-all"
                  >
                    {IconComponent && <IconComponent className="w-10 h-10 text-[#0d9e70] mb-6" />}
                    <h3 className="text-xl font-bold text-[#4a4a4a] mb-3">{value.title}</h3>
                    <p className="text-[#6b6b6b] leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
