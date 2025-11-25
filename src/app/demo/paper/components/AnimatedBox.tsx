'use client';

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
} from 'framer-motion';
import { useRef, useEffect } from 'react';

export interface AnimatedBoxProps {
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

export default function AnimatedBox({
  // Defaults for backwards compatibility
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
}: AnimatedBoxProps) {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  // Determine if we should scale
  const shouldScale = enableScale && !fixedSize;
  const displaySize = fixedSize || initialSize;

  // === SCROLL MODE ===
  // Use boxRef for scroll tracking
  const { scrollYProgress: internalScrollProgress } = useScroll({
    target: mode === 'scroll' ? containerRef : boxRef,
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
    mode === 'scroll' && externalScrollProgress !== undefined
      ? externalProgressMV
      : internalScrollProgress;

  // Drawing progress from scroll
  const drawProgress = useTransform(scrollProgress, drawScrollRange, [0, 1]);

  // Calculate dynamic dasharray values based on stroke width
  const extension = strokeWidth * 0.5;
  const topBottomDash = 100 + extension * 2;
  const leftRightDash = 80 + extension * 2;

  // Individual line animations with stagger
  const topLine = useTransform(drawProgress, [0, 0.25], [topBottomDash, 0]);
  const rightLine = useTransform(drawProgress, [0.25, 0.5], [leftRightDash, 0]);
  const bottomLine = useTransform(
    drawProgress,
    [0.5, 0.75],
    [topBottomDash, 0]
  );
  const leftLine = useTransform(drawProgress, [0.75, 1], [leftRightDash, 0]);

  // Scale animation from scroll - always call useTransform
  const scaleMotionValue = useTransform(scrollProgress, scaleScrollRange, [
    displaySize,
    finalSize,
  ]);
  const scale = shouldScale ? scaleMotionValue : displaySize;

  // === IN-VIEW MODE ===
  const isInView = useInView(boxRef, { once: triggerOnce, amount: 0.3 });

  // Calculate wobble offset based on intensity
  const wobbleOffset = 0.5 * wobbleIntensity;

  // Render based on mode
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
      {/* Top line */}
      <motion.path
        d={`M ${-extension} 10 Q 25 ${10 - wobbleOffset}, 50 ${10 + wobbleOffset * 0.4} T ${100 + extension} 10`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="butt"
        strokeDasharray={100 + extension * 2}
        style={
          mode === 'scroll' && enableDraw
            ? { strokeDashoffset: topLine }
            : undefined
        }
        initial={
          mode !== 'scroll' && enableDraw
            ? { strokeDashoffset: 100 + extension * 2 }
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
                duration: (drawDuration / 1000) * 0.25,
                delay: delay / 1000,
                ease: 'easeOut',
              }
            : undefined
        }
      />

      {/* Right line */}
      <motion.path
        d={`M 100 ${10 - extension} Q ${100 - wobbleOffset * 0.4} 30, ${100 + wobbleOffset * 0.4} 50 T 100 ${90 + extension}`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="butt"
        strokeDasharray={80 + extension * 2}
        style={
          mode === 'scroll' && enableDraw
            ? { strokeDashoffset: rightLine }
            : undefined
        }
        initial={
          mode !== 'scroll' && enableDraw
            ? { strokeDashoffset: 80 + extension * 2 }
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
                duration: (drawDuration / 1000) * 0.25,
                delay: (delay + drawDuration * 0.25) / 1000,
                ease: 'easeOut',
              }
            : undefined
        }
      />

      {/* Bottom line */}
      <motion.path
        d={`M ${100 + extension} 90 Q 75 ${90 + wobbleOffset * 0.4}, 50 ${90 - wobbleOffset * 0.4} T ${-extension} 90`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="butt"
        strokeDasharray={100 + extension * 2}
        style={
          mode === 'scroll' && enableDraw
            ? { strokeDashoffset: bottomLine }
            : undefined
        }
        initial={
          mode !== 'scroll' && enableDraw
            ? { strokeDashoffset: 100 + extension * 2 }
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
                duration: (drawDuration / 1000) * 0.25,
                delay: (delay + drawDuration * 0.5) / 1000,
                ease: 'easeOut',
              }
            : undefined
        }
      />

      {/* Left line */}
      <motion.path
        d={`M 0 ${90 + extension} Q ${wobbleOffset * 0.4} 70, ${-wobbleOffset * 0.4} 50 T 0 ${10 - extension}`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="butt"
        strokeDasharray={80 + extension * 2}
        style={
          mode === 'scroll' && enableDraw
            ? { strokeDashoffset: leftLine }
            : undefined
        }
        initial={
          mode !== 'scroll' && enableDraw
            ? { strokeDashoffset: 80 + extension * 2 }
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
                duration: (drawDuration / 1000) * 0.25,
                delay: (delay + drawDuration * 0.75) / 1000,
                ease: 'easeOut',
              }
            : undefined
        }
      />
    </motion.svg>
  );

  // Wrap in scroll container for scroll mode
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

  // For sequence/inView modes or external scroll, just render the box
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
