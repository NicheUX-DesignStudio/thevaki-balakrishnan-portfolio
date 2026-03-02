import { motion } from 'framer-motion';
import Window from './Window';
import { projects } from '@/data/projects';
import { useState, useEffect } from 'react';

export type SpecialWindow = 'about' | 'contact';

interface BuildingProps {
  onWindowClick: (projectId: string) => void;
  onSpecialClick: (type: SpecialWindow) => void;
  viewedProjects: Set<string>;
}

interface SpecialWindowButtonProps {
  label: string;
  sublabel: string;
  onClick: () => void;
  color: 'amber' | 'cyan' | 'dim';
  delay: number;
  isActive?: boolean;
  onActivate?: () => void;
}

const SpecialWindowButton = ({ 
  label, 
  sublabel, 
  onClick, 
  color, 
  delay,
  isActive,
  onActivate
}: SpecialWindowButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isActive) {
      setShowInfo(false);
    }
  }, [isActive]);

  const colorMap = {
    amber: {
      pane: 'bg-window-amber/70',
      glow: 'hover:shadow-[0_0_50px_hsl(42_85%_55%/0.35)]',
    },
    cyan: {
      pane: 'bg-window-cyan/60',
      glow: 'hover:shadow-[0_0_50px_hsl(185_55%_60%/0.35)]',
    },
    dim: {
      pane: 'bg-window-dim/60',
      glow: 'hover:shadow-[0_0_40px_hsl(185_25%_22%/0.3)]',
    },
  };
  const c = colorMap[color];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isMobile) {
      // Desktop: direct open
      onClick();
      return;
    }

    // Mobile: handle tap
    if (isActive && showInfo) {
      setShowInfo(false);
      onActivate?.();
      onClick();
    } else {
      setShowInfo(true);
      onActivate?.();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`View ${label}`}
    >
      <div className="relative">
        <div className="absolute -inset-2 bg-building-detail rounded-sm" />
        <div className="absolute -bottom-3 -left-3 -right-3 h-3 bg-building-detail rounded-sm" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-building-detail rounded-t-sm" />

        <div className={`relative w-24 h-36 sm:w-28 sm:h-40 md:w-36 md:h-52 lg:w-44 lg:h-64 transition-all duration-700 ${c.glow}`}>
          <div className={`absolute inset-0 ${c.pane}`}>
            {/* Cross panes */}
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 flex">
                <div className="flex-1 border-r border-building-dark/30 border-b border-building-dark/30" />
                <div className="flex-1 border-b border-building-dark/30" />
              </div>
              <div className="flex-1 flex">
                <div className="flex-1 border-r border-building-dark/30" />
                <div className="flex-1" />
              </div>
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-2 bg-building-dark/20" />
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-building-dark/20" />
          </div>

          {/* Mobile Info Overlay */}
          {isMobile && isActive && showInfo && (
            <motion.div 
              className="absolute inset-0 bg-building-dark/95 flex flex-col items-center justify-center p-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-serif text-sm text-foreground mb-1">{label}</h3>
              <p className="text-[10px] text-muted-foreground mb-2">{sublabel}</p>
              <p className="text-[8px] text-accent/60 mt-2 font-mono uppercase tracking-wider">
                Tap again to enter
              </p>
            </motion.div>
          )}

          {/* Desktop Hover Overlay */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0 bg-building-dark/90 flex flex-col items-center justify-center p-4 text-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-serif text-lg md:text-xl text-foreground mb-1">{label}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{sublabel}</p>
            </motion.div>
          )}

          {/* Mobile hint - subtle dots when not showing info */}
          {isMobile && !(isActive && showInfo) && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
};

