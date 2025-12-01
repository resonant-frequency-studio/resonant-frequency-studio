'use client';

import { useState, useEffect } from 'react';

interface ThemeColors {
  light: string;
  dark: string;
}

/**
 * Hook to detect current theme and return appropriate colors
 * - In light mode: returns dark colors for lines/strokes and light colors for fills
 * - In dark mode: returns light colors for lines/strokes and dark colors for fills
 */
export const useThemeColors = (): ThemeColors => {
  const [colors, setColors] = useState<ThemeColors>({
    light: '#4a70a9',
    dark: '#efece3',
  });

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      // Check data-theme attribute directly
      // If data-theme is 'dark', we are in dark mode.
      // If data-theme is missing, we check system preference.

      const dataTheme = root.getAttribute('data-theme');

      let isDarkMode = dataTheme === 'dark';

      if (!dataTheme) {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      setColors({
        light: isDarkMode ? '#efece3' : '#4a70a9', // Stroke color: light in dark mode, dark (blue) in light mode
        dark: isDarkMode ? '#4a70a9' : '#efece3', // Fill color: dark (blue) in dark mode, light (beige) in light mode
      });
    };

    updateColors();

    // Watch for theme changes via data-theme attribute
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Also listen for media query changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateColors);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', updateColors);
    };
  }, []);

  return colors;
};
