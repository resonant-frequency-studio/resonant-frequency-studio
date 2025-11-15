'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { cx } from 'class-variance-authority';

const CARDS = [
  {
    title: 'Brand & Identity',
    description: 'Logos, typography, and style guides that align teams',
    iconSrc: '/branding-icon.svg',
    iconAlt: 'Branding icon',
  },
  {
    title: 'Web Design',
    description: 'Figma-driven, conversion-focused, responsive design',
    iconSrc: '/web-design-icon.svg',
    iconAlt: 'Web design icon',
  },
  {
    title: 'Design Systems',
    description: 'Atomic components that scale design consistency',
    iconSrc: '/design-system-icon.svg',
    iconAlt: 'Design systems icon',
  },
  {
    title: 'Web Development',
    description: 'Custom Next.js, React, and CMS-driven development',
    iconSrc: '/development-icon.svg',
    iconAlt: 'Web development icon',
  },
];

export default function Overview() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden py-44 text-brand-ivory rounded-tl-[10vw]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(89,95,57,0.2)_0%,rgba(18,18,18,1)_60%)]" />
      <div className="relative container mx-auto w-full px-12">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="flex-1 text-center">
              <h3 className="mb-12 text-4xl font-semibold leading-tight md:text-8xl">
                Crafting digital experiences that hit the right frequency.
              </h3>
              <p className="text-xl text-inherit">
                We partner with ambitious founders, creators, and brands to
                design and build high-impact websites and web apps. From
                early-stage startups to established companies, our work helps
                audiences connect — intuitively, emotionally, and measurably.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div />
            {CARDS.map((card) => (
              <SpotlightCard key={card.title} className="bg-[#292929]">
                <div className="flex flex-col items-start gap-6 text-left">
                  <motion.div
                    initial={{ rotateY: 0 }}
                    whileHover={{ rotateY: 360 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{
                      transformStyle: 'preserve-3d',
                      transformPerspective: 600,
                    }}
                    className="inline-flex size-16 items-center justify-center rounded-full bg-brand-ivory/10"
                  >
                    <Image
                      src={card.iconSrc}
                      alt={card.iconAlt}
                      width={40}
                      height={40}
                      className="h-10 w-10"
                      priority
                    />
                  </motion.div>
                  <h3
                    className={cx(
                      'mt-36 w-full text-4xl font-bold uppercase relative pb-12',
                      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-brand-sage after:content-['']"
                    )}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xl">{card.description}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
