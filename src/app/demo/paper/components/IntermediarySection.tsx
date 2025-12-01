'use client';

import { useState } from 'react';
import { MotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import * as motion from 'framer-motion/client';
import { ScrollAnimated, HandDrawnBox } from './HandDrawn';
import { useScrollContext } from '../context/ScrollContext';
import { useThemeColors } from '../hooks/useThemeColors';

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
  const { setBoxScaleComplete } = useScrollContext();
  const themeColors = useThemeColors();

  // Listen to scroll progress and toggle content visibility at 50% threshold
  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    setShowContent(latest > 0.5);

    // Box scale completes at 0.5 (end of scaleRange [0.4, 0.5])
    // Signal to SoundWaves that it's time to crossfade
    if (latest >= 0.5) {
      setBoxScaleComplete(true);
    } else {
      setBoxScaleComplete(false);
    }
  });

  // Scale down phase: from 0.6 to 0.8 scroll progress (while still sticky)
  const scaleDown = useTransform(scrollProgress, [0.6, 0.8], [1, 0.4]);
  const opacity = useTransform(scrollProgress, [0.8, 0.85], [1, 0]);

  // Works Transition
  // Reveal: 0.8 -> 0.85 (Fade in quickly as box starts fading out)
  // Pause: 0.85 -> 0.9 (Hold at scale 0.4 for a couple scrolls)
  // Zoom: 0.9 -> 1.0 (Zoom into O)
  // Scale: Start at 0.4 (matching box scale), hold during fade and pause, then zoom to 50
  const worksOpacity = useTransform(scrollProgress, [0.8, 0.85], [0, 1]);
  const worksScale = useTransform(
    scrollProgress,
    [0.8, 0.85, 0.9, 1.0],
    [0.4, 0.4, 0.4, 50]
  );

  return (
    <section
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      id="intermediary"
    >
      {/* WORKS Heading Layer - Independent of Box Scale */}
      <motion.div
        style={{
          opacity: worksOpacity,
          scale: worksScale,
          x: '10.5%', // Shift right more
          transformOrigin: '40.5% 44%', // Keep origin same for now
        }}
        className="absolute z-0 flex items-center justify-center pointer-events-none"
      >
        <h3 className="text-[16vw] font-bold tracking-tight leading-[0.8] text-brand-paper-dark whitespace-nowrap relative">
          W
          <span className="relative inline-block text-brand-paper-dark">
            O{/* Green Circle Background for O */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-brand-paper rounded-full -z-10" />
          </span>
          RKS
        </h3>
      </motion.div>

      {/* Box Layer - Scales Down and Fades Out */}
      <motion.div
        style={{ scale: scaleDown, opacity }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        {/* Hand-drawn box - theme aware colors */}
        <HandDrawnBox
          size={size}
          drawProgress={drawProgress}
          fillColor={themeColors.dark}
          fillProgress={fillProgress}
          color={themeColors.light}
          strokeWidth={0.25}
          wobbleIntensity={0.8}
        />

        {/* Content Layer - Centered inside the box */}
        <motion.div
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute z-10 max-w-4xl w-full text-center"
        >
          <h2 className="text-[6vw] md:text-[5vw] font-bold tracking-tight leading-[0.9] text-brand-paper-dark mb-26">
            Every brand has a frequency. <br />
            Ours is alignment.
          </h2>

          <p className="inline-block text-xl md:text-3xl font-medium text-brand-paper-dark">
            We&apos;re not just here to build visuals — we&apos;re here to bring
            visions to life, empower bold ideas, and make brands unforgettable.
            Every pixel, word, and interaction is crafted with care, intention,
            and soul. Because we believe when passion leads, impact follows.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function IntermediarySection() {
  return (
    <ScrollAnimated
      initialSize="40%"
      finalSize="100%"
      drawRange={[0, 0.4]}
      scaleRange={[0.4, 0.5]}
      containerHeight="500vh"
    >
      {(props) => <BoxContent {...props} />}
    </ScrollAnimated>
  );
}
