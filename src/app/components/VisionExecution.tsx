'use client';

import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';

const pillars = [
  {
    id: '01',
    title: 'Design-Engineering Harmony',
    description: 'We combine design and engineering fluency.',
  },
  {
    id: '02',
    title: 'Modern Stack Delivery',
    description:
      'We build with Next.js, Tailwind, and modern frameworks for performance and scalability.',
  },
  {
    id: '03',
    title: 'Embedded Collaboration',
    description:
      'We collaborate with your team as a creative partner, not a vendor.',
  },
  {
    id: '04',
    title: 'Ownership Ready Handoffs',
    description:
      'We document, hand off, and scale — ensuring your team stays in control.',
  },
];

export default function VisionExecution() {
  return (
    <section id="advantage" className="py-44">
      <div className="container mx-auto w-full px-6 md:px-12 lg:px-20">
        <div className="text-center">
          <span className="text-base uppercase tracking-[0.45em] text-[#ACAF9C]">
            Our Advantage
          </span>
          <h3 className="mt-6 text-4xl text-brand-ivory font-semibold md:text-8xl">
            Where Vision Meets Execution
          </h3>
        </div>

        <div className="mt-16 divide-y divide-white/10 backdrop-blur">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group relative flex flex-col gap-8 px-8 py-16 text-brand-ivory md:flex-row md:items-center md:gap-0"
            >
              <motion.span
                variants={{
                  rest: { scaleX: 0 },
                  hover: { scaleX: 1 },
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-brand-sage"
              />
              <div className="flex w-full justify-start md:w-1/5">
                <span
                  className={cx(
                    'inline-flex items-center rounded-full',
                    'bg-white text-sm tracking-[0.3em] px-5 py-2',
                    'font-semibold text-brand-ink backdrop-blur',
                    'shadow-[0_8px_20px_rgba(0,0,0,0.25)]'
                  )}
                >
                  {pillar.id}
                </span>
              </div>
              <div className="flex w-full md:w-2/5 md:justify-start">
                <h3 className="text-2xl font-semibold uppercase tracking-[0.08em] md:text-3xl">
                  {pillar.title}
                </h3>
              </div>
              <div className="flex w-full justify-start md:w-2/5 md:justify-end">
                <p className="max-w-sm text-base text-brand-ivory/80 md:text-right md:text-lg">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
