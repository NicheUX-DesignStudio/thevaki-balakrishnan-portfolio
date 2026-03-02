// src/components/ThemeToggle.tsx - FIXED

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('arconia-theme'); // ✅ FIXED
    if (savedTheme === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('arconia-theme', 'dark'); // ✅ FIXED
    } else {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('arconia-theme', 'light'); // ✅ FIXED
    }
    setIsLight(!isLight);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-sm bg-surface/80 border border-accent/20 flex items-center justify-center group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isLight ? 0 : 180,
          opacity: isLight ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="w-4 h-4 text-accent/80" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          rotate: isLight ? -180 : 0,
          opacity: isLight ? 0 : 1 
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="w-4 h-4 text-accent/80" />
      </motion.div>
      
      {/* Red thread accent */}
      <div className="absolute -bottom-1 left-1 right-1 h-px bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </motion.button>
  );
};

export default ThemeToggle;