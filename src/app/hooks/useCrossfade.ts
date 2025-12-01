'use client';

import { useState, useEffect } from 'react';

interface CrossfadeResult {
  progress: number;
  fromOpacity: number;
  toOpacity: number;
}

/**
 * Hook to create a smooth crossfade transition between two states
 * @param trigger - Boolean that triggers the crossfade (false = from, true = to)
 * @param duration - Duration of the crossfade in milliseconds (default: 500)
 * @returns Object containing progress (0-1), fromOpacity (1-0), and toOpacity (0-1)
 */
export const useCrossfade = (
  trigger: boolean,
  duration: number = 500
): CrossfadeResult => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetProgress = trigger ? 1 : 0;
    const startTime = Date.now();

    // Capture the current progress at the start of the animation
    const startProgress = progress;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Ease in-out cubic
      const eased =
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      const newProgress =
        startProgress + (targetProgress - startProgress) * eased;
      setProgress(newProgress);

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, duration]);

  return {
    progress,
    fromOpacity: 1 - progress,
    toOpacity: progress,
  };
};
