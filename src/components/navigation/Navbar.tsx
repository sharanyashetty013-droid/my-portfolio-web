import React from 'react';
import { Download, FileText, Github, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-end">
        {/* Top-Right Actions in dark navy matching the archipelago theme */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[rgba(11,27,45,0.88)] backdrop-blur-md border border-slate-700/60 rounded-full px-3 py-1.5 shadow-xl shadow-slate-950/20">
          {/* GitHub Quick Link */}
          <a
            href="https://github.com/sharanyashetty013-droid"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-600/60 text-slate-300 hover:text-white transition-colors shadow-xs"
            title="GitHub: @sharanyashetty013-droid"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Email Quick Link */}
          <a
            href="mailto:sharanyashetty013@gmail.com"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-600/60 text-slate-300 hover:text-white transition-colors shadow-xs"
            title="Email: sharanyashetty013@gmail.com"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* View CV Document Modal */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-full transition-colors cursor-pointer"
            title="View Full Curriculum Vitae"
          >
            <FileText className="w-3.5 h-3.5 text-teal-300" />
            <span>View CV</span>
          </button>

          {/* Download Resume Direct Action */}
          <a
            href="/resume.pdf"
            download="Sharanya_L_Shetty_Resume.pdf"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] rounded-full transition-all shadow-xs cursor-pointer hover:shadow-md active:scale-95"
            title="Download Official Resume (1-Page PDF)"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
};
