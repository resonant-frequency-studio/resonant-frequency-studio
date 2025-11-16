import { cx } from 'class-variance-authority';
import Link from 'next/link';

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  revisions: string;
}

const PLANS: PricingPlan[] = [
  {
    id: 1,
    name: 'Basic',
    price: '$2000',
    period: '/month',
    description:
      'A consistent design solution for startups and small businesses.',
    features: [
      'Custom website design',
      'Basic SEO optimization',
      'Responsive & mobile-friendly layouts',
      'Analytics & reporting',
    ],
    revisions: 'Up to 2 revision cycles',
  },
  {
    id: 2,
    name: 'Standard',
    price: '$3000',
    period: '/month',
    description:
      'Whether you are a startup or a small business, we provide a consistent design solution for you.',
    features: [
      'Custom website design',
      'Basic SEO optimization',
      'Responsive & mobile-friendly layouts',
      'Analytics & reporting',
    ],
    revisions: 'Unlimited minor revisions',
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-44 rounded-tr-[10vw] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(89,95,57,0.2)_0%,rgba(18,18,18,0.2)_60%)]" />
      <div className="relative container mx-auto w-full px-4 md:px-12">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="flex-1">
              <span className="text-base uppercase tracking-[0.35em] text-[#ACAF9C]">
                Pricing
              </span>
              <h3 className="mt-6 text-4xl md:text-6xl font-semibold text-brand-ivory leading-tight">
                Built-for-you partnerships, not one-off packages.
              </h3>
              <p className="mt-4 max-w-2xl text-lg text-brand-ivory/70">
                Every engagement includes strategy, design, and development
                tuned to your roadmap. Choose the cadence that matches your
                momentum, or reach out for a custom scope.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className="group flex h-full flex-col rounded-[36px] border border-white/10 bg-white/5 p-10 text-brand-ivory backdrop-blur transition hover:border-white/20 hover:bg-white/8"
              >
                <div className="flex flex-1 flex-col gap-8">
                  <div className="flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[#ACAF9C]">
                      {plan.name}
                    </div>
                    <div className="flex items-end gap-2">
                      <h3 className="text-4xl font-semibold text-brand-ivory">
                        {plan.price}
                      </h3>
                      <span className="pb-1 text-sm uppercase tracking-[0.3em] text-brand-ivory/60">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-brand-ivory/70">{plan.description}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-brand-ivory">
                      What&apos;s included
                    </h4>
                    <ul className="space-y-3 text-sm text-brand-ivory/80">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <svg
                            className="h-5 w-5 text-brand-sage"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                      <li className="flex items-center gap-3">
                        <svg
                          className="h-5 w-5 text-brand-sage"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {plan.revisions}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="#contact"
            className={cx(
              'inline-flex items-center gap-2 self-center rounded-full',
              'border border-white/40 bg-white/10 px-6 py-3 mt-12 text-base',
              'font-semibold text-white backdrop-blur',
              'transition hover:bg-white/20 hover:border-white'
            )}
          >
            Let&apos;s Build Something That Resonates
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
