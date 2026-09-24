import { Quote } from 'lucide-react';
import { IT_FLAGS, TESTIMONIAL } from '@/lib/it-solutions';

/**
 * Section 6. Hidden behind showTestimonial until reuse on this page is
 * confirmed — attributing a real person's words to a service they did not
 * comment on is not something a default should do.
 */
export default function ITTestimonial() {
  if (!IT_FLAGS.showTestimonial) return null;

  return (
    <section className="section-padding-sm bg-[#4a4a4a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <figure className="text-center">
          <Quote className="w-8 h-8 text-[#7fffd4] mx-auto mb-6" aria-hidden="true" />
          <blockquote className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed text-balance">
            {TESTIMONIAL.quote}
          </blockquote>
          <figcaption className="mt-6">
            <span className="block text-sm font-semibold text-white">{TESTIMONIAL.name}</span>
            <span className="block text-sm text-white/60">{TESTIMONIAL.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
