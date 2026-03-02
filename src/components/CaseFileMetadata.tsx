import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import EvidenceTag from './EvidenceTag';

interface CaseFileMetadataProps {
  project: Project;
}

const CaseFileMetadata = ({ project }: CaseFileMetadataProps) => {
  return (
    <motion.div
      className="bg-card/30 border border-border/10 rounded-sm p-5 md:p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-accent/30" />
        <p className="text-foreground/30 text-[10px] tracking-[0.3em] uppercase">
          Case File
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-foreground/25 text-[10px] uppercase tracking-wider mb-1">Year</p>
          <p className="text-foreground/70 text-sm">{project.year}</p>
        </div>
        <div>
          <p className="text-foreground/25 text-[10px] uppercase tracking-wider mb-1">Role</p>
          <p className="text-foreground/70 text-sm">{project.role}</p>
        </div>
        <div>
          <p className="text-foreground/25 text-[10px] uppercase tracking-wider mb-1">Duration</p>
          <p className="text-foreground/70 text-sm">{project.duration}</p>
        </div>
        {project.team && (
          <div>
            <p className="text-foreground/25 text-[10px] uppercase tracking-wider mb-1">Team</p>
            <p className="text-foreground/70 text-sm">{project.team}</p>
          </div>
        )}
      </div>

      {project.tools && project.tools.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/10">
          {project.tools.map((tool, index) => (
            <EvidenceTag key={index} label={tool} variant="default" />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CaseFileMetadata;
