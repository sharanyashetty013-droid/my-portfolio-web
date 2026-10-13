import React from 'react';
import { HackathonItem } from '../../types/portfolio';
import { X, MapPin, Users } from 'lucide-react';

interface HackathonModalProps {
  hackathon: HackathonItem | null;
  onClose: () => void;
}

export const HackathonModal: React.FC<HackathonModalProps> = ({ hackathon, onClose }) => {
  if (!hackathon) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-900/20 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFF8EC] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl border border-amber-200/70 p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-amber-100/60 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white text-teal-800 border border-teal-200/60 shadow-xs">
            {hackathon.badge}
          </span>
          {hackathon.location && (
            <>
              <span className="text-amber-300">•</span>
              <span className="text-slate-600 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{hackathon.location}</span>
              </span>
            </>
          )}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight pr-6 mt-1">
          {hackathon.name}
        </h2>

        {(hackathon.role || hackathon.team) && (
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium mt-1">
            {hackathon.role && (
              <span className="text-teal-700 font-semibold">Role: {hackathon.role}</span>
            )}
            {hackathon.team && (
              <span className="flex items-center gap-1 text-slate-600">
                <Users className="w-3 h-3 text-slate-400" />
                <span>Team: {hackathon.team}</span>
              </span>
            )}
          </div>
        )}

        <div className="mt-5 space-y-4 text-slate-700 text-sm leading-relaxed border-t border-amber-200/40 pt-4">
          <div className="bg-white/80 border border-amber-200/60 rounded-xl p-4 shadow-xs">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Result
            </h4>
            <p className="text-slate-900 font-semibold">
              {hackathon.result}
            </p>
          </div>

          {hackathon.whatWasBuilt && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Built Project
              </h4>
              <p className="text-slate-900 font-semibold">{hackathon.whatWasBuilt}</p>
            </div>
          )}

          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Details
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm">{hackathon.description}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-amber-200/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
