import React, { useState, useEffect, useRef } from 'react';
import { SectionId, ProjectItem, HackathonItem, SkillGroup } from './types/portfolio';
import { Navbar } from './components/navigation/Navbar';
import { WorldScene } from './components/scene/WorldScene';
import { OverlayHUD } from './components/ui/OverlayHUD';
import { ProjectModal } from './components/modals/ProjectModal';
import { HackathonModal } from './components/modals/HackathonModal';
import { SkillModal } from './components/modals/SkillModal';
import { ResumeModal } from './components/modals/ResumeModal';
import { ContactModal } from './components/modals/ContactModal';
import { CHAPTER_ORDER } from './constants/islandLayout';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isSailing, setIsSailing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedHackathon, setSelectedHackathon] = useState<HackathonItem | null>(null);
  const [selectedSkillGroup, setSelectedSkillGroup] = useState<SkillGroup | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Debounce ref for wheel / touch gesture navigation
  const gestureLockRef = useRef(false);
  const touchStartYRef = useRef(0);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handleNavigate = (section: SectionId) => {
    setActiveSection(section);
  };

  const isAnyModalOpen = Boolean(
    selectedProject || selectedHackathon || selectedSkillGroup || isResumeOpen || isContactOpen
  );

  // Gesture handling: Debounced wheel scroll & touch swipe to change chapters
  useEffect(() => {
    if (isAnyModalOpen) return;

    const changeChapterByStep = (delta: number) => {
      if (gestureLockRef.current) return;
      gestureLockRef.current = true;
      setTimeout(() => {
        gestureLockRef.current = false;
      }, 900); // 900ms gesture debounce

      setActiveSection((curr) => {
        const idx = CHAPTER_ORDER.indexOf(curr);
        const nextIdx = idx + delta;
        if (nextIdx >= 0 && nextIdx < CHAPTER_ORDER.length) {
          return CHAPTER_ORDER[nextIdx];
        }
        return curr;
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 45) return;
      changeChapterByStep(e.deltaY > 0 ? 1 : -1);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartYRef.current - touchEndY;
        if (Math.abs(diff) > 60) {
          changeChapterByStep(diff > 0 ? 1 : -1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnyModalOpen]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-sky-50 font-sans text-slate-800 select-none">
      {/* Fixed Top Navigation Bar with Direct Resume Download */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main 3D Voyage Scene */}
      <div className="w-full h-full">
        <WorldScene
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onSelectProject={(p) => setSelectedProject(p)}
          onSelectHackathon={(h) => setSelectedHackathon(h)}
          onSelectSkillGroup={(g) => setSelectedSkillGroup(g)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          isAnyModalOpen={isAnyModalOpen}
          reducedMotion={reducedMotion}
          onSailingStateChange={(sailing) => setIsSailing(sailing)}
        />

        {/* Screen-Anchored Overlay HUD with Unified Hero Card & 1-to-5 Chapter Navigation */}
        <OverlayHUD
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          isSailing={isSailing}
        />
      </div>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <HackathonModal
        hackathon={selectedHackathon}
        onClose={() => setSelectedHackathon(null)}
      />
      <SkillModal
        skillGroup={selectedSkillGroup}
        onClose={() => setSelectedSkillGroup(null)}
      />
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
