import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { List, X, User, Mail } from 'lucide-react';
import { useState } from 'react';
import { SpecialWindow } from './Building';

interface ProjectListProps {
  onProjectClick: (projectId: string) => void;
  onSpecialClick: (type: SpecialWindow) => void;
}

const ProjectList = ({ onProjectClick, onSpecialClick }: ProjectListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors bg-card/80 backdrop-blur-sm px-5 py-3 rounded-sm border border-border/30 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
        aria-label="View all projects"
      >
        <List className="w-4 h-4" />
        <span className="text-sm font-medium">View All Projects</span>
      </motion.button>
      
      {/* Project List Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-3xl mx-auto px-6 py-16">
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-serif text-3xl text-foreground">All Projects</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                  aria-label="Close project list"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Case Studies */}
              <div className="space-y-4 mb-12">
                <p className="text-muted-foreground/40 text-xs tracking-[0.2em] uppercase">Case Studies</p>
                {projects.map((project, index) => (
                  <motion.button
                    key={project.id}
                    onClick={() => {
                      setIsOpen(false);
                      onProjectClick(project.id);
                    }}
                    className="w-full text-left group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-baseline justify-between py-4 border-b border-border/30 group-hover:border-primary/50 transition-colors">
                      <div>
                        <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{project.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{project.year}</span>
                        {!project.isActive && (
                          <span className="text-xs text-window-dim bg-window-dim/20 px-2 py-1 rounded-sm">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Special Sections */}
              <div className="space-y-4">
                <p className="text-muted-foreground/40 text-xs tracking-[0.2em] uppercase">Other</p>
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    onSpecialClick('about');
                  }}
                  className="w-full text-left group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 py-4 border-b border-border/30 group-hover:border-primary/50 transition-colors">
                    <User className="w-4 h-4 text-muted-foreground/50" />
                    <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                      About & Credentials
                    </h3>
                  </div>
                </motion.button>
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    onSpecialClick('contact');
                  }}
                  className="w-full text-left group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <div className="flex items-center gap-3 py-4 border-b border-border/30 group-hover:border-primary/50 transition-colors">
                    <Mail className="w-4 h-4 text-muted-foreground/50" />
                    <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                      Contact
                    </h3>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectList;