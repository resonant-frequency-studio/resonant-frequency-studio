'use client';

import {
  motion,
  MotionValue,
  useTransform,
  useMotionValue,
} from 'framer-motion';
import { ReactNode } from 'react';

export interface HandDrawnBoxProps {
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

export default function HandDrawnBox({
  size,
  drawProgress,
  fillColor,
  fillProgress,
  color = '#484D2E',
  strokeWidth = 1,
  wobbleIntensity = 0.5,
  children,
  className = '',
}: HandDrawnBoxProps) {
  // Calculate wobble offset and line extension
  const wobbleOffset = 0.5 * wobbleIntensity;
  const extension = strokeWidth * 0.5;
  const topBottomDash = 100 + extension * 2;
  const leftRightDash = 80 + extension * 2;

  // Create fallback MotionValue if drawProgress not provided
  const fallbackProgress = useMotionValue(1);
  const activeProgress = drawProgress || fallbackProgress;

  // Create proper MotionValues for each line using useTransform
  const topLineOffset = useTransform(activeProgress, (p) => {
    if (p <= 0) return topBottomDash;
    if (p >= 0.25) return 0;
    return topBottomDash * (1 - p / 0.25);
  });

  const rightLineOffset = useTransform(activeProgress, (p) => {
    if (p <= 0.25) return leftRightDash;
    if (p >= 0.5) return 0;
    return leftRightDash * (1 - (p - 0.25) / 0.25);
  });

  const bottomLineOffset = useTransform(activeProgress, (p) => {
    if (p <= 0.5) return topBottomDash;
    if (p >= 0.75) return 0;
    return topBottomDash * (1 - (p - 0.5) / 0.25);
  });

  const leftLineOffset = useTransform(activeProgress, (p) => {
    if (p <= 0.75) return leftRightDash;
    if (p >= 1) return 0;
    return leftRightDash * (1 - (p - 0.75) / 0.25);
  });

  // Use fillProgress if provided, otherwise no fill
  const fallbackFillProgress = useMotionValue(0);
  const fillOpacity = fillProgress || fallbackFillProgress;
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      <motion.svg
        className="absolute"
        style={{
          width: size,
          height: size,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background fill - appears during scaling if fillColor is provided */}
        {fillColor && (
          <motion.rect
            x="0"
            y="10"
            width="100"
            height="80"
            fill={fillColor}
            style={{ opacity: fillOpacity }}
          />
        )}

        {/* Top line */}
        <motion.path
          d={`M ${-extension} 10 Q 25 ${10 - wobbleOffset}, 50 ${10 + wobbleOffset * 0.4} T ${100 + extension} 10`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="butt"
          strokeDasharray={topBottomDash}
          strokeDashoffset={topLineOffset}
        />

        {/* Right line */}
        <motion.path
          d={`M 100 ${10 - extension} Q ${100 - wobbleOffset * 0.4} 30, ${100 + wobbleOffset * 0.4} 50 T 100 ${90 + extension}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="butt"
          strokeDasharray={leftRightDash}
          strokeDashoffset={rightLineOffset}
        />

        {/* Bottom line */}
        <motion.path
          d={`M ${100 + extension} 90 Q 75 ${90 + wobbleOffset * 0.4}, 50 ${90 - wobbleOffset * 0.4} T ${-extension} 90`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="butt"
          strokeDasharray={topBottomDash}
          strokeDashoffset={bottomLineOffset}
        />

        {/* Left line */}
        <motion.path
          d={`M 0 ${90 + extension} Q ${wobbleOffset * 0.4} 70, ${-wobbleOffset * 0.4} 50 T 0 ${10 - extension}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="butt"
          strokeDasharray={leftRightDash}
          strokeDashoffset={leftLineOffset}
        />
      </motion.svg>

      {children && (
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
