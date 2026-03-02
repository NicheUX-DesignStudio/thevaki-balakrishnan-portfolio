// src/components/case-study/SitemapBoard.tsx

import { motion } from 'framer-motion';
import { Home, FolderTree, FileText, Download, Target, Users, RefreshCw, Route } from 'lucide-react';
import { Project } from '@/data/projects';
import EvidenceTag from '../EvidenceTag';
import RedThread from '../RedThread';

interface SitemapBoardProps {
  sitemap: NonNullable<Project['sitemap']>;
}

const SitemapBoard = ({ sitemap }: SitemapBoardProps) => {
  return (
    <div className="space-y-12">
      {/* SITE STRUCTURE */}
      <div className="evidence-board">
        <div className="flex items-center gap-3 mb-8 border-b border-accent/30 pb-4">
          <div className="evidence-pin">
            <div className="evidence-pin-dot" />
          </div>
          <span className="text-sm font-mono uppercase tracking-wider text-accent font-semibold">
            THE ARCONIA — SITE ARCHITECTURE
          </span>
          <EvidenceTag label="INFORMATION ARCHITECTURE" variant="exhibit" />
        </div>

        <div className="relative">
          {sitemap.structure.map((level, levelIndex) => (
            <div key={levelIndex} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-600/90 bg-cyan-600/10 px-3 py-1.5 rounded-sm font-semibold">
                  LEVEL {levelIndex + 1}
                </span>
                <div className="flex-1 h-px bg-cyan-600/40" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {level.map((node, nodeIndex) => {
                  const isHome = node.includes('Arconia') || node.includes('Home');
                  const isCaseFile = sitemap.evidenceRoom.caseFiles.some(file => 
                    node.includes(file.replace('/case/', ''))
                  );
                  const isEntry = sitemap.entryPoints.includes(node);
                  const isExit = sitemap.exitPoints.some(exit => node.includes(exit));
                  
                  return (
                    <div
                      key={nodeIndex}
                      className={`
                        relative p-4 border-2 rounded-sm transition-all duration-200
                        ${isHome ? 'border-accent bg-accent/10' : ''}
                        ${isCaseFile ? 'border-amber-600 bg-amber-600/10' : ''}
                        ${!isHome && !isCaseFile ? 'border-border bg-surface/50' : ''}
                      `}
                    >
                      {isEntry && (
                        <div className="absolute -top-2 -left-2">
                          <span className="text-[8px] font-mono bg-cyan-600 text-white px-1.5 py-0.5 rounded-sm font-bold">
                            ENTRY
                          </span>
                        </div>
                      )}
                      {isExit && (
                        <div className="absolute -top-2 -right-2">
                          <span className="text-[8px] font-mono bg-rose-600 text-white px-1.5 py-0.5 rounded-sm font-bold">
                            EXIT
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center">
                        <span className={`
                          text-sm font-medium block
                          ${isHome ? 'text-accent font-serif text-base' : ''}
                          ${isCaseFile ? 'text-amber-600' : ''}
                          ${!isHome && !isCaseFile ? 'text-foreground/90' : ''}
                        `}>
                          {node}
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/70 block mt-2">
                          {isHome ? 'HOME' : 
                           isCaseFile ? 'CASE FILE' : 
                           isEntry ? 'ENTRY POINT' : 
                           isExit ? 'EXIT' : 
                           'SECTION'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {levelIndex < sitemap.structure.length - 1 && (
                <div className="flex justify-center mb-4">
                  <div className="w-0.5 h-8 bg-cyan-600/60" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-cyan-600/10 border-l-4 border-cyan-600 rounded-sm">
          <div className="flex items-start gap-4">
            <FolderTree className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-foreground/90 text-sm font-medium">
                <span className="text-cyan-600 font-bold">Depth:</span> {sitemap.structure.length} levels · 
                <span className="text-cyan-600 font-bold ml-2">Entry points:</span> {sitemap.entryPoints.join(' · ')} · 
                <span className="text-cyan-600 font-bold ml-2">Exit points:</span> {sitemap.exitPoints.join(' · ')}
              </p>
              <p className="text-foreground/80 text-xs">
                Shallow hierarchy enables rapid case access — any case file is maximum 3 clicks from home.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* USER FLOWS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-surface/80 border border-cyan-600/40 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-cyan-600/30">
            <Target className="w-4 h-4 text-cyan-600" />
            <h3 className="font-serif text-lg text-foreground font-medium">Recruiter</h3>
            <EvidenceTag label="PERSONA" variant="interview" />
          </div>
          <div className="space-y-2.5">
            {sitemap.userFlows.recruiter.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-cyan-600 font-mono font-bold w-6">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-foreground/90">{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-cyan-600/30">
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-600 font-semibold">
              <Route className="w-3.5 h-3.5" />
              <span>CONVERSION → Contact investigator</span>
            </div>
          </div>
        </div>

        <div className="bg-surface/80 border border-amber-600/40 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-amber-600/30">
            <Users className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif text-lg text-foreground font-medium">Client</h3>
            <EvidenceTag label="PERSONA" variant="interview" />
          </div>
          <div className="space-y-2.5">
            {sitemap.userFlows.client.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-amber-600 font-mono font-bold w-6">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-foreground/90">{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-amber-600/30">
            <div className="flex items-center gap-2 text-[10px] font-mono text-amber-600 font-semibold">
              <Route className="w-3.5 h-3.5" />
              <span>CONVERSION → Initiate consultation</span>
            </div>
          </div>
        </div>

        <div className="bg-surface/80 border border-emerald-600/40 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-emerald-600/30">
            <RefreshCw className="w-4 h-4 text-emerald-600" />
            <h3 className="font-serif text-lg text-foreground font-medium">Return Visitor</h3>
            <EvidenceTag label="PERSONA" variant="interview" />
          </div>
          <div className="space-y-2.5">
            {sitemap.userFlows.returnVisitor.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-emerald-600 font-mono font-bold w-6">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-foreground/90">{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-600/30">
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-600 font-semibold">
              <Route className="w-3.5 h-3.5" />
              <span>CONVERSION → Follow red thread</span>
            </div>
          </div>
        </div>
      </div>

      {/* EVIDENCE ROOM PATHWAYS */}
      <div className="evidence-board">
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-accent/30">
          <Home className="w-4 h-4 text-accent" />
          <span className="text-sm font-mono uppercase tracking-wider text-accent font-semibold">
            EVIDENCE ROOM — ACCESS PATHS
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 font-bold mb-3">
              PRIMARY PATHS
            </h4>
            <ul className="space-y-2">
              {sitemap.evidenceRoom.primaryPaths.map((path, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-accent/80">→</span>
                  <span className="text-foreground/90">{path}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold mb-3">
              EVIDENCE LOCKER
            </h4>
            <ul className="space-y-2">
              {sitemap.evidenceRoom.evidenceLocker.map((path, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-accent/80">→</span>
                  <span className="text-foreground/90">{path}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold mb-3">
              CASE FILES
            </h4>
            <ul className="space-y-2">
              {sitemap.evidenceRoom.caseFiles.map((path, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-accent/80">→</span>
                  <span className="text-foreground/90">{path}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-accent/30">
          <p className="text-[11px] text-muted-foreground/80">
            <span className="text-accent font-bold">Total case files:</span> {sitemap.evidenceRoom.caseFiles.length} · 
            <span className="text-accent font-bold ml-3">Evidence locker:</span> {sitemap.evidenceRoom.evidenceLocker.length} resources
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitemapBoard;