'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import { cx } from 'class-variance-authority';

const NAV_LINKS = [
  { href: '#about', text: 'About' },
  { href: '#overview', text: 'Overview' },
  { href: '#works', text: 'Works' },
  { href: '#pricing', text: 'Pricing' },
  { href: '#question', text: 'FAQ' },
  { href: '#contact', text: 'Contact' },
];

export default function Navigation({
  animateEntrance = false,
}: {
  animateEntrance?: boolean;
}) {
  const { scrollY } = useScroll();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 100 && !isCollapsed) {
      setIsCollapsed(true);
      setIsOpen(false);
    } else if (latest <= 100 && isCollapsed) {
      setIsCollapsed(false);
      setIsOpen(false);
    }
  });

  return (
    <motion.header
      initial={animateEntrance ? { x: 100, opacity: 0 } : false}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-50 top-0 right-0 p-4 md:p-8"
    >
      <motion.nav
        initial={false}
        animate={isCollapsed ? (isOpen ? 'open' : 'collapsed') : 'full'}
        variants={{
          full: { width: 'auto', height: 'auto', borderRadius: '1rem' },
          collapsed: { width: '46px', height: '46px', borderRadius: '50%' },
          open: { width: 'auto', height: 'auto', borderRadius: '1rem' },
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#CDCAB7] border-[#484D2E] border relative flex items-center justify-center overflow-hidden pointer-events-auto"
        style={{ transformOrigin: 'top right' }}
      >
        <div className="flex items-center p-2">
          {/* Links - Visible in Full or Open state */}
          <div
            className={`${isCollapsed && !isOpen ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'} transition-all duration-500 ease-in-out flex items-center gap-8`}
          >
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.href}
                initial={
                  animateEntrance && !isCollapsed ? { x: 50, opacity: 0 } : {}
                }
                animate={
                  animateEntrance && !isCollapsed ? { x: 0, opacity: 1 } : {}
                }
                transition={{
                  delay:
                    (animateEntrance && !isCollapsed ? 2.2 : 0) + index * 0.1,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="whitespace-nowrap"
              >
                <Link
                  href={link.href}
                  className="inline-block transition-all duration-400 text-xl hover:opacity-70 cursor-pointer text-[#484D2E]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Toggle Button - Visible only when collapsed (as hamburger) or open (as close) */}
          <AnimatePresence>
            {isCollapsed && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center text-[#484D2E] shrink-0"
              >
                <div className={cx('space-y-1.5', { ['pl-6']: isOpen })}>
                  <motion.span
                    animate={
                      isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }
                    }
                    className="block w-6 h-0.5 bg-[#484D2E]"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block w-6 h-0.5 bg-[#484D2E]"
                  />
                  <motion.span
                    animate={
                      isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }
                    }
                    className="block w-6 h-0.5 bg-[#484D2E]"
                  />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </motion.header>
  );
}
