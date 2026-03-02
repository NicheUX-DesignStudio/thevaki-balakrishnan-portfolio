// src/components/case-study/CaseStudyPage.tsx
// UPDATED: Fixed sticky header - entire header now stays at top when scrolling
// FIXED: Removed wrapper div that was interfering with sticky positioning
// FIXED: Bloom & Brew information architecture image path

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Archive, Search, MapPin, Scissors, Film, Mic,
  Palette, Eye, FileText, Award, BookOpen,
  Shield, Target, TrendingUp, Users,
  Globe, Lock, Camera, Heart,
  FolderTree, Route, X, ZoomIn,
  ChevronLeft, ChevronRight, ArrowRight,
  ExternalLink as ExternalLinkIcon, AlertTriangle, Smartphone,
  Image, Sparkles,
} from 'lucide-react';
import { ReactNode } from 'react';
import { Project } from '@/data/projects';
import EvidenceHeader from './EvidenceHeader';
import KnownAssociatesBoard from './KnownAssociatesBoard';
import EvidenceTag from '../EvidenceTag';
import RedThread from '../RedThread';

// NAV SECTIONS
const SECTIONS = [
  { id: 'crime',        label: 'THE CRIME SCENE',          icon: Archive    },
  { id: 'context',      label: 'THE VICTIM',               icon: Users      },
  { id: 'investigation',label: 'THE INVESTIGATION',        icon: Search     },
  { id: 'evidence',     label: 'THE EVIDENCE',             icon: FileText   },
  { id: 'architecture', label: 'INFORMATION ARCHITECTURE', icon: FolderTree },
  { id: 'flows',        label: 'USER FLOWS',               icon: Route      },
  { id: 'journeys',     label: 'JOURNEY MAPS',             icon: MapPin     },
  { id: 'wireframes',   label: 'WIREFRAMES',               icon: Camera     },
  { id: 'system',       label: 'THE EVIDENCE BOARD',       icon: Palette    },
  { id: 'testing',      label: 'THE INTERROGATION',        icon: Eye        },
  { id: 'outcome',      label: 'THE VERDICT',              icon: Award      },
  { id: 'reflection',   label: 'THE AFTERMATH',            icon: BookOpen   },
];

// Simplified nav sections for The Extras
const EXTRAS_SECTIONS = [
  { id: 'crime',    label: 'THE BRIEF',   icon: Archive },
  { id: 'cases',    label: 'THE CASES',   icon: Sparkles },
  { id: 'outcome',  label: 'THE VERDICT', icon: Award   },
];

// Nav sections for NicheUX Narrative
const NARRATIVE_SECTIONS = [
  { id: 'crime',   label: 'THE BRIEF',    icon: Archive  },
  { id: 'posts',   label: 'THE CONTENT',  icon: Film     },
  { id: 'outcome', label: 'THE VERDICT',  icon: Award    },
];

interface CaseStudyPageProps {
  project: Project;
  onClose: () => void;
}

