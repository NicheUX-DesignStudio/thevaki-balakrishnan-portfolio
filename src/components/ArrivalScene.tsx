import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ArrivalSceneProps {
  onComplete: () => void;
}

const ArrivalScene = ({ onComplete }: ArrivalSceneProps) => {
  const [stage, setStage] = useState(0);
  
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),  // Show first text
      setTimeout(() => setStage(2), 3500),  // Fade out text
      setTimeout(() => setStage(3), 5000),  // Show second text
      setTimeout(() => setStage(4), 8000),  // Fade out second text
      setTimeout(() => onComplete(), 9500), // Complete
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center px-8">
        <AnimatePresence mode="wait">
          {stage >= 1 && stage < 3 && (
            <motion.div
              key="text1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: stage === 1 ? 1 : 0, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                Every window tells a story
              </h1>
            </motion.div>
          )}
          
          {stage >= 3 && stage < 5 && (
            <motion.div
              key="text2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: stage === 3 ? 1 : 0, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="space-y-6"
            >
              <p className="text-muted-foreground text-lg md:text-xl">
                UI/UX Designer . Storyteller . Social Media Content Creator
              </p>
              <p className="text-muted-foreground/60 text-sm tracking-widest uppercase">
                Click a window to look inside
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Skip button */}
      <motion.button
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-muted-foreground/40 hover:text-muted-foreground text-sm transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Skip intro →
      </motion.button>
    </motion.div>
  );
};

export default ArrivalScene;
