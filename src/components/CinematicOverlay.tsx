// src/components/CinematicOverlay.tsx
// Only renders the film grain + vignette overlays in DARK mode.
// In light mode, these overlays are completely absent — no darkening at all.

import { useEffect, useState } from 'react';

const CinematicOverlay = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Read the current theme from <html> class
    const checkTheme = () => {
      const html = document.documentElement;
      // Light theme is signalled by 'light-theme' class on <html>
      setIsDark(!html.classList.contains('light-theme'));
    };

    // Check immediately
    checkTheme();

    // Watch for theme changes via MutationObserver
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // In light mode: render nothing at all
  if (!isDark) return null;

  // In dark mode: render subtle film grain + edge vignette
  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  );
};

export default CinematicOverlay;