// ─────────────────────────────────────────────
// FULLSCREEN SINGLE-IMAGE MODAL
// ─────────────────────────────────────────────
const FullscreenModal = ({
  isOpen, onClose, imageSrc, title,
}: {
  isOpen: boolean; onClose: () => void; imageSrc: string; title: string;
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] overflow-y-auto"
        style={{ backgroundColor: 'rgba(0,0,0,0.96)' }}
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="fixed top-4 right-4 p-3 bg-white/15 hover:bg-white/30 rounded-full text-white transition-colors z-[110] border border-white/20 backdrop-blur-sm"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex justify-center px-4 py-16">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
            style={{ width: '100%', maxWidth: '900px' }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={imageSrc} alt={title}
              style={{ width: '100%', height: 'auto', imageRendering: 'crisp-edges' }}
              className="rounded-sm shadow-2xl border border-white/10 block"
            />
            <p className="text-white/60 text-xs mt-4 text-center font-mono uppercase tracking-widest font-semibold">{title}</p>
            <p className="text-white/30 text-[10px] mt-1 text-center font-mono">Click outside or press ESC to close</p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────
// UI SCREENS OVERLAY
// ─────────────────────────────────────────────
const UIScreensOverlay = ({
  isOpen, onClose, screens, projectTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  screens: { src: string; label: string }[];
  projectTitle: string;
}) => {
  const [idx, setIdx]                   = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (isOpen) { setIdx(0); setLightboxOpen(false); }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if      (e.key === 'ArrowRight' || e.key === 'ArrowDown')  { setIdx(i => (i + 1) % screens.length); }
      else if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    { setIdx(i => (i - 1 + screens.length) % screens.length); }
      else if (e.key === 'Escape') { onClose(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, lightboxOpen, screens.length, onClose]);

  if (!isOpen) return null;

  const prev = () => { setIdx(i => (i - 1 + screens.length) % screens.length); };
  const next = () => { setIdx(i => (i + 1) % screens.length); };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex flex-col"
        style={{ backgroundColor: 'rgba(0,0,0,0.97)' }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Camera className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent/80 font-semibold">
              {projectTitle} · UI Screens
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/40 tracking-wider">
              {String(idx + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}
            </span>
            <button onClick={onClose}
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/20"
              aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden min-h-0">
          <div className="hidden md:flex flex-col w-[152px] lg:w-[172px] flex-shrink-0 border-r border-white/10 overflow-y-auto py-3 gap-2 px-2">
            {screens.map((s, i) => (
              <button key={i}
                onClick={() => { setIdx(i); }}
                className={`relative group flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all ${
                  i === idx ? 'border-accent shadow-lg shadow-accent/20' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img src={s.src} alt={s.label} className="w-full h-auto" />
                <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] font-mono px-1.5 py-1 truncate">
                  {s.label}
                </p>
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-0">
              <button onClick={prev}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/80 border border-white/20 rounded-full text-white transition-all hover:scale-110"
                aria-label="Previous">
                <ChevronLeft className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.18 }}
                  className="p-4 sm:p-6 flex items-center justify-center w-full h-full cursor-zoom-in group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <div className="relative">
                    <img
                      src={screens[idx].src}
                      alt={screens[idx].label}
                      className="rounded-sm border border-white/10 shadow-2xl max-w-full max-h-[calc(100vh-210px)] w-auto h-auto object-contain"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-sm">
                      <ZoomIn className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button onClick={next}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/80 border border-white/20 rounded-full text-white transition-all hover:scale-110"
                aria-label="Next">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-shrink-0 border-t border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-serif text-base leading-snug">{screens[idx].label}</p>
                <p className="text-white/40 text-[10px] font-mono mt-0.5">Click image to open fullscreen · ← → navigate · ESC close</p>
              </div>
              <div className="flex md:hidden items-center gap-1.5 flex-shrink-0 flex-wrap justify-end max-w-[120px]">
                {screens.map((_, i) => (
                  <button key={i}
                    onClick={() => { setIdx(i); }}
                    className={`rounded-full transition-all flex-shrink-0 ${
                      i === idx ? 'w-4 h-2 bg-accent' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Screen ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <FullscreenModal
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageSrc={screens[idx]?.src ?? ''}
          title={screens[idx]?.label ?? ''}
        />
      </motion.div>
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────
// THE EXTRAS: MINI GALLERY
// ─────────────────────────────────────────────
const ExtrasMiniGallery = ({
  images,
  accentColor,
}: {
  images: { src: string; label: string; note: string }[];
  accentColor: string;
}) => {
  const [idx, setIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [lightboxOpen, images.length]);

  const current = images[idx];

  return (
    <>
      <div className="rounded-sm overflow-hidden border border-accent/20">
        {/* Main image */}
        <div
          className="relative bg-black/50 cursor-zoom-in group"
          style={{ minHeight: '240px' }}
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              src={current.src}
              alt={current.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-auto max-h-[480px] object-contain mx-auto block"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <ZoomIn className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 rounded-full text-white border border-white/20 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 rounded-full text-white border border-white/20 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 rounded-sm text-white text-[10px] font-mono">
            {String(idx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </div>

        {/* Caption */}
        <div className="p-4 bg-surface/80 border-t border-accent/20">
          <p className="text-sm font-serif text-foreground font-semibold">{current.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{current.note}</p>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-1.5 p-3 bg-surface/50 border-t border-accent/10 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="flex-shrink-0 w-16 h-11 rounded-sm overflow-hidden border-2 transition-all"
                style={{ borderColor: i === idx ? accentColor : 'rgba(255,255,255,0.1)', opacity: i === idx ? 1 : 0.5 }}
              >
                <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <FullscreenModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={current.src}
        title={current.label}
      />
    </>
  );
};

// ─────────────────────────────────────────────
// THE EXTRAS: AADHARSHAM PDF VIEWER
// Shows the PDF collage as an embedded slide viewer
// ─────────────────────────────────────────────
const AadharshamPDFViewer = ({ accentColor }: { accentColor: string }) => {
  const pdfSrc = '/TheExtras/AadharshamPhotography-Booklet%20Collage.pdf';

  return (
    <div className="rounded-sm overflow-hidden border border-accent/20">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between border-b border-accent/20"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4" style={{ color: accentColor }} />
          <span className="text-[10px] font-mono uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            Aadharsham Photography · Portfolio Booklet
          </span>
        </div>
        <a
          href={pdfSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-sm border transition-all"
          style={{ color: accentColor, borderColor: `${accentColor}50` }}
        >
          <ExternalLinkIcon className="w-3 h-3" />
          Open Full PDF
        </a>
      </div>

      {/* PDF Embed */}
      <div className="relative bg-black/40" style={{ height: '600px' }}>
        <iframe
          src={`${pdfSrc}#view=FitH&toolbar=0&navpanes=0`}
          title="Aadharsham Photography Portfolio Booklet"
          className="w-full h-full border-0"
          style={{ display: 'block' }}
        />
      </div>

      {/* Caption */}
      <div className="p-4 bg-surface/80 border-t border-accent/20">
        <p className="text-sm font-serif text-foreground font-semibold">Photography Portfolio Booklet</p>
        <p className="text-xs text-muted-foreground mt-1">
          Architecture · Interior · Travel · Portrait. Scroll or use arrow keys inside the viewer to move between spreads.
          Use "Open Full PDF" to view at full resolution.
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// THE EXTRAS: MINI CASE CARD
// ─────────────────────────────────────────────
const ExtrasMiniCase = ({
  number,
  title,
  subtitle,
  tagline,
  accentColor,
  icon,
  brief,
  approach,
  outcome,
  images,
  pdfMode = false,
  defaultOpen = false,
}: {
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  accentColor: string;
  icon: ReactNode;
  brief: string;
  approach: string;
  outcome: string;
  images: { src: string; label: string; note: string }[];
  pdfMode?: boolean;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="evidence-board overflow-hidden"
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left p-5 md:p-7 flex items-start gap-5 group"
      >
        <div
          className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center text-white"
          style={{ backgroundColor: accentColor }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="text-[9px] font-mono uppercase tracking-[0.3em] font-semibold"
              style={{ color: accentColor }}
            >
              MINI CASE · {number}
            </span>
            <span className="exhibit-tag">{subtitle}</span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl text-foreground leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 italic">"{tagline}"</p>
        </div>
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-1"
          style={{ color: accentColor }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Expandable body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-7 pb-7 space-y-6 border-t border-accent/20 pt-6">

              {/* Gallery or PDF */}
              {pdfMode ? (
                <AadharshamPDFViewer accentColor={accentColor} />
              ) : (
                <ExtrasMiniGallery images={images} accentColor={accentColor} />
              )}

              {/* Brief / Approach / Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="p-4 rounded-sm border-l-4"
                  style={{ borderColor: accentColor, backgroundColor: `${accentColor}15` }}
                >
                  <p
                    className="text-[8px] font-mono uppercase tracking-wider font-bold mb-2"
                    style={{ color: accentColor }}
                  >
                    THE BRIEF
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{brief}</p>
                </div>

                <div className="p-4 rounded-sm bg-surface/60 border border-white/10">
                  <p className="text-[8px] font-mono uppercase tracking-wider font-bold text-muted-foreground/80 mb-2">
                    THE APPROACH
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{approach}</p>
                </div>

                <div className="p-4 rounded-sm bg-emerald-600/10 border border-emerald-600/30">
                  <p className="text-[8px] font-mono uppercase tracking-wider font-bold text-emerald-600 mb-2">
                    THE OUTCOME
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{outcome}</p>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// THE EXTRAS: IMAGE DATA
// ─────────────────────────────────────────────
const KINGDOM_IMAGES: { src: string; label: string; note: string }[] = [
  {
    src: '/TheExtras/Without texture.png',
    label: 'Version A — Clean',
    note: 'Flat finish. Crisper for digital use and screen display.',
  },
  {
    src: '/TheExtras/With slight texture.png',
    label: 'Version B — Textured',
    note: 'Slight grain overlay. More physical, closer to a printed feel.',
  },
  {
    src: '/TheExtras/WhatsApp Image 2026-01-27 at 9.18.14 AM (1).jpeg',
    label: 'Client Sketch (Reference)',
    note: 'Hand-drawn in Samsung Notes. The arch shape came directly from this.',
  },
  {
    src: '/TheExtras/CandyShop.jpg',
    label: 'The Toy — Min Lille Butik',
    note: 'The red-and-white dispenser that started the whole brief.',
  },
  {
    src: '/TheExtras/WhatsApp Image 2026-01-26 at 7.21.42 PM.jpeg',
    label: 'Kingdom of Sweets — In-Store Reference',
    note: 'The in-store KoS branding the client wanted to honour.',
  },
  {
    src: '/TheExtras/WhatsApp Image 2026-02-01 at 1.42.08 AM.jpeg',
    label: 'KoS Brand System Reference',
    note: 'Purple, gold, lime green — three non-negotiables from the KoS brand.',
  },
];

const LINKEDIN_IMAGES: { src: string; label: string; note: string }[] = [
  {
    src: '/TheExtras/Green and White Minimalist Business Profile with Photo Profile LinkedIn Banner.png',
    label: 'Version A — Green & White Minimalist',
    note: "First iteration. Clean and minimal — client felt it didn't match his energy.",
  },
  {
    src: '/TheExtras/Try only if 5 doesnt work.png',
    label: 'Version B / C — Dark Tech (Selected)',
    note: 'Final selected version. Dark background with tech-network effect and real photo. Inline tagline with dot separators.',
  },
];

const AADHARSHAM_IMAGES: { src: string; label: string; note: string }[] = [
  {
    src: '/TheExtras/AadharshamPhotography-Booklet Collage.pdf',
    label: 'Portfolio Booklet — Aadharsham Photography',
    note: 'Architecture, interiors, travel, portrait. Full booklet PDF.',
  },
];

// ─────────────────────────────────────────────
// NICHEUX NARRATIVE — social media post embed
// ─────────────────────────────────────────────
const NarrativePost = ({
  number,
  code,
  title,
  subtitle,
  platform,
  date,
  accentColor,
  embedType,
  embedHtml,
  linkedinUrl,
  brief,
  approach,
  outcome,
  defaultOpen = false,
}: {
  number: string;
  code: string;
  title: string;
  subtitle: string;
  platform: string;
  date: string;
  accentColor: string;
  embedType: 'instagram' | 'linkedin';
  embedHtml?: string;
  linkedinUrl?: string;
  brief: string;
  approach: string;
  outcome: string;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (!open || embedType !== 'instagram') return;
    const existing = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (existing) {
      (window as any).instgrm?.Embeds?.process?.();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true;
    document.body.appendChild(s);
    s.onload = () => (window as any).instgrm?.Embeds?.process?.();
  }, [open, embedType]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-2 rounded-sm overflow-hidden"
      style={{ borderColor: `${accentColor}40` }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left transition-colors hover:bg-white/5"
        style={{ backgroundColor: `${accentColor}08` }}
      >
        <div
          className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center font-mono text-sm font-bold"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
        >
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] font-semibold" style={{ color: `${accentColor}90` }}>
              {code}
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-sm" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {platform}
            </span>
          </div>
          <p className="font-serif text-lg text-foreground leading-tight">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle} · {date}</p>
        </div>
        <div className="flex-shrink-0 ml-2 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>
          <ChevronRight className="w-4 h-4 text-muted-foreground rotate-90" />
        </div>
      </button>

      {/* Body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-8 pb-8 pt-4">
              {/* Embed */}
              <div className="mb-8">
                {embedType === 'instagram' && embedHtml && (
                  <div
                    className="flex justify-center"
                    dangerouslySetInnerHTML={{ __html: embedHtml }}
                  />
                )}
                {embedType === 'linkedin' && linkedinUrl && (
                  <div className="border-2 rounded-sm overflow-hidden" style={{ borderColor: `${accentColor}30` }}>
                    <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: `${accentColor}20`, backgroundColor: `${accentColor}08` }}>
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#0A66C2' }}>
                        <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold" style={{ color: `${accentColor}80` }}>LinkedIn Article</span>
                      <div className="flex-1" />
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono underline transition-opacity hover:opacity-80 flex items-center gap-1"
                        style={{ color: accentColor }}
                        onClick={e => e.stopPropagation()}
                      >
                        Read on LinkedIn <ExternalLinkIcon className="w-3 h-3 inline" />
                      </a>
                    </div>
                    <div className="p-6 md:p-8" style={{ backgroundColor: `${accentColor}04` }}>
                      <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-6 leading-snug">Every Story Deserves a Stage</h3>
                      <div className="space-y-3 text-foreground/80 text-sm leading-relaxed font-serif italic border-l-4 pl-5 mb-6" style={{ borderColor: `${accentColor}50` }}>
                        <p>There's a quiet moment most brands never notice.</p>
                        <p>It happens after the website is launched. After the logo reveal. After the campaign goes live.</p>
                        <p>The metrics look fine. The work looks polished. Everything seems… correct.</p>
                        <p>And yet, nothing moves. No one talks about it. No one remembers it. No one feels anything.</p>
                        <p>That silence is not a failure of effort. It's a failure of <strong className="not-italic">story.</strong></p>
                      </div>
                      <div className="space-y-3 text-foreground/75 text-sm leading-relaxed border-l-4 pl-5 mb-6" style={{ borderColor: `${accentColor}30` }}>
                        <p>The brain doesn't store visuals. It stores <strong>moments.</strong> A feeling. A pause. A recognition of self.</p>
                        <p>Story is what gives design gravity. Without story, design decorates. With story, design directs.</p>
                        <p>Most brands don't suffer from bad design. They suffer from <strong>un-staged stories.</strong></p>
                      </div>
                      <div className="space-y-2 text-foreground/70 text-sm leading-relaxed border-l-4 pl-5 mb-8" style={{ borderColor: `${accentColor}20` }}>
                        <p>A stage doesn't make a story louder. It makes it <strong>legible.</strong></p>
                        <p>When story and design meet: people don't just see the brand — they recognise it. They remember it.</p>
                        <p className="font-serif italic text-base">Every story deserves a stage.</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${accentColor}20` }}>
                        <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${accentColor}60` }}>— NicheUX · When design meets storytelling</p>
                        <a
                          href={linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-sm transition-all hover:opacity-80"
                          style={{ backgroundColor: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}40` }}
                          onClick={e => e.stopPropagation()}
                        >
                          Read full article <ExternalLinkIcon className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Three-column: Brief / Approach / Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2" style={{ borderColor: `${accentColor}20` }}>
                {[
                  { label: 'THE BRIEF', content: brief },
                  { label: 'THE APPROACH', content: approach },
                  { label: 'THE OUTCOME', content: outcome },
                ].map(({ label, content }) => (
                  <div key={label} className="p-4 rounded-sm" style={{ backgroundColor: `${accentColor}08`, border: `1px solid ${accentColor}20` }}>
                    <p className="text-[8px] font-mono uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: `${accentColor}80` }}>{label}</p>
                    <p className="text-foreground/80 text-sm leading-relaxed">{content}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// NICHEUX NARRATIVE CONTENT
// ─────────────────────────────────────────────
const TUBE_REEL_EMBED = `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DVO5ju3iHnj/?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"><a href="https://www.instagram.com/reel/DVO5ju3iHnj/?utm_source=ig_embed&utm_campaign=loading" style="background:#FFFFFF;line-height:0;padding:0;text-align:center;text-decoration:none;width:100%;" target="_blank"><div style="display:flex;flex-direction:row;align-items:center;"><div style="background-color:#F4F4F4;border-radius:50%;flex-grow:0;height:40px;margin-right:14px;width:40px;"></div><div style="display:flex;flex-direction:column;flex-grow:1;justify-content:center;"><div style="background-color:#F4F4F4;border-radius:4px;flex-grow:0;height:14px;margin-bottom:6px;width:100px;"></div><div style="background-color:#F4F4F4;border-radius:4px;flex-grow:0;height:14px;width:60px;"></div></div></div><div style="padding:19% 0;"></div><div style="display:block;height:50px;margin:0 auto 12px;width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></svg></div><div style="padding-top:8px;"><div style="color:#3897f0;font-family:Arial,sans-serif;font-size:14px;font-style:normal;font-weight:550;line-height:18px;">View this post on Instagram</div></div><div style="padding:12.5% 0;"></div><div style="display:flex;flex-direction:row;margin-bottom:14px;align-items:center;"><div><div style="background-color:#F4F4F4;border-radius:50%;height:12.5px;width:12.5px;transform:translateX(0px) translateY(7px);"></div><div style="background-color:#F4F4F4;height:12.5px;transform:rotate(-45deg) translateX(3px) translateY(1px);width:12.5px;flex-grow:0;margin-right:14px;margin-left:2px;"></div><div style="background-color:#F4F4F4;border-radius:50%;height:12.5px;width:12.5px;transform:translateX(9px) translateY(-18px);"></div></div><div style="margin-left:8px;"><div style="background-color:#F4F4F4;border-radius:50%;flex-grow:0;height:20px;width:20px;"></div><div style="width:0;height:0;border-top:2px solid transparent;border-left:6px solid #f4f4f4;border-bottom:2px solid transparent;transform:translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left:auto;"><div style="width:0px;border-top:8px solid #F4F4F4;border-right:8px solid transparent;transform:translateY(16px);"></div><div style="background-color:#F4F4F4;flex-grow:0;height:12px;width:16px;transform:translateY(-4px);"></div><div style="width:0;height:0;border-top:8px solid #F4F4F4;border-left:8px solid transparent;transform:translateY(-4px) translateX(8px);"></div></div></div><div style="display:flex;flex-direction:column;flex-grow:1;justify-content:center;margin-bottom:24px;"><div style="background-color:#F4F4F4;border-radius:4px;flex-grow:0;height:14px;margin-bottom:6px;width:224px;"></div><div style="background-color:#F4F4F4;border-radius:4px;flex-grow:0;height:14px;width:144px;"></div></div></a><p style="color:#c9c8cd;font-family:Arial,sans-serif;font-size:14px;line-height:17px;margin-bottom:0;margin-top:8px;overflow:hidden;padding:8px 0 7px;text-align:center;text-overflow:ellipsis;white-space:nowrap;"><a href="https://www.instagram.com/reel/DVO5ju3iHnj/?utm_source=ig_embed&utm_campaign=loading" style="color:#c9c8cd;font-family:Arial,sans-serif;font-size:14px;font-style:normal;font-weight:normal;line-height:17px;text-decoration:none;" target="_blank">A post shared by NicheUX - Design × Storytelling (@nicheux.studio)</a></p></div></blockquote>`;

const CAROUSEL_EMBED = `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DTTL4wDFMqc/?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"><a href="https://www.instagram.com/p/DTTL4wDFMqc/?utm_source=ig_embed&utm_campaign=loading" style="background:#FFFFFF;line-height:0;padding:0;text-align:center;text-decoration:none;width:100%;" target="_blank"><div style="display:flex;flex-direction:row;align-items:center;"><div style="background-color:#F4F4F4;border-radius:50%;flex-grow:0;height:40px;margin-right:14px;width:40px;"></div><div style="display:flex;flex-direction:column;flex-grow:1;justify-content:center;"><div style="background-color:#F4F4F4;border-radius:4px;flex-grow:0;height:14px;margin-bottom:6px;width:100px;"></div><div style="background-color:#F4F4F4;border-radius:4px;flex-grow:0;height:14px;width:60px;"></div></div></div><div style="padding:19% 0;"></div><div style="display:block;height:50px;margin:0 auto 12px;width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></svg></div><div style="padding-top:8px;"><div style="color:#3897f0;font-family:Arial,sans-serif;font-size:14px;font-style:normal;font-weight:550;line-height:18px;">View this post on Instagram</div></div><div style="padding:12.5% 0;"></div><div style="display:flex;flex-direction:row;margin-bottom:14px;align-items:center;"><div><div style="background-color:#F4F4F4;border-radius:50%;height:12.5px;width:12.5px;transform:translateX(0px) translateY(7px);"></div><div style="background-color:#F4F4F4;height:12.5px;transform:rotate(-45deg) translateX(3px) translateY(1px);width:12.5px;flex-grow:0;margin-right:14px;margin-left:2px;"></div><div style="background-color:#F4F4F4;border-radius:50%;height:12.5px;width:12.5px;transform:translateX(9px) translateY(-18px);"></div></div><div style="margin-left:8px;"><div style="background-color:#F4F4F4;border-radius:50%;flex-grow:0;height:20px;width:20px;"></div><div style="width:0;height:0;border-top:2px solid transparent;border-left:6px solid #f4f4f4;border-bottom:2px solid transparent;transform:translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left:auto;"><div style="width:0px;border-top:8px solid #F4F4F4;border-right:8px solid transparent;transform:translateY(16px);"></div><div style="background-color:#F4F4F4;flex-grow:0;height:12px;width:16px;transform:translateY(-4px);"></div><div style="width:0;height:0;border-top:8px solid #F4F4F4;border-left:8px solid transparent;transform:translateY(-4px) translateX(8px);"></div></div></div><div style="display:flex;flex-direction:column;flex-grow:1;justify-content:center;margin-bottom:24px;"><div style="background-color:#F4F4F4;border-radius:4px;flex-grow:0;height:14px;margin-bottom:6px;width:224px;"></div><div style="background-color:#F4F4F4;border-radius:4px;flex-grow:0;height:14px;width:144px;"></div></div></a><p style="color:#c9c8cd;font-family:Arial,sans-serif;font-size:14px;line-height:17px;margin-bottom:0;margin-top:8px;overflow:hidden;padding:8px 0 7px;text-align:center;text-overflow:ellipsis;white-space:nowrap;"><a href="https://www.instagram.com/p/DTTL4wDFMqc/?utm_source=ig_embed&utm_campaign=loading" style="color:#c9c8cd;font-family:Arial,sans-serif;font-size:14px;font-style:normal;font-weight:normal;line-height:17px;text-decoration:none;" target="_blank">A post shared by NicheUX - Design × Storytelling (@nicheux.studio)</a></p></div></blockquote>`;

const NicheUXContent = ({
  project,
  sectionRefs,
  setSectionRef,
  onClose,
}: {
  project: Project;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  setSectionRef: (id: string) => (el: HTMLElement | null) => void;
  onClose: () => void;
}) => (
  <>
    <section id="crime" ref={setSectionRef('crime')} className="case-section scroll-mt-56" role="tabpanel">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="case-file mb-12">
          <div className="p-5 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold">{project.caseNumber}</span>
                  <span className="exhibit-tag">3 POSTS · W1</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 leading-tight">{project.title}</h1>
                <p className="text-muted-foreground text-base italic">"{project.episodeTitle}"</p>
              </div>
              <div className="hidden sm:block text-right flex-shrink-0">
                <div className="px-4 py-3 bg-accent/10 border-2 border-accent/30 rounded-sm">
                  <p className="text-[8px] font-mono uppercase tracking-wider text-accent/80 font-semibold mb-1">ROLE</p>
                  <p className="text-foreground font-serif text-lg">{project.role}</p>
                  <p className="text-[9px] font-mono text-muted-foreground mt-2">{project.duration}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 pt-5 border-t-2 border-accent/30">
              <div><p className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-1">YEAR</p><p className="text-foreground font-serif text-xl">{project.year}</p></div>
              <div><p className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-1">STUDIO</p><p className="text-foreground/90 text-sm">{project.team}</p></div>
              <div className="col-span-2"><p className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-1">VERDICT</p><p className="text-foreground/90 text-sm italic">{project.outcomeSummary}</p></div>
            </div>
          </div>
        </div>
        <div className="readable-width mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Archive className="w-4 h-4 text-accent/80 flex-shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/80 font-semibold">SCENE DESCRIPTION</span>
            <div className="flex-1 h-px bg-accent/30" />
          </div>
          <p className="text-foreground/90 text-base md:text-lg leading-relaxed font-serif italic">{project.context}</p>
        </div>
        <div className="relative bg-accent/10 border-l-8 border-accent p-6 md:p-8">
          <div className="absolute -left-3 -top-3"><div className="evidence-pin"><div className="evidence-pin-dot" /></div></div>
          <div className="flex items-start gap-4">
            <Mic className="w-6 h-6 text-accent/90 flex-shrink-0 mt-1" />
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold mb-2 block">THE CENTRAL QUESTION</span>
              <p className="text-foreground text-lg md:text-xl lg:text-2xl font-serif leading-relaxed">{project.problem}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

    <div className="crime-scene-tape" role="separator" aria-hidden="true">
      <span className="tape-strip-top">■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■</span>
      <span className="tape-strip-bottom">■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■</span>
    </div>

    <section id="posts" ref={setSectionRef('posts')} className="case-section scroll-mt-56" role="tabpanel">
      <div className="flex items-center gap-4 mb-8">
        <Film className="w-4 h-4 text-accent/80 flex-shrink-0" />
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold">THE CONTENT</span>
        <div className="flex-1 h-px bg-accent/40" />
      </div>
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-3">Week One. Three Formats.</h2>
      <p className="text-muted-foreground text-sm mb-10 font-serif italic">Each piece tests a different content format — Reel, Carousel, and long-form Article — all anchored to the same brand thesis.</p>

      <div className="space-y-6">
        <NarrativePost
          number="01"
          code="Tube · Reel 1"
          title="The London Underground Is Accidentally Teaching You Design"
          subtitle="Instagram Reel · 75 seconds · Behaviour Design"
          platform="Instagram · Reels"
          date="Feb 26, 2026"
          accentColor="#C084FC"
          embedType="instagram"
          embedHtml={TUBE_REEL_EMBED}
          brief="A short-form video shot at an actual London Underground station. The hook: three safety posters, three behaviour design lessons. Designed to feel like a free masterclass — not an ad."
          approach="Shot as a walking POV through the station. Each lesson gets its own segment with a named framework (Universal Language, Embodied Cognition, Meta Design), text overlays matching dialogue, and a 75-second runtime engineered for full watch-time. Ends with brand positioning and a cliffhanger for Part 2."
          outcome="First piece of video content for NicheUX. Established the 'behaviour design education' voice and format. Cliffhanger structure primes the audience to return for Part 2."
          defaultOpen={true}
        />
        <NarrativePost
          number="02"
          code="C1 · W1"
          title="It Started With a Cup of Coffee"
          subtitle="Instagram Carousel · 8 Slides · Story vs Information"
          platform="Instagram · LinkedIn · Threads"
          date="Jan 9, 2026"
          accentColor="#E9C672"
          embedType="instagram"
          embedHtml={CAROUSEL_EMBED}
          brief="A cinematic 8-slide carousel that demonstrates — rather than explains — the difference between information and story. Same product (a coffee cup). Two framings. Very different emotional result."
          approach="Slide 1 opens cinematically on a near-empty frame. Slides 2–3 show the 'data only' version and get a dry, dismissive response. Slides 4–5 reframe with story. Slides 6–7 state the principle and connect it to brand strategy. Slide 8 closes with the NicheUX brand mark. Typography system: Playfair Display (editorial) + Source Sans Pro (strategic). Gold accent (#E9C672) as the only accent colour."
          outcome="The carousel format proved high-save, high-share for this topic. The 'same product, different framing' structure became a recurring NicheUX content device."
        />
        <NarrativePost
          number="03"
          code="A1 · W1"
          title="Every Story Deserves a Stage"
          subtitle="LinkedIn Article · Long-form · Brand Manifesto"
          platform="LinkedIn"
          date="Jan 6, 2026"
          accentColor="#60A5FA"
          embedType="linkedin"
          linkedinUrl="https://www.linkedin.com/feed/update/urn:li:activity:7414226543297904640"
          brief="The studio's first published long-form piece. A brand manifesto disguised as an editorial. The central argument: most brands don't fail because of bad design — they fail because their story has no stage."
          approach="Written in short, rhythmic paragraphs — deliberate white space and sentence fragmentation to match the editorial pace of the carousel. No subheadings. Structured as a slow build: problem → psychology → reframe → resolution. Ends with the NicheUX tagline as a full-stop statement."
          outcome="Established the editorial voice for the studio. Shared as the first anchor piece before any visual content went live — positioning the writing as the foundation the design sits on."
        />
      </div>
    </section>

    <div className="crime-scene-tape" role="separator" aria-hidden="true">
      <span className="tape-strip-top">■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■</span>
      <span className="tape-strip-bottom">■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■</span>
    </div>

    <section id="outcome" ref={setSectionRef('outcome')} className="case-section scroll-mt-56" role="tabpanel">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="flex items-center gap-4 mb-8">
          <Award className="w-4 h-4 text-accent/80 flex-shrink-0" />
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold">THE VERDICT</span>
          <div className="flex-1 h-px bg-accent/40" />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-10">Week One. Thesis Established.</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Formats Shipped', value: '3', sub: 'Reel · Carousel · Article' },
            { label: 'Platforms', value: '3', sub: 'Instagram · LinkedIn · Threads' },
            { label: 'Brand Voice', value: 'Set', sub: 'Editorial · Behaviour Design' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="case-file p-6 text-center">
              <p className="font-serif text-5xl text-accent mb-2">{value}</p>
              <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-1">{label}</p>
              <p className="text-muted-foreground text-xs font-serif italic">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-4 h-4 text-accent/80 flex-shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/80 font-semibold">WHAT WORKED</span>
              <div className="flex-1 h-px bg-accent/20" />
            </div>
            <div className="space-y-3">
              {[
                'The Reel cliffhanger structure created a built-in reason to follow — Part 2 was promised before the brand had a following.',
                "The carousel's 'same product, two framings' device demonstrated the thesis rather than stating it.",
                'Publishing the Article before the visuals positioned the writing as the foundation — not a caption.',
                'Consistent gold accent (#E9C672) across all three formats started building visual language from day one.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-accent/5 border border-accent/20 rounded-sm">
                  <span className="text-accent text-xs font-mono mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-foreground/80 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-4 h-4 text-accent/80 flex-shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/80 font-semibold">LEARNINGS</span>
              <div className="flex-1 h-px bg-accent/20" />
            </div>
            <div className="space-y-3">
              {[
                'Three formats in week one was ambitious — the workload revealed the need for a tighter production schedule going forward.',
                'The LinkedIn article performed better as a standalone manifesto than as a teaser for the carousel — long-form audiences engage differently.',
                'Location content (the Tube reel) generates more first-impression credibility than studio content for a brand with no existing audience.',
                'The gold accent needs a proper type system document — it was being applied inconsistently across the three pieces.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-surface border border-foreground/10 rounded-sm">
                  <span className="text-muted-foreground text-xs font-mono mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-foreground/70 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-accent/10 border-l-8 border-accent p-6 md:p-8">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold mb-3">THE TAKEAWAY</p>
          <p className="text-foreground text-lg md:text-xl font-serif leading-relaxed italic">"{project.outcomeSummary}"</p>
        </div>

        <p className="text-[7px] font-mono text-muted-foreground/50 mt-12 tracking-[0.4em] uppercase">END OF EPISODE</p>
      </motion.div>
    </section>
  </>
);

const ExtrasContent = ({
  project,
  onClose,
  sectionRefs,
  setSectionRef,
}: {
  project: Project;
  onClose: () => void;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  setSectionRef: (id: string) => (el: HTMLElement | null) => void;
}) => (
  <>
    <section id="crime" ref={setSectionRef('crime')} className="case-section scroll-mt-56" role="tabpanel">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="case-file mb-12">
          <div className="p-5 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold">{project.caseNumber}</span>
                  <span className="exhibit-tag">3 MINI CASES</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 leading-tight">{project.title}</h1>
                <p className="text-muted-foreground text-base italic">"{project.episodeTitle}"</p>
              </div>
              <div className="hidden sm:block text-right flex-shrink-0">
                <div className="px-4 py-3 bg-accent/10 border-2 border-accent/30 rounded-sm">
                  <p className="text-[8px] font-mono uppercase tracking-wider text-accent/80 font-semibold mb-1">LEAD INVESTIGATOR</p>
                  <p className="text-foreground font-serif text-lg">{project.role}</p>
                  <p className="text-[9px] font-mono text-muted-foreground mt-2">{project.duration}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 pt-5 border-t-2 border-accent/30">
              <div><p className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-1">YEAR</p><p className="text-foreground font-serif text-xl">{project.year}</p></div>
              <div><p className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-1">TASK FORCE</p><p className="text-foreground/90 text-sm">{project.team}</p></div>
              <div className="col-span-2"><p className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-1">VERDICT</p><p className="text-foreground/90 text-sm italic">{project.outcomeSummary}</p></div>
            </div>
          </div>
        </div>

        <div className="readable-width mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Archive className="w-4 h-4 text-accent/80 flex-shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/80 font-semibold">SCENE DESCRIPTION</span>
            <div className="flex-1 h-px bg-accent/30" />
          </div>
          <p className="text-foreground/90 text-base md:text-lg leading-relaxed font-serif italic">{project.context}</p>
        </div>

        <div className="relative bg-accent/10 border-l-8 border-accent p-6 md:p-8">
          <div className="absolute -left-3 -top-3"><div className="evidence-pin"><div className="evidence-pin-dot" /></div></div>
          <div className="flex items-start gap-4">
            <Search className="w-6 h-6 text-accent/90 flex-shrink-0 mt-1" />
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold mb-2 block">THE CENTRAL MYSTERY</span>
              <p className="text-foreground text-lg md:text-xl lg:text-2xl font-serif leading-relaxed">{project.problem}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

    <div className="crime-scene-tape" role="separator" aria-hidden="true">
      <span className="tape-strip-top">■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■</span>
      <span className="tape-strip-bottom">■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■</span>
    </div>

    <section id="cases" ref={setSectionRef('cases')} className="case-section scroll-mt-56" role="tabpanel">
      <div className="flex items-center gap-4 mb-8">
        <Sparkles className="w-4 h-4 text-accent/80 flex-shrink-0" />
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold">THE CASES</span>
        <div className="flex-1 h-px bg-accent/40" />
      </div>
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-10">Three Mini-Cases</h2>

      <div className="space-y-6">
        <ExtrasMiniCase
          number="01"
          title="Kingdom of Sweets Arch Banner"
          subtitle="Physical Signage · Brand Design"
          tagline="The personal pick-n-mix that needed a royal crown"
          accentColor="#7B2FBE"
          icon={<Palette className="w-5 h-5" />}
          defaultOpen={true}
          brief="A client who worked at Kingdom of Sweets for years owns a 'Min Lille Butik' — a red-and-white toy candy dispenser — for guests at home. He wanted a custom arch banner for the top of it, styled in the KoS brand (purple, gold, lime green) as a tribute to his time there. He sketched the arch shape himself in Samsung Notes."
          approach="Took the hand-drawn arch sketch as the literal starting brief — the client's proportions were already right. Matched the KoS brand system: deep purple fill, gold serif wordmark, lime green outer border, yellow inner rule. Delivered two variants: one flat/clean for screen, one with a subtle paper texture for a printed feel."
          outcome="Two arch banner variants delivered and approved. The client selected the textured version for the dispenser. The brief was as much about honouring a chapter of someone's life as it was about design."
          images={KINGDOM_IMAGES}
        />
        <ExtrasMiniCase
          number="02"
          title="Sooraj Nikam LinkedIn Banner"
          subtitle="Personal Branding · LinkedIn Header"
          tagline="Conceptualize. Develop. Deliver. In 1584 × 396 pixels."
          accentColor="#00B4D8"
          icon={<Users className="w-5 h-5" />}
          defaultOpen={false}
          brief="Sooraj Nikam — the same client who commissioned the Kingdom of Sweets banner — needed a LinkedIn header communicating his identity as a product thinker. His tagline: Conceptualize · Develop · Deliver. The challenge was making a dark, tech-forward design feel personal rather than corporate."
          approach="Three iterations. Version A was green-and-white minimalist — clean, but didn't match Sooraj's energy. Versions B and C used a dark background with a tech-network particle effect and a real photo of Sooraj presenting. Version B stacked the tagline vertically; Version C ran it inline with dot separators — cleaner at small sizes and on mobile."
          outcome="Version C selected for live use. The real photo split (dark left, photo right) added credibility without needing a separate headshot session. The inline tagline worked as a rhythm as much as a message."
          images={LINKEDIN_IMAGES}
        />
        <ExtrasMiniCase
          number="03"
          title="Aadharsham Photography Portfolio"
          subtitle="Photography Direction · Digital Portfolio"
          tagline="A PDF booklet, re-imagined as something you can actually share"
          accentColor="#C8A84B"
          icon={<Camera className="w-5 h-5" />}
          defaultOpen={false}
          pdfMode={true}
          brief="An architectural photographer based in India — Aadharsham Photography — needed a way to share his portfolio with prospective clients without emailing large files. He had a beautifully designed PDF booklet covering Architecture, Interior, Travel, and Portrait photography. The ask: make it interactive and shareable."
          approach="The booklet already had strong visual structure — each category laid out as a collage spread, clean typographic labels, no clutter. The task was to preserve that hierarchy and translate it into a gallery clickable on any device. Restructured as a sequential slideshow: cover first, then each category in order, each with a caption explaining the spread."
          outcome="Interactive portfolio gallery replacing the static PDF. Aadharsham can now share a link instead of an attachment. The gallery format also lets clients screenshot or share individual spreads — something the PDF couldn't do."
          images={AADHARSHAM_IMAGES}
        />
      </div>
    </section>

    <RedThread orientation="vertical" className="h-16 mx-auto" />

    <section id="outcome" ref={setSectionRef('outcome')} className="case-section scroll-mt-56" role="tabpanel">
      <div className="flex items-center gap-4 mb-8">
        <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-600 font-semibold">THE VERDICT</span>
        <div className="flex-1 h-px bg-emerald-600/40" />
      </div>
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8">Results and Learnings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {project.outcome.metrics.map((metric, i) => (
          <div key={i} className="case-file p-5 md:p-6 border-emerald-600/40 bg-emerald-600/10">
            <TrendingUp className="w-4 h-4 text-emerald-600 mb-2" />
            <p className="text-foreground/90 text-sm font-medium leading-relaxed">{metric}</p>
          </div>
        ))}
      </div>

      <div className="case-file border-2 border-emerald-600/60 bg-emerald-600/10 mb-12">
        <div className="p-5 md:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="verdict-stamp border-emerald-600 text-emerald-600 bg-emerald-600/20">CASE CLOSED</span>
          </div>
          <p className="text-foreground/90 text-base md:text-lg leading-relaxed font-serif italic">{project.outcome.impact}</p>
        </div>
      </div>

      <div className="space-y-4">
        {project.outcome.learnings.map((learning, i) => (
          <div key={i} className="flex items-start gap-4 md:gap-5 p-5 md:p-6 bg-surface/50 border-2 border-accent/40 rounded-sm">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-mono text-accent font-bold">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-foreground/90 text-base leading-relaxed pt-1">{learning}</p>
          </div>
        ))}
      </div>
    </section>
  </>
);

// ─────────────────────────────────────────────
// INFORMATION ARCHITECTURE
// ─────────────────────────────────────────────
const InformationArchitectureDiagram = ({ project }: { project: Project }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isFurnore = project.id === 'furnore';
  const isOpes = project.id === 'opes';
  const isKishore = project.id === 'kishore-portfolio';

  const getImgSrc = () => {
    if (isFurnore) return '/Furnore/InformationArchitecture.png';
    if (isOpes) return '/OPES/InformationArchitecture.png';
    if (isKishore) return "/Kishore%27sPortfolioWebsite/InformationArchitecture.png";
    // FIXED: Use the exact filename without URL encoding
    return '/Bloom-Brew/InformationArchitectureB&B.png';
  };

  const imgSrc = getImgSrc();

  const getCallouts = () => {
    if (isFurnore) return [
      {
        title: 'Structure Decisions',
        color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-400 dark:border-orange-600 text-orange-900 dark:text-orange-300',
        items: [
          'Services elevated to primary nav as a key differentiator',
          'Max 2 clicks from home to any product',
          'Gallery as trust-building hub (installed spaces)',
          'Utility pages (Cart, Wishlist, Auth) via top-right icons',
        ],
      },
      {
        title: 'Page Count',
        color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-400 dark:border-orange-600 text-orange-900 dark:text-orange-300',
        items: [
          'Furniture: 5 subcategories + Product Detail',
          'Art and Decor: 3 subcategories (Photography, Contemporary, Classic)',
          'Accents: 2 subcategories (Ottoman, Armchair)',
          'Services: 3 pages (Bespoke, Assembly, Layout)',
          'Transactional: Cart, Wishlist, Checkout, Place Order, Track',
          'Auth: Sign In, Sign Up',
        ],
      },
      {
        title: 'Identified Gaps',
        color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-400 dark:border-orange-600 text-orange-900 dark:text-orange-300',
        items: [
          'No order confirmation screen after checkout',
          'Gallery photos do not link to products',
          'No empty cart / wishlist states designed',
          'No 404 / error pages',
          'No mobile responsive variants',
        ],
      },
    ];

    if (isOpes) return [
      {
        title: 'Structure Decisions',
        color: 'bg-red-50 dark:bg-red-950/30 border-red-400 dark:border-red-600 text-red-900 dark:text-red-300',
        items: [
          'Single-page with no routing and no dead ends',
          'CTA appears 3 times (hero, Founding User, footer)',
          '"Why OPES?" before "How It Works" because differentiation earns the right to explain the product',
          'No navigation bar for single-focus with no escape routes',
          'Contact last, minimal, for access not selling',
        ],
      },
      {
        title: 'Section Hierarchy',
        color: 'bg-red-50 dark:bg-red-950/30 border-red-400 dark:border-red-600 text-red-900 dark:text-red-300',
        items: [
          '1. Hero: sign-up form and value proposition',
          '2. Why OPES? Differentiation from savings apps',
          '3. How It Works: 5-step flow',
          '4. Founding User Benefits: the conversion peak',
          '5. Contact: email and social links',
        ],
      },
      {
        title: 'Design Constraints',
        color: 'bg-red-50 dark:bg-red-950/30 border-red-400 dark:border-red-600 text-red-900 dark:text-red-300',
        items: [
          'Burgundy palette (#41000B) as a client-fixed brand colour',
          'OPES wordmark in Times New Roman, non-negotiable per brief',
          'Mobile-first because target audience browses on phone',
          'Form: first name + email + optional age range only',
          'No backend at this stage, form submits to spreadsheet',
        ],
      },
    ];

    if (isKishore) return [
      {
        title: 'Structure Decisions',
        color: 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-300',
        items: [
          'Floating nav wheel, non-standard but brand-defining',
          'Playing Career as default tab, the rarest credential',
          'Timeline separated from Careers because it deserves its own section',
          'Impact Dashboard: numbers only, no biography',
          '"Future" timeline entry signals ongoing ambition',
        ],
      },
      {
        title: 'Six-Section Architecture',
        color: 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-300',
        items: [
          '1. Home: K29 identity and dual career labels',
          '2. Careers: 3-tab selector (Playing, Coaching, Designing)',
          '3. Timeline: factual chronology 2020 to 2026+',
          '4. Impact: Dashboard, Coaching, and Design Output panels',
          '5. Seals: 4 clickable verification badges with modal',
          '6. Contact: Email card, IG card, and Access Protocol',
        ],
      },
      {
        title: 'Colour-Coded Identity',
        color: 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-300',
        items: [
          'Red #EF233C for squash and Playing Career',
          'Blue #00B4D8 for design and Designing Career',
          'Black and white as the base system',
          'Dark theme only, an F1-style aesthetic',
          'No light mode by brand decision, not oversight',
        ],
      },
    ];

    return [
      {
        title: 'Design Decisions',
        color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-400 dark:border-orange-600 text-orange-900 dark:text-orange-300',
        items: [
          'Max 2 clicks to any product',
          'Story before selling: About appears before Shop in the nav',
          'Event calendar on homepage (high visibility)',
          'Mobile first navigation',
        ],
      },
      {
        title: 'User Flows',
        color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-400 dark:border-orange-600 text-orange-900 dark:text-orange-300',
        items: [
          'Market discovery via event calendar',
          'Dietary needs addressed through the About trust-building section',
          'Custom quotes handled through the contact form',
          'Browse to Filter to Product to Cart',
        ],
      },
      {
        title: 'Technical Notes',
        color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-400 dark:border-orange-600 text-orange-900 dark:text-orange-300',
        items: [
          'Shopify Liquid custom theme',
          'Google Sheets API (forms / reviews)',
          'Seasonal animation system',
          'Instagram integration',
        ],
      },
    ];
  };

  const callouts = getCallouts();

  return (
    <>
      <div className="evidence-board p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-3 mb-6 border-b border-accent/30 pb-4">
          <div className="evidence-pin"><div className="evidence-pin-dot" /></div>
          <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">INFORMATION ARCHITECTURE: SITE STRUCTURE</span>
          <EvidenceTag label="EXHIBIT A" variant="exhibit" />
        </div>
        <div
          className="relative bg-white p-3 md:p-6 rounded-sm overflow-hidden cursor-zoom-in group"
          onClick={() => setModalOpen(true)}
        >
          <motion.img src={imgSrc} alt="Information Architecture" className="w-full h-auto" whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }} />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <ZoomIn className="w-12 h-12 text-accent" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {callouts.map(({ title, color, items }) => (
            <div key={title} className={`p-4 border-2 rounded-sm ${color}`}>
              <p className="font-bold text-sm mb-2">{title}</p>
              <ul className="text-xs space-y-1 text-gray-800 dark:text-gray-300">
                {items.map(item => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <FullscreenModal isOpen={modalOpen} onClose={() => setModalOpen(false)} imageSrc={imgSrc} title="Information Architecture" />
    </>
  );
};

// ─────────────────────────────────────────────
// USER FLOW DIAGRAMS
// ─────────────────────────────────────────────
const UserFlowDiagrams = ({ project }: { project: Project }) => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const isFurnore = project.id === 'furnore';
  const isOpes = project.id === 'opes';
  const isKishore = project.id === 'kishore-portfolio';

  const furnoreFlows = [
    { label: 'FLOW 01: Browse and Purchase', desc: 'Landing page to Category to Product Detail to Cart to Payment to Order placed', color: 'text-accent border-accent/40 bg-accent/5', accent: 'text-accent', src: '/Furnore/UserFlow1.png' },
    { label: 'FLOW 02: Bespoke Services', desc: '7-step custom upholstery process including two offline courier handoffs', color: 'text-amber-600 border-amber-600/40 bg-amber-600/5', accent: 'text-amber-600', src: '/Furnore/UserFlow2.png' },
    { label: 'FLOW 03: Wishlist and Cart', desc: 'Save to wishlist, return visit, add to cart, checkout', color: 'text-emerald-600 border-emerald-600/40 bg-emerald-600/5', accent: 'text-emerald-600', src: '/Furnore/UserFlow3.png' },
    { label: 'FLOW 04: Auth and Order Tracking', desc: 'Sign up or sign in, browse, purchase, track order status', color: 'text-rose-600 border-rose-600/40 bg-rose-600/5', accent: 'text-rose-600', src: '/Furnore/UserFlow4.png' },
  ];

  const opesFlows = [
    { label: 'PRIMARY FLOW: Discovery to Sign-Up', desc: 'Social/referral link to Hero to Value exploration to Founding User CTA to Email submitted', color: 'text-accent border-accent/40 bg-accent/5', accent: 'text-accent', src: '/OPES/UserFlow-RV.png' },
    { label: 'EDGE CASE: Skeptical Visitor Path', desc: 'Bypasses hero, reads How It Works, builds trust via process transparency, returns to sign-up form', color: 'text-amber-600 border-amber-600/40 bg-amber-600/5', accent: 'text-amber-600', src: '/OPES/UserFlow-SV.png' },
    { label: 'ERROR FLOW: Form Validation', desc: 'Invalid email triggers inline error in plain language, user corrects, success confirmation shown', color: 'text-rose-600 border-rose-600/40 bg-rose-600/5', accent: 'text-rose-600', src: '/OPES/UserFlow-VD.png' },
  ];

  const kishoreFlows = [
    { label: 'FLOW 1: Referral and Direct Visit to Contact', desc: 'Enter via link, K29 hero, Careers (Playing default), Timeline, Impact, Seals, Contact', color: 'text-accent border-accent/40 bg-accent/5', accent: 'text-accent', src: "/Kishore%27sPortfolioWebsite/UserFlow.png" },
  ];

  const bbFlows = [
    { label: 'PRIMARY FLOW: Market Discovery to Purchase', color: 'text-accent', src: '/Bloom-Brew/PRIMARY%20FLOW_%20Market%20Discovery%20%E2%86%92%20Online%20Purchase.png' },
    { label: 'EDGE CASE: Dietary Restriction Search to Purchase', color: 'text-amber-600', src: '/Bloom-Brew/EDGE%20CASE_%20Dietary%20Restriction%20Search%20%E2%86%92%20Purchase.png' },
    { label: 'CUSTOM QUOTE: Event Planner Journey', color: 'text-emerald-600', src: '/Bloom-Brew/CUSTOM%20QUOTE%20REQUEST_%20Event%20Planner%20Journey.png' },
    { label: 'ERROR FLOW: Out of Stock Item', color: 'text-rose-600', src: '/Bloom-Brew/ERROR%20FLOW_%20Out%20of%20Stock%20Item.png' },
  ];

  const getFlows = () => {
    if (isFurnore) return furnoreFlows;
    if (isOpes) return opesFlows;
    if (isKishore) return kishoreFlows;
    return bbFlows;
  };

  const flows = getFlows();

  return (
    <>
      <div className="space-y-8">
        {flows.map(flow => (
          <div key={flow.label} className="evidence-board p-4 md:p-6">
            <div className={`flex flex-wrap items-center gap-3 mb-4 border-b pb-4 border-accent/30`}>
              <Route className={`w-4 h-4 flex-shrink-0 ${'accent' in flow ? flow.accent : flow.color}`} />
              <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${'accent' in flow ? flow.accent : flow.color}`}>{flow.label}</span>
            </div>
            {'desc' in flow && <p className="text-xs text-muted-foreground mb-4">{flow.desc as string}</p>}
            <div
              className="relative bg-white p-3 md:p-4 rounded-sm overflow-hidden cursor-zoom-in group"
              onClick={() => { setModalImage(flow.src); setModalTitle(flow.label); }}
            >
              <motion.img src={flow.src} alt={flow.label} className="w-full h-auto" whileHover={{ scale: 1.01 }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="w-12 h-12 text-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <FullscreenModal isOpen={!!modalImage} onClose={() => setModalImage(null)} imageSrc={modalImage ?? ''} title={modalTitle} />
    </>
  );
};

// ─────────────────────────────────────────────
// JOURNEY MAPS
// ─────────────────────────────────────────────
const JourneyMaps = ({ project }: { project: Project }) => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const isFurnore = project.id === 'furnore';
  const isOpes = project.id === 'opes';
  const isKishore = project.id === 'kishore-portfolio';

  if (isFurnore) {
    const src = '/Furnore/UserJourneyMapping.png';
    return (
      <>
        <div className="space-y-6">
          <div className="evidence-board p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-3 mb-4 border-b border-accent/30 pb-4">
              <MapPin className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold">USER JOURNEY MAP: COMPOSITE PERSONA (PRIYA · RAJAN · MEERA)</span>
              <EvidenceTag label="EXHIBIT C" variant="exhibit" />
            </div>
            <div className="relative bg-white p-3 md:p-4 rounded-sm overflow-hidden cursor-zoom-in group" onClick={() => { setModalImage(src); setModalTitle('User Journey Map: Composite Persona'); }}>
              <img src={src} alt="User Journey Map" className="w-full h-auto" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"><ZoomIn className="w-12 h-12 text-accent" /></div>
            </div>
          </div>
          <div className="p-4 md:p-6 bg-surface border-2 border-accent/30 rounded-sm">
            <p className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-4">CROSS-JOURNEY SYNTHESIS</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-rose-600 mb-3">Recurring Pain Points</p>
                <ul className="text-xs space-y-1.5 text-foreground/80">{['No order confirmation screen after checkout','Two parallel order flows create confusion','Gallery photos do not link back to products','Bespoke fabric courier step is entirely off-platform','Homepage category icons had no text labels','No ETA shown in order tracker'].map(p => <li key={p}>→ {p}</li>)}</ul>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 mb-3">High-Impact Opportunities</p>
                <ul className="text-xs space-y-1.5 text-foreground/80">{['Add success screen with order code + clear next steps','Consolidate into one consistent checkout flow','Link gallery photos to product detail pages','In-app fabric upload step for bespoke orders','Text labels added below all homepage category icons','Add estimated delivery date to each tracker step'].map(o => <li key={o}>→ {o}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
        <FullscreenModal isOpen={!!modalImage} onClose={() => setModalImage(null)} imageSrc={modalImage ?? ''} title={modalTitle} />
      </>
    );
  }

  if (isOpes) {
    const src = '/OPES/UserJourneyMapping.png';
    return (
      <>
        <div className="space-y-6">
          <div className="evidence-board p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-3 mb-4 border-b border-accent/30 pb-4">
              <MapPin className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span className="text-xs font-mono uppercase tracking-wider text-red-600 font-semibold">USER JOURNEY MAP: PRIYA (WAITER SAVING FOR A FLAT) AND 2 PERSONAS</span>
              <EvidenceTag label="EXHIBIT C" variant="exhibit" />
            </div>
            <div className="relative bg-white p-3 md:p-4 rounded-sm overflow-hidden cursor-zoom-in group" onClick={() => { setModalImage(src); setModalTitle('User Journey Map: OPES'); }}>
              <img src={src} alt="User Journey Map" className="w-full h-auto" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"><ZoomIn className="w-12 h-12 text-accent" /></div>
            </div>
          </div>
          <div className="p-4 md:p-6 bg-surface border-2 border-red-600/30 rounded-sm">
            <p className="text-xs font-mono uppercase tracking-wider text-red-600 font-semibold mb-4">JOURNEY SYNTHESIS: TRUST GAPS AND CONVERSION MOMENTS</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-rose-600 mb-3">Trust Barriers Identified</p>
                <ul className="text-xs space-y-1.5 text-foreground/80">{['"Financial advisor" language triggers expensive associations','No product screenshots, no proof the app works yet','"Connect Your Bank" step raises data anxiety','Founding User framing unclear, sounds like beta testing','No reply time or next-steps shown after form submission'].map(p => <li key={p}>→ {p}</li>)}</ul>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 mb-3">Design Responses</p>
                <ul className="text-xs space-y-1.5 text-foreground/80">{['Reframed to "financial companion", warm and not corporate','5-step "How It Works" builds trust through process transparency','"Securely" qualifier + lock icon added to bank sync step','Named 3 specific Founding User benefits (features, discounts, co-creation)','\"You\'re in. We\'ll be in touch.\" success state added to form'].map(o => <li key={o}>→ {o}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
        <FullscreenModal isOpen={!!modalImage} onClose={() => setModalImage(null)} imageSrc={modalImage ?? ''} title={modalTitle} />
      </>
    );
  }

  if (isKishore) {
    const src = "/Kishore%27sPortfolioWebsite/UserJourneyMapping.png";
    return (
      <>
        <div className="space-y-6">
          <div className="evidence-board p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-3 mb-4 border-b border-accent/30 pb-4">
              <MapPin className="w-4 h-4 flex-shrink-0 text-amber-600" />
              <span className="text-xs font-mono uppercase tracking-wider text-amber-600 font-semibold">USER JOURNEY MAP: ALEX (SPORTS ACADEMY DIRECTOR / CREATIVE CLIENT)</span>
              <EvidenceTag label="EXHIBIT C" variant="exhibit" />
            </div>
            <div className="relative bg-white p-3 md:p-4 rounded-sm overflow-hidden cursor-zoom-in group" onClick={() => { setModalImage(src); setModalTitle('User Journey Map: Kishore Portfolio'); }}>
              <img src={src} alt="User Journey Map" className="w-full h-auto" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"><ZoomIn className="w-12 h-12 text-accent" /></div>
            </div>
          </div>
          <div className="p-4 md:p-6 bg-surface border-2 border-amber-600/30 rounded-sm">
            <p className="text-xs font-mono uppercase tracking-wider text-amber-600 font-semibold mb-4">CROSS-STAGE SYNTHESIS: PAIN POINTS AND OPPORTUNITIES</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-rose-600 mb-3">Identified Pain Points</p>
                <ul className="text-xs space-y-1.5 text-foreground/80">{['No OG preview meta tags, shared links show blank','Nav wheel is unconventional, first-time users may be confused','Three tabs with no guidance on which is most relevant','Seal click behaviour is not obvious, looks decorative','No downloadable CV or portfolio PDF','Email opens external mail client, causing friction on mobile'].map(p => <li key={p}>→ {p}</li>)}</ul>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 mb-3">Identified Opportunities</p>
                <ul className="text-xs space-y-1.5 text-foreground/80">{['Add rich OG preview meta tags with K29 branding','"Drag to navigate" tooltip on first load, disappears after first use','"What are you looking for?" prompt above career tabs','Hover state hint on seals: "Click to learn more"','Add downloadable portfolio PDF button in V2','Embed contact form as fallback, show expected reply time'].map(o => <li key={o}>→ {o}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
        <FullscreenModal isOpen={!!modalImage} onClose={() => setModalImage(null)} imageSrc={modalImage ?? ''} title={modalTitle} />
      </>
    );
  }

  const src = '/Bloom-Brew/User%20Journey%20Mapping.png';
  return (
    <>
      <div className="evidence-board p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-3 mb-6 border-b border-accent/30 pb-4">
          <div className="evidence-pin"><div className="evidence-pin-dot" /></div>
          <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">USER JOURNEY MAP</span>
          <EvidenceTag label="EXHIBIT C" variant="exhibit" />
        </div>
        <div className="bg-white p-3 md:p-4 rounded-sm overflow-hidden cursor-zoom-in relative group" onClick={() => { setModalImage(src); setModalTitle('User Journey Mapping'); }}>
          <img src={src} alt="User Journey Map" className="w-full h-auto" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"><ZoomIn className="w-12 h-12 text-accent" /></div>
        </div>
      </div>
      <FullscreenModal isOpen={!!modalImage} onClose={() => setModalImage(null)} imageSrc={modalImage ?? ''} title={modalTitle} />
    </>
  );
};

// ─────────────────────────────────────────────
// WIREFRAME GALLERY
// ─────────────────────────────────────────────
const WireframeGallery = ({ project }: { project: Project }) => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const isFurnore = project.id === 'furnore';
  const isOpes = project.id === 'opes';
  const isKishore = project.id === 'kishore-portfolio';

  const furnoreWireframes = [
    { id: 'w01', title: '01 Landing Page', desc: 'Hero, About band, New Arrivals, Shop by Category, Best Sellers, Services band, Testimonials', src: '/Furnore/01_Landing_Page.png' },
    { id: 'w02', title: '02 Product Detail', desc: 'Armchair with colour swatches, accordion specs, Add to Cart, and Wishlist toggle', src: '/Furnore/02_Product_Detail.png' },
    { id: 'w03', title: '03 Category: Accents', desc: 'Card grid used across all category listing pages', src: '/Furnore/03_Category_Accents.png' },
    { id: 'w04', title: '04 Assembly Services', desc: '3-step process with procedure notes. Availability gated by delivery pincode', src: '/Furnore/04_Assembly_Services.png' },
    { id: 'w05', title: '05 Bespoke Services', desc: '7-step custom upholstery where customers courier their own fabric to the workshop', src: '/Furnore/05_Bespoke_Services.png' },
    { id: 'w06', title: '06 Place Order (Empty)', desc: 'Callback-request form: name, address, phone, email, additional wishes, consent checkbox', src: '/Furnore/06_Place_Order_Empty.png' },
    { id: 'w07', title: '07 Place Order (Filled)', desc: 'Filled form state with consent checkbox enabled before Submit', src: '/Furnore/07_Place_Order_Filled.png' },
    { id: 'w08', title: '08 Art and Decor Category', desc: 'Contemporary Art subcategory listing using the same card pattern site-wide', src: '/Furnore/08_Art_Decor.png' },
    { id: 'w09', title: '09 Gallery Grid', desc: '4-column photo grid of installed spaces. Click any photo to expand', src: '/Furnore/09_Gallery_Grid.png' },
    { id: 'w10', title: '10 Gallery Expanded', desc: 'Lightbox overlay for single photo. No prev/next nav, flagged as a production gap', src: '/Furnore/10_Gallery_Expanded.png' },
    { id: 'w11', title: '11 Layout Services', desc: 'Feature list + circular image. Fee: 10,000 + GST. Booked by phone only', src: '/Furnore/11_Layout_Services.png' },
    { id: 'w12', title: '12 My Cart', desc: 'Line items with qty +/-, discount, shipping, Amount Payable total, Checkout CTA', src: '/Furnore/12_My_Cart.png' },
    { id: 'w13', title: '13 My Wishlist', desc: 'Saved items with individual qty controls and Add to Cart buttons', src: '/Furnore/13_My_Wishlist.png' },
    { id: 'w14', title: '14 New Arrivals', desc: 'Full catalogue of newest products with Sort By dropdown', src: '/Furnore/14_New_Arrivals.png' },
    { id: 'w15', title: '15 Checkout: Payment', desc: 'Payment method selector: Credit/Debit, UPI, Net Banking, Cash on Delivery', src: '/Furnore/15_Checkout_Payment.png' },
    { id: 'w16', title: '16 Checkout: Card Modal', desc: 'Slide-up modal overlay for card number, expiry, CVV input', src: '/Furnore/16_Checkout_Credit_Modal.png' },
    { id: 'w17', title: '17 Sideboards Category', desc: 'Furniture / Sideboards subcategory listing using the same card grid as all other categories', src: '/Furnore/17_Sideboards_Category.png' },
    { id: 'w18', title: '18 Sign In', desc: 'Split-screen: interior photo left, form right. Google + Apple SSO options', src: '/Furnore/18_Sign_In.png' },
    { id: 'w19', title: '19 Sign Up', desc: 'Name, email, password, confirm. Same split-screen layout as Sign In', src: '/Furnore/19_Sign_Up.png' },
    { id: 'w20', title: '20 Track Your Order', desc: '4-dot status tracker (Placed to Packed to Shipped to Delivered) + all orders summary table', src: '/Furnore/20_Track_Order.png' },
  ];

  const opesWireframes = [
    { id: 'o01', title: 'V1 Final Wireframe', desc: 'Full single-page wireframe, the first approved layout iteration showing all sections', src: '/OPES/wf_v1_final.png' },
    { id: 'o02', title: 'V3 Wireframe', desc: 'Hero and Why OPES section structure, an early layout exploration', src: '/OPES/wf_v3_firstdraft.png' },
    { id: 'o03', title: 'V4 Wireframe', desc: 'Refined layout with Founding User section structure developed', src: '/OPES/wf_v4_secondversion.png' },
  ];

  const kishoreWireframes = [
    { id: 'k01', title: 'Full Page Wireframe', desc: 'Complete single-page lo-fi wireframe covering all six sections from the K29 hero to the Contact and Access Protocol section.', src: "/Kishore%27sPortfolioWebsite/wireframe_kishore.png" },
  ];

  const bbWireframes = [
    { id: 'b01', title: '01 Homepage (Mobile)', desc: 'Hero with seasonal hearts, event calendar, featured products', src: '/Bloom-Brew/Homepage.png' },
    { id: 'b02', title: '02 Shop Page (Mobile)', desc: 'Product grid with filters, sorting, sold-out states', src: '/Bloom-Brew/Shop%20Page.png' },
    { id: 'b03', title: '03 Product Detail (Mobile)', desc: 'Product info, quantity selector, dietary labels, coming-soon state', src: '/Bloom-Brew/Product%20Page.png' },
    { id: 'b04', title: '04 About Page (Mobile)', desc: 'Founder story, chef credentials, mission statement', src: '/Bloom-Brew/About%20Page.png' },
    { id: 'b05', title: '05 Contact Page (Mobile)', desc: 'Form with subject dropdown, store hours, Google Sheets integration', src: '/Bloom-Brew/Contact%20Page.png' },
    { id: 'b06', title: '06 Shopping Cart (Mobile)', desc: 'Cart items, order summary, shipping threshold progress, empty state', src: '/Bloom-Brew/Cart%20Page.png' },
  ];

  const getWireframes = () => {
    if (isFurnore) return furnoreWireframes;
    if (isOpes) return opesWireframes;
    if (isKishore) return kishoreWireframes;
    return bbWireframes;
  };

  const wireframes = getWireframes();

  const getBannerProps = () => {
    if (isFurnore) return { icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />, className: 'bg-amber-50 dark:bg-amber-950/30 border-amber-600', titleClass: 'text-amber-900 dark:text-amber-300', title: 'Lo-Fi Wireframes: Desktop (1280px)', desc: '20 grayscale screens. Crosshatch = image placeholder. Text bars = copy blocks. Stakeholder approved before engagement concluded.' };
    if (isOpes) return { icon: <Smartphone className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />, className: 'bg-red-50 dark:bg-red-950/30 border-red-600', titleClass: 'text-red-900 dark:text-red-300', title: 'Wireframe Iterations: Layout Structure', desc: 'These show the structural wireframes used to define section order, hierarchy, and CTA placement. Use the "View UI Design" button at the top to see the styled visual versions.' };
    return { icon: <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />, className: 'bg-blue-50 dark:bg-blue-950/30 border-blue-600', titleClass: 'text-blue-900 dark:text-blue-300', title: 'Mobile First Design', desc: '82% of customers browse at markets on mobile. All wireframes designed for thumb-friendly navigation with 48px minimum touch targets.' };
  };

  const banner = getBannerProps();

  const getExhibitLabel = () => {
    if (isFurnore) return '20 SCREENS: LO-FI WIREFRAMES';
    if (isOpes) return '3 WIREFRAME ITERATIONS: LAYOUT STRUCTURE';
    if (isKishore) return '1 LO-FI WIREFRAME: STRUCTURAL LAYOUT';
    return 'MOBILE WIREFRAMES';
  };

  const getGridClass = () => {
    if (isFurnore) return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
    if (isOpes) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    if (isKishore) return 'grid-cols-1 sm:grid-cols-2';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <>
      <div className="space-y-6">
        <div className={`p-4 border-l-4 flex items-start gap-3 ${banner.className}`}>
          {banner.icon}
          <div>
            <p className={`font-bold text-sm mb-1 ${banner.titleClass}`}>{banner.title}</p>
            <p className="text-xs text-gray-800 dark:text-gray-300">{banner.desc}</p>
          </div>
        </div>
        <div className="evidence-board p-4 md:p-6">
          <div className="flex flex-wrap items-center gap-3 mb-6 border-b border-accent/30 pb-4">
            <div className="evidence-pin"><div className="evidence-pin-dot" /></div>
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">{getExhibitLabel()}</span>
            <EvidenceTag label={isFurnore ? 'EXHIBIT D' : 'EXHIBIT B'} variant="exhibit" />
          </div>
          <div className={`grid gap-6 md:gap-8 ${getGridClass()}`}>
            {wireframes.map(w => (
              <motion.div key={w.id} className="evidence-photo group cursor-pointer" onClick={() => { setModalImage(w.src); setModalTitle(w.title); }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }}>
                <div className="evidence-pin"><div className="evidence-pin-dot" /></div>
                <div className="bg-white p-2 rounded-sm border-2 border-black mb-3 overflow-hidden relative">
                  <img src={w.src} alt={w.title} className="w-full h-auto border border-gray-200" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"><ZoomIn className="w-8 h-8 text-accent drop-shadow-lg" /></div>
                </div>
                <h4 className="font-serif text-sm text-foreground font-semibold leading-snug">{w.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <FullscreenModal isOpen={!!modalImage} onClose={() => setModalImage(null)} imageSrc={modalImage ?? ''} title={modalTitle} />
    </>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const CaseStudyPage = ({ project, onClose }: CaseStudyPageProps) => {
  const [activeSection, setActiveSection]               = useState('crime');
  const [isScreensOverlayOpen, setIsScreensOverlayOpen] = useState(false);
  const [isHiFiOpen, setIsHiFiOpen]                     = useState(false);
  const [isKeyboardUser, setIsKeyboardUser]             = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const isFurnore = project.id === 'furnore';
  const isOpes    = project.id === 'opes';
  const isKishore = project.id === 'kishore-portfolio';
  const isExtras   = project.id === 'the-extras';
  const isNicheUX  = project.id === 'nicheux-narrative';

  const furnoreScreens = [
    { src: '/Furnore/Landing Page1.png',      label: 'Landing Page' },
    { src: '/Furnore/Armchair.png',           label: 'Product Detail: Armchair' },
    { src: '/Furnore/Contemporary Art.png',   label: 'Category: Contemporary Art' },
    { src: '/Furnore/Assembly Services.png',  label: 'Assembly Services' },
    { src: '/Furnore/Bespoke Services.png',   label: 'Bespoke Services: 7-step' },
    { src: '/Furnore/Place Order.png',        label: 'Place Order' },
    { src: '/Furnore/Place order credit.png', label: 'Place Order: Credit Card' },
    { src: '/Furnore/Gallery.png',            label: 'Gallery Grid' },
    { src: '/Furnore/Gallery-1.png',          label: 'Gallery Expanded' },
    { src: '/Furnore/Layout Services.png',    label: 'Layout Services' },
    { src: '/Furnore/My cart 2.png',          label: 'My Cart' },
    { src: '/Furnore/My wishlist.png',        label: 'My Wishlist' },
    { src: '/Furnore/Add to Cart.png',        label: 'Add to Cart' },
    { src: '/Furnore/New Arrivals.png',       label: 'New Arrivals' },
    { src: '/Furnore/Checkout.png',           label: 'Checkout: Payment' },
    { src: '/Furnore/Checkout-1.png',         label: 'Checkout: Card Modal' },
    { src: '/Furnore/Sideboards.png',         label: 'Category: Sideboards' },
    { src: '/Furnore/Sign in.png',            label: 'Sign In' },
    { src: '/Furnore/Sign up.png',            label: 'Sign Up' },
    { src: '/Furnore/Track Your Order.png',   label: 'Track Your Order' },
  ];

  const opesScreens = [
    { src: '/OPES/FirstDraft.png',    label: 'First Draft: Initial section order and CTA placement' },
    { src: '/OPES/SecondVersion.png', label: 'Second Version: Improved hierarchy and form positioning' },
    { src: '/OPES/FinalVersion.png',  label: 'Final Version: All sections, all CTAs, full mobile-first layout' },
  ];

  // Which nav sections to show
  const activeSections = isExtras ? EXTRAS_SECTIONS : isNicheUX ? NARRATIVE_SECTIONS : SECTIONS;

  useEffect(() => {
    const kd = () => setIsKeyboardUser(true);
    const md = () => setIsKeyboardUser(false);
    window.addEventListener('keydown', kd);
    window.addEventListener('mousedown', md);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('mousedown', md); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.5) {
          setActiveSection(e.target.id);
          history.replaceState(null, '', `#${e.target.id}`);
        }
      }),
      { threshold: 0.5, rootMargin: '-80px 0px -60% 0px' }
    );
    activeSections.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });
    const hash = window.location.hash.slice(1);
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => { sectionRefs.current[hash]?.scrollIntoView({ block: 'start' }); setActiveSection(hash); }, 100);
    }
    return () => observer.disconnect();
  }, [activeSections]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', `#${id}`);
  }, []);

  const setSectionRef = useCallback(
    (id: string) => (el: HTMLElement | null) => { sectionRefs.current[id] = el; },
    []
  );

  return (
    <>
      <div className="min-h-screen bg-background case-study-page">
        <div className="film-grain" aria-hidden="true" />
        <div className="vignette"   aria-hidden="true" />

        {/* FIXED: EvidenceHeader directly placed - no wrapper div interfering with sticky */}
        <EvidenceHeader
          project={project}
          activeSection={activeSection}
          sections={activeSections}
          onSectionClick={scrollToSection}
          onClose={onClose}
        />

        {isKeyboardUser && (
          <a href="#crime"
            className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-1/2 focus:-translate-x-1/2 focus:bg-accent focus:text-background focus:px-6 focus:py-3 focus:z-50 focus:rounded-sm focus:font-mono focus:text-sm focus:uppercase focus:tracking-wider"
            onClick={e => { e.preventDefault(); scrollToSection('crime'); }}>
            Skip to content
          </a>
        )}

        <main className="pt-56 pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">

            {/* ── TOP ACTION BUTTONS ────────────────────────────────────────── */}
            {!isExtras && !isNicheUX && (
              <div className="mb-12 flex flex-wrap justify-center gap-3">

                {/* Live website link (Bloom & Brew + Kishore) */}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-accent/20 border-2 border-accent rounded-sm text-accent hover:bg-accent/30 transition-all duration-300">
                    <Globe className="w-5 h-5 flex-shrink-0" />
                    <div className="text-left">
                      <span className="text-sm font-bold block">View Live Website</span>
                      <span className="text-[10px] font-mono text-accent/80">{project.liveUrl.replace(/^https?:\/\//, '')}</span>
                    </div>
                    <ExternalLinkIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </a>
                )}

                {/* Furnore: UI Screens overlay */}
                {isFurnore && (
                  <button onClick={() => setIsScreensOverlayOpen(true)}
                    className="group inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-accent/20 border-2 border-accent rounded-sm text-accent hover:bg-accent/30 transition-all duration-300">
                    <Camera className="w-5 h-5 flex-shrink-0" />
                    <div className="text-left">
                      <span className="text-sm font-bold block">View UI Screens</span>
                      <span className="text-[10px] font-mono text-accent/80">20 screens · hi-fi</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </button>
                )}

                {/* OPES: UI Design overlay */}
                {isOpes && (
                  <button onClick={() => setIsScreensOverlayOpen(true)}
                    className="group inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-accent/20 border-2 border-accent rounded-sm text-accent hover:bg-accent/30 transition-all duration-300">
                    <Camera className="w-5 h-5 flex-shrink-0" />
                    <div className="text-left">
                      <span className="text-sm font-bold block">View UI Design</span>
                      <span className="text-[10px] font-mono text-accent/80">3 versions · First Draft to Final</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </button>
                )}

                {/* Kishore: K29 Hi-Fi only (no UI screens button) */}
                {isKishore && (
                  <button onClick={() => setIsHiFiOpen(true)}
                    className="group inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-amber-600/15 border-2 border-amber-600/50 rounded-sm text-amber-600 hover:bg-amber-600/25 transition-all duration-300">
                    <Image className="w-5 h-5 flex-shrink-0" />
                    <div className="text-left">
                      <span className="text-sm font-bold block">View K29 Hi-Fi</span>
                      <span className="text-[10px] font-mono text-amber-600/70">Full design · dark theme</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </button>
                )}

              </div>
            )}

            {/* ═══════════════════════════════════════════
                THE EXTRAS — three mini cases
                ═══════════════════════════════════════════ */}
            {isExtras ? (
              <ExtrasContent
                project={project}
                onClose={onClose}
                sectionRefs={sectionRefs}
                setSectionRef={setSectionRef}
              />
            ) : isNicheUX ? (
              <NicheUXContent
                project={project}
                onClose={onClose}
                sectionRefs={sectionRefs}
                setSectionRef={setSectionRef}
              />
            ) : (
              <>
                {/* CRIME SCENE */}
                <section id="crime" ref={setSectionRef('crime')} className="case-section scroll-mt-56" role="tabpanel">
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <div className="case-file mb-12">
                      <div className="p-5 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold">{project.caseNumber || 'ARCONIA-2024-001'}</span>
                              {project.evidenceCount && <span className="exhibit-tag">{project.evidenceCount} EXHIBITS</span>}
                            </div>
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 leading-tight">{project.title}</h1>
                            <p className="text-muted-foreground text-base italic">"{project.episodeTitle || 'The Case of the Missing Users'}"</p>
                          </div>
                          <div className="hidden sm:block text-right flex-shrink-0">
                            <div className="px-4 py-3 bg-accent/10 border-2 border-accent/30 rounded-sm">
                              <p className="text-[8px] font-mono uppercase tracking-wider text-accent/80 font-semibold mb-1">LEAD INVESTIGATOR</p>
                              <p className="text-foreground font-serif text-lg">{project.role}</p>
                              <p className="text-[9px] font-mono text-muted-foreground mt-2">{project.duration}</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 pt-5 border-t-2 border-accent/30">
                          <div><p className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-1">YEAR</p><p className="text-foreground font-serif text-xl">{project.year}</p></div>
                          <div><p className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-1">TASK FORCE</p><p className="text-foreground/90 text-sm">{project.team || 'Independent Investigation'}</p></div>
                          <div className="col-span-2"><p className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-1">VERDICT</p><p className="text-foreground/90 text-sm italic">{project.outcomeSummary}</p></div>
                        </div>
                      </div>
                    </div>

                    <div className="readable-width mb-12">
                      <div className="flex items-center gap-3 mb-4">
                        <Archive className="w-4 h-4 text-accent/80 flex-shrink-0" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/80 font-semibold">SCENE DESCRIPTION</span>
                        <div className="flex-1 h-px bg-accent/30" />
                      </div>
                      <p className="text-foreground/90 text-base md:text-lg leading-relaxed font-serif italic">{project.context}</p>
                    </div>

                    <div className="relative bg-accent/10 border-l-8 border-accent p-6 md:p-8">
                      <div className="absolute -left-3 -top-3"><div className="evidence-pin"><div className="evidence-pin-dot" /></div></div>
                      <div className="flex items-start gap-4">
                        <Search className="w-6 h-6 text-accent/90 flex-shrink-0 mt-1" />
                        <div>
                          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold mb-2 block">THE CENTRAL MYSTERY</span>
                          <p className="text-foreground text-lg md:text-xl lg:text-2xl font-serif leading-relaxed">{project.problem}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                <div className="crime-scene-tape" role="separator" aria-hidden="true">
                  <span className="tape-strip-top">■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■</span>
                  <span className="tape-strip-bottom">■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■ CRIME SCENE ■ DO NOT CROSS ■</span>
                </div>

                {/* THE VICTIM */}
                <section id="context" ref={setSectionRef('context')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><Users className="w-4 h-4 text-accent/80 flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold">THE VICTIM</span><div className="flex-1 h-px bg-accent/30" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">Business Context</h2>
                  <div className="case-file mb-12">
                    <div className="p-4 md:p-6">
                      <div className="flex items-center gap-2 mb-6"><Film className="w-4 h-4 text-accent/80 flex-shrink-0" /><span className="text-xs font-mono uppercase tracking-wider text-accent/80 font-semibold">CORPORATE AUTOPSY</span></div>
                      <div className="overflow-x-auto -mx-4 md:mx-0">
                        <div className="min-w-[600px] px-4 md:px-0">
                          <table className="archive-table">
                            <thead><tr><th>Business Goals</th><th>KPIs</th><th>Success Metrics</th><th>Technical Constraints</th></tr></thead>
                            <tbody>
                              {Array.from({ length: Math.max(project.businessContext.goals.length, project.businessContext.kpis.length, project.businessContext.successMetrics.length, project.businessContext.technicalConstraints.length) }).map((_, i) => (
                                <tr key={i}>
                                  <td className="text-sm text-foreground/90">{project.businessContext.goals[i] || '—'}</td>
                                  <td className="text-sm text-foreground/90">{project.businessContext.kpis[i] || '—'}</td>
                                  <td className="text-sm text-foreground/90">{project.businessContext.successMetrics[i] || '—'}</td>
                                  <td className="text-sm text-foreground/90">{project.businessContext.technicalConstraints[i] || '—'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6"><MapPin className="w-4 h-4 text-accent/80 flex-shrink-0" /><h3 className="font-serif text-xl md:text-2xl text-foreground">Persons of Interest</h3><EvidenceTag label={`${project.personas.length} WITNESSES`} variant="interview" /></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {project.personas.map((persona, i) => (
                        <div key={i} className="evidence-photo">
                          <div className="evidence-pin"><div className="evidence-pin-dot" /></div>
                          <div className="mt-2">
                            <h4 className="font-serif text-lg text-foreground mb-3 border-b-2 border-accent/30 pb-2">{persona.name}</h4>
                            <div className="space-y-3">
                              <div><span className="text-[7px] font-mono uppercase tracking-wider text-accent/80 font-semibold">M.O.</span><p className="text-sm text-foreground/90 mt-1">{persona.behaviours}</p></div>
                              <div><span className="text-[7px] font-mono uppercase tracking-wider text-rose-600/80 font-semibold">PAIN POINTS</span><p className="text-sm text-foreground/90 mt-1 italic">{persona.painPoints}</p></div>
                              <div><span className="text-[7px] font-mono uppercase tracking-wider text-emerald-600/80 font-semibold">NEEDS</span><p className="text-sm text-foreground/90 mt-1">{persona.needs}</p></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-6"><Scissors className="w-4 h-4 text-accent/80 flex-shrink-0" /><h3 className="font-serif text-xl md:text-2xl text-foreground">Timeline of Events</h3><EvidenceTag label="RECONSTRUCTION" variant="finding" /></div>
                    <div className="timeline">
                      <div className="space-y-6">
                        {project.journeyMap.map((step, i) => (
                          <div key={i} className="flex items-start gap-4 md:gap-6 relative">
                            <div className="timeline-marker flex-shrink-0">{String(i + 1).padStart(2, '0')}</div>
                            <div className="flex-1 min-w-0 bg-surface/50 border-2 border-border/30 p-4 md:p-6 rounded-sm mb-2">
                              <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h4 className="font-serif text-lg text-foreground">{step.stage}</h4>
                                <span className="px-2 py-0.5 bg-accent/15 text-accent/90 text-[8px] font-mono uppercase tracking-wider rounded-sm font-semibold whitespace-nowrap">{step.emotion}</span>
                              </div>
                              <p className="text-foreground/90 text-sm mb-4">{step.userAction}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                <div className="bg-rose-600/10 p-3 rounded-sm border-l-4 border-rose-600"><span className="text-[8px] font-mono uppercase tracking-wider text-rose-600 font-bold block mb-1">OBSTACLE</span><p className="text-foreground/90">{step.painPoint}</p></div>
                                <div className="bg-emerald-600/10 p-3 rounded-sm border-l-4 border-emerald-600"><span className="text-[8px] font-mono uppercase tracking-wider text-emerald-600 font-bold block mb-1">BREAKTHROUGH</span><p className="text-accent/90">{step.designOpportunity}</p></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <RedThread orientation="vertical" className="h-16 mx-auto" />

                {/* THE INVESTIGATION */}
                <section id="investigation" ref={setSectionRef('investigation')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><Search className="w-4 h-4 text-cyan-600 flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-600 font-semibold">THE INVESTIGATION</span><div className="flex-1 h-px bg-cyan-600/40" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">Research and Methods</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {project.research.participants && <div className="case-file p-5 md:p-6 border-cyan-600/40"><p className="text-[8px] font-mono uppercase tracking-wider text-cyan-600 font-bold mb-2">WITNESSES INTERVIEWED</p><p className="font-serif text-2xl md:text-4xl text-foreground">{project.research.participants}</p></div>}
                    {project.research.duration && <div className="case-file p-5 md:p-6 border-cyan-600/40"><p className="text-[8px] font-mono uppercase tracking-wider text-cyan-600 font-bold mb-2">INVESTIGATION PERIOD</p><p className="font-serif text-2xl md:text-4xl text-foreground">{project.research.duration}</p></div>}
                  </div>
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6"><span className="text-xs font-mono uppercase tracking-wider text-cyan-600 font-bold">TECHNIQUES</span><div className="flex-1 h-px bg-cyan-600/30" /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.research.methods.map((method, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-cyan-600/10 border-2 border-cyan-600/30 rounded-sm">
                          <span className="w-6 h-6 rounded-full bg-cyan-600/30 flex items-center justify-center text-[9px] font-mono text-cyan-600 font-bold flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-foreground/90 text-sm">{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="readable-width mb-12 p-5 md:p-6 bg-cyan-600/10 border-l-4 border-cyan-600">
                    <p className="text-foreground/90 text-base leading-relaxed italic">{project.research.approach}</p>
                  </div>
                  <KnownAssociatesBoard competitors={project.competitiveAnalysis} />
                </section>

                <RedThread orientation="vertical" className="h-16 mx-auto" />

                {/* THE EVIDENCE */}
                <section id="evidence" ref={setSectionRef('evidence')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><FileText className="w-4 h-4 text-amber-600 flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-600 font-semibold">THE EVIDENCE</span><div className="flex-1 h-px bg-amber-600/40" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">Insights and Findings</h2>
                  <div className="case-file mb-12 border-2 border-amber-600/60 bg-amber-600/10">
                    <div className="p-5 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4"><span className="exhibit-tag bg-amber-600/30 text-amber-600 border-amber-600/60">KEY EVIDENCE</span></div>
                      <p className="text-foreground font-serif text-xl md:text-2xl lg:text-3xl italic leading-relaxed border-l-4 border-amber-600 pl-5 md:pl-6">"{project.insights.key}"</p>
                    </div>
                  </div>
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6"><span className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold">EVIDENCE LOCKER</span><div className="flex-1 h-px bg-amber-600/30" /></div>
                    <div className="space-y-3">
                      {project.insights.findings.map((finding, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 md:p-5 bg-surface/80 border-2 border-amber-600/40 rounded-sm">
                          <span className="text-amber-600 font-bold text-xs font-mono mt-0.5 flex-shrink-0">#{String(i + 1).padStart(2, '0')}</span>
                          <p className="text-foreground/90 text-sm leading-relaxed min-w-0 break-words">{finding}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-emerald-600/10 border-2 border-emerald-600/40 p-5 md:p-6">
                      <h3 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2"><Heart className="w-4 h-4 text-emerald-600 flex-shrink-0" />What They Needed</h3>
                      <ul className="space-y-3">{project.usersAndNeeds.needs.map((need, i) => <li key={i} className="flex items-start gap-3 text-sm text-foreground/90"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />{need}</li>)}</ul>
                    </div>
                    <div className="bg-rose-600/10 border-2 border-rose-600/40 p-5 md:p-6">
                      <h3 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2"><Lock className="w-4 h-4 text-rose-600 flex-shrink-0" />Constraints</h3>
                      <ul className="space-y-3">{project.usersAndNeeds.constraints.map((c, i) => <li key={i} className="flex items-start gap-3 text-sm text-foreground/90"><span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 flex-shrink-0" />{c}</li>)}</ul>
                    </div>
                  </div>
                </section>

                <RedThread orientation="vertical" className="h-16 mx-auto" />

                {/* INFORMATION ARCHITECTURE */}
                <section id="architecture" ref={setSectionRef('architecture')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><FolderTree className="w-4 h-4 text-cyan-600 flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-600 font-semibold">INFORMATION ARCHITECTURE</span><div className="flex-1 h-px bg-cyan-600/40" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">Site Structure Diagram</h2>
                  <InformationArchitectureDiagram project={project} />
                </section>

                <RedThread orientation="vertical" className="h-16 mx-auto" />

                {/* USER FLOWS */}
                <section id="flows" ref={setSectionRef('flows')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><Route className="w-4 h-4 text-accent flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent font-semibold">THE THREAD</span><div className="flex-1 h-px bg-accent/40" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">User Flow Diagrams</h2>
                  <UserFlowDiagrams project={project} />
                  <div className="mt-12">
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">Interaction Design</h3>
                    <div className="readable-width mb-6 p-5 md:p-6 bg-cyan-600/10 border-l-4 border-cyan-600">
                      <p className="text-foreground/90 text-sm leading-relaxed italic">{project.interactionDesign.approach}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.interactionDesign.decisions.map((d, i) => (
                        <div key={i} className="p-4 bg-surface/50 border-2 border-cyan-600/30 rounded-sm">
                          <div className="flex items-start gap-3">
                            <span className="text-cyan-600 font-bold text-[10px] font-mono mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                            <p className="text-foreground/90 text-sm">{d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <RedThread orientation="vertical" className="h-16 mx-auto" />

                {/* JOURNEY MAPS */}
                <section id="journeys" ref={setSectionRef('journeys')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-600 font-semibold">THE JOURNEY</span><div className="flex-1 h-px bg-emerald-600/40" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">
                    {isFurnore ? 'User Journey Map: 3 Personas' : isKishore ? 'User Journey Map: Alex (Sports Academy Director)' : isOpes ? 'User Journey Map: Priya and 2 Personas' : 'User Journey Map'}
                  </h2>
                  <JourneyMaps project={project} />
                </section>

                <RedThread orientation="vertical" className="h-16 mx-auto" />

                {/* WIREFRAMES */}
                <section id="wireframes" ref={setSectionRef('wireframes')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><Camera className="w-4 h-4 text-amber-600 flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-600 font-semibold">THE SKETCHES</span><div className="flex-1 h-px bg-amber-600/40" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">
                    {isFurnore ? 'Lo-Fi Wireframes: 20 Screens' : isOpes ? 'Wireframe Iterations: Layout Structure' : isKishore ? 'Wireframes: Lo-Fi Structural Layout' : 'Wireframes'}
                  </h2>
                  <WireframeGallery project={project} />
                </section>

                <RedThread orientation="vertical" className="h-16 mx-auto" />

                {/* DESIGN SYSTEM */}
                <section id="system" ref={setSectionRef('system')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><Palette className="w-4 h-4 text-accent flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent font-semibold">THE EVIDENCE BOARD</span><div className="flex-1 h-px bg-accent/40" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">Design System</h2>
                  <div className="space-y-8">
                    <div>
                      <p className="section-label mb-2 text-accent">COLOR PALETTE: THE EVIDENCE</p>
                      {(isFurnore || isKishore || isOpes) && (
                        <p className="text-xs text-muted-foreground mb-4 italic border-l-2 border-accent/30 pl-3">
                          {isFurnore ? "Furnore's product design system defined for the live website. Not this portfolio's colour palette." : isKishore ? "K29 Portfolio design system: dark theme with dual-career colour coding. Not this portfolio's palette." : "OPES landing page design system: burgundy brand palette specified by the client."}
                        </p>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {project.designSystem.colors.map((c, i) => (
                          <div key={i} className="p-4 bg-surface border-2 border-border/40 rounded-sm">
                            <div className="w-full h-8 rounded-sm mb-3 border border-white/10" style={{ backgroundColor: c.value }} />
                            <p className="text-foreground text-sm font-bold">{c.name}</p>
                            <p className="text-muted-foreground text-xs mt-1 font-mono">{c.value}</p>
                            <p className="text-foreground/80 text-xs mt-1 italic">{c.usage}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="section-label mb-4 text-accent">TYPOGRAPHY: THE VOICE</p>
                      <div className="overflow-x-auto -mx-4 md:mx-0">
                        <div className="min-w-[400px] px-4 md:px-0">
                          <table className="archive-table">
                            <thead><tr><th>Level</th><th>Size</th><th>Weight</th><th>Line Height</th></tr></thead>
                            <tbody>{project.designSystem.typography.map((t, i) => <tr key={i}><td className="font-bold text-foreground">{t.level}</td><td className="text-foreground/90">{t.size}</td><td className="text-foreground/90">{t.weight}</td><td className="text-foreground/90">{t.lineHeight}</td></tr>)}</tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="section-label mb-3 text-accent">COMPONENTS: THE TOOLKIT</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.designSystem.components.map((comp, i) => <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-surface/50 border-2 border-border/40 rounded-sm"><span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" /><span className="text-foreground/90 text-sm">{comp}</span></div>)}
                      </div>
                    </div>
                    <div>
                      <p className="section-label mb-3 text-accent">ACCESSIBILITY: NO WITNESS LEFT BEHIND</p>
                      <div className="space-y-2">
                        {project.designSystem.accessibilityRules.map((rule, i) => <div key={i} className="flex items-start gap-3 p-3 bg-accent/10 border-2 border-accent/40 rounded-sm"><Shield className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><p className="text-foreground/90 text-sm">{rule}</p></div>)}
                      </div>
                    </div>
                  </div>
                </section>

                <RedThread orientation="vertical" className="h-16 mx-auto" />

                {/* THE INTERROGATION */}
                <section id="testing" ref={setSectionRef('testing')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><Eye className="w-4 h-4 text-cyan-600 flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-600 font-semibold">THE INTERROGATION</span><div className="flex-1 h-px bg-cyan-600/40" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">Validation</h2>
                  <div className="case-file border-cyan-600/40 mb-8">
                    <div className="p-4 md:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3"><Target className="w-4 h-4 text-cyan-600 flex-shrink-0" /><span className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 font-bold">INTERROGATION GOALS</span></div>
                          <ul className="space-y-2">{project.usabilityTesting.goals.map((g, i) => <li key={i} className="text-foreground/90 text-sm flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-2 flex-shrink-0" />{g}</li>)}</ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3"><Users className="w-4 h-4 text-cyan-600 flex-shrink-0" /><span className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 font-bold">WITNESS POOL</span></div>
                          <p className="text-foreground/90 text-sm mb-4">{project.usabilityTesting.participants}</p>
                          <div className="flex items-center gap-2 mb-3"><FileText className="w-4 h-4 text-cyan-600 flex-shrink-0" /><span className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 font-bold">TESTIMONY TASKS</span></div>
                          <ul className="space-y-2">{project.usabilityTesting.tasks.map((t, i) => <li key={i} className="text-foreground/90 text-sm flex items-start gap-2"><span className="text-cyan-600 font-bold text-xs font-mono flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>{t}</li>)}</ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 flex items-center gap-3"><Mic className="w-5 h-5 text-cyan-600 flex-shrink-0" />Witness Testimony</h3>
                    <div className="space-y-2">{project.usabilityTesting.findings.map((f, i) => <div key={i} className="p-4 bg-cyan-600/10 border-2 border-cyan-600/40 rounded-sm"><div className="flex items-start gap-3"><span className="text-cyan-600 font-bold text-xs font-mono mt-0.5 flex-shrink-0">#{String(i + 1).padStart(2, '0')}</span><p className="text-foreground/90 text-sm">{f}</p></div></div>)}</div>
                  </div>
                  <div className="mb-8">
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">Case Revisions</h3>
                    <div className="space-y-2">{project.usabilityTesting.iterations.map((iter, i) => <div key={i} className="flex items-start gap-3 p-3 bg-amber-600/10 border-2 border-amber-600/40 rounded-sm"><span className="text-amber-600 font-bold text-xs font-mono mt-0.5 flex-shrink-0">→</span><p className="text-foreground/90 text-sm">{iter}</p></div>)}</div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 flex items-center gap-3"><Scissors className="w-5 h-5 text-rose-600 flex-shrink-0" />Loose Ends</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {[{ label: 'EMPTY STATES', items: project.edgeCases.emptyStates }, { label: 'LOADING STATES', items: project.edgeCases.loadingStates }, { label: 'ERROR MESSAGES', items: project.edgeCases.errorMessages }, { label: 'FAILURE PATHS', items: project.edgeCases.failurePaths }].map(({ label, items }) => (
                        <div key={label} className="bg-surface/50 p-4 md:p-5 border-2 border-rose-600/30 rounded-sm">
                          <p className="section-label mb-3 text-rose-600">{label}</p>
                          <ul className="space-y-2">{items.map((e, i) => <li key={i} className="text-foreground/90 text-sm">{e}</li>)}</ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <RedThread orientation="vertical" className="h-16 mx-auto" />

                {/* THE VERDICT */}
                <section id="outcome" ref={setSectionRef('outcome')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><Award className="w-4 h-4 text-emerald-600 flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-600 font-semibold">THE VERDICT</span><div className="flex-1 h-px bg-emerald-600/40" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">Results and Impact</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {project.outcome.metrics.map((metric, i) => <div key={i} className="case-file p-5 md:p-6 border-emerald-600/40 bg-emerald-600/10"><TrendingUp className="w-4 h-4 text-emerald-600 mb-2" /><p className="text-foreground/90 text-sm font-medium leading-relaxed">{metric}</p></div>)}
                  </div>
                  <div className="case-file border-2 border-emerald-600/60 bg-emerald-600/10">
                    <div className="p-5 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4"><span className="verdict-stamp border-emerald-600 text-emerald-600 bg-emerald-600/20">CASE CLOSED</span></div>
                      <p className="text-foreground/90 text-base md:text-lg leading-relaxed font-serif italic">{project.outcome.impact}</p>
                    </div>
                  </div>
                </section>

                <RedThread orientation="vertical" className="h-16 mx-auto" />

                {/* THE AFTERMATH */}
                <section id="reflection" ref={setSectionRef('reflection')} className="case-section scroll-mt-56" role="tabpanel">
                  <div className="flex items-center gap-4 mb-8"><BookOpen className="w-4 h-4 text-accent flex-shrink-0" /><span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent font-semibold">THE AFTERMATH</span><div className="flex-1 h-px bg-accent/40" /></div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-8 md:mb-12">Learnings</h2>
                  <div className="space-y-4 mb-20">
                    {project.outcome.learnings.map((learning, i) => (
                      <div key={i} className="flex items-start gap-4 md:gap-5 p-5 md:p-6 bg-surface/50 border-2 border-accent/40 rounded-sm">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-mono text-accent font-bold">{String(i + 1).padStart(2, '0')}</span>
                        <p className="text-foreground/90 text-base leading-relaxed pt-1">{learning}</p>
                      </div>
                    ))}
                  </div>

                  {/* Case Closed stamp */}
                  <div className="text-center py-16 border-t-2 border-accent/40">
                    <div className="relative inline-block">
                      <div className="absolute -inset-4 bg-accent/10 rotate-3" />
                      <div className="absolute -inset-4 bg-accent/10 -rotate-3" />
                      <div className="relative bg-surface px-8 md:px-12 py-6 md:py-8 border-2 border-accent/60">
                        <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold mb-3">{project.caseNumber || 'ARCONIA-2024-001'}</p>
                        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Case Closed</h3>
                        <div className="w-16 h-px bg-accent/80 mx-auto my-6" />
                        <p className="text-muted-foreground text-sm font-serif italic mb-8">{project.title} · {project.year}</p>
                        <button onClick={onClose} className="group inline-flex items-center gap-3 px-6 md:px-8 py-4 bg-accent/20 border-2 border-accent/60 rounded-sm text-accent/90 hover:bg-accent/30 transition-all duration-300">
                          <span className="group-hover:-translate-x-1 transition-transform">←</span>
                          <span className="font-serif text-lg">Return to the Arconia</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-[7px] font-mono text-muted-foreground/50 mt-12 tracking-[0.4em] uppercase">END OF EPISODE</p>
                  </div>
                </section>
              </>
            )}

            {/* Case Closed for Extras + NicheUX */}
            {(isExtras || isNicheUX) && (
              <div className="text-center py-16 border-t-2 border-accent/40 mt-8">
                <div className="relative inline-block">
                  <div className="absolute -inset-4 bg-accent/10 rotate-3" />
                  <div className="absolute -inset-4 bg-accent/10 -rotate-3" />
                  <div className="relative bg-surface px-8 md:px-12 py-6 md:py-8 border-2 border-accent/60">
                    <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent/80 font-semibold mb-3">{project.caseNumber}</p>
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Case Closed</h3>
                    <div className="w-16 h-px bg-accent/80 mx-auto my-6" />
                    <p className="text-muted-foreground text-sm font-serif italic mb-8">{project.title} · {project.year}</p>
                    <button onClick={onClose} className="group inline-flex items-center gap-3 px-6 md:px-8 py-4 bg-accent/20 border-2 border-accent/60 rounded-sm text-accent/90 hover:bg-accent/30 transition-all duration-300">
                      <span className="group-hover:-translate-x-1 transition-transform">←</span>
                      <span className="font-serif text-lg">Return to the Arconia</span>
                    </button>
                  </div>
                </div>
                <p className="text-[7px] font-mono text-muted-foreground/50 mt-12 tracking-[0.4em] uppercase">END OF EPISODE</p>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* UI Screens Overlay — Furnore and OPES only (Kishore removed) */}
      {(isFurnore || isOpes) && (
        <UIScreensOverlay
          isOpen={isScreensOverlayOpen}
          onClose={() => setIsScreensOverlayOpen(false)}
          screens={isFurnore ? furnoreScreens : opesScreens}
          projectTitle={project.title}
        />
      )}

      {/* K29 Hi-Fi fullscreen modal — Kishore only */}
      <FullscreenModal
        isOpen={isHiFiOpen}
        onClose={() => setIsHiFiOpen(false)}
        imageSrc="/Kishore%27sPortfolioWebsite/K29_Portfolio_HQ.png"
        title="K29 Portfolio — Hi-Fi Design"
      />
    </>
  );
};

export default CaseStudyPage;