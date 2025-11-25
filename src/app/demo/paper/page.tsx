'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import SoundWaves from '../../components/SoundWaves';
import Navigation from '@/app/components/Navigation';
import Hero from './components/Hero';
import IntermediarySection from './components/IntermediarySection';

export default function PaperDemoPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  return (
    <div ref={containerRef} className="min-h-[300vh] pointer-events-none">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0">
        <Image src="/paper.png" alt="Paper Demo" fill objectFit="cover" />
        <SoundWaves scrollProgress={scrollProgress} />
      </div>

      {/* Scrollable Content Layer */}
      <div className="relative">
        <Navigation animateEntrance={true} />

        <main className="flex flex-col">
          {/* Hero Section - 100vh */}
          <div className="h-screen w-full relative">
            <Hero />
          </div>

          {/* Intermediary Section */}
          <IntermediarySection />

          {/* Spacer for scrolling effect */}
          <div className="h-screen"></div>
        </main>
      </div>
    </div>
  );
}
