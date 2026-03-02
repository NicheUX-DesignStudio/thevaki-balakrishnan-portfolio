// src/components/case-study/KnownAssociatesBoard.tsx

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Competitor } from '@/data/projects';
import EvidenceTag from '../EvidenceTag';
import RedThread from '../RedThread';

interface KnownAssociatesBoardProps {
  competitors: Competitor[];
}

const ExhibitCard = ({
  competitor,
  index,
  isSelected,
  onHover,
}: {
  competitor: Competitor;
  index: number;
  isSelected: boolean;
  onHover: (index: number | null) => void;
}) => {
  const exhibitLetter = String.fromCharCode(65 + index);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
    >
      <div
        className={`
          relative p-6 border-2 rounded-sm transition-all duration-500 cursor-pointer
          ${isSelected
            ? 'border-accent/80 bg-accent/5 shadow-[0_0_30px_hsl(var(--accent)/0.3)]'
            : 'border-border/40 bg-surface/80 hover:border-accent/40'
          }
        `}
      >
        {/* Evidence corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/40" />

        {/* Evidence pin */}
        <div className="absolute -top-2 -left-2">
          <div className="relative">
            <div className="w-5 h-5 rounded-full bg-accent border-2 border-background shadow-[0_0_15px_hsl(var(--accent)/0.5)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-background/90" />
          </div>
        </div>

        {/* Exhibit tag */}
        <div className="absolute -top-2 right-4">
          <span className="exhibit-tag">
            EXHIBIT {exhibitLetter}
          </span>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4">
          <h4 className="font-serif text-xl text-foreground/90 border-b border-accent/20 pb-2">
            {competitor.name}
          </h4>

          <div className="space-y-3">
            <div>
              <span className="text-[8px] font-mono uppercase tracking-wider text-emerald-600/70">
                STRENGTHS
              </span>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                {competitor.strengths}
              </p>
            </div>

            <div>
              <span className="text-[8px] font-mono uppercase tracking-wider text-rose-600/70">
                WEAKNESSES
              </span>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                {competitor.weaknesses}
              </p>
            </div>

            <div className="pt-2 border-t border-accent/20">
              <span className="text-[8px] font-mono uppercase tracking-wider text-accent/80">
                OPPORTUNITY
              </span>
              <p className="text-sm font-medium text-foreground mt-1 italic">
                {competitor.opportunities}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const KnownAssociatesBoard = ({ competitors }: KnownAssociatesBoardProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getStrategicInsight = () => {
    if (competitors.some(c => c.name.includes('Etsy') || c.name.includes('Amazon'))) {
      return 'Mass market competitors compete on scale and convenience. The advantage: authenticity, curation, and the human story behind each piece.';
    }
    if (competitors.some(c => c.name.includes('Headspace') || c.name.includes('Calm'))) {
      return 'Wellness leaders have production value but lack clinical warmth. Opportunity: evidence-based compassion, not wellness theatre.';
    }
    if (competitors.some(c => c.name.includes('1stDibs'))) {
      return 'High-end exists but feels exclusive and inaccessible. Opportunity: approachable luxury that welcomes, not intimidates.';
    }
    if (competitors.some(c => c.name.includes('Urban Ladder') || c.name.includes('Pepperfry'))) {
      return 'Mass-market furniture platforms compete on catalogue size. The advantage: service depth, craft differentiation, and a premium showroom feel online.';
    }
    if (competitors.some(c => c.name.includes('Cleo') || c.name.includes('Monzo'))) {
      return 'Fintech competitors are either too corporate or too gimmicky. The gap: a product that feels trustworthy and human at the same time.';
    }
    return 'Market gap identified: genuine connection between user and purpose.';
  };

  return (
    <div className="evidence-board mt-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent/80 animate-pulse" />
          <h3 className="font-serif text-2xl text-foreground/90">Known Associates</h3>
          <EvidenceTag label="COMPETITIVE ANALYSIS" variant="exhibit" />
        </div>
        <div className="flex-1 relative">
          <RedThread orientation="horizontal" className="w-full" />
        </div>
        <span className="text-[8px] font-mono text-muted-foreground/40">
          {competitors.length} EXHIBITS
        </span>
      </div>

      {/* Evidence grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {competitors.map((comp, idx) => (
          <ExhibitCard
            key={comp.name}
            competitor={comp}
            index={idx}
            isSelected={selectedIndex === idx}
            onHover={setSelectedIndex}
          />
        ))}
      </div>

      {/* Strategic insight */}
      <motion.div
        className="mt-12 p-6 bg-accent/5 border-l-4 border-accent relative"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Pin */}
        <div className="absolute -left-2 -top-2">
          <div className="w-4 h-4 rounded-full bg-accent/80 border-2 border-background" />
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/70 whitespace-nowrap flex-shrink-0">
            INVESTIGATOR'S NOTE
          </span>
          <p className="text-foreground/80 text-sm italic leading-relaxed">
            {getStrategicInsight()}
          </p>
        </div>

        <div className="absolute bottom-2 right-4 flex items-center gap-2">
          <span className="text-[8px] font-mono text-accent/40">CASE FILE · CONFIDENTIAL</span>
          <div className="w-1 h-1 rounded-full bg-accent/60" />
        </div>
      </motion.div>
    </div>
  );
};

export default KnownAssociatesBoard;