'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const overlayY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      id="about"
      className="relative overflow-hidden py-44 text-[#E4E4DE]"
      ref={sectionRef}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/alignment.jpg')", y: backgroundY }}
      />
      <motion.div
        className="absolute inset-0 bg-black/70"
        style={{ y: overlayY }}
      />

      <div className="relative container mx-auto w-full px-12">
        <div className="section-wrapper flex flex-col gap-12">
          <div className="section-heading-wrap flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex-1">
              <h3 className="text-4xl font-semibold leading-tight md:text-7xl">
                Every brand has a frequency. <br />
                Ours is alignment.
              </h3>
            </div>
            <div className="flex-1">
              <p className="text-2xl text-[#E4E4DE]">
                We're not just here to build visuals — we're here to bring
                visions to life, empower bold ideas, and make brands
                unforgettable. Every pixel, word, and interaction is crafted
                with care, intention, and soul. Because we believe when passion
                leads, impact follows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
