'use client';

import { useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';
import * as motion from 'framer-motion/client';
import Link from 'next/link';
import { ScrollAnimated, HandDrawnBox } from './HandDrawn';

interface BoxContentProps {
  size: MotionValue<string>;
  drawProgress: MotionValue<number>;
  scrollProgress: MotionValue<number>;
  fillProgress: MotionValue<number>;
}

function BoxContent({
  size,
  drawProgress,
  scrollProgress,
  fillProgress,
}: BoxContentProps) {
  // Track whether content should be shown based on scroll threshold
  const [showContent, setShowContent] = useState(false);

  // Listen to scroll progress and toggle content visibility at 50% threshold
  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    setShowContent(latest > 0.5);
  });

  return (
    <>
      {/* Hand-drawn box */}
      <HandDrawnBox
        size={size}
        drawProgress={drawProgress}
        fillColor="#CDCAB7"
        fillProgress={fillProgress}
        color="#484D2E"
        strokeWidth={0.25}
        wobbleIntensity={0.8}
      />

      {/* Content Layer - Centered inside the box */}
      <motion.div
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="absolute z-10 max-w-4xl w-full text-center"
      >
        <h2 className="text-[6vw] md:text-[5vw] font-bold tracking-tight leading-[0.9] text-[#484D2E] mb-26">
          Every brand has a frequency. <br />
          Ours is alignment.
        </h2>

        <p className="inline-block text-xl md:text-3xl font-medium text-[#484D2E]">
          We&apos;re not just here to build visuals — we&apos;re here to bring
          visions to life, empower bold ideas, and make brands unforgettable.
          Every pixel, word, and interaction is crafted with care, intention,
          and soul. Because we believe when passion leads, impact follows.
        </p>
      </motion.div>
    </>
  );
}

export default function IntermediarySection() {
  return (
    <ScrollAnimated
      initialSize="40%"
      finalSize="100%"
      drawRange={[0, 0.4]}
      scaleRange={[0.4, 0.5]}
      containerHeight="300vh"
    >
      {(props) => <BoxContent {...props} />}
    </ScrollAnimated>
  );
}
