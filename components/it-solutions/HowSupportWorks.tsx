import {
  ESCALATION_LEVELS,
  IT_FLAGS,
  PRIORITY_LEVELS,
  SEAT_STATUSES,
  SUPPORT,
  SUPPORT_STEPS,
  approvedOnly,
  type StatusTone,
} from '@/lib/it-solutions';

/**
 * Section 4 — "How support works". Replaces the old call-centre-shaped "How
 * support runs": the four request steps lead, and the pre-shift check is one
 * line for teams that have remote staff rather than the whole story.
 *
 * Escalation and the priority table are stacked grids rather than <table>s:
 * three columns cannot fit 390px without a horizontal scroller.
 */
const TONE_DOT: Record<StatusTone, string> = {
  ready: 'bg-[#0d9e70]',
  attention: 'bg-[#f6b130]',
  critical: 'bg-[#d93636]',
};

export default function HowSupportWorks() {
  const steps = approvedOnly(SUPPORT_STEPS);

  // Both gates: the flag, AND a real first-response value. A priority table
  // with blank response cells is worse than no table at all.
  const priorities = IT_FLAGS.showCoverage
    ? PRIORITY_LEVELS.filter((level) => level.firstResponse !== null)
    : [];

  return (
    <section className="section-padding bg-[#f9f9f9] border-y border-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9b9b9b]">
            {SUPPORT.eyebrow}
          </span>
          <h2 className="heading-2 mt-3 mb-4 text-balance">{SUPPORT.heading}</h2>
          <p className="body-text">{SUPPORT.intro}</p>
        </div>

        {/* Request → Triage → Fix → Report */}
        {steps.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-white border border-[#e0e0e0] rounded-2xl p-6"
              >
                <span className="absolute top-6 right-6 text-3xl font-bold text-[#e0e0e0] leading-none">
                  {index + 1}
                </span>
                <h3 className="text-base font-bold text-[#4a4a4a] mb-2 pr-10">{step.title}</h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-[#6b6b6b] mb-12 max-w-3xl">{SUPPORT.remoteStaffLine}</p>

        <div className="grid lg:grid-cols-2 gap-5">

          {/* Seat status */}
          <div className="bg-white border border-[#e0e0e0] rounded-2xl p-6 sm:p-8">
            <h3 className="heading-3 mb-5">Seat status</h3>
            <ul className="space-y-3">
              {SEAT_STATUSES.map((status) => (
                <li
                  key={status.label}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 pb-3 border-b border-[#e0e0e0] last:border-0 last:pb-0"
                >
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${TONE_DOT[status.tone]}`} />
                  <span className="text-sm font-semibold text-[#4a4a4a]">{status.label}</span>
                  <span className="text-sm text-[#6b6b6b]">{status.description}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Escalation */}
          <div className="bg-white border border-[#e0e0e0] rounded-2xl p-6 sm:p-8">
            <h3 className="heading-3 mb-5">Escalation</h3>
            <ul className="space-y-4">
              {ESCALATION_LEVELS.map((level) => (
                <li
                  key={level.level}
                  className="pb-4 border-b border-[#e0e0e0] last:border-0 last:pb-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#4a4a4a] text-[#7fffd4] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                      {level.level}
                    </span>
                    <span className="text-sm font-semibold text-[#4a4a4a]">{level.who}</span>
                  </div>
                  <p className="text-sm text-[#6b6b6b]">{level.handles}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {priorities.length > 0 && (
          <div className="mt-5 bg-white border border-[#e0e0e0] rounded-2xl p-6 sm:p-8">
            <h3 className="heading-3 mb-5">Priority levels</h3>
            <ul className="space-y-4">
              {priorities.map((level) => (
                <li
                  key={level.priority}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-4 border-b border-[#e0e0e0] last:border-0 last:pb-0"
                >
                  <span className="text-sm font-semibold text-[#4a4a4a]">{level.priority}</span>
                  <span className="text-sm text-[#6b6b6b]">{level.meaning}</span>
                  <span className="text-sm text-[#4a4a4a] font-medium ml-auto whitespace-nowrap">
                    {level.firstResponse}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </section>
  );
}
