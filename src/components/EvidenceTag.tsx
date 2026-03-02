// src/components/EvidenceTag.tsx

import { motion } from 'framer-motion';

interface EvidenceTagProps {
  label: string;
  variant?: 'interview' | 'finding' | 'accessibility' | 'metric' | 'constraint' | 'default' | 'exhibit' | 'testimony' | 'crime' | 'evidence';
}

const variantStyles: Record<string, string> = {
  interview: 'bg-accent/15 text-accent/80 border-accent/30',
  finding: 'bg-amber-600/15 text-amber-600/80 border-amber-600/30',
  accessibility: 'bg-cyan-600/15 text-cyan-600/80 border-cyan-600/30',
  metric: 'bg-emerald-600/15 text-emerald-600/80 border-emerald-600/30',
  constraint: 'bg-rose-600/15 text-rose-600/80 border-rose-600/30',
  exhibit: 'bg-accent/20 text-accent/90 border-accent/40 font-mono tracking-[0.2em]',
  testimony: 'bg-cyan-600/15 text-cyan-600/80 border-cyan-600/30',
  crime: 'bg-primary/15 text-primary/80 border-primary/30',
  evidence: 'bg-amber-600/15 text-amber-600/80 border-amber-600/30',
  default: 'bg-secondary/20 text-foreground/50 border-border/20',
};

const EvidenceTag = ({ label, variant = 'default' }: EvidenceTagProps) => {
  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase rounded-sm border ${variantStyles[variant]}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="w-1 h-1 rounded-full bg-current opacity-70" />
      {label}
    </motion.span>
  );
};

export default EvidenceTag;