import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import { useState, useEffect } from 'react';

interface WindowProps {
  project: Project;
  index: number;
  onClick: () => void;
  isViewed?: boolean;
  activeWindowId?: string | null; // Track which window is showing info
  onWindowActivate?: (id: string | null) => void; // Callback to update active window
}

// Default colors if windowColor is missing
const colorClasses: Record<string, { bg: string; glow: string; pane: string }> = {
  amber: {
    bg: 'bg-window-amber',
    glow: 'group-hover:shadow-[0_0_60px_hsl(42_85%_55%/0.5)] md:group-hover:shadow-[0_0_60px_hsl(42_85%_55%/0.5)]',
    pane: 'bg-window-amber/90'
  },
  coral: {
    bg: 'bg-window-coral',
    glow: 'group-hover:shadow-[0_0_60px_hsl(8_65%_55%/0.5)] md:group-hover:shadow-[0_0_60px_hsl(8_65%_55%/0.5)]',
    pane: 'bg-window-coral/90'
  },
  cyan: {
    bg: 'bg-window-cyan',
    glow: 'group-hover:shadow-[0_0_60px_hsl(185_55%_60%/0.5)] md:group-hover:shadow-[0_0_60px_hsl(185_55%_60%/0.5)]',
    pane: 'bg-window-cyan/90'
  },
  dim: {
    bg: 'bg-window-dim',
    glow: 'group-hover:shadow-[0_0_40px_hsl(185_25%_22%/0.4)] md:group-hover:shadow-[0_0_40px_hsl(185_25%_22%/0.4)]',
    pane: 'bg-window-dim/80'
  }
};

const Silhouette = ({ type }: { type: 'standing' | 'sitting' | 'reading' }) => {
  const silhouettes = {
    standing: (
      <svg viewBox="0 0 40 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="20" cy="10" rx="8" ry="10" fill="currentColor" />
        <path d="M12 20 Q20 25 28 20 L26 55 Q20 58 14 55 Z" fill="currentColor" />
        <path d="M14 55 L12 80 L16 80 L18 58 L22 58 L24 80 L28 80 L26 55" fill="currentColor" />
      </svg>
    ),
    sitting: (
      <svg viewBox="0 0 50 60" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="25" cy="8" rx="7" ry="8" fill="currentColor" />
        <path d="M18 16 Q25 20 32 16 L34 35 Q25 38 16 35 Z" fill="currentColor" />
        <path d="M16 35 L10 50 L35 50 L40 42 L34 35" fill="currentColor" />
      </svg>
    ),
    reading: (
      <svg viewBox="0 0 50 70" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="22" cy="10" rx="7" ry="9" fill="currentColor" />
        <path d="M15 19 Q22 24 29 19 L31 45 Q22 48 13 45 Z" fill="currentColor" />
        <path d="M29 25 L40 20 L42 35 L31 38" fill="currentColor" />
        <path d="M13 45 L8 70 L26 70 L31 45" fill="currentColor" />
      </svg>
    )
  };
  
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-12 text-building-dark/80 subtle-float">
      {silhouettes[type]}
    </div>
  );
};

const Window = ({ 
  project, 
  index, 
  onClick, 
  isViewed,
  activeWindowId,
  onWindowActivate 
}: WindowProps) => {
  // Use type assertion with fallbacks for missing properties
  const windowColor = (project as any).windowColor || 'amber';
  const isFeatured = (project as any).isFeatured || false;
  const hasSilhouette = (project as any).hasSilhouette !== false;
  const isActive = (project as any).isActive !== false;
  
  const colors = colorClasses[windowColor] || colorClasses.amber;
  const silhouetteTypes: ('standing' | 'sitting' | 'reading')[] = ['standing', 'sitting', 'reading'];
  const silhouetteType = silhouetteTypes[index % 3];

  const [isMobile, setIsMobile] = useState(false);
  const projectId = project.id;

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if this window is the active one showing info
  const isShowingInfo = isMobile && activeWindowId === projectId;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isMobile) {
      // Desktop: direct open
      onClick();
      return;
    }

    // Mobile: handle tap
    if (isShowingInfo) {
      // If this window is already showing info, second tap opens
      onWindowActivate?.(null); // Clear active window
      onClick();
    } else {
      // First tap on this window - show info and close any other open window
      onWindowActivate?.(projectId);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 + index * 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`View ${project.title} project`}
    >
      {/* Window Frame */}
      <div className="relative">
        {/* Outer Frame / Decorative Molding */}
        <div className="absolute -inset-2 bg-building-detail rounded-sm" />
        
        {/* Window Sill */}
        <div className="absolute -bottom-3 -left-3 -right-3 h-3 bg-building-detail rounded-sm" />
        
        {/* Top Decorative Element */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-building-detail rounded-t-sm" />
        
        {/* Main Window Area */}
        <div 
          className={`relative w-24 h-36 sm:w-28 sm:h-40 md:w-36 md:h-52 lg:w-44 lg:h-64 transition-all duration-700 ${colors.glow}`}
        >
          {/* Window Glass */}
          <div className={`absolute inset-0 ${colors.pane} ${isFeatured ? 'breathing-glow' : ''}`}>
            {/* Window Panes - Cross Pattern */}
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
            
            {/* Silhouette - hide when showing info */}
            {hasSilhouette && isActive && !isShowingInfo && (
              <Silhouette type={silhouetteType} />
            )}
            
            {/* Curtain hint on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-building-dark/20" />
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-building-dark/20" />
          </div>
          
          {/* Mobile Info Overlay - appears on tap (matches desktop hover style) */}
          {isMobile && isShowingInfo && (
            <motion.div 
              className="absolute inset-0 bg-building-dark/95 flex flex-col items-center justify-center p-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-serif text-sm text-foreground mb-1 line-clamp-2">{project.title}</h3>
              <p className="text-[10px] text-muted-foreground mb-2 line-clamp-3">{project.subtitle}</p>
              {!isActive && (
                <span className="text-[8px] text-window-dim bg-window-dim/20 px-2 py-1 rounded-sm">
                  In Progress
                </span>
              )}
              <p className="text-[8px] text-accent/60 mt-2 font-mono uppercase tracking-wider">
                Tap again to enter
              </p>
            </motion.div>
          )}
          
          {/* Desktop Hover Overlay - only on desktop */}
          {!isMobile && (
            <motion.div 
              className="absolute inset-0 bg-building-dark/90 flex flex-col items-center justify-center p-4 text-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-serif text-lg md:text-xl text-foreground mb-2 line-clamp-2">{project.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-3">{project.subtitle}</p>
              {!isActive && (
                <span className="mt-2 text-[10px] text-window-dim bg-window-dim/20 px-2 py-1 rounded-sm">
                  In Progress
                </span>
              )}
            </motion.div>
          )}
          
          {/* Viewed indicator */}
          {isViewed && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-foreground/30" />
          )}

          {/* Mobile hint - subtle dots when not showing info */}
          {isMobile && !isShowingInfo && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
            </div>
          )}
        </div>
      </div>
      
      {/* Featured indicator - subtle glow underneath */}
      {isFeatured && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary/40 blur-sm" />
      )}
    </motion.button>
  );
};

export default Window;