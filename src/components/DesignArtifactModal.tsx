import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type ArtifactType = 'wireframes' | 'final-ui' | 'prototype';

interface DesignArtifactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ArtifactType;
  projectTitle: string;
}

const artifactContent: Record<ArtifactType, { title: string; description: string; placeholder: string }> = {
  wireframes: {
    title: 'Low-Fidelity Wireframes',
    description: 'Early structural explorations mapping out information hierarchy, user flows, and core interaction patterns before visual design.',
    placeholder: 'Wireframe assets would be displayed here — low-fidelity sketches, information architecture diagrams, and flow documentation.',
  },
  'final-ui': {
    title: 'Final UI Design',
    description: 'High-fidelity screens showing the complete visual design system, component library, and key user journeys.',
    placeholder: 'High-fidelity UI screens would be displayed here — final design mockups, component specifications, and responsive layouts.',
  },
  prototype: {
    title: 'Interactive Prototype',
    description: 'Clickable prototype demonstrating key user flows, micro-interactions, and transition patterns.',
    placeholder: 'An embedded Figma or Framer prototype would be displayed here — interactive flows, animations, and user journey walkthroughs.',
  },
};

const DesignArtifactModal = ({ isOpen, onClose, type, projectTitle }: DesignArtifactModalProps) => {
  const content = artifactContent[type];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full max-w-5xl mx-4 md:mx-8 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-primary/40 text-[10px] tracking-[0.3em] uppercase mb-2">
                  {projectTitle} — Design Artifacts
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground/90">
                  {content.title}
                </h2>
                <p className="text-muted-foreground/50 text-sm mt-2 max-w-2xl">
                  {content.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-2 text-muted-foreground/40 hover:text-foreground transition-colors rounded-sm"
                aria-label="Close overlay"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Artifact Display Area */}
            <div className="bg-card/30 border border-border/10 rounded-sm overflow-hidden">
              {/* Placeholder grid simulating design artifacts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/10">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="aspect-[4/3] bg-card/20 flex items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-sm border border-border/20 bg-secondary/10 flex items-center justify-center">
                        <span className="text-muted-foreground/30 text-xs font-mono">
                          {String(i).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="text-muted-foreground/30 text-xs">
                        {type === 'wireframes' ? 'Wireframe' : type === 'final-ui' ? 'UI Screen' : 'Flow'} {i}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Note */}
              <div className="p-6 border-t border-border/10">
                <p className="text-muted-foreground/40 text-xs text-center italic">
                  {content.placeholder}
                </p>
              </div>
            </div>

            {/* Figma embed placeholder for prototype */}
            {type === 'prototype' && (
              <motion.div
                className="mt-6 bg-card/20 border border-border/10 rounded-sm p-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <p className="text-muted-foreground/50 text-sm mb-3">Interactive Prototype</p>
                <div className="aspect-video bg-secondary/10 rounded-sm flex items-center justify-center border border-border/10">
                  <div className="text-center">
                    <p className="text-muted-foreground/30 text-xs mb-2">Figma / Framer Embed</p>
                    <p className="text-muted-foreground/20 text-[10px]">
                      Prototype link would be embedded here
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesignArtifactModal;
