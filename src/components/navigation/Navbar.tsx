import React from 'react';
import { FileText, Github, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none p-3 sm:p-5">
      <div className="max-w-7xl mx-auto flex items-center justify-end">
        {/* Top-Right Actions in warm cream theme without download button */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-[#FFF8EC]/95 backdrop-blur-md border border-amber-200/80 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-sm">
          {/* GitHub Quick Link */}
          <a
            href="https://github.com/sharanyashetty013-droid"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-amber-50 border border-amber-200/70 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
            title="GitHub: @sharanyashetty013-droid"
          >
            <Github className="w-3.5 h-3.5" />
          </a>

          {/* Email Quick Link */}
          <a
            href="mailto:sharanyashetty013@gmail.com"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-amber-50 border border-amber-200/70 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
            title="Email: sharanyashetty013@gmail.com"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>

          {/* View CV Document Modal */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1 sm:py-1.5 text-xs font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] rounded-full transition-all shadow-xs cursor-pointer active:scale-95"
            title="View Full Curriculum Vitae"
          >
            <FileText className="w-3.5 h-3.5 text-white" />
            <span>View CV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
