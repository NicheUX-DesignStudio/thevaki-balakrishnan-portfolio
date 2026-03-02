// src/components/case-study/EvidenceHeader.tsx

import { motion } from 'framer-motion';
import { Mic, ArrowLeft } from 'lucide-react';
import { Project } from '@/data/projects';
import RedThread from '../RedThread';
import ThemeToggle from '../ThemeToggle';
import { useState, useEffect, useRef } from 'react';

interface EvidenceHeaderProps {
  project: Project;
  activeSection: string;
  sections: { id: string; label: string; icon?: any }[];
  onSectionClick: (id: string) => void;
  onClose: () => void;
}

const EvidenceHeader = ({
  project,
  activeSection,
  sections,
  onSectionClick,
  onClose,
}: EvidenceHeaderProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sections.length) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => (prev >= sections.length - 1 ? 0 : prev + 1));
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => (prev <= 0 ? sections.length - 1 : prev - 1));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < sections.length) {
            onSectionClick(sections[focusedIndex].id);
          }
          break;
        case 'Home':
          e.preventDefault();
          setFocusedIndex(0);
          onSectionClick(sections[0].id);
          break;
        case 'End':
          e.preventDefault();
          setFocusedIndex(sections.length - 1);
          onSectionClick(sections[sections.length - 1].id);
          break;
        case 'Escape':
          onClose();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sections, focusedIndex, onSectionClick, onClose]);

  useEffect(() => {
    const index = sections.findIndex(s => s.id === activeSection);
    if (index !== -1) setFocusedIndex(index);
  }, [activeSection, sections]);

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
    }
  }, [activeSection]);

  const handleNavClick = (id: string) => {
    onSectionClick(id);
    window.location.hash = id;
  };

  return (
    <motion.header
      // bg-background/95 + shadow so it reads against both light and dark
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-accent/30 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Title row ───────────────────────────────── */}
        <div className="flex items-center justify-between h-12 md:h-14">

          {/* Exit */}
          <motion.button
            onClick={onClose}
            className="group flex items-center gap-2 px-2 py-1.5 rounded-sm transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Exit the Arconia"
          >
            <div className="relative">
              <ArrowLeft className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors" />
              <RedThread
                orientation="horizontal"
                className="absolute -bottom-1 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="hidden md:block text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/40 group-hover:text-accent/80 transition-colors whitespace-nowrap">
              Exit the Arconia
            </span>
          </motion.button>

          {/* Title centred */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <Mic className="w-3 h-3 text-accent/70" />
                <h1 className="font-serif text-xs md:text-sm lg:text-base tracking-wide text-foreground/90 whitespace-nowrap">
                  {project.title}
                </h1>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-accent/60">
                  {project.caseNumber ?? 'CASE FILE'}
                </span>
                <span className="w-1 h-1 rounded-full bg-accent/40" />
                <span className="text-[8px] font-mono text-muted-foreground/50">{project.year}</span>
              </div>
            </motion.div>
          </div>

          {/* Theme toggle */}
          <div className="ml-auto flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* ── Nav row — sits BELOW the title row so content doesn't hide behind it ── */}
        <div className="flex items-center justify-center pb-1.5 overflow-x-auto no-scrollbar">
          <nav
            aria-label="Case study sections"
            role="tablist"
            className="flex items-center bg-surface/50 backdrop-blur-sm rounded-sm border border-accent/10 p-0.5"
          >
            {sections.map((section, index) => {
              const isActive  = activeSection === section.id;
              const isFocused = focusedIndex === index;

              return (
                <button
                  key={section.id}
                  ref={isActive ? activeTabRef : null}
                  onClick={() => handleNavClick(section.id)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(-1)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${section.id}-section`}
                  id={`tab-${section.id}`}
                  className={[
                    'relative px-2 py-1 text-[8px] font-mono uppercase tracking-[0.12em]',
                    'transition-all duration-300 whitespace-nowrap rounded-sm',
                    'focus:outline-none',
                    isActive
                      ? 'text-accent bg-accent/15 shadow-[inset_0_0_0_1px_hsl(var(--accent)/0.3)]'
                      // text-foreground/60 works in both light and dark
                      : 'text-foreground/60 hover:text-foreground hover:bg-accent/5',
                    isFocused && !isActive ? 'ring-2 ring-accent/50 ring-offset-1 ring-offset-background' : '',
                  ].join(' ')}
                >
                  {section.label.replace('THE ', '')}
                  {isActive && (
                    <>
                      <span className="absolute -bottom-[1px] left-1 right-1 h-px bg-accent/60 rounded-full" />
                      <span className="absolute -top-[1px] left-1 right-1 h-px bg-accent/20 rounded-full" />
                    </>
                  )}
                  {isFocused && !isActive && (
                    <span className="absolute inset-0 ring-1 ring-accent/50 rounded-sm" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Suspect strip ───────────────────────────── */}
        {project.primarySuspect && (
          <motion.div
            className="flex justify-center items-center gap-3 pb-2 text-[8px] font-mono uppercase tracking-[0.2em] border-t border-accent/10 pt-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-muted-foreground/40">PRIMARY SUSPECT</span>
            <span className="w-1 h-1 rounded-full bg-accent/40" />
            <span className="text-accent/80">{project.primarySuspect}</span>
            {project.victim && (
              <>
                <span className="w-1 h-1 rounded-full bg-accent/40" />
                <span className="text-muted-foreground/60">VICTIM: {project.victim}</span>
              </>
            )}
          </motion.div>
        )}

        <div className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-surface focus:border focus:border-accent focus:z-50 focus:top-20 focus:left-1/2 focus:-translate-x-1/2 focus:text-center">
          <p className="text-sm text-foreground">Use arrow keys to navigate sections. Enter to select. ESC to close.</p>
        </div>

      </div>
    </motion.header>
  );
};

export default EvidenceHeader;