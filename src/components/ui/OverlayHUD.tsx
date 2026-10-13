import React, { useEffect } from 'react';
import { SectionId } from '../../types/portfolio';
import { portfolioData } from '../../data/portfolioData';
import { ISLAND_LAYOUT, CHAPTER_ORDER } from '../../constants/islandLayout';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Mail,
  Navigation,
  FileText,
  GraduationCap,
  Sparkles
} from 'lucide-react';

interface OverlayHUDProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onOpenContact: () => void;
  onOpenResume?: () => void;
  isSailing?: boolean;
}

export const OverlayHUD: React.FC<OverlayHUDProps> = ({
  activeSection,
  onNavigate,
  onOpenContact,
  onOpenResume,
  isSailing = false,
}) => {
  const { personal, education } = portfolioData;
  const currentConfig = ISLAND_LAYOUT[activeSection];
  const currentIndex = CHAPTER_ORDER.indexOf(activeSection);
  const prevChapter = currentIndex > 0 ? CHAPTER_ORDER[currentIndex - 1] : null;
  const nextChapter = currentIndex < CHAPTER_ORDER.length - 1 ? CHAPTER_ORDER[currentIndex + 1] : null;

  // Arrow key navigation between chapters
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && nextChapter) {
        onNavigate(nextChapter);
      } else if (e.key === 'ArrowLeft' && prevChapter) {
        onNavigate(prevChapter);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextChapter, prevChapter, onNavigate]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
      {/* Top Spacer */}
      <div className="h-12 sm:h-16" />

      {/* Center Left: HOME Island Personal Profile Card (Dark navy theme) */}
      {activeSection === 'home' && (
        <div 
          className={`pointer-events-auto max-w-sm sm:max-w-lg bg-[rgba(11,27,45,0.88)] backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-slate-950/40 transition-all duration-500 transform ${
            isSailing ? 'opacity-0 -translate-x-8 pointer-events-none' : 'opacity-100 translate-x-0'
          }`}
        >
          {/* Main Title & Education Line */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Space_Grotesk']">
            {personal.name}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 mt-1 font-['DM_Sans',sans-serif]">
            <GraduationCap className="w-4 h-4 text-[#5EEAD4] shrink-0" />
            <span>B.Tech CSE (2nd Year) • NMAMIT, Nitte • <strong className="text-teal-300 font-semibold">CGPA 9.36</strong></span>
          </div>

          {/* Key Specialization & Involvement Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="text-[11px] font-medium text-teal-200 bg-teal-950/60 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
              Backend Systems
            </span>
            <span className="text-[11px] font-medium text-teal-200 bg-teal-950/60 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
              Blockchain & Solidity
            </span>
            <span className="text-[11px] font-medium text-teal-200 bg-teal-950/60 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
              TIPTOE & ACM Core
            </span>
          </div>

          {/* Tagline Quote */}
          <blockquote className="mt-3.5 text-xs sm:text-sm italic text-[#5EEAD4] bg-teal-950/40 border-l-2 border-[#1AA6A6] p-2.5 rounded-r font-['DM_Sans',sans-serif]">
            "{personal.tagline}"
          </blockquote>

          {/* Brief Bio Paragraph */}
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-['DM_Sans',sans-serif]">
            Passionate about architecting resilient backend services, high-throughput APIs, and decentralized protocols. Active participant in hackathons, open-source building, and campus tech communities.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('skills')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] rounded-lg shadow-sm transition-all cursor-pointer hover:shadow-md"
            >
              <span>Explore Archipelago</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-teal-300 bg-slate-800/80 hover:bg-slate-700 border border-teal-500/40 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-teal-300" />
              <span>Contact</span>
            </button>
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/60 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-teal-400" />
                <span>Curriculum Vitae</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Center Sailing Notification */}
      {isSailing && (
        <div className="self-center bg-[rgba(11,27,45,0.88)] backdrop-blur-md text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-teal-500/30 animate-pulse font-['Space_Grotesk']">
          <Navigation className="w-4 h-4 text-[#1AA6A6]" />
          <span>Sailing to {currentConfig.name}...</span>
        </div>
      )}

      {/* Bottom Section: Screen-anchored Caption Card & Voyage Controls */}
      <div className="w-full flex flex-col items-center gap-3">
        {/* Caption Card: Only shown on islands 2 through 5 to eliminate overlap with Home hero card */}
        {activeSection !== 'home' && (
          <div 
            className={`pointer-events-auto w-full max-w-xl bg-[rgba(11,27,45,0.88)] backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-slate-950/40 transition-all duration-500 transform ${
              isSailing ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-700/60 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1AA6A6]" />
                <h2 className="text-sm sm:text-base font-bold text-white font-['Space_Grotesk']">
                  {currentConfig.chapterTitle}
                </h2>
              </div>
              <span className="text-xs font-medium text-teal-400 font-['DM_Sans',sans-serif]">
                Island {currentIndex + 1} of 5
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-['DM_Sans',sans-serif]">
              {currentConfig.storyLine}
            </p>
          </div>
        )}

        {/* Voyage Chapter Controls Bar - Single authoritative place for chapter 1 to 5 navigation */}
        <div className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 bg-[rgba(11,27,45,0.88)] backdrop-blur-md border border-slate-700/60 rounded-full px-3 py-2 sm:px-5 sm:py-2.5 shadow-2xl shadow-slate-950/30 text-slate-300">
          {/* Previous Chapter Button */}
          <button
            onClick={() => prevChapter && onNavigate(prevChapter)}
            disabled={!prevChapter}
            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              prevChapter
                ? 'text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer'
                : 'text-slate-600 cursor-not-allowed opacity-40'
            }`}
            title="Sail to previous chapter (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* 5-Dot Chapter Progress Bar with Labels (Home till 5) */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {CHAPTER_ORDER.map((chId, idx) => {
              const conf = ISLAND_LAYOUT[chId];
              const isActive = activeSection === chId;
              const isPassed = idx <= currentIndex;
              return (
                <button
                  key={chId}
                  onClick={() => onNavigate(chId)}
                  className={`group relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1AA6A6] text-white font-semibold shadow-xs'
                      : isPassed
                      ? 'text-teal-300 hover:bg-slate-800/70 hover:text-white'
                      : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                  }`}
                  title={`Sail to ${conf.name}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-all ${
                      isActive ? 'bg-white scale-125' : isPassed ? 'bg-[#1AA6A6]' : 'bg-slate-600'
                    }`}
                  />
                  <span className={`hidden md:inline ${isActive ? 'inline' : ''}`}>
                    {conf.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Chapter Button */}
          <button
            onClick={() => nextChapter && onNavigate(nextChapter)}
            disabled={!nextChapter}
            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              nextChapter
                ? 'text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer'
                : 'text-slate-600 cursor-not-allowed opacity-40'
            }`}
            title="Sail to next chapter (Right Arrow)"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
