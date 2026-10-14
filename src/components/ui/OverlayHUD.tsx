import React, { useEffect } from 'react';
import { SectionId } from '../../types/portfolio';
import { portfolioData } from '../../data/portfolioData';
import { ISLAND_LAYOUT, CHAPTER_ORDER } from '../../constants/islandLayout';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Mail,
  FileText,
  Navigation,
  GraduationCap
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
  const { personal } = portfolioData;
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
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-3 sm:p-6 overflow-hidden">
      {/* Top Spacer */}
      <div className="h-10 sm:h-14" />

      {/* Center Left: HOME Island Personal Profile Card (Warm Cream theme, compact on mobile) */}
      {activeSection === 'home' && (
        <div 
          className={`pointer-events-auto w-[calc(100vw-1.5rem)] max-w-[340px] sm:max-w-md bg-[#FFF8EC]/95 backdrop-blur-md border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-500 transform ${
            isSailing ? 'opacity-0 -translate-x-8 pointer-events-none' : 'opacity-100 translate-x-0'
          }`}
        >
          {/* Name & Academic Line */}
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            {personal.name}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
            <GraduationCap className="w-3.5 h-3.5 text-teal-700 shrink-0" />
            <span>B.Tech CSE (2nd Year) • NMAMIT • <strong className="text-teal-800 font-semibold">CGPA 9.36</strong></span>
          </div>

          {/* Key Specialization Badges */}
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-700 bg-white/90 border border-amber-200/80 px-2 py-0.5 rounded-full shadow-2xs">
              Backend Systems
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-700 bg-white/90 border border-amber-200/80 px-2 py-0.5 rounded-full shadow-2xs">
              Blockchain & Solidity
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-700 bg-white/90 border border-amber-200/80 px-2 py-0.5 rounded-full shadow-2xs">
              TIPTOE & ACM Core
            </span>
          </div>

          {/* Tagline Quote */}
          <blockquote className="mt-2.5 text-xs italic text-amber-900/90 bg-white/80 border-l-2 border-[#1AA6A6] p-2 rounded-r">
            "{personal.tagline}"
          </blockquote>

          {/* Brief Bio Paragraph (concise on mobile) */}
          <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
            Architecting resilient backend services, high-throughput APIs, and decentralized protocols. Active participant in hackathons and campus tech communities.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('skills')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] rounded-lg shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <span>Explore Archipelago</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-[#1AA6A6] bg-white hover:bg-teal-50 border border-[#1AA6A6] rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#1AA6A6]" />
              <span>Contact</span>
            </button>
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3 sm:py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-amber-50 border border-amber-200/80 rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                <span>Curriculum Vitae</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Center Sailing Notification */}
      {isSailing && (
        <div className="self-center bg-[#FFF8EC]/95 backdrop-blur-md text-slate-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold border border-amber-200/80 animate-pulse">
          <Navigation className="w-4 h-4 text-[#1AA6A6]" />
          <span>Sailing to {currentConfig.name}...</span>
        </div>
      )}

      {/* Bottom Section: Screen-anchored Caption Card & Voyage Controls */}
      <div className="w-full flex flex-col items-center gap-2.5">
        {/* Caption Card: Shown on islands 2 through 5 */}
        {activeSection !== 'home' && (
          <div 
            className={`pointer-events-auto w-full max-w-xl bg-[#FFF8EC]/95 backdrop-blur-md border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xl transition-all duration-500 transform ${
              isSailing ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-amber-200/50 pb-1.5 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1AA6A6]" />
                <h2 className="text-xs sm:text-sm font-bold text-slate-900">
                  {currentConfig.chapterTitle}
                </h2>
              </div>
              <span className="text-[11px] font-medium text-amber-900/60">
                Island {currentIndex + 1} of 5
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentConfig.storyLine}
            </p>
          </div>
        )}

        {/* Voyage Chapter Controls Bar */}
        <div className="pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-3 bg-[#FFF8EC]/95 backdrop-blur-md border border-amber-200/90 rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 shadow-xl text-slate-700">
          {/* Previous Chapter Button */}
          <button
            onClick={() => prevChapter && onNavigate(prevChapter)}
            disabled={!prevChapter}
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
              prevChapter
                ? 'text-slate-700 hover:text-slate-900 hover:bg-amber-100/60 cursor-pointer'
                : 'text-slate-300 cursor-not-allowed opacity-40'
            }`}
            title="Sail to previous chapter"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* 5-Dot Chapter Progress Bar with Labels */}
          <div className="flex items-center gap-1">
            {CHAPTER_ORDER.map((chId, idx) => {
              const conf = ISLAND_LAYOUT[chId];
              const isActive = activeSection === chId;
              const isPassed = idx <= currentIndex;
              return (
                <button
                  key={chId}
                  onClick={() => onNavigate(chId)}
                  className={`group relative flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1AA6A6] text-white font-semibold shadow-2xs'
                      : isPassed
                      ? 'text-teal-800 hover:bg-amber-100/60'
                      : 'text-slate-400 hover:bg-amber-100/60'
                  }`}
                  title={`Sail to ${conf.name}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      isActive ? 'bg-white scale-125' : isPassed ? 'bg-[#1AA6A6]' : 'bg-slate-300'
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
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
              nextChapter
                ? 'text-slate-700 hover:text-slate-900 hover:bg-amber-100/60 cursor-pointer'
                : 'text-slate-300 cursor-not-allowed opacity-40'
            }`}
            title="Sail to next chapter"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
