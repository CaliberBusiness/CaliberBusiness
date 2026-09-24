import HowItWorks from '@/components/HowItWorks';
import { HOW_IT_STARTS } from '@/lib/it-solutions';

/**
 * Section 8 — the engagement process.
 *
 * Deliberately a thin wrapper around the homepage's HowItWorks rather than a
 * second numbered-step implementation: the two pages then share one set of
 * styles, and a change to the step treatment lands on both at once.
 * HOW_IT_STARTS is shaped to that component's data prop; the CTA underneath
 * comes from its optional `cta` prop, which the homepage does not pass.
 */
export default function HowItStarts() {
  return <HowItWorks data={HOW_IT_STARTS} cta={HOW_IT_STARTS.cta} />;
}
