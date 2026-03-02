import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrivalScene from '@/components/ArrivalScene';
import Building, { SpecialWindow } from '@/components/Building';
import CaseStudyPage from '@/components/case-study/CaseStudyPage';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ProjectList from '@/components/ProjectList';
import Footer from '@/components/Footer';
import CinematicOverlay from '@/components/CinematicOverlay';
import { projects } from '@/data/projects';

type ActiveView = 
  | { type: 'building' }
  | { type: 'case-study'; projectId: string }
  | { type: 'about' }
  | { type: 'contact' };

const Index = () => {
  const [hasArrived, setHasArrived] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>({ type: 'building' });
  const [viewedProjects, setViewedProjects] = useState<Set<string>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setHasArrived(true);
    }
  }, []);

  const handleArrivalComplete = useCallback(() => {
    setHasArrived(true);
    sessionStorage.setItem('hasSeenIntro', 'true');
  }, []);

  const handleTransition = useCallback((next: ActiveView) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveView(next);
      setIsTransitioning(false);
      window.scrollTo({ top: 0 });
    }, 500);
  }, []);

  const handleWindowClick = useCallback((projectId: string) => {
    setViewedProjects(prev => new Set([...prev, projectId]));
    handleTransition({ type: 'case-study', projectId });
  }, [handleTransition]);

  const handleSpecialClick = useCallback((type: SpecialWindow) => {
    handleTransition({ type });
  }, [handleTransition]);

  const handleReturnToBuilding = useCallback(() => {
    handleTransition({ type: 'building' });
  }, [handleTransition]);

  const selectedProject = activeView.type === 'case-study' 
    ? projects.find(p => p.id === activeView.projectId) 
    : null;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Cinematic Overlays */}
      <CinematicOverlay />

      {/* Arrival Scene */}
      <AnimatePresence>
        {!hasArrived && (
          <ArrivalScene onComplete={handleArrivalComplete} />
        )}
      </AnimatePresence>

      {/* Main Building View */}
      <AnimatePresence mode="wait">
        {hasArrived && activeView.type === 'building' && (
          <motion.main
            key="building"
            className="min-h-screen flex flex-col items-center justify-between relative py-16 md:py-24 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0.5 : 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            {/* Stars - reduced opacity and count */}
            <div className="fixed inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-foreground/15 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{ opacity: [0.15, 0.3, 0.15] }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Top section with title */}
            <div className="w-full max-w-4xl mx-auto text-center mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-3"
              >
                <p className="section-label text-accent/80">The Arconia Archive</p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
                  Portfolio
                </h1>
                <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase">
                  UI/UX Designer
                </p>
              </motion.div>
            </div>

            {/* Building section - centered */}
            <div className="w-full flex justify-center mb-12 md:mb-16">
              <Building 
                onWindowClick={handleWindowClick}
                onSpecialClick={handleSpecialClick}
                viewedProjects={viewedProjects}
              />
            </div>

            {/* Bottom section with buttons */}
            <div className="w-full max-w-4xl mx-auto">
              <ProjectList 
                onProjectClick={handleWindowClick}
                onSpecialClick={handleSpecialClick}
              />
            </div>

            {/* Footer */}
            <div className="w-full max-w-4xl mx-auto mt-16">
              <Footer />
            </div>
          </motion.main>
        )}

        {/* Case Study View */}
        {hasArrived && activeView.type === 'case-study' && selectedProject && (
          <motion.div
            key="case-study"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CaseStudyPage project={selectedProject} onClose={handleReturnToBuilding} />
          </motion.div>
        )}

        {/* About View */}
        {hasArrived && activeView.type === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AboutSection onClose={handleReturnToBuilding} />
          </motion.div>
        )}

        {/* Contact View */}
        {hasArrived && activeView.type === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ContactSection onClose={handleReturnToBuilding} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 bg-background z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;