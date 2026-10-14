import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  X, 
  Mail, 
  Github, 
  Linkedin, 
  Code2, 
  Copy, 
  Check, 
  ExternalLink, 
  Send
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const { personal } = portfolioData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-900/20 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFF8EC] rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-xl border border-amber-200/70 p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#475569] hover:text-slate-900 hover:bg-amber-100/60 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-[14px] font-semibold text-[#1AA6A6] uppercase tracking-wider">
            VERIFIED CHANNELS
          </span>
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight mt-1 leading-tight">
            Connect with Sharanya
          </h2>
          <p className="text-[16px] text-[#475569] mt-1.5 leading-normal">
            Backend & blockchain development, smart contracts, and hackathons.
          </p>
        </div>

        {/* 4 Verified Contact Buttons: 14px gap, 16px 20px padding */}
        <div className="space-y-[14px] mb-6">
          {/* 1. Email */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 rounded-xl bg-white/80 border border-teal-200/60 shadow-xs">
            <a
              href={`mailto:${personal.email}`}
              className="flex-1 flex items-center gap-3.5 text-slate-900 hover:text-teal-700 transition-colors min-w-0"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1AA6A6] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[16px] font-semibold text-slate-900 leading-tight">Email Address</div>
                <div className="text-[15px] text-[#475569] truncate mt-0.5">{personal.email}</div>
              </div>
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 text-[15px] sm:text-[16px] font-semibold text-[#1AA6A6] bg-white hover:bg-teal-50 rounded-lg border border-[#1AA6A6] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
              title="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* 2. GitHub */}
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-4 rounded-xl bg-white/80 hover:bg-white border border-amber-200/60 transition-colors cursor-pointer group shadow-xs"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#1AA6A6] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Github className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[16px] font-semibold text-slate-900 leading-tight">GitHub Profile</div>
                <div className="text-[15px] text-[#475569] font-mono truncate mt-0.5">@sharanyashetty013-droid</div>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0 ml-2" />
          </a>

          {/* 3. LinkedIn */}
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-4 rounded-xl bg-white/80 hover:bg-white border border-amber-200/60 transition-colors cursor-pointer group shadow-xs"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[16px] font-semibold text-slate-900 leading-tight">LinkedIn Profile</div>
                <div className="text-[15px] text-[#475569] font-mono truncate mt-0.5">sharanya-l-shetty-81156a424</div>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-sky-600 transition-colors shrink-0 ml-2" />
          </a>

          {/* 4. LeetCode */}
          <a
            href={personal.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-4 rounded-xl bg-white/80 hover:bg-white border border-amber-200/60 transition-colors cursor-pointer group shadow-xs"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[16px] font-semibold text-slate-900 leading-tight">LeetCode Profile</div>
                <div className="text-[15px] text-[#475569] font-mono truncate mt-0.5">Sharanya_Shetty01</div>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors shrink-0 ml-2" />
          </a>

        </div>

        {/* Quick Note Form: 48px inputs, min 110px textarea */}
        <form onSubmit={handleSubmit} className="border-t border-amber-200/50 pt-5 space-y-3">
          <div className="text-[16px] font-semibold text-slate-900">Or send a quick message:</div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your Name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="h-[48px] px-4 text-[16px] placeholder:text-[16px] placeholder:text-[#94A3B8] text-slate-900 bg-white border border-amber-200/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1AA6A6]"
            />
            <input
              type="email"
              required
              placeholder="Your Email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="h-[48px] px-4 text-[16px] placeholder:text-[16px] placeholder:text-[#94A3B8] text-slate-900 bg-white border border-amber-200/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1AA6A6]"
            />
          </div>
          <textarea
            required
            rows={3}
            placeholder="Hi Sharanya, let's discuss..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[110px] p-3.5 text-[16px] placeholder:text-[16px] placeholder:text-[#94A3B8] text-slate-900 bg-white border border-amber-200/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1AA6A6] resize-none"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-[14px] text-[#475569]">Direct response</span>
            <button
              type="submit"
              disabled={messageSent}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[16px] font-semibold text-white bg-[#1AA6A6] hover:bg-[#158F8F] disabled:bg-emerald-600 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              {messageSent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Note</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
