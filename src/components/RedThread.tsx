import { motion } from 'framer-motion';

interface RedThreadProps {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

const RedThread = ({ className = '', orientation = 'vertical' }: RedThreadProps) => {
  if (orientation === 'horizontal') {
    return (
      <motion.div
        className={`h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent ${className}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    );
  }

  return (
    <motion.div
      className={`w-px bg-gradient-to-b from-accent/30 via-accent/20 to-transparent ${className}`}
      initial={{ scaleY: 0, originY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    />
  );
};

export default RedThread;
