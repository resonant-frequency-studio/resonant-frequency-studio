'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navigation() {
  const { scrollY } = useScroll();

  // Transform scroll position to animated values
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(20px)']
  );

  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.2)']
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 50],
    ['0 8px 32px 0 rgba(0, 0, 0, 0)', '0 8px 32px 0 rgba(0, 0, 0, 0.1)']
  );

  const navLinks = [
    { href: '#about', text: 'About' },
    { href: '#overview', text: 'Overview' },
    { href: '#works', text: 'Works' },
    { href: '#pricing', text: 'Pricing' },
    { href: '#question', text: 'FAQ' },
    { href: '#contact', text: 'Contact' },
  ];

  return (
    <motion.header
      className="fixed z-20 top-0 left-0 right-0"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        borderBottom: `1px solid`,
        borderColor,
        boxShadow,
      }}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="brand flex items-center gap-2 transition-all duration-400 cursor-pointer"
        >
          <Image
            src="/resonant-frequency-logo.png"
            alt="Resonant Frequency Studio"
            width={175}
            height={32}
            className="h-8 w-auto"
          />
          <span className="sr-only">Resonant Frequency Studio</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-block transition-all duration-400 text-base text-white hover:opacity-70 cursor-pointer"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
