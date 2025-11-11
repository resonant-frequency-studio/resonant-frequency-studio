'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  summary: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Relax Studio',
    category: 'Wellness Platform',
    summary:
      'Guided a rebrand and product refresh for a digital wellness company with a focus on motion-led storytelling.',
  },
  {
    id: 2,
    title: 'Fusion Labs',
    category: 'SaaS Platform',
    summary:
      'Designed a modular design system and developer experience for a high-growth AI SaaS team.',
  },
  {
    id: 3,
    title: 'Crimson Canvas',
    category: 'E-commerce',
    summary:
      'Delivered a tactile commerce experience for a fine-art marketplace, complete with dynamic previews.',
  },
  {
    id: 4,
    title: 'Aurora Design',
    category: 'Product Launch',
    summary:
      'Partnered with an interior design collective to orchestrate an immersive launch campaign and microsite.',
  },
];

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(projects.length - 1) * 93}%`]
  );

  const sectionHeight = projects.length * 100;

  return (
    <section id="works" className="bg-[#121212] text-[#E4E4DE]">
      <div>
        <div className="container mx-auto w-full px-4 md:px-12">
          <div className="max-w-3xl">
            <span className="text-base uppercase tracking-[0.35em] text-[#ACAF9C]">
              Our Work
            </span>
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl lg:text-7xl">
              Recent partnerships that shipped clarity and conversion.
            </h2>
            <p className="mt-6 text-lg text-[#E4E4DE]/75 md:text-xl">
              Scroll to move through the work—each chapter pairs brand resonance
              with technical precision.
            </p>
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="mx-auto mt-16 w-full max-w-7xl px-4 md:hidden">
          <div className="space-y-8">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="rounded-[32px] border border-white/12 bg-white/6 p-8 backdrop-blur"
              >
                <div className="text-xs uppercase tracking-[0.35em] text-[#ACAF9C]">
                  Project {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-3 text-3xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.32em] text-[#E4E4DE]/55">
                  {project.category}
                </p>
                <p className="mt-4 text-base text-[#E4E4DE]/80">
                  {project.summary}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop horizontal scroll */}
        <div className="hidden md:block">
          <div ref={trackRef} style={{ height: `${sectionHeight}vh` }}>
            <div className="sticky top-0 flex h-screen items-center">
              <div className="w-full overflow-hidden">
                <motion.div className="flex" style={{ x: translateX }}>
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="w-full shrink-0 px-6"
                      style={{ maxWidth: 'calc(100vw - 6rem)' }}
                    >
                      <article className="flex h-full flex-col justify-between rounded-[32px] border border-white/12 bg-black/35 p-12 text-left shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
                        <div className="space-y-6">
                          <div className="text-xs uppercase tracking-[0.35em] text-[#ACAF9C]">
                            Project {String(index + 1).padStart(2, '0')}
                          </div>
                          <h3 className="text-4xl font-semibold md:text-5xl">
                            {project.title}
                          </h3>
                          <p className="text-sm uppercase tracking-[0.32em] text-[#E4E4DE]/60">
                            {project.category}
                          </p>
                          <p className="max-w-xl text-lg text-[#E4E4DE]/80">
                            {project.summary}
                          </p>
                        </div>
                        <div className="mt-10 h-64 w-full overflow-hidden rounded-[28px] border border-white/12 bg-linear-to-br from-white/10 via-white/5 to-transparent">
                          <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(89,95,57,0.35),rgba(18,18,18,0.6))]" />
                        </div>
                      </article>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
