'use client';

import { useRef, useState } from 'react';
import {
  useScroll,
  useTransform,
  MotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import * as motion from 'framer-motion/client';
import { HandDrawnBox } from './HandDrawn';

interface CardProps {
  index: number;
  scrollProgress: MotionValue<number>;
  themeColors: { light: string; dark: string };
}

function Card({ index, scrollProgress, themeColors }: CardProps) {
  const [showContent, setShowContent] = useState(false);

  // 1. Sequential Drawing (0.0 - 0.075)
  // Each card takes 0.025 to draw (Faster)
  const drawStart = index * 0.025;
  const drawEnd = drawStart + 0.025;
  const drawProgress = useTransform(
    scrollProgress,
    [drawStart, drawEnd],
    [0, 1]
  );

  // 2. Active Phase (Scale & Move)
  // Stagger the active phases
  // Card 3 (Index 2): 0.075 - 0.325 (Starts sooner)
  // Card 2 (Index 1): 0.325 - 0.575
  // Card 1 (Index 0): 0.575 - 0.825

  // Reverse order: (2 - index)
  const activeStart = 0.075 + (2 - index) * 0.25;
  const activePeak = activeStart + 0.1; // Reaches center quickly
  const activeHold = activeStart + 0.2; // Stays there
  const activeEnd = activeStart + 0.25; // Slides out

  // Animation Values

  // Scale:
  // - Start: Large (0.9) in stack (Scaled down 10%)
  // - Peak: Extra Large (1.35) in center-right (Scaled down 10%)
  // - End: Slide out
  const scale = useTransform(
    scrollProgress,
    [0, activeStart, activePeak, activeEnd],
    [0.9, 0.9, 1.35, 1.35]
  );

  // Position (X, Y):
  // - Start: Stacked on Left with diagonal offset
  // - Peak: Center-Right.
  // - End: Slide to Right.

  // Stack Position: Left side, diagonal stack
  // Adjusted for larger size
  const stackBaseX = -30; // vw
  const stackBaseY = -15; // vh
  const stackOffsetX = index * 1.5; // vw
  const stackOffsetY = index * 5; // vh

  const stackX = `${stackBaseX + stackOffsetX}vw`;
  const stackY = `${stackBaseY + stackOffsetY}vh`;

  // Active Position: Right side
  const activeX = '20vw'; // Reduced from 25vw to fit on screen

  const x = useTransform(
    scrollProgress,
    [0, activeStart, activePeak, activeHold, activeEnd],
    [stackX, stackX, activeX, activeX, '100vw']
  );

  const y = useTransform(
    scrollProgress,
    [0, activeStart, activePeak, activeEnd],
    [stackY, stackY, '0px', '0px']
  );

  // Skew:
  // - Start: Skewed (-15deg for upward slope matching reference)
  // - Peak: Unskewed (0deg)
  const skewY = useTransform(
    scrollProgress,
    [0, activeStart, activePeak],
    ['-15deg', '-15deg', '0deg']
  );

  // Content Trigger
  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    // Show content when in the hold phase
    if (latest >= activePeak && latest <= activeEnd) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  });

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        skewY,
        zIndex: showContent ? 50 : index, // Stack order: 0 at back, 2 at front. Active jumps to top.
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '40vw',
        height: '50vh',
        marginLeft: '-20vw',
        marginTop: '-25vh',
        transformOrigin: 'center center',
      }}
    >
      <HandDrawnBox
        size={useTransform(scale, (s) => `${s * 100}%`)}
        drawProgress={drawProgress}
        fillProgress={useTransform(
          scrollProgress,
          [activeStart, activePeak],
          [0, 1]
        )}
        // fillColor={themeColors.dark}
        color={themeColors.light}
        strokeWidth={2}
      />

      {/* Content */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-10 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-center">
          <h3 className="text-brand-paper-dark text-4xl font-bold mb-4">
            Project {index + 1}
          </h3>
          <p className="text-brand-paper-dark text-xl">
            High profile project description.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

import { useThemeColors } from '../hooks/useThemeColors';

// Helper to convert hex to rgba
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// ... (Card component remains unchanged)

export default function WorkCards() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const themeColors = useThemeColors();

  // Background color fades in just before boxes start drawing
  // Use themeColors.light (Accent Color) for the background
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.01],
    [hexToRgba(themeColors.dark, 0), hexToRgba(themeColors.dark, 1)]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative h-[300vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-brand-paper-dark text-6xl font-bold absolute top-12 left-12"
        >
          Works
        </motion.div>
        {/* Container for cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <Card
              key={i}
              index={i}
              scrollProgress={scrollYProgress}
              themeColors={themeColors}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
