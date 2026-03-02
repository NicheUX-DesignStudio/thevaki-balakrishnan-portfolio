// src/components/case-study/ExhibitViewer.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Download, ZoomIn, ZoomOut, RotateCw, Grid
} from 'lucide-react';
import EvidenceTag from '../EvidenceTag';

interface ExhibitViewerProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'wireframes' | 'final-ui' | 'prototype';
  projectTitle: string;
}

// Placeholder exhibits - replace with your actual images
const exhibits = {
  wireframes: [
    { id: 1, src: 'https://placehold.co/1200x800/1a2c2e/f5c542?text=Wireframe+-+Dashboard+Concept', caption: 'Initial concept - Dashboard view', notes: 'Exhibit B-01' },
    { id: 2, src: 'https://placehold.co/1200x800/1a2c2e/f5c542?text=Wireframe+-+Navigation+Simplification', caption: 'Iteration 2 - Simplified navigation', notes: 'Exhibit B-02' },
    { id: 3, src: 'https://placehold.co/1200x800/1a2c2e/f5c542?text=Wireframe+-+Context-Aware+Home', caption: 'Final - Context-aware home', notes: 'Exhibit B-03' },
  ],
  'final-ui': [
    { id: 1, src: 'https://placehold.co/1200x800/1a2c2e/f08a6c?text=Final+UI+-+Home+Screen', caption: 'Home screen - Calm state', notes: 'Exhibit C-01' },
    { id: 2, src: 'https://placehold.co/1200x800/1a2c2e/f08a6c?text=Final+UI+-+Breathing+Exercise', caption: 'Breathing exercise', notes: 'Exhibit C-02' },
    { id: 3, src: 'https://placehold.co/1200x800/1a2c2e/f08a6c?text=Final+UI+-+Journal+Entry', caption: 'Journal entry', notes: 'Exhibit C-03' },
    { id: 4, src: 'https://placehold.co/1200x800/1a2c2e/f08a6c?text=Final+UI+-+Sanctuary', caption: 'Sanctuary view', notes: 'Exhibit C-04' },
  ],
  prototype: [
    { id: 1, src: 'https://placehold.co/1200x800/1a2c2e/5cb8b8?text=Prototype+-+Main+Flow', caption: 'Interactive prototype - Flow 1', notes: 'Exhibit D-01' },
    { id: 2, src: 'https://placehold.co/1200x800/1a2c2e/5cb8b8?text=Prototype+-+Micro+Interaction', caption: 'Micro-interaction detail', notes: 'Exhibit D-02' },
  ],
};

const ExhibitViewer = ({ isOpen, onClose, type, projectTitle }: ExhibitViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  const currentExhibits = exhibits[type] || [];
  const currentExhibit = currentExhibits[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentIndex((i) => (i > 0 ? i - 1 : currentExhibits.length - 1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setCurrentIndex((i) => (i < currentExhibits.length - 1 ? i + 1 : 0));
          break;
        case 'Escape':
          if (isFullscreen) {
            setIsFullscreen(false);
          } else {
            onClose();
          }
          break;
        case 'f':
          e.preventDefault();
          setIsFullscreen(!isFullscreen);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, currentExhibits.length, onClose]);

  useEffect(() => {
    setZoomLevel(1);
    setRotation(0);
  }, [currentIndex]);

  if (!isOpen) return null;

  const getExhibitTitle = () => {
    switch (type) {
      case 'wireframes': return 'Wireframes — Exhibit B';
      case 'final-ui': return 'Final UI — Exhibit C';
      case 'prototype': return 'Prototype — Exhibit D';
    }
  };

  const handlePrev = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : currentExhibits.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i < currentExhibits.length - 1 ? i + 1 : 0));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleZoomIn = () => {
    setZoomLevel((z) => Math.min(z + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => Math.max(z - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((r) => (r + 90) % 360);
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-[100] flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4 md:p-8'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Viewer */}
        <motion.div
          className={`relative bg-surface border-2 border-accent/50 rounded-sm flex flex-col ${
            isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl max-h-[90vh]'
          }`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-accent/30 bg-surface-elevated">
            <div className="flex items-center gap-3">
              <span className="exhibit-tag">{currentExhibit?.notes}</span>
              <span className="text-sm font-mono text-foreground/80">
                {currentIndex + 1} / {currentExhibits.length}
              </span>
              <span className="text-sm text-foreground/60 hidden md:inline">{currentExhibit?.caption}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-accent/20 rounded-sm transition-colors"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-accent/20 rounded-sm transition-colors"
                aria-label="Close viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Area */}
          <div className="flex-1 relative bg-black/40 flex items-center justify-center overflow-hidden p-4">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 z-20 p-3 bg-surface/80 border-2 border-accent/50 rounded-sm hover:bg-accent/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 z-20 p-3 bg-surface/80 border-2 border-accent/50 rounded-sm hover:bg-accent/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              className="relative"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              <img
                src={currentExhibit?.src}
                alt={currentExhibit?.caption}
                className="max-w-full max-h-[70vh] object-contain border-2 border-border/50 rounded-sm"
              />
            </motion.div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-surface/90 border-2 border-accent/30 p-2 rounded-sm">
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-accent/20 rounded-sm transition-colors"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-accent/20 rounded-sm transition-colors"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleRotate}
                className="p-1.5 hover:bg-accent/20 rounded-sm transition-colors"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {showThumbnails && currentExhibits.length > 1 && (
            <div className="p-4 border-t-2 border-accent/30 bg-surface-elevated">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-accent/80 font-semibold">
                  EXHIBIT THUMBNAILS
                </span>
                <button
                  onClick={() => setShowThumbnails(false)}
                  className="text-xs text-muted-foreground/70 hover:text-accent transition-colors"
                >
                  Hide
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {currentExhibits.map((exhibit, index) => (
                  <button
                    key={exhibit.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 border-2 transition-all duration-200 ${
                      index === currentIndex
                        ? 'border-accent scale-105'
                        : 'border-transparent hover:border-accent/50'
                    }`}
                  >
                    <img
                      src={exhibit.src}
                      alt={exhibit.caption}
                      className="w-20 h-16 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[8px] text-center py-0.5">
                      {exhibit.notes}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Show thumbnails button if hidden */}
          {!showThumbnails && (
            <div className="p-2 border-t border-accent/30 bg-surface-elevated flex justify-center">
              <button
                onClick={() => setShowThumbnails(true)}
                className="flex items-center gap-2 text-xs text-muted-foreground/70 hover:text-accent transition-colors"
              >
                <Grid className="w-3.5 h-3.5" />
                Show thumbnails
              </button>
            </div>
          )}

          {/* Caption */}
          <div className="p-3 text-center border-t border-accent/30 bg-surface/80">
            <p className="text-sm text-foreground/90">{currentExhibit?.caption}</p>
            <p className="text-[10px] font-mono text-muted-foreground/70 mt-1">
              {projectTitle} · {getExhibitTitle()} · {currentExhibit?.notes}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExhibitViewer;