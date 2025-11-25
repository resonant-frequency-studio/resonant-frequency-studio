'use client';

import {
  useInView,
  useMotionValue,
  useSpring,
  MotionValue,
  animate,
} from 'framer-motion';
import { useRef, ReactNode, useEffect } from 'react';

export interface InViewAnimatedProps {
  // Size
  initialSize?: string;
  finalSize?: string;
  enableScale?: boolean;

  // Animation timing
  delay?: number;
  drawDuration?: number;
  scaleDuration?: number;
  triggerOnce?: boolean;

  // Children - render props pattern
  children: (props: {
    size: MotionValue<string> | string;
    drawProgress: MotionValue<number>;
  }) => ReactNode;
}

export default function InViewAnimated({
  initialSize = '30%',
  finalSize = '60%',
  enableScale = true,
  delay = 0,
  drawDuration = 1500,
  scaleDuration = 500,
  triggerOnce = true,
  children,
}: InViewAnimatedProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: 0.3 });

  const drawProgress = useMotionValue(0);
  const smoothDrawProgress = useSpring(drawProgress, {
    stiffness: 50,
    damping: 20,
  });

  // Size animation
  const sizeProgress = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      // Delay then animate drawing
      const timeout = setTimeout(() => {
        drawProgress.set(1);

        // After drawing completes, animate size if enabled
        if (enableScale) {
          setTimeout(() => {
            // Animate from 0 to 1, we'll transform this in the render
            animate(sizeProgress, 1, {
              duration: scaleDuration / 1000,
              ease: 'easeOut',
            });
          }, drawDuration);
        }
      }, delay);

      return () => clearTimeout(timeout);
    } else if (!triggerOnce) {
      // Reset when out of view
      drawProgress.set(0);
      if (enableScale) {
        sizeProgress.set(0);
      }
    }
  }, [
    isInView,
    delay,
    drawDuration,
    scaleDuration,
    triggerOnce,
    drawProgress,
    sizeProgress,
    enableScale,
  ]);

  // Transform size progress (0-1) to actual size values
  // Always call hooks, but return static value if not scaling
  const animatedSizeMV = useMotionValue(initialSize);
  const animatedSize = useSpring(animatedSizeMV, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    if (enableScale) {
      const unsubscribe = sizeProgress.on('change', (v) => {
        // Interpolate between initialSize and finalSize
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
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center"
    >
      {children({ size: finalSize_value, drawProgress: smoothDrawProgress })}
    </div>
  );
}
