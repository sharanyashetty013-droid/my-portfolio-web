import React from 'react';
import { ProjectItem } from '../../types/portfolio';
import { X, ExternalLink, Github } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-900/20 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFF8EC] rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-amber-200/70 p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-amber-100/60 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-8 mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 text-teal-800 border border-teal-200/60 font-mono text-[11px] font-semibold mb-2">
            <span>{project.systemTag}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {project.title}
          </h2>
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/90 text-teal-700 border border-teal-200/60 px-2 py-0.5 rounded-md text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-slate-700 text-sm leading-relaxed border-t border-amber-200/40 pt-4">
          <p>{project.description}</p>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-4 border-t border-amber-200/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1AA6A6] bg-white hover:bg-teal-50/60 rounded-lg transition-colors cursor-pointer border border-[#1AA6A6]"
              >
                <Github className="w-4 h-4" />
                <span>Source code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live deploy</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
