'use client';

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
} from 'framer-motion';
import { useRef, useEffect } from 'react';

export interface AnimatedCircleProps {
  // Size configuration
  initialSize?: string;
  finalSize?: string;
  fixedSize?: string;

  // Animation mode
  mode?: 'scroll' | 'sequence' | 'inView';

  // Scroll-based animation (mode='scroll')
  scrollProgress?: number;
  drawScrollRange?: [number, number];
  scaleScrollRange?: [number, number];

  // Sequence-based animation (mode='sequence')
  delay?: number;
  drawDuration?: number;
  scaleDuration?: number;

  // InView animation (mode='inView')
  triggerOnce?: boolean;

  // Animation control
  enableDraw?: boolean;
  enableScale?: boolean;

  // Style configuration
  color?: string;
  strokeWidth?: number;
  wobbleIntensity?: number;

  // Container
  containerHeight?: string;
  className?: string;

  // Content
  children?: React.ReactNode;
}

export default function AnimatedCircle({
  initialSize = '40%',
  finalSize = '100%',
  fixedSize,
  mode = 'scroll',
  scrollProgress: externalScrollProgress,
  drawScrollRange = [0, 0.4],
  scaleScrollRange = [0.4, 0.5],
  delay = 0,
  drawDuration = 1500,
  scaleDuration = 500,
  triggerOnce = true,
  enableDraw = true,
  enableScale = true,
  color = '#484D2E',
  strokeWidth = 1,
  wobbleIntensity = 0.5,
  containerHeight = '300vh',
  className = '',
  children,
}: AnimatedCircleProps) {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  const shouldScale = enableScale && !fixedSize;
  const displaySize = fixedSize || initialSize;

  const { scrollYProgress: internalScrollProgress } = useScroll({
    target: mode === 'scroll' ? containerRef : boxRef,
    offset: ['start start', 'end start'],
  });

  const externalProgressMV = useMotionValue(0);

  useEffect(() => {
    if (externalScrollProgress !== undefined) {
      externalProgressMV.set(externalScrollProgress);
    }
  }, [externalScrollProgress, externalProgressMV]);

  const scrollProgress =
    mode === 'scroll' && externalScrollProgress !== undefined
      ? externalProgressMV
      : internalScrollProgress;

  const drawProgress = useTransform(scrollProgress, drawScrollRange, [0, 1]);

  // Circle circumference for a unit circle (radius 50 in viewBox 100x100)
  const circumference = 2 * Math.PI * 45; // ~282.7

  const circleDraw = useTransform(drawProgress, [0, 1], [circumference, 0]);

  const scaleMotionValue = useTransform(scrollProgress, scaleScrollRange, [
    displaySize,
    finalSize,
  ]);
  const scale = shouldScale ? scaleMotionValue : displaySize;

  const isInView = useInView(boxRef, { once: triggerOnce, amount: 0.3 });

  const wobbleOffset = wobbleIntensity * 0.3;

  const renderContent = () => (
    <motion.svg
      className="absolute"
      style={
        mode === 'scroll'
          ? {
              width: scale,
              height: scale,
            }
          : undefined
      }
      animate={
        mode === 'inView' || mode === 'sequence'
          ? {
              width: shouldScale ? finalSize : displaySize,
              height: shouldScale ? finalSize : displaySize,
            }
          : undefined
      }
      transition={
        mode === 'inView' || mode === 'sequence'
          ? {
              duration: scaleDuration / 1000,
              delay: enableDraw ? (delay + drawDuration) / 1000 : delay / 1000,
              ease: 'easeOut',
            }
          : undefined
      }
      initial={{
        width: displaySize,
        height: displaySize,
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Main circle with hand-drawn wobble using multiple offset circles */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={50 + (i === 1 ? wobbleOffset : i === 2 ? -wobbleOffset * 0.5 : 0)}
          cy={50 + (i === 1 ? wobbleOffset * 0.5 : i === 2 ? -wobbleOffset : 0)}
          r={45}
          stroke={color}
          strokeWidth={strokeWidth / 3}
          fill="none"
          strokeDasharray={circumference}
          style={
            mode === 'scroll' && enableDraw
              ? { strokeDashoffset: circleDraw }
              : undefined
          }
          initial={
            mode !== 'scroll' && enableDraw
              ? { strokeDashoffset: circumference }
              : undefined
          }
          animate={
            mode !== 'scroll' && enableDraw && isInView
              ? { strokeDashoffset: 0 }
              : undefined
          }
          transition={
            mode !== 'scroll'
              ? {
                  duration: drawDuration / 1000,
                  delay: delay / 1000 + i * 0.05,
                  ease: 'easeOut',
                }
              : undefined
          }
        />
      ))}
    </motion.svg>
  );

  if (mode === 'scroll' && externalScrollProgress === undefined) {
    return (
      <div
        ref={containerRef}
        className={`h-[${containerHeight}] relative ${className}`}
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div
            ref={boxRef}
            className="relative w-full h-full flex items-center justify-center"
          >
            {renderContent()}
            {children && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={boxRef}
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      {renderContent()}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
      )}
    </div>
  );
}
