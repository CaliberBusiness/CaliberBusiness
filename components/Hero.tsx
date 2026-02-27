import { ArrowRight, Sparkles } from 'lucide-react';
import { getImagePath } from '@/lib/utils';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 lg:pt-32 pb-16 lg:pb-24"
    >
      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-8 lg:mt-0">

          {/* Left Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 lg:mb-8 shadow-lg shadow-black/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-300">Trusted Outsourcing Partner</span>
            </div>

            {/* Main Heading */}
            <h1 className="heading-1 mb-6 text-balance">
              Scale Your Operations.<br className="hidden lg:block" />
              <span className="text-gradient-gold block lg:inline"> Reduce Hiring Friction.</span>
            </h1>

            {/* Subtitle */}
            <p className="body-text max-w-2xl lg:max-w-xl mb-8 lg:mb-10 text-balance">
              Premium remote staffing solutions from the Philippines. We provide structured evaluation, dedicated account management, and managed onboarding for a long-term partnership model.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full mb-12 lg:mb-0">
              <a
                href="#connect"
                className="btn-primary w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5" />
                </span>
              </a>
              <a
                href="#open-roles"
                className="btn-secondary w-full sm:w-auto"
              >
                Apply for a Job
              </a>
            </div>
          </div>

          {/* Right Image Collage */}
          <div className="relative h-[450px] lg:h-[600px] w-full mt-8 lg:mt-0 perspective-1000 group">
            {/* Decorative glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-primary/20 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 group-hover:bg-primary/30" />

            {/* Main Image */}
            <div className="absolute top-0 right-0 w-[85%] lg:w-4/5 h-[280px] lg:h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10 transition-transform duration-700 hover:-translate-y-2">
              <img
                src={getImagePath('/images/hero-main.jpg')}
                alt="Professional Team working in office"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                onError={(e) => {
                  // Fallback to a placeholder if image is missing
                  e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%231a1a2e%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20fill%3D%22%234a4a6a%22%20text-anchor%3D%22middle%22%3Ehero-main.jpg%3C%2Ftext%3E%3C%2Fsvg%3E';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Secondary Image 1 - Bottom Left */}
            <div className="absolute bottom-10 lg:bottom-10 left-0 w-[65%] lg:w-3/5 h-[200px] lg:h-[280px] rounded-3xl overflow-hidden border-4 border-background shadow-2xl z-20 transition-transform duration-700 hover:-translate-y-2 delay-75">
              <img
                src={getImagePath('/images/hero-secondary-1.jpg')}
                alt="Focused team member"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%2316213e%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20fill%3D%22%234a4a6a%22%20text-anchor%3D%22middle%22%3Ehero-secondary-1.jpg%3C%2Ftext%3E%3C%2Fsvg%3E';
                }}
              />
            </div>

            {/* Secondary Image 2 - Top Left floating */}
            <div className="hidden lg:block absolute top-16 -left-8 w-[180px] h-[180px] rounded-3xl overflow-hidden border-4 border-background shadow-2xl z-30 transition-transform duration-700 hover:-translate-y-4 shadow-primary/10">
              <img
                src={getImagePath('/images/hero-secondary-2.jpg')}
                alt="Collaborative meeting"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%230f3460%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20fill%3D%22%234a4a6a%22%20text-anchor%3D%22middle%22%3Ehero-secondary-2.jpg%3C%2Ftext%3E%3C%2Fsvg%3E';
                }}
              />
            </div>

          </div>
        </div>

        {/* Stats / Trust Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 pt-12 lg:pt-16 mt-12 lg:mt-20 border-t border-white/10 relative z-20">
          {[
            { label: 'Leadership', value: '15+ Yrs' },
            { label: 'Facility Type', value: 'Micro-Center' },
            { label: 'Max Cost Savings', value: '80%' },
            { label: 'Talent Vetting', value: 'Multi-Stage' },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left bg-white/5 lg:bg-transparent p-4 lg:p-0 rounded-2xl lg:rounded-none border border-white/5 lg:border-none hover:bg-white/10 transition-colors lg:hover:bg-transparent">
              <span className="text-2xl lg:text-4xl font-bold text-white mb-1 lg:mb-2 whitespace-nowrap">{stat.value}</span>
              <span className="text-xs lg:text-sm text-gray-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
