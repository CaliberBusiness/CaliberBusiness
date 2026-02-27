'use client';

import { Building2, Target, Heart, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';
import { getImagePath } from '@/lib/utils';
import { useScrollAnimation } from '@/lib/useScrollAnimation';


const ethos = [
  { letter: 'R', text: 'RISE by lifting our People & Clients' },
  { letter: 'I', text: 'IMPACT through Strategic Execution' },
  { letter: 'S', text: 'SUSTAINABILITY through Initiative & Reliability' },
  { letter: 'E', text: 'EMPOWERMENT by Engagement' }
];

const values = [
  {
    icon: Building2,
    title: 'Professional Excellence',
    description: 'We maintain the highest standards in everything we do, delivering exceptional service to our clients and creating a workplace where excellence thrives.'
  },
  {
    icon: Target,
    title: 'Growth & Development',
    description: 'We invest in our people through continuous training, mentorship programs, and clear career progression paths.'
  },
  {
    icon: Heart,
    title: 'Collaborative Culture',
    description: 'We foster a supportive environment where teamwork, respect, and open communication are valued by everyone.'
  }
];

export default function About() {
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
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Our Story */}
        <div id="our-story" className="mb-24 sm:mb-32">
          <div
            ref={storyAnimation.elementRef}
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-slide-up ${storyAnimation.isVisible ? 'visible' : ''}`}
          >
            <h2 className="heading-2 mb-6 sm:mb-8 text-balance">
              Our <span className="text-primary">Story</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Text Content - Left Side */}
              <div className="space-y-4 sm:space-y-6 body-text">
                <p>
                  At Caliber Business Resource Incorporated, we are dedicated to transforming the way businesses
                  approach remote staffing and operational support. CBR was founded not only from a passion for
                  business innovation, but also from a God-given desire to be a blessing to our people and our nation.
                </p>
                <p>
                  We specialize in building high-performing, customized teams through our micro call center offices
                  located in both the vibrant cities and the quieter, yet equally talented, heartlands of the Philippine Islands.
                </p>
                <p>
                  We live by the name <span className="text-primary font-bold">CALIBER</span>—not just in the level of our skill, but in the integrity of our character.
                  Everything we do is done with excellence, with a servant heart, and with the understanding that this
                  work is a stewardship entrusted to us.
                </p>
              </div>

              {/* Video - Right Side */}
              <div className="relative group lg:sticky lg:top-24">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500 rounded-2xl" />
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <video
                    ref={videoRef}
                    src={getImagePath('/video/video.mp4')}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full max-h-[450px] object-contain"
                  />
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all duration-300 border border-white/20 shadow-lg"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message from CEO (Redesigned as a Quote/Highlight section) */}
        <div
          ref={ceoAnimation.elementRef}
          className={`mb-24 sm:mb-32 relative scroll-slide-up ${ceoAnimation.isVisible ? 'visible' : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-8 sm:gap-12 p-6 sm:p-8 md:p-12 items-center bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-8 sm:w-12 h-1 bg-primary rounded-full" />
                <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm">Message from the CEO</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                "We believe that when we put God first, everything else follows."
              </h3>
              <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Caliber Business Resource was born out of a deeper purpose. What began as a business idea quickly
                became a mission: to give back to our fellow Filipinos and, above all, to glorify Him through our work.
              </p>
              <cite className="not-italic">
                <div className="font-bold text-white text-base sm:text-lg">Chrissa B. Ranis</div>
                <div className="text-primary text-sm sm:text-base">Founder & CEO</div>
              </cite>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={getImagePath('/images/profile-fit.png')}
                alt="CEO"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto border-4 border-white/5"
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
            {
              title: 'Vision',
              text: 'To be a game-changer and leader in micro call center solutions, offering the simplest business solutions and robust manpower resources tailored for thriving business enterprises.',
              gradient: 'from-blue-600/20 to-blue-900/20'
            },
            {
              title: 'Mission',
              text: 'We aim to provide unparalleled micro call center and backend solutions, enabling small to medium-sized businesses to achieve strategic clarity and expand their market presence while we manage the operational intricacies.',
              gradient: 'from-amber-500/20 to-amber-700/20'
            }
          ].map((item, idx) => (
            <div key={idx} className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} border border-white/10 hover:border-primary/30 transition-colors`}>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Meet Our Team */}
        <div className="mb-24 sm:mb-32">
          <div
            ref={teamAnimation.elementRef}
            className={`text-center mb-12 sm:mb-16 scroll-slide-up ${teamAnimation.isVisible ? 'visible' : ''} px-4 sm:px-0`}
          >
            <h2 className="heading-2 mb-4 sm:mb-6">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="body-text max-w-2xl mx-auto text-balance">
              Our leadership team brings decades of combined experience in BPO, operational excellence, and strategic management.
            </p>
          </div>

          <div ref={teamAnimation.elementRef} className={`flex flex-wrap justify-center gap-8 scroll-slide-up stagger-2 ${teamAnimation.isVisible ? 'visible' : ''}`}>
            {[
              {
                name: 'Chrissa B. Ranis',
                role: 'Founder & Chairman of the Board',
                image: getImagePath('/images/Chrissa.png')
              },
              {
                name: 'Atty. Euchrissa Theresa Ladrera',
                role: 'Corporate Secretary',
                image: getImagePath('/images/Euchrissa.png')
              },
              {
                name: 'Bertch Ian Ranis',
                role: 'Director for Marketing',
                image: getImagePath('/images/Bertch.png')
              },
              {
                name: 'Laureen Lejarde',
                role: 'Director for Operations',
                image: getImagePath('/images/Laureen.png')
              },
              {
                name: 'Joanne Apat',
                role: 'Business Development Partner',
                image: getImagePath('/images/Joanne.png')
              }
            ].map((member, index) => (
              <div
                key={member.name}
                className="group relative w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] xl:w-[calc(20%-2rem)]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 glass-card transition-all duration-300 group-hover:-translate-y-2 h-full">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-primary font-medium text-sm uppercase tracking-wider">{member.role}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Ethos</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ethos.map((item) => (
              <div
                key={item.letter}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-bold text-background">{item.letter}</span>
                </div>
                <p className="text-gray-300 font-medium group-hover:text-white transition-colors">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Join Us */}
        <div
          ref={valuesAnimation.elementRef}
          className={`relative rounded-3xl overflow-hidden bg-secondary scroll-slide-up ${valuesAnimation.isVisible ? 'visible' : ''}`}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />

          <div className="relative z-10 p-8 md:p-16 lg:p-20">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Join Caliber?</h2>
              <p className="text-gray-400 text-lg">
                We believe our success is driven by our people. We're committed to creating an environment where
                talented individuals can thrive, grow their careers, and make a meaningful impact.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <value.icon className="w-10 h-10 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
