import React from 'react';
import { SkillGroup } from '../../types/portfolio';
import { X } from 'lucide-react';

interface SkillModalProps {
  skillGroup: SkillGroup | null;
  onClose: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ skillGroup, onClose }) => {
  if (!skillGroup) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-900/20 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFF8EC] rounded-2xl max-w-md w-full shadow-xl border border-amber-200/70 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-amber-100/60 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span 
            className="w-3 h-3 rounded-full shadow-xs" 
            style={{ backgroundColor: skillGroup.color }} 
          />
          <span className="text-xs uppercase font-bold text-teal-800 tracking-wider">
            Discipline
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          {skillGroup.name}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {skillGroup.description}
        </p>

        <div className="mt-5 pt-3 border-t border-amber-200/40">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap items-center gap-1.5">
            {skillGroup.skills.map((skill) => (
              <span
                key={skill}
                className="bg-white text-slate-800 border border-amber-200/60 px-3 py-1 rounded-lg text-xs font-semibold shadow-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-amber-200/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 text-xs font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
