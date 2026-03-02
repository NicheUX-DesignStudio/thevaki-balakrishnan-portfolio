import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, X, ZoomIn, Linkedin, Instagram, FileText } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

interface AboutSectionProps {
  onClose: () => void;
}

const certifications = [
  {
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google / Coursera',
    year: '2024',
    url: 'https://www.credly.com/go/M6pQDk7s',
    localPdf: '/Certificates/GoogleUXDesignProfessionalCertificate_Badge20240515-8-pzo334.pdf',
  },
  {
    title: 'Foundations of User Experience (UX) Design',
    issuer: 'Google / Coursera',
    year: '2024',
    url: 'https://coursera.org/verify/R3NAHVXNCRW6',
    localPdf: '/Certificates/Coursera R3NAHVXNCRW6.pdf',
  },
  {
    title: 'Start the UX Design Process: Empathize, Define, and Ideate',
    issuer: 'Google / Coursera',
    year: '2024',
    url: 'https://coursera.org/verify/4DM3MRD7DT69',
    localPdf: '/Certificates/Coursera 4DM3MRD7DT69.pdf',
  },
  {
    title: 'Build Wireframes and Low-Fidelity Prototypes',
    issuer: 'Google / Coursera',
    year: '2024',
    url: 'https://coursera.org/verify/BUAHU7H2K8A3',
    localPdf: '/Certificates/Coursera BUAHU7H2K8A3.pdf',
  },
  {
    title: 'Conduct UX Research and Test Early Concepts',
    issuer: 'Google / Coursera',
    year: '2024',
    url: 'https://coursera.org/verify/988DGTHRKYP6',
    localPdf: '/Certificates/Coursera 988DGTHRKYP6.pdf',
  },
  {
    title: 'Build Dynamic User Interfaces (UI) for Websites',
    issuer: 'Google / Coursera',
    year: '2024',
    url: 'https://coursera.org/verify/8955DV7FEJXK',
    localPdf: '/Certificates/Coursera 8955DV7FEJXK.pdf',
  },
  {
    title: 'Create High-Fidelity Designs and Prototypes in Figma',
    issuer: 'Google / Coursera',
    year: '2024',
    url: 'https://coursera.org/verify/YSCVEU3RN7XU',
    localPdf: '/Certificates/Coursera YSCVEU3RN7XU.pdf',
  },
  {
    title: 'Design a User Experience for Social Good and Prepare for Jobs',
    issuer: 'Google / Coursera',
    year: '2024',
    url: 'https://coursera.org/verify/ZK6LNLGJSGA3',
    localPdf: '/Certificates/Coursera ZK6LNLGJSGA3.pdf',
  },
  {
    title: 'Introduction to Front-End Development',
    issuer: 'Meta / Coursera',
    year: '2025',
    url: 'https://coursera.org/verify/ME6U4B5XBK9X',
    localPdf: '/Certificates/Introduction to Front-End.pdf',
  },
];

const skills = [
  { category: 'UX Research', items: ['User Interviews', 'Usability Testing', 'Card Sorting', 'Diary Studies', 'Competitive Analysis', 'Journey Mapping'] },
  { category: 'UI and Interaction Design', items: ['Design Systems', 'Prototyping', 'Responsive Design', 'Motion Design', 'Component Libraries', 'Visual Hierarchy'] },
  { category: 'Accessibility', items: ['WCAG 2.1 AA/AAA', 'Screen Reader Testing', 'Inclusive Design', 'Colour Contrast', 'Keyboard Navigation', 'ARIA Patterns'] },
  { category: 'Front-End Fundamentals', items: ['HTML5 / CSS3', 'JavaScript / TypeScript', 'React Basics', 'Tailwind CSS', 'Git Version Control'] },
  { category: 'Content and Social', items: ['Content Strategy', 'Social Media Design', 'Brand Systems', 'Copywriting', 'Editorial Design'] },
];

const tools = [
  { group: 'Design', items: ['Figma', 'Framer', 'Adobe XD'] },
  { group: 'Visual', items: ['Illustrator', 'Photoshop', 'Canva', 'Adobe Express'] },
  { group: 'Research', items: ['Maze', 'Hotjar', 'Dovetail', 'Optimal Workshop'] },
  { group: 'Analytics', items: ['Amplitude', 'Google Analytics', 'FullStory'] },
  { group: 'Collaboration', items: ['Miro', 'Notion', 'Linear', 'Storybook'] },
];

const roles = [
  'UX/UI Designer',
  'Content Designer',
  'Social Media / Digital Design',
  'Product Designer',
  'Interaction Designer',
];

