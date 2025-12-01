'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import SoundWaves from '../../components/SoundWaves';
import BurstLines from '../../components/BurstLines';
import Navigation from '@/app/components/Navigation';
import Hero from './components/Hero';
import IntermediarySection from './components/IntermediarySection';
import {
  ScrollContextProvider,
  useScrollContext,
} from './context/ScrollContext';
import WorksSection from './components/WorksSection';
import { useThemeColors } from './hooks/useThemeColors';
import { useCrossfade } from '../../hooks/useCrossfade';

const PaperDemoContent = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  const { boxScaleComplete } = useScrollContext();
  const themeColors = useThemeColors();
  const { toOpacity: burstOpacity } = useCrossfade(boxScaleComplete, 500);

  return (
    <div ref={containerRef} className="relative pointer-events-none">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0 bg-brand-paper">
        {/* <Image src="/paper.png" alt="Paper Demo" fill objectFit="cover" /> */}
        <SoundWaves scrollProgress={scrollProgress} />
        <BurstLines
          scrollProgress={scrollProgress}
          opacity={burstOpacity}
          lineColor={themeColors.light}
        />
      </div>

      {/* Scrollable Content Layer */}
      <div className="relative">
        <Navigation animateEntrance={true} />

        <main className="flex flex-col">
          {/* Hero Section - 100vh */}
          <div className="h-screen relative">
            <Hero />
          </div>
          <div className="pointer-events-auto">
            {/* Intermediary Section - Scroll Driven */}
            <IntermediarySection />

            {/* Works Section */}
            <WorksSection />
          </div>
        </main>
      </div>
    </div>
  );
};

export default function PaperDemoPage() {
  return (
    <ScrollContextProvider>
      <PaperDemoContent />
    </ScrollContextProvider>
  );
}