const Building = ({ onWindowClick, onSpecialClick, viewedProjects }: BuildingProps) => {
  // Split projects for different layouts
  const row1 = projects.slice(0, 2);  // First 2 projects
  const row2 = projects.slice(2, 4);  // Next 2 projects
  const row3 = projects.slice(4, 6);  // Last 2 projects
  
  // Track which window is active (showing info) on mobile
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  return (
    <motion.div 
      className="relative w-full max-w-6xl mx-auto px-2 sm:px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      {/* Building Structure */}
      <div className="relative bg-building p-4 sm:p-6 md:p-10 lg:p-14">
        {/* Roof Lines */}
        <div className="absolute -top-4 left-0 right-0 h-4 bg-building-detail" />
        <div className="absolute -top-8 left-8 right-8 h-4 bg-building-dark" />
        
        {/* Side Columns */}
        <div className="absolute top-0 bottom-0 left-0 w-4 bg-building-detail" />
        <div className="absolute top-0 bottom-0 right-0 w-4 bg-building-detail" />
        <div className="absolute top-8 bottom-8 left-1 w-2 bg-building/80" />
        <div className="absolute top-8 bottom-8 right-1 w-2 bg-building/80" />
        
        {/* Windows Container - responsive grid */}
        <div className="relative z-10 flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          
          {/* DESKTOP LAYOUT (3-3-2) - hidden on mobile, shown on md and up */}
          <div className="hidden md:flex md:flex-col md:gap-8 lg:gap-12 w-full">
            {/* Desktop Row 1 - First 3 projects */}
            <div className="flex justify-center gap-6 lg:gap-8">
              {projects.slice(0, 3).map((project, index) => (
                <Window
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => {
                    setActiveWindowId(null);
                    onWindowClick(project.id);
                  }}
                  isViewed={viewedProjects.has(project.id)}
                  activeWindowId={activeWindowId}
                  onWindowActivate={setActiveWindowId}
                />
              ))}
            </div>

            {/* Desktop Floor line */}
            <div className="h-px bg-building-detail/50 mx-4" />
            
            {/* Desktop Row 2 - Next 3 projects */}
            <div className="flex justify-center gap-6 lg:gap-8">
              {projects.slice(3, 6).map((project, index) => (
                <Window
                  key={project.id}
                  project={project}
                  index={index + 3}
                  onClick={() => {
                    setActiveWindowId(null);
                    onWindowClick(project.id);
                  }}
                  isViewed={viewedProjects.has(project.id)}
                  activeWindowId={activeWindowId}
                  onWindowActivate={setActiveWindowId}
                />
              ))}
            </div>

            {/* Desktop Floor line */}
            <div className="h-px bg-building-detail/50 mx-4" />
          </div>

          {/* MOBILE LAYOUT (2-2-2-2) - shown on mobile, hidden on md and up */}
          <div className="flex md:hidden flex-col gap-4 w-full">
            {/* Mobile Row 1 - First 2 projects */}
            <div className="flex justify-center gap-3">
              {row1.map((project, index) => (
                <Window
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => {
                    setActiveWindowId(null);
                    onWindowClick(project.id);
                  }}
                  isViewed={viewedProjects.has(project.id)}
                  activeWindowId={activeWindowId}
                  onWindowActivate={setActiveWindowId}
                />
              ))}
            </div>

            {/* Mobile Floor line */}
            <div className="h-px bg-building-detail/50 mx-2" />
            
            {/* Mobile Row 2 - Next 2 projects */}
            <div className="flex justify-center gap-3">
              {row2.map((project, index) => (
                <Window
                  key={project.id}
                  project={project}
                  index={index + 2}
                  onClick={() => {
                    setActiveWindowId(null);
                    onWindowClick(project.id);
                  }}
                  isViewed={viewedProjects.has(project.id)}
                  activeWindowId={activeWindowId}
                  onWindowActivate={setActiveWindowId}
                />
              ))}
            </div>

            {/* Mobile Floor line */}
            <div className="h-px bg-building-detail/50 mx-2" />
            
            {/* Mobile Row 3 - Last 2 projects */}
            <div className="flex justify-center gap-3">
              {row3.map((project, index) => (
                <Window
                  key={project.id}
                  project={project}
                  index={index + 4}
                  onClick={() => {
                    setActiveWindowId(null);
                    onWindowClick(project.id);
                  }}
                  isViewed={viewedProjects.has(project.id)}
                  activeWindowId={activeWindowId}
                  onWindowActivate={setActiveWindowId}
                />
              ))}
            </div>

            {/* Mobile Floor line */}
            <div className="h-px bg-building-detail/50 mx-2" />
          </div>

          {/* Bottom Row - Special Windows (always 2, for both layouts) */}
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <SpecialWindowButton
              label="About"
              sublabel="The Detective"
              onClick={() => onSpecialClick('about')}
              color="amber"
              delay={2.5}
              isActive={activeWindowId === 'about'}
              onActivate={() => setActiveWindowId('about')}
            />
            <SpecialWindowButton
              label="Contact"
              sublabel="Get in Touch"
              onClick={() => onSpecialClick('contact')}
              color="cyan"
              delay={2.8}
              isActive={activeWindowId === 'contact'}
              onActivate={() => setActiveWindowId('contact')}
            />
          </div>
        </div>
        
        {/* Ground Level */}
        <div className="absolute -bottom-2 left-0 right-0 h-2 bg-building-detail" />
        <div className="absolute -bottom-4 left-4 right-4 h-2 bg-building-dark" />
      </div>
      
      {/* Building Foundation */}
      <div className="h-8 bg-building-dark mx-2 sm:mx-4" />
      <div className="h-4 bg-background/50 mx-4 sm:mx-8" />
    </motion.div>
  );
};

export default Building;