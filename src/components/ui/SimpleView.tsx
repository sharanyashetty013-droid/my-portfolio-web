import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { ProjectItem, HackathonItem, SkillGroup } from '../../types/portfolio';
import { 
  Github, 
  ExternalLink, 
  Trophy, 
  FileText, 
  Mail, 
  Linkedin,
  Code2,
  ArrowUpRight,
  GraduationCap,
  Sparkles,
  Users
} from 'lucide-react';

interface SimpleViewProps {
  onSelectProject: (p: ProjectItem) => void;
  onSelectHackathon: (h: HackathonItem) => void;
  onSelectSkillGroup: (g: SkillGroup) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const SimpleView: React.FC<SimpleViewProps> = ({
  onSelectProject,
  onSelectHackathon,
  onSelectSkillGroup,
  onOpenResume,
  onOpenContact,
}) => {
  const { personal, education, leadership, projects, hackathons, skillGroups } = portfolioData;

  return (
    <div className="min-h-screen bg-sky-50/50 pt-20 pb-24 text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* HERO SECTION */}
        <section id="simple-home" className="pt-8 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-[#FFF8EC] border border-amber-200/70 px-3 py-1 rounded-full mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#1AA6A6]" />
            <span>Accessible Standard View</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {personal.name}
          </h1>
          <p className="text-lg sm:text-xl font-medium text-slate-600 mt-2">
            {personal.headline}
          </p>
          <blockquote className="mt-4 pl-4 border-l-2 border-[#1AA6A6] italic text-slate-700 text-base font-serif bg-[#FFF8EC]/60 p-2 rounded-r">
            "{personal.tagline}"
          </blockquote>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {personal.bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#simple-projects"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] rounded-lg transition-colors shadow-sm"
            >
              Explore Projects
            </a>
            <button
              onClick={onOpenContact}
              className="px-4 py-2 text-xs font-semibold text-[#1AA6A6] bg-white hover:bg-teal-50/60 rounded-lg border border-[#1AA6A6] transition-colors cursor-pointer shadow-xs"
            >
              Contact Sharanya
            </button>
            <button
              onClick={onOpenResume}
              className="px-4 py-2 text-xs font-semibold text-teal-800 bg-[#FFF8EC] hover:bg-amber-100/60 rounded-lg border border-amber-200/80 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#1AA6A6]" />
              <span>View Resume</span>
            </button>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="simple-projects" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-amber-200/50">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Projects</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real systems, forensics tools, and prototypes</p>
            </div>
            <span className="text-xs font-mono text-slate-500">{projects.length} Works</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group bg-[#FFF8EC] rounded-2xl p-6 border border-amber-200/70 hover:border-teal-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-mono text-[11px] text-teal-800 bg-white/80 px-2 py-0.5 rounded border border-teal-200/50 font-semibold">{project.systemTag}</span>
                    <div className="flex gap-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-white/90 text-slate-600 px-1.5 py-0.5 rounded border border-amber-200/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors flex items-center gap-1.5">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#1AA6A6]" />
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-200/40 flex items-center gap-3">
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-medium text-[#1AA6A6] hover:text-[#158F8F] flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live deploy</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HACKATHONS SECTION */}
        <section id="simple-hackathons" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-amber-200/50">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Hackathons & Sprints</h2>
              <p className="text-xs text-slate-500 mt-0.5">Competitions and buildathons</p>
            </div>
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hackathons.map((h) => (
              <div
                key={h.id}
                onClick={() => onSelectHackathon(h)}
                className="bg-[#FFF8EC] rounded-2xl p-6 border border-amber-200/70 hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white text-teal-800 border border-teal-200/60 shadow-xs">
                      {h.badge}
                    </span>
                    {h.location && <span className="text-[11px] text-slate-500 truncate max-w-[130px]">{h.location}</span>}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {h.name}
                  </h3>
                  <div className="mt-2.5 bg-white/80 p-2.5 rounded-xl border border-amber-200/60 text-xs shadow-xs">
                    {h.whatWasBuilt && (
                      <span className="font-bold text-slate-900 block text-[11px] mb-0.5">
                        Built: {h.whatWasBuilt}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-600 font-medium">{h.result}</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="simple-skills" className="scroll-mt-24">
          <div className="mb-6 pb-3 border-b border-amber-200/50">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Technical Skills</h2>
            <p className="text-xs text-slate-500 mt-0.5">5 core engineering disciplines</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((g) => (
              <div
                key={g.id}
                onClick={() => onSelectSkillGroup(g)}
                className="bg-[#FFF8EC] rounded-2xl p-6 border border-amber-200/70 hover:border-teal-300 transition-colors cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full shadow-xs" style={{ backgroundColor: g.color }} />
                  <h3 className="font-bold text-slate-900 text-lg">{g.name}</h3>
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {g.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span key={s} className="bg-white text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-200/60 shadow-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & CLUBS SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="bg-[#FFF8EC] rounded-2xl p-6 border border-amber-200/70 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-amber-200/40">
              <GraduationCap className="w-5 h-5 text-[#1AA6A6]" />
              <h3 className="font-bold text-slate-900 text-lg">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((e) => (
                <div key={e.institution} className="text-xs sm:text-sm">
                  <div className="font-bold text-slate-900">{e.institution}</div>
                  <div className="text-slate-600">{e.degree}</div>
                  {e.score && <div className="text-teal-700 font-semibold mt-0.5">{e.score}</div>}
                  <div className="text-slate-500 text-xs">{e.period} • {e.location}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFF8EC] rounded-2xl p-6 border border-amber-200/70 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-amber-200/40">
              <Users className="w-5 h-5 text-[#1AA6A6]" />
              <h3 className="font-bold text-slate-900 text-lg">Leadership & Campus Involvement</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {leadership.map((lead, idx) => (
                <li key={`lead-${idx}`} className="flex items-start gap-2">
                  <span className="text-[#1AA6A6] font-bold">•</span>
                  <span className="text-slate-700">{lead}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="simple-contact" className="scroll-mt-24 bg-[#FFF8EC] rounded-3xl p-8 border border-amber-200/70 shadow-md">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Connect with Sharanya</h2>
            <p className="mt-2 text-sm text-slate-600">
              Reach out for backend systems, blockchain engineering, and student collaborations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] rounded-xl transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{personal.email}</span>
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1AA6A6] bg-white hover:bg-teal-50 rounded-xl transition-colors border border-[#1AA6A6] shadow-xs"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-xs"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personal.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-xs"
              >
                <Code2 className="w-4 h-4" />
                <span>LeetCode</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