// Certificate modal component
const CertificateModal = ({
  cert,
  onClose,
}: {
  cert: (typeof certifications)[0] | null;
  onClose: () => void;
}) => {
  if (!cert) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.93, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.93, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-background rounded-sm border border-primary/20 flex flex-col"
          style={{ height: '92vh' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-primary/10 flex-shrink-0">
            <div className="min-w-0 flex-1 mr-4">
              <p className="text-foreground font-medium text-sm leading-snug truncate">{cert.title}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{cert.issuer} · {cert.year}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-primary border border-primary/30 rounded-sm hover:bg-primary/10 transition-colors"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
                <span className="hidden sm:inline">Verify</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 hover:bg-foreground/10 rounded-sm transition-colors"
                aria-label="Close certificate"
              >
                <X className="w-4 h-4 text-foreground/60" />
              </button>
            </div>
          </div>

          {/* PDF embed — fills all remaining height */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <iframe
              src={`${cert.localPdf}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=page-fit`}
              className="w-full h-full border-0"
              style={{ display: 'block' }}
              title={cert.title}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AboutSection = ({ onClose }: AboutSectionProps) => {
  const [activeCert, setActiveCert] = useState<(typeof certifications)[0] | null>(null);

  // Close modal on Escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && activeCert) setActiveCert(null);
  };

  return (
    <motion.div
      className="min-h-screen bg-background-interior"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onKeyDown={handleKeyDown}
    >
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background-interior/95 backdrop-blur-sm border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Return to building"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs hidden md:inline">Exit</span>
          </button>
          <p className="font-serif text-sm md:text-base text-foreground/80">Detective Dossier</p>
          <div className="w-12" />
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
        {/* Hero */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="section-label mb-4">The Detective</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            UI/UX Designer
          </h1>
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-10">
            Web and Product Design · United Kingdom
          </p>

          <div className="archive-container">
            <div className="p-6 md:p-8">
              <p className="text-foreground text-base md:text-lg leading-relaxed readable-width">
                A user-centred designer with a focus on accessibility, storytelling, and end-to-end UX delivery.
                I believe design should be quiet enough to let people focus, clear enough that nobody feels lost,
                and intentional enough to earn trust. Every project is an investigation — understanding people,
                uncovering insights, and crafting experiences that genuinely serve them.
              </p>
            </div>
          </div>
        </motion.section>

        <div className="gold-divider" />

        {/* Social & Resume Links */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="section-label mb-3">Connect</p>
          <h2 className="section-heading mb-6">Find Me Online</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/thevaki-balakrishnan-664996201/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-surface border border-border/10 rounded-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
            >
              <Linkedin className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="text-foreground font-medium">Thevaki Balakrishnan</span>
                <span className="text-muted-foreground text-xs">LinkedIn</span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/60 ml-auto transition-colors" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/nicheux.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-surface border border-border/10 rounded-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
            >
              <Instagram className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="text-foreground font-medium">@nicheux.studio</span>
                <span className="text-muted-foreground text-xs">Instagram</span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/60 ml-auto transition-colors" />
            </a>

            {/* Resume/CV */}
            <a
              href="/public/Thevaki Balakrishnan_UIUXDesigner.pdf" // Update this path to your actual resume file
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-surface border border-border/10 rounded-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
            >
              <FileText className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
              <div className="flex flex-col">
                <span className="text-foreground font-medium">View Resume</span>
                <span className="text-muted-foreground text-xs">PDF · Updated 2026</span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/60 ml-auto transition-colors" />
            </a>
          </div>
        </motion.section>

        <div className="gold-divider" />

        {/* Education */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="section-label mb-3">Education</p>
          <h2 className="section-heading mb-6">Academic Background</h2>
          <div className="archive-container">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl text-foreground">B.Voc in Digital Journalism</h3>
                  <p className="text-muted-foreground text-sm mt-1">Loyola College, Chennai</p>
                </div>
                <span className="text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-sm font-medium">
                  First Class with Distinction
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="gold-divider" />

        {/* Certifications */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="section-label mb-3">Credentials</p>
          <h2 className="section-heading mb-2">Certifications</h2>
          <p className="text-muted-foreground text-xs tracking-wider uppercase mb-8">
            {certifications.length} verified credentials · click any card to preview
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="relative group">
                    {/* Preview button */}
                    <button
                      onClick={() => setActiveCert(cert)}
                      className="absolute top-3 right-3 z-10 p-1.5 bg-primary/10 hover:bg-primary/20 rounded-sm border border-primary/20 transition-all opacity-0 group-hover:opacity-100"
                      aria-label={`Preview ${cert.title}`}
                    >
                      <ZoomIn className="w-3 h-3 text-primary" />
                    </button>

                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-5 archive-container hover:border-primary/40 transition-all duration-300"
                      onClick={e => {
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center text-xs text-primary font-mono font-medium">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-foreground text-sm font-medium leading-snug group-hover:text-primary transition-colors pr-6">
                            {cert.title}
                          </p>
                          <p className="text-muted-foreground text-xs mt-1.5">{cert.issuer}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-muted-foreground/50 text-[10px] tracking-wider">{cert.year}</p>
                            <ExternalLink className="w-3 h-3 text-muted-foreground/30 group-hover:text-primary/60 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click card to verify · hover for preview</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </motion.section>

        <div className="gold-divider" />

        {/* Skills */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p className="section-label mb-3">Capabilities</p>
          <h2 className="section-heading mb-8">Skills and Expertise</h2>
          <div className="space-y-8">
            {skills.map((group, gIndex) => (
              <div key={gIndex}>
                <h3 className="text-foreground/70 text-xs tracking-[0.2em] uppercase mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, iIndex) => (
                    <span
                      key={iIndex}
                      className="px-3 py-1.5 bg-surface text-foreground/70 text-xs rounded-sm border border-border/15"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="gold-divider" />

        {/* Tools */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="section-label mb-3">Arsenal</p>
          <h2 className="section-heading mb-8">Tools and Tech Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((group, gIndex) => (
              <div key={gIndex} className="p-5 bg-surface border border-border/10 rounded-sm">
                <p className="section-label mb-3">{group.group}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tool, tIndex) => (
                    <span key={tIndex} className="text-foreground/70 text-sm">
                      {tool}{tIndex < group.items.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="gold-divider" />

        {/* Roles */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <p className="section-label mb-3">Availability</p>
          <h2 className="section-heading mb-8">Open To</h2>
          <div className="flex flex-wrap gap-3">
            {roles.map((role, index) => (
              <span
                key={index}
                className="px-5 py-2.5 bg-primary/10 text-primary text-sm rounded-sm border border-primary/20 font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Return */}
        <div className="text-center pt-12 border-t border-primary/10">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-serif text-lg">Return to the building</span>
          </button>
        </div>
      </div>

      {/* Certificate modal */}
      {activeCert && (
        <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </motion.div>
  );
};

export default AboutSection;