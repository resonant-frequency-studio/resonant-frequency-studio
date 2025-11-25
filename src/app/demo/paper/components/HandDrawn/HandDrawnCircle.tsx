'use client';

import {
  motion,
  MotionValue,
  useTransform,
  useMotionValue,
} from 'framer-motion';
import { ReactNode } from 'react';

export interface HandDrawnCircleProps {
  // Size - can be static string or animated MotionValue
  size: string | MotionValue<string>;

  // Drawing animation - 0 to 1 progress
  drawProgress?: MotionValue<number>;

  // Fill animation - optional background fill
  fillColor?: string;
  fillProgress?: MotionValue<number>;

  // Visual styling
  color?: string;
  strokeWidth?: number;
  wobbleIntensity?: number;

  // Content
  children?: ReactNode;
  className?: string;
}

export default function HandDrawnCircle({
  size,
  drawProgress,
  fillColor,
  fillProgress,
  color = '#484D2E',
  strokeWidth = 1,
  wobbleIntensity = 0.5,
  children,
  className = '',
}: HandDrawnCircleProps) {
  const wobbleOffset = wobbleIntensity * 0.3;
  const circumference = 2 * Math.PI * 45; // ~282.7

  // Create fallback MotionValue if drawProgress not provided
  const fallbackProgress = useMotionValue(1);
  const activeProgress = drawProgress || fallbackProgress;

  // Calculate draw offset using useTransform
  const drawOffset = useTransform(
    activeProgress,
    (p) => circumference * (1 - p)
  );

  // Use fillProgress if provided, otherwise no fill
  const fallbackFillProgress = useMotionValue(0);
  const fillOpacity = fillProgress || fallbackFillProgress;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      <motion.svg
        className="absolute"
        style={{ width: size, height: size }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background fill - appears during scaling if fillColor is provided */}
        {fillColor && (
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill={fillColor}
            style={{ opacity: fillOpacity }}
          />
        )}

        {/* Hand-drawn wobble using multiple offset circles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={
              50 + (i === 1 ? wobbleOffset : i === 2 ? -wobbleOffset * 0.5 : 0)
            }
            cy={
              50 + (i === 1 ? wobbleOffset * 0.5 : i === 2 ? -wobbleOffset : 0)
            }
            r={45}
            stroke={color}
            strokeWidth={strokeWidth / 3}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={drawOffset}
          />
        ))}
      </motion.svg>

      {children && (
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
