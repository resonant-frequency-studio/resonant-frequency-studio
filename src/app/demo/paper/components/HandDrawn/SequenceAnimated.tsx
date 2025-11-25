'use client';

import { useMotionValue, useSpring, MotionValue, animate } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

export interface SequenceAnimatedProps {
  // Size
  initialSize?: string;
  finalSize?: string;
  enableScale?: boolean;

  // Animation timing
  delay?: number;
  drawDuration?: number;
  scaleDuration?: number;

  // Children - render props pattern
  children: (props: {
    size: MotionValue<string> | string;
    drawProgress: MotionValue<number>;
  }) => ReactNode;
}

export default function SequenceAnimated({
  initialSize = '30%',
  finalSize = '60%',
  enableScale = true,
  delay = 0,
  drawDuration = 1500,
  scaleDuration = 500,
  children,
}: SequenceAnimatedProps) {
  const drawProgress = useMotionValue(0);
  const smoothDrawProgress = useSpring(drawProgress, {
    stiffness: 50,
    damping: 20,
  });

  // Size animation
  const sizeProgress = useMotionValue(0);

  // Always call hooks unconditionally
  const animatedSizeMV = useMotionValue(initialSize);
  const animatedSize = useSpring(animatedSizeMV, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    // Delay then animate drawing
    const timeout = setTimeout(() => {
      drawProgress.set(1);

      // After drawing completes, animate size if enabled
      if (enableScale) {
        setTimeout(() => {
          animate(sizeProgress, 1, {
            duration: scaleDuration / 1000,
            ease: 'easeOut',
          });
        }, drawDuration);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    delay,
    drawDuration,
    scaleDuration,
    drawProgress,
    sizeProgress,
    enableScale,
  ]);

  useEffect(() => {
    if (enableScale) {
      const unsubscribe = sizeProgress.on('change', (v) => {
        const initial = parseFloat(initialSize);
        const final = parseFloat(finalSize);
        const current = initial + (final - initial) * v;
        const unit = initialSize.includes('%') ? '%' : 'px';
        animatedSizeMV.set(`${current}${unit}`);
      });
      return unsubscribe;
    }
  }, [sizeProgress, initialSize, finalSize, enableScale, animatedSizeMV]);

  const finalSize_value = enableScale ? animatedSize : initialSize;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {children({ size: finalSize_value, drawProgress: smoothDrawProgress })}
    </div>
  );
}
