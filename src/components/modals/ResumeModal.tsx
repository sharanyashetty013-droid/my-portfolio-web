import React from 'react';
import { X, Mail, MapPin, Phone } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sky-900/20 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFF8EC] rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-xl border border-amber-200/70 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-amber-200/60 bg-amber-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-[20px]">Curriculum Vitae</h3>
            <span className="text-[14px] text-[#475569] font-medium">• 1-Page Document</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#475569] hover:text-slate-900 hover:bg-amber-100/60 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-[28px] text-slate-800 text-[16px]">
          {/* Resume Header */}
          <div className="border-b border-amber-200/60 pb-5">
            <h1 className="text-[34px] font-bold text-slate-900 tracking-tight leading-tight">
              SHARANYA L SHETTY
            </h1>
            <p className="text-[16px] text-[#475569] font-medium mt-1.5 leading-normal">
              B.Tech, Computer Science Engineering (2nd Year) • NMAM Institute of Technology, Nitte
            </p>
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[15px] text-[#475569] mt-3">
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#0F766E]" />
                <a href="tel:8762483622" className="text-[#0F766E] hover:underline font-medium">
                  8762483622
                </a>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#0F766E]" />
                <a href="mailto:sharanyashetty013@gmail.com" className="text-[#0F766E] hover:underline font-medium">
                  sharanyashetty013@gmail.com
                </a>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#475569]" />
                <span>Karkala, Udupi, Karnataka</span>
              </span>
            </div>
          </div>

          {/* 1. Profile */}
          <section>
            <h2 className="text-[14px] font-bold text-teal-800 uppercase tracking-[0.08em] mb-2.5 border-b border-amber-200/50 pb-1">
              PROFILE
            </h2>
            <p className="text-slate-800 leading-[1.6] text-[16px]">
              Second-year CSE student with a focus on Backend and Blockchain (Solidity). Core member of two campus communities, coordinating logistics and documentation for club activities while building technical skills through certifications, hackathons and internships. Comfortable presenting to groups, organizing people around a shared goal, and picking up new tools quickly.
            </p>
          </section>

          {/* 2. Education */}
          <section>
            <h2 className="text-[14px] font-bold text-teal-800 uppercase tracking-[0.08em] mb-2.5 border-b border-amber-200/50 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-3.5">
              <div className="text-[16px]">
                <div className="flex justify-between items-baseline text-[17px] font-semibold text-slate-900">
                  <span>NMAM Institute of Technology, Nitte</span>
                  <span className="text-[15px] text-[#475569] font-normal shrink-0 ml-4">2025 – 2029</span>
                </div>
                <div className="text-[15px] text-[#475569] italic mt-0.5">
                  B.Tech, Computer Science Engineering — <span className="font-semibold text-slate-800 not-italic">CGPA 9.36 (1st Year)</span>
                </div>
              </div>

              <div className="text-[16px]">
                <div className="flex justify-between items-baseline text-[17px] font-semibold text-slate-900">
                  <span>Creative PU College, Karkala, Udupi</span>
                  <span className="text-[15px] text-[#475569] font-normal shrink-0 ml-4">2023 – 2025</span>
                </div>
                <div className="text-[15px] text-[#475569] italic mt-0.5">
                  Pre-University Course, Science — <span className="font-semibold text-slate-800 not-italic">95% in Board Examinations</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Leadership & Campus Involvement */}
          <section>
            <h2 className="text-[14px] font-bold text-teal-800 uppercase tracking-[0.08em] mb-2.5 border-b border-amber-200/50 pb-1">
              LEADERSHIP & CAMPUS INVOLVEMENT
            </h2>
            <ul className="space-y-2 text-[16px] leading-[1.6] text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span><strong>TIPTOE Club</strong> — Core Member; received recognition for contributions to club activities and events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span><strong>ACM Club</strong> — Core Member, Documentation Team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span>Supported registration and data tracking for club events using Google Forms and Sheets</span>
              </li>
            </ul>
          </section>

          {/* 4. Experience */}
          <section>
            <h2 className="text-[14px] font-bold text-teal-800 uppercase tracking-[0.08em] mb-2.5 border-b border-amber-200/50 pb-1">
              EXPERIENCE
            </h2>
            <ul className="space-y-2 text-[16px] leading-[1.6] text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span>Completed two off-campus internships and one campus internship</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span>Participated in multiple ideathons and datathons as part of cross-functional teams</span>
              </li>
            </ul>
          </section>

          {/* 5. Certifications */}
          <section>
            <h2 className="text-[14px] font-bold text-teal-800 uppercase tracking-[0.08em] mb-2.5 border-b border-amber-200/50 pb-1">
              CERTIFICATIONS
            </h2>
            <ul className="space-y-1.5 text-[16px] leading-[1.6] text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span>Google Certification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span>Microsoft Certification</span>
              </li>
            </ul>
          </section>

          {/* 6. Achievements & Awards */}
          <section>
            <h2 className="text-[14px] font-bold text-teal-800 uppercase tracking-[0.08em] mb-2.5 border-b border-amber-200/50 pb-1">
              ACHIEVEMENTS & AWARDS
            </h2>
            <ul className="space-y-2 text-[16px] leading-[1.6] text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span>Best Student Award</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span>Best Librarian Award, 12th Grade</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span>Secured 95% in 12th Board Examinations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-bold">•</span>
                <span>Recognition and prizes across TIPTOE Club and off-campus activities</span>
              </li>
            </ul>
          </section>

          {/* 7. Core Skills */}
          <section>
            <h2 className="text-[14px] font-bold text-teal-800 uppercase tracking-[0.08em] mb-2.5 border-b border-amber-200/50 pb-1">
              CORE SKILLS
            </h2>
            <p className="text-slate-700 leading-[1.6] text-[16px]">
              Communication & Public Speaking • Backend • DSA • Blockchain and Solidity • Go, Docker • Tailwind CSS • API and Next.js
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
