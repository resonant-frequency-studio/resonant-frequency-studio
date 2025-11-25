'use client';

import {
  useScroll,
  useTransform,
  useMotionValue,
  MotionValue,
} from 'framer-motion';
import { useRef, ReactNode, useEffect } from 'react';

export interface ScrollAnimatedProps {
  // Size configuration
  initialSize?: string;
  finalSize?: string;

  // Scroll ranges
  drawRange?: [number, number];
  scaleRange?: [number, number];
  fillRange?: [number, number]; // When to animate fill (defaults to scaleRange)

  // Container
  containerHeight?: string;

  // External scroll progress (for nested/synced animations)
  scrollProgress?: number;

  // Children - render props pattern
  children: (props: {
    size: MotionValue<string>;
    drawProgress: MotionValue<number>;
    scrollProgress: MotionValue<number>;
    fillProgress: MotionValue<number>;
  }) => ReactNode;
}

export default function ScrollAnimated({
  initialSize = '40%',
  finalSize = '100%',
  drawRange = [0, 0.4],
  scaleRange = [0.4, 0.8],
  fillRange, // Defaults to scaleRange if not provided
  containerHeight = '300vh',
  scrollProgress: externalScrollProgress,
  children,
}: ScrollAnimatedProps) {
  const containerRef = useRef(null);

  // Internal scroll tracking
  const { scrollYProgress: internalScrollProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Create motion value for external scroll progress
  const externalProgressMV = useMotionValue(0);

  // Sync external progress to motion value
  useEffect(() => {
    if (externalScrollProgress !== undefined) {
      externalProgressMV.set(externalScrollProgress);
    }
  }, [externalScrollProgress, externalProgressMV]);

  // Use external or internal scroll progress
  const scrollProgress =
    externalScrollProgress !== undefined
      ? externalProgressMV
      : internalScrollProgress;

  // Drawing progress from scroll
  const drawProgress = useTransform(scrollProgress, drawRange, [0, 1]);

  // Scale animation from scroll
  const size = useTransform(scrollProgress, scaleRange, [
    initialSize,
    finalSize,
  ]);

  // Fill animation from scroll (defaults to scaleRange)
  const activeFillRange = fillRange || scaleRange;
  const fillProgress = useTransform(scrollProgress, activeFillRange, [0, 1]);

  return (
    <div ref={containerRef} className={`h-[${containerHeight}] relative`}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {children({ size, drawProgress, scrollProgress, fillProgress })}
        </div>
      </div>
    </div>
  );
}